"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Floating 3D Bot visualization for the hero section
 * PERFORMANCE OPTIMIZED: Uses CSS animations where possible, limits motion.div count
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
      setMousePosition({ x: x * 10, y: y * 10 });
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
      {/* Main floating container */}
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
        {/* Holographic glow - animated */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] blur-3xl"
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Central core */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main bot body */}
          <motion.div
            className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(79,244,207,0.4)",
                "0 0 60px rgba(0,179,255,0.6)",
                "0 0 30px rgba(79,244,207,0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner hologram lines */}
            <div className="absolute inset-2 border-2 border-white/30 rounded-xl" />
            <div className="absolute inset-4 border border-white/20 rounded-lg" />
            
            {/* Animated scanner line */}
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

          {/* Orbiting ring - CSS animation for better performance */}
          <div
            className="absolute w-48 h-48 rounded-full border-2 border-[rgb(0,179,255)]/30 animate-[spin_20s_linear_infinite]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-20px)",
            }}
          />
          
          {/* Second orbiting ring - opposite direction */}
          <div
            className="absolute w-52 h-52 rounded-full border border-[rgb(79,244,207)]/20 animate-[spin_25s_linear_infinite_reverse]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-30px) rotateX(60deg)",
            }}
          />
        </div>

        {/* Orbiting particles - limited to 3 for performance */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[rgb(79,244,207)]"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
            animate={{
              x: [
                Math.cos((i * 2 * Math.PI) / 3) * 80,
                Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 80,
                Math.cos((i * 2 * Math.PI) / 3) * 80,
              ],
              y: [
                Math.sin((i * 2 * Math.PI) / 3) * 80,
                Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 80,
                Math.sin((i * 2 * Math.PI) / 3) * 80,
              ],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Floating data points - CSS animations */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`data-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-[rgb(52,211,153)] animate-bounce"
            style={{
              left: `${25 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDuration: `${2 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Scan lines - CSS only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/50 to-transparent animate-pulse"
            style={{
              top: `${(i / 8) * 100 + 6}%`,
              animationDuration: "2s",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
