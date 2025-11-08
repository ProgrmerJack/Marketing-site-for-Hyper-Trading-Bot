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
  DotGrid,
  SplashCursor,
  SpotlightCard,
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
    accent: "from-blue-400/15 to-cyan-500/10 border-blue-400/20",
  },
  {
    title: "Risk rails that bite",
    description:
      "Position limits, drawdown guards, circuit breakers, and venue health checks run before any order leaves the sandbox - no overrides, no hero trades.",
    icon: ShieldCheck,
    tag: "Risk",
    accent: "from-emerald-400/15 to-green-500/10 border-emerald-400/20",
  },
  {
    title: "Latency-respectful execution",
    description:
      "Smart-order routes split flow across venues with a live kill switch. Demo telemetry surfaces latency, slippage, and risk posture in plain language.",
    icon: Timer,
    tag: "Execution",
    accent: "from-purple-400/15 to-pink-500/10 border-purple-400/20",
  },
  {
    title: "Observable automation",
    description:
      "Signed SSE feeds, deterministic pipelines, and self-healing dags keep the automation explainable, observable, and regulator ready.",
    icon: Cpu,
    tag: "Automation",
    accent: "from-orange-400/15 to-red-500/10 border-orange-400/20",
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
    <section className="relative isolate min-h-[90vh] overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 py-20 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 md:py-32">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        {backgroundsEnabled && hydrated ? (
          <HeroBackground name="hyperspeed" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/80 dark:from-transparent dark:via-slate-950/60 dark:to-slate-900/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.12),rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),rgba(96,165,250,0.06),transparent_70%)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
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
            <div>
              <HeroTelemetryCard cursorEnabled={cursorEnabled} />
            </div>
          </div>
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
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-primary dark:text-primary-foreground dark:shadow-primary/30 dark:hover:shadow-primary/50"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-500 dark:to-blue-700" />
    </Link>
  );

  if (!cursorEnabled) {
    return button;
  }

  return (
    <ClickSpark sparkColor="rgba(59, 130, 246, 0.6)" sparkCount={12} sparkRadius={32} sparkSize={10}>
      <div className="inline-block">
        <div className="rounded-full [&>div]:!bg-transparent [&>div]:!shadow-none [&>div]:dark:!bg-transparent">
          <StarBorder as="div" color="rgb(59, 130, 246)" className="rounded-full !bg-transparent !shadow-none dark:!bg-transparent" speed="3s">
            {button}
          </StarBorder>
        </div>
      </div>
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
  const heroStats = metrics.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative overflow-hidden rounded-3xl border-2 border-orange-200/60 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/30 shadow-2xl dark:border-orange-800/60 dark:from-slate-900/95 dark:via-orange-950/30 dark:to-amber-950/20"
    >
      {/* Card Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-amber-500/8 dark:from-orange-500/15 dark:to-amber-500/15" />
      </div>

      {/* Card Content */}
      <div className="relative space-y-6 p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Signed telemetry
          </span>
          <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">p95 &lt; 150ms</span>
        </div>

        <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
          Demo feeds run on SSE with signed payloads. Latency, slippage, and venue posture publish in
          plain language with integrity checks that halt playback when guarantees slip.
        </p>

        <div className="space-y-4">
          {heroStats.map((metric, index) => (
            <MetricRow
              key={metric.label}
              metric={metric}
              index={index}
            />
          ))}
        </div>

        <div className="rounded-2xl border-2 border-orange-200/60 bg-orange-50/50 p-4 text-xs font-medium text-orange-900 backdrop-blur-sm dark:border-orange-700/60 dark:bg-orange-950/40 dark:text-orange-200">
          <span className="font-bold text-orange-900 dark:text-orange-100">Accessibility:</span> Prefers-reduced-motion
          freezes canvases, disables cursor effects, and swaps to static gradients automatically.
        </div>
      </div>
    </motion.div>
  );
}

