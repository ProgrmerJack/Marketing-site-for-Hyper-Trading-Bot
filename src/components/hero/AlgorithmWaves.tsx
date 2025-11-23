"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface AlgorithmWavesProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * AlgorithmWaves - Flowing wave visualization representing AI signal processing
 * Multiple wave layers with different frequencies and colors
 * Represents different algorithm components working in harmony
 */
export function AlgorithmWaves({
  className = "",
  width = 800,
  height = 300,
}: AlgorithmWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const { shouldReduceMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const timeRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || shouldReduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Wave layers configuration
    const waves = [
      {
        amplitude: 30,
        frequency: 0.015,
        speed: 0.02,
        color: "34, 211, 238", // cyan
        opacity: 0.6,
        phase: 0,
      },
      {
        amplitude: 25,
        frequency: 0.02,
        speed: 0.025,
        color: "99, 102, 241", // indigo
        opacity: 0.5,
        phase: Math.PI / 3,
      },
      {
        amplitude: 20,
        frequency: 0.025,
        speed: 0.03,
        color: "168, 85, 247", // purple
        opacity: 0.4,
        phase: Math.PI / 2,
      },
      {
        amplitude: 15,
        frequency: 0.03,
        speed: 0.035,
        color: "16, 185, 129", // emerald
        opacity: 0.3,
        phase: Math.PI,
      },
    ];

    function drawWave(
      ctx: CanvasRenderingContext2D,
      wave: typeof waves[0],
      time: number
    ) {
      ctx.beginPath();
      const centerY = height / 2;

      // Draw the wave path
      for (let x = 0; x <= width; x += 2) {
        const y =
          centerY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Create gradient for the wave
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgba(${wave.color}, 0)`);
      gradient.addColorStop(0.2, `rgba(${wave.color}, ${wave.opacity})`);
      gradient.addColorStop(0.8, `rgba(${wave.color}, ${wave.opacity})`);
      gradient.addColorStop(1, `rgba(${wave.color}, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = `rgba(${wave.color}, ${wave.opacity * 0.8})`;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw particles along the wave
      for (let x = 0; x < width; x += 40) {
        const y =
          centerY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;

        // Particle glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        particleGradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity})`);
        particleGradient.addColorStop(1, `rgba(${wave.color}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${wave.color}, ${wave.opacity + 0.4})`;
        ctx.fill();
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 1;

      // Draw waves from back to front
      waves.forEach((wave) => {
        drawWave(ctx, wave, timeRef.current);
      });

      // Draw center line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [width, height, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="mb-2 text-4xl">🌊</div>
          <p className="text-sm text-muted-foreground">Algorithm Processing</p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width, height }}
    />
  );
}
