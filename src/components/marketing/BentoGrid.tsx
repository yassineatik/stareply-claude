import { ToneSelectorCard } from "./ToneSelectorCard";

function Card({
  children,
  className = "",
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-6",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        accent
          ? "border-accent/15 bg-accent-dim/50 shadow-[var(--shadow-card)]"
          : "border-border-subtle bg-white shadow-[var(--shadow-card)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SpeedCard() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <span className="font-display text-5xl font-extrabold text-accent">
          2s
        </span>
        <span className="text-sm font-medium text-text-primary font-body">
          Average time to reply
        </span>
        <p className="text-xs text-text-muted font-body">
          Not 2 minutes. Not 2 hours. Two seconds.
        </p>
        <svg
          viewBox="0 0 120 32"
          className="mt-2 h-8 w-24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline
            points="0,28 15,24 30,26 45,18 60,20 75,8 90,12 105,4 120,6"
            className="text-accent"
          />
        </svg>
      </div>
    </Card>
  );
}

function RatingCard() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-text-muted line-through decoration-border-strong">
            4.2
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-3xl font-extrabold text-star">
            4.8
          </span>
          <span className="text-star text-lg">&#9733;</span>
        </div>
        <p className="max-w-[200px] text-xs leading-relaxed text-text-muted font-body">
          Businesses that reply to reviews rank higher on Google Maps
        </p>
        <svg viewBox="0 0 120 32" className="mt-1 h-6 w-24" fill="none" strokeWidth="2">
          <polyline
            points="0,28 20,26 40,22 60,18 80,12 100,8 120,4"
            className="stroke-success"
          />
        </svg>
      </div>
    </Card>
  );
}

function NegativeReviewCard() {
  return (
    <Card accent>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Turn bad reviews into second chances
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-error/10 px-2.5 py-0.5 text-[10px] font-medium text-error border border-error/20">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-error" />
            1-star handled
          </span>
        </div>

        <p className="text-sm text-text-secondary font-body">
          A thoughtful reply to a bad review can win the customer back — and shows everyone else you care.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-error/10 bg-error/[0.02] p-3.5">
            <div className="mb-2 flex gap-0.5 text-xs">
              <span className="text-star">&#9733;</span>
              <span className="text-border-strong">&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <p className="text-xs leading-relaxed text-text-secondary font-body">
              &ldquo;Waited 45 minutes for cold food. Server didn&apos;t apologize. Won&apos;t be back.&rdquo;
            </p>
            <span className="mt-2 block text-[10px] text-text-muted font-body">— Mike T.</span>
          </div>

          <div className="rounded-xl border border-accent/15 bg-accent-dim p-3.5">
            <span className="mb-2 block text-[10px] uppercase tracking-wider text-accent font-body">
              AI Reply
            </span>
            <p className="text-xs leading-relaxed text-text-secondary font-body">
              &ldquo;Mike, I&apos;m truly sorry — that&apos;s not the experience we want anyone to have. I&apos;d love the chance to make it right. Could you reach out directly? Your next meal is on us.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MultiLocationCard() {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold text-text-primary">
          One dashboard, every location
        </h3>
        <p className="text-sm text-text-muted font-body">
          See and reply to reviews across all your branches in one place.
        </p>
        <div className="flex flex-col gap-1.5">
          {["Downtown", "Airport Rd", "Midtown"].map((loc, i) => (
            <div
              key={loc}
              className="flex items-center justify-between rounded-lg bg-bg-surface px-3 py-2"
            >
              <span className="text-xs font-medium text-text-secondary font-body">{loc}</span>
              <span className="text-[10px] text-text-muted font-body">{[12, 8, 5][i]} pending</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function NotificationsCard() {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold text-text-primary">
          Never miss a review again
        </h3>
        <p className="text-sm text-text-muted font-body">
          Get alerted the moment a new review comes in — email, Slack, or webhook.
        </p>
        <div className="flex gap-2">
          <span className="rounded-full bg-bg-surface px-2.5 py-1 text-[10px] text-text-secondary font-body">Email</span>
          <span className="rounded-full bg-bg-surface px-2.5 py-1 text-[10px] text-text-secondary font-body">Slack</span>
          <span className="rounded-full bg-bg-surface px-2.5 py-1 text-[10px] text-text-secondary font-body">Webhook</span>
        </div>
      </div>
    </Card>
  );
}

function AnalyticsCard() {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold text-text-primary">
          Watch your ratings climb
        </h3>
        <p className="text-sm text-text-muted font-body">
          See how replying improves your star rating and review volume over time.
        </p>
        <svg viewBox="0 0 160 48" className="h-12 w-full" fill="none">
          <polyline
            points="0,40 20,38 40,32 60,28 80,24 100,16 120,12 140,8 160,4"
            className="stroke-accent"
            strokeWidth="2"
          />
          <polyline
            points="0,44 20,42 40,40 60,36 80,32 100,28 120,24 140,20 160,16"
            className="stroke-success"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </Card>
  );
}

function WhiteLabelCard() {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold text-text-primary">
          Put your brand on it
        </h3>
        <p className="text-sm text-text-muted font-body">
          Agency plan lets you white-label the whole dashboard for your clients.
        </p>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-accent/20" />
          <div className="h-6 w-6 rounded-full bg-success/20" />
          <div className="h-6 w-6 rounded-full bg-star/20" />
          <span className="text-[10px] text-text-muted font-body">Your brand colors</span>
        </div>
      </div>
    </Card>
  );
}

export function BentoGrid() {
  return (
    <section
      id="features"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent font-body">
          What you get
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-text-primary md:text-4xl">
          Everything you need to own your reviews.
        </h2>
        <p className="mx-auto mb-14 max-w-lg text-center text-text-secondary font-body">
          No bloat. No features you&apos;ll never use. Just the tools that actually move your ratings.
        </p>

        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <ToneSelectorCard />
          </div>
          <SpeedCard />
        </div>

        {/* Row 2 */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <RatingCard />
          <div className="md:col-span-2">
            <NegativeReviewCard />
          </div>
        </div>

        {/* Row 3 */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <MultiLocationCard />
          <NotificationsCard />
          <AnalyticsCard />
          <WhiteLabelCard />
        </div>
      </div>
    </section>
  );
}
