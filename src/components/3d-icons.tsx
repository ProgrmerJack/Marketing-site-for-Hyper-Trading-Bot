"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface Icon3DProps {
  icon: LucideIcon;
  color?: string;
  className?: string;
  size?: number;
  orbitParticles?: boolean;
  glowIntensity?: "low" | "medium" | "high";
}

/**
 * 3D animated icon with glowing effects and orbiting particles
 * Features: triple-layer glow, 3D rotation, orbiting particles, motion-aware
 */
export function Icon3D({
  icon: IconComponent,
  color = "rgb(79,244,207)",
  className = "",
  size = 64,
  orbitParticles = true,
  glowIntensity = "medium",
}: Icon3DProps) {
  const glowSizes = useMemo(() => {
    switch (glowIntensity) {
      case "low":
        return { outer: "blur-2xl", middle: "blur-xl", inner: "blur-lg", opacity: [0.15, 0.25, 0.35] };
      case "high":
        return { outer: "blur-3xl", middle: "blur-2xl", inner: "blur-xl", opacity: [0.25, 0.35, 0.45] };
      default: // medium
        return { outer: "blur-3xl", middle: "blur-2xl", inner: "blur-xl", opacity: [0.30, 0.40, 0.50] };
    }
  }, [glowIntensity]);

  // Random orbit positions for particles
  const particles = useMemo(() => {
    if (!orbitParticles) return [];
    return Array(3)
      .fill(0)
      .map((_, i) => ({
        angle: i * 120,
        delay: i * 1.3,
      }));
  }, [orbitParticles]);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Triple-layer glow */}
      <motion.div
        className={`absolute inset-0 rounded-full ${glowSizes.outer}`}
        style={{
          backgroundColor: color,
          opacity: glowSizes.opacity[0],
        }}
        animate={{
          opacity: [glowSizes.opacity[0], glowSizes.opacity[0] * 1.5, glowSizes.opacity[0]],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className={`absolute inset-0 rounded-full ${glowSizes.middle}`}
        style={{
          backgroundColor: color,
          opacity: glowSizes.opacity[1],
        }}
      />
      <div
        className={`absolute inset-0 rounded-full ${glowSizes.inner}`}
        style={{
          backgroundColor: color,
          opacity: glowSizes.opacity[2],
        }}
      />

      {/* Icon with 3D rotation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 5, 0, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Light mode background for better contrast */}
        <div 
          className="absolute inset-0 rounded-xl bg-white/80 dark:bg-transparent backdrop-blur-sm"
          style={{ width: size * 0.7, height: size * 0.7, left: '15%', top: '15%' }}
        />
        <IconComponent
          className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          style={{
            width: size * 0.5,
            height: size * 0.5,
            color: color,
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
          strokeWidth={2.5}
        />
      </motion.div>

      {/* Orbiting particles */}
      {orbitParticles &&
        particles.map((particle, i) => {
          const radius = size * 0.6;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                left: "50%",
                top: "50%",
                marginLeft: -4,
                marginTop: -4,
              }}
              animate={{
                x: [
                  Math.cos((particle.angle * Math.PI) / 180) * radius,
                  Math.cos(((particle.angle + 360) * Math.PI) / 180) * radius,
                ],
                y: [
                  Math.sin((particle.angle * Math.PI) / 180) * radius,
                  Math.sin(((particle.angle + 360) * Math.PI) / 180) * radius,
                ],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          );
        })}
    </motion.div>
  );
}

interface IconGridProps {
  icons: { icon: LucideIcon; color: string; label?: string }[];
  columns?: number;
  iconSize?: number;
  className?: string;
}

/**
 * Grid of 3D animated icons
 */
export function IconGrid({ icons, columns = 3, iconSize = 64, className = "" }: IconGridProps) {
  return (
    <div
      className={`grid gap-8 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {icons.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <Icon3D icon={item.icon} color={item.color} size={iconSize} />
          {item.label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
