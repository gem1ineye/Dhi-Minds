# Product Requirements Document
## Premium Digital Agency Website — Codename: **MERIDIAN**

---

## 0. Document Control

| Field | Value |
|---|---|
| Document | Product Requirements Document (PRD) |
| Project codename | Meridian |
| Client / Brand | **Dhi Minds** |
| Product type | Marketing + conversion website with case-study sub-experience |
| Version | 1.1 |
| Status | Draft for approval |
| Date | 08 August 2026 |
| Change log | 1.1 — brand confirmed as Dhi Minds; §5.4 added; risks R10–R12 added |
| Owner | Product / Engineering Lead |
| Source of truth | `MASTER PROMPT — PREMIUM DIGITAL AGENCY WEBSITE` (32 sections). Every requirement in that document is treated as **mandatory**. Traceability is recorded in Appendix C. |

### 0.1 How to read this document

- Requirements are numbered `FR-XXX-nn` (functional), `NFR-XXX-nn` (non-functional), `CR-nn` (content rule).
- **MUST** = release-blocking. **SHOULD** = required unless formally waived. **MAY** = optional.
- Anything wrapped in `{{DOUBLE_BRACES}}` is a configurable value that must be supplied before launch and must never be invented by the build team.
- No requirement in this PRD may be dropped without a written waiver recorded in §22.

---

## 1. Executive Summary

Meridian is the public website for a full-service digital agency that builds and grows digital businesses — websites, SaaS products, custom web applications — and supports them with SEO, social media marketing, creative production, and digital strategy.

The site's single job is **converting a qualified visitor into a project inquiry.**

Everything else — the portfolio, the process timeline, the pricing tiers, the FAQ — exists to remove a specific objection standing between "interesting" and "let's talk."

The site must read as a **high-end technology and design studio**, not as a marketing agency template. Two audiences must be served by one aesthetic: a small business that needs a premium website, and a growing company that needs a custom SaaS product plus long-term growth. The design resolves this by leading with craft and evidence rather than claims.

Mandatory visual system: **deep blue + gold + white/off-white**, with gold used sparingly as a premium accent — never as a dominant colour.

---

## 2. Objectives & Success Metrics

### 2.1 Business objectives

| # | Objective |
|---|---|
| BO-1 | Generate qualified inbound project inquiries |
| BO-2 | Communicate full-stack capability (build **and** grow) in a single visit |
| BO-3 | Establish credibility through demonstrated work, not adjectives |
| BO-4 | Make engagement models legible so prospects self-qualify before contact |
| BO-5 | Rank for agency service keywords in the target market |
| BO-6 | Provide a content architecture the agency can extend for years without a redesign |

### 2.2 Success metrics

Baselines are unknown at launch, so v1 ships with instrumentation and a 90-day measurement window. Targets are set after the first 30 days of real traffic.

| Metric | Definition | Target |
|---|---|---|
| Inquiry conversion rate | Completed inquiry forms ÷ unique visitors | Set at day 30; industry reference 1.5–3% |
| Qualified inquiry rate | Inquiries with a stated budget + defined scope ÷ total inquiries | ≥ 50% |
| Portfolio engagement | Sessions viewing ≥ 1 case study | ≥ 25% of sessions |
| Scroll depth to Pricing | Sessions reaching Pricing section | ≥ 40% |
| Lighthouse (mobile) | Performance / Accessibility / Best Practices / SEO | ≥ 90 / 100 / 100 / 100 |
| Core Web Vitals | Field data, 75th percentile | All "Good" (§15) |
| Content update cost | Time to add a new case study without a developer | < 15 minutes |

### 2.3 Non-goals for v1

Blog/CMS editorial system, client login portal, multi-language, e-commerce checkout, live chat, booking calendar. All are explicitly deferred to §23 — the architecture must not preclude them.

---

## 3. Scope

### 3.1 In scope

- Marketing site: 13 mandated sections (§5 of the master prompt)
- Dynamic case-study pages, one per portfolio project
- Category-filterable portfolio
- Configurable pricing system
- Inquiry form with server-side handling, validation, storage, and notification
- Legal pages: Privacy Policy, Terms of Service
- Full SEO, performance, accessibility, and motion specifications
- Content/configuration layer decoupled from UI

### 3.2 Out of scope for v1

Brand identity creation (logo assumed supplied), copywriting beyond the copy deck in Appendix A, photography/video production, paid-media campaign setup, third-party CRM implementation.

### 3.3 Assumptions

- Logo, brand mark, and any real client names/logos will be provided by Dhi Minds.
- Real portfolio imagery will be supplied; placeholders ship only if it is not.
- Pricing figures will be supplied by the business; the build team invents none.

---

## 4. Audience & Personas

| Persona | Context | What they need to see | Primary objection |
|---|---|---|---|
| **P1 — Small business owner** | Needs a professional website; low technical fluency; price-sensitive | Portfolio quality, clear packages, simple process, fast contact | "Will this cost more than I think, and will it take forever?" |
| **P2 — Founder / product lead** | Needs a SaaS product or custom application built | Technical depth, architecture literacy, delivery evidence | "Can they actually engineer this, or only design it?" |
| **P3 — Marketing manager** | Has a site; needs SEO, social, and creative to perform | Growth capability, measurable outcomes, ongoing engagement model | "Is this an execution partner or a slide deck?" |
| **P4 — Referral visitor** | Arrives with intent from a recommendation | Fast credibility confirmation, direct contact path | "Confirm what I was told, quickly." |

**Design consequence:** every page must let P4 reach the inquiry form within one interaction (persistent nav CTA), while letting P2 dig three levels deep (portfolio → case study → technology stack).

---

## 5. Brand Positioning & Messaging

### 5.1 Positioning statement

> A premium digital partner for businesses that want to build, launch, market, and grow.

### 5.2 Messaging pillars

Each pillar must be visibly evidenced somewhere on the page — a claim without evidence is cut.

| Pillar | Evidenced by |
|---|---|
| Premium quality | Design execution itself, portfolio imagery |
| Modern technology | Case-study technology stacks, SaaS service depth |
| Creative thinking | Creative & Media service, portfolio breadth |
| Business understanding | Process (Discover → Strategize), Digital Strategy service |
| Measurable results | Case-study Results blocks — **only where real data exists** |
| Professional execution | Six-step process, FAQ specificity |
| Long-term partnership | "Grow" process step, ongoing engagement in pricing |

### 5.3 Voice

Confident, intelligent, professional, creative, concise, premium, human.

**Banned constructions** (release-blocking if found in copy):
- "Take your business to the next level"
- "revolutionary", "cutting-edge", "one-stop solution", "unlock your potential", "game-changing", "seamlessly", "in today's fast-paced digital world"
- Any superlative that cannot be substantiated
- Exclamation marks in body copy

**Preferred register:**
> We design and build digital products that help businesses grow.

Sentence case for headings and buttons. Active voice. A button names exactly what happens: **Start a project**, not *Submit*. The action keeps its name through the whole flow — the button that says "Send project inquiry" produces a confirmation that says "Inquiry sent."

### 5.4 Brand: Dhi Minds

#### 5.4.1 Why gold is no longer arbitrary

The master prompt mandates gold as an accent. With the brand named **Golden** Smile Media, gold stops being a generic premium signal and becomes brand-derived — the accent colour is the first word of the company name. This materially strengthens the Gold Rule signature (§7.2): the line running down the page is the brand asserting itself structurally rather than decoratively.

**FR-BRD-01 (MUST)** — Gold is treated as the brand's proprietary colour. This raises the discipline bar rather than lowering it: because gold is the name, over-use reads as literalism. The ~3-instances-per-viewport ceiling (§7.1) is enforced more strictly, not less.

#### 5.4.2 Name usage

| Context | Form |
|---|---|
| Navbar logo | Wordmark or mark + "Dhi Minds" (full name is too wide at 64px nav height on mobile) |
| Page titles / SEO | `Dhi Minds` — full name, always |
| Footer, legal pages, contracts, schema | `Dhi Minds` + registered legal entity name if different |
| Body copy | "Dhi Minds" on first mention; "we" thereafter. Never "GSM" — it reads as an initialism for something else. |
| Conversational reference | The brand is singular: *Dhi Minds builds*, not *build* |

**FR-BRD-02 (MUST)** — `Organization` JSON-LD uses `name: "Dhi Minds"`, with `alternateName` only if a shortened form is used publicly. `legalName` is set if the registered entity differs.

**FR-BRD-03 (MUST)** — Brand-name search must resolve to this site: the exact phrase appears in the home `<title>`, the `Organization` schema, the footer, and the Privacy Policy. Add `sameAs` links for every live social profile so the knowledge panel consolidates.

#### 5.4.3 The repositioning problem — read this before designing

Dhi Minds currently reads publicly as a **social media marketing agency**. This site positions it as a **full-service digital and product studio** — web development, SaaS, custom applications — with social and creative as part of a wider offer.

That is a genuine repositioning, not a copy refresh, and the master prompt is explicit that the result should sit *closer to a high-end technology/design studio than a conventional social media marketing agency* (§32 of the source brief).

**Design consequences, all release-blocking:**

| ID | Requirement | Priority |
|---|---|---|
| FR-BRD-04 | Web development and SaaS appear **first** in the services grid; social media and creative appear after. Order encodes positioning. | MUST |
| FR-BRD-05 | The portfolio must lead with at least one build project (website, application, or product), not a social campaign. If the featured slot shows a campaign, P2 (founder needing a SaaS product) leaves. | MUST |
| FR-BRD-06 | Every case study exposes a **Technology** block (§8.7). This is the single clearest signal separating a studio from a marketing agency, and it is why the block is mandatory rather than conditional. | MUST |
| FR-BRD-07 | Copy never leads with follower counts, reach, engagement rate, or campaign vanity metrics — even where real. Growth outcomes are framed in business terms (enquiries, conversions, organic traffic). | MUST |
| FR-BRD-08 | The existing brand mark (smile/target concept) is reviewed against this direction before Phase 2. If the current mark reads as consumer/Gen-Z rather than studio-grade, the decision is: refine the mark for this context, or use a restrained wordmark on the site and reserve the fuller mark for social channels. This decision is owned by the business and is a Phase 1 exit dependency. | MUST |

