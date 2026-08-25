import Link from "next/link";
import type { Locale } from "@/lib/config";
import { path, type Route } from "@/lib/routes";
import type { Dict } from "@/lib/i18n";

/** Cross-links at the foot of every section page so nobody dead-ends. */
export function NextUp({ dict, locale, exclude }: { dict: Dict; locale: Locale; exclude: Route }) {
  const all: { route: Route; label: string }[] = [
    { route: "cups", label: dict.common.seeAllCups },
    { route: "order", label: dict.order.heading },
    { route: "menu", label: dict.common.viewMenu },
    { route: "visit", label: dict.common.findUs },
  ];
  const links = all.filter((l) => l.route !== exclude);
  return (
    <nav aria-label={dict.common.exploreMore} className="bg-cream px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="eyebrow text-espresso/60">{dict.common.exploreMore}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.route}>
              <Link
                href={path(locale, l.route)}
                className="block rounded-2xl border border-espresso/15 bg-paper px-5 py-4 font-bold transition-colors hover:border-espresso"
              >
                {l.label} <span aria-hidden="true" className="rtl:hidden">→</span><span aria-hidden="true" className="ltr:hidden">←</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
