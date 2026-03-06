"use client";

import { useState } from "react";

const toneReplies: Record<string, string> = {
  Casual:
    "Hey Sarah! So glad you had a great time with us. Our crew really appreciates the love! Come back anytime — next coffee's on us.",
  Professional:
    "Thank you for your thoughtful review, Sarah. We're pleased to know our team delivered the standard of service we strive for. We look forward to welcoming you again.",
  Friendly:
    "Thank you so much, Sarah! It means the world to hear this. Our team works hard to make every visit special — we can't wait to see you again!",
  Custom:
    "Sarah, what a wonderful review! Our baristas will be thrilled to hear it. Swing by Saturday — we're launching a new cold brew we think you'll love.",
};
const tones = Object.keys(toneReplies);

export function ToneSelectorCard() {
  const [active, setActive] = useState("Friendly");

  return (
    <div
      className={[
        "rounded-2xl border p-6",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        "border-accent/15 bg-accent-dim/50 shadow-[var(--shadow-card)]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Every reply sounds like you
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent ring-1 ring-accent/20">
            <span>&#10024;</span> AI-Powered
          </span>
        </div>

        <p className="text-sm text-text-secondary font-body">
          Pick a tone — or set your own — and every reply matches the way you actually talk to customers.
        </p>

        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => setActive(tone)}
              className={[
                "cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium font-body transition-all",
                active === tone
                  ? "bg-accent text-white shadow-[var(--glow-button)]"
                  : "bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
              ].join(" ")}
            >
              {tone}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border-subtle bg-bg-surface p-3.5">
          <p className="text-sm leading-relaxed text-text-secondary font-body transition-all duration-300">
            {toneReplies[active]}
          </p>
        </div>
      </div>
    </div>
  );
}
