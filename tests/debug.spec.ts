import { test } from '@playwright/test';

test('Debug: Homepage', async ({ page, browserName }) => {
  if (browserName !== 'chromium') {
    test.skip();
  }

  await page.goto('/', { waitUntil: 'load' });

  console.log('URL:', page.url());
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-home.png' });
  console.log('Screenshot saved');
  
  // Look for theme button using different methods
  console.log('Method 1 - getByLabel:');
  const btn1 = page.getByLabel('Toggle theme');
  console.log('  Count:', await btn1.count());
  
  console.log('Method 2 - getByRole:');
  const btn2 = page.getByRole('button', { name: /toggle|theme/i });
  console.log('  Count:', await btn2.count());
  
  console.log('Method 3 - locator by aria-label:');
  const btn3 = page.locator('[aria-label="Toggle theme"]');
  console.log('  Count:', await btn3.count());
  
  console.log('Method 4 - All buttons:');
  const allBtns = await page.getByRole('button').all();
  console.log('  Total:', allBtns.length);
  
  for (let i = 0; i < Math.min(10, allBtns.length); i++) {
    const text = await allBtns[i].textContent();
    const ariaLabel = await allBtns[i].getAttribute('aria-label');
    const html = await allBtns[i].innerHTML();
    console.log(`  Button ${i}: text="${text}" aria-label="${ariaLabel}" html="${html.substring(0, 50)}"`);
  }
});
