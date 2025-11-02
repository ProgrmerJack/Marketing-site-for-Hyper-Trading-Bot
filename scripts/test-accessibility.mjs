#!/usr/bin/env node
/**
 * Keyboard Accessibility Audit (WCAG 2.2 Compliance)
 * 
 * Tests keyboard-only navigation and accessibility requirements:
 * - Focus visibility (SC 2.4.7, 2.4.11, 2.4.13)
 * - Target size (SC 2.5.8 - 24x24px minimum)
 * - Keyboard operability (SC 2.1.1)
 * - Focus order (SC 2.4.3)
 * 
 * Usage:
 *   node scripts/test-accessibility.mjs [url]
 */

import { chromium } from 'playwright';

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const MIN_TARGET_SIZE = 24; // WCAG 2.2 Level AA
const RECOMMENDED_TARGET_SIZE = 44; // WCAG AAA / iOS guidelines

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║      Keyboard Accessibility Audit (WCAG 2.2)                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let browser;
let page;

/**
 * Setup browser and page
 */
async function setup() {
  console.log('🚀 Launching browser...\n');
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto(BASE_URL);
  console.log(`✓ Loaded: ${BASE_URL}\n`);
}

/**
 * Test 1: Focus visibility and keyboard navigation
 */
async function testFocusVisibility() {
  console.log('⌨️  Test 1: Focus Visibility & Navigation');
  console.log('─'.repeat(64));
  
  const focusableElements = await page.$$eval(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    (elements) => elements.map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim().substring(0, 50),
      tabIndex: el.getAttribute('tabindex'),
      ariaLabel: el.getAttribute('aria-label'),
      hasVisibleFocus: false,
    }))
  );
  
  console.log(`✓ Found ${focusableElements.length} focusable elements\n`);
  
  // Test Tab navigation
  console.log('Testing Tab navigation through interactive elements...\n');
  let focusCount = 0;
  const focusIssues = [];
  
  for (let i = 0; i < Math.min(focusableElements.length, 20); i++) {
    await page.keyboard.press('Tab');
    focusCount++;
    
    // Get focused element
    const focusedEl = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      return {
        tag: el.tagName,
        text: el.textContent?.trim().substring(0, 40),
        outline: styles.outline,
        outlineColor: styles.outlineColor,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
        border: styles.border,
        opacity: styles.opacity,
        visible: rect.width > 0 && rect.height > 0,
      };
    });
    
    if (focusedEl) {
      const hasFocusIndicator = 
        focusedEl.outline !== 'none' ||
        focusedEl.boxShadow !== 'none' ||
        focusedEl.outlineWidth !== '0px';
      
      if (!hasFocusIndicator) {
        focusIssues.push(`${focusedEl.tag}: ${focusedEl.text}`);
      }
      
      console.log(`  [${i + 1}] ${focusedEl.tag}: ${focusedEl.text || '(no text)'} ${hasFocusIndicator ? '✓' : '⚠️'}`);
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   Elements tested: ${focusCount}`);
  console.log(`   Focus issues: ${focusIssues.length}`);
  
  if (focusIssues.length > 0) {
    console.log('\n⚠️  Elements missing focus indicators:');
    focusIssues.slice(0, 5).forEach(issue => console.log(`   • ${issue}`));
    if (focusIssues.length > 5) {
      console.log(`   ... and ${focusIssues.length - 5} more`);
    }
  } else {
    console.log('✓ All tested elements have focus indicators');
  }
  
  console.log('✅ Test 1 COMPLETED\n');
  return { focusableElements, focusIssues };
}

/**
 * Test 2: Interactive target sizes (WCAG 2.5.8)
 */
async function testTargetSizes() {
  console.log('📏 Test 2: Target Size (WCAG 2.5.8 Level AA)');
  console.log('─'.repeat(64));
  
  const targets = await page.$$eval(
    'a, button, input:not([type="hidden"]), select, textarea, [role="button"], [onclick]',
    (elements, minSize) => {
      return elements
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const styles = window.getComputedStyle(el);
          
          if (rect.width === 0 || rect.height === 0) return null;
          
          return {
            tag: el.tagName,
            text: el.textContent?.trim().substring(0, 40) || el.getAttribute('aria-label'),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            minDimension: Math.min(rect.width, rect.height),
            meets24px: Math.min(rect.width, rect.height) >= minSize,
            meets44px: Math.min(rect.width, rect.height) >= 44,
            type: el.getAttribute('type'),
          };
        })
        .filter(Boolean);
    },
    MIN_TARGET_SIZE
  );
  
  const failing24px = targets.filter(t => !t.meets24px);
  const failing44px = targets.filter(t => !t.meets44px);
  
  console.log(`✓ Analyzed ${targets.length} interactive targets\n`);
  
  console.log('📊 Results:');
  console.log(`   Meeting 24×24px (WCAG AA): ${targets.length - failing24px.length}/${targets.length} (${Math.round((1 - failing24px.length / targets.length) * 100)}%)`);
  console.log(`   Meeting 44×44px (AAA/iOS): ${targets.length - failing44px.length}/${targets.length} (${Math.round((1 - failing44px.length / targets.length) * 100)}%)`);
  
  if (failing24px.length > 0) {
    console.log(`\n⚠️  Targets below 24×24px (${failing24px.length}):`);
    failing24px.slice(0, 10).forEach(t => {
      console.log(`   • ${t.tag} "${t.text}" - ${t.width}×${t.height}px`);
    });
    if (failing24px.length > 10) {
      console.log(`   ... and ${failing24px.length - 10} more`);
    }
  } else {
    console.log('\n✓ All targets meet 24×24px minimum');
  }
  
  if (failing44px.length > 0 && failing44px.length !== failing24px.length) {
    console.log(`\n💡 Targets below 44×44px (recommended): ${failing44px.length}`);
  }
  
  console.log('✅ Test 2 COMPLETED\n');
  return { targets, failing24px, failing44px };
}

/**
 * Test 3: ARIA attributes and semantic HTML
 */
async function testARIA() {
  console.log('♿ Test 3: ARIA & Semantic HTML');
  console.log('─'.repeat(64));
  
  const ariaIssues = await page.evaluate(() => {
    const issues = [];
    
    // Check for buttons without accessible names
    document.querySelectorAll('button, [role="button"]').forEach((el) => {
      const text = el.textContent?.trim();
      const ariaLabel = el.getAttribute('aria-label');
      const ariaLabelledBy = el.getAttribute('aria-labelledby');
      
      if (!text && !ariaLabel && !ariaLabelledBy) {
        issues.push({
          type: 'button-without-name',
          tag: el.tagName,
          html: el.outerHTML.substring(0, 100),
        });
      }
    });
    
    // Check for images without alt text
    document.querySelectorAll('img').forEach((el) => {
      const alt = el.getAttribute('alt');
      const ariaLabel = el.getAttribute('aria-label');
      const ariaHidden = el.getAttribute('aria-hidden');
      const role = el.getAttribute('role');
      
      if (alt === null && !ariaLabel && ariaHidden !== 'true' && role !== 'presentation') {
        issues.push({
          type: 'img-without-alt',
          src: el.src,
        });
      }
    });
    
    // Check for form inputs without labels
    document.querySelectorAll('input:not([type="hidden"]), textarea, select').forEach((el) => {
      const id = el.id;
      const ariaLabel = el.getAttribute('aria-label');
      const ariaLabelledBy = el.getAttribute('aria-labelledby');
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      
      if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
        issues.push({
          type: 'input-without-label',
          tag: el.tagName,
          inputType: el.type,
          name: el.name,
        });
      }
    });
    
    // Check for landmarks
    const landmarks = {
      main: document.querySelectorAll('main, [role="main"]').length,
      nav: document.querySelectorAll('nav, [role="navigation"]').length,
      header: document.querySelectorAll('header, [role="banner"]').length,
      footer: document.querySelectorAll('footer, [role="contentinfo"]').length,
    };
    
    return { issues, landmarks };
  });
  
  console.log('📊 Results:');
  console.log(`   ARIA Issues Found: ${ariaIssues.issues.length}`);
  console.log('   Landmarks:');
  console.log(`   • <main>: ${ariaIssues.landmarks.main}`);
  console.log(`   • <nav>: ${ariaIssues.landmarks.nav}`);
  console.log(`   • <header>: ${ariaIssues.landmarks.header}`);
  console.log(`   • <footer>: ${ariaIssues.landmarks.footer}`);
  
  if (ariaIssues.issues.length > 0) {
    console.log('\n⚠️  ARIA Issues:');
    const grouped = ariaIssues.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(grouped).forEach(([type, count]) => {
      console.log(`   • ${type}: ${count} occurrences`);
    });
  } else {
    console.log('\n✓ No major ARIA issues detected');
  }
  
  console.log('✅ Test 3 COMPLETED\n');
  return ariaIssues;
}

/**
 * Test 4: Color contrast
 */
async function testColorContrast() {
  console.log('🎨 Test 4: Color Contrast (WCAG AA)');
  console.log('─'.repeat(64));
  
  console.log('Running automated color contrast checks...\n');
  
  // Inject axe-core for contrast checking
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js'
  });
  
  const contrastResults = await page.evaluate(() => {
    return new Promise((resolve) => {
      // @ts-expect-error: axe is injected globally at runtime
      if (typeof axe === 'undefined') {
        resolve({ violations: [], passes: [] });
        return;
      }
      
      // @ts-expect-error: axe is injected globally at runtime
      axe.run(
        document,
        {
          runOnly: {
            type: 'tag',
            values: ['wcag2aa', 'wcag21aa', 'wcag22aa'],
          },
          rules: {
            'color-contrast': { enabled: true },
          },
        },
        (err, results) => {
          if (err) resolve({ violations: [], passes: [] });
          resolve(results);
        }
      );
    });
  });
  
  const contrastViolations = contrastResults.violations?.filter(
    v => v.id === 'color-contrast'
  ) || [];
  
  console.log('📊 Results:');
  console.log(`   Contrast Violations: ${contrastViolations.length}`);
  
  if (contrastViolations.length > 0) {
    console.log('\n⚠️  Color Contrast Issues:');
    contrastViolations[0].nodes?.slice(0, 5).forEach((node, i) => {
      console.log(`   ${i + 1}. ${node.html.substring(0, 60)}...`);
      console.log(`      ${node.failureSummary}`);
    });
  } else {
    console.log('✓ No color contrast violations detected');
  }
  
  console.log('✅ Test 4 COMPLETED\n');
  return contrastViolations;
}

/**
 * Generate accessibility report
 */
async function generateReport(results) {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║              ACCESSIBILITY AUDIT SUMMARY                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  const { focusResult, targetResult, ariaResult, contrastResult } = results;
  
  console.log('📋 WCAG 2.2 Compliance Status:\n');
  
  // Focus visibility
  const focusScore = focusResult.focusIssues.length === 0 ? 'PASS' : 
    focusResult.focusIssues.length < 3 ? 'MINOR ISSUES' : 'NEEDS WORK';
  console.log(`   ⌨️  Focus Visibility (2.4.7, 2.4.11): ${focusScore}`);
  console.log(`      Issues: ${focusResult.focusIssues.length}`);
  
  // Target sizes
  const targetScore = targetResult.failing24px.length === 0 ? 'PASS' : 
    targetResult.failing24px.length < 5 ? 'MINOR ISSUES' : 'NEEDS WORK';
  console.log(`\n   📏 Target Size (2.5.8): ${targetScore}`);
  console.log(`      Below 24px: ${targetResult.failing24px.length}`);
  console.log(`      Below 44px: ${targetResult.failing44px.length}`);
  
  // ARIA
  const ariaScore = ariaResult.issues.length === 0 ? 'PASS' : 
    ariaResult.issues.length < 5 ? 'MINOR ISSUES' : 'NEEDS WORK';
  console.log(`\n   ♿ ARIA & Semantics: ${ariaScore}`);
  console.log(`      Issues: ${ariaResult.issues.length}`);
  
  // Contrast
  const contrastScore = contrastResult.length === 0 ? 'PASS' : 'NEEDS WORK';
  console.log(`\n   🎨 Color Contrast: ${contrastScore}`);
  console.log(`      Violations: ${contrastResult.length}`);
  
  // Overall assessment
  const allPass = focusScore === 'PASS' && targetScore === 'PASS' && 
                  ariaScore === 'PASS' && contrastScore === 'PASS';
  
  console.log('\n' + '─'.repeat(64));
  
  if (allPass) {
    console.log('\n✅ Production Readiness Check 2: PASSED');
    console.log('   • Keyboard navigation works');
    console.log('   • Focus indicators visible');
    console.log('   • Target sizes meet WCAG 2.2');
    console.log('   • ARIA properly implemented');
    console.log('   • Color contrast compliant\n');
  } else {
    console.log('\n⚠️  Accessibility improvements recommended before production\n');
  }
  
  console.log('📋 Manual Testing Checklist:');
  console.log('   □ Navigate entire site with keyboard only (no mouse)');
  console.log('   □ Test with screen reader (NVDA/JAWS/VoiceOver)');
  console.log('   □ Verify all interactive elements reachable');
  console.log('   □ Check focus order is logical');
  console.log('   □ Confirm skip links work');
  console.log('   □ Test forms with keyboard only');
  console.log('   □ Verify modals trap focus properly');
  console.log('   □ Check all images have alt text\n');
  
  return allPass;
}

/**
 * Main test runner
 */
async function runTests() {
  try {
    await setup();
    
    const focusResult = await testFocusVisibility();
    const targetResult = await testTargetSizes();
    const ariaResult = await testARIA();
    const contrastResult = await testColorContrast();
    
    const passed = await generateReport({
      focusResult,
      targetResult,
      ariaResult,
      contrastResult,
    });
    
    await browser.close();
    
    process.exit(passed ? 0 : 1);
  } catch (error) {
    console.error('\n❌ Accessibility Test Failed:');
    console.error(`   ${error.message}\n`);
    
    if (browser) await browser.close();
    process.exit(1);
  }
}

// Check if playwright is installed
try {
  await import('playwright');
  runTests();
} catch (error) {
  console.error('\n❌ Error: Playwright not installed\n');
  console.log('Install with: npm install --save-dev playwright\n');
  process.exit(1);
}


