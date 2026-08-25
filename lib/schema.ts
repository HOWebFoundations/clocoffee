import { shop } from "./config";
import type { Locale } from "./config";

/**
 * clocoffee has no premises, so this is deliberately NOT CafeOrCoffeeShop /
 * LocalBusiness schema — that would assert an address, hours and orderability
 * that do not exist, and Google would surface them. Brand schema only.
 */
export function shopJsonLd(locale: Locale, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: shop.name,
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/media/posters/wordmark-espresso.webp`,
    image: `${baseUrl}/media/posters/hero.webp`,
    sameAs: [`https://instagram.com/${shop.instagram}`],
  };
}
