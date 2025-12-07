"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Floating 3D Bot visualization for the hero section
 * Restored with full animations - uses CSS where possible for performance
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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Clamp the rotation to prevent flattening at edges
      const x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2))) * 15;
      const y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2))) * 15;
      setMousePosition({ x, y });
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
          y: [0, -20, 0],
          rotateZ: [0, 2, 0, -2, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,244,207,0.2), transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
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
                "0 0 40px rgba(79,244,207,0.5), 0 0 80px rgba(0,179,255,0.3)",
                "0 0 60px rgba(0,179,255,0.6), 0 0 100px rgba(79,244,207,0.4)",
                "0 0 40px rgba(79,244,207,0.5), 0 0 80px rgba(0,179,255,0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner hologram lines */}
            <div className="absolute inset-2 border-2 border-white/40 rounded-xl" />
            <div className="absolute inset-4 border border-white/25 rounded-lg" />
            
            {/* Animated scanner line */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={{
                top: ["10%", "85%", "10%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Core glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>

          {/* Orbiting ring - primary */}
          <motion.div
            className="absolute w-48 h-48 rounded-full border-2 border-[rgb(0,179,255)]/40"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-20px)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          
          {/* Orbiting ring - secondary */}
          <motion.div
            className="absolute w-56 h-56 rounded-full border border-[rgb(79,244,207)]/25"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-30px) rotateX(60deg)",
            }}
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-6px",
              marginTop: "-6px",
              background: i === 0 ? "rgb(79,244,207)" : i === 1 ? "rgb(0,179,255)" : "rgb(168,85,247)",
              boxShadow: `0 0 10px ${i === 0 ? "rgba(79,244,207,0.8)" : i === 1 ? "rgba(0,179,255,0.8)" : "rgba(168,85,247,0.8)"}`,
            }}
            animate={{
              x: [
                Math.cos((i * 2 * Math.PI) / 3) * 90,
                Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 90,
                Math.cos((i * 2 * Math.PI) / 3) * 90,
              ],
              y: [
                Math.sin((i * 2 * Math.PI) / 3) * 90,
                Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 90,
                Math.sin((i * 2 * Math.PI) / 3) * 90,
              ],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Floating data points */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[rgb(52,211,153)]"
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${25 + Math.floor(i / 3) * 50}%`,
              boxShadow: "0 0 8px rgba(52,211,153,0.6)",
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/60 to-transparent"
            style={{
              top: `${(i / 12) * 100 + 4}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
