"use client";

import { useEffect, useRef } from "react";

type AuroraBackgroundProps = {
  colors?: string[];
  speed?: number;
  opacity?: number;
  className?: string;
};

export default function AuroraBackground({
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  speed = 1,
  opacity = 0.6,
  className = "",
}: AuroraBackgroundProps) {
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

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create gradient layers
      const gradients = colors.map((color, index) => {
        const x1 = width * (0.5 + 0.3 * Math.sin(time * 0.001 * speed + index));
        const y1 = height * (0.5 + 0.3 * Math.cos(time * 0.001 * speed + index));
        const x2 = width * (0.5 + 0.3 * Math.sin(time * 0.0015 * speed + index + Math.PI));
        const y2 = height * (0.5 + 0.3 * Math.cos(time * 0.0015 * speed + index + Math.PI));

        const gradient = ctx.createRadialGradient(x1, y1, 0, x2, y2, width * 0.8);
        gradient.addColorStop(0, `${color}80`);
        gradient.addColorStop(0.5, `${color}40`);
        gradient.addColorStop(1, "transparent");

        return { gradient, x1, y1, x2, y2 };
      });

      // Draw gradients with blend modes
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = opacity;

      gradients.forEach(({ gradient }) => {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      time += 16.67; // ~60fps
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
      style={{ filter: "blur(40px)" }}
      aria-hidden="true"
    />
  );
}
