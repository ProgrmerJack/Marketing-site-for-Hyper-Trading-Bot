"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Crypto Vault Hero - 3D Animated Secure Vault
 * Represents security, value, and the profit-share model
 */
export function CryptoVaultHero() {
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
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div ref={containerRef} className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        className="relative w-64 h-64"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-amber-500/30 border-dashed"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(-20px)" }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-yellow-500/40"
          animate={{ rotateZ: -360, rotateX: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Inner Core (The "Vault") */}
        <motion.div
          className="absolute inset-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl shadow-[0_0_50px_rgba(245,158,11,0.5)] flex items-center justify-center"
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        >
          <div className="text-4xl font-bold text-white drop-shadow-md">$</div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]"
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              z: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{ left: "50%", top: "50%" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
