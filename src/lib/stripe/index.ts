import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

const PLAN_LIMITS: Record<string, number> = {
  free: 10,
  starter: 100,
  growth: 500,
  agency: 999999, // unlimited
};

export function getReplyLimit(plan: string): number {
  return PLAN_LIMITS[plan] ?? 10;
}

export async function createCheckoutSession({
  customerId,
  priceId,
  userId,
  returnUrl,
}: {
  customerId?: string;
  priceId: string;
  userId: string;
  returnUrl: string;
}): Promise<string> {
  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(customerId ? { customer: customerId } : {}),
    metadata: { user_id: userId },
    success_url: `${returnUrl}?success=true`,
    cancel_url: `${returnUrl}?canceled=true`,
  });

  return session.url!;
}

export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<string> {
  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session.url;
}

export function getPriceIdForPlan(plan: string): string | null {
  const priceMap: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    growth: process.env.STRIPE_PRICE_GROWTH,
    agency: process.env.STRIPE_PRICE_AGENCY,
  };

  return priceMap[plan] ?? null;
}
