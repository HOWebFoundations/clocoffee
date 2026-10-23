import Link from "next/link";
import { shop, type Locale } from "@/lib/config";
import { navRoutes, path } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";
import { Wordmark } from "../ui/Wordmark";

export function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const ig = `https://instagram.com/${shop.instagram}`;
  return (
    <footer className="border-t border-cream-ink/10 bg-espresso px-6 pb-10 pt-12 text-cream-ink">
      <div className="mx-auto max-w-5xl">
        <nav aria-label={dict.footer.follow} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold">
          {navRoutes.map((r) => (
            <Link key={r} href={path(locale, r)} className="text-cream-ink/80 underline-offset-4 hover:underline">
              {r === "cups" ? dict.nav.cups : r === "order" ? dict.make.heading : r === "menu" ? dict.nav.menu : r === "about" ? dict.pages.about.title : r === "lookbook" ? dict.pages.lookbook.title : dict.nav.visit}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-cream-ink/75">
          <Wordmark className="text-2xl text-cream-ink" bloomSize="1.1em" />
          <a href={ig} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            @{shop.instagram}
          </a>
          <p>
            © {new Date().getFullYear()} {shop.name} · {dict.footer.rights} ·{" "}
            <a href="https://thehowf.com" target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
              {dict.footer.madeBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
