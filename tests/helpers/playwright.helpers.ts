import type { Page } from '@playwright/test';

// Debug: confirm module load and exported helper names (removed in final cleanup)
// debug trace disabled - module loaded

export async function waitForStableElements(page: Page, selector: string, timeout = 90000) {
  // Wait for network activity to finish and the selector to be visible
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
  // Prefer locator-based waiting which tends to be more stable across devices
  try {
    await safeWaitForVisible(page, selector, timeout);
  } catch {
    // Retry once in case of a heavy/slow hydration on mobile; reload and wait again
    await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForLoadState('networkidle');
    await safeWaitForVisible(page, selector, timeout).catch(() => {});
  }
  // Small buffer to let any hydration or CSS transitions settle
  await page.waitForTimeout(350);
}

export async function waitAndCount(page: Page, selector: string, timeout = 90000) {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
  // Note: locator isn't used directly here to avoid multiple locator resolutions; safeWaitForVisible will handle it
  await safeWaitForVisible(page, selector, timeout);
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

export async function safeWaitForVisible(page: Page, selector: string, timeout = 90000) {
  const locator = page.locator(selector).first();
  const start = Date.now();
  let attempts = 0;
  while (Date.now() - start < timeout && attempts < 3) {
    try {
      await locator.waitFor({ state: 'visible', timeout: Math.max(5000, timeout) });
      return;
    } catch (err: unknown) {
      const message = (err as Error)?.message || String(err || '');
      attempts++;
      // If the page or context was closed, wait briefly and retry once
      if (message && /Target page, context or browser has been closed|page.waitForTimeout: Target page, context or browser has been closed/i.test(message)) {
        await new Promise((r) => setTimeout(r, 300));
        continue;
      }
      // If locator wasn't found, continue retrying until timeout
      if (attempts >= 3) throw err;
    }
  }
  throw new Error(`Timed out waiting for selector to be visible: ${selector}`);
}

export async function dismissCookieBanner(page: Page, timeout = 3000) {
  // Try to accept cookie banner if present; ignore failures
  const acceptBtn = page.locator('[data-testid="cookie-banner-accept-all"]').first();
  try {
    // only try to click if the button appears quickly to avoid long implicit waits
    const count = await acceptBtn.count();
    if (count > 0) {
      await acceptBtn.click({ timeout: 2000 }).catch(() => {});
    }
  } catch {
    // ignore any errors (page closed / element not available)
  }
  try {
    await page.locator('[data-testid="cookie-banner"]').waitFor({ state: 'detached', timeout });
  } catch {
    // ignore - banner may not be present
  }
}
