"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface RiskShield3DProps {
  className?: string;
  size?: number;
}

/**
 * RiskShield3D - Rotating shield with protective layers
 * Represents risk management and security features
 * Multiple layers represent different protection mechanisms
 */
export function RiskShield3D({ className = "", size = 400 }: RiskShield3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const { shouldReduceMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const angleRef = useRef(0);
  const pulseRef = useRef(0);

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
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;

    // Shield layers with different radii and colors
    const layers = [
      { radius: 140, color: "34, 211, 238", speed: 0.01, particles: 12 }, // Cyan - outer
      { radius: 110, color: "99, 102, 241", speed: -0.012, particles: 10 }, // Indigo - middle
      { radius: 80, color: "16, 185, 129", speed: 0.015, particles: 8 }, // Emerald - inner
    ];

    function drawShieldLayer(
      ctx: CanvasRenderingContext2D,
      layer: typeof layers[0],
      baseAngle: number,
      pulse: number
    ) {
      const { radius, color, particles } = layer;
      const adjustedRadius = radius + Math.sin(pulse) * 5;

      // Draw shield ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, adjustedRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw shield glow
      ctx.shadowColor = `rgba(${color}, 0.5)`;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw protection nodes around the shield
      for (let i = 0; i < particles; i++) {
        const angle = baseAngle + (i / particles) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * adjustedRadius;
        const y = centerY + Math.sin(angle) * adjustedRadius;

        // Node glow
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        nodeGradient.addColorStop(0, `rgba(${color}, 0.8)`);
        nodeGradient.addColorStop(0.5, `rgba(${color}, 0.4)`);
        nodeGradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fill();

        // Draw connecting lines to center
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(${color}, 0.2)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw connections between adjacent nodes
        if (i < particles - 1) {
          const nextAngle = baseAngle + ((i + 1) / particles) * Math.PI * 2;
          const nextX = centerX + Math.cos(nextAngle) * adjustedRadius;
          const nextY = centerY + Math.sin(nextAngle) * adjustedRadius;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = `rgba(${color}, 0.25)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Close the connection ring
      const firstAngle = baseAngle;
      const lastAngle = baseAngle + ((particles - 1) / particles) * Math.PI * 2;
      const firstX = centerX + Math.cos(firstAngle) * adjustedRadius;
      const firstY = centerY + Math.sin(firstAngle) * adjustedRadius;
      const lastX = centerX + Math.cos(lastAngle) * adjustedRadius;
      const lastY = centerY + Math.sin(lastAngle) * adjustedRadius;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(firstX, firstY);
      ctx.strokeStyle = `rgba(${color}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawCenterCore(ctx: CanvasRenderingContext2D, pulse: number) {
      const coreSize = 35 + Math.sin(pulse) * 3;

      // Outer core glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        coreSize * 2
      );
      outerGlow.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      outerGlow.addColorStop(0.5, "rgba(34, 211, 238, 0.2)");
      outerGlow.addColorStop(1, "rgba(34, 211, 238, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Core shield
      const coreGradient = ctx.createRadialGradient(
        centerX - coreSize * 0.3,
        centerY - coreSize * 0.3,
        0,
        centerX,
        centerY,
        coreSize
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      coreGradient.addColorStop(0.4, "rgba(34, 211, 238, 0.9)");
      coreGradient.addColorStop(1, "rgba(99, 102, 241, 0.7)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Shield icon (simplified check mark)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(centerX - 12, centerY);
      ctx.lineTo(centerX - 4, centerY + 8);
      ctx.lineTo(centerX + 12, centerY - 8);
      ctx.stroke();
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear with fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, size, size);

      angleRef.current += 0.008;
      pulseRef.current += 0.05;

      // Draw layers from outer to inner
      layers.forEach((layer, index) => {
        const layerAngle = angleRef.current * layer.speed;
        drawShieldLayer(ctx, layer, layerAngle, pulseRef.current + index);
      });

      // Draw center core
      drawCenterCore(ctx, pulseRef.current);

      // Draw scanning effect (rotating beam)
      const scanAngle = angleRef.current * 2;
      const scanGradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + Math.cos(scanAngle) * 160,
        centerY + Math.sin(scanAngle) * 160
      );
      scanGradient.addColorStop(0, "rgba(34, 211, 238, 0.3)");
      scanGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.1)");
      scanGradient.addColorStop(1, "rgba(34, 211, 238, 0)");

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, 160, scanAngle - 0.3, scanAngle + 0.3);
      ctx.closePath();
      ctx.fillStyle = scanGradient;
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [size, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="mb-2 text-4xl">🛡️</div>
          <p className="text-sm text-muted-foreground">Risk Protection</p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width: size, height: size }}
    />
  );
}
