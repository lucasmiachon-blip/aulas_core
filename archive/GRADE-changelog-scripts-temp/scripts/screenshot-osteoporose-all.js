/**
 * Screenshot de todos os slides OSTEOPOROSE para revisão visual
 * 
 * Uso: 
 *   1. Iniciar servidor: npm run serve (ou python -m http.server 8000)
 *   2. Rodar: node scripts/screenshot-osteoporose-all.js
 * 
 * Output: screenshots/osteoporose/ com 73 imagens (normal + print)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configurações
const CONFIG = {
  baseUrl: 'http://localhost:8000/OSTEOPOROSE/src/index.html',
  printUrl: 'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
  totalSlides: 73,
  viewport: { width: 1920, height: 1080 },
  outputDir: path.join(__dirname, '..', 'screenshots', 'osteoporose'),
  timeout: 30000,
};

// Formata número do slide: 1 -> "S01", 10 -> "S10"
function formatSlideNumber(n) {
  return `S${String(n).padStart(2, '0')}`;
}

async function takeScreenshots() {
  console.log('='.repeat(60));
  console.log('OSTEOPOROSE - Screenshot de todos os slides');
  console.log('='.repeat(60));

  // Criar diretório de saída
  const normalDir = path.join(CONFIG.outputDir, 'normal');
  const printDir = path.join(CONFIG.outputDir, 'print');
  
  if (!fs.existsSync(normalDir)) fs.mkdirSync(normalDir, { recursive: true });
  if (!fs.existsSync(printDir)) fs.mkdirSync(printDir, { recursive: true });

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // ============================================================
    // PARTE 1: Screenshots do viewer normal (navegação por slides)
    // ============================================================
    console.log('\n[1/2] Capturando screenshots do VIEWER NORMAL...\n');
    
    const page = await browser.newPage();
    await page.setViewportSize(CONFIG.viewport);

    // Carregar página inicial
    console.log(`Carregando: ${CONFIG.baseUrl}`);
    await page.goto(CONFIG.baseUrl, { 
      waitUntil: 'networkidle', 
      timeout: CONFIG.timeout 
    });
    
    // Aguardar slides carregarem
    await page.waitForSelector('.slide', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Capturar cada slide
    for (let i = 1; i <= CONFIG.totalSlides; i++) {
      const slideId = formatSlideNumber(i);
      const outputPath = path.join(normalDir, `${slideId}.png`);

      // Navegar para o slide usando hash
      await page.goto(`${CONFIG.baseUrl}#${i}`, { 
        waitUntil: 'domcontentloaded',
        timeout: CONFIG.timeout 
      });
      
      // Aguardar slide ativo
      await page.waitForTimeout(300);

      // Tentar encontrar o slide ativo
      const slideElement = await page.$('.slide.active');
      
      if (slideElement) {
        // Screenshot do slide específico
        await slideElement.screenshot({ 
          path: outputPath,
          type: 'png'
        });
      } else {
        // Fallback: screenshot da página inteira
        await page.screenshot({ 
          path: outputPath,
          type: 'png',
          fullPage: false
        });
      }

      // Progresso
      const progress = Math.round((i / CONFIG.totalSlides) * 100);
      process.stdout.write(`\r  [${progress}%] ${slideId} ✓`);
    }
    
    console.log('\n  Normal: concluído!');
    await page.close();

    // ============================================================
    // PARTE 2: Screenshots do modo PRINT (todos slides em coluna)
    // ============================================================
    console.log('\n[2/2] Capturando screenshots do MODO PRINT...\n');

    const printPage = await browser.newPage();
    await printPage.setViewportSize({ width: 1920, height: 1080 });

    // Carregar modo print
    console.log(`Carregando: ${CONFIG.printUrl}`);
    await printPage.goto(CONFIG.printUrl, { 
      waitUntil: 'load', 
      timeout: 60000 // Modo print pode demorar mais
    });
    
    // Aguardar renderização - esperar que existam slides (não que sejam visíveis)
    await printPage.waitForFunction(
      () => document.querySelectorAll('.slide').length > 0,
      { timeout: 30000 }
    );
    await printPage.waitForTimeout(3000); // Extra wait for render

    // Pegar todos os slides
    const slides = await printPage.$$('.slide');
    console.log(`  Encontrados ${slides.length} slides no modo print`);

    for (let i = 0; i < Math.min(slides.length, CONFIG.totalSlides); i++) {
      const slideId = formatSlideNumber(i + 1);
      const outputPath = path.join(printDir, `${slideId}.png`);

      try {
        // Scroll para o slide ficar visível
        await slides[i].scrollIntoViewIfNeeded();
        await printPage.waitForTimeout(100);

        // Screenshot do slide
        await slides[i].screenshot({ 
          path: outputPath,
          type: 'png'
        });

        const progress = Math.round(((i + 1) / CONFIG.totalSlides) * 100);
        process.stdout.write(`\r  [${progress}%] ${slideId} ✓`);
      } catch (err) {
        console.log(`\n  ⚠️ Erro no slide ${slideId}: ${err.message}`);
      }
    }

    console.log('\n  Print: concluído!');
    await printPage.close();

  } finally {
    await browser.close();
  }

  // ============================================================
  // RESUMO
  // ============================================================
  console.log('\n' + '='.repeat(60));
  console.log('RESUMO');
  console.log('='.repeat(60));
  
  const normalFiles = fs.readdirSync(normalDir).filter(f => f.endsWith('.png'));
  const printFiles = fs.readdirSync(printDir).filter(f => f.endsWith('.png'));
  
  console.log(`\n✓ Screenshots NORMAL: ${normalFiles.length} arquivos`);
  console.log(`  Pasta: ${normalDir}`);
  console.log(`\n✓ Screenshots PRINT:  ${printFiles.length} arquivos`);
  console.log(`  Pasta: ${printDir}`);
  console.log(`\nTotal: ${normalFiles.length + printFiles.length} screenshots\n`);
}

// Executar
takeScreenshots()
  .then(() => {
    console.log('✅ Concluído com sucesso!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Erro:', err.message);
    process.exit(1);
  });
