const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação de PDF...');
  
  // URL do site GRADE
  const url = 'https://lucasmiachon-blip.github.io/aulas_core/GRADE/dist/';
  
  // Pasta de saída
  const outputDir = path.join(__dirname, '..', 'exports');
  const outputPath = path.join(outputDir, 'GRADE-slides.pdf');
  
  // Criar pasta exports se não existir
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('📁 Pasta exports/ criada');
  }
  
  // Iniciar navegador
  console.log('🌐 Abrindo navegador...');
  const browser = await chromium.launch({
    headless: true
  });
  
  const page = await browser.newPage();
  
  // Navegar para a página
  console.log('📄 Carregando página:', url);
  await page.goto(url, {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  // Aguardar fontes e recursos carregarem
  console.log('⏳ Aguardando recursos carregarem...');
  await page.waitForTimeout(3000);
  
  // Aguardar o reveal.js estar pronto
  await page.waitForFunction(() => {
    return typeof Reveal !== 'undefined' && Reveal.isReady();
  });
  
  console.log('✅ Reveal.js pronto');
  
  // Preparar para PDF (desabilitar animações, etc)
  await page.evaluate(() => {
    // Forçar modo de impressão do Reveal.js
    if (typeof Reveal !== 'undefined') {
      Reveal.configure({
        pdfMaxPagesPerSlide: 1,
        pdfSeparateFragments: false
      });
    }
  });
  
  // Adicionar parâmetro print-pdf na URL se necessário
  const printUrl = url.includes('?') ? `${url}&print-pdf` : `${url}?print-pdf`;
  await page.goto(printUrl, {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  await page.waitForTimeout(2000);
  
  // Gerar PDF
  console.log('📋 Gerando PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
  
  await browser.close();
  
  console.log('✅ PDF gerado com sucesso!');
  console.log('📄 Arquivo salvo em:', outputPath);
  console.log('');
  console.log('🎉 Processo concluído!');
}

// Executar
exportPDF().catch(error => {
  console.error('❌ Erro ao gerar PDF:', error);
  process.exit(1);
});
