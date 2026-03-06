"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import type { ButtonVariant } from "@/types";
import { buttonStyles, variantStyles, sizeStyles } from "@/lib/styles";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2",
          "font-body font-medium",
          "rounded-[var(--radius-md)]",
          "transition-all duration-150 ease-out",
          "disabled:opacity-50 disabled:pointer-events-none",
          "cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading && (
          <span
            className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonStyles };
export type { ButtonProps };
