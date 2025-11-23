"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface TradingGraph3DProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * TradingGraph3D - 3D performance graph with floating bars
 * Represents trading performance over time with depth perception
 * Green bars = profitable periods, Red bars = loss periods
 */
export function TradingGraph3D({
  className = "",
  width = 600,
  height = 400,
}: TradingGraph3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const { shouldReduceMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const rotationRef = useRef(0);

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

    // Generate performance data (bars)
    const barCount = 24;
    const bars: Array<{
      x: number;
      z: number;
      height: number;
      value: number;
    }> = [];

    for (let i = 0; i < barCount; i++) {
      const x = (i - barCount / 2) * 20;
      const z = 0;
      const value = (Math.sin(i * 0.5) * 0.5 + 0.5 + Math.random() * 0.3) * 80 + 20;
      bars.push({ x, z, height: value, value });
    }

    const centerX = width / 2;
    const centerY = height * 0.6;

    function drawBar(
      ctx: CanvasRenderingContext2D,
      bar: typeof bars[0],
      rotation: number
    ) {
      // Rotate bar position
      const rotatedX = bar.x * Math.cos(rotation) - bar.z * Math.sin(rotation);
      const rotatedZ = bar.x * Math.sin(rotation) + bar.z * Math.cos(rotation);

      // Perspective projection
      const distance = 400;
      const scale = distance / (distance + rotatedZ);
      const x2d = centerX + rotatedX * scale;
      const baseY = centerY;
      const topY = baseY - bar.height * scale;

      // Bar dimensions
      const barWidth = 15 * scale;

      // Determine color based on value
      const isPositive = bar.value > 50;
      const color = isPositive ? "16, 185, 129" : "239, 68, 68"; // emerald or red
      const depth = (rotatedZ + 200) / 400;
      const opacity = 0.4 + depth * 0.6;

      // Draw 3D bar (front face)
      const gradient = ctx.createLinearGradient(x2d, topY, x2d, baseY);
      gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${color}, ${opacity * 0.6})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x2d - barWidth / 2, topY, barWidth, baseY - topY);

      // Draw bar glow
      ctx.shadowColor = `rgba(${color}, ${opacity * 0.6})`;
      ctx.shadowBlur = 15;
      ctx.fillRect(x2d - barWidth / 2, topY, barWidth, baseY - topY);
      ctx.shadowBlur = 0;

      // Draw bar top (3D effect)
      ctx.beginPath();
      ctx.moveTo(x2d - barWidth / 2, topY);
      ctx.lineTo(x2d - barWidth / 2 + 5, topY - 5);
      ctx.lineTo(x2d + barWidth / 2 + 5, topY - 5);
      ctx.lineTo(x2d + barWidth / 2, topY);
      ctx.closePath();

      const topGradient = ctx.createLinearGradient(x2d, topY - 5, x2d, topY);
      topGradient.addColorStop(0, `rgba(${color}, ${opacity * 1.2})`);
      topGradient.addColorStop(1, `rgba(${color}, ${opacity})`);
      ctx.fillStyle = topGradient;
      ctx.fill();

      // Draw bar right side (3D effect)
      ctx.beginPath();
      ctx.moveTo(x2d + barWidth / 2, topY);
      ctx.lineTo(x2d + barWidth / 2 + 5, topY - 5);
      ctx.lineTo(x2d + barWidth / 2 + 5, baseY - 5);
      ctx.lineTo(x2d + barWidth / 2, baseY);
      ctx.closePath();

      const sideGradient = ctx.createLinearGradient(x2d + barWidth / 2, topY, x2d + barWidth / 2 + 5, topY);
      sideGradient.addColorStop(0, `rgba(${color}, ${opacity * 0.8})`);
      sideGradient.addColorStop(1, `rgba(${color}, ${opacity * 0.5})`);
      ctx.fillStyle = sideGradient;
      ctx.fill();
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      rotationRef.current += 0.005;

      // Sort bars by z-depth for proper rendering
      const sortedBars = [...bars].map((bar) => {
        const rotatedZ = bar.x * Math.sin(rotationRef.current) + bar.z * Math.cos(rotationRef.current);
        return { ...bar, renderZ: rotatedZ };
      }).sort((a, b) => a.renderZ - b.renderZ);

      // Draw grid floor
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        const x = i * 40;
        const rotatedX1 = x * Math.cos(rotationRef.current) - (-200) * Math.sin(rotationRef.current);
        const rotatedZ1 = x * Math.sin(rotationRef.current) + (-200) * Math.cos(rotationRef.current);
        const rotatedX2 = x * Math.cos(rotationRef.current) - 200 * Math.sin(rotationRef.current);
        const rotatedZ2 = x * Math.sin(rotationRef.current) + 200 * Math.cos(rotationRef.current);

        const scale1 = 400 / (400 + rotatedZ1);
        const scale2 = 400 / (400 + rotatedZ2);

        ctx.beginPath();
        ctx.moveTo(centerX + rotatedX1 * scale1, centerY + rotatedZ1 * scale1 * 0.3);
        ctx.lineTo(centerX + rotatedX2 * scale2, centerY + rotatedZ2 * scale2 * 0.3);
        ctx.stroke();
      }

      // Draw bars
      sortedBars.forEach((bar) => {
        drawBar(ctx, bar, rotationRef.current);
      });

      // Draw title text
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.textAlign = "left";
      ctx.fillText("Performance Trend", 20, 30);

      // Draw legend
      ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
      ctx.fillRect(width - 120, 20, 15, 15);
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "12px sans-serif";
      ctx.fillText("Profit", width - 100, 32);

      ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
      ctx.fillRect(width - 120, 40, 15, 15);
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.fillText("Loss", width - 100, 52);

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
        className={`flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-red-500/10 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="mb-2 text-4xl">📊</div>
          <p className="text-sm text-muted-foreground">Performance Graph</p>
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
