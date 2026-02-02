/**
 * Captura screenshots de todos os slides OSTEOPOROSE
 * Viewport: 1600x900 (tamanho exato do slide)
 * 
 * Uso:
 *   1. Iniciar servidor: npm run serve (ou python -m http.server 8000)
 *   2. Rodar: node scripts/capture-osteoporose-slides.js
 * 
 * Output: screenshots/ com 72 arquivos PNG
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configurações
const CONFIG = {
  baseUrl: 'http://localhost:8000/OSTEOPOROSE/src/index.html',
  totalSlides: 72,
  viewport: { width: 1600, height: 900 },
  outputDir: path.join(__dirname, '..', 'screenshots'),
  waitAfterNav: 500, // ms para aguardar após navegação
};

// Formata número do slide: 1 -> "S01", 10 -> "S10"
function formatSlideNumber(n) {
  return `S${String(n).padStart(2, '0')}`;
}

async function captureSlides() {
  console.log('═'.repeat(60));
  console.log('OSTEOPOROSE - Captura de Screenshots');
  console.log('═'.repeat(60));
  console.log(`Viewport: ${CONFIG.viewport.width}x${CONFIG.viewport.height}`);
  console.log(`Total slides: ${CONFIG.totalSlides}`);
  console.log('');

  // Criar diretório de saída
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: CONFIG.viewport,
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    // Carregar página inicial
    console.log(`Carregando: ${CONFIG.baseUrl}`);
    await page.goto(CONFIG.baseUrl, { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });

    // Aguardar evento deck:loaded
    await page.waitForFunction(
      () => document.querySelectorAll('.slide').length >= 72,
      { timeout: 30000 }
    );
    console.log('Slides carregados!\n');

    // Aguardar fonts carregarem
    await page.waitForFunction(
      () => document.fonts.ready,
      { timeout: 10000 }
    );

    // Ocultar UI do viewer para captura limpa
    await page.evaluate(() => {
      const bar = document.querySelector('.viewer__bar');
      if (bar) bar.style.display = 'none';
    });

    console.log('Capturando slides...\n');

    for (let i = 1; i <= CONFIG.totalSlides; i++) {
      const slideId = formatSlideNumber(i);
      const outputPath = path.join(CONFIG.outputDir, `${slideId}.png`);

      // Navegar para o slide via hash
      await page.evaluate((idx) => {
        // Usar setActive diretamente se disponível
        if (window.__viewer && typeof window.__viewer.setActive === 'function') {
          window.__viewer.setActive(idx - 1);
        } else {
          // Fallback: simular navegação
          window.location.hash = 'S' + String(idx).padStart(2, '0');
        }
      }, i);

      // Aguardar transição
      await page.waitForTimeout(CONFIG.waitAfterNav);

      // Aguardar slide estar ativo
      await page.waitForSelector('.slide.is-active', { timeout: 5000 });

      // Capturar apenas a área do slide (stage)
      const stageElement = await page.$('.stage');
      
      if (stageElement) {
        await stageElement.screenshot({ 
          path: outputPath,
          type: 'png'
        });
      } else {
        // Fallback: página inteira
        await page.screenshot({ 
          path: outputPath,
          type: 'png',
          clip: { x: 0, y: 0, width: CONFIG.viewport.width, height: CONFIG.viewport.height }
        });
      }

      // Progresso
      const progress = Math.round((i / CONFIG.totalSlides) * 100);
      process.stdout.write(`\r  [${String(progress).padStart(3)}%] ${slideId} ✓`);
    }

    console.log('\n\nCaptura concluída!');

  } finally {
    await browser.close();
  }

  // Resumo
  console.log('\n' + '═'.repeat(60));
  console.log('RESUMO');
  console.log('═'.repeat(60));
  
  const files = fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.png'));
  console.log(`\n✓ Screenshots: ${files.length} arquivos`);
  console.log(`  Pasta: ${CONFIG.outputDir}`);
  console.log(`  Viewport: ${CONFIG.viewport.width}x${CONFIG.viewport.height}\n`);
}

// Executar
captureSlides()
  .then(() => {
    console.log('✅ Concluído com sucesso!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Erro:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
