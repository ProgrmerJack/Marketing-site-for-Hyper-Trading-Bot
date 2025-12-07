"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

// PERFORMANCE OPTIMIZED: Single lightweight canvas for hyperspeed effect
// Reduced particle count and simplified rendering loop

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "live-demo" | "safety" | "status" | "legal" | "default";

interface Unified2DBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: number; // 0.0 - 1.0
  offsetClass?: string;
  // Legacy props - kept for API compatibility
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

// Lightweight particle system - much fewer particles than full hyperspeed
type Particle = { x: number; y: number; speed: number; length: number; opacity: number };

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.001 + Math.random() * 0.003,
    length: 0.02 + Math.random() * 0.04,
    opacity: 0.1 + Math.random() * 0.3,
  }));
}

export function Unified2DBackground({
  variant = "default",
  className = "",
  intensity = 1,
  offsetClass = "",
}: Unified2DBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { shouldReduceMotion, backgroundsEnabled } = useMotion();
  
  const color = baseGradient[variant] ?? baseGradient.default;
  const opacityScale = Math.max(0.5, intensity);
  const isHome = variant === "home";

  // Lightweight hyperspeed canvas for homepage only
  useEffect(() => {
    if (!isHome || shouldReduceMotion || !backgroundsEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles - keep count low for performance (24 vs 64-96 in full version)
    particlesRef.current = createParticles(24);

    const colors = ["rgba(79,244,207,", "rgba(0,179,255,", "rgba(168,85,247,"];
    
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Clear with fade trail effect
      ctx.fillStyle = "rgba(10,10,15,0.15)";
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (const p of particlesRef.current) {
        p.y += p.speed;
        if (p.y > 1 + p.length) {
          p.y = -p.length;
          p.x = Math.random();
        }

        const gradient = ctx.createLinearGradient(
          p.x * w, (p.y - p.length) * h,
          p.x * w, p.y * h
        );
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        gradient.addColorStop(0, `${colorBase}0)`);
        gradient.addColorStop(1, `${colorBase}${p.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x * w, (p.y - p.length) * h);
        ctx.lineTo(p.x * w, p.y * h);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isHome, shouldReduceMotion, backgroundsEnabled]);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-20 ${className} ${offsetClass}`} aria-hidden>
      {/* Hyperspeed canvas - homepage only */}
      {isHome && backgroundsEnabled && !shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ mixBlendMode: "screen" }}
        />
      )}
      
      {/* Primary ambient gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          opacity: 0.25 * opacityScale,
          background: `radial-gradient(ellipse at top, ${color}, transparent 70%)` 
        }} 
      />
      
      {/* Glowing orb effect - CSS animation only */}
      {isHome && (
        <>
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(79,244,207,0.15), transparent 70%)",
              animationDuration: "4s",
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(0,179,255,0.12), transparent 70%)",
              animationDuration: "5s",
              animationDelay: "1s",
            }}
          />
        </>
      )}
      
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
