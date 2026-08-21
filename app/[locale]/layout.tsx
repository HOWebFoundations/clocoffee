import type { Metadata } from "next";
import { Nunito, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, rtlLocales, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import "../globals.css";

const latin = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-latin", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic", display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return {
    metadataBase: new URL("https://clocoffee.com"), // PLACEHOLDER domain (site-plan §9)
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: "/media/icon.png", apple: "/media/apple-icon.png" },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/media/posters/hero.webp"],
    },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} className={`${latin.variable} ${arabic.variable}`}>
      <body className={locale === "ar" ? "[font-family:var(--font-arabic),var(--font-latin),sans-serif]" : undefined}>
        {children}
      </body>
    </html>
  );
}
