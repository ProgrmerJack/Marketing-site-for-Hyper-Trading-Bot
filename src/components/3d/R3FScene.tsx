"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { LazyMount } from "@/components/motion/LazyMount";
import { ReducedMotionSwitch } from "@/components/motion/ReducedMotionSwitch";

const Canvas = dynamic(
    () => import("@react-three/fiber").then((m) => m.Canvas),
    { ssr: false }
);

type R3FSceneProps = {
    className?: string;
    rootMargin?: string;
    fallbackSrc: string;
    fallbackAlt: string;
    children: React.ReactNode;
};

export function R3FScene({
    className = "relative w-full h-full",
    rootMargin = "200px",
    fallbackSrc,
    fallbackAlt,
    children,
}: R3FSceneProps) {
    return (
        <LazyMount className={className} rootMargin={rootMargin}>
            <ReducedMotionSwitch
                fallback={
                    <div className="relative w-full h-full">
                        <Image
                            src={fallbackSrc}
                            alt={fallbackAlt}
                            fill
                            className="object-cover"
                            priority={false}
                        />
                    </div>
                }
            >
                <Canvas
                    fallback={
                        <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                            WebGL unavailable — showing static preview.
                        </div>
                    }
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                    frameloop="always"
                >
                    {children}
                </Canvas>
            </ReducedMotionSwitch>
        </LazyMount>
    );
}
