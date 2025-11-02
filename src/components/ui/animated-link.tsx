"use client";

import Link from "next/link";
import type { Route } from "next";
import { type ReactNode } from "react";

interface AnimatedLinkProps {
  href: Route | string;
  children: ReactNode;
  className?: string;
}

export function AnimatedLink({ href, children, className = "" }: AnimatedLinkProps) {
  return (
    <Link 
      href={href as Route}
      className={`relative inline-block group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
        style={{ transitionDuration: "var(--motion-duration)" }}
      />
    </Link>
  );
}
