"use client";

import Link from "next/link";
import type { Route } from "next";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Cpu, ShieldCheck, Timer, Zap } from "lucide-react";
import { useMotion } from "@/components/motion/MotionProvider";
import {
  StarBorder,
  ClickSpark,
  BounceCards,
  DotGrid,
  SplashCursor,
  SpotlightCard,
  GlareHover,
} from "@/components/reactbits/dynamic";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedNumber } from "@/components/animated-number";
import { InfoDisclosure } from "@/components/info-disclosure";

const heroBullets = [
  "No ROI claims. Every statement is risk-balanced and audit-ready.",
  "Demo data is cryptographically signed - inspect, verify, repeat.",
  "Profit-share model only, and only after independent verification.",
] as const;

type FeaturePanel = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  accent: string;
};

const featurePanels: FeaturePanel[] = [
  {
    title: "Telemetry-first signals",
    description:
      "Market, on-chain, and venue microstructure data are normalised in under 120ms with drift monitoring and lineage tracking on every feature.",
    icon: Zap,
    tag: "Signals",
    accent: "from-sky-400/15 to-cyan-500/10 border-sky-400/20",
  },
  {
    title: "Risk rails that bite",
    description:
      "Position limits, drawdown guards, circuit breakers, and venue health checks run before any order leaves the sandbox - no overrides, no hero trades.",
    icon: ShieldCheck,
    tag: "Risk",
    accent: "from-emerald-400/15 to-teal-500/10 border-emerald-400/20",
  },
  {
    title: "Latency-respectful execution",
    description:
      "Smart-order routes split flow across venues with a live kill switch. Demo telemetry surfaces latency, slippage, and risk posture in plain language.",
    icon: Timer,
    tag: "Execution",
    accent: "from-indigo-400/15 to-purple-500/10 border-indigo-400/20",
  },
  {
    title: "Observable automation",
    description:
      "Signed SSE feeds, deterministic pipelines, and self-healing dags keep the automation explainable, observable, and regulator ready.",
    icon: Cpu,
    tag: "Automation",
    accent: "from-amber-400/15 to-orange-500/10 border-amber-400/20",
  },
];

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  description: string;
};

const metrics: Metric[] = [
  {
    label: "Latency p95",
    value: 142,
    suffix: " ms",
    description: "On the signed market data demo feed",
  },
  {
    label: "Integrations gated",
    value: 18,
    suffix: " venues",
    description: "Risk and compliance-vetted exchange & custodian surfaces",
  },
  {
    label: "Control checks",
    value: 42,
    suffix: " per route",
    description: "Executed before any order legs stream outside the sandbox",
  },
];

type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const workflowSteps: WorkflowStep[] = [
  {
    title: "Signals without the sorcery",
    description:
      "Feature stores hydrate venue, market, and on-chain telemetry in under 120ms with schema drift detection and reproducible playbacks.",
    icon: Zap,
  },
  {
    title: "Risk rails first",
    description:
      "Position sizing, drawdown bands, circuit breakers, and venue health checks must pass before any route leaves the sandbox.",
    icon: ShieldCheck,
  },
  {
    title: "Execution that respects latency",
    description:
      "Adaptive smart-order routes split flow across venues under a live kill switch with signed audit events for every micro decision.",
    icon: Timer,
  },
];

type TrustSignal = {
  label: string;
  copy: string;
};

const trustSignals: TrustSignal[] = [
  {
    label: "Independent review underway",
    copy: "Performance data stays gated until third-party audit concludes. Demo feed is signed so you can verify what you see.",
  },
  {
    label: "Security posture",
    copy: "OWASP Top 10 scanning in CI, secrets are server-side only, and all routes enforce strict security headers.",
  },
  {
    label: "Realtime transparency",
    copy: "Status page exposes latency, uptime, and incident retros in public. Demo stream pauses if data integrity ever drops.",
  },
];

const gradientDataUrl = (from: string, to: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='${from}'/><stop offset='100%' stop-color='${to}'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)' rx='40' ry='40'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

type IntegrationTile = {
  name: string;
  description: string;
  accent: string;
  gradient: string;
};

