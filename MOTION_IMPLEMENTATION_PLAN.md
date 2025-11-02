# Motion & 3D Implementation Plan
**Status:** Phase 0 - Foundations In Progress  
**Last Updated:** October 18, 2025

## Executive Summary
Implementing world-class motion and selective 3D to make the marketing site feel premium, interactive, and fast while maintaining strict performance budgets and accessibility compliance.

---

## Current State Analysis

### ✅ Already Implemented
- **Framer Motion** - Already installed and used in header/footer
- **Next.js Image Optimization** - Using `next/image` throughout
- **Lightweight Charts** - Integrated in `/live-demo` page
- **CSS Custom Properties** - Design system with variables
- **Dark Mode** - Full theme support
- **Gradient Backgrounds** - Glassmorphism effects
- **Basic Hover States** - Card lift effects with `card-3d` class

### 🔄 Needs Enhancement
- **Reduced Motion Support** - No global toggle or media query handling
- **3D Experiences** - No Three.js/R3F implementation yet
- **Scroll Animations** - Basic, not narrative-driven
- **View Transitions API** - Not implemented
- **Performance Monitoring** - No CI checks for animation performance
- **Rive/Lottie** - Not integrated

---

## Implementation Phases

### Phase 0: Foundations (Week 1)
**Goal:** Set up infrastructure for motion control and performance monitoring

#### Tasks:
1. **Global Motion Controller**
   - [ ] Create `MotionContext` provider
   - [ ] Add `useReducedMotion()` hook
   - [ ] Implement localStorage toggle
   - [ ] Wire `@media (prefers-reduced-motion)`
   - [ ] Add CSS variables for motion timing

2. **View Transitions Setup**
   - [ ] Add View Transitions API feature detection
   - [ ] Create `PageTransition` wrapper component
   - [ ] Fallback to Framer Motion for unsupported browsers

3. **CI Performance Checks**
   - [ ] Add Lighthouse CI config
   - [ ] Create animation linting rules (no `left/top/width/height`)
   - [ ] Set up Playwright visual regression tests
   - [ ] Define performance budgets (LCP < 2.5s, INP < 200ms)

**Acceptance Criteria:**
- ✅ Toggle in UI disables non-essential animations
- ✅ `prefers-reduced-motion` honored globally
- ✅ CI fails on non-compositor animations
- ✅ Route changes animate smoothly where supported

---

### Phase 1: Micro-Interactions (Week 2)
**Goal:** Polish existing interactive elements with compositor-only animations

#### Tasks:
1. **Button & Link Enhancements**
   - [ ] Create Motion variants for press/hover states
   - [ ] Add ripple effect on click (transform/opacity only)
   - [ ] Implement focus-visible styles with animation

2. **Card Interactions**
   - [ ] Enhance existing `card-3d` with Motion
   - [ ] Add magnetic hover effect (subtle pointer tracking)
   - [ ] Implement stagger animations for card grids

3. **Navigation Polish**
   - [ ] Add nav link underline animation
   - [ ] Mobile menu slide with spring physics
   - [ ] CTA button glow pulse on idle

4. **Rive Integration**
   - [ ] Install `@rive-app/react-canvas`
   - [ ] Create animated logo variant
   - [ ] Add success checkmark for form submissions
   - [ ] Implement pause-on-offscreen logic

**Acceptance Criteria:**
- ✅ All animations use only `transform`/`opacity`
- ✅ DevTools Performance tab shows no layout thrashing
- ✅ Rive assets pause when out of viewport
- ✅ Animations respect reduced motion setting

---

### Phase 2: Scroll Storytelling (Week 3)
**Goal:** Implement narrative-driven scroll experiences for "How It Works"

#### Tasks:
1. **Scroll-Timeline Setup**
   - [ ] Feature detect CSS `scroll-timeline` support
   - [ ] Create fallback with Framer Motion's `useScroll`
   - [ ] Build `ScrollSection` component

