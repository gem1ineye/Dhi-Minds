/**
 * Thin analytics wrapper (FR-ANL-05) — swap providers in this one file.
 * No personal data is ever sent as an event property (FR-ANL-06): callers
 * pass only identifiers/labels, never form field values.
 */
export type AnalyticsEvent =
  | { name: "cta_click"; location: string; label: string }
  | { name: "service_expand"; serviceId: string }
  | { name: "portfolio_filter"; filter: string }
  | { name: "case_study_view"; slug: string }
  | { name: "pricing_cta_click"; tier: string }
  | { name: "faq_open"; question: string }
  | { name: "form_start" }
  | { name: "form_field_error"; field: string }
  | { name: "form_submit" }
  | { name: "form_success" }
  | { name: "form_error" }
  | { name: "contact_direct_click"; channel: "email" | "phone" | "whatsapp" }
  | { name: "payment_initiated"; type: "consultation" | "plan" }
  | { name: "payment_success"; type: "consultation" | "plan" }
  | { name: "payment_failed"; type: "consultation" | "plan" }
  | { name: "scroll_depth"; percent: 25 | 50 | 75 | 100 }
  | { name: "section_in_view"; section: string };

declare global {
  interface Window {
    plausible?: (eventName: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const { name, ...props } = event;
  try {
    window.plausible?.(name, { props });
  } catch {
    // Analytics must never break the page.
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props);
  }
}
