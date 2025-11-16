import { test } from '@playwright/test';

test('debug canvas on /blog', async ({ page, baseURL }) => {
  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()));
  await page.goto(`${baseURL}/blog`);
  const ds = await page.evaluate(() => ({ 
    dataset: document.documentElement.dataset, 
    canvasCount: document.querySelectorAll('canvas[data-testid="hyperspeed-canvas"]').length,
    fallbackCount: document.querySelectorAll('div[data-testid="hyperspeed-fallback"]').length,
    allCanvases: Array.from(document.querySelectorAll('canvas')).map(c => ({ className: c.className, dataset: Object.fromEntries(Object.entries(c.dataset)) })),
    unifiedBg: !!document.querySelector('div.pointer-events-none.fixed.inset-0'),
  }));
  console.log('Document dataset:', ds.dataset);
  console.log('canvasCount:', ds.canvasCount);
  console.log('fallbackCount:', ds.fallbackCount);
  console.log('unifiedBg present:', ds.unifiedBg);
  console.log('allCanvases:', ds.allCanvases);
});
