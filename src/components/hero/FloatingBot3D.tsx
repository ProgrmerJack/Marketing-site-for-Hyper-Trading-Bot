"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Floating 3D Bot visualization for the hero section
 * Creates a futuristic, holographic trading bot representation
 * with floating animation and interactive parallax effect
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
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

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
          y: [0, -20, 0],
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -3, 0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Central core */}
        <motion.div
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
                "0 0 30px rgba(79,244,207,0.5)",
                "0 0 60px rgba(0,179,255,0.8)",
                "0 0 30px rgba(79,244,207,0.5)",
              ],
            }}
            transition={{
              duration: 2,
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
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Orbiting particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-[rgb(79,244,207)] shadow-lg"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateZ: [angle, angle + 360],
                x: [
                  Math.cos((angle * Math.PI) / 180) * 80,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 80,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 80,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 80,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Background ring */}
          <motion.div
            className="absolute w-48 h-48 rounded-full border-2 border-[rgb(0,179,255)]/30"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(-20px)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>

        {/* Floating data points */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[rgb(52,211,153)]"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/20 to-transparent"
            style={{
              top: `${(i / 20) * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
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
