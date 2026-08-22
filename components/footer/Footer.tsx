import Link from "next/link";
import { media, shop, type Locale } from "@/lib/config";
import { navRoutes, path } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";
import { Wordmark } from "../ui/Wordmark";

/** Curated static grid — Instagram's Basic Display API is dead (site-plan §4). */
const tiles = [
  "/media/posters/iris.webp",
  "/media/posters/blossom.webp",
  "/media/posters/cup-plain.webp",
  "/media/posters/ditsy.webp",
  "/media/posters/bloom-tile.webp",
  "/media/posters/hero.webp",
];

export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const ig = `https://instagram.com/${shop.instagram}`;
  return (
    <footer className="bg-espresso px-6 pb-10 pt-16 text-cream-ink">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-xl font-extrabold">{dict.footer.follow}</h2>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {tiles.map((t) => (
            <a key={t} href={ig} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(t)} alt={`@${shop.instagram}`} loading="lazy"
                   className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </a>
          ))}
        </div>
        <nav aria-label={dict.footer.follow} className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold">
          {navRoutes.map((r) => (
            <Link key={r} href={path(locale, r)} className="text-cream-ink/80 underline-offset-4 hover:underline">
              {r === "cups" ? dict.nav.cups : r === "build" ? dict.nav.builder : r === "menu" ? dict.nav.menu : r === "verdict" ? dict.nav.verdict : dict.nav.visit}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-cream-ink/75">
          <Wordmark className="text-2xl text-cream-ink" bloomSize="1.1em" />
          <a href={ig} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            @{shop.instagram}
          </a>
          <p>© {new Date().getFullYear()} {shop.name} · {dict.footer.rights} · {dict.footer.madeBy}</p>
        </div>
      </div>
    </footer>
  );
}
