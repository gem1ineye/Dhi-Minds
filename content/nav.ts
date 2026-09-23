import { navItemSchema, type NavItem } from "./schema";
import { services } from "./services";

/** PRD §8.1. Single source of truth for navbar links; the footer (FR-FOOT-06) reuses this data. */
const rawPrimaryNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export const primaryNav: NavItem[] = rawPrimaryNav.map((n) => navItemSchema.parse(n));

export const navCta: NavItem = navItemSchema.parse({ label: "Start a project", href: "/contact" });

export type FooterColumn = { heading: string; links: NavItem[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Services",
    links: services.map((s) => ({ label: s.title, href: `/#services-${s.id}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Work", href: "/#work" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Book a consultation", href: "/consultation" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
