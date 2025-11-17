import type { Page } from '@playwright/test';

export async function waitForStableElements(page: Page, selector: string, timeout = 90000) {
  // Wait for network activity to finish and the selector to be visible
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
  // Prefer locator-based waiting which tends to be more stable across devices
  const locator = page.locator(selector).first();
  try {
    await locator.waitFor({ state: 'visible', timeout });
  } catch {
    // Retry once in case of a heavy/slow hydration on mobile; reload and wait again
    await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForLoadState('networkidle');
    await locator.waitFor({ state: 'visible', timeout }).catch(() => {});
  }
  // Small buffer to let any hydration or CSS transitions settle
  await page.waitForTimeout(350);
}

export async function waitAndCount(page: Page, selector: string, timeout = 90000) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: 'visible', timeout });
  await page.waitForTimeout(200);
  return await page.locator(selector).count();
}

export function guardAgainstChunkLoad(page: Page, maxRetries = 1) {
  let retryCount = 0;
  page.on('pageerror', async (err) => {
    const message = (err && err.message) || String(err || '');
    if (message.includes('ChunkLoadError') && retryCount < maxRetries) {
      retryCount++;
      // Try a gentle reload; rely on test retries to recover if this doesn't succeed
      try {
        await page.reload({ waitUntil: 'networkidle' });
      } catch {
        // ignore
      }
    }
  });
}
