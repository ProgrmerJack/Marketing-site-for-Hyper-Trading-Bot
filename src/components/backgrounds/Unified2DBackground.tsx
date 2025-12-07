"use client";

import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import AuroraBackground from "@/components/backgrounds/bg/aurora";
import { GlowingOrbs } from "@/components/backgrounds/GlowingOrbs";
import { useMotion } from "@/components/motion/MotionProvider";

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "live-demo" | "safety" | "status" | "legal" | "default";

interface Unified2DBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: number; // 0.0 - 1.0
  offsetClass?: string;
  animationVariant?: "threads" | "dither" | "beams" | "liquid" | "hyperspeed";
  animationColors?: string[];
  /**
   * When true, uses only CSS gradients with no canvas/motion animations.
   * Use this for performance-critical pages or when multiple backgrounds are stacked.
   * @default false
   */
  lightweight?: boolean;
}

export function Unified2DBackground({
  variant = "default",
  className = "",
  intensity = 1,
  offsetClass = "",
  animationVariant = "hyperspeed",
  animationColors = ["rgba(10,10,15,1)", "rgba(79,244,207,1)", "rgba(0,179,255,1)"],
  lightweight = false
}: Unified2DBackgroundProps) {
  const { backgroundsEnabled, hydrated } = useMotion();

  // Static fallback for non-hydrated state OR when lightweight mode is requested
  if (!backgroundsEnabled || !hydrated || lightweight) {
    return (
      <div className={`pointer-events-none absolute inset-0 -z-20 ${className} ${offsetClass}`} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/80 dark:from-transparent dark:via-slate-950/50 dark:to-[rgb(10,10,15)]" />
      </div>
    );
  }

  const baseGradient = {
    home: "rgba(59,130,246,0.18)",
    about: "rgba(16,185,129,0.12)",
    pricing: "rgba(245,158,11,0.12)",
    "how-it-works": "rgba(139,92,246,0.12)",
    contact: "rgba(56,189,248,0.12)",
    blog: "rgba(236,72,153,0.1)",
    research: "rgba(99,102,241,0.12)",
    "live-demo": "rgba(34,211,238,0.12)",
    safety: "rgba(239,68,68,0.12)",
    status: "rgba(34,197,94,0.12)",
    default: "rgba(148,163,184,0.12)",
    legal: "rgba(148,163,184,0.12)",
  } as Record<BackgroundVariant, string>;

  const color = baseGradient[variant] ?? baseGradient.default;

  // PERFORMANCE OPTIMIZATION: 
  // Only use ONE animated layer instead of stacking 3 animation systems.
  // Previously this component ran: Aurora canvas + GlowingOrbs (6-12 motion elements) + Hyperspeed canvas
  // This caused severe lag on the homepage due to 3 overlapping requestAnimationFrame loops.
  
  return (
    <div className={`pointer-events-none absolute inset-0 ${className} ${offsetClass} -z-20`} aria-hidden>
      {/* Static ambient gradient - no animation overhead */}
      <div className="absolute inset-0" style={{ opacity: 0.28 * Math.max(0.5, intensity) }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${color}, transparent 60%)` }} />
      </div>

      {/* Single animated layer - Aurora canvas only (most visually impactful, least CPU-intensive) */}
      <div className="absolute inset-0 -z-10">
        <AuroraBackground
          colors={["#4FF4CF", "#00B3FF", "#A855F7"]}
          speed={intensity === 1 ? 0.8 : intensity === 0.8 ? 0.6 : 0.4} // Slowed down for smoother performance
          opacity={intensity === 1 ? 0.25 : 0.15} // Reduced opacity
          className="aurora-bg"
        />
      </div>

      {/* REMOVED: GlowingOrbs - was creating 6-12 separate Framer Motion animations with blur(60px) filter */}
      {/* REMOVED: AnimatedBackground/Hyperspeed - was running a second canvas requestAnimationFrame loop */}
      
      {/* Static gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/20 dark:to-slate-950/40" />
    </div>
  );
}

export default Unified2DBackground;
