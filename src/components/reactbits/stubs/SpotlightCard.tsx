"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";

/**
 * Custom SpotlightCard component that replaces @appletosolutions/reactbits SpotlightCard
 * to fix the hard-coded dark background in the inner-content class.
 *
 * The original component from reactbits has:
 *   .inner-content { background: #000; color: white; }
 * which breaks light mode theming.
 *
 * This version uses theme-aware transparent backgrounds with spotlight hover effect.
 */

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  spotlightColor?: string;
  children?: React.ReactNode;
}

export function SpotlightCard({
  className = "",
  spotlightColor = "rgba(139, 92, 246, 0.15)",
  children,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  const spotlightStyle = useMemo(
    () => ({
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none" as const,
      background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
      opacity,
      transition: "opacity 0.3s ease",
      borderRadius: "inherit",
      zIndex: 0,
    }),
    [position.x, position.y, spotlightColor, opacity]
  );

  return (
    <div
      ref={containerRef}
      className={`spotlight-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", overflow: "hidden" }}
      {...props}
    >
      {/* Spotlight gradient effect */}
      <div style={spotlightStyle} aria-hidden="true" />
      {/* Content - NO inner-content class with black background */}
      <div
        className="spotlight-card-content"
        style={{
          position: "relative",
          zIndex: 1,
          background: "transparent",
          color: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default SpotlightCard;
