"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/app", icon: "\uD83D\uDCCA" },
  { label: "Reviews", href: "/app/reviews", icon: "\uD83D\uDCAC" },
  { label: "Reply History", href: "/app/replies", icon: "\uD83D\uDCDC" },
];

const settingsNav: NavItem[] = [
  { label: "Settings", href: "/app/settings", icon: "\u2699\uFE0F" },
  { label: "Brand Voice", href: "/app/settings/brand", icon: "\uD83C\uDFA8" },
  { label: "Locations", href: "/app/settings/locations", icon: "\uD83D\uDCCD" },
  { label: "Billing", href: "/app/settings/billing", icon: "\uD83D\uDCB3" },
];

interface SidebarProps {
  repliesUsed: number;
  repliesLimit: number;
  plan: string;
}

export function Sidebar({ repliesUsed, repliesLimit, plan }: SidebarProps) {
  const pathname = usePathname();
  const usagePercent = repliesLimit > 0 ? (repliesUsed / repliesLimit) * 100 : 0;

  function getUsageColor() {
    if (usagePercent > 95) return "bg-error";
    if (usagePercent > 80) return "bg-warning";
    return "bg-accent";
  }

  function isActive(href: string) {
    if (href === "/app") return pathname === "/app";
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border-subtle bg-bg-surface">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5 font-display text-lg font-bold text-text-primary">
        <span className="text-star">&#9733;</span>
        STAREPLY
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium font-body transition-colors",
              isActive(item.href)
                ? "bg-accent-dim text-white border-l-2 border-accent"
                : "text-text-secondary hover:bg-bg-overlay",
            ].join(" ")}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="my-3 h-px bg-border-subtle" />

        {settingsNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium font-body transition-colors",
              isActive(item.href)
                ? "bg-accent-dim text-white border-l-2 border-accent"
                : "text-text-secondary hover:bg-bg-overlay",
            ].join(" ")}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Usage meter — DESIGN.md §6.1 */}
      <div className="border-t border-border-subtle px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-xs font-body">
          <span className="text-text-secondary">
            Usage: {repliesUsed}/{repliesLimit}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getUsageColor()}`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-muted font-body capitalize">
            {plan} Plan
          </span>
          {plan !== "agency" && (
            <Link
              href="/app/settings/billing"
              className="text-xs font-medium text-accent hover:text-accent-bright font-body"
            >
              Upgrade &uarr;
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
