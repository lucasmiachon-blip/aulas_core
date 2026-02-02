/**
 * Screenshot do modo PRINT de OSTEOPOROSE
 * Uso: node scripts/screenshot-osteoporose-print.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CONFIG = {
  printUrl: 'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
  totalSlides: 73,
  outputDir: path.join(__dirname, '..', 'screenshots', 'osteoporose', 'print'),
};

function formatSlideNumber(n) {
  return `S${String(n).padStart(2, '0')}`;
}

async function run() {
  console.log('OSTEOPOROSE - Screenshots modo PRINT\n');
  
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  console.log(`Carregando: ${CONFIG.printUrl}`);
  await page.goto(CONFIG.printUrl, { waitUntil: 'load', timeout: 60000 });
  
  // Aguardar slides existirem
  await page.waitForFunction(
    () => document.querySelectorAll('.slide').length > 0,
    { timeout: 30000 }
  );
  console.log('Aguardando renderização...');
  await page.waitForTimeout(5000);

  const slides = await page.$$('.slide');
  console.log(`Encontrados ${slides.length} slides\n`);

  let captured = 0;
  for (let i = 0; i < Math.min(slides.length, CONFIG.totalSlides); i++) {
    const slideId = formatSlideNumber(i + 1);
    const outputPath = path.join(CONFIG.outputDir, `${slideId}.png`);

    try {
      // Scroll para o slide
      await slides[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);

      // Screenshot
      await slides[i].screenshot({ path: outputPath, type: 'png' });
      captured++;

      const progress = Math.round(((i + 1) / CONFIG.totalSlides) * 100);
      process.stdout.write(`\r[${progress}%] ${slideId} ✓`);
    } catch (err) {
      console.log(`\n⚠️ Erro ${slideId}: ${err.message}`);
    }
  }

  await browser.close();
  
  console.log(`\n\n✅ Capturados: ${captured} screenshots`);
  console.log(`Pasta: ${CONFIG.outputDir}`);
}

run().catch(e => { console.error('❌ Erro:', e.message); process.exit(1); });
