const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação PDF Osteoporose...');

  const urlCandidates = [
    'http://127.0.0.1:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:5500/OSTEOPOROSE/src/index.html?print=1',
    'http://localhost:8000/OSTEOPOROSE/src/index.html?print=1',
    'https://lucasmiachon-blip.github.io/aulas_core/OSTEOPOROSE/src/index.html?print=1'
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

  // slide-loader injeta .slide via fetch; deck:loaded dispara initDeck que, com ?print=1, mostra todos
  console.log('⏳ Aguardando slides (fetch + deck:loaded)...');
  let slidesCount = 0;
  try {
    await page.waitForFunction(() => document.querySelectorAll('.slide').length >= 50, { timeout: 60000 });
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  } catch (e) {
    await page.waitForTimeout(5000);
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  }
  console.log(`✅ ${slidesCount} slides no DOM`);

  // Em ?print=1, initDeck remove [hidden] de todos. Garantir que já rodou antes do PDF.
  try {
    await page.waitForFunction(() => document.querySelectorAll('.slide[hidden]').length === 0, { timeout: 15000 });
    console.log('✅ Modo print aplicado (todos visíveis)');
  } catch (e) {
    await page.waitForTimeout(2000);
  }

  await page.waitForTimeout(1500);
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(1000);

  const debug = await page.evaluate(() => ({
    slides: document.querySelectorAll('.slide').length,
    hidden: document.querySelectorAll('.slide[hidden]').length,
    isPrint: document.documentElement.classList.contains('is-print')
  }));
  console.log('🔍 Pré-PDF:', JSON.stringify(debug));

  await page.pdf({
    path: outputPath,
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false
  });

  await browser.close();
  console.log('✅ PDF gerado:', outputPath);
}

exportPDF().catch(e => {
  console.error('❌ Erro:', e.message);
  process.exit(1);
});
