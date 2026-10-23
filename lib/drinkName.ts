import type { Locale } from "./config";
import type { Dict } from "./i18n";
import type { DrinkSpec } from "@/components/order/glass/types";

/**
 * A drink's name from its spec, composed per locale — "Iced oat latte,
 * caramel, lightly sweet" / "Latte glacé à l'avoine, caramel, légèrement
 * sucré" / "لاتيه بارد بحليب الشوفان، كراميل، سكّر خفيف". Word order and the
 * milk qualifier differ by language, so this is rules, not string formatting.
 */
export function drinkName(spec: DrinkSpec, dict: Dict, locale: Locale): string {
  const n = dict.make.names;
  const hasMilk = spec.milk !== "none";
  const key =
    spec.base === "coffee"
      ? spec.temp === "hot" ? (hasMilk ? "latte" : "espresso") : (hasMilk ? "icedLatte" : "coldBrew")
      : spec.temp === "hot" ? (hasMilk ? "matchaLatte" : "matcha") : (hasMilk ? "icedMatchaLatte" : "icedMatcha");
  let head = n[key];
  if (spec.milk === "oat" || spec.milk === "almond") {
    const q = dict.make.nameMilk[spec.milk];
    if (locale === "en") {
      // the qualifier sits after "Iced": "Iced oat latte", never "Oat iced latte"
      const lower = `${head.charAt(0).toLowerCase()}${head.slice(1)}`;
      head = lower.startsWith("iced ") ? `iced ${q.toLowerCase()} ${lower.slice(5)}` : `${q} ${lower}`;
    } else {
      head = `${head} ${q}`;
    }
  }
  const extras: string[] = [];
  if (spec.syrup !== "none") extras.push(dict.make.syrups[spec.syrup].toLowerCase());
  if (spec.sweet !== "zero") extras.push(dict.make.nameSweet[spec.sweet]);
  if (spec.topping !== "none") extras.push(dict.make.nameTopping[spec.topping]);
  const sep = locale === "ar" ? "، " : ", ";
  const name = [head, ...extras].join(sep);
  return locale === "ar" ? name : name.charAt(0).toUpperCase() + name.slice(1);
}
