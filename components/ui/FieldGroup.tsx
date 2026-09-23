import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * NFR-A11Y-05 — visible, programmatically associated labels; placeholders
 * are never used as labels. FR-CON-02 — errors linked via aria-describedby.
 */
export function FieldGroup({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
  counter,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  counter?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-mono text-xs uppercase tracking-wide text-grey-500">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-1 text-accent-700">
              *
            </span>
          )}
        </label>
        {counter && (
          <span className="font-mono text-xs text-grey-500" aria-hidden="true">
            {counter}
          </span>
        )}
      </div>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-grey-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}