**FR-BRD-09 (SHOULD)** — The About section (§8.5) carries the repositioning explicitly in one honest line — the agency's origin in marketing is a strength when framed as *we understand distribution, not just deployment*. Hiding it is worse than owning it; prospects will find the social profiles anyway.

---

## 6. Information Architecture

### 6.1 Routes

| Route | Page | Rendering | Indexed |
|---|---|---|---|
| `/` | Home (all 13 sections) | Static | Yes |
| `/work` | Full portfolio archive with filters | Static | Yes |
| `/work/[slug]` | Case study | Static, generated per project | Yes |
| `/contact` | Standalone inquiry page | Static + client form | Yes |
| `/privacy` | Privacy Policy | Static | Yes |
| `/terms` | Terms of Service | Static | Yes |
| `/thank-you` | Post-submission confirmation (optional, form defaults to inline success) | Static | No — `noindex` |
| `/sitemap.xml`, `/robots.txt` | Generated | Build-time | n/a |
| `/404`, `/500` | Error pages, branded, with nav back to `/work` and `/contact` | Static | No |

### 6.2 Home page section order

Navigation → Hero → Trust → Services → About → Portfolio → Process → Capabilities → Pricing → Testimonials → FAQ → Final CTA → Contact → Footer

**FR-IA-01 (MUST)** — Section order is fixed. Every section is a section-level landmark with a stable `id` used by anchor navigation: `#services`, `#work`, `#about`, `#process`, `#pricing`, `#faq`, `#contact`.

**FR-IA-02 (MUST)** — Anchor links scroll smoothly, respect `prefers-reduced-motion` (instant jump when reduced), and offset for the sticky navbar height so headings are never hidden beneath it.

**FR-IA-03 (MUST)** — The visitor journey in §32 of the master prompt is the acceptance narrative for the page: *premium agency → they handle everything → they've actually built things → they work professionally → I understand engagement → others trust them → I should contact them.* Any section that fails to advance this narrative is redesigned, not decorated.

---

## 7. Design System

### 7.1 Design thesis

**Modern + Minimal + Premium + Technology-focused + Editorial.**

Deep navy carries the brand moments (hero, final CTA, footer). White and off-white carry the content. Blue carries interaction. Gold carries *significance only* — it marks the thing that matters most in a given view, and nothing else. If gold appears more than roughly three times in a single viewport, it has stopped meaning anything and must be reduced.

### 7.2 Signature element — **The Gold Rule**

**FR-DS-01 (MUST)** — A single 1px gold hairline runs as a continuous vertical spine down the left edge of the content column, threading through section eyebrows, the process timeline, and the portfolio grid, terminating in the final CTA.

- On scroll, the rule *draws* downward (scroll-linked `scaleY` / `stroke-dashoffset`), so the visitor is literally watching a line advance from idea to impact.
- With `prefers-reduced-motion: reduce`, the rule renders fully drawn and static.
- On viewports < 768px the spine collapses to short gold tick marks at each section eyebrow.

This is the page's one memorable device. It gives gold a *job* — encoding sequence and progress — which is what keeps the palette from reading as decorative luxury. Everything else stays disciplined.

With the brand named **Golden** Smile Media, the rule also does brand work: the company's colour is the thread the visitor follows from the first headline to the final call to action. That is the justification for spending the site's one aesthetic risk here, and the reason no second signature device is permitted.

### 7.3 Colour tokens

Defined as CSS custom properties; consumed via Tailwind theme extension. No raw hex values in components.

```css
:root {
  /* Blue — brand + surface */
  --ink-900:  #060F1F;  /* deepest navy — footer, final CTA */
  --ink-800:  #0A1A33;  /* primary deep navy — hero surface */
  --ink-700:  #12294D;  /* elevated navy card */
  --blue-600: #1D4ED8;  /* royal blue — primary interactive */
  --blue-500: #2563EB;  /* electric blue — hover, gradient stop */
  --blue-100: #DCE7FA;  /* tint — badges, subtle fills */
  --blue-50:  #F2F6FC;  /* very light blue-grey — secondary bg */

  /* Gold — accent only */
  --gold-500: #C9A227;  /* metallic core — borders, icons, rules */
  --gold-300: #E4C05C;  /* light gold — text/icons on dark only */
  --gold-700: #7A5E0E;  /* deep gold — text on white only */

  /* Neutrals */
  --white:      #FFFFFF;
  --offwhite:   #FAFAF7;  /* primary content surface */
  --charcoal:   #1A1D21;  /* body typography on light */
  --grey-500:   #5B6472;  /* secondary text on light */
  --grey-300:   #D8DDE5;  /* hairline borders on light */
  --ink-border: rgba(228,192,92,0.24); /* gold hairline on dark */
}
```

**NFR-DS-01 (MUST) — Gold contrast rule.** Gold is never used for body text on white at `--gold-500`. Bindings:

| Use | Token | On | Requirement |
|---|---|---|---|
| Text on dark navy | `--gold-300` | `--ink-800/900` | ≥ 4.5:1 |
| Text on white/off-white | `--gold-700` | `--white/--offwhite` | ≥ 4.5:1 |
| Non-text (rules, icons, borders) | `--gold-500` | any | ≥ 3:1 |
| Large display text (≥ 24px / ≥ 19px bold) | `--gold-500` on dark only | `--ink-800/900` | ≥ 3:1 |

Every gold/background pairing shipped is verified with a contrast checker during QA (§21) and recorded in the accessibility log. Failing pairs are corrected, not waived.

### 7.4 Surface rhythm

Sections alternate deliberately so the page has cadence rather than uniform blocks:

| Section | Surface |
|---|---|
| Hero | `--ink-800` with subtle radial blue gradient + 2–3% grain |
| Trust | `--offwhite` |
| Services | `--white` |
| About | `--blue-50` |
| Portfolio | `--offwhite` |
| Process | `--ink-800` (dark inversion, gold spine most visible here) |
| Capabilities | `--white` |
| Pricing | `--blue-50` |
| Testimonials | `--white` |
| FAQ | `--offwhite` |
| Final CTA | `--ink-900` with blue→navy gradient and gold rule terminus |
| Contact | `--white` |
| Footer | `--ink-900` |

**NFR-DS-02 (SHOULD)** — Grain/noise overlay on dark surfaces only, ≤ 3% opacity, delivered as a single tiled SVG/base64 texture under 4KB, `pointer-events: none`.

### 7.5 Typography

Deliberately not the default Inter-plus-serif pairing.

| Role | Typeface | Usage |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, optical size axis) | H1–H3, pricing tier names, large statements |
| Body | **Geist Sans** (variable) | Body copy, UI, navigation, forms |
| Utility | **Geist Mono** | Eyebrows, process indices (01–06), project years, technology tags, form field labels |

Fallback stack: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.

**Type scale** (fluid via `clamp()`, base 16px):

| Token | Mobile → Desktop | Weight | Tracking | Leading |
|---|---|---|---|---|
| `display-xl` (H1) | 40px → 76px | 500 | −0.03em | 1.02 |
| `display-lg` (H2) | 32px → 52px | 500 | −0.02em | 1.08 |
| `heading-md` (H3) | 24px → 32px | 500 | −0.01em | 1.2 |
| `heading-sm` (H4) | 20px → 22px | 500 | 0 | 1.3 |
| `body-lg` (lede) | 17px → 20px | 400 | 0 | 1.6 |
| `body` | 16px → 17px | 400 | 0 | 1.65 |
| `body-sm` | 14px | 400 | 0 | 1.55 |
| `eyebrow` (mono) | 11px → 12px | 500 | 0.12em, uppercase | 1.2 |

**FR-DS-02 (MUST)** — Measure capped at 68 characters for body copy, 22 characters for display headings.
**FR-DS-03 (MUST)** — Fonts self-hosted as `woff2`, `font-display: swap`, subset to `latin` + `latin-ext`, preloaded for display and body only. Utility mono loads non-blocking.
**FR-DS-04 (MUST)** — Maximum two font weights loaded per family. No faux bold or faux italic.

### 7.6 Layout, spacing, radius, elevation

- **Grid:** 12 columns desktop, 8 tablet, 4 mobile. Max content width 1280px; editorial text blocks max 720px.
- **Gutters:** 24px mobile → 32px tablet → 48px desktop.
- **Section padding:** `clamp(72px, 9vw, 144px)` vertical.
- **Spacing scale (8pt):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Radius:** `sm 6px` (inputs, tags) · `md 12px` (cards) · `lg 20px` (feature panels) · `full` (pills only). No radius above 20px on structural cards — sophisticated, not childish.
- **Borders:** 1px hairlines. `--grey-300` on light, `--ink-border` (gold at 24%) on dark.
- **Elevation:** two levels only.
  - `shadow-card`: `0 1px 2px rgba(6,15,31,.04), 0 8px 24px rgba(6,15,31,.06)`
  - `shadow-lift` (hover): `0 2px 4px rgba(6,15,31,.06), 0 16px 40px rgba(6,15,31,.10)`
  - Never a glow. Never a coloured shadow except a 1px gold hairline on hover.
- **Glassmorphism:** permitted in exactly one place — the scrolled navbar. Nowhere else.

### 7.7 Component inventory

Every item below is a single reusable component. Duplicating a component to change a colour or size is a review failure — variants are props.

| Component | Variants / props |
|---|---|
| `Button` | `primary` (blue fill), `gold` (gold fill, dark text — reserved for the single most important CTA per view), `secondary` (outline), `ghost`, `link-arrow`; sizes `sm/md/lg`; `loading`, `disabled`, `as` (button/anchor) |
| `Navbar` | `default`, `scrolled`; mobile drawer |
| `Section` | `surface` (white/offwhite/blue-50/ink), `eyebrow`, `heading`, `lede`, `align` |
| `Eyebrow` | mono label + gold tick |
| `ServiceCard` | icon, title, description, capability list, expand/learn-more |
| `PortfolioCard` | `featured` (2-col span), `standard`; image, client, category, year, services |
| `PricingCard` | `standard`, `highlighted` (Most Popular); features, CTA, price slot |
| `TestimonialCard` | quote, name, role, company, avatar |
| `ProcessStep` | index, title, description, spine connector |
| `Accordion` / `AccordionItem` | single-open or multi-open |
| `Input`, `Textarea`, `Select`, `FieldGroup` | label, hint, error, required indicator |
| `Tag` | technology / category / service |
| `StatBlock` | value + label — renders **only** when a real value exists (§19) |
| `Footer` | column config from data |
| `RevealOnScroll` | motion wrapper honouring reduced-motion |
| `LogoWall` | client logos or wordmarks |

