import { projectSchema, assertNoPlaceholdersInProduction, type Project } from "./schema";

/**
 * PRD §8.6 / §8.7. No real portfolio work has been supplied yet (§3.3, R1),
 * so every entry below is a clearly labelled, isPlaceholder:true demo
 * project — it exercises the full portfolio grid, filters, and nine-block
 * case-study template without fabricating a real client engagement (CR-01).
 *
 * None of these carry a `results` block: CR-02/CR-03 require real, sourced
 * metrics or none at all — never invented ones, not even under a
 * "placeholder" label. The Results block is fully implemented in the case
 * study template (FR-CS-02) and will render the moment a real project
 * supplies `results`.
 *
 * FR-BRD-05: the featured slot is a build project (SaaS), never a campaign.
 */
const raw: Project[] = [
  {
    slug: "placeholder-saas-platform",
    title: "[Placeholder] A subscription SaaS platform rebuilt for scale",
    client: "Client Name 01",
    category: "SaaS",
    filterGroups: ["All", "SaaS"],
    year: 2026,
    featured: true,
    order: 1,
    summary:
      "[Placeholder] A multi-tenant SaaS product rebuilt from a legacy stack — replace with a real case study before launch.",
    services: ["SaaS Development", "Digital Strategy"],
    coverImage: {
      src: "/images/placeholders/cover-01.svg",
      alt: "Placeholder abstract cover artwork — replace with a real product screenshot before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-01.svg",
        alt: "Placeholder abstract hero artwork — replace with a real product screenshot before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "SaaS product",
        timeline: "[Placeholder timeline, e.g. 12 weeks]",
        servicesProvided: ["Product strategy", "UI/UX", "Frontend", "Backend", "Deployment"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had — the constraint, the risk, or the ceiling the previous system created. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem — the sequencing, the key decisions, the trade-offs made. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. multi-tenant dashboard]",
        "[Placeholder deliverable — e.g. billing and subscription management]",
        "[Placeholder deliverable — e.g. role-based access control]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-01.svg",
          alt: "Placeholder design gallery image 1 — replace with real UI screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-02.svg",
          alt: "Placeholder design gallery image 2 — replace with real UI screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-03.svg",
          alt: "Placeholder design gallery image 3 — replace with real UI screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
    },
    seo: {
      title: "Placeholder SaaS platform case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-01.svg",
    },
    isPlaceholder: true,
  },
  {
    slug: "placeholder-hospitality-website",
    title: "[Placeholder] A premium hospitality website and booking funnel",
    client: "Client Name 02",
    category: "Website",
    filterGroups: ["All", "Websites"],
    year: 2025,
    featured: false,
    order: 2,
    summary:
      "[Placeholder] A high-end hospitality brand's website, rebuilt for conversion — replace with a real case study before launch.",
    services: ["Web Development", "SEO & Growth"],
    coverImage: {
      src: "/images/placeholders/cover-02.svg",
      alt: "Placeholder abstract cover artwork — replace with a real website screenshot before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-02.svg",
        alt: "Placeholder abstract hero artwork — replace with a real website screenshot before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "Marketing website",
        timeline: "[Placeholder timeline, e.g. 6 weeks]",
        servicesProvided: ["Web Development", "Technical SEO", "On-page SEO"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. responsive marketing site]",
        "[Placeholder deliverable — e.g. booking enquiry funnel]",
        "[Placeholder deliverable — e.g. technical SEO foundation]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-04.svg",
          alt: "Placeholder design gallery image 1 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-05.svg",
          alt: "Placeholder design gallery image 2 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    seo: {
      title: "Placeholder hospitality website case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-02.svg",
    },
    isPlaceholder: true,
  },
  {
    slug: "placeholder-ecommerce-storefront",
    title: "[Placeholder] A direct-to-consumer e-commerce storefront",
    client: "Client Name 03",
    category: "E-commerce",
    filterGroups: ["All", "E-commerce"],
    year: 2025,
    featured: false,
    order: 3,
    summary:
      "[Placeholder] A DTC storefront and checkout experience — replace with a real case study before launch.",
    services: ["Web Development", "Digital Strategy"],
    coverImage: {
      src: "/images/placeholders/cover-03.svg",
      alt: "Placeholder abstract cover artwork — replace with a real storefront screenshot before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-03.svg",
        alt: "Placeholder abstract hero artwork — replace with a real storefront screenshot before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "E-commerce storefront",
        timeline: "[Placeholder timeline, e.g. 8 weeks]",
        servicesProvided: ["Web Development", "Digital Strategy"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. custom storefront]",
        "[Placeholder deliverable — e.g. checkout and payments]",
        "[Placeholder deliverable — e.g. inventory-aware catalogue]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-06.svg",
          alt: "Placeholder design gallery image 1 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-01.svg",
          alt: "Placeholder design gallery image 2 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Next.js", "Shopify", "TypeScript"],
    },
    seo: {
      title: "Placeholder e-commerce case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-03.svg",
    },
    isPlaceholder: true,
  },
  {
    slug: "placeholder-brand-identity-refresh",
    title: "[Placeholder] A brand identity refresh for a growth-stage company",
    client: "Client Name 04",
    category: "Branding",
    filterGroups: ["All", "Branding"],
    year: 2025,
    featured: false,
    order: 4,
    summary:
      "[Placeholder] A brand identity and digital presence refresh — replace with a real case study before launch.",
    services: ["Digital Strategy", "Creative & Media"],
    coverImage: {
      src: "/images/placeholders/cover-01.svg",
      alt: "Placeholder abstract cover artwork — replace with real brand artefacts before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-01.svg",
        alt: "Placeholder abstract hero artwork — replace with real brand artefacts before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "Brand identity",
        timeline: "[Placeholder timeline, e.g. 5 weeks]",
        servicesProvided: ["Brand positioning", "Graphic design", "Brand assets"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. visual identity system]",
        "[Placeholder deliverable — e.g. brand guidelines]",
        "[Placeholder deliverable — e.g. launch creative set]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-02.svg",
          alt: "Placeholder design gallery image 1 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-03.svg",
          alt: "Placeholder design gallery image 2 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Figma", "Brand systems"],
    },
    seo: {
      title: "Placeholder brand identity case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-01.svg",
    },
    isPlaceholder: true,
  },
  {
    slug: "placeholder-internal-web-application",
    title: "[Placeholder] An internal operations web application",
    client: "Client Name 05",
    category: "Web Application",
    filterGroups: ["All", "SaaS"],
    year: 2024,
    featured: false,
    order: 5,
    summary:
      "[Placeholder] A custom internal tool replacing spreadsheet workflows — replace with a real case study before launch.",
    services: ["Web Development", "SaaS Development"],
    coverImage: {
      src: "/images/placeholders/cover-02.svg",
      alt: "Placeholder abstract cover artwork — replace with a real application screenshot before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-02.svg",
        alt: "Placeholder abstract hero artwork — replace with a real application screenshot before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "Internal web application",
        timeline: "[Placeholder timeline, e.g. 10 weeks]",
        servicesProvided: ["Web Development", "Backend", "Database architecture"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. operations dashboard]",
        "[Placeholder deliverable — e.g. role-based workflows]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-04.svg",
          alt: "Placeholder design gallery image 1 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Next.js", "PostgreSQL", "TypeScript"],
    },
    seo: {
      title: "Placeholder web application case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-02.svg",
    },
    isPlaceholder: true,
  },
  {
    slug: "placeholder-social-growth-campaign",
    title: "[Placeholder] A social growth and content campaign",
    client: "Client Name 06",
    category: "Social Media",
    filterGroups: ["All", "Marketing"],
    year: 2024,
    featured: false,
    order: 6,
    summary:
      "[Placeholder] A social strategy and content campaign — replace with a real case study before launch.",
    services: ["Social Media Marketing", "Creative & Media"],
    coverImage: {
      src: "/images/placeholders/cover-03.svg",
      alt: "Placeholder abstract cover artwork — replace with real campaign creative before launch",
      width: 1600,
      height: 1000,
    },
    caseStudy: {
      heroImage: {
        src: "/images/placeholders/hero-03.svg",
        alt: "Placeholder abstract hero artwork — replace with real campaign creative before launch",
        width: 1600,
        height: 900,
      },
      overview: {
        industry: "[Placeholder industry]",
        projectType: "Social & content campaign",
        timeline: "[Placeholder timeline, e.g. ongoing, 3 month initial phase]",
        servicesProvided: ["Social strategy", "Content planning", "Analytics"],
      },
      challenge:
        "[Placeholder] Describe the real problem this client had. Replace this paragraph with the true story before launch.",
      approach:
        "[Placeholder] Describe how the agency actually approached the problem. Replace this paragraph with the true story before launch.",
      built: [
        "[Placeholder deliverable — e.g. content calendar and creative system]",
        "[Placeholder deliverable — e.g. community growth playbook]",
      ],
      designGallery: [
        {
          src: "/images/placeholders/gallery-05.svg",
          alt: "Placeholder design gallery image 1 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/placeholders/gallery-06.svg",
          alt: "Placeholder design gallery image 2 — replace with real screenshots",
          width: 1600,
          height: 1000,
        },
      ],
      technologies: ["Content systems", "Analytics"],
    },
    seo: {
      title: "Placeholder social campaign case study",
      description:
        "[Placeholder case study — replace with real project details before launch.]",
      ogImage: "/images/placeholders/hero-03.svg",
    },
    isPlaceholder: true,
  },
];

export const projects: Project[] = raw
  .map((p) => projectSchema.parse(p))
  .sort((a, b) => a.order - b.order);

assertNoPlaceholdersInProduction(
  projects.map((p) => ({ isPlaceholder: p.isPlaceholder, label: `project:${p.slug}` })),
);
