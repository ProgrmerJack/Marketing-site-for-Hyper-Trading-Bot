"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/**
 * QuantumCore3D - Decorative/experimental 3D visualization
 * Features:
 * - Morphing quantum sphere with DNA-like helix structure
 * - 200+ orbiting data particles with trails
 * - Neural network connections that pulse with activity
 * - Holographic projection effects
 * - Real-time mouse parallax with depth layers
 * - Energy waves emanating from core
 * - Floating algorithm symbols (Σ, ∫, ∞, Δ, λ)
 */
export function QuantumCore3D() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Parallax transforms for different depth layers
  const layer1X = useTransform(springX, [-1, 1], [-30, 30]);
  const layer1Y = useTransform(springY, [-1, 1], [-30, 30]);
  const layer2X = useTransform(springX, [-1, 1], [-20, 20]);
  const layer2Y = useTransform(springY, [-1, 1], [-20, 20]);
  const layer3X = useTransform(springX, [-1, 1], [-10, 10]);
  const layer3Y = useTransform(springY, [-1, 1], [-10, 10]);
  const rotateX = useTransform(springY, [-1, 1], [15, -15]);
  const rotateY = useTransform(springX, [-1, 1], [-15, 15]);

  // Generate random active neural nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const newNodes = Array.from({ length: 3 }, () => Math.floor(Math.random() * 12));
      setActiveNodes(newNodes);
    }, 800);
    return () => clearInterval(interval);
  }, []);

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

  // Generate orbital particles with trails
  const orbitalParticles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      orbitRadius: 100 + (i % 4) * 30,
      startAngle: (i * 6) % 360,
      speed: 15 + Math.random() * 10,
      size: 2 + Math.random() * 4,
      color: i % 3 === 0 
        ? "rgb(79,244,207)" 
        : i % 3 === 1 
          ? "rgb(0,179,255)" 
          : "rgb(139,92,246)",
      z: (i % 5 - 2) * 20,
      hasTrail: i % 2 === 0,
    }))
  , []);

  // DNA helix points
  const helixPoints = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      y: (i - 12) * 12,
      angle: i * 30,
      isLeft: i % 2 === 0,
    }))
  , []);

  // Neural network nodes
  const neuralNodes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.cos((i * 30 * Math.PI) / 180) * 140,
      y: Math.sin((i * 30 * Math.PI) / 180) * 140,
      connections: [(i + 1) % 12, (i + 5) % 12, (i + 7) % 12],
    }))
  , []);

  // Algorithm symbols
  const symbols = ["Σ", "∫", "∞", "Δ", "λ", "∂", "π", "√"];

  if (shouldReduceMotion) {
    return (
      <div className="relative h-[500px] w-full flex items-center justify-center">
        <div className="relative w-80 h-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] via-[rgb(0,179,255)] to-[rgb(139,92,246)] opacity-30 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-80 shadow-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative h-[500px] w-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1200px" }}
    >
      {/* Background energy field */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(79,244,207,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 30%, rgba(0,179,255,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 70%, rgba(139,92,246,0.1) 0%, transparent 40%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer energy waves */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full border"
          style={{
            width: 280 + i * 60,
            height: 280 + i * 60,
            borderColor: i % 2 === 0 
              ? "rgba(79,244,207,0.2)" 
              : "rgba(0,179,255,0.15)",
            x: layer3X,
            y: layer3Y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Main container with 3D perspective */}
      <motion.div
        className="relative w-80 h-80"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        animate={{
          rotateZ: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
        }}
      >
        {/* Layer 1: Neural network connections (deepest) */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: layer1X,
            y: layer1Y,
            transformStyle: "preserve-3d",
            transform: "translateZ(-80px)",
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="-160 -160 320 320">
            {neuralNodes.map((node) =>
              node.connections.map((targetIdx) => {
                const target = neuralNodes[targetIdx];
                const isActive = activeNodes.includes(node.id) || activeNodes.includes(targetIdx);
                return (
                  <motion.line
                    key={`${node.id}-${targetIdx}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isActive ? "rgba(79,244,207,0.8)" : "rgba(79,244,207,0.15)"}
                    strokeWidth={isActive ? 2 : 0.5}
                    animate={{
                      opacity: isActive ? [0.5, 1, 0.5] : 0.2,
                      strokeWidth: isActive ? [1, 2.5, 1] : 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isActive ? Infinity : 0,
                    }}
                  />
                );
              })
            )}
            {neuralNodes.map((node) => (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={activeNodes.includes(node.id) ? 6 : 3}
                fill={activeNodes.includes(node.id) ? "rgb(79,244,207)" : "rgba(79,244,207,0.5)"}
                animate={{
                  r: activeNodes.includes(node.id) ? [4, 8, 4] : 3,
                  opacity: activeNodes.includes(node.id) ? [0.6, 1, 0.6] : 0.4,
                }}
                transition={{
                  duration: 0.6,
                  repeat: activeNodes.includes(node.id) ? Infinity : 0,
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Layer 2: DNA Helix structure */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            x: layer2X,
            y: layer2Y,
            transformStyle: "preserve-3d",
            transform: "translateZ(-40px)",
          }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {helixPoints.map((point) => (
            <motion.div
              key={`helix-${point.id}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -6,
                marginTop: -6,
                background: point.isLeft 
                  ? "linear-gradient(135deg, rgb(79,244,207), rgb(0,179,255))"
                  : "linear-gradient(135deg, rgb(139,92,246), rgb(236,72,153))",
                boxShadow: point.isLeft
                  ? "0 0 15px rgba(79,244,207,0.6)"
                  : "0 0 15px rgba(139,92,246,0.6)",
              }}
              animate={{
                x: [
                  Math.cos((point.angle * Math.PI) / 180) * 50,
                  Math.cos(((point.angle + 180) * Math.PI) / 180) * 50,
                  Math.cos((point.angle * Math.PI) / 180) * 50,
                ],
                y: point.y,
                z: [
                  Math.sin((point.angle * Math.PI) / 180) * 50,
                  Math.sin(((point.angle + 180) * Math.PI) / 180) * 50,
                  Math.sin((point.angle * Math.PI) / 180) * 50,
                ],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: point.id * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Layer 3: Orbital particles with trails */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: layer2X,
            y: layer2Y,
            transformStyle: "preserve-3d",
            transform: "translateZ(-20px)",
          }}
        >
          {orbitalParticles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: particle.size,
                height: particle.size,
                marginLeft: -particle.size / 2,
                marginTop: -particle.size / 2,
                background: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              animate={{
                x: [
                  Math.cos((particle.startAngle * Math.PI) / 180) * particle.orbitRadius,
                  Math.cos(((particle.startAngle + 360) * Math.PI) / 180) * particle.orbitRadius,
                ],
                y: [
                  Math.sin((particle.startAngle * Math.PI) / 180) * particle.orbitRadius,
                  Math.sin(((particle.startAngle + 360) * Math.PI) / 180) * particle.orbitRadius,
                ],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: particle.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Particle trail */}
              {particle.hasTrail && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: particle.size * 8,
                    height: particle.size,
                    left: -particle.size * 4,
                    background: `linear-gradient(90deg, transparent, ${particle.color}40)`,
                    transformOrigin: "right center",
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Layer 4: Quantum core (main sphere) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
          }}
        >
          {/* Core glow */}
          <motion.div
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(79,244,207,0.4) 0%, rgba(0,179,255,0.2) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main quantum sphere */}
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(139,92,246,0.3) 0%, transparent 50%),
                linear-gradient(135deg, rgb(79,244,207), rgb(0,179,255), rgb(139,92,246))
              `,
              boxShadow: `
                0 0 60px rgba(79,244,207,0.5),
                0 0 100px rgba(0,179,255,0.3),
                inset 0 0 30px rgba(255,255,255,0.2)
              `,
              transform: "translateZ(60px)",
            }}
            animate={{
              scale: isHovered ? [1, 1.08, 1] : [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner holographic lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`inner-line-${i}`}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{ top: `${(i + 1) * 12}%` }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Scanner beam */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 45%, rgba(255,255,255,0.4) 50%, transparent 55%)",
              }}
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Layer 5: Floating algorithm symbols */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: layer1X,
            y: layer1Y,
            transform: "translateZ(80px)",
          }}
        >
          {symbols.map((symbol, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-xl font-bold"
              style={{
                left: "50%",
                top: "50%",
                color: i % 2 === 0 ? "rgb(79,244,207)" : "rgb(139,92,246)",
                textShadow: `0 0 20px ${i % 2 === 0 ? "rgba(79,244,207,0.8)" : "rgba(139,92,246,0.8)"}`,
              }}
              animate={{
                x: Math.cos((i * 45 * Math.PI) / 180) * (120 + Math.sin(Date.now() / 1000 + i) * 20),
                y: Math.sin((i * 45 * Math.PI) / 180) * (120 + Math.sin(Date.now() / 1000 + i) * 20),
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 },
                rotate: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" },
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Holographic scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`scanline-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${(i / 30) * 100}%`,
              background: "linear-gradient(90deg, transparent, rgba(79,244,207,0.5), transparent)",
            }}
            animate={{
              opacity: [0, 0.5, 0],
              x: ["-10%", "10%", "-10%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Corner data streams */}
      {[0, 1, 2, 3].map((corner) => (
        <motion.div
          key={`corner-${corner}`}
          className="absolute w-1 overflow-hidden"
          style={{
            height: 60,
            left: corner < 2 ? "10%" : "auto",
            right: corner >= 2 ? "10%" : "auto",
            top: corner % 2 === 0 ? "10%" : "auto",
            bottom: corner % 2 === 1 ? "10%" : "auto",
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              background: `linear-gradient(${corner % 2 === 0 ? "180deg" : "0deg"}, rgb(79,244,207), transparent)`,
            }}
            animate={{
              y: corner % 2 === 0 ? ["-100%", "200%"] : ["200%", "-100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: corner * 0.5,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
