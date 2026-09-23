import { Button } from "@/components/ui/Button";
import { HeroHeadline } from "./HeroHeadline";
import { HeroVisual } from "./HeroVisual";

/** FR-HERO-01..07 — PRD §8.2. */
export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16 lg:pt-28">
      {/* Warm colour pools behind the glass visual so the frosting has something to blur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[10%] h-[85%] w-[62%] rounded-full orb-sky"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[3%] right-[8%] h-[52%] w-[50%] rounded-full orb-violet"
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          {/* धी is Sanskrit for intellect and insight. Devanagari gets no tracking or uppercasing — both break its shaping. */}
          <span className="glass-soft inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-4 pr-5">
            <span aria-hidden="true" lang="sa" className="font-sanskrit text-2xl leading-none text-ink-900">
              धी
            </span>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
            <span className="font-mono text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.12em] text-accent-700">
              <span className="sr-only">Dhi </span>Minds
            </span>
          </span>
          <HeroHeadline />
          <p className="measure text-[length:var(--text-body-lg)] leading-relaxed text-grey-500">
            We design and build high-performing websites, SaaS products, digital experiences, and
            growth strategies that help businesses stand out and scale.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="/contact" variant="primary" size="lg" showArrow>
              Start your project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              Explore our work
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {/* FR-HERO-07 — optional scroll cue, doubling as the accent rule's origin point. */}
      <a
        href="#services"
        aria-label="Scroll to see more"
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 text-grey-500 transition-colors hover:text-accent-700 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span aria-hidden="true" className="h-8 w-px animate-pulse bg-linear-to-b from-accent-500 to-transparent motion-reduce:animate-none" />
      </a>
    </section>
  );
}
