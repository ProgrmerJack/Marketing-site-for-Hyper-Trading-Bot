# 3D Decorations Component Reference

## Quick Usage Guide

All decorative components are importable from `@/components/3d-decorations`:

```tsx
import { 
  FloatingParticles, 
  HolographicScanLines, 
  OrbitingSpheres,
  PulsingCore,
  DataStream,
  Rotating3DRing
} from "@/components/3d-decorations";
```

---

## FloatingParticles

**Purpose:** Animated particles that float upward with opacity/scale transitions

### Props
```tsx
{
  count?: number;      // Default: 12
  color?: string;      // Default: "rgb(79,244,207)"
}
```

### Example Usage
```tsx
<FloatingParticles count={15} color="rgb(139,92,246)" />
```

### Visual Effect
- Particles rise from random positions
- Fade in/out with scale animation
- Distributed across horizontal space
- Duration: 3-5 seconds per cycle
- Staggered delays create continuous flow

### Best Use Cases
- Hero sections
- Background ambiance
- Category indicators
- Data flow visualization

---

## HolographicScanLines

**Purpose:** Futuristic horizontal scan lines with pulsing opacity

### Props
```tsx
{
  count?: number;      // Default: 20
  color?: string;      // Default: "rgba(79,244,207,0.2)"
}
```

### Example Usage
```tsx
<HolographicScanLines count={15} color="rgba(251,191,36,0.15)" />
```

### Visual Effect
- Horizontal lines across entire container
- Opacity pulses: 0.1 → 0.4 → 0.1
- Gradient: transparent → color → transparent
- Staggered delays create wave pattern
- Duration: 2 seconds per line

### Best Use Cases
- Tech/futuristic sections
- Data display backgrounds
- Trading/analytics pages
- Overlays on 3D elements

---

## OrbitingSpheres

**Purpose:** 3D orbiting particles around a central point

### Props
```tsx
{
  radius?: number;     // Default: 120
  count?: number;      // Default: 4
  color?: string;      // Default: "rgb(79,244,207)"
  duration?: number;   // Default: 8
}
```

### Example Usage
```tsx
<OrbitingSpheres 
  radius={100} 
  count={3} 
  color="rgb(34,211,238)" 
  duration={10} 
/>
```

### Visual Effect
- Spheres orbit in 3D space (preserve-3d)
- Each sphere starts at different angle
- Scale pulses: 1 → 1.4 → 1
- Multi-layer glow effect
- Smooth circular motion

### Best Use Cases
- Central decorative elements
- Loading/processing indicators
- Feature highlights
- Abstract data visualization

---

## PulsingCore

**Purpose:** Central glowing sphere with multi-layer pulsing animation

### Props
```tsx
{
  size?: number;          // Default: 200
  color?: string;         // Default: "rgb(79,244,207)"
  glowIntensity?: number; // Default: 0.6
}
```

### Example Usage
```tsx
<PulsingCore 
  size={150} 
  color="rgb(59,130,246)" 
  glowIntensity={0.5} 
/>
```

### Visual Effect
- Triple-layer glow (outer blurred, middle, core)
- Outer layer scales and pulses opacity
- Core has pulsing box-shadow
- Two concentric border rings
- Radial gradient background

### Best Use Cases
- Feature spotlights
- Central hero elements
- Data hubs
- Focus indicators

---

## DataStream

**Purpose:** Flowing data indicators with trail effect

### Props
```tsx
{
  count?: number;          // Default: 6
  color?: string;          // Default: "rgb(79,244,207)"
  direction?: "up" | "down" | "left" | "right"; // Default: "up"
}
```

### Example Usage
```tsx
<DataStream 
  count={6} 
  color="rgb(34,211,238)" 
  direction="left" 
/>
```

### Visual Effect
- Small dots move in specified direction
- Fade in/out: opacity 0 → 1 → 0
- Scale pulse: 0.5 → 1 → 0.5
- Glow effect on each dot
- Staggered timing creates stream

### Best Use Cases
- Data flow visualization
- Processing indicators
- Connection lines
- Information transfer displays

---

## Rotating3DRing

**Purpose:** Decorative rotating ring with 3D depth effect

### Props
```tsx
{
  size?: number;       // Default: 240
  color?: string;      // Default: "rgba(0,179,255,0.4)"
  thickness?: number;  // Default: 3
  duration?: number;   // Default: 12
}
```

### Example Usage
```tsx
<Rotating3DRing 
  size={200} 
  color="rgba(34,211,238,0.3)" 
  thickness={2} 
  duration={15} 
/>
```

### Visual Effect
- Tilted ring (rotateX 70deg, translateZ -30px)
- Continuous rotation (0° → 360°)
- Scale pulse: 1 → 1.08 → 1
- 3D perspective depth
- Semi-transparent border

### Best Use Cases
- Decorative frames
- Loading indicators
- Feature boundaries
- Abstract tech elements

---

## Color Palette Reference

### Primary Colors (Home Page Matching)
```tsx
Cyan-Blue Gradient: "rgb(79,244,207)" → "rgb(0,179,255)"
Emerald: "rgb(52,211,153)"
Purple: "rgb(168,85,247)"
```

