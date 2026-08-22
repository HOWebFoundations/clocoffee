import type { MetadataRoute } from "next";
import { cups, locales } from "@/lib/config";
import { BASE_URL, navRoutes, path } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    entries.push({ url: `${BASE_URL}${path(locale)}`, changeFrequency: "weekly", priority: locale === "en" ? 1 : 0.9 });
    for (const route of navRoutes) {
      entries.push({
        url: `${BASE_URL}${path(locale, route)}`,
        changeFrequency: route === "menu" ? "weekly" : "monthly",
        priority: route === "menu" || route === "visit" ? 0.9 : 0.7,
      });
    }
    for (const cup of cups) {
      entries.push({ url: `${BASE_URL}${path(locale, "cups", cup.id)}`, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return entries;
}
