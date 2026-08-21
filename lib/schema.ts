import { shop } from "./config";
import { menu } from "./menu";
import type { Locale } from "./config";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** CafeOrCoffeeShop + Menu JSON-LD (site-plan §7). */
export function shopJsonLd(locale: Locale, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: shop.name,
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}/media/posters/hero.webp`,
    address: { "@type": "PostalAddress", streetAddress: shop.address[locale], addressCountry: "LB" },
    servesCuisine: "Coffee",
    currenciesAccepted: "USD, LBP",
    paymentAccepted: "Cash",
    openingHoursSpecification: shop.hours.flatMap((h, i) =>
      h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: DAY[i], opens: h.open, closes: h.close }] : [],
    ),
    hasMenu: {
      "@type": "Menu",
      hasMenuItem: menu.map((m) => ({
        "@type": "MenuItem",
        name: m.name[locale],
        offers: { "@type": "Offer", price: m.usd.toFixed(2), priceCurrency: "USD" },
      })),
    },
  };
}
