"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

// UNIFIED BACKGROUND: Hyperspeed + glowing orbs for all pages

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "live-demo" | "safety" | "status" | "legal" | "default";

interface Unified2DBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: number; // 0.0 - 1.0
  offsetClass?: string;
  // Controls whether to show hyperspeed animation
  showHyperspeed?: boolean;
  // Controls whether to show glowing orbs
  showOrbs?: boolean;
  // Legacy props - kept for API compatibility
  animationVariant?: string;
  animationColors?: string[];
}

// Color palettes for each variant
const variantColors: Record<BackgroundVariant, { primary: string; secondary: string; tertiary: string }> = {
  home: { primary: "79,244,207", secondary: "0,179,255", tertiary: "168,85,247" },
  about: { primary: "16,185,129", secondary: "6,182,212", tertiary: "59,130,246" },
  pricing: { primary: "245,158,11", secondary: "251,146,60", tertiary: "234,88,12" },
  "how-it-works": { primary: "139,92,246", secondary: "168,85,247", tertiary: "59,130,246" },
  contact: { primary: "56,189,248", secondary: "59,130,246", tertiary: "99,102,241" },
  blog: { primary: "236,72,153", secondary: "244,114,182", tertiary: "168,85,247" },
  research: { primary: "99,102,241", secondary: "139,92,246", tertiary: "59,130,246" },
  "live-demo": { primary: "34,211,238", secondary: "6,182,212", tertiary: "59,130,246" },
  safety: { primary: "16,185,129", secondary: "52,211,153", tertiary: "6,182,212" },
  status: { primary: "34,197,94", secondary: "16,185,129", tertiary: "59,130,246" },
  default: { primary: "148,163,184", secondary: "100,116,139", tertiary: "71,85,105" },
  legal: { primary: "148,163,184", secondary: "100,116,139", tertiary: "71,85,105" },
};

// Particle system for hyperspeed streaks
type Particle = { x: number; y: number; speed: number; length: number; opacity: number; colorIndex: number };

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random() * 1.5 - 0.25,
    speed: 0.002 + Math.random() * 0.004,
    length: 0.04 + Math.random() * 0.08,
    opacity: 0.2 + Math.random() * 0.4,
    colorIndex: Math.floor(Math.random() * 3),
  }));
}

export function Unified2DBackground({
  variant = "default",
  className = "",
  intensity = 1,
  offsetClass = "",
  showHyperspeed = true,
  showOrbs = true,
}: Unified2DBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isDarkRef = useRef(false);
  const { shouldReduceMotion, backgroundsEnabled } = useMotion();
  
  const colors = variantColors[variant] ?? variantColors.default;
  const opacityScale = Math.max(0.5, intensity);

  // Check dark mode
  const checkDarkMode = useCallback(() => {
    if (typeof window !== "undefined") {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    }
  }, []);

  // Hyperspeed canvas animation
  useEffect(() => {
    if (!showHyperspeed || shouldReduceMotion || !backgroundsEnabled) return;
    
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

    // Initialize particles
    particlesRef.current = createParticles(35);

    // Colors based on variant
    const darkColors = [`rgba(${colors.primary},`, `rgba(${colors.secondary},`, `rgba(${colors.tertiary},`];
    const lightColors = [`rgba(${colors.primary},`, `rgba(${colors.secondary},`, `rgba(${colors.tertiary},`];
    
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const currentColors = isDarkRef.current ? darkColors : lightColors;
      
      // Clear with fade trail
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
        const colorBase = currentColors[p.colorIndex];
        const alpha = isDarkRef.current ? p.opacity : p.opacity * 0.6;
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
  }, [showHyperspeed, shouldReduceMotion, backgroundsEnabled, checkDarkMode, colors]);

  return (
    <div className={`pointer-events-none fixed inset-0 -z-20 ${className} ${offsetClass}`} aria-hidden>
      {/* Hyperspeed canvas */}
      {showHyperspeed && backgroundsEnabled && !shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            mixBlendMode: "normal",
            opacity: isDarkRef.current ? 0.55 : 0.45,
          }}
        />
      )}
      
      {/* Primary ambient gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          opacity: 0.2 * opacityScale,
          background: `radial-gradient(ellipse at top, rgba(${colors.primary},0.15), transparent 70%)` 
        }} 
      />
      
      {/* Glowing orbs */}
      {showOrbs && (
        <>
          {/* Top left orb */}
          <div 
            className="absolute top-[10%] left-[8%] w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.primary},0.18), transparent 70%)`,
              animationDuration: "4s",
            }}
          />
          {/* Top right orb */}
          <div 
            className="absolute top-[8%] right-[12%] w-64 h-64 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.secondary},0.15), transparent 70%)`,
              animationDuration: "5s",
              animationDelay: "0.5s",
            }}
          />
          {/* Center orb */}
          <div 
            className="absolute top-[35%] left-[38%] w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.tertiary},0.12), transparent 70%)`,
              animationDuration: "6s",
              animationDelay: "1s",
            }}
          />
          {/* Bottom left orb */}
          <div 
            className="absolute bottom-[20%] left-[15%] w-56 h-56 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.secondary},0.14), transparent 70%)`,
              animationDuration: "4.5s",
              animationDelay: "1.5s",
            }}
          />
          {/* Bottom right orb */}
          <div 
            className="absolute bottom-[15%] right-[10%] w-64 h-64 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.primary},0.16), transparent 70%)`,
              animationDuration: "5.5s",
              animationDelay: "2s",
            }}
          />
          {/* Center-bottom orb */}
          <div 
            className="absolute bottom-[8%] left-[45%] w-48 h-48 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, rgba(${colors.tertiary},0.13), transparent 70%)`,
              animationDuration: "4s",
              animationDelay: "2.5s",
            }}
          />
        </>
      )}
      
      {/* Secondary accent gradient for depth */}
      <div 
        className="absolute inset-0" 
        style={{ 
          opacity: 0.15 * opacityScale,
          background: `radial-gradient(ellipse at bottom right, rgba(${colors.secondary},0.1), transparent 60%)`,
        }} 
      />
      
      {/* Vignette overlay for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-white/35 dark:from-transparent dark:via-slate-950/15 dark:to-[rgb(10,10,15)]/45" />
    </div>
  );
}

export default Unified2DBackground;
