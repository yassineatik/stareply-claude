"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-secondary font-body"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={[
            "bg-bg-elevated text-text-primary font-body text-[15px]",
            "border border-border-default rounded-[var(--radius-md)]",
            "px-3.5 py-2.5",
            "placeholder:text-text-muted",
            "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-glow)] focus:outline-none",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : "",
            className,
          ].join(" ")}
          {...props}
        />
        {error && (
          <p className="text-xs text-error font-body">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
