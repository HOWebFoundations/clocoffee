import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Verdict } from "@/components/verdict/Verdict";
import { NextUp } from "@/components/ui/NextUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "verdict", "verdict");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);
  return (
    <>
      <Verdict dict={dict} />
      <NextUp dict={dict} locale={locale} exclude="verdict" />
    </>
  );
}
