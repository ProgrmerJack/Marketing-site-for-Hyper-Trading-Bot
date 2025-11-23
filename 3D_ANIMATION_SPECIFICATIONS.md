# High-Quality 3D Animation Specifications

## Executive Summary
This document provides detailed specifications for creating professional, vibrant 3D animations based on the analysis of `FloatingBot3D` and `MarketConstellation` components. These patterns can be applied to enhance all 3D components in the project.

---

## 1. Core Color System

### Primary Gradient Colors
The signature cyan-to-blue gradient is the foundation of the visual identity:

```typescript
// Primary gradient (most common)
from-[rgb(79,244,207)] to-[rgb(0,179,255)]
// Hex equivalents: #4FF4CF → #00B3FF

// Alternative gradients for variety
from-cyan-400 to-blue-500      // Slightly less saturated
from-emerald-400 to-teal-500   // Green variant
from-purple-400 to-indigo-500  // Purple variant
```

### Color Application Strategy
1. **Main elements**: Use primary cyan-blue gradient
2. **Secondary elements**: Use complementary colors (emerald, purple, pink)
3. **Accents**: Use bright highlights (rgb(52,211,153) - mint green)
4. **Background glows**: Use gradient with 20-30% opacity

### RGBA Values for Programmatic Use
```typescript
const COLORS = {
  cyan: 'rgb(79,244,207)',        // #4FF4CF
  blue: 'rgb(0,179,255)',         // #00B3FF
  mint: 'rgb(52,211,153)',        // #34D399
  teal: 'rgb(34,211,238)',        // #22D3EE
  
  // For canvas gradients
  cyano: 'rgba(79,244,207,',      // Add opacity value
  bluo: 'rgba(0,179,255,',
  teal: 'rgba(34,211,238,',
};
```

---

## 2. Glow Effects System

### Three-Layer Glow Technique
The most professional glow uses three concentric layers:

