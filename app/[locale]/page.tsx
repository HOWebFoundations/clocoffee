import Link from "next/link";
import { notFound } from "next/navigation";
import { cups, locales, media, type Locale } from "@/lib/config";
import { path } from "@/lib/routes";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { HeroPour } from "@/components/hero/HeroPour";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "", "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);

  return (
    <>
      <HeroPour dict={dict} locale={locale} />

      {/* Cup teasers — the home page sells the idea, the cup pages tell it */}
      <section className="scroll-mt-20 bg-cream px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.worlds.heading}</h2>
          <p className="mt-2 text-espresso/75">{dict.worlds.sub}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {cups.map((cup) => (
              <li key={cup.id}>
                <Link href={path(locale, "cups", cup.id)} className="group block">
                  <figure className="overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-28px_rgba(57,38,24,0.5)]">
                    <picture>
                      <source srcSet={media(`${cup.poster}.avif`)} type="image/avif" />
                      <img
                        src={media(`${cup.poster}.webp`)}
                        alt={dict.worlds.cups[cup.id].name}
                        loading="lazy"
                        className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </picture>
                  </figure>
                  <h3 className="mt-4 text-xl font-extrabold">{dict.worlds.cups[cup.id].name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-espresso/75">{dict.worlds.cups[cup.id].story}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={path(locale, "cups")}
            className="btn-liquid mt-10 inline-block rounded-full border-2 border-espresso px-7 py-3.5 font-bold hover:text-cream-ink focus-visible:text-cream-ink [--liquid:var(--color-espresso)]"
          >
            {dict.common.seeAllCups}
          </Link>
        </div>
      </section>

      {/* Straight to the two money actions */}
      <section className="bg-espresso px-6 py-20 text-cream-ink sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{dict.builder.heading}</h2>
            <p className="mt-2 text-cream-ink/80">{dict.builder.sub}</p>
            <Link href={path(locale, "order")} className="mt-5 inline-block rounded-full bg-blush px-6 py-3 font-bold text-espresso">
              {dict.common.buildThisDrink}
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{dict.menu.heading}</h2>
            <p className="mt-2 text-cream-ink/80">{dict.menu.sub}</p>
            <Link href={path(locale, "menu")} className="mt-5 inline-block rounded-full border-2 border-cream-ink px-6 py-3 font-bold">
              {dict.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
