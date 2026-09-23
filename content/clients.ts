import { clientSchema, assertNoPlaceholdersInProduction, type Client } from "./schema";

/**
 * PRD §8.3. Real clients render as text wordmarks until a permissioned logo is
 * supplied (add `logo` to an entry to show it instead, CR-07). Any entry still
 * marked isPlaceholder warns below, and a production deploy is blocked while
 * one remains (CR-05).
 */
const raw: Client[] = [
  { name: "Fashion Pitara", isPlaceholder: false },
  { name: "Mr. Thrift", isPlaceholder: false },
];

if (process.env.NODE_ENV !== "production" && raw.some((c) => c.isPlaceholder)) {
  console.warn(
    "[content/clients] Rendering placeholder client wordmarks — replace with real, permissioned client logos before launch (FR-TRUST-04, CR-07).",
  );
}

export const clients: Client[] = raw.map((c) => clientSchema.parse(c));

assertNoPlaceholdersInProduction(
  clients.map((c, i) => ({ isPlaceholder: c.isPlaceholder, label: `client[${i}]` })),
);