#### Layer 1: Outer Glow (Large, Subtle)
```tsx
<motion.div
  className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-30 blur-3xl"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

**Key Parameters:**
- Size: `blur-3xl` (48px blur radius)
- Opacity: 20-30% base, animate to 40-50%
- Scale: Animate between 1.0 and 1.2
- Duration: 3-4 seconds for breathing effect

#### Layer 2: Middle Glow
```typescript
// For canvas-based rendering
const middleGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
middleGlow.addColorStop(0, `rgba(${color}, ${opacity * 0.6})`);
middleGlow.addColorStop(1, `rgba(${color}, 0)`);
```

**Key Parameters:**
- Radius: 1.5x element size
- Opacity: 40-60% of base opacity
- Purpose: Creates depth between outer glow and core

#### Layer 3: Core Element
```tsx
<motion.div
  className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-2xl"
  animate={{
    boxShadow: [
      "0 0 30px rgba(79,244,207,0.5)",
      "0 0 60px rgba(0,179,255,0.8)",
      "0 0 30px rgba(79,244,207,0.5)",
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

**Key Parameters:**
- Shadow: Animate between 30px and 60px spread
- Opacity: 50-80% for active state
- Colors: Alternate between gradient start and end colors

### CSS Blur Values Reference
```css
blur-sm   /* 4px  - Subtle depth */
blur-md   /* 12px - Light glow */
blur-lg   /* 24px - Medium glow */
blur-xl   /* 36px - Strong glow */
blur-2xl  /* 40px - Very strong glow */
blur-3xl  /* 48px - Massive background glow */
```

---

## 3. Particle Systems

### Staggered Animation Pattern
```tsx
{[...Array(6)].map((_, i) => (
  <motion.div
    key={`particle-${i}`}
    className="absolute w-2 h-2 rounded-full bg-[rgb(52,211,153)]"
    style={{
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: i * 0.5,        // Stagger: 0.5s between each
      ease: "easeOut",
    }}
  />
))}
```

**Key Principles:**
- **Stagger delay**: 0.3-0.5s between particles
- **Duration**: 2-4s per cycle
- **Movement**: -20px to -40px vertical travel
- **Opacity**: Fade in/out (0 → 1 → 0)
- **Scale**: Grow and shrink (0 → 1 → 0)
- **Ease**: Use "easeOut" for rising motion

### Orbiting Particles
```tsx
{[0, 120, 240].map((angle, i) => (
  <motion.div
    key={i}
    className="absolute w-4 h-4 rounded-full bg-[rgb(79,244,207)] shadow-lg"
    animate={{
      rotateZ: [angle, angle + 360],
      x: [
        Math.cos((angle * Math.PI) / 180) * 80,
        Math.cos(((angle + 360) * Math.PI) / 180) * 80,
      ],
      y: [
        Math.sin((angle * Math.PI) / 180) * 80,
        Math.sin(((angle + 360) * Math.PI) / 180) * 80,
      ],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "linear",
      delay: i * 0.3,
    }}
  />
))}
```

**Key Parameters:**
- **Orbit radius**: 60-120px depending on element size
- **Starting angles**: Evenly distributed (0°, 120°, 240° for 3 particles)
- **Duration**: 5-8 seconds per revolution
- **Delay**: Stagger by 0.2-0.4s

### Canvas-Based Particle Systems
```typescript
interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle, opacity: number) {
  // Three-layer glow for each particle
  
  // Outer glow
  const outerGlow = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 3
  );
  outerGlow.addColorStop(0, `rgba(${particle.color}, ${opacity * 0.3})`);
  outerGlow.addColorStop(1, `rgba(${particle.color}, 0)`);
  
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();
  
  // Middle glow
  const middleGlow = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 1.5
  );
  middleGlow.addColorStop(0, `rgba(${particle.color}, ${opacity * 0.6})`);
  middleGlow.addColorStop(1, `rgba(${particle.color}, 0)`);
  
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = middleGlow;
  ctx.fill();
  
  // Core
  const coreGradient = ctx.createRadialGradient(
    particle.x - particle.size * 0.3,
    particle.y - particle.size * 0.3,
    0,
    particle.x, particle.y,
    particle.size
  );
  coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
  coreGradient.addColorStop(0.3, `rgba(${particle.color}, ${opacity})`);
  coreGradient.addColorStop(1, `rgba(${particle.color}, ${opacity * 0.7})`);
  
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = coreGradient;
  ctx.fill();
}
```

---

## 4. Holographic Scan Lines

### Horizontal Scan Line Effect
```tsx
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {[...Array(20)].map((_, i) => (
    <motion.div
      key={`line-${i}`}
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/20 to-transparent"
      style={{
        top: `${(i / 20) * 100}%`,
      }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
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
```

**Key Parameters:**
- **Line count**: 15-25 lines for full coverage
- **Height**: 1px (`h-px`)
- **Opacity**: Animate 0.1 → 0.3 → 0.1
- **Gradient**: Transparent → Color/20 → Transparent
- **Stagger**: 0.05-0.1s between lines
- **Duration**: 1.5-2.5s per cycle

### Animated Scanner Line
```tsx
<motion.div
  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
  animate={{
    top: ["10%", "90%", "10%"],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  }}
/>
```

**Key Parameters:**
- **Height**: 0.5-2px
- **Speed**: 1.5-3s for full scan
- **Ease**: "linear" for constant speed
- **Color**: White or bright cyan (rgb(79,244,207))

---

## 5. 3D Transform Techniques

### Container Setup
```tsx
<div 
  className="relative h-[400px] w-full flex items-center justify-center"
  style={{ perspective: "1000px" }}
>
  <div style={{ transformStyle: "preserve-3d" }}>
    {/* 3D content */}
  </div>
</div>
```

**Key CSS Properties:**
```css
perspective: 1000px;          /* Viewing distance, typical: 800-1500px */
transform-style: preserve-3d; /* Enable 3D children */
```

### Floating Animation Pattern
```tsx
<motion.div
  animate={{
    y: [0, -20, 0],           // Vertical float
    rotateY: [0, 5, 0, -5, 0], // Subtle Y-axis rotation
    rotateX: [0, -3, 0, 3, 0], // Subtle X-axis tilt
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    transformStyle: "preserve-3d",
  }}
/>
```

**Key Parameters:**
- **Y motion**: ±15-25px for noticeable float
- **Rotation ranges**: ±3-8 degrees for subtle wobble
- **Duration**: 6-10 seconds for slow, calm motion
- **Ease**: "easeInOut" for smooth acceleration

### 3D Layer Positioning
```tsx
// Foreground element
<div style={{ transform: "translateZ(40px)" }} />

// Middle layer
<div style={{ transform: "translateZ(0px)" }} />

// Background element
<div style={{ transform: "translateZ(-20px)" }} />
```

**Z-Axis Guidelines:**
- **Foreground**: +30px to +60px
- **Middle ground**: 0px to +20px
- **Background**: -20px to -50px
- **Spacing**: 20-30px between layers for clear depth

### Rotation Ring Effect
```tsx
<motion.div
  className="absolute w-48 h-48 rounded-full border-2 border-[rgb(0,179,255)]/30"
  style={{
    transformStyle: "preserve-3d",
    transform: "translateZ(-20px)",
  }}
  animate={{
    rotate: [0, 360],
    scale: [1, 1.05, 1],
  }}
  transition={{
    rotate: {
      duration: 20,
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
```

---

## 6. Mouse Parallax Effects

### Mouse Tracking Setup
```typescript
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize to -1 to 1 range
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    // Scale to desired rotation degrees
    setMousePosition({ x: x * 15, y: y * 15 });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
```

### Apply to 3D Element
```tsx
<motion.div
  style={{
    rotateY: mousePosition.x,      // Follow mouse X
    rotateX: -mousePosition.y,     // Follow mouse Y (inverted)
    transformStyle: "preserve-3d",
  }}
>
```

**Key Parameters:**
- **Multiplier**: 10-20 degrees for subtle effect, 20-30 for dramatic
- **Invert Y**: Negative value feels more natural
- **Smooth transition**: React motion provides natural damping

### Spring-Based Parallax (Advanced)
```typescript
import { useSpring, useMotionValue } from "framer-motion";

const x = useMotionValue(0);
const y = useMotionValue(0);

const springX = useSpring(x, { stiffness: 100, damping: 30 });
const springY = useSpring(y, { stiffness: 100, damping: 30 });

// In mouse handler:
x.set(normalizedX * 15);
y.set(normalizedY * 15);

// Use in component:
<motion.div
  style={{
    rotateX: springY,
    rotateY: springX,
  }}
/>
```

**Spring Parameters:**
- **Stiffness**: 80-120 (higher = faster response)
- **Damping**: 20-40 (higher = less oscillation)

---

## 7. Canvas-Based Complex Rendering

### Setup and Configuration
```typescript
const canvasRef = useRef<HTMLCanvasElement>(null);
const rafRef = useRef<number | undefined>(undefined);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  // Intersection Observer for performance
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  );

  if (canvasRef.current) {
    observer.observe(canvasRef.current);
  }

  return () => observer.disconnect();
}, []);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !isVisible) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Handle high DPI displays
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  ctx.scale(dpr, dpr);

  function animate() {
    if (!ctx || !canvas) return;

    // Fade trail effect instead of full clear
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, size, size);

    // Draw content here

    rafRef.current = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, [size, isVisible]);
```

### 3D Projection Math
```typescript
// Basic 3D to 2D projection
function project3D(x3d: number, y3d: number, z3d: number) {
  const rotationAngle = angleRef.current;
  
  // Rotate around Y-axis
  const rotatedX = x3d * Math.cos(rotationAngle) - z3d * Math.sin(rotationAngle);
  const rotatedZ = x3d * Math.sin(rotationAngle) + z3d * Math.cos(rotationAngle);
  
  // Apply perspective
  const x2d = centerX + rotatedX;
  const y2d = centerY + rotatedZ * 0.5; // Flatten for perspective
  
  // Calculate depth for size/opacity
  const depth = (rotatedZ + maxZ) / (maxZ * 2); // 0 to 1
  
  return { x: x2d, y: y2d, depth };
}
```

### Orbital Motion
```typescript
interface OrbitingElement {
  name: string;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
  color: string; // RGB values: "79, 244, 207"
}

function updateOrbits(elements: OrbitingElement[]) {
  elements.forEach((element) => {
    element.angle += element.speed;
    
    // Calculate 3D position
    const x3d = Math.cos(element.angle) * element.orbitRadius;
    const z3d = Math.sin(element.angle) * element.orbitRadius;
    
    // Project to 2D
    const { x, y, depth } = project3D(x3d, 0, z3d);
    
    // Depth-based sizing and opacity
    const actualSize = element.size * (0.7 + depth * 0.6);
    const opacity = 0.4 + depth * 0.6;
    
    drawElement(ctx, x, y, actualSize, element.color, opacity);
  });
}
```

### Performance Optimization
```typescript
// Limit frame rate on mobile
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function animate(currentTime: number) {
  if (currentTime - lastTime < frameInterval) {
    rafRef.current = requestAnimationFrame(animate);
    return;
  }
  lastTime = currentTime;
  
  // Draw logic here
  
  rafRef.current = requestAnimationFrame(animate);
}
```

---

## 8. Best Practices Summary

### Color Palette
✅ **DO:**
- Use rgb(79,244,207) → rgb(0,179,255) as primary gradient
- Add complementary colors (emerald, purple) for variety
- Use 20-30% opacity for background glows
- Animate between gradient colors for pulsing effects

❌ **DON'T:**
- Mix too many different color schemes
- Use pure white for glows (too harsh)
- Forget dark mode compatibility

### Animation Timing
✅ **DO:**
- Use 6-10s for slow ambient animations
- Use 2-4s for attention-grabbing pulses
- Stagger particle animations by 0.3-0.5s
- Use "easeInOut" for most organic motion

❌ **DON'T:**
- Animate too fast (< 1.5s feels jittery)
- Use linear ease for organic motion
- Animate everything simultaneously (overwhelming)

### 3D Effects
✅ **DO:**
- Set perspective to 1000-1500px
- Use transformStyle: "preserve-3d" on containers
- Layer elements with translateZ (±20-50px)
- Keep rotation subtle (±3-8 degrees)

❌ **DON'T:**
- Rotate too aggressively (disorienting)
- Forget to set perspective on parent
- Mix 2D and 3D siblings without preserve-3d

### Performance
✅ **DO:**
- Use IntersectionObserver for canvas animations
- Cap DPR at 2 for high-DPI displays
- Use requestAnimationFrame properly
- Clean up event listeners and animation frames

❌ **DON'T:**
- Animate invisible elements
- Render full resolution on all devices
- Forget cleanup in useEffect returns

### Glow Effects
✅ **DO:**
- Use three-layer glow technique (outer, middle, core)
- Animate opacity and scale together
- Use blur-3xl (48px) for outer glow
- Combine boxShadow with blur filters

❌ **DON'T:**
- Use single-layer glows (flat appearance)
- Over-blur small elements (disappears)
- Forget shadow color opacity

### Particle Systems
✅ **DO:**
- Stagger animations with delay
- Combine opacity, scale, and position animations
- Use 5-15 particles per system (not overwhelming)
- Randomize starting positions slightly

❌ **DON'T:**
- Synchronize all particles (robotic)
- Use too many particles (laggy)
- Forget to clean up particle arrays

---

## 9. Component Enhancement Roadmap

### TradingPipeline3D
**Current:** Basic nodes with glows  
**Enhancements:**
- Add orbiting data particles around each node
- Implement three-layer glow on active nodes
- Add holographic scan lines to pipeline path
- Animate data flow between nodes with particle trails

### DefenseDome3D
**Current:** Glass dome with candlesticks  
**Enhancements:**
- Add particle shield effect around dome perimeter
- Implement three-layer glow on dome surface
- Add orbiting security indicators
- Animate threat detection pulses with radial waves

### TradingCockpit3D
**Current:** Floating screens  
**Enhancements:**
- Add holographic scan lines to each screen
- Implement data particle flow from screens
- Add three-layer glow to active screen
- Animate keyboard/mouse interaction particles

### PricingCards3D
**Current:** Stacked cards  
**Enhancements:**
- Add orbiting value indicators around cards
- Implement three-layer glow on selected card
- Add particle effects on hover/selection
- Animate price change with rising particles

### OrbitalDataLab3D
**Current:** Orbiting cubes  
**Enhancements:**
- Add three-layer glow to each cube
- Implement data trails behind moving cubes
- Add holographic grid lines in orbital paths
- Animate layout transitions with particle bursts

### BlogCarousel3D
**Current:** Rotating cards  
**Enhancements:**
- Add holographic scan lines to cards
- Implement three-layer glow on focused card
- Add particle effects during rotation
- Animate reading progress with rising particles

### ContactGlobe3D
**Current:** Globe with locations  
**Enhancements:**
- Add orbiting communication satellites
- Implement three-layer glow on location pins
- Add data beam effects between locations
- Animate connection pulses with expanding rings

---

## 10. Implementation Code Templates

### Template: Basic 3D Component with Glow
```tsx
"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState } from "react";

export function Enhanced3DComponent() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="relative h-[400px] w-full flex items-center justify-center">
        {/* Static fallback */}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400px] w-full flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-64 h-64"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -3, 0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Core element */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(79,244,207,0.5)",
                "0 0 60px rgba(0,179,255,0.8)",
                "0 0 30px rgba(79,244,207,0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Content here */}
          </motion.div>
        </motion.div>

        {/* Orbiting particles */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-[rgb(79,244,207)] shadow-lg"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateZ: [angle, angle + 360],
              x: [
                Math.cos((angle * Math.PI) / 180) * 80,
                Math.cos(((angle + 360) * Math.PI) / 180) * 80,
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * 80,
                Math.sin(((angle + 360) * Math.PI) / 180) * 80,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/20 to-transparent"
            style={{ top: `${(i / 20) * 100}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

### Template: Canvas-Based Complex Animation
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

interface Props {
  size?: number;
  className?: string;
}

export function CanvasAnimation({ size = 500, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const { shouldReduceMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const angleRef = useRef(0);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || shouldReduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;

    // Animation data
    const elements = [
      { orbitRadius: 80, angle: 0, speed: 0.01, size: 16, color: "79, 244, 207" },
      { orbitRadius: 120, angle: 2, speed: 0.012, size: 14, color: "0, 179, 255" },
      { orbitRadius: 100, angle: 4, speed: 0.015, size: 12, color: "52, 211, 153" },
    ];

    function animate() {
      if (!ctx || !canvas) return;

      // Fade trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, size, size);

      angleRef.current += 0.002;

      // Draw central element
      const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 25
      );
      centerGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      centerGradient.addColorStop(0.3, "rgba(79, 244, 207, 0.8)");
      centerGradient.addColorStop(1, "rgba(0, 179, 255, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      // Update and draw orbiting elements
      elements.forEach((el) => {
        el.angle += el.speed;

        // 3D projection
        const x3d = Math.cos(el.angle) * el.orbitRadius;
        const z3d = Math.sin(el.angle) * el.orbitRadius;

        const rotatedX = x3d * Math.cos(angleRef.current) - z3d * Math.sin(angleRef.current);
        const rotatedZ = x3d * Math.sin(angleRef.current) + z3d * Math.cos(angleRef.current);

        const x = centerX + rotatedX;
        const y = centerY + rotatedZ * 0.5;

        // Depth-based sizing
        const depth = (rotatedZ + el.orbitRadius) / (el.orbitRadius * 2);
        const actualSize = el.size * (0.7 + depth * 0.6);
        const opacity = 0.4 + depth * 0.6;

        // Three-layer glow
        // Outer glow
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 3);
        outerGlow.addColorStop(0, `rgba(${el.color}, ${opacity * 0.3})`);
        outerGlow.addColorStop(1, `rgba(${el.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Middle glow
        const middleGlow = ctx.createRadialGradient(x, y, 0, x, y, actualSize * 1.5);
        middleGlow.addColorStop(0, `rgba(${el.color}, ${opacity * 0.6})`);
        middleGlow.addColorStop(1, `rgba(${el.color}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = middleGlow;
        ctx.fill();

        // Core
        const coreGradient = ctx.createRadialGradient(
          x - actualSize * 0.3, y - actualSize * 0.3, 0,
          x, y, actualSize
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        coreGradient.addColorStop(0.3, `rgba(${el.color}, ${opacity})`);
        coreGradient.addColorStop(1, `rgba(${el.color}, ${opacity * 0.7})`);
        ctx.beginPath();
        ctx.arc(x, y, actualSize, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [size, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Animation</p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
```

---

## 11. Quick Reference

### Essential Colors (Copy-Paste Ready)
```tsx
// Gradients
"bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)]"
"bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/20 to-transparent"

// Solid colors
"bg-[rgb(79,244,207)]"  // Cyan
"bg-[rgb(0,179,255)]"   // Blue
"bg-[rgb(52,211,153)]"  // Mint

// Border colors
"border-[rgb(0,179,255)]/30"
```

### Essential Blur Values
```tsx
blur-3xl   // Outer glow (48px)
blur-xl    // Medium glow (36px)
blur-lg    // Light glow (24px)
```

### Essential Animation Durations
```tsx
duration: 8  // Slow float
duration: 3  // Breathing glow
duration: 2  // Active pulse
duration: 6  // Orbit rotation
```

### Essential 3D Values
```tsx
perspective: "1000px"
transformStyle: "preserve-3d"
transform: "translateZ(40px)"    // Foreground
transform: "translateZ(-20px)"   // Background
```

---

## Conclusion

These specifications provide a complete blueprint for creating high-quality, vibrant 3D animations that match the professional quality of FloatingBot3D and MarketConstellation. The key principles are:

1. **Color consistency**: Stick to cyan-blue gradient palette
2. **Three-layer glows**: Outer, middle, and core for depth
3. **Smooth animations**: 6-10s durations with easeInOut
4. **Proper 3D setup**: perspective + preserve-3d
5. **Particle staggering**: 0.3-0.5s delays for organic feel
6. **Canvas optimization**: IntersectionObserver + DPR handling

Apply these patterns to all seven target components for a cohesive, professional 3D experience across the entire marketing site.
