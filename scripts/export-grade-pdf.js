const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação de PDF...');
  
  // Usar servidor local (fetch() não funciona com file:// por CORS)
  // Se servidor não estiver rodando, tentar iniciar ou usar URL
  // Tentar Live Server primeiro, fallback para outras portas
  const urlCandidates = [
    'http://127.0.0.1:5500/GRADE/src/index.html',  // Live Server
    'http://localhost:5500/GRADE/src/index.html',  // Live Server (alternativo)
    'http://localhost:8000/index.html',
    'http://localhost:8080/index.html',
    'https://lucasmiachon-blip.github.io/aulas_core/grade/',
    'https://lucasmiachon-blip.github.io/aulas_core/GRADE/dist/index.html'
  ];
  let url = urlCandidates[0];
  
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
  
  // Navegar para a página (com fallback)
  let loaded = false;
  for (const candidate of urlCandidates) {
    try {
      url = candidate;
      console.log('📄 Carregando página:', url);
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 60000
      });
      loaded = true;
      break;
    } catch (e) {
      console.warn('⚠️ Falhou:', candidate);
    }
  }
  if (!loaded) {
    throw new Error('Nenhuma URL funcionou para exportar o PDF. Verifique rede/servidor.');
  }
  
  // Aguardar scripts carregarem (não usa Reveal.js, usa sistema próprio)
  console.log('⏳ Aguardando scripts e DOM estarem prontos...');
  await page.waitForLoadState('domcontentloaded');
  
  // CRÍTICO: aguardar slides carregarem (fetch + insertAdjacentHTML)
  console.log('⏳ Aguardando slides carregarem...');
  
  // Aguardar o script carregar e executar
  await page.waitForFunction(() => {
    return window.__SLIDES_LOADED === true || document.querySelector('#viewport') !== null;
  }, { timeout: 10000 }).catch(() => {});
  
  // Aguardar slides serem inseridos no DOM
  let slidesCount = 0;
  let attempts = 0;
  const maxAttempts = 20; // 20 tentativas x 2 segundos = 40 segundos máximo
  
  while (slidesCount < 30 && attempts < maxAttempts) {
    await page.waitForTimeout(2000);
    slidesCount = await page.evaluate(() => {
      const viewport = document.getElementById('viewport');
      if (!viewport) return 0;
      return viewport.querySelectorAll('.slide, section.slide').length;
    });
    attempts++;
    if (slidesCount > 0) {
      console.log(`⏳ ${slidesCount} slides detectados até agora...`);
    }
  }

  // Verificar console para erros
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(text);
    if (text.includes('error') || text.includes('Error') || text.includes('❌')) {
      console.log('⚠️ Console:', text);
    }
  });
  
  if (slidesCount === 0) {
    console.warn('⚠️ Nenhum slide detectado após espera.');
    console.log('💡 Verificando console do navegador...');
    // Tentar uma última vez com mais tempo
    await page.waitForTimeout(5000);
    slidesCount = await page.evaluate(() => {
      const viewport = document.getElementById('viewport');
      return viewport ? viewport.querySelectorAll('.slide, section.slide').length : 0;
    });
  }
  
  console.log(`✅ ${slidesCount} slides detectados`);
  
  if (slidesCount === 0) {
    console.error('❌ Não foi possível carregar os slides. Verifique:');
    console.error('   1. Se o Live Server está rodando (porta 5500)');
    console.error('   2. Se os arquivos de slides existem em GRADE/src/slides/');
    console.error('   3. Abra no navegador e verifique o console (F12)');
  }
  
  // Aguardar fontes e recursos carregarem
  console.log('⏳ Aguardando fontes e recursos carregarem...');
  await page.waitForTimeout(2000);
  
  // Gerar PDF com modo print ativado
  console.log('📋 Gerando PDF...');
  await page.emulateMedia({ media: 'print' }); // Ativar @media print CSS
  
  // Aguardar um pouco mais para CSS print aplicar
  await page.waitForTimeout(1000);
  
  await page.pdf({
    path: outputPath,
    // 16:9 widescreen (definido em src/css/print.css via @page)
    preferCSSPageSize: true,
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
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