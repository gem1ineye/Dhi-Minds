import { testimonialSchema, assertNoPlaceholdersInProduction, type Testimonial } from "./schema";

/**
 * PRD §8.11. No real, consented testimonials exist yet (CR-08). Two
 * clearly-marked placeholders ship per FR-TEST-02; a real deployment
 * with none of these replaced is blocked in production (CR-05).
 */
const raw: Testimonial[] = [
  {
    quote:
      "[Placeholder testimonial — replace before launch. Only a real, written-consent quote from a real client may appear here — CR-08.]",
    name: "[Placeholder name]",
    position: "[Placeholder role]",
    company: "Client Name 01",
    isPlaceholder: true,
  },
  {
    quote:
      "[Placeholder testimonial — replace before launch. Only a real, written-consent quote from a real client may appear here — CR-08.]",
    name: "[Placeholder name]",
    position: "[Placeholder role]",
    company: "Client Name 02",
    isPlaceholder: true,
  },
];

export const testimonials: Testimonial[] = raw.map((t) => testimonialSchema.parse(t));

assertNoPlaceholdersInProduction(
  testimonials.map((t, i) => ({ isPlaceholder: t.isPlaceholder, label: `testimonial[${i}]` })),
);
