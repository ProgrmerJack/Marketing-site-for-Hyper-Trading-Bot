"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Research - Orbital Data Lab
 * Orbiting cubes around central core with scroll-triggered layout changes
 */
export function OrbitalDataLab3D() {
  const motionLevel = useMotionLevel();
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"orbit" | "bars" | "clusters" | "scatter">("orbit");

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  useEffect(() => {
    if (!hasMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;

      if (progress < 0.25) setLayout("orbit");
      else if (progress < 0.5) setLayout("bars");
      else if (progress < 0.75) setLayout("clusters");
      else setLayout("scatter");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMotion]);

  const cubes = [
    { label: "Backtest", color: "from-cyan-400 to-blue-500" },
    { label: "Strategy A", color: "from-emerald-400 to-teal-500" },
    { label: "Strategy B", color: "from-purple-400 to-indigo-500" },
    { label: "Risk Model", color: "from-pink-400 to-rose-500" },
    { label: "Signal Gen", color: "from-yellow-400 to-amber-500" },
    { label: "Execution", color: "from-orange-400 to-red-500" },
    { label: "Portfolio", color: "from-lime-400 to-green-500" },
    { label: "Analytics", color: "from-sky-400 to-cyan-500" },
  ];

  const getPosition = (index: number) => {
    switch (layout) {
      case "orbit": {
        const angle = (index * 360) / cubes.length;
        const radius = 120;
        return {
          x: Math.cos((angle * Math.PI) / 180) * radius,
          y: Math.sin((angle * Math.PI) / 180) * radius,
          z: Math.sin((angle * 2 * Math.PI) / 180) * 30,
        };
      }
      case "bars": {
        const heights = [60, 80, 100, 70, 90, 85, 75, 95];
        return {
          x: (index - 3.5) * 50,
          y: -heights[index] / 2,
          z: 0,
        };
      }
      case "clusters": {
        const cluster = index < 3 ? 0 : index < 6 ? 1 : 2;
        const clusterX = (cluster - 1) * 140;
        const localIndex = index % 3;
        return {
          x: clusterX + (localIndex - 1) * 40,
          y: (localIndex - 1) * 40,
          z: (localIndex - 1) * 20,
        };
      }
      case "scatter": {
        const angles = [30, 120, 200, 280, 60, 150, 240, 330];
        const radius = 80 + (index % 3) * 40;
        return {
          x: Math.cos((angles[index] * Math.PI) / 180) * radius,
          y: Math.sin((angles[index] * Math.PI) / 180) * radius,
          z: (index % 3 - 1) * 50,
        };
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center"
      style={{ perspective: "1500px" }}
    >
      <div className="relative w-full max-w-4xl h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Central core */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "0 0 60px rgba(59,130,246,0.4), inset 0 0 30px rgba(34,211,238,0.2)",
          }}
          animate={
            hasMotion
              ? {
                  rotateY: [0, 360],
                  boxShadow: [
                    "0 0 60px rgba(59,130,246,0.4), inset 0 0 30px rgba(34,211,238,0.2)",
                    "0 0 90px rgba(59,130,246,0.6), inset 0 0 45px rgba(34,211,238,0.3)",
                    "0 0 60px rgba(59,130,246,0.4), inset 0 0 30px rgba(34,211,238,0.2)",
                  ],
                }
              : {}
          }
          transition={{
            rotateY: { duration: isHighMotion ? 8 : 12, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: isHighMotion ? 2 : 3, repeat: Infinity },
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgb(var(--card))/0.06] via-transparent to-transparent" />
          <div className="absolute inset-2 rounded-xl border border-blue-400/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            HYPER LAB
          </div>
        </motion.div>

        {/* Orbiting cubes */}
        {cubes.map((cube, index) => {
          const pos = getPosition(index);

          return (
            <motion.div
              key={cube.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={
                hasMotion
                  ? {
                      x: pos.x,
                      y: pos.y,
                      z: pos.z,
                    }
                  : { x: pos.x, y: pos.y, z: 0 }
              }
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className={`relative w-16 h-16 rounded-lg bg-gradient-to-br ${cube.color}`}
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                animate={
                  hasMotion
                    ? {
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                      }
                    : {}
                }
                transition={{
                  duration: isHighMotion ? 6 + index * 0.5 : 10 + index * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgb(var(--card))/0.08] via-transparent to-transparent" />
                <div className="absolute inset-1 rounded-md border border-white/20" />
              </motion.div>

              {/* Label */}
              <div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-300 font-medium"
                style={{ transform: "translateZ(20px)" }}
              >
                {cube.label}
              </div>
            </motion.div>
          );
        })}

        {/* Connecting lines (only in orbit mode) */}
        {layout === "orbit" && hasMotion && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {cubes.map((_, index) => {
              const pos1 = getPosition(index);

              return (
                <motion.line
                  key={`line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${pos1.x}px)`}
                  y2={`calc(50% + ${pos1.y}px)`}
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1,
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* Layout indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 text-sm text-slate-400">
          <span className={layout === "orbit" ? "text-cyan-400 font-semibold" : ""}>
            Orbit
          </span>
          <span className={layout === "bars" ? "text-cyan-400 font-semibold" : ""}>
            Backtests
          </span>
          <span className={layout === "clusters" ? "text-cyan-400 font-semibold" : ""}>
            Clusters
          </span>
          <span className={layout === "scatter" ? "text-cyan-400 font-semibold" : ""}>
            Research
          </span>
        </div>

        {/* Ambient data streams */}
        {hasMotion &&
          [...Array(6)].map((_, i) => {
            const angle = (i * 360) / 6;
            const radius = 200;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={`stream-${i}`}
                className="absolute w-1 h-8 bg-cyan-400/40 rounded-full blur-sm"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translateZ(80px)",
                }}
                animate={{
                  x: [0, x, 0],
                  y: [0, y, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: isHighMotion ? 3 : 5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
