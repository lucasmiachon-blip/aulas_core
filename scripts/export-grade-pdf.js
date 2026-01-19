const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação de PDF...');
  
  // Usar arquivo local ao invés de URL online
  const gradeIndexPath = path.join(__dirname, '..', 'GRADE', 'dist', 'index.html');
  const url = `file://${gradeIndexPath.replace(/\\/g, '/')}`;
  
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
  await page.waitForTimeout(5000);
  
  // Aguardar scripts carregarem (não usa Reveal.js, usa sistema próprio)
  console.log('⏳ Aguardando scripts e DOM estarem prontos...');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000); // Tempo extra para scripts executarem
  
  console.log('✅ Página carregada');
  
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
