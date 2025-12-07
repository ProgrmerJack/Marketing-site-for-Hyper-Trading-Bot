"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Pipeline Flow 3D - How It Works Page
 * Premium 4-stage flowing data pipeline with Mini Orb-level quality
 * Data Acquisition → Signal Engine → Risk Controller → Execution
 */
export function PipelineFlow3D() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stages = [
    { label: "DATA", color: "rgb(59,130,246)", gradient: "from-blue-500 to-cyan-500" },
    { label: "SIGNAL", color: "rgb(34,211,238)", gradient: "from-cyan-500 to-emerald-500" },
    { label: "RISK", color: "rgb(52,211,153)", gradient: "from-emerald-500 to-amber-500" },
    { label: "EXEC", color: "rgb(168,85,247)", gradient: "from-amber-500 to-purple-500" },
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 12, y: y * 8 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Static fallback
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center gap-8">
            {stages.map((stage, i) => (
              <div key={i} className="relative">
                <div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stage.gradient} opacity-80`}
                  style={{ boxShadow: `0 0 30px ${stage.color}` }}
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/60">
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1200px]"
    >
      {/* Background ambient glow */}
      <motion.div
        className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.15), rgba(59,130,246,0.1), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main 3D container with parallax */}
      <motion.div
        className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -15, 0],
          rotateY: [0, 3, 0, -3, 0],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Pipeline structure */}
        <div className="relative w-[520px] h-[200px]" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Connection tubes */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`tube-${i}`}
              className="absolute h-3 rounded-full"
              style={{
                left: 65 + i * 130,
                top: "50%",
                width: 90,
                transform: "translateY(-50%) translateZ(20px)",
                background: "linear-gradient(90deg, rgba(79,244,207,0.3), rgba(59,130,246,0.3))",
                boxShadow: "0 0 15px rgba(79,244,207,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
              }}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(79,244,207,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
                  "0 0 25px rgba(79,244,207,0.5), inset 0 0 15px rgba(255,255,255,0.2)",
                  "0 0 15px rgba(79,244,207,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* Stage nodes - Premium quality like Mini Orb */}
          {stages.map((stage, index) => (
            <motion.div
              key={stage.label}
              className="absolute"
              style={{
                left: 10 + index * 130,
                top: "50%",
                transform: "translateY(-50%)",
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeInOut",
              }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{
                  width: 72,
                  height: 72,
                  background: stage.color,
                  transform: "translateZ(-15px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
              />

              {/* Main cube with 3D depth */}
              <motion.div
                className={`relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${stage.gradient}`}
                style={{
                  transform: "translateZ(30px)",
                  boxShadow: `0 0 40px ${stage.color}, inset 0 0 20px rgba(255,255,255,0.3)`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 40px ${stage.color}, inset 0 0 20px rgba(255,255,255,0.3)`,
                    `0 0 60px ${stage.color}, inset 0 0 30px rgba(255,255,255,0.5)`,
                    `0 0 40px ${stage.color}, inset 0 0 20px rgba(255,255,255,0.3)`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
              >
                {/* Inner borders like Mini Orb */}
                <div className="absolute inset-2 border-2 border-white/40 rounded-xl" />
                <div className="absolute inset-4 border border-white/20 rounded-lg" />

                {/* Scanner line animation */}
                <motion.div
                  className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full"
                  animate={{ top: ["15%", "85%", "15%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />

                {/* Stage icon/number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">{index + 1}</span>
                </div>
              </motion.div>

              {/* Orbiting particle */}
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: stage.color,
                  boxShadow: `0 0 10px ${stage.color}`,
                  left: 36,
                  top: 36,
                }}
                animate={{
                  x: [0, 45, 0, -45, 0],
                  y: [-45, 0, 45, 0, -45],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
              />

              {/* Label */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{ bottom: -28, transform: "translateX(-50%) translateZ(35px)" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <span 
                  className="text-xs font-bold tracking-widest"
                  style={{ color: stage.color, textShadow: `0 0 10px ${stage.color}` }}
                >
                  {stage.label}
                </span>
              </motion.div>
            </motion.div>
          ))}

          {/* Flowing data packets */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`packet-${i}`}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgb(79,244,207), rgb(59,130,246))",
                boxShadow: "0 0 15px rgba(79,244,207,0.8), 0 0 30px rgba(59,130,246,0.4)",
                left: 45,
                top: "50%",
                transform: "translateY(-50%) translateZ(45px)",
              }}
              animate={{
                x: [0, 130, 260, 390, 430],
                scale: [0.5, 1.2, 1, 1.2, 0.3],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Output burst particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute w-2 h-2 rounded-full bg-purple-400"
              style={{
                left: 480,
                top: "50%",
                boxShadow: "0 0 8px rgba(168,85,247,0.8)",
              }}
              animate={{
                x: [0, 30 + i * 8],
                y: [0, -25 + i * 10],
                opacity: [0, 0.9, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 3.8 + i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Background ring like Mini Orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[180px] rounded-full border border-cyan-500/20"
          style={{ transform: "translateZ(-30px)" }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.03, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </motion.div>

      {/* Holographic scan lines like Mini Orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent"
            style={{ top: `${15 + (i / 15) * 50}%` }}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>

      {/* Floating ambient particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: i % 2 === 0 ? "rgb(79,244,207)" : "rgb(139,92,246)",
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Status indicator */}
      <motion.div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 flex items-center gap-2"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span 
          className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-cyan-400/70 tracking-wider">PIPELINE ACTIVE</span>
        <motion.span 
          className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
}

export default PipelineFlow3D;
