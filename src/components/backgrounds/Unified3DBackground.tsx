"use client";

import { FloatingParticles, DNAHelix, FloatingCubes, DataGrid, OrbitingSpheres, HolographicScanLines, PulsingCore, DataStream, Rotating3DRing } from "@/components/3d-decorations";
// NEW: Import the unique 3D page-specific animations
import {
  FoundationPillars3D,
  ValueScales3D,
  CommBridge3D,
  NeuralWeb3D,
  PipelineFlow3D,
  TradingFloor3D,
  FortressShield3D,
  KnowledgeLibrary3D,
  SystemHeartbeat3D,
  TrustVault3D,
  // NEW: Page-specific 3D components (note: visual decorations, non-certified)
  QuantumCore3D,
  TradingMatrix3D,
  DataVortex3D,
  NeonHologram3D,
  CrystalPrism3D,
  CosmicPortal3D,
  DigitalDNA3D,
  FloatingIslands3D,
  NeuralSynapse3D,
} from "@/components/hero";

type BackgroundVariant = "home" | "about" | "pricing" | "how-it-works" | "contact" | "blog" | "research" | "live-demo" | "safety" | "status" | "legal" | "default";

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
        {variant === "live-demo" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.2),transparent_70%)]" />
        )}
        {variant === "safety" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.15),transparent_70%)]" />
        )}
        {variant === "status" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.2),transparent_70%)]" />
        )}
        {variant === "legal" && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(148,163,184,0.15),transparent_70%)]" />
        )}
      </div>

      {/* NEW: Unique 3D Page-Specific Animations - Fixed positioning */}
      {variant === "about" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[15vh]">
          <CrystalPrism3D />
        </div>
      )}

      {variant === "pricing" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[10vh]">
          {/* Reverted to simpler value scales (dollars falling) for clarity */}
          <ValueScales3D />
        </div>
      )}

      {variant === "contact" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[15vh]">
          {/* Use a minimal particle background for contact */}
          <FloatingParticles count={Math.max(6, Math.round(12 * intensity))} color="rgb(56,189,248)" />
        </div>
      )}

      {variant === "research" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh]">
          {/* Keep the page lighter: swap DigitalDNA3D with subtle DNA helix background */}
          <DNAHelix />
        </div>
      )}

      {variant === "how-it-works" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[10vh]">
          <NeuralSynapse3D />
        </div>
      )}

      {variant === "live-demo" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh]">
          {/* Replaced heavy TradingMatrix with a minimal DataStream + Particles */}
          <FloatingParticles count={Math.max(8, Math.round(16 * intensity))} color="rgb(34,211,238)" />
          <DataStream count={2} color="rgb(34,211,238)" direction="up" />
        </div>
      )}

      {variant === "safety" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[15vh]">
          <DataVortex3D />
        </div>
      )}

      {variant === "blog" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh]">
          {/* Use subtler scan lines & particles for blog readability */}
          <HolographicScanLines count={Math.max(6, Math.round(12 * intensity))} color="rgba(236,72,153,0.12)" />
          <FloatingParticles count={Math.max(6, Math.round(12 * intensity))} color="rgb(236,72,153)" />
        </div>
      )}

      {variant === "status" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[15vh]">
          {/* Replace heartbeat visualization with a lightweight grid + particles */}
          <DataGrid color="rgb(34,197,94)" />
          <FloatingParticles count={Math.max(8, Math.round(16 * intensity))} color="rgb(34,197,94)" />
        </div>
      )}

      {variant === "legal" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[15vh]">
          {/* Use a minimal secure-looking grid for legal pages */}
          <Rotating3DRing size={500} color="rgba(148,163,184,0.15)" thickness={2} duration={35} />
          <FloatingParticles count={Math.max(6, Math.round(12 * intensity))} color="rgb(148,163,184)" />
        </div>
      )}

      {/* Home page - simplified to keep focus on performance, removed heavy Quantum orb */}
      {variant === "home" && (
        <div className="absolute inset-0 flex items-start justify-center pt-[8vh]">
          <FloatingParticles count={Math.max(15, Math.round(30 * intensity))} color="rgb(59,130,246)" />
        </div>
      )}

      {/* Additional decorative 3D Elements */}
      {variant === "home" && (
        <>
          <FloatingParticles count={Math.max(15, Math.round(30 * intensity))} color="rgb(59,130,246)" />
          <HolographicScanLines count={Math.max(8, Math.round(15 * intensity))} color="rgba(59,130,246,0.15)" />
          <OrbitingSpheres radius={300} count={3} color="rgb(59,130,246)" duration={20} />
        </>
      )}

      {variant === "about" && (
        <>
          <FloatingParticles count={Math.max(10, Math.round(20 * intensity))} color="rgb(16,185,129)" />
          <Rotating3DRing size={400} color="rgba(16,185,129,0.2)" thickness={2} duration={25} />
        </>
      )}

      {variant === "pricing" && (
        <>
          <FloatingParticles count={Math.max(8, Math.round(15 * intensity))} color="rgb(245,158,11)" />
          <OrbitingSpheres radius={200} count={Math.max(4, Math.round(6 * intensity))} color="rgb(245,158,11)" />
        </>
      )}

      {variant === "how-it-works" && (
        <>
          <FloatingParticles count={Math.max(12, Math.round(25 * intensity))} color="rgb(139,92,246)" />
          <HolographicScanLines count={Math.max(6, Math.round(12 * intensity))} color="rgba(139,92,246,0.15)" />
        </>
      )}

      {variant === "contact" && (
        <>
          <FloatingParticles count={Math.max(8, Math.round(15 * intensity))} color="rgb(56,189,248)" />
          <OrbitingSpheres radius={250} count={3} color="rgb(56,189,248)" duration={15} />
        </>
      )}

      {variant === "blog" && (
        <>
          <FloatingParticles count={Math.max(6, Math.round(12 * intensity))} color="rgb(236,72,153)" />
          <HolographicScanLines count={Math.max(8, Math.round(18 * intensity))} color="rgba(236,72,153,0.15)" />
        </>
      )}

      {variant === "research" && (
        <>
          <FloatingParticles count={Math.max(10, Math.round(20 * intensity))} color="rgb(99,102,241)" />
          <OrbitingSpheres radius={220} count={Math.max(3, Math.round(6 * intensity))} color="rgb(99,102,241)" />
        </>
      )}

      {variant === "live-demo" && (
        <>
          <FloatingParticles count={Math.max(12, Math.round(24 * intensity))} color="rgb(34,211,238)" />
          <DataStream count={4} color="rgb(34,211,238)" direction="up" />
        </>
      )}

      {variant === "safety" && (
        <>
          <FloatingParticles count={Math.max(8, Math.round(16 * intensity))} color="rgb(239,68,68)" />
          <PulsingCore size={200} color="rgb(239,68,68)" glowIntensity={0.3} />
        </>
      )}

      {variant === "status" && (
        <>
          <FloatingParticles count={Math.max(10, Math.round(20 * intensity))} color="rgb(34,197,94)" />
          <DataGrid color="rgb(34,197,94)" />
        </>
      )}

      {variant === "legal" && (
        <>
          <FloatingParticles count={Math.max(6, Math.round(12 * intensity))} color="rgb(148,163,184)" />
          <Rotating3DRing size={500} color="rgba(148,163,184,0.15)" thickness={2} duration={35} />
        </>
      )}

      {variant === "default" && (
        <>
          <FloatingParticles count={Math.max(8, Math.round(15 * intensity))} color="rgb(148,163,184)" />
          <Rotating3DRing size={600} color="rgba(148,163,184,0.1)" thickness={1} duration={40} />
        </>
      )}
    </div>
  );
}
