"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * NeuralSynapse3D - Decorative neural synapse visualization
 * A stunning visualization of neural connections with
 * firing synapses, pulsing nodes, and electric arcs
 */
export function NeuralSynapse3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 22 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  // Neural nodes in 3D space
  const nodes = useMemo(() => {
    const positions = [];
    // Central hub
    positions.push({ id: 0, x: 0, y: 0, z: 0, size: 30, layer: "core" });
    
    // Inner layer
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      positions.push({
        id: i + 1,
        x: Math.cos(angle) * 80,
        y: Math.sin(angle) * 80,
        z: (Math.random() - 0.5) * 40,
        size: 18 + Math.random() * 6,
        layer: "inner",
      });
    }
    
    // Outer layer
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
      positions.push({
        id: i + 7,
        x: Math.cos(angle) * 150,
        y: Math.sin(angle) * 150,
        z: (Math.random() - 0.5) * 80,
        size: 12 + Math.random() * 5,
        layer: "outer",
      });
    }
    
    return positions;
  }, []);

  // Synaptic connections
  const connections = useMemo(() => {
    const conns: Array<{id: number, from: number, to: number, strength: number}> = [];
    let id = 0;
    
    // Core to inner connections
    for (let i = 1; i <= 6; i++) {
      conns.push({ id: id++, from: 0, to: i, strength: 0.9 });
    }
    
    // Inner to inner connections
    for (let i = 1; i <= 6; i++) {
      const next = (i % 6) + 1;
      conns.push({ id: id++, from: i, to: next, strength: 0.6 });
    }
    
    // Inner to outer connections
    for (let i = 1; i <= 6; i++) {
      conns.push({ id: id++, from: i, to: 6 + i, strength: 0.7 });
      conns.push({ id: id++, from: i, to: 6 + ((i % 12) + 1), strength: 0.5 });
    }
    
    return conns;
  }, []);

  // Firing signals
  const signals = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      connectionIndex: i % connections.length,
      duration: 0.8 + Math.random() * 0.6,
      delay: Math.random() * 4,
      size: 4 + Math.random() * 3,
    })), [connections.length]
  );

  // Electric arc particles
  const arcParticles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      nodeId: i % nodes.length,
      angle: (Math.random() * Math.PI * 2),
      distance: 15 + Math.random() * 25,
      size: 2 + Math.random() * 2,
      duration: 0.3 + Math.random() * 0.4,
      delay: Math.random() * 3,
    })), [nodes.length]
  );

  // Ambient energy particles
  const energyField = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 380,
      y: (Math.random() - 0.5) * 380,
      z: (Math.random() - 0.5) * 150,
      size: 2 + Math.random() * 3,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 3,
    })), []
  );

  useEffect(() => {
    if (!hasMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasMotion]);

  useEffect(() => {
    if (!hasMotion || !containerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  if (!hasMotion) {
    return (
      <div className="relative w-[420px] h-[420px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-violet-400/20 to-cyan-400/20 blur-2xl rounded-full" />
        </div>
      </div>
    );
  }

  const getNodeColor = (layer: string) => {
    switch (layer) {
      case "core": return "from-violet-400 via-purple-500 to-fuchsia-500";
      case "inner": return "from-cyan-400 via-blue-500 to-indigo-500";
      case "outer": return "from-emerald-400 via-teal-500 to-cyan-500";
      default: return "from-white/50 to-white/30";
    }
  };

  const getNodeGlow = (layer: string) => {
    switch (layer) {
      case "core": return "rgba(168,85,247,0.8)";
      case "inner": return "rgba(34,211,238,0.6)";
      case "outer": return "rgba(16,185,129,0.5)";
      default: return "rgba(255,255,255,0.4)";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[420px] h-[420px]"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Slow rotation for the whole network */}
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateZ: isHighMotion ? 360 : 0 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Synaptic connections */}
          {connections.map((conn) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            const midZ = (fromNode.z + toNode.z) / 2;
            
            return (
              <motion.div
                key={conn.id}
                className="absolute origin-left"
                style={{
                  width: length,
                  height: 2,
                  left: fromNode.x,
                  top: fromNode.y,
                  transform: `translateZ(${midZ}px) rotate(${angle}deg)`,
                  background: `linear-gradient(90deg, 
                    rgba(139,92,246,${conn.strength * 0.6}), 
                    rgba(34,211,238,${conn.strength * 0.4}), 
                    rgba(139,92,246,${conn.strength * 0.6}))`,
                  boxShadow: `0 0 8px rgba(139,92,246,${conn.strength * 0.4})`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: conn.strength } : {}}
                transition={{ delay: 0.3 + conn.id * 0.05, duration: 0.4 }}
              />
            );
          })}

          {/* Neural nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="absolute rounded-full"
              style={{
                width: node.size,
                height: node.size,
                left: node.x - node.size / 2,
                top: node.y - node.size / 2,
                transform: `translateZ(${node.z}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {/* Node core */}
              <motion.div
                className={`w-full h-full rounded-full bg-gradient-to-br ${getNodeColor(node.layer)}`}
                style={{
                  boxShadow: `0 0 ${node.size}px ${getNodeGlow(node.layer)}, inset 0 0 ${node.size/2}px rgba(255,255,255,0.3)`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 ${node.size}px ${getNodeGlow(node.layer)}, inset 0 0 ${node.size/2}px rgba(255,255,255,0.3)`,
                    `0 0 ${node.size * 1.5}px ${getNodeGlow(node.layer)}, inset 0 0 ${node.size/2}px rgba(255,255,255,0.5)`,
                    `0 0 ${node.size}px ${getNodeGlow(node.layer)}, inset 0 0 ${node.size/2}px rgba(255,255,255,0.3)`,
                  ],
                }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
              />
              
              {/* Pulse ring for core node */}
              {node.layer === "core" && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-violet-400/50"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}

          {/* Firing signals along connections */}
          {signals.map((signal) => {
            const conn = connections[signal.connectionIndex];
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            
            return (
              <motion.div
                key={signal.id}
                className="absolute rounded-full"
                style={{
                  width: signal.size,
                  height: signal.size,
                  background: "radial-gradient(circle, rgba(255,255,255,1), rgba(139,92,246,0.8))",
                  boxShadow: "0 0 15px rgba(139,92,246,0.8), 0 0 30px rgba(34,211,238,0.5)",
                }}
                animate={isInView ? {
                  x: [fromNode.x, toNode.x],
                  y: [fromNode.y, toNode.y],
                  z: [fromNode.z, toNode.z],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1.2, 0.5],
                } : {}}
                transition={{
                  duration: signal.duration,
                  repeat: Infinity,
                  delay: signal.delay,
                  repeatDelay: 1 + Math.random() * 2,
                }}
              />
            );
          })}

          {/* Electric arc particles */}
          {arcParticles.map((arc) => {
            const node = nodes[arc.nodeId];
            return (
              <motion.div
                key={arc.id}
                className="absolute rounded-full"
                style={{
                  width: arc.size,
                  height: arc.size,
                  background: "rgba(34,211,238,0.9)",
                  boxShadow: "0 0 8px rgba(34,211,238,0.7)",
                }}
                animate={isInView ? {
                  x: [
                    node.x,
                    node.x + Math.cos(arc.angle) * arc.distance,
                    node.x + Math.cos(arc.angle + 0.5) * (arc.distance * 0.7),
                  ],
                  y: [
                    node.y,
                    node.y + Math.sin(arc.angle) * arc.distance,
                    node.y + Math.sin(arc.angle + 0.5) * (arc.distance * 0.7),
                  ],
                  z: [node.z, node.z + 20, node.z - 10],
                  opacity: [0, 1, 0],
                } : {}}
                transition={{
                  duration: arc.duration,
                  repeat: Infinity,
                  delay: arc.delay,
                  repeatDelay: 2 + Math.random() * 3,
                }}
              />
            );
          })}
        </motion.div>

        {/* Ambient energy field */}
        {energyField.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: "rgba(139,92,246,0.6)",
              boxShadow: "0 0 8px rgba(139,92,246,0.4)",
              transform: `translateX(${particle.x}px) translateY(${particle.y}px) translateZ(${particle.z}px)`,
            }}
            animate={isInView ? {
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
            } : {}}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)",
            filter: "blur(25px)",
            transform: "translateZ(-60px)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default NeuralSynapse3D;
