#!/usr/bin/env node
/**
 * shot.cjs — Screenshot de slide individual (OSTEOPOROSE ou GRADE)
 *
 * Uso:
 *   node scripts/shot.cjs GRADE S09           → screenshots/GRADE_S09.png
 *   node scripts/shot.cjs OSTEO S08b          → screenshots/OSTEO_S08b.png
 *   node scripts/shot.cjs GRADE S09 after     → screenshots/GRADE_S09_after.png
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const BROWSER_PATH = '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome';

const project = (process.argv[2] || 'GRADE').toUpperCase();
const slideId = process.argv[3] || 'S01';
const suffix = process.argv[4] || '';

const root = path.resolve(__dirname, '..');

// Resolve project paths
let srcDir, cssFiles;
if (project === 'GRADE') {
  srcDir = path.join(root, 'GRADE', 'src');
  cssFiles = ['css/base.css', 'css/blocks.css'];
} else {
  srcDir = path.join(root, 'OSTEOPOROSE', 'src');
  cssFiles = ['css/base.css', 'css/blocks.css', 'css/polish.css'];
}

// Find the slide file
const slidesDir = path.join(srcDir, 'slides');
const files = fs.readdirSync(slidesDir);
const slideFile = files.find(f =>
  f.startsWith(slideId + '_') || f.startsWith(slideId + '.') || f === slideId + '.html'
);

if (!slideFile) {
  console.error(`Slide not found: ${slideId} in ${slidesDir}`);
  console.error('Available:', files.filter(f => f.endsWith('.html')).slice(0, 10).join(', '), '...');
  process.exit(1);
}

(async () => {
  const slideHtml = fs.readFileSync(path.join(slidesDir, slideFile), 'utf8');

  const allCSS = cssFiles
    .map(f => {
      const p = path.join(srcDir, f);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    })
    .join('\n');

  const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Georgia&display=swap" rel="stylesheet">
  <style>
    ${allCSS}
    html, body { margin:0; padding:0; width:1600px; height:900px; overflow:hidden; background:var(--bg, #f8fafc); }
    .slide {
      display:flex !important;
      width:1600px; height:900px;
      overflow:hidden; position:relative;
      max-width:1600px; max-height:900px;
      inset:0; margin:0;
    }
    .slide.slide--center { align-items:center; justify-content:center; }
  </style>
</head>
<body>${slideHtml}</body>
</html>`;

  const browser = await chromium.launch({
    executablePath: BROWSER_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.setContent(fullHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outDir = path.join(root, 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const tag = suffix ? '_' + suffix : '';
  const outName = project + '_' + slideId + tag + '.png';
  await page.screenshot({ path: path.join(outDir, outName), fullPage: false });

  console.log('OK: screenshots/' + outName);
  await browser.close();
})();
