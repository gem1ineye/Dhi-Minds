import { Section } from "@/components/ui/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { getProcessSteps } from "@/lib/content";

/** FR-PROC-01..05 — PRD §8.8. */
export function Process() {
  const steps = getProcessSteps();

  return (
    <Section id="process" surface="band" orb="left" eyebrow="Process" heading="From idea to impact.">
      <ol className="relative flex flex-col gap-16 border-l border-accent-500/25 pl-4 md:border-l-0 md:pl-0">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-accent-500/25 md:block"
        />
        {steps.map((step, i) => (
          <ProcessStep key={step.index} step={step} position={i} offset={i % 2 === 0 ? "left" : "right"} />
        ))}
      </ol>
    </Section>
  );
}
