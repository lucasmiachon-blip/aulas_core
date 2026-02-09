const { chromium } = require('playwright');
const path = require('path');

async function findSlide(port, searchText, outputName) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  
  await page.goto(`http://localhost:${port}/`);
  await page.waitForTimeout(600);
  
  for (let i = 1; i <= 70; i++) {
    const text = await page.evaluate(() => document.body.innerText);
    if (text.toLowerCase().includes(searchText.toLowerCase())) {
      console.log(`Found "${searchText}" at counter ${i}`);
      const outputPath = path.join(__dirname, 'screenshots', outputName);
      await page.screenshot({ path: outputPath });
      console.log(`Saved: ${outputPath}`);
      await browser.close();
      return i;
    }
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
  }
  console.log(`Not found: ${searchText}`);
  await browser.close();
  return -1;
}

(async () => {
  await Promise.all([
    findSlide(5502, 'Refratura no', 'OSTEO-REFRATURA-BEFORE.png'),
    findSlide(5501, 'Diretrizes divergem', 'GRADE-DIRETRIZES-BEFORE.png')
  ]);
})();
