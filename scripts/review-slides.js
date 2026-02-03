const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const REVIEWS_DIR = path.join(ROOT, 'reviews');
const BEFORE_DIR = path.join(REVIEWS_DIR, 'before');
const AFTER_DIR = path.join(REVIEWS_DIR, 'after');
const BASELINE_FILE = path.join(REVIEWS_DIR, 'BASELINE_COMMIT.txt');
const CHANGED_FILE = path.join(REVIEWS_DIR, 'changed-slides.json');
const COMPARE_HTML = path.join(REVIEWS_DIR, 'compare-all.html');
const COMPARE_JSON = path.join(REVIEWS_DIR, 'compare-all.json');

const DEFAULT_URL = 'http://127.0.0.1:5501/OSTEOPOROSE/src/index.html';
const BASE_URL = (process.env.EXPORT_URL || DEFAULT_URL).split('#')[0];
const BATCH_FROM = parseInt(process.env.BATCH_FROM || '1', 10);
const BATCH_TO = parseInt(process.env.BATCH_TO || '14', 10);

const VIEWPORT = { width: 1600, height: 900 };
const TOL = 2;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function runGit(cmd) {
  return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
}

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function toSlideIdFromPath(filePath) {
  const match = filePath.replace(/\\/g, '/').match(/OSTEOPOROSE\/src\/slides\/(S\d{2})_/i);
  return match ? match[1].toUpperCase() : null;
}

function sortSlideIds(ids) {
  return [...ids].sort((a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10));
}

function getFileUrlForWorktree(worktreePath) {
  const indexPath = path.join(worktreePath, 'OSTEOPOROSE', 'src', 'index.html');
  return pathToFileURL(indexPath).toString();
}

async function waitForDeck(page) {
  await page.waitForFunction(
    () => {
      if (window.__OSTEOPOROSE_DECK && window.__OSTEOPOROSE_DECK.loaded === true) return true;
      if (window.__viewer && window.__viewer.slides && window.__viewer.slides.length > 0) return true;
      return document.querySelectorAll('.slide').length > 0;
    },
    { timeout: 15000 }
  );
}

async function waitForActiveSlide(page, key) {
  await page.waitForFunction(
    (k) => {
      const active = document.querySelector('.slide.is-active, .slide.active');
      if (!active) return false;
      const datasetKey = active.dataset && (active.dataset.key || active.dataset.slide);
      if (datasetKey) return datasetKey === k;
      if (active.id && k.startsWith('S')) {
        const num = parseInt(k.slice(1), 10);
        return active.id === `slide-${num}`;
      }
      return true;
    },
    key,
    { timeout: 8000 }
  );
}

async function getActiveSlideRect(page) {
  return page.evaluate(() => {
    const active = document.querySelector('.slide.is-active, .slide.active');
    if (!active) return null;
    const rect = active.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return null;
    return {
      x: Math.max(0, Math.round(rect.left)),
      y: Math.max(0, Math.round(rect.top)),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    };
  });
}

async function captureSlide(page, outputPath) {
  let rect = null;
  for (let i = 0; i < 3; i += 1) {
    rect = await getActiveSlideRect(page);
    if (rect && rect.width > 0 && rect.height > 0) break;
    await page.waitForTimeout(100);
  }

  if (!rect || !rect.width || !rect.height) return { ok: false, reason: 'NO_CLIP_RECT' };

  await page.screenshot({ path: outputPath, type: 'png', clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });
  return { ok: true, rect };
}

async function collectMetrics(page) {
  return page.evaluate((tol) => {
    const active = document.querySelector('.slide.is-active, .slide.active');
    const slides = [...document.querySelectorAll('.slide')];
    const visibleSlides = slides.filter(s => {
      const cs = getComputedStyle(s);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      if (s.hasAttribute('hidden')) return false;
      const r = s.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).length;

    const slidesWithActive = document.querySelectorAll('.slide.is-active, .slide.active').length;
    const htmlOverflow = getComputedStyle(document.documentElement).overflow;
    const bodyOverflow = getComputedStyle(document.body).overflow;
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;

    if (!active) {
      return {
        error: 'NO_ACTIVE_SLIDE',
        visibleSlides,
        slidesWithActive,
        htmlOverflow,
        bodyOverflow,
        scrollWidth,
        clientWidth,
        overflowX: scrollWidth - clientWidth
      };
    }

    const slideRect = active.getBoundingClientRect();
    const violations = [];

    active.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const overLeft = r.left < slideRect.left - tol;
      const overTop = r.top < slideRect.top - tol;
      const overRight = r.right > slideRect.right + tol;
      const overBottom = r.bottom > slideRect.bottom + tol;
      if (overLeft || overTop || overRight || overBottom) {
        if (violations.length < 8) {
          violations.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: el.className || '',
            rect: {
              left: Math.round(r.left),
              top: Math.round(r.top),
              right: Math.round(r.right),
              bottom: Math.round(r.bottom)
            }
          });
        }
      }
    });

    return {
      slideId: active.dataset?.key || active.dataset?.slide || active.id || null,
      visibleSlides,
      slidesWithActive,
      htmlOverflow,
      bodyOverflow,
      scrollWidth,
      clientWidth,
      overflowX: scrollWidth - clientWidth,
      violations
    };
  }, TOL);
}

