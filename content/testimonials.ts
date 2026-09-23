import { testimonialSchema, assertNoPlaceholdersInProduction, type Testimonial } from "./schema";

/**
 * PRD §8.11. Only a real, written-consent quote from a real client may appear
 * here (CR-08). While this list is empty the Testimonials section is hidden.
 */
const raw: Testimonial[] = [];

export const testimonials: Testimonial[] = raw.map((t) => testimonialSchema.parse(t));

assertNoPlaceholdersInProduction(
  testimonials.map((t, i) => ({ isPlaceholder: t.isPlaceholder, label: `testimonial[${i}]` })),
);
