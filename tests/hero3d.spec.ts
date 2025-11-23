import { test, expect } from '@playwright/test';

test('Hero telemetry or 3D canvas fallback appears on homepage', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);
  // Ensure main content is present first (helps with SSR/hydration delays), then wait for the hero card
  await page.waitForSelector('main', { timeout: 30000 });
  // Wait for hero card to appear (multiple retries to account for slow loads)
  let hero = await page.waitForSelector('[data-testid="hero-telemetry-card"]', { timeout: 10000 }).catch(() => null);
  if (!hero) {
    // Small retry with a longer timeout
    hero = await page.waitForSelector('[data-testid="hero-telemetry-card"]', { timeout: 15000 }).catch(() => null);
  }
  // If still missing, fallback to ensuring the signed telemetry text exists in the hero area
  if (!hero) {
    hero = await page.waitForSelector('text=Signed telemetry', { timeout: 20000 }).catch(() => null);
  }
  expect(hero).toBeTruthy();

  // Try to detect an expensive 3D canvas or an SVG fallback first
  const canvas = await hero.waitForSelector('canvas[data-testid="hero3d-canvas"]', { timeout: 2000 }).catch(() => null);
  const svg = await hero.waitForSelector('svg[data-testid="hero3d-svg"]', { timeout: 2000 }).catch(() => null);

  // If no canvas/svg exists, fallback to asserting the telemetry card has expected content
  if (canvas || svg) {
    expect(canvas || svg).toBeTruthy();
    return;
  }

  // Assert the hero contains signed telemetry copy as a stable fallback
  const signedTelemetry = await hero.waitForSelector('text=Signed telemetry', { timeout: 5000 }).catch(() => null);
  expect(signedTelemetry).toBeTruthy();
});
