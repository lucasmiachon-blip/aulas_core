/**
 * export-osteoporose-pdf.js
 * Gera PDF dos slides OSTEOPOROSE (index.html?print=1) com 16.667×9.375in por página.
 *
 * ASSISTENTES DE IA (ChatGPT, Claude, etc.): Antes de modificar este script,
 * leia scripts/AI-RESTRICTIONS.md e a seção "Restrições CSS/JS" no README.md.
 * Não remova: preferCSSPageSize, bloco #utilidade-grid nos estilos injetados,
 * dimensões 16.667in×9.375in, margem 0 em @page e em page.pdf().
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  // Preferir index.html?print=1 (mesmo viewer, sempre em sync). print.html é fallback.
  // PDF: um slide = uma página; teclado no leitor (setas) = próximo/anterior slide.
  const urlCandidates = [
    'http://127.0.0.1:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://127.0.0.1:800/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:800/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/index.html?print=1',
    'http://127.0.0.1:5500/OSTEOPOROSE/src/print.html',
    'http://localhost:5500/OSTEOPOROSE/src/print.html',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/print.html'
  ];
  const MIN_SLIDES = 70; // deck carregado (index?print=1 usa slide-loader; print.html já vem com todos)

  const outputDir = path.join(__dirname, '..', 'exports');
  const outputPath = path.join(outputDir, 'OSTEOPOROSE-slides.pdf');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  // Viewport 16:9 (1600×900) para evitar scroll horizontal no PDF — mesmo que @page
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 }
  });

  let loaded = false;
  let usedUrl = '';
  for (const candidate of urlCandidates) {
    try {
      console.log('📄 Carregando:', candidate);
      await page.goto(candidate, { waitUntil: 'networkidle', timeout: 60000 });
      loaded = true;
      usedUrl = candidate;
      break;
    } catch (e) {
      console.warn('⚠️ Falhou:', candidate);
    }
  }
  if (!loaded) {
    await browser.close();
    throw new Error('Nenhuma URL funcionou. Inicie um servidor (ex: Live Server ou python -m http.server 8000 na raiz).');
  }

  // #region agent log
  const logPath = path.join(__dirname, '..', '.cursor', 'debug.log');
  try {
    fs.appendFileSync(logPath, JSON.stringify({ location: 'export-osteoporose-pdf.js', message: 'run started', data: { url: usedUrl }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) + '\n');
  } catch (_) {}
  // #endregion

  await page.waitForLoadState('domcontentloaded');

  // index?print=1: slide-loader carrega slides async; print.html já vem com todos inline
  console.log('⏳ Aguardando deck (slides carregados)...');
  let slidesCount = 0;
  try {
    await page.waitForFunction(() => document.querySelectorAll('.slide').length >= 70, { timeout: 90000 });
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
  // Incluir .stage e .stage__inner com height: auto para fluxo multi-página
  const layoutResult = await page.evaluate(() => {
    // 1. Adicionar estilo global
    const style = document.createElement('style');
    style.id = 'playwright-print-fix';
    style.textContent = `
      @page {
        size: 16.667in 9.375in;
        margin: 0;
      }
      html, body {
        width: 100% !important;
        max-width: 16.667in !important;
        height: auto !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        overflow: hidden !important;
        overflow-x: clip !important;
      }
      .stage, .stage__inner {
        width: 16.667in !important;
        max-width: 16.667in !important;
        height: auto !important;
        max-height: none !important;
        display: block !important;
        overflow: visible !important;
        overflow-x: hidden !important;
        position: static !important;
      }
      .deck {
        width: 16.667in !important;
        max-width: 16.667in !important;
        height: auto !important;
        display: block !important;
        overflow: visible !important;
        overflow-x: hidden !important;
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
        width: 16.667in !important;
        max-width: 16.667in !important;
        height: 9.375in !important;
        min-height: 9.375in !important;
        max-height: 9.375in !important;
        display: block !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        box-sizing: border-box !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        page-break-before: always !important;
        break-before: page !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .slide:first-child {
        page-break-before: auto !important;
        break-before: auto !important;
        background: linear-gradient(135deg, var(--navy) 0%, rgba(var(--navy-rgb), 0.88) 50%, rgba(var(--navy-rgb), 0.78) 100%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
      }
      .slide:nth-child(2) {
        background: linear-gradient(135deg, var(--navy) 0%, rgba(var(--navy-rgb), 0.88) 50%, rgba(var(--navy-rgb), 0.78) 100%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
      }
      .slide:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }
      .slide * {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      #utilidade-grid,
      .utilidade-grid {
        display: grid !important;
        grid-template-columns: 300px 1fr !important;
        gap: 24px !important;
        align-items: start !important;
        width: 100% !important;
      }
    `;
    
    const existing = document.getElementById('playwright-print-fix');
    if (existing) existing.remove();
    document.head.appendChild(style);
    
    // 2. Aplicar estilos de print em cada slide (não remover style: preserva padding/background do viewer)
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      // Dimensões e page-break; NÃO sobrescrever padding (preserva padding inline do slide)
      slide.style.setProperty('width', '16.667in', 'important');
      slide.style.setProperty('height', '9.375in', 'important');
      slide.style.setProperty('min-height', '9.375in', 'important');
      slide.style.setProperty('max-height', '9.375in', 'important');
      slide.style.setProperty('display', (index === 0 || index === 1) ? 'flex' : 'block', 'important');
      if (index === 0 || index === 1) {
        slide.style.setProperty('align-items', 'center', 'important');
        slide.style.setProperty('justify-content', 'center', 'important');
        slide.style.setProperty('padding', '0', 'important');
      }
      slide.style.setProperty('position', 'relative', 'important');
      slide.style.setProperty('overflow', 'hidden', 'important');
      slide.style.setProperty('margin', '0', 'important');
      slide.style.setProperty('border', 'none', 'important');
      slide.style.setProperty('box-shadow', 'none', 'important');
      slide.style.setProperty('outline', 'none', 'important');
      slide.style.setProperty('box-sizing', 'border-box', 'important');
      slide.style.setProperty('page-break-before', index === 0 ? 'auto' : 'always', 'important');
      slide.style.setProperty('break-before', index === 0 ? 'auto' : 'page', 'important');
      slide.style.setProperty('page-break-after', index === slides.length - 1 ? 'auto' : 'always', 'important');
      slide.style.setProperty('break-after', index === slides.length - 1 ? 'auto' : 'page', 'important');
      slide.style.setProperty('page-break-inside', 'avoid', 'important');
      slide.style.setProperty('break-inside', 'avoid', 'important');
      slide.style.setProperty('-webkit-print-color-adjust', 'exact', 'important');
      slide.style.setProperty('print-color-adjust', 'exact', 'important');
    });
    
    // 3. Ajustar stage, stage__inner, deck e slides (todos height: auto para fluxo multi-página)
    const stage = document.querySelector('.stage');
    const stageInner = document.querySelector('.stage__inner');
    [stage, stageInner].forEach(el => {
      if (!el) return;
      el.style.setProperty('width', '16.667in', 'important');
      el.style.setProperty('height', 'auto', 'important');
      el.style.setProperty('max-height', 'none', 'important');
      el.style.setProperty('display', 'block', 'important');
      el.style.setProperty('overflow', 'visible', 'important');
      el.style.setProperty('position', 'static', 'important');
    });
    const deck = document.querySelector('.deck');
    if (deck) {
      deck.style.setProperty('width', '16.667in', 'important');
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
    
    // 5. Forçar reflow para layout multi-página
    void document.body.offsetHeight;
    const slidesEl = document.querySelector('.slides');
    const bodyScroll = document.body.scrollHeight;
    const slidesScroll = slidesEl ? slidesEl.scrollHeight : 0;
    return {
      slidesCount: slides.length,
      deckWidth: deck ? window.getComputedStyle(deck).width : 'N/A',
      firstSlideHeight: slides.length > 0 ? window.getComputedStyle(slides[0]).height : 'N/A',
      bodyScrollHeight: bodyScroll,
      slidesScrollHeight: slidesScroll,
      stageHeight: stageInner ? window.getComputedStyle(stageInner).height : 'N/A'
    };
  });
  console.log('📐 Layout pós-fix:', JSON.stringify(layoutResult, null, 2));
  
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

  // Forçar sem scroll horizontal (apresentação 16:9)
  await page.evaluate(() => {
    document.documentElement.style.setProperty('overflow-x', 'hidden', 'important');
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('overflow-x', 'hidden', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('max-width', '16.667in', 'important');
  });

  // #region agent log
  const slide8Debug = await page.evaluate(async () => {
    const endpoint = 'http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc';
    const grid = document.getElementById('utilidade-grid');
    const out = { found: !!grid, hypothesisId: ['A','B','C'] };
    if (!grid) {
      await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'export-osteoporose-pdf.js:slide8', message: 'utilidade-grid not found', data: out, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => {});
      return out;
    }
    const cs = window.getComputedStyle(grid);
    const parent = grid.parentElement;
    const pcs = parent ? window.getComputedStyle(parent) : null;
    const rect = grid.getBoundingClientRect();
    const child0 = grid.children[0];
    const child1 = grid.children[1];
    const r0 = child0 ? child0.getBoundingClientRect() : null;
    const r1 = child1 ? child1.getBoundingClientRect() : null;
    const data = {
      display: cs.display,
      gridTemplateColumns: cs.gridTemplateColumns,
      width: cs.width,
      height: cs.height,
      parentDisplay: pcs ? pcs.display : null,
      parentWidth: pcs ? pcs.width : null,
      gridRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      child0Rect: r0 ? { top: r0.top, left: r0.left, width: r0.width, height: r0.height } : null,
      child1Rect: r1 ? { top: r1.top, left: r1.left, width: r1.width, height: r1.height } : null,
      hypothesisId: 'A'
    };
    await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'export-osteoporose-pdf.js:slide8', message: 'utilidade-grid computed', data, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => {});
    const dataB = { gridHeight: rect.height, slideHeight: 9.375 * 96, overflow: cs.overflow, hypothesisId: 'B' };
    await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'export-osteoporose-pdf.js:slide8', message: 'constraints', data: dataB, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'B' }) }).catch(() => {});
    return { ...out, ...data, dataB };
  });
  console.log('🔬 Slide 8 grid debug:', JSON.stringify(slide8Debug, null, 2));
  // #endregion

  // preferCSSPageSize: true para Chromium usar @page e page-break-after (múltiplas páginas)
  await page.pdf({
    path: outputPath,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
    preferCSSPageSize: true
  });

  await browser.close();
  console.log('✅ PDF gerado:', outputPath);
}

exportPDF().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
