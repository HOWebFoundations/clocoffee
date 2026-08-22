import { shop, type Locale } from "./config";

/** ar uses Latin digits (Lebanese convention); fr-LB CLDR renders LBP as "\u00a3LB", which reads as
    sterling \u2014 currencyDisplay:"code" sidesteps both problems consistently. */
const tag = (l: Locale) => (l === "ar" ? "ar-LB-u-nu-latn" : l === "fr" ? "fr-LB" : "en-LB");

/** Format a USD price as "X.XX USD · Y,000 LBP" pair. LBP rounded to 1,000s. */
export function priceUsd(usd: number, locale: Locale): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "currency", currency: "USD", minimumFractionDigits: usd % 1 ? 2 : 0,
  }).format(usd);
}

export function priceLbp(usd: number, locale: Locale): string {
  const lbp = Math.round((usd * shop.lbpPerUsd) / 1000) * 1000;
  return new Intl.NumberFormat(tag(locale), {
    style: "currency", currency: "LBP", currencyDisplay: "code", maximumFractionDigits: 0,
  }).format(lbp);
}
