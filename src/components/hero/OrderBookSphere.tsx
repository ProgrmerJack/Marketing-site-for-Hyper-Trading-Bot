"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface OrderBookSphereProps {
  className?: string;
  size?: number;
}

/**
 * OrderBookSphere - 3D visualization of order book depth
 * Represents buy/sell orders as particles arranged in a sphere
 * Green particles = buy orders, Red particles = sell orders
 * Size of particles = order volume
 */
export function OrderBookSphere({ className = "", size = 400 }: OrderBookSphereProps) {
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
    if (!canvas || !isVisible || shouldReduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Generate order particles (buy and sell orders)
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      type: "buy" | "sell";
      baseSize: number;
    }> = [];

    const particleCount = 80;
    const radius = size * 0.35;

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.cos(theta) * Math.sin(phi) * radius;
      const y = Math.sin(theta) * Math.sin(phi) * radius;
      const z = Math.cos(phi) * radius;

      // Random order type and size
      const type = Math.random() > 0.5 ? "buy" : "sell";
      const baseSize = 2 + Math.random() * 4;

      particles.push({ x, y, z, size: baseSize, type, baseSize });
    }

    const centerX = size / 2;
    const centerY = size / 2;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, size, size);

      angleRef.current += 0.005;

      // Sort particles by z-index for proper depth rendering
      particles.sort((a, b) => {
        const zA = a.z * Math.cos(angleRef.current) - a.x * Math.sin(angleRef.current);
        const zB = b.z * Math.cos(angleRef.current) - b.x * Math.sin(angleRef.current);
        return zA - zB;
      });

      particles.forEach((particle) => {
        // Rotate particle around Y axis
        const rotatedX =
          particle.x * Math.cos(angleRef.current) - particle.z * Math.sin(angleRef.current);
        const rotatedZ =
          particle.x * Math.sin(angleRef.current) + particle.z * Math.cos(angleRef.current);

        // Project 3D to 2D
        const scale = 300 / (300 + rotatedZ);
        const x2d = centerX + rotatedX * scale;
        const y2d = centerY + particle.y * scale;

        // Depth-based size and opacity
        const depth = (rotatedZ + radius) / (radius * 2);
        const particleSize = particle.size * scale;
        const opacity = 0.3 + depth * 0.7;

        // Draw particle with glow
        const color = particle.type === "buy" ? "16, 185, 129" : "239, 68, 68";

        // Outer glow
        ctx.beginPath();
        ctx.arc(x2d, y2d, particleSize * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, particleSize * 2);
        gradient.addColorStop(0, `rgba(${color}, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < radius * 0.4) {
            const rotatedX1 =
              p1.x * Math.cos(angleRef.current) - p1.z * Math.sin(angleRef.current);
            const rotatedZ1 =
              p1.x * Math.sin(angleRef.current) + p1.z * Math.cos(angleRef.current);
            const scale1 = 300 / (300 + rotatedZ1);
            const x1 = centerX + rotatedX1 * scale1;
            const y1 = centerY + p1.y * scale1;

            const rotatedX2 =
              p2.x * Math.cos(angleRef.current) - p2.z * Math.sin(angleRef.current);
            const rotatedZ2 =
              p2.x * Math.sin(angleRef.current) + p2.z * Math.cos(angleRef.current);
            const scale2 = 300 / (300 + rotatedZ2);
            const x2 = centerX + rotatedX2 * scale2;
            const y2 = centerY + p2.y * scale2;

            const opacity = (1 - distance / (radius * 0.4)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
          <div className="mb-2 text-4xl">📊</div>
          <p className="text-sm text-muted-foreground">Order Book Visualization</p>
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
