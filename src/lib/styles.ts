import type { ButtonVariant } from "@/types";

type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-white",
    "hover:bg-accent-bright hover:shadow-[var(--glow-button)] hover:-translate-y-px",
    "active:translate-y-0",
  ].join(" "),
  secondary: [
    "bg-white text-text-primary",
    "border border-border-default",
    "hover:bg-bg-surface hover:border-border-strong",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary",
    "border border-border-default",
    "hover:text-text-primary hover:bg-bg-surface hover:border-border-strong",
  ].join(" "),
  danger: [
    "bg-error/10 text-error",
    "border border-error/30",
    "hover:bg-error/20",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return [
    "inline-flex items-center justify-center gap-2",
    "font-body font-medium",
    "rounded-[var(--radius-md)]",
    "transition-all duration-150 ease-out",
    "cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
  ].join(" ");
}

export { variantStyles, sizeStyles };
