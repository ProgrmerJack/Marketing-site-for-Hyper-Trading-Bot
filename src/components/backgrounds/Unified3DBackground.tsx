"use client";

import { FloatingParticles, DNAHelix, FloatingCubes, DataGrid, OrbitingSpheres, HolographicScanLines, PulsingCore } from "@/components/3d-decorations";

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "default";

interface Unified3DBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: number; // 0.0 - 1.0 intensity multiplier for ambient glow and particle counts
  offsetClass?: string; // additional class to shift the background positioning
}

export function Unified3DBackground({ variant = "default", className = "", intensity = 1, offsetClass = "" }: Unified3DBackgroundProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden -z-20 ${className} ${offsetClass}`}>
      {/* Base Ambient Glow - Unique per variant */}
      <div className="absolute inset-0" style={{ opacity: 0.3 * Math.max(0.25, intensity) }}>
        {variant === "home" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2),transparent_70%)]" />
        )}
        {variant === "about" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.2),transparent_70%)]" />
        )}
        {variant === "pricing" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.15),transparent_70%)]" />
        )}
        {variant === "how-it-works" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        )}
        {variant === "contact" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.2),transparent_70%)]" />
        )}
        {variant === "blog" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.15),transparent_70%)]" />
        )}
        {variant === "research" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.2),transparent_70%)]" />
        )}
      </div>

      {/* Unique 3D Elements */}
      {variant === "home" && (
        <>
          <FloatingParticles count={Math.max(6, Math.round(20 * intensity))} color="rgb(59,130,246)" />
          <HolographicScanLines count={Math.max(4, Math.round(10 * intensity))} color="rgba(59,130,246,0.1)" />
        </>
      )}

      {variant === "about" && (
        <>
          <DNAHelix color="rgb(16,185,129)" />
          <FloatingParticles count={Math.max(4, Math.round(10 * intensity))} color="rgb(16,185,129)" />
        </>
      )}

      {variant === "pricing" && (
        <>
          <FloatingCubes count={Math.max(4, Math.round(12 * intensity))} color="rgb(245,158,11)" />
          <OrbitingSpheres radius={150} count={Math.max(2, Math.round(3 * intensity))} color="rgb(245,158,11)" />
        </>
      )}

      {variant === "how-it-works" && (
        <>
          <DataGrid color="rgb(139,92,246)" />
          <FloatingParticles count={Math.max(6, Math.round(15 * intensity))} color="rgb(139,92,246)" />
        </>
      )}

      {variant === "contact" && (
        <>
          <PulsingCore size={300} color="rgb(56,189,248)" />
          <FloatingParticles count={Math.max(4, Math.round(12 * intensity))} color="rgb(56,189,248)" />
        </>
      )}

      {variant === "blog" && (
        <>
          <FloatingCubes count={Math.max(4, Math.round(8 * intensity))} color="rgb(236,72,153)" />
          <HolographicScanLines count={Math.max(6, Math.round(15 * intensity))} color="rgba(236,72,153,0.15)" />
        </>
      )}

      {variant === "research" && (
        <>
          <DataGrid color="rgb(99,102,241)" />
          <OrbitingSpheres radius={200} count={Math.max(2, Math.round(5 * intensity))} color="rgb(99,102,241)" />
        </>
      )}

      {variant === "default" && (
        <FloatingParticles count={Math.max(4, Math.round(10 * intensity))} color="rgb(148,163,184)" />
      )}
    </div>
  );
}
