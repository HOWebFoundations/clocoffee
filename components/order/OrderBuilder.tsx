"use client";
import { useMemo, useState } from "react";
import { media, shop, type Locale } from "@/lib/config";
import { builderPricing } from "@/lib/menu";
import { priceLbp, priceUsd } from "@/lib/currency";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";

type Base = keyof typeof builderPricing.bases;
type Milk = keyof typeof builderPricing.milks;
type Sweet = "zero" | "half" | "full";
interface Line { id: number; base: Base; milk: Milk; sweet: Sweet; qty: number }

const unitPrice = (l: Pick<Line, "base" | "milk">) =>
  builderPricing.bases[l.base] + builderPricing.milks[l.milk];

/** Module scope: an inline component would remount every chip on each keystroke. */
function Chip<T extends string>({ value, current, set, label }: {
  value: T; current: T; set: (v: T) => void; label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => set(value)}
      aria-pressed={current === value}
      className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
        current === value ? "border-espresso bg-espresso text-cream-ink" : "border-espresso/30 text-espresso hover:border-espresso"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * The order system. A real cart — multiple drinks, quantities, pickup or
 * delivery, a time, a name and notes — assembled into one readable WhatsApp
 * message. Completed handoffs are the site's only KPI (site-plan §7).
 */
export function OrderBuilder({ dict, locale }: { dict: Dict; locale: Locale }) {
  // current drink under construction
  const [base, setBase] = useState<Base>("latte");
  const [milk, setMilk] = useState<Milk>("whole");
  const [sweet, setSweet] = useState<Sweet>("half");
  const [justAdded, setJustAdded] = useState(false);

  // the order
  const [lines, setLines] = useState<Line[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const o = dict.order;
  // drinks are served in the clear branded glass; the painted ones are artwork
  const poster = "/media/posters/hero";

  const add = () => {
    setLines((prev) => {
      // same drink twice just bumps the quantity
      const match = prev.find((l) => l.base === base && l.milk === milk && l.sweet === sweet);
      if (match) return prev.map((l) => (l === match ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id: Date.now() + prev.length, base, milk, sweet, qty: 1 }];
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
    track("order_line_added", { base });
  };

  const setQty = (id: number, delta: number) =>
    setLines((prev) =>
      prev.flatMap((l) => (l.id !== id ? [l] : l.qty + delta <= 0 ? [] : [{ ...l, qty: l.qty + delta }])),
    );

  const subtotal = lines.reduce((sum, l) => sum + unitPrice(l) * l.qty, 0);
  const total = subtotal;

  const label = (l: Line) =>
    `${dict.builder.bases[l.base]} · ${dict.builder.milks[l.milk]} · ${dict.builder.sweet[l.sweet]}`;

  const blocked = !lines.length || !name.trim();

  const waHref = useMemo(() => {
    const msg = [
      dict.builder.waIntro,
      "",
      ...lines.map((l) => `• ${l.qty}× ${label(l)} — ${priceUsd(unitPrice(l) * l.qty, locale)}`),
      "",
      `${o.waName}: ${name.trim()}`,
      ...(notes.trim() ? [`${o.waNotes}: ${notes.trim()}`] : []),
      "",
      `${dict.builder.waTotal}: ${priceUsd(total, locale)} / ${priceLbp(total, locale)}`,
    ].join("\n");
    return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(msg)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, name, notes, total, locale, dict]);

  return (
    <section className="bg-paper px-6 pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-6xl">{o.heading}</h1>
        <p className="mt-2 text-espresso/75">{o.sub}</p>
        {/* there is no café: say so before anyone builds an order expecting coffee */}
        <p className="mt-5 rounded-2xl border-2 border-espresso/12 bg-cream px-5 py-4 text-sm leading-relaxed text-espresso/85">
          {dict.status.orderNote}
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {/* ——— build a drink ——— */}
          <div>
            <div className="md:sticky md:top-24">
              <figure className="mx-auto w-full max-w-[16rem] overflow-hidden plate">
                <picture key={poster}>
                  <source srcSet={media(`${poster}.avif`)} type="image/avif" />
                  <img src={media(`${poster}.webp`)} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover" />
                </picture>
              </figure>
            </div>
          </div>

          <div>
            <fieldset>
              <legend className="mb-2 eyebrow text-espresso/60">1 · {dict.builder.steps.base}</legend>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(builderPricing.bases) as Base[]).map((b) => (
                  <Chip key={b} value={b} current={base} set={setBase} label={dict.builder.bases[b]} />
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="mb-2 eyebrow text-espresso/60">2 · {dict.builder.steps.milk}</legend>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(builderPricing.milks) as Milk[]).map((m) => (
                  <Chip key={m} value={m} current={milk} set={setMilk} label={dict.builder.milks[m]} />
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="mb-2 eyebrow text-espresso/60">3 · {dict.builder.steps.sweetness}</legend>
              <div className="flex flex-wrap gap-2">
                {(["zero", "half", "full"] as Sweet[]).map((s) => (
                  <Chip key={s} value={s} current={sweet} set={setSweet} label={dict.builder.sweet[s]} />
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={add}
              className="btn mt-8 w-full rounded-full bg-espresso py-4 font-bold text-cream-ink transition-transform active:scale-[0.98]"
            >
              {justAdded ? `✓ ${o.added}` : `${o.addToOrder} · ${priceUsd(unitPrice({ base, milk }), locale)}`}
            </button>
          </div>
        </div>

        {/* ——— the order ——— */}
        <div className="mt-16 rounded-3xl border-2 border-espresso/12 bg-cream p-6 sm:p-8">
          <h2 className="text-3xl">{o.yourOrder}</h2>

          {lines.length === 0 ? (
            <p className="mt-3 text-espresso/70">{o.empty}</p>
          ) : (
            <ul className="mt-4 divide-y divide-espresso/10">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{label(l)}</p>
                    <p className="text-sm text-espresso/70">{priceUsd(unitPrice(l) * l.qty, locale)} · {priceLbp(unitPrice(l) * l.qty, locale)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button type="button" onClick={() => setQty(l.id, -1)} aria-label={o.remove}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-espresso/25 font-bold">−</button>
                    <span className="w-8 text-center font-bold" aria-label={o.qty}>{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.id, 1)} aria-label={o.addAnother}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-espresso/25 font-bold">+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block eyebrow text-espresso/60">{o.name}</span>
              <input
                value={name} onChange={(e) => setName(e.target.value)} placeholder={o.namePh}
                autoComplete="name"
                className="w-full rounded-xl border-2 border-espresso/20 bg-paper px-4 py-3 outline-none focus:border-espresso"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block eyebrow text-espresso/60">{o.notes}</span>
              <input
                value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={o.notesPh}
                className="w-full rounded-xl border-2 border-espresso/20 bg-paper px-4 py-3 outline-none focus:border-espresso"
              />
            </label>
          </div>

          {/* totals */}
          <dl className="mt-8 space-y-1 border-t border-espresso/10 pt-4 text-sm">
            <div className="flex justify-between"><dt>{o.subtotal}</dt><dd>{priceUsd(subtotal, locale)}</dd></div>
            <div className="flex justify-between pt-2 text-lg font-extrabold">
              <dt>{o.total}</dt>
              <dd className="text-end">
                {priceUsd(total, locale)}
                <span className="block text-sm font-medium text-espresso/70">{priceLbp(total, locale)}</span>
              </dd>
            </div>
          </dl>

          <a
            href={blocked ? undefined : waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={blocked}
            onClick={(e) => {
              if (blocked) { e.preventDefault(); return; }
              track("whatsapp_handoff", { source: "order", lines: lines.length, total });
            }}
            className={`btn mt-6 block rounded-full py-4 text-center font-bold transition-transform ${
              blocked
                ? "cursor-not-allowed bg-espresso/25 text-espresso/50"
                : "bg-espresso text-cream-ink active:scale-[0.99]"
            }`}
          >
            {!lines.length ? o.empty : !name.trim() ? o.needName : dict.status.orderSend}
          </a>
        </div>
      </div>
    </section>
  );
}
