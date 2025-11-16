/**
 * Visual Regression Testing for Marketing Site
 * Tests core pages for visual consistency and design quality
 */

import { chromium, firefox, webkit } from "playwright";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";
const SCREENSHOT_DIR = join(process.cwd(), "screenshots");
const BROWSERS = [
  { name: "chromium", launcher: chromium },
  { name: "firefox", launcher: firefox },
  { name: "webkit", launcher: webkit },
];

// Ensure screenshot directory exists
if (!existsSync(SCREENSHOT_DIR)) {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const results = [];

async function captureStyles(page) {
  return page.evaluate(() => {
    const readStyles = (element) => {
      if (!element) return null;
      const styles = window.getComputedStyle(element);
      return {
        backgroundImage: styles.backgroundImage,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        boxShadow: styles.boxShadow,
        color: styles.color,
        backdropFilter: styles.backdropFilter,
      };
    };

    const sliceStyles = (selector, limit = 4) =>
      Array.from(document.querySelectorAll(selector))
        .slice(0, limit)
        .map((el) => readStyles(el));

    return {
      hero: readStyles(document.querySelector('[data-testid="hero-telemetry-card"]')),
      featureCards: sliceStyles('[data-testid="feature-card"]'),
      testimonialCards: sliceStyles('[data-testid="testimonial-card"]'),
    };
  });
}

async function testPage(browserName, page, url, name, viewport) {
  const startTime = Date.now();
  
  try {
    // Navigate to page
    await page.setViewportSize(viewport);
    await page.goto(url, { waitUntil: "networkidle" });
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    // Take screenshot
    const screenshotPath = join(
      SCREENSHOT_DIR,
      `${browserName}-${name}-${viewport.width}x${viewport.height}.png`
    );
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    const styleSnapshot = await captureStyles(page);
    
    // Check for visual indicators of Apple-inspired design
    const hasGlassmorphism = await page.evaluate(() => {
      const elements = document.querySelectorAll(".glass");
      return elements.length > 0;
    });
    
    const hasSmoothAnimations = await page.evaluate(() => {
      const elements = document.querySelectorAll('[class*="transition"]');
      return elements.length > 10; // Should have multiple animated elements
    });
    
    const hasModernTypography = await page.evaluate(() => {
      const headings = document.querySelectorAll("h1, h2, h3");
      if (headings.length === 0) return false;
      
      const firstHeading = headings[0];
      const styles = window.getComputedStyle(firstHeading);
      const letterSpacing = parseFloat(styles.letterSpacing);
      
      // Apple uses tight letter spacing
      return letterSpacing < 0;
    });
    
    const loadTime = Date.now() - startTime;
    
    results.push({
      page: name,
      viewport: `${viewport.width}x${viewport.height}`,
      passed: hasGlassmorphism && hasSmoothAnimations && hasModernTypography,
      browser: browserName,
      metrics: {
        loadTime,
        animationFrames: 0, // Placeholder
      },
      styles: styleSnapshot,
    });
    
    console.log(`✓ [${browserName}] ${name} (${viewport.width}x${viewport.height}): ${loadTime}ms`);
    if (hasGlassmorphism) console.log("  ✓ Glassmorphism detected");
    if (hasSmoothAnimations) console.log("  ✓ Smooth animations detected");
    if (hasModernTypography) console.log("  ✓ Modern typography detected");
    
  } catch (error) {
    results.push({
      page: name,
      browser: browserName,
      viewport: `${viewport.width}x${viewport.height}`,
      passed: false,
      error: error.message,
    });
    console.error(`✗ ${name} (${viewport.width}x${viewport.height}): ${error.message}`);
  }
}

async function runVisualTests() {
  console.log("Starting visual regression tests...\n");
  
  for (const { name: browserName, launcher } of BROWSERS) {
    console.log(`\n--- Running suite in ${browserName} ---\n`);

    const browser = await launcher.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  
    // Test viewports (Apple-inspired)
  const viewports = [
    { width: 390, height: 844 },   // iPhone 14 Pro
    { width: 1920, height: 1080 }, // Desktop
    { width: 1512, height: 982 },  // MacBook Air
  ];
  
  // Test pages
  const pages = [
    { url: `${BASE_URL}/`, name: "home" },
    { url: `${BASE_URL}/live-demo`, name: "live-demo" },
    { url: `${BASE_URL}/contact`, name: "contact" },
  ];
  
    for (const viewport of viewports) {
      for (const pageData of pages) {
        await testPage(browserName, page, pageData.url, pageData.name, viewport);
      }
    }

    await browser.close();
  }

  const mismatches = [];
  const grouped = new Map();

  for (const result of results) {
    const key = `${result.page}|${result.viewport}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(result);
  }

  for (const [key, group] of grouped.entries()) {
    if (group.length < 2) continue;
    const reference = JSON.stringify(group[0].styles);
    for (const candidate of group.slice(1)) {
      if (JSON.stringify(candidate.styles) !== reference) {
        mismatches.push({
          target: key,
          browser: candidate.browser,
        });
      }
    }
  }
  
  // Generate report
  const passedTests = results.filter((r) => r.passed).length;
  const totalTests = results.length;
  
  console.log(`\n${"=".repeat(50)}`);
  console.log(`Visual Regression Test Results`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Total: ${totalTests} | Passed: ${passedTests} | Failed: ${totalTests - passedTests}`);
  console.log(`${"=".repeat(50)}`);
  if (mismatches.length) {
    console.log(`Cross-browser mismatches detected:`);
    mismatches.forEach((mismatch) => {
      console.log(
        `  - ${mismatch.target} diverged in ${mismatch.browser}. Inspect corresponding screenshot.`
      );
    });
    console.log(`${"=".repeat(50)}\n`);
  } else {
    console.log(`No cross-browser style discrepancies detected.`);
    console.log(`${"=".repeat(50)}\n`);
  }
  
  // Save results
  writeFileSync(
    join(SCREENSHOT_DIR, "test-results.json"),
    JSON.stringify(results, null, 2)
  );
  
  process.exit(totalTests === passedTests && mismatches.length === 0 ? 0 : 1);
}

runVisualTests().catch((error) => {
  console.error("Test suite failed:", error);
  process.exit(1);
});
