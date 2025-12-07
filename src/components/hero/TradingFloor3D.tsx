"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Trading Floor 3D - Live Demo Page
 * Holographic trading floor with candlestick charts and live data
 */
export function TradingFloor3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 20 });

  // Simulated candlestick data
  const candlesticks = [
    { open: 45, close: 60, high: 65, low: 40, bullish: true },
    { open: 60, close: 55, high: 70, low: 50, bullish: false },
    { open: 55, close: 70, high: 75, low: 52, bullish: true },
    { open: 70, close: 65, high: 78, low: 60, bullish: false },
    { open: 65, close: 80, high: 85, low: 62, bullish: true },
    { open: 80, close: 75, high: 88, low: 70, bullish: false },
    { open: 75, close: 90, high: 95, low: 72, bullish: true },
    { open: 90, close: 85, high: 98, low: 82, bullish: false },
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
          <div className="relative w-[500px] h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-red-500/15 rounded-3xl blur-3xl" />
            <div className="flex items-end justify-center gap-4 h-full pb-12">
              {candlesticks.slice(0, 5).map((candle, i) => (
                <div
                  key={i}
                  className={`w-8 ${candle.bullish ? "bg-emerald-500/50" : "bg-red-500/50"}`}
                  style={{ height: `${40 + (candle.close - candle.open) * 2}px` }}
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
          className="relative w-[520px] h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Trading floor base platform */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[450px] h-[180px] rounded-2xl"
            style={{
              background: "linear-gradient(145deg, rgba(17,24,39,0.9), rgba(31,41,55,0.8))",
              border: "1px solid rgba(79,244,207,0.3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(79,244,207,0.1)",
              transform: "translateZ(-40px) rotateX(60deg)",
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Grid lines on floor */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <defs>
                <pattern id="floorGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(79,244,207,0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#floorGrid)" />
            </svg>

            {/* Platform glow */}
            <motion.div
              className="absolute -inset-4 rounded-2xl opacity-40"
              style={{
                background: "radial-gradient(ellipse at center, rgba(79,244,207,0.3), transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Candlestick chart */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex items-end gap-4">
            {candlesticks.map((candle, index) => {
              const bodyHeight = Math.abs(candle.close - candle.open);
              const bodyBottom = Math.min(candle.open, candle.close);
              const wickTop = candle.high - Math.max(candle.open, candle.close);
              const wickBottom = Math.min(candle.open, candle.close) - candle.low;

              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{
                    height: "120px",
                    transform: "translateZ(30px)",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  {/* Wick top */}
                  <motion.div
                    className="absolute w-0.5"
                    style={{
                      height: `${wickTop}px`,
                      bottom: `${bodyBottom + bodyHeight}px`,
                      background: candle.bullish
                        ? "rgba(52,211,153,0.8)"
                        : "rgba(248,113,113,0.8)",
                    }}
                  />

                  {/* Candle body */}
                  <motion.div
                    className="absolute w-7 rounded-sm"
                    style={{
                      height: `${Math.max(bodyHeight, 4)}px`,
                      bottom: `${bodyBottom}px`,
                      background: candle.bullish
                        ? "linear-gradient(180deg, rgba(52,211,153,0.9), rgba(16,185,129,0.9))"
                        : "linear-gradient(180deg, rgba(248,113,113,0.9), rgba(220,38,38,0.9))",
                      boxShadow: candle.bullish
                        ? "0 0 15px rgba(52,211,153,0.5), inset 0 0 10px rgba(255,255,255,0.2)"
                        : "0 0 15px rgba(248,113,113,0.5), inset 0 0 10px rgba(255,255,255,0.2)",
                      transform: "translateZ(5px)",
                    }}
                    animate={{
                      boxShadow: candle.bullish
                        ? [
                            "0 0 15px rgba(52,211,153,0.5)",
                            "0 0 25px rgba(52,211,153,0.7)",
                            "0 0 15px rgba(52,211,153,0.5)",
                          ]
                        : [
                            "0 0 15px rgba(248,113,113,0.5)",
                            "0 0 25px rgba(248,113,113,0.7)",
                            "0 0 15px rgba(248,113,113,0.5)",
                          ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                  />

                  {/* Wick bottom */}
                  <motion.div
                    className="absolute w-0.5"
                    style={{
                      height: `${wickBottom}px`,
                      bottom: `${candle.low}px`,
                      background: candle.bullish
                        ? "rgba(52,211,153,0.8)"
                        : "rgba(248,113,113,0.8)",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Holographic price display */}
          <motion.div
            className="absolute right-4 top-8 px-4 py-2 rounded-lg"
            style={{
              background: "rgba(17,24,39,0.8)",
              border: "1px solid rgba(79,244,207,0.4)",
              boxShadow: "0 0 20px rgba(79,244,207,0.2)",
              transform: "translateZ(60px)",
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="text-xl font-mono font-bold text-emerald-400"
              animate={{
                textShadow: [
                  "0 0 10px rgba(52,211,153,0.5)",
                  "0 0 20px rgba(52,211,153,0.8)",
                  "0 0 10px rgba(52,211,153,0.5)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              $47,892.34
            </motion.div>
            <div className="text-xs text-emerald-400/60 flex items-center gap-1">
              <span>▲</span>
              <span>+2.34%</span>
            </div>
          </motion.div>

          {/* Volume bars */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-end gap-4">
            {candlesticks.map((candle, index) => (
              <motion.div
                key={`vol-${index}`}
                className="w-7 rounded-t-sm"
                style={{
                  height: `${15 + Math.random() * 20}px`,
                  background: candle.bullish
                    ? "rgba(52,211,153,0.25)"
                    : "rgba(248,113,113,0.25)",
                  transform: "translateZ(25px)",
                }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              />
            ))}
          </div>

          {/* Live trading signals */}
          <motion.div
            className="absolute left-4 top-8 flex flex-col gap-2"
            style={{ transform: "translateZ(50px)" }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                background: "rgba(52,211,153,0.2)",
                border: "1px solid rgba(52,211,153,0.4)",
              }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400">BUY SIGNAL</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                background: "rgba(79,244,207,0.15)",
                border: "1px solid rgba(79,244,207,0.3)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400">ANALYZING...</span>
            </motion.div>
          </motion.div>

          {/* Data stream particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`data-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "rgba(52,211,153,0.8)" : "rgba(79,244,207,0.8)",
                left: `${20 + (i % 4) * 25}%`,
                boxShadow: "0 0 8px currentColor",
              }}
              animate={{
                y: [-100, 200],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}

          {/* Holographic scanner line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[400px] h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(79,244,207,0.8), transparent)",
              boxShadow: "0 0 20px rgba(79,244,207,0.5)",
              transform: "translateZ(45px)",
            }}
            animate={{
              y: [-60, 120],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: isHighMotion ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Status indicator */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 flex items-center gap-2 text-[10px] font-mono"
            style={{
              color: "rgba(52,211,153,0.7)",
              transform: "translateZ(30px)",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE DEMO ACTIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TradingFloor3D;
