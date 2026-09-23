"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Image as ImageType } from "@/content/schema";
import { cn } from "@/lib/utils";

/** FR-CS-04 — 1–12 images, lazy-loaded, accessible lightbox (focus trap, Esc, arrow-key nav, restores focus). */
export function DesignGallery({ images }: { images: ImageType[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerIndex = useRef<number | null>(null);

  const close = () => setOpenIndex(null);
  const open = (i: number) => {
    lastTriggerIndex.current = i;
    setOpenIndex(i);
  };

  useEffect(() => {
    if (openIndex === null) return;

    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      if (e.key === "Tab") e.preventDefault(); // single focusable surface inside the dialog
    }

    const idx = lastTriggerIndex.current;
    const triggerToRestore = idx !== null ? triggerRefs.current[idx] : null;

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      triggerToRestore?.focus();
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => open(i)}
            aria-label={`Open image ${i + 1} of ${images.length} in the lightbox`}
            className="glass relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] p-1.5 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2"
          >
            <span className="relative block size-full overflow-hidden rounded-[calc(var(--radius-md)-6px)]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${openIndex + 1} of ${images.length}`}
          tabIndex={-1}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-mist-100/85 p-4 outline-none backdrop-blur-2xl sm:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 flex size-11 items-center justify-center glass-strong rounded-full text-ink-900 focus-visible:outline-2 focus-visible:outline-accent-500"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center glass-strong rounded-full text-ink-900 sm:left-6"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center glass-strong rounded-full text-ink-900 sm:right-6"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          )}

          <div className={cn("relative aspect-[16/10] w-full max-w-4xl")}>
            <Image
              src={images[openIndex]!.src}
              alt={images[openIndex]!.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
