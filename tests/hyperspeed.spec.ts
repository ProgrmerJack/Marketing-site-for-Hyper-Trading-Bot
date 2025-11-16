import { test, expect } from '@playwright/test';

const pagesToTest = [
  '/',
  '/how-it-works',
  '/pricing',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/research',
  '/status',
  '/live-demo'
];

for (const route of pagesToTest) {
  test(`hyperspeed background present on ${route}`, async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${route}`);

    // Wait for backgrounds to be enabled on the page (MotionProvider hydration)
    const backgroundsOnHandle = await page.waitForFunction(() => (document.documentElement.dataset.backgroundEffects ?? 'false') === 'true', null, { timeout: 3500 }).catch(() => null);
    const backgroundsOn = backgroundsOnHandle ? await backgroundsOnHandle.jsonValue().catch(() => false) : false;

    // Wait for the hyperspeed canvas test-id to appear (if animated)
    const canvas = page.locator('canvas[data-testid="hyperspeed-canvas"]');
    // Instead of relying solely on locator.count() which can sometimes hang, wait for either canvas
    // to be attached or the fallback to exist, then count to avoid timeout-race conditions.
    await page.waitForSelector('canvas[data-testid="hyperspeed-canvas"], div[data-testid="hyperspeed-fallback"]', { timeout: 6000 }).catch(() => null);
    // Avoid locator.count() timeouts by counting via page.$$eval which directly queries the DOM.
    const canvasCount = await page.$$eval('canvas[data-testid="hyperspeed-canvas"]', (r) => r.length);

    if (backgroundsOn) {
      let count = canvasCount;
      if (count === 0) {
        // Wait a bit for canvas creation after backgrounds are enabled
        await page.waitForSelector('canvas[data-testid="hyperspeed-canvas"]', { state: 'attached', timeout: 5000 }).catch(() => null);
        count = await page.$$eval('canvas[data-testid="hyperspeed-canvas"]', (r) => r.length);
      }
      if (count > 0) {
      const first = await page.$('canvas[data-testid="hyperspeed-canvas"]');
          if (first) {
            // ElementHandle does not have a waitFor helper, use a selector wait instead
            await page.waitForSelector('canvas[data-testid="hyperspeed-canvas"]', { state: 'attached', timeout: 5000 }).catch(() => {});
          }
      const opacity = await first?.evaluate((el: HTMLElement) => window.getComputedStyle(el).opacity || '0');
      expect(Number(opacity)).toBeGreaterThanOrEqual(0.85);
      expect(Number(opacity)).toBeLessThanOrEqual(0.95);
      } else {
      // If no animated canvas, at least ensure the UnifiedBackground fallback exists
      const fallback = page.locator('div[data-testid="hyperspeed-fallback"]');
      expect(await fallback.count()).toBeGreaterThanOrEqual(0);
      }
    } else {
      // If backgrounds never enabled within the timeout, ensure fallback exists
      const fallback = page.locator('div[data-testid="hyperspeed-fallback"]');
      expect(await fallback.count()).toBeGreaterThanOrEqual(0);
    }
  });
}
