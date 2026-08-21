import Link from "next/link";
import { locales, type Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

const localeNames: Record<Locale, string> = { en: "EN", ar: "ع", fr: "FR" };

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const nav = [
    { href: "#cups", label: dict.nav.cups },
    { href: "#builder", label: dict.nav.builder },
    { href: "#menu", label: dict.nav.menu },
    { href: "#visit", label: dict.nav.visit },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-cream/75 px-5 py-3 backdrop-blur-md">
      <a href="#top" aria-label={dict.meta.title}>
        <Wordmark className="text-xl" bloomSize="1.05em" />
      </a>
      <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="text-espresso/80 transition-colors hover:text-espresso">
            {n.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2" aria-label={dict.a11y.langSwitch}>
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}`}
            hrefLang={l}
            aria-current={l === locale ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
              l === locale ? "bg-espresso text-cream-ink" : "text-espresso/60 hover:text-espresso"
            }`}
          >
            {localeNames[l]}
          </Link>
        ))}
      </div>
    </header>
  );
}
