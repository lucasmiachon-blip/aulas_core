/**
 * export-grade-pptx.js
 * ─────────────────────────────────────────────────────────
 * Gera PPTX da apresentação GRADE via screenshots (Playwright + PptxGenJS).
 * Cada slide é capturado como imagem 1920×1080 e inserido fullscreen no PPTX.
 *
 * Uso:
 *   node scripts/export-grade-pptx.js
 * ─────────────────────────────────────────────────────────
 */

import { chromium } from 'playwright';
import PptxGenJS from 'pptxgenjs';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Paths ──────────────────────────────────────────────
const GRADE_SRC = path.join(__dirname, '..', 'GRADE', 'src');
const SLIDES_DIR = path.join(GRADE_SRC, 'slides');
const CSS_DIR = path.join(GRADE_SRC, 'css');
const EXPORTS_DIR = path.join(__dirname, '..', 'exports', 'GRADE');

const SLIDE_W = 1920;
const SLIDE_H = 1080;

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

function embedLocalImages(html) {
  return html.replace(/src=["'](\.\.\/(assets\/[^"']+))["']/g, (match, relPath, assetPath) => {
    const absPath = path.join(GRADE_SRC, assetPath);
    if (fs.existsSync(absPath)) {
      return `src="${toDataURI(absPath)}"`;
    }
    console.warn(`  ⚠️ Image not found: ${absPath}`);
    return match;
  });
}

// ── Build HTML ─────────────────────────────────────────
function buildScreenHTML() {
  console.log('📄 Building self-contained HTML...');

  const listPath = path.join(SLIDES_DIR, '_list.txt');
  const slideIds = readFile(listPath)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith('#'));

  console.log(`  📋 ${slideIds.length} slides in _list.txt`);

  // Read CSS
  const cssFiles = ['base.css', 'blocks.css', 'responsive-fix.css'];
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
    html = embedLocalImages(html);
    allSlides += `\n<!-- ${id} -->\n${html}\n`;
    loaded++;
  }
  console.log(`  ✅ ${loaded} slides loaded`);

  const fullHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
${allCSS}

/* ── Screenshot mode: one slide at a time, exact 16:9 ── */
.slide {
  display: none !important;
  position: relative !important;
  inset: auto !important;
  width: ${SLIDE_W}px !important;
  height: ${SLIDE_H}px !important;
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
  width: ${SLIDE_W}px !important;
  height: ${SLIDE_H}px !important;
  overflow: hidden !important;
}
#viewport {
  width: ${SLIDE_W}px !important;
  height: ${SLIDE_H}px !important;
  position: relative !important;
  overflow: hidden !important;
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

// ── Main ───────────────────────────────────────────────
async function main() {
  console.log('🚀 GRADE → PPTX Export\n');

  const { fullHTML, slideCount } = buildScreenHTML();
  if (slideCount === 0) {
    console.error('❌ No slides found.');
    process.exit(1);
  }

  ensureDir(EXPORTS_DIR);

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await (
    await browser.newContext({ viewport: { width: SLIDE_W, height: SLIDE_H } })
  ).newPage();

  await page.setContent(fullHTML, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // fonts + images

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`📸 ${totalSlides} slides to capture at ${SLIDE_W}×${SLIDE_H}\n`);

  // Create PPTX
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE';
  pptx.author = 'GRADE Export';
  pptx.title = 'GRADE — Diretriz Brasileira de Prevenção Cardiovascular';

  // Capture each slide
  for (let i = 0; i < totalSlides; i++) {
    // Show only this slide
    await page.evaluate((idx) => {
      document.querySelectorAll('.slide').forEach((s, j) => {
        s.classList.toggle('active-shot', j === idx);
      });
    }, i);
    await page.waitForTimeout(150);

    // Screenshot as buffer
    const buffer = await page.screenshot({
      fullPage: false,
      type: 'png',
    });

    // Add to PPTX as base64
    const base64 = buffer.toString('base64');
    const slide = pptx.addSlide();
    slide.addImage({
      data: `image/png;base64,${base64}`,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });

    const num = i + 1;
    if (num % 10 === 0 || num === totalSlides) {
      console.log(`  📸 ${num}/${totalSlides} captured`);
    }
  }

  await browser.close();

  // Save PPTX
  // Try default name; fallback with timestamp if locked
  let pptxPath = path.join(EXPORTS_DIR, 'GRADE-slides.pptx');
  try {
    const fd = fs.openSync(pptxPath, 'r+');
    fs.closeSync(fd);
  } catch (e) {
    if (e.code === 'EBUSY') {
      const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      pptxPath = path.join(EXPORTS_DIR, `GRADE-slides-${ts}.pptx`);
      console.log(`  ⚠️ File locked, saving as: ${path.basename(pptxPath)}`);
    }
  }
  await pptx.writeFile({ fileName: pptxPath });

  const sizeMB = (fs.statSync(pptxPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n✅ PPTX saved: ${pptxPath} (${sizeMB} MB)`);
  console.log('🎉 Done!');
}

main().catch((err) => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