### 7.8 Iconography & imagery

**FR-DS-05 (MUST)** — Icons: single consistent outline set (Lucide or equivalent), 1.5px stroke, 24px grid. Icons inherit `currentColor`; gold applied only for the accent state. Decorative icons `aria-hidden="true"`.

**FR-DS-06 (MUST)** — No generic stock photography of people in offices, handshakes, or laptops. Permitted imagery: real project screenshots, real work artefacts, abstract geometric compositions built from the blue/gold system, and real team photography if supplied.

**FR-DS-07 (MUST)** — Portfolio and case-study images use a consistent 16:10 aspect ratio for cards and 16:9 for case-study heroes, with a 1px hairline border and no drop shadow on the image itself.

---

## 8. Section Requirements

### 8.1 Navigation

**Items:** Logo · Services · Work · Process · Pricing · About · Contact
**Primary CTA:** **Start a project**

| ID | Requirement | Priority |
|---|---|---|
| FR-NAV-01 | Sticky navbar, fixed to top, above all content (`z-index` 100). | MUST |
| FR-NAV-02 | Refines on scroll past 24px: height 80px → 64px, background transparent → `--ink-800` at 82% with `backdrop-blur(12px)`, 1px gold hairline appears at the bottom edge. Transition 240ms. | MUST |
| FR-NAV-03 | Refinement is throttled via `requestAnimationFrame` or IntersectionObserver sentinel — never an unthrottled scroll listener. | MUST |
| FR-NAV-04 | Active section is indicated by a gold underline/dot, driven by IntersectionObserver on section landmarks. | SHOULD |
| FR-NAV-05 | Mobile: animated hamburger (three bars morphing to an X over 300ms) opening a full-height drawer with staggered link reveal (40ms increments), the CTA pinned at the bottom, and contact details beneath it. | MUST |
| FR-NAV-06 | Drawer traps focus, closes on `Esc`, on backdrop click, and on link selection; body scroll is locked while open; `aria-expanded` and `aria-controls` set correctly. | MUST |
| FR-NAV-07 | Logo links to `/`; on `/` it scrolls to top. Logo has accessible text, not an image-only link. | MUST |
| FR-NAV-08 | Nav is `<nav aria-label="Primary">` containing a `<ul>`; a visible-on-focus "Skip to content" link precedes it. | MUST |
| FR-NAV-09 | Nav CTA is always visible on every route and viewport — this is P4's one-interaction path to contact. | MUST |

### 8.2 Hero

**H1:** *We build digital experiences that move businesses forward.*
**Alternate (configurable):** *Build. Market. Grow.*
**Lede:** *We design and build high-performing websites, SaaS products, digital experiences, and growth strategies that help businesses stand out and scale.*
**CTAs:** **Start your project** (primary) · **Explore our work** (secondary)

| ID | Requirement | Priority |
|---|---|---|
| FR-HERO-01 | Asymmetric layout: copy occupies 7 of 12 columns, visual occupies 5. Stacks to copy-then-visual on mobile. | MUST |
| FR-HERO-02 | H1 is the only `<h1>` on the page. Headline text is real text, never an image. | MUST |
| FR-HERO-03 | Visual: layered browser/UI cards showing real project previews, at three depths with subtle parallax on pointer move (max 12px translation), plus a soft blue radial gradient and one gold hairline frame. Parallax disabled under reduced motion and on touch devices. | MUST |
| FR-HERO-04 | Hero must remain visually complete and impressive with all animation disabled and JavaScript off. | MUST |
| FR-HERO-05 | Hero visual assets are `priority`-loaded with explicit dimensions; hero contributes zero CLS. LCP element is the H1 or the hero image — measured and optimised either way. | MUST |
| FR-HERO-06 | Headline reveal animates on load only (clip-path/translate, 500ms, 60ms stagger by line). Never a typewriter effect. | SHOULD |
| FR-HERO-07 | Optional scroll cue at the base of the hero, doubling as the origin point of the Gold Rule. | MAY |

### 8.3 Trust / Clients

**Heading:** *Trusted by businesses building what's next*

| ID | Requirement | Priority |
|---|---|---|
| FR-TRUST-01 | Renders client logos or wordmarks from the `clients` data collection. | MUST |
| FR-TRUST-02 | Logos rendered monochrome (`--grey-500`), returning to full colour or `--ink-800` on hover. Uniform optical sizing — height-normalised, not width-normalised. | MUST |
| FR-TRUST-03 | With ≥ 8 clients, an infinite marquee at ≤ 30px/s, paused on hover and on `prefers-reduced-motion`; with < 8, a static centred row. | SHOULD |
| FR-TRUST-04 | If no real clients exist, render clearly-labelled placeholders (`Client Name 01…`) with a build-time console warning. **Never fabricate a real company name or logo.** | MUST |
| FR-TRUST-05 | Section is hidden entirely if the collection is empty — never a lone heading over blank space. | MUST |

### 8.4 Services

**Heading:** *Everything you need to build and grow online.*

Six services, exactly as specified, each with icon, short description, and key capabilities:

| Service | Description | Capabilities |
|---|---|---|
| **Web Development** | Custom websites designed around business objectives rather than generic templates. | Business websites · Corporate websites · Landing pages · E-commerce · Web applications · Custom platforms |
| **SaaS Development** | Design and development of scalable SaaS products from concept to production. | Product strategy · UI/UX · Frontend · Backend · Authentication · APIs · Database architecture · Deployment |
| **SEO & Growth** | Improve visibility and organic acquisition. | Technical SEO · On-page SEO · Keyword strategy · Content strategy · Performance optimisation · Search visibility |
| **Social Media Marketing** | Build a consistent digital presence and audience. | Social strategy · Content planning · Campaigns · Community growth · Analytics |
| **Creative & Media** | Visual content that strengthens the brand. | Graphic design · Social creatives · Video editing · Promotional content · Brand assets · Campaign creatives |
| **Digital Strategy** | Determine what to build, market, and improve. | Digital strategy · Product strategy · Brand positioning · Conversion optimisation · Growth strategy |

| ID | Requirement | Priority |
|---|---|---|
| FR-SVC-01 | 3-column grid on desktop, 2 on tablet, 1 on mobile. Equal-height cards. | MUST |
| FR-SVC-02 | Each card: mono index, gold-accented icon, title, description, capability list, "Learn more" interaction. | MUST |
| FR-SVC-03 | Hover: 1px border transitions `--grey-300` → `--gold-500`, `shadow-card` → `shadow-lift`, arrow translates 4px right, translateY −2px. 200ms `cubic-bezier(.2,.8,.2,1)`. | MUST |
| FR-SVC-04 | "Learn more" expands the card in place (accordion disclosure) revealing full capabilities. Keyboard-operable, `aria-expanded` set, animated height honouring reduced motion. Deep-linkable via `#services-saas` etc. | MUST |
| FR-SVC-05 | Card content is read from the `services` collection; adding a seventh service must require a data entry only, with no layout change. | MUST |
| FR-SVC-06 | Cards are focusable, with a visible focus ring, and operable by keyboard alone. Whole-card click targets use a single link element, not nested interactive elements. | MUST |

### 8.5 About

**Heading:** *We don't just make websites. We build digital businesses.*

| ID | Requirement | Priority |
|---|---|---|
| FR-ABT-01 | Not a conventional "About Us" block. Layout: a two-column editorial split — philosophy statement left, a 2×2 value card grid right — with an offset composition rather than a centred paragraph. | MUST |
| FR-ABT-02 | Communicates the combination **Technology + Design + Marketing + Strategy** as a visible structural device (four labels joined by gold connectors), not as a sentence. | MUST |
| FR-ABT-03 | Value cards: Strategy First · Design With Purpose · Technology That Scales · Growth Driven · Long-Term Partnership. Each with a one-line explanation. | MUST |
| FR-ABT-04 | Short company story (max 90 words) sourced from `company.story`. No filler, no founding mythology. | MUST |
| FR-ABT-05 | Team imagery rendered only if supplied; the layout must be complete without it. | SHOULD |

### 8.6 Portfolio

**Heading:** *Selected work*
**Lede:** *A selection of websites, digital products, campaigns, and experiences we've built for ambitious businesses.*

| ID | Requirement | Priority |
|---|---|---|
| FR-PORT-01 | Filters: **All · Websites · SaaS · E-commerce · Branding · Marketing**. Underlying project categories: Website, SaaS, E-commerce, Branding, SEO, Social Media, Web Application. Filter-to-category mapping lives in configuration. | MUST |
| FR-PORT-02 | Filtering is client-side, instant, without page reload. Active filter reflected in the URL query (`?category=saas`) so a filtered view is shareable and restorable on load. | MUST |
| FR-PORT-03 | Filter buttons are a `role="tablist"`-equivalent or a labelled button group with `aria-pressed`; results region is `aria-live="polite"` announcing the count. | MUST |
| FR-PORT-04 | Grid: masonry-adjacent layout where the first project spans two columns as `featured`. 3-col desktop / 2-col tablet / 1-col mobile. | MUST |
| FR-PORT-05 | Each card shows: image, client name, category, short description, services provided, year, **View case study** action. | MUST |
| FR-PORT-06 | Hover: image `scale(1.04)` over 500ms `ease-out` inside an `overflow:hidden` frame; a gold hairline draws along the bottom edge; the category tag shifts to gold; the arrow translates and rotates 45°; metadata refines from 70% → 100% opacity. All under 600ms. | MUST |
| FR-PORT-07 | Filter transitions use FLIP or a layout-animation library at ≤ 300ms; under reduced motion, items swap instantly with no movement. | SHOULD |
| FR-PORT-08 | Home shows the first 6 projects with a **View all work** link to `/work`, which renders the complete archive with the same filters. | MUST |
| FR-PORT-09 | Images lazy-loaded below the fold, served as AVIF/WebP with responsive `srcset`, explicit width/height, and a blur or solid-navy placeholder. Zero CLS. | MUST |
| FR-PORT-10 | Empty filter result shows a written empty state offering a reset — never a blank grid. | MUST |

