import clsx from "clsx";
import type { ComponentType, ReactNode } from "react";

type IntrinsicHiddenElement = "span" | "div" | "label" | "p";

type HiddenComponent = ComponentType<{ className?: string; children?: ReactNode }>;

export type VisuallyHiddenProps = React.HTMLAttributes<HTMLElement> & {
  as?: IntrinsicHiddenElement | HiddenComponent;
  children?: ReactNode;
};

export function VisuallyHidden({
  as: Component = "span",
  className,
  children,
  ...props
}: VisuallyHiddenProps) {
  const classes = clsx(
    "absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
    className,
  );

  if (typeof Component === "string") {
    return (
      <Component className={classes} {...props}>
        {children}
      </Component>
    );
  }

  const ResolvedComponent = Component as HiddenComponent;
  return (
    <ResolvedComponent className={classes} {...props}>
      {children}
    </ResolvedComponent>
  );
}
