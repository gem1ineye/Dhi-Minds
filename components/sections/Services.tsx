import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getServices } from "@/lib/content";

/** FR-SVC-01..06 — PRD §8.4. FR-BRD-04: order encodes positioning (data-driven, see content/services.ts). */
export function Services() {
  const services = getServices();

  return (
    <Section
      id="services"
      surface="band"
      orb="right"
      eyebrow="Services"
      heading="Everything you need to build and grow online."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <RevealOnScroll key={service.id} delay={Math.min(i, 5) * 0.06}>
            <ServiceCard service={service} index={i} />
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
