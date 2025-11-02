import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full font-medium transition-[transform,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      tone: {
        primary:
          "bg-[color:var(--color-accent-primary)] text-white shadow-[0_16px_35px_rgba(93,100,255,0.35)] hover:shadow-[0_18px_40px_rgba(93,100,255,0.45)]",
        secondary:
          "bg-[color:var(--color-surface-inverse)] text-[color:var(--color-surface-900)] border border-[color:var(--color-line-muted)] hover:border-transparent hover:bg-[color:var(--color-accent-primary)] hover:text-white",
        ghost:
          "bg-transparent text-[color:var(--color-surface-900)] hover:bg-[color:var(--color-line-muted)]/10",
      },
      density: {
        comfy: "h-12 px-7 text-base",
        snug: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      tone: "primary",
      density: "comfy",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tone, density, className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={clsx(buttonVariants({ tone, density }), className)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 360,
          damping: 30,
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