### 8.7 Case Study — `/work/[slug]`

Fixed structure, in order:

1. **Hero** — project title, client, category, year, hero image
2. **Overview** — client · industry · project type · services · timeline (definition list)
3. **The Challenge** — the problem the client had
4. **Our Approach** — how the agency approached it
5. **What We Built** — specific deliverables
6. **Design** — UI/design screenshots gallery
7. **Results** — measurable outcomes, **conditionally rendered**
8. **Technology** — stack tags
9. **CTA** — *Have a similar challenge?* → **Let's talk**

| ID | Requirement | Priority |
|---|---|---|
| FR-CS-01 | One page generated per project at build time from the `projects` collection. | MUST |
| FR-CS-02 | The **Results** block renders only when `project.results` exists and is non-empty. When absent, the block is omitted entirely — no placeholder metrics, no "coming soon". | MUST |
| FR-CS-03 | Every result entry requires `value`, `label`, and `source`. A result without a `source` fails the build. | MUST |
| FR-CS-04 | Design gallery supports 1–12 images with lazy loading and an accessible lightbox (focus trap, `Esc` to close, arrow-key navigation, restores focus on close). | SHOULD |
| FR-CS-05 | Technology tags render from `project.technologies` using the shared `Tag` component. | MUST |
| FR-CS-06 | Prev/next project navigation at the foot of the page, plus a **Back to work** link that preserves the previously active filter. | SHOULD |
| FR-CS-07 | Unique `<title>`, meta description, canonical URL, and OG image per case study. `CreativeWork` structured data. | MUST |
| FR-CS-08 | Reading progress indicator rendered as a continuation of the Gold Rule. | MAY |
| FR-CS-09 | An unknown slug returns a real 404 with correct status, not a soft 200. | MUST |

### 8.8 Process

**Heading:** *From idea to impact.*

| Step | Title | Description |
|---|---|---|
| 01 | Discover | Understand the business, audience, objectives, and challenges. |
| 02 | Strategize | Define the solution, technology, positioning, and growth strategy. |
| 03 | Design | Create the visual identity, UX, and product experience. |
| 04 | Build | Develop the website, SaaS product, application, or digital system. |
| 05 | Launch | Deploy, test, optimise, and launch. |
| 06 | Grow | Continue improving SEO, marketing, content, performance, and conversion. |

| ID | Requirement | Priority |
|---|---|---|
| FR-PROC-01 | Visually connected timeline on the dark navy surface, with the Gold Rule as the connecting spine. | MUST |
| FR-PROC-02 | Numbered indices 01–06 are justified here because the content is a genuine sequence: they are set in the mono utility face at `--gold-500`. | MUST |
| FR-PROC-03 | Desktop: vertical timeline with alternating content offset; mobile: single left-aligned column with the spine at the left gutter. | MUST |
| FR-PROC-04 | Each step reveals on scroll (opacity + 16px translateY, 400ms, 80ms stagger) while the spine draws to it. Fully static under reduced motion. | SHOULD |
| FR-PROC-05 | Steps are an ordered list (`<ol>`) in the DOM, so the sequence is conveyed to assistive technology by structure and not by visual position alone. | MUST |

### 8.9 Results / Capabilities

| ID | Requirement | Priority |
|---|---|---|
| FR-CAP-01 | Displays numeric metrics (Projects delivered · Industries served · Websites built · Digital campaigns · SaaS products) **only** when real values are configured. | MUST |
| FR-CAP-02 | When no real numbers exist, the section renders capability statements instead — e.g. *From first idea to production-ready product, we bring strategy, design, development, and growth under one roof.* | MUST |
| FR-CAP-03 | The two modes (`metrics` \| `capabilities`) are driven by one configuration flag; the layout is designed to look intentional in either mode. | MUST |
| FR-CAP-04 | Count-up animation is permitted for real metrics only; it must not run under reduced motion, and the final value must be present in the DOM at all times for assistive technology and for no-JS rendering. | SHOULD |

### 8.10 Pricing

**Heading:** *Simple plans. Serious results.*

| Tier | For | Includes | CTA |
|---|---|---|---|
| **Starter** | Small businesses establishing their digital presence | Professional website · Responsive design · Basic SEO · Contact integration · Analytics · Basic support | **Get started** |
| **Growth** *(Most Popular)* | Businesses improving their presence and generating more customers | Advanced website · SEO · Conversion optimisation · Social media strategy · Content support · Analytics · Ongoing optimisation | **Get started** |
| **Scale** | Businesses needing custom digital products and growth solutions | Custom web applications · SaaS development · Advanced integrations · Advanced SEO · Digital strategy · Dedicated support · Custom requirements | **Talk to our team** |

Plus a custom band: *Need something custom?* — *Every business is different. Tell us what you're building and we'll create a tailored proposal.*

| ID | Requirement | Priority |
|---|---|---|
| FR-PRC-01 | Prices are **never invented**. Each tier reads `price.amount` from configuration; when `amount` is null the card renders the configured fallback label (`On request` / `Custom quote`) with the CTA intact. | MUST |
| FR-PRC-02 | Price display supports currency symbol, amount, period, and a qualifier (`Starting from`). Currency defaults to `{{CURRENCY}}` (INR expected) and is configurable. | MUST |
| FR-PRC-03 | The Growth tier is visually elevated: gold 1px border, gold **Most popular** pill, `shadow-lift`, and a ~4% scale increase on desktop. It does not shout — it is simply the most resolved card. | MUST |
| FR-PRC-04 | Three cards side by side on desktop; on mobile they stack with Growth first, and no card may overflow its container at 320px width. | MUST |
| FR-PRC-05 | Feature lists use gold check icons; features absent from a tier are omitted rather than struck through. | MUST |
| FR-PRC-06 | Each CTA deep-links to the contact form and pre-selects the corresponding plan in the inquiry payload (`?plan=growth`). | MUST |
| FR-PRC-07 | Optional monthly/one-time toggle is supported by the data model but hidden unless configured. | MAY |
| FR-PRC-08 | Every tier states what is *not* included or what defines its ceiling in one line, so prospects self-qualify accurately. | SHOULD |

### 8.11 Testimonials

| ID | Requirement | Priority |
|---|---|---|
| FR-TEST-01 | Each testimonial carries client name, position, company, photo, and quote. | MUST |
| FR-TEST-02 | Only real testimonials are published. If none exist, clearly-marked placeholders are used (`[Placeholder testimonial — replace before launch]`) and a build warning is emitted. **No fabricated quote may ever ship.** | MUST |
| FR-TEST-03 | Layout: 2–3 card grid on desktop; on mobile a swipeable carousel with dot indicators. Carousel does not auto-advance. | MUST |
| FR-TEST-04 | Quote marks are typographic (a large gold `"` glyph), not an icon graphic. | SHOULD |
| FR-TEST-05 | Missing photo falls back to a monogram avatar on a navy field — never a generic stock portrait. | MUST |
| FR-TEST-06 | Entire section is hidden if the collection is empty. | MUST |

### 8.12 FAQ

Accordion with all ten mandated questions:

1. What type of businesses do you work with?
2. Do you build custom websites?
3. Can you build SaaS products?
4. Do you provide ongoing SEO?
5. Do you manage social media?
6. Can you handle design and development together?
7. How long does a website take?
8. Do you provide post-launch support?
9. Can you work with an existing website?
10. How does your pricing work?

| ID | Requirement | Priority |
|---|---|---|
| FR-FAQ-01 | Accordion built on native `<button>` triggers with `aria-expanded` and `aria-controls`; panels are `role="region"` labelled by their trigger. | MUST |
| FR-FAQ-02 | Keyboard: `Enter`/`Space` toggles; `Tab` moves between triggers; content is reachable when open. | MUST |
| FR-FAQ-03 | Height animation 240ms `ease-out`; instant under reduced motion. Chevron rotates 180°. | SHOULD |
| FR-FAQ-04 | `FAQPage` structured data emitted from the same data source that renders the UI — one source, no duplication. | MUST |
| FR-FAQ-05 | Answers are 2–4 sentences, specific, and free of hedging. Timeline answers give real ranges (e.g. 3–6 weeks) once confirmed by the business. | MUST |
| FR-FAQ-06 | Adding an eleventh question requires a data entry only. | MUST |

### 8.13 Final CTA

**Headline:** *Have an idea? Let's build it.*
**Copy:** *Whether you're launching a new business, rebuilding your website, or creating your next digital product, let's turn your idea into something people remember.*
**Buttons:** **Start a project** · **Talk to us**

| ID | Requirement | Priority |
|---|---|---|
| FR-CTA-01 | Full-bleed dark section on `--ink-900` with a blue→navy gradient and the gold system at its most prominent — this is where the Gold Rule terminates. | MUST |
| FR-CTA-02 | Primary button uses the `gold` variant with `--ink-900` text; this is the only gold-filled button on the page. | MUST |
| FR-CTA-03 | **Start a project** scrolls to the contact form; **Talk to us** opens the configured direct channel (`mailto:` / `tel:` / WhatsApp), driven by configuration. | MUST |
| FR-CTA-04 | Headline is `display-xl`-scale but rendered as `<h2>`, preserving heading hierarchy. | MUST |

### 8.14 Contact

**CTA:** **Send project inquiry**

| Field | Type | Required | Validation |
|---|---|---|---|
| Name | text | Yes | 2–80 chars |
| Email | email | Yes | RFC-valid, MX-format check |
| Company | text | No | ≤ 120 chars |
| Phone | tel | No | E.164-tolerant, 7–15 digits |
| Service required | select | Yes | One of the nine options |
| Budget range | select | Yes | Configurable bands |
| Project description | textarea | Yes | 20–2000 chars, live counter |
| Timeline | select | Yes | ASAP · 1 month · 1–3 months · 3+ months · Exploring |
| Consent | checkbox | Yes | Links to Privacy Policy |

