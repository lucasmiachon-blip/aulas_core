/**
 * export-grade-all.js
 * ─────────────────────────────────────────────────────────
 * Gera PDF + Screenshots da apresentação GRADE.
 * Abordagem: monta HTML self-contained (sem servidor HTTP)
 * e usa Playwright para renderizar.
 *
 * Uso:
 *   node scripts/export-grade-all.js          # PDF + screenshots
 *   node scripts/export-grade-all.js --pdf    # Só PDF
 *   node scripts/export-grade-all.js --shots  # Só screenshots
 * ─────────────────────────────────────────────────────────
 */

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Paths ──────────────────────────────────────────────
const GRADE_SRC = path.join(__dirname, '..', 'GRADE', 'src');
const SLIDES_DIR = path.join(GRADE_SRC, 'slides');
const CSS_DIR = path.join(GRADE_SRC, 'css');
const ASSETS_DIR = path.join(GRADE_SRC, 'assets');

const EXPORTS_DIR = path.join(__dirname, '..', 'exports', 'GRADE');
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots', 'GRADE');

// ── Args ───────────────────────────────────────────────
const args = process.argv.slice(2);
const doPDF = args.length === 0 || args.includes('--pdf');
const doShots = args.length === 0 || args.includes('--shots');

// ── Helpers ────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function toDataURI(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime =
    {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      svg: 'image/svg+xml',
      gif: 'image/gif',
      webp: 'image/webp',
    }[ext] || 'application/octet-stream';
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function embedLocalImages(html, slideDir) {
  // Replace src="../assets/..." with data URIs
  return html.replace(/src=["'](\.\.\/(assets\/[^"']+))["']/g, (match, relPath, assetPath) => {
    const absPath = path.join(GRADE_SRC, assetPath);
    if (fs.existsSync(absPath)) {
      const dataUri = toDataURI(absPath);
      return `src="${dataUri}"`;
    }
    console.warn(`  ⚠️ Image not found: ${absPath}`);
    return match;
  });
}

// ── Build HTML ─────────────────────────────────────────
function buildPrintHTML() {
  console.log('📄 Building self-contained HTML...');

  // Read slide order
  const listPath = path.join(SLIDES_DIR, '_list.txt');
  const slideIds = readFile(listPath)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith('#'));

  console.log(`  📋 ${slideIds.length} slides in _list.txt`);

  // Read CSS files (order matters)
  const cssFiles = ['base.css', 'blocks.css', 'responsive-fix.css', 'print.css'];
  let allCSS = '';
  for (const file of cssFiles) {
    const p = path.join(CSS_DIR, file);
    if (fs.existsSync(p)) {
      allCSS += `/* === ${file} === */\n${readFile(p)}\n\n`;
    }
  }

  // Read and embed slides
  let allSlides = '';
  let loaded = 0;
  for (const id of slideIds) {
    const fileName = `${id}.html`;
    const filePath = path.join(SLIDES_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠️ Missing slide: ${fileName}`);
      continue;
    }
    let html = readFile(filePath);
    html = embedLocalImages(html, SLIDES_DIR);
    allSlides += `\n<!-- ${id} -->\n${html}\n`;
    loaded++;
  }
  console.log(`  ✅ ${loaded} slides loaded`);

  // Strip external font links (Google Fonts) — they won't resolve in setContent
  // Instead embed a minimal font-face fallback

  const fullHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GRADE – Print</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
${allCSS}

/* ── Print-mode overrides for self-contained export ── */
/* Make all slides visible (no viewer JS) */
.slide {
  display: flex !important;
  position: relative !important;
  inset: auto !important;
  width: 13.333in !important;
  height: 7.5in !important;
  max-width: none !important;
  max-height: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  page-break-after: always !important;
  break-after: page !important;
  overflow: hidden !important;
}
.slide:last-child {
  page-break-after: auto !important;
}

/* Hide viewer chrome */
.controls, .slide-indicator, .slide-counter {
  display: none !important;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: white !important;
  overflow: hidden !important;
}

#viewport {
  width: 13.333in !important;
  height: auto !important;
  position: static !important;
  display: block !important;
  overflow: visible !important;
  background: white !important;
  box-shadow: none !important;
  border: none !important;
}
  </style>
</head>
<body>
  <div id="viewport">
${allSlides}
  </div>
</body>
</html>`;

  return { fullHTML, slideCount: loaded };
}

// ── Export PDF ──────────────────────────────────────────
async function exportPDF(page, html) {
  console.log('\n📋 Generating PDF...');
  ensureDir(EXPORTS_DIR);

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // fonts + images

  const slidesRendered = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`  ✅ ${slidesRendered} slides rendered in browser`);

  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(500);

  const pdfPath = path.join(EXPORTS_DIR, 'GRADE-slides.pdf');
  await page.pdf({
    path: pdfPath,
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
  });

  const sizeMB = (fs.statSync(pdfPath).size / 1024 / 1024).toFixed(2);
  console.log(`  ✅ PDF saved: ${pdfPath} (${sizeMB} MB)`);
  return pdfPath;
}

