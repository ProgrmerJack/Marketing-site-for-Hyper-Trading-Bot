import { test, expect } from '@playwright/test';

test('Global CSS variables are set (globals.css loaded)', async ({ page }) => {
  await page.goto('/');
  const cssLoaded = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--site-css-loaded');
  });
  // If CSS is loaded, the --site-css-loaded CSS variable should be present (truthy)
  expect(Boolean(cssLoaded)).toBeTruthy();
  // Ensure our fallback script didn't trigger (no data-css-fallback attribute)
  const fallbackAttr = await page.evaluate(() => document.documentElement.getAttribute('data-css-fallback'));
  expect(fallbackAttr).toBeNull();

  // Ensure the server serves the CSS asset with correct content-type
  const response = await page.request.head('/_next/static/css/app/layout.css');
  expect(response.status()).toBe(200);
  const contentType = response.headers()['content-type'] || '';
  expect(contentType.startsWith('text/css')).toBeTruthy();
});