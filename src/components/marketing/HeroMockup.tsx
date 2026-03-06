"use client";

import { useState, useEffect } from "react";

const REPLY_TEXT =
  "Thank you so much, Sarah! Our team works hard to make every visit special — we can't wait to see you again!";

type Phase = "shimmer" | "typing" | "published";

export function HeroMockup() {
  const [phase, setPhase] = useState<Phase>("shimmer");
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (phase === "shimmer") {
      timeout = setTimeout(() => {
        setPhase("typing");
        setTypedChars(0);
      }, 1800);
    }

    if (phase === "typing") {
      interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= REPLY_TEXT.length) {
            clearInterval(interval);
            timeout = setTimeout(() => setPhase("published"), 500);
            return prev;
          }
          return prev + 2;
        });
      }, 20);
    }

    if (phase === "published") {
      timeout = setTimeout(() => {
        setPhase("shimmer");
        setTypedChars(0);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [phase]);

  return (
    <div className="w-full max-w-md">
      {/* Google-style review card */}
      <div className="rounded-2xl border border-border-subtle bg-white p-5 shadow-[var(--shadow-card-hover)]">
        {/* Review header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 font-display">
            S
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary font-body">Sarah Mitchell</p>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 text-xs text-star">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <span className="text-[11px] text-text-muted font-body">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Review text */}
        <p className="text-sm leading-relaxed text-text-secondary font-body mb-4">
          &ldquo;Amazing experience! The staff was incredibly helpful and the
          food was outstanding. Will definitely be coming back!&rdquo;
        </p>

        {/* Divider */}
        <div className="border-t border-border-subtle mb-4" />

        {/* Reply section */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent font-display">
            B
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-xs font-semibold text-text-primary font-body">
                Bella&apos;s Bistro
              </p>
              <span className="text-[10px] text-text-muted font-body">Owner</span>
              {phase === "published" && (
                <span
                  className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-success border border-emerald-200"
                  style={{ animation: "heroIn 300ms ease-out both" }}
                >
                  &#10003; Sent
                </span>
              )}
            </div>

            {phase === "shimmer" && (
              <div className="flex flex-col gap-1.5">
                <div className="shimmer-bar h-2 w-full rounded" />
                <div className="shimmer-bar h-2 w-[85%] rounded" style={{ animationDelay: "150ms" }} />
                <div className="shimmer-bar h-2 w-[60%] rounded" style={{ animationDelay: "300ms" }} />
              </div>
            )}

            {(phase === "typing" || phase === "published") && (
              <p className="text-sm leading-relaxed text-text-secondary font-body">
                {phase === "typing"
                  ? REPLY_TEXT.slice(0, typedChars)
                  : REPLY_TEXT}
                {phase === "typing" && typedChars < REPLY_TEXT.length && (
                  <span
                    className="ml-0.5 inline-block h-3.5 w-[2px] bg-accent align-middle"
                    style={{ animation: "typingPulse 0.8s ease-in-out infinite" }}
                  />
                )}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        {phase === "published" && (
          <div
            className="mt-4 flex items-center gap-2 rounded-lg bg-bg-surface px-3 py-2"
            style={{ animation: "heroIn 300ms ease-out both" }}
          >
            <span className="text-success text-sm">&#9889;</span>
            <span className="text-xs text-text-muted font-body">
              Replied in 2 seconds — posted to Google automatically
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
