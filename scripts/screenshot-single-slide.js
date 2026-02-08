const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const slideFile = process.argv[2] || 'S08_slide-08.html';
const outName = process.argv[3] || 'S08_v1.png';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });

  const root = path.resolve(__dirname, '..');
  const slidePath = path.join(root, 'OSTEOPOROSE', 'src', 'slides', slideFile);
  const baseCSSPath = path.join(root, 'OSTEOPOROSE', 'src', 'css', 'base.css');

  const slideHtml = fs.readFileSync(slidePath, 'utf8');
  const baseCSS = fs.readFileSync(baseCSSPath, 'utf8');

  const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${baseCSS}
    html, body { margin:0; padding:0; width:1600px; height:900px; overflow:hidden; background:var(--bg); }
    .slide { display:block; width:1600px; height:900px; overflow:hidden; position:relative; }
    .slide.slide--center { display:flex; align-items:center; justify-content:center; }
  </style>
</head>
<body>${slideHtml}</body>
</html>`;

  await page.setContent(fullHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outDir = path.join(root, 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.screenshot({ path: path.join(outDir, outName), fullPage: false });
  console.log('OK:', outName);
  await browser.close();
})();
