import { shop, type Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";
import { Lately } from "../ui/Lately";

/**
 * There is no café. This page says so, then gives the two real things a
 * visitor can do about it: join the opening list, or get in touch. The list
 * runs on WhatsApp (how Beirut actually works) with email as the fallback.
 */
export function Shop({ dict, locale }: { dict: Dict; locale: Locale }) {
  void locale;
  const wa = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(dict.soon.waitMsg)}`;
  const mailWait = `mailto:${shop.email}?subject=${encodeURIComponent(dict.soon.waitHeading)}&body=${encodeURIComponent(dict.soon.waitMsg)}`;
  const mailContact = `mailto:${shop.email}?subject=${encodeURIComponent(dict.soon.contactHeading)}`;
  return (
    <>
      <section id="visit" className="bg-cream px-6 pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow inline-block rounded-full bg-espresso/8 px-4 py-1.5 text-espresso/70">{dict.status.badge}</span>
          <h1 className="mt-6 text-4xl sm:text-6xl">{dict.status.cafeHeading}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-espresso/80">{dict.status.cafeBody}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-espresso p-7 text-cream-ink sm:p-9">
            <h2 className="text-3xl">{dict.soon.waitHeading}</h2>
            <p className="mt-3 leading-relaxed text-cream-ink/80">{dict.soon.waitBody}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-cream-ink text-espresso">{dict.soon.waitCta}</a>
              <a href={mailWait} className="text-sm text-cream-ink/70 underline underline-offset-4">{shop.email}</a>
            </div>
          </div>
          <div className="rounded-3xl border border-espresso/15 bg-paper p-7 sm:p-9">
            <h2 className="text-3xl">{dict.soon.contactHeading}</h2>
            <p className="mt-3 leading-relaxed text-espresso/80">{dict.soon.contactBody}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href={mailContact} className="btn btn-solid">{dict.soon.contactCta}</a>
              <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-espresso/70 underline underline-offset-4">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-espresso/12 bg-paper/70 p-6 text-center sm:p-8">
          <h2 className="text-xl">{dict.status.glassesHeading}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-espresso/75">{dict.status.glassesNote}</p>
        </div>
      </section>
      <Lately dict={dict} />
    </>
  );
}
