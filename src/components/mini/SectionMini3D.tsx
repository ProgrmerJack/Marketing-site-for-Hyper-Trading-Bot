"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SectionMini3DProps = {
  icon?: LucideIcon;
  color?: "cyan" | "emerald" | "purple" | "amber" | "pink" | "orange";
  size?: number;
  className?: string;
  position?: "left" | "right" | "top" | "bottom";
};

export function SectionMini3D({ icon, color = "cyan", size = 120, className = "", position = "right" }: SectionMini3DProps) {
  const IconComponent = icon ?? undefined;

  // Lightweight floating animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: [-6, 6, -6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute ${position === "right" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 ${className}`}
      aria-hidden
    >
      <div style={{ width: size, height: size }} className={`flex items-center justify-center`}>
        {/* Render 2D gradient icon wrapper instead of the 3D icon for better cross-theme visibility */}
        {IconComponent && (
          <div className={`flex h-full w-full items-center justify-center rounded-2xl shadow-lg overflow-hidden ${
            color === "cyan" ? "bg-gradient-to-br from-cyan-500 to-blue-500" :
            color === "emerald" ? "bg-gradient-to-br from-emerald-500 to-teal-500" :
            color === "purple" ? "bg-gradient-to-br from-purple-500 to-pink-500" :
            color === "amber" || color === "orange" ? "bg-gradient-to-br from-orange-500 to-amber-500" :
            "bg-gradient-to-br from-cyan-500 to-blue-500"
          }`}>
            <IconComponent className="h-8 w-8 text-white drop-shadow-md" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default SectionMini3D;
