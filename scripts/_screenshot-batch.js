const { chromium } = require(require('path').join(__dirname, '..', 'node_modules', 'playwright'));
const path = require('path');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 3 });
  const outDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  // Only S14 (counter 13) at max quality
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8000/GRADE/src/index.html#13', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  const slide = await page.$('.slide.active');
  await (slide || page).screenshot({ path: path.join(outDir, 's14_align_3x.png') });
  console.log('S14 alignment screenshot done');
  await page.close();
  await browser.close();
})();
