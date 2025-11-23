"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { useEffect, useRef, useState, useMemo } from "react";
import { Shield, Users, Heart, Award, Zap, Target } from "lucide-react";

/**
 * TrustDNAHelix - About page visualization
 * A rotating double helix structure representing organizational DNA
 * with core values as glowing nodes along the strands
 * Features mouse parallax interaction and holographic effects
 */
export function TrustDNAHelix() {
  const { shouldReduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Core values that make up the DNA - memoized to prevent dependency changes
  const values = useMemo(() => [
    { icon: Shield, label: "Security", color: "#4FF4CF" },
    { icon: Users, label: "Team", color: "#00B3FF" },
    { icon: Heart, label: "Trust", color: "#A855F7" },
    { icon: Award, label: "Excellence", color: "#10B981" },
    { icon: Zap, label: "Innovation", color: "#F59E0B" },
    { icon: Target, label: "Focus", color: "#EC4899" },
  ], []);

  // Mouse parallax effect
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Canvas-based DNA helix animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || shouldReduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const helixRadius = 80;
    const helixHeight = 300;
    const strands = 2;
    const nodesPerStrand = 12;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      angleRef.current += 0.01;

      // Draw the two DNA strands
      for (let strand = 0; strand < strands; strand++) {
        const strandOffset = strand * Math.PI;

        // Draw helix backbone
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${strand === 0 ? "79,244,207" : "0,179,255"}, 0.3)`;
        ctx.lineWidth = 2;

        for (let i = 0; i <= 50; i++) {
          const progress = i / 50;
          const y = centerY - helixHeight / 2 + progress * helixHeight;
          const angle = angleRef.current + progress * Math.PI * 4 + strandOffset;
          const x = centerX + Math.cos(angle) * helixRadius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw nodes (value markers)
        for (let i = 0; i < nodesPerStrand; i++) {
          const progress = i / (nodesPerStrand - 1);
          const y = centerY - helixHeight / 2 + progress * helixHeight;
          const angle = angleRef.current + progress * Math.PI * 4 + strandOffset;
          const x = centerX + Math.cos(angle) * helixRadius;
          
          // Calculate depth for 3D effect
          const depth = Math.sin(angle);
          const scale = 0.6 + depth * 0.4;
          const opacity = 0.4 + depth * 0.6;

          // Draw node glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15 * scale);
          const valueIndex = i % values.length;
          const color = values[valueIndex].color;
          const rgb = hexToRgb(color);
          
          gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.8})`);
          gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 15 * scale, 0, Math.PI * 2);
          ctx.fill();

          // Draw node core
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, 6 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw connecting bridges between strands
      for (let i = 0; i < nodesPerStrand; i++) {
        const progress = i / (nodesPerStrand - 1);
        const y = centerY - helixHeight / 2 + progress * helixHeight;

        const angle1 = angleRef.current + progress * Math.PI * 4;
        const x1 = centerX + Math.cos(angle1) * helixRadius;

        const angle2 = angleRef.current + progress * Math.PI * 4 + Math.PI;
        const x2 = centerX + Math.cos(angle2) * helixRadius;

        // Only draw bridge if nodes are close in Z-depth
        const depth1 = Math.sin(angle1);
        const depth2 = Math.sin(angle2);
        
        if (Math.abs(depth1 - depth2) < 0.5) {
          const opacity = 0.15 + Math.abs(depth1) * 0.15;
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();

          // Draw connection pulse
          const pulseProgress = (angleRef.current * 2 + i * 0.5) % 1;
          const pulseX = x1 + (x2 - x1) * pulseProgress;
          const pulseSize = 4 * (1 - Math.abs(pulseProgress - 0.5) * 2);

          ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 2})`;
          ctx.beginPath();
          ctx.arc(pulseX, y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw central energy core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      coreGradient.addColorStop(0, "rgba(79, 244, 207, 0.4)");
      coreGradient.addColorStop(0.5, "rgba(0, 179, 255, 0.2)");
      coreGradient.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      if (isVisible) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, shouldReduceMotion, values]);

  if (shouldReduceMotion) {
    return (
      <div className="relative h-[400px] w-full flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] to-[rgb(0,179,255)] opacity-20 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-32 h-32 text-[rgb(79,244,207)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full flex items-center justify-center perspective-[1000px]"
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Holographic glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(79,244,207)] via-[rgb(0,179,255)] to-[rgb(168,85,247)] opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Canvas DNA helix */}
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="drop-shadow-2xl"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
          />
        </div>

        {/* Floating value labels */}
        {values.map((value, i) => {
          const angle = (i / values.length) * Math.PI * 2;
          const radius = 180;
          const Icon = value.icon;
          
          return (
            <motion.div
              key={value.label}
              className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 dark:bg-[rgb(var(--card))/0.08] backdrop-blur-sm border border-border"
              style={{
                left: "50%",
                top: "50%",
                x: Math.cos(angle) * radius - 50,
                y: Math.sin(angle) * radius - 15,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [
                  Math.sin(angle) * radius - 15,
                  Math.sin(angle) * radius - 25,
                  Math.sin(angle) * radius - 15,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-4 h-4" style={{ color: value.color }} />
              <span className="text-xs font-medium text-white">{value.label}</span>
            </motion.div>
          );
        })}

        {/* Scanning effect */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgb(79,244,207)] to-transparent opacity-50"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ filter: "blur(2px)" }}
        />

        {/* Holographic scan lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(79,244,207)]/30 to-transparent"
              style={{
                top: `${(i / 15) * 100}%`,
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
      </motion.div>
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
