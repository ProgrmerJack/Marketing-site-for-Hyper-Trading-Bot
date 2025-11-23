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
  autoPlayInterval = 5000,
}: DeviceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }
  }, [autoPlayInterval, slides.length]);

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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
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
