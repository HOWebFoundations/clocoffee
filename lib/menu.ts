import type { Locale } from "./config";

/**
 * ── PLACEHOLDER MENU ── invented by the developer; every item, price and
 * description must be replaced with Chloe's real menu before launch.
 * Prices are authored in USD; LBP is computed from shop.lbpPerUsd.
 */

export type Category = "coffee" | "iced" | "matcha" | "sweets";

export interface MenuItem {
  id: string;
  category: Category;
  name: Record<Locale, string>;
  note?: Record<Locale, string>;
  usd: number;
  popular?: boolean;
}

export const menu: MenuItem[] = [
  { id: "espresso", category: "coffee", usd: 2.5,
    name: { en: "Espresso", ar: "إسبريسو", fr: "Espresso" } },
  { id: "double-espresso", category: "coffee", usd: 3.5,
    name: { en: "Double espresso", ar: "إسبريسو مزدوج", fr: "Double espresso" } },
  { id: "cappuccino", category: "coffee", usd: 4,
    name: { en: "Cappuccino", ar: "كابتشينو", fr: "Cappuccino" } },
  { id: "latte", category: "coffee", usd: 4.5, popular: true,
    name: { en: "Latte", ar: "لاتيه", fr: "Latte" },
    note: { en: "Served in a painted cup if you're staying", ar: "يُقدَّم في كوب مرسوم إذا كنت باقيًا", fr: "Servi dans une tasse peinte si vous restez" } },
  { id: "flat-white", category: "coffee", usd: 4.5,
    name: { en: "Flat white", ar: "فلات وايت", fr: "Flat white" } },
  { id: "turkish", category: "coffee", usd: 3,
    name: { en: "Lebanese coffee", ar: "قهوة لبنانية", fr: "Café libanais" } },
  { id: "iced-latte", category: "iced", usd: 5, popular: true,
    name: { en: "Iced latte", ar: "لاتيه مثلّج", fr: "Latte glacé" } },
  { id: "iced-americano", category: "iced", usd: 4,
    name: { en: "Iced americano", ar: "أمريكانو مثلّج", fr: "Americano glacé" } },
  { id: "cold-brew", category: "iced", usd: 5.5,
    name: { en: "Cold brew", ar: "كولد برو", fr: "Cold brew" } },
  { id: "matcha-latte", category: "matcha", usd: 5.5, popular: true,
    name: { en: "Matcha latte", ar: "ماتشا لاتيه", fr: "Matcha latte" },
    note: { en: "The blossom cup's drink", ar: "مشروب كوب الكرز", fr: "La boisson de la tasse cerisier" } },
  { id: "iced-matcha", category: "matcha", usd: 6,
    name: { en: "Iced matcha", ar: "ماتشا مثلّجة", fr: "Matcha glacé" } },
  { id: "cookie", category: "sweets", usd: 3,
    name: { en: "Brown-butter cookie", ar: "كوكيز بالزبدة البنية", fr: "Cookie au beurre noisette" } },
  { id: "knefe-cup", category: "sweets", usd: 4.5,
    name: { en: "Knefeh cup", ar: "كنافة بالكوب", fr: "Knefeh en tasse" } },
];

/** Drink-builder pricing. PLACEHOLDER values. */
export const builderPricing = {
  bases: { espresso: 2.5, latte: 4.5, iced: 5, matcha: 5.5 } as const,
  milks: { whole: 0, oat: 0.75, almond: 0.75, none: 0 } as const,
};
