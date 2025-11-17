import { chromium } from 'playwright';
import net from 'node:net';

function waitForPort(port, host = '127.0.0.1', retries = 30, delay = 1000) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tryConnect = () => {
      const socket = net.connect({ port, host }, () => {
        socket.destroy();
        resolve();
      });
      socket.on('error', () => {
        socket.destroy();
        attempts++;
        if (attempts >= retries) return reject(new Error(`Port ${port} not open after ${retries} tries`));
        setTimeout(tryConnect, delay);
      });
    };
    tryConnect();
  });
}

(async () => {
  const ports = [3000, 3001];
  let hostPort = null;
  for (const p of ports) {
    try {
      await waitForPort(p, '127.0.0.1', 30, 250);
      hostPort = p;
      break;
    } catch {
      // continue
    }
  }
  if (!hostPort) throw new Error('Dev server not found on ports 3000/3001');
  const url = `http://localhost:${hostPort}`;
  console.log('Detected dev server on port', hostPort);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture console messages
  page.on('console', msg => {
    const loc = msg.location();
    const locationText = loc ? `${loc.url}:${loc.lineNumber}:${loc.columnNumber}` : '';
    if (msg.type() === 'error') {
      console.error('PAGE ERROR:', msg.text(), locationText);
    } else {
      console.log('PAGE LOG:', msg.type(), msg.text(), locationText);
    }
  });
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText || request.failure()?.errorCode);
  });
  page.on('pageerror', err => {
    console.error('PAGE ERROR (runtime):', err.message, err.stack);
  });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for hero telemetry card, then try to find the feature cards
  await page.waitForSelector('[data-testid="hero-telemetry-card"]', { timeout: 60000 });

  let firstCardClass = null;
  try {
    await page.waitForSelector('[data-testid="feature-card"]', { timeout: 60000 });
    firstCardClass = await page.$eval('[data-testid="feature-card"]', el => el.className);
    } catch {
    console.warn('No feature card found on the page within 60s (slot might be dynamic).');
    // Take a screenshot for debugging
    try {
      await page.screenshot({ path: 'tmp_feature_card_missing.png', fullPage: true });
      console.log('Saved screenshot tmp_feature_card_missing.png');
    } catch {
      // ignore
    }
  }

  // Debug: list children in the workflow feature grid (by heading text)
  try {
    const gridInfo = await page.evaluate(() => {
      // Find the H2 with the matching text
      const headings = Array.from(document.querySelectorAll('h2'));
      const target = headings.find((h) => /Signals, controls, execution/i.test(h.textContent || ''));
      const section = target ? target.closest('section') : null;
      const grid = section ? section.querySelector('.grid') : null;
      return {
        gridHTML: grid?.outerHTML?.substring(0, 400) || null,
        childCount: grid?.children.length || 0,
        gridText: grid?.innerText || null,
      };
    });
    console.log('Grid info:', gridInfo);
  } catch {
    // ignore
  }

  // Get computed background of card-spotlight elements (light mode)
  const cardSpotlightInfoLight = await page.$$eval('.card-spotlight', els => els.map(el => ({ bg: window.getComputedStyle(el).backgroundColor, className: el.className })));

  // Get computed color in light & dark modes (toggle class on html)
  const heroTextColorLight = await page.$eval('[data-testid="hero-telemetry-card"] p', el => ({ color: window.getComputedStyle(el).color, className: el.className, priority: window.getComputedStyle(el).getPropertyPriority('color') }));

  // Force dark mode by toggling class on the html element
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(100);
  const heroTextColorDark = await page.$eval('[data-testid="hero-telemetry-card"] p', el => ({ color: window.getComputedStyle(el).color, className: el.className, priority: window.getComputedStyle(el).getPropertyPriority('color') }));

  // check for a canvas background element (hyperspeed variant renders a canvas)
  const canvasCount = await page.$$eval('canvas', (els) => els.length);
  // Get computed background of card-spotlight elements (dark mode)
  const cardSpotlightInfoDark = await page.$$eval('.card-spotlight', els => els.map(el => ({ bg: window.getComputedStyle(el).backgroundColor, className: el.className })));
  // Note: we intentionally use separate light/dark computations; combined result is not used.

  console.log('First feature card classes:', firstCardClass);
  console.log('Hero telemetry text color (light):', heroTextColorLight.color, 'class:', heroTextColorLight.className, 'priority:', heroTextColorLight.priority);
  console.log('Hero telemetry text color (dark):', heroTextColorDark.color, 'class:', heroTextColorDark.className, 'priority:', heroTextColorDark.priority);
  console.log('Canvas count found:', canvasCount);
  console.log('Card spotlight info (light):', cardSpotlightInfoLight);
  console.log('Card spotlight info (dark):', cardSpotlightInfoDark);

  await browser.close();
})();
