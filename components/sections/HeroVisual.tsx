"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { BrowserFrame, HERO_CARDS } from "./HeroMocks";

type Toast = { id: number; text: string; left: number; top: number };

/**
 * FR-HERO-03/04/05 — a wall of mock business websites. A "Visitor" cursor
 * glides to a random site, clicks its call to action, and that site lifts
 * forward with a small result ("Table booked"). It says, without a word of
 * copy: we build sites that get customers to act.
 *
 * - Decorative, so the whole thing is aria-hidden.
 * - Complete with JS off: the cards render and rise in via CSS; only the
 *   cursor loop needs JS.
 * - Pauses when off-screen, when the tab is hidden, and while a real mouse
 *   is over it (so there are never two cursors). Under reduced motion the
 *   loop never starts — the cursor just rests on the first card.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(containerRef);

  const [pageVisible, setPageVisible] = useState(true);
  const [pointerInside, setPointerInside] = useState(false);
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pressed, setPressed] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [clickId, setClickId] = useState(0);

  // Cursor position (px, relative to the visual) and press scale.
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const press = useMotionValue(1);

  // Pointer parallax — only for a real mouse, and only while autoplay is paused.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  const autoplay = !reducedMotion && inView && pageVisible && !pointerInside;
  const cursorVisible = started && (reducedMotion || autoplay);

  /** Centre of a card's clickable element, relative to the visual. */
  function targetPoint(index: number) {
    const box = containerRef.current?.getBoundingClientRect();
    const el = cardEls.current[index]?.querySelector<HTMLElement>("[data-mock-target]");
    if (!box || !el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left - box.left + r.width * 0.55, y: r.top - box.top + r.height * 0.5 };
  }

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Reduced motion: no loop. Rest the cursor on the first card and keep it there across resizes.
  useEffect(() => {
    if (!reducedMotion) return;
    const place = () => {
      const pt = targetPoint(0);
      if (!pt) return;
      cx.set(pt.x);
      cy.set(pt.y);
      setStarted(true);
    };
    place();
    const observer = new ResizeObserver(place);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // The autoplay loop: pick a random site, glide over, hover, click, show the result, repeat.
  useEffect(() => {
    if (!autoplay) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    // A shuffled bag, so every site gets a turn before any repeats.
    let bag: number[] = [];
    let last = -1;
    const nextIndex = () => {
      if (bag.length === 0) {
        bag = HERO_CARDS.map((_, i) => i);
        for (let i = bag.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [bag[i], bag[j]] = [bag[j]!, bag[i]!];
        }
        if (bag[0] === last) [bag[0], bag[1]] = [bag[1]!, bag[0]!];
      }
      last = bag.shift()!;
      return last;
    };

    (async () => {
      // First run: let the cards finish rising into place before measuring
      // them (the last starts at 460ms and takes 700ms), then enter from just
      // outside the bottom-right corner.
      if (!started) {
        const box = containerRef.current?.getBoundingClientRect();
        if (box) {
          cx.set(box.width * 0.9);
          cy.set(box.height * 1.06);
        }
        await wait(1300);
        if (cancelled) return;
      }

      while (!cancelled) {
        const index = nextIndex();
        const pt = targetPoint(index);
        if (!pt) {
          await wait(400);
          continue;
        }
        setStarted(true);

        // x and y ease differently, so the path curves like a human hand.
        const duration = 0.95 + Math.random() * 0.45;
        await Promise.all([
          animate(cx, pt.x, { duration, ease: [0.45, 0, 0.2, 1] }),
          animate(cy, pt.y, { duration: duration * 1.12, ease: [0.2, 0.7, 0.3, 1] }),
        ]);
        if (cancelled) return;

        setHovered(index);
        await wait(320);
        if (cancelled) return;

        setPressed(index);
        setClickId((n) => n + 1);
        animate(press, 0.82, { duration: 0.09 });
        await wait(130);
        if (cancelled) return;

        animate(press, 1, { type: "spring", stiffness: 500, damping: 18 });
        setPressed(null);
        setActive(index);
        const width = containerRef.current?.clientWidth ?? 0;
        const y = cy.get();
        setToast({
          id: Date.now(),
          text: HERO_CARDS[index]!.result,
          left: Math.max(0, Math.min(cx.get() + 18, width - 150)),
          // Above the cursor when there's room; otherwise below its name tag.
          top: y > 70 ? y - 52 : y + 44,
        });
        await wait(2100);
        if (cancelled) return;

        setToast(null);
        setActive(null);
        setHovered(null);
        await wait(450 + Math.random() * 500);
      }
    })();

    return () => {
      cancelled = true;
      setHovered(null);
      setPressed(null);
      setActive(null);
      setToast(null);
    };
    // `started` only decides where the very first sweep begins.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerEnter(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") setPointerInside(true);
  }

  function onPointerLeave() {
    setPointerInside(false);
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="relative aspect-[1/1.1] w-full"
    >
      <div className="glass-soft absolute -inset-[4%] rounded-[var(--radius-lg)]" />

      {HERO_CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            cardEls.current[i] = el;
          }}
          className={`animate-card-in absolute ${card.className}`}
          style={{ zIndex: active === i ? 50 : hovered === i ? 45 : card.z, "--card-delay": `${card.delay}ms` } as CSSProperties}
        >
          <ParallaxLayer depth={card.depth} sx={sx} sy={sy}>
            <motion.div
              animate={{ y: active === i ? -12 : hovered === i ? -5 : 0, scale: active === i ? 1.045 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <BrowserFrame label={card.label} active={active === i}>
                <card.Mock pressed={pressed === i} active={active === i} />
              </BrowserFrame>
            </motion.div>
          </ParallaxLayer>
        </div>
      ))}

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="glass-strong pointer-events-none absolute z-[55] flex items-center gap-1.5 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3 text-xs font-medium text-ink-900"
            style={{ left: toast.left, top: toast.top }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-accent-500 text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The visitor's cursor. Its tip sits exactly on (cx, cy). */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-[60]"
        style={{ x: cx, y: cy }}
        initial={false}
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div style={{ scale: press }} className="relative -ml-[5px] -mt-[3px] origin-top-left">
          {clickId > 0 && (
            <motion.span
              key={clickId}
              className="absolute left-[5px] top-[3px] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-500"
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="relative drop-shadow-md">
            <path
              d="M5 3l14 7.5-6.2 1.8L10.5 19 5 3z"
              className="fill-ink-900"
              stroke="white"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute left-4 top-5 whitespace-nowrap rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-medium text-white shadow-md">
            Visitor
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ParallaxLayer({
  depth,
  sx,
  sy,
  children,
}: {
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}) {
  const maxTranslate = 12;
  const x = useTransform(sx, (v) => v * maxTranslate * depth * 0.5);
  const y = useTransform(sy, (v) => v * maxTranslate * depth * 0.5);
  return <motion.div style={{ x, y }}>{children}</motion.div>;
}
