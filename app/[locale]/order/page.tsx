import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/config";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { OrderBuilder } from "@/components/order/OrderBuilder";
import { NextUp } from "@/components/ui/NextUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale as Locale, "order", "order");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);
  return (
    <>
      <OrderBuilder dict={dict} locale={locale} />
      <NextUp dict={dict} locale={locale} exclude="order" />
    </>
  );
}
