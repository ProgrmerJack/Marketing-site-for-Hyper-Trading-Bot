"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * DNA Helix Hero - 3D Animated Double Helix
 * Represents the company's core values and "DNA"
 */
export function DNAHelixHero() {
  const { shouldReduceMotion } = useMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 10, y: y * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  const strands = 20;
  const height = 400;

  return (
    <div ref={containerRef} className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative w-[200px] h-[400px]"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Central Glow */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />

        {/* Helix Strands */}
        {[...Array(strands)].map((_, i) => {
          const y = (i / strands) * height - height / 2;
          const rotation = (i / strands) * 360 * 2; // 2 full turns

          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-full h-[2px]"
              style={{
                y,
                rotateY: rotation,
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: [rotation, rotation + 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Left Node */}
              <div className="absolute left-0 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              
              {/* Connector */}
              <div className="absolute left-1.5 right-1.5 top-1/2 h-[1px] bg-emerald-500/30 -translate-y-1/2" />
              
              {/* Right Node */}
              <div className="absolute right-0 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
