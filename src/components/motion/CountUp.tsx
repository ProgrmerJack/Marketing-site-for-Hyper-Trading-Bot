"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  type AnimationPlaybackControls,
  type Easing,
} from "framer-motion";
import clsx from "clsx";
import type { MotionIntensity } from "./MotionProvider";
import { useMotion } from "./MotionProvider";

type MarginType = string | undefined; // Include undefined to match inferred types

type CountUpProps = {
  value: number;
  from?: number;
  decimals?: number;
  duration?: number;
  ease?: Easing | number[];
  formatterAction?: (value: number) => string;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
  inViewMargin?: MarginType;
};

const durationScale: Record<MotionIntensity, number> = {
  low: 0.6,
  standard: 0.85,
  high: 1,
};

export function CountUp({
  value,
  from = 0,
  decimals = 0,
  duration = 1.2,
  ease = [0.25, 0.1, 0.25, 1],
  formatterAction,
  prefix = "",
  suffix = "",
  className,
  once = true,
  inViewMargin = "-20% 0px",
}: CountUpProps) {
  const { shouldReduceMotion, intensity } = useMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  type UseInViewOptions = { once?: boolean; margin?: string | undefined };
  // @ts-expect-error: The `margin` property in `useInView` is not strictly typed in the library, and this workaround ensures compatibility.
  const inView = useInView(ref, { once, margin: inViewMargin } as UseInViewOptions);
  const motionValue = useMotionValue(shouldReduceMotion ? value : from);
  const [display, setDisplay] = useState<number>(shouldReduceMotion ? value : from);
  const animatedOnceRef = useRef(false);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const effectiveDuration = useMemo(
    () => duration * durationScale[intensity],
    [duration, intensity],
  );

  useEffect(() => motionValue.on("change", (latest) => setDisplay(latest)), [motionValue]);

  useEffect(() => {
    if (shouldReduceMotion) {
      controlsRef.current?.stop();
      motionValue.stop();
      motionValue.set(value);
      setDisplay(value);
      return;
    }

    if (!inView) {
      return;
    }

    const current = motionValue.get();
    if (once && animatedOnceRef.current && Math.abs(current - value) < 0.001) {
      return;
    }

    controlsRef.current?.stop();
    controlsRef.current = animate(motionValue, value, {
      duration: effectiveDuration,
      ease: ease as Easing,
    });
    animatedOnceRef.current = true;

    return () => {
      controlsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, effectiveDuration, ease, shouldReduceMotion]);

  const formatted = formatterAction
    ? formatterAction(display)
    : display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={clsx("inline-flex items-baseline tabular-nums", className)}>
      {prefix}
      <span aria-live="polite">{formatted}</span>
      {suffix}
    </span>
  );
}
