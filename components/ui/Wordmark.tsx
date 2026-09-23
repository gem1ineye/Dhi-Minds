import { cn } from "@/lib/utils";

/**
 * Brand wordmark — "धी · Minds", with a small accent dot between the two words.
 *
 * धी (dhī) is Sanskrit for intellect, insight, and clear thought. The
 * Devanagari is presentational: it is hidden from assistive tech and the
 * Latin name is provided instead, so screen readers say "Dhi Minds" rather
 * than guessing at Sanskrit pronunciation. No letter-spacing is applied to
 * the Devanagari — tracking breaks its conjunct shaping.
 */
export function Wordmark({ className, showMinds = true }: { className?: string; showMinds?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 whitespace-nowrap", className)}>
      <span
        aria-hidden="true"
        lang="sa"
        className="font-sanskrit text-[1.55em] leading-none tracking-normal text-ink-900"
      >
        धी
      </span>
      {showMinds && (
        <>
          <span aria-hidden="true" className="size-1.5 self-center rounded-full bg-accent-500" />
          <span aria-hidden="true" className="font-display font-semibold tracking-tight text-accent-700">
            Minds
          </span>
        </>
      )}
      <span className="sr-only">{showMinds ? "Dhi Minds" : "Dhi"}</span>
    </span>
  );
}
