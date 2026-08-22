import type { Metadata } from "next";
import { locales, type Locale } from "./config";
import { BASE_URL, path, type Route } from "./routes";
import { getDict } from "./i18n";

type PageKey = keyof ReturnType<typeof getDict>["pages"];

/**
 * Canonical + hreflang + OG for one route in one locale. Every page gets its
 * own title, description and social card — that is the whole point of giving
 * each section a URL.
 */
export function pageMeta(locale: Locale, route: Route, key: PageKey, image?: string): Metadata {
  const dict = getDict(locale);
  const page = dict.pages[key];
  const url = `${BASE_URL}${path(locale, route)}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${BASE_URL}${path(l, route)}`]),
  );
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url, languages: { ...languages, "x-default": `${BASE_URL}${path("en", route)}` } },
    openGraph: {
      type: "website",
      url,
      siteName: "clocoffee",
      title: page.title,
      description: page.description,
      locale,
      images: [{ url: image ?? "/media/posters/hero.webp", width: 576, height: 1024 }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}