2. **How It Works Story**
   - [ ] Break into 4 beats: Data → Signal → Risk → Execution
   - [ ] Animate content with translate/opacity
   - [ ] Add number counters (animate when visible)
   - [ ] Stage indicators with progress bar

3. **About Page Story**
   - [ ] Founder section with parallax (disabled on reduced motion)
   - [ ] Timeline animation for roadmap
   - [ ] Principle cards reveal on scroll

**Acceptance Criteria:**
- ✅ Smooth scroll on modern browsers (Chrome 115+, Safari 17+)
- ✅ No scrolljacking behavior
- ✅ Fallback to static on older browsers
- ✅ Reduced motion disables parallax entirely

---

### Phase 3: Live Demo Polish (Week 4)
**Goal:** Enhance chart experience with professional-grade interactions

#### Tasks:
1. **Lightweight Charts v5 Upgrade**
   - [ ] Verify current version and upgrade if needed
   - [ ] Implement dual-pane layout (price + indicators)
   - [ ] Add entry/exit markers with animations
   - [ ] Create custom crosshair tooltips

2. **Performance Optimization**
   - [ ] Batch tick updates (throttle to 300ms)
   - [ ] Implement request animation frame loop
   - [ ] Add "Last update" latency badge
   - [ ] Monitor INP during burst loads

3. **Transitions**
   - [ ] View Transitions for instrument switches
   - [ ] Smooth pane resizing
   - [ ] Theme transitions (light/dark)

4. **Attribution**
   - [ ] Add TradingView attribution in footer per license
   - [ ] Link to Lightweight Charts docs

**Acceptance Criteria:**
- ✅ Chart maintains 60fps under test loads
- ✅ Smooth transitions between instruments
- ✅ Attribution visible and compliant
- ✅ No INP regression during bursts

---

### Phase 4: 3D Hero (Week 5-6)
**Goal:** Create ambient "living markets" 3D scene with strict performance budget

#### Tasks:
1. **Three.js Setup**
   - [ ] Install `three`, `@react-three/fiber`, `@react-three/drei`
   - [ ] Install `@react-three/postprocessing`
   - [ ] Set up dynamic import with `next/dynamic`

2. **Asset Pipeline**
   - [ ] Install glTF tools (`gltf-transform`, `gltfjsx`)
   - [ ] Set up KTX2 texture compression
   - [ ] Configure Draco mesh compression
   - [ ] Create poster image fallback

3. **3D Scene Development**
   - [ ] Build "candlestick city" low-poly scene
   - [ ] Implement subtle camera drift (24fps internal)
   - [ ] Add bloom postprocessing (low intensity)
   - [ ] Implement pointer tilt interaction

4. **Optimization & Fallbacks**
   - [ ] Lazy load scene with loading state
   - [ ] Pause when tab hidden (`visibilitychange`)
   - [ ] Auto-disable on `prefers-reduced-motion`
   - [ ] Mobile: show poster image only
   - [ ] Handle WebGL context loss

5. **glTF Compression Pipeline**
   ```bash
   # Compress textures to KTX2
   gltf-transform ktx2 input.glb output.glb \
     --format etc1s --quality 128
   
   # Compress meshes with Draco
   gltf-transform draco output.glb final.glb \
     --compressionLevel 10
   ```

**Acceptance Criteria:**
- ✅ Hero loads < 200ms after interactive on desktop
- ✅ Mobile auto-falls back to poster image
- ✅ No LCP regression
- ✅ Respects reduced motion preference
- ✅ Scene pauses when tab inactive

---

### Phase 5: QA & Hardening (Week 7)
**Goal:** Verify all animations meet performance budgets and accessibility standards

#### Tasks:
1. **Performance Audits**
   - [ ] Run Lighthouse on all pages (target: 90+ performance)
   - [ ] Measure Core Web Vitals (LCP, INP, CLS)
   - [ ] Profile animations in Chrome DevTools
   - [ ] Test on low-end devices (throttled CPU)

