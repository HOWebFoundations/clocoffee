import Link from "next/link";
import { notFound } from "next/navigation";
import { cups, locales, media, type Locale } from "@/lib/config";
import { path } from "@/lib/routes";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { HeroPour } from "@/components/hero/HeroPour";
import { Lately } from "@/components/ui/Lately";
import { Glass } from "@/components/order/glass";

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
          {/* the living monogram: Chloe's bloom, breathing. Falls back to the
              static flower under reduced motion. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={media("/media/bloom-md.webp")}
            aria-hidden="true"
            className="mb-10 h-28 w-28 rounded-full object-cover motion-reduce:hidden"
          >
            <source src={media("/media/video/bloom.mp4")} type="video/mp4" />
            <source src={media("/media/video/bloom.webm")} type="video/webm" />
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media("/media/bloom-md.webp")} alt="" aria-hidden="true" className="mb-10 hidden h-28 w-28 object-contain motion-reduce:block" />
          <h2 className="text-4xl sm:text-6xl">{dict.worlds.heading}</h2>
          <p className="mt-2 text-espresso/75">{dict.worlds.sub}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {cups.map((cup) => (
              <li key={cup.id}>
                <Link href={path(locale, "cups", cup.id)} className="group block">
                  <figure className="overflow-hidden plate">
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
                  <h3 className="mt-4 text-2xl">{dict.worlds.cups[cup.id].name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-espresso/75">{dict.worlds.cups[cup.id].story}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={path(locale, "cups")}
            className="btn btn-ghost mt-10 inline-block font-bold  "
          >
            {dict.common.seeAllCups}
          </Link>
        </div>
      </section>

      {/* Make a drink — the playable builder, teased with a static glass */}
      <section className="bg-espresso px-6 py-20 text-cream-ink sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow text-cream-ink/60">{dict.make.heading}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl">{dict.home.makeHeading}</h2>
            <p className="mt-4 max-w-md text-lg text-cream-ink/80">{dict.home.makeBody}</p>
            <Link href={path(locale, "order")} className="btn mt-8 inline-block bg-cream-ink text-espresso">{dict.home.makeCta}</Link>
          </div>
          <Link href={path(locale, "order")} aria-label={dict.home.makeCta} className="block">
            <Glass
              spec={{ temp: "iced", base: "coffee", milk: "oat", sweet: "half", syrup: "caramel", topping: "none", world: "iris" }}
              uid="home" animate={false} className="mx-auto h-80 w-auto md:h-[26rem]"
            />
          </Link>
        </div>
      </section>

      {/* Lookbook teaser */}
      <section className="bg-cream px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-espresso/55">{dict.pages.lookbook.title}</p>
              <h2 className="mt-2 text-4xl sm:text-6xl">{dict.home.lookHeading}</h2>
              <p className="mt-3 max-w-lg text-espresso/75">{dict.home.lookBody}</p>
            </div>
            <Link href={path(locale, "lookbook")} className="btn btn-ghost text-sm">{dict.home.lookCta}</Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
            {[
              { src: "/media/posters/hero-wide", ratio: "aspect-[21/9]", span: true },
              { src: "/media/detail/blossom", ratio: "aspect-[21/9] md:aspect-auto md:h-full" },
            ].map((pl) => (
              <Link key={pl.src} href={path(locale, "lookbook")} className={`plate block ${pl.span ? "md:col-span-2" : ""}`}>
                <picture>
                  <source srcSet={media(`${pl.src}.avif`)} type="image/avif" />
                  <img src={media(`${pl.src}.webp`)} alt="" loading="lazy" className={`${pl.ratio} w-full object-cover`} />
                </picture>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Lately dict={dict} tone="dark" />
    </>
  );
}
