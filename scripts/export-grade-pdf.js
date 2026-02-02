const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPDF() {
  console.log('🚀 Iniciando exportação de PDF...');
  
  // Usar servidor local (fetch() não funciona com file:// por CORS)
  // Se servidor não estiver rodando, tentar iniciar ou usar URL
  // Tentar GitHub Pages primeiro, fallback para localhost
  // Live Server (5500) em primeiro; 8000 = fallback (Python do exportar-pdf-e-zip.ps1).
  const urlCandidates = [
    'http://localhost:8888/GRADE/src/index.html',
    'http://127.0.0.1:8888/GRADE/src/index.html',
    'http://127.0.0.1:5500/GRADE/src/index.html',
    'http://localhost:5500/GRADE/src/index.html',
    'http://localhost:8000/GRADE/src/index.html',
    'https://lucasmiachon-blip.github.io/aulas_core/GRADE/src/index.html'
  ];
  let url = urlCandidates[0];
  
  // Pasta de saída
  const outputDir = path.join(__dirname, '..', 'GRADE', 'exports');
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
  let slidesCount = 0;
  try {
    await page.waitForFunction(() => document.querySelectorAll('.slide').length >= 40, { timeout: 60000 });
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  } catch (e) {
    // Fallback: esperar um pouco e seguir (evita falha dura em rede instável)
    await page.waitForTimeout(5000);
    slidesCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  }

  if (slidesCount === 0) {
    console.warn('⚠️ Nenhum slide detectado. Verifique se a URL está acessível e se o fetch() não foi bloqueado.');
    console.log('💡 Dica: abra a URL no navegador e confira o console para erros de rede.');
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