type MetricRowProps = {
  metric: Metric;
  index: number;
};

function MetricRow({ metric, index }: MetricRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      className="flex items-center justify-between rounded-xl border-2 border-orange-200/60 bg-gradient-to-r from-white to-orange-50/40 px-5 py-4 backdrop-blur-sm transition-all hover:shadow-lg hover:border-orange-300/80 hover:-translate-y-0.5 dark:border-orange-800/60 dark:from-slate-800/90 dark:to-orange-950/40 dark:hover:border-orange-700/70 dark:hover:bg-slate-800/95"
    >
      <div className="flex-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
          {metric.label}
        </span>
        <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
          {metric.description}
        </p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
          <AnimatedNumber value={metric.value} decimals={metric.decimals} duration={1 + index * 0.15} />
        </span>
        {metric.suffix && (
          <span className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">
            {metric.suffix.trim()}
          </span>
        )}
      </div>
    </motion.div>
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
            <AccentBadge color="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400">
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
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
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
      className="h-full"
    >
      <SpotlightCard
        className={clsx(
          "group relative h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/40 to-slate-50/20 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700/50 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-900/80",
          panel.accent
        )}
        spotlightColor="rgba(251, 146, 60, 0.25)"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className={clsx(
              "flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              index === 0 && "bg-gradient-to-br from-blue-500 to-cyan-500",
              index === 1 && "bg-gradient-to-br from-emerald-500 to-green-500",
              index === 2 && "bg-gradient-to-br from-purple-500 to-pink-500",
              index === 3 && "bg-gradient-to-br from-orange-500 to-red-500"
            )}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <span className={clsx(
              "text-xs font-bold uppercase tracking-widest",
              index === 0 && "text-blue-600 dark:text-blue-400",
              index === 1 && "text-emerald-600 dark:text-emerald-400",
              index === 2 && "text-purple-600 dark:text-purple-400",
              index === 3 && "text-orange-600 dark:text-orange-400"
            )}>
              {panel.tag}
            </span>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            {panel.title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {panel.description}
          </p>

          <div className="mt-6 flex items-center text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
      className="group h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:border-slate-700 dark:from-slate-900 dark:via-blue-950/20 dark:to-cyan-950/10"
    >
      <div className={clsx(
        "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
        index === 0 && "bg-gradient-to-br from-cyan-500 to-blue-500",
        index === 1 && "bg-gradient-to-br from-red-500 to-orange-500",
        index === 2 && "bg-gradient-to-br from-purple-500 to-indigo-500"
      )}>
        <Icon className="h-7 w-7 text-white" />
      </div>

      <h3 className="mb-4 text-xl font-bold text-foreground">
        {step.title}
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      <div className={clsx(
        "rounded-2xl border p-4 text-xs",
        index === 0 && "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50",
        index === 1 && "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50",
        index === 2 && "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50"
      )}>
        <span className={clsx(
          "mb-2 block font-mono font-semibold uppercase tracking-wider",
          index === 0 && "text-cyan-600 dark:text-cyan-400",
          index === 1 && "text-red-600 dark:text-red-400",
          index === 2 && "text-purple-600 dark:text-purple-400"
        )}>
          Stage {index + 1}
        </span>
        <p className={clsx(
          index === 0 && "text-cyan-800 dark:text-cyan-300",
          index === 1 && "text-red-800 dark:text-red-300",
          index === 2 && "text-purple-800 dark:text-purple-300"
        )}>
          Deterministic outputs stored for replay. Signed artefacts attach to every pipeline hop for audit
          and post-trade analysis.
        </p>
      </div>
    </motion.div>
  );
}

