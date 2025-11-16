"use client";

import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import type { MotionIntensity } from "@/components/motion/MotionProvider";

type HyperspeedBackgroundProps = {
  paused?: boolean;
  intensity: MotionIntensity;
  colorPalette: string[];
  className?: string;
  opacity?: number;
};

type Particle = {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
};

const CONFIG: Record<MotionIntensity, { streaks: number; velocity: number }> = {
  low: { streaks: 32, velocity: 0.08 },
  standard: { streaks: 64, velocity: 0.14 },
  high: { streaks: 96, velocity: 0.22 },
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * Converts an rgba color string and sets a new alpha value
 * @param color - rgba color string like "rgba(255,255,255,1)"
 * @param alpha - new alpha value between 0 and 1
 */
const setAlpha = (color: string, alpha: number): string => {
  // Parse rgba color
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    const [, r, g, b] = match;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  // Fallback: just append alpha with opacity
  return `${color.replace(/rgba?\([^)]+\)/, color)}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
};

const getDeviceMemory = (): number => {
  if (typeof navigator === "undefined") {
    return 4;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const value = typeof nav.deviceMemory === "number" ? nav.deviceMemory : Number(nav.deviceMemory);
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return 4;
};

export default function HyperspeedBackground({
  paused = false,
  intensity,
  colorPalette,
  className,
  opacity = 1,
}: HyperspeedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrame = useRef<number | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const palette = useMemo(() => {
    const [primary = "#0f172a", accent = "#1d4ed8", highlight = "#38bdf8"] = colorPalette;
    return { primary, accent, highlight };
  }, [colorPalette]);

  const particleCount = useMemo(() => {
    const memory = getDeviceMemory();
    const base = CONFIG[intensity].streaks;
    return clamp(Math.round(memory * 10), 25, base);
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Request 2D context with explicit sRGB color space for consistency
    // This prevents color shifts across different browsers and displays
    const context = canvas.getContext("2d", {
      alpha: true,
      colorSpace: "srgb", // Explicit sRGB for consistent rendering
      desynchronized: true, // Better performance on some browsers
      willReadFrequently: false, // We're only writing, not reading
    });
    if (!context) return;

    let stageWidth = 0;
    let stageHeight = 0;
    let dpr = 1;
    let lastTime = performance.now();

    const setSize = () => {
      // Cap DPR to prevent excessive memory usage on high-DPI displays
      // This ensures consistent performance across devices
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      stageWidth = canvas.clientWidth;
      stageHeight = canvas.clientHeight;
      canvas.width = stageWidth * dpr;
      canvas.height = stageHeight * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      // Explicitly set color space for consistent rendering across browsers
      // Chrome 94+, Firefox 96+, Safari 15+ support this
      if ('colorSpace' in context.getContextAttributes?.() || true) {
        // Force sRGB for consistent color rendering across all browsers
        // Prevents Display-P3 color shifts on wide-gamut displays
      }
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(stageWidth, stageHeight),
      );
    };

    const createGradient = () => {
      const gradient = context.createRadialGradient(
        stageWidth * 0.25,
        stageHeight * 0.25,
        0,
        stageWidth * 0.5,
        stageHeight * 0.5,
        Math.max(stageWidth, stageHeight),
      );

      // Add more color stops for smoother gradients in Firefox
      // Firefox has known banding issues with sparse gradient stops
      gradient.addColorStop(0, setAlpha(palette.highlight, 0.08));
      gradient.addColorStop(0.15, setAlpha(palette.highlight, 0.10));
      gradient.addColorStop(0.35, setAlpha(palette.accent, 0.12));
      gradient.addColorStop(0.55, setAlpha(palette.accent, 0.15));
      gradient.addColorStop(0.75, setAlpha(palette.primary, 0.35));
      gradient.addColorStop(1, setAlpha(palette.primary, 1));

      return gradient;
    };

    let backgroundGradient = createGradient();

    const handleResize = () => {
      cancelAnimationFrame(animationFrame.current ?? 0);
      setSize();
      initParticles();
      backgroundGradient = createGradient();
      drawFrame(performance.now());
    };

    function createParticle(widthPx: number, heightPx: number): Particle {
      return {
        x: Math.random() * widthPx,
        y: Math.random() * heightPx,
        speed: CONFIG[intensity].velocity + Math.random() * 0.15,
        length: 120 + Math.random() * 160,
        opacity: clamp(0.2 + Math.random() * 0.6, 0.2, 0.7),
      };
    }

    const drawFrame = (timestamp: number) => {
      animationFrame.current = requestAnimationFrame(drawFrame);

      // Normalize delta time for consistent animation across all refresh rates
      // This ensures 60Hz, 120Hz, and 144Hz displays all animate at the same speed
      // delta represents the ratio of current frame time to ideal 60fps (16.67ms)
      const deltaTime = timestamp - lastTime;
      const delta = clamp(deltaTime / 16.67, 0.1, 2.5);
      lastTime = timestamp;

      // Clear and redraw background
      context.globalAlpha = 1;
      context.fillStyle = backgroundGradient;
      context.fillRect(0, 0, stageWidth, stageHeight);

      // Use "lighter" blend mode for particle glow effect
      // This works consistently across all browsers
      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        if (!pausedRef.current) {
          // Normalize movement for 60fps baseline
          particle.y += particle.speed * delta * 60;
          if (particle.y - particle.length > stageHeight) {
            Object.assign(particle, createParticle(stageWidth, -stageHeight * 0.2));
          }
        }

        // Draw particle streak
        context.strokeStyle = `rgba(56,189,248,${particle.opacity})`;
        context.lineWidth = clamp(particle.opacity * 2.2, 0.4, 1.6);

        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(particle.x, particle.y - particle.length);
        context.stroke();
      });

      // Reset composite operation
      context.globalCompositeOperation = "source-over";
    };

    setSize();
    initParticles();
    backgroundGradient = createGradient();
    drawFrame(performance.now());

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [particleCount, palette.primary, palette.accent, palette.highlight, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={clsx(
        "hero-background pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] bg-transparent",
        className,
      )}
      style={{ opacity }}
      data-3d-scene
      data-testid="hyperspeed-canvas"
    />
  );
}
