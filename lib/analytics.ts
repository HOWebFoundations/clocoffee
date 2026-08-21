/**
 * One KPI matters: completed WhatsApp handoffs (site-plan §7).
 * No-op unless Plausible is present; wire NEXT_PUBLIC_PLAUSIBLE_DOMAIN + the
 * script tag at launch. Zero cookies either way.
 */
type Props = Record<string, string | number | boolean>;
declare global {
  interface Window { plausible?: (event: string, opts?: { props?: Props }) => void }
}
export function track(event: string, props?: Props) {
  try { window.plausible?.(event, props ? { props } : undefined); } catch { /* never break the page */ }
}
