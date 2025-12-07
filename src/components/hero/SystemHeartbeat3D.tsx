"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * System Heartbeat 3D - Status Page
 * Pulsing server core with service status nodes
 */
export function SystemHeartbeat3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 22 });

  const serviceNodes = [
    { name: "API", status: "operational", angle: 0, color: "rgb(52,211,153)" },
    { name: "WS", status: "operational", angle: 60, color: "rgb(52,211,153)" },
    { name: "DB", status: "operational", angle: 120, color: "rgb(52,211,153)" },
    { name: "AUTH", status: "degraded", angle: 180, color: "rgb(251,191,36)" },
    { name: "CACHE", status: "operational", angle: 240, color: "rgb(52,211,153)" },
    { name: "ML", status: "operational", angle: 300, color: "rgb(52,211,153)" },
  ];

  useEffect(() => {
    if (!hasMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMotion]);

  useEffect(() => {
    if (!hasMotion || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x * 10);
      mouseY.set(y * 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMotion, mouseX, mouseY]);

  // Static fallback
  if (!hasMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[350px] h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-amber-500/15 rounded-full blur-3xl" />
            <div className="absolute inset-16 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            {serviceNodes.slice(0, 4).map((node, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: node.color,
                  opacity: 0.6,
                  left: `${50 + 35 * Math.cos((node.angle - 90) * Math.PI / 180)}%`,
                  top: `${50 + 35 * Math.sin((node.angle - 90) * Math.PI / 180)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1300px" }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateY: smoothX,
          rotateX: smoothY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="relative w-[380px] h-[380px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Central server core */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(52,211,153,0.8), rgba(16,185,129,0.6), rgba(4,120,87,0.4))",
              boxShadow: "0 0 60px rgba(52,211,153,0.5), 0 0 100px rgba(16,185,129,0.3), inset 0 0 30px rgba(255,255,255,0.2)",
              transform: "translateZ(50px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Heartbeat pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "3px solid rgba(52,211,153,0.8)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: isHighMotion ? 1 : 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Second pulse wave */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(52,211,153,0.6)",
              }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: isHighMotion ? 1 : 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2,
              }}
            />

            {/* Core icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: isHighMotion ? 0.8 : 1.2,
                  repeat: Infinity,
                }}
              >
                💓
              </motion.div>
            </div>

            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border border-white/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Service status nodes */}
          {serviceNodes.map((node, index) => {
            const radius = 140;
            const x = radius * Math.cos((node.angle - 90) * Math.PI / 180);
            const y = radius * Math.sin((node.angle - 90) * Math.PI / 180);
            const isOperational = node.status === "operational";

            return (
              <motion.div
                key={node.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  x: x,
                  y: y,
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              >
                {/* Node outer glow */}
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${node.color}40, transparent)`,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: isOperational ? [0.4, 0.8, 0.4] : [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: isOperational ? 2 : 1,
                    repeat: Infinity,
                  }}
                />

                {/* Node circle */}
                <motion.div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${node.color}CC, ${node.color}80)`,
                    boxShadow: `0 0 20px ${node.color}80, inset 0 0 10px rgba(255,255,255,0.3)`,
                    transform: "translateZ(35px)",
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${node.color}80`,
                      `0 0 35px ${node.color}AA`,
                      `0 0 20px ${node.color}80`,
                    ],
                    scale: isOperational ? 1 : [1, 1.05, 1],
                  }}
                  transition={{
                    duration: isOperational ? 2 : 0.8,
                    repeat: Infinity,
                  }}
                >
                  {/* Status indicator */}
                  <span className="text-white text-xs font-bold">
                    {isOperational ? "✓" : "!"}
                  </span>
                </motion.div>

                {/* Node label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-wider"
                  style={{
                    top: "52px",
                    color: node.color,
                    textShadow: `0 0 8px ${node.color}`,
                  }}
                >
                  {node.name}
                </motion.div>

                {/* Connection line to core */}
                <svg
                  className="absolute overflow-visible"
                  style={{
                    width: "1px",
                    height: `${radius - 60}px`,
                    left: "50%",
                    top: "24px",
                    transform: `translateX(-50%) rotate(${node.angle + 180}deg)`,
                    transformOrigin: "top center",
                  }}
                >
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke={node.color}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  />
                </svg>

                {/* Data pulse along connection */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: node.color,
                    boxShadow: `0 0 10px ${node.color}`,
                    left: "50%",
                    top: "24px",
                    transform: "translateX(-50%)",
                  }}
                  animate={{
                    y: [0, radius - 60],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: isHighMotion ? 1 : 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            );
          })}

          {/* Orbital rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${80 + ring * 60}px`,
                height: `${80 + ring * 60}px`,
                border: `1px solid rgba(52,211,153,${0.3 - ring * 0.08})`,
                transform: `translateZ(${40 - ring * 10}px)`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: (isHighMotion ? 20 : 35) + ring * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Heartbeat line visualization */}
          <motion.svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[80px]"
            style={{ transform: "translateZ(60px) translateY(-110px)" }}
            viewBox="0 0 320 80"
          >
            <motion.path
              d="M 0 40 L 60 40 L 80 20 L 100 60 L 120 10 L 140 70 L 160 40 L 260 40 L 280 30 L 300 50 L 320 40"
              fill="none"
              stroke="rgba(52,211,153,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? {
                pathLength: [0, 1, 1, 0],
                opacity: [0.5, 1, 1, 0.5],
              } : {}}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                times: [0, 0.4, 0.9, 1],
              }}
            />
            {/* Glow effect */}
            <motion.path
              d="M 0 40 L 60 40 L 80 20 L 100 60 L 120 10 L 140 70 L 160 40 L 260 40 L 280 30 L 300 50 L 320 40"
              fill="none"
              stroke="rgba(52,211,153,0.4)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="blur(4px)"
              initial={{ pathLength: 0 }}
              animate={isInView ? {
                pathLength: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: isHighMotion ? 2 : 3,
                repeat: Infinity,
                times: [0, 0.4, 0.9, 1],
              }}
            />
          </motion.svg>

          {/* Uptime counter */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -bottom-6 px-4 py-2 rounded-lg"
            style={{
              background: "rgba(17,24,39,0.8)",
              border: "1px solid rgba(52,211,153,0.4)",
              transform: "translateZ(40px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div
              className="text-sm font-mono font-bold text-emerald-400"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              99.99% UPTIME
            </motion.div>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center gap-2 text-[10px] font-mono"
            style={{
              color: "rgba(52,211,153,0.8)",
              transform: "translateZ(30px) translateY(-30px)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SystemHeartbeat3D;
