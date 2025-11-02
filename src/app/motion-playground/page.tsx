"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Container, Section } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { MotionToggle } from "@/components/motion/MotionToggle";
import { useMotion } from "@/components/motion/MotionProvider";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";
import { AnimatedNumber } from "@/components/animated-number";
import { ArrowRight } from "lucide-react";

export default function MotionPlaygroundPage() {
  return (
    <div className="space-y-20 pb-16">
      <PageHeader
        eyebrow="Motion system"
        title="Preview motion intensity & accessibility states"
        description="Tune animation intensity, cursor effects, and background canvases. Preferences persist per-device and respect system accessibility settings."
      />

      <Section
        id="controls"
        padding="comfortable"
        title="Global motion preferences"
        description="Adjust the MotionProvider settings and see how the experience adapts in real-time."
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <MotionToggle />
          <MotionStatusPanel />
        </Container>
      </Section>

      <Section
        id="preview"
        padding="comfortable"
        title="Live preview"
        description="Backgrounds, cards, and micro-interactions respond automatically to motion intensity and accessibility mode."
      >
        <Container className="grid gap-8 lg:grid-cols-2">
          <BackgroundPreview />
          <InteractionPreview />
        </Container>
      </Section>
    </div>
  );
}

function MotionStatusPanel() {
  const { enabled, intensity, backgroundsEnabled, cursorEnabled, shouldReduceMotion, systemPrefersReduced } =
    useMotion();

  const rows = [
    { label: "Motion enabled", value: enabled ? "Active" : "Paused" },
    { label: "Intensity", value: intensity },
    { label: "Background canvases", value: backgroundsEnabled ? "Enabled" : "Static gradient" },
    { label: "Cursor effects", value: cursorEnabled ? "Magnetic & sparks" : "Disabled" },
    { label: "Prefers reduced motion", value: shouldReduceMotion ? "Honoured" : "Full motion" },
    { label: "System setting", value: systemPrefersReduced ? "Reduce" : "No restriction" },
  ];

  return (
    <div className="rounded-3xl border border-[color:var(--color-line-muted)]/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <h2 className="text-base font-semibold text-[color:var(--color-surface-900)] dark:text-white">
        Current state
      </h2>
      <p className="mt-2 text-sm text-[color:var(--color-surface-600)] dark:text-white/70">
        These values update immediately when you toggle motion controls. Reduced-motion overrides
        take priority over intensity settings.
      </p>
      <dl className="mt-6 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between rounded-2xl border border-[color:var(--color-line-muted)]/40 bg-white/60 px-4 py-3 text-sm dark:bg-white/10"
          >
            <dt className="font-medium text-[color:var(--color-surface-600)] dark:text-white/70">
              {row.label}
            </dt>
            <dd className="font-semibold text-[color:var(--color-surface-900)] dark:text-white">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BackgroundPreview() {
  const { intensity, enabled } = useMotion();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-line-muted)]/60 bg-[#020617]/95 p-6 shadow-[0_32px_90px_-70px_rgba(37,99,235,0.45)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroBackground name="hyperspeed" className="opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/80 to-[#020617]" />
      </div>
      <div className="relative space-y-6 text-white">
        <h3 className="text-lg font-semibold">Background layer</h3>
        <p className="text-sm text-white/70">
          Background canvases pause automatically when motion is disabled or prefers-reduced-motion
          is detected. On touch devices we fall back to static gradients to reduce GPU load.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Enabled", value: enabled ? "Yes" : "No" },
            { label: "Intensity", value: intensity },
            { label: "Frame budget", value: enabled ? "~60fps" : "Static" },
            { label: "GPU mode", value: enabled ? "Canvas 2D" : "CSS gradient" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white/70"
            >
              <div className="font-semibold text-white">{item.value}</div>
              <div className="mt-1 uppercase tracking-[0.2em] text-white/40">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractionPreview() {
  const { enabled, cursorEnabled, intensity } = useMotion();
  const hover = enabled ? { scale: 1.03, y: -2 } : undefined;
  const tap = enabled ? { scale: 0.97 } : undefined;

  return (
    <div className="rounded-3xl border border-[color:var(--color-line-muted)]/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold text-[color:var(--color-surface-900)] dark:text-white">
        Micro-interactions
      </h3>
      <p className="mt-2 text-sm text-[color:var(--color-surface-600)] dark:text-white/70">
        Buttons, cards, and metric counters inherit global motion preferences. Toggle motion to see
        the difference between full intensity and reduced states.
      </p>
      <div className="mt-6 grid gap-4">
        <motion.button
          type="button"
          whileHover={hover}
          whileTap={tap}
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            enabled
              ? "bg-[color:var(--color-accent-primary)] text-white focus-visible:outline-[color:var(--color-accent-primary)]"
              : "bg-[color:var(--color-surface-200)] text-[color:var(--color-surface-600)] focus-visible:outline-[color:var(--color-surface-500)]",
          )}
        >
          {cursorEnabled ? "Cursor effects on" : "Cursor effects off"}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: enabled ? 0.5 : 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="rounded-2xl border border-[color:var(--color-line-muted)]/50 bg-white/70 px-4 py-5 text-sm text-[color:var(--color-surface-700)] shadow-sm dark:bg-white/10 dark:text-white/70"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-surface-500)]">
            Latency target
          </span>
          <div className="mt-2 text-3xl font-semibold text-[color:var(--color-surface-900)] dark:text-white">
            <AnimatedNumber value={142} suffix=" ms" duration={enabled ? 1 : 0} />
          </div>
          <p className="mt-2 text-xs">
            Animated counters respect motion intensity. Reduced motion mode skips tweening for instant
            updates.
          </p>
        </motion.div>
      </div>
      <div className="mt-6 grid gap-3 text-xs text-[color:var(--color-surface-600)] dark:text-white/60">
        <span>
          <strong>Intensity:</strong> {intensity}
        </span>
        <span>
          <strong>Micro interactions:</strong> {enabled ? "Transform & opacity" : "Static"}
        </span>
      </div>
    </div>
  );
}

