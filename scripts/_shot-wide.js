// Screenshot counters 5-19 at 2x DPI for cross-slide comparison
const { chromium } = require(require('path').join(__dirname, '..', 'node_modules', 'playwright'));
const path = require('path');
const fs = require('fs');

async function run() {
  const outDir = path.join(__dirname, '..', 'screenshots', 'osteo-wide-audit');
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

  const START = 5;
  const END = 19;

  // Navigate to first slide
  await page.keyboard.press('Home');
  await page.waitForTimeout(500);
  for (let i = 1; i < START; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(120);
  }

  // Capture
  for (let s = START; s <= END; s++) {
    await page.waitForTimeout(400);
    const slide = await page.$('.slide.is-active');
    if (slide) {
      const outFile = path.join(outDir, `c${String(s).padStart(2, '0')}.png`);
      await slide.screenshot({ path: outFile });
      console.log(`c${s}`);
    }
    if (s < END) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(120);
    }
  }

  await browser.close();
  console.log('Done!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
