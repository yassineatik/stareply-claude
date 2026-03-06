import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { postReply } from "@/lib/google-business";

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
    const { reply_id } = body as { reply_id: string };

    if (!reply_id) {
      return NextResponse.json(
        { error: "Missing reply_id" },
        { status: 400 }
      );
    }

    // Fetch reply with review and location
    const { data: reply } = await supabase
      .from("replies")
      .select("*, review:reviews(*), location:locations(*)")
      .eq("id", reply_id)
      .single();

    if (!reply) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    // Verify user owns this location
    if (reply.location.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Publish to Google
    await postReply(
      reply.location.location_name,
      reply.review.google_review_id,
      reply.content,
      reply.location.google_access_token
    );

    // Mark reply as published
    await supabase
      .from("replies")
      .update({ is_published: true, published_at: new Date().toISOString() })
      .eq("id", reply_id);

    // Mark review as replied
    await supabase
      .from("reviews")
      .update({ is_replied: true })
      .eq("id", reply.review_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to publish reply";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
