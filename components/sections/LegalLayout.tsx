import type { ReactNode } from "react";

/** FR-LEG-01 — "last updated" date, editorial measure. */
export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <h1 className="font-display text-[length:var(--text-display-lg)] font-medium tracking-[-0.02em] text-ink-900">
        {title}
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-grey-500">
        Last updated: {lastUpdated}
      </p>
      <div className="glass mt-8 rounded-[var(--radius-lg)] p-6 sm:p-10">{children}</div>
    </div>
  );
}
