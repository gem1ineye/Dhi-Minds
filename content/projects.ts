import { projectSchema, assertNoPlaceholdersInProduction, type Project } from "./schema";

/**
 * PRD §8.6 / §8.7. Real client work only (CR-01). An entry without a
 * `caseStudy` renders as a card with no link; add a `caseStudy` block to give
 * it a /work/<slug> page. Add a `results` block only with real, sourced
 * metrics — never invented ones (CR-02/CR-03).
 *
 * FR-BRD-05: the featured slot is a build project, never a campaign.
 */
const raw: Project[] = [
  {
    slug: "fashion-pitara",
    title: "Fashion Pitara online store",
    client: "Fashion Pitara",
    category: "E-commerce",
    filterGroups: ["All", "E-commerce"],
    year: 2026,
    featured: true,
    order: 1,
    summary:
      "An online store for apparel and shoes, with category filters, size selection, a cart, and payment by WhatsApp or Razorpay.",
    services: ["Web Development"],
    coverImage: {
      src: "/images/work/fashion-pitara/homepage-hero.png",
      alt: "Fashion Pitara storefront homepage with the headline “Clothes and shoes, sold the way you'd actually buy them” beside a black-and-white portrait",
      width: 3360,
      height: 1882,
    },
    seo: {
      title: "Fashion Pitara online store",
      description:
        "An online store for apparel and shoes built for Fashion Pitara — product grid, size selection, cart, and WhatsApp or Razorpay checkout.",
      ogImage: "/images/work/fashion-pitara/homepage-hero.png",
    },
    isPlaceholder: false,
  },
];

export const projects: Project[] = raw
  .map((p) => projectSchema.parse(p))
  .sort((a, b) => a.order - b.order);

assertNoPlaceholdersInProduction(
  projects.map((p) => ({ isPlaceholder: p.isPlaceholder, label: `project:${p.slug}` })),
);
