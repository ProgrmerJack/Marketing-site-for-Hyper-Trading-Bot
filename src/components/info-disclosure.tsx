import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

interface InfoDisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function InfoDisclosure({
  title,
  children,
  defaultOpen = false,
  className,
}: InfoDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-white/70 p-6 shadow-[0_25px_80px_-60px_rgba(15,23,42,0.6)] backdrop-blur dark:bg-white/10",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[color:var(--color-surface-900)] dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 text-[color:var(--color-accent-primary)] transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="mt-4 text-sm text-[color:var(--color-surface-600)] dark:text-white/65">
          {children}
        </div>
      ) : null}
    </div>
  );
}
