import { Section } from "@/components/ui/Section";
import { LogoWall } from "@/components/ui/LogoWall";
import { getClients } from "@/lib/content";

/** FR-TRUST-01..05 — PRD §8.3. */
export function Trust() {
  const clients = getClients();
  if (clients.length === 0) return null;

  return (
    <Section surface="open" className="py-16">
      <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.12em] text-grey-500">
        Trusted by businesses building what&apos;s next
      </p>
      <LogoWall clients={clients} />
    </Section>
  );
}
