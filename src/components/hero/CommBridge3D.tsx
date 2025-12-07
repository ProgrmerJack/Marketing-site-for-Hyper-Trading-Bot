"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Communication Bridge 3D - Contact Page
 * Two platform nodes connected by a glowing data bridge
 * Messages travel across, demonstrating secure communication
 */
export function CommBridge3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 25 });

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
      mouseX.set(x * 8);
      mouseY.set(y * 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  // Static fallback
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-60" />
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-60" />
            <div className="absolute inset-x-32 top-1/2 h-2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateY: smoothX,
          rotateX: smoothY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="relative w-[500px] h-[280px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Left node - User */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Platform glow */}
            <motion.div
              className="absolute -inset-8 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(34,211,238,0.4), transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Platform base */}
            <motion.div
              className="relative w-24 h-24 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(6,182,212,0.9))",
                boxShadow: "0 0 40px rgba(34,211,238,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 0 40px rgba(34,211,238,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(34,211,238,0.7), inset 0 0 30px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(34,211,238,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Inner details */}
              <div className="absolute inset-2 border border-white/30 rounded-xl" />
              <div className="absolute inset-4 border border-white/20 rounded-lg" />
              
              {/* User icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/30"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Ripple effect */}
              <motion.div
                className="absolute -inset-4 rounded-3xl border-2 border-cyan-400/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400 whitespace-nowrap"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              YOU
            </motion.div>
          </motion.div>

          {/* Right node - Company */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {/* Platform glow */}
            <motion.div
              className="absolute -inset-8 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4), transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Platform base */}
            <motion.div
              className="relative w-24 h-24 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))",
                boxShadow: "0 0 40px rgba(59,130,246,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 0 40px rgba(59,130,246,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(59,130,246,0.7), inset 0 0 30px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(59,130,246,0.5), inset 0 0 20px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="absolute inset-2 border border-white/30 rounded-xl" />
              <div className="absolute inset-4 border border-white/20 rounded-lg" />
              
              {/* Company icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 rounded bg-white/30"
                  animate={{
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Ripple effect */}
              <motion.div
                className="absolute -inset-4 rounded-3xl border-2 border-blue-400/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-400 whitespace-nowrap"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              HYPERTRADER
            </motion.div>
          </motion.div>

          {/* Communication bridge */}
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Main bridge path */}
            <motion.path
              d="M 120 140 Q 250 80 380 140"
              fill="none"
              stroke="url(#bridgeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Animated glow path */}
            <motion.path
              d="M 120 140 Q 250 80 380 140"
              fill="none"
              stroke="url(#bridgeGlowGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Secondary support bridges */}
            <motion.path
              d="M 120 140 Q 250 200 380 140"
              fill="none"
              stroke="rgba(79,244,207,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(34,211,238)" />
                <stop offset="50%" stopColor="rgb(79,244,207)" />
                <stop offset="100%" stopColor="rgb(59,130,246)" />
              </linearGradient>
              <linearGradient id="bridgeGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
                <stop offset="50%" stopColor="rgba(79,244,207,0.8)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.6)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Traveling message packets */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`message-${i}`}
              className="absolute w-4 h-4 rounded-lg"
              style={{
                background: i % 2 === 0 
                  ? "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(79,244,207,0.9))"
                  : "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(79,244,207,0.9))",
                boxShadow: i % 2 === 0 
                  ? "0 0 15px rgba(34,211,238,0.8)" 
                  : "0 0 15px rgba(59,130,246,0.8)",
                left: "120px",
                top: "132px",
              }}
              animate={{
                x: i % 2 === 0 ? [0, 260, 260] : [260, 0, 0],
                y: i % 2 === 0 ? [0, -60, -60] : [-60, 0, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Encryption particles around messages */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`encrypt-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/80"
              style={{
                left: "250px",
                top: "100px",
              }}
              animate={{
                x: [0, Math.cos(i * 45 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 45 * Math.PI / 180) * 40],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Central secure connection indicator */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70px] w-10 h-10 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(79,244,207,0.9), rgba(34,211,238,0.5))",
              boxShadow: "0 0 30px rgba(79,244,207,0.6)",
              transform: "translateZ(50px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Lock icon representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-3 rounded-sm border-2 border-white/60 mt-1" />
              <div className="absolute top-1 w-2.5 h-2.5 rounded-full border-2 border-white/60 border-b-0" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background ambient particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(34,211,238,0.6)" : "rgba(59,130,246,0.6)",
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CommBridge3D;
