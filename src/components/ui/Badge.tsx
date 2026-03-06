import type { BadgeVariant } from "@/types";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-bg-elevated text-text-secondary border-border-default",
  success: "bg-[#052e16] text-success border-[#065f46]",
  warning: "bg-[#431407] text-warning border-[#78350f]",
  error:   "bg-[#450a0a] text-error border-[#7f1d1d]",
  purple:  "bg-[#2e1065] text-[#a78bfa] border-accent-dim",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "px-2.5 py-0.5",
        "border rounded-full",
        "text-xs font-medium",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
