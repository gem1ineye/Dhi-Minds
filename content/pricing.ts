import { pricingTierSchema, type PricingTier } from "./schema";
import { amountFromEnv } from "@/lib/utils";

/**
 * PRD §8.10. Pricing figures come from the business (§3.3, CR-06); none
 * were supplied, so every tier's `amount` is null and renders the
 * `fallbackLabel` with the CTA intact (FR-PRC-01). Set the env vars in
 * .env.example (PRICE_STARTER / PRICE_GROWTH / PRICE_SCALE, in the minor
 * unit of NEXT_PUBLIC_CURRENCY) to switch a tier to a real number — no
 * component change required.
 */
const currency = process.env.NEXT_PUBLIC_CURRENCY || "INR";

const raw: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For a professional first impression online",
    audience: "Small businesses establishing their digital presence",
    price: {
      amount: amountFromEnv("PRICE_STARTER"),
      currency,
      qualifier: "Starting from",
      fallbackLabel: "On request",
    },
    features: [
      "Professional website",
      "Responsive design",
      "Basic SEO",
      "Contact integration",
      "Analytics",
      "Basic support",
    ],
    ceiling: "Best suited to a single-site presence rather than a custom product build.",
    cta: { label: "Get started", target: "/contact?plan=starter" },
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to generate more customers online",
    audience: "Businesses improving their presence and generating more customers",
    price: {
      amount: amountFromEnv("PRICE_GROWTH"),
      currency,
      qualifier: "Starting from",
      fallbackLabel: "On request",
    },
    features: [
      "Advanced website",
      "SEO",
      "Conversion optimisation",
      "Social media strategy",
      "Content support",
      "Analytics",
      "Ongoing optimisation",
    ],
    ceiling: "Does not include custom application or SaaS development — see Scale.",
    cta: { label: "Get started", target: "/contact?plan=growth" },
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For custom products and long-term growth partnerships",
    audience: "Businesses needing custom digital products and growth solutions",
    price: {
      amount: amountFromEnv("PRICE_SCALE"),
      currency,
      qualifier: "Starting from",
      fallbackLabel: "On request",
    },
    features: [
      "Custom web applications",
      "SaaS development",
      "Advanced integrations",
      "Advanced SEO",
      "Digital strategy",
      "Dedicated support",
      "Custom requirements",
    ],
    ceiling: "Scoped per engagement — talk to the team for a tailored proposal.",
    cta: { label: "Talk to our team", target: "/contact?plan=scale" },
    highlighted: false,
  },
];

export const pricingTiers: PricingTier[] = raw.map((t) => pricingTierSchema.parse(t));

export const pricingCustomBand = {
  heading: "Need something custom?",
  copy: "Every business is different. Tell us what you're building and we'll create a tailored proposal.",
};
