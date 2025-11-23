"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Holographic Book Hero - 3D Animated Book/Tablet
 * Represents knowledge, research, and insights
 */
export function HolographicBookHero() {
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
        className="relative w-[300px] h-[400px]"
        style={{
          rotateY: -20 + mousePosition.x,
          rotateX: 10 - mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back Cover */}
        <div 
          className="absolute inset-0 bg-orange-600 rounded-r-lg shadow-xl"
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Pages Block */}
        <div 
          className="absolute inset-y-2 left-0 right-2 bg-[rgb(var(--card))/0.06] rounded-r-sm"
          style={{ transform: "translateZ(-5px)" }}
        />

        {/* Front Cover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-r-lg border-l-4 border-orange-700 origin-left shadow-2xl flex items-center justify-center overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Holographic Content */}
          <div className="absolute inset-4 border-2 border-orange-300/30 rounded-lg flex flex-col gap-4 p-4">
            <div className="h-4 w-3/4 bg-orange-200/50 rounded animate-pulse" />
            <div className="h-2 w-full bg-orange-200/30 rounded" />
            <div className="h-2 w-full bg-orange-200/30 rounded" />
            <div className="h-2 w-5/6 bg-orange-200/30 rounded" />
            
            {/* Floating Hologram */}
            <motion.div 
              className="mt-8 h-32 w-full bg-gradient-to-t from-orange-400/20 to-transparent rounded-lg border border-orange-400/30 relative overflow-hidden"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
               <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] translate-y-[-100%] animate-[scan_2s_linear_infinite]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
            style={{ 
              left: `${20 + Math.random() * 60}%`, 
              top: "20%",
              transform: "translateZ(50px)"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
