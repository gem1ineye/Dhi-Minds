import { Section } from "@/components/ui/Section";
import { PricingCard } from "@/components/ui/PricingCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getPricingTiers, getPricingCustomBand } from "@/lib/content";
import { isRazorpayConfigured } from "@/lib/razorpay";

/** FR-PRC-01..08 — PRD §8.10. Desktop keeps natural tier order; mobile stacks with Growth first. */
export function Pricing() {
  const tiers = getPricingTiers();
  const custom = getPricingCustomBand();
  const razorpayConfigured = isRazorpayConfigured();

  return (
    <Section id="pricing" surface="band" orb="right" eyebrow="Pricing" heading="Simple plans. Serious results.">
      <div className="grid gap-6 md:grid-cols-3 md:items-start">
        {tiers.map((tier, i) => (
          <RevealOnScroll
            key={tier.id}
            delay={i * 0.06}
            className={tier.highlighted ? "order-first md:order-none" : undefined}
          >
            <PricingCard tier={tier} razorpayConfigured={razorpayConfigured} />
          </RevealOnScroll>
        ))}
      </div>
      <div className="glass-soft mx-auto mt-12 max-w-xl rounded-[var(--radius-md)] p-6 text-center">
        <h3 className="font-display text-base font-medium text-ink-900">{custom.heading}</h3>
        <p className="mt-2 text-sm text-grey-500">{custom.copy}</p>
      </div>
    </Section>
  );
}
