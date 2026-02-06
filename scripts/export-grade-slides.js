/**
 * Export GRADE presentation — PDF + PPTX (screenshot-based)
 *
 * Usage:
 *   node scripts/export-grade-slides.js              # all slides
 *   node scripts/export-grade-slides.js --max 36     # first 36 slides only
 *   node scripts/export-grade-slides.js --pdf        # PDF only
 *   node scripts/export-grade-slides.js --pptx       # PPTX only
 */

const { chromium } = require('playwright');
const path   = require('path');
const fs     = require('fs');
const http   = require('http');

// --------------- CLI args ---------------
const args = process.argv.slice(2);
const maxSlides = (() => {
  const idx = args.indexOf('--max');
  return idx >= 0 ? parseInt(args[idx + 1], 10) : Infinity;
})();
const hasExplicit = args.includes('--pdf') || args.includes('--pptx');
const doPDF  = !hasExplicit || args.includes('--pdf');
const doPPTX = !hasExplicit || args.includes('--pptx');

// --------------- paths ---------------
const ROOT       = path.join(__dirname, '..');
const EXPORTS    = path.join(ROOT, 'exports');
const GRADE_SRC  = path.join(ROOT, 'GRADE', 'src');

if (!fs.existsSync(EXPORTS)) fs.mkdirSync(EXPORTS, { recursive: true });

