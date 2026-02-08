// Screenshot audit script — captures slides at 2x DPI for visual QA
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://127.0.0.1:8787';
const TARGETS = [
  { pos: 10, key: 'S14', label: 'Caso Clínico pergunta' },
  { pos: 11, key: 'S19', label: 'DM2 Paradoxo' },
  { pos: 12, key: 'S14b', label: 'Caso Clínico resposta' },
];
const VP = { width: 1600, height: 900 };
const OUT = path.join(__dirname, 'screenshots');
const SUFFIX = process.argv[2] || 'before';

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: 2,
  });

  for (const t of TARGETS) {
    const page = await ctx.newPage();
    console.log(`[pos${t.pos}] Navigating... (${t.label})`);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for deck:loaded
    await page.waitForFunction(
      () => {
        const slides = document.querySelectorAll('[data-slide]');
        return slides.length > 20;
      },
      { timeout: 10000 }
    );
    await page.waitForTimeout(500);

    // Navigate via hash
    await page.evaluate((key) => {
      window.location.hash = key;
    }, t.key);
    await page.waitForTimeout(800);

    // Verify
    const info = await page.evaluate(() => {
      const active = document.querySelector('.slide.is-active, .slide:not([hidden])');
      if (!active) return 'NO ACTIVE';
      return active.getAttribute('data-title') || active.id || 'unknown';
    });
    console.log(`  Active: "${info}"`);

    // Screenshot
    const deck = page.locator('.deck').first();
    const box = await deck.boundingBox();
    if (box) {
      const fname = `pos${t.pos}-${SUFFIX}.png`;
      await deck.screenshot({ path: path.join(OUT, fname) });
      console.log(`  Saved ${fname}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('Done.');
})();
