"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Enhanced Trading Pipeline - Matches FloatingBot3D quality
 * Vibrant cyan/blue colors, triple-layer glows, holographic scan lines, particles
 */
export function TradingPipeline3D() {
  const motionLevel = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";

  useEffect(() => {
    if (!hasMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = 1 - rect.top / window.innerHeight;

      if (scrollProgress < 0.3) setActiveNode(0);
      else if (scrollProgress < 0.6) setActiveNode(1);
      else setActiveNode(2);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 12, y: y * 12 });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasMotion]);

  const nodes = [
    {
      title: "Signals",
      color: "from-[rgb(79,244,207)] to-[rgb(0,179,255)]",
      glowColor: "rgba(79,244,207,0.8)",
      icon: "📡",
    },
    {
      title: "Risk Rails",
      color: "from-[rgb(16,185,129)] to-[rgb(20,184,166)]",
      glowColor: "rgba(16,185,129,0.8)",
      icon: "🛡️",
    },
    {
      title: "Execution",
      color: "from-[rgb(168,85,247)] to-[rgb(139,92,246)]",
      glowColor: "rgba(168,85,247,0.8)",
      icon: "⚡",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Holographic scan lines background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/30 to-transparent"
            style={{
              top: `${(i / 15) * 100}%`,
            }}
            animate={hasMotion ? {
              opacity: [0.1, 0.4, 0.1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Curved pipeline connection line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M 150 300 Q 400 150, 600 300 T 1050 300"
          fill="none"
          stroke="url(#pipelineGradient)"
          strokeWidth="4"
          strokeDasharray="15,10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={hasMotion ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(79,244,207)" />
            <stop offset="50%" stopColor="rgb(16,185,129)" />
            <stop offset="100%" stopColor="rgb(168,85,247)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Three pipeline nodes */}
      <div 
        className="relative w-full max-w-6xl mx-auto px-8" 
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex justify-between items-center">
          {nodes.map((node, index) => {
            const isActive = activeNode === index;

            return (
              <motion.div
                key={node.title}
                className="relative flex flex-col items-center"
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: mousePosition.x * 0.5,
                  rotateX: -mousePosition.y * 0.5,
                }}
                animate={hasMotion ? {
                  z: isActive ? 120 : 0,
                  scale: isActive ? 1.3 : 1,
                } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {/* Triple-layer holographic glow effect */}
                <motion.div
                  className="absolute w-48 h-48 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${node.glowColor}, transparent 70%)`,
                    filter: "blur(48px)",
                    transform: "translateZ(-30px)",
                  }}
                  animate={hasMotion && isActive ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${node.glowColor}, transparent 60%)`,
                    filter: "blur(32px)",
                    opacity: 0.5,
                    transform: "translateZ(-20px)",
                  }}
                />

                {/* Main node sphere */}
                <motion.div
                  className={`relative w-36 h-36 rounded-full bg-gradient-to-br ${node.color}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(40px)",
                  }}
                  animate={hasMotion && isActive ? {
                    boxShadow: [
                      `0 0 40px ${node.glowColor}, 0 0 80px ${node.glowColor}`,
                      `0 0 60px ${node.glowColor}, 0 0 120px ${node.glowColor}`,
                      `0 0 40px ${node.glowColor}, 0 0 80px ${node.glowColor}`,
                    ],
                    y: [0, -15, 0],
                  } : {
                    boxShadow: `0 0 30px ${node.glowColor}`,
                  }}
                  transition={{
                    duration: isHighMotion ? 2.5 : 4,
                    repeat: Infinity,
                  }}
                >
                  {/* Inner hologram borders */}
                  <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
                  <div className="absolute inset-4 border border-white/20 rounded-full" />

                  {/* Animated scanner line */}
                  {isActive && hasMotion && (
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
                  )}

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-lg">
                    {node.icon}
                  </div>

                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-3 rounded-full border-2 border-white/40"
                    animate={hasMotion && isActive ? {
                      rotate: [0, 360],
                    } : {}}
                    transition={{
                      duration: isHighMotion ? 4 : 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Orbiting particles */}
                {isActive && hasMotion && [...Array(3)].map((_, i) => {
                  const angle = (i * 360) / 3;
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: node.glowColor,
                        boxShadow: `0 0 10px ${node.glowColor}`,
                      }}
                      animate={{
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
                        duration: isHighMotion ? 3 : 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.4,
                      }}
                    />
                  );
                })}

                {/* Node label */}
                <motion.div
                  className="mt-8 text-xl font-bold text-white"
                  style={{
                    textShadow: isActive ? `0 0 20px ${node.glowColor}` : "none",
                  }}
                  animate={hasMotion ? {
                    opacity: isActive ? 1 : 0.6,
                  } : {}}
                >
                  {node.title}
                </motion.div>

                {/* Data flow indicators below */}
                {isActive && hasMotion && (
                  <motion.div
                    className="absolute -bottom-12 flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`flow-${i}`}
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating data points */}
      {hasMotion && [...Array(12)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-2 h-2 rounded-full bg-[rgb(79,244,207)]"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${20 + Math.random() * 60}%`,
            boxShadow: "0 0 8px rgba(79,244,207,0.8)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
