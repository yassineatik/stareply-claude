import Link from "next/link";
import { buttonStyles } from "@/lib/styles";
import { PricingToggle } from "./PricingToggle";

type CellValue = boolean | string;

interface TableRow {
  feature: string;
  free: CellValue;
  starter: CellValue;
  growth: CellValue;
  agency: CellValue;
}

interface TableGroup {
  heading: string;
  rows: TableRow[];
}

const comparisonData: TableGroup[] = [
  {
    heading: "Core Features",
    rows: [
      { feature: "Locations", free: "1", starter: "1", growth: "3", agency: "Unlimited" },
      { feature: "AI replies / month", free: "10", starter: "100", growth: "500", agency: "Unlimited" },
      { feature: "Google Business connection", free: true, starter: true, growth: true, agency: true },
      { feature: "1-click publish", free: true, starter: true, growth: true, agency: true },
    ],
  },
  {
    heading: "AI Capabilities",
    rows: [
      { feature: "Tone customization", free: false, starter: true, growth: true, agency: true },
      { feature: "Sentiment analysis", free: false, starter: false, growth: true, agency: true },
      { feature: "Custom AI instructions", free: false, starter: false, growth: false, agency: true },
      { feature: "Auto-reply mode", free: false, starter: true, growth: true, agency: true },
    ],
  },
  {
    heading: "Management",
    rows: [
      { feature: "Multi-location dashboard", free: false, starter: false, growth: true, agency: true },
      { feature: "White-label dashboard", free: false, starter: false, growth: false, agency: true },
      { feature: "Team member access", free: false, starter: false, growth: false, agency: true },
      { feature: "Monthly reports", free: false, starter: false, growth: false, agency: true },
    ],
  },
  {
    heading: "Support",
    rows: [
      { feature: "Email notifications", free: false, starter: true, growth: true, agency: true },
      { feature: "Slack notifications", free: false, starter: false, growth: true, agency: true },
      { feature: "Priority support", free: false, starter: false, growth: true, agency: true },
      { feature: "Dedicated support", free: false, starter: false, growth: false, agency: true },
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

function CellDisplay({ value }: { value: CellValue }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-text-primary font-body">{value}</span>;
  }
  if (value) {
    return <CheckIcon />;
  }
  return <XIcon />;
}

const pricingFaqs = [
  {
    q: "Can I change plans anytime?",
    a: "Yes, instantly. When you upgrade or downgrade, billing is prorated — you only pay for what you use.",
  },
  {
    q: "Is there a free trial?",
    a: "The Free plan is free forever — no credit card needed. Paid plans also come with a 7-day free trial.",
  },
  {
    q: "What counts as a 'reply'?",
    a: "Each AI-generated reply draft counts as one reply. Editing a draft before publishing doesn't cost extra.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. 7-day no-questions-asked refund on any paid plan. Just reach out and we'll process it immediately.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <PricingToggle />
      <ComparisonTable />
      <PricingFAQ />
      <BottomCTA />
    </main>
  );
}

function ComparisonTable() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-text-primary md:text-3xl">
          Compare plans
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-border-subtle shadow-[var(--shadow-card)]">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-bg-surface">
                <th className="py-4 pl-6 pr-4 text-sm font-semibold text-text-primary font-body">
                  Feature
                </th>
                {["Free", "Starter", "Growth", "Agency"].map((name) => (
                  <th
                    key={name}
                    className={`px-4 py-4 text-center text-sm font-semibold font-body ${
                      name === "Growth" ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonData.map((group) => (
                <>
                  <tr key={group.heading}>
                    <td
                      colSpan={5}
                      className="bg-bg-surface/60 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted font-body"
                    >
                      {group.heading}
                    </td>
                  </tr>
                  {group.rows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "bg-white" : "bg-bg-surface/30"}
                    >
                      <td className="py-3 pl-6 pr-4 text-sm text-text-secondary font-body">
                        {row.feature}
                      </td>
                      {(["free", "starter", "growth", "agency"] as const).map((plan) => (
                        <td
                          key={plan}
                          className={`px-4 py-3 text-center ${
                            plan === "growth" ? "bg-accent/[0.03]" : ""
                          }`}
                        >
                          <span className="inline-flex justify-center">
                            <CellDisplay value={row[plan]} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PricingFAQ() {
  return (
    <section className="bg-bg-surface px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-text-primary md:text-3xl">
          Pricing questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pricingFaqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-border-subtle bg-white p-5 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-sm font-semibold text-text-primary font-body">
                {faq.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary font-body">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-accent/15 bg-accent-dim px-8 py-16 text-center shadow-[var(--shadow-accent)]">
        <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
          Still not sure? Start with the free plan.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-secondary font-body leading-relaxed">
          No credit card. No time limit. Upgrade when you&apos;re ready.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className={`${buttonStyles("primary", "lg")} px-8 py-4`}
          >
            Start free
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
