import Image from "next/image";
import type { Testimonial } from "@/content/schema";

function monogram(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** FR-TEST-01..05 — PRD §8.11. Missing photo falls back to a monogram avatar, never a stock portrait. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="glass flex h-full flex-col rounded-[var(--radius-md)] p-7">
      <span aria-hidden="true" className="font-display text-4xl leading-none text-accent-500">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-[length:var(--text-body-lg)] leading-relaxed text-charcoal">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-300/40 font-mono text-sm text-accent-700 ring-1 ring-accent-500/25"
          >
            {monogram(testimonial.name)}
          </span>
        )}
        <div>
          <div className="text-sm font-medium text-ink-900">{testimonial.name}</div>
          <div className="text-sm text-grey-500">
            {testimonial.position}, {testimonial.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