function MetricsSection() {
  const { backgroundsEnabled, hydrated } = useMotion();

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
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <AccentBadge color="bg-purple-500/10 text-purple-600 dark:text-purple-400">Observable metrics</AccentBadge>

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
          <div className="grid content-start gap-6 sm:grid-cols-2 sm:gap-8">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type MetricCardProps = {
  metric: Metric;
};

function MetricCard({ metric }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col rounded-3xl border border-orange-200/50 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/10 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:border-orange-800/30 dark:from-slate-900 dark:via-orange-950/20 dark:to-amber-950/10"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
        {metric.label}
      </span>

      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="text-4xl font-bold tabular-nums text-orange-600 dark:text-orange-400">
          <AnimatedNumber value={metric.value} decimals={metric.decimals} duration={1.2} />
          {metric.suffix}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
          <ArrowRight className="h-5 w-5 text-white" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {metric.description}
      </p>
    </motion.div>
  );
}

function IntegrationsSection() {
  const { backgroundsEnabled, hydrated } = useMotion();

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {integrationTiles.map((tile) => (
              <IntegrationTileCard key={tile.name} tile={tile} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

type IntegrationTileCardProps = {
  tile: IntegrationTile;
};

function IntegrationTileCard({ tile }: IntegrationTileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-200/70 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300/80 dark:border-slate-700/70 dark:from-slate-900/95 dark:via-slate-800/80 dark:to-blue-950/50 dark:hover:border-blue-600/70",
        tile.accent
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-8"
        style={{
          backgroundImage: `url(${tile.gradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-blue-500/5 dark:from-slate-950/80 dark:via-transparent dark:to-blue-500/15" />

      <div className="relative space-y-4">
        <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{tile.name}</h3>
        <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">{tile.description}</p>
      </div>

      <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border-2 border-orange-200/60 bg-orange-50/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm dark:border-orange-800/60 dark:bg-orange-950/70 dark:text-orange-300">
        <span className="h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse" />
        Ready for sandbox
      </div>
    </motion.div>
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
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {testimonialItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-teal-200/60 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/20 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-teal-300/80 dark:border-teal-700/60 dark:from-slate-900/95 dark:via-teal-950/40 dark:to-cyan-950/30 dark:hover:border-teal-600/70"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-5 rounded-full blur-3xl dark:opacity-25"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/3 via-transparent to-cyan-500/3 dark:from-teal-500/15 dark:to-cyan-500/15" />
                <p className="relative text-base font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  {item.text}
                </p>
                {/* Shimmer effect */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent transition-all duration-1000 group-hover:left-full dark:via-teal-400/20" />
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
        <div className="relative overflow-hidden rounded-3xl border-2 border-blue-200/60 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30 shadow-2xl dark:border-blue-800/60 dark:from-slate-900/95 dark:via-blue-950/30 dark:to-cyan-950/20">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20">
            {backgroundsEnabled && hydrated ? (
              <>
                <AnimatedBackground
                  className="absolute inset-0 opacity-45"
                  variant="liquid"
                  colors={["rgba(14,165,233,0.4)", "rgba(56,189,248,0.35)", "rgba(59,130,246,0.3)"]}
                  speed="30s"
                  opacity={0.6}
                />
                <AnimatedBackground
                  className="absolute inset-0 opacity-35"
                  variant="balatro"
                  colors={["rgba(14,165,233,0.4)", "rgba(56,189,248,0.35)", "rgba(129,140,248,0.3)"]}
                  speed="36s"
                  opacity={0.55}
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.25),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_70%)]" />
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

            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200/70 bg-gradient-to-br from-white via-blue-50/30 to-slate-50/20 p-6 shadow-lg backdrop-blur-md dark:border-blue-800/70 dark:from-slate-900/95 dark:via-blue-950/40 dark:to-slate-800/60">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                <span>BTC/USDT demo</span>
                <span>Latency p95 &lt; 150 ms</span>
              </div>
              <div className="mt-6 h-64 rounded-xl bg-gradient-to-br from-slate-50/90 to-blue-50/80 dark:from-slate-900/90 dark:to-slate-800/80 shadow-inner overflow-hidden relative border border-slate-200 dark:border-slate-700">
                {/* Simple SVG Candlestick Chart */}
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`grid-${i}`}
                      x1="0"
                      y1={40 * i}
                      x2="400"
                      y2={40 * i}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-slate-200 dark:text-slate-700"
                      opacity="0.5"
                    />
                  ))}

                  {/* Candlesticks */}
                  {[
                    { x: 20, high: 30, low: 70, open: 60, close: 40, rising: true },
                    { x: 60, high: 40, low: 80, open: 70, close: 50, rising: true },
                    { x: 100, high: 50, low: 90, open: 80, close: 60, rising: true },
                    { x: 140, high: 60, low: 100, open: 90, close: 70, rising: true },
                    { x: 180, high: 50, low: 85, open: 60, close: 75, rising: false },
                    { x: 220, high: 55, low: 95, open: 75, close: 85, rising: false },
                    { x: 260, high: 65, low: 110, open: 85, close: 100, rising: false },
                    { x: 300, high: 70, low: 105, open: 100, close: 80, rising: true },
                    { x: 340, high: 60, low: 95, open: 80, close: 70, rising: true },
                    { x: 380, high: 50, low: 85, open: 70, close: 60, rising: true },
                  ].map((candle, i) => (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={candle.x}
                        y1={candle.high}
                        x2={candle.x}
                        y2={candle.low}
                        stroke="currentColor"
                        strokeWidth="1"
                        className={candle.rising ? "text-emerald-500" : "text-red-500"}
                      />
                      {/* Body */}
                      <rect
                        x={candle.x - 6}
                        y={Math.min(candle.open, candle.close)}
                        width="12"
                        height={Math.abs(candle.close - candle.open) || 2}
                        fill="currentColor"
                        className={candle.rising ? "text-emerald-500" : "text-red-500"}
                      />
                    </g>
                  ))}

                  {/* Moving average line */}
                  <polyline
                    points="20,55 60,60 100,70 140,80 180,75 220,85 260,95 300,85 340,75 380,65"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-500 dark:text-blue-400"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xs text-slate-700 dark:text-slate-300">
                Illustrative candlestick chart with moving average. Data shown is non-tradable and provided for
                demonstration purposes only.
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
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
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
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 p-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-emerald-800/30 dark:from-slate-900 dark:via-emerald-950/30 dark:to-teal-950/20"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg"
                    >
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </motion.div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{signal.label}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{signal.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.01 }}
              >
                <InfoDisclosure title={item.title}>
                  {item.description}
                </InfoDisclosure>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  const { cursorEnabled, backgroundsEnabled, hydrated } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant="beams"
            colors={["rgba(251,146,60,0.3)", "rgba(59,130,246,0.25)", "rgba(249,115,22,0.2)"]}
            speed="28s"
            opacity={0.6}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.15),transparent_60%)]" />
        )}
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/50 to-amber-50/30 p-12 shadow-2xl dark:border-orange-800 dark:from-slate-900 dark:via-orange-950/30 dark:to-amber-950/20 md:p-16 lg:p-20">
            {/* Animated Background */}
            <AnimatedBackground
              className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
              variant="threads"
              colors={["rgba(251,146,60,0.4)", "rgba(249,115,22,0.3)", "rgba(59,130,246,0.25)"]}
              speed="30s"
              opacity={0.6}
            />

            <div className="relative z-10 space-y-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl"
              >
                <ArrowRight className="h-10 w-10 text-white" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="heading-contrast font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                Ready to review the gated experience?
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                Share your mandate, risk posture, and constraints. We will coordinate a walkthrough with the
                teams who built the automation.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
              >
                <PrimaryCta href="/contact" cursorEnabled={cursorEnabled}>
                  Contact the team
                </PrimaryCta>
                <SecondaryCta href="/status">Review status page</SecondaryCta>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                Double opt-in. Runbooks exchanged up front. Postal address and compliance documentation in the
                first reply.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
