"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Network Node Hero - 3D Animated Network Node
 * Represents the signal engine and data processing
 */
export function NetworkNodeHero() {
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

  return (
    <div ref={containerRef} className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative w-64 h-64"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Central Node */}
        <motion.div
          className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_60px_rgba(99,102,241,0.6)] z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        />

        {/* Satellite Nodes */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              style={{
                x,
                y,
                transformStyle: "preserve-3d",
              }}
              animate={{
                z: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              {/* Connection Line */}
              <motion.div
                className="absolute top-1/2 left-1/2 h-[2px] bg-indigo-400/30 origin-left"
                style={{
                  width: radius,
                  rotate: angle * (180 / Math.PI) + 180,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(-10px)",
                }}
              />
            </motion.div>
          );
        })}

        {/* Data Packets */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`packet-${i}`}
            className="absolute left-1/2 top-1/2 w-2 h-2 bg-[rgb(var(--card))/0.12] rounded-full shadow-white"
            animate={{
              x: [0, Math.cos((i / 12) * Math.PI * 2) * 120],
              y: [0, Math.sin((i / 12) * Math.PI * 2) * 120],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
