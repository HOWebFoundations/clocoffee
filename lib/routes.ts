import type { Locale } from "./config";

/**
 * Every section is its own URL. Slugs stay English across all three locales:
 * a Beirut customer pastes these into WhatsApp constantly, and percent-encoded
 * Arabic slugs turn into unreadable %D8%A7 soup when they do.
 */
export const routes = ["", "cups", "build", "menu", "verdict", "visit"] as const;
export type Route = (typeof routes)[number];

/** Absolute in-app path for a route in a locale. */
export const path = (locale: Locale, route: Route = "", sub?: string) =>
  `/${locale}${route ? `/${route}` : ""}${sub ? `/${sub}` : ""}`;

/** The nav shown in the header and footer, in order. */
export const navRoutes: Route[] = ["cups", "build", "menu", "verdict", "visit"];

/** PLACEHOLDER — domain undecided (site-plan §9). Also used for canonical + OG. */
export const BASE_URL = "https://clocoffee.vercel.app";
