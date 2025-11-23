"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useState } from "react";

/**
 * GlowingOrbs - Floating glowing spheres for universal background
 * Matches the aesthetic of FloatingBot3D with vibrant neon colors
 */
export function GlowingOrbs({ count = 8 }: { count?: number }) {
  const { shouldReduceMotion } = useMotion();
  const [orbs, setOrbs] = useState<Array<{ x: number; y: number; size: number; color: string; duration: number }>>([]);

  useEffect(() => {
    const colors = [
      "rgba(79,244,207,0.6)",   // Cyan
      "rgba(0,179,255,0.6)",    // Blue
      "rgba(168,85,247,0.6)",   // Purple
      "rgba(52,211,153,0.6)",   // Emerald
      "rgba(251,191,36,0.6)",   // Amber
      "rgba(236,72,153,0.6)",   // Pink
    ];

    const newOrbs = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 150 + Math.random() * 250,
      color: colors[i % colors.length],
      duration: 15 + Math.random() * 10,
    }));

    setOrbs(newOrbs);
  }, [count]);

  if (shouldReduceMotion || orbs.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}
