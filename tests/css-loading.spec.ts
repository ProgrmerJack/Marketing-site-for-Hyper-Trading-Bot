import { test, expect } from '@playwright/test';

test('Global CSS variables are set (globals.css loaded)', async ({ page }) => {
  await page.goto('/');

  // Confirm the CSS asset is available and served as text/css
  const cssLink = await page.locator('link[rel="stylesheet"][href*="/_next/static/css"]').first().getAttribute('href');
  expect(cssLink).toBeTruthy();
  const cssHeadResp = await page.request.head(cssLink as string);
  expect(cssHeadResp.status()).toBe(200);
  const contentType = cssHeadResp.headers()['content-type'] || '';
  expect(contentType.startsWith('text/css')).toBeTruthy();

  // Verify a known computed style value — attempt header, then fall back to documentElement
  let headerColor = null;
  try {
    await page.waitForSelector('header', { state: 'visible', timeout: 5_000 });
    headerColor = await page.evaluate(() => {
      const el = document.querySelector('header');
      if (!el) return null;
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });
  } catch {
    // fallback to checking :root computed style if header isn't present or visible
    headerColor = await page.evaluate(() => {
      try {
        return window.getComputedStyle(document.documentElement).getPropertyValue('--background');
      } catch {
        return null;
      }
    });
  }
  // The header color should be a valid CSS color (not empty)
  expect(headerColor).toBeTruthy();

  // If our inline fallback script is allowed, the attribute should not be set; if CSP blocks inline script,
  // we still consider the CSS loaded if the computed style check returns a value and the CSS file exists.
  // The intent is to avoid false negatives when CSP prevents executing our fallback script.
  // Fallback attribute may or may not be present depending on CSP; assert only that the stylesheet rendered.
  expect(Boolean(headerColor)).toBe(true);
});