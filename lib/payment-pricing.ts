import { getPricingTiers, getConsultation } from "@/lib/content";

/**
 * Server-side authoritative price lookup — the only place a Razorpay order
 * amount may come from. Callers (app/api/razorpay/create-order) must never
 * accept an amount from the client.
 */
export function resolvePaymentAmount(input: {
  type: "consultation" | "plan";
  planId?: string;
}): { amount: number; currency: string; label: string } | null {
  if (input.type === "consultation") {
    const consultation = getConsultation();
    if (consultation.price.amount == null) return null;
    return {
      amount: consultation.price.amount,
      currency: consultation.price.currency,
      label: consultation.label,
    };
  }

  const tier = getPricingTiers().find((t) => t.id === input.planId);
  if (!tier || tier.price.amount == null) return null;
  return { amount: tier.price.amount, currency: tier.price.currency, label: tier.name };
}
