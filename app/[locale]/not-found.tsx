import Link from "next/link";
import { getDict } from "@/lib/i18n";
import { defaultLocale } from "@/lib/config";
import { path } from "@/lib/routes";

/** Locale-segment 404. Falls back to English copy — the segment that failed to
    match may well be the locale itself. */
export default function NotFound() {
  const dict = getDict(defaultLocale);
  return (
    <div className="grid min-h-svh place-items-center bg-cream px-6 text-center">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/bloom-md.webp" alt="" className="mx-auto w-32 opacity-70" />
        <h1 className="mt-6 text-3xl font-extrabold sm:text-5xl">{dict.common.notFound}</h1>
        <p className="mt-3 text-espresso/75">{dict.common.notFoundBody}</p>
        <Link href={path(defaultLocale)} className="mt-8 inline-block rounded-full bg-espresso px-7 py-3.5 font-bold text-cream-ink">
          {dict.common.backHome}
        </Link>
      </div>
    </div>
  );
}
