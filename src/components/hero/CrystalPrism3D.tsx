"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * CrystalPrism3D - Decorative 3D refractive prism visualization
 * A stunning rotating crystal with light refraction, 
 * rainbow caustics, and particle emissions
 */
export function CrystalPrism3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-20, 20]);

  // Crystal facets
  const facets = useMemo(() => [
    { rotateY: 0, rotateX: 0, z: 60, color: "from-cyan-400/30 to-blue-500/30" },
    { rotateY: 72, rotateX: 15, z: 55, color: "from-purple-400/30 to-pink-500/30" },
    { rotateY: 144, rotateX: -10, z: 50, color: "from-emerald-400/30 to-teal-500/30" },
    { rotateY: 216, rotateX: 20, z: 55, color: "from-amber-400/30 to-orange-500/30" },
    { rotateY: 288, rotateX: -15, z: 60, color: "from-rose-400/30 to-red-500/30" },
  ], []);

  // Light rays
  const lightRays = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      length: 150 + (i % 3) * 50,
      color: [
        "rgba(239,68,68,0.4)",
        "rgba(249,115,22,0.4)",
        "rgba(234,179,8,0.4)",
        "rgba(34,197,94,0.4)",
        "rgba(34,211,238,0.4)",
        "rgba(99,102,241,0.4)",
        "rgba(168,85,247,0.4)",
        "rgba(236,72,153,0.4)",
      ][i],
      delay: i * 0.2,
    })), []
  );

  // Sparkle particles
  const sparkles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 350,
      z: (Math.random() - 0.5) * 100,
      size: 2 + Math.random() * 4,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 3,
    })), []
  );

  // Orbital rings
  const orbitalRings = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      size: 200 + i * 80,
      tilt: 60 + i * 10,
      duration: 20 + i * 8,
      direction: i % 2 === 0 ? 1 : -1,
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
      <div className="relative w-[600px] h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-48 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl" 
               style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[500px]"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Main Crystal Body */}
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 360 }}
          transition={{ duration: isHighMotion ? 25 : 40, repeat: Infinity, ease: "linear" }}
        >
          {/* Crystal Facets */}
          {facets.map((facet, i) => (
            <motion.div
              key={i}
              className={`absolute w-24 h-40 bg-gradient-to-b ${facet.color} backdrop-blur-md`}
              style={{
                transform: `rotateY(${facet.rotateY}deg) rotateX(${facet.rotateX}deg) translateZ(${facet.z}px)`,
                clipPath: "polygon(50% 0%, 100% 35%, 100% 85%, 50% 100%, 0% 85%, 0% 35%)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "inset 0 0 40px rgba(255,255,255,0.2), 0 0 30px rgba(139,92,246,0.3)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              {/* Internal refraction lines */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
                }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              />
            </motion.div>
          ))}

          {/* Crystal Top Cap */}
          <motion.div
            className="absolute w-20 h-20 bg-gradient-to-br from-white/40 to-cyan-400/20 backdrop-blur-md"
            style={{
              transform: "rotateX(90deg) translateZ(80px)",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              boxShadow: "0 0 30px rgba(34,211,238,0.5)",
            }}
          />

          {/* Crystal Core Glow */}
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8), rgba(139,92,246,0.4), transparent)",
              filter: "blur(8px)",
              transform: "translateZ(30px)",
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Rainbow Light Rays */}
        {lightRays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute h-1 origin-left"
            style={{
              width: ray.length,
              background: `linear-gradient(90deg, ${ray.color}, transparent)`,
              transform: `rotate(${ray.angle}deg) translateZ(20px)`,
              filter: "blur(2px)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? {
              scaleX: [0, 1, 0.8, 1, 0],
              opacity: [0, 0.8, 0.6, 0.8, 0],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: ray.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Orbital Rings */}
        {orbitalRings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full border border-white/20"
            style={{
              width: ring.size,
              height: ring.size,
              transform: `rotateX(${ring.tilt}deg) translateZ(-30px)`,
              boxShadow: "0 0 15px rgba(255,255,255,0.1)",
            }}
            animate={{ rotate: 360 * ring.direction }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {/* Orbiting particle */}
            <motion.div
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(139,92,246,0.6))",
                boxShadow: "0 0 15px rgba(139,92,246,0.8)",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
              }}
            />
          </motion.div>
        ))}

        {/* Sparkle Particles */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              transform: `translateX(${sparkle.x}px) translateY(${sparkle.y}px) translateZ(${sparkle.z}px)`,
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
            animate={isInView ? {
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            } : {}}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Caustic Light Patterns */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                rgba(239,68,68,0.3),
                rgba(249,115,22,0.3),
                rgba(234,179,8,0.3),
                rgba(34,197,94,0.3),
                rgba(34,211,238,0.3),
                rgba(99,102,241,0.3),
                rgba(168,85,247,0.3),
                rgba(236,72,153,0.3),
                rgba(239,68,68,0.3)
              )
            `,
            filter: "blur(40px)",
            transform: "rotateX(80deg) translateZ(-100px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Bottom reflection */}
        <motion.div
          className="absolute w-32 h-8 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(139,92,246,0.4), transparent)",
            transform: "rotateX(90deg) translateZ(-100px)",
            filter: "blur(15px)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default CrystalPrism3D;
