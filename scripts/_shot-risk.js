// Screenshot counters 14-19 at 2x DPI for retina QA (includes neighbors)
const { chromium } = require(require('path').join(__dirname, '..', 'node_modules', 'playwright'));
const path = require('path');
const fs = require('fs');

async function run() {
  const outDir = path.join(__dirname, '..', 'screenshots', 'osteo-risk-redesign');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });

  const url = 'http://localhost:8080/index.html';
  console.log('Loading:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForSelector('.slide', { timeout: 10000 });
  await page.waitForTimeout(2000);

  // Navigate to slide 14
  await page.keyboard.press('Home');
  await page.waitForTimeout(500);
  for (let i = 1; i < 14; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
  }

  // Capture slides 14-19
  for (let s = 14; s <= 19; s++) {
    await page.waitForTimeout(500);
    const slide = await page.$('.slide.is-active');
    if (slide) {
      const outFile = path.join(outDir, `counter-${s}-2x.png`);
      await slide.screenshot({ path: outFile });
      console.log(`Captured counter ${s} @2x: ${outFile}`);
    } else {
      console.log(`No active slide for counter ${s}`);
    }
    if (s < 19) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(150);
    }
  }

  await browser.close();
  console.log('Done!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
