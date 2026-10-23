import { media, shop } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

/** "Lately" — a curated grid standing in for a live Instagram feed (the API
    that allowed live embeds no longer exists). Every tile links to the profile. */
export function Lately({ dict, tone = "cream" }: { dict: Dict; tone?: "cream" | "dark" }) {
  const ig = `https://instagram.com/${shop.instagram}`;
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-espresso text-cream-ink" : "bg-cream text-espresso"} px-6 py-20 sm:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={`eyebrow ${dark ? "text-cream-ink/60" : "text-espresso/55"}`}>@{shop.instagram}</p>
            <h2 className="mt-2 text-3xl sm:text-5xl">{dict.soon.igHeading}</h2>
            <p className={`mt-2 ${dark ? "text-cream-ink/75" : "text-espresso/75"}`}>{dict.soon.igBody}</p>
          </div>
          <a href={ig} target="_blank" rel="noopener noreferrer" className={`btn ${dark ? "border border-cream-ink/60" : "btn-ghost"} text-sm`}>
            {dict.status.cafeCta}
          </a>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {shop.instagramTiles.map((t) => (
            <a key={t} href={ig} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl">
              <picture>
                <source srcSet={media(`${t}.avif`)} type="image/avif" />
                <img src={media(`${t}.webp`)} alt="" loading="lazy"
                     className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </picture>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
