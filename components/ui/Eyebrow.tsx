import { cn } from "@/lib/utils";

/** Component inventory §7.7 — mono label + accent tick. On mobile this tick is the accent rule's stand-in (FR-DS-01). */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.12em]",
        "text-accent-700",
        className,
      )}
    >
      <span aria-hidden="true" className="h-[2px] w-4 bg-accent-500 md:hidden" />
      {children}
    </span>
  );
}
