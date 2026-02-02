// Captura o slide 21 (#21) para debug. Uso: node screenshot-slide.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const url = 'http://localhost:8000/GRADE/src/index.html#21';
  const out = path.join(__dirname, '..', 'GRADE', 'exports', 'slide-21-debug.png');
  const outDir = path.dirname(out);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForSelector('.slide.active', { timeout: 10000 });
  await page.waitForFunction(() => document.querySelectorAll('.slide').length >= 40, { timeout: 10000 });
  await page.waitForFunction(() => {
    const a = document.querySelector('.slide.active');
    const id = a && a.getAttribute('data-slide-id');
    return id === 'S48' || (document.getElementById('currentSlide') && parseInt(document.getElementById('currentSlide').textContent, 10) === 21);
  }, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(500);

  const slide = await page.$('.slide.active');
  if (slide) {
    await slide.screenshot({ path: out });
    console.log('Screenshot:', out);
  }
  await browser.close();
}

run().catch(e => { console.error(e); process.exit(1); });
