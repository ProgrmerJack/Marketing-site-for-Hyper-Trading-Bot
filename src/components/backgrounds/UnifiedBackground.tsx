"use client";

import { AnimatedBackground } from "@/components/backgrounds/AnimatedBackground";
import AuroraBackground from "@/components/backgrounds/bg/aurora";
// GlowingOrbs removed for performance - 12 motion elements with blur(60px) filter
import { Unified3DBackground } from "@/components/backgrounds/Unified3DBackground";
import { useMotion } from "@/components/motion/MotionProvider";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * UnifiedBackground provides a consistent hyperspeed animation across the entire site.
 * Applied at the body level to ensure smooth, continuous animation without disconnects between sections.
 *
 * PERFORMANCE OPTIMIZED:
 * - Homepage: Skip entirely (Unified2DBackground handles it with lightweight canvas)
 * - Other pages: Single canvas layer + optional aurora (no GlowingOrbs)
 */
export function UnifiedBackground() {
  const { backgroundsEnabled, hydrated, intensity } = useMotion();
  const pathname = usePathname();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerXSpring = useSpring(pointerX, { stiffness: 60, damping: 25 });
  const pointerYSpring = useSpring(pointerY, { stiffness: 60, damping: 25 });

  // Determine variant based on path
  const isHome = pathname === "/";
  let variant: "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "default" = "default";

  if (pathname?.includes("/about") || pathname?.includes("/safety")) variant = "about";
  else if (pathname?.includes("/pricing")) variant = "pricing";
  else if (pathname?.includes("/how-it-works")) variant = "how-it-works";
  else if (pathname?.includes("/contact")) variant = "contact";
  else if (pathname?.includes("/blog")) variant = "blog";
  else if (pathname?.includes("/research") || pathname?.includes("/status")) variant = "research";

  // PERFORMANCE: Skip entirely on homepage - Unified2DBackground handles it
  if (isHome) {
    return null;
  }

  if (!backgroundsEnabled || !hydrated) {
    // Static gradient fallback for non-animated mode or SSR
    return (
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-25" data-testid="hyperspeed-fallback">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.15),rgba(0,179,255,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(79,244,207,0.18),rgba(0,179,255,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/80 dark:from-transparent dark:via-slate-950/50 dark:to-[rgb(10,10,15)]" />
      </div>
    );
  }

  // Reduced opacity for smoother performance on other pages
  const baseOpacity = intensity === "high" ? 0.22 : intensity === "standard" ? 0.16 : 0.1;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: baseOpacity,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0, 0, 0)',
          WebkitPerspective: 1000,
          perspective: 1000,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
          onMouseMove={(e) => {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            const nx = (e.clientX / w - 0.5) * 20;
            const ny = (e.clientY / h - 0.5) * 12;
            pointerX.set(nx);
            pointerY.set(ny);
          }}
        >
          {/* Single canvas layer - hyperspeed */}
          <AnimatedBackground
            variant="hyperspeed"
            colors={[
              "rgba(10,10,15,1)",
              "rgba(79,244,207,1)",
              "rgba(0,179,255,1)",
            ]}
            speed="32s"
            opacity={0.7}
            className="hyperspeed-bg"
          />
        </div>
        
        {/* Aurora - only on high intensity, reduced opacity */}
        {intensity === "high" && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{ x: pointerXSpring, y: pointerYSpring }}
          >
            <AuroraBackground
              colors={["#4FF4CF", "#00B3FF", "#A855F7"]}
              speed={0.8}
              opacity={0.35}
              className="aurora-bg"
            />
          </motion.div>
        )}
        
        {/* Gradient overlay for content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/60 dark:from-transparent dark:via-[rgb(10,10,15)]/30 dark:to-[rgb(10,10,15)]/80" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.65),transparent_35%)]" />
      </div>

      {/* Global 3D Background */}
      <Unified3DBackground variant={variant} intensity={1} />
    </>
  );
}
