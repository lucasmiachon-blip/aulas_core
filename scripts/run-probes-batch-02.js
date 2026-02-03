const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.BASE_URL || 'http://127.0.0.1:5501/OSTEOPOROSE/src/index.html';
const slides = ['S06', 'S07', 'S08', 'S09', 'S10'];
const probe = fs.readFileSync(path.join(__dirname, 'probes', 'batch-02-c1-c2.js'), 'utf8');

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

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const results = {};

  try {
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    await waitForDeck(page);
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

    for (const key of slides) {
      await page.goto(`${base}#${key}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await waitForActiveSlide(page, key);
      await page.waitForTimeout(150);
      const json = await page.evaluate(probe);
      if (!json) {
        results[key] = { error: 'NO_RESULT' };
      } else {
        results[key] = JSON.parse(json);
      }
    }

    console.log(JSON.stringify(results, null, 2));
  } finally {
    await page.close();
    await browser.close();
  }
}

run().catch((err) => {
  console.error('probe failed:', err.message);
  process.exit(1);
});
