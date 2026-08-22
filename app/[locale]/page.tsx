import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import { shopJsonLd } from "@/lib/schema";
import { BloomIntro } from "@/components/intro/BloomIntro";
import { Header } from "@/components/ui/Header";
import { CoffeeRingCursor } from "@/components/ui/CoffeeRingCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { HeroPour } from "@/components/hero/HeroPour";
import { CupWorlds } from "@/components/worlds/CupWorlds";
import { DrinkBuilder } from "@/components/builder/DrinkBuilder";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { Verdict } from "@/components/verdict/Verdict";
import { Shop } from "@/components/shop/Shop";
import { Footer } from "@/components/footer/Footer";

/** PLACEHOLDER — domain undecided (site-plan §9). */
const BASE_URL = "https://clocoffee.com";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd(locale, BASE_URL)) }}
      />
      <BloomIntro skipLabel={dict.a11y.skipIntro} />
      <SmoothScroll />
      <CoffeeRingCursor />
      <Header dict={dict} locale={locale} />
      <main>
        <HeroPour dict={dict} />
        <CupWorlds dict={dict} />
        <DrinkBuilder dict={dict} locale={locale} />
        <MenuGrid dict={dict} locale={locale} />
        <Verdict dict={dict} />
        <Shop dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