Service options: Website · SaaS Product · Web Application · SEO · Social Media Marketing · Branding · Media/Creative · Digital Strategy · Other.

| ID | Requirement | Priority |
|---|---|---|
| FR-CON-01 | Client-side validation on blur and on submit; server-side validation is authoritative and duplicates every rule. | MUST |
| FR-CON-02 | Errors appear inline beneath the field, are linked via `aria-describedby`, set `aria-invalid`, and focus moves to the first invalid field on failed submit. | MUST |
| FR-CON-03 | Errors state what happened and how to fix it, in the interface's voice. "Enter a work email so we can reply." Not "Invalid input." | MUST |
| FR-CON-04 | Submit enters a loading state; the button is disabled during flight; double submission is prevented. | MUST |
| FR-CON-05 | Success replaces the form with a polished confirmation: gold check mark, *Inquiry sent.*, expected response time (`{{RESPONSE_SLA}}`), a link to `/work`, and a direct email fallback. | MUST |
| FR-CON-06 | Failure keeps all entered data intact, explains the failure, and offers the direct email address as a fallback path. | MUST |
| FR-CON-07 | Honeypot field plus a submission-timing check (< 2s = reject) for spam; optional Cloudflare Turnstile behind a configuration flag. No visible CAPTCHA by default. | MUST |
| FR-CON-08 | Rate limit: 5 submissions per IP per hour, enforced server-side. | MUST |
| FR-CON-09 | Deep-link parameters (`?plan=growth`, `?service=saas`) pre-select the matching fields. | SHOULD |
| FR-CON-10 | Alongside the form: direct email, phone, location, and response-time expectation — some visitors will never use a form. | MUST |
| FR-CON-11 | Correct `autocomplete` attributes and appropriate mobile `inputmode`/keyboard per field. | MUST |
| FR-CON-12 | In React, no HTML `<form>` submit-navigation is relied upon; submission is handled by an explicit click/submit handler posting to the API route. | MUST |

### 8.15 Footer

| ID | Requirement | Priority |
|---|---|---|
| FR-FOOT-01 | Columns: Brand (logo + ≤ 30-word description) · Services · Company (About, Process, Careers if configured) · Work · Resources (Pricing, Contact, Privacy, Terms). | MUST |
| FR-FOOT-02 | Contact block: email, phone, location, social links with accessible names. | MUST |
| FR-FOOT-03 | Bottom bar: © `{{YEAR}}` Dhi Minds · Privacy Policy · Terms of Service. Year computed at build time. | MUST |
| FR-FOOT-04 | Social icons link only to configured, live profiles; unconfigured platforms are omitted rather than linked to `#`. | MUST |
| FR-FOOT-05 | Footer renders on `--ink-900` with a single gold hairline as the top edge — the visual close of the Gold Rule. | MUST |
| FR-FOOT-06 | All footer links are generated from the same navigation data used by the navbar. | MUST |

### 8.16 Legal pages

**FR-LEG-01 (MUST)** — `/privacy` and `/terms` render from Markdown/MDX source, styled with the site's editorial typography, with a "last updated" date.
**FR-LEG-02 (MUST)** — The Privacy Policy accurately describes what the inquiry form collects, where it is stored, how long it is retained, who processes it, and how to request deletion (§18).

---

## 9. Content Model

**FR-CMS-01 (MUST)** — No content is hard-coded inside a component. All content lives in typed data modules under `/content`, consumed through a single `lib/content` accessor.

**FR-CMS-02 (MUST)** — Every collection is validated at build time with a schema (Zod). A schema violation fails the build rather than shipping a broken section.

```ts
// content/schema.ts — abridged

Project = {
  slug: string                    // unique, kebab-case
  title: string
  client: string
  category: 'Website' | 'SaaS' | 'E-commerce' | 'Branding'
           | 'SEO' | 'Social Media' | 'Web Application'
  filterGroups: FilterGroup[]     // maps to the six UI filters
  year: number
  featured: boolean
  order: number
  summary: string                 // <= 160 chars, used on cards
  services: string[]
  coverImage: Image               // { src, alt, width, height }
  caseStudy?: {
    heroImage: Image
    overview: { industry, projectType, timeline, servicesProvided[] }
    challenge: string             // markdown
    approach: string              // markdown
    built: string[]               // deliverables
    designGallery: Image[]        // 1..12
    results?: Result[]            // OMITTED when no real data
    technologies: string[]
    liveUrl?: string
  }
  seo: { title, description, ogImage }
}

Result = { value: string, label: string, source: string }  // source REQUIRED

Service = {
  id, title, description, capabilities: string[], icon, order
}

PricingTier = {
  id, name, tagline, audience,
  price: { amount: number | null, currency: string,
           period?: string, qualifier?: string, fallbackLabel: string },
  features: string[], ceiling?: string,
  cta: { label: string, target: string },
  highlighted: boolean
}

Testimonial = {
  quote, name, position, company, avatar?: Image,
  isPlaceholder: boolean   // true blocks production deploy
}

Client   = { name, logo?: Image, isPlaceholder: boolean }
FAQ      = { question, answer, order }
ProcessStep = { index, title, description }
Company  = { name, story, email, phone, location, socials[],
             responseSLA, capabilities[], metrics?: Metric[] }
```

**FR-CMS-03 (MUST)** — `isPlaceholder: true` anywhere in the content set blocks a production deployment via a CI check, while remaining permitted in preview environments.

**FR-CMS-04 (MUST)** — Adding a project, service, tier, testimonial, FAQ, or client requires editing one data file only. No component change may be required.

**FR-CMS-05 (SHOULD)** — Structure content so a headless CMS (Sanity/Payload) can replace the local modules in v2 by swapping the `lib/content` implementation, with no component rewrites.

---

## 10. Technical Architecture

### 10.1 Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Static generation for speed and SEO, per-route metadata, image pipeline, route handlers for the form |
| Styling | **Tailwind CSS** with the design tokens in §7.3 mapped into the theme | Token discipline, no stylesheet drift |
| Motion | **Framer Motion** (or CSS where sufficient), globally wired to `useReducedMotion` | §12 compliance in one place |
| Content | Typed TS/MDX modules + Zod validation | Zero runtime cost, CMS-ready |
| Images | `next/image`; optional Cloudinary loader | AVIF/WebP, responsive sets, CLS safety |
| Forms | Route Handler + Zod (shared schema, client and server) | One definition of validity |
| Storage | **MongoDB Atlas** (Mumbai region) `inquiries` collection | Matches existing stack; no vendor lock |
| Email | Resend or Nodemailer over SMTP | Team notification + visitor auto-reply |
| Hosting | Vercel (or equivalent edge CDN) | CDN, image optimisation, preview deployments |
| Analytics | Privacy-friendly analytics (Plausible/Umami) or GA4 | §17 |

### 10.2 Rendering strategy

- All marketing routes are **statically generated**. No client-side data fetching on first paint.
- `/work/[slug]` uses `generateStaticParams` over the project collection.
- Only the inquiry `POST` is dynamic.
- Client components are used only where interactivity requires them: navbar scroll state, mobile drawer, portfolio filter, accordion, carousel, form, scroll reveals. Everything else is a server component.

### 10.3 Project structure

```
/app
  layout.tsx                 # fonts, metadata defaults, skip link
  page.tsx                   # home — composes sections
  work/page.tsx
  work/[slug]/page.tsx
  contact/page.tsx
  privacy/page.tsx  terms/page.tsx
  api/inquiry/route.ts
  sitemap.ts  robots.ts  not-found.tsx
/components
  ui/         # Button, Input, Tag, Accordion, Eyebrow, Section...
  sections/   # Hero, Services, Portfolio, Pricing, FAQ...
  motion/     # RevealOnScroll, GoldRule, useReducedMotionSafe
/content      # projects, services, pricing, testimonials, faq, company
/lib          # content accessors, schema, seo, analytics, validation
/styles       # tokens.css, globals.css
/public       # fonts, og images, favicons
```

### 10.4 Engineering standards

| ID | Requirement | Priority |
|---|---|---|
| NFR-ENG-01 | TypeScript `strict: true`. No `any` in application code. | MUST |
| NFR-ENG-02 | ESLint + Prettier enforced in CI; build fails on lint errors. | MUST |
| NFR-ENG-03 | No duplicated components. A visual variation is a prop, not a copy. Code review rejects duplicates. | MUST |
| NFR-ENG-04 | No magic colour or spacing values in components — tokens only. | MUST |
| NFR-ENG-05 | Tailwind class conflicts and CSS specificity collisions (notably section padding) are avoided by composing spacing at the `Section` component level only. | MUST |
| NFR-ENG-06 | Secrets in environment variables only; `.env.example` committed with every key documented and no values. | MUST |
| NFR-ENG-07 | Preview deployment per pull request. | SHOULD |
| NFR-ENG-08 | A new section, service, or route can be added without modifying more than two existing files. | SHOULD |

---

## 11. Inquiry Backend

### 11.1 Endpoint

`POST /api/inquiry`

**Request:** the validated form payload plus `_hp` (honeypot), `_t` (client render timestamp), and optional `source` (`plan=growth`, referrer, UTM parameters).

**Responses:**

| Status | Meaning | Body |
|---|---|---|
| 201 | Accepted | `{ ok: true, id }` |
| 400 | Validation failed | `{ ok: false, fieldErrors }` |
| 429 | Rate limited | `{ ok: false, error: 'RATE_LIMITED' }` |
| 500 | Server error | `{ ok: false, error: 'SERVER_ERROR' }` |

