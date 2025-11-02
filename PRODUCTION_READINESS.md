# Production Readiness Checklist ✅

This document provides a complete guide to validating production readiness for the marketing site before launch.

## Overview

The marketing site must pass **three critical checks** before production deployment:

1. **SSE Streaming** - Real-time event streaming works end-to-end
2. **Core Web Vitals & Accessibility** - Performance budgets met, WCAG 2.2 compliance
3. **Privacy Compliance** - GPC (Global Privacy Control) properly implemented

## Quick Start

### Prerequisites

- Node.js 20+ installed
- Dev server running at `http://localhost:3000` (or production URL)
- All dependencies installed (`npm install`)

### Run All Checks

```bash
# Test against local dev server
npm run prod:check:local

# Test against production URL
npm run prod:check https://yourdomain.com
```

This runs all three checks sequentially and generates a comprehensive report.

### Run Individual Checks

```bash
# Check 1: SSE Streaming
npm run prod:check:sse http://localhost:3000

# Check 2: Accessibility (HTML structure)
npm run prod:check:a11y http://localhost:3000

# Check 3: Privacy Compliance (GPC)
npm run prod:check:gpc http://localhost:3000
```

---

## Check 1: SSE Streaming 📡

**Purpose**: Validate that Server-Sent Events work end-to-end in production, without proxy buffering.

### What It Tests

1. **Basic Streaming** - Connects to `/api/demo-stream` and receives events over 10 seconds
2. **Last-Event-ID Resumption** - Tests that the `Last-Event-ID` header allows resuming streams
3. **Incremental Chunk Delivery** - Verifies no buffering by checking for progressive data arrival

### Expected Headers

- `Content-Type: text/event-stream`
- `Cache-Control: no-cache`
- `X-Accel-Buffering: no` (prevents nginx buffering)

### How to Run

```bash
node scripts/test-sse-stream.mjs http://localhost:3000
```

### Success Criteria

- ✅ All 3 tests pass
- ✅ Events arrive incrementally (no buffering detected)
- ✅ Last-Event-ID resumption works
- ✅ Proper SSE headers present

### Troubleshooting

**Issue**: Events don't arrive incrementally

```bash
# Fix: Check nginx/proxy config
# Ensure X-Accel-Buffering: no is set
# Or add to nginx.conf:
proxy_buffering off;
```

**Issue**: Stream times out

```bash
# Fix: Increase timeout in route.ts
const HEARTBEAT_INTERVAL = 10000; // Send heartbeat every 10s
```

---

## Check 2: Core Web Vitals & Accessibility 🎯

**Purpose**: Ensure the site meets performance budgets and WCAG 2.2 accessibility standards.

### What It Tests

#### 2a. Lighthouse CI (Mobile + Desktop)

Tests Core Web Vitals against budgets:

- **Performance**: 90% minimum
- **Accessibility**: 95% minimum
- **Best Practices**: 90% minimum
- **SEO**: 90% minimum

Specific Metrics:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- FCP (First Contentful Paint) < 1.8s
- SI (Speed Index) < 3.4s
- TTI (Time to Interactive) < 3.8s

#### 2b. HTML Accessibility (Simplified)

Tests HTML structure without requiring a browser:

1. **Semantic HTML** - Checks for `<main>`, `<header>`, `<nav>`, proper alt text
2. **ARIA Attributes** - Validates ARIA roles and references
3. **Heading Hierarchy** - Ensures h1-h6 are properly nested
4. **Form Labels** - Verifies all form controls have labels

### How to Run

```bash
# Run Lighthouse CI (requires server running)
npm run ci:lighthouse

# Run HTML accessibility checks
node scripts/test-accessibility-simple.mjs http://localhost:3000

# Or run both as part of production check
npm run prod:check:local
```

### Success Criteria

- ✅ Lighthouse scores meet budgets (90%+ perf, 95%+ a11y)
- ✅ No semantic HTML violations
- ✅ All ARIA attributes are valid
- ✅ Heading hierarchy is correct (single h1, no skipped levels)
- ✅ All form controls have accessible labels

### Manual Testing Required

⚠️ **Note**: The simplified accessibility test checks HTML structure only. For full WCAG 2.2 compliance, perform these manual tests:

#### Keyboard Navigation

1. Tab through all interactive elements
2. Verify focus indicators are visible (2px outline minimum)
3. Check for keyboard traps (Tab + Shift+Tab should always work)
4. Test Escape key closes modals/menus
5. Arrow keys work in menus/tabs

#### Screen Reader Testing

1. Test with NVDA (Windows) or VoiceOver (Mac)
2. Verify all images have meaningful alt text
3. Check form field announcements
4. Verify button/link purposes are clear

#### Visual Testing

1. Zoom to 200% - ensure no content overlap
2. Check color contrast (4.5:1 for normal text, 3:1 for large)
3. Test with Windows High Contrast mode
4. Verify touch targets are 24×24px minimum

### Troubleshooting

**Issue**: Lighthouse performance score low

```bash
# Common fixes:
1. Optimize images (use Next.js Image component)
2. Reduce JavaScript bundle size
3. Enable compression (Brotli/Gzip)
4. Defer non-critical CSS/JS
5. Use code splitting
```

**Issue**: Accessibility score low

```bash
# Common fixes:
1. Add alt text to images
2. Ensure sufficient color contrast
3. Add ARIA labels to icon-only buttons
4. Fix heading hierarchy
5. Add skip links for navigation
```

---

## Check 3: Privacy Compliance 🔒

**Purpose**: Verify that the site properly implements Global Privacy Control (GPC) and respects user privacy signals.

### What It Tests

