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
  
  // Aguardar scripts carregarem (não usa Reveal.js, usa sistema próprio)
  console.log('⏳ Aguardando scripts e DOM estarem prontos...');
  await page.waitForLoadState('domcontentloaded');
  
  // CRÍTICO: Aguardar evento 'slidesloaded' (slides carregados dinamicamente via fetch)
  console.log('⏳ Aguardando slides carregarem...');
  await page.evaluate(() => {
    return new Promise((resolve) => {
      // Se slides já carregaram, resolver imediatamente
      if (document.querySelectorAll('.slide').length > 0) {
        resolve();
        return;
      }
      // Caso contrário, aguardar evento
      window.addEventListener('slidesloaded', resolve, { once: true });
      // Timeout de segurança (30s)
      setTimeout(resolve, 30000);
    });
  });
  
  // Aguardar fontes e recursos carregarem
  console.log('⏳ Aguardando fontes e recursos carregarem...');
  await page.waitForTimeout(2000);
  
  // Verificar quantos slides foram carregados
  const slidesCount = await page.evaluate(() => {
    return document.querySelectorAll('.slide').length;
  });
  console.log(`✅ ${slidesCount} slides carregados`);
  
  // Gerar PDF com modo print ativado
  console.log('📋 Gerando PDF...');
  await page.emulateMedia({ media: 'print' }); // Ativar @media print CSS
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
    },
    preferCSSPageSize: true // Respeitar @page do CSS
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
