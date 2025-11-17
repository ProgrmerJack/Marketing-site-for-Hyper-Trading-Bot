import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...devices['Pixel 5'] });
  const page = await context.newPage();

  try {
    console.log('Navigating to /');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1000);

    const gradientElements = await page.locator('[class*="gradient"], [class*="bg-gradient"]').count();
    console.log('Gradient elements count:', gradientElements);

    const inputs = await page.locator('input, textarea').count();
    console.log('Inputs count:', inputs);

    // Log if submit button exists
    const submitBtn = await page.getByRole('button', { name: /request|submit/i }).count();
    console.log('Submit button count:', submitBtn);

    // Log footer visible
    const footerVisible = await page.locator('footer').first().isVisible().catch(() => false);
    console.log('Footer visible:', footerVisible);

    // Print HTML snippet around contact form
    try {
      await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(500);
      const inputsOnContact = await page.locator('input, textarea').count();
      console.log('Inputs count on /contact:', inputsOnContact);
      const form = await page.locator('form').first().innerHTML().catch(() => null);
      console.log('Contact form innerHTML (snippet):', form ? form.slice(0, 400) : 'FORM NOT FOUND');
    } catch (e) {
      console.error('Error loading /contact:', e.message);
    }
  } catch (err) {
    console.error('Error during check:', err.message);
  } finally {
    await browser.close();
  }
})();