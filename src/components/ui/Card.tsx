import type { CardVariant } from "@/types";

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  standard: [
    "bg-bg-surface border border-border-subtle",
    "shadow-[var(--shadow-card)]",
  ].join(" "),
  glow: [
    "bg-[linear-gradient(135deg,rgba(124,58,237,0.08)_0%,var(--bg-surface)_50%)]",
    "border border-[rgba(124,58,237,0.3)]",
  ].join(" "),
};

export function Card({ variant = "standard", children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-lg)] p-6",
        "transition-all duration-200 ease-out",
        variantStyles[variant],
        hover
          ? variant === "glow"
            ? "hover:shadow-[var(--shadow-accent)] hover:-translate-y-0.5"
            : "hover:border-border-default hover:-translate-y-0.5"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
