import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mock business websites for the hero. They are drawn in markup, not images,
 * so they stay crisp at any size — and they are deliberately generic:
 * skeleton lines and shapes only, no invented metrics, prices, or client names.
 *
 * Everything is sized in percentages of the card, so a mock scales down
 * cleanly on phones. The one element the animated cursor "clicks" in each
 * mock carries `data-mock-target`.
 */

export type MockProps = {
  /** The cursor is pressing the target right now. */
  pressed: boolean;
  /** The click has landed; the mock shows its "converted" state. */
  active: boolean;
};

/** A skeleton line. Height comes from its width, so it scales with the card. */
function Line({ w, ratio = 10, className }: { w: string; ratio?: number; className?: string }) {
  return (
    <i
      className={cn("block rounded-full bg-ink-900/12", className)}
      style={{ width: w, aspectRatio: `${ratio} / 1` }}
    />
  );
}

/** The call-to-action the visitor cursor clicks. */
function Cta({
  children,
  pressed,
  active,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  pressed: boolean;
  active: boolean;
  tone?: "dark" | "accent";
  className?: string;
}) {
  return (
    <span
      data-mock-target
      className={cn(
        "mock-text inline-flex origin-center items-center justify-center whitespace-nowrap rounded-full px-[1.5em] py-[0.7em] font-medium leading-none text-white transition-[transform,box-shadow] duration-150",
        tone === "dark" ? "bg-ink-900" : "bg-accent-500",
        pressed && "scale-90",
        active && "ring-[0.4em] ring-accent-300/60",
        className,
      )}
    >
      {children}
    </span>
  );
}

function SiteNav({ right }: { right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-[5%] py-[3.5%]">
      <Line w="20%" ratio={7} className="bg-ink-900" />
      {right ?? (
        <div className="flex w-[36%] justify-between">
          <Line w="26%" ratio={6} />
          <Line w="26%" ratio={6} />
          <Line w="26%" ratio={6} />
        </div>
      )}
    </div>
  );
}

