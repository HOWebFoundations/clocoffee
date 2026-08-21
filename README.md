# clocoffee

Website for CloCoffee — a coffee shop known for three hand-painted can-shaped tumblers.

**Status:** planning. No application code yet.

## Where things stand

The plan of record is [`docs/site-plan.md`](docs/site-plan.md). It covers the creative concept
("three cups, three worlds"), the section-by-section interaction spec, the asset manifest and where each asset
comes from, the stack, a hard performance budget, and a three-week time-box.

Read the **Open items** table at the end of that document first. Several of them — the menu and prices, the
WhatsApp number, real photos of the shop — are blockers for Week 1, and none of them are code.

## Intended stack

Next.js App Router on Vercel, TypeScript, Tailwind, Motion + GSAP ScrollTrigger + Lenis for the scroll work,
Supabase for menu data. Video and frame sequences on Cloudflare R2, never in the Vercel bundle.

## Ground rules carried into the build

- Higgsfield generates pixels, not components. The interactive layer is code.
- Spend credits only on what a camera cannot do. Shoot the cups and the interior for real.
- LCP under 2.5 s on a mid-range Android over 4G; first-load JS under 200 KB gzipped; Lighthouse mobile 90+.
- Every motion effect degrades to a static poster under `prefers-reduced-motion`.
- One KPI: completed WhatsApp handoffs from the drink builder.
