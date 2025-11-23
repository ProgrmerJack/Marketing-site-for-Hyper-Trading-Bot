"use client";

import { motion } from "framer-motion";
import { Icon3D } from "@/components/3d-icons/Icon3D";
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
      <div className={`w-[${size}px] h-[${size}px]`}> 
        {/* Render Icon using existing Icon3D component for visual parity */}
        {IconComponent && <Icon3D icon={IconComponent} color={color} size={size} />}
      </div>
    </motion.div>
  );
}

export default SectionMini3D;
