import Link from "next/link";
import { cups, media, type Locale } from "@/lib/config";
import { path } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";
import { Reveal } from "../ui/Reveal";

/**
 * The three glasses, hung like a gallery wall: one per screen, alternating
 * sides, revealed by a gentle fade as you reach them. No pinning, no
 * horizontal scrub, no GSAP — a calm room, which is what the brief asked for.
 *
 * Images go full-bleed on phones (the 576×1024 source is at native density
 * there) and sit framed with margins on desktop, where edge-to-edge would
 * show the softness.
 */
export function CupWorlds({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <section id="cups" className="bg-cream pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl px-6">
        <p className="eyebrow text-espresso/60">{dict.status.glassesHeading}</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">{dict.worlds.heading}</h1>
        <p className="mt-4 max-w-xl text-lg text-espresso/75">{dict.worlds.sub}</p>
      </div>

      <div className="mt-16 space-y-20 sm:space-y-24">
        {cups.map((cup, i) => {
          const info = dict.worlds.cups[cup.id];
          return (
            <Reveal key={cup.id}>
              <article className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14 md:px-6">
                <Link
                  href={path(locale, "cups", cup.id)}
                  className={`plate block md:mx-0 ${i % 2 ? "md:order-2" : ""}`}
                  style={{ backgroundColor: cup.world.tint }}
                >
                  <picture>
                    <source srcSet={media(`${cup.poster}.avif`)} type="image/avif" />
                    <img
                      src={media(`${cup.poster}.webp`)}
                      alt={info.name}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </picture>
                </Link>
                <div className="px-6 md:px-0">
                  <p className="eyebrow text-espresso/55">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-3xl sm:text-5xl">{info.name}</h2>
                  <p className="mt-4 max-w-sm leading-relaxed text-espresso/80">{info.story}</p>
                  <Link href={path(locale, "cups", cup.id)} className="eyebrow mt-6 inline-block text-espresso underline underline-offset-8">
                    {info.name}
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
