"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonStyles } from "@/lib/styles";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Thin brand accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent-bright to-accent" />

      <header className="sticky top-0 z-100 bg-white border-b border-border-subtle">
        <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-accent">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path d="M10.5 20.5c0-1 .8-2.5 5.5-2.5s5.5 1.5 5.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 8l1.8 3.6 4 .6-2.9 2.8.7 4L16 17.1 12.4 19l.7-4-2.9-2.8 4-.6L16 8z" fill="white" />
            </svg>
            <span className="font-display text-lg font-bold text-text-primary">
              Stareply
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary font-body"
            >
              Sign In
            </Link>
            <Link href="/signup" className={buttonStyles("primary", "sm")}>
              Get Started Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 rounded-full bg-text-primary transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-text-primary transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-text-primary transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border-subtle bg-white px-5 pb-6 pt-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary hover:bg-bg-surface hover:text-text-primary font-body transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-3 border-t border-border-subtle">
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary font-body text-center"
                >
                  Sign In
                </Link>
                <Link href="/signup" className={buttonStyles("primary", "md")}>
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
