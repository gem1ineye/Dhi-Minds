import { processStepSchema, type ProcessStep } from "./schema";

/** PRD §8.8 — the six-step process, a genuine sequence. */
const raw: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the business, audience, objectives, and challenges.",
  },
  {
    index: "02",
    title: "Strategize",
    description: "Define the solution, technology, positioning, and growth strategy.",
  },
  {
    index: "03",
    title: "Design",
    description: "Create the visual identity, UX, and product experience.",
  },
  {
    index: "04",
    title: "Build",
    description: "Develop the website, SaaS product, application, or digital system.",
  },
  {
    index: "05",
    title: "Launch",
    description: "Deploy, test, optimise, and launch.",
  },
  {
    index: "06",
    title: "Grow",
    description: "Continue improving SEO, marketing, content, performance, and conversion.",
  },
];

export const processSteps: ProcessStep[] = raw.map((s) => processStepSchema.parse(s));
