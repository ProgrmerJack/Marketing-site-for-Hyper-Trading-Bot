"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type BlobCursorProps = {
  size?: number;
  color?: string;
  blur?: number;
};

export function BlobCursor({
  size = 40,
  color = "rgba(59, 130, 246, 0.5)",
  blur = 30,
}: BlobCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, size]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 rounded-full mix-blend-normal dark:mix-blend-screen"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
