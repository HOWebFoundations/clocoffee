import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, media, type Locale } from "@/lib/config";
import { path } from "@/lib/routes";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { NextUp } from "@/components/ui/NextUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "about", "about", "/media/posters/blossom.webp");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);

  return (
    <>
      <article className="bg-cream px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h1 className="text-4xl sm:text-6xl">{dict.about.heading}</h1>
            <p className="mt-4 text-lg text-espresso/75">{dict.about.lede}</p>
            <div className="mt-8 space-y-5 leading-relaxed text-espresso/85">
              {dict.about.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <Link
              href={path(locale, "cups")}
              className="btn btn-solid mt-10 inline-block font-bold "
            >
              {dict.about.cta}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["blossom", "iris", "ditsy"].map((id, i) => (
              <picture key={id} className={i === 0 ? "col-span-2" : ""}>
                <source srcSet={media(`/media/posters/${id}.avif`)} type="image/avif" />
                <img
                  src={media(`/media/posters/${id}.webp`)}
                  alt=""
                  loading="lazy"
                  className={`w-full plate object-cover ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
                />
              </picture>
            ))}
          </div>
        </div>
      </article>
      <NextUp dict={dict} locale={locale} exclude="about" />
    </>
  );
}
