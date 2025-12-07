"use client";

// PERFORMANCE: CSS-only background - no canvas, no requestAnimationFrame
// Previously used: AuroraBackground canvas + GlowingOrbs (12 motion elements) + AnimatedBackground canvas
// This caused severe lag with 3 overlapping RAF loops

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "live-demo" | "safety" | "status" | "legal" | "default";

interface Unified2DBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: number; // 0.0 - 1.0
  offsetClass?: string;
  // Legacy props - kept for API compatibility but ignored (CSS-only now)
  animationVariant?: string;
  animationColors?: string[];
}

const baseGradient: Record<BackgroundVariant, string> = {
  home: "rgba(79,244,207,0.12)",
  about: "rgba(16,185,129,0.10)",
  pricing: "rgba(245,158,11,0.10)",
  "how-it-works": "rgba(139,92,246,0.10)",
  contact: "rgba(56,189,248,0.10)",
  blog: "rgba(236,72,153,0.08)",
  research: "rgba(99,102,241,0.10)",
  "live-demo": "rgba(34,211,238,0.10)",
  safety: "rgba(239,68,68,0.10)",
  status: "rgba(34,197,94,0.10)",
  default: "rgba(148,163,184,0.10)",
  legal: "rgba(148,163,184,0.10)",
};

export function Unified2DBackground({
  variant = "default",
  className = "",
  intensity = 1,
  offsetClass = "",
}: Unified2DBackgroundProps) {
  const color = baseGradient[variant] ?? baseGradient.default;
  const opacityScale = Math.max(0.5, intensity);

  // Pure CSS gradients - no JavaScript animation overhead
  return (
    <div className={`pointer-events-none absolute inset-0 -z-20 ${className} ${offsetClass}`} aria-hidden>
      {/* Primary ambient gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          opacity: 0.25 * opacityScale,
          background: `radial-gradient(ellipse at top, ${color}, transparent 70%)` 
        }} 
      />
      {/* Secondary accent gradient for depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,179,255,0.08),transparent_60%)]" 
        style={{ opacity: 0.2 * opacityScale }}
      />
      {/* Vignette overlay for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50 dark:from-transparent dark:via-slate-950/30 dark:to-[rgb(10,10,15)]/60" />
    </div>
  );
}

export default Unified2DBackground;
