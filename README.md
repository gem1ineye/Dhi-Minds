# Dhi Minds — Meridian

Premium digital agency website for Dhi Minds, built to the
[PRD](./PRD-Digital-Agency-Website.md): Next.js (App Router) + TypeScript +
Tailwind CSS, with a typed content layer, a working inquiry pipeline
(MongoDB + email), full SEO/JSON-LD, and the design system in PRD §7.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) ·
Tailwind CSS v4 · Framer Motion · Zod · MongoDB driver · Resend · MDX
(legal pages).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see "Before launch" below
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build (blocked by placeholder content — see below)
npm run lint            # ESLint (NFR-ENG-02)
npm run typecheck       # tsc --noEmit
npm run retention:sweep # NFR-SEC-07 — deletes inquiries past NEXT_PUBLIC_RETENTION_PERIOD; run on a schedule
```

## Content model (no hard-coded copy)

Every piece of site content lives under [`/content`](./content) as a typed,
Zod-validated module, read through the single accessor
[`lib/content.ts`](./lib/content.ts) (FR-CMS-01/04). Adding a project,
service, tier, testimonial, or FAQ is a data-only change — no component
edit required.

| File | Governs |
|---|---|
| `content/company.ts` | Contact info, story, socials, response SLA (env-driven) |
| `content/projects.ts` | Portfolio + case studies |
| `content/services.ts` | The six services (order encodes FR-BRD-04 positioning) |
| `content/pricing.ts` | Pricing tiers (env-driven amounts) |
| `content/testimonials.ts`, `content/clients.ts` | Social proof (placeholder until real content is supplied) |
| `content/faq.ts`, `content/process.ts`, `content/nav.ts` | FAQ, process steps, navigation/footer |

## Content governance is enforced, not just documented

Per PRD §19 (CR-01–CR-11), nothing here fabricates a client, testimonial,
metric, or price:

- **Portfolio, testimonials, and clients** ship as clearly labelled
  placeholders (`isPlaceholder: true`) because no real work, consented
  quotes, or logos were supplied yet (§3.3).
- **Pricing** reads `PRICE_STARTER` / `PRICE_GROWTH` / `PRICE_SCALE` from
  the environment; unset renders `On request` (never an invented number).
- **`npm run build` fails on purpose** while `isPlaceholder: true` content
  exists and `NODE_ENV=production`, per FR-CMS-03/CR-05. To build a
  non-production preview with placeholders intact, set
  `ALLOW_PLACEHOLDER_CONTENT=true`. Never set that in a real production
  deploy — replace the content instead.
- Case-study **Results** blocks only render when a project supplies
  `results`, and every result requires a `source` (FR-CS-02/03) — the demo
  projects intentionally omit `results` rather than invent metrics.

## Before launch (Appendix B)

These are business-owned values this build cannot invent. Fill them into
`.env.local` (see `.env.example` for the full list) and replace the
placeholder content collections:

- [ ] `NEXT_PUBLIC_SITE_URL` — canonical domain
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE` / `NEXT_PUBLIC_PRIMARY_LOCATION`
- [ ] `NEXT_PUBLIC_RESPONSE_SLA`, `NEXT_PUBLIC_RETENTION_PERIOD`, `NEXT_PUBLIC_GRIEVANCE_CONTACT`
- [ ] Social URLs (`NEXT_PUBLIC_SOCIAL_*`) — only live profiles (FR-FOOT-04)
- [ ] `PRICE_STARTER` / `PRICE_GROWTH` / `PRICE_SCALE` (or leave blank for "On request")
- [ ] `MONGODB_URI`, `MONGODB_DB` — Atlas connection for the `inquiries` collection
- [ ] `RESEND_API_KEY`, `EMAIL_FROM`, `TEAM_NOTIFICATION_EMAIL`
- [ ] `IP_HASH_SALT` — a real random value in production
- [ ] Real portfolio projects, images, and permissions → `content/projects.ts`
- [ ] Real testimonials with written consent → `content/testimonials.ts`
- [ ] Real client logos with permission → `content/clients.ts`
- [ ] Logo/brand-mark decision (FR-BRD-08) — `app/icon.tsx` and
      `app/apple-icon.tsx` currently render a placeholder "G" monogram
- [ ] Content sign-off (PRD §19 launch gate)

## What's implemented vs. deliberately deferred

**Implemented:** all 13 home sections in the mandated order, the Gold Rule
scroll-linked spine, sticky/refining nav with mobile drawer, portfolio
filtering with URL state, the full case-study template (conditional
Results, gallery lightbox, prev/next), pricing/testimonials/FAQ, the
inquiry form and `/api/inquiry` (validation, honeypot + timing spam check,
rate limiting, MongoDB persistence, team + auto-reply email, all
graceful when unconfigured), legal pages from MDX, sitemap/robots/JSON-LD/
OG image generation, security headers, and a data-driven content layer
throughout.

**Deferred / needs real infrastructure to verify:** Lighthouse CI budget
enforcement, a formal axe/screen-reader audit pass, and cross-browser device
testing (PRD §21.4–§21.5) — these need a deployed environment and real
tooling, not just local dev. The analytics wrapper (`lib/analytics.ts`) is
provider-agnostic but not wired to a live provider. A nonce-based CSP
(stricter than the current `'unsafe-inline'` script policy) is a reasonable
post-launch hardening step.
