"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/**
 * TradingMatrix3D - Cyberpunk-inspired trading visualization
 * Features:
 * - Matrix-style falling data streams
 * - 3D rotating price candlesticks
 * - Real-time "trading signals" pulses
 * - Holographic price chart
 * - Glowing buy/sell indicators
 * - Particle explosion effects on signals
 */
export function TradingMatrix3D() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [signals, setSignals] = useState<{ id: number; type: "buy" | "sell"; x: number; y: number }[]>([]);
  const signalIdRef = useRef(0);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);

  // Generate random trading signals
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      const newSignal = {
        id: signalIdRef.current++,
        type: Math.random() > 0.5 ? "buy" : "sell" as "buy" | "sell",
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      };
      setSignals((prev) => [...prev.slice(-5), newSignal]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, shouldReduceMotion]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Generate matrix rain columns
  const matrixColumns = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i / 20) * 100,
      speed: 2 + Math.random() * 3,
      chars: Array.from({ length: 8 }, () => 
        String.fromCharCode(0x30A0 + Math.random() * 96)
      ),
    }))
  , []);

  // Generate candlesticks
  const candlesticks = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + i * 7,
      open: 30 + Math.random() * 40,
      close: 30 + Math.random() * 40,
      high: 70 + Math.random() * 20,
      low: 10 + Math.random() * 20,
    }))
  , []);

  // Generate chart line points
  const chartPoints = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      x: i * 5,
      y: 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
    }))
  , []);

  if (shouldReduceMotion) {
    return (
      <div className="relative h-[450px] w-full flex items-center justify-center">
        <div className="relative w-80 h-64 rounded-xl border border-emerald-500/30 bg-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-[450px] w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {matrixColumns.map((col) => (
          <motion.div
            key={col.id}
            className="absolute top-0 flex flex-col items-center text-xs font-mono"
            style={{ left: `${col.x}%` }}
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: col.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {col.chars.map((char, i) => (
              <span
                key={i}
                className="text-emerald-500"
                style={{
                  opacity: 1 - i * 0.1,
                  textShadow: i === 0 ? "0 0 10px rgb(16,185,129)" : "none",
                }}
              >
                {char}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main 3D container */}
      <motion.div
        className="relative w-[340px] h-[260px]"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Trading terminal frame */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-emerald-500/50 bg-black/80 backdrop-blur-sm overflow-hidden"
          style={{
            boxShadow: `
              0 0 30px rgba(16,185,129,0.3),
              inset 0 0 60px rgba(16,185,129,0.1)
            `,
            transform: "translateZ(0px)",
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-emerald-500/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-mono text-emerald-500/70">HYPER_TRADING_TERMINAL v3.0</span>
            <motion.div 
              className="ml-auto w-2 h-2 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Holographic price chart */}
          <div className="relative h-[180px] p-4">
            <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={`grid-h-${y}`}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="rgba(16,185,129,0.1)"
                  strokeDasharray="2,2"
                />
              ))}
              {[0, 25, 50, 75, 100].map((x) => (
                <line
                  key={`grid-v-${x}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="100"
                  stroke="rgba(16,185,129,0.1)"
                  strokeDasharray="2,2"
                />
              ))}

              {/* Candlesticks */}
              {candlesticks.map((candle, i) => {
                const isGreen = candle.close > candle.open;
                return (
                  <motion.g key={candle.id}>
                    {/* Wick */}
                    <motion.line
                      x1={candle.x}
                      y1={100 - candle.high}
                      x2={candle.x}
                      y2={100 - candle.low}
                      stroke={isGreen ? "rgb(16,185,129)" : "rgb(239,68,68)"}
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                    {/* Body */}
                    <motion.rect
                      x={candle.x - 2}
                      y={100 - Math.max(candle.open, candle.close)}
                      width="4"
                      height={Math.abs(candle.close - candle.open)}
                      fill={isGreen ? "rgb(16,185,129)" : "rgb(239,68,68)"}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    />
                  </motion.g>
                );
              })}

              {/* Moving average line */}
              <motion.path
                d={`M ${chartPoints.map((p) => `${p.x} ${100 - p.y}`).join(" L ")}`}
                fill="none"
                stroke="rgb(6,182,212)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{
                  filter: "drop-shadow(0 0 4px rgb(6,182,212))",
                }}
              />

              {/* Animated price indicator */}
              <motion.circle
                r="3"
                fill="rgb(6,182,212)"
                style={{
                  filter: "drop-shadow(0 0 8px rgb(6,182,212))",
                }}
                animate={{
                  cx: chartPoints.map((p) => p.x),
                  cy: chartPoints.map((p) => 100 - p.y),
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>

            {/* Price labels */}
            <div className="absolute right-2 top-4 flex flex-col justify-between h-[calc(100%-32px)] text-[8px] font-mono text-emerald-500/50">
              {["72,450", "68,000", "64,000", "60,000"].map((price) => (
                <span key={price}>${price}</span>
              ))}
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t border-emerald-500/30 bg-black/50">
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="text-emerald-500">
                VOL: <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>2.4B</motion.span>
              </span>
              <span className="text-cyan-400">
                RSI: 58.3
              </span>
              <span className="text-purple-400">
                MACD: +0.42
              </span>
            </div>
            <motion.div
              className="flex items-center gap-1 text-[10px] font-mono text-emerald-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </motion.div>
          </div>
        </motion.div>

        {/* Floating depth layer - Buy orders */}
        <motion.div
          className="absolute -left-8 top-1/4 w-6 h-32 rounded-lg overflow-hidden border border-emerald-500/30"
          style={{
            background: "linear-gradient(180deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))",
            transform: "translateZ(40px) rotateY(-20deg)",
          }}
          animate={{
            scaleY: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-[8px] font-mono text-emerald-500 text-center py-1">BUY</div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-3 mx-1 my-0.5 rounded-sm bg-emerald-500/40"
              style={{ width: `${70 - i * 10}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Floating depth layer - Sell orders */}
        <motion.div
          className="absolute -right-8 top-1/4 w-6 h-32 rounded-lg overflow-hidden border border-red-500/30"
          style={{
            background: "linear-gradient(180deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1))",
            transform: "translateZ(40px) rotateY(20deg)",
          }}
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="text-[8px] font-mono text-red-500 text-center py-1">SELL</div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-3 mx-1 my-0.5 rounded-sm bg-red-500/40"
              style={{ width: `${60 - i * 8}%`, marginLeft: "auto" }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Trading signals with particle explosions */}
      {signals.map((signal) => (
        <motion.div
          key={signal.id}
          className="absolute pointer-events-none"
          style={{
            left: `${signal.x}%`,
            top: `${signal.y}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              signal.type === "buy"
                ? "bg-emerald-500/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                : "bg-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            }`}
          >
            {signal.type === "buy" ? "↑" : "↓"}
          </div>
          {/* Particle explosion */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                signal.type === "buy" ? "bg-emerald-400" : "bg-red-400"
              }`}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i * 45 * Math.PI) / 180) * 40,
                y: Math.sin((i * 45 * Math.PI) / 180) * 40,
                opacity: 0,
              }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </motion.div>
      ))}

      {/* Corner HUD elements */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-500/60">
        <div>SYS: ACTIVE</div>
        <div>LATENCY: 12ms</div>
      </div>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-emerald-500/60 text-right">
        <div>STRATEGIES: 12/380</div>
        <div>MODELS: 486</div>
      </div>
    </div>
  );
}
