import * as React from "react";
import clsx from "clsx";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  padding?: "none" | "compact" | "comfortable";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  padding = "comfortable",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative",
        padding === "comfortable" && "py-28 md:py-40",
        padding === "compact" && "py-20 md:py-28",
        className,
      )}
      {...props}
    >
      <Container className="flex flex-col gap-20">
        <header className="max-w-3xl space-y-6">
          {eyebrow && (
            <span className="inline-flex items-center rounded-full border border-[color:var(--color-line-muted)] bg-[color:var(--color-surface-100)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-primary)] shadow-crisp">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[color:var(--color-surface-900)] md:text-6xl lg:text-7xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-pretty text-lg leading-relaxed text-[color:var(--color-surface-600)] md:text-xl">
              {description}
            </p>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
