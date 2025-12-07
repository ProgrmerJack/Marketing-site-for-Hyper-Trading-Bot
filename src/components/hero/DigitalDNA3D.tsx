"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * DigitalDNA3D - Decorative DNA helix visualization
 * A stunning double helix with base pairs,
 * flowing data, and bioluminescent particles
 */
export function DigitalDNA3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  // DNA helix points
  const helixPoints = useMemo(() => {
    const points = [];
    const segments = 24;
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 4; // Two full rotations
      const y = (t - 0.5) * 400; // Vertical spread
      
      // Strand 1
      points.push({
        id: `s1-${i}`,
        x: Math.cos(angle) * 60,
        y,
        z: Math.sin(angle) * 60,
        strand: 1,
        baseColor: ["cyan", "blue", "purple", "pink"][i % 4],
      });
      
      // Strand 2 (opposite phase)
      points.push({
        id: `s2-${i}`,
        x: Math.cos(angle + Math.PI) * 60,
        y,
        z: Math.sin(angle + Math.PI) * 60,
        strand: 2,
        baseColor: ["emerald", "teal", "green", "lime"][i % 4],
      });
    }
    return points;
  }, []);

  // Base pairs connecting the strands
  const basePairs = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      y: (i / 11 - 0.5) * 350,
      delay: i * 0.1,
    })), []
  );

  // Flowing particles along the helix
  const flowParticles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startOffset: i / 20,
      size: 3 + Math.random() * 4,
      strand: i % 2 + 1,
      duration: 4 + Math.random() * 2,
    })), []
  );

  // Bioluminescent ambient particles
  const bioParticles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 450,
      z: (Math.random() - 0.5) * 150,
      size: 2 + Math.random() * 3,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 3,
      hue: 180 + Math.random() * 60, // Cyan to blue range
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
      <div className="relative w-[400px] h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-64 bg-gradient-to-b from-cyan-400/20 to-emerald-400/20 blur-xl rounded-full" />
        </div>
      </div>
    );
  }

  const getBaseColor = (color: string) => {
    const colors: Record<string, string> = {
      cyan: "rgba(34,211,238,0.9)",
      blue: "rgba(59,130,246,0.9)",
      purple: "rgba(168,85,247,0.9)",
      pink: "rgba(236,72,153,0.9)",
      emerald: "rgba(16,185,129,0.9)",
      teal: "rgba(20,184,166,0.9)",
      green: "rgba(34,197,94,0.9)",
      lime: "rgba(132,204,22,0.9)",
    };
    return colors[color] || "rgba(255,255,255,0.9)";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[500px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Main rotating helix container */}
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 360 }}
          transition={{ duration: isHighMotion ? 20 : 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Helix backbone strands */}
          {[1, 2].map((strand) => (
            <motion.div
              key={strand}
              className="absolute w-1 h-[400px] rounded-full"
              style={{
                background: strand === 1 
                  ? "linear-gradient(to bottom, rgba(34,211,238,0.8), rgba(59,130,246,0.8), rgba(168,85,247,0.8))"
                  : "linear-gradient(to bottom, rgba(16,185,129,0.8), rgba(20,184,166,0.8), rgba(34,197,94,0.8))",
                boxShadow: strand === 1
                  ? "0 0 20px rgba(34,211,238,0.5)"
                  : "0 0 20px rgba(16,185,129,0.5)",
                transform: `translateX(${strand === 1 ? -60 : 60}px) translateZ(0px)`,
                filter: "blur(0.5px)",
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: strand * 0.2 }}
            />
          ))}

          {/* Helix points (nucleotides) */}
          {helixPoints.map((point, i) => (
            <motion.div
              key={point.id}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: getBaseColor(point.baseColor),
                boxShadow: `0 0 15px ${getBaseColor(point.baseColor)}`,
                transform: `translateX(${point.x}px) translateY(${point.y}px) translateZ(${point.z}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            />
          ))}

          {/* Base pairs (connecting rungs) */}
          {basePairs.map((pair) => (
            <motion.div
              key={pair.id}
              className="absolute w-[100px] h-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, rgba(34,211,238,0.6), rgba(255,255,255,0.8), rgba(16,185,129,0.6))",
                boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                transform: `translateY(${pair.y}px) translateZ(0px)`,
                left: "-50px",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 0.8 } : {}}
              transition={{ delay: pair.delay + 0.5, duration: 0.4 }}
            />
          ))}

          {/* Flowing particles along helix */}
          {flowParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.strand === 1 
                  ? "rgba(34,211,238,1)" 
                  : "rgba(16,185,129,1)",
                boxShadow: particle.strand === 1
                  ? "0 0 15px rgba(34,211,238,0.8)"
                  : "0 0 15px rgba(16,185,129,0.8)",
              }}
              animate={isInView ? {
                y: [-200, 200],
                x: [
                  Math.cos(particle.startOffset * Math.PI * 4) * 60 * (particle.strand === 1 ? 1 : -1),
                  Math.cos((particle.startOffset + 2) * Math.PI * 4) * 60 * (particle.strand === 1 ? 1 : -1),
                ],
                z: [
                  Math.sin(particle.startOffset * Math.PI * 4) * 60,
                  Math.sin((particle.startOffset + 2) * Math.PI * 4) * 60,
                ],
              } : {}}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.startOffset * particle.duration,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Bioluminescent ambient particles */}
        {bioParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: `hsla(${particle.hue}, 80%, 60%, 0.8)`,
              boxShadow: `0 0 10px hsla(${particle.hue}, 80%, 60%, 0.5)`,
              transform: `translateX(${particle.x}px) translateY(${particle.y}px) translateZ(${particle.z}px)`,
            }}
            animate={isInView ? {
              opacity: [0, 0.8, 0],
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
          className="absolute w-24 h-[350px] rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(34,211,238,0.15), rgba(168,85,247,0.1), rgba(16,185,129,0.15))",
            filter: "blur(30px)",
            transform: "translateZ(-50px)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default DigitalDNA3D;
