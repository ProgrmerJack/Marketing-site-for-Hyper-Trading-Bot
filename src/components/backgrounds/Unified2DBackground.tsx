"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

// PERFORMANCE OPTIMIZED: Single canvas for hyperspeed with proper light/dark mode support

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

// Particle system for hyperspeed streaks
type Particle = { x: number; y: number; speed: number; length: number; opacity: number; colorIndex: number };

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random() * 1.5 - 0.25,
    speed: 0.002 + Math.random() * 0.004,
    length: 0.05 + Math.random() * 0.1,
    opacity: 0.15 + Math.random() * 0.35,
    colorIndex: Math.floor(Math.random() * 3),
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
  const isDarkRef = useRef(false);
  const { shouldReduceMotion, backgroundsEnabled } = useMotion();
  
  const color = baseGradient[variant] ?? baseGradient.default;
  const opacityScale = Math.max(0.5, intensity);
  const isHome = variant === "home";

  // Check dark mode
  const checkDarkMode = useCallback(() => {
    if (typeof window !== "undefined") {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    }
  }, []);

  // Hyperspeed canvas animation for homepage
  useEffect(() => {
    if (!isHome || shouldReduceMotion || !backgroundsEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles - moderate count for good visuals + performance
    particlesRef.current = createParticles(40);

    // Colors for light and dark mode
    const darkColors = ["rgba(79,244,207,", "rgba(0,179,255,", "rgba(168,85,247,"];
    const lightColors = ["rgba(6,182,212,", "rgba(59,130,246,", "rgba(139,92,246,"];
    
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const colors = isDarkRef.current ? darkColors : lightColors;
      
      // Clear with fade trail - darker bg for dark mode, lighter for light mode
      ctx.fillStyle = isDarkRef.current ? "rgba(10,10,15,0.12)" : "rgba(248,250,252,0.15)";
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (const p of particlesRef.current) {
        p.y += p.speed;
        if (p.y > 1.1) {
          p.y = -p.length;
          p.x = Math.random();
          p.colorIndex = Math.floor(Math.random() * 3);
        }

        const gradient = ctx.createLinearGradient(
          p.x * w, (p.y - p.length) * h,
          p.x * w, p.y * h
        );
        const colorBase = colors[p.colorIndex];
        const alpha = isDarkRef.current ? p.opacity : p.opacity * 0.7;
        gradient.addColorStop(0, `${colorBase}0)`);
        gradient.addColorStop(0.5, `${colorBase}${alpha * 0.5})`);
        gradient.addColorStop(1, `${colorBase}${alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isDarkRef.current ? 2 : 1.5;
        ctx.lineCap = "round";
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
      observer.disconnect();
    };
  }, [isHome, shouldReduceMotion, backgroundsEnabled, checkDarkMode]);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-20 ${className} ${offsetClass}`} aria-hidden>
      {/* Hyperspeed canvas - homepage only */}
      {isHome && backgroundsEnabled && !shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-50 dark:opacity-60"
          style={{ mixBlendMode: "normal" }}
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
      
      {/* Glowing orbs - 6 orbs with CSS animations */}
      {isHome && (
        <>
          {/* Top left cyan orb */}
          <div 
            className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(79,244,207,0.18), transparent 70%)",
              animationDuration: "4s",
            }}
          />
          {/* Top right blue orb */}
          <div 
            className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(0,179,255,0.15), transparent 70%)",
              animationDuration: "5s",
              animationDelay: "0.5s",
            }}
          />
          {/* Center purple orb */}
          <div 
            className="absolute top-[35%] left-[40%] w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)",
              animationDuration: "6s",
              animationDelay: "1s",
            }}
          />
          {/* Bottom left teal orb */}
          <div 
            className="absolute bottom-[25%] left-[20%] w-64 h-64 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(52,211,153,0.14), transparent 70%)",
              animationDuration: "4.5s",
              animationDelay: "1.5s",
            }}
          />
          {/* Bottom right cyan orb */}
          <div 
            className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(6,182,212,0.16), transparent 70%)",
              animationDuration: "5.5s",
              animationDelay: "2s",
            }}
          />
          {/* Center-bottom blue orb */}
          <div 
            className="absolute bottom-[10%] left-[45%] w-56 h-56 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: "radial-gradient(circle, rgba(59,130,246,0.13), transparent 70%)",
              animationDuration: "4s",
              animationDelay: "2.5s",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 dark:from-transparent dark:via-slate-950/20 dark:to-[rgb(10,10,15)]/50" />
    </div>
  );
}

export default Unified2DBackground;
