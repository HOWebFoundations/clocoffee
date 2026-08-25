"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { navRoutes, path, type Route } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

const localeNames: Record<Locale, string> = { en: "EN", ar: "ع", fr: "FR" };

/**
 * Gallery navigation: the wordmark and a menu button, nothing else. The links
 * live in a full-screen overlay so the artwork keeps the whole page. The
 * overlay traps nothing and closes on Escape, on navigation, and on backdrop
 * click — a menu you cannot get out of is worse than a visible nav bar.
 */
export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const labels: Record<Route, string> = {
    "": dict.nav.menu, cups: dict.nav.cups, order: dict.order.heading,
    menu: dict.nav.menu, visit: dict.nav.visit, about: dict.pages.about.title,
  };
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* the header floats over full-bleed artwork; a soft scrim keeps it readable
            without painting a solid bar across the top of the picture */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/70 to-transparent" aria-hidden="true" />
        <div className="relative flex items-center justify-between px-5 py-4">
          <Link href={path(locale)} aria-label={dict.meta.title} className="text-espresso">
            <Wordmark className="text-lg" bloomSize="1em" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="eyebrow text-espresso"
          >
            {dict.nav.open}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-espresso text-cream-ink" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-5 py-4">
            <Wordmark className="text-lg" bloomSize="1em" />
            <button type="button" onClick={() => setOpen(false)} className="eyebrow" autoFocus>
              {dict.nav.close}
            </button>
          </div>
          <nav className="grid h-[calc(100svh-5rem)] content-center gap-1 px-8">
            {navRoutes.map((r) => {
              const href = path(locale, r);
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={r}
                  href={href}
                  className={`display block py-2 text-4xl leading-tight transition-opacity sm:text-6xl ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {labels[r]}
                </Link>
              );
            })}
            <div className="mt-10 flex gap-4" aria-label={dict.a11y.langSwitch}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${rest ? `/${rest}` : ""}`}
                  hrefLang={l}
                  className={`eyebrow ${l === locale ? "opacity-100 underline underline-offset-4" : "opacity-60"}`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
