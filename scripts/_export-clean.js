const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const maxSlides = parseInt(process.argv[2] || '19', 10);
const tempDir = 'exports/_shots';

async function run() {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir, { recursive: true });
  
  const html = fs.readFileSync('OSTEOPOROSE/src/print-clean.html', 'utf8');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1700, height: 1000 });
  await page.setContent(html, { waitUntil: 'networkidle', timeout: 60000 });
  
  const slides = await page.$$('.slide');
  const n = Math.min(maxSlides, slides.length);
  console.log('Capturing', n, 'slides...');
  
  for (let i = 0; i < n; i++) {
    await slides[i].screenshot({ path: path.join(tempDir, `${String(i+1).padStart(2,'0')}.png`) });
  }
  
  await browser.close();
  
  // Combine to PDF
  const files = fs.readdirSync(tempDir).filter(f => f.endsWith('.png')).sort();
  let pdfHtml = '<!DOCTYPE html><html><head><style>body{margin:0}img{display:block;width:1600px;height:900px;page-break-after:always}img:last-child{page-break-after:auto}</style></head><body>';
  for (const f of files) {
    pdfHtml += `<img src="data:image/png;base64,${fs.readFileSync(path.join(tempDir, f)).toString('base64')}">`;
  }
  pdfHtml += '</body></html>';
  
  const browser2 = await chromium.launch({ headless: true });
  const page2 = await browser2.newPage();
  await page2.setContent(pdfHtml, { waitUntil: 'load' });
  await page2.pdf({ path: 'exports/OSTEOPOROSE-clean-19.pdf', width: '1600px', height: '900px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser2.close();
  
  console.log('OK: exports/OSTEOPOROSE-clean-19.pdf');
}
run();
