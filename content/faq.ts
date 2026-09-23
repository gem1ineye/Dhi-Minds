import { faqSchema, type FAQ } from "./schema";

/** PRD §8.12 — all ten mandated questions. Adding an eleventh requires only a new entry (FR-FAQ-06). */
const raw: FAQ[] = [
  {
    order: 1,
    question: "What type of businesses do you work with?",
    answer:
      "We work with small businesses that need a professional website, and growing companies that need a custom web application or SaaS product. Most clients fall into one of those two groups, though the underlying process is the same either way.",
  },
  {
    order: 2,
    question: "Do you build custom websites?",
    answer:
      "Yes. Every website is designed around the business's objectives rather than a generic template, from single-page marketing sites to multi-section corporate websites and e-commerce storefronts.",
  },
  {
    order: 3,
    question: "Can you build SaaS products?",
    answer:
      "Yes. We handle SaaS development end to end — product strategy, UI/UX, frontend, backend, authentication, APIs, database architecture, and deployment. See the Technology block on our SaaS case studies for real stack examples.",
  },
  {
    order: 4,
    question: "Do you provide ongoing SEO?",
    answer:
      "Yes. Technical SEO, on-page SEO, keyword strategy, and content strategy are available both as part of a launch engagement and as an ongoing monthly service once the site is live.",
  },
  {
    order: 5,
    question: "Do you manage social media?",
    answer:
      "Yes, as part of a wider digital presence rather than in isolation. Social strategy, content planning, campaigns, and community growth sit alongside our design and development work, not as a separate offer.",
  },
  {
    order: 6,
    question: "Can you handle design and development together?",
    answer:
      "Yes — this is the default way we work. Design and engineering happen on the same team and the same timeline, so what gets designed is what actually ships, without a handoff gap.",
  },
  {
    order: 7,
    question: "How long does a website take?",
    answer:
      "A marketing website typically takes 4–8 weeks from kickoff to launch, depending on scope and content readiness. A custom SaaS product typically takes 10–16 weeks for a first production release. Exact timelines are confirmed during Discover.",
  },
  {
    order: 8,
    question: "Do you provide post-launch support?",
    answer:
      "Yes. Every engagement includes a defined support window after launch, and ongoing support and improvement plans are available beyond that as part of the Growth and Scale tiers.",
  },
  {
    order: 9,
    question: "Can you work with an existing website?",
    answer:
      "Yes. We regularly take over existing sites and products — auditing what's there, fixing what's holding it back, and building new functionality on top of or in place of the current system.",
  },
  {
    order: 10,
    question: "How does your pricing work?",
    answer:
      "We offer three tiers — Starter, Growth, and Scale — covering most engagements, plus a custom proposal for anything that doesn't fit a standard scope. See the Pricing section for what each tier includes.",
  },
];

export const faqs: FAQ[] = raw.map((f) => faqSchema.parse(f)).sort((a, b) => a.order - b.order);
