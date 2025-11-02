"use client";

import { useEffect, useRef } from "react";
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
      });
    } else {
      // Browser doesn't support View Transitions API
      // Fallback: immediate update (Framer Motion handles page-level animations)
      previousPathname.current = pathname;
    }
  }, [pathname, shouldReduceMotion]);

  return <>{children}</>;
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
