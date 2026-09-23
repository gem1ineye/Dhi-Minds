import { Section } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getCompany } from "@/lib/content";

const PILLARS = ["Technology", "Design", "Marketing", "Strategy"];

const VALUES = [
  { title: "Strategy first", copy: "Every build starts with what the business is trying to achieve." },
  { title: "Design with purpose", copy: "Craft in service of clarity and conversion, not decoration." },
  { title: "Technology that scales", copy: "Architecture that holds up as the product and traffic grow." },
  { title: "Growth driven", copy: "Launch is a milestone, not the finish line." },
  { title: "Long-term partnership", copy: "We stay involved after launch, not just through it." },
];

/** FR-ABT-01..05 — PRD §8.5. */
export function About() {
  const company = getCompany();

  return (
    <Section id="about" surface="open" orb="left" eyebrow="About" heading="We don't just make websites. We build digital businesses.">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div aria-hidden="true" className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm uppercase tracking-wide text-ink-900">
            {PILLARS.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {p}
                {i < PILLARS.length - 1 && <span className="h-px w-6 bg-accent-500" />}
              </span>
            ))}
          </div>
          <p className="measure text-[length:var(--text-body-lg)] leading-relaxed text-charcoal">
            {company.story}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:mt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.05} className={i === 4 ? "sm:col-span-2" : undefined}>
                <div className="glass glass-lift h-full rounded-[var(--radius-md)] p-6">
                  <h3 className="font-display text-base font-medium text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-grey-500">{v.copy}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
