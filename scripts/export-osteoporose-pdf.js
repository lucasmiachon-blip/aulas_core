const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  // Preferir print.html (estático, mais estável) ao invés de index.html?print=1
  // Ordem: Live Server (5500) primeiro, depois 800, depois 8000, depois GitHub Pages
  const urlCandidates = [
    'http://127.0.0.1:5500/OSTEOPOROSE/src/print.html',
    'http://localhost:5500/OSTEOPOROSE/src/print.html',
    'http://127.0.0.1:800/OSTEOPOROSE/src/print.html',
    'http://localhost:800/OSTEOPOROSE/src/print.html',
    'http://127.0.0.1:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/print.html'
  ];
  // ?print=1: viewer.js isPrintMode() faz initDeck mostrar TODOS os slides (hidden=false, is-active em todos).
  // Sem isso só o ativo fica visível e o PDF sai com 1 página.

  const outputDir = path.join(__dirname, '..', 'exports');
  const outputPath = path.join(outputDir, 'OSTEOPOROSE-slides.pdf');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let loaded = false;
  for (const candidate of urlCandidates) {
    try {
      console.log('📄 Carregando:', candidate);
      await page.goto(candidate, { waitUntil: 'networkidle', timeout: 60000 });
      loaded = true;
      break;
    } catch (e) {
      console.warn('⚠️ Falhou:', candidate);
    }
  }
  if (!loaded) {
    await browser.close();
    throw new Error('Nenhuma URL funcionou. Inicie um servidor (ex: Live Server ou python -m http.server 8000 na raiz).');
  }

  await page.waitForLoadState('domcontentloaded');

  // print.html já tem todos os slides inline, não precisa de fetch
  // Mas ainda precisa aguardar DOM e recursos carregarem
  console.log('⏳ Aguardando slides (print.html já tem tudo inline)...');
  let slidesCount = 0;
  try {
    await page.waitForFunction(() => document.querySelectorAll('.slide').length >= 50, { timeout: 60000 });
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  } catch (e) {
    await page.waitForTimeout(5000);
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  }
  console.log(`✅ ${slidesCount} slides no DOM`);

  // Aguardar recursos carregarem (CSS, fontes, imagens)
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  // Aguardar fontes carregarem (importante para renderização correta)
  try {
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });
  } catch (e) {
    console.log('⚠️ Fontes podem não estar prontas, continuando...');
  }

  // Ativar modo print ANTES de gerar PDF
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(2000);
  
  // Verificar se modo print está ativo e forçar aplicação do CSS
  const mediaCheck = await page.evaluate(() => {
    const isPrint = window.matchMedia('print').matches;
    const hasPrintClass = document.documentElement.classList.contains('is-print');
    
    // Forçar classe is-print se não estiver presente
    if (!hasPrintClass && window.location.pathname.includes('print.html')) {
      document.documentElement.classList.add('is-print');
    }
    
    // Verificar se CSS de print está carregado
    const printCSS = Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules || []).some(rule => 
          rule.media && rule.media.mediaText.includes('print')
        );
      } catch (e) {
        return false;
      }
    });
    
    return {
      isPrint,
      hasPrintClass: document.documentElement.classList.contains('is-print'),
      printCSSLoaded: printCSS,
      slides: document.querySelectorAll('.slide').length,
      hidden: document.querySelectorAll('.slide[hidden]').length
    };
  });
  
  console.log('🔍 Pré-PDF:', JSON.stringify(mediaCheck, null, 2));
  
  if (!mediaCheck.printCSSLoaded) {
    console.warn('⚠️ CSS de print pode não estar carregado!');
  }

  // Forçar aplicação do CSS de print via JavaScript (workaround para Playwright)
  // Aplicar estilos DIRETAMENTE nos elementos para garantir que sejam respeitados
  await page.evaluate(() => {
    // 1. Adicionar estilo global
    const style = document.createElement('style');
    style.id = 'playwright-print-fix';
    style.textContent = `
      @page {
        size: 13.333in 7.5in;
        margin: 0;
      }
      html, body {
        width: 100% !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        overflow: visible !important;
      }
      .deck {
        width: 13.333in !important;
        height: auto !important;
        display: block !important;
        overflow: visible !important;
        position: static !important;
      }
      .slides {
        height: auto !important;
        display: block !important;
        position: static !important;
        overflow: visible !important;
      }
      .slide {
        position: relative !important;
        width: 13.333in !important;
        height: 7.5in !important;
        min-height: 7.5in !important;
        max-height: 7.5in !important;
        display: block !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        break-after: page !important;
        break-inside: avoid !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      .slide:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }
    `;
    
    const existing = document.getElementById('playwright-print-fix');
    if (existing) existing.remove();
    document.head.appendChild(style);
    
    // 2. Aplicar estilos INLINE diretamente em cada slide (força absoluta)
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      // Remover estilos inline que podem conflitar
      slide.removeAttribute('style');
      
      // Aplicar estilos críticos via setProperty (mais forte que style.xxx)
      slide.style.setProperty('width', '13.333in', 'important');
      slide.style.setProperty('height', '7.5in', 'important');
      slide.style.setProperty('min-height', '7.5in', 'important');
      slide.style.setProperty('max-height', '7.5in', 'important');
      slide.style.setProperty('display', 'block', 'important');
      slide.style.setProperty('position', 'relative', 'important');
      slide.style.setProperty('overflow', 'hidden', 'important');
      slide.style.setProperty('margin', '0', 'important');
      slide.style.setProperty('padding', '0', 'important');
      slide.style.setProperty('box-sizing', 'border-box', 'important');
      slide.style.setProperty('page-break-after', 'always', 'important');
      slide.style.setProperty('page-break-inside', 'avoid', 'important');
      slide.style.setProperty('break-after', 'page', 'important');
      slide.style.setProperty('break-inside', 'avoid', 'important');
      
      // Último slide não deve ter page-break-after
      if (index === slides.length - 1) {
        slide.style.setProperty('page-break-after', 'auto', 'important');
        slide.style.setProperty('break-after', 'auto', 'important');
      }
    });
    
    // 3. Ajustar deck e slides container
    const deck = document.querySelector('.deck');
    if (deck) {
      deck.style.setProperty('width', '13.333in', 'important');
      deck.style.setProperty('height', 'auto', 'important');
      deck.style.setProperty('display', 'block', 'important');
      deck.style.setProperty('overflow', 'visible', 'important');
      deck.style.setProperty('position', 'static', 'important');
    }
    
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
      slidesContainer.style.setProperty('height', 'auto', 'important');
      slidesContainer.style.setProperty('display', 'block', 'important');
      slidesContainer.style.setProperty('position', 'static', 'important');
      slidesContainer.style.setProperty('overflow', 'visible', 'important');
    }
    
    // 4. Ajustar html e body
    document.documentElement.style.setProperty('width', '100%', 'important');
    document.documentElement.style.setProperty('height', 'auto', 'important');
    document.documentElement.style.setProperty('overflow', 'visible', 'important');
    document.body.style.setProperty('width', '100%', 'important');
    document.body.style.setProperty('height', 'auto', 'important');
    document.body.style.setProperty('margin', '0', 'important');
    document.body.style.setProperty('padding', '0', 'important');
    document.body.style.setProperty('overflow', 'visible', 'important');
    
    return {
      slidesCount: slides.length,
      deckWidth: deck ? window.getComputedStyle(deck).width : 'N/A',
      firstSlideHeight: slides.length > 0 ? window.getComputedStyle(slides[0]).height : 'N/A'
    };
  });
  
  await page.waitForTimeout(2000);
  
  // Verificar estilos aplicados antes de gerar PDF
  const stylesCheck = await page.evaluate(() => {
    const firstSlide = document.querySelector('.slide');
    if (!firstSlide) return { error: 'Nenhum slide encontrado' };
    
    const computed = window.getComputedStyle(firstSlide);
    return {
      pageBreakAfter: computed.pageBreakAfter,
      height: computed.height,
      width: computed.width,
      display: computed.display,
      overflow: computed.overflow,
      position: computed.position
    };
  });
  console.log('🎨 Estilos aplicados no primeiro slide:', JSON.stringify(stylesCheck, null, 2));

  // 13.333in x 7.5in em pixels (96 DPI padrão)
  // 13.333 * 96 = 1279.968px ≈ 1280px
  // 7.5 * 96 = 720px
  const pageWidth = 1280; // pixels
  const pageHeight = 720; // pixels
  
  await page.pdf({
    path: outputPath,
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
    preferCSSPageSize: false // Usar dimensões explícitas ao invés de CSS
  });

  await browser.close();
  console.log('✅ PDF gerado:', outputPath);
}

exportPDF().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
