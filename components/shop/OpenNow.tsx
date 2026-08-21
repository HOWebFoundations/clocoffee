"use client";
import { useEffect, useState } from "react";
import { openNow } from "@/lib/hours";
import type { Dict } from "@/lib/i18n";

/** Open-now chip, computed client-side in Asia/Beirut so static pages never go stale. */
export function OpenNow({ dict }: { dict: Dict }) {
  const [state, setState] = useState<ReturnType<typeof openNow> | null>(null);
  useEffect(() => {
    const tick = () => setState(openNow());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  if (!state) return <span className="inline-block h-8 w-32 animate-pulse rounded-full bg-espresso/10" />;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
        state.open ? "bg-[#3d5a3a] text-[#e9f0e4]" : "bg-espresso/10 text-espresso/70"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${state.open ? "bg-[#a9d9a0]" : "bg-espresso/40"}`} />
      {state.open ? dict.shop.openNow : dict.shop.closedNow}
      {state.todayOpen && (
        <span className="font-medium opacity-80">
          · {dict.shop.hoursToday} {state.todayOpen}–{state.todayClose}
        </span>
      )}
    </span>
  );
}
