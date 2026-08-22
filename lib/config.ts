/**
 * Single source of truth for shop content.
 * ── PLACEHOLDER ── every value marked below is invented and must be replaced
 * with Chloe's real content before launch. Swapping them is the whole job.
 */

export const MEDIA_BASE = ""; // set to the R2 public URL before launch, e.g. "https://media.clocoffee.com"

/** Every media path in components goes through this so the R2 move is one constant. */
export const media = (path: string) => `${MEDIA_BASE}${path}`;

export const shop = {
  name: "clocoffee",
  /** PLACEHOLDER — real WhatsApp order number, international format, digits only */
  whatsapp: "9613000000",
  /** PLACEHOLDER — real street address */
  address: { en: "Main Street, Beirut, Lebanon", ar: "الشارع الرئيسي، بيروت، لبنان", fr: "Rue principale, Beyrouth, Liban" },
  /** PLACEHOLDER — real map query for the embed + directions link */
  mapQuery: "clocoffee Beirut Lebanon",
  /** PLACEHOLDER — real Instagram handle */
  instagram: "clocoffee",
  timezone: "Asia/Beirut",
  /** PLACEHOLDER — real opening hours, 24h clock, null = closed. 0 = Sunday. */
  hours: [
    { open: "09:00", close: "20:00" }, // Sun
    { open: "07:30", close: "20:00" }, // Mon
    { open: "07:30", close: "20:00" }, // Tue
    { open: "07:30", close: "20:00" }, // Wed
    { open: "07:30", close: "20:00" }, // Thu
    { open: "07:30", close: "22:00" }, // Fri
    { open: "09:00", close: "22:00" }, // Sat
  ] as ({ open: string; close: string } | null)[],
  /** PLACEHOLDER — LBP per 1 USD; update when the rate moves */
  lbpPerUsd: 89500,
} as const;

export const locales = ["en", "ar", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const rtlLocales: Locale[] = ["ar"];

/** The three painted cups and their sampled world colours (docs/brand.md §3). */
export const cups = [
  {
    id: "iris",
    world: { deep: "#001437", light: "#83B5EC", tint: "#12325E" },
    /** iris world is a steep gradient — text needs the scrim (brand.md §4) */
    textOnWorld: "light" as const,
    video: "/media/video/iris.mp4",
    poster: "/media/posters/iris",
  },
  {
    id: "blossom",
    world: { deep: "#E2A8B3", light: "#F0BBC3", tint: "#E2A8B3" },
    textOnWorld: "dark" as const,
    video: "/media/video/blossom.mp4",
    poster: "/media/posters/blossom",
  },
  {
    id: "ditsy",
    /** tint lightened to #B695C8 so espresso text clears AA (5.55:1) — brand.md §4 */
    world: { deep: "#8C7EA8", light: "#B08AC2", tint: "#B695C8" },
    textOnWorld: "dark" as const,
    video: "/media/video/ditsy.mp4",
    poster: "/media/posters/ditsy",
  },
] as const;
export type CupId = (typeof cups)[number]["id"];
