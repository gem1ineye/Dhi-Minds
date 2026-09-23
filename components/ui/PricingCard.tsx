import { Check } from "lucide-react";
import type { PricingTier } from "@/content/schema";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "./Button";
import { RazorpayCheckoutButton } from "./RazorpayCheckoutButton";

const PLAN_IDS = ["starter", "growth", "scale"] as const;
type PlanId = (typeof PLAN_IDS)[number];
function isPlanId(id: string): id is PlanId {
  return (PLAN_IDS as readonly string[]).includes(id);
}

/** FR-PRC-01..08 — PRD §8.10. Checkout is additive alongside the existing contact-form CTA, not a replacement — shown only once a real price and Razorpay are both configured. */
export function PricingCard({ tier, razorpayConfigured }: { tier: PricingTier; razorpayConfigured: boolean }) {
  const amount = tier.price.amount;
  const showCheckout = razorpayConfigured && amount != null && isPlanId(tier.id);

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition-transform duration-300",
        tier.highlighted
          ? "glass-strong shadow-[var(--glass-shadow-lift)] ring-1 ring-accent-500/50 md:scale-[1.04]"
          : "glass",
      )}
    >
      {tier.highlighted && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 font-mono text-xs uppercase tracking-wide text-white">
          <Check aria-hidden="true" className="size-3.5" />
          Most popular
        </span>
      )}
      <h3 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">
        {tier.name}
      </h3>
      <p className="mt-1.5 text-sm text-grey-500">{tier.tagline}</p>

      <div className="mt-6 flex items-baseline gap-1.5">
        {tier.price.amount != null ? (
          <>
            {tier.price.qualifier && (
              <span className="text-xs text-grey-500">{tier.price.qualifier}</span>
            )}
            <span className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
              {formatPrice(tier.price.amount, tier.price.currency)}
            </span>
            {tier.price.period && <span className="text-sm text-grey-500">/{tier.price.period}</span>}
          </>
        ) : (
          <span className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
            {tier.price.fallbackLabel}
          </span>
        )}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-charcoal">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" />
            {f}
          </li>
        ))}
      </ul>

      {tier.ceiling && <p className="mt-6 text-xs text-grey-500">{tier.ceiling}</p>}

      {showCheckout && amount != null ? (
        <div className="mt-6 flex flex-col gap-3">
          <RazorpayCheckoutButton
            type="plan"
            planId={tier.id as PlanId}
            label="Pay & get started"
            amount={amount}
            currency={tier.price.currency}
            variant={tier.highlighted ? "primary" : "secondary"}
          />
          <Button href={tier.cta.target} variant="link-arrow" size="sm" className="justify-center">
            Or talk to us first
          </Button>
        </div>
      ) : (
        <Button
          href={tier.cta.target}
          variant={tier.highlighted ? "primary" : "secondary"}
          className="mt-6 w-full"
        >
          {tier.cta.label}
        </Button>
      )}
    </div>
  );
}
