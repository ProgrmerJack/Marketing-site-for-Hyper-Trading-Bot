"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useMotionLevel } from "@/hooks/useMotionLevel";

/**
 * Contact - 3D Globe with Connections
 * Interactive globe showing pulsing connection lines between global locations
 */
export function ContactGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionLevel = useMotionLevel();

  const isHighMotion = motionLevel === "high";
  const isMediumMotion = motionLevel === "medium";
  const hasMotion = isHighMotion || isMediumMotion;

  const locations = useMemo(
    () => [
    { name: "New York", lat: 40.7128, lon: -74.006, color: "rgba(34,211,238,0.8)" },
    { name: "London", lat: 51.5074, lon: -0.1278, color: "rgba(16,185,129,0.8)" },
    { name: "Singapore", lat: 1.3521, lon: 103.8198, color: "rgba(168,85,247,0.8)" },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503, color: "rgba(251,191,36,0.8)" },
    { name: "Frankfurt", lat: 50.1109, lon: 8.6821, color: "rgba(59,130,246,0.8)" },
    ],
    [] as const
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    let rotation = 0;

    const latLonToPoint = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + rotation) * (Math.PI / 180);

      const x = centerX + r * Math.sin(phi) * Math.cos(theta);
      const y = centerY + r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      return { x, y, z };
    };

    const drawGlobe = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (hasMotion) {
        rotation += isHighMotion ? 0.2 : 0.1;
      }

      // Draw globe sphere with grid
      ctx.strokeStyle = "rgba(71,85,105,0.3)";
      ctx.lineWidth = 1;

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const point = latLonToPoint(lat, lon, radius);
          if (point.z > 0) {
            if (lon === -180) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = latLonToPoint(lat, lon, radius);
          if (point.z > 0) {
            if (lat === -90) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw connection arcs
      if (hasMotion) {
        const pulsePhase = (time / 1000) % 2;

        for (let i = 0; i < locations.length; i++) {
          for (let j = i + 1; j < locations.length; j++) {
            const start = latLonToPoint(locations[i].lat, locations[i].lon, radius);
            const end = latLonToPoint(locations[j].lat, locations[j].lon, radius);

            if (start.z > 0 || end.z > 0) {
              const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
              gradient.addColorStop(0, locations[i].color);
              gradient.addColorStop(1, locations[j].color);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.globalAlpha = 0.3 + Math.abs(Math.sin(pulsePhase * Math.PI + i)) * 0.4;

              // Draw curved arc
              const midLat = (locations[i].lat + locations[j].lat) / 2;
              const midLon = (locations[i].lon + locations[j].lon) / 2;
              const arcHeight = 30;
              const mid = latLonToPoint(midLat, midLon, radius + arcHeight);

              ctx.beginPath();
              ctx.moveTo(start.x, start.y);
              ctx.quadraticCurveTo(mid.x, mid.y, end.x, end.y);
              ctx.stroke();

              // Animated particle along arc
              const particleProgress = (pulsePhase + i * 0.2) % 1;
              const t = particleProgress;
              const px = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x;
              const py = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y;

              ctx.globalAlpha = 1;
              ctx.fillStyle = locations[i].color;
              ctx.beginPath();
              ctx.arc(px, py, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw location points
      locations.forEach((loc, i) => {
        const point = latLonToPoint(loc.lat, loc.lon, radius);

        if (point.z > 0) {
          // Pulsing glow
          const pulseSize = hasMotion ? 8 + Math.sin((time / 500) + i) * 3 : 8;

          ctx.shadowBlur = 15;
          ctx.shadowColor = loc.color;
          ctx.fillStyle = loc.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner core
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (hasMotion) {
        requestAnimationFrame(drawGlobe);
      }
    };

    const animate = (time: number) => {
      drawGlobe(time);
    };

    if (hasMotion) {
      let animationId = requestAnimationFrame(function loop(time) {
        animate(time);
        animationId = requestAnimationFrame(loop);
      });

      return () => cancelAnimationFrame(animationId);
    } else {
      drawGlobe(0);
    }
  }, [hasMotion, isHighMotion, locations]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: "600px", maxHeight: "500px" }}
      />

      {/* Location labels */}
      <div className="absolute inset-0 pointer-events-none">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            className="absolute px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 2) * 70}%`,
              backgroundColor: loc.color.replace("0.8", "0.2"),
              borderColor: loc.color.replace("0.8", "0.5"),
              color: "white",
            }}
            animate={
              hasMotion
                ? {
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: isHighMotion ? 2 : 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {loc.name}
          </motion.div>
        ))}
      </div>

      {/* Globe container glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          maxWidth: "600px",
          maxHeight: "500px",
          margin: "auto",
        }}
      />
    </div>
  );
}
