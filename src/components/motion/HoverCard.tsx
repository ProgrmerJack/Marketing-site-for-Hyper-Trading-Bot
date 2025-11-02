"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useState, useRef, useEffect } from "react";

interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
}

/**
 * HoverCard - Floating card that appears on hover with pointer tracking
 * @param trigger - Element that triggers the card
 * @param content - Card content to display
 * @param side - Preferred side for card placement
 * @param align - Card alignment relative to trigger
 */
export function HoverCard({
  trigger,
  content,
  side = "top",
  className = "",
}: HoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const triggerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!isOpen || shouldReduce) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!triggerRef.current) return;
      
      const rect = triggerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set((e.clientX - centerX) * 0.05);
      y.set((e.clientY - centerY) * 0.05);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen, shouldReduce, x, y]);

  const sideOffset = 8;
  const positions = {
    top: { bottom: "100%", left: "50%", translateX: "-50%", marginBottom: `${sideOffset}px` },
    bottom: { top: "100%", left: "50%", translateX: "-50%", marginTop: `${sideOffset}px` },
    left: { right: "100%", top: "50%", translateY: "-50%", marginRight: `${sideOffset}px` },
    right: { left: "100%", top: "50%", translateY: "-50%", marginLeft: `${sideOffset}px` },
  };

  const position = positions[side];

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        x.set(0);
        y.set(0);
      }}
    >
      {trigger}

      {isOpen && (
        <motion.div
          className={`absolute z-50 ${className}`}
          style={{
            ...position,
            x: shouldReduce ? 0 : springX,
            y: shouldReduce ? 0 : springY,
          }}
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            duration: shouldReduce ? 0.01 : 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="bg-gray-900 border border-white/10 rounded-lg shadow-2xl p-4 min-w-[200px] max-w-[300px]">
            {content}
          </div>
        </motion.div>
      )}
    </div>
  );
}
