"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useCallback, useMemo } from "react";

/**
 * DataVortex3D - Mesmerizing data spiral visualization
 * Features:
 * - 3D spiral vortex of data particles
 * - Gravitational pull effect towards center
 * - Multiple rotating rings at different speeds
 * - Energy beams shooting from center
 * - Morphing central core
 * - Spectacular aurora-like backdrop
 */
export function DataVortex3D() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  
  const rotateX = useTransform(springY, [-1, 1], [20, -20]);
  const rotateY = useTransform(springX, [-1, 1], [-20, 20]);
  const layer1X = useTransform(springX, [-1, 1], [-40, 40]);
  const layer1Y = useTransform(springY, [-1, 1], [-40, 40]);

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

  // Generate spiral particles - 3 layers
  const spiralParticles = useMemo(() => {
    const particles = [];
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * 360 * 3; // 3 full rotations
        const radius = 30 + (i / 40) * 130; // Expanding spiral
        particles.push({
          id: `${layer}-${i}`,
          layer,
          angle,
          radius,
          size: 2 + Math.random() * 4,
          color: layer === 0 
            ? `hsl(${160 + i * 2}, 80%, ${50 + Math.random() * 20}%)` // Cyan-green
            : layer === 1
              ? `hsl(${200 + i * 2}, 80%, ${50 + Math.random() * 20}%)` // Blue
              : `hsl(${280 + i * 2}, 70%, ${50 + Math.random() * 20}%)`, // Purple
          speed: 15 + layer * 5 + Math.random() * 5,
          z: (layer - 1) * 30,
        });
      }
    }
    return particles;
  }, []);

  // Generate rotating rings
  const rings = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      radius: 60 + i * 30,
      thickness: 1 + (i % 2),
      speed: 20 + i * 5,
      direction: i % 2 === 0 ? 1 : -1,
      color: `rgba(${100 + i * 30}, ${180 + i * 10}, ${220}, ${0.3 - i * 0.05})`,
      dashArray: i % 2 === 0 ? "4,8" : "none",
    }))
  , []);

  // Energy beams from center
  const energyBeams = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: i * 60,
      length: 100 + Math.random() * 50,
      width: 2 + Math.random() * 2,
    }))
  , []);

  if (shouldReduceMotion) {
    return (
      <div className="relative h-[450px] w-full flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-[450px] w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Aurora backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(6,182,212,0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 60%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Flowing aurora bands */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`aurora-${i}`}
            className="absolute w-[200%] h-32"
            style={{
              top: `${20 + i * 25}%`,
              left: "-50%",
              background: `linear-gradient(90deg, 
                transparent, 
                ${i === 0 ? "rgba(6,182,212,0.1)" : i === 1 ? "rgba(139,92,246,0.08)" : "rgba(16,185,129,0.06)"}, 
                transparent
              )`,
              filter: "blur(30px)",
              transform: `rotate(${-10 + i * 5}deg)`,
            }}
            animate={{
              x: ["-50%", "0%", "-50%"],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main 3D vortex container */}
      <motion.div
        className="relative w-80 h-80"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Rotating rings */}
        {rings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginLeft: -ring.radius,
              marginTop: -ring.radius,
              borderWidth: ring.thickness,
              borderColor: ring.color,
              borderStyle: ring.dashArray !== "none" ? "dashed" : "solid",
              transform: `translateZ(${(ring.id - 2) * 15}px)`,
            }}
            animate={{
              rotate: [0, 360 * ring.direction],
            }}
            transition={{
              duration: ring.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Spiral particles */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            x: layer1X,
            y: layer1Y,
          }}
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {spiralParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: "50%",
                top: "50%",
                marginLeft: -particle.size / 2,
                marginTop: -particle.size / 2,
                background: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: [
                  Math.cos((particle.angle * Math.PI) / 180) * particle.radius,
                  Math.cos(((particle.angle + 360) * Math.PI) / 180) * particle.radius,
                ],
                y: [
                  Math.sin((particle.angle * Math.PI) / 180) * particle.radius,
                  Math.sin(((particle.angle + 360) * Math.PI) / 180) * particle.radius,
                ],
                z: [particle.z, particle.z + 20, particle.z],
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: particle.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Energy beams */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
          {energyBeams.map((beam) => (
            <motion.div
              key={beam.id}
              className="absolute origin-left"
              style={{
                width: beam.length,
                height: beam.width,
                background: `linear-gradient(90deg, rgba(6,182,212,0.8), rgba(139,92,246,0.4), transparent)`,
                filter: "blur(1px)",
                transform: `rotate(${beam.angle}deg)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: beam.id * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Central vortex core */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(40px)" }}>
          {/* Outer glow */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
              filter: "blur(15px)",
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Morphing core */}
          <motion.div
            className="relative w-20 h-20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Core shape 1 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 50%),
                  linear-gradient(135deg, rgb(6,182,212), rgb(59,130,246), rgb(139,92,246))
                `,
                boxShadow: `
                  0 0 40px rgba(6,182,212,0.6),
                  0 0 80px rgba(139,92,246,0.4),
                  inset 0 0 20px rgba(255,255,255,0.3)
                `,
              }}
              animate={{
                borderRadius: ["50%", "40% 60% 60% 40%", "60% 40% 40% 60%", "50%"],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner pulse */}
            <motion.div
              className="absolute inset-2 rounded-full bg-white/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_white]" />
            </motion.div>
          </motion.div>

          {/* Ripple effects */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute w-20 h-20 rounded-full border-2"
              style={{
                borderColor: i === 0 
                  ? "rgba(6,182,212,0.5)" 
                  : i === 1 
                    ? "rgba(59,130,246,0.4)"
                    : "rgba(139,92,246,0.3)",
              }}
              animate={{
                scale: [1, 3],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Orbiting data nodes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: "translateZ(60px)",
            }}
            animate={{
              rotate: [i * 90, i * 90 + 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute w-8 h-8 -mt-4 rounded-lg flex items-center justify-center"
              style={{
                left: 100,
                background: `linear-gradient(135deg, ${
                  i === 0 ? "rgb(6,182,212)" : 
                  i === 1 ? "rgb(16,185,129)" : 
                  i === 2 ? "rgb(139,92,246)" : 
                  "rgb(236,72,153)"
                }, rgba(0,0,0,0.5))`,
                boxShadow: `0 0 20px ${
                  i === 0 ? "rgba(6,182,212,0.6)" : 
                  i === 1 ? "rgba(16,185,129,0.6)" : 
                  i === 2 ? "rgba(139,92,246,0.6)" : 
                  "rgba(236,72,153,0.6)"
                }`,
              }}
              animate={{
                rotate: [0, -360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span className="text-white text-xs font-bold">
                {["AI", "ML", "Σ", "∞"][i]}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating metrics */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { label: "Processing", value: "486", unit: "models" },
          { label: "Active", value: "380", unit: "strategies" },
          { label: "Latency", value: "<12", unit: "ms" },
        ].map((metric, i) => (
          <motion.div
            key={i}
            className="text-center"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {metric.value}
            </div>
            <div className="text-[10px] text-muted-foreground">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
