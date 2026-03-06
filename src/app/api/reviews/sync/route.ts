import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getReviews, parseRating } from "@/lib/google-business";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { location_id } = await request.json();

  const { data: location } = await supabase
    .from("locations")
    .select("*")
    .eq("id", location_id)
    .eq("user_id", user.id)
    .single();

  if (!location || !location.google_access_token) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  try {
    const reviewsData = await getReviews(
      location.location_name,
      location.google_access_token
    );

    for (const review of reviewsData.reviews ?? []) {
      await supabase.from("reviews").upsert(
        {
          location_id: location.id,
          google_review_id: review.reviewId,
          reviewer_name: review.reviewer.displayName,
          rating: parseRating(review.starRating),
          comment: review.comment ?? null,
          is_replied: !!review.reviewReply,
          review_created_at: review.createTime,
        },
        { onConflict: "google_review_id" }
      );
    }

    await supabase
      .from("locations")
      .update({
        average_rating: reviewsData.averageRating,
        total_reviews: reviewsData.totalReviewCount,
      })
      .eq("id", location.id);

    return NextResponse.json({
      success: true,
      count: reviewsData.reviews?.length ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to sync reviews" },
      { status: 500 }
    );
  }
}
