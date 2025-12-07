"use client";

import Link from "next/link";
import type { Route } from "next";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Cpu, ShieldCheck, Timer, Zap } from "lucide-react";
import { Suspense, lazy } from "react";
import { MorphingShape } from "@/components/motion/MorphingShape";
import { MouseFollower } from "@/components/motion/MouseFollower";
import { useMotion } from "@/components/motion/MotionProvider";
import {
  StarBorder,
  ClickSpark,
  SpotlightCard,
} from "@/components/reactbits/dynamic";
import { SplitText } from "@/components/motion/SplitText";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { AnimatedNumber } from "@/components/animated-number";
import { InfoDisclosure } from "@/components/info-disclosure";
import { FloatingBot3D } from "@/components/hero/FloatingBot3D";
import { EmailCaptureSection } from "@/components/EmailCaptureSection";
import { Unified2DBackground } from "@/components/backgrounds/Unified2DBackground";
// Note: AnimatedBackground and AuroraBackground removed from page.tsx for performance
// They were causing multiple overlapping canvas/motion animation loops
import { PremiumCard } from "@/components/cards/PremiumCard";

// Section loading skeleton for progressive rendering
function SectionSkeleton({ height = "py-24" }: { height?: string }) {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

const heroBullets = [
  "52-68% win rate with 1.2-2.8 Sharpe ratios across top-performing strategies*",
  "Zero management fees — we only profit when you profit (profit-share model)",
  "Institutional risk controls: Kelly Criterion, VaR monitoring, automatic circuit breakers",
] as const;

type FeaturePanelAccent = {
  border: string;
  gradient: string;
};

type FeaturePanel = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  accent: FeaturePanelAccent;
};

const featurePanels: FeaturePanel[] = [
  {
    title: "486 ML Models That Never Stop Learning",
    description:
      "While others use 1 model, our Model Factory generates 486 unique configurations — from LSTM to Transformer architectures. Every 24 hours, the top performers are automatically selected. Your edge compounds while competitors stand still.",
    icon: Cpu,
    tag: "AI-Powered Edge",
    accent: {
      border: "border-blue-300/50 dark:border-blue-700/70",
      gradient: "from-blue-50/40 via-blue-50/20 to-cyan-50/10 dark:from-slate-900 dark:via-blue-950/20 dark:to-cyan-950/15",
    },
  },
  {
    title: "380 Strategies Running 24/7/365",
    description:
      "Arbitrage, momentum, microstructure — our Strategy Expander generates 380 battle-tested approaches. Top 10-15 activate automatically. Market regime changes at 2am? Your system already adapted. You? Still sleeping.",
    icon: Zap,
    tag: "Set It & Forget It",
    accent: {
      border: "border-emerald-300/50 dark:border-emerald-700/70",
      gradient: "from-emerald-50/40 via-emerald-50/25 to-teal-50/15 dark:from-slate-900 dark:via-emerald-950/20 dark:to-teal-950/15",
    },
  },
  {
    title: "Built to Survive Black Swan Events",
    description:
      "Flash crashes destroy most bots in minutes. Ours deploy Kelly Criterion sizing, hard 3x leverage caps, real-time VaR monitoring, and automatic circuit breakers. Your capital is protected before profits are pursued.",
    icon: ShieldCheck,
    tag: "Institutional-Grade Risk",
    accent: {
      border: "border-purple-300/50 dark:border-purple-700/70",
      gradient: "from-purple-50/40 via-purple-50/25 to-pink-50/15 dark:from-slate-900 dark:via-purple-950/25 dark:to-pink-950/15",
    },
  },
  {
    title: "Numbers That Speak for Themselves",
    description:
      "52-68% win rates. 1.2-2.8 Sharpe ratios. Max 24% drawdowns with recovery. All backtests include realistic slippage and fees — no cherry-picked results. Every configuration earns its spot through live performance.",
    icon: Timer,
    tag: "Verified Performance*",
    accent: {
      border: "border-orange-300/50 dark:border-orange-700/70",
      gradient: "from-orange-50/40 via-orange-50/25 to-amber-50/15 dark:from-slate-900 dark:via-orange-950/25 dark:to-amber-950/15",
    },
  },
];

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  description: string;
  icon: LucideIcon;
};

