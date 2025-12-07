"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * CosmicPortal3D - Decorative portal visualization (experimental)
 * A mesmerizing wormhole with swirling galaxies,
 * gravitational lensing, and star particles
 */
export function CosmicPortal3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  // Portal rings with depth
  const portalRings = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 300 - i * 30,
      z: -i * 25,
      opacity: 0.8 - i * 0.08,
      hue: 200 + i * 20, // Cyan to purple gradient
      rotationSpeed: 15 + i * 2,
      direction: i % 2 === 0 ? 1 : -1,
    })), []
  );

  // Stars spiraling into the portal
  const spiralStars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 4; // Two full spirals
      const radius = 50 + i * 5;
      return {
        id: i,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(angle) * 10,
        endY: Math.sin(angle) * 10,
        size: 1 + Math.random() * 3,
        delay: (i / 40) * 3,
        duration: 3 + Math.random(),
      };
    }), []
  );

  // Background stars
  const bgStars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 500,
      size: Math.random() * 2 + 1,
      twinkle: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    })), []
  );

  // Energy tendrils
  const tendrils = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: (i / 6) * 360,
      length: 120 + Math.random() * 60,
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
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[500px]"
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
        {/* Background Stars */}
        {bgStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `calc(50% + ${star.x}px)`,
              top: `calc(50% + ${star.y}px)`,
              transform: "translateZ(-100px)",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.twinkle,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Outer Glow Nebula */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `
              radial-gradient(circle, 
                transparent 20%,
                rgba(99,102,241,0.1) 40%,
                rgba(168,85,247,0.15) 60%,
                rgba(236,72,153,0.1) 80%,
                transparent 100%
              )
            `,
            filter: "blur(30px)",
            transform: "translateZ(-80px)",
          }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity },
          }}
        />

        {/* Portal Rings */}
        {portalRings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `2px solid hsla(${ring.hue}, 80%, 60%, ${ring.opacity})`,
              boxShadow: `
                0 0 20px hsla(${ring.hue}, 80%, 60%, 0.3),
                inset 0 0 20px hsla(${ring.hue}, 80%, 60%, 0.1)
              `,
              transform: `translateZ(${ring.z}px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? {
              scale: 1,
              opacity: ring.opacity,
              rotate: 360 * ring.direction,
            } : {}}
            transition={{
              scale: { duration: 0.5, delay: ring.id * 0.08 },
              opacity: { duration: 0.5, delay: ring.id * 0.08 },
              rotate: { duration: ring.rotationSpeed, repeat: Infinity, ease: "linear" },
            }}
          />
        ))}

        {/* Portal Core - Event Horizon */}
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{
            background: `
              radial-gradient(circle,
                rgba(0,0,0,0.9) 0%,
                rgba(99,102,241,0.3) 50%,
                rgba(168,85,247,0.2) 70%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 60px rgba(99,102,241,0.5),
              0 0 100px rgba(168,85,247,0.3),
              inset 0 0 40px rgba(0,0,0,0.8)
            `,
            transform: "translateZ(-150px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 60px rgba(99,102,241,0.5), 0 0 100px rgba(168,85,247,0.3), inset 0 0 40px rgba(0,0,0,0.8)",
              "0 0 80px rgba(99,102,241,0.7), 0 0 120px rgba(168,85,247,0.5), inset 0 0 40px rgba(0,0,0,0.8)",
              "0 0 60px rgba(99,102,241,0.5), 0 0 100px rgba(168,85,247,0.3), inset 0 0 40px rgba(0,0,0,0.8)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Spiral Stars Being Pulled In */}
        {spiralStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            }}
            initial={{ 
              x: star.startX, 
              y: star.startY, 
              scale: 1, 
              opacity: 0 
            }}
            animate={isInView ? {
              x: [star.startX, star.endX],
              y: [star.startY, star.endY],
              scale: [1, 0.3],
              opacity: [0, 1, 1, 0],
            } : {}}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeIn",
            }}
          />
        ))}

        {/* Energy Tendrils */}
        {tendrils.map((tendril) => (
          <motion.div
            key={tendril.id}
            className="absolute h-1 origin-left"
            style={{
              width: tendril.length,
              background: "linear-gradient(90deg, rgba(168,85,247,0.6), rgba(99,102,241,0.3), transparent)",
              filter: "blur(2px)",
              transform: `rotate(${tendril.angle}deg) translateZ(10px)`,
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: tendril.id * 0.3,
            }}
          />
        ))}

        {/* Gravitational Lensing Effect */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: `
              inset 0 0 80px rgba(99,102,241,0.1),
              0 0 40px rgba(168,85,247,0.1)
            `,
            transform: "translateZ(-50px)",
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Accretion Disk */}
        <motion.div
          className="absolute w-[280px] h-[80px] rounded-full"
          style={{
            background: `
              linear-gradient(90deg,
                transparent,
                rgba(251,191,36,0.3),
                rgba(249,115,22,0.4),
                rgba(239,68,68,0.3),
                transparent
              )
            `,
            filter: "blur(8px)",
            transform: "rotateX(75deg) translateZ(0px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: isHighMotion ? 8 : 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Central White Flash */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-white"
          style={{
            boxShadow: "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)",
            transform: "translateZ(-120px)",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default CosmicPortal3D;
