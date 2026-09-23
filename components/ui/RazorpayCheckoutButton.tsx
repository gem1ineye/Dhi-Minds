"use client";

import { useId, useState } from "react";
import Script from "next/script";
import { Button, type ButtonVariant } from "./Button";
import { Input } from "./Input";
import { FieldGroup, describedBy } from "./FieldGroup";
import { useRazorpayCheckout } from "@/lib/useRazorpayCheckout";
import { paymentCustomerSchema, type PaymentCustomer } from "@/lib/payment-validation";
import { formatPrice } from "@/lib/utils";

type Props = (
  | { type: "consultation"; planId?: undefined }
  | { type: "plan"; planId: "starter" | "growth" | "scale" }
) & {
  label: string;
  amount: number;
  currency: string;
  variant?: ButtonVariant;
  className?: string;
};

const EMPTY: PaymentCustomer = { name: "", email: "", phone: "" };

/** Small inline name/email/phone capture, then hands off to Razorpay's own hosted checkout. Used by both PricingCard and the consultation booking page. */
export function RazorpayCheckoutButton(props: Props) {
  const { type, planId, label, amount, currency, variant = "primary", className } = props;
  const idPrefix = useId();
  const [scriptReady, setScriptReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<PaymentCustomer>(EMPTY);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const checkout = useRazorpayCheckout(type === "plan" ? { type, planId } : { type });

  const parsed = paymentCustomerSchema.safeParse(values);
  const errors: Partial<Record<keyof PaymentCustomer, string>> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof PaymentCustomer;
      if (!errors[key]) errors[key] = issue.message;
    }
  }
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([key]) => touched.has(key)),
  ) as Partial<Record<keyof PaymentCustomer, string>>;

  function setField<K extends keyof PaymentCustomer>(field: K, value: PaymentCustomer[K]) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function onBlur(field: keyof PaymentCustomer) {
    setTouched((prev) => new Set(prev).add(field));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(new Set(Object.keys(values)));
    if (!parsed.success) return;
    checkout.open(parsed.data);
  }

  const busy = checkout.status === "loading" || checkout.status === "opening" || checkout.status === "verifying";

  if (checkout.status === "success") {
    return (
      <p className={className} role="status">
        <span className="block rounded-[var(--radius-sm)] border border-accent-500/40 bg-accent-300/25 px-4 py-3 text-sm font-medium text-ink-900">
          Payment received — check your email for confirmation.
        </span>
      </p>
    );
  }

  return (
    <div className={className}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" onLoad={() => setScriptReady(true)} />
      {!expanded ? (
        <Button type="button" variant={variant} className="w-full" onClick={() => setExpanded(true)}>
          {label} — {formatPrice(amount, currency)}
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-grey-300 bg-white/60 p-4">
          <FieldGroup id={`${idPrefix}-name`} label="Name" required error={visibleErrors.name}>
            <Input
              id={`${idPrefix}-name`}
              required
              autoComplete="name"
              invalid={Boolean(visibleErrors.name)}
              aria-describedby={describedBy(`${idPrefix}-name`, undefined, visibleErrors.name)}
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => onBlur("name")}
            />
          </FieldGroup>
          <FieldGroup id={`${idPrefix}-email`} label="Email" required error={visibleErrors.email}>
            <Input
              id={`${idPrefix}-email`}
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              invalid={Boolean(visibleErrors.email)}
              aria-describedby={describedBy(`${idPrefix}-email`, undefined, visibleErrors.email)}
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => onBlur("email")}
            />
          </FieldGroup>
          <FieldGroup id={`${idPrefix}-phone`} label="Phone" required error={visibleErrors.phone}>
            <Input
              id={`${idPrefix}-phone`}
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              invalid={Boolean(visibleErrors.phone)}
              aria-describedby={describedBy(`${idPrefix}-phone`, undefined, visibleErrors.phone)}
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
            />
          </FieldGroup>

          {checkout.error && (
            <p role="alert" className="text-xs font-medium text-red-800">
              {checkout.error}
            </p>
          )}

          <Button type="submit" variant={variant} loading={busy} disabled={!scriptReady}>
            Pay {formatPrice(amount, currency)}
          </Button>
        </form>
      )}
    </div>
  );
}