// --------------- tiny static server ---------------
function startServer(root, port) {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let fp = path.join(root, decodeURIComponent(req.url === '/' ? '/index.html' : req.url));
      fs.readFile(fp, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        const ext = path.extname(fp).toLowerCase();
        const ct = { '.html':'text/html','.css':'text/css','.js':'text/javascript',
                     '.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml',
                     '.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf' };
        res.writeHead(200, { 'Content-Type': ct[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    srv.listen(port, () => resolve(srv));
  });
}

// --------------- build self-contained HTML ---------------
function buildHTML(slideIds) {
  const indexHTML = fs.readFileSync(path.join(GRADE_SRC, 'index.html'), 'utf8');

  // Read CSS
  const cssFiles = ['base.css','blocks.css','responsive-fix.css','print.css'];
  let cssBlock = '';
  for (const f of cssFiles) {
    const fp = path.join(GRADE_SRC, 'css', f);
    if (fs.existsSync(fp)) cssBlock += `<style>/* ${f} */\n${fs.readFileSync(fp,'utf8')}\n</style>\n`;
  }

  // Read slides — each file IS the slide (contains <div class="slide">),
  // so we inject directly, no extra wrapper needed
  let slidesHTML = '';
  for (const id of slideIds) {
    const fp = path.join(GRADE_SRC, 'slides', `${id}.html`);
    if (fs.existsSync(fp)) {
      slidesHTML += fs.readFileSync(fp, 'utf8') + '\n';
    }
  }

  // Build simple viewer JS (no fetch)
  const viewerJS = `
  <script>
  (function(){
    const slides = document.querySelectorAll('.slide');
    let cur = 0;
    function show(i) {
      slides.forEach((s,idx) => { s.classList.toggle('active', idx===i); });
      cur = i;
      document.getElementById('currentSlide').textContent = i+1;
      document.getElementById('totalSlides').textContent = slides.length;
    }
    show(0);
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (cur < slides.length-1) show(cur+1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (cur > 0) show(cur-1); }
    });
    document.getElementById('prevBtn').onclick = () => { if(cur>0) show(cur-1); };
    document.getElementById('nextBtn').onclick = () => { if(cur<slides.length-1) show(cur+1); };
  })();
  </script>`;

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>GRADE Export</title>
${cssBlock}
</head><body>
<div class="controls" aria-label="Controles">
  <button class="nav-btn" id="prevBtn" type="button">Anterior</button>
  <div class="slide-indicator"><span id="currentSlide">--</span> / <span id="totalSlides">--</span></div>
  <button class="nav-btn" id="nextBtn" type="button">Proximo</button>
</div>
<div id="viewport" aria-label="Slides">
${slidesHTML}
</div>
${viewerJS}
</body></html>`;
}

// --------------- main ---------------
async function main() {
  // Read slide IDs from _list.txt
  const listPath = path.join(GRADE_SRC, 'slides', '_list.txt');
  let slideIds = fs.readFileSync(listPath, 'utf8')
    .split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const totalAvailable = slideIds.length;
  if (maxSlides < totalAvailable) {
    slideIds = slideIds.slice(0, maxSlides);
  }
  const count = slideIds.length;
  console.log(`\nExporting ${count} of ${totalAvailable} slides (max=${maxSlides === Infinity ? 'all' : maxSlides})`);
  console.log(`  PDF: ${doPDF ? 'yes' : 'skip'}  |  PPTX: ${doPPTX ? 'yes' : 'skip'}\n`);

  // Build self-contained HTML
  const html = buildHTML(slideIds);
  const tmpHTML = path.join(EXPORTS, '_grade_export_tmp.html');
  fs.writeFileSync(tmpHTML, html, 'utf8');

  // Start server for assets (images etc.)
  const server = await startServer(ROOT, 9877);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

    // Load self-contained file through server so relative paths work
    // We wrote to exports/ but slides reference ../GRADE/src/assets — use server
    // Actually let's load through the server pointing at ROOT
    fs.writeFileSync(path.join(ROOT, '_grade_export_tmp.html'), html, 'utf8');
    await page.goto('http://localhost:9877/_grade_export_tmp.html', {
      waitUntil: 'networkidle', timeout: 30000
    });

    await page.waitForFunction(() => document.querySelectorAll('.slide').length > 0, { timeout: 15000 });
    await page.waitForTimeout(2000);

    const detected = await page.evaluate(() => document.querySelectorAll('.slide').length);
    console.log(`  Slides detected in DOM: ${detected}`);

    // ---------- SCREENSHOTS (for PPTX) ----------
    let screenshots = [];
    if (doPPTX) {
      console.log('\n  Capturing screenshots...');
      for (let i = 0; i < detected; i++) {
        // Navigate
        if (i > 0) {
          await page.keyboard.press('ArrowRight');
          await page.waitForTimeout(150);
        }
        // Capture active slide
        const el = await page.$('.slide.active');
        if (el) {
          const buf = await el.screenshot({ type: 'png' });
          screenshots.push(buf);
          process.stdout.write(`    slide ${i + 1}/${detected}\r`);
        }
      }
      console.log(`\n  ${screenshots.length} screenshots captured`);
    }

    // ---------- PDF ----------
    if (doPDF) {
      console.log('\n  Generating PDF...');
      // Show all slides for print
      await page.evaluate(() => {
        document.querySelectorAll('.slide').forEach(s => {
          s.classList.add('active');
          s.style.display = 'flex';
          s.style.pageBreakAfter = 'always';
        });
        // Hide controls
        const c = document.querySelector('.controls');
        if (c) c.style.display = 'none';
      });
      await page.emulateMedia({ media: 'print' });
      await page.waitForTimeout(1000);

      const pdfPath = path.join(EXPORTS, 'GRADE-slides.pdf');
      await page.pdf({
        path: pdfPath,
        width: '13.333in',
        height: '7.5in',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        displayHeaderFooter: false
      });
      console.log(`  PDF saved: ${pdfPath}`);
    }

    // ---------- PPTX ----------
    if (doPPTX && screenshots.length > 0) {
      console.log('\n  Generating PPTX...');
      const PptxGenJS = require('pptxgenjs');
      const pptx = new PptxGenJS();
      pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
      pptx.layout = 'WIDE';

      for (const buf of screenshots) {
        const slide = pptx.addSlide();
        const b64 = buf.toString('base64');
        slide.addImage({
          data: `image/png;base64,${b64}`,
          x: 0, y: 0, w: '100%', h: '100%'
        });
      }

      let pptxPath = path.join(EXPORTS, 'GRADE-slides.pptx');
      try {
        // Check if file is locked
        if (fs.existsSync(pptxPath)) {
          const fd = fs.openSync(pptxPath, 'r+');
          fs.closeSync(fd);
        }
      } catch (e) {
        if (e.code === 'EBUSY') {
          const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          pptxPath = path.join(EXPORTS, `GRADE-slides-${ts}.pptx`);
          console.log(`  File locked, saving as: ${path.basename(pptxPath)}`);
        }
      }

      await pptx.writeFile({ fileName: pptxPath });
      console.log(`  PPTX saved: ${pptxPath}`);
    }

  } finally {
    await browser.close();
    server.close();
    // Cleanup temp
    try { fs.unlinkSync(tmpHTML); } catch(e) {}
    try { fs.unlinkSync(path.join(ROOT, '_grade_export_tmp.html')); } catch(e) {}
  }

  console.log('\nDone!\n');
}

main().catch(e => { console.error('Error:', e); process.exit(1); });
