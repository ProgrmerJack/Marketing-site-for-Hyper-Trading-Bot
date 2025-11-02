## Hyper Trading Automation -- Marketing Site

Apple-level polish, regulator-safe marketing surface for the Hyper Trading Automation demo experience. Built on Next.js App Router with shared UI tokens, SSE-powered lightweight-charts demo, and compliance-first content structure.

### Project layout

```
apps/marketing-site
├── packages/ui            # shared tokens + primitives (Tailwind, framer-motion)
├── src/app                # App Router pages + API routes
├── src/components         # Layout, forms, charts, telemetry
├── src/lib                # Metadata, compliance, env validation, signing
├── src/stores             # Zustand store for SSE demo data
└── src/hooks              # Client hooks (EventSource, etc.)
```

### Tooling & scripts

| Command                  | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `npm run dev`            | Start Next.js dev server                                                    |
| `npm run build`          | Production build (enforces strict TS/ESLint)                               |
| `npm run lint`           | ESLint (Next + a11y + Tailwind + security rules)                           |
| `npm run lint:css`       | Stylelint (checks for non-compositor animations)                           |
| `npm run lint:all`       | Run both ESLint and Stylelint                                              |
| `npm run typecheck`      | TypeScript project references check                                         |
| `npm run test`           | Vitest (jsdom) + jest-dom/axe helpers                                       |
| `npm run lighthouse`     | Run Lighthouse CI locally (requires build + start)                         |
| `npm run lighthouse:build` | Build and run Lighthouse CI                                              |
| `npm run ci:lighthouse`  | Lighthouse CI using `lighthouserc.json` (enforces LCP/INP/CLS budgets)    |
| `npm run ci`             | Convenience script running lint, typecheck, tests, Lighthouse              |

Dependencies are declared (Tailwind v4, shadcn-inspired primitives, Framer Motion, Lightweight Charts, Zod, Zustand, Contentlayer scaffolding). If `npm install` fails because of local TLS policy, set a mirror or install via a network that supports TLS 1.2+.

### Key features

- **Design system** -- shared tokens in `@hyper/ui`, 8-pt spacing matrix, Apple HIG-inspired typography and motion.
- **Compliance banner** -- global risk disclosure + risk statements surfaced in footer.
- **Navigation** -- sticky header with mobile menu, skip link, and CTA to gated demo.
- **Signed SSE demo** -- `/api/demo-stream` emits HMAC-signed candlestick envelopes; `useDemoStream` hook manages heartbeat/backoff; `DemoChart` renders via TradingView Lightweight Charts.
- **Telemetry** -- connection status, latency badge, signature preview, data sample counts.
- **Consent-aware forms** -- `ContactForm` posts to `/api/contact`, enforces opt-in and echoes CAN-SPAM copy.
- **Content pages** -- safety, methodology, pricing, research, blog, status, consent, privacy, terms; each uses `PageHeader` + `Section` primitives with compliance copy.
- **Security hardening** -- strict CSP/HSTS headers, OWASP-friendly ESLint security plugin, env validation via Zod.
- **Performance & a11y** -- Lighthouse CI budgets (LCP <=2.5 s, INP <=200 ms, CLS <0.1), WCAG 2.2 AA focus states, reduced motion support.
- **Motion Control** -- Global motion preferences via `MotionProvider`, user toggle in footer (Auto/Enable/Reduce), CSS custom properties integration, View Transitions API with fallback.
- **Animation Performance** -- Compositor-only animations enforced via Stylelint, ESLint rules for Framer Motion, strict performance budgets.

### Next steps

1. Install dependencies (`npm install`) once TLS is configured.
2. Wire Contentlayer/MDX for Research & Blog content (`contentlayer.config.ts` scaffold pending).
3. Integrate real backend telemetry (replace demo generator with signed events from chart service).
4. Add Turnstile/hCaptcha to the contact form and persist submissions to secure storage.
5. Hook Lighthouse CI action + GitHub workflow to enforce budgets on every PR.



