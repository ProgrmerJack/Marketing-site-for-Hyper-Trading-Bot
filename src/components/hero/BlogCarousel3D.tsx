"use client";

import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Blog - Knowledge Constellation Card Carousel
 * 3D floating card carousel of blog posts in circular orbit
 */
export function BlogCarousel3D() {
  const motionLevel = useMotionLevel();

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  const blogCards = [
    { title: "AI Trading", color: "from-cyan-500 to-blue-600", emoji: "🤖" },
    { title: "Risk Management", color: "from-emerald-500 to-teal-600", emoji: "🛡️" },
    { title: "Market Analysis", color: "from-purple-500 to-indigo-600", emoji: "📊" },
    { title: "Strategy Guide", color: "from-pink-500 to-rose-600", emoji: "📈" },
    { title: "Tech Stack", color: "from-amber-500 to-orange-600", emoji: "⚙️" },
    { title: "Case Studies", color: "from-lime-500 to-green-600", emoji: "📚" },
  ];

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Orbital path ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-slate-600/30"
          style={{ transform: "translateZ(-50px) rotateX(60deg)" }}
          animate={
            hasMotion
              ? {
                  borderColor: [
                    "rgba(100,116,139,0.3)",
                    "rgba(59,130,246,0.4)",
                    "rgba(100,116,139,0.3)",
                  ],
                }
              : {}
          }
          transition={{
            duration: isHighMotion ? 3 : 5,
            repeat: Infinity,
          }}
        />

        {/* Orbiting blog cards */}
        {blogCards.map((card, index) => {
          const totalCards = blogCards.length;
          const angle = (index * 360) / totalCards;
          const radius = 200;

          return (
            <motion.div
              key={card.title}
              className="absolute left-1/2 top-1/2"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={
                hasMotion
                  ? {
                      rotateZ: [angle, angle + 360],
                      x: [
                        Math.cos(((angle + 0) * Math.PI) / 180) * radius,
                        Math.cos(((angle + 360) * Math.PI) / 180) * radius,
                      ],
                      y: [
                        Math.sin(((angle + 0) * Math.PI) / 180) * radius,
                        Math.sin(((angle + 360) * Math.PI) / 180) * radius,
                      ],
                      z: [
                        Math.sin(((angle + 0) * Math.PI) / 90) * 50,
                        Math.sin(((angle + 360) * Math.PI) / 90) * 50,
                      ],
                    }
                  : {
                      x: Math.cos((angle * Math.PI) / 180) * radius,
                      y: Math.sin((angle * Math.PI) / 180) * radius,
                      z: 0,
                    }
              }
              transition={{
                duration: isHighMotion ? 12 : 20,
                repeat: Infinity,
                ease: "linear",
                delay: (index * (isHighMotion ? 12 : 20)) / totalCards,
              }}
            >
              <motion.div
                className="relative w-32 h-40 rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(145deg, ${card.color.split(" ")[1]}, ${card.color.split(" ")[3]})`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
                animate={
                  hasMotion
                    ? {
                        rotateZ: [angle, angle - 360],
                        scale: [1, 1.05, 1],
                      }
                    : {}
                }
                transition={{
                  rotateZ: {
                    duration: isHighMotion ? 12 : 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: (index * (isHighMotion ? 12 : 20)) / totalCards,
                  },
                  scale: {
                    duration: isHighMotion ? 2 : 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  },
                }}
                whileHover={{ scale: 1.15, z: 100 }}
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--card))/0.06] via-transparent to-transparent" />

                {/* Card content */}
                <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center">
                  <div className="text-5xl mb-3">{card.emoji}</div>
                  <div className="text-white font-semibold text-center text-sm leading-tight">
                    {card.title}
                  </div>
                </div>

                {/* Holographic effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute left-0 right-0 h-px bg-[rgb(var(--card))/0.06]"
                      style={{
                        top: `${(i + 1) * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Central knowledge hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "0 0 40px rgba(59,130,246,0.3)",
          }}
          animate={
            hasMotion
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 40px rgba(59,130,246,0.3)",
                    "0 0 60px rgba(59,130,246,0.5)",
                    "0 0 40px rgba(59,130,246,0.3)",
                  ],
                }
              : {}
          }
          transition={{
            duration: isHighMotion ? 2 : 3,
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(var(--card))/0.06] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">📖</div>
        </motion.div>

        {/* Sparkle particles */}
        {hasMotion &&
          [...Array(10)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                boxShadow: "0 0 8px rgba(34,211,238,0.8)",
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: isHighMotion ? 2 + Math.random() : 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
      </div>
    </div>
  );
}
