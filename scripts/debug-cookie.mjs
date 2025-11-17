import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.evaluate(() => localStorage.removeItem('consent-preferences'));
  await page.reload();
  const locator = await page.$('[data-testid="cookie-banner-accept-all"]');
  console.log('locator exists:', !!locator);
  if (locator) {
    const visible = await locator.isVisible();
    console.log('visible:', visible);
    const box = await locator.boundingBox();
    console.log('box:', box);
    const html = await page.evaluate(el => el.outerHTML, locator);
    console.log('outerHTML:', html.slice(0, 200));
  }
  await browser.close();
})();
