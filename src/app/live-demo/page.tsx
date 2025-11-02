"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Section } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { DemoTelemetry } from "@/components/demo-telemetry";
import { DemoChart } from "@/components/charts/demo-chart";
import { DemoStreamClient } from "@/components/live-demo-client";
import MarketDataDemo from "@/components/market-data-demo";
import { AdvancedChartsDemo } from "@/components/charts/advanced-charts-demo";
import { useMotion } from "@/components/motion/MotionProvider";
import { FlowingMenu, DotGrid, GlareHover, StarBorder } from "@/components/reactbits/dynamic";

const buildGradient = (from: string, to: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='${from}'/><stop offset='100%' stop-color='${to}'/></linearGradient></defs><rect width='200' height='200' fill='url(%23g)' rx='40' ry='40'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const menuItems = [
  { link: "#advanced-charts", text: "Charts", image: buildGradient("#38bdf8", "#0ea5e9") },
  { link: "#market-data", text: "Market data", image: buildGradient("#6366f1", "#ec4899") },
  { link: "#demo", text: "Signed feed", image: buildGradient("#14b8a6", "#0ea5e9") },
];

export default function LiveDemoPage() {
  const {
    backgroundsEnabled,
    cursorEnabled,
    preferences,
    setMotionPrefs,
    hydrated,
    shouldReduceMotion,
  } = useMotion();
  const { backgrounds: backgroundsPreference, cursor: cursorPreference } = preferences;

  return (
    <div className="space-y-20">
      <PageHeader
        eyebrow="Live demo"
        title="Experience Professional-Grade Trading Technology in Action"
        description="Witness the power of our advanced trading platform with institutional-quality charts, real-time market data, and cutting-edge technical indicators. See why traders choose our platform for superior performance.*"
      />

      <VisualControls
        backgroundsEnabled={backgroundsEnabled}
        backgroundsPreference={backgroundsPreference}
        cursorEnabled={cursorEnabled}
        cursorPreference={cursorPreference}
        setBackgroundsPreference={(value) => setMotionPrefs({ backgrounds: value })}
        setCursorPreference={(value) => setMotionPrefs({ cursor: value })}
        isHydrated={hydrated}
        shouldReduceMotion={shouldReduceMotion}
      />

      <Section
        id="advanced-charts"
        title="Institutional-Quality Charts & Advanced Technical Analysis"
        description="Professional candlestick charts powered by cutting-edge technology, featuring comprehensive technical indicators including SMA, EMA, RSI, MACD, Bollinger Bands, and lightning-fast real-time updates for optimal trading decisions."
      >
        <AdvancedChartsDemo />
      </Section>

      <Section
        id="market-data"
        title="Ultra-Fast Real-Time Market Data Streaming"
        description="Experience millisecond-accurate market data delivered via advanced Server-Sent Events technology with automatic reconnection and enterprise-grade TypeScript reliability."
      >
        <MarketDataDemo />
      </Section>

      <Section
        id="demo"
        title="Live Trading Dashboard with Professional Analytics"
        description="Multi-pane professional interface featuring real-time latency monitoring and advanced connection state indicators. Experience the future of crypto trading visualization.*"
      >
        <DemoStreamClient />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="group rounded-3xl border border-[color:var(--color-line-muted)] bg-gradient-to-br from-[color:var(--color-surface-800)] to-[color:var(--color-surface-900)] p-8 shadow-soft transition-all duration-500 hover:shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[color:var(--color-surface-500)]">
              <span>BTC/USDT - Demo only</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[color:var(--color-success)]"
              >
                ● Live
              </motion.span>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--color-line-muted)] bg-[color:var(--color-surface-900)] p-3 shadow-inner">
              <DemoChart />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[color:var(--color-surface-500)]">
              * Powered by industry-leading TradingView Lightweight Charts technology (Apache-2.0).
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <DemoTelemetry />
          </motion.div>
        </div>
      </Section>

      {/* Footnotes Section */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-4 text-xs text-muted-foreground">
            <p>
              * All data shown in this demo is for illustrative and demonstration purposes only and does not represent live trading activity. Charts, market data streams, and performance indicators are simulated and should not be used for actual trading decisions. Real-time features may experience delays or interruptions. System performance and capabilities shown are representative of ideal conditions and may vary in production environments. Trading cryptocurrency involves substantial risk of loss and is not suitable for all investors. This demo does not constitute financial, investment, or trading advice. Actual trading performance, execution speeds, and platform features may differ from demonstration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

type VisualControlsProps = {
  backgroundsEnabled: boolean;
  backgroundsPreference: boolean;
  cursorEnabled: boolean;
  cursorPreference: boolean;
  setBackgroundsPreference: (value: boolean) => void;
  setCursorPreference: (value: boolean) => void;
  isHydrated: boolean;
  shouldReduceMotion: boolean;
};

function VisualControls({
  backgroundsEnabled,
  backgroundsPreference,
  cursorEnabled,
  cursorPreference,
  setBackgroundsPreference,
  setCursorPreference,
  isHydrated,
  shouldReduceMotion,
}: VisualControlsProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--color-surface-100)]/60 px-6 py-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.5)] dark:bg-black/40 sm:px-10">
      <div className="absolute inset-0 -z-10 opacity-60">
        <DotGrid baseColor="rgba(59,130,246,0.25)" style={{ backgroundColor: "transparent" }} />
      </div>
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <EffectsToggleGroup
          backgroundsEnabled={backgroundsEnabled}
          backgroundsPreference={backgroundsPreference}
          cursorEnabled={cursorEnabled}
          cursorPreference={cursorPreference}
          setBackgroundsPreference={setBackgroundsPreference}
          setCursorPreference={setCursorPreference}
          isHydrated={isHydrated}
          shouldReduceMotion={shouldReduceMotion}
        />
        <div className="flex justify-center lg:justify-end">
          <FlowingMenu items={menuItems} />
        </div>
      </div>
    </div>
  );
}

