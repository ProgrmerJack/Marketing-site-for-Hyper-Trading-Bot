"use client";

import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import type { MotionIntensity } from "@/components/motion/MotionProvider";

type HyperspeedBackgroundProps = {
  paused?: boolean;
  intensity: MotionIntensity;
  colorPalette: string[];
  className?: string;
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

    const context = canvas.getContext("2d");
    if (!context) return;

    let stageWidth = 0;
    let stageHeight = 0;
    let dpr = 1;
    let lastTime = performance.now();

    const setSize = () => {
      dpr = window.devicePixelRatio || 1;
      stageWidth = canvas.clientWidth;
      stageHeight = canvas.clientHeight;
      canvas.width = stageWidth * dpr;
      canvas.height = stageHeight * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
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
      gradient.addColorStop(0, `${palette.highlight}15`);
      gradient.addColorStop(0.35, `${palette.accent}20`);
      gradient.addColorStop(1, `${palette.primary}ff`);
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
      const delta = clamp((timestamp - lastTime) / 16.7, 0.1, 2);
      lastTime = timestamp;

      context.globalAlpha = 1;
      context.fillStyle = backgroundGradient;
      context.fillRect(0, 0, stageWidth, stageHeight);

      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";

      particlesRef.current.forEach((particle) => {
        if (!pausedRef.current) {
          particle.y += particle.speed * delta * 60;
          if (particle.y - particle.length > stageHeight) {
            Object.assign(particle, createParticle(stageWidth, -stageHeight * 0.2));
          }
        }

        context.strokeStyle = `rgba(56,189,248,${particle.opacity})`;
        context.lineWidth = clamp(particle.opacity * 2.2, 0.4, 1.6);

        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(particle.x, particle.y - particle.length);
        context.stroke();
      });

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
      data-3d-scene
    />
  );
}
