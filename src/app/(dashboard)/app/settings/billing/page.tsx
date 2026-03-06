import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Plan } from "@/types";
import { BillingActions } from "./BillingActions";

const planDetails: Record<Plan, { name: string; price: string; features: string[] }> = {
  free: {
    name: "Free",
    price: "$0/mo",
    features: ["1 location", "10 replies/month", "Google Business"],
  },
  starter: {
    name: "Starter",
    price: "$29/mo",
    features: ["1 location", "100 replies/month", "Google Business", "AI Tone Customization"],
  },
  growth: {
    name: "Growth",
    price: "$59/mo",
    features: ["3 locations", "500 replies/month", "Google Business", "AI Tone Customization", "Multi-location", "Priority Support"],
  },
  agency: {
    name: "Agency",
    price: "$149/mo",
    features: ["Unlimited locations", "Unlimited replies", "Google Business", "AI Tone Customization", "Multi-location", "White-label", "Priority Support"],
  },
};

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, replies_used, replies_limit, stripe_customer_id")
    .eq("id", user.id)
    .single();

  const plan = (profile?.plan ?? "free") as Plan;
  const repliesUsed = profile?.replies_used ?? 0;
  const repliesLimit = profile?.replies_limit ?? 10;
  const hasStripeCustomer = !!profile?.stripe_customer_id;
  const details = planDetails[plan];
  const usagePercent = repliesLimit > 0 ? (repliesUsed / repliesLimit) * 100 : 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
          Billing
        </h1>
        <p className="mt-1 text-sm text-text-secondary font-body">
          Manage your subscription and usage.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan */}
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-text-primary">
                Current Plan
              </h2>
              <Badge variant={plan === "free" ? "default" : "purple"}>
                {details.name}
              </Badge>
            </div>
            <p className="font-display text-3xl font-bold text-text-primary">
              {details.price}
            </p>
            <ul className="flex flex-col gap-2">
              {details.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-text-secondary font-body"
                >
                  <span className="text-success">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <BillingActions
              plan={plan}
              hasStripeCustomer={hasStripeCustomer}
              userId={user.id}
            />
          </div>
        </Card>

        {/* Usage */}
        <Card>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-bold text-text-primary">
              Usage This Month
            </h2>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-body">
                <span className="text-text-secondary">
                  Replies: {repliesUsed} / {plan === "agency" ? "Unlimited" : repliesLimit}
                </span>
                {plan !== "agency" && (
                  <span className="text-text-muted">
                    {Math.round(usagePercent)}%
                  </span>
                )}
              </div>
              {plan !== "agency" && (
                <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      usagePercent > 95
                        ? "bg-error"
                        : usagePercent > 80
                          ? "bg-warning"
                          : "bg-accent"
                    }`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>
              )}
            </div>

            {usagePercent >= 100 && plan !== "agency" && (
              <div className="rounded-[var(--radius-md)] border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning font-body">
                You&apos;ve used all {repliesLimit} replies this month.
                Upgrade to get more.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
