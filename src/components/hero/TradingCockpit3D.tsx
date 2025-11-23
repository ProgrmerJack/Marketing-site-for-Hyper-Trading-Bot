"use client";

import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";
import { useState } from "react";

/**
 * Live Demo - 3D Trading Cockpit
 * Tilted desk with floating screens showing trading dashboards
 */
export function TradingCockpit3D() {
  const motionLevel = useMotionLevel();
  const [hoveredScreen, setHoveredScreen] = useState<number | null>(null);

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  const screens = [
    { title: "Order Routing", color: "from-cyan-500 to-blue-600", icon: "📊" },
    { title: "Risk Monitor", color: "from-emerald-500 to-teal-600", icon: "🛡️" },
    { title: "P&L Dashboard", color: "from-purple-500 to-indigo-600", icon: "💹" },
  ];

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          hasMotion
            ? {
                rotateX: [-2, -5, -2],
              }
            : {}
        }
        transition={{
          duration: isHighMotion ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Desk base */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
          style={{
            transform: "translateZ(-50px) rotateX(70deg)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(59,130,246,0.1)",
          }}
        >
          {/* Desk details */}
          <div className="absolute inset-4 rounded-xl border border-slate-600/50" />
          <div className="absolute bottom-2 right-4 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={`led-${i}`}
                className="w-2 h-2 rounded-full bg-green-400"
                style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Three floating screens */}
        <div className="relative flex justify-center gap-12 items-center h-[400px]">
          {screens.map((screen, index) => {
            const isHovered = hoveredScreen === index;
            const xOffset = (index - 1) * 200;
            const zOffset = index === 1 ? 50 : 0;

            return (
              <motion.div
                key={screen.title}
                className="relative cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={
                  hasMotion
                    ? {
                        x: isHovered ? xOffset : xOffset,
                        z: isHovered ? zOffset + 80 : zOffset,
                        scale: isHovered ? 1.1 : 1,
                        rotateY: isHovered ? [0, 5, -5, 0] : 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  rotateY: { duration: isHighMotion ? 2 : 3, repeat: isHovered ? Infinity : 0 },
                }}
                onMouseEnter={() => setHoveredScreen(index)}
                onMouseLeave={() => setHoveredScreen(null)}
              >
                {/* Screen frame */}
                <div
                  className="relative w-56 h-64 rounded-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgb(51,65,85), rgb(30,41,59))",
                    boxShadow: isHovered
                      ? `0 0 60px ${screen.color === "from-cyan-500 to-blue-600" ? "rgba(34,211,238,0.6)" : screen.color === "from-emerald-500 to-teal-600" ? "rgba(16,185,129,0.6)" : "rgba(168,85,247,0.6)"}`
                      : "0 20px 40px rgba(0,0,0,0.4)",
                    border: "2px solid rgba(100,116,139,0.3)",
                  }}
                >
                  {/* Screen content */}
                  <div className={`absolute inset-2 rounded bg-gradient-to-br ${screen.color} p-4`}>
                    {/* Screen header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold text-sm">{screen.title}</span>
                      <span className="text-3xl">{screen.icon}</span>
                    </div>

                    {/* Animated chart lines */}
                    <svg className="w-full h-32 mt-4">
                      <motion.polyline
                        points="10,80 40,60 70,70 100,40 130,50 160,30 190,45 220,25"
                        fill="none"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={
                          hasMotion
                            ? {
                                pathLength: isHovered ? 1 : 0.7,
                              }
                            : { pathLength: 0.7 }
                        }
                        transition={{
                          duration: isHighMotion ? 1 : 2,
                        }}
                      />
                      {/* Data points */}
                      {[40, 70, 100, 130, 160, 190].map((x, i) => (
                        <motion.circle
                          key={`point-${i}`}
                          cx={x}
                          cy={[60, 70, 40, 50, 30, 45][i]}
                          r="3"
                          fill="white"
                          initial={{ scale: 0 }}
                          animate={
                            hasMotion && isHovered
                              ? {
                                  scale: [0, 1.2, 1],
                                }
                              : { scale: 1 }
                          }
                          transition={{
                            duration: 0.3,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </svg>

                    {/* Stats bars */}
                    <div className="mt-4 space-y-2">
                      {[0.7, 0.5, 0.85].map((width, i) => (
                        <motion.div
                          key={`bar-${i}`}
                          className="h-2 rounded-full bg-[rgb(var(--card))/0.12]"
                          initial={{ width: 0 }}
                          animate={
                            hasMotion
                              ? {
                                  width: isHovered ? `${width * 100}%` : `${width * 70}%`,
                                }
                              : { width: `${width * 70}%` }
                          }
                          transition={{
                            duration: 0.5,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>

                    {/* Scrolling data */}
                    {hasMotion && isHovered && (
                      <div className="absolute bottom-2 left-2 right-2 overflow-hidden h-8">
                        <motion.div
                          className="flex gap-2 text-white/80 text-xs font-mono"
                          animate={{
                            x: [-100, -200],
                          }}
                          transition={{
                            duration: isHighMotion ? 3 : 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {["BTC/USD +2.3%", "ETH/USD -0.8%", "SOL/USD +5.1%", "BTC/USD +2.3%"].map(
                            (text, i) => (
                              <span key={i} className="whitespace-nowrap">
                                {text}
                              </span>
                            )
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Screen glare effect */}
                  <div
                    className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[rgb(var(--card))/0.06] to-transparent"
                    style={{ transform: "translateZ(1px)" }}
                  />

                  {/* Holographic scan line */}
                  {hasMotion && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-[rgb(var(--card))/0.06] blur-sm"
                      animate={{
                        top: ["0%", "100%"],
                      }}
                      transition={{
                        duration: isHighMotion ? 2 : 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>

                {/* Screen stand */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-12 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-lg"
                  style={{
                    transform: "translateZ(-10px) translateY(20px)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Ambient particles */}
        {hasMotion &&
          [...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: "translateZ(100px)",
              }}
              animate={{
                y: [-20, -60],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: isHighMotion ? 2 + Math.random() : 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
      </motion.div>
    </div>
  );
}
