# clocoffee

Website for CloCoffee — a coffee shop known for three hand-painted can-shaped tumblers.

**Status:** built, placeholder content. The full site exists and builds statically — three locales
(EN / AR-RTL / FR), all eight sections from the plan. What blocks launch is content, not code: the real
menu, prices, WhatsApp number, hours, address, and shop photos (see `lib/config.ts` and `lib/menu.ts`,
every placeholder is marked).

```
npm install && npm run dev     # local dev
npm run build                  # static production build
```

## Where things stand

The plan of record is [`docs/site-plan.md`](docs/site-plan.md); the visual identity is inventoried in
[`docs/brand.md`](docs/brand.md). It covers the creative concept
("three cups, three worlds"), the section-by-section interaction spec, the asset manifest and where each asset
comes from, the stack, a hard performance budget, and a three-week time-box.

Read the **Open items** table at the end of that document first. Several of them — the menu and prices, the
WhatsApp number, real photos of the shop — are blockers for Week 1, and none of them are code.

Source media lives in [`assets/`](assets/) — two videos, five identity stills, three per-cup pour clips and
their posters. The three painted cups are confirmed real; the palette in `docs/brand.md` is sampled from those
files, not estimated.

## Stack as built

Next.js 15 App Router, TypeScript, Tailwind 4, GSAP ScrollTrigger + Lenis (both dynamically imported —
first-load JS is 114 kB against the 200 kB budget). Menu data is a typed in-repo file (`lib/menu.ts`);
moving it to Supabase later is a data-layer swap, not a redesign. Media currently ships from `/public`
(5.3 MB); the plan's R2 move is a `MEDIA_BASE` change in `lib/config.ts`.

## Ground rules carried into the build

- Higgsfield generates pixels, not components. The interactive layer is code.
- Colour comes from `docs/brand.md`, which is sampled from the committed assets. Never re-pick by eye.
- Spend credits only on what a camera cannot do. Shoot the cups and the interior for real.
- LCP under 2.5 s on a mid-range Android over 4G; first-load JS under 200 KB gzipped; Lighthouse mobile 90+.
- Every motion effect degrades to a static poster under `prefers-reduced-motion`.
- One KPI: completed WhatsApp handoffs from the drink builder.
