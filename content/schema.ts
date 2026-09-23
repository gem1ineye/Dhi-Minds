import { z } from "zod";

/**
 * Content schema — PRD §9. Every collection is validated at build/import
 * time. A schema violation throws, which fails the build rather than
 * shipping a broken section (FR-CMS-02).
 */

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, "Alt text is required for every meaningful image (NFR-SEO-09)."),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
export type Image = z.infer<typeof imageSchema>;

export const filterGroupSchema = z.enum([
  "All",
  "Websites",
  "SaaS",
  "E-commerce",
  "Branding",
  "Marketing",
]);
export type FilterGroup = z.infer<typeof filterGroupSchema>;

export const projectCategorySchema = z.enum([
  "Website",
  "SaaS",
  "E-commerce",
  "Branding",
  "SEO",
  "Social Media",
  "Web Application",
]);
export type ProjectCategory = z.infer<typeof projectCategorySchema>;

export const resultSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  source: z.string().min(1, "A result without a source fails the build (FR-CS-03, CR-02)."),
});
export type Result = z.infer<typeof resultSchema>;

export const caseStudySchema = z.object({
  heroImage: imageSchema,
  overview: z.object({
    industry: z.string().min(1),
    projectType: z.string().min(1),
    timeline: z.string().min(1),
    servicesProvided: z.array(z.string().min(1)).min(1),
  }),
  challenge: z.string().min(1),
  approach: z.string().min(1),
  built: z.array(z.string().min(1)).min(1),
  designGallery: z.array(imageSchema).min(1).max(12),
  results: z.array(resultSchema).optional(),
  technologies: z.array(z.string().min(1)).min(1),
  liveUrl: z.string().url().optional(),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const projectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: z.string().min(1),
  client: z.string().min(1),
  category: projectCategorySchema,
  filterGroups: z.array(filterGroupSchema).min(1),
  year: z.number().int().min(2000).max(2100),
  featured: z.boolean(),
  order: z.number().int(),
  summary: z.string().max(160),
  services: z.array(z.string().min(1)).min(1),
  coverImage: imageSchema,
  caseStudy: caseStudySchema.optional(),
  seo: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    ogImage: z.string().min(1),
  }),
  /**
   * Not in the PRD §9 abridged schema, but required by the same governance
   * pattern used for Testimonial/Client (CR-04, CR-05, FR-CMS-03): real
   * portfolio work has not been supplied yet (§3.3, R1), so demo projects
   * ship clearly labelled and gate production deploys until replaced.
   */
  isPlaceholder: z.boolean().default(false),
});
export type Project = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  capabilities: z.array(z.string().min(1)).min(1),
  icon: z.string().min(1),
  order: z.number().int(),
});
export type Service = z.infer<typeof serviceSchema>;

export const pricingTierSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  audience: z.string().min(1),
  price: z.object({
    amount: z.number().nonnegative().nullable(),
    currency: z.string().min(1),
    period: z.string().optional(),
    qualifier: z.string().optional(),
    fallbackLabel: z.string().min(1),
    monthlyAmount: z.number().nonnegative().nullable().optional(),
  }),
  features: z.array(z.string().min(1)).min(1),
  ceiling: z.string().optional(),
  cta: z.object({
    label: z.string().min(1),
    target: z.string().min(1),
  }),
  highlighted: z.boolean(),
});
export type PricingTier = z.infer<typeof pricingTierSchema>;

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  position: z.string().min(1),
  company: z.string().min(1),
  avatar: imageSchema.optional(),
  isPlaceholder: z.boolean(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const clientSchema = z.object({
  name: z.string().min(1),
  logo: imageSchema.optional(),
  isPlaceholder: z.boolean(),
});
export type Client = z.infer<typeof clientSchema>;

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int(),
});
export type FAQ = z.infer<typeof faqSchema>;

export const processStepSchema = z.object({
  index: z.string().regex(/^\d{2}$/),
  title: z.string().min(1),
  description: z.string().min(1),
});
export type ProcessStep = z.infer<typeof processStepSchema>;

export const metricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  source: z.string().min(1),
});
export type Metric = z.infer<typeof metricSchema>;

export const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});
export type NavItem = z.infer<typeof navItemSchema>;

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url(),
  label: z.string().min(1),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const companySchema = z.object({
  name: z.string().min(1),
  legalName: z.string().optional(),
  story: z
    .string()
    .refine((s) => s.trim().split(/\s+/).length <= 90, "company.story must be <= 90 words (FR-ABT-04)"),
  email: z.string().email(),
  phone: z.string().min(1).optional(),
  whatsappNumber: z
    .string()
    .regex(/^\d{10,15}$/, "whatsappNumber must be E.164 digits with no leading +")
    .optional(),
  location: z.string().min(1),
  socials: z.array(socialLinkSchema),
  responseSLA: z.string().min(1),
  capabilities: z.array(z.string().min(1)),
  metrics: z.array(metricSchema).optional(),
  capabilitiesMode: z.enum(["metrics", "capabilities"]),
});
export type Company = z.infer<typeof companySchema>;

export function assertNoPlaceholdersInProduction(
  entries: { isPlaceholder: boolean; label: string }[],
) {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.ALLOW_PLACEHOLDER_CONTENT === "true") return;
  const offenders = entries.filter((e) => e.isPlaceholder);
  if (offenders.length > 0) {
    throw new Error(
      `Production deploy blocked (CR-05): placeholder content still present in ${offenders
        .map((o) => o.label)
        .join(", ")}. Replace with real, consented content or set ALLOW_PLACEHOLDER_CONTENT=true for a non-production preview.`,
    );
  }
}
