import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/**
 * Every surface is translucent so the page's ambient periwinkle glow shows
 * through. "open" sits directly on the glow; "band" is a faint frosted stripe
 * with hairline edges, which keeps the alternating section rhythm without
 * opaque blocks (and without a costly full-width backdrop blur).
 */
const surfaces = {
  open: "text-charcoal",
  band: "bg-white/25 text-charcoal border-y border-accent-500/10",
} as const;

export type SectionSurface = keyof typeof surfaces;

/**
 * Owns all section-level vertical rhythm (NFR-ENG-05) — no component below
 * this one sets its own top/bottom section padding, avoiding Tailwind class
 * conflicts and specificity collisions.
 */
export function Section({
  id,
  surface = "open",
  eyebrow,
  heading,
  lede,
  align = "left",
  children,
  className,
  containerClassName,
  headingLevel = "h2",
  headingClassName,
  orb,
}: {
  id?: string;
  surface?: SectionSurface;
  eyebrow?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  headingLevel?: "h1" | "h2";
  headingClassName?: string;
  /** Decorative colour pool behind the content, on this side. Gives the glass cards something to frost. */
  orb?: "left" | "right";
}) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip py-[clamp(72px,9vw,144px)]",
        // FR-IA-02 — anchor targets must clear the fixed navbar (max 80px) so headings are never hidden beneath it.
        id && "scroll-mt-24",
        surfaces[surface],
        className,
      )}
    >
      {orb && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/4 size-[30rem] rounded-full sm:size-[42rem]",
              orb === "left" ? "-left-[12rem] orb-sky" : "-right-[12rem] orb-violet",
            )}
          />
          {/* Smaller counter-orb on the opposite side, lower down, so every column of cards has some tint behind it. */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-[4%] size-[20rem] rounded-full sm:size-[28rem]",
              orb === "left" ? "-right-[9rem] orb-violet" : "-left-[9rem] orb-sky",
            )}
          />
        </>
      )}
      <div
        className={cn(
          "relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12",
          containerClassName,
        )}
      >
        {(eyebrow || heading || lede) && (
          <div className={cn("mb-12 flex flex-col gap-4", align === "center" && "items-center text-center")}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <Heading
                className={cn(
                  "text-[length:var(--text-display-lg)] leading-[1.08] tracking-[-0.02em] measure-display",
                  align === "center" && "mx-auto",
                  headingClassName,
                )}
              >
                {heading}
              </Heading>
            )}
            {lede && (
              <p
                className={cn(
                  "measure text-[length:var(--text-body-lg)] leading-[1.6] text-grey-500",
                  align === "center" && "mx-auto",
                )}
              >
                {lede}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
