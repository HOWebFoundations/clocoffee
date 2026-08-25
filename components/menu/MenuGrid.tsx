"use client";
import { useState } from "react";
import { menu, type Category } from "@/lib/menu";
import { priceLbp, priceUsd } from "@/lib/currency";
import type { Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

const tints: Record<Category, string> = {
  coffee: "#efe6d4",
  iced: "#e8ecf4",
  matcha: "#e9edda",
  sweets: "#f2e4e0",
};

/** Filterable menu grid; hovering a card lifts it and tints the section. */
export function MenuGrid({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [tint, setTint] = useState<string>(tints.coffee);
  const items = filter === "all" ? menu : menu.filter((m) => m.category === filter);
  const cats: (Category | "all")[] = ["all", "coffee", "iced", "matcha", "sweets"];

  return (
    <section id="menu" className="world-stage px-6 pb-20 pt-28 sm:pb-28 sm:pt-32" style={{ backgroundColor: tint }}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold sm:text-5xl">{dict.menu.heading}</h1>
        <p className="mt-2 text-espresso/75">{dict.menu.indicative}</p>

        <div role="group" aria-label={dict.menu.heading} className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                filter === c ? "border-espresso bg-espresso text-cream-ink" : "border-espresso/30 hover:border-espresso"
              }`}
            >
              {c === "all" ? dict.menu.all : dict.menu.categories[c]}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((m) => (
            <li key={m.id}>
              <article
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setTint(tints[m.category]); }}
                className="group flex items-baseline justify-between gap-4 rounded-2xl bg-paper/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(57,38,24,0.35)]"
              >
                <div>
                  <h3 className="font-extrabold">
                    {m.name[locale]}
                    {m.popular && <span className="ms-2 align-middle text-xs">✿</span>}
                  </h3>
                  {m.note && <p className="mt-1 text-sm text-espresso/70">{m.note[locale]}</p>}
                </div>
                <div className="shrink-0 text-end">
                  <span className="block font-extrabold">{priceUsd(m.usd, locale)}</span>
                  <span className="block text-xs text-espresso/70">{priceLbp(m.usd, locale)}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
