import Link from "next/link";
import { buttonStyles } from "@/lib/styles";
import { HeroMockup } from "@/components/marketing/HeroMockup";
import { BentoGrid } from "@/components/marketing/BentoGrid";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <ComparisonSection />
      <HowItWorks />
      <BentoGrid />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   1. HERO — Split layout
   ═══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_26rem] lg:gap-16"
        style={{ animation: "heroIn 800ms ease-out both" }}
      >
        {/* Left — copy */}
        <div className="max-w-xl">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-text-primary sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Stop losing customers to{" "}
            <span className="text-accent">unanswered reviews</span>
          </h1>

          <p className="mt-5 max-w-lg font-body text-lg text-text-secondary leading-relaxed">
            Your Google reviews get thoughtful, on-brand replies in seconds —
            without you typing a word. Connect once. Every review gets handled.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/signup"
              className={`${buttonStyles("primary", "lg")} px-7 py-3.5`}
            >
              Reply to your first review free
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#how-it-works"
              className={buttonStyles("ghost", "lg")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70">
                <path d="M6.5 3.5v9l5-4.5-5-4.5z" />
              </svg>
              Watch it work
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-5 text-sm text-text-muted font-body">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-success">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-success">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Live in 90 seconds
            </span>
          </div>
        </div>

        {/* Right — mockup */}
        <div className="flex justify-center lg:justify-end">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. SOCIAL PROOF BAR — business types
   ═══════════════════════════════════════════════════════════════════════ */

const industries = [
  {
    label: "Restaurants",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    label: "Dentists",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 7.5 5.5 12c.7 2 1.5 5 2 7.5.3 1.5 2.3 1.5 2.5 0 .3-1.5 1-2.5 2-2.5s1.7 1 2 2.5c.2 1.5 2.2 1.5 2.5 0 .5-2.5 1.3-5.5 2-7.5 1.5-4.5.5-5.5-1-6.5S13.5 3.5 12 5.5z" />
      </svg>
    ),
  },
  {
    label: "Hotels",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 20h20M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4M2 16h20" />
      </svg>
    ),
  },
  {
    label: "Salons",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Auto Shops",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Law Firms",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16M12 2l8 6H4l8-6zM6 8v9M10 8v9M14 8v9M18 8v9M2 22h20" />
      </svg>
    ),
  },
  {
    label: "Gyms",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5L17.5 17.5M6 12H2M22 12h-4M7 7l-2-2M19 19l-2-2M7 17l-2 2M19 5l-2 2" />
      </svg>
    ),
  },
  {
    label: "Real Estate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 13v.01M9 17v.01" />
      </svg>
    ),
  },
];

