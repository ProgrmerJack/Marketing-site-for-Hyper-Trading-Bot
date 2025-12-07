"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Foundation Pillars 3D - About Page
 * Four glowing crystal pillars representing core values:
 * Risk First, Technical Rigor, Aligned Incentives, Radical Transparency
 * Each pillar rises from a geometric platform with data streams connecting them
 */
export function FoundationPillars3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const pillars = [
    { 
      title: "Risk First", 
      color: "from-red-500 to-orange-500",
      glowColor: "rgba(239, 68, 68, 0.6)",
      delay: 0 
    },
    { 
      title: "Technical Rigor", 
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(34, 211, 238, 0.6)",
      delay: 0.15 
    },
    { 
      title: "Aligned Incentives", 
      color: "from-emerald-400 to-teal-500",
      glowColor: "rgba(52, 211, 153, 0.6)",
      delay: 0.3 
    },
    { 
      title: "Transparency", 
      color: "from-purple-400 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.6)",
      delay: 0.45 
    },
  ];

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
      mouseX.set(x * 12);
      mouseY.set(y * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  // Static fallback for reduced motion
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[400px]">
            {/* Static glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-3xl" />
            {/* Static pillars */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-16">
              {pillars.map((pillar, i) => (
                <div 
                  key={i}
                  className={`w-16 h-32 rounded-t-lg bg-gradient-to-t ${pillar.color} opacity-60`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateY: smoothX,
          rotateX: smoothY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Base platform - floating geometric surface */}
        <motion.div
          className="relative w-[500px] h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Platform base with glow */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-4 rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(16,185,129,0.3), rgba(34,211,238,0.3), rgba(168,85,247,0.3))",
              boxShadow: "0 0 60px rgba(16,185,129,0.4), 0 0 120px rgba(34,211,238,0.2)",
              transform: "translateZ(-60px) rotateX(80deg)",
            }}
            animate={{
              boxShadow: [
                "0 0 60px rgba(16,185,129,0.4), 0 0 120px rgba(34,211,238,0.2)",
                "0 0 80px rgba(16,185,129,0.6), 0 0 160px rgba(34,211,238,0.4)",
                "0 0 60px rgba(16,185,129,0.4), 0 0 120px rgba(34,211,238,0.2)",
              ],
            }}
            transition={{
              duration: isHighMotion ? 3 : 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Geometric grid on platform */}
          <div 
            className="absolute inset-x-0 bottom-0 h-32 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(79,244,207,0.3) 1px, transparent 1px),
                linear-gradient(0deg, rgba(79,244,207,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 20px",
              transform: "translateZ(-50px) rotateX(75deg)",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            }}
          />

          {/* Four pillars */}
          <div 
            className="absolute inset-x-0 bottom-8 flex justify-center gap-20"
            style={{ transform: "translateZ(0)" }}
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="relative"
                initial={{ y: 100, opacity: 0, scaleY: 0 }}
                animate={isInView ? { y: 0, opacity: 1, scaleY: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: pillar.delay,
                  ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Pillar outer glow */}
                <motion.div
                  className="absolute -inset-6 rounded-lg"
                  style={{
                    background: `radial-gradient(ellipse at center, ${pillar.glowColor}, transparent 70%)`,
                    filter: "blur(20px)",
                    transform: "translateZ(-20px)",
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: isHighMotion ? 2 : 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                />

                {/* Crystal pillar body */}
                <motion.div
                  className={`relative w-14 h-40 rounded-t-xl bg-gradient-to-t ${pillar.color}`}
                  style={{
                    boxShadow: `0 0 30px ${pillar.glowColor}, inset 0 0 20px rgba(255,255,255,0.2)`,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(30px)",
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 30px ${pillar.glowColor}, inset 0 0 20px rgba(255,255,255,0.2)`,
                      `0 0 50px ${pillar.glowColor}, inset 0 0 30px rgba(255,255,255,0.4)`,
                      `0 0 30px ${pillar.glowColor}, inset 0 0 20px rgba(255,255,255,0.2)`,
                    ],
                  }}
                  transition={{
                    duration: isHighMotion ? 2 : 3,
                    repeat: Infinity,
                    delay: index * 0.25,
                    ease: "easeInOut",
                  }}
                >
                  {/* Inner crystal facets */}
                  <div className="absolute inset-1 border border-white/20 rounded-t-lg" />
                  <div className="absolute inset-2 border border-white/10 rounded-t-md" />
                  
                  {/* Holographic scan line */}
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: isHighMotion ? 2.5 : 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.4,
                    }}
                  />

                  {/* Top crystal cap */}
                  <motion.div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rotate-45 bg-gradient-to-br ${pillar.color}`}
                    style={{
                      boxShadow: `0 0 20px ${pillar.glowColor}`,
                    }}
                    animate={{
                      rotate: [45, 225, 45],
                    }}
                    transition={{
                      duration: isHighMotion ? 8 : 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Rising energy particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`particle-${index}-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: pillar.glowColor,
                      left: `${25 + i * 15}%`,
                      bottom: "0%",
                      boxShadow: `0 0 8px ${pillar.glowColor}`,
                    }}
                    animate={{
                      y: [0, -180, -180],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: isHighMotion ? 2.5 : 4,
                      repeat: Infinity,
                      delay: i * 0.4 + index * 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Connecting data streams between pillars */}
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Golden ratio spiral pattern connecting pillars */}
            {[0, 1, 2].map((i) => {
              const startX = 110 + i * 100;
              const endX = 210 + i * 100;
              return (
                <motion.path
                  key={`stream-${i}`}
                  d={`M ${startX} 180 Q ${(startX + endX) / 2} 100 ${endX} 180`}
                  fill="none"
                  stroke={pillars[i].glowColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? {
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  } : {}}
                  transition={{
                    duration: isHighMotion ? 3 : 5,
                    repeat: Infinity,
                    delay: 1 + i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </svg>

          {/* Central energy core */}
          <motion.div
            className="absolute left-1/2 bottom-24 -translate-x-1/2 w-16 h-16 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(79,244,207,0.8), rgba(16,185,129,0.4), transparent)",
              boxShadow: "0 0 40px rgba(79,244,207,0.6), 0 0 80px rgba(16,185,129,0.4)",
              transform: "translateZ(60px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: isHighMotion ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/60"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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

export default FoundationPillars3D;
