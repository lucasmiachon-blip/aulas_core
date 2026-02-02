/**
 * Tira screenshot do slide S08 AGORA para comparação
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Viewport 1920x1080
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navegar para o slide 8 (que é slide-10 no id)
  // S08 = arquivo S08_slide-08.html = id="slide-10"
  const url = 'http://localhost:8000/OSTEOPOROSE/src/index.html#slide-10';
  console.log('Navegando para:', url);
  
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  
  // Esperar o slide carregar
  await page.waitForTimeout(2000);
  
  // Tirar screenshot
  const outputPath = path.join(__dirname, '..', 'screenshots', 'osteoporose', 'S08_NOVO.png');
  
  // Criar pasta se não existir
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log('Screenshot salva em:', outputPath);
  
  await browser.close();
  console.log('Concluído!');
}

main().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
