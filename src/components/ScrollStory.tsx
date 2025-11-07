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

import type { MotionValue } from "framer-motion";

type ScrollStoryStepProps = {
  step: ScrollStoryStep;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
};

function ScrollStoryStep({
  step,
  index,
  total,
  scrollProgress,
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
