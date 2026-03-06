import Link from "next/link";
import { buttonStyles } from "@/lib/styles";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "API Docs", href: "/docs/api" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Top — logo + description + CTA  |  link columns */}
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left — brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white font-display">
                S
              </span>
              <span className="font-display text-[17px] font-bold text-text-primary">
                Stareply
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted font-body">
              AI-powered Google review replies for local businesses.
              Reply to every review in seconds — not hours.
            </p>
            <Link
              href="/signup"
              className={`${buttonStyles("primary", "sm")} mt-5`}
            >
              Get Started Free
            </Link>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-text-secondary" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-text-secondary" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-primary font-body">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors hover:text-text-secondary font-body"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-muted font-body">
            &copy; {new Date().getFullYear()} Stareply Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted font-body">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-success">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              SOC 2 Compliant
            </span>
            <span className="h-3 w-px bg-border-default" />
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-success">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              GDPR Ready
            </span>
            <span className="h-3 w-px bg-border-default" />
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-success">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              256-bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