### 11.2 Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-API-01 | Server-side validation with the same Zod schema as the client. The client is never trusted. | MUST |
| FR-API-02 | All string input is sanitised and length-capped before storage and before insertion into any email template. | MUST |
| FR-API-03 | Persist to MongoDB Atlas with `createdAt`, `status: 'new'`, `source`, and a hashed IP (never a raw IP). | MUST |
| FR-API-04 | Send a team notification email containing every field, formatted for fast triage, with `Reply-To` set to the visitor's address. | MUST |
| FR-API-05 | Send the visitor an auto-reply confirming receipt and stating the response window. | SHOULD |
| FR-API-06 | Email failure must not fail the request — the inquiry is already persisted; failures are logged and retried out of band. | MUST |
| FR-API-07 | Rate limiting per hashed IP, enforced at the edge or in the handler. | MUST |
| FR-API-08 | Structured server logs with no personal data in the message body. | MUST |
| FR-API-09 | Optional webhook forward to a CRM/Sheet behind a configuration flag, for v2 readiness. | MAY |

---

## 12. Motion Specification

Motion is subtle, purposeful, and always optional. Performance outranks animation complexity. The site must look excellent with animation disabled — that is the acceptance test, not a caveat.

### 12.1 Global rules

| ID | Requirement | Priority |
|---|---|---|
| NFR-MOT-01 | `prefers-reduced-motion: reduce` disables all transform and opacity entrance animations, parallax, marquee, count-up, and scroll-linked drawing. Content renders in its final state immediately. Colour and border transitions ≤ 150ms may remain. | MUST |
| NFR-MOT-02 | Reduced-motion handling is implemented once in a shared hook/wrapper, not repeated per component. | MUST |
| NFR-MOT-03 | Only `transform` and `opacity` are animated. No animation of `width`, `height`, `top`, `left`, or `box-shadow` (accordion height uses a grid-rows or max-height technique with `will-change` released after transition). | MUST |
| NFR-MOT-04 | Scroll-triggered reveals use IntersectionObserver, fire once, and are removed after firing. No scroll event listeners for reveal logic. | MUST |
| NFR-MOT-05 | Nothing animates above the fold except the single orchestrated hero load sequence. | MUST |
| NFR-MOT-06 | No parallax on touch devices. No scroll-jacking. No custom smooth-scroll library overriding native scrolling. | MUST |
| NFR-MOT-07 | Custom cursor interaction, if built, is desktop-and-pointer-only, never interferes with clicks, and is disabled under reduced motion. | MAY |
| NFR-MOT-08 | Animation must never delay the LCP element or block interaction. | MUST |

### 12.2 Timing system

| Token | Duration | Easing | Used for |
|---|---|---|---|
| `instant` | 120ms | `ease-out` | Colour, border, focus ring |
| `fast` | 200ms | `cubic-bezier(.2,.8,.2,1)` | Buttons, card hover, tags |
| `base` | 320ms | `cubic-bezier(.2,.8,.2,1)` | Reveals, accordion, filters |
| `slow` | 500ms | `ease-out` | Image zoom, hero sequence, drawer |
| Stagger | 60–80ms | — | Grids and lists, capped at 6 items |

### 12.3 Inventory

Hero load sequence (once) · text reveal on scroll · image clip reveal · card hover lift · button hover · portfolio image zoom · Gold Rule scroll drawing · navbar refinement · mobile drawer stagger · accordion disclosure · filter FLIP transition · smooth anchor scrolling · count-up for real metrics only.

---

## 13. Responsive Specification

Mobile is designed, not shrunk. Each breakpoint has its own hierarchy decision.

### 13.1 Breakpoints

| Name | Range | Grid |
|---|---|---|
| `xs` | 320–479 | 4 col, 20px gutter |
| `sm` | 480–767 | 4 col, 24px gutter |
| `md` | 768–1023 | 8 col, 32px gutter |
| `lg` | 1024–1439 | 12 col, 40px gutter |
| `xl` | 1440+ | 12 col, 48px gutter, 1280px max content |

### 13.2 Per-section behaviour

| Section | Mobile decision |
|---|---|
| Nav | Logo + hamburger only; CTA pinned to the drawer base |
| Hero | Copy first, visual below at reduced complexity (2 layers, no parallax); H1 drops to 40px |
| Trust | 2-up logo grid or slow marquee |
| Services | Single column; capabilities collapsed by default to protect scroll length |
| About | Story then value cards, 2-up |
| Portfolio | Single column; filters become a horizontally scrollable pill row with edge fade; featured card loses its span |
| Process | Left-aligned single column, spine in the gutter |
| Pricing | Stacked, **Growth first**; no horizontal overflow at 320px; sticky "Talk to us" not required |
| Testimonials | Swipe carousel with dots |
| FAQ | Full-width, larger touch targets |
| Contact | Single column, 16px input font to prevent iOS zoom |
| Footer | Accordion-grouped link columns |

### 13.3 Rules

| ID | Requirement | Priority |
|---|---|---|
| NFR-RES-01 | No horizontal scroll at any width from 320px upward. | MUST |
| NFR-RES-02 | Interactive targets ≥ 44×44px with ≥ 8px separation. | MUST |
| NFR-RES-03 | Typography scales fluidly via `clamp()`; no fixed pixel type in layout components. | MUST |
| NFR-RES-04 | Pricing and portfolio cards are explicitly tested at 320px, 375px, 414px, 768px, 1024px, 1440px, 1920px. | MUST |
| NFR-RES-05 | Form inputs use ≥ 16px font size on mobile. | MUST |
| NFR-RES-06 | Layout respects safe-area insets on notched devices. | SHOULD |
| NFR-RES-07 | Tested on iOS Safari, Android Chrome, and desktop Chrome/Safari/Firefox/Edge (latest two versions). | MUST |

---

## 14. SEO Specification

### 14.1 Target positioning

Digital agency · web development agency · SaaS development company · website development · SEO agency · social media marketing agency · digital marketing agency · custom web development — with `{{PRIMARY_LOCATION}}` modifiers where relevant.

**Brand term:** `Dhi Minds` must rank first for its own name. Brand search is the highest-intent query the site will receive (referrals from P4 look the company up before they look up the service), so brand-term resolution is treated as a launch gate, not an optimisation.

**CR-SEO-01 (MUST)** — No keyword stuffing. Keywords appear where they read naturally in genuine copy. Copy quality outranks keyword density. A page that reads as written-for-search fails review.

