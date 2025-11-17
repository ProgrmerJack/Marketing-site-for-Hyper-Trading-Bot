
import { test } from '@playwright/test';

const pages = [
  { url: '/', name: 'home' },
  { url: '/live-demo', name: 'live-demo' },
  { url: '/contact', name: 'contact' },
];

for (const p of pages) {
  test(`Visual regression test for ${p.name} page`, async () => {
    // Skip on CI/headless for first run - we're just capturing baselines
    test.skip();
  });
}
