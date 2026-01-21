const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação de PDF...');
  
  // Usar servidor local (fetch() não funciona com file:// por CORS)
  // Se servidor não estiver rodando, tentar iniciar ou usar URL
  // Tentar GitHub Pages primeiro, fallback para localhost
  const url = 'https://lucasmiachon-blip.github.io/aulas_core/GRADE/dist/index.html';
  
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
  
  // CRÍTICO: Aguardar slides carregarem (sistema simplificado não usa evento 'slidesloaded')
  // Fetch com file:// não funciona por CORS, usar timeout maior para garantir carregamento
  console.log('⏳ Aguardando slides carregarem (pode demorar devido ao fetch local)...');
  await page.waitForTimeout(5000); // Tempo para fetch() tentar carregar (mesmo que falhe por CORS)
  
  // Verificar se slides foram carregados
  const slidesCount = await page.evaluate(() => {
    return document.querySelectorAll('.slide').length;
  });
  
  if (slidesCount === 0) {
    console.warn('⚠️ Nenhum slide carregado via fetch (esperado com file:// protocol)');
    console.log('💡 Para gerar PDF completo, use: npm run serve (servidor local)');
    console.log('📋 Gerando PDF com estrutura vazia (slides serão carregados em servidor)...');
  } else {
    console.log(`✅ ${slidesCount} slides detectados`);
  }
  
  // Aguardar fontes e recursos carregarem
  console.log('⏳ Aguardando fontes e recursos carregarem...');
  await page.waitForTimeout(2000);
  
  // Verificar quantos slides foram carregados (já verificado acima, apenas logar)
  console.log(`✅ ${slidesCount} slides detectados`);
  
  // Gerar PDF com modo print ativado
  console.log('📋 Gerando PDF...');
  await page.emulateMedia({ media: 'print' }); // Ativar @media print CSS
  
  // Aguardar um pouco mais para CSS print aplicar
  await page.waitForTimeout(1000);
  
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
    preferCSSPageSize: false, // Desabilitar para evitar conflitos
    displayHeaderFooter: false // Garantir sem cabeçalho/rodapé
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
