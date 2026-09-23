import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { TalkToUsButton } from "./TalkToUsButton";
import { getCompany } from "@/lib/content";

/** FR-CTA-01..04 — PRD §8.13. The accent rule terminates here; this is the only fully accent-filled panel on the page. */
export function FinalCTA() {
  const company = getCompany();

  return (
    <section className="relative overflow-hidden py-[clamp(72px,9vw,144px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent"
      />
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <RevealOnScroll>
          {/* Saturated indigo card — the one strong colour block, echoing the accent card in the dashboard reference. */}
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-linear-to-br from-accent-400 to-accent-500 px-6 py-14 text-center shadow-[var(--glass-shadow-lift)] sm:px-12 sm:py-16">
            <div aria-hidden="true" className="orb-white pointer-events-none absolute -right-24 -top-28 size-96 rounded-full" />
            <div aria-hidden="true" className="orb-white pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full" />
            <div className="relative">
              <h2 className="font-display text-[length:var(--text-display-xl)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                Have an idea? Let&apos;s build it.
              </h2>
              <p className="measure mx-auto mt-6 text-[length:var(--text-body-lg)] leading-relaxed text-white">
                Whether you&apos;re launching a new business, rebuilding your website, or creating your
                next digital product, let&apos;s turn your idea into something people remember.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href="#contact" variant="light" size="lg" showArrow className="focus-visible:outline-white">
                  Start a project
                </Button>
                <TalkToUsButton company={company} className="focus-visible:outline-white" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
