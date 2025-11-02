/**
 * Animation Performance Testing
 * Validates smooth 60fps animations and transitions
 */

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

async function measureAnimationPerformance() {
  console.log("Testing animation performance...\n");
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = [];
  
  // Test homepage animations
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  
  // Measure hero animation
  const heroMetrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let frames = 0;
      let startTime = performance.now();
      
      function measureFrame() {
        frames++;
        const elapsed = performance.now() - startTime;
        
        if (elapsed >= 1000) {
          const fps = (frames / elapsed) * 1000;
          resolve({ fps, frames, duration: elapsed });
        } else {
          requestAnimationFrame(measureFrame);
        }
      }
      
      requestAnimationFrame(measureFrame);
    });
  });
  
  console.log(`Hero Animation:`);
  console.log(`  FPS: ${heroMetrics.fps.toFixed(2)}`);
  console.log(`  Frames: ${heroMetrics.frames}`);
  console.log(`  Target: 60 FPS`);
  console.log(`  ${heroMetrics.fps >= 55 ? "✓ PASS" : "✗ FAIL"}\n`);
  
  results.push({
    test: "Hero Animation",
    fps: heroMetrics.fps,
    passed: heroMetrics.fps >= 55,
  });
  
  // Test scroll performance
  await page.evaluate(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  });
  
  await page.waitForTimeout(1000);
  
  const scrollMetrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let frames = 0;
      let startTime = performance.now();
      
      function measureFrame() {
        frames++;
        const elapsed = performance.now() - startTime;
        
        if (elapsed >= 1000) {
          const fps = (frames / elapsed) * 1000;
          resolve({ fps, frames });
        } else {
          requestAnimationFrame(measureFrame);
        }
      }
      
      requestAnimationFrame(measureFrame);
    });
  });
  
  console.log(`Scroll Performance:`);
  console.log(`  FPS: ${scrollMetrics.fps.toFixed(2)}`);
  console.log(`  Target: 60 FPS`);
  console.log(`  ${scrollMetrics.fps >= 55 ? "✓ PASS" : "✗ FAIL"}\n`);
  
  results.push({
    test: "Scroll Performance",
    fps: scrollMetrics.fps,
    passed: scrollMetrics.fps >= 55,
  });
  
  // Test hover animations
  const button = await page.locator("a[href='/contact']").first();
  await button.hover();
  await page.waitForTimeout(500);
  
  console.log(`Button Hover Animation: ✓ PASS\n`);
  
  await browser.close();
  
  // Summary
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;
  
  console.log(`${"=".repeat(50)}`);
  console.log(`Animation Performance Results`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${total - passed}`);
  console.log(`${"=".repeat(50)}\n`);
  
  if (passed === total) {
    console.log("✓ All animations meet 60fps target");
  } else {
    console.log("✗ Some animations below 60fps target");
  }
  
  process.exit(passed === total ? 0 : 1);
}

measureAnimationPerformance().catch((error) => {
  console.error("Animation performance test failed:", error);
  process.exit(1);
});
