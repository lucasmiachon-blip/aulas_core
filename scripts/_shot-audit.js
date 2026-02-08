// Screenshot audit script — captures slides at 2x DPI for visual QA
const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://127.0.0.1:8787';
const POSITIONS = [10, 11, 12]; // S14, S19, S14b
const VP = { width: 1600, height: 900 };
const OUT = path.join(__dirname, '..', 'screenshots');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: 2,
  });

  for (const pos of POSITIONS) {
    const page = await ctx.newPage();
    const url = `${BASE}/index.html#${pos}`;
    console.log(`Navigating to position ${pos}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    // Wait for slides to load
    await page.waitForTimeout(2000);
    // Navigate to the correct slide via keyboard
    // First go to slide 1, then press right arrow (pos-1) times
    await page.evaluate((targetPos) => {
      if (typeof setActive === 'function') setActive(targetPos - 1);
    }, pos);
    await page.waitForTimeout(800);

    // Get slide info for filename
    const slideInfo = await page.evaluate(() => {
      const active = document.querySelector('.slide.active');
      if (!active) return { file: 'unknown', title: '' };
      return {
        file: active.getAttribute('data-slide') || active.id || 'unknown',
        title: active.getAttribute('data-title') || '',
      };
    });

    // Capture the .deck element
    const deck = page.locator('.deck').first();
    const fname = `pos${pos}-before.png`;
    await deck.screenshot({ path: path.join(OUT, fname) });
    console.log(`  Saved ${fname} (${slideInfo.title})`);
    await page.close();
  }

  await browser.close();
  console.log('Done.');
})();
