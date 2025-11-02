"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";

interface MorphingShapeProps {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * MorphingShape - SVG shape that continuously morphs between states
 * Great for decorative backgrounds or loading states
 */
export function MorphingShape({
  size = 200,
  className = "",
  color = "currentColor",
}: MorphingShapeProps) {
  const shouldReduce = useReducedMotion();

  const shapes = [
    "M100,20 C150,20 180,50 180,100 C180,150 150,180 100,180 C50,180 20,150 20,100 C20,50 50,20 100,20",
    "M100,10 C160,10 190,40 190,100 C190,160 160,190 100,190 C40,190 10,160 10,100 C10,40 40,10 100,10",
    "M100,30 C140,30 170,60 170,100 C170,140 140,170 100,170 C60,170 30,140 30,100 C30,60 60,30 100,30",
  ];

  if (shouldReduce) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        fill="none"
      >
        <path d={shapes[0]} fill={color} fillOpacity={0.1} />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      <motion.path
        d={shapes[0]}
        fill={color}
        fillOpacity={0.1}
        animate={{
          d: shapes,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
