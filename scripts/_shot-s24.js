const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });

  // Access index.html directly
  await page.goto('http://localhost:3458/dist/index.html', { waitUntil: 'networkidle' });

  // Wait for deck:loaded event or slides to appear
  await page.waitForFunction(() => {
    const slides = document.querySelectorAll('[data-slides] .slide');
    return slides.length > 0;
  }, { timeout: 30000 });

  await page.waitForTimeout(1000);

  // Reset to first slide
  await page.keyboard.press('Home');
  await page.waitForTimeout(500);

  // Navigate to slide 16 (S24 - line 18 minus 2 comment lines)
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(800);

  await page.screenshot({ path: 'screenshots/S24_REVERTED.png' });
  console.log('Screenshot saved: screenshots/S24_REVERTED.png');

  await browser.close();
})();
