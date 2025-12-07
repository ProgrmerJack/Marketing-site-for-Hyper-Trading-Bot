"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Trust Vault 3D - Legal Pages (Terms, Privacy, Risk Disclosure)
 * Secure document vault with floating legal tablets
 */
export function TrustVault3D() {
  const motionLevel = useMotionLevel();
  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 28, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 28, damping: 22 });

  const legalDocuments = [
    { title: "TERMS", icon: "📜", color: "from-blue-500 to-indigo-500", glowColor: "rgba(59,130,246,0.6)" },
    { title: "PRIVACY", icon: "🔐", color: "from-purple-500 to-violet-500", glowColor: "rgba(168,85,247,0.6)" },
    { title: "RISK", icon: "⚠️", color: "from-amber-500 to-orange-500", glowColor: "rgba(251,191,36,0.6)" },
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
          <div className="relative w-[400px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 rounded-3xl blur-3xl" />
            <div className="flex justify-center items-center gap-6">
              {legalDocuments.map((doc, i) => (
                <div
                  key={i}
                  className={`w-20 h-28 rounded-lg bg-gradient-to-br ${doc.color} opacity-50`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1200px" }}
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
          className="relative w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Vault structure - base platform */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[380px] h-[140px] rounded-2xl"
            style={{
              background: "linear-gradient(145deg, rgba(17,24,39,0.95), rgba(31,41,55,0.9))",
              border: "1px solid rgba(79,244,207,0.2)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4), inset 0 0 30px rgba(79,244,207,0.05)",
              transform: "translateZ(-30px) rotateX(65deg)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Platform grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="vaultGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(79,244,207,0.5)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#vaultGrid)" />
            </svg>
          </motion.div>

          {/* Central vault core */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl"
            style={{
              background: "linear-gradient(145deg, rgba(79,244,207,0.15), rgba(34,211,238,0.1))",
              border: "2px solid rgba(79,244,207,0.4)",
              boxShadow: "0 0 40px rgba(79,244,207,0.3), inset 0 0 30px rgba(79,244,207,0.1)",
              transform: "translateZ(40px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Vault lock dial */}
            <motion.div
              className="absolute inset-2 rounded-xl border border-cyan-400/40"
              animate={{ rotate: [0, 90, 0, -90, 0] }}
              transition={{
                duration: isHighMotion ? 8 : 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Dial markers */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-0.5 h-2 bg-cyan-400/60"
                  style={{
                    left: "50%",
                    top: "4px",
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    transformOrigin: "bottom center",
                  }}
                />
              ))}
            </motion.div>

            {/* Center shield icon */}
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              🛡️
            </div>

            {/* Security glow */}
            <motion.div
              className="absolute -inset-4 rounded-2xl"
              style={{
                background: "radial-gradient(circle, rgba(79,244,207,0.2), transparent 70%)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Legal document tablets */}
          {legalDocuments.map((doc, index) => {
            const xOffset = (index - 1) * 130;
            const yOffset = index === 1 ? -20 : 0;
            const zOffset = 55 + (index === 1 ? 15 : 0);
            const rotation = (index - 1) * 8;

            return (
              <motion.div
                key={doc.title}
                className="absolute left-1/2 top-1/2"
                style={{
                  x: xOffset,
                  y: yOffset - 40,
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: yOffset - 40 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.15,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                {/* Document shadow */}
                <motion.div
                  className="absolute -inset-4 rounded-xl"
                  style={{
                    background: `radial-gradient(ellipse, ${doc.glowColor}, transparent 70%)`,
                    filter: "blur(15px)",
                    transform: "translateZ(-10px)",
                  }}
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />

                {/* Document tablet */}
                <motion.div
                  className={`relative w-24 h-32 rounded-xl bg-gradient-to-br ${doc.color}`}
                  style={{
                    boxShadow: `0 10px 30px ${doc.glowColor}, inset 0 0 20px rgba(255,255,255,0.15)`,
                    transform: `translateZ(${zOffset}px) rotateY(${rotation}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    y: [0, -6, 0],
                    rotateY: [rotation, rotation + 2, rotation],
                  }}
                  transition={{
                    duration: isHighMotion ? 3 : 4,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut",
                  }}
                >
                  {/* Document header */}
                  <div className="absolute top-3 left-3 right-3 h-5 rounded bg-white/20" />

                  {/* Document lines */}
                  <div className="absolute top-12 left-3 right-3 space-y-2">
                    <div className="h-1 bg-white/30 rounded-full w-full" />
                    <div className="h-1 bg-white/20 rounded-full w-4/5" />
                    <div className="h-1 bg-white/20 rounded-full w-3/5" />
                    <div className="h-1 bg-white/15 rounded-full w-4/5" />
                    <div className="h-1 bg-white/15 rounded-full w-2/3" />
                  </div>

                  {/* Document icon */}
                  <div className="absolute bottom-3 right-3 text-lg opacity-80">
                    {doc.icon}
                  </div>

                  {/* Seal/stamp effect */}
                  <motion.div
                    className="absolute bottom-8 left-3 w-8 h-8 rounded-full border-2 border-white/30"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white/70 font-bold">
                      ✓
                    </span>
                  </motion.div>

                  {/* Glass reflection */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                    }}
                  />
                </motion.div>

                {/* Document label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-wider"
                  style={{
                    top: "140px",
                    color: doc.glowColor,
                    textShadow: `0 0 10px ${doc.glowColor}`,
                  }}
                >
                  {doc.title}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Security scan effect */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[350px] h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(79,244,207,0.6), transparent)",
              boxShadow: "0 0 15px rgba(79,244,207,0.5)",
              transform: "translateZ(70px)",
            }}
            animate={{
              y: [-100, 100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: isHighMotion ? 2.5 : 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating security particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 3 === 0
                  ? "rgba(59,130,246,0.8)"
                  : i % 3 === 1
                    ? "rgba(168,85,247,0.8)"
                    : "rgba(251,191,36,0.8)",
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                boxShadow: "0 0 8px currentColor",
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Encryption rings */}
          {[1, 2].map((ring) => (
            <motion.div
              key={`enc-ring-${ring}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${180 + ring * 70}px`,
                height: `${180 + ring * 70}px`,
                border: `1px dashed rgba(79,244,207,${0.25 - ring * 0.08})`,
                borderRadius: "50%",
                transform: `translateZ(${25 - ring * 10}px)`,
              }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: (isHighMotion ? 20 : 35) + ring * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Trust verification badge */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -bottom-6 px-4 py-2 rounded-lg flex items-center gap-2"
            style={{
              background: "rgba(17,24,39,0.9)",
              border: "1px solid rgba(79,244,207,0.3)",
              transform: "translateZ(45px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono text-cyan-400/80">
              UNDERGOING INDEPENDENT REVIEW
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TrustVault3D;
