"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface MarketConstellationProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * MarketConstellation - 3D cryptocurrency universe with orbiting coins
 * Each sphere represents a cryptocurrency with size based on market cap
 * Orbiting motion represents market dynamics
 */
export function MarketConstellation({ className = "", size = 500, animated = true }: MarketConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const { shouldReduceMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const angleRef = useRef(0);

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
    // If animation explicitly disabled or user prefers reduced motion, skip the animation loop
    if (!canvas || !isVisible || shouldReduceMotion || !animated) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Crypto spheres (representing different cryptocurrencies)
    const cryptos = [
      { name: "BTC", orbitRadius: 80, angle: 0, speed: 0.01, size: 16, color: "251, 146, 60" }, // Orange
      { name: "ETH", orbitRadius: 120, angle: 1, speed: 0.012, size: 14, color: "99, 102, 241" }, // Indigo
      { name: "SOL", orbitRadius: 100, angle: 2, speed: 0.015, size: 10, color: "168, 85, 247" }, // Purple
      { name: "BNB", orbitRadius: 140, angle: 3, speed: 0.009, size: 12, color: "251, 146, 60" }, // Orange
      { name: "ADA", orbitRadius: 160, angle: 4, speed: 0.008, size: 9, color: "34, 211, 238" }, // Cyan
      { name: "DOT", orbitRadius: 110, angle: 5, speed: 0.013, size: 8, color: "236, 72, 153" }, // Pink
      { name: "AVAX", orbitRadius: 130, angle: 0.5, speed: 0.011, size: 9, color: "239, 68, 68" }, // Red
      { name: "MATIC", orbitRadius: 150, angle: 1.5, speed: 0.01, size: 8, color: "168, 85, 247" }, // Purple
      { name: "LINK", orbitRadius: 90, angle: 2.5, speed: 0.014, size: 8, color: "34, 211, 238" }, // Cyan
      { name: "UNI", orbitRadius: 170, angle: 3.5, speed: 0.007, size: 7, color: "236, 72, 153" }, // Pink
    ];

    const centerX = size / 2;
    const centerY = size / 2;

    function renderFrame(staticAngleOffset = 0) {
      if (!ctx || !canvas) return;

      // Clear fully (for static snapshot) or with fade effect
      ctx.fillStyle = animated ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.0)";
      ctx.fillRect(0, 0, size, size);

      // Draw central sun (represents market center)
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      sunGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      sunGradient.addColorStop(0.3, "rgba(34, 211, 238, 0.8)");
      sunGradient.addColorStop(0.6, "rgba(99, 102, 241, 0.5)");
      sunGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Draw orbit paths
      cryptos.forEach((crypto) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, crypto.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(148, 163, 184, 0.1)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update and draw crypto spheres (single frame; use staticAngleOffset when provided)
      cryptos.forEach((crypto) => {
        const useAngle = crypto.angle + staticAngleOffset;
        // Calculate 3D position
        const x3d = Math.cos(useAngle) * crypto.orbitRadius;
        const z3d = Math.sin(useAngle) * crypto.orbitRadius;

        const rotatedX = x3d * Math.cos(angleRef.current) - z3d * Math.sin(angleRef.current);
        const rotatedZ = x3d * Math.sin(angleRef.current) + z3d * Math.cos(angleRef.current);

        const x = centerX + rotatedX;
        const y = centerY + rotatedZ * 0.5; // Flatten perspective
        // Compute size & opacity
        const depth = (rotatedZ + crypto.orbitRadius) / (crypto.orbitRadius * 2);
        const actualSize = crypto.size * (0.7 + depth * 0.6);
        const opacity = 0.4 + depth * 0.6;

        // Outer glow
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 3);
        outerGlow.addColorStop(0, `rgba(${crypto.color}, ${opacity * 0.3})`);
        outerGlow.addColorStop(1, `rgba(${crypto.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Middle glow
        const middleGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 1.5);
        middleGlow.addColorStop(0, `rgba(${crypto.color}, ${opacity * 0.6})`);
        middleGlow.addColorStop(1, `rgba(${crypto.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = middleGlow;
        ctx.fill();

        // Core sphere
        const coreGradient = ctx.createRadialGradient(
          x - actualSize * 0.3,
          y - actualSize * 0.3,
          0,
          x,
          y,
          actualSize
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        coreGradient.addColorStop(0.3, `rgba(${crypto.color}, ${opacity})`);
        coreGradient.addColorStop(1, `rgba(${crypto.color}, ${opacity * 0.7})`);

        ctx.beginPath();
        ctx.arc(x, y, actualSize, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, size, size);

      angleRef.current += 0.002;

      // Draw central sun (represents market center)
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      sunGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      sunGradient.addColorStop(0.3, "rgba(34, 211, 238, 0.8)");
      sunGradient.addColorStop(0.6, "rgba(99, 102, 241, 0.5)");
      sunGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Draw orbit paths
      cryptos.forEach((crypto) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, crypto.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(148, 163, 184, 0.1)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update and draw crypto spheres
      cryptos.forEach((crypto) => {
        crypto.angle += crypto.speed;

        // Calculate 3D position
        const x3d = Math.cos(crypto.angle) * crypto.orbitRadius;
        const z3d = Math.sin(crypto.angle) * crypto.orbitRadius;

        // Apply rotation for 3D effect
        const rotatedX = x3d * Math.cos(angleRef.current) - z3d * Math.sin(angleRef.current);
        const rotatedZ = x3d * Math.sin(angleRef.current) + z3d * Math.cos(angleRef.current);

        const x = centerX + rotatedX;
        const y = centerY + rotatedZ * 0.5; // Flatten perspective

        // Depth-based sizing and opacity
        const depth = (rotatedZ + crypto.orbitRadius) / (crypto.orbitRadius * 2);
        const actualSize = crypto.size * (0.7 + depth * 0.6);
        const opacity = 0.4 + depth * 0.6;

        // Draw crypto sphere with multiple layers
        // Outer glow
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 3);
        outerGlow.addColorStop(0, `rgba(${crypto.color}, ${opacity * 0.3})`);
        outerGlow.addColorStop(1, `rgba(${crypto.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Middle glow
        const middleGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 1.5);
        middleGlow.addColorStop(0, `rgba(${crypto.color}, ${opacity * 0.6})`);
        middleGlow.addColorStop(1, `rgba(${crypto.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = middleGlow;
        ctx.fill();

        // Core sphere
        const coreGradient = ctx.createRadialGradient(
          x - actualSize * 0.3,
          y - actualSize * 0.3,
          0,
          x,
          y,
          actualSize
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        coreGradient.addColorStop(0.3, `rgba(${crypto.color}, ${opacity})`);
        coreGradient.addColorStop(1, `rgba(${crypto.color}, ${opacity * 0.7})`);

        ctx.beginPath();
        ctx.arc(x, y, actualSize, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // Draw crypto label (only for larger, closer spheres)
        if (depth > 0.5 && actualSize > 8) {
          ctx.font = `bold ${Math.floor(actualSize * 0.8)}px sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(crypto.name, x, y);
        }

        // Draw connection lines to center (occasional pulse)
        if (Math.sin(crypto.angle * 3) > 0.8) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(${crypto.color}, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    // If animation is disabled, draw a single static frame
    if (!animated) {
      renderFrame(0.7);
    } else {
      animate();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [size, isVisible, shouldReduceMotion, animated]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="mb-2 text-4xl">🌌</div>
          <p className="text-sm text-muted-foreground">Market Constellation</p>
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
