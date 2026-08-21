# CloCoffee — Brand and media reference

**Date:** 2026-08-21
**Source:** five identity stills and two videos, supplied by Habib and committed under `assets/`.
**Method:** every colour below was sampled from the committed files with Pillow (median of a masked
region, not a spot pick). The earlier eyeballed values have been discarded — see §7 for what changed.

---

## 1. Inventory

### Identity stills — `assets/brand/`

| File | What it is | Ships? |
|---|---|---|
| `wordmark-espresso.jpg` | Cream lettering on dark brown field, bloom replacing the first `o` | yes |
| `bloom.jpg` | The watercolor flower on an opaque cream circle | yes, once cut to alpha |
| `cup-plain-mockup.jpg` | Undecorated tumbler, bamboo lid, glass straw, wordmark on the face | yes |
| `storefront-render-a.jpg` | Recessed entry, corner-wrapped glazing, flat sign panel | **no** — §6 |
| `storefront-render-b.jpg` | Flush three-bay frontage, projecting sign box | **no** — §6 |

### Video — `assets/video/`

| File | Spec | Contents |
|---|---|---|
| `source/three-cup-reel.mp4` | 576×1024, 23.94 fps, 23.29 s, H.264 baseline, AAC | All three painted cups, one pour each, cross-faded |
| `source/hero-swirl.mp4` | 576×1024, 24 fps, 15.04 s, H.264 baseline, AAC | Plain branded tumbler on cream, silk ribbon orbit, fills with coffee |
| `cups/iris.mp4` | 4.5 s, silent | Cut from the reel, cross-fades removed |
| `cups/blossom.mp4` | 5.6 s, silent | ” |
| `cups/ditsy.mp4` | 4.9 s, silent | ” |

Posters in `assets/posters/` — `iris`, `blossom`, `ditsy`, `hero`.

**Both source videos are 576×1024.** That is below 720p and it is the ceiling on everything downstream:
upscaling is the only way to a crisp desktop hero, and on a 2× phone the current files are already at
native density with nothing spare. Plan around it (§8).

---

## 2. The three cups exist — confirmed

This settles the question that was blocking the plan. The reel shows all three, exactly as the plan
described them:

| Cup | Painting | World | Pour |
|---|---|---|---|
| **Iris** | Blue irises, green vines, yellow lemons, white dots | Deep navy, strong vertical gradient | Coffee |
| **Blossom** | Cherry-blossom branch, pink and white flowers, jewelled centres | Flat blush pink | Matcha |
| **Ditsy** | Scattered multicolour flowers, yellow centres | Lavender-violet, gradient | Coffee |

"Three cups, three worlds" is real product, not a concept. Sections 3–5 of the site plan are no longer
provisional.

---

## 3. Palette, sampled

### Core

| Role | Hex | Sampled from |
|---|---|---|
| Espresso (ink) | `#392618` | Wordmark field, 1.25 M px |
| Cream ink | `#EEE0C6` | Wordmark lettering, 50 k px |
| Cream ground | `#EFE6D4` | Bloom circle |
| Paper (lightest) | `#FDFAEE` | Bloom surround |

### Bloom accents

| Role | Hex |
|---|---|
| Violet, deepest | `#6F759A` |
| Violet, mid | `#9B9DB7` |
| Blush | `#D5BEC0` |

The bloom is **considerably more muted than it looks** — it reads as a saturated violet-and-pink flower
but samples out close to dusty grey-violet. Anything picked by eye from a screenshot will come out too
saturated and will not match the asset when placed beside it.

### Cup worlds

| World | Hex | Note |
|---|---|---|
| Iris, deep | `#001437` | Near-black navy |
| Iris, light | `#83B5EC` | Bottom of the gradient |
| Blossom | `#E2A8B3` | Near-flat across the frame |
| Ditsy, mid | `#B08AC2` | |
| Ditsy, deep | `#8C7EA8` | |

---

## 4. Contrast

Computed from the sampled values above.

| Pair | Ratio | Body text |
|---|---|---|
| Espresso on paper | 13.72:1 | AAA |
| Espresso on cream | 11.57:1 | AAA |
| Cream ink on espresso | 11.00:1 | AAA |
| Cream ink on iris-deep | 13.95:1 | AAA |
| Espresso on blossom | 7.06:1 | AAA |
| Espresso on iris-light | 6.68:1 | AA |
| Blush on espresso | 8.16:1 | AAA |
| Violet-mid on espresso | 5.39:1 | AA |
| Espresso on ditsy-mid | 4.96:1 | AA |
| Espresso on ditsy-deep | 3.87:1 | large only |
| **Violet-deep on cream** | **3.61:1** | **large only — fails AA** |
| Violet-deep on espresso | 3.20:1 | large only |
| Cream ink on ditsy-mid | 2.22:1 | fails |
| Violet-mid on cream | 2.14:1 | fails |
| Cream ink on blossom | 1.56:1 | fails |
| Blush on cream | 1.42:1 | fails |
| Cream ink on iris-light | 1.65:1 | fails |

