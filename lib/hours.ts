import { shop } from "./config";

/** Is the shop open right now, computed in the shop's own timezone. */
export function openNow(now = new Date()): { open: boolean; todayOpen: string | null; todayClose: string | null } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: shop.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const today = shop.hours[dayIdx];
  if (!today) return { open: false, todayOpen: null, todayClose: null };
  const hm = `${get("hour") === "24" ? "00" : get("hour")}:${get("minute")}`;
  return { open: hm >= today.open && hm < today.close, todayOpen: today.open, todayClose: today.close };
}
