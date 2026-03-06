import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Plan } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, replies_used, replies_limit")
    .eq("id", user.id)
    .single();

  const plan = (profile?.plan ?? "free") as Plan;
  const repliesUsed = profile?.replies_used ?? 0;
  const repliesLimit = profile?.replies_limit ?? 10;

  return (
    <div className="flex h-screen bg-bg-base">
      <Sidebar
        repliesUsed={repliesUsed}
        repliesLimit={repliesLimit}
        plan={plan}
      />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
