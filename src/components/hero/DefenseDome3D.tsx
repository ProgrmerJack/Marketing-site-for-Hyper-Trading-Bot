"use client";

import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Safety & Risk - Defense Dome over Market
 * 3D glass dome protecting candlestick towers from threat rays
 */
export function DefenseDome3D() {
  const motionLevel = useMotionLevel();

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div className="relative w-96 h-96" style={{ transformStyle: "preserve-3d" }}>
        {/* Base platform */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-4 rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
          style={{
            transform: "translateZ(-20px) rotateX(80deg)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        />

        {/* Candlestick towers (market data) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 items-end">
          {[
            { height: 60, color: "green" },
            { height: 45, color: "red" },
            { height: 75, color: "green" },
            { height: 38, color: "red" },
            { height: 55, color: "green" },
            { height: 50, color: "red" },
            { height: 68, color: "green" },
          ].map((candle, i) => (
            <motion.div
              key={`candle-${i}`}
              className="w-6 rounded-sm"
              style={{
                height: `${candle.height}px`,
                background:
                  candle.color === "green"
                    ? "linear-gradient(180deg, rgb(34,197,94), rgb(22,163,74))"
                    : "linear-gradient(180deg, rgb(239,68,68), rgb(220,38,38))",
                boxShadow: `0 0 10px ${candle.color === "green" ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}`,
                transform: "translateZ(0px)",
              }}
              animate={
                hasMotion
                  ? {
                      scaleY: [1, 1.05, 0.98, 1.02, 1],
                      opacity: [0.8, 1, 0.85, 1, 0.8],
                    }
                  : {}
              }
              transition={{
                duration: isHighMotion ? 2 + i * 0.1 : 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Glass dome */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8"
          style={{
            width: "320px",
            height: "320px",
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main dome sphere */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.15), rgba(59,130,246,0.05))",
              border: "2px solid rgba(56,189,248,0.3)",
              boxShadow: "inset 0 0 60px rgba(56,189,248,0.2), 0 0 80px rgba(56,189,248,0.3)",
            }}
            animate={
              hasMotion
                ? {
                    boxShadow: [
                      "inset 0 0 60px rgba(56,189,248,0.2), 0 0 80px rgba(56,189,248,0.3)",
                      "inset 0 0 80px rgba(56,189,248,0.35), 0 0 120px rgba(56,189,248,0.5)",
                      "inset 0 0 60px rgba(56,189,248,0.2), 0 0 80px rgba(56,189,248,0.3)",
                    ],
                  }
                : {}
              }
            transition={{
              duration: isHighMotion ? 2 : 3.5,
              repeat: Infinity,
            }}
          >
            {/* Dome grid lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Vertical lines */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const x1 = 160 + Math.cos((angle * Math.PI) / 180) * 140;
                const y1 = 160 + Math.sin((angle * Math.PI) / 180) * 140;
                return (
                  <line
                    key={`v-${i}`}
                    x1={160}
                    y1={280}
                    x2={x1}
                    y2={y1}
                    stroke="rgba(56,189,248,0.3)"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Horizontal rings */}
              {[0.3, 0.5, 0.7, 0.9].map((ratio, i) => (
                <circle
                  key={`h-${i}`}
                  cx={160}
                  cy={160}
                  r={160 * ratio}
                  fill="none"
                  stroke="rgba(56,189,248,0.25)"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* Reflective highlights */}
            <div
              className="absolute top-8 left-12 w-20 h-20 rounded-full bg-[rgb(var(--card))/0.06] blur-xl"
              style={{ transform: "translateZ(5px)" }}
            />
          </motion.div>

          {/* Energy pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 rounded-full border-2 border-blue-400/40"
              style={{
                width: "320px",
                height: "160px",
                transform: "translateZ(-10px) rotateX(80deg)",
              }}
              animate={
                hasMotion
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }
                  : {}
              }
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </motion.div>

        {/* Threat rays approaching and refracting */}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => {
          const startRadius = 250;
          const endRadius = 160;
          const startX = 192 + Math.cos((angle * Math.PI) / 180) * startRadius;
          const startY = 192 + Math.sin((angle * Math.PI) / 180) * startRadius;
          const endX = 192 + Math.cos((angle * Math.PI) / 180) * endRadius;
          const endY = 192 + Math.sin((angle * Math.PI) / 180) * endRadius;

          return (
            <motion.div
              key={`threat-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${startX}px`,
                top: `${startY}px`,
                width: "3px",
                height: `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}px`,
                background: "linear-gradient(180deg, rgba(239,68,68,0.8), rgba(239,68,68,0))",
                transformOrigin: "top center",
                transform: `translateZ(20px) rotate(${angle + 180}deg)`,
                boxShadow: "0 0 10px rgba(239,68,68,0.6)",
              }}
              animate={
                hasMotion
                  ? {
                      opacity: [0, 0.8, 0],
                      scaleY: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: isHighMotion ? 1.5 : 2.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Refraction sparks when threats hit dome */}
        {hasMotion &&
          [45, 135, 225, 315].map((angle, i) => {
            const radius = 160;
            const x = 192 + Math.cos((angle * Math.PI) / 180) * radius;
            const y = 192 + Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-3 h-3 rounded-full bg-yellow-300"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translateZ(60px)",
                  boxShadow: "0 0 15px rgba(251,191,36,1)",
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: isHighMotion ? 0.8 : 1.2,
                  repeat: Infinity,
                  delay: i * 0.4 + 0.8,
                }}
              />
            );
          })}

        {/* Status indicators around dome */}
        <div className="absolute -right-12 top-1/4 flex flex-col gap-3">
          {["Max Drawdown", "Kill Switch", "Position Limits"].map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 text-sm"
              animate={
                hasMotion
                  ? {
                      opacity: [0.6, 1, 0.6],
                    }
                  : {}
              }
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-slate-300 whitespace-nowrap">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
