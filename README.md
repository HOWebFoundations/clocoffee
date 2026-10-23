# clocoffee

Website for clocoffee — a Beirut coffee brand built around three hand-painted glasses. A brand and a
concept, not a café: there are no premises and nothing is for sale. The site exists to make the idea
credible.

```
npm install && npm run dev     # local dev
npm run build                  # static production build (every page prerendered, three locales)
```

## What the site is

A gallery, not a storefront. Six pages, each with its own URL in EN, AR (RTL) and FR:

| Page | Route | What it does |
|---|---|---|
| Home | `/` | The scroll-driven pour. The headline is hidden until the glass is full. Teasers for the glasses, the drink maker, the lookbook, Instagram. |
| The glasses | `/cups`, `/cups/{iris,blossom,ditsy}` | One page per painted glass, each in its own world colour. Artwork, not merchandise. |
| Make a drink | `/order` | A menu you play with: hot or iced, coffee or matcha, milk, sweetness, syrup, topping, world. The glass builds live. No prices, no cart, no form — the payoff is an Instagram story card. |
| Lookbook | `/lookbook` | Everything the brand looks like, grouped: the mark, the glasses, the world, the place. |
| Menu | `/menu` | The intended menu with indicative prices in USD and LBP. States plainly that there is no café to order from yet. |
| About | `/about` | Chloe, the painting, the name. |
| Visit | `/visit` | No café yet: a waiting list (WhatsApp, email fallback), a contact route for partners and press, the artwork note, the Instagram grid. |

Nav is a single "Index" button opening an overlay. Motion is gentle fades only; the pour scrub lives on
the homepage alone.

## Decisions that are settled

Recorded in [`docs/brand.md`](docs/brand.md) — read its preamble before changing content:

- The painted glasses are artwork. They are never sold, and drinks are not served in them.
- Imagery is AI-generated from real objects; the decision not to disclose that is Habib's and is closed.
- The menu is an intended menu; prices are indicative.
- Credit HOWF with a link to thehowf.com (footer).

## Placeholders still to fill

Every placeholder is marked `PLACEHOLDER` in `lib/config.ts`: the Instagram handle, the contact email,
the WhatsApp number, the LBP rate. The Instagram grid (`components/ui/Lately.tsx`) is curated from
`shop.instagramTiles` — Instagram no longer offers a public feed API, so it is a hand-picked set of tiles
that link to the profile.

## Stack as built

Next.js 15 App Router, TypeScript, Tailwind 4, static prerender for every locale and page. No animation
library: the hero scrub is a canvas frame sequence, reveals are an IntersectionObserver and a CSS
transition. Fonts via `next/font` (Fraunces, Nunito, Amiri, IBM Plex Sans Arabic). The live glass in the
drink maker is an SVG component under `components/order/glass/`; the story card is drawn to a canvas
(`components/order/StoryCard.ts`) at 1080×1920 and handed to the Web Share API, falling back to a
download.

Deployed on Vercel (project `clocoffee`). The team uses SAML SSO, so the Vercel CLI cannot deploy with a
team-scoped token; deploys go through the REST API with a token pasted at deploy time. No token is
stored in the repo.

## Ground rules carried into the build

- Colour comes from `docs/brand.md`, which is sampled from the committed assets. Never re-pick by eye.
- Nothing on the site may assert an address, opening hours, stock or orderability.
- Every motion effect degrades to a static image under `prefers-reduced-motion`.
- Keep the first-load JS small: the heaviest page is the drink maker, and it ships no library.
