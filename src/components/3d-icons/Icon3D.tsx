"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface Icon3DProps {
  icon: LucideIcon;
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
  glowIntensity?: "low" | "medium" | "high";
}

export function Icon3D({ icon: Icon, color = "blue", size = 48, className = "", delay = 0 }: Icon3DProps) {
  const { shouldReduceMotion } = useMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Map color names to tailwind/css values for gradients
  const getColorValues = (c: string) => {
    const colors: Record<string, { from: string; to: string; shadow: string }> = {
      blue: { from: "#3b82f6", to: "#60a5fa", shadow: "rgba(59, 130, 246, 0.5)" },
      emerald: { from: "#10b981", to: "#34d399", shadow: "rgba(16, 185, 129, 0.5)" },
      purple: { from: "#8b5cf6", to: "#a78bfa", shadow: "rgba(139, 92, 246, 0.5)" },
      orange: { from: "#f97316", to: "#fb923c", shadow: "rgba(249, 115, 22, 0.5)" },
      red: { from: "#ef4444", to: "#f87171", shadow: "rgba(239, 68, 68, 0.5)" },
      cyan: { from: "#06b6d4", to: "#22d3ee", shadow: "rgba(6, 182, 212, 0.5)" },
      teal: { from: "#14b8a6", to: "#2dd4bf", shadow: "rgba(20, 184, 166, 0.5)" },
    };
    return colors[c] || colors.blue;
  };

  const theme = getColorValues(color);

  if (shouldReduceMotion) {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size * 2, height: size * 2 }}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.from}, ${theme.to})` }} />
        <Icon size={size} color={theme.from} />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center perspective-[1000px] ${className}`}
      style={{ width: size * 2, height: size * 2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative flex items-center justify-center w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -10, 0],
          rotateX: isHovered ? 15 : 5,
          rotateY: isHovered ? 15 : 5,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
          rotateX: { duration: 0.5 },
          rotateY: { duration: 0.5 },
        }}
      >
        {/* Back Glow */}
        <div
          className="absolute inset-4 rounded-full blur-xl opacity-40"
          style={{
            background: theme.from,
            transform: "translateZ(-20px)"
          }}
        />

        {/* Glass Container */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/20 bg-[rgb(var(--card))/0.05] backdrop-blur-sm shadow-xl"
          style={{
            transform: "translateZ(0px)",
            boxShadow: `0 10px 30px -10px ${theme.shadow}`
          }}
        />

        {/* Icon Layers for 3D effect */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateZ(${i * 8}px)`,
              opacity: i === 3 ? 1 : 0.3
            }}
          >
            <Icon
              size={size}
              style={{
                color: i === 3 ? theme.from : theme.to,
                filter: i === 3 ? "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" : "none"
              }}
            />
          </div>
        ))}

        {/* Shine effect */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[rgb(var(--card))/0.12] to-transparent pointer-events-none"
          style={{ transform: "translateZ(25px)" }}
        />
      </motion.div>
    </div>
  );
}
