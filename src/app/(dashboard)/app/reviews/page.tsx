import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReviewInbox } from "./ReviewInbox";
import type { Review } from "@/types";

export default async function ReviewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch user's locations
  const { data: locations } = await supabase
    .from("locations")
    .select("id")
    .eq("user_id", user.id);

  const locationIds = locations?.map((l: { id: string }) => l.id) ?? [];

  let reviews: Review[] = [];

  if (locationIds.length > 0) {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .in("location_id", locationIds)
      .order("review_created_at", { ascending: false });

    reviews = (data as Review[]) ?? [];
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
          Reviews
        </h1>
        <p className="mt-1 text-sm text-text-secondary font-body">
          {reviews.length > 0
            ? `${reviews.filter((r) => !r.is_replied).length} reviews waiting for a reply.`
            : "Connect a location to see your reviews."}
        </p>
      </div>

      <ReviewInbox initialReviews={reviews} />
    </div>
  );
}