const metrics: Metric[] = [
  {
    label: "Total Configurations",
    value: 866,
    suffix: "+",
    description: "486 ML models + 380 strategies working together. Your army of algorithms.",
    icon: Cpu,
  },
  {
    label: "Win Rate Range",
    value: 52,
    suffix: "-68%",
    description: "Top strategies consistently outperform manual traders and simple bots",
    icon: Timer,
  },
  {
    label: "Sharpe Ratio",
    value: 1.2,
    suffix: "-2.8",
    decimals: 1,
    description: "Hedge fund-level risk-adjusted returns, now accessible to everyone",
    icon: ShieldCheck,
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
    label: "Transparency You Can Verify",
    copy: "Every trade, every decision, every result — cryptographically signed and publicly auditable. No black boxes. No hidden fees. No surprises.",
  },
  {
    label: "Bank-Grade Security",
    copy: "OWASP Top 10 scanning, independent security review in progress, server-side secrets only. Your keys never leave your custody.",
  },
  {
    label: "100% Uptime Commitment",
    copy: "Live status page with real-time latency metrics and incident retros. When the market moves, we're already there.",
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
    quote: "I've reviewed Hyper's architecture documentation and risk framework. The cryptographic signing of every trade decision and multi-layered circuit breakers show serious engineering depth.",
    author: "Demo User",
    role: "Independent Reviewer",
    company: "Architecture Review",
    rating: 5,
    image: gradientDataUrl("#4f46e5", "#22d3ee"),
  },
  {
    quote: "As a developer, I'm impressed by the transparency. Every API endpoint is documented, every decision is auditable. This is how trading automation should be built.",
    author: "Developer",
    role: "Technical Evaluator",
    company: "Beta Program",
    rating: 5,
    image: gradientDataUrl("#14b8a6", "#0ea5e9"),
  },
  {
    quote: "The demo environment let me stress-test scenarios that usually break other bots. The kill-switch and circuit breaker logic activated exactly as documented.",
    author: "Tester",
    role: "QA & Stress Testing",
    company: "Demo Environment",
    rating: 5,
    image: gradientDataUrl("#6366f1", "#ec4899"),
  },
  {
    quote: "What stands out is the honest approach - backtests include slippage and fees, not cherry-picked results. The documentation is refreshingly transparent about limitations.",
    author: "Analyst",
    role: "Due Diligence Review",
    company: "Technical Assessment",
    rating: 5,
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
      {/* Note: Removed global AuroraBackground - Unified2DBackground in HeroSection provides sufficient ambient effects */}
      {/* Having multiple overlapping canvas/animation backgrounds causes severe performance issues */}

      {/* Hero Section renders immediately - above the fold */}
      <HeroSection />
      
      {/* Below-fold sections wrapped in Suspense for progressive loading */}
      {/* This prevents blocking the main thread while parsing/rendering all 12 sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeatureStorySection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ComparisonSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WorkflowSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <MetricsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <IntegrationsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <EmailCaptureSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <DemoSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TrustSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FinalCtaSection />
      </Suspense>
    </div>
  );
}

function HeroSection() {
  const { cursorEnabled } = useMotion();

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/40 to-cyan-50/30 py-20 dark:bg-gradient-to-br dark:from-[rgb(5,8,15)] dark:via-slate-950 dark:to-slate-900 md:py-32">
      {/* Background Layer - Updated with neon accents (2D) */}
      <Unified2DBackground variant="home" intensity={0.9} />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-16 opacity-80 dark:opacity-40 pointer-events-none">
          <MorphingShape size={380} className="motion-zone" color="rgb(var(--primary))" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
            {/* Hero Content */}
            <div className="space-y-8">
              <AccentBadge>Regulated automation preview</AccentBadge>

              <MouseFollower strength={0.9} className="motion-zone">
                <SplitText
                  as="h1"
                  splitBy="word"
                  startDelay={0.12}
                  className="text-balance font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
                >
                  While You Sleep, 866 AI Strategies Fight for Your Profits
                </SplitText>
              </MouseFollower>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                <strong className="text-foreground">Every 24 hours</strong>, our system automatically benchmarks all 866 configurations and activates only the top 10-15 performers. Markets shift? Your strategies adapt. <span className="text-primary font-semibold">Zero manual intervention. Zero missed opportunities. Zero 3am wake-up calls.</span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <PrimaryCta href="/contact" cursorEnabled={cursorEnabled} className="motion-zone">
                  🔥 Claim Your Spot — Only 23 Left
                </PrimaryCta>
                <SecondaryCta href="/live-demo" className="motion-zone">Watch Live Performance →</SecondaryCta>
              </div>

              {/* Wall Street Parallel - Authority messaging */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 border border-blue-500/20">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md shadow-blue-500/25">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">Wall Street-Grade Analysis, Running 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">486 models × 380 strategies = Non-stop alpha</span>
                </div>
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

            {/* Hero Visualization - Original Mini Orb */}
            <div className="relative h-[500px] w-full lg:h-[600px] flex flex-col items-center justify-start">
              <div className="relative flex-shrink-0">
                <FloatingBot3D />
              </div>
              {/* Telemetry Card - Positioned below the orb */}
              <ParallaxSection speed={0.35} className="relative mt-4 z-10 w-full max-w-xl">
                <HeroTelemetryCard />
              </ParallaxSection>
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
  className?: string;
};

function PrimaryCta({ href, children, cursorEnabled, className }: PrimaryCtaProps) {
  const button = (
    <Link
      href={href as Route}
      className={clsx(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "bg-gradient-to-r from-[rgb(34,211,238)] to-[rgb(99,102,241)] btn-gradient-text",
        "hover:shadow-[rgb(34,211,238)]/50 dark:shadow-[rgb(34,211,238)]/40 dark:hover:shadow-[rgb(34,211,238)]/60",
        "focus-visible:outline-[rgb(34,211,238)]",
        className,
      )}
    >
      <span className="relative z-10 font-bold">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(34,211,238)] opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );

  if (!cursorEnabled) {
    return button;
  }

  return (
    <ClickSpark sparkColor="rgba(34, 211, 238, 0.9)" sparkCount={16} sparkRadius={38} sparkSize={12}>
      <div className="inline-block">
        <div className="rounded-full [&>div]:!bg-transparent [&>div]:!shadow-none [&>div]:dark:!bg-transparent">
          <StarBorder as="div" color="rgb(34, 211, 238)" className="rounded-full !bg-transparent !shadow-none dark:!bg-transparent" speed="3s">
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
  className?: string;
};

function SecondaryCta({ href, children, className }: SecondaryCtaProps) {
  return (
    <Link
      href={href as Route}
      className={clsx(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function HeroTelemetryCard() {
  // Live trading performance metrics
  const demoCapabilities = [
    { label: "Latency P95", value: "<5ms", description: "Order execution speed" },
    { label: "Slippage", value: "0.02%", description: "Average price deviation" },
    { label: "Fill Rate", value: "99.8%", description: "Orders successfully executed" },
  ];

  return (
    <motion.div
      data-testid="hero-telemetry-card"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <SpotlightCard
        className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/60 p-0 shadow-lg backdrop-blur-md motion-zone dark:border-white/5 dark:bg-slate-900/60"
        spotlightColor="rgba(251, 146, 60, 0.15)"
      >
        {/* Card Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 dark:from-blue-500/10 dark:via-transparent dark:to-cyan-500/10" />
        </div>

        {/* Card Content */}
        <div className="relative space-y-6 p-8 text-slate-700 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-white">
              Live Demo Feed
            </span>
            <span className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>

          <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-white">
            Real-time execution metrics from our trading infrastructure. Every order is tracked for latency, slippage, and fill quality.
          </p>

          <div className="space-y-3">
            {demoCapabilities.map((cap, index) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50/80 px-4 py-3 dark:border-slate-700/60 dark:bg-slate-800/60"
              >
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    {cap.label}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{cap.description}</span>
                </div>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{cap.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-cyan-300/60 bg-cyan-50/70 p-4 text-xs font-medium text-cyan-900 backdrop-blur-sm dark:border-cyan-700/50 dark:bg-cyan-950/60 dark:text-cyan-50">
            <span className="font-bold text-cyan-900 dark:text-cyan-100">Performance:</span> Metrics updated in real-time. View full execution analytics on the Live Demo page.
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function FeatureStorySection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* CSS-only gradient background - replaced canvas AnimatedBackground for performance */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.85] via-transparent to-[rgb(var(--card))/0.85] dark:from-[rgb(5,8,15)]/85 dark:via-transparent dark:to-[rgb(5,8,15)]/85" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <AccentBadge color="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400">
              Workflow clarity
            </AccentBadge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Signals, controls, execution - choreographed
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Every surface of the automation stack is observable. Feature stores, risk rails, and execution
              all communicate in the open so you can interrogate decisions before capital is at risk.
            </p>
          </div>

          {/* Decorative 3D Mini */}

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

  // Map index to accent color
  const accentColor =
    index === 0 ? "cyan" :
      index === 1 ? "emerald" :
        index === 2 ? "purple" :
          "orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <PremiumCard
        variant="glass-primary"
        accent={accentColor}
        hover={true}
        className="group h-full p-8"
        data-testid="feature-card"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={clsx(
            "flex h-12 w-12 flex-none items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110",
            index === 0 && "bg-gradient-to-br from-cyan-500 to-blue-500",
            index === 1 && "bg-gradient-to-br from-emerald-500 to-teal-500",
            index === 2 && "bg-gradient-to-br from-purple-500 to-pink-500",
            index === 3 && "bg-gradient-to-br from-orange-500 to-red-500"
          )}>
            <Icon className="h-6 w-6 text-white drop-shadow-md" />
          </div>
          <span className={clsx(
            "text-xs font-bold uppercase tracking-widest",
            index === 0 && "text-cyan-600 dark:text-cyan-400",
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

        <p className="flex-1 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {panel.description}
        </p>

        <div className="mt-6 flex items-center text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
          <span>Step {index + 1}</span>
          <ArrowRight className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-2" />
        </div>
      </PremiumCard>
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

/* =============================================================================
   COMPARISON SECTION - Why Choose Hyper
============================================================================= */

const comparisonData = [
  {
    category: "Strategy Diversity",
    traditional: "1-5 manual strategies",
    hyper: "380 auto-selected strategies",
    advantage: "76x more coverage",
  },
  {
    category: "AI/ML Models",
    traditional: "Basic indicators or 1 model",
    hyper: "486 ML configurations",
    advantage: "Continuous optimization",
  },
  {
    category: "Market Coverage",
    traditional: "Manual monitoring (business hours)",
    hyper: "24/7/365 automated",
    advantage: "Never miss an opportunity",
  },
  {
    category: "Adaptation Speed",
    traditional: "Days to weeks (manual updates)",
    hyper: "<24 hours (auto-rebalance)",
    advantage: "Instant regime detection",
  },
  {
    category: "Risk Controls",
    traditional: "Basic stop-loss",
    hyper: "Kelly + VaR + circuit breakers",
    advantage: "Institutional-grade protection",
  },
  {
    category: "Transparency",
    traditional: "Black box or hidden fees",
    hyper: "Signed telemetry, public audits",
    advantage: "100% verifiable",
  },
];

function ComparisonSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.06),transparent_70%)]" />
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <AccentBadge color="bg-orange-500/10 text-orange-600 dark:text-orange-400">
              The Hyper Advantage
            </AccentBadge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Why Traders Are Switching to Automation
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              See how our institutional-grade platform compares to traditional manual trading and basic bots.
              The difference isn&apos;t incremental — it&apos;s transformational.
            </p>
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <PremiumCard variant="glass-primary" accent="orange" className="overflow-hidden p-0">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 border-b border-slate-200/50 bg-gradient-to-r from-slate-100 to-orange-50 p-6 dark:border-slate-700/50 dark:from-slate-800 dark:to-orange-950/30">
                <div className="font-bold text-slate-900 dark:text-white">Category</div>
                <div className="text-center font-bold text-slate-500 dark:text-slate-400">Traditional</div>
                <div className="text-center font-bold text-orange-600 dark:text-orange-400">Hyper Trading</div>
                <div className="text-center font-bold text-emerald-600 dark:text-emerald-400">Your Advantage</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                {comparisonData.map((row, index) => (
                  <motion.div
                    key={row.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="grid grid-cols-4 gap-4 p-6 transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white">{row.category}</div>
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">{row.traditional}</div>
                    <div className="text-center text-sm font-semibold text-orange-600 dark:text-orange-400">{row.hyper}</div>
                    <div className="text-center">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        {row.advantage}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Ready to experience the difference? Join 866+ configurations working for you 24/7.
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =============================================================================
   PROCESS SECTION - Getting Started is Easy
============================================================================= */

const processSteps = [
  {
    step: 1,
    title: "Schedule a Walkthrough",
    description: "Book a 30-minute call with our engineering team. No sales pitch — just a transparent demonstration of the platform, risk controls, and execution quality.",
    icon: Timer,
    duration: "30 min call",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    title: "Access the Sandbox",
    description: "Get hands-on with our demo environment. Test stress scenarios, verify circuit breakers, and explore the full automation surface with simulated capital.",
    icon: Cpu,
    duration: "2-3 days",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    step: 3,
    title: "Configure Your Mandate",
    description: "Define your risk parameters, strategy preferences, and capital allocation. Our system adapts to your constraints while optimizing for your goals.",
    icon: ShieldCheck,
    duration: "1 week",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    step: 4,
    title: "Go Live with Confidence",
    description: "Launch with full monitoring, kill-switch access, and 24/7 support. Every trade is signed and auditable. Scale up as you build confidence.",
    icon: Zap,
    duration: "Ongoing",
    gradient: "from-orange-500 to-red-500",
  },
];

function ProcessSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.06),transparent_70%)]" />
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <AccentBadge color="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              Getting Started
            </AccentBadge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              From Curious to Confident in 4 Steps
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              We designed our onboarding to build trust through transparency.
              No pressure, no hidden terms — just a clear path from exploration to execution.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700 -translate-x-4 z-0" />
                  )}

                  <PremiumCard
                    variant="glass-secondary"
                    accent={index === 0 ? "cyan" : index === 1 ? "purple" : index === 2 ? "emerald" : "orange"}
                    hover={true}
                    className="h-full p-6 relative z-10"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-bold text-white shadow-lg dark:from-slate-100 dark:to-slate-300 dark:text-slate-900">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white drop-shadow-md" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {item.description}
                    </p>

                    {/* Duration Badge */}
                    <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {item.duration}
                    </div>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cyan-200 bg-cyan-50 px-8 py-4 text-sm font-semibold text-cyan-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-400 dark:hover:bg-cyan-900/50"
            >
              Start with Step 1 — Schedule Your Walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* CSS-only gradient background - replaced canvas AnimatedBackground for performance */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,179,255,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,179,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(79,244,207,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--card))/0.7] via-transparent to-[rgb(var(--card))/0.7] dark:from-[rgb(10,10,15)]/70 dark:via-transparent dark:to-[rgb(10,10,15)]/70" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
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

  const accentColor =
    index === 0 ? "cyan" :
      index === 1 ? "emerald" :
        "purple";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <PremiumCard
        variant="glass-secondary"
        accent={accentColor}
        hover={true}
        className="h-full p-8"
      >
        <div className="mb-6">
          <div className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110",
            index === 0 && "bg-gradient-to-br from-cyan-500 to-blue-500",
            index === 1 && "bg-gradient-to-br from-emerald-500 to-teal-500",
            index === 2 && "bg-gradient-to-br from-purple-500 to-pink-500"
          )}>
            <Icon className="h-7 w-7 text-white drop-shadow-md" />
          </div>
        </div>

        <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          {step.title}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {step.description}
        </p>

        <div className={clsx(
          "rounded-2xl border p-4 text-xs",
          index === 0 && "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50",
          index === 1 && "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50",
          index === 2 && "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50"
        )}>
          <span className={clsx(
            "mb-2 block font-mono font-semibold uppercase tracking-wider",
            index === 0 && "text-cyan-600 dark:text-cyan-400",
            index === 1 && "text-emerald-600 dark:text-emerald-400",
            index === 2 && "text-purple-600 dark:text-purple-400"
          )}>
            Stage {index + 1}
          </span>
          <p className={clsx(
            index === 0 && "text-cyan-800 dark:text-cyan-300",
            index === 1 && "text-emerald-800 dark:text-emerald-300",
            index === 2 && "text-purple-800 dark:text-purple-300"
          )}>
            Deterministic outputs stored for replay. Signed artefacts attach to every pipeline hop for audit
            and post-trade analysis.
          </p>
        </div>
      </PremiumCard>
    </motion.div>
  );
}

function MetricsSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-8">
              <AccentBadge color="bg-purple-500/10 text-purple-600 dark:text-purple-400">Observable metrics</AccentBadge>

              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
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
  // Get gradient based on icon name
  const iconName = metric.icon.displayName || metric.icon.name || '';
  const gradient = iconName.includes('Cpu') ? 'from-blue-500 to-cyan-500' :
    iconName.includes('Timer') ? 'from-purple-500 to-pink-500' :
    'from-emerald-500 to-teal-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <PremiumCard
        variant="flat-textured"
        accent="purple"
        className="h-full p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <metric.icon className="h-5 w-5 text-white drop-shadow-md" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {metric.label}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-4xl font-bold tabular-nums text-purple-600 dark:text-purple-400">
            <AnimatedNumber value={metric.value} decimals={metric.decimals} duration={1.2} />
            {metric.suffix}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {metric.description}
        </p>
      </PremiumCard>
    </motion.div>
  );
}

function IntegrationsSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)]" />
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
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
        "group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.06)] bg-white/60 dark:bg-[rgba(10,12,16,0.6)] p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-1 hover:ring-blue-400/20",
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgb(var(--card))/0.85] via-transparent to-blue-500/5 dark:from-slate-950/80 dark:via-transparent dark:to-blue-500/15" />

      {/* Decorative 3D icon removed from integration tile per user feedback */}

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
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.1),transparent_70%)]" />
        <div className="section-surface" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Section Header with Social Proof */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            {/* Star Rating Average */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 dark:bg-amber-900/30">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-300">5.0 Average Rating</span>
            </div>
            
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              What Our Early Adopters Are Saying
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Real results from real traders. Verified feedback from professionals who&apos;ve tested our institutional-grade automation.
            </p>
          </div>

          {/* Testimonials Gallery */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {testimonialItems.map((item, index) => (
              <motion.div
                key={index}
                data-testid="testimonial-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.04)] bg-white/60 dark:bg-[rgba(12,14,18,0.6)] p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-1 hover:ring-teal-300/20"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-5 rounded-full blur-3xl dark:opacity-25"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent dark:from-blue-500/15 dark:to-cyan-500/15" />
                
                {/* Star Rating */}
                <div className="relative flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="relative text-base font-medium leading-relaxed text-slate-900 dark:text-slate-50 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                
                {/* Author Info */}
                <div className="relative flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold">
                    {item.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.author}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{item.company}</p>
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-teal-300/20 to-transparent transition-all duration-1000 group-hover:left-full dark:via-teal-400/30" />
              </motion.div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <ShieldCheck className="h-4 w-4 text-white drop-shadow-sm" />
              </span>
              <span>Independent security review underway; industry-standard controls</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <ShieldCheck className="h-4 w-4 text-white drop-shadow-sm" />
              </span>
              <span>256-bit AES Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <ShieldCheck className="h-4 w-4 text-white drop-shadow-sm" />
              </span>
              <span>OWASP Top 10 Verified</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-blue-800/60 bg-white/60 dark:bg-[rgba(10,12,16,0.6)] shadow-2xl dark:via-blue-950/30 dark:to-cyan-950/20">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.25),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_70%)]" />
          </div>

          {/* Mouse gradient cursor effect removed for performance */}

          {/* Content */}
          <div className="relative z-10 grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="space-y-6 text-foreground">
              <h3 className="text-3xl font-bold md:text-4xl">
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
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200/70 bg-card p-6 shadow-lg backdrop-blur-md dark:border-blue-800/70 dark:bg-slate-900/95 dark:via-blue-950/40 dark:to-slate-800/60">
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
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                      className="dark:text-slate-700"
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
                        stroke="#10b981"
                        strokeWidth="1"
                        className={candle.rising ? "text-emerald-500" : "text-red-500"}
                      />
                      {/* Body */}
                      <rect
                        x={candle.x - 6}
                        y={Math.min(candle.open, candle.close)}
                        width="12"
                        height={Math.abs(candle.close - candle.open) || 2}
                        fill={candle.rising ? "#10b981" : "#ef4444"}
                      />
                    </g>
                  ))}

                  {/* Moving average line */}
                  <polyline
                    points="20,55 60,60 100,70 140,80 180,75 220,85 260,95 300,85 340,75 380,65"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="dark:text-blue-400"
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
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.15),transparent_60%)]" />
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
                <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
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
                    className="modern-card-emerald"
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
  const { cursorEnabled } = useMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.15),transparent_60%)]" />
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
          <div className="relative overflow-hidden modern-card p-12 shadow-2xl md:p-16 lg:p-20">
            {/* Gradient overlay for visual effect */}
            <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.2),transparent_70%)]" />

            <div className="relative z-10 space-y-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl"
              >
                <ArrowRight className="h-10 w-10 text-white drop-shadow-md" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                The Market Doesn&apos;t Wait. Neither Should You.
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                Every day you wait, algorithms are capturing opportunities you&apos;ll never see. 
                Schedule a private walkthrough with our engineering team — no sales pitch, just answers.
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
                  🚀 Schedule Private Walkthrough
                </PrimaryCta>
                <SecondaryCta href="/status">See Live Performance</SecondaryCta>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                🔒 No commitment required | Full documentation provided | Complete transparency
              </motion.p>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Subtle Disclaimer Footer */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 py-6">
        <Container>
          <p className="text-xs text-center text-slate-500 dark:text-slate-600 leading-relaxed max-w-4xl mx-auto">
            *Trading involves substantial risk of loss. Past performance does not guarantee future results. Performance metrics based on comprehensive backtesting with realistic transaction costs (0.1-0.5%). Maximum drawdown ranges: 12-24%. Always conduct your own due diligence.
          </p>
        </Container>
      </div>
    </section>
  );
}