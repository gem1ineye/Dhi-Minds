"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/schema";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { cn } from "@/lib/utils";

/** FR-TEST-03 — 2–3 up grid on desktop; swipeable carousel with dots (no auto-advance) on mobile. */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(slides.indexOf(visible.target as HTMLElement));
      },
      { root: track, threshold: 0.6 },
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [testimonials.length]);

  function scrollTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div>
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <div key={i} className="w-[88%] shrink-0 snap-start">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={active === i}
              onClick={() => scrollTo(i)}
              className={cn(
                "size-2 rounded-full transition-colors",
                active === i ? "bg-accent-500" : "bg-grey-300",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
