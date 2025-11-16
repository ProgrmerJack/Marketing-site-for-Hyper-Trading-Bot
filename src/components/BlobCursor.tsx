"use client";

import { useEffect, useState } from "react";
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

  // Accent color follow -- try to pick accent color from hovered element or fall back to prop
  const [accent, setAccent] = useState(color);
  useEffect(() => {
    const updateAccent = (e: MouseEvent) => {
      try {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        if (!el) {
          setAccent(color);
          return;
        }
        // If the element has a data-accent attribute, use it
        const ds = el.dataset?.accentColor;
        if (ds) {
          setAccent(ds);
          return;
        }
        const computed = window.getComputedStyle(el).backgroundColor;
        if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
          setAccent(computed);
          return;
        }
        setAccent(color);
      } catch {
        setAccent(color);
      }
    };

    window.addEventListener('mousemove', updateAccent, { passive: true });
    return () => window.removeEventListener('mousemove', updateAccent);
  }, [color]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 rounded-full mix-blend-normal dark:mix-blend-screen"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: size,
        height: size,
        backgroundImage: `radial-gradient(circle, ${accent ?? color} 0%, ${accent ?? color} 40%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        transition: 'background 0.2s ease, filter 0.2s ease',
      }}
    />
  );
}
