/**
 * Inspeciona o DOM real do S08 no viewer
 * Compara com o HTML original
 */
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navegar para o slide 8 (que é slide-10 no id)
  const url = 'http://localhost:8000/OSTEOPOROSE/src/index.html#slide-10';
  console.log('Navegando para:', url);
  
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verificar se o slide existe
  const slideExists = await page.$('#slide-10');
  console.log('\n=== SLIDE #slide-10 EXISTE? ===');
  console.log(slideExists ? 'SIM' : 'NÃO');
  
  if (!slideExists) {
    // Listar todos os slides
    const allSlides = await page.$$eval('.slide', slides => 
      slides.map(s => ({ id: s.id, hidden: s.hidden, display: getComputedStyle(s).display }))
    );
    console.log('\nTodos os slides encontrados:', allSlides.length);
    console.log(allSlides.slice(0, 15));
    await browser.close();
    return;
  }
  
  // Verificar estado do slide
  const slideState = await page.$eval('#slide-10', el => ({
    hidden: el.hidden,
    ariaHidden: el.getAttribute('aria-hidden'),
    display: getComputedStyle(el).display,
    visibility: getComputedStyle(el).visibility,
    opacity: getComputedStyle(el).opacity,
    width: getComputedStyle(el).width,
    height: getComputedStyle(el).height,
    overflow: getComputedStyle(el).overflow,
  }));
  console.log('\n=== ESTADO DO SLIDE ===');
  console.log(slideState);
  
  // Contar elementos no slide
  const elementCount = await page.$eval('#slide-10', el => ({
    total: el.querySelectorAll('*').length,
    divs: el.querySelectorAll('div').length,
    h1: el.querySelectorAll('h1').length,
    h3: el.querySelectorAll('h3').length,
    p: el.querySelectorAll('p').length,
    svg: el.querySelectorAll('svg').length,
  }));
  console.log('\n=== CONTAGEM DE ELEMENTOS ===');
  console.log(elementCount);
  
  // Verificar o grid
  const gridExists = await page.$('#utilidade-grid');
  console.log('\n=== GRID #utilidade-grid EXISTE? ===');
  console.log(gridExists ? 'SIM' : 'NÃO');
  
  if (gridExists) {
    const gridState = await page.$eval('#utilidade-grid', el => ({
      display: getComputedStyle(el).display,
      gridTemplateColumns: getComputedStyle(el).gridTemplateColumns,
      width: getComputedStyle(el).width,
      childCount: el.children.length,
    }));
    console.log('Estado do grid:', gridState);
    
    // Verificar filhos do grid (colunas)
    const gridChildren = await page.$$eval('#utilidade-grid > div', divs => 
      divs.map((d, i) => ({
        index: i,
        display: getComputedStyle(d).display,
        width: getComputedStyle(d).width,
        height: getComputedStyle(d).height,
        visibility: getComputedStyle(d).visibility,
        childCount: d.children.length,
      }))
    );
    console.log('\n=== COLUNAS DO GRID ===');
    gridChildren.forEach(c => console.log(c));
    
    // Verificar a coluna 2 (boxes)
    if (gridChildren.length >= 2) {
      console.log('\n=== BOXES NA COLUNA 2 ===');
      const boxes = await page.$$eval('#utilidade-grid > div:nth-child(2) > div', divs => 
        divs.map((d, i) => ({
          index: i,
          display: getComputedStyle(d).display,
          visibility: getComputedStyle(d).visibility,
          opacity: getComputedStyle(d).opacity,
          width: getComputedStyle(d).width,
          height: getComputedStyle(d).height,
          backgroundColor: getComputedStyle(d).backgroundColor,
          textContent: d.querySelector('h3')?.textContent?.trim() || 'N/A',
        }))
      );
      boxes.forEach(b => console.log(b));
    }
  }
  
  // Verificar se há CSS escondendo elementos
  console.log('\n=== VERIFICAR CSS GLOBAL ===');
  const cssRules = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText;
          if (text.includes('display: none') || 
              text.includes('visibility: hidden') || 
              text.includes('opacity: 0')) {
            rules.push({ selector: rule.selectorText, css: text.substring(0, 200) });
          }
        }
      } catch (e) {
        // Cross-origin stylesheet
      }
    }
    return rules;
  });
  console.log('Regras que podem esconder elementos:', cssRules.length);
  cssRules.slice(0, 10).forEach(r => console.log(r));
  
  // Extrair o HTML do slide como está no DOM
  const slideHTML = await page.$eval('#slide-10', el => el.outerHTML);
  console.log('\n=== TAMANHO DO HTML NO DOM ===');
  console.log('Caracteres:', slideHTML.length);
  
  // Salvar o HTML extraído para comparação
  const fs = require('fs');
  fs.writeFileSync('c:/Dev/Projetos/Aulas2/scripts/S08_DOM_EXTRACTED.html', slideHTML);
  console.log('HTML salvo em: S08_DOM_EXTRACTED.html');
  
  await browser.close();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
