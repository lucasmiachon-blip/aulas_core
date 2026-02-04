const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

function stripExternalFontLinks(html) {
  // In some locked-down environments, external requests (fonts.googleapis.com) can hang or be blocked.
  // The slides are designed to gracefully fall back to system fonts.
  return html
    .replace(/<link[^>]+rel=["']preconnect["'][^>]*>\s*/gi, '')
    .replace(/<link[^>]+href=["']https:\/\/fonts\.googleapis\.com[^"']+["'][^>]*>\s*/gi, '');
}

function inlineLocalImages(html, baseDir) {
  // Rewrites <img src="relative/path.png"> into data URIs so that exports don't depend on file/http access.
  const mimeByExt = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  return html.replace(/<img\b([^>]*?)\ssrc=(["'])([^"']+)\2([^>]*)>/gi, (m, pre, quote, src, post) => {
    // Skip already-inlined or remote assets
    if (/^(data:|https?:|blob:)/i.test(src)) return m;

    const abs = path.resolve(baseDir, src);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return m;

    const ext = path.extname(abs).toLowerCase();
    const mime = mimeByExt[ext] || 'application/octet-stream';
    const b64 = fs.readFileSync(abs).toString('base64');
    const data = `data:${mime};base64,${b64}`;
    return `<img${pre} src=${quote}${data}${quote}${post}>`;
  });
}

function resolveChromiumExecutable() {
  const fromEnv = process.env.CHROMIUM_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (fromEnv) return fromEnv;
  try {
    const p = execSync('command -v chromium || command -v chromium-browser || command -v google-chrome || command -v google-chrome-stable', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return p || null;
  } catch (e) {
    return null;
  }
}

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  const exportUrl = process.env.EXPORT_URL;
  const exportBase = process.env.EXPORT_BASE_URL || 'http://127.0.0.1:5500';
  const urlCandidates = exportUrl
    ? [exportUrl]
    : [
        `${exportBase}/index.html?print=1`,
        `${exportBase}/print.html`,
        `${exportBase}/OSTEOPOROSE/src/index.html?print=1`,
        `${exportBase}/OSTEOPOROSE/src/print.html`,
      ];

  const outputDir = path.join(__dirname, '..', 'OSTEOPOROSE', 'exports');
  const outputPath = path.join(outputDir, 'OSTEOPOROSE-slides.pdf');
  const samplePath = path.join(outputDir, 'export-sample.png');
  const debugPng = path.join(outputDir, 'export-debug.png');
  const debugHtml = path.join(outputDir, 'export-debug.html');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const executablePath = resolveChromiumExecutable();
  const browser = await chromium.launch({
    headless: true,
    executablePath: executablePath || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  let finalUrl = null;
  let httpStatus = null;

  try {
    let page = await browser.newPage();
    // Mantém consistência com o palco 16:9 do viewer (1600×900) e reduz variações por viewport.
    await page.setViewportSize({ width: 1600, height: 900 });

    // --- URL loading ---
    let loaded = false;
    let usedSetContentFallback = false;
    const attempts = [];
    for (const candidate of urlCandidates) {
      try {
        console.log('📄 try URL:', candidate);
        const response = await page.goto(candidate, { waitUntil: 'domcontentloaded', timeout: 60000 });
        const status = response ? response.status() : null;
        const ok = status === 200;
        attempts.push({ url: candidate, status });
        console.log('📄 status:', status, ok ? 'OK' : 'FAIL');
        if (!ok) continue;
        loaded = true;
        finalUrl = candidate;
        httpStatus = status;
        break;
      } catch (e) {
        attempts.push({ url: candidate, status: null, error: e?.message || String(e) });
        console.warn('⚠️ Falhou:', candidate, e?.message || '');
      }
    }

    // Fallback for locked-down Chromium policies (ERR_BLOCKED_BY_ADMINISTRATOR) where navigation is denied.
    if (!loaded) {
      const printHtmlPath = path.join(__dirname, '..', 'OSTEOPOROSE', 'src', 'print.html');
      if (!fs.existsSync(printHtmlPath)) {
        throw new Error(`Nenhuma URL funcionou e print.html não foi encontrado. Tentativas: ${JSON.stringify(attempts)}`);
      }

      console.log('🛟 Fallback: carregando print.html via page.setContent (sem navegação)...');

      // Some failed navigations can leave the execution context in a bad state;
      // create a fresh page for a reliable setContent() path.
      try {
        await page.close();
      } catch {}
      page = await browser.newPage();
      await page.setViewportSize({ width: 1600, height: 900 });

      const baseDir = path.dirname(printHtmlPath);
      let html = fs.readFileSync(printHtmlPath, 'utf8');
      html = stripExternalFontLinks(html);
      html = inlineLocalImages(html, baseDir);
      await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });

      usedSetContentFallback = true;
      loaded = true;
      finalUrl = `SET_CONTENT:${printHtmlPath}`;
      httpStatus = 'SET_CONTENT';
    }

    // --- Wait for at least one slide (fix: use waitForSelector) ---
    console.log('⏳ Aguardando slides...');
    try {
      await page.waitForSelector('.slide', { timeout: 60000 });
    } catch (e) {
      // Will be caught by SLIDES_FINAL == 0 check below
    }

    // --- Wait for resources ---
    await page.waitForLoadState('networkidle');

    // --- Wait for fonts ---
    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });
    } catch (e) {
      console.log('⚠️ Fontes podem não estar prontas, continuando...');
    }

    // --- Emulate print media ---
    await page.emulateMedia({ media: 'print' });

    // --- Stabilized slide count (poll every 200ms, stable after 3 consecutive equal reads, max 30s) ---
    console.log('⏳ Estabilizando contagem de slides...');
    let SLIDES_FINAL = 0;
    let SLIDES_HIDDEN_ATTR = 0;
    const STABILITY_READS = 3;
    const POLL_INTERVAL = 200;
    const MAX_WAIT = 30000;
    let stableCount = 0;
    let lastTotal = -1;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT) {
      const { total, hiddenAttr } = await page.evaluate(() => ({
        total: document.querySelectorAll('.slide').length,
        hiddenAttr: document.querySelectorAll('.slide[hidden]').length
      }));

      if (total === lastTotal && total > 0) {
        stableCount++;
        if (stableCount >= STABILITY_READS) {
          SLIDES_FINAL = total;
          SLIDES_HIDDEN_ATTR = hiddenAttr;
          break;
        }
      } else {
        stableCount = 0;
        lastTotal = total;
      }
      await page.waitForTimeout(POLL_INTERVAL);
    }

    // If loop ended without stabilizing, read final value
    if (SLIDES_FINAL === 0) {
      const { total, hiddenAttr } = await page.evaluate(() => ({
        total: document.querySelectorAll('.slide').length,
        hiddenAttr: document.querySelectorAll('.slide[hidden]').length
      }));
      SLIDES_FINAL = total;
      SLIDES_HIDDEN_ATTR = hiddenAttr;
    }

    console.log(`✅ SLIDES_FINAL=${SLIDES_FINAL}, SLIDES_HIDDEN_ATTR=${SLIDES_HIDDEN_ATTR}`);

    // --- Fail if no slides ---
    if (SLIDES_FINAL === 0) {
      await page.screenshot({ path: debugPng, fullPage: false });
      fs.writeFileSync(debugHtml, await page.content(), 'utf8');
      throw new Error('SLIDES_FINAL=0 (debug salvo em exports/export-debug.png e export-debug.html)');
    }

    // --- Read first slide metrics (read-only, no mutation) ---
    const slideMetrics = await page.evaluate(() => {
      const firstSlide = document.querySelector('.slide');
      if (!firstSlide) return { rect: 'N/A', computed: 'N/A', ratio: 'N/A' };
      const rect = firstSlide.getBoundingClientRect();
      const computed = window.getComputedStyle(firstSlide);
      const ratio = rect.height > 0 ? (rect.width / rect.height).toFixed(4) : 'N/A';
      return {
        rect: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
        computed: `${computed.width}x${computed.height}`,
        ratio
      };
    });


    // --- Sample screenshot (optional, non-fatal) ---
    // Captura do viewport (sem locator) para auditoria visual rápida.
    try {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      await page.screenshot({ path: samplePath, fullPage: false });
    } catch (e) {
      console.warn('⚠️ sample screenshot skipped:', e.message);
    }

    // --- Generate PDF (rely on CSS @page, no width/height override) ---
    await page.pdf({
      path: outputPath,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    // --- Parseable logs ---
    console.log(`EXPORT_URL_USED=${finalUrl}`);
    console.log(`HTTP_STATUS=${httpStatus}`);
    console.log(`SLIDES_FINAL=${SLIDES_FINAL}`);
    console.log(`SLIDES_HIDDEN_ATTR=${SLIDES_HIDDEN_ATTR}`);
    console.log(`FIRST_SLIDE_RECT=${slideMetrics.rect}`);
    console.log(`FIRST_SLIDE_COMPUTED=${slideMetrics.computed}`);
    console.log(`FIRST_SLIDE_RATIO=${slideMetrics.ratio}`);
    console.log(`PDF_PATH_ABS=${outputPath}`);
    console.log('✅ PDF gerado com sucesso.');

    // --- Cleanup stale duplicate PDFs (avoid confusion between exports vs assets/pdf) ---
    // NOTE: the canonical artifact lives in /OSTEOPOROSE/exports.
    try {
      const stalePdf = path.join(__dirname, '..', 'OSTEOPOROSE', 'assets', 'pdf', 'OSTEOPOROSE-slides.pdf');
      if (fs.existsSync(stalePdf)) {
        fs.unlinkSync(stalePdf);
        console.log(`🧹 Removed stale PDF duplicate: ${stalePdf}`);
      }
    } catch (e) {
      console.warn('⚠️ stale pdf cleanup skipped:', e.message);
    }

  } finally {
    await browser.close();
  }
}

exportPDF().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
