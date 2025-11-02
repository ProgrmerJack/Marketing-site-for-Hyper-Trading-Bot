"use client";

import { useRive } from "@rive-app/react-canvas";
import { useReducedMotion } from "@/components/motion/MotionProvider";
import { useEffect } from "react";
import Image from "next/image";

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function AnimatedLogo({ 
  width = 120, 
  height = 40, 
  className = "" 
}: AnimatedLogoProps) {
  const shouldReduce = useReducedMotion();

  // Placeholder: Replace with actual .riv file when available
  const { RiveComponent, rive } = useRive({
    src: "/animations/logo.riv", // Add your .riv file here
    stateMachines: "State Machine 1",
    autoplay: !shouldReduce,
  });

  useEffect(() => {
    if (rive && shouldReduce) {
      rive.pause();
    } else if (rive && !shouldReduce) {
      rive.play();
    }
  }, [rive, shouldReduce]);

  // Fallback to static logo if Rive file not found or reduced motion enabled
  if (shouldReduce) {
    return (
      <div className={className} style={{ width, height }}>
        <Image
          src="/logo-static.svg"
          alt="Logo"
          width={width}
          height={height}
          priority
        />
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height }}>
      <RiveComponent />
    </div>
  );
}
