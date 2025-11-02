"use client";

import { useEffect, useRef } from "react";

type PrismBackgroundProps = {
  colors?: string[];
  speed?: number;
  opacity?: number;
  className?: string;
};

export default function PrismBackground({
  colors = ["#3b82f6", "#06b6d4", "#8b5cf6"],
  speed = 1,
  opacity = 0.5,
  className = "",
}: PrismBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw prismatic triangles
      const triangleCount = 12;
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = opacity;

      for (let i = 0; i < triangleCount; i++) {
        const angle = (time * 0.0003 * speed) + (i * Math.PI * 2 / triangleCount);
        const radius = Math.min(width, height) * 0.4;
        const centerX = width / 2 + Math.cos(angle) * radius * 0.3;
        const centerY = height / 2 + Math.sin(angle) * radius * 0.3;

        const size = 100 + Math.sin(time * 0.001 + i) * 50;
        const rotation = time * 0.0005 * speed + i;

        const color = colors[i % colors.length];
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size);
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(0.6, `${color}20`);
        gradient.addColorStop(1, "transparent");

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }

      time += 16.67;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ filter: "blur(30px)" }}
      aria-hidden="true"
    />
  );
}
