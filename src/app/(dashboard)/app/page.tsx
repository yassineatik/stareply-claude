import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-8">
      {/* Page header — DESIGN.md §6.2 */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
          Good morning, {firstName}
        </h1>
        <p className="mt-1 text-sm text-text-secondary font-body">
          Here&apos;s an overview of your review activity.
        </p>
      </div>

      {/* Stats row — 4 cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Reviews Total" value="--" />
        <StatCard label="Avg Rating" value="--" />
        <StatCard label="Reply Rate" value="--" />
        <StatCard label="Pending Replies" value="--" />
      </div>

      {/* Placeholder for review queue */}
      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-text-primary">
          Pending Replies
        </h2>
        <Card>
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-lg text-text-secondary font-body">
              Connect your Google Business Profile to get started.
            </p>
            <p className="text-sm text-text-muted font-body">
              Reviews will appear here automatically.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className="flex flex-col gap-1">
        <span className="font-display text-2xl font-bold text-text-primary">
          {value}
        </span>
        <span className="text-sm text-text-secondary font-body">
          {label}
        </span>
      </div>
    </Card>
  );
}
