"use client";

import React from "react";

/**
 * Custom StarBorder component that replaces @appletosolutions/reactbits StarBorder
 * to fix the hard-coded dark background in the inner-content class.
 *
 * The original component from reactbits has:
 *   .inner-content { background: #000; color: white; }
 * which breaks light mode theming.
 *
 * This version uses theme-aware transparent backgrounds.
 */

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
}

export function StarBorder({
  as: Component = "div",
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...props
}: StarBorderProps) {
  return (
    <>
      <style>{`
        .star-border-container {
          display: inline-block;
          padding: 1px 0;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }
        
        .border-gradient-bottom {
          position: absolute;
          width: 300%;
          height: 50%;
          opacity: 0.7;
          bottom: -11px;
          right: -250%;
          border-radius: 50%;
          animation: star-movement-bottom linear infinite alternate;
          z-index: 0;
        }
        
        .border-gradient-top {
          position: absolute;
          opacity: 0.7;
          width: 300%;
          height: 50%;
          top: -10px;
          left: -250%;
          border-radius: 50%;
          animation: star-movement-top linear infinite alternate;
          z-index: 0;
        }
        
        /* FIXED: Theme-aware inner-content - no more hard-coded #000 background */
        .star-border-inner-content {
          position: relative;
          border: 1px solid rgba(128, 128, 128, 0.2);
          background: transparent;
          color: inherit;
          font-size: 16px;
          text-align: center;
          padding: 16px 26px;
          border-radius: 20px;
          z-index: 1;
        }
        
        @keyframes star-movement-bottom {
          0% {
            transform: translate(0%, 0%);
            opacity: 1;
          }
          100% {
            transform: translate(-100%, 0%);
            opacity: 0;
          }
        }
        
        @keyframes star-movement-top {
          0% {
            transform: translate(0%, 0%);
            opacity: 1;
          }
          100% {
            transform: translate(100%, 0%);
            opacity: 0;
          }
        }
      `}</style>
      <div className={`star-border-container ${className}`} {...props}>
        <div
          className="border-gradient-bottom"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        <div
          className="border-gradient-top"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        <div className="star-border-inner-content">{children}</div>
      </div>
    </>
  );
}

export default StarBorder;
