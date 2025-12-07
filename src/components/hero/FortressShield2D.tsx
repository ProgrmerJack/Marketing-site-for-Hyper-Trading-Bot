"use client";

import React from "react";

/**
 * Fortress Shield 2D placeholder
 */
export default function FortressShield2D() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px]">
        <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="Security shield">
          <defs>
            <linearGradient id="shieldG2" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <polygon points="100 2 185 52 185 148 100 198 15 148 15 52" fill="url(#shieldG2)" opacity="0.95" />
          <circle cx="100" cy="100" r="14" fill="#0ea5b7" />
        </svg>
      </div>
    </div>
  );
}

export { FortressShield2D };
