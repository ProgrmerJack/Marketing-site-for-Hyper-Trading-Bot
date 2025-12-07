"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useMotion } from "@/components/motion/MotionProvider";

interface AuroraBackgroundProps {
  variant?: "default" | "research" | "trading" | "safety" | "contact" | "status" | "blog";
  intensity?: number;
  className?: string;
}

const variantColors = {
  default: {
    primary: "rgba(59, 130, 246, 0.15)",    // blue
    secondary: "rgba(139, 92, 246, 0.12)",   // purple
    tertiary: "rgba(6, 182, 212, 0.10)",     // cyan
  },
  research: {
    primary: "rgba(139, 92, 246, 0.15)",     // purple
    secondary: "rgba(168, 85, 247, 0.12)",   // violet
    tertiary: "rgba(59, 130, 246, 0.10)",    // blue
  },
  trading: {
    primary: "rgba(6, 182, 212, 0.15)",      // cyan
    secondary: "rgba(59, 130, 246, 0.12)",   // blue
    tertiary: "rgba(16, 185, 129, 0.10)",    // emerald
  },
  safety: {
    primary: "rgba(16, 185, 129, 0.15)",     // emerald
    secondary: "rgba(6, 182, 212, 0.12)",    // cyan
    tertiary: "rgba(59, 130, 246, 0.10)",    // blue
  },
  contact: {
    primary: "rgba(59, 130, 246, 0.15)",     // blue
    secondary: "rgba(99, 102, 241, 0.12)",   // indigo
    tertiary: "rgba(6, 182, 212, 0.10)",     // cyan
  },
  status: {
    primary: "rgba(16, 185, 129, 0.15)",     // emerald
    secondary: "rgba(59, 130, 246, 0.12)",   // blue
    tertiary: "rgba(168, 85, 247, 0.08)",    // violet
  },
  blog: {
    primary: "rgba(245, 158, 11, 0.12)",     // amber
    secondary: "rgba(251, 146, 60, 0.10)",   // orange
    tertiary: "rgba(59, 130, 246, 0.08)",    // blue
  },
};

export function AuroraBackground({
  variant = "default",
  intensity = 0.7,
  className,
}: AuroraBackgroundProps) {
  const { hydrated, intensity: motionIntensitySetting } = useMotion();
  const colors = variantColors[variant];

  // Convert motion intensity setting to a numeric multiplier
  const intensityMultiplier = motionIntensitySetting === "low" ? 0.3 : motionIntensitySetting === "standard" ? 0.7 : 1.0;

  // Reduce animation intensity based on user preferences
  const effectiveIntensity = intensity * intensityMultiplier;

  if (!hydrated) {
    return (
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
      style={{ opacity: effectiveIntensity }}
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-100/30 dark:from-slate-950/50 dark:via-transparent dark:to-slate-900/30" />

      {/* Primary aurora wave */}
      <motion.div
        className="absolute -inset-[100%] opacity-70"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: colors.primary }}
        />
      </motion.div>

      {/* Secondary aurora wave */}
      <motion.div
        className="absolute -inset-[100%] opacity-60"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: colors.secondary }}
        />
      </motion.div>

      {/* Tertiary aurora wave */}
      <motion.div
        className="absolute -inset-[100%] opacity-50"
        animate={{
          rotate: [180, 540],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{ backgroundColor: colors.tertiary }}
        />
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20 dark:bg-white/10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Grid overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