async function runCapture({ baseUrl, slides, outDir, collectMetricsFlag }) {
  ensureDir(outDir);
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage({ viewport: VIEWPORT });
  const results = {};

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await waitForDeck(page);
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });

    for (const key of slides) {
      const url = `${baseUrl}#${key}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await waitForActiveSlide(page, key);
      await page.waitForTimeout(120);

      const outputPath = path.join(outDir, `${key}.png`);
      const captureResult = await captureSlide(page, outputPath);
      const metrics = collectMetricsFlag ? await collectMetrics(page) : null;

      results[key] = {
        url,
        outputPath,
        captured: captureResult.ok === true,
        captureReason: captureResult.ok ? null : captureResult.reason,
        clip: captureResult.rect || null,
        metrics
      };
    }
  } finally {
    await page.close();
    await browser.close();
  }

  return results;
}

function generateCompareHtml({ baselineCommit, currentCommit, generatedAt, baseUrl, slides, rows }) {
  const ts = encodeURIComponent(generatedAt);
  const header = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Compare All — OSTEOPOROSE</title>
  <style>
    body { margin: 20px; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #f6f6f6; color: #111; }
    header { background: #0B1320; color: #fff; padding: 16px; border-radius: 10px; margin-bottom: 16px; }
    header h1 { margin: 0 0 6px; font-size: 18px; }
    header .meta { font-size: 12px; opacity: 0.9; line-height: 1.5; }
    table { width: 100%; border-collapse: collapse; background: #fff; }
    th, td { border: 1px solid #e5e5e5; padding: 10px; vertical-align: top; text-align: center; }
    th { background: #fafafa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
    img { width: 720px; max-width: 100%; height: auto; display: block; margin: 0 auto; border: 1px solid #ddd; }
    .slide-label { font-weight: 700; }
    .missing { background: #ffe6e6; color: #a10000; padding: 16px; border: 1px solid #ffb3b3; border-radius: 8px; font-weight: 700; }
    .metrics { font-size: 11px; text-align: left; color: #333; line-height: 1.4; }
    .row-fail { background: #fff5f5; }
  </style>
</head>
<body>
  <header>
    <h1>Compare All — OSTEOPOROSE</h1>
    <div class="meta">
      <div>BASELINE: ${baselineCommit}</div>
      <div>CURRENT: ${currentCommit}</div>
      <div>Gerado em: ${generatedAt}</div>
      <div>URL: ${baseUrl}</div>
      <div>Slides no review: ${slides.length}</div>
    </div>
  </header>
  <table>
    <thead>
      <tr>
        <th>Slide</th>
        <th>Before</th>
        <th>After</th>
        <th>Métricas</th>
      </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>`;

  return header.replace(/\n/g, '\n');
}

function buildMetricsSummary(metrics) {
  if (!metrics) return 'Sem métricas';
  if (metrics.error) return `FAIL — ${metrics.error}`;
  const overflowFail = metrics.overflowX > TOL;
  const activeFail = metrics.slidesWithActive !== 1;
  const visibleFail = metrics.visibleSlides !== 1;
  const violCount = metrics.violations ? metrics.violations.length : 0;
  return `overflowX=${metrics.overflowX} (${overflowFail ? 'FAIL' : 'PASS'})\nactive=${metrics.slidesWithActive} (${activeFail ? 'FAIL' : 'PASS'})\nvisible=${metrics.visibleSlides} (${visibleFail ? 'FAIL' : 'PASS'})\nviolations=${violCount}`;
}

