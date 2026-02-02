/**
 * export-osteoporose-pdf.js
 * Gera PDF dos slides OSTEOPOROSE (index.html?print=1) com 16.667×9.375in por página.
 *
 * Uso: na RAIZ do projeto (Aulas2), não dentro de OSTEOPOROSE:
 *   node scripts/export-osteoporose-pdf.js
 *
 * ASSISTENTES DE IA (ChatGPT, Claude, etc.): Antes de modificar este script,
 * leia scripts/AI-RESTRICTIONS.md e a seção "Restrições CSS/JS" no README.md.
 * Não remova: preferCSSPageSize, bloco #utilidade-grid nos estilos injetados,
 * dimensões 16.667in×9.375in, margem 0 em @page e em page.pdf().
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGE_W_IN = '16.667in';
const PAGE_H_IN = '9.375in';
const VIEWPORT_W = 1600;
const VIEWPORT_H = 900;

function readExpectedSlidesCount() {
  // Preferimos ler do _meta.json para ser determinístico
  let fromMeta = 0;
  try {
    const metaFile = path.join(__dirname, '..', 'OSTEOPOROSE', 'src', 'slides', '_meta.json');
    const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    if (Array.isArray(meta) && meta.length > 0) fromMeta = meta.length;
  } catch (_) {}

  let fromList = 0;
  try {
    const listFile = path.join(__dirname, '..', 'OSTEOPOROSE', 'src', 'slides', '_list.txt');
    const raw = fs.readFileSync(listFile, 'utf8');
    fromList = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#') && l.endsWith('.html'))
      .length;
  } catch (_) {}

  const expected = Math.max(fromMeta || 0, fromList || 0, 70);
  return { fromMeta, fromList, expected };
}

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  const expectedInfo = readExpectedSlidesCount();
  const EXPECTED_SLIDES = expectedInfo.expected;
  console.log('🧾 Slides esperados (meta/list/max):', expectedInfo.fromMeta, expectedInfo.fromList, EXPECTED_SLIDES);

  // Preferir index.html?print=1 (mesmo viewer, sempre em sync). print.html é fallback.
  const urlCandidates = [
    'http://127.0.0.1:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://127.0.0.1:800/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:800/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/index.html?print=1',
    // fallback (gerado)
    'http://127.0.0.1:5500/OSTEOPOROSE/src/print.html',
    'http://localhost:5500/OSTEOPOROSE/src/print.html',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/print.html',
  ];

  const outputDir = path.join(__dirname, '..', 'exports');
  const outputPath = path.join(outputDir, 'OSTEOPOROSE-slides.pdf');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
  });

  let usedUrl = '';
  let loaded = false;

  for (const candidate of urlCandidates) {
    try {
      console.log('📄 Carregando:', candidate);
      const resp = await page.goto(candidate, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // resp pode ser null em alguns casos; quando existir, validamos status
      if (resp && !resp.ok()) throw new Error(`HTTP ${resp.status()}`);
      usedUrl = candidate;
      loaded = true;
      break;
    } catch (e) {
      console.warn('⚠️ Falhou:', candidate, '|', e.message);
    }
  }

  if (!loaded) {
    await browser.close();
    throw new Error(
      'Nenhuma URL funcionou. Inicie um servidor na raiz (ex: Live Server) ' +
      'ou python -m http.server 8000 e tente novamente.'
    );
  }

  console.log('✅ URL usada:', usedUrl);
  console.log('[export] using url:', usedUrl);

  // Esperar slides carregarem (index?print=1 carrega async; print.html já vem pronto)
  console.log('⏳ Aguardando deck no DOM...');
  await page.waitForFunction(
    (min) => document.querySelectorAll('.slide').length >= min,
    EXPECTED_SLIDES,
    { timeout: 90000 }
  );

  const slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`✅ ${slidesCount} slides no DOM`);

  // Esperar recursos (CSS/imagens) e fontes
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  try {
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
  } catch (_) {
    console.warn('⚠️ Fontes: document.fonts.ready não disponível; seguindo...');
  }

  // Ativar print media
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(600);

  // Diagnóstico curto (pré-fix): displays e tops
  const preFixStacking = await page.evaluate(() => {
    const deck = document.querySelector('.deck');
    const slidesEl = document.querySelector('.slides');
    const container = document.querySelector('[data-slides]');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const tops = slides.slice(0, 5).map((s) => Math.round(s.getBoundingClientRect().top));
    return {
      displayDeck: deck ? getComputedStyle(deck).display : null,
      displaySlides: slidesEl ? getComputedStyle(slidesEl).display : null,
      displayContainer: container ? getComputedStyle(container).display : null,
      tops,
    };
  });
  console.log('[export] pre-fix stacking sample:', JSON.stringify(preFixStacking));

  // Aplicar fix determinístico para multipágina (sem destruir padding / full-bleed)
  const layoutResult = await page.evaluate(
    ({ PAGE_W_IN, PAGE_H_IN }) => {
      // Remover fix anterior se existir
      const prev = document.getElementById('playwright-print-fix');
      if (prev) prev.remove();

      // Estilo global (ordem final vence base/viewer/print.css)
      const style = document.createElement('style');
      style.id = 'playwright-print-fix';
      style.textContent = `
@page{ size:${PAGE_W_IN} ${PAGE_H_IN} !important; margin:0 !important; }

/* Fallback de tokens RGB caso a fonte seja print.html (PRINT_HEAD não define alguns) */
:root{
  --text-rgb: 34, 34, 34;
  --muted-rgb: 102, 102, 102;
  --border-rgb: 233, 236, 239;
}

