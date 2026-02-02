const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.join(__dirname, '..', '..', '_screens_before');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  for (let i = 15; i <= 27; i++) {
    const url = `http://localhost:8000/GRADE/src/index.html#${i}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForSelector('.slide.active', { timeout: 20000 });
    await page.waitForTimeout(400);
    const slide = await page.$('.slide.active');
    const outPath = path.join(outDir, `slide-${String(i).padStart(2,'0')}.png`);
    await slide.screenshot({ path: outPath });
    console.log('saved', outPath);
  }

  await browser.close();
})();
