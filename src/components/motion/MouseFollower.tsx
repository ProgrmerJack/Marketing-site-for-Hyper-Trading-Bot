"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useEffect, useState } from "react";

interface MouseFollowerProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * MouseFollower - Element that subtly follows mouse movement
 * @param strength - Intensity of the following effect (0-1)
 */
export function MouseFollower({
  children,
  strength = 0.5,
  className = "",
}: MouseFollowerProps) {
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [5 * strength, -5 * strength]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5 * strength, 5 * strength]);

  useEffect(() => {
    if (shouldReduce) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, mouseX, mouseY, shouldReduce]);

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
