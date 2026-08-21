# CloCoffee — Brand asset inventory

**Date:** 2026-08-21
**Source:** five images supplied by Habib, reviewed visually in-session.

> **Caveat on this whole document.** The images were pasted into a chat session, not committed as
> files. Nothing here was sampled from source pixels — every hex value is eyeballed from a rendered
> screenshot and carries an error margin of several points per channel. Treat this as a working
> reference, not a spec. **Before any of it reaches code, drop the original files into
> `assets/brand/` and re-sample.**

---

## 1. What was supplied

| # | Asset | What it is | Usable as |
|---|---|---|---|
| 1 | Cup mockup | Clear can-shaped tumbler, bamboo lid, bent glass straw, cream seamless backdrop. Wordmark applied flat to the glass face | Product shot, OG image, builder preview |
| 2 | Storefront A | Recessed entry, two corner-wrapped display windows, large flat sign panel, oak interior, banquette seating | Concept render — see §4 |
| 3 | Wordmark on espresso | Cream lettering on dark brown field, bloom replacing the first `o` | Primary lockup, dark surfaces |
| 4 | Bloom, isolated | The watercolor flower centered on a cream circle | Favicon source, transition motif, loading state |
| 5 | Storefront B | Projecting sign box, three-bay flush facade, different plants and furniture | Concept render — see §4 |

---

## 2. Palette as it actually appears

The identity is narrower than the site plan assumed. It is **two colors and one accent**, not three
color worlds.

| Role | Approx. hex | Where it appears |
|---|---|---|
| Cream (ground) | `#EFE8D9` | Backdrops in 1, 2, 4, 5; lettering in 3 |
| Espresso (ink) | `#3B2B22` | Wordmark in 1, 2, 5; field in 3 |
| Bloom violet, deep | `#5C63A8` | Petal cores |
| Bloom violet, mid | `#7E85C4` | Petal bodies |
| Bloom blush | `#E9BCC6` | Petal edges, lower-right petals |

### Contrast, computed from the values above

| Pair | Ratio | Body text |
|---|---|---|
| Espresso on cream | 11.07:1 | AAA |
| Cream on espresso | 11.07:1 | AAA |
| Deep violet on cream | 4.52:1 | AA (only just — do not let it drift lighter) |
| Mid violet on cream | 2.85:1 | **fails** |
| Blush on cream | 1.38:1 | **fails badly** |
| Blush on espresso | 8.02:1 | AAA |
| Mid violet on espresso | 3.88:1 | large text only |

**What this means for the build.** The core pair is exceptionally strong — 11:1 in both directions,
which is rare in a warm palette and means the site can run espresso-on-cream everywhere with no
accessibility tension at all. The earlier worry in the site plan (that blush and violet would repeat
the brass-gold trap from thehowf.com) holds for cream grounds and is *inverted* on espresso: blush on
dark brown is one of the strongest pairs available. So an espresso section with blush display type is
on the table; a cream section with blush type is not.

Deep violet at 4.52:1 clears AA by 0.02. That is not a margin — it is a rounding error. Use it for
links and small accents only if the exact value is confirmed from source, and never lighten it.

---

## 3. The wordmark

Lowercase `clocoffee`, geometric rounded sans, single weight, generous letter-spacing. The bloom
replaces the first `o` — it does not sit beside the word or above it. Notable properties:

- The bloom is **wider than the letter it replaces**, so the lockup has an asymmetric optical center.
  Anything that centers the wordmark by bounding box will look off; center it by optical weight.
- There is no separate icon in the supplied set other than the isolated bloom (image 4). That bloom
  is the mark. It should carry favicon, app icon, and the transition motif.
- The lettering is raster in every supplied asset. It still needs vectorizing before signage, print,
  or a crisp favicon — that item from the site plan is unchanged and unstarted.

---

## 4. The two storefronts are not the same building

Image 2 and image 5 show materially different architecture: 2 has a recessed entry with corner-wrapped
glazing and a flat sign panel flush to the facade; 5 has a flush three-bay frontage with a projecting
sign box. Window proportions, door placement, interior layout, and furniture all differ. One building
cannot be both.

So these are **concept renders, not documentation of a real shop.** That is fine — they are useful for
showing Chloe a direction, and the sign mockup proves the wordmark reads at architectural scale. But
they cannot be used as the "the shop" section of the website. Section 6 of the site plan calls for real
interior photos, a map, and directions; a render of a building that does not exist would be the exact
failure mode the plan was written to avoid, and locals would clock it immediately.

**Treat images 2 and 5 as brand presentation only. Do not ship them.**

---

## 5. The gap that matters: there are no painted cups here

The site plan's entire creative spine is *"three cups, three worlds"* — Van Gogh irises with vines and
lemons, a cherry-blossom branch, and multicolor ditsy flowers, each owning a color world that takes
over the screen.

**None of the five supplied images shows a painted cup.** Image 1 is an undecorated clear tumbler
carrying only the wordmark. The palette across all five assets is cream, espresso, and one blue-violet
bloom — there is no iris green, no lemon yellow, no magenta, no multicolor anywhere in the set.

Two readings, and they lead to very different websites:

**(a) The painted cups exist, these just aren't their photos.** The five images are the identity
package — logo, mockup, signage — and the July product stills of the three painted cups are a separate
set that was not sent. In that case the site plan stands as written and this document is just the
brand layer underneath it.

**(b) The identity moved to minimal single-cup.** The painted cups were an earlier direction,
superseded by this restrained cream-and-espresso system with one bloom. In that case sections 4 and 5
of the site plan need rewriting: no cup worlds, no per-cup color takeover, no three-way selector in the
drink builder, and the whole interaction concept needs a new spine — probably built on the bloom as the
single recurring motif rather than on cup variety.

This is the one open question that changes the shape of the build, and it is unresolved. Everything in
the site plan downstream of "three cups" is provisional until it is answered.

---

## 6. What to do next with these assets

1. Commit the five originals to `assets/brand/` at full resolution. They exist only in a chat
   transcript right now, which is not storage.
2. Re-sample the palette from the source files and correct §2. The build should not inherit eyeballed
   values.
3. Vectorize the wordmark lettering; keep the bloom as an alpha PNG at 2× the largest rendered size.
4. Cut the bloom out of image 4 against transparency — it is currently on an opaque cream circle, which
   will not composite over espresso sections.
5. Answer §5.
