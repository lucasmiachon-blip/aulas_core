const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const maxSlides = parseInt(process.argv[2] || '19', 10);
const outputDir = path.join(__dirname, '..', 'exports');
const tempDir = path.join(outputDir, '_shots');

async function run() {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir, { recursive: true });
  
  const printPath = path.resolve(__dirname, '..', 'OSTEOPOROSE', 'src', 'print.html');
  const html = fs.readFileSync(printPath, 'utf8');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1700, height: 1000 });
  
  await page.setContent(html, { waitUntil: 'networkidle', timeout: 60000 });
  
  const slides = await page.$$('.slide');
  const toCapture = Math.min(maxSlides, slides.length);
  console.log(`Capturing ${toCapture} slides...`);
  
  for (let i = 0; i < toCapture; i++) {
    await slides[i].screenshot({
      path: path.join(tempDir, `${String(i+1).padStart(2,'0')}.png`),
      type: 'png'
    });
    process.stdout.write(`\r  ${i+1}/${toCapture}`);
  }
  console.log(' OK');
  await browser.close();
  
  console.log('Screenshots:', tempDir);
}
run().catch(e => console.error(e));
