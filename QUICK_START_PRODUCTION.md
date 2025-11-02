# 🚀 Production Validation - Quick Start

## ⚡ TL;DR

Run this to validate production readiness:

```bash
cd apps/marketing-site
npm run dev                    # Start server (wait for http://localhost:3000)
npm run prod:check:local       # Run all 3 production checks
```

---

## 📋 The Three Checks

### 1️⃣ SSE Streaming
Tests real-time event streaming works without buffering

### 2️⃣ Core Web Vitals & Accessibility  
Tests performance budgets (90%+) and WCAG 2.2 compliance (95%+)

### 3️⃣ Privacy Compliance (GPC)
Tests Global Privacy Control implementation

---

## 🎯 Success Looks Like

```
╔════════════════════════════════════════════╗
║       🎉 PRODUCTION READY! 🎉             ║
║                                            ║
║  All three production checks passed.      ║
║  The marketing site is cleared for launch.║
╚════════════════════════════════════════════╝
```

---

## 🔧 Individual Commands

```bash
# Run specific checks
npm run prod:check:sse http://localhost:3000
npm run prod:check:a11y http://localhost:3000
npm run prod:check:gpc http://localhost:3000

# Test against production URL
npm run prod:check https://yourdomain.com
```

---

## 📚 Full Documentation

See `PRODUCTION_READINESS.md` for:
- Detailed test descriptions
- Troubleshooting guides
- Manual testing checklists
- CI/CD integration examples

---

## ❓ Common Issues

**"Cannot connect to server"**
→ Run `npm run dev` first

**"Lighthouse CI failed"**
→ Check performance/accessibility output

**"SSE tests timeout"**
→ Verify `X-Accel-Buffering: no` header

---

## ✅ Before Production Deploy

- [ ] All TypeScript errors fixed
- [ ] All ESLint errors fixed  
- [ ] All tests pass
- [ ] Production build succeeds
- [ ] **All 3 production checks pass**
- [ ] Manual accessibility audit done
- [ ] Tested on staging URL

---

**Files Created**:
- `scripts/test-sse-stream.mjs`
- `scripts/test-gpc-compliance.mjs`
- `scripts/test-accessibility-simple.mjs`
- `scripts/production-readiness.mjs` (master)
- `PRODUCTION_READINESS.md` (full guide)

**Ready to launch!** 🎉