/** A web app / SaaS dashboard. */
export function AppMock({ pressed, active }: MockProps) {
  const bars = [38, 58, 46, 78, 54, 70, 92];
  return (
    <div className="absolute inset-0 flex bg-white">
      <div className="flex w-[15%] flex-col items-center gap-[9%] bg-mist-100 py-[7%]">
        <i className="block aspect-square w-[46%] rounded-[30%] bg-accent-500" />
        {[0, 1, 2].map((n) => (
          <i key={n} className="block aspect-square w-[46%] rounded-[30%] bg-ink-900/12" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[5%] p-[4.5%]">
        <div className="flex items-center justify-between">
          <Line w="32%" />
          <Cta pressed={pressed} active={active}>
            Start free trial
          </Cta>
        </div>
        <div className="grid grid-cols-3 gap-[3.5%]">
          {[0, 1, 2].map((n) => (
            <div key={n} className="rounded-[14%] bg-mist-50 p-[10%]">
              <Line w="55%" ratio={8} />
              <Line w="80%" ratio={5} className="mt-[14%] bg-ink-900/70" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[3.5%] rounded-[6%] bg-mist-50 px-[5%] pt-[6%]">
          {bars.map((h, n) => (
            <i
              key={n}
              className={cn(
                "block flex-1 rounded-t-[30%] transition-[height,background-color] duration-500",
                n === 5 && active ? "bg-accent-500" : n === 6 ? "bg-accent-400" : "bg-accent-200",
              )}
              style={{ height: `${n === 5 && active ? h + 16 : h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A restaurant / hospitality site. */
export function HospitalityMock({ pressed, active }: MockProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <SiteNav />
      {/* Image on the left, copy + CTA on the right: the right side is the one that stays visible when a neighbouring card overlaps. */}
      <div className="grid flex-1 grid-cols-[1fr_1.15fr] gap-[5%] px-[5%] pb-[5%]">
        <div className="relative rounded-[12%] bg-linear-to-br from-accent-300 to-accent-500">
          <i className="absolute inset-[16%] rounded-full bg-white/75" />
          <i
            className={cn(
              "absolute inset-[30%] rounded-full bg-accent-200 transition-transform duration-500",
              active && "scale-110",
            )}
          />
          <i className="absolute inset-[44%] rounded-full bg-white" />
        </div>
        <div className="flex flex-col justify-center gap-[7%]">
          <Line w="96%" ratio={9} className="bg-ink-900" />
          <Line w="66%" ratio={9} className="bg-ink-900" />
          <div className="flex flex-col gap-[6%]">
            <Line w="90%" ratio={16} />
            <Line w="72%" ratio={16} />
          </div>
          <Cta pressed={pressed} active={active} tone="accent" className="self-start">
            Book a table
          </Cta>
        </div>
      </div>
    </div>
  );
}

function Product({
  tone,
  cta,
  pressed,
  active,
}: {
  tone: string;
  cta?: boolean;
  pressed: boolean;
  active: boolean;
}) {
  return (
    <div className="flex flex-col gap-[5%]">
      <div className={cn("relative w-full flex-1 rounded-[9%] bg-linear-to-br", tone)}>
        <i className="absolute inset-[24%] rounded-[24%] bg-white/55" />
      </div>
      <Line w="70%" ratio={14} />
      {cta ? (
        <Cta pressed={pressed} active={active} tone="accent" className="self-start">
          Add to cart
        </Cta>
      ) : (
        <Line w="40%" ratio={14} className="bg-ink-900/25" />
      )}
    </div>
  );
}

/** An online store. The cart badge appears once the visitor adds something. */
export function StoreMock({ pressed, active }: MockProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <SiteNav
        right={
          <div className="relative aspect-square w-[7%] rounded-[30%] bg-mist-200">
            <i
              className={cn(
                "absolute -right-[30%] -top-[30%] block aspect-square w-[55%] rounded-full bg-accent-500 transition-transform duration-300",
                active ? "scale-100" : "scale-0",
              )}
            />
          </div>
        }
      />
      <div className="grid flex-1 grid-cols-2 gap-[5%] px-[5%] pb-[5%]">
        <Product tone="from-mist-200 to-mist-300" pressed={false} active={false} />
        <Product tone="from-accent-200 to-accent-300" cta pressed={pressed} active={active} />
      </div>
    </div>
  );
}

/** A local-business / appointments site. A calendar day gets picked when the visitor books. */
export function LocalMock({ pressed, active }: MockProps) {
  const selected = active ? 16 : 9;
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <SiteNav />
      <div className="grid flex-1 grid-cols-[1.05fr_1fr] gap-[5%] px-[5%] pb-[5%]">
        <div className="flex flex-col justify-center gap-[6%]">
          <Line w="92%" ratio={9} className="bg-ink-900" />
          <Line w="60%" ratio={9} className="bg-ink-900" />
          <div className="flex flex-col gap-[6%]">
            <Line w="88%" ratio={16} />
            <Line w="70%" ratio={16} />
          </div>
          <Cta pressed={pressed} active={active} className="self-start">
            Book a visit
          </Cta>
        </div>
        <div className="rounded-[10%] bg-mist-50 p-[8%]">
          <Line w="46%" ratio={10} className="bg-ink-900/25" />
          <div className="mt-[10%] grid grid-cols-7 gap-[8%]">
            {Array.from({ length: 21 }, (_, n) => (
              <i
                key={n}
                className={cn(
                  "block aspect-square rounded-[28%] transition-colors duration-300",
                  n === selected ? "bg-accent-500" : n % 5 === 0 ? "bg-accent-200" : "bg-ink-900/10",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Browser-window chrome around a mock, with a category caption. */
export function BrowserFrame({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-md)] border border-white/75 bg-white/90 p-1.5 shadow-[var(--glass-shadow)] transition-[box-shadow] duration-300",
        active && "shadow-[var(--glass-shadow-lift)] ring-1 ring-accent-500/40",
      )}
    >
      <div className="mb-1.5 flex items-center gap-1 px-1.5">
        {[0, 1, 2].map((n) => (
          <i key={n} className="block size-1.5 rounded-full bg-ink-900/20" />
        ))}
        <span className="ml-1.5 flex-1 truncate rounded-full bg-white/80 px-2 py-px text-[7px] leading-3 text-grey-500">
          yourbrand.com
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-md)-8px)] bg-white [container-type:inline-size]">
        {children}
      </div>
      <span className="absolute -bottom-2.5 left-3 rounded-full border border-white bg-white/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-accent-700 shadow-sm">
        {label}
      </span>
    </div>
  );
}

export type HeroCard = {
  id: string;
  /** Category caption under the card. */
  label: string;
  /** What the visitor's click achieves — shown as a small result pill. */
  result: string;
  /** Parallax depth (1 = nearest). */
  depth: number;
  /** Absolute placement inside the visual. */
  className: string;
  /** Stacking order at rest. */
  z: number;
  /** Entrance delay, ms. */
  delay: number;
  Mock: (props: MockProps) => ReactElement;
};

export const HERO_CARDS: HeroCard[] = [
  { id: "app", label: "Web app", result: "Trial started", depth: 1, className: "left-0 top-0 w-[56%]", z: 20, delay: 100, Mock: AppMock },
  { id: "hospitality", label: "Hospitality", result: "Table booked", depth: 3, className: "right-0 top-[10%] w-[52%]", z: 10, delay: 220, Mock: HospitalityMock },
  { id: "store", label: "E-commerce", result: "Added to cart", depth: 2, className: "left-[4%] top-[45%] w-[54%]", z: 30, delay: 340, Mock: StoreMock },
  { id: "local", label: "Local business", result: "Visit booked", depth: 3, className: "right-0 top-[57%] w-[54%]", z: 25, delay: 460, Mock: LocalMock },
];
