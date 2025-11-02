"use client";

import { motion, PanInfo, useAnimation } from "framer-motion";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { type ReactNode, useState } from "react";

interface GestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
  className?: string;
}

/**
 * GestureHandler - Touch gesture support (swipe, drag)
 * @param onSwipe* - Callbacks for swipe directions
 * @param swipeThreshold - Minimum distance for swipe (default: 50px)
 */
export function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 50,
  className = "",
}: GestureHandlerProps) {
  const shouldReduce = useReducedMotion();
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    const { offset } = info;
    const swipe = Math.abs(offset.x) > swipeThreshold || Math.abs(offset.y) > swipeThreshold;

    if (swipe) {
      if (Math.abs(offset.x) > Math.abs(offset.y)) {
        // Horizontal swipe
        if (offset.x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (offset.x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (offset.y > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (offset.y < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    // Reset position
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
  };

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      {children}
    </motion.div>
  );
}
