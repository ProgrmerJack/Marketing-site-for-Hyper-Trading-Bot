"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Home Page - Autonomous Trading Core
 * A floating metallic/glass orb with concentric rings and 3D candlesticks
 * Visual: Dark background with neon edges, data lines orbiting like satellites
 */
export function TradingCore3D() {
  const motionLevel = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  // High motion animations
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 15;
      const y = (e.clientY - rect.top - rect.height / 2) / 15;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (hasMotion) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasMotion, mouseX, mouseY]);

  // Camera zoom based on scroll
  const cameraScale = Math.max(0.7, 1 - scrollY / 1000);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: springY,
          rotateY: springX,
          scale: hasMotion ? cameraScale : 1,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Trading Core Orb */}
        <div className="relative w-64 h-64" style={{ transformStyle: "preserve-3d" }}>
          {/* Outer glow layers */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"
            animate={
              hasMotion
                ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }
                : {}
            }
            transition={{
              duration: isHighMotion ? 3 : 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transform: "translateZ(-50px)" }}
          />

          {/* Core orb with metallic finish */}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
            style={{
              transform: "translateZ(0px)",
              boxShadow:
                "0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.2)",
            }}
            animate={
              hasMotion
                ? {
                    boxShadow: [
                      "0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.2)",
                      "0 0 100px rgba(6, 182, 212, 0.7), inset 0 0 60px rgba(59, 130, 246, 0.4)",
                      "0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.2)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: isHighMotion ? 2 : 4,
              repeat: Infinity,
            }}
          >
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(var(--card))/0.06] via-transparent to-transparent" />
          </motion.div>

          {/* Concentric Rings - Ring 1 (outermost) */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
            style={{ transform: "translateZ(30px)" }}
            animate={
              hasMotion
                ? {
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              rotate: { duration: isHighMotion ? 12 : 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Ring 2 */}
          <motion.div
            className="absolute inset-4 rounded-full border border-blue-400/50"
            style={{ transform: "translateZ(20px)" }}
            animate={
              hasMotion
                ? {
                    rotate: [360, 0],
                    scale: [1.05, 1, 1.05],
                  }
                : {}
            }
            transition={{
              rotate: { duration: isHighMotion ? 10 : 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Ring 3 (innermost) */}
          <motion.div
            className="absolute inset-12 rounded-full border-2 border-purple-400/60"
            style={{ transform: "translateZ(10px)" }}
            animate={
              hasMotion
                ? {
                    rotate: [0, 360],
                    scale: [1, 1.08, 1],
                  }
                : {}
            }
            transition={{
              rotate: { duration: isHighMotion ? 8 : 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* 3D Candlestick elements */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const radius = 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={`candle-${i}`}
                className="absolute w-3 rounded-sm"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: `${x}px`,
                  marginTop: `${y}px`,
                  height: `${20 + Math.random() * 15}px`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(180deg, rgb(34,197,94) 0%, rgb(22,163,74) 100%)"
                      : "linear-gradient(180deg, rgb(239,68,68) 0%, rgb(220,38,38) 100%)",
                  transform: `translateZ(${15 + i * 5}px)`,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.6)"}`,
                }}
                animate={
                  hasMotion
                    ? {
                        scaleY: [1, 1.2, 0.9, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                    : {}
                }
                transition={{
                  duration: isHighMotion ? 2 + i * 0.2 : 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}

          {/* Data satellite lines */}
          {[0, 120, 240].map((angle, i) => {
            const radius = 110;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={`satellite-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  background:
                    i === 0
                      ? "linear-gradient(135deg, rgb(34,211,238), rgb(59,130,246))"
                      : i === 1
                        ? "linear-gradient(135deg, rgb(168,85,247), rgb(147,51,234))"
                        : "linear-gradient(135deg, rgb(251,191,36), rgb(245,158,11))",
                  boxShadow: `0 0 15px ${i === 0 ? "rgba(34,211,238,0.8)" : i === 1 ? "rgba(168,85,247,0.8)" : "rgba(251,191,36,0.8)"}`,
                  transform: `translateZ(40px)`,
                }}
                animate={
                  hasMotion
                    ? {
                        x: [
                          x,
                          Math.cos(((angle + 120) * Math.PI) / 180) * radius,
                          Math.cos(((angle + 240) * Math.PI) / 180) * radius,
                          x,
                        ],
                        y: [
                          y,
                          Math.sin(((angle + 120) * Math.PI) / 180) * radius,
                          Math.sin(((angle + 240) * Math.PI) / 180) * radius,
                          y,
                        ],
                        scale: [1, 1.3, 1],
                      }
                    : {}
                }
                transition={{
                  duration: isHighMotion ? 5 : 8,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
              />
            );
          })}

          {/* Connecting data lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ transform: "translateZ(35px)" }}
          >
            {hasMotion &&
              [0, 120, 240].map((angle, i) => {
                const radius = 110;
                const x1 = 128 + Math.cos((angle * Math.PI) / 180) * radius;
                const y1 = 128 + Math.sin((angle * Math.PI) / 180) * radius;
                const x2 = 128;
                const y2 = 128;

                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={x2}
                    y1={y2}
                    x2={x1}
                    y2={y1}
                    stroke={
                      i === 0
                        ? "rgb(34,211,238)"
                        : i === 1
                          ? "rgb(168,85,247)"
                          : "rgb(251,191,36)"
                    }
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: isHighMotion ? 2 : 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                );
              })}
          </svg>

          {/* Central pulsing core */}
          <motion.div
            className="absolute inset-[45%] rounded-full bg-gradient-to-br from-cyan-300 to-blue-500"
            style={{ transform: "translateZ(50px)" }}
            animate={
              hasMotion
                ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 1, 0.8],
                    boxShadow: [
                      "0 0 20px rgba(34,211,238,1)",
                      "0 0 40px rgba(59,130,246,1)",
                      "0 0 20px rgba(34,211,238,1)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: isHighMotion ? 1.5 : 2.5,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
