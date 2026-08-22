import type { Metadata } from "next";
import { Nunito, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, rtlLocales, type Locale } from "@/lib/config";
import { BASE_URL } from "@/lib/routes";
import { getDict } from "@/lib/i18n";
import { shopJsonLd } from "@/lib/schema";
import { BloomIntro } from "@/components/intro/BloomIntro";
import { Header } from "@/components/ui/Header";
import { CoffeeRingCursor } from "@/components/ui/CoffeeRingCursor";
import { OrderBar } from "@/components/ui/OrderBar";
import { Footer } from "@/components/footer/Footer";
import "../globals.css";

const latin = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-latin", display: "swap" });
// preload:false — otherwise all three Arabic weights (~108KB) are preloaded on
// the en/fr pages too; /ar pays a swap flash instead, which display:"swap" handles.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic", display: "swap", preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return {
    metadataBase: new URL(BASE_URL),
    title: { default: dict.meta.title, template: `%s · clocoffee` },
    description: dict.meta.description,
    icons: { icon: "/media/icon.png", apple: "/media/apple-icon.png" },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  const dict = getDict(locale);
  return (
    <html lang={locale} dir={dir} className={`${latin.variable} ${arabic.variable}`}>
      <body className={locale === "ar" ? "[font-family:var(--font-arabic),var(--font-latin),sans-serif]" : undefined}>
        {/* Organisation-level schema rides on every page; page-specific schema
            (Menu, breadcrumbs) is added by the individual routes. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd(locale, BASE_URL)) }}
        />
        <BloomIntro skipLabel={dict.a11y.skipIntro} />
        <CoffeeRingCursor />
        <Header dict={dict} locale={locale} />
        {/* pb-24 clears the mobile order bar */}
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer dict={dict} locale={locale} />
        <OrderBar dict={dict} />
      </body>
    </html>
  );
}
