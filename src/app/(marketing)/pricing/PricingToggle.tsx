"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonStyles } from "@/lib/styles";

type Feature = { text: string; included: boolean };

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  features: Feature[];
}

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "Try it before you commit.",
    cta: "Start for free",
    ctaHref: "/signup",
    features: [
      { text: "1 location", included: true },
      { text: "10 AI replies per month", included: true },
      { text: "Google Business connection", included: true },
      { text: "1-click publish", included: true },
      { text: "Tone customization", included: false },
      { text: "Sentiment analysis", included: false },
    ],
  },
  {
    name: "Starter",
    monthly: 29,
    annual: 24,
    description: "For the solo business owner.",
    cta: "Start free trial",
    ctaHref: "/signup?plan=starter",
    features: [
      { text: "1 location", included: true },
      { text: "100 AI replies per month", included: true },
      { text: "Google Business connection", included: true },
      { text: "1-click publish", included: true },
      { text: "Tone customization", included: true },
      { text: "Email notifications", included: true },
      { text: "Multi-location", included: false },
      { text: "White-label", included: false },
    ],
  },
  {
    name: "Growth",
    monthly: 59,
    annual: 49,
    description: "For growing businesses with multiple locations.",
    cta: "Start free trial",
    ctaHref: "/signup?plan=growth",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "3 locations", included: true },
      { text: "500 AI replies per month", included: true },
      { text: "Everything in Starter", included: true },
      { text: "Multi-location dashboard", included: true },
      { text: "Sentiment analysis", included: true },
      { text: "Slack notifications", included: true },
      { text: "Priority support", included: true },
      { text: "White-label", included: false },
    ],
  },
  {
    name: "Agency",
    monthly: 149,
    annual: 124,
    description: "For agencies managing multiple clients.",
    cta: "Contact us",
    ctaHref: "mailto:hello@stareply.io",
    features: [
      { text: "Unlimited locations", included: true },
      { text: "Unlimited replies", included: true },
      { text: "Everything in Growth", included: true },
      { text: "White-label dashboard", included: true },
      { text: "Custom AI instructions per client", included: true },
      { text: "Team member access", included: true },
      { text: "Monthly reports", included: true },
      { text: "Dedicated support", included: true },
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-success">
      <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-text-muted/40">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingToggle() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Header with toggle */}
      <section className="px-6 pb-8 pt-20 text-center md:pt-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-4xl font-extrabold text-text-primary md:text-5xl">
            Simple pricing. No surprises.
          </h1>
          <p className="mt-4 text-lg text-text-secondary font-body">
            Start free. Upgrade when your inbox needs it.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-border-subtle bg-bg-surface p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium font-body transition-all ${
                !annual
                  ? "bg-white text-text-primary shadow-[var(--shadow-card)]"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium font-body transition-all ${
                annual
                  ? "bg-white text-text-primary shadow-[var(--shadow-card)]"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Annual{" "}
              <span className="ml-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative flex flex-col rounded-2xl border p-6 transition-all",
                plan.highlight
                  ? "border-accent ring-2 ring-accent/20 scale-[1.02] z-10 bg-white shadow-[var(--shadow-accent)]"
                  : "border-border-subtle bg-white shadow-[var(--shadow-card)]",
              ].join(" ")}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              )}

              <p className="text-xs font-semibold uppercase tracking-widest text-accent font-body">
                {plan.name}
              </p>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-text-primary transition-all duration-300">
                  ${annual ? plan.annual : plan.monthly}
                </span>
                {plan.monthly > 0 && (
                  <span className="text-lg text-text-muted font-body">/mo</span>
                )}
              </div>
              {plan.monthly > 0 && (
                <p className="mt-1 text-xs text-text-muted font-body">
                  per location &middot; {annual ? "billed annually" : "billed monthly"}
                </p>
              )}
              {plan.monthly === 0 && (
                <p className="mt-1 text-xs text-text-muted font-body">
                  Free forever
                </p>
              )}

              <p className="mt-3 text-sm text-text-secondary font-body">
                {plan.description}
              </p>

              <Link
                href={plan.ctaHref}
                className={`${
                  plan.highlight
                    ? buttonStyles("primary", "md")
                    : buttonStyles("secondary", "md")
                } mt-5 w-full`}
              >
                {plan.cta}
              </Link>

              <div className="my-5 border-t border-border-subtle" />

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-center gap-2 text-sm font-body ${
                      f.included ? "text-text-secondary" : "text-text-muted/50"
                    }`}
                  >
                    {f.included ? <CheckIcon /> : <XIcon />}
                    <span className={f.included ? "" : "line-through decoration-text-muted/20"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
