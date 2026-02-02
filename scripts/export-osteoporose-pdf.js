const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  const exportUrl = process.env.EXPORT_URL;
  const exportBase = process.env.EXPORT_BASE_URL || 'http://127.0.0.1:5500';
  const urlCandidates = exportUrl
    ? [exportUrl]
    : [
        `${exportBase}/index.html?print=1`,
        `${exportBase}/print.html`,
        `${exportBase}/OSTEOPOROSE/src/index.html?print=1`,
        `${exportBase}/OSTEOPOROSE/src/print.html`,
      ];

  const outputDir = path.join(__dirname, '..', 'OSTEOPOROSE', 'exports');
  const outputPath = path.join(outputDir, 'OSTEOPOROSE-slides.pdf');
  const samplePath = path.join(outputDir, 'export-sample.png');
  const debugPng = path.join(outputDir, 'export-debug.png');
  const debugHtml = path.join(outputDir, 'export-debug.html');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  let finalUrl = null;
  let httpStatus = null;

  try {
    const page = await browser.newPage();
    // Mantém consistência com o palco 16:9 do viewer (1600×900) e reduz variações por viewport.
    await page.setViewportSize({ width: 1600, height: 900 });

    // --- URL loading ---
    let loaded = false;
    const attempts = [];
    for (const candidate of urlCandidates) {
      try {
        console.log('📄 try URL:', candidate);
        const response = await page.goto(candidate, { waitUntil: 'domcontentloaded', timeout: 60000 });
        const status = response ? response.status() : null;
        const ok = status === 200;
        attempts.push({ url: candidate, status });
        console.log('📄 status:', status, ok ? 'OK' : 'FAIL');
        if (!ok) continue;
        loaded = true;
        finalUrl = candidate;
        httpStatus = status;
        break;
      } catch (e) {
        attempts.push({ url: candidate, status: null });
        console.warn('⚠️ Falhou:', candidate);
      }
    }
    if (!loaded) {
      throw new Error(`Nenhuma URL funcionou. Tentativas: ${JSON.stringify(attempts)}`);
    }

    // --- Wait for at least one slide (fix: use waitForSelector) ---
    console.log('⏳ Aguardando slides...');
    try {
      await page.waitForSelector('.slide', { timeout: 60000 });
    } catch (e) {
      // Will be caught by SLIDES_FINAL == 0 check below
    }

    // --- Wait for resources ---
    await page.waitForLoadState('networkidle');

    // --- Wait for fonts ---
    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });
    } catch (e) {
      console.log('⚠️ Fontes podem não estar prontas, continuando...');
    }

    // --- Emulate print media ---
    await page.emulateMedia({ media: 'print' });

    // --- Stabilized slide count (poll every 200ms, stable after 3 consecutive equal reads, max 30s) ---
    console.log('⏳ Estabilizando contagem de slides...');
    let SLIDES_FINAL = 0;
    let SLIDES_HIDDEN_ATTR = 0;
    const STABILITY_READS = 3;
    const POLL_INTERVAL = 200;
    const MAX_WAIT = 30000;
    let stableCount = 0;
    let lastTotal = -1;
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_WAIT) {
      const { total, hiddenAttr } = await page.evaluate(() => ({
        total: document.querySelectorAll('.slide').length,
        hiddenAttr: document.querySelectorAll('.slide[hidden]').length
      }));

      if (total === lastTotal && total > 0) {
        stableCount++;
        if (stableCount >= STABILITY_READS) {
          SLIDES_FINAL = total;
          SLIDES_HIDDEN_ATTR = hiddenAttr;
          break;
        }
      } else {
        stableCount = 0;
        lastTotal = total;
      }
      await page.waitForTimeout(POLL_INTERVAL);
    }

    // If loop ended without stabilizing, read final value
    if (SLIDES_FINAL === 0) {
      const { total, hiddenAttr } = await page.evaluate(() => ({
        total: document.querySelectorAll('.slide').length,
        hiddenAttr: document.querySelectorAll('.slide[hidden]').length
      }));
      SLIDES_FINAL = total;
      SLIDES_HIDDEN_ATTR = hiddenAttr;
    }

    console.log(`✅ SLIDES_FINAL=${SLIDES_FINAL}, SLIDES_HIDDEN_ATTR=${SLIDES_HIDDEN_ATTR}`);

    // --- Fail if no slides ---
    if (SLIDES_FINAL === 0) {
      await page.screenshot({ path: debugPng, fullPage: false });
      fs.writeFileSync(debugHtml, await page.content(), 'utf8');
      throw new Error('SLIDES_FINAL=0 (debug salvo em exports/export-debug.png e export-debug.html)');
    }

    // --- Read first slide metrics (read-only, no mutation) ---
    const slideMetrics = await page.evaluate(() => {
      const firstSlide = document.querySelector('.slide');
      if (!firstSlide) return { rect: 'N/A', computed: 'N/A', ratio: 'N/A' };
      const rect = firstSlide.getBoundingClientRect();
      const computed = window.getComputedStyle(firstSlide);
      const ratio = rect.height > 0 ? (rect.width / rect.height).toFixed(4) : 'N/A';
      return {
        rect: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
        computed: `${computed.width}x${computed.height}`,
        ratio
      };
    });

    // --- Generate PDF (rely on CSS @page, no width/height override) ---
    await page.pdf({
      path: outputPath,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    // --- Sample screenshot (optional, non-fatal) ---
    // Preferimos capturar só o primeiro slide (mais útil) e nunca falhar o export.
    try {
      const first = page.locator('.slide').first();
      await first.waitFor({ state: 'attached', timeout: 3000 });
      await first.screenshot({ path: samplePath });
    } catch (e1) {
      try {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(100);
        await page.screenshot({ path: samplePath, fullPage: false });
      } catch (e2) {
        console.warn('⚠️ sample screenshot skipped:', e2.message || e1.message);
      }
    }

    // --- Parseable logs ---
    console.log(`EXPORT_URL_USED=${finalUrl}`);
    console.log(`HTTP_STATUS=${httpStatus}`);
    console.log(`SLIDES_FINAL=${SLIDES_FINAL}`);
    console.log(`SLIDES_HIDDEN_ATTR=${SLIDES_HIDDEN_ATTR}`);
    console.log(`FIRST_SLIDE_RECT=${slideMetrics.rect}`);
    console.log(`FIRST_SLIDE_COMPUTED=${slideMetrics.computed}`);
    console.log(`FIRST_SLIDE_RATIO=${slideMetrics.ratio}`);
    console.log(`PDF_PATH_ABS=${outputPath}`);
    console.log('✅ PDF gerado com sucesso.');

  } finally {
    await browser.close();
  }
}

exportPDF().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
