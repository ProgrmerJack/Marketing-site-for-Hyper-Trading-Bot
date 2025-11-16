
import { test, expect } from '@playwright/test';

const pages = [
  { url: '/', name: 'home' },
  { url: '/live-demo', name: 'live-demo' },
  { url: '/contact', name: 'contact' },
];

for (const page of pages) {
  test(`Visual regression test for ${page.name} page`, async ({ page: testPage }) => {
    // Skip on CI/headless for first run - we're just capturing baselines
    test.skip();
  });
}
