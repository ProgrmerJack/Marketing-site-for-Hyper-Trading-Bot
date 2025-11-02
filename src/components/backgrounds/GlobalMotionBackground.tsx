"use client";

import clsx from "clsx";
import { HeroBackground } from "./HeroBackground";
import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Fixed global motion layer that sits behind all page content.
 * Provides subtle ambient animation in light mode and deeper motion in dark mode.
 */
export function GlobalMotionBackground() {
  const { backgroundsEnabled, hydrated, shouldReduceMotion } = useMotion();
  const animate = backgroundsEnabled && hydrated && !shouldReduceMotion;

  return (
    <div
      aria-hidden
      className="global-motion-background pointer-events-none fixed inset-0 -z-[60] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_80%_5%,rgba(14,165,233,0.08),transparent_60%),linear-gradient(180deg,rgba(248,250,252,0.92),rgba(241,245,249,0.98))] dark:bg-[radial-gradient(circle_at_20%_-5%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_65%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(2,6,23,0.9))]" />
      <HeroBackground
        name="hyperspeed"
        className={clsx(
          "opacity-35 mix-blend-screen transition-opacity duration-700 dark:opacity-80 dark:mix-blend-normal",
          animate ? "opacity-35 dark:opacity-80" : "opacity-10 dark:opacity-30",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.04))] dark:bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.65))]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,rgba(241,245,249,0),rgba(241,245,249,0.95))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.95))]" />
    </div>
  );
}
