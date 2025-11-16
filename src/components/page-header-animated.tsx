"use client";

import { motion } from "framer-motion";
import { AuroraBlob } from "@/components/aurora-blob";
import { SpotlightCard } from "@/components/reactbits/dynamic";
import { Container } from "@hyper/ui";
import { revealUp, fadeIn } from "@/lib/advanced-animations";
// No motion required in header; backgrounds now handled by UnifiedBackground.

interface PageHeaderAnimatedProps {
  eyebrow?: string;
  title: string;
  description?: string;
  kicker?: string;
  children?: React.ReactNode;
  backgroundVariant?: "threads" | "dither" | "beams" | "liquid" | "hyperspeed";
  backgroundColors?: string[];
  backgroundOpacity?: number;
}

export function PageHeaderAnimated({
  eyebrow,
  title,
  description,
  kicker,
  children,
  /* consumed by some pages but intentionally no longer applied here - kept as configuration props */
  backgroundVariant: _backgroundVariant = "hyperspeed",
  backgroundColors: _backgroundColors = ["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"],
  backgroundOpacity: _backgroundOpacity = 0.4,
}: PageHeaderAnimatedProps) {

  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/50 min-h-[90vh] py-20 md:py-32 dark:border-slate-700/50 dark:bg-slate-950">
      {/* No per-header AnimatedBackground when UnifiedBackground is active. We rely on UnifiedBackground for consistent site-wide hyperspeed animation.
          Keep a radial gradient overlay for readability. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,100,255,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.05),transparent_70%)]" />
      </div>

      {/* Decorative animated aurora blob: subtle, site-wide micro-animation that harmonises with UnifiedBackground */}
      <AuroraBlob />

      <Container className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {eyebrow ? (
          <motion.span
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="inline-flex w-fit items-center rounded-full border border-blue-300 bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
          >
            {eyebrow}
          </motion.span>
        ) : null}
        {kicker ? (
          <motion.p
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="text-sm uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400"
          >
            {kicker}
          </motion.p>
        ) : null}
        <motion.h1
          variants={revealUp}
          initial="initial"
          animate="animate"
          className="relative z-20 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 opacity-100 dark:text-white md:text-5xl lg:text-6xl"
          style={{ opacity: 1 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            variants={revealUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
        {/* Right-side children (hero visual elements) will render here on wider screens */}
        <motion.div
          className="mt-6 lg:mt-0 lg:ml-8 lg:flex-none"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.995 }}
        >
          {children ?? (
            <div className="hidden lg:block">
              <SpotlightCard className="w-96 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Get started</div>
                <div className="mb-3 text-lg font-bold">Explore the demo</div>
                <p className="text-xs text-muted-foreground">Request gated access to the signed demo feed and explore the platform.</p>
                <div className="mt-4">
                  <a href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:bg-accent hover:text-white">Contact sales</a>
                </div>
              </SpotlightCard>
            </div>
          )}
        </motion.div>
      </Container>
    </header>
  );
}
