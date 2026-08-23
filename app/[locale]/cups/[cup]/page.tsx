import Link from "next/link";
import { notFound } from "next/navigation";
import { cups, locales, media, type CupId, type Locale } from "@/lib/config";
import { BASE_URL, path } from "@/lib/routes";
import { getDict } from "@/lib/i18n";
import { CupStage } from "@/components/worlds/CupStage";

export function generateStaticParams() {
  return locales.flatMap((locale) => cups.map((c) => ({ locale, cup: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cup: string }> }) {
  const { locale: raw, cup: cupId } = await params;
  const locale = raw as Locale;
  const cup = cups.find((c) => c.id === cupId);
  if (!cup) return {};
  const dict = getDict(locale);
  const info = dict.worlds.cups[cup.id];
  const url = `${BASE_URL}${path(locale, "cups", cup.id)}`;
  return {
    title: info.name,
    description: info.story,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}${path(l, "cups", cup.id)}`])),
    },
    openGraph: {
      type: "article", url, title: `${info.name} — clocoffee`, description: info.story, locale,
      images: [{ url: `${cup.poster}.webp`, width: 576, height: 1024 }],
    },
  };
}

export default async function CupPage({ params }: { params: Promise<{ locale: string; cup: string }> }) {
  const { locale: raw, cup: cupId } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const cup = cups.find((c) => c.id === cupId);
  if (!cup) notFound();
  const dict = getDict(locale);
  const info = dict.worlds.cups[cup.id as CupId];
  const others = cups.filter((c) => c.id !== cup.id);

  return (
    <article
      className="flex min-h-svh flex-col justify-center px-6 pb-24 pt-28 sm:pt-32"
      style={{
        backgroundColor: cup.world.tint,
        color: cup.textOnWorld === "dark" ? "var(--color-espresso)" : "var(--color-cream-ink)",
      }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <CupStage cup={cup} dict={dict} />
        <div>
          <Link href={path(locale, "cups")} className="text-sm font-bold underline underline-offset-4 opacity-80">
            <span aria-hidden="true" className="rtl:hidden">←</span>
            <span aria-hidden="true" className="ltr:hidden">→</span> {dict.common.backToCups}
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">{info.name}</h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed opacity-90">{info.story}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={path(locale, "order")}
              className="rounded-full bg-espresso px-6 py-3.5 font-bold text-cream-ink"
              style={cup.textOnWorld === "light" ? { backgroundColor: "var(--color-cream-ink)", color: "var(--color-espresso)" } : undefined}
            >
              {dict.common.buildThisDrink}
            </Link>
            <Link href={path(locale, "menu")} className="rounded-full border-2 border-current px-6 py-3.5 font-bold">
              {dict.common.viewMenu}
            </Link>
          </div>

          <ul className="mt-12 flex gap-4">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={path(locale, "cups", o.id)} className="flex items-center gap-3 text-sm font-bold">
                  <picture>
                    <source srcSet={media(`${o.poster}.avif`)} type="image/avif" />
                    <img src={media(`${o.poster}.webp`)} alt="" loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
                  </picture>
                  {dict.worlds.cups[o.id].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