const integrationTiles: IntegrationTile[] = [
  {
    name: "Coinbase Prime",
    description: "Signed custody states, deterministic settlement hooks, and velocity-aware limits.",
    accent: "from-sky-500/10 to-blue-600/10 border-sky-400/30",
    gradient: gradientDataUrl("#60a5fa", "#2563eb"),
  },
  {
    name: "Binance Institutional",
    description: "Route per-venue risk, real-time wallet balances, and throttle-safe smart ordering.",
    accent: "from-emerald-500/10 to-teal-500/10 border-emerald-400/30",
    gradient: gradientDataUrl("#34d399", "#0f766e"),
  },
  {
    name: "Fireblocks",
    description: "Policy-controlled transfers with role-aware approvals and deterministic release windows.",
    accent: "from-purple-500/10 to-fuchsia-500/10 border-purple-400/30",
    gradient: gradientDataUrl("#a855f7", "#ec4899"),
  },
  {
    name: "Talos",
    description: "Institutional smart order routing with signed post-trade execution telemetry.",
    accent: "from-orange-500/10 to-amber-500/10 border-orange-400/30",
    gradient: gradientDataUrl("#fb923c", "#f59e0b"),
  },
];

const testimonialItems = [
  {
    text: '"The only crypto automation stack we\'ve seen that treats latency, controls, and telemetry with capital-markets discipline." - External quant advisory partner',
    image: gradientDataUrl("#4f46e5", "#22d3ee"),
  },
  {
    text: 'Signed demo feeds and deterministic playbacks meant our compliance team could trace every decision before we ever touched capital. - Risk officer (prospective partner)',
    image: gradientDataUrl("#14b8a6", "#0ea5e9"),
  },
  {
    text: 'The automation feels like a co-pilot. Magnetic UI, clear controls, instant explainability. - Product design advisor',
    image: gradientDataUrl("#6366f1", "#ec4899"),
  },
  {
    text: 'Micro-structure aware, policy driven, and observable. The bar for crypto automation just moved. - Institutional allocator',
    image: gradientDataUrl("#f97316", "#facc15"),
  },
];

const demoChecklist = [
  "SSE heartbeat every 10 seconds with Last-Event-ID resumption",
  "HMAC signature per batch; mismatches trigger pause state",
  "No order routing or PII exposed through the public site",
  "Offline overlay appears if heartbeat is missed three times",
] as const;

const faqItems = [
  {
    title: "Is this a live trading system?",
    description:
      "No. This is a signed, observable demo of the automation surface. Live trading only begins after mutual compliance, risk, and mandate alignment.",
  },
  {
    title: "Can we review the telemetry feed?",
    description:
      "Yes. The SSE demo feed is cryptographically signed. Inspect payloads, verify signatures, and replay states locally before any deeper engagement.",
  },
  {
    title: "What does onboarding look like?",
    description:
      "We run a controls deep dive, map shared runbooks, align on policy, then open the private sandbox with supervised kill-switch rehearsals.",
  },
] as const;

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <FeatureStorySection />
      <WorkflowSection />
      <MetricsSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <DemoSection />
      <TrustSection />
      <FinalCtaSection />
    </div>
  );
}

