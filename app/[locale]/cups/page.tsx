import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { CupWorlds } from "@/components/worlds/CupWorlds";
import { NextUp } from "@/components/ui/NextUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "cups", "cups", "/media/posters/iris.webp");
}

export default async function CupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);
  return (
    <>
      <CupWorlds dict={dict} locale={locale} />
      <NextUp dict={dict} locale={locale} exclude="cups" />
    </>
  );
}
