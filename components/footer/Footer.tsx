import { media, shop } from "@/lib/config";
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

export function Footer({ dict }: { dict: Dict }) {
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
        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-cream-ink/75">
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
