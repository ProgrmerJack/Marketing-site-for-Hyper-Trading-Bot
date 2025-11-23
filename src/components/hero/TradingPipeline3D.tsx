"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * How It Works - 3D Trading Pipeline
 * Three nodes representing: Signals → Risk Rails → Execution
 * Camera flies between nodes as user scrolls
 */
export function TradingPipeline3D() {
  const motionLevel = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState(0);

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

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

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMotion]);

  const nodes = [
    {
      title: "Signals",
      color: "from-cyan-400 to-blue-500",
      glowColor: "rgba(34,211,238,0.6)",
      icon: "📡",
    },
    {
      title: "Risk Rails",
      color: "from-emerald-400 to-teal-500",
      glowColor: "rgba(16,185,129,0.6)",
      icon: "🛡️",
    },
    {
      title: "Execution",
      color: "from-purple-400 to-indigo-500",
      glowColor: "rgba(168,85,247,0.6)",
      icon: "⚡",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Curved pipeline track */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: "translateZ(-50px)" }}
      >
        <motion.path
          d="M 100 300 Q 400 100, 700 300 T 1300 300"
          fill="none"
          stroke="rgba(100,116,139,0.3)"
          strokeWidth="3"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={hasMotion ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Three nodes positioned along the pipeline */}
      <div className="relative w-full max-w-6xl mx-auto px-8" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex justify-between items-center relative">
          {nodes.map((node, index) => {
            const isActive = activeNode === index;
            const isPast = activeNode > index;

            return (
              <motion.div
                key={node.title}
                className="relative flex flex-col items-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={
                  hasMotion
                    ? {
                        z: isActive ? 100 : 0,
                        scale: isActive ? 1.2 : 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                {/* Node sphere */}
                <motion.div
                  className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${node.color}`}
                  style={{
                    boxShadow: isActive
                      ? `0 0 60px ${node.glowColor}, 0 0 100px ${node.glowColor}`
                      : `0 0 30px ${node.glowColor}`,
                    transform: "translateZ(50px)",
                  }}
                  animate={
                    hasMotion && isActive
                      ? {
                          boxShadow: [
                            `0 0 60px ${node.glowColor}, 0 0 100px ${node.glowColor}`,
                            `0 0 80px ${node.glowColor}, 0 0 140px ${node.glowColor}`,
                            `0 0 60px ${node.glowColor}, 0 0 100px ${node.glowColor}`,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: isHighMotion ? 1.5 : 2.5,
                    repeat: Infinity,
                  }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(var(--card))/0.08] via-transparent to-transparent" />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    {node.icon}
                  </div>

                  {/* Inner ring */}
                  <motion.div
                    className="absolute inset-3 rounded-full border-2 border-white/40"
                    animate={
                      hasMotion && isActive
                        ? {
                            rotate: [0, 360],
                          }
                        : {}
                    }
                    transition={{
                      duration: isHighMotion ? 3 : 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Node label */}
                <motion.div
                  className="mt-6 text-xl font-semibold text-slate-200"
                  animate={
                    hasMotion
                      ? {
                          opacity: isActive ? 1 : 0.5,
                          y: isActive ? 0 : 10,
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {node.title}
                </motion.div>

                {/* Active node features */}
                {isActive && (
                  <>
                    {/* Signals: Waveforms */}
                    {index === 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={`wave-${i}`}
                            className="absolute w-1 h-8 bg-cyan-400/60 rounded-full"
                            style={{
                              left: `${20 + i * 20}%`,
                              top: "50%",
                              transform: "translateZ(30px)",
                            }}
                            animate={
                              hasMotion
                                ? {
                                    scaleY: [1, 2, 0.5, 1.5, 1],
                                    opacity: [0.4, 0.8, 0.4],
                                  }
                                : {}
                            }
                            transition={{
                              duration: isHighMotion ? 1 : 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Risk Rails: Shield particles */}
                    {index === 1 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[0, 90, 180, 270].map((angle, i) => {
                          const radius = 80;
                          const x = Math.cos((angle * Math.PI) / 180) * radius;
                          const y = Math.sin((angle * Math.PI) / 180) * radius;

                          return (
                            <motion.div
                              key={`shield-${i}`}
                              className="absolute w-4 h-6 rounded"
                              style={{
                                left: "50%",
                                top: "50%",
                                background: "linear-gradient(180deg, rgb(16,185,129), rgb(5,150,105))",
                                transform: `translateZ(40px)`,
                                boxShadow: "0 0 10px rgba(16,185,129,0.8)",
                              }}
                              animate={
                                hasMotion
                                  ? {
                                      x: [x, x * 1.2, x],
                                      y: [y, y * 1.2, y],
                                      rotate: [angle, angle + 20, angle],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: isHighMotion ? 2 : 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Execution: Order cubes */}
                    {index === 2 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={`cube-${i}`}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{
                              left: "50%",
                              top: "20%",
                              background: "linear-gradient(135deg, rgb(168,85,247), rgb(147,51,234))",
                              transform: "translateZ(30px)",
                              boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                            }}
                            animate={
                              hasMotion
                                ? {
                                    y: [0, 100, 0],
                                    x: [-20 + i * 8, -20 + i * 8],
                                    rotate: [0, 360],
                                    opacity: [0, 1, 0],
                                  }
                                : {}
                            }
                            transition={{
                              duration: isHighMotion ? 1.5 : 2.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Completion indicator */}
                {isPast && (
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {nodes.map((_, index) => (
          <motion.div
            key={`dot-${index}`}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: activeNode === index ? "rgb(59,130,246)" : "rgb(100,116,139)",
            }}
            animate={
              hasMotion
                ? {
                    scale: activeNode === index ? 1.3 : 1,
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
