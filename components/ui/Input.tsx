import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlClasses =
  "h-11 w-full rounded-[var(--radius-sm)] border bg-white/70 px-3.5 text-[16px] text-charcoal placeholder:text-grey-500 transition-colors duration-[var(--duration-instant)] focus-visible:border-accent-500 disabled:opacity-50";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(controlClasses, invalid ? "border-red-700" : "border-grey-300", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
