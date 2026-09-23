import { amountFromEnv } from "@/lib/utils";

/**
 * Paid 1:1 consultation booking. Unlike pricing tiers (CR-06), a payment
 * flow with no configured price has nothing to render — `amount: null`
 * means the whole feature stays hidden rather than showing a fallback.
 */
const currency = process.env.NEXT_PUBLIC_CURRENCY || "INR";

export const consultation = {
  id: "consultation",
  label: "1:1 strategy consultation",
  tagline: "A focused session to scope your project and map next steps.",
  durationMinutes: 30,
  features: [
    "30-minute call with our team",
    "Scoped recommendation for your project",
    "Ballpark timeline and budget guidance",
  ],
  price: {
    amount: amountFromEnv("PRICE_CONSULTATION"),
    currency,
  },
};

export type Consultation = typeof consultation;
