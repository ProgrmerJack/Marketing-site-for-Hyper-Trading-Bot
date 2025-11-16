"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "./MotionProvider";

/**
 * PageTransition Component
 * 
 * Provides smooth page transitions using the View Transitions API with fallback.
 * Respects user's motion preferences and provides graceful degradation.
 * 
 * @example
 * ```tsx
 * // In layout or template
 * <PageTransition>{children}</PageTransition>
 * ```
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const previousPathname = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Skip transitions if reduced motion is active
    if (shouldReduceMotion) {
      previousPathname.current = pathname;
      return;
    }

    // Skip on first render
    if (previousPathname.current === pathname) {
      return;
    }

    // Check if browser supports View Transitions API
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Use native View Transitions API
      document.startViewTransition(() => {
        // The actual DOM update happens via Next.js navigation
        // This just wraps it in the transition
        previousPathname.current = pathname;
        // small cinematic overlay when transitions start
        if (!shouldReduceMotion) {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 400);
        }
      });
    } else {
      // Browser doesn't support View Transitions API
      // Fallback: immediate update (Framer Motion handles page-level animations)
      previousPathname.current = pathname;
      if (!shouldReduceMotion) {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 420);
      }
    }
  }, [pathname, shouldReduceMotion]);

  return (
    <>
      {/* Cinematic letterbox overlays */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            key="ctop"
            aria-hidden
            initial={{ height: 0 }}
            animate={{ height: isTransitioning ? "7vh" : 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] bg-black/70"
          />
          <motion.div
            key="cbottom"
            aria-hidden
            initial={{ height: 0 }}
            animate={{ height: isTransitioning ? "7vh" : 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] bg-black/70"
          />
        </>
      )}
      {children}
    </>
  );
}

/**
 * Hook to trigger a view transition programmatically
 * 
 * @example
 * ```tsx
 * const transition = useViewTransition();
 * 
 * const handleClick = () => {
 *   transition(() => {
 *     // Your state update or navigation
 *     setTab('new-tab');
 *   });
 * };
 * ```
 */
export function useViewTransition() {
  const shouldReduceMotion = useReducedMotion();

  return (callback: () => void) => {
    if (shouldReduceMotion) {
      // Skip transition, execute immediately
      callback();
      return;
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(callback);
    } else {
      // No View Transitions support, execute immediately
      callback();
    }
  };
}

/**
 * Higher-order component to add view transitions to any component
 * 
 * @example
 * ```tsx
 * const TransitionedComponent = withViewTransition(MyComponent);
 * ```
 */
export function withViewTransition<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithViewTransitionComponent(props: P) {
    return (
      <PageTransition>
        <Component {...props} />
      </PageTransition>
    );
  };
}
