/**
 * Diagnostic: capture representative slides at 2× DPI for analysis
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const GRADE_SRC = path.join(ROOT, 'GRADE', 'src');
const SHOTS = path.join(ROOT, 'screenshots');
if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true });

// Target slides (by position in _list.txt, 0-based)
// 0:S01(cover) 3:S05 6:S09 7:S36 9:S07 14:S14 22:S19 30:S54 31:S55 34:S59
const targets = [0, 3, 6, 7, 9, 14, 22, 30, 31, 34];

function startServer(root, port) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let fp = path.join(root, decodeURIComponent(req.url === '/' ? '/index.html' : req.url));
      fs.readFile(fp, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const ext = path.extname(fp).toLowerCase();
        const ct = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'text/javascript',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.woff2': 'font/woff2',
          '.json': 'application/json',
        };
        res.writeHead(200, { 'Content-Type': ct[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    srv.listen(port, () => resolve(srv));
  });
}

(async () => {
  const srv = await startServer(ROOT, 9878);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  await page.goto('http://localhost:9878/GRADE/src/index.html', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await page.waitForFunction(() => document.querySelectorAll('.slide').length > 30, { timeout: 15000 });
  await page.waitForTimeout(2000);

  const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Total slides: ${total}`);

  // Read _list to map position -> slide ID
  const listPath = path.join(GRADE_SRC, 'slides', '_list.txt');
  const slideIds = fs
    .readFileSync(listPath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let cur = 0;
  for (const idx of targets) {
    if (idx >= total) continue;
    // Navigate to target
    while (cur < idx) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(120);
      cur++;
    }
    const slideId = slideIds[idx] || `pos${idx}`;
    const el = await page.$('.slide.active');
    if (el) {
      const buf = await el.screenshot({ type: 'png' });
      const fname = `BEFORE_${String(idx + 1).padStart(2, '0')}_${slideId}.png`;
      fs.writeFileSync(path.join(SHOTS, fname), buf);
      console.log(`  ${fname}`);
    }
  }

  await browser.close();
  srv.close();
  console.log('Done — screenshots in screenshots/');
})();
