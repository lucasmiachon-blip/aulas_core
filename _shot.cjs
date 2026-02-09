const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:5502/');
  await page.waitForTimeout(600);
  
  for (let i = 1; i <= 70; i++) {
    const text = await page.evaluate(() => document.body.innerText);
    if (text.includes('Refratura no 1')) {
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'OSTEO-REFRATURA-AFTER.png') });
      console.log(`Captured at counter ${i}`);
      break;
    }
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
  }
  
  await browser.close();
})();
