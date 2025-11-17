import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const footer = await page.$('footer');
  if (!footer) {
    console.log('Footer not found in DOM');
    await browser.close();
    return;
  }

  const isVisible = await footer.isVisible();
  const box = await footer.boundingBox();
  const style = await page.evaluate(el => getComputedStyle(el), footer);
  console.log('Footer visible:', isVisible);
  console.log('Footer box:', box);
  console.log('Footer computed style display:', style.display, 'visibility:', style.visibility, 'opacity:', style.opacity);

  await browser.close();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