type EffectsToggleGroupProps = {
  backgroundsEnabled: boolean;
  backgroundsPreference: boolean;
  cursorEnabled: boolean;
  cursorPreference: boolean;
  setBackgroundsPreference: (value: boolean) => void;
  setCursorPreference: (value: boolean) => void;
  isHydrated: boolean;
  shouldReduceMotion: boolean;
};

function EffectsToggleGroup({
  backgroundsEnabled,
  backgroundsPreference,
  cursorEnabled,
  cursorPreference,
  setBackgroundsPreference,
  setCursorPreference,
  isHydrated,
  shouldReduceMotion,
}: EffectsToggleGroupProps) {
  const disabledReason = shouldReduceMotion ? "System reduced motion active" : null;

  return (
    <div className="space-y-3">
      <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-surface-500)] dark:text-white/50">
        Motion controls
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <ToggleButton
          label="Background effects"
          active={backgroundsEnabled}
          onToggle={() => setBackgroundsPreference(!backgroundsPreference)}
          disabled={!isHydrated || shouldReduceMotion}
        />
        <ToggleButton
          label="Cursor effects"
          active={cursorEnabled}
          onToggle={() => setCursorPreference(!cursorPreference)}
          disabled={!isHydrated || shouldReduceMotion}
        />
      </div>
      {disabledReason ? (
        <p className="text-xs text-[color:var(--color-surface-500)] dark:text-white/50">* {disabledReason} - animations stay minimal.</p>
      ) : null}
    </div>
  );
}

type ToggleButtonProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

function ToggleButton({ label, active, onToggle, disabled = false }: ToggleButtonProps) {
  const button = (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={clsx(
        "relative inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all",
        active
          ? "border-[color:var(--color-accent-primary)] bg-[color:var(--color-accent-primary)]/15 text-[color:var(--color-accent-primary)]"
          : "border-white/20 bg-white/30 text-[color:var(--color-surface-500)] dark:bg-white/10 dark:text-white/60",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <span className="block h-2 w-2 rounded-full bg-current" />
      {label}
    </button>
  );

  if (disabled) {
    return button;
  }

  return (
    <GlareHover className="rounded-full" glareColor="rgba(56,189,248,0.3)">
      <StarBorder as="div" color="var(--color-accent-primary)" className="inline-flex rounded-full p-[1px]" speed="2.2s">
        {button}
      </StarBorder>
    </GlareHover>
  );
}
