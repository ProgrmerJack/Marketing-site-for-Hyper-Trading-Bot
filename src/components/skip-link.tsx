import clsx from "clsx";
import { VisuallyHidden } from "@hyper/ui";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={clsx(
        "fixed left-6 top-6 z-50 rounded-full bg-[color:var(--color-surface-inverse)] px-5 py-3 text-sm font-medium text-[color:var(--color-surface-50)] shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-offset-4",
        "translate-y-[-120%] opacity-0 focus-visible:inline-flex",
      )}
    >
      Skip to main content
      <VisuallyHidden as="span"> (press enter to focus)</VisuallyHidden>
    </a>
  );
}
