const { chromium } = require(require('path').join(__dirname, '..', 'node_modules', 'playwright'));
const path = require('path');
async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 3 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForSelector('.slide', { timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.keyboard.press('Home');
  await page.waitForTimeout(500);
  for (let i = 1; i < 16; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(600);
  const slide = await page.$('.slide.is-active');
  if (slide) {
    const out = path.join(__dirname, '..', 'screenshots', 'osteo-risk-redesign', 'c16-3x-retina.png');
    await slide.screenshot({ path: out });
    console.log('Captured 3x retina:', out);
  }
  await browser.close();
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
