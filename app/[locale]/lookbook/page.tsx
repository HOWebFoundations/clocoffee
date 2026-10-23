import { notFound } from "next/navigation";
import { locales, media, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Reveal } from "@/components/ui/Reveal";
import { NextUp } from "@/components/ui/NextUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "lookbook", "lookbook", "/media/posters/hero-wide.webp");
}

type Plate = { src: string; ratio: string; span?: boolean; video?: boolean };
/** Everything the brand looks like, grouped. Paths are /media/… without extension; avif+webp pairs exist for each. */
const GROUPS: { key: "mark" | "glasses" | "world" | "place"; plates: Plate[] }[] = [
  { key: "mark", plates: [
    { src: "/media/posters/wordmark-espresso", ratio: "aspect-[1/1]", span: true },
    { src: "/media/bloom-md", ratio: "aspect-[1/1]" },
    { src: "/media/video/bloom", ratio: "aspect-[1/1]", video: true },
  ] },
  { key: "glasses", plates: [
    { src: "/media/gallery/iris", ratio: "aspect-[4/5]" },
    { src: "/media/gallery/blossom", ratio: "aspect-[4/5]" },
    { src: "/media/gallery/ditsy", ratio: "aspect-[4/5]" },
    { src: "/media/detail/iris", ratio: "aspect-[1/1]" },
    { src: "/media/detail/blossom", ratio: "aspect-[1/1]" },
    { src: "/media/detail/ditsy", ratio: "aspect-[1/1]" },
  ] },
  { key: "world", plates: [
    { src: "/media/posters/hero-wide", ratio: "aspect-[21/9]", span: true },
    { src: "/media/posters/cup-plain", ratio: "aspect-[1/1]" },
    { src: "/media/posters/hero", ratio: "aspect-[9/16]" },
    { src: "/media/artist", ratio: "aspect-[3/2]" },
  ] },
  { key: "place", plates: [
    { src: "/media/place/storefront-a", ratio: "aspect-[1/1]" },
    { src: "/media/place/storefront-b", ratio: "aspect-[1/1]" },
  ] },
];

export default async function LookbookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);
  const lb = dict.lookbook;

  return (
    <>
      <section className="bg-cream pb-24 pt-28 sm:pt-32">
        <header className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl sm:text-6xl">{lb.heading}</h1>
          <p className="mt-4 max-w-xl text-lg text-espresso/75">{lb.lede}</p>
        </header>

        {GROUPS.map((g, gi) => (
          <Reveal key={g.key}>
            <section className="mx-auto mt-20 max-w-6xl md:px-6">
              <div className="px-6 md:px-0">
                <p className="eyebrow text-espresso/55">{String(gi + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-3xl sm:text-5xl">{lb.groups[g.key].title}</h2>
                <p className="mt-3 max-w-lg text-espresso/75">{lb.groups[g.key].note}</p>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
                {g.plates.map((pl) => (
                  <figure key={pl.src} className={`plate ${pl.span ? "md:col-span-2" : ""}`}>
                    {pl.video ? (
                      <video autoPlay muted loop playsInline poster={media("/media/bloom-md.webp")}
                             className={`${pl.ratio} w-full object-cover`} aria-hidden="true">
                        <source src={media(`${pl.src}.mp4`)} type="video/mp4" />
                        <source src={media(`${pl.src}.webm`)} type="video/webm" />
                      </video>
                    ) : (
                      <picture>
                        <source srcSet={media(`${pl.src}.avif`)} type="image/avif" />
                        <img src={media(`${pl.src}.webp`)} alt="" loading="lazy" className={`${pl.ratio} w-full object-cover`} />
                      </picture>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </section>
      <NextUp dict={dict} locale={locale} exclude="lookbook" />
    </>
  );
}
