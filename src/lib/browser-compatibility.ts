/**
 * Cross-Browser Compatibility Test Script
 * Tests gradient rendering, backdrop-blur, and CSS features across different browsers
 */

interface BrowserInfo {
  name: string;
  version: number;
  userAgent: string;
}

interface CompatibilityFeatures {
  backdropFilter: boolean;
  cssGrid: boolean;
  gradients: boolean;
  transform3d: boolean;
  willChange: boolean;
  customProperties: boolean;
  rgbAlpha: boolean;
  blendModes: boolean;
  filters: boolean;
  clipPath: boolean;
}

interface CompatibilityResults {
  browser: BrowserInfo;
  features: CompatibilityFeatures;
  warnings: string[];
  recommendations: string[];
}

const testCrossBrowserCompatibility = (): CompatibilityResults => {
  const results: CompatibilityResults = {
    browser: detectBrowser(),
    features: {
      backdropFilter: false,
      cssGrid: false,
      gradients: false,
      transform3d: false,
      willChange: false,
      customProperties: false,
      rgbAlpha: false,
      blendModes: false,
      filters: false,
      clipPath: false,
    },
    warnings: [],
    recommendations: []
  };

  // Test 1: Backdrop Filter Support
  results.features.backdropFilter = CSS.supports('backdrop-filter', 'blur(10px)') || 
                                    CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
  
  if (!results.features.backdropFilter) {
    results.warnings.push('Backdrop filter not supported - using opacity fallback');
    results.recommendations.push('Consider showing a message for better experience in modern browsers');
  }

  // Test 2: CSS Grid Support
  results.features.cssGrid = CSS.supports('display', 'grid');
  
  // Test 3: Gradient Support
  results.features.gradients = CSS.supports('background-image', 'linear-gradient(to right, red, blue)');
  
  // Test 4: Transform 3D Support
  results.features.transform3d = CSS.supports('transform', 'translate3d(0, 0, 0)');
  
  // Test 5: Will-Change Support
  results.features.willChange = CSS.supports('will-change', 'transform');
  
  // Test 6: Custom Properties (CSS Variables)
  results.features.customProperties = CSS.supports('--test', '0');
  
  // Test 7: Color with Alpha (modern syntax)
  results.features.rgbAlpha = CSS.supports('color', 'rgb(0 0 0 / 0.5)');
  
  // Test 8: Blend Modes
  results.features.blendModes = CSS.supports('mix-blend-mode', 'multiply');
  
  // Test 9: Filter Effects
  results.features.filters = CSS.supports('filter', 'blur(10px)');
  
  // Test 10: Clip Path
  results.features.clipPath = CSS.supports('clip-path', 'circle(50%)');

  // Browser-specific checks
  if (results.browser.name === 'Safari' && results.browser.version < 14) {
    results.warnings.push('Safari version may have gradient rendering issues');
    results.recommendations.push('Update to Safari 14+ for best experience');
  }

  if (results.browser.name === 'Firefox' && !results.features.backdropFilter) {
    results.warnings.push('Firefox may require enabling backdrop-filter in about:config');
  }

  if (results.browser.name === 'Chrome' && results.browser.version < 90) {
    results.warnings.push('Older Chrome version detected - some features may not work optimally');
  }

  return results;
};

function detectBrowser(): BrowserInfo {
  const ua = navigator.userAgent;
  let name = 'Unknown';
  let version = 0;

  if (ua.indexOf('Firefox') > -1) {
    name = 'Firefox';
    version = parseInt(ua.match(/Firefox\/(\d+)/)?.[1] || '0');
  } else if (ua.indexOf('Edg') > -1) {
    name = 'Edge';
    version = parseInt(ua.match(/Edg\/(\d+)/)?.[1] || '0');
  } else if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
    name = 'Chrome';
    version = parseInt(ua.match(/Chrome\/(\d+)/)?.[1] || '0');
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    name = 'Safari';
    version = parseInt(ua.match(/Version\/(\d+)/)?.[1] || '0');
  }

  return { name, version, userAgent: ua };
}

// Run the test and log results
if (typeof window !== 'undefined') {
  console.group('🔍 Cross-Browser Compatibility Check');
  const results = testCrossBrowserCompatibility();
  
  console.log('Browser:', results.browser.name, results.browser.version);
  console.log('Supported Features:', results.features);
  
  if (results.warnings.length > 0) {
    console.warn('Warnings:', results.warnings);
  }
  
  if (results.recommendations.length > 0) {
    console.info('Recommendations:', results.recommendations);
  }
  
  console.groupEnd();

  // Export to window for manual testing
  (window as typeof window & { browserCompatibilityCheck?: CompatibilityResults }).browserCompatibilityCheck = results;
}

export { testCrossBrowserCompatibility, detectBrowser };
export type { CompatibilityResults, BrowserInfo, CompatibilityFeatures };
