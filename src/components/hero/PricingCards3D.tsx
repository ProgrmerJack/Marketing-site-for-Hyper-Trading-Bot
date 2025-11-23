"use client";

import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";
import { useState } from "react";

/**
 * Pricing - Stack of 3D Pricing Cards
 * Three cards (Starter/Pro/Institutional) with interactive state switching
 */
export function PricingCards3D() {
  const motionLevel = useMotionLevel();
  const [activeCard, setActiveCard] = useState(1); // Pro is default

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  const cards = [
    {
      name: "Starter",
      price: "$99",
      color: "from-cyan-500 to-blue-600",
      glowColor: "rgba(34,211,238,0.6)",
      features: ["Basic signals", "Email support", "5 strategies"],
    },
    {
      name: "Pro",
      price: "$299",
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.6)",
      features: ["All signals", "Priority support", "Unlimited strategies"],
    },
    {
      name: "Institutional",
      price: "Custom",
      color: "from-purple-500 to-indigo-600",
      glowColor: "rgba(168,85,247,0.6)",
      features: ["White-label", "Dedicated support", "Custom integration"],
    },
  ];

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center"
      style={{ perspective: "1500px" }}
    >
      <div className="relative w-full max-w-5xl" style={{ transformStyle: "preserve-3d" }}>
        {/* Coin pile background */}
        <motion.div
          className="absolute left-1/2 bottom-8 -translate-x-1/2 w-48 h-24"
          style={{
            transform: "translateZ(-100px)",
          }}
          animate={
            hasMotion
              ? {
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: isHighMotion ? 3 : 5,
            repeat: Infinity,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`coin-${i}`}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600"
              style={{
                left: `${(i % 4) * 30}px`,
                bottom: `${Math.floor(i / 4) * 15}px`,
                boxShadow: "0 4px 12px rgba(251,191,36,0.4)",
                border: "2px solid rgba(245,158,11,0.6)",
              }}
              animate={
                hasMotion
                  ? {
                      rotateY: [0, 360],
                    }
                  : {}
              }
              transition={{
                duration: isHighMotion ? 2 + i * 0.2 : 4 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            >
              <div className="absolute inset-2 rounded-full border-2 border-yellow-300/40" />
              <span className="absolute inset-0 flex items-center justify-center text-yellow-200 font-bold text-xs">
                $
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Three pricing cards */}
        <div className="relative flex justify-center items-center gap-8 h-full">
          {cards.map((card, index) => {
            const isActive = activeCard === index;
            const offset = (index - activeCard) * 120;
            const zOffset = isActive ? 150 : -50 * Math.abs(index - activeCard);

            return (
              <motion.div
                key={card.name}
                className="relative cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={
                  hasMotion
                    ? {
                        x: offset,
                        z: zOffset,
                        rotateY: isActive ? [0, 2, -2, 0] : (index - activeCard) * 15,
                        scale: isActive ? 1.15 : 0.85,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  rotateY: {
                    duration: isHighMotion ? 3 : 5,
                    repeat: isActive ? Infinity : 0,
                  },
                }}
                onClick={() => setActiveCard(index)}
              >
                {/* Card body */}
                <motion.div
                  className="relative w-72 h-96 rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${card.color.split(" ")[1]}, ${card.color.split(" ")[3]})`,
                    boxShadow: isActive
                      ? `0 0 80px ${card.glowColor}, 0 20px 60px rgba(0,0,0,0.4)`
                      : "0 10px 30px rgba(0,0,0,0.3)",
                    border: `2px solid ${isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                  }}
                  animate={
                    hasMotion && isActive
                      ? {
                          boxShadow: [
                            `0 0 80px ${card.glowColor}, 0 20px 60px rgba(0,0,0,0.4)`,
                            `0 0 120px ${card.glowColor}, 0 25px 70px rgba(0,0,0,0.5)`,
                            `0 0 80px ${card.glowColor}, 0 20px 60px rgba(0,0,0,0.4)`,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: isHighMotion ? 2 : 3,
                    repeat: Infinity,
                  }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--card))/0.06] via-transparent to-transparent" />

                  {/* Card content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Plan name */}
                    <motion.h3
                      className="text-3xl font-bold text-white mb-2"
                      animate={
                        hasMotion && isActive
                          ? {
                              scale: [1, 1.05, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: isHighMotion ? 2 : 3,
                        repeat: Infinity,
                      }}
                    >
                      {card.name}
                    </motion.h3>

                    {/* Price */}
                    <div className="text-5xl font-extrabold text-white mb-8">
                      {card.price}
                      {card.price !== "Custom" && <span className="text-xl text-white/70">/mo</span>}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 flex-grow">
                      {card.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-3 text-white/90"
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isActive
                              ? {
                                  opacity: 1,
                                  x: 0,
                                }
                              : {
                                  opacity: 0.5,
                                  x: -20,
                                }
                          }
                          transition={{
                            duration: 0.3,
                            delay: isActive ? i * 0.1 : 0,
                          }}
                        >
                          <div className="w-5 h-5 rounded-full bg-[rgb(var(--card))/0.08] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      className="mt-6 w-full py-3 rounded-lg bg-[rgb(var(--card))/0.08] hover:bg-[rgb(var(--card))/0.12] text-white font-semibold backdrop-blur-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Choose {card.name}
                    </motion.button>
                  </div>

                  {/* Animated border particles */}
                  {hasMotion && isActive && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`border-particle-${i}`}
                          className="absolute w-2 h-2 rounded-full bg-[rgb(var(--card))/0.9]"
                          style={{
                            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                            offsetPath: "path('M 0 0 L 288 0 L 288 384 L 0 384 Z')",
                            offsetRotate: "0deg",
                          }}
                          animate={{
                            offsetDistance: ["0%", "100%"],
                          }}
                          transition={{
                            duration: isHighMotion ? 3 : 5,
                            repeat: Infinity,
                            delay: i * 0.75,
                            ease: "linear",
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Holographic scan lines */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`scan-${i}`}
                      className="absolute left-0 right-0 h-px bg-[rgb(var(--card))/0.06]"
                      style={{
                        top: `${(i + 1) * 16.67}%`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Popular badge for Pro */}
                {index === 1 && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold text-sm z-20"
                    style={{
                      boxShadow: "0 4px 15px rgba(251,191,36,0.5)",
                    }}
                    animate={
                      hasMotion
                        ? {
                            y: [-2, 2, -2],
                          }
                        : {}
                    }
                    transition={{
                      duration: isHighMotion ? 2 : 3,
                      repeat: Infinity,
                    }}
                  >
                    POPULAR
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {cards.map((_, index) => (
            <motion.button
              key={`dot-${index}`}
              className="w-3 h-3 rounded-full cursor-pointer"
              style={{
                backgroundColor: activeCard === index ? "rgb(255,255,255)" : "rgb(100,116,139)",
              }}
              onClick={() => setActiveCard(index)}
              animate={
                hasMotion
                  ? {
                      scale: activeCard === index ? 1.4 : 1,
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
