import { clientSchema, assertNoPlaceholdersInProduction, type Client } from "./schema";

/**
 * PRD §8.3. No real client logos/permissions exist yet (CR-07). Clearly
 * labelled placeholders ship per FR-TRUST-04; console warning below, and a
 * production deploy is blocked while any remain (CR-05).
 */
const raw: Client[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Client Name ${String(i + 1).padStart(2, "0")}`,
  isPlaceholder: true,
}));

if (process.env.NODE_ENV !== "production") {
  console.warn(
    "[content/clients] Rendering placeholder client wordmarks — replace with real, permissioned client logos before launch (FR-TRUST-04, CR-07).",
  );
}

export const clients: Client[] = raw.map((c) => clientSchema.parse(c));

assertNoPlaceholdersInProduction(
  clients.map((c, i) => ({ isPlaceholder: c.isPlaceholder, label: `client[${i}]` })),
);