2. **Accessibility Audits**
   - [ ] axe DevTools scan
   - [ ] WCAG 2.2 Level AA compliance check
   - [ ] Keyboard navigation testing
   - [ ] Screen reader testing (NVDA, VoiceOver)
   - [ ] Reduced motion verification

3. **Cross-Browser Testing**
   - [ ] Chrome/Edge (latest 2 versions)
   - [ ] Safari desktop + iOS
   - [ ] Firefox (latest)
   - [ ] Test View Transitions fallback

4. **Load Testing**
   - [ ] Simulate burst SSE ticks on chart
   - [ ] Test 3D scene under throttled network
   - [ ] Verify memory leaks (long sessions)

**Acceptance Criteria:**
- ✅ Lighthouse performance ≥ 90
- ✅ LCP < 2.5s, INP < 200ms, CLS < 0.1
- ✅ No accessibility violations
- ✅ All animations pass compositor-only check

---

## Technical Stack

### Motion Libraries
```json
{
  "framer-motion": "^11.0.0", // Already installed
  "@rive-app/react-canvas": "^4.0.0", // New
  "lottie-react": "^2.4.0" // Optional
}
```

### 3D Stack
```json
{
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.96.0",
  "@react-three/postprocessing": "^2.16.0",
  "@types/three": "^0.160.0"
}
```

### Build Tools
```json
{
  "gltf-transform": "^3.10.0", // CLI for compression
  "sharp": "^0.33.0", // Image optimization (already installed)
  "@playwright/test": "^1.41.0" // Visual regression
}
```

### CI/Performance
```json
{
  "@lhci/cli": "^0.13.0", // Lighthouse CI
  "eslint-plugin-animator": "^1.0.0" // Custom animation linting
}
```

---

## File Structure

```
apps/marketing-site/
├── src/
│   ├── components/
│   │   ├── motion/
│   │   │   ├── MotionProvider.tsx      # Global motion context
│   │   │   ├── MotionToggle.tsx        # User toggle UI
│   │   │   ├── PageTransition.tsx      # View Transitions wrapper
│   │   │   ├── ScrollSection.tsx       # Scroll-timeline component
│   │   │   └── AnimatedCounter.tsx     # Number counter
│   │   ├── 3d/
│   │   │   ├── Hero3D.tsx              # Main 3D hero scene
│   │   │   ├── CandlestickCity.tsx     # 3D geometry
│   │   │   ├── Scene.tsx               # R3F Canvas wrapper
│   │   │   └── Fallback.tsx            # Poster image fallback
│   │   ├── rive/
│   │   │   ├── AnimatedLogo.tsx
│   │   │   ├── SuccessCheck.tsx
│   │   │   └── useRiveAnimation.ts     # Pause logic
│   │   └── charts/
│   │       ├── ChartPane.tsx           # Dual-pane layout
│   │       ├── TickBatcher.ts          # Throttle updates
│   │       └── ChartMarkers.tsx        # Entry/exit markers
│   ├── hooks/
│   │   ├── useReducedMotion.ts         # Motion preference hook
│   │   ├── useScrollTimeline.ts        # Scroll animation hook
│   │   ├── useInView.ts                # Intersection observer
│   │   └── usePageTransition.ts        # View Transitions API
│   ├── lib/
│   │   ├── motion-config.ts            # Spring/timing presets
│   │   └── animation-linter.ts         # Custom ESLint rules
│   ├── public/
│   │   ├── models/
│   │   │   └── candlestick-city.glb    # Compressed 3D asset
│   │   └── rive/
│   │       ├── logo.riv
│   │       └── success.riv
│   └── styles/
│       └── motion.css                  # Reduced motion overrides
├── .lighthouse/
│   └── lighthouserc.json               # CI config
└── playwright.config.ts                # Visual regression
```

---

## Performance Budgets

