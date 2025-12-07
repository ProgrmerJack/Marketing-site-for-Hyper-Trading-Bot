"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Knowledge Library 3D - Blog Page
 * Floating article cards in a cosmic library atmosphere
 */
export function KnowledgeLibrary3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  const articleCards = [
    { title: "TRADING", color: "from-pink-500 to-rose-500", z: 50, x: -100, y: -60, rotate: -8 },
    { title: "STRATEGY", color: "from-orange-500 to-amber-500", z: 35, x: 100, y: -40, rotate: 12 },
    { title: "ANALYSIS", color: "from-purple-500 to-indigo-500", z: 60, x: -80, y: 70, rotate: 5 },
    { title: "MARKET", color: "from-cyan-500 to-blue-500", z: 25, x: 90, y: 50, rotate: -10 },
    { title: "TECH", color: "from-emerald-500 to-teal-500", z: 45, x: 0, y: -80, rotate: 3 },
  ];

  const knowledgeParticles = [
    { symbol: "α", color: "rgba(236,72,153,0.7)" },
    { symbol: "β", color: "rgba(251,146,60,0.7)" },
    { symbol: "Σ", color: "rgba(168,85,247,0.7)" },
    { symbol: "∞", color: "rgba(34,211,238,0.7)" },
    { symbol: "Δ", color: "rgba(52,211,153,0.7)" },
    { symbol: "π", color: "rgba(96,165,250,0.7)" },
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

  // Static fallback
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[400px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10 rounded-3xl blur-3xl" />
            {articleCards.slice(0, 3).map((card, i) => (
              <div
                key={i}
                className={`absolute w-16 h-20 rounded-lg bg-gradient-to-br ${card.color} opacity-50`}
                style={{
                  left: `${35 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  transform: `rotate(${card.rotate}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1200px" }}
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
          className="relative w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Central knowledge orb */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.6), rgba(168,85,247,0.4), transparent)",
              boxShadow: "0 0 60px rgba(236,72,153,0.4), 0 0 100px rgba(168,85,247,0.3)",
              transform: "translateZ(40px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? {
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 60px rgba(236,72,153,0.4), 0 0 100px rgba(168,85,247,0.3)",
                "0 0 80px rgba(236,72,153,0.6), 0 0 120px rgba(168,85,247,0.4)",
                "0 0 60px rgba(236,72,153,0.4), 0 0 100px rgba(168,85,247,0.3)",
              ],
            } : {}}
            transition={{
              scale: { duration: 0.5 },
              boxShadow: { duration: 3, repeat: Infinity },
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Book icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl">
              📚
            </div>
          </motion.div>

          {/* Floating article cards */}
          {articleCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="absolute left-1/2 top-1/2"
              style={{
                x: card.x,
                y: card.y,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: card.y } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
              }}
            >
              {/* Card shadow */}
              <motion.div
                className="absolute -inset-2 rounded-xl opacity-30"
                style={{
                  background: `radial-gradient(ellipse at center, ${card.color.includes("pink") ? "rgba(236,72,153,0.5)" : card.color.includes("orange") ? "rgba(251,146,60,0.5)" : "rgba(168,85,247,0.5)"}, transparent)`,
                  filter: "blur(15px)",
                  transform: "translateZ(-10px)",
                }}
              />

              {/* Card */}
              <motion.div
                className={`relative w-20 h-28 rounded-xl bg-gradient-to-br ${card.color}`}
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.15)",
                  transform: `translateZ(${card.z}px) rotateY(${card.rotate}deg)`,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: [0, -8, 0],
                  rotateY: [card.rotate, card.rotate + 3, card.rotate],
                }}
                transition={{
                  duration: isHighMotion ? 3 : 5,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: "easeInOut",
                }}
              >
                {/* Card content lines */}
                <div className="absolute top-4 left-3 right-3 space-y-1.5">
                  <div className="h-1.5 bg-white/40 rounded-full w-full" />
                  <div className="h-1 bg-white/25 rounded-full w-3/4" />
                  <div className="h-1 bg-white/25 rounded-full w-1/2" />
                </div>

                {/* Card label */}
                <div 
                  className="absolute bottom-3 left-3 text-[8px] font-bold text-white/80 tracking-wider"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  {card.title}
                </div>

                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.1))",
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />

                {/* 3D depth edge */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    transform: "translateZ(2px)",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Connection lines from cards to center */}
          <svg 
            className="absolute inset-0 w-full h-full overflow-visible"
            style={{ transform: "translateZ(20px)" }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236,72,153,0.5)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.2)" />
              </linearGradient>
            </defs>
            {articleCards.map((card, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50%"
                y1="50%"
                x2={`${50 + (card.x / 4.5)}%`}
                y2={`${50 + (card.y / 3.5)}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Knowledge particles orbiting */}
          {knowledgeParticles.map((particle, i) => {
            const radius = 130 + (i % 2) * 30;
            const speed = isHighMotion ? 10 + i * 2 : 15 + i * 3;
            const direction = i % 2 === 0 ? 1 : -1;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ rotate: direction * 360 }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.span
                  className="absolute text-lg font-bold"
                  style={{
                    color: particle.color,
                    textShadow: `0 0 15px ${particle.color}`,
                    left: `${radius}px`,
                    top: 0,
                    transform: `translateZ(${30 + i * 5}px)`,
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {particle.symbol}
                </motion.span>
              </motion.div>
            );
          })}

          {/* Sparkle effects */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                boxShadow: "0 0 6px rgba(255,255,255,0.8)",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Ambient glow rings */}
          {[1, 2].map((ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${150 + ring * 80}px`,
                height: `${150 + ring * 80}px`,
                border: `1px solid rgba(236,72,153,${0.2 - ring * 0.05})`,
                transform: `translateZ(${15 - ring * 5}px)`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: ring * 0.5,
              }}
            />
          ))}

          {/* Status text */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -bottom-10 flex items-center gap-2 text-[10px] font-mono"
            style={{
              color: "rgba(236,72,153,0.7)",
              transform: "translateZ(30px)",
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>✦</span>
            <span>KNOWLEDGE BASE</span>
            <span>✦</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default KnowledgeLibrary3D;
