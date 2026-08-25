import { shop, type Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

/**
 * There is no café. clocoffee is a brand and a concept; a place to sit and
 * order is the ambition, not a fact. So this page carries no address, map,
 * opening hours or open/closed badge — publishing those for premises that do
 * not exist is the one thing on this site that could genuinely embarrass the
 * brand. It says so plainly and points at the only real action: Instagram.
 */
export function Shop({ dict, locale }: { dict: Dict; locale: Locale }) {
  void locale;
  const ig = `https://instagram.com/${shop.instagram}`;
  return (
    <section id="visit" className="bg-cream px-6 pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-espresso/8 px-4 py-1.5 text-sm font-bold text-espresso/75">
          {dict.status.badge}
        </span>
        <h1 className="mt-6 text-3xl font-extrabold sm:text-5xl">{dict.status.cafeHeading}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-espresso/80">{dict.status.cafeBody}</p>
        <a
          href={ig}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-liquid mt-8 inline-block rounded-full bg-espresso px-7 py-3.5 font-bold text-cream-ink [--liquid:var(--color-violet-ink)]"
        >
          {dict.status.cafeCta}
        </a>
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-3xl border-2 border-espresso/12 bg-paper p-6 text-center sm:p-8">
        <h2 className="text-xl font-extrabold">{dict.status.glassesHeading}</h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed text-espresso/80">{dict.status.glassesNote}</p>
      </div>
    </section>
  );
}
