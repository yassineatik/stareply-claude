import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { parseRating } from "@/lib/google-business";

// Service role client for webhook processing (no user context)
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Google sends review notifications with this structure
    const { locationName, review } = body;

    if (!locationName || !review) {
      return NextResponse.json(
        { error: "Missing locationName or review" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Find the location in our DB
    const { data: location, error: locationError } = await supabase
      .from("locations")
      .select("id")
      .eq("location_name", locationName)
      .single();

    if (locationError || !location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Upsert the review
    const { error: reviewError } = await supabase.from("reviews").upsert(
      {
        location_id: location.id,
        google_review_id: review.reviewId,
        reviewer_name: review.reviewer?.displayName ?? "Anonymous",
        rating: parseRating(review.starRating),
        comment: review.comment ?? null,
        is_replied: !!review.reviewReply,
        review_created_at: review.createTime,
      },
      { onConflict: "google_review_id" }
    );

    if (reviewError) {
      return NextResponse.json(
        { error: "Failed to save review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
