import { NextRequest, NextResponse } from "next/server";
import { getStripe, getReplyLimit } from "@/lib/stripe";
import { createServerClient } from "@supabase/ssr";
import type { Plan } from "@/types";

function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

const PRICE_TO_PLAN: Record<string, Plan> = {};

function buildPriceMap() {
  if (process.env.STRIPE_PRICE_STARTER) PRICE_TO_PLAN[process.env.STRIPE_PRICE_STARTER] = "starter";
  if (process.env.STRIPE_PRICE_GROWTH) PRICE_TO_PLAN[process.env.STRIPE_PRICE_GROWTH] = "growth";
  if (process.env.STRIPE_PRICE_AGENCY) PRICE_TO_PLAN[process.env.STRIPE_PRICE_AGENCY] = "agency";
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  buildPriceMap();
  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.user_id;
      const customerId = session.customer as string;

      if (!userId) break;

      // Get subscription to find the price/plan
      const subscription = await getStripe().subscriptions.retrieve(
        session.subscription as string
      );
      const priceId = subscription.items.data[0]?.price.id;
      const plan = PRICE_TO_PLAN[priceId] ?? "starter";

      await supabase
        .from("profiles")
        .update({
          plan,
          stripe_customer_id: customerId,
          replies_limit: getReplyLimit(plan),
          replies_used: 0,
        })
        .eq("id", userId);

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;
      const priceId = subscription.items.data[0]?.price.id;
      const plan = PRICE_TO_PLAN[priceId] ?? "free";

      await supabase
        .from("profiles")
        .update({
          plan,
          replies_limit: getReplyLimit(plan),
        })
        .eq("stripe_customer_id", customerId);

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          replies_limit: getReplyLimit("free"),
        })
        .eq("stripe_customer_id", customerId);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
