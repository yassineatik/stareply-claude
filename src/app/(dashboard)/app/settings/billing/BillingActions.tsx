"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Plan } from "@/types";

interface BillingActionsProps {
  plan: Plan;
  hasStripeCustomer: boolean;
  userId: string;
}

export function BillingActions({ plan, hasStripeCustomer, userId }: BillingActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade(targetPlan: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Error handled silently — user stays on page
    } finally {
      setLoading(false);
    }
  }

  async function handleManage() {
    setLoading(true);
    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }

  if (plan === "agency") {
    return (
      <Button variant="secondary" onClick={handleManage} loading={loading}>
        Manage Subscription
      </Button>
    );
  }

  const nextPlan = plan === "free" ? "starter" : plan === "starter" ? "growth" : "agency";
  const nextPlanLabel = nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => handleUpgrade(nextPlan)} loading={loading}>
        Upgrade to {nextPlanLabel}
      </Button>
      {hasStripeCustomer && (
        <Button variant="ghost" onClick={handleManage} loading={loading}>
          Manage Subscription
        </Button>
      )}
    </div>
  );
}
