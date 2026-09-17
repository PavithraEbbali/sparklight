# Sparklight — Authorized Retailer Landing Site

A single-page, statically rendered marketing site for an independent
authorized retailer of Sparklight.

Front-end only by design: there is no backend, no API route and no database.
The ZIP field validates format and hands the visitor to a phone call; it does
not claim to query a coverage database.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Animation | `motion` (Framer Motion v12 successor) |
| Smooth scroll | `lenis` |
| Images | `next/image`, WebP sources |

`/` is prerendered as static content.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint
```

---

## Deploying to Vercel

Import the repository and deploy — no configuration required. Vercel detects
Next.js, and there are **no environment variables** to set. The defaults are
correct:

- Framework preset: **Next.js**
- Build command: `next build`
- Output directory: `.next`
- Install command: `npm install`

---

## Editing content

**`lib/content.ts` is the single source of truth.** Every price, speed,
promotional qualifier, equipment fee, feature bullet, FAQ answer, image path
and legal disclosure on the site is exported from that one file. No layout
file contains a hard-coded price or image path.

Changing a value there cascades automatically to every plan card, the hero
offer, the comparison grid, the footer summary and the SEO metadata.

### Two placeholders to replace before launch

| What | Where | Note |
| --- | --- | --- |
| Phone number | `PHONE` in `lib/content.ts` | Currently `(888) 555-0142`, in the reserved fictional `555-01xx` range so nothing real is dialled. Replace `display` **and** `href` together. |
| Legal links | `FOOTER_COLUMNS` → Legal | Point at real policy pages; they are `#legal-*` anchors today. |

`RETAILER.name` drives the wordmark, `<title>`, meta description and the
legal disclosure, so renaming is a one-line change.

### Adding or removing a plan

Add a `PlanItem` to `PLANS`. It appears automatically in its service line's
section. A service line with no plans is dropped from the page entirely —
`ACTIVE_SECTIONS` filters it out, so there are never empty sections or
placeholder cards.

CTA wording is decided in one place, `ctaLabel()`: a plan with a published
`price` reads **"Call to order"**, one without reads **"Call for pricing"**.

### Images

Sources live in `public/images`, referenced through `IMAGES` in
`lib/content.ts`. A section's photograph is placed by `imageMode`:

| Mode | Behaviour |
| --- | --- |
| `side` | 16:10 frame beside the heading; the side alternates automatically |
| `background` | full-bleed behind the section, under a gradient wash |
| `card` | becomes the plan card's own header image, card centred |

---

## Conventions worth knowing

- **Every `tel:` link carries `data-call-cta`** for call tracking. They are
  all produced by `components/CallButton.tsx`, the header or the footer, so
  the attribute cannot be forgotten.
- **The raw phone number is only ever the button label in the header and
  footer.** Everywhere else the CTA reads "Call to order" or
  "Call for pricing".
- **No horizontal overflow at any width down to 320px.** Verified by a DOM
  sweep, not by eye.
- **Contrast is measured, not assumed.** Where type sits over a photograph or
  a coloured wash, the composite was computed against the darkest region of
  the image. Figures are recorded in `ai.wing`.
- **`prefers-reduced-motion` is honoured in every animation primitive** —
  Lenis does not initialise, the marquee stops, and each wrapper renders a
  plain element.

---

## `ai.wing`

A running engineering log in the repository root: every significant
structural change and architectural decision, why it was made, what was
measured, and the bugs found along the way. Read it before making changes to
the hero, the imagery or the contrast handling — several of the decisions
there are not obvious and were arrived at by measurement.
