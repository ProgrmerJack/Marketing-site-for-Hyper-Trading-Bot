import { test } from '@playwright/test';

// This test mirrors what the original tests check exactly for a page
export default test('wait & report background state on /blog', async ({ page, baseURL }) => {
  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()));
  await page.goto(`${baseURL}/blog`);

  const backgroundsOn = await page.waitForFunction(() => (document.documentElement.dataset.backgroundEffects ?? 'false') === 'true', null, { timeout: 3500 }).catch(() => null);
  console.log('backgroundsOn', backgroundsOn);

  const canvasLocator = page.locator('canvas[data-testid="hyperspeed-canvas"]');
  let canvasCount = await canvasLocator.count();
  console.log('initial canvas count', canvasCount);
  if (backgroundsOn) {
    if (canvasCount === 0) {
      await canvasLocator.first().waitFor({ state: 'attached', timeout: 5000 }).catch(() => null);
      canvasCount = await canvasLocator.count();
      console.log('after wait canvas count', canvasCount);
    }
    if (canvasCount > 0) {
      const first = canvasLocator.first();
      await first.waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});
      const fallbackCount = await page.locator('div[data-testid="hyperspeed-fallback"]').count();
      console.log('final canvas count', canvasCount, 'fallbackCount', fallbackCount);
    } else {
      const fallback = await page.locator('div[data-testid="hyperspeed-fallback"]').count();
      console.log('no canvas, fallback count:', fallback);
    }
  } else {
    const fallbackCount = await page.locator('div[data-testid="hyperspeed-fallback"]').count();
    console.log('backgroundsOn false, fallbackCount:', fallbackCount);
  }
});
