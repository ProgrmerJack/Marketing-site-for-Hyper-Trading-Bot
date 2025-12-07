"use client";

import { ReactNode, useEffect, useState } from "react";

interface ReducedMotionSwitchProps {
    /** Content to render when motion is enabled */
    children: ReactNode;
    /** Static fallback (typically Image) when reduced motion is preferred */
    fallback: ReactNode;
}

/**
 * ReducedMotionSwitch - Render-path switch for prefers-reduced-motion
 * 
 * Does NOT mount 3D canvases when user prefers reduced motion.
 * CSS alone isn't enough - WebGL/Spline should not initialize at all.
 * 
 * Usage:
 * ```tsx
 * <ReducedMotionSwitch
 *   fallback={<Image src="/static-scene.png" alt="..." />}
 * >
 *   <Spline scene="..." />
 * </ReducedMotionSwitch>
 * ```
 */
export function ReducedMotionSwitch({ children, fallback }: ReducedMotionSwitchProps) {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if user prefers reduced motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setShouldReduceMotion(mediaQuery.matches);

        // Listen for changes
        const handleChange = (e: MediaQueryListEvent) => {
            setShouldReduceMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Prevent hydration mismatch - render fallback on server
    if (!mounted) {
        return <>{fallback}</>;
    }

    return <>{shouldReduceMotion ? fallback : children}</>;
}
