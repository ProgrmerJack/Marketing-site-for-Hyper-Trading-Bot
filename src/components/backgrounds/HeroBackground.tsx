"use client";

import dynamic from "next/dynamic";
import { useMotion } from "@/components/motion/MotionProvider";

const HyperspeedBG = dynamic(() => import("./bg/hyperspeed"), { ssr: false });

type HeroBackgroundProps = {
  name?: "hyperspeed";
  className?: string;
};

export function HeroBackground({ name = "hyperspeed", className }: HeroBackgroundProps) {
  const { backgroundsEnabled, intensity, shouldReduceMotion } = useMotion();

  if (!backgroundsEnabled || shouldReduceMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${className || ""}`}
        aria-hidden="true"
      />
    );
  }

  const colorPalette = ["#0f172a", "#1d4ed8", "#38bdf8"];

  if (name === "hyperspeed") {
    return (
      <HyperspeedBG
        paused={false}
        intensity={intensity}
        colorPalette={colorPalette}
        className={className}
      />
    );
  }

  return null;
}