function HeroSection() {
  const { backgroundsEnabled, cursorEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden py-20 md:py-32">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <HeroBackground name="hyperspeed" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80 dark:from-black/95 dark:via-black/90 dark:to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_50%)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <AccentBadge>Regulated automation preview</AccentBadge>

            <SplitText
              as="h1"
              splitBy="word"
              startDelay={0.12}
              className="heading-contrast text-balance font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Disciplined crypto automation without the hype
            </SplitText>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              The automation layer treats telemetry, controls, and execution with regulated-market
              discipline. Signed demo feeds, deterministic pipelines, and transparent runbooks arrive
              before any capital moves.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryCta href="/contact" cursorEnabled={cursorEnabled}>
                Request gated access
              </PrimaryCta>
              <SecondaryCta href="/live-demo">Explore signed demo</SecondaryCta>
            </div>

            {/* Trust Indicators */}
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {heroBullets.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors hover:bg-card"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <HeroTelemetryCard cursorEnabled={cursorEnabled} />
        </div>
      </Container>
    </section>
  );
}

type PrimaryCtaProps = {
  href: string;
  children: React.ReactNode;
  cursorEnabled: boolean;
};

function PrimaryCta({ href, children, cursorEnabled }: PrimaryCtaProps) {
  const button = (
    <Link
      href={href as Route}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );

  if (!cursorEnabled) {
    return button;
  }

  return (
    <ClickSpark sparkColor="rgba(59, 130, 246, 0.6)" sparkCount={12} sparkRadius={32} sparkSize={10}>
      <StarBorder as="div" color="rgb(59, 130, 246)" className="inline-block rounded-full" speed="2.5s">
        {button}
      </StarBorder>
    </ClickSpark>
  );
}

type SecondaryCtaProps = {
  href: string;
  children: React.ReactNode;
};

function SecondaryCta({ href, children }: SecondaryCtaProps) {
  return (
    <Link
      href={href as Route}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

type HeroTelemetryCardProps = {
  cursorEnabled: boolean;
};

function HeroTelemetryCard({ cursorEnabled }: HeroTelemetryCardProps) {
  const { backgroundsEnabled, hydrated } = useMotion();
  const heroStats = metrics.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
    >
      {/* Card Background - Clean gradient only */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />
      </div>

      {/* Card Content */}
      <div className="relative space-y-6 p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Signed telemetry
          </span>
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">p95 &lt; 150ms</span>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Demo feeds run on SSE with signed payloads. Latency, slippage, and venue posture publish in
          plain language with integrity checks that halt playback when guarantees slip.
        </p>

        <div className="space-y-4">
          {heroStats.map((metric, index) => (
            <MetricRow
              key={metric.label}
              metric={metric}
              cursorEnabled={cursorEnabled}
              index={index}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Accessibility:</span> Prefers-reduced-motion
          freezes canvases, disables cursor effects, and swaps to static gradients automatically.
        </div>
      </div>
    </motion.div>
  );
}

type MetricRowProps = {
  metric: Metric;
  cursorEnabled: boolean;
  index: number;
};

function MetricRow({ metric, cursorEnabled, index }: MetricRowProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/50 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
    >
      <div className="flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {metric.label}
        </span>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {metric.description}
        </p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
          <AnimatedNumber value={metric.value} decimals={metric.decimals} duration={1 + index * 0.15} />
        </span>
        {metric.suffix && (
          <span className="ml-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            {metric.suffix.trim()}
          </span>
        )}
      </div>
    </motion.div>
  );

  if (!cursorEnabled) {
    return content;
  }

  return (
    <GlareHover className="rounded-xl" glareColor="rgba(59, 130, 246, 0.15)">
      {content}
    </GlareHover>
  );
}

function FeatureStorySection() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="threads"
            colors={["rgba(59,130,246,0.4)", "rgba(14,165,233,0.3)", "rgba(148,163,184,0.25)"]}
            speed="34s"
            opacity={0.6}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <AccentBadge color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Workflow clarity
            </AccentBadge>
            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Signals, controls, execution - choreographed
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Every surface of the automation stack is observable. Feature stores, risk rails, and execution
              all communicate in the open so you can interrogate decisions before capital is at risk.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid auto-rows-[minmax(0,1fr)] gap-6 md:grid-cols-2">
            {featurePanels.map((panel, index) => (
              <FeatureCard key={panel.title} panel={panel} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type FeatureCardProps = {
  panel: FeaturePanel;
  index: number;
};

function FeatureCard({ panel, index }: FeatureCardProps) {
  const Icon = panel.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard
        className={clsx(
          "group h-full rounded-3xl border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          panel.accent
        )}
        spotlightColor="rgba(56, 189, 248, 0.2)"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {panel.tag}
            </span>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-foreground">
            {panel.title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
            {panel.description}
          </p>

          <div className="mt-6 flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span>Step {index + 1}</span>
            <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

type AccentBadgeProps = {
  children: React.ReactNode;
  color?: string;
};

function AccentBadge({ children, color = "bg-primary/10 text-primary" }: AccentBadgeProps) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest", color)}>
      {children}
    </span>
  );
}

function WorkflowSection() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="dither"
            colors={["rgba(56,189,248,0.3)", "rgba(14,165,233,0.25)", "rgba(45,212,191,0.2)"]}
            speed="32s"
            opacity={0.65}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.05)_0%,transparent_55%,rgba(56,189,248,0.08)_100%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              A transparent workflow from signal to execution
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Each phase is observable. Feature stores emit signed events. Risk controls publish pass/fail
              artefacts. Execution traces stay replayable.
            </p>
          </div>

          {/* Workflow Grid */}
          <div className="grid auto-rows-[minmax(0,1fr)] gap-6 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <WorkflowCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type WorkflowCardProps = {
  step: WorkflowStep;
  index: number;
};

function WorkflowCard({ step, index }: WorkflowCardProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full rounded-3xl border border-border bg-card p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-7 w-7 text-primary" />
      </div>

      <h3 className="mb-4 text-xl font-bold text-foreground">
        {step.title}
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      <div className="rounded-2xl border border-border bg-muted/30 p-4 text-xs">
        <span className="mb-2 block font-mono font-semibold uppercase tracking-wider text-primary">
          Stage {index + 1}
        </span>
        <p className="text-muted-foreground">
          Deterministic outputs stored for replay. Signed artefacts attach to every pipeline hop for audit
          and post-trade analysis.
        </p>
      </div>
    </motion.div>
  );
}

function MetricsSection() {
  const { backgroundsEnabled, hydrated, cursorEnabled } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="beams"
            colors={["rgba(56,189,248,0.4)", "rgba(14,165,233,0.35)", "rgba(99,102,241,0.3)"]}
            speed="26s"
            opacity={0.6}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.15),transparent_70%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <AccentBadge>Observable metrics</AccentBadge>

            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Numbers you can interrogate
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Metrics stay live, signed, and replayable. The demo mimics the same observability surface the
              gated experience provides.
            </p>

            <InfoDisclosure title="What gets logged?" defaultOpen>
              <p className="text-sm leading-relaxed">
                Latency, slippage, fill quality, route selection, and every control decision. Each record
                ships with a signature so you can verify integrity independently.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Download a replay bundle to inspect the pipeline locally. Compare our telemetry with your
                venue data or reconciliation stack.
              </p>
            </InfoDisclosure>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid auto-rows-[minmax(0,1fr)] gap-6 sm:grid-cols-2">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} cursorEnabled={cursorEnabled} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type MetricCardProps = {
  metric: Metric;
  cursorEnabled: boolean;
};

function MetricCard({ metric, cursorEnabled }: MetricCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full rounded-3xl border border-border bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:via-slate-800 dark:to-slate-900"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
        {metric.label}
      </span>

      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="text-4xl font-bold tabular-nums text-slate-900 dark:text-white">
          <AnimatedNumber value={metric.value} decimals={metric.decimals} duration={1.2} />
          {metric.suffix}
        </span>
        <ArrowRight className="h-5 w-5 text-primary" />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {metric.description}
      </p>
    </motion.div>
  );

  if (!cursorEnabled) {
    return content;
  }

  return (
    <GlareHover className="h-full rounded-3xl" glareColor="rgba(14, 165, 233, 0.25)">
      {content}
    </GlareHover>
  );
}

function IntegrationsSection() {
  const { backgroundsEnabled, hydrated, cursorEnabled } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <div className="absolute inset-0 opacity-60">
            <DotGrid baseColor="#334155" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Integrations ready for gated partners
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Custody, execution, and compliance surfaces already wired. Toggle what you need, sign off on
              controls, and the sandbox mirrors your stack.
            </p>
          </div>

          {/* Integration Grid */}
          <div className="grid auto-rows-[minmax(0,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            {integrationTiles.map((tile) => (
              <IntegrationTileCard key={tile.name} tile={tile} cursorEnabled={cursorEnabled} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type IntegrationTileCardProps = {
  tile: IntegrationTile;
  cursorEnabled: boolean;
};

function IntegrationTileCard({ tile, cursorEnabled }: IntegrationTileCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className={clsx(
        "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-card p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
        tile.accent
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${tile.gradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-primary/10 dark:from-slate-950/60 dark:via-transparent dark:to-primary/20" />

      <div className="relative space-y-4">
        <h3 className="text-xl font-bold text-foreground">{tile.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{tile.description}</p>
      </div>

      <span className="relative mt-6 inline-flex text-xs font-bold uppercase tracking-widest text-primary">
        Ready for sandbox
      </span>
    </motion.div>
  );

  if (!cursorEnabled) {
    return content;
  }

  return (
    <GlareHover className="h-full rounded-3xl" glareColor="rgba(59, 130, 246, 0.2)">
      {content}
    </GlareHover>
  );
}

function TestimonialsSection() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="threads"
            colors={["rgba(94,234,212,0.3)", "rgba(56,189,248,0.25)", "rgba(15,118,110,0.2)"]}
            speed="36s"
            opacity={0.65}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.1),transparent_70%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Signals from the review desk
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Advisors and partner desks have already wrung the automation surface through diligence. Their
              notes stay public so you know what to expect.
            </p>
          </div>

          {/* Testimonials Gallery */}
          <div className="grid auto-rows-[minmax(0,1fr)] gap-8 md:grid-cols-2">
            {testimonialItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/20 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-teal-800/50 dark:from-slate-900 dark:via-teal-950/30 dark:to-cyan-950/20"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-20 rounded-full blur-3xl"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                  }}
                />
                <p className="relative text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.text}
                </p>
                {/* Shimmer effect */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DemoSection() {
  const { backgroundsEnabled, cursorEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0">
            {backgroundsEnabled && hydrated ? (
              <>
                <AnimatedBackground
                  className="absolute inset-0 opacity-40"
                  variant="liquid"
                  colors={["rgba(14,165,233,0.4)", "rgba(56,189,248,0.35)", "rgba(59,130,246,0.3)"]}
                  speed="30s"
                  opacity={0.6}
                />
                <AnimatedBackground
                  className="absolute inset-0 opacity-30"
                  variant="balatro"
                  colors={["rgba(14,165,233,0.4)", "rgba(56,189,248,0.35)", "rgba(129,140,248,0.3)"]}
                  speed="36s"
                  opacity={0.55}
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.2),transparent_70%)]" />
            )}
          </div>

          {/* Cursor Effect */}
          {cursorEnabled && hydrated ? (
            <div className="pointer-events-none absolute inset-0 z-0">
              <SplashCursor
                DENSITY_DISSIPATION={0.96}
                VELOCITY_DISSIPATION={0.98}
                SPLAT_RADIUS={0.4}
                SPLAT_FORCE={9000}
                BACK_COLOR={{ r: 4, g: 7, b: 15 }}
              />
            </div>
          ) : null}

          {/* Content */}
          <div className="relative z-10 grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="space-y-6 text-foreground">
              <h3 className="heading-contrast text-3xl font-bold md:text-4xl">
                Every event signed and replayable
              </h3>

              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Hold the feed to the same standard your audit desk will expect. Download the signature chain,
                replay the run, and compare against your own reconciliations.
              </p>

              <ul className="space-y-3 text-sm text-muted-foreground">
                {demoChecklist.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Link
                href={"/api/demo-feed" as Route}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View SSE endpoint reference
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>BTC/USDT demo</span>
                <span>Latency p95 &lt; 150 ms</span>
              </div>
              <div className="mt-6 h-64 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
              <p className="mt-4 text-xs text-muted-foreground">
                Chart powered by TradingView Lightweight Charts. Data shown is non-tradable and provided for
                illustration only.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustSection() {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="dither"
            colors={["rgba(56,189,248,0.3)", "rgba(59,130,246,0.25)", "rgba(94,234,212,0.2)"]}
            speed="36s"
            opacity={0.65}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.15),transparent_60%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          {/* Left: Trust Signals */}
          <div className="space-y-8">
            <div>
              <AccentBadge color="bg-sky-500/10 text-sky-600 dark:text-sky-400">
                Trust surface
              </AccentBadge>
              <h2 className="heading-contrast mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Risk, compliance, and transparency surface
              </h2>
            </div>

            <div className="space-y-4">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-2 text-base font-bold text-foreground">{signal.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{signal.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <InfoDisclosure title={item.title}>
                  {item.description}
                </InfoDisclosure>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  const { cursorEnabled } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="section-surface" />
      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-accent/5 to-background p-12 shadow-2xl md:p-16">
          <AnimatedBackground
            className="pointer-events-none absolute inset-0 opacity-50"
            variant="threads"
            colors={["rgba(56,189,248,0.4)", "rgba(37,99,235,0.3)", "rgba(203,213,225,0.25)"]}
            speed="30s"
            opacity={0.6}
          />

          <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to review the gated experience?
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Share your mandate, risk posture, and constraints. We will coordinate a walkthrough with the
              teams who built the automation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <PrimaryCta href="/contact" cursorEnabled={cursorEnabled}>
                Contact the team
              </PrimaryCta>
              <SecondaryCta href="/status">Review status page</SecondaryCta>
            </div>

            <p className="text-sm text-muted-foreground">
              Double opt-in. Runbooks exchanged up front. Postal address and compliance documentation in the
              first reply.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
