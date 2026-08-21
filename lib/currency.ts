import { shop, type Locale } from "./config";

/** Format a USD price as "X.XX USD · Y,000 LBP" pair. LBP rounded to 1,000s. */
export function priceUsd(usd: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-LB" : locale === "fr" ? "fr-LB" : "en-LB", {
    style: "currency", currency: "USD", minimumFractionDigits: usd % 1 ? 2 : 0,
  }).format(usd);
}

export function priceLbp(usd: number, locale: Locale): string {
  const lbp = Math.round((usd * shop.lbpPerUsd) / 1000) * 1000;
  return new Intl.NumberFormat(locale === "ar" ? "ar-LB" : locale === "fr" ? "fr-LB" : "en-LB", {
    style: "currency", currency: "LBP", maximumFractionDigits: 0,
  }).format(lbp);
}
