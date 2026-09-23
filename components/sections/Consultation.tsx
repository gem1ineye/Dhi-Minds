import { Check, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RazorpayCheckoutButton } from "@/components/ui/RazorpayCheckoutButton";
import { getConsultation } from "@/lib/content";
import { isRazorpayConfigured } from "@/lib/razorpay";

/** Dedicated route rather than a homepage section — kept off the PRD-governed fixed home page order (FR-IA-01). Hidden/fallback until PRICE_CONSULTATION and Razorpay keys are both configured. */
export function Consultation({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const consultation = getConsultation();
  const amount = consultation.price.amount;
  const available = amount != null && isRazorpayConfigured();

  return (
    <Section
      id="consultation"
      surface="open"
      eyebrow="Consultation"
      heading={consultation.label}
      lede={consultation.tagline}
      headingLevel={headingLevel}
    >
      <div className="glass mx-auto max-w-xl rounded-[var(--radius-lg)] p-8">
        <div className="flex items-center gap-2 text-sm text-grey-500">
          <Clock aria-hidden="true" className="size-4 text-accent-700" />
          {consultation.durationMinutes} minutes
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {consultation.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-charcoal">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" />
              {f}
            </li>
          ))}
        </ul>

        {available && amount != null ? (
          <RazorpayCheckoutButton
            type="consultation"
            label="Book & pay"
            amount={amount}
            currency={consultation.price.currency}
            variant="primary"
            className="mt-8"
          />
        ) : (
          <div className="mt-8">
            <p className="text-sm text-grey-500">
              Booking isn&apos;t open yet — reach out and we&apos;ll set up a time.
            </p>
            <Button href="/contact" variant="secondary" className="mt-4 w-full">
              Contact us
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
