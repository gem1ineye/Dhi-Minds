"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

/** §6.1 / NFR-SEC-11 — branded 500, never leaks a stack trace or environment detail. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[app-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <p className="font-mono text-sm uppercase tracking-wide text-accent-700">500</p>
      <h1 className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
        Something went wrong.
      </h1>
      <p className="measure text-grey-500">
        An unexpected error occurred on our end. Try again, or reach us directly if it persists.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </div>
  );
}