function SocialProofBar() {
  return (
    <section className="border-y border-border-subtle bg-bg-surface py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="shrink-0 text-sm font-medium text-text-primary font-body">
            Built for local businesses
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-secondary font-body">
            {industries.map((biz) => (
              <span key={biz.label} className="inline-flex items-center gap-1.5 text-text-muted">
                {biz.icon}
                <span>{biz.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. PROBLEM SECTION
   ═══════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-warm font-body">
          The real cost
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Unanswered reviews are costing you real money.
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-text-secondary font-body leading-relaxed">
          Every ignored review tells potential customers you don&apos;t care.
          And they&apos;ll choose the competitor who does.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-[var(--shadow-card)]">
            <span className="block font-display text-5xl font-black text-text-primary">
              88%
            </span>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary font-body">
              of customers check your reviews before walking in the door
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-[var(--shadow-card)]">
            <span className="block font-display text-5xl font-black text-warm">
              12 min
            </span>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary font-body">
              per reply, manually. That&apos;s 12 hours a month you don&apos;t have.
            </p>
          </div>

          <div className="rounded-2xl border border-warm/20 bg-warm-dim p-6 shadow-[var(--shadow-card)]">
            <span className="block font-display text-5xl font-black text-error">
              0
            </span>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary font-body">
              replies is what most businesses send. Their competitors reply to every one.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-lg font-semibold text-accent font-body">
            What if every review got a reply — automatically?
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce text-accent">
            <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4. BEFORE / AFTER COMPARISON
   ═══════════════════════════════════════════════════════════════════════ */

function ComparisonSection() {
  return (
    <section className="bg-bg-surface px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent font-body">
          The difference
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Same business. Different results.
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Without */}
          <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-error/8 px-3 py-1 text-xs font-medium text-error ring-1 ring-error/15 font-body">
              <span className="h-1.5 w-1.5 rounded-full bg-error" />
              Without Stareply
            </div>

            {/* Fake Google profile snippet */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-bold text-text-primary">4.1</span>
                <div>
                  <div className="flex gap-0.5 text-sm text-star">
                    <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
                    <span className="text-border-strong">&#9733;</span>
                  </div>
                  <span className="text-xs text-text-muted font-body">142 reviews</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { stars: 5, text: "Great food and atmosphere!", reply: false, ago: "2 weeks ago" },
                  { stars: 1, text: "Terrible service, waited forever.", reply: false, ago: "3 weeks ago" },
                  { stars: 4, text: "Really enjoyed our visit.", reply: false, ago: "1 month ago" },
                ].map((r, i) => (
                  <div key={i} className="rounded-lg bg-bg-surface p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex gap-0.5 text-[10px] text-star">
                        {Array.from({ length: 5 }, (_, j) => (
                          <span key={j} className={j < r.stars ? "text-star" : "text-border-strong"}>&#9733;</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-text-muted font-body">{r.ago}</span>
                    </div>
                    <p className="text-xs text-text-secondary font-body">{r.text}</p>
                    <p className="mt-1.5 text-[10px] text-error/70 font-body italic">No reply</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-error/5 px-3 py-2">
                <span className="text-xs text-error font-body">0% reply rate — losing customers daily</span>
              </div>
            </div>
          </div>

          {/* With */}
          <div className="rounded-2xl border border-success/20 bg-white p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-success ring-1 ring-emerald-200 font-body">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              With Stareply
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-bold text-text-primary">4.7</span>
                <div>
                  <div className="flex gap-0.5 text-sm text-star">
                    <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
                    <span className="text-star/50">&#9733;</span>
                  </div>
                  <span className="text-xs text-text-muted font-body">142 reviews</span>
                </div>
                <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-success border border-emerald-200">+0.6 &#9650;</span>
              </div>

              <div className="space-y-3">
                {[
                  { stars: 5, text: "Great food and atmosphere!", reply: "Thank you so much! We're glad you enjoyed it — hope to see you again soon.", ago: "2 weeks ago" },
                  { stars: 1, text: "Terrible service, waited forever.", reply: "We're sorry about your experience. We'd love to make it right — please reach out to us directly.", ago: "3 weeks ago" },
                  { stars: 4, text: "Really enjoyed our visit.", reply: "Thanks for the kind words! We look forward to welcoming you back.", ago: "1 month ago" },
                ].map((r, i) => (
                  <div key={i} className="rounded-lg bg-bg-surface p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex gap-0.5 text-[10px] text-star">
                        {Array.from({ length: 5 }, (_, j) => (
                          <span key={j} className={j < r.stars ? "text-star" : "text-border-strong"}>&#9733;</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-text-muted font-body">{r.ago}</span>
                    </div>
                    <p className="text-xs text-text-secondary font-body">{r.text}</p>
                    <div className="mt-2 border-l-2 border-accent/30 pl-2.5">
                      <p className="text-[11px] leading-relaxed text-text-secondary font-body">{r.reply}</p>
                      <span className="mt-1 block text-[9px] text-success font-body">&#10003; Replied in 2s</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <span className="text-xs text-success font-body">100% reply rate — building trust on autopilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   5. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent font-body">
          How it works
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Three steps. Then you&apos;re done forever.
        </h2>
        <p className="mx-auto mb-16 max-w-md text-center text-text-secondary font-body">
          No learning curve. No copy-paste. No more guilt about unreplied reviews.
        </p>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-0">
          <div
            className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[52px] hidden md:block"
            aria-hidden="true"
          >
            <div className="h-px w-full border-t border-dashed border-accent/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center md:px-8" style={{ animation: "fadeSlideUp 500ms ease-out 300ms both" }}>
            <span className="mb-4 inline-flex h-7 w-9 items-center justify-center rounded-full bg-accent-dim text-xs font-bold text-accent font-body">01</span>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ring-border-subtle shadow-[var(--shadow-card)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-text-primary">Link your Google Business</h3>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-text-secondary font-body">
              One click to connect. Every review appears instantly — sorted by newest, unreplied first.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-success ring-1 ring-emerald-200 font-body">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> Connected
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center md:px-8" style={{ animation: "fadeSlideUp 500ms ease-out 450ms both" }}>
            <span className="mb-4 inline-flex h-7 w-9 items-center justify-center rounded-full bg-accent-dim text-xs font-bold text-accent font-body">02</span>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-dim ring-1 ring-accent/20 shadow-[var(--shadow-card)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20 4l.5 1.5L22 6l-1.5.5L20 8l-.5-1.5L18 6l1.5-.5L20 4z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-text-primary">Get a reply in seconds</h3>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-text-secondary font-body">
              AI reads the review, matches your voice, and drafts a reply that sounds like you wrote it yourself.
            </p>
            <div className="flex w-full max-w-[200px] flex-col gap-1.5 rounded-lg bg-accent-dim p-3 ring-1 ring-accent/10">
              <span className="mb-1 text-[9px] font-medium uppercase tracking-wider text-accent font-body">Generating reply...</span>
              <div className="shimmer-bar-violet h-2 w-full rounded-full" />
              <div className="shimmer-bar-violet h-2 w-[85%] rounded-full" style={{ animationDelay: "200ms" }} />
              <div className="shimmer-bar-violet h-2 w-[65%] rounded-full" style={{ animationDelay: "400ms" }} />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center md:px-8" style={{ animation: "fadeSlideUp 500ms ease-out 600ms both" }}>
            <span className="mb-4 inline-flex h-7 w-9 items-center justify-center rounded-full bg-accent-dim text-xs font-bold text-accent font-body">03</span>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 shadow-[var(--shadow-card)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-success">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-text-primary">Publish — or let auto-reply handle it</h3>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-text-secondary font-body">
              Review it, tweak if you want, or turn on auto-reply and never think about it again.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-success ring-1 ring-emerald-200 font-body">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} /> Published &#10003;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   7. TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    quote: "We went from replying to maybe 1 in 10 reviews to every single one. Our Google rating jumped from 4.2 to 4.7 in two months.",
    name: "Maria Gonzalez",
    role: "Owner, La Casa Kitchen",
    type: "Restaurant",
    initials: "MG",
    color: "bg-amber-100 text-amber-700",
  },
  {
    quote: "I used to spend Sunday nights writing review replies. Now I just check the dashboard Monday morning — everything's already handled.",
    name: "David Park",
    role: "Owner, Park Family Dental",
    type: "Dental Clinic",
    initials: "DP",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "A guest left a 1-star review at 2 AM. By 2:02 AM, Stareply had posted a professional, empathetic reply. The guest updated to 4 stars the next day.",
    name: "Rachel Thompson",
    role: "GM, The Waterfront Hotel",
    type: "Hotel",
    initials: "RT",
    color: "bg-emerald-100 text-emerald-700",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent font-body">
          Real results
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Businesses like yours are already seeing results.
        </h2>
        <p className="mx-auto mb-14 max-w-lg text-center text-text-secondary font-body">
          Here&apos;s what happens when every review gets a reply.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border-subtle bg-white p-6 shadow-[var(--shadow-card)]"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5 text-sm text-star">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary font-body">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold font-display ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary font-body">{t.name}</p>
                  <p className="text-xs text-text-muted font-body">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   8. FAQ
   ═══════════════════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: "Does it work with my Google Business Profile?",
    a: "Yes. If you have a Google Business Profile (formerly Google My Business), Stareply connects in one click via Google OAuth. No technical setup needed.",
  },
  {
    q: "Will the replies sound robotic?",
    a: "No — that's the whole point. The AI matches your brand voice and tone. Most customers can't tell the difference between a Stareply reply and one you wrote yourself.",
  },
  {
    q: "Can I edit replies before they go live?",
    a: "Absolutely. You can review and edit every reply before publishing. Or, if you trust the AI, turn on auto-reply and let it handle everything.",
  },
  {
    q: "What about negative reviews?",
    a: "Stareply handles them especially well. It drafts empathetic, professional responses that acknowledge the issue and invite the customer to resolve it privately.",
  },
  {
    q: "I have multiple locations. Does that work?",
    a: "Yes. You can manage reviews across all your locations from a single dashboard. Each location can have its own voice and tone settings.",
  },
  {
    q: "How much does it cost?",
    a: "Free for your first 50 replies. After that, plans start at $29/month. No contracts, cancel anytime. Most businesses save 10+ hours a month.",
  },
];

function FAQSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent font-body">
          FAQ
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Questions? We&apos;ve got answers.
        </h2>

        <div className="divide-y divide-border-subtle">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <h3 className="text-base font-semibold text-text-primary font-body">
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

/* ═══════════════════════════════════════════════════════════════════════
   9. FINAL CTA
   ═══════════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-accent-dim border border-accent/15 px-8 py-16 text-center shadow-[var(--shadow-accent)]">
        <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
          Your next review is already waiting.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-secondary font-body leading-relaxed">
          Every minute without a reply is a customer choosing someone else.
          Start replying today — your first 50 replies are free.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/signup"
            className={`${buttonStyles("primary", "lg")} px-8 py-4`}
          >
            Reply to your first review free
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <p className="mt-5 text-xs text-text-muted font-body">
          No credit card required &middot; Setup in 90 seconds &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
