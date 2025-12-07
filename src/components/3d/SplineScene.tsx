"use client";

import dynamic from "next/dynamic";
import { LazyMount } from "@/components/motion/LazyMount";
import { ReducedMotionSwitch } from "@/components/motion/ReducedMotionSwitch";
import Image from "next/image";

// Dynamic import for Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
    ssr: false,
    loading: () => <div className="w-full h-full animate-pulse bg-slate-200/10 rounded-xl" />
});

interface SplineSceneProps {
    /** URL to the .splinecode file */
    scene: string;
    /** ClassName for the wrapper div */
    className?: string;
    /** Path to static fallback image (required for reduced motion) */
    fallbackSrc?: string;
    /** Alt text for fallback image */
    fallbackAlt?: string;
    /** Callback when Spline scene is loaded */
    onLoad?: (spline: any) => void;
    /** Root margin for lazy loading (default: "200px") */
    rootMargin?: string;
}

/**
 * SplineScene - The "Quality-First" 3D Wrapper
 * 
 * Enforces:
 * 1. Lazy loading via IntersectionObserver (only mounts when near viewport)
 * 2. Reduced motion handling (unmounts canvas, shows static image)
 * 3. SSR safety (dynamic import)
 */
export function SplineScene({
    scene,
    className = "w-full h-full relative",
    fallbackSrc,
    fallbackAlt = "3D Scene Fallback",
    onLoad,
    rootMargin = "200px"
}: SplineSceneProps) {
    return (
        <LazyMount className={className} rootMargin={rootMargin}>
            <ReducedMotionSwitch
                fallback={
                    fallbackSrc ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={fallbackSrc}
                                alt={fallbackAlt}
                                fill
                                className="object-cover"
                                priority={false}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-100/5 rounded-xl flex items-center justify-center text-xs text-muted-foreground">
                            Static Fallback Missing
                        </div>
                    )
                }
            >
                <Spline scene={scene} onLoad={onLoad} className="w-full h-full" />
            </ReducedMotionSwitch>
        </LazyMount>
    );
}
