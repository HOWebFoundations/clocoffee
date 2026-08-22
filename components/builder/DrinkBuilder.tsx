"use client";
import { useMemo, useState } from "react";
import { cups, media, shop, type Locale } from "@/lib/config";
import { builderPricing } from "@/lib/menu";
import { priceLbp, priceUsd } from "@/lib/currency";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";

/** Module scope on purpose: an inline component would get a new identity every
    render, remounting all chips on each selection and dropping keyboard focus. */
function Chip<T extends string>({ value, current, set, label }: { value: T; current: T; set: (v: T) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => set(value)}
      aria-pressed={current === value}
      className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
        current === value
          ? "border-espresso bg-espresso text-cream-ink"
          : "border-espresso/30 text-espresso hover:border-espresso"
      }`}
    >
      {label}
    </button>
  );
}

type Base = keyof typeof builderPricing.bases;
type Milk = keyof typeof builderPricing.milks;
type Sweet = "zero" | "half" | "full";
type Cup = "plain" | (typeof cups)[number]["id"];

/**
 * Build your drink: base → milk → sweetness → cup. Live preview swaps the
 * precomposed posters, price shows in USD + LBP, and it ends in a WhatsApp
 * handoff with the order prefilled — the site's one KPI (site-plan §7).
 */
export function DrinkBuilder({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [base, setBase] = useState<Base>("latte");
  const [milk, setMilk] = useState<Milk>("whole");
  const [sweet, setSweet] = useState<Sweet>("half");
  const [cup, setCup] = useState<Cup>("iris");

  const usd = builderPricing.bases[base] + builderPricing.milks[milk];
  const cupData = cups.find((c) => c.id === cup);
  const poster = cupData ? cupData.poster : "/media/posters/hero";

  const waHref = useMemo(() => {
    const b = dict.builder;
    const lines = [
      b.waIntro,
      `• ${b.waBase}: ${b.bases[base]}`,
      `• ${b.waMilk}: ${b.milks[milk]}`,
      `• ${b.waSweet}: ${b.sweet[sweet]}`,
      `• ${b.waCup}: ${cup === "plain" ? b.cupPlain : dict.worlds.cups[cup].name}`,
      `${b.waTotal}: ${priceUsd(usd, locale)} / ${priceLbp(usd, locale)}`,
    ];
    return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [base, milk, sweet, cup, usd, dict, locale]);

  const saveImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 720; canvas.height = 1280;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = media(`${poster}.webp`);
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; }).catch(() => null);
    ctx.fillStyle = "#EFE6D4"; ctx.fillRect(0, 0, 720, 1280);
    if (img.complete && img.naturalWidth) {
      const s = Math.max(720 / img.naturalWidth, 1050 / img.naturalHeight);
      ctx.drawImage(img, (720 - img.naturalWidth * s) / 2, 0, img.naturalWidth * s, img.naturalHeight * s);
    }
    ctx.fillStyle = "rgba(57,38,24,0.92)"; ctx.fillRect(0, 1050, 720, 230);
    ctx.fillStyle = "#EEE0C6"; ctx.textAlign = "center";
    ctx.font = "bold 44px system-ui, sans-serif";
    ctx.fillText("clocoffee", 360, 1120);
    ctx.font = "28px system-ui, sans-serif";
    ctx.fillText(`${dict.builder.bases[base]} · ${dict.builder.milks[milk]} · ${dict.builder.sweet[sweet]}`, 360, 1170);
    ctx.fillText(`${priceUsd(usd, locale)} / ${priceLbp(usd, locale)}`, 360, 1215);
    const a = document.createElement("a");
    a.download = "clocoffee-order.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    track("builder_save_image");
  };

  return (
    <section id="builder" className="bg-paper px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.builder.heading}</h2>
          <p className="mt-2 text-espresso/70">{dict.builder.sub}</p>

          <fieldset className="mt-8">
            <legend className="mb-2 text-sm font-bold uppercase tracking-widest text-espresso/70">1 · {dict.builder.steps.base}</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(builderPricing.bases) as Base[]).map((b) => (
                <Chip key={b} value={b} current={base} set={setBase} label={dict.builder.bases[b]} />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-bold uppercase tracking-widest text-espresso/70">2 · {dict.builder.steps.milk}</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(builderPricing.milks) as Milk[]).map((m) => (
                <Chip key={m} value={m} current={milk} set={setMilk} label={dict.builder.milks[m]} />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-bold uppercase tracking-widest text-espresso/70">3 · {dict.builder.steps.sweetness}</legend>
            <div className="flex flex-wrap gap-2">
              {(["zero", "half", "full"] as Sweet[]).map((s) => (
                <Chip key={s} value={s} current={sweet} set={setSweet} label={dict.builder.sweet[s]} />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-bold uppercase tracking-widest text-espresso/70">4 · {dict.builder.steps.cup}</legend>
            <div className="flex flex-wrap gap-2">
              {cups.map((c) => (
                <Chip key={c.id} value={c.id as Cup} current={cup} set={setCup} label={dict.worlds.cups[c.id].name} />
              ))}
              <Chip value={"plain" as Cup} current={cup} set={setCup} label={dict.builder.cupPlain} />
            </div>
          </fieldset>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <figure className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(57,38,24,0.5)]">
            <picture key={poster}>
              <source srcSet={media(`${poster}.avif`)} type="image/avif" />
              <img src={media(`${poster}.webp`)} alt={dict.builder.yourDrink} loading="lazy" className="aspect-[9/16] w-full object-cover" />
            </picture>
          </figure>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-bold">{dict.builder.yourDrink}</span>
            <span className="text-end">
              <span className="block text-xl font-extrabold">{priceUsd(usd, locale)}</span>
              <span className="block text-sm text-espresso/70">{priceLbp(usd, locale)}</span>
            </span>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_handoff", { source: "builder", base, cup })}
            className="btn-liquid mt-4 block rounded-full bg-espresso py-4 text-center font-bold text-cream-ink [--liquid:var(--color-violet-ink)]"
          >
            {dict.builder.sendWhatsapp}
          </a>
          <button
            type="button"
            onClick={saveImage}
            className="btn-liquid mt-3 block w-full rounded-full border-2 border-espresso py-3.5 text-center font-bold text-espresso hover:text-cream-ink focus-visible:text-cream-ink [--liquid:var(--color-espresso)]"
          >
            {dict.builder.saveImage}
          </button>
        </div>
      </div>
    </section>
  );
}
