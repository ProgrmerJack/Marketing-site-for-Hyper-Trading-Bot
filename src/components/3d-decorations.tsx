"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Floating Holographic Particles
 * Decorative 3D element matching FloatingBot3D style
 * Can be added to any page for visual enhancement
 */
export function FloatingParticles({ count = 15, color = "rgb(79,244,207)" }: { count?: number; color?: string }) {
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) return null;

  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-[1000px] -z-10">
      {[...Array(count)].map((_, i) => {
        const depth = Math.random() * 200 - 100; // -100 to 100
        const size = 4 + Math.random() * 6;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${(i * 90 / count) + Math.random() * 10}%`,
              top: `${20 + Math.random() * 60}%`,
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              filter: `blur(${Math.abs(depth) / 20}px)`,
              zIndex: Math.floor(depth),
            }}
            animate={{
              y: [0, -100 - Math.random() * 50, 0],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1 + Math.random() * 0.5, 0],
              rotateZ: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * 3D DNA Helix Animation
 * Represents structure, life, and complexity
 */
export function DNAHelix({ color = "rgb(59,130,246)" }: { color?: string }) {
  const { shouldReduceMotion } = useMotion();
  if (shouldReduceMotion) return null;

  return (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center perspective-[1000px] opacity-30 -z-10">
      <div className="relative w-[200px] h-[600px] transform-style-3d rotate-12">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            className="absolute left-1/2 top-1/2 w-full"
            style={{
              marginTop: (i - 10) * 30,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {/* Strand 1 */}
            <div 
              className="absolute w-3 h-3 rounded-full left-0"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }} 
            />
            {/* Strand 2 */}
            <div 
              className="absolute w-3 h-3 rounded-full right-0"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }} 
            />
            {/* Connector */}
            <div 
              className="absolute h-[1px] left-1.5 right-1.5 top-1.5 opacity-30"
              style={{ background: color }} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Floating 3D Cubes
 * Represents blocks, data, and stability
 */
export function FloatingCubes({ count = 8, color = "rgb(168,85,247)" }: { count?: number; color?: string }) {
  const { shouldReduceMotion } = useMotion();
  if (shouldReduceMotion) return null;

  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-[1000px] -z-10">
      {[...Array(count)].map((_, i) => {
        const size = 20 + Math.random() * 30;
        return (
          <motion.div
            key={`cube-${i}`}
            className="absolute border border-current opacity-40"
            style={{
              width: size,
              height: size,
              color: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 15px ${color}`,
            }}
            animate={{
              y: [0, -100, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Data Grid / Network
 * Represents connectivity and tech
 */
export function DataGrid({ color = "rgb(34,211,238)" }: { color?: string }) {
  const { shouldReduceMotion } = useMotion();
  if (shouldReduceMotion) return null;

  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-[1000px] -z-10">
       <div className="absolute inset-0 flex items-center justify-center transform rotate-x-60 scale-150 opacity-20">
         <div 
           className="w-[200vw] h-[200vh] grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-8"
           style={{ 
             backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
         >
           <motion.div 
             className="absolute inset-0 bg-gradient-to-b from-transparent via-current to-transparent opacity-20"
             style={{ color }}
             animate={{ top: ['-100%', '100%'] }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
           />
         </div>
       </div>
    </div>
  );
}


/**
 * Holographic Scan Lines
 * Adds futuristic scan line effect to any section
 */
export function HolographicScanLines({ count = 20, color = "rgba(79,244,207,0.2)" }: { count?: number; color?: string }) {
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) return null;

  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${(i / count) * 100}%`,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Orbiting Glowing Spheres
 * 3D orbiting particles that add depth
 */
export function OrbitingSpheres({ 
  radius = 120, 
  count = 4, 
  color = "rgb(79,244,207)",
  duration = 8 
}: { 
  radius?: number; 
  count?: number; 
  color?: string;
  duration?: number;
}) {
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) return null;

  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      {[...Array(count)].map((_, i) => {
        const angle = (i * 360) / count;
        return (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateZ: [angle, angle + 360],
              x: [
                Math.cos((angle * Math.PI) / 180) * radius,
                Math.cos(((angle + 360) * Math.PI) / 180) * radius,
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * radius,
                Math.sin(((angle + 360) * Math.PI) / 180) * radius,
              ],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Pulsing Holographic Core
 * Central glowing element with pulsing animation
 */
export function PulsingCore({ 
  size = 200, 
  color = "rgb(79,244,207)",
  glowIntensity = 0.6 
}: { 
  size?: number; 
  color?: string;
  glowIntensity?: number;
}) {
  const { shouldReduceMotion } = useMotion();

  return (
  <div className="relative flex items-center justify-center -z-10" style={{ width: size, height: size }}>
      {/* Outer glow */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: size * 1.5,
              height: size * 1.5,
              background: `radial-gradient(circle, ${color.replace('rgb', 'rgba').replace(')', `,${glowIntensity})`)}, transparent 70%)`,
              filter: "blur(48px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              width: size * 1.2,
              height: size * 1.2,
              background: `radial-gradient(circle, ${color.replace('rgb', 'rgba').replace(')', `,${glowIntensity * 0.8})`)}, transparent 60%)`,
              filter: "blur(32px)",
            }}
          />
        </>
      )}

      {/* Core */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}, ${color.replace('rgb', 'rgba').replace(')', ',0.6)')})`,
        }}
        animate={!shouldReduceMotion ? {
          boxShadow: [
            `0 0 30px ${color}`,
            `0 0 60px ${color}`,
            `0 0 30px ${color}`,
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
        <div className="absolute inset-4 border border-white/20 rounded-full" />
      </motion.div>
    </div>
  );
}

/**
 * Data Stream Effect
 * Flowing data indicators with trail effect
 */
export function DataStream({ 
  count = 6, 
  color = "rgb(79,244,207)",
  direction = "up" 
}: { 
  count?: number; 
  color?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) return null;

  const getAnimationProps = () => {
    switch (direction) {
      case "up":
        return { y: [40, -40], x: 0 };
      case "down":
        return { y: [-40, 40], x: 0 };
      case "left":
        return { x: [40, -40], y: 0 };
      case "right":
        return { x: [-40, 40], y: 0 };
    }
  };

  return (
    <div className="flex gap-2">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{
            ...getAnimationProps(),
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Rotating 3D Ring
 * Decorative rotating ring with depth effect
 */
export function Rotating3DRing({ 
  size = 240, 
  color = "rgba(0,179,255,0.4)",
  thickness = 3,
  duration = 12
}: { 
  size?: number; 
  color?: string;
  thickness?: number;
  duration?: number;
}) {
  const { shouldReduceMotion } = useMotion();

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color}`,
        transformStyle: "preserve-3d",
        transform: "translateZ(-30px) rotateX(70deg)",
      }}
      animate={!shouldReduceMotion ? {
        rotateZ: [0, 360],
        scale: [1, 1.08, 1],
      } : {}}
      transition={{
        rotateZ: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  );
}
