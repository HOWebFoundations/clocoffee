"use client";
import { useState } from "react";
import { menu, type Category } from "@/lib/menu";
import { priceLbp, priceUsd } from "@/lib/currency";
import type { Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

const ORDER: Category[] = ["coffee", "iced", "matcha", "sweets"];

/**
 * The menu as a printed card: serif category heads, dotted leaders to the
 * price, LBP beneath in small type. Filters are quiet text tabs. Prices stay
 * and stay labelled indicative — this is what clocoffee would serve.
 */
export function MenuGrid({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const cats = filter === "all" ? ORDER : [filter];
  return (
    <section id="menu" className="bg-paper px-6 pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl sm:text-6xl">{dict.menu.heading}</h1>
        <p className="mt-3 text-espresso/70">{dict.menu.indicative}</p>

        <div role="group" aria-label={dict.menu.heading} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-espresso/15 pb-3">
          {(["all", ...ORDER] as (Category | "all")[]).map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}
              className={`eyebrow pb-1 transition-colors ${filter === c ? "border-b-2 border-espresso text-espresso" : "text-espresso/50 hover:text-espresso"}`}>
              {c === "all" ? dict.menu.all : dict.menu.categories[c]}
            </button>
          ))}
        </div>

        {cats.map((c) => (
          <div key={c} className="mt-12">
            <h2 className="text-3xl sm:text-4xl">{dict.menu.categories[c]}</h2>
            <ul className="mt-5 space-y-4">
              {menu.filter((m) => m.category === c).map((m) => (
                <li key={m.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-3">
                  <div className="flex items-baseline gap-3 overflow-hidden">
                    <span className="shrink-0 text-lg font-bold">
                      {m.name[locale]}{m.popular && <span className="ms-2 align-middle text-xs opacity-60">✿</span>}
                    </span>
                    <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-espresso/35" />
                  </div>
                  <span className="text-end">
                    <span className="block text-lg font-bold tabular-nums">{priceUsd(m.usd, locale)}</span>
                    <span className="block text-xs text-espresso/60 tabular-nums">{priceLbp(m.usd, locale)}</span>
                  </span>
                  {m.note && <p className="col-span-2 -mt-1 text-sm text-espresso/65">{m.note[locale]}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