html, body{
  margin:0 !important;
  padding:0 !important;
  width:100% !important;
  height:auto !important;
  min-height:0 !important;
  background:#fff !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  overflow: visible !important;
  overflow-x: visible !important;
}

.slides-container{
  margin:0 !important;
  padding:0 !important;
}

/* Garantir fluxo nos containers */
.slides, [data-slides]{
  display:block !important;
  height:auto !important;
  overflow: visible !important;
  flex:none !important;
}

/* Nunca exportar UI */
.viewer__bar{ display:none !important; }

/* Neutralizar app shell */
.viewer{
  display:block !important;
  height:auto !important;
  min-height:0 !important;
}
.stage{
  flex:none !important;
  min-height:0 !important;
  height:auto !important;
}

/* Quebrar a lógica de “palco” e virar fluxo vertical paginável */
.stage, .stage__inner, .deck, .slides{
  width:${PAGE_W_IN} !important;
  max-width:${PAGE_W_IN} !important;
  height:auto !important;
  max-height:none !important;
  display:block !important;
  position:static !important;
  transform:none !important;
  overflow:visible !important;
  overflow-x:hidden !important;
  padding:0 !important;
  margin:0 !important;
  box-shadow:none !important;
  border:none !important;
  border-radius:0 !important;
}

/* Mostrar TODOS os slides (slide-loader marca hidden por padrão) */
.slide{
  display:block !important;
}
.slide[hidden]{
  display:block !important;
}