### 14.2 Requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-SEO-01 | Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`. One `<h1>` per page; no skipped heading levels. | MUST |
| NFR-SEO-02 | Unique `<title>` (≤ 60 chars) and meta description (≤ 155 chars) per route, defined in content, not hard-coded in components. | MUST |
| NFR-SEO-03 | Open Graph tags on every route: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`, `og:site_name`. | MUST |
| NFR-SEO-04 | Twitter/X card tags: `summary_large_image`, title, description, image. | MUST |
| NFR-SEO-05 | Structured data (JSON-LD): `Organization` + `WebSite` sitewide; `Service` on the services section; `FAQPage` on the FAQ; `CreativeWork` on each case study; `BreadcrumbList` on nested routes. Generated from the same content data. | MUST |
| NFR-SEO-06 | Self-referencing canonical URL on every page. | MUST |
| NFR-SEO-07 | `sitemap.xml` generated at build time including all indexable routes with `lastmod`. | MUST |
| NFR-SEO-08 | `robots.txt` allowing crawl, referencing the sitemap, and disallowing `/api/` and `/thank-you`. | MUST |
| NFR-SEO-09 | Descriptive `alt` text on every meaningful image; decorative images `alt=""`. Alt text is a required field in the image schema. | MUST |
| NFR-SEO-10 | Images optimised: AVIF/WebP with fallback, responsive `srcset`, explicit dimensions, lazy below the fold. | MUST |
| NFR-SEO-11 | Content renders server-side; nothing meaningful is client-only. Verified with JavaScript disabled. | MUST |
| NFR-SEO-12 | HTTPS enforced; one canonical host (www or apex) with 301 redirects for the other; no mixed content. | MUST |
| NFR-SEO-13 | Favicon set, `manifest.json`, `theme-color` (`--ink-800`), and an apple touch icon. | MUST |
| NFR-SEO-14 | Search Console and analytics verified at launch; sitemap submitted. | MUST |
| NFR-SEO-15 | Internal linking: services link to relevant case studies; case studies link to related services and back to `/work`. | SHOULD |

---

## 15. Performance

The site must feel extremely fast. Performance is a release gate, not an optimisation phase.

### 15.1 Budgets

| Metric | Budget |
|---|---|
| LCP (mobile, field p75) | ≤ 2.0s |
| INP (p75) | ≤ 150ms |
| CLS (p75) | ≤ 0.05 |
| TTFB | ≤ 400ms |
| JS shipped to the home route (gzipped) | ≤ 160KB |
| CSS (gzipped) | ≤ 40KB |
| Fonts total | ≤ 120KB (2 families, ≤ 2 weights each, subset) |
| Largest single image | ≤ 200KB |
| Home page total weight (first load) | ≤ 900KB |
| Lighthouse mobile Performance | ≥ 90 |

### 15.2 Requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-PERF-01 | Static generation and CDN delivery for all marketing routes. | MUST |
| NFR-PERF-02 | Route-level code splitting; the lightbox, carousel, and motion library load only where used, via dynamic import. | MUST |
| NFR-PERF-03 | Below-fold images lazy-loaded; hero images preloaded with `priority`. | MUST |
| NFR-PERF-04 | Fonts self-hosted, preloaded, subset, `font-display: swap`; no third-party font CDN. | MUST |
| NFR-PERF-05 | Every image and embed has explicit dimensions or a reserved aspect-ratio box — CLS budget is not negotiable. | MUST |
| NFR-PERF-06 | No render-blocking third-party scripts. Analytics loads deferred/async. | MUST |
| NFR-PERF-07 | Immutable cache headers for static assets; HTML revalidated appropriately. | MUST |
| NFR-PERF-08 | Lighthouse CI runs on every pull request; a budget regression fails the build. | SHOULD |
| NFR-PERF-09 | Animations run at 60fps on a mid-range Android device; verified with DevTools performance profiling. | MUST |

---

## 16. Accessibility

**Target: WCAG 2.2 Level AA.**

| ID | Requirement | Priority |
|---|---|---|
| NFR-A11Y-01 | Full keyboard operability: nav, drawer, filters, accordion, carousel, lightbox, and form. No keyboard traps except intentional modal focus traps that release on close. | MUST |
| NFR-A11Y-02 | Visible focus indicator on every interactive element: 2px gold ring with a 2px offset, meeting ≥ 3:1 against the adjacent background. `:focus-visible` used; focus outlines are never removed without replacement. | MUST |
| NFR-A11Y-03 | Body text ≥ 4.5:1 contrast; large text and UI components ≥ 3:1. The gold accent rules in §7.3 are enforced and verified. | MUST |
| NFR-A11Y-04 | Semantic HTML first; ARIA only where no native element exists. No redundant or contradictory roles. | MUST |
| NFR-A11Y-05 | All form controls have visible, programmatically associated `<label>` elements. Placeholders are never used as labels. | MUST |
| NFR-A11Y-06 | Errors and success states are announced via `aria-live`; the success confirmation receives focus. | MUST |
| NFR-A11Y-07 | Skip-to-content link, visible on focus, as the first tabbable element. | MUST |
| NFR-A11Y-08 | Logical tab order matching visual order; no positive `tabindex`. | MUST |
| NFR-A11Y-09 | `lang` attribute set; page titles are descriptive and unique. | MUST |
| NFR-A11Y-10 | Reduced-motion support per §12. | MUST |
| NFR-A11Y-11 | Content and functionality remain usable at 200% zoom and at 320px width without loss. | MUST |
| NFR-A11Y-12 | Automated audit (axe) with zero critical/serious violations, plus a manual screen-reader pass (NVDA or VoiceOver) over the full home page and one case study. | MUST |
| NFR-A11Y-13 | No information is conveyed by colour alone — the "Most popular" tier, active filters, and form errors all carry a text or shape cue. | MUST |

---

## 17. Analytics & Measurement

| ID | Requirement | Priority |
|---|---|---|
| FR-ANL-01 | Page views and referrer tracked on every route. | MUST |
| FR-ANL-02 | Events tracked: `cta_click` (with location and label), `service_expand`, `portfolio_filter`, `case_study_view`, `pricing_cta_click` (with tier), `faq_open`, `form_start`, `form_field_error`, `form_submit`, `form_success`, `form_error`, `contact_direct_click`. | MUST |
| FR-ANL-03 | Scroll-depth milestones at 25/50/75/100% and section-in-view events for Pricing and Portfolio. | SHOULD |
| FR-ANL-04 | UTM parameters captured and stored with the inquiry record for attribution. | MUST |
| FR-ANL-05 | Analytics implementation is a thin wrapper in `lib/analytics` so the provider can be swapped in one file. | MUST |
| FR-ANL-06 | No personal data is sent to analytics. Form contents are never transmitted as event properties. | MUST |
| FR-ANL-07 | A cookieless, privacy-friendly provider is preferred; if a cookie-based provider is used, a compliant consent mechanism is required (§18). | SHOULD |

---

## 18. Security, Privacy & Compliance

| ID | Requirement | Priority |
|---|---|---|
| NFR-SEC-01 | HTTPS enforced with HSTS. | MUST |
| NFR-SEC-02 | Security headers: `Content-Security-Policy` (no `unsafe-eval`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restricting camera/microphone/geolocation, `X-Frame-Options: DENY`. | MUST |
| NFR-SEC-03 | No secrets in client bundles; all credentials server-side only. | MUST |
| NFR-SEC-04 | Input sanitisation and output encoding on all user-supplied values; no `dangerouslySetInnerHTML` on user input. | MUST |
| NFR-SEC-05 | Database access restricted by IP allowlist/private networking; least-privilege database user. | MUST |
| NFR-SEC-06 | Dependency vulnerability scanning in CI; no known high/critical vulnerabilities at release. | MUST |
| NFR-SEC-07 | Inquiry data retained for `{{RETENTION_PERIOD}}` (default 24 months), then deleted or anonymised by a scheduled job. | MUST |
| NFR-SEC-08 | Privacy Policy states the data collected, purpose, lawful basis, storage location, retention period, third-party processors (email, analytics, hosting), and the contact route for access/erasure requests. | MUST |
| NFR-SEC-09 | Explicit consent checkbox on the inquiry form, unchecked by default, linking to the Privacy Policy. Consent state and timestamp stored with the record. | MUST |
| NFR-SEC-10 | India **DPDP Act 2023** alignment: purpose limitation, notice at collection, and a stated grievance contact. If EU or California traffic is expected, GDPR/CCPA rights (access, correction, deletion, opt-out) are honoured through the same contact route. | MUST |
| NFR-SEC-11 | An error page never leaks a stack trace or environment detail. | MUST |

---

## 19. Content Governance — Non-Negotiable

These rules override every other consideration, including visual completeness. A section that looks better with invented content ships without that content.

| ID | Rule |
|---|---|
| **CR-01** | **Never fabricate** clients, testimonials, awards, revenue, project results, statistics, certifications, or partnerships. |
| **CR-02** | Metrics render only from configured real values with a recorded `source`. A result without a source fails the build. |
| **CR-03** | Where real data is unavailable, use capability statements instead of numbers (§8.9). |
| **CR-04** | Placeholder content is explicitly identifiable (`[Placeholder — replace before launch]`, `Client Name 01`) and flagged `isPlaceholder: true`. |
| **CR-05** | Any `isPlaceholder: true` in the content set blocks a production deploy via CI. |
| **CR-06** | Pricing figures come from the business. If not supplied, the tier renders `On request` — never an estimate, never a guess. |
| **CR-07** | Client logos are used only with permission. Unlicensed logos are never displayed. |
| **CR-08** | Testimonial names, roles, companies, and photos are published only with written client consent. |
| **CR-09** | Case-study results are stated in the terms the client can verify; no rounding upward, no cherry-picked windows without disclosure. |
| **CR-10** | Banned marketing language (§5.3) is a review failure, not a style note. |
| **CR-11** | Every placeholder is trivially replaceable — one data field, no component edit. |

**Launch gate:** a signed content sign-off confirming every published claim is true and every placeholder has been replaced.

---

## 20. Delivery Plan

Six phases mirroring the agency's own process — the site is built the way the process section says work gets done.

### Phase 0 — Foundation *(2–3 days)*
Repository, Next.js + TypeScript + Tailwind setup, design tokens, font pipeline, base layout, skip link, ESLint/Prettier/CI, `.env.example`, Zod content schemas, content directory scaffolding.
**Exit:** tokens render, CI green, an empty page scores 100 on Lighthouse accessibility.

### Phase 1 — Design system & primitives *(3–4 days)*
`Button`, `Section`, `Eyebrow`, `Input`/`Select`/`Textarea`, `Tag`, `Accordion`, `RevealOnScroll`, `GoldRule`, focus system, motion hook, responsive grid. Component gallery route (dev-only).
**Exit:** every primitive keyboard-operable, contrast-verified, reduced-motion-safe. **Blocking dependency:** the brand-mark decision (FR-BRD-08) is resolved here, not later.

### Phase 2 — Core page sections *(5–7 days)*
Navigation, Hero, Trust, Services, About, Process, Capabilities, Final CTA, Footer, plus the Gold Rule wired end to end.
**Exit:** home page complete except Portfolio, Pricing, Testimonials, FAQ, Contact; responsive at all breakpoints.

### Phase 3 — Portfolio & case studies *(4–6 days)*
Portfolio grid, filters with URL state, `/work` archive, `/work/[slug]` template with all nine blocks, conditional results, gallery + lightbox, prev/next, per-page metadata and structured data.
**Exit:** three sample projects render end to end; a project with no results omits the block cleanly.

### Phase 4 — Conversion layer *(3–4 days)*
Pricing, Testimonials, FAQ, Contact form, `/api/inquiry`, MongoDB persistence, notification and auto-reply email, spam controls, rate limiting, success/error states, deep-link pre-selection, analytics events.
**Exit:** an inquiry submitted in production-preview is stored and both emails are delivered; all validation paths tested.

### Phase 5 — SEO, performance & accessibility hardening *(3–4 days)*
Metadata across all routes, JSON-LD, sitemap, robots, OG images, image optimisation pass, bundle trimming, Lighthouse CI, axe audit, screen-reader pass, cross-browser and device testing, security headers, legal pages.
**Exit:** all §15 budgets met, zero serious axe violations, headers verified.

### Phase 6 — Content, QA & launch *(2–3 days)*
Real content load, placeholder removal, content sign-off, redirect and canonical host configuration, Search Console + analytics verification, sitemap submission, 404/500 verification, final regression, launch.
**Exit:** §21 checklist fully passed and signed off.

**Indicative total: 22–31 working days** for a single full-stack developer; compressible with a parallel design track.

---

## 21. QA & Acceptance Criteria

Release is blocked until every line is checked.

### 21.1 Functional
- [ ] All 13 home sections present, in the mandated order, with the mandated content
- [ ] Navbar sticky, refines on scroll, active section indicated
- [ ] Mobile drawer opens, traps focus, closes on `Esc`, backdrop, and link selection
- [ ] Hero renders correctly with JavaScript disabled
- [ ] All six services present with full capability lists and working expansion
- [ ] Portfolio filters work, update the URL, and restore from the URL
- [ ] Every project links to a case study; every case study renders all applicable blocks
- [ ] Case studies with no results omit the Results block entirely
- [ ] All six process steps render on a connected timeline
- [ ] Three pricing tiers render; Growth is marked Most popular; CTAs deep-link with plan pre-selected
- [ ] All ten FAQ questions render and operate by keyboard
- [ ] Contact form validates, submits, stores, emails, and shows the success state
- [ ] Form failure preserves entered data and offers the email fallback
- [ ] Footer links resolve; no `#` placeholders; legal pages live

### 21.2 Design
- [ ] Blue and gold system applied per §7; gold never dominant
- [ ] Gold appears no more than ~3 times per viewport
- [ ] Gold Rule draws through the page and terminates in the final CTA
- [ ] Surface rhythm matches §7.4
- [ ] Type scale, measure, and weights match §7.5
- [ ] No stock photography of people in offices
- [ ] Site looks excellent with all animation disabled

