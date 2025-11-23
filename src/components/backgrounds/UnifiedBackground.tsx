"use client";

import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import AuroraBackground from "@/components/backgrounds/bg/aurora";
import { GlowingOrbs } from "@/components/backgrounds/GlowingOrbs";
import { useMotion } from "@/components/motion/MotionProvider";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * UnifiedBackground provides a consistent hyperspeed animation across the entire site.
 * Applied at the body level to ensure smooth, continuous animation without disconnects between sections.
 *
 * Cross-browser compatibility:
 * - Uses fixed positioning for consistent behavior across all browsers
 * - Canvas animations are hardware-accelerated where supported
 * - Fallback gradients for reduced motion preferences
 */
export function UnifiedBackground() {
  const { backgroundsEnabled, hydrated, intensity } = useMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerXSpring = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const pointerYSpring = useSpring(pointerY, { stiffness: 80, damping: 20 });

  if (!backgroundsEnabled || !hydrated) {
    // Static gradient fallback for non-animated mode or SSR - updated with neon colors
    return (
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-25" data-testid="hyperspeed-fallback">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.15),rgba(0,179,255,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.18),rgba(0,179,255,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/80 dark:from-transparent dark:via-slate-950/50 dark:to-[rgb(10,10,15)]" />
      </div>
    );
  }

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-20"
        style={{
          // Cross-browser GPU acceleration and rendering fixes
          transform: 'translate3d(0, 0, 0)', // Force GPU layer (better than translateZ)
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0, 0, 0)', // Safari-specific
          // Prevent Safari scroll vibration with fixed backgrounds
          WebkitPerspective: 1000,
          perspective: 1000,
          // Improve rendering performance
          willChange: 'transform',
        }}
      >
        <div
          style={{
            // Nested transform for better Safari compatibility
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
            onMouseMove={(e) => {
              const w = window.innerWidth || 1;
              const h = window.innerHeight || 1;
              const nx = (e.clientX / w - 0.5) * 26; // small range
              const ny = (e.clientY / h - 0.5) * 16;
              pointerX.set(nx);
              pointerY.set(ny);
            }}
        >
          <AnimatedBackground
            variant="hyperspeed"
            colors={[
              "rgba(10,10,15,1)",
              "rgba(79,244,207,1)",
              "rgba(0,179,255,1)",
            ]}
            speed="28s"
            opacity={0.9}
            className="hyperspeed-bg"
          />
        </div>
        {/* Aurora overlay for soft cinematic hues (animated canvas) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: hydrated ? (intensity === "high" ? 0.32 : intensity === "standard" ? 0.2 : 0.12) : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ x: pointerXSpring, y: pointerYSpring }}
        >
          <AuroraBackground
            colors={["#4FF4CF", "#00B3FF", "#A855F7"]}
            speed={intensity === "high" ? 1.5 : intensity === "standard" ? 1 : 0.7}
            opacity={intensity === "high" ? 0.6 : intensity === "standard" ? 0.45 : 0.28}
            className="aurora-bg"
          />
        </motion.div>
        {/* Gradient overlay for better content visibility and cinematic vignette - updated for darker background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/60 dark:from-transparent dark:via-[rgb(10,10,15)]/30 dark:to-[rgb(10,10,15)]/80" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.65),transparent_35%)]" />
      </div>
      
      {/* Glowing orbs - floating spheres throughout the site - MOVED OUTSIDE opacity container for visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GlowingOrbs count={12} />
      </div>
    </>
  );
}
