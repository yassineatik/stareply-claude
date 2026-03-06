import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReply } from "@/lib/claude/generateReply";
import type { Tone } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { review_id, tone } = body as { review_id: string; tone: Tone };

    if (!review_id || !tone) {
      return NextResponse.json(
        { error: "Missing review_id or tone" },
        { status: 400 }
      );
    }

    // Check usage limits
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, replies_used, replies_limit")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (profile.replies_used >= profile.replies_limit) {
      return NextResponse.json(
        { error: "Reply limit reached. Please upgrade your plan." },
        { status: 403 }
      );
    }

    // Fetch the review with its location data
    const { data: review } = await supabase
      .from("reviews")
      .select("*, location:locations(*)")
      .eq("id", review_id)
      .single();

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Verify user owns this location
    if (review.location.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Generate reply via Claude
    const replyContent = await generateReply({
      reviewerName: review.reviewer_name,
      rating: review.rating,
      comment: review.comment ?? "",
      tone,
      businessName: review.location.display_name,
      industry: review.location.industry,
      brandKeywords: review.location.brand_keywords ?? [],
      avoidKeywords: review.location.avoid_keywords ?? [],
    });

    // Save the reply
    const { data: reply, error: replyError } = await supabase
      .from("replies")
      .insert({
        review_id: review.id,
        location_id: review.location_id,
        content: replyContent,
        tone,
      })
      .select()
      .single();

    if (replyError) {
      return NextResponse.json(
        { error: "Failed to save reply" },
        { status: 500 }
      );
    }

    // Increment usage counter
    await supabase
      .from("profiles")
      .update({ replies_used: profile.replies_used + 1 })
      .eq("id", user.id);

    return NextResponse.json({ reply: replyContent, reply_id: reply.id, tone });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
