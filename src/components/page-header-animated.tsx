"use client";

import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { revealUp, fadeIn } from "@/lib/advanced-animations";
import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import { useMotion } from "@/components/motion/MotionProvider";

interface PageHeaderAnimatedProps {
  eyebrow?: string;
  title: string;
  description?: string;
  kicker?: string;
  children?: React.ReactNode;
  backgroundVariant?: "threads" | "dither" | "beams" | "liquid";
  backgroundColors?: string[];
}

export function PageHeaderAnimated({
  eyebrow,
  title,
  description,
  kicker,
  children,
  backgroundVariant = "threads",
  backgroundColors = ["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.3)", "rgba(16, 185, 129, 0.25)"],
}: PageHeaderAnimatedProps) {
  const { backgroundsEnabled, hydrated } = useMotion();

  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/50 py-24 dark:border-slate-700/50 dark:bg-slate-950">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <AnimatedBackground
            variant={backgroundVariant}
            colors={backgroundColors}
            speed="32s"
            opacity={0.4}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(93,100,255,0.08),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.05),_transparent_70%)]" />
        )}
      </div>

      <Container className="relative z-10 flex flex-col gap-6">
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
        {children}
      </Container>
    </header>
  );
}
