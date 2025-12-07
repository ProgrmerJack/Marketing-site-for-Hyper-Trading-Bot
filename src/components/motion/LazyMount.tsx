"use client";

import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface LazyMountProps {
    children: ReactNode;
    /** 
     * Root margin for IntersectionObserver. 
     * Positive values trigger earlier (e.g., "200px" loads when within 200px of viewport).
     * Default: "200px" for smooth pre-loading.
     */
    rootMargin?: string;
    /**
     * Fallback to show before content mounts.
     * Useful for preventing layout shift.
     */
    fallback?: ReactNode;
    /**
     * Additional className for the wrapper div
     */
    className?: string;
}

/**
 * LazyMount - Intersection Observer-based lazy mounting
 * 
 * Prevents heavy components (especially 3D scenes) from mounting until
 * they're near the viewport. Critical for performance with Spline embeds.
 * 
 * Usage:
 * ```tsx
 * const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });
 * 
 * <LazyMount rootMargin="200px">
 *   <Scene3D />
 * </LazyMount>
 * ```
 * 
 * @param children - Component to lazy mount (typically 3D scene)
 * @param rootMargin - Distance from viewport to trigger mount
 * @param fallback - Optional loading state
 * @param className - Optional wrapper styling
 */
export function LazyMount({
    children,
    rootMargin = "200px",
    fallback = null,
    className = ""
}: LazyMountProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin,
    });

    return (
        <div ref={ref} className={className}>
            {inView ? children : fallback}
        </div>
    );
}
