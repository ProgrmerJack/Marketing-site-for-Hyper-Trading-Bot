"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Neural Web 3D - Research Page
 * Interconnected neural network with research paper nodes
 * Represents the ML model factory and strategy connections
 */
export function NeuralWeb3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  // Neural network nodes representing research areas
  const nodes = [
    { id: "ml", label: "ML Models", x: 0, y: 0, color: "rgb(99,102,241)", size: 60 },
    { id: "quant", label: "Quant", x: -120, y: -80, color: "rgb(34,211,238)", size: 40 },
    { id: "risk", label: "Risk", x: 120, y: -80, color: "rgb(239,68,68)", size: 40 },
    { id: "data", label: "Data", x: -140, y: 60, color: "rgb(52,211,153)", size: 35 },
    { id: "exec", label: "Execution", x: 140, y: 60, color: "rgb(168,85,247)", size: 35 },
    { id: "sig1", label: "", x: -60, y: -120, color: "rgb(79,244,207)", size: 20 },
    { id: "sig2", label: "", x: 60, y: -120, color: "rgb(79,244,207)", size: 20 },
    { id: "sig3", label: "", x: -180, y: -20, color: "rgb(59,130,246)", size: 18 },
    { id: "sig4", label: "", x: 180, y: -20, color: "rgb(59,130,246)", size: 18 },
  ];

  // Connections between nodes
  const connections = [
    { from: "ml", to: "quant" },
    { from: "ml", to: "risk" },
    { from: "ml", to: "data" },
    { from: "ml", to: "exec" },
    { from: "quant", to: "sig1" },
    { from: "quant", to: "sig2" },
    { from: "risk", to: "sig2" },
    { from: "data", to: "sig3" },
    { from: "exec", to: "sig4" },
    { from: "sig1", to: "sig2" },
    { from: "sig3", to: "data" },
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
      mouseX.set(x * 15);
      mouseY.set(y * 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  // Static fallback
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
            {/* Static central node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1600px" }}
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
          className="relative w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Connection lines */}
          <svg 
            className="absolute inset-0 w-full h-full overflow-visible"
            style={{ transform: "translateZ(10px)" }}
            viewBox="-225 -175 450 350"
          >
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99,102,241,0.6)" />
                <stop offset="50%" stopColor="rgba(79,244,207,0.8)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
              </linearGradient>
              <filter id="neuralGlow">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {connections.map((conn, i) => {
              const fromNode = getNodeById(conn.from);
              const toNode = getNodeById(conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={`conn-${i}`}>
                  {/* Base connection line */}
                  <motion.line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                  {/* Animated pulse along connection */}
                  <motion.line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="url(#neuralGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#neuralGlow)"
                    strokeDasharray="20 100"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -120 }}
                    transition={{
                      duration: isHighMotion ? 2 : 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Neural nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
                zIndex: node.size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 200,
              }}
            >
              {/* Node glow */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${node.color}60, transparent 70%)`,
                  filter: "blur(10px)",
                  transform: `translateZ(${-10 - index * 2}px)`,
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: isHighMotion ? 2 : 3,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
              />

              {/* Node sphere */}
              <motion.div
                className="relative rounded-full"
                style={{
                  width: node.size,
                  height: node.size,
                  background: `radial-gradient(circle at 30% 30%, ${node.color}, ${node.color}90)`,
                  boxShadow: `0 0 ${node.size / 2}px ${node.color}80, inset 0 0 ${node.size / 4}px rgba(255,255,255,0.3)`,
                  transform: `translateZ(${20 + index * 3}px)`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 ${node.size / 2}px ${node.color}80, inset 0 0 ${node.size / 4}px rgba(255,255,255,0.3)`,
                    `0 0 ${node.size}px ${node.color}, inset 0 0 ${node.size / 3}px rgba(255,255,255,0.5)`,
                    `0 0 ${node.size / 2}px ${node.color}80, inset 0 0 ${node.size / 4}px rgba(255,255,255,0.3)`,
                  ],
                }}
                transition={{
                  duration: isHighMotion ? 2 : 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {/* Inner reflection */}
                <div 
                  className="absolute top-1 left-1 w-1/3 h-1/3 rounded-full bg-white/40 blur-sm"
                />
              </motion.div>

              {/* Node label */}
              {node.label && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold"
                  style={{
                    color: node.color,
                    top: `${node.size + 8}px`,
                    textShadow: `0 0 10px ${node.color}`,
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {node.label}
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Floating data particles */}
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 80 + Math.random() * 100;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/70"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius * 0.5,
                    Math.cos(angle + Math.PI) * radius,
                    Math.cos(angle) * radius * 0.5,
                  ],
                  y: [
                    Math.sin(angle) * radius * 0.5,
                    Math.sin(angle + Math.PI) * radius,
                    Math.sin(angle) * radius * 0.5,
                  ],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Central brain pulse */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
              transform: "translateZ(-20px)",
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Mathematical equation particles (floating symbols) */}
          {["∑", "∫", "∂", "π", "λ", "Σ"].map((symbol, i) => (
            <motion.div
              key={`math-${i}`}
              className="absolute text-indigo-400/50 font-mono text-lg"
              style={{
                left: `${20 + i * 15}%`,
                top: `${15 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.1), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default NeuralWeb3D;
