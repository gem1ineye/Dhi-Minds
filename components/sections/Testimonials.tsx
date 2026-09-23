import { Section } from "@/components/ui/Section";
import { getTestimonials } from "@/lib/content";
import { TestimonialCarousel } from "./TestimonialCarousel";

/** FR-TEST-01..06 — PRD §8.11. Hidden entirely if the collection is empty. */
export function Testimonials() {
  const testimonials = getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <Section surface="open" orb="left" eyebrow="Testimonials" heading="What clients say">
      <TestimonialCarousel testimonials={testimonials} />
    </Section>
  );
}
