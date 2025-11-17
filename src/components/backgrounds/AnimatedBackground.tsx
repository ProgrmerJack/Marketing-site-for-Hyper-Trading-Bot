"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { AsyncErrorBoundary } from "@/components/error-boundary";
import "@/styles/animated-backgrounds.css";

const HyperspeedBG = dynamic(() => import("./bg/hyperspeed"), { ssr: false });

type AnimatedBackgroundVariant =
  | "threads"
  | "dither"
  | "beams"
  | "liquid"
  | "balatro"
  | "hyperspeed";

type AnimatedBackgroundProps = {
  variant: AnimatedBackgroundVariant;
  /**
   * Primary colors used by the animation. The component supports up to three stops.
   */
  colors?: string[];
  /**
   * CSS duration used for the primary animation loop (e.g. "24s").
   */
  speed?: string;
  /**
   * Opacity multiplier applied to the animated layers.
   */
  opacity?: number;
  /**
   * Blending mode for the animated layers. Defaults to "screen" for lightening effects.
   */
  blendMode?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
};

const VARIABLE_KEYS = ["--bg-color-1", "--bg-color-2", "--bg-color-3"] as const;

export function AnimatedBackground({
  variant,
  colors = [],
  speed = "28s",
  opacity = 0.9,
  blendMode = "normal",
  className,
  style,
}: AnimatedBackgroundProps) {
  const { intensity, hydrated } = useMotion();

  // For hyperspeed variant, render the canvas-based hyperspeed background
  if (variant === "hyperspeed" && hydrated) {
    const colorPalette = colors.length > 0 
      ? colors 
      : ["rgba(15,23,42,1)", "rgba(29,78,216,1)", "rgba(56,189,248,1)"];
    
    return (
      <AsyncErrorBoundary fallback={<div aria-hidden className={clsx("animated-background", className)} style={{ opacity }}>{/* Placeholder */}</div>}>
        <HyperspeedBG
          paused={false}
          intensity={intensity}
          colorPalette={colorPalette}
          className={className}
          opacity={opacity}
        />
      </AsyncErrorBoundary>
    );
  }

  // For other variants, use CSS-based animations
  const colorVariables = VARIABLE_KEYS.reduce<Record<string, string>>((acc, key, index) => {
    const color = colors[index];
    if (color) {
      acc[key] = color;
    }
    return acc;
  }, {});

  const combinedStyle: CSSProperties = {
    "--bg-speed": speed,
    "--bg-opacity": opacity.toString(),
    "--bg-blend-mode": blendMode,
    ...colorVariables,
    ...style,
  } as CSSProperties;

  return (
    <div
      aria-hidden
      className={clsx("animated-background", `animated-background--${variant}`, className)}
      style={combinedStyle}
    />
  );
}
