import { shop, type Locale } from "@/lib/config";
import type { Dict } from "@/lib/i18n";
import { OpenNow } from "./OpenNow";

/**
 * The shop. Real interior photos are NOT here yet — the two storefront
 * renders on hand show buildings that don't exist and must not ship
 * (docs/brand.md §6), so this section reserves the space and says so.
 */
export function Shop({ dict, locale }: { dict: Dict; locale: Locale }) {
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.mapQuery)}`;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(shop.mapQuery)}&output=embed`;
  return (
    <section id="visit" className="bg-cream px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.shop.heading}</h2>
        <p className="mt-2 text-espresso/70">{dict.shop.sub}</p>
        <div className="mt-4"><OpenNow dict={dict} /></div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-espresso/25 bg-paper/60 p-8 text-center text-espresso/55">
              <p className="max-w-xs text-sm leading-relaxed">{dict.shop.photosSoon}</p>
            </div>
            <address className="mt-5 not-italic text-espresso/80">{shop.address[locale]}</address>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={dirUrl} target="_blank" rel="noopener noreferrer"
                 className="btn-liquid rounded-full bg-espresso px-6 py-3 font-bold text-cream-ink [--liquid:var(--color-violet-deep)]">
                {dict.shop.directions}
              </a>
              <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noopener noreferrer"
                 className="btn-liquid rounded-full border-2 border-espresso px-6 py-3 font-bold hover:text-cream-ink [--liquid:var(--color-espresso)]">
                {dict.shop.whatsappUs}
              </a>
            </div>
            <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-espresso/60">{dict.shop.hoursHeading}</h3>
            <table className="mt-2 w-full max-w-xs text-sm">
              <tbody>
                {shop.hours.map((h, i) => (
                  <tr key={i} className="border-b border-espresso/10 last:border-0">
                    <td className="py-1.5 pe-6 font-semibold">{dict.shop.days[i]}</td>
                    <td className="py-1.5 text-espresso/70">{h ? `${h.open}–${h.close}` : dict.shop.closed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-2xl bg-paper/70 shadow-md">
            <iframe
              src={embed}
              title={dict.shop.heading}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
