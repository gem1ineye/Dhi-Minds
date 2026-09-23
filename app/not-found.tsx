import { Button } from "@/components/ui/Button";

/** FR-CS-09 / §6.1 — branded 404 with a real 404 status, navigation back to /work and /contact. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <p className="font-mono text-sm uppercase tracking-wide text-accent-700">404</p>
      <h1 className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
        This page doesn&apos;t exist.
      </h1>
      <p className="measure text-grey-500">
        The page you&apos;re looking for may have moved or never existed. Try our work, or get in touch.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/work" variant="primary">
          View our work
        </Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </div>
  );
}
