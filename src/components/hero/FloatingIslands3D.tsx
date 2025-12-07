"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * FloatingIslands3D - Decorative floating islands visualization
 * Magical floating islands with waterfalls, crystals,
 * and ethereal connections
 */
export function FloatingIslands3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);

  // Floating islands configuration
  const islands = useMemo(() => [
    { 
      id: 1, 
      x: 0, 
      y: 0, 
      z: 0, 
      size: 120, 
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      glowColor: "rgba(16,185,129,0.4)",
      floatDuration: 4,
      floatDelay: 0,
    },
    { 
      id: 2, 
      x: -100, 
      y: -80, 
      z: 40, 
      size: 80, 
      color: "from-purple-400 via-violet-500 to-indigo-600",
      glowColor: "rgba(139,92,246,0.4)",
      floatDuration: 5,
      floatDelay: 1,
    },
    { 
      id: 3, 
      x: 100, 
      y: -60, 
      z: 30, 
      size: 90, 
      color: "from-amber-400 via-orange-500 to-red-500",
      glowColor: "rgba(251,191,36,0.4)",
      floatDuration: 4.5,
      floatDelay: 0.5,
    },
    { 
      id: 4, 
      x: -60, 
      y: 100, 
      z: -20, 
      size: 60, 
      color: "from-rose-400 via-pink-500 to-fuchsia-600",
      glowColor: "rgba(244,114,182,0.4)",
      floatDuration: 5.5,
      floatDelay: 2,
    },
    { 
      id: 5, 
      x: 80, 
      y: 80, 
      z: -10, 
      size: 70, 
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      glowColor: "rgba(34,211,238,0.4)",
      floatDuration: 4.2,
      floatDelay: 1.5,
    },
  ], []);

  // Crystals on islands
  const crystals = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      islandId: (i % 5) + 1,
      offsetX: (Math.random() - 0.5) * 40,
      offsetY: -20 - Math.random() * 30,
      height: 15 + Math.random() * 25,
      rotation: Math.random() * 30 - 15,
      hue: 260 + Math.random() * 60,
      delay: i * 0.1,
    })), []
  );

  // Waterfall particles
  const waterfallParticles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      islandId: (i % 3) + 1, // Only on first 3 islands
      x: (Math.random() - 0.5) * 30,
      size: 2 + Math.random() * 3,
      duration: 1.5 + Math.random(),
      delay: Math.random() * 2,
    })), []
  );

  // Energy bridges between islands
  const bridges = useMemo(() => [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 5 },
  ], []);

  // Floating particles around islands
  const ambientParticles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 350,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 150,
      size: 2 + Math.random() * 4,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 4,
      hue: [160, 280, 30, 340, 200][i % 5],
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
      <div className="relative w-[450px] h-[450px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-purple-400/20 blur-2xl rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-[450px] h-[450px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Energy bridges */}
        {bridges.map((bridge, i) => {
          const fromIsland = islands.find(isl => isl.id === bridge.from)!;
          const toIsland = islands.find(isl => isl.id === bridge.to)!;
          const dx = toIsland.x - fromIsland.x;
          const dy = toIsland.y - fromIsland.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          return (
            <motion.div
              key={i}
              className="absolute h-[2px] origin-left"
              style={{
                width: length,
                background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)",
                transform: `translateX(${fromIsland.x}px) translateY(${fromIsland.y}px) translateZ(${(fromIsland.z + toIsland.z) / 2}px) rotate(${angle}deg)`,
                boxShadow: "0 0 15px rgba(139,92,246,0.5)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
            />
          );
        })}

        {/* Islands */}
        {islands.map((island) => (
          <motion.div
            key={island.id}
            className="absolute"
            style={{
              transform: `translateX(${island.x}px) translateY(${island.y}px) translateZ(${island.z}px)`,
              transformStyle: "preserve-3d",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: 1, 
              opacity: 1,
              y: [island.y - 10, island.y + 10, island.y - 10],
            } : {}}
            transition={{
              scale: { delay: island.id * 0.15, duration: 0.5 },
              opacity: { delay: island.id * 0.15, duration: 0.3 },
              y: { duration: island.floatDuration, repeat: Infinity, delay: island.floatDelay },
            }}
          >
            {/* Island base - top surface */}
            <div
              className={`rounded-full bg-gradient-to-br ${island.color}`}
              style={{
                width: island.size,
                height: island.size * 0.6,
                transform: "rotateX(60deg)",
                boxShadow: `0 0 40px ${island.glowColor}, inset 0 -10px 20px rgba(0,0,0,0.3)`,
              }}
            />
            
            {/* Island underside */}
            <div
              className="absolute rounded-b-[50%]"
              style={{
                width: island.size * 0.8,
                height: island.size * 0.5,
                left: island.size * 0.1,
                top: island.size * 0.2,
                background: "linear-gradient(to bottom, rgba(50,30,20,0.9), rgba(30,20,10,0.7))",
                transform: "translateZ(-30px)",
              }}
            />

            {/* Trees/vegetation effect */}
            {island.id <= 3 && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: island.size * 0.4,
                  height: island.size * 0.5,
                  left: island.size * 0.3,
                  top: -island.size * 0.3,
                  background: "radial-gradient(ellipse at bottom, rgba(16,185,129,0.8), rgba(5,150,105,0.6), transparent)",
                  filter: "blur(2px)",
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}

            {/* Crystals on this island */}
            {crystals
              .filter(c => c.islandId === island.id)
              .map((crystal) => (
                <motion.div
                  key={crystal.id}
                  className="absolute"
                  style={{
                    width: 8,
                    height: crystal.height,
                    left: island.size / 2 + crystal.offsetX,
                    top: crystal.offsetY,
                    background: `linear-gradient(to top, hsla(${crystal.hue}, 80%, 60%, 0.9), hsla(${crystal.hue}, 90%, 80%, 0.6))`,
                    clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                    transform: `rotateZ(${crystal.rotation}deg)`,
                    boxShadow: `0 0 15px hsla(${crystal.hue}, 80%, 60%, 0.5)`,
                  }}
                  animate={isInView ? { 
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: crystal.delay,
                  }}
                />
              ))}
          </motion.div>
        ))}

        {/* Waterfall particles */}
        {waterfallParticles.map((particle) => {
          const island = islands.find(i => i.id === particle.islandId)!;
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: "rgba(147,197,253,0.8)",
                boxShadow: "0 0 8px rgba(147,197,253,0.6)",
              }}
              animate={isInView ? {
                x: [island.x + particle.x, island.x + particle.x + (Math.random() - 0.5) * 20],
                y: [island.y + 30, island.y + 150],
                opacity: [0.8, 0],
                scale: [1, 0.3],
              } : {}}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeIn",
              }}
            />
          );
        })}

        {/* Ambient magical particles */}
        {ambientParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: `hsla(${particle.hue}, 80%, 70%, 0.7)`,
              boxShadow: `0 0 10px hsla(${particle.hue}, 80%, 70%, 0.5)`,
              transform: `translateX(${particle.x}px) translateY(${particle.y}px) translateZ(${particle.z}px)`,
            }}
            animate={isInView ? {
              y: [particle.y, particle.y - 30, particle.y],
              opacity: [0.3, 0.8, 0.3],
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
          className="absolute w-48 h-48 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)",
            filter: "blur(20px)",
            transform: "translateZ(-80px)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default FloatingIslands3D;