async function main() {
  ensureDir(REVIEWS_DIR);
  ensureDir(BEFORE_DIR);
  ensureDir(AFTER_DIR);

  if (!fs.existsSync(BASELINE_FILE)) {
    const baselineCommit = runGit('git rev-parse HEAD');
    fs.writeFileSync(BASELINE_FILE, `${baselineCommit}\n`);
  }

  const baselineCommit = fs.readFileSync(BASELINE_FILE, 'utf8').trim();
  const currentCommit = runGit('git rev-parse HEAD');
  const generatedAt = new Date().toISOString();

  let diffFiles = [];
  try {
    const output = runGit(`git diff --name-only ${baselineCommit}..HEAD`);
    diffFiles = output ? output.split('\n').filter(Boolean) : [];
  } catch {
    diffFiles = [];
  }

  const diffSlides = diffFiles.map(toSlideIdFromPath).filter(Boolean);
  const previousSlides = safeReadJson(CHANGED_FILE, []);
  const merged = sortSlideIds(new Set([...previousSlides, ...diffSlides]));

  writeJson(CHANGED_FILE, merged);

  const slides = merged;
  const beforeMissing = [];
  const afterMissing = [];
  const metricsMap = {};

  if (slides.length > 0) {
    const missingBefore = slides.filter(s => !fs.existsSync(path.join(BEFORE_DIR, `${s}.png`)));
    if (missingBefore.length > 0) {
      const worktreePath = path.join(ROOT, '.tmp-baseline-worktree');
      try {
        if (fs.existsSync(worktreePath)) {
          runGit(`git worktree remove --force ${worktreePath}`);
        }
      } catch {}

      runGit(`git worktree add ${worktreePath} ${baselineCommit}`);
      const baselineUrl = getFileUrlForWorktree(worktreePath);
      const baselineResults = await runCapture({ baseUrl: baselineUrl, slides: missingBefore, outDir: BEFORE_DIR, collectMetricsFlag: false });

      missingBefore.forEach(s => {
        const expected = path.join(BEFORE_DIR, `${s}.png`);
        if (!fs.existsSync(expected) || !baselineResults[s]?.captured) beforeMissing.push(s);
      });

      runGit(`git worktree remove --force ${worktreePath}`);
    }

    const afterResults = await runCapture({ baseUrl: BASE_URL, slides, outDir: AFTER_DIR, collectMetricsFlag: true });
    slides.forEach(s => {
      metricsMap[s] = afterResults[s]?.metrics || null;
      const expected = path.join(AFTER_DIR, `${s}.png`);
      if (!fs.existsSync(expected) || !afterResults[s]?.captured) afterMissing.push(s);
    });
  }

  const rows = slides.map(slideId => {
    const beforePath = `before/${slideId}.png?v=${generatedAt}`;
    const afterPath = `after/${slideId}.png?v=${generatedAt}`;
    const beforeExists = fs.existsSync(path.join(BEFORE_DIR, `${slideId}.png`));
    const afterExists = fs.existsSync(path.join(AFTER_DIR, `${slideId}.png`));
    const metrics = metricsMap[slideId];
    const metricsText = buildMetricsSummary(metrics).replace(/\n/g, '<br/>');
    const rowClass = beforeExists && afterExists ? '' : 'row-fail';

    const beforeCell = beforeExists
      ? `<img src="${beforePath}" alt="${slideId} before" />`
      : `<div class="missing">MISSING before</div>`;

    const afterCell = afterExists
      ? `<img src="${afterPath}" alt="${slideId} after" />`
      : `<div class="missing">MISSING after</div>`;

    return `      <tr class="${rowClass}">
        <td class="slide-label">${slideId}</td>
        <td>${beforeCell}</td>
        <td>${afterCell}</td>
        <td class="metrics">${metricsText}</td>
      </tr>`;
  }).join('\n');

  const html = generateCompareHtml({
    baselineCommit,
    currentCommit,
    generatedAt,
    baseUrl: BASE_URL,
    slides,
    rows
  });

  fs.writeFileSync(COMPARE_HTML, html);

  const compareJson = {
    baselineCommit,
    currentCommit,
    generatedAt,
    baseUrl: BASE_URL,
    batchRange: { from: BATCH_FROM, to: BATCH_TO },
    slides,
    results: slides.map(slideId => ({
      slideId,
      beforePath: `before/${slideId}.png`,
      afterPath: `after/${slideId}.png`,
      beforeExists: fs.existsSync(path.join(BEFORE_DIR, `${slideId}.png`)),
      afterExists: fs.existsSync(path.join(AFTER_DIR, `${slideId}.png`)),
      metrics: metricsMap[slideId] || null
    })),
    failures: {
      beforeMissing,
      afterMissing
    }
  };

  writeJson(COMPARE_JSON, compareJson);

  if (beforeMissing.length > 0 || afterMissing.length > 0) {
    console.error('MISSING_IMAGES', { beforeMissing, afterMissing });
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('review-slides failed:', err.message);
  process.exit(1);
});
