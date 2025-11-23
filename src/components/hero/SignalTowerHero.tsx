"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Signal Tower Hero - 3D Animated Transmission Tower
 * Represents communication, connection, and signal transmission
 */
export function SignalTowerHero() {
  const { shouldReduceMotion } = useMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 10, y: y * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div ref={containerRef} className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative w-[200px] h-[400px] flex items-center justify-center"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Central Tower Structure */}
        <div className="absolute bottom-0 w-4 h-[300px] bg-gradient-to-t from-blue-600 to-cyan-400 transform-style-3d">
           <div className="absolute inset-0 bg-blue-500 blur-sm opacity-50" />
        </div>
        
        {/* Base Platform */}
        <div 
          className="absolute bottom-0 w-32 h-32 border-4 border-blue-500/30 rounded-full bg-blue-900/20"
          style={{ transform: "rotateX(90deg) translateZ(-150px)" }}
        />

        {/* Emitting Rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ 
              transform: "rotateX(70deg)",
              top: "20%"
            }}
            animate={{
              scale: [0.2, 2.5],
              opacity: [0.8, 0],
              z: [0, 100]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Satellites */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`sat-${i}`}
            className="absolute w-full h-full"
            animate={{ rotateY: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div 
              className="absolute w-4 h-4 bg-[rgb(var(--card))/0.12] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ 
                transform: `rotateY(${i * 120}deg) translateZ(${100 + i * 20}px)`,
                top: `${20 + i * 30}%`
              }}
            />
            <div 
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{ 
                transform: `rotateY(${i * 120}deg) translateZ(${100 + i * 20}px)`,
                top: `${20 + i * 30}%`,
                width: "100px",
                left: "50%",
                marginLeft: "-50px"
              }}
            />
          </motion.div>
        ))}

        {/* Top Beacon */}
        <motion.div 
          className="absolute top-[50px] w-6 h-6 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