// ── Export Screenshots ─────────────────────────────────
async function exportScreenshots(page, html) {
  console.log('\n📸 Generating screenshots...');
  ensureDir(SCREENSHOTS_DIR);

  // Use screen (not print) for screenshots — show slides one at a time
  await page.emulateMedia({ media: 'screen' });

  // Build a viewer-like HTML that shows one slide at a time
  // Re-load with screen styles
  const screenHTML = html.replace(
    /\/\* ── Print-mode overrides[\s\S]*?<\/style>/,
    `
/* ── Screen-mode: one slide visible at a time ── */
.slide {
  display: none !important;
  position: relative !important;
  inset: auto !important;
  width: 1600px !important;
  height: 900px !important;
  max-width: none !important;
  max-height: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: hidden !important;
}
.slide.active-shot {
  display: flex !important;
}
.controls, .slide-indicator, .slide-counter {
  display: none !important;
}
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: white !important;
  width: 1600px !important;
  height: 900px !important;
  overflow: hidden !important;
}
#viewport {
  width: 1600px !important;
  height: 900px !important;
  position: relative !important;
  overflow: hidden !important;
  background: white !important;
}
</style>`
  );

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.setContent(screenHTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`  📋 ${slideCount} slides to screenshot`);

  for (let i = 0; i < slideCount; i++) {
    // Show only slide[i]
    await page.evaluate((idx) => {
      document.querySelectorAll('.slide').forEach((s, j) => {
        s.classList.toggle('active-shot', j === idx);
      });
    }, i);
    await page.waitForTimeout(200);

    const num = String(i + 1).padStart(2, '0');
    const shotPath = path.join(SCREENSHOTS_DIR, `slide-${num}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });

    if ((i + 1) % 10 === 0 || i === slideCount - 1) {
      console.log(`  📸 ${i + 1}/${slideCount} captured`);
    }
  }

  console.log(`  ✅ Screenshots saved to: ${SCREENSHOTS_DIR}`);
}

// ── Main ───────────────────────────────────────────────
async function main() {
  console.log('🚀 GRADE Export — PDF + Screenshots\n');

  const { fullHTML, slideCount } = buildPrintHTML();
  if (slideCount === 0) {
    console.error('❌ No slides found. Check GRADE/src/slides/_list.txt');
    process.exit(1);
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
  });

  try {
    if (doPDF) {
      const pdfPage = await context.newPage();
      await exportPDF(pdfPage, fullHTML);
      await pdfPage.close();
    }

    if (doShots) {
      const shotPage = await context.newPage();
      await exportScreenshots(shotPage, fullHTML);
      await shotPage.close();
    }
  } finally {
    await browser.close();
  }

  console.log('\n🎉 Export complete!');
}

main().catch((err) => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
