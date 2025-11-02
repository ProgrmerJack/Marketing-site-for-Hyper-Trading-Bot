# Contributing to Hyper Trading Automation Marketing Site

Thank you for contributing! This guide covers development practices, animation guidelines, and performance standards.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Animation Guidelines](#animation-guidelines)
3. [Performance Budgets](#performance-budgets)
4. [Accessibility Requirements](#accessibility-requirements)
5. [Testing Checklist](#testing-checklist)
6. [Code Review Process](#code-review-process)

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommend using nvm)
- npm or pnpm
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/ProgrmerJack/Hyper-Trading-Automation.git
cd Hyper-Trading-Automation

# Install dependencies
cd apps/marketing-site
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make changes following the guidelines below
3. Run tests: `npm run test`
4. Lint your code: `npm run lint:all`
5. Check types: `npm run typecheck`
6. Build locally: `npm run build`
7. Commit with descriptive messages
8. Push and create a pull request

---

## Animation Guidelines

### ✅ DO: Compositor-Only Animations

**Only animate these properties:**
- `transform` (translate, scale, rotate, skew)
- `opacity`

**Why?** These properties are handled by the GPU compositor, ensuring 60fps animations without triggering layout recalculation or paint.

**Good Examples:**
```tsx
// ✅ Good: Compositor-only
<motion.div
  animate={{ 
    x: 100,           // translateX
    y: 50,            // translateY
    scale: 1.1,
    rotate: 45,
    opacity: 0.8
  }}
/>

// ✅ Good: Using variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### ❌ DON'T: Non-Compositor Properties

**Never animate these properties:**
- `left`, `right`, `top`, `bottom`
- `width`, `height`
- `margin`, `padding`
- `fontSize`, `lineHeight`
- `borderWidth`

**Why?** These properties trigger layout recalculation (reflow) and repaint, causing jank and poor performance.

**Bad Examples:**
```tsx
// ❌ Bad: Triggers layout
<motion.div
  animate={{ 
    width: 300,        // Triggers layout recalc
    left: 100,         // Triggers layout recalc
    fontSize: 24       // Triggers paint
  }}
/>
```

**Fix:** Use transform/opacity instead:
```tsx
// ✅ Fixed: Use scale for size changes
<motion.div
  animate={{ 
    scaleX: 1.5,      // Instead of width
    x: 100,           // Instead of left
    scale: 1.2        // Instead of fontSize
  }}
/>
```

---

## Respecting Reduced Motion

### Always Use `useReducedMotion()` Hook

```tsx
import { useReducedMotion } from "@/components/motion/MotionProvider";

function MyComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { y: 20, opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      Content
    </motion.div>
  );
}
```

### CSS Animations

```css
.my-element {
  transition: transform var(--motion-duration);
}

/* Automatically handled by motion.css */
[data-reduced-motion="true"] .my-element {
  transition: none;
}
```

---

## Performance Budgets

### Core Web Vitals (Enforced by Lighthouse CI)

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 3.0s |
| **INP** (Interaction to Next Paint) | < 200ms | < 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.15 |
| **FCP** (First Contentful Paint) | < 2.0s | < 2.5s |
| **TBT** (Total Blocking Time) | < 300ms | < 500ms |

### Bundle Size Budgets

- **Initial JS:** < 150 KB (gzipped)
- **Per-Route JS:** < 50 KB (gzipped)
- **3D Assets:** < 500 KB (gzipped, Phase 4+)
- **Images:** WebP/AVIF, < 200 KB per image
- **Fonts:** WOFF2 only, subset to Latin

### Validation

```bash
# Run Lighthouse locally
npm run lighthouse:build

# Check bundle sizes
npm run analyze

# Performance testing
npm run test:animations
```

**CI will fail PRs that exceed budgets.**

---

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance

- **Keyboard Navigation:** All interactive elements must be keyboard accessible
- **Focus Indicators:** Clear, high-contrast focus states (2px outline minimum)
- **Color Contrast:** 4.5:1 for text, 3:1 for UI components
- **Alt Text:** All images must have descriptive alt attributes
- **ARIA Labels:** Use semantic HTML first, ARIA as supplement
- **Screen Reader:** Test with NVDA (Windows) or VoiceOver (Mac)

### Motion Preferences

- **System Detection:** Automatically detect `prefers-reduced-motion`
- **User Override:** Provide toggle in footer (Auto/Enable/Reduce)
- **Essential Animations:** Loading spinners, focus indicators remain
- **No Parallax:** Avoid parallax effects with reduced motion

### Testing

```bash
# Automated accessibility checks
npm run prod:check:a11y

# Lighthouse accessibility audit
npm run lighthouse

# Manual testing
# - Tab through all interactive elements
# - Toggle reduced motion and verify behavior
# - Test with screen reader
```

---

## Testing Checklist

### Before Committing

- [ ] Code passes `npm run lint:all`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] Unit tests pass: `npm run test`
- [ ] No console errors in dev mode
- [ ] Animations use compositor-only properties
- [ ] Reduced motion respected via hook/CSS
- [ ] Dark mode tested and working
- [ ] Responsive design tested (mobile/tablet/desktop)

### Before PR

- [ ] Production build succeeds: `npm run build`
- [ ] Lighthouse CI passes: `npm run lighthouse:build`
- [ ] Performance ≥ 90, Accessibility ≥ 95
- [ ] Bundle size within budget
- [ ] Manual testing on localhost:3000
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation works
- [ ] Screen reader tested (if UI changes)

### PR Description Template

```markdown
## Changes
- Brief description of what changed

## Animation/Motion Changes
- List any new animations
- Confirm compositor-only properties used
- Confirm reduced motion respected

## Performance Impact
- Bundle size change: +X KB / -X KB
- Lighthouse scores: Performance XX, Accessibility XX
- Core Web Vitals: LCP X.Xs, INP XXms, CLS 0.XX

## Testing
- [x] Lighthouse CI passed
- [x] Manual testing completed
- [x] Reduced motion tested
- [x] Dark mode tested
- [x] Responsive design tested

## Screenshots
(Add before/after screenshots for UI changes)
```

---

## Code Review Process

### Reviewers Check For

1. **Animation Performance**
   - Only transform/opacity animated
   - `useReducedMotion()` hook used
   - No non-compositor properties

2. **Accessibility**
   - Keyboard navigation works
   - Focus indicators present
   - ARIA labels correct
   - Color contrast sufficient

3. **Performance**
   - Bundle size impact acceptable
   - No new blocking resources
   - Images optimized (WebP/AVIF)
   - Fonts subset correctly

4. **Code Quality**
   - TypeScript types correct
   - No `any` types (except documented exceptions)
   - ESLint/Stylelint passing
   - Tests cover new functionality

### Approval Criteria

- **2 approvals required** for main branch
- **Lighthouse CI must pass** (enforced)
- **No merge conflicts**
- **All checks passing** (lint, typecheck, tests, build)

---

## Motion Implementation Phases

We're following a 7-phase plan for motion/3D implementation:

- **Phase 0** ✅ Foundations (MotionProvider, Lighthouse CI, linting)
- **Phase 1** 🔄 Micro-interactions (buttons, cards, Rive)
- **Phase 2** ⏳ Scroll storytelling (How It Works)
- **Phase 3** ⏳ Live demo polish (Lightweight Charts)
- **Phase 4** ⏳ 3D hero (Three.js/R3F)
- **Phase 5** ⏳ QA & hardening

See `MOTION_IMPLEMENTATION_PLAN.md` for full details.

---

## Questions?

- **Documentation:** Check `README.md`, `MOTION_IMPLEMENTATION_PLAN.md`, `PHASE_0_COMPLETE.md`
- **Issues:** Open a GitHub issue with detailed description
- **Discussions:** Use GitHub Discussions for open-ended questions
- **Code Questions:** Tag @ProgrmerJack in PR comments

---

## License

This project is proprietary. See LICENSE file for details.

Thank you for contributing! 🚀