### Core Web Vitals Targets
| Metric | Target | Current | Budget |
|--------|--------|---------|--------|
| LCP | < 2.5s | 1.8s | ✅ 700ms headroom |
| INP | < 200ms | ~120ms | ✅ 80ms headroom |
| CLS | < 0.1 | 0.02 | ✅ 0.08 headroom |
| FCP | < 1.8s | 1.2s | ✅ 600ms headroom |

### Animation Budgets
- **Compositor-only:** 100% of UI animations
- **3D Scene:** < 5% CPU on idle, < 15% on interaction
- **Chart Updates:** 60fps sustained with 100 ticks/sec burst
- **Bundle Size:** 3D scene < 500KB gzipped (including models)

---

## Risk Mitigation

### Motion Sickness
- **Risk:** Parallax/3D causes nausea
- **Mitigation:**
  - Global "Reduce motion" toggle (persistent)
  - Respect `prefers-reduced-motion` media query
  - No parallax on reduced motion
  - No camera rotation > 15° on 3D scenes

### 3D Performance
- **Risk:** Low-end devices lag or crash
- **Mitigation:**
  - KTX2/Draco compression (5-10x smaller)
  - Mobile gets poster image only
  - Throttle device pixel ratio on GPU detection
  - Max 2 postprocessing passes

### Chart Lag
- **Risk:** Burst ticks cause INP spikes
- **Mitigation:**
  - Batch updates every 300ms
  - Request animation frame scheduling
  - Throttle series count (max 3 visible)
  - Offscreen canvas rendering

### Bundle Bloat
- **Risk:** 3D/motion libraries tank FCP
- **Mitigation:**
  - Dynamic imports with `next/dynamic`
  - Code-split by route
  - Tree-shake unused Three.js modules
  - Defer non-critical animations

---

## Success Metrics

### Before (Baseline)
- Lighthouse Performance: 92
- LCP: 1.8s
- INP: 120ms
- Bundle Size: 151 KB (first load JS)
- User Engagement: (establish baseline)

### After (Target)
- Lighthouse Performance: ≥ 90 (maintain)
- LCP: < 2.0s (allow +200ms for 3D)
- INP: < 150ms (maintain)
- Bundle Size: < 180 KB (allow +30 KB for motion libs)
- User Engagement: +20% time on site, +15% scroll depth

---

## Next Steps

### Immediate Actions (This Week)
1. ✅ Create implementation plan (this document)
2. ⏳ Set up `MotionProvider` and `useReducedMotion` hook
3. ⏳ Add global motion toggle UI
4. ⏳ Configure Lighthouse CI
5. ⏳ Create animation linting rules

### Dependencies to Install
```bash
# Motion & Rive
npm install @rive-app/react-canvas

# 3D Stack (defer to Phase 4)
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three gltf-transform

# CI/Testing
npm install -D @lhci/cli @playwright/test
```

### PR Checklist Template
```markdown
## Motion/3D Feature PR

### Checklist
- [ ] Respects `prefers-reduced-motion`
- [ ] Toggle tested (persists in localStorage)
- [ ] Lighthouse score ≥ 90
- [ ] No layout/paint in animations (DevTools verified)
- [ ] Keyboard accessible
- [ ] Screen reader tested
- [ ] Cross-browser verified (Chrome, Safari, Firefox)
- [ ] Visual regression tests pass
- [ ] Bundle size within budget
```

---

## Resources

- [web.dev: Animation Performance](https://web.dev/articles/animations-and-performance)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TradingView Lightweight Charts](https://tradingview.github.io/lightweight-charts/)
- [Three.js Manual](https://threejs.org/manual/)
- [Khronos glTF](https://www.khronos.org/gltf/)
- [Rive Runtime Docs](https://rive.app/docs/runtimes/web)
- [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/)

---

**Status:** Ready for Phase 0 implementation  
**Estimated Timeline:** 7 weeks to full implementation  
**Risk Level:** Low (strict budgets and fallbacks)