/* 1 slide = 1 página */
.slide{
  width:${PAGE_W_IN} !important;
  max-width:${PAGE_W_IN} !important;
  height:${PAGE_H_IN} !important;
  min-height:${PAGE_H_IN} !important;
  max-height:${PAGE_H_IN} !important;
  position:relative !important;
  top:auto !important;
  left:auto !important;
  overflow:hidden !important;
  margin:0 !important;
  border:none !important;
  box-shadow:none !important;
  outline:none !important;
  box-sizing:border-box !important;

  page-break-before: always !important;
  break-before: page !important;
  page-break-after: always !important;
  break-after: page !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;

  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

/* Primeira página não precisa break-before */
.slide:first-child{
  page-break-before:auto !important;
  break-before:auto !important;
}

/* Capa e contracapa (garante layout mesmo se CSS do viewer falhar) */
.slide:first-child,
.slide:nth-child(2){
  background: linear-gradient(135deg, var(--navy) 0%, rgba(var(--navy-rgb), 0.88) 50%, rgba(var(--navy-rgb), 0.78) 100%) !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  padding:0 !important;
}

/* Última página: sem break-after */
.slide:last-child{
  page-break-after:auto !important;
  break-after:auto !important;
}

/* PDF: backdrop-filter costuma “sumir” elementos internos */
.slide *,
.slide *::before,
.slide *::after{
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
}

/* Slide Utilidade: manter grid 2 colunas (OBRIGATÓRIO no export) */
#utilidade-grid,
.utilidade-grid{
  display:grid !important;
  grid-template-columns: 300px minmax(0, 1fr) !important;
  gap:24px !important;
  align-items:start !important;
  width:100% !important;
}
#utilidade-grid > *,
.utilidade-grid > *{
  min-width:0 !important;
}
      `.trim();

      document.head.appendChild(style);

      // Reaplicar padding inline de cada slide como !important
      // (neutraliza qualquer print.css que tenha zerado padding com !important)
      const slides = Array.from(document.querySelectorAll('.slide'));
      for (const s of slides) {
        const styleAttr = s.getAttribute('style') || '';

        // Captura "padding: X;" do atributo style
        const m = styleAttr.match(/padding\s*:\s*([^;]+)\s*;/i) || styleAttr.match(/padding\s*:\s*([^;]+)\s*$/i);
        if (m && m[1]) {
          const paddingVal = m[1].trim();
          s.style.setProperty('padding', paddingVal, 'important');
        }

        // Forçar dimensões/paginacao no nível inline também (última camada)
        s.style.setProperty('width', PAGE_W_IN, 'important');
        s.style.setProperty('height', PAGE_H_IN, 'important');
        s.style.setProperty('min-height', PAGE_H_IN, 'important');
        s.style.setProperty('max-height', PAGE_H_IN, 'important');
        s.style.setProperty('overflow', 'hidden', 'important');
        s.style.setProperty('margin', '0', 'important');
        s.style.setProperty('border', 'none', 'important');
        s.style.setProperty('box-shadow', 'none', 'important');
        s.style.setProperty('box-sizing', 'border-box', 'important');
      }

      // Reflow
      void document.body.offsetHeight;

      const deck = document.querySelector('.deck');
      const stageInner = document.querySelector('.stage__inner');
      const first = slides[0];

      return {
        slidesCount: slides.length,
        firstSlideComputed: first ? {
          width: getComputedStyle(first).width,
          height: getComputedStyle(first).height,
          padding: getComputedStyle(first).padding,
          display: getComputedStyle(first).display
        } : null,
        deckWidth: deck ? getComputedStyle(deck).width : null,
        stageInnerHeight: stageInner ? getComputedStyle(stageInner).height : null,
        bodyScrollHeight: document.body.scrollHeight
      };
    },
    { PAGE_W_IN, PAGE_H_IN }
  );

  console.log('📐 Layout pós-fix:', JSON.stringify(layoutResult, null, 2));
  await page.waitForTimeout(600);

  // Healthcheck (fail-fast)
  const health = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const hiddenCount = slides.filter((s) => s.hidden || getComputedStyle(s).display === 'none').length;
    const stageInner = document.querySelector('.stage__inner');
    const stageTransform = stageInner ? getComputedStyle(stageInner).transform : null;
    const bodyCS = getComputedStyle(document.body);
    const bodyMargin = {
      top: bodyCS.marginTop,
      right: bodyCS.marginRight,
      bottom: bodyCS.marginBottom,
      left: bodyCS.marginLeft,
    };
    const bodyPadding = {
      top: bodyCS.paddingTop,
      right: bodyCS.paddingRight,
      bottom: bodyCS.paddingBottom,
      left: bodyCS.paddingLeft,
    };

    const container =
      document.querySelector('.slides-container') ||
      document.querySelector('.slides') ||
      document.body;
    const ccs = getComputedStyle(container);
    const containerMargin = {
      top: ccs.marginTop,
      right: ccs.marginRight,
      bottom: ccs.marginBottom,
      left: ccs.marginLeft,
    };
    const containerPadding = {
      top: ccs.paddingTop,
      right: ccs.paddingRight,
      bottom: ccs.paddingBottom,
      left: ccs.paddingLeft,
    };

    const bodyScrollHeight = document.body.scrollHeight;
    const docScrollHeight = document.documentElement.scrollHeight;
    return {
      slideCount: slides.length,
      hiddenCount,
      stageTransform,
      bodyMargin,
      bodyPadding,
      containerMargin,
      containerPadding,
      containerSelector: container.className || container.tagName,
      bodyScrollHeight,
      docScrollHeight,
    };
  });

  console.log('[export] health:', JSON.stringify(health));
  const anyBodyMargin = Object.values(health.bodyMargin).some((v) => v !== '0px');
  const anyBodyPadding = Object.values(health.bodyPadding).some((v) => v !== '0px');
  const anyContainerPadding = Object.values(health.containerPadding).some((v) => v !== '0px');
  const hasStageTransform = health.stageTransform && health.stageTransform !== 'none';

  if (
    health.slideCount < EXPECTED_SLIDES ||
    health.hiddenCount > 0 ||
    hasStageTransform ||
    anyBodyMargin ||
    anyBodyPadding ||
    anyContainerPadding
  ) {
    throw new Error('[export] healthcheck failed: ' + JSON.stringify(health));
  }

  // Fail-fast: altura total muito pequena indica 1 página
  const approxExpectedPx = health.slideCount * 900;
  const maxScroll = Math.max(health.bodyScrollHeight || 0, health.docScrollHeight || 0);
  if (health.slideCount >= 10 && maxScroll < approxExpectedPx * 0.7) {
    throw new Error('[export] pagination height too small; likely 1-page clamp');
  }

  // Stacking check (fail-fast)
  const stackingSample = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const deck = document.querySelector('.deck');
    const container = document.querySelector('[data-slides]');
    const sample = slides.slice(0, 8).map((s) => {
      const cs = getComputedStyle(s);
      const rect = s.getBoundingClientRect();
      return {
        position: cs.position,
        display: cs.display,
        offsetTop: s.offsetTop,
        rectTop: Math.round(rect.top),
      };
    });
    const tops = sample.map((s) => s.rectTop);
    const deltas = tops.slice(1).map((t, i) => t - tops[i]);
    const stackingOk = deltas.every((d) => d > 5);
    return {
      slideCount: slides.length,
      displayDeck: deck ? getComputedStyle(deck).display : null,
      displayContainer: container ? getComputedStyle(container).display : null,
      tops,
      deltas,
      sample,
      stackingOk,
    };
  });

  console.log('[export] stacking sample:', JSON.stringify(stackingSample));
  if (!stackingSample.stackingOk) {
    throw new Error('[export] slides not stacked; will print as 1 page ' + JSON.stringify({
      tops: stackingSample.tops,
      displayDeck: stackingSample.displayDeck,
      displayContainer: stackingSample.displayContainer,
    }));
  }

  // FAIL FAST (P0): utilidade-grid precisa ter 2 filhos (coluna 1 e coluna 2)
  const utilidadeCheck = await page.evaluate(() => {
    const slide = document.getElementById('slide-10');
    const grid = slide ? slide.querySelector('#utilidade-grid') : null;
    const children = grid ? Array.from(grid.children || []) : [];
    return {
      hasSlide: !!slide,
      hasGrid: !!grid,
      gridChildrenCount: children.length,
      child1Rect: children[1] ? children[1].getBoundingClientRect() : null,
    };
  });

  console.log('🧪 Utilidade check:', JSON.stringify(utilidadeCheck, null, 2));

  if (!utilidadeCheck.hasSlide || !utilidadeCheck.hasGrid || utilidadeCheck.gridChildrenCount < 2) {
    console.warn(
      '⚠️ P0: #utilidade-grid com', utilidadeCheck.gridChildrenCount, 'filho(s). Slide 8 pode aparecer sem coluna 2 no PDF. Continuando...'
    );
  }

  // Gerar PDF
  await page.pdf({
    path: outputPath,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('✅ PDF gerado:', outputPath);
}

exportPDF().catch((e) => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
