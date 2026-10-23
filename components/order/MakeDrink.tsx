"use client";
import { useRef, useState } from "react";
import { shop, type Locale } from "@/lib/config";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";
import { drinkName } from "@/lib/drinkName";
import {
  Glass, DEFAULT_SPEC, WORLD,
  type DrinkSpec, type Temp, type Base, type Milk, type Sweet, type Syrup, type Topping, type World,
} from "./glass";
import { renderStoryCard, shareOrDownload } from "./StoryCard";

/** Module scope: an inline component would remount every chip on each tap. */
function Chip<T extends string>({ value, current, set, label, ink, bg, swatch }: {
  value: T; current: T; set: (v: T) => void; label: string; ink: string; bg: string; swatch?: string;
}) {
  const on = current === value;
  return (
    <button
      type="button"
      onClick={() => set(value)}
      aria-pressed={on}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors"
      style={on ? { backgroundColor: ink, color: bg, borderColor: ink } : { color: ink, borderColor: `${ink}66` }}
    >
      {swatch && <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: swatch }} aria-hidden="true" />}
      {label}
    </button>
  );
}

/**
 * Make a drink — the menu you play with. No prices, no cart, no form: choose
 * hot or iced, the base, milk, sweetness, a flavour, something on top, and the
 * painted world it sits in; the glass builds live. The payoff is a story card
 * you can post. A one-line note at the foot says this is a brand in the
 * making, not a counter you can order from.
 */
export function MakeDrink({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [spec, setSpec] = useState<DrinkSpec>(DEFAULT_SPEC);
  const [card, setCard] = useState<"idle" | "making" | "done">("idle");
  const exportRef = useRef<HTMLDivElement>(null);
  const m = dict.make;
  const w = WORLD[spec.world];
  const ink = w.text === "light" ? "#EEE0C6" : "#392618";
  const name = drinkName(spec, dict, locale);
  const set = <K extends keyof DrinkSpec>(k: K) => (v: DrinkSpec[K]) => setSpec((s) => ({ ...s, [k]: v }));

  const save = async () => {
    // export from a static, non-animated twin so in-flight transitions never
    // serialize as a half-poured glass
    const svg = exportRef.current?.querySelector("svg");
    if (!svg || card === "making") return;
    setCard("making");
    try {
      const blob = await renderStoryCard({
        svg, name, world: spec.world, soon: m.cardSoon, tag: m.cardTag,
        handle: `@${shop.instagram}`, bloomUrl: "/media/bloom-sm.webp",
      });
      const how = await shareOrDownload(blob, "clocoffee-drink.png", name);
      track("story_card", { how, base: spec.base, temp: spec.temp, world: spec.world });
      setCard("done");
      setTimeout(() => setCard("idle"), 2200);
    } catch {
      setCard("idle");
    }
  };

  const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <fieldset className="mt-7 first:mt-0">
      <legend className="eyebrow mb-2.5 opacity-70">{n} · {title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );

  return (
    <section
      className="relative min-h-svh overflow-x-clip pb-20 pt-24 sm:pt-28"
      style={{ backgroundColor: w.bg, color: ink, transition: "background-color 0.7s ease, color 0.7s ease" }}
    >
      {/* top-lit world */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70svh]"
           style={{ background: `linear-gradient(180deg, ${w.bg2} 0%, transparent 100%)`, opacity: 0.85, transition: "background 0.7s ease" }} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.05fr] md:gap-16">
        {/* ——— the drink ——— */}
        <div className="sticky top-0 z-30 -mx-6 px-6 pb-4 pt-12 md:top-24 md:mx-0 md:self-start md:px-0 md:pt-0">
          <div className="pointer-events-none absolute inset-0 md:hidden"
               style={{ background: `linear-gradient(180deg, ${w.bg2} 0%, ${w.bg} 100%)`, transition: "background 0.7s ease" }} aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow opacity-70">{m.yourDrink}</p>
            <h1 className="mt-1 text-2xl leading-tight sm:text-4xl md:text-5xl">{name}</h1>
            <Glass spec={spec} uid="make" className="mx-auto mt-3 h-44 w-auto md:mt-8 md:h-[26rem]" />
            <div className="mt-3 flex flex-wrap items-center gap-3 md:mt-8">
              <button
                type="button"
                onClick={save}
                disabled={card === "making"}
                className="rounded-full px-6 py-3 text-sm font-bold transition-transform active:scale-[0.98] disabled:opacity-70"
                style={{ backgroundColor: ink, color: w.bg }}
              >
                {card === "idle" ? m.save : card === "making" ? m.saving : `✓ ${m.saved}`}
              </button>
              <span className="text-xs opacity-60">{m.share} · {m.download}</span>
            </div>
          </div>
        </div>

        {/* ——— the choices ——— */}
        <div className="pb-6">
          <Step n={1} title={m.steps.temp}>
            {(["hot", "iced"] as Temp[]).map((v) => <Chip key={v} value={v} current={spec.temp} set={set("temp")} label={m.temp[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={2} title={m.steps.base}>
            {(["coffee", "matcha"] as Base[]).map((v) => <Chip key={v} value={v} current={spec.base} set={set("base")} label={m.bases[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={3} title={m.steps.milk}>
            {(["whole", "oat", "almond", "none"] as Milk[]).map((v) => <Chip key={v} value={v} current={spec.milk} set={set("milk")} label={dict.builder.milks[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={4} title={m.steps.sweet}>
            {(["zero", "half", "full"] as Sweet[]).map((v) => <Chip key={v} value={v} current={spec.sweet} set={set("sweet")} label={dict.builder.sweet[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={5} title={m.steps.syrup}>
            {(["none", "vanilla", "caramel", "rose", "pistachio"] as Syrup[]).map((v) => <Chip key={v} value={v} current={spec.syrup} set={set("syrup")} label={m.syrups[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={6} title={m.steps.topping}>
            {(["none", "cinnamon", "cocoa", "flower"] as Topping[]).map((v) => <Chip key={v} value={v} current={spec.topping} set={set("topping")} label={m.toppings[v]} ink={ink} bg={w.bg} />)}
          </Step>
          <Step n={7} title={m.steps.world}>
            {(["iris", "blossom", "ditsy"] as World[]).map((v) => (
              <Chip key={v} value={v} current={spec.world} set={set("world")} label={dict.worlds.cups[v].name} ink={ink} bg={w.bg} swatch={WORLD[v].bg} />
            ))}
          </Step>

          <p className="mt-12 max-w-md text-xs leading-relaxed opacity-60">{dict.status.conceptNote}</p>
        </div>
      </div>

      {/* static twin for export — never animated, never seen */}
      <div ref={exportRef} aria-hidden="true" className="pointer-events-none fixed -left-[9999px] top-0 h-[420px] w-[300px]">
        <Glass spec={spec} uid="export" animate={false} className="h-full w-full" />
      </div>
    </section>
  );
}
