import { cn } from "@/lib/utils";
import type { ProcessStep as ProcessStepData } from "@/content/schema";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

/** Component inventory §7.7 — index, title, description, spine connector. PRD §8.8. */
export function ProcessStep({
  step,
  position,
  offset,
}: {
  step: ProcessStepData;
  position: number;
  offset: "left" | "right";
}) {
  return (
    <li className="relative list-none">
      <RevealOnScroll delay={position * 0.08} className={cn("relative grid gap-6 md:grid-cols-2 md:items-center")}>
        <div
          className={cn(
            "glass ml-10 flex flex-col gap-3 rounded-[var(--radius-md)] p-6 md:ml-0",
            offset === "right" && "md:col-start-2",
            offset === "left" && "md:text-right",
          )}
        >
          <span className="font-mono text-sm font-medium text-accent-700">{step.index}</span>
          <h3 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">
            {step.title}
          </h3>
          <p className={cn("measure text-grey-500", offset === "left" && "md:ml-auto")}>
            {step.description}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-3 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-500 bg-mist-100 md:left-1/2"
        />
      </RevealOnScroll>
    </li>
  );
}
