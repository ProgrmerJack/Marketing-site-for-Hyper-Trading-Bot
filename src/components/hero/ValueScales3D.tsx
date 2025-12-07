"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Value Scales 3D - Pricing Page
 * A dynamic 3D balance scale representing fair value exchange
 * Coins and value cubes flow between the sides, demonstrating profit-share alignment
 */
export function ValueScales3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (!hasMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMotion]);

  useEffect(() => {
    if (!hasMotion || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x * 10);
      mouseY.set(y * 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  // Static fallback
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-amber-500/10 rounded-full blur-3xl" />
            {/* Static scale representation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-40 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full mx-auto" />
              <div className="w-64 h-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-cyan-400 rounded-full -mt-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateY: smoothX,
          rotateX: smoothY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main scale structure */}
        <motion.div
          className="relative w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Central pillar */}
          <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-8 h-48"
            style={{
              background: "linear-gradient(180deg, rgba(251,191,36,0.9), rgba(217,119,6,0.9))",
              borderRadius: "8px",
              boxShadow: "0 0 30px rgba(251,191,36,0.5), inset 0 0 15px rgba(255,255,255,0.2)",
              transform: "translateZ(20px)",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Pillar decorations */}
            <div className="absolute inset-x-1 top-2 bottom-2 border border-white/20 rounded" />
            
            {/* Measurement markings */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`mark-${i}`}
                className="absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white/40"
                style={{ top: `${20 + i * 15}%` }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Balance beam */}
          <motion.div
            className="absolute left-1/2 top-16 -translate-x-1/2 w-80 h-4 rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(16,185,129,0.8), rgba(251,191,36,0.8), rgba(34,211,238,0.8))",
              boxShadow: "0 0 25px rgba(251,191,36,0.4)",
              transform: "translateZ(40px)",
              transformOrigin: "center center",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleX: 1, 
              opacity: 1,
              rotate: [0, 3, -3, 2, -2, 0],
            } : {}}
            transition={{ 
              scaleX: { duration: 0.5, delay: 0.3 },
              opacity: { duration: 0.5, delay: 0.3 },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            {/* Beam glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              animate={{
                x: [-160, 160, -160],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Left pan - "Your Profit" */}
          <motion.div
            className="absolute left-8 top-20"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
            initial={{ y: -50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Pan strings */}
            <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8">
              <motion.line x1="0" y1="0" x2="48" y2="32" stroke="rgba(16,185,129,0.6)" strokeWidth="2" />
              <motion.line x1="96" y1="0" x2="48" y2="32" stroke="rgba(16,185,129,0.6)" strokeWidth="2" />
            </svg>

            {/* Scale pan */}
            <motion.div
              className="relative w-24 h-6 rounded-xl"
              style={{
                background: "linear-gradient(180deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))",
                boxShadow: "0 0 30px rgba(16,185,129,0.5), inset 0 2px 10px rgba(255,255,255,0.2)",
              }}
              animate={{
                y: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Value cubes on left pan */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`left-cube-${i}`}
                  className="absolute w-5 h-5 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(52,211,153,0.9), rgba(16,185,129,0.9))",
                    boxShadow: "0 0 10px rgba(52,211,153,0.6)",
                    left: `${15 + i * 25}%`,
                    top: "-16px",
                    transform: `translateZ(${10 + i * 5}px)`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                    rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                  }}
                />
              ))}
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-400 whitespace-nowrap"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              YOUR PROFIT
            </motion.div>
          </motion.div>

          {/* Right pan - "Our Share" */}
          <motion.div
            className="absolute right-8 top-20"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
            initial={{ y: -50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Pan strings */}
            <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8">
              <motion.line x1="0" y1="0" x2="48" y2="32" stroke="rgba(34,211,238,0.6)" strokeWidth="2" />
              <motion.line x1="96" y1="0" x2="48" y2="32" stroke="rgba(34,211,238,0.6)" strokeWidth="2" />
            </svg>

            {/* Scale pan */}
            <motion.div
              className="relative w-24 h-6 rounded-xl"
              style={{
                background: "linear-gradient(180deg, rgba(34,211,238,0.9), rgba(6,182,212,0.9))",
                boxShadow: "0 0 30px rgba(34,211,238,0.5), inset 0 2px 10px rgba(255,255,255,0.2)",
              }}
              animate={{
                y: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Smaller cube representing 20% share */}
              <motion.div
                className="absolute w-4 h-4 rounded-sm left-1/2 -translate-x-1/2"
                style={{
                  background: "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(6,182,212,0.9))",
                  boxShadow: "0 0 10px rgba(34,211,238,0.6)",
                  top: "-12px",
                  transform: "translateZ(15px)",
                }}
                animate={{
                  y: [0, -6, 0],
                  rotateY: [0, 360],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity },
                  rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400 whitespace-nowrap"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OUR 20% SHARE
            </motion.div>
          </motion.div>

          {/* Flowing coin particles from right to left */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`coin-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.9), rgba(217,119,6,0.9))",
                boxShadow: "0 0 10px rgba(251,191,36,0.6)",
                right: "80px",
                top: "60px",
              }}
              animate={{
                x: [0, -200, -200],
                y: [0, 30 + Math.sin(i) * 20, 30 + Math.sin(i) * 20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: isHighMotion ? 2.5 : 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Central equilibrium glow */}
          <motion.div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-12 h-12 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.8), transparent)",
              boxShadow: "0 0 40px rgba(251,191,36,0.5)",
              transform: "translateZ(50px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Percentage ring indicators */}
          <motion.div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-32 h-32 -translate-y-1/2 rounded-full border-2 border-amber-400/30"
            style={{ transform: "translateZ(25px)" }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Base pedestal */}
          <motion.div
            className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-32 h-8 rounded-lg"
            style={{
              background: "linear-gradient(180deg, rgba(251,191,36,0.4), rgba(217,119,6,0.6))",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              transform: "translateZ(-10px) rotateX(20deg)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(16,185,129,0.6)" : "rgba(251,191,36,0.6)",
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ValueScales3D;
