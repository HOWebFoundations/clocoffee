import type { MetadataRoute } from "next";
import { locales } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({ url: `https://clocoffee.com/${l}`, changeFrequency: "weekly", priority: l === "en" ? 1 : 0.8 }));
}
