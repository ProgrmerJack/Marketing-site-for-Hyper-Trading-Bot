"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * NeonHologram3D - Decorative/experimental holographic display
 * A stunning cyberpunk hologram with rotating data rings, 
 * floating glyphs, and pulsing energy waves
 */
export function NeonHologram3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const hasMotion = motionLevel !== "minimal";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);

  // Generate holographic ring data
  const holoRings = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: 180 + i * 60,
      rotateX: 70 - i * 8,
      duration: 12 + i * 3,
      delay: i * 0.3,
      opacity: 0.6 - i * 0.08,
      color: i % 2 === 0 ? "cyan" : "blue",
    })), []
  );

  // Floating data fragments
  const dataFragments = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: ["▲", "◆", "●", "■", "◯", "△", "□", "⬡", "⬢", "◇"][i % 10],
      x: Math.cos((i / 20) * Math.PI * 2) * (120 + (i % 3) * 40),
      y: Math.sin((i / 20) * Math.PI * 2) * (80 + (i % 4) * 25),
      z: -60 + (i % 5) * 30,
      delay: i * 0.15,
      duration: 3 + (i % 3),
    })), []
  );

  // Energy pulses
  const energyPulses = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      scale: 1 + i * 0.3,
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
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl" />
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
        {/* Central Holographic Core */}
        <motion.div
          className="absolute w-32 h-32"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Rotating inner cube */}
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: 360, rotateX: 180 }}
            transition={{ duration: isHighMotion ? 15 : 25, repeat: Infinity, ease: "linear" }}
          >
            {/* Cube faces */}
            {[
              { rotateY: 0, z: 40 },
              { rotateY: 180, z: 40 },
              { rotateY: 90, z: 40 },
              { rotateY: -90, z: 40 },
              { rotateX: 90, z: 40 },
              { rotateX: -90, z: 40 },
            ].map((face, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm"
                style={{
                  transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.z}px)`,
                  boxShadow: "inset 0 0 30px rgba(34,211,238,0.3), 0 0 20px rgba(34,211,238,0.2)",
                }}
                animate={{
                  borderColor: ["rgba(34,211,238,0.5)", "rgba(99,102,241,0.5)", "rgba(34,211,238,0.5)"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>

          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)",
              filter: "blur(10px)",
              transform: "translateZ(20px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Holographic Rings */}
        {holoRings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `2px solid ${ring.color === "cyan" ? "rgba(34,211,238,0.4)" : "rgba(99,102,241,0.4)"}`,
              boxShadow: `0 0 20px ${ring.color === "cyan" ? "rgba(34,211,238,0.3)" : "rgba(99,102,241,0.3)"}`,
              transform: `rotateX(${ring.rotateX}deg) translateZ(${-ring.id * 15}px)`,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? {
              opacity: ring.opacity,
              scale: 1,
              rotate: ring.id % 2 === 0 ? 360 : -360,
            } : {}}
            transition={{
              opacity: { duration: 0.5, delay: ring.delay },
              scale: { duration: 0.5, delay: ring.delay },
              rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
            }}
          >
            {/* Ring glow particles */}
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ring.color === "cyan" 
                    ? "radial-gradient(circle, rgba(34,211,238,1), transparent)" 
                    : "radial-gradient(circle, rgba(99,102,241,1), transparent)",
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(${ring.size / 2}px) translateY(-50%)`,
                  boxShadow: `0 0 10px ${ring.color === "cyan" ? "rgba(34,211,238,0.8)" : "rgba(99,102,241,0.8)"}`,
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: angle / 360 }}
              />
            ))}
          </motion.div>
        ))}

        {/* Floating Data Fragments */}
        {dataFragments.map((frag) => (
          <motion.div
            key={frag.id}
            className="absolute text-cyan-400 font-mono text-xs"
            style={{
              textShadow: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)",
              transform: `translateX(${frag.x}px) translateY(${frag.y}px) translateZ(${frag.z}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? {
              opacity: [0, 0.8, 0.8, 0],
              y: [frag.y, frag.y - 30, frag.y - 30, frag.y],
            } : {}}
            transition={{
              duration: frag.duration,
              repeat: Infinity,
              delay: frag.delay,
              ease: "easeInOut",
            }}
          >
            {frag.char}
          </motion.div>
        ))}

        {/* Energy Pulse Waves */}
        {energyPulses.map((pulse) => (
          <motion.div
            key={pulse.id}
            className="absolute w-64 h-64 rounded-full border border-cyan-400/30"
            style={{
              transform: `rotateX(70deg) translateZ(-20px) scale(${pulse.scale})`,
              boxShadow: "0 0 30px rgba(34,211,238,0.2)",
            }}
            animate={isInView ? {
              scale: [pulse.scale, pulse.scale * 2, pulse.scale * 2.5],
              opacity: [0.5, 0.2, 0],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: pulse.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Vertical Light Beam */}
        <motion.div
          className="absolute w-1 h-[300px]"
          style={{
            background: "linear-gradient(to top, transparent, rgba(34,211,238,0.6), transparent)",
            transform: "translateZ(30px)",
            filter: "blur(2px)",
          }}
          animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Scanner Line */}
        <motion.div
          className="absolute w-full h-0.5"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
            boxShadow: "0 0 20px rgba(34,211,238,0.6)",
            transform: "translateZ(50px)",
          }}
          animate={{ y: [-100, 100, -100] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Corner Brackets */}
        {[
          { x: -180, y: -120, rotate: 0 },
          { x: 180, y: -120, rotate: 90 },
          { x: 180, y: 120, rotate: 180 },
          { x: -180, y: 120, rotate: 270 },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8"
            style={{
              transform: `translateX(${corner.x}px) translateY(${corner.y}px) translateZ(60px) rotate(${corner.rotate}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400" style={{ boxShadow: "0 0 10px rgba(34,211,238,0.8)" }} />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-cyan-400" style={{ boxShadow: "0 0 10px rgba(34,211,238,0.8)" }} />
          </motion.div>
        ))}

        {/* Ambient glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)",
            filter: "blur(40px)",
            transform: "translateZ(-50px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

export default NeonHologram3D;
