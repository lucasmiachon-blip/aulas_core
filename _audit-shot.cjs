const { chromium } = require('playwright');
const path = require('path');

async function findAndCapture(port, searchText, outputName) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  
  await page.goto(`http://localhost:${port}/`);
  await page.waitForTimeout(600);
  
  for (let i = 1; i <= 70; i++) {
    const text = await page.evaluate(() => document.body.innerText);
    if (text.includes(searchText)) {
      const outputPath = path.join(__dirname, 'screenshots', outputName);
      await page.screenshot({ path: outputPath });
      console.log(`Found "${searchText}" at counter ${i}, saved: ${outputPath}`);
      await browser.close();
      return;
    }
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
  }
  console.log(`Not found: ${searchText}`);
  await browser.close();
}

(async () => {
  await Promise.all([
    findAndCapture(5501, 'Diretrizes divergem', 'GRADE-DIRETRIZES.png'),
    findAndCapture(5502, 'Refratura no 1', 'OSTEO-REFRATURA.png')
  ]);
})();
