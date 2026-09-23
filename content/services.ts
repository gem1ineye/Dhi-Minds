import { serviceSchema, type Service } from "./schema";

/**
 * PRD §8.4. Order encodes brand positioning (FR-BRD-04): Web Development and
 * SaaS Development lead the grid; social/creative follow. Adding a seventh
 * service requires only a new entry here (FR-SVC-05).
 */
const raw: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites designed around business objectives rather than generic templates.",
    capabilities: [
      "Business websites",
      "Corporate websites",
      "Landing pages",
      "E-commerce",
      "Web applications",
      "Custom platforms",
    ],
    icon: "code",
    order: 1,
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    description:
      "Design and development of scalable SaaS products from concept to production.",
    capabilities: [
      "Product strategy",
      "UI/UX",
      "Frontend",
      "Backend",
      "Authentication",
      "APIs",
      "Database architecture",
      "Deployment",
    ],
    icon: "layers",
    order: 2,
  },
  {
    id: "seo-growth",
    title: "SEO & Growth",
    description: "Improve visibility and organic acquisition.",
    capabilities: [
      "Technical SEO",
      "On-page SEO",
      "Keyword strategy",
      "Content strategy",
      "Performance optimisation",
      "Search visibility",
    ],
    icon: "trending-up",
    order: 3,
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Build a consistent digital presence and audience.",
    capabilities: [
      "Social strategy",
      "Content planning",
      "Campaigns",
      "Community growth",
      "Analytics",
    ],
    icon: "share-2",
    order: 4,
  },
  {
    id: "creative-media",
    title: "Creative & Media",
    description: "Visual content that strengthens the brand.",
    capabilities: [
      "Graphic design",
      "Social creatives",
      "Video editing",
      "Promotional content",
      "Brand assets",
      "Campaign creatives",
    ],
    icon: "palette",
    order: 5,
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Determine what to build, market, and improve.",
    capabilities: [
      "Digital strategy",
      "Product strategy",
      "Brand positioning",
      "Conversion optimisation",
      "Growth strategy",
    ],
    icon: "compass",
    order: 6,
  },
];

export const services: Service[] = raw
  .map((s) => serviceSchema.parse(s))
  .sort((a, b) => a.order - b.order);
