"use client";
import { shop } from "@/lib/config";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";

/**
 * Mobile-only sticky order bar. Every page keeps the one action that matters
 * within thumb reach — the site's single KPI is completed WhatsApp handoffs.
 */
export function OrderBar({ dict }: { dict: Dict }) {
  // nothing can be ordered yet; the only honest standing action is following
  const href = `https://instagram.com/${shop.instagram}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 px-4 py-3 md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("instagram_click", { source: "orderbar" })}
        className="block rounded-full bg-espresso py-3.5 text-center font-bold text-cream-ink active:scale-[0.98] transition-transform"
      >
        {dict.status.cafeCta}
      </a>
    </div>
  );
}
