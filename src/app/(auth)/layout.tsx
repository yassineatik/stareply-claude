import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-base">
      {/* Left brand panel — DESIGN.md §5.3 */}
      <div className="hidden w-[40%] flex-col justify-between border-r border-border-subtle bg-bg-surface p-10 lg:flex">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-text-primary"
        >
          <span className="text-star">&#9733;</span>
          STAREPLY
        </Link>

        <div className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-bold text-text-primary">
            Your reviews. Handled.
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary font-body">
            <li className="flex items-center gap-2">
              <span className="text-success">&#10003;</span>
              Setup in 90 seconds
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">&#10003;</span>
              No credit card required
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">&#10003;</span>
              Cancel anytime
            </li>
          </ul>
        </div>

        {/* Testimonial */}
        <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated p-5">
          <div className="mb-3 flex gap-0.5 text-star text-sm">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>&#9733;</span>
            ))}
          </div>
          <p className="mb-3 text-sm text-text-secondary font-body italic">
            &ldquo;Before Stareply, I was ignoring half my reviews.
            Now I reply to all 80 of them in minutes each month.&rdquo;
          </p>
          <p className="text-xs text-text-muted font-body">
            — Khalid R., Restaurant Owner
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
