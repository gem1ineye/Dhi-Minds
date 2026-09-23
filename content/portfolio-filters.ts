import { filterGroupSchema, type FilterGroup } from "./schema";

/** PRD FR-PORT-01 — the six mandated filter buttons, in display order. */
export const portfolioFilters: FilterGroup[] = [
  "All",
  "Websites",
  "SaaS",
  "E-commerce",
  "Branding",
  "Marketing",
].map((f) => filterGroupSchema.parse(f));
