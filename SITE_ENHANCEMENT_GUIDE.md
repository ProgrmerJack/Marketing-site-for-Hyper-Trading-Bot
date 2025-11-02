# Marketing Site Enhancement Guide
## Comprehensive Implementation Plan Based on ChronicleHQ & Resend Analysis

---

## ✅ Completed

### 1. New Background Components Created
- **Aurora Background** (`src/components/backgrounds/bg/aurora.tsx`)
  - Gradient-rich aurora borealis effect
  - Configurable colors, speed, opacity
  - Perfect for hero and feature sections

- **Prism Background** (`src/components/backgrounds/bg/prism.tsx`)
  - Prismatic triangle patterns with rotation
  - Lighter aesthetic for mid-page sections
  - Adds depth without overwhelming content

---

## 📋 Phase 1: Enhanced Hero Section (High Priority)

### Current State
The hero section already has:
- ✓ Hyperspeed background
- ✓ SplitText animation for headline
- ✓ Animated metrics with AnimatedNumber
- ✓ Click and cursor effects

### Improvements Needed

#### 1.1 Update HeroBackground Component
**File:** `src/components/backgrounds/HeroBackground.tsx`

```typescript
"use client";

import dynamic from "next/dynamic";
import { useMotion } from "@/components/motion/MotionProvider";

const HyperspeedBG = dynamic(() => import("./bg/hyperspeed"), { ssr: false });
const AuroraBG = dynamic(() => import("./bg/aurora"), { ssr: false });
const PrismBG = dynamic(() => import("./bg/prism"), { ssr: false });

type HeroBackgroundName = "hyperspeed" | "aurora" | "prism";

type HeroBackgroundProps = {
  name?: HeroBackgroundName;
  className?: string;
  colors?: string[];
  speed?: number;
  opacity?: number;
};

export function HeroBackground({
  name = "aurora", // Changed default to aurora
  className,
  colors,
  speed = 1,
  opacity = 0.6
}: HeroBackgroundProps) {
  const { backgroundsEnabled, intensity, shouldReduceMotion } = useMotion();

  if (!backgroundsEnabled || shouldReduceMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${className || ""}`}
        aria-hidden="true"
      />
    );
  }

  const defaultColors = {
    hyperspeed: ["#0f172a", "#1d4ed8", "#38bdf8"],
    aurora: ["#3b82f6", "#8b5cf6", "#ec4899"],
    prism: ["#3b82f6", "#06b6d4", "#8b5cf6"],
  };

  const colorPalette = colors || defaultColors[name];

  switch (name) {
    case "hyperspeed":
      return (
        <HyperspeedBG
          paused={false}
          intensity={intensity}
          colorPalette={colorPalette}
          className={className}
        />
      );

    case "aurora":
      return (
        <AuroraBG
          colors={colorPalette}
          speed={speed}
          opacity={opacity}
          className={className}
        />
      );

    case "prism":
      return (
        <PrismBG
          colors={colorPalette}
          speed={speed}
          opacity={opacity}
          className={className}
        />
      );

    default:
      return null;
  }
}
```

#### 1.2 Device Carousel Component
**Create:** `src/components/DeviceCarousel.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DeviceSlide = {
  title: string;
  description: string;
  image?: string;
  metrics?: { label: string; value: string }[];
};

type DeviceCarouselProps = {
  slides: DeviceSlide[];
  autoPlayInterval?: number;
};

