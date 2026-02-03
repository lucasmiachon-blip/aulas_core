const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5501/OSTEOPOROSE/src/index.html';
const SLIDES = (process.env.SLIDES || 'S01')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const OUT_DIR = process.env.OUT_DIR || path.join(__dirname, '..', 'exports', 'review', 'batch-01', 'before');

const VIEWPORT = { width: 1600, height: 900 };

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function waitForDeck(page) {
  await page.waitForFunction(
    () => {
      if (window.__OSTEOPOROSE_DECK && window.__OSTEOPOROSE_DECK.loaded === true) return true;
      if (window.__viewer && window.__viewer.slides && window.__viewer.slides.length > 0) return true;
      return document.querySelectorAll('.slide').length > 0;
    },
    { timeout: 15000 }
  );
}

async function waitForActiveSlide(page, key) {
  await page.waitForFunction(
    (k) => {
      const active = document.querySelector('.slide.is-active, .slide.active');
      if (!active) return false;
      const datasetKey = active.dataset && (active.dataset.key || active.dataset.slide);
      if (datasetKey) return datasetKey === k;
      if (active.id && k.startsWith('S')) {
        const num = parseInt(k.slice(1), 10);
        return active.id === `slide-${num}`;
      }
      return true;
    },
    key,
    { timeout: 8000 }
  );
}

async function screenshotStage(page, outputPath) {
  try {
    const locator = page.locator('.stage__inner');
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await locator.screenshot({ path: outputPath, type: 'png' });
    return;
  } catch (err) {
    if (String(err.message || '').includes('not attached')) {
      const retry = page.locator('.stage__inner');
      await retry.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await retry.screenshot({ path: outputPath, type: 'png' });
      return;
    }
    const fallback = await page.$('.stage__inner');
    if (fallback) {
      const box = await fallback.boundingBox();
      if (box) {
        await page.screenshot({ path: outputPath, type: 'png', clip: box });
        return;
      }
    }
    await page.screenshot({ path: outputPath, type: 'png', clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height } });
  }
}

async function run() {
  ensureDir(OUT_DIR);

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await waitForDeck(page);
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

    for (const key of SLIDES) {
      await page.goto(`${BASE_URL}#${key}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await waitForActiveSlide(page, key);
      await page.waitForTimeout(150);

      const outputPath = path.join(OUT_DIR, `${key}.png`);
      await screenshotStage(page, outputPath);
      process.stdout.write(`\r${key} ✓`);
    }

    await page.close();
  } finally {
    await browser.close();
  }

  process.stdout.write('\n');
  console.log(`Saved to: ${OUT_DIR}`);
}

run().catch((err) => {
  console.error('Capture failed:', err.message);
  process.exit(1);
});
