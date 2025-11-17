import { webkit } from 'playwright';

(async () => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.type(), msg.text());
  });

  const port = process.env.PORT || 3000;
  await page.goto(`http://localhost:${port}`);
  await page.evaluate(() => localStorage.removeItem('consent-preferences'));
  await page.reload();
  // Wait for the banner to render
  try {
    await page.waitForSelector('[data-testid="cookie-banner"]', { timeout: 3000 });
  } catch {
    console.log('banner did not appear after reload');
  }

  // Check initial state
  const banner = await page.$('[data-testid="cookie-banner"]');
  console.log('initial banner exists:', !!banner);
  if (banner) console.log('initial banner visible:', await banner.isVisible());

  const acceptButton = await page.$('[data-testid="cookie-banner-accept-all"]');
  console.log('acceptButton exists:', !!acceptButton);
  if (acceptButton) {
    console.log('clicking accept');
    await acceptButton.click();
    // wait a bit longer than tests to ensure save flow executes
    await page.waitForTimeout(500);
    const afterBanner = await page.$('[data-testid="cookie-banner"]');
    console.log('after banner exists:', !!afterBanner);
    if (afterBanner) console.log('after banner visible:', await afterBanner.isVisible());
    const ls = await page.evaluate(() => localStorage.getItem('consent-preferences'));
    console.log('localStorage consent-preferences:', ls);
  }

  await browser.close();
})();
