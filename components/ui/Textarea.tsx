import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y rounded-[var(--radius-sm)] border bg-white/70 px-3.5 py-3 text-[16px] text-charcoal placeholder:text-grey-500 transition-colors duration-[var(--duration-instant)] focus-visible:border-accent-500 disabled:opacity-50",
        invalid ? "border-red-700" : "border-grey-300",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