1. **GPC Well-Known File** - Serves `.well-known/gpc.json` with correct content
2. **GPC Header Respect** - Disables analytics when `Sec-GPC: 1` is sent
3. **CORS Headers** - GPC file has proper CORS headers
4. **Cookie Banner Integration** - Banner detects and respects GPC signals

### GPC File Content

Location: `public/.well-known/gpc.json`

```json
{
  "gpc": true,
  "lastUpdate": "2025-10-16"
}
```

### How to Run

```bash
node scripts/test-gpc-compliance.mjs http://localhost:3000
```

### Success Criteria

- ✅ `.well-known/gpc.json` returns 200 status
- ✅ GPC file is valid JSON with `gpc: true`
- ✅ Analytics disabled when `Sec-GPC: 1` header present
- ✅ Cookie banner shows GPC signal detected

### Expected Behavior

When user has GPC enabled (via browser extension or setting):

1. Browser sends `Sec-GPC: 1` header with requests
2. Server detects header and disables analytics
3. Cookie banner shows: "🔒 Global Privacy Control detected"
4. No analytics scripts load (Google Analytics, etc.)

### Troubleshooting

**Issue**: GPC file not accessible

```bash
# Fix: Check Next.js static file serving
# File must be in public/.well-known/gpc.json
# Accessible at: https://domain.com/.well-known/gpc.json
```

**Issue**: Analytics still load with GPC

```bash
# Fix: Check cookie-banner.tsx detection logic
const gpcEnabled = 
  navigator.globalPrivacyControl === true ||
  (document.hasStorageAccess && 
   navigator.doNotTrack === '1');
```

**Issue**: CORS errors on GPC file

```bash
# Fix: Add CORS headers in next.config.js
headers: [
  {
    source: '/.well-known/gpc.json',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Content-Type', value: 'application/json' }
    ]
  }
]
```

---

## Production Deployment Checklist

Before deploying to production, ensure:

### Pre-Deployment

- [ ] All TypeScript errors fixed (`npm run typecheck`)
- [ ] All ESLint errors fixed (`npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] **All three production checks pass** (`npm run prod:check:local`)

### Deployment

- [ ] Deploy to staging environment
- [ ] Run production checks against staging URL
- [ ] Perform manual accessibility audit (keyboard + screen reader)
- [ ] Test on mobile devices (iOS + Android)
- [ ] Verify analytics disabled with GPC enabled
- [ ] Check SSE streaming on production infrastructure

### Post-Deployment

- [ ] Run production checks against live URL
- [ ] Set up real-user monitoring (RUM) for Core Web Vitals
- [ ] Monitor SSE connection metrics
- [ ] Review privacy logs for GPC compliance
- [ ] Set up alerts for performance regressions

---

## CI/CD Integration

Add to your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
name: Production Readiness

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  production-checks:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
        working-directory: apps/marketing-site
      
      - name: Build
        run: npm run build
        working-directory: apps/marketing-site
      
      - name: Start server
        run: npm start &
        working-directory: apps/marketing-site
      
      - name: Wait for server
        run: npx wait-on http://localhost:3000
      
      - name: Run production checks
        run: npm run prod:check:local
        working-directory: apps/marketing-site
```

---

## Monitoring & Alerts

### Core Web Vitals

Set up monitoring for:

- **LCP**: Alert if > 2.5s on 75th percentile
- **FID**: Alert if > 100ms on 75th percentile
- **CLS**: Alert if > 0.1 on 75th percentile

Tools:
- Google Search Console (free, real-user data)
- Lighthouse CI server (budget enforcement)
- Web Vitals Chrome extension (dev testing)

### SSE Streaming

Monitor:
- Connection success rate (target: 99%+)
- Average connection duration
- Event delivery latency
- Reconnection attempts

### Privacy Compliance

Audit:
- GPC detection rate (% of users with GPC enabled)
- Analytics opt-out rate
- Cookie banner interaction metrics

---

## Quick Reference

### Commands

```bash
# Run all checks
npm run prod:check:local

# Individual checks
npm run prod:check:sse http://localhost:3000
npm run prod:check:a11y http://localhost:3000
npm run prod:check:gpc http://localhost:3000

# Lighthouse CI
npm run ci:lighthouse

# Linting & type checking
npm run lint
npm run typecheck
```

### Files

- **SSE Route**: `src/app/api/demo-stream/route.ts`
- **GPC File**: `public/.well-known/gpc.json`
- **Cookie Banner**: `src/components/cookie-banner.tsx`
- **Lighthouse Config**: `lighthouserc.json`

### Test Scripts

- `scripts/test-sse-stream.mjs` - SSE streaming validation
- `scripts/test-gpc-compliance.mjs` - Privacy compliance checks
- `scripts/test-accessibility-simple.mjs` - HTML accessibility audit
- `scripts/production-readiness.mjs` - Master script (runs all checks)

---

## Support

For issues or questions:

1. Review the troubleshooting sections above
2. Check the output logs for specific error messages
3. Verify server is running before running checks
4. Test against localhost first, then staging, then production

---

## Success Criteria Summary

The site is **production ready** when:

✅ **SSE Streaming**
- All 3 SSE tests pass
- Events stream incrementally (no buffering)
- Last-Event-ID resumption works

✅ **Core Web Vitals & Accessibility**
- Lighthouse scores: 90%+ perf, 95%+ a11y
- HTML structure validated
- Manual keyboard testing completed
- Screen reader compatibility verified

✅ **Privacy Compliance**
- `.well-known/gpc.json` serves correctly
- GPC signal honored (analytics disabled)
- Cookie banner detects GPC

When all checks pass, you'll see:

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║              🎉 PRODUCTION READY! 🎉                          ║
║                                                                ║
║  All three production checks passed.                          ║
║  The marketing site is cleared for launch.                    ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

**Last Updated**: October 16, 2025