### Page-Specific Colors
```tsx
// How It Works (purple/indigo)
"rgb(139,92,246)"  // Purple particles
"rgba(99,102,241,0.2)"  // Indigo scan lines

// Pricing (emerald/cyan)
"rgb(16,185,129)"  // Emerald particles
"rgb(34,211,238)"  // Cyan spheres

// About (cyan/blue)
"rgb(56,189,248)"  // Sky blue particles
"rgba(34,211,238,0.3)"  // Cyan ring

// Blog (amber/orange)
"rgb(251,191,36)"  // Amber particles
"rgba(251,191,36,0.15)"  // Amber scan lines

// Contact (sky/blue)
"rgb(56,189,248)"  // Sky blue particles
"rgb(59,130,246)"  // Blue core

// Research (sky/indigo)
"rgb(56,189,248)"  // Sky blue particles
"rgb(29,78,216)"  // Indigo data stream

// Live Demo (indigo/purple/cyan/teal)
"rgb(99,102,241)"  // Indigo particles
"rgb(34,211,238)"  // Cyan data stream
"rgb(79,244,207)"  // Teal data stream
"rgb(168,85,247)"  // Purple spheres
```

---

## Implementation Patterns

### Basic Decoration (Particles + Scan Lines)
```tsx
<section className="relative ...">
  {/* Main 3D component */}
  <div className="absolute ...">
    <MainComponent3D />
  </div>
  
  {/* Floating particles */}
  <FloatingParticles count={12} color="rgb(139,92,246)" />
  
  {/* Holographic scan lines */}
  <HolographicScanLines count={20} color="rgba(99,102,241,0.2)" />
  
  {/* Content */}
  <Container>...</Container>
</section>
```

### Advanced Decoration (Multiple Elements)
```tsx
<section className="relative ...">
  {/* Main 3D component */}
  <div className="absolute ...">
    <MainComponent3D />
  </div>
  
  {/* Floating particles */}
  <FloatingParticles count={15} color="rgb(99,102,241)" />
  
  {/* Data streams from multiple directions */}
  <div className="absolute right-20 top-1/4 hidden xl:block">
    <DataStream count={6} color="rgb(34,211,238)" direction="left" />
  </div>
  <div className="absolute left-20 bottom-1/4 hidden xl:block">
    <DataStream count={6} color="rgb(79,244,207)" direction="right" />
  </div>
  
  {/* Orbiting indicators */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block">
    <OrbitingSpheres radius={150} count={5} color="rgb(168,85,247)" duration={12} />
  </div>
  
  {/* Content */}
  <Container>...</Container>
</section>
```

---

## Performance Considerations

### Motion Preferences
All components automatically respect user motion preferences via `useMotion()` hook:
- `shouldReduceMotion === true`: Components return `null` (no animation)
- `shouldReduceMotion === false`: Full animation effects

### Positioning Best Practices
```tsx
// Always use pointer-events-none for decorations
<FloatingParticles className="pointer-events-none" />

// Hide on mobile for performance
<div className="hidden lg:block">
  <OrbitingSpheres />
</div>

// Use absolute positioning with proper z-index
<div className="absolute inset-0 -z-10 pointer-events-none">
  <HolographicScanLines />
</div>
```

### Animation Optimization
- Staggered delays prevent simultaneous starts
- Duration ranges: 2-5 seconds (prevents too-fast/too-slow)
- Use `ease-out` for particle motion (feels natural)
- Use `linear` for rotations (smooth continuous)
- Limit particle counts (10-15 recommended)

---

## Accessibility

### Motion Safety
- All components disabled when `prefers-reduced-motion` is active
- No essential information conveyed through animation alone
- Decorative elements are `aria-hidden` (pointer-events-none)

### Color Contrast
- Decorations use low opacity (don't interfere with text)
- Primary content always has sufficient contrast
- Glow effects enhance, don't obscure

### Keyboard Navigation
- Decorative elements are non-interactive (pointer-events-none)
- No focus traps or keyboard interference
- Background positioning ensures content remains accessible

---

## Troubleshooting

### Animations Not Appearing
1. Check motion preferences: `useMotion().shouldReduceMotion`
2. Verify component is imported correctly
3. Check if hidden by responsive classes (`hidden lg:block`)
4. Ensure parent has `position: relative`

### Performance Issues
1. Reduce particle count (12 → 8)
2. Increase animation duration (faster = more GPU work)
3. Remove decorations on mobile (use `hidden lg:block`)
4. Check for too many simultaneous animations

### Z-Index Issues
1. Decorations should have `-z-10` or lower
2. Main content should be `z-10` or higher
3. Use `isolate` on parent if stacking context issues

---

## Examples from Production

### How It Works Page
```tsx
<FloatingParticles count={15} color="rgb(139,92,246)" />
<HolographicScanLines count={20} color="rgba(99,102,241,0.2)" />
```

### Pricing Page
```tsx
<FloatingParticles count={12} color="rgb(16,185,129)" />
<div className="absolute left-20 top-20 hidden lg:block">
  <OrbitingSpheres radius={100} count={3} color="rgb(34,211,238)" duration={10} />
</div>
```

### Live Demo Page
```tsx
<FloatingParticles count={15} color="rgb(99,102,241)" />
<div className="absolute right-20 top-1/4 hidden xl:block">
  <DataStream count={6} color="rgb(34,211,238)" direction="left" />
</div>
<div className="absolute left-20 bottom-1/4 hidden xl:block">
  <DataStream count={6} color="rgb(79,244,207)" direction="right" />
</div>
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block">
  <OrbitingSpheres radius={150} count={5} color="rgb(168,85,247)" duration={12} />
</div>
```

---

Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