export function DeviceCarousel({
  slides,
  autoPlayInterval = 5000
}: DeviceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const timer = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlayInterval]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative">
      {/* Slide Container */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="p-8"
          >
            {/* Slide Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {currentSlide.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {currentSlide.description}
              </p>
            </div>

            {/* Slide Content */}
            {currentSlide.image && (
              <div className="mb-6 aspect-video rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
            )}

            {/* Metrics */}
            {currentSlide.metrics && (
              <div className="grid grid-cols-2 gap-4">
                {currentSlide.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border bg-background/50 p-4"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {metric.label}
                    </span>
                    <div className="mt-1 text-xl font-bold text-foreground">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 1.3 Update Hero Section in page.tsx

**File:** `src/app/page.tsx`

Replace the `HeroTelemetryCard` component with `DeviceCarousel`:

```typescript
// Add to imports
import { DeviceCarousel } from "@/components/DeviceCarousel";

// Add demo slides data
const demoSlides = [
  {
    title: "Latency Telemetry",
    description: "Real-time latency monitoring across all venues with p95 < 150ms",
    metrics: [
      { label: "Latency p95", value: "142 ms" },
      { label: "Uptime", value: "99.97%" },
      { label: "Data Points", value: "1.2M/day" },
      { label: "Venues", value: "18 active" },
    ],
  },
  {
    title: "Risk Controls",
    description: "42 control checks executed before every order leaves the sandbox",
    metrics: [
      { label: "Control Checks", value: "42/route" },
      { label: "Blocked Orders", value: "127 today" },
      { label: "Drawdown Limit", value: "5.0%" },
      { label: "Position Size", value: "Adaptive" },
    ],
  },
  {
    title: "Execution Quality",
    description: "Smart-order routing with signed execution telemetry",
    metrics: [
      { label: "Fill Rate", value: "98.4%" },
      { label: "Avg Slippage", value: "0.02%" },
      { label: "Orders Today", value: "1,247" },
      { label: "Volume", value: "$2.4M" },
    ],
  },
];

// Replace HeroTelemetryCard usage in HeroSection:
<DeviceCarousel slides={demoSlides} autoPlayInterval={7000} />
```

#### 1.4 Enhanced Hero Background

Update the hero section background in `page.tsx`:

```typescript
function HeroSection() {
  const { backgroundsEnabled, cursorEnabled, hydrated } = useMotion();

  return (
    <section className="relative min-h-[90vh] overflow-hidden py-20 md:py-32">
      {/* Enhanced Background Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {backgroundsEnabled && hydrated ? (
          <>
            {/* Primary Aurora background */}
            <HeroBackground
              name="aurora"
              colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
              speed={0.8}
              opacity={0.7}
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.3),transparent_50%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900" />
        )}
      </div>

      {/* Rest of hero content... */}
    </section>
  );
}
```

---

## 📋 Phase 2: Scroll-Linked Narrative Sections (High Priority)

### 2.1 Create Scroll Story Component

**Create:** `src/components/ScrollStory.tsx`

```typescript
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollStoryStep = {
  title: string;
  description: string;
  visual?: React.ReactNode;
};

type ScrollStoryProps = {
  steps: ScrollStoryStep[];
};

export function ScrollStory({ steps }: ScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative py-32">
      {steps.map((step, index) => (
        <ScrollStoryStep
          key={index}
          step={step}
          index={index}
          total={steps.length}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

type ScrollStoryStepProps = {
  step: ScrollStoryStep;
  index: number;
  total: number;
  scrollProgress: any;
};

function ScrollStoryStep({
  step,
  index,
  total,
  scrollProgress
}: ScrollStoryStepProps) {
  const stepProgress = useTransform(
    scrollProgress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0, 1, 0]
  );

  const opacity = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(stepProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="mb-32 grid gap-12 lg:grid-cols-2 lg:items-center"
    >
      <div className="space-y-6">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Step {index + 1}
        </div>
        <h3 className="text-4xl font-bold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
      <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
        {step.visual || (
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        )}
      </div>
    </motion.div>
  );
}
```

### 2.2 Integrate into Workflow Section

Update the `WorkflowSection` in `page.tsx`:

```typescript
import { ScrollStory } from "@/components/ScrollStory";

const workflowStorySteps = [
  {
    title: "Signals without the sorcery",
    description: "Feature stores hydrate venue, market, and on-chain telemetry in under 120ms with schema drift detection and reproducible playbacks.",
  },
  {
    title: "Risk rails first",
    description: "Position sizing, drawdown bands, circuit breakers, and venue health checks must pass before any route leaves the sandbox.",
  },
  {
    title: "Execution that respects latency",
    description: "Adaptive smart-order routes split flow across venues under a live kill switch with signed audit events for every micro decision.",
  },
];

function WorkflowSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <Container>
        <ScrollStory steps={workflowStorySteps} />
      </Container>
    </section>
  );
}
```

---

## 📋 Phase 3: Interactive Micro-Interactions (Medium Priority)

### 3.1 Magnetic Button Component

**Create:** `src/components/ui/MagneticButton.tsx`

```typescript
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className = "",
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

### 3.2 Ripple Effect Component

**Create:** `src/components/ui/RippleButton.tsx`

```typescript
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = {
  x: number;
  y: number;
  id: number;
};

type RippleButtonProps = {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
};

export function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(59, 130, 246, 0.5)"
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const addRipple = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <button
      ref={ref}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
```

---

## 📋 Phase 4: Blob Cursor (Medium Priority)

### 4.1 Blob Cursor Component

**Create:** `src/components/cursors/BlobCursor.tsx`

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

export function BlobCursor() {
  const { cursorEnabled, shouldReduceMotion } = useMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorEnabled || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorEnabled, shouldReduceMotion]);

  if (!cursorEnabled || shouldReduceMotion) return null;

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      style={{
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div
        className={`rounded-full bg-white transition-all duration-200 ${
          isPointer ? "h-12 w-12 opacity-30" : "h-10 w-10 opacity-20"
        }`}
        style={{
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
```

### 4.2 Add to Layout

**File:** `src/app/layout.tsx`

Add the BlobCursor to the layout:

```typescript
import { BlobCursor } from "@/components/cursors/BlobCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <BlobCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 📋 Phase 5: Trust & Compliance Section (Low Priority)

### 5.1 Trust Icons Component

**Create:** `src/components/TrustSection.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, Database } from "lucide-react";

const trustMetrics = [
  {
    icon: Shield,
    label: "SOC 2 Type II",
    status: "In Progress",
    description: "Independent security audit underway",
  },
  {
    icon: Lock,
    label: "Encryption",
    status: "Active",
    description: "End-to-end AES-256 encryption",
  },
  {
    icon: Eye,
    label: "Transparency",
    status: "Active",
    description: "All decisions logged and signed",
  },
  {
    icon: FileCheck,
    label: "Compliance",
    status: "Active",
    description: "GDPR & CCPA compliant",
  },
  {
    icon: Server,
    label: "Uptime",
    status: "99.97%",
    description: "Last 90 days SLA",
  },
  {
    icon: Database,
    label: "Data Residency",
    status: "Active",
    description: "EU & US regions available",
  },
];

export function TrustComplianceSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground">
            Security & Compliance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with institutional-grade security and transparency
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  {metric.status}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {metric.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 📋 Phase 6: Performance Optimization

### 6.1 Lazy Loading Strategy

Ensure all heavy components are lazy loaded:

```typescript
// In page.tsx or components
const DeviceCarousel = dynamic(() => import("@/components/DeviceCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse rounded-3xl bg-muted" />,
});

const BlobCursor = dynamic(() => import("@/components/cursors/BlobCursor"), {
  ssr: false,
});
```

### 6.2 Reduce Motion Fallbacks

Ensure all animated backgrounds have static fallbacks as already implemented.

### 6.3 Performance Budget

- Max bundle size for homepage: 250KB gzipped
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 📋 Testing Checklist

### Functionality
- [ ] Hero carousel auto-advances every 7 seconds
- [ ] Hero carousel manual navigation works
- [ ] All animations respect prefers-reduced-motion
- [ ] Blob cursor appears only when enabled
- [ ] Scroll story sections reveal on scroll
- [ ] Magnetic buttons attract cursor
- [ ] Ripple effects trigger on click

### Accessibility
- [ ] All animations can be disabled
- [ ] Keyboard navigation works for carousel
- [ ] Screen readers announce slide changes
- [ ] Focus indicators visible on all interactive elements
- [ ] Contrast ratios meet WCAG AA standards

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] No layout shifts during load
- [ ] Animations run at 60fps
- [ ] Canvas backgrounds don't block main thread
- [ ] Mobile performance is acceptable

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🎨 Color Palette Reference

### Primary Gradients
- **Hero Aurora**: `#3b82f6`, `#8b5cf6`, `#ec4899`
- **Feature Prism**: `#3b82f6`, `#06b6d4`, `#8b5cf6`
- **Section Threads**: `#3b82f6`, `#0ea5e9`, `#94a3b8`

### Accent Colors
- **Sky**: `from-sky-400/15 to-cyan-500/10`
- **Emerald**: `from-emerald-400/15 to-teal-500/10`
- **Indigo**: `from-indigo-400/15 to-purple-500/10`
- **Amber**: `from-amber-400/15 to-orange-500/10`

---

## 📊 Implementation Priority

1. **Critical (Week 1)**
   - ✓ Aurora and Prism backgrounds
   - Update HeroBackground component
   - Device Carousel component
   - Enhanced hero section background

2. **High Priority (Week 2)**
   - Scroll Story component
   - Integrate scroll animations
   - Magnetic and Ripple buttons
   - Update CTAs with micro-interactions

3. **Medium Priority (Week 3)**
   - Blob Cursor implementation
   - Trust & Compliance section
   - Performance optimizations
   - Mobile responsiveness fixes

4. **Low Priority (Week 4)**
   - Fine-tuning animations
   - A/B testing variants
   - Analytics integration
   - Final polish

---

## 🚀 Quick Start

1. **Install the new background components** (Already done)
2. **Update HeroBackground.tsx** with Aurora/Prism support
3. **Create DeviceCarousel.tsx** and integrate into hero
4. **Test on local development** server
5. **Iterate based on performance** metrics

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [ChronicleHQ Reference](https://chroniclehq.com)
- [Resend Reference](https://resend.com)
- [React Bits Components](https://github.com/premieroctet/react-bits)

---

**Status:** Ready to Implement
**Last Updated:** October 29, 2025
**Next Step:** Update HeroBackground.tsx and create DeviceCarousel.tsx
