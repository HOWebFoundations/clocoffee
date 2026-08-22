"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { navRoutes, path, type Route } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

const localeNames: Record<Locale, string> = { en: "EN", ar: "ع", fr: "FR" };

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const pathname = usePathname() ?? "";
  const labels: Record<Route, string> = {
    "": dict.nav.menu, cups: dict.nav.cups, build: dict.nav.builder,
    menu: dict.nav.menu, verdict: dict.nav.verdict, visit: dict.nav.visit,
  };
  // strip the locale segment so switching language keeps you on the same page
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-cream/95 px-5 py-3 shadow-[0_1px_0_rgba(57,38,24,0.08)]">
      <Link href={path(locale)} aria-label={dict.meta.title}>
        <Wordmark className="text-xl" bloomSize="1.05em" />
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
        {navRoutes.map((r) => {
          const href = path(locale, r);
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={r}
              href={href}
              aria-current={active ? "page" : undefined}
              className={active ? "text-espresso underline underline-offset-8" : "text-espresso/70 transition-colors hover:text-espresso"}
            >
              {labels[r]}
            </Link>
          );
        })}
      </nav>
      <nav className="flex items-center gap-2" aria-label={dict.a11y.langSwitch}>
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}${rest ? `/${rest}` : ""}`}
            hrefLang={l}
            aria-current={l === locale ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
              l === locale ? "bg-espresso text-cream-ink" : "text-espresso/70 hover:text-espresso"
            }`}
          >
            {localeNames[l]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