### 21.3 Responsive
- [ ] No horizontal scroll at 320px on any route
- [ ] Pricing cards do not overflow at any width
- [ ] Portfolio cards remain readable on mobile
- [ ] Touch targets ≥ 44px
- [ ] Verified on iOS Safari, Android Chrome, Chrome, Safari, Firefox, Edge

### 21.4 Accessibility
- [ ] Full keyboard traversal of every route
- [ ] Visible focus on every interactive element
- [ ] axe: zero critical or serious violations
- [ ] Manual screen-reader pass on home and one case study
- [ ] Every gold/background pair contrast-verified and logged
- [ ] Reduced-motion verified with the OS setting enabled
- [ ] Usable at 200% zoom

### 21.5 Performance
- [ ] Lighthouse mobile ≥ 90 / 100 / 100 / 100
- [ ] All §15 budgets met
- [ ] Zero CLS on load and on image reveal
- [ ] 60fps animation on a mid-range Android device

### 21.6 SEO
- [ ] Unique title, description, canonical, OG, and Twitter tags on every route
- [ ] JSON-LD validates in the Rich Results Test
- [ ] Sitemap and robots correct and reachable
- [ ] Every image has appropriate alt text
- [ ] Content present with JavaScript disabled
- [ ] Single canonical host with correct redirects

### 21.7 Content & compliance
- [ ] Zero `isPlaceholder: true` entries
- [ ] No fabricated client, testimonial, metric, award, or partnership
- [ ] Every published metric has a recorded source
- [ ] No banned marketing phrases
- [ ] Brand name renders as "Dhi Minds" in title, footer, schema, and legal pages
- [ ] Services grid leads with Web Development and SaaS (FR-BRD-04)
- [ ] Featured portfolio slot shows a build project, not a campaign (FR-BRD-05)
- [ ] Every published case study includes a Technology block (FR-BRD-06)
- [ ] Logo decision resolved and applied (FR-BRD-08)
- [ ] Privacy Policy and Terms accurate and live
- [ ] Consent checkbox present, unchecked by default, and stored
- [ ] Security headers verified

---

## 22. Risks & Mitigations

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | No real portfolio work available at launch | Portfolio is the site's core credibility engine; weak content undermines everything | Launch with 3–4 genuine projects, even small ones, documented properly. Never pad with invented work. Placeholders block production deploy by design. |
| R2 | No client testimonials available | Social proof section renders empty | Section auto-hides. Collect two testimonials during Phase 4; a short honest quote beats an invented paragraph. |
| R3 | Pricing not decided by the business | Pricing section reads unfinished | `On request` fallback with intact CTAs is a legitimate premium pattern. Escalate for a decision by Phase 4. |
| R4 | Gold accent drifts toward gaudy during build | Undermines the entire premium positioning | The ~3-instances-per-viewport rule is a review gate; a design review is scheduled at the end of Phase 2. |
| R5 | Motion work erodes the performance budget | Fails Core Web Vitals and the "extremely fast" requirement | Lighthouse CI on every PR; motion library dynamically imported; transform/opacity only. |
| R6 | Scope creep into blog, portal, or CMS during v1 | Timeline slips, launch delayed | Explicit non-goals in §2.3; architecture already CMS-ready, so deferral costs nothing. |
| R7 | Heavy imagery from the creative team | LCP and page-weight budget breach | Hard per-image budget (§15) enforced at content load in Phase 6; Cloudinary/`next/image` pipeline mandatory. |
| R8 | Content sign-off delayed | Launch blocked at the final gate | Content requirements issued at Phase 0, not Phase 6; a content checklist is shared with the business at kickoff. |
| R9 | Two audiences (small business + SaaS founder) dilute the message | Neither converts | Segmentation is carried by the pricing tiers and portfolio filters rather than by split messaging; hero stays capability-led. |
| R10 | **Brand perception gap** — Dhi Minds is known as a social media agency; the site claims development and SaaS capability | A prospect who checks the social profiles finds a mismatch and discounts the whole site | Portfolio must carry the claim (FR-BRD-05, FR-BRD-06). Social channels should begin showing build work before or at launch. Own the origin in About (FR-BRD-09) rather than concealing it. |
| R11 | **Existing brand mark may not survive the premium editorial direction** | A consumer-styled logo sitting in a studio-grade navbar undermines the first impression, which is the hardest thing to recover | Decision forced at Phase 1 exit (FR-BRD-08): refine the mark, or ship a restrained wordmark on the site while the fuller mark stays on social. Do not defer this to Phase 6. |
| R12 | Name literalism — "Golden" invites gold overuse | The palette tips from premium into gaudy, defeating §7 entirely | FR-BRD-01 raises the review bar; the ~3-per-viewport ceiling is checked at the Phase 2 design review, with the reviewer explicitly briefed on this risk. |

**Waiver log:** any requirement dropped must be recorded here with date, requester, reason, and accepted consequence. An empty log at launch is the expected outcome.

---

## 23. Future Scope (v2+)

Architecture must accommodate these without a redesign:

1. **Headless CMS** — swap `lib/content` for Sanity/Payload; components unchanged
2. **Blog / insights** — `/insights/[slug]`, MDX, `Article` schema, reuses `Section` and typography
3. **Service detail pages** — `/services/[slug]`, expanding the existing service data model
4. **Case-study video** — an additional media type in the gallery schema
5. **Client portal** — separate authenticated app on a subdomain
6. **Multi-currency / multi-region pricing** — the price object already supports currency
7. **Booking calendar** — an alternative to the form, as a second conversion path
8. **Localisation** — content modules are already keyed and separable
9. **CRM integration** — the inquiry webhook hook already exists (FR-API-09)
10. **A/B testing** on hero copy and pricing presentation

---

## Appendix A — Copy Deck (approved strings)

| Location | Copy |
|---|---|
| Nav CTA | Start a project |
| Hero H1 | We build digital experiences that move businesses forward. |
| Hero H1 (alt) | Build. Market. Grow. |
| Hero lede | We design and build high-performing websites, SaaS products, digital experiences, and growth strategies that help businesses stand out and scale. |
| Hero CTAs | Start your project · Explore our work |
| Trust heading | Trusted by businesses building what's next |
| Services heading | Everything you need to build and grow online. |
| About heading | We don't just make websites. We build digital businesses. |
| Portfolio heading | Selected work |
| Portfolio lede | A selection of websites, digital products, campaigns, and experiences we've built for ambitious businesses. |
| Process heading | From idea to impact. |
| Capabilities statement | From first idea to production-ready product, we bring strategy, design, development, and growth under one roof. |
| Pricing heading | Simple plans. Serious results. |
| Pricing custom band | Need something custom? Every business is different. Tell us what you're building and we'll create a tailored proposal. |
| Case study CTA | Have a similar challenge? → Let's talk |
| Final CTA heading | Have an idea? Let's build it. |
| Final CTA copy | Whether you're launching a new business, rebuilding your website, or creating your next digital product, let's turn your idea into something people remember. |
| Final CTA buttons | Start a project · Talk to us |
| Contact submit | Send project inquiry |
| Contact success | Inquiry sent. We'll reply within `{{RESPONSE_SLA}}`. |

---

## Appendix B — Configuration Values Required Before Launch

| Token | Description | Owner |
|---|---|---|
| `{{PRIMARY_LOCATION}}` | City/region for SEO and footer | Business |
| `{{DOMAIN}}` | Canonical domain (apex or www) — needed for canonicals, sitemap, OG URLs | Business |
| `{{CURRENCY}}` | Pricing currency (INR expected) | Business |
| `{{PRICE_STARTER}}` / `{{PRICE_GROWTH}}` / `{{PRICE_SCALE}}` | Tier amounts or explicit `null` | Business |
| `{{RESPONSE_SLA}}` | Stated reply window, e.g. "one business day" | Business |
| `{{RETENTION_PERIOD}}` | Inquiry data retention, default 24 months | Business |
| `{{CONTACT_EMAIL}}` / `{{CONTACT_PHONE}}` | Public contact details | Business |
| `{{SOCIAL_LINKS}}` | Live profile URLs only | Business |
| `{{GRIEVANCE_CONTACT}}` | Data-protection contact for DPDP/GDPR requests | Business |
| Logo, brand mark, favicon set | Vector source files | Business |
| Portfolio projects, images, permissions | Real work, with client consent | Business |
| Testimonials with written consent | Real quotes only | Business |

---

## Appendix C — Traceability: Master Prompt → PRD

| Master prompt § | Topic | Covered in |
|---|---|---|
| 1 | Project overview | §1, §3 |
| 2 | Brand positioning | §5, §5.4 |
| 3 | Visual identity (blue + gold) | §7.3, §7.4, NFR-DS-01 |
| 4 | Design direction | §7.1–§7.8, §21.2 |
| 5 | Website structure | §6.2 |
| 6 | Navigation | §8.1 |
| 7 | Hero | §8.2 |
| 8 | Trust / clients | §8.3, §19 |
| 9 | Services | §8.4 |
| 10 | About | §8.5 |
| 11 | Portfolio | §8.6 |
| 12 | Case study experience | §8.7 |
| 13 | Process | §8.8 |
| 14 | Pricing | §8.10 |
| 15 | Testimonials | §8.11 |
| 16 | Results / capabilities | §8.9 |
| 17 | FAQ | §8.12 |
| 18 | Final CTA | §8.13 |
| 19 | Contact | §8.14, §11 |
| 20 | Footer | §8.15 |
| 21 | Micro-interactions | §12 |
| 22 | Responsive design | §13 |
| 23 | SEO | §14 |
| 24 | Performance | §15 |
| 25 | Accessibility | §16 |
| 26 | Technical quality | §7.7, §10 |
| 27 | Content management | §9 |
| 28 | Brand personality | §5.3, §5.4, Appendix A |
| 29 | Visual details | §7.2, §7.4, §7.8 |
| 30 | Conversion strategy | §2, §8 CTAs, §17 |
| 31 | Content rules | §19 |
| 32 | Overall experience | §4, FR-IA-03, §21 |

---

*End of document. Version 1.1 — awaiting approval and the configuration values in Appendix B.*