### Reading it

**The core pair carries the site.** Espresso on cream at 11.57:1 is exceptional for a warm palette —
run it everywhere without a second thought.

**Every cup world takes espresso text, except one.** Blossom (7.06) and iris-light (6.68) are
comfortable; ditsy-mid (4.96) passes AA but has no headroom, and ditsy-deep (3.87) does not pass at all.
The ditsy world is the constrained one — give it espresso text at large sizes only, or darken the
backdrop behind any small text.

**The iris world cannot use one text colour.** It is a steep vertical gradient: cream ink is 13.95:1 at
the top and 1.65:1 at the bottom; espresso is the exact inverse. Text must either be pinned to one band
of the gradient or sit on its own scrim. This is the single most likely place to ship an unreadable
headline.

**Blush inverts.** It fails on cream (1.42) and is AAA on espresso (8.16). Blush display type belongs on
dark sections only.

---

## 5. The wordmark

Lowercase `clocoffee`, geometric rounded sans, single weight, generous tracking. The bloom replaces the
first `o` rather than sitting beside the word.

- The bloom is **wider than the letter it replaces**, so the lockup's optical centre is left of its
  bounding-box centre. Centring by bounding box will look wrong.
- The isolated bloom is the only icon in the set. It carries favicon, app icon, and the transition motif.
- Everything is raster. Vectorizing the lettering is still open, and still required before signage,
  print, or a crisp favicon.
- `bloom.jpg` sits on an **opaque** cream circle. It must be cut to transparency or it cannot composite
  over espresso sections or cup worlds.

---

## 6. The storefronts are renders, not the shop

`storefront-render-a` and `-b` show different buildings: different glazing, entry treatment, sign
mounting, interior layout, and furniture. One building cannot be both.

They are useful — the sign mockup proves the wordmark reads at architectural scale, and they give Chloe
a direction. But they cannot back the "the shop" section, which needs real interior photos, a map, and
directions. Shipping a render of a building that does not exist is the failure mode the plan was written
to avoid.

**Presentation only. Do not ship.**

---

## 7. Corrections to the earlier eyeballed pass

| Claim | Then | Now | Consequence |
|---|---|---|---|
| Deep violet on cream | 4.52:1, "clears AA by 0.02" | **3.61:1, fails AA** | Do not use it for links or small text on cream. This one changes code. |
| Espresso | `#3B2B22` | `#392618` | Warmer and darker than eyeballed |
| Blush | `#E9BCC6` | `#D5BEC0` | Eyeballed value was much too saturated |
| Violet, mid | `#7E85C4` | `#9B9DB7` | Same — too saturated, too blue |
| "No painted cup in the assets" | true of the stills | **false overall** — the reel has all three | The plan's spine is intact |

---

## 8. Next actions on these assets

1. **Cut the bloom to alpha.** Blocking for transitions and any dark-section placement.
2. **Vectorize the wordmark lettering.** Blocking for favicon, signage, print.
3. **Decide the resolution path.** 576×1024 is the ceiling. Either upscale the two source videos to 2K
   (the plan already budgets credits for this) or shoot the pours again on a phone — modern phones
   record 4K, and these are three cups on coloured card, which is a reproducible setup.
4. **Re-encode for delivery.** The sources are H.264 baseline; the site should serve per-cup clips as
   WebM/VP9 or AV1 with the H.264 as fallback, on R2.
5. **Keep the cross-fades out.** See §9.

---

## 9. Cut points in the reel

Background sampled at 4 fps across all 93 frames:

| From | To | Content |
|---|---|---|
| 0.0 s | 5.0 s | **Iris**, `#00153A` |
| 5.0 s | 9.0 s | cross-fade through `#3E2C38`, `#5D3C4B`, `#7B4B5B`, `#98626E` |
| 9.0 s | 15.0 s | **Blossom**, `#E2A8B3` |
| 15.0 s | 18.0 s | cross-fade through `#C395BC`, `#A586C2` |
| 18.0 s | 23.3 s | **Ditsy**, `#8C7EA9` → `#A898C8` |

**Roughly 7 of the 23 seconds — 30% — is cross-fade**, and the in-between colours (`#5D3C4B`,
`#7B4B5B`) belong to no brand world; they are mud. Serving the reel whole would spend nearly a third of
its bytes on transitions the site should be doing itself, in CSS, where they are free and reversible on
scroll. The committed per-cup clips are cut inside the stable segments for exactly this reason.

The ditsy segment also drifts `#8C7EA9` → `#A898C8` across its five seconds. If the page tints to a
world colour, tint to the segment's midpoint or the tint will visibly disagree with the video.
