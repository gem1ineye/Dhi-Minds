import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getCompany } from "@/lib/content";

/** FR-CAP-01..04 — PRD §8.9. Metrics render only when real, sourced values are configured (CR-02); otherwise capability statements (CR-03). */
export function Capabilities() {
  const company = getCompany();
  const useMetrics = company.capabilitiesMode === "metrics" && company.metrics && company.metrics.length > 0;

  return (
    <Section surface="open">
      {useMetrics ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {company.metrics!.map((m) => (
            <RevealOnScroll key={m.label}>
              <StatBlock value={m.value} label={m.label} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <RevealOnScroll>
          <p className="measure mx-auto text-center text-[length:var(--text-heading-md)] leading-snug text-ink-900">
            {company.capabilities[0]}
          </p>
        </RevealOnScroll>
      )}
    </Section>
  );
}
