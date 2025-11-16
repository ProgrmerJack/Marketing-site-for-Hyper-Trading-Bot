import { test, expect } from '@playwright/test';

test.describe('Cookie/Consent behavior', () => {
  test('CookieBanner should not display if consent-preferences exist', async ({ page }) => {
    // Ensure no consent present
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('consent-preferences'));

    // If there is no consent, banner should show
    await page.goto('/');
    const banner = page.locator('text=Cookies & consent');
    await expect(banner).toBeVisible();

    // Simulate accepting all using the CookieBanner controls
    // Use a combined promise to avoid a race where the element is removed mid-click (detached errors)
    const acceptButton = page.getByTestId('cookie-banner-accept-all');
    // Use DOM click via evaluation to avoid Playwright synthetic click issues in WebKit
    await Promise.all([
      acceptButton.evaluate((el) => (el as HTMLElement).click()),
      page.waitForSelector('[data-testid="cookie-banner"]', { state: 'hidden', timeout: 2000 }),
    ]);

    // Banner should be hidden after acceptance
    await expect(banner).toBeHidden();

    // Reload page - banner should remain hidden due to stored consent
    await page.reload();
    await expect(banner).toBeHidden();
  });
});
