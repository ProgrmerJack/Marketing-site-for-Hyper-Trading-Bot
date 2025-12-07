"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Floating 3D Bot visualization for the hero section
 * PERFORMANCE OPTIMIZED: Reduced from 30+ animation loops to 3 primary animations
 */
export function FloatingBot3D() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 10, y: y * 10 }); // Reduced intensity
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Static fallback for reduced motion
  if (shouldReduceMotion) {
    return (
      <div className="relative h-[400px] w-full flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-20 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400px] w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative w-64 h-64"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic glow - CSS only, no animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-25 blur-3xl" />

        {/* Central core */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main bot body - single box-shadow animation */}
          <motion.div
            className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(79,244,207,0.4)",
                "0 0 50px rgba(0,179,255,0.6)",
                "0 0 30px rgba(79,244,207,0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner hologram lines - static CSS */}
            <div className="absolute inset-2 border-2 border-white/30 rounded-xl" />
            <div className="absolute inset-4 border border-white/20 rounded-lg" />
            
            {/* Single animated scanner line */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{
                top: ["10%", "90%", "10%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Background ring - CSS animation instead of JS */}
          <div
            className="absolute w-48 h-48 rounded-full border-2 border-[rgb(0,179,255)]/25 animate-[spin_25s_linear_infinite]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-20px)",
            }}
          />
        </div>
      </motion.div>

      {/* Static scan lines - CSS only with opacity animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/40 to-transparent animate-pulse"
            style={{
              top: `${(i / 5) * 100 + 10}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
