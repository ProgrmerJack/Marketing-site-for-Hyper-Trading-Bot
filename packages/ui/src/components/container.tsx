import * as React from "react";
import clsx from "clsx";

type IntrinsicContainerElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav";

type ContainerComponent = React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: IntrinsicContainerElement | ContainerComponent;
  widthClassName?: string;
}

export function Container({
  as: Component = "div",
  widthClassName = "max-w-[min(1600px,calc(100%-6rem))]",
  className,
  children,
  ...props
}: ContainerProps) {
  const combinedClassName = clsx(
    "mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20",
    widthClassName,
    className,
  );

  if (typeof Component === "string") {
    return React.createElement(
      Component,
      {
        className: combinedClassName,
        ...props,
      },
      children,
    );
  }

  const ResolvedComponent = Component as ContainerComponent;

  return (
    <ResolvedComponent className={combinedClassName} {...props}>
      {children}
    </ResolvedComponent>
  );
}
