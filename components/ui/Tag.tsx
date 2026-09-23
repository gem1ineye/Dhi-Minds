import { cn } from "@/lib/utils";

/** Component inventory §7.7 — technology / category / service tag. */
export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: string;
  variant?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide",
        variant === "default" && "border-white/70 bg-white/45 text-grey-500 shadow-[0_0_0_1px_rgba(60,68,160,0.1)]",
        variant === "accent" && "border-accent-500/40 bg-white/30 text-accent-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
