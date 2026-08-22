"use client";
import { useEffect } from "react";

/** Lenis smooth scroll, dynamically imported; no-op under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // touch scrolling is native anyway — don't ship the chunk or run a rAF loop on phones
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.12 });
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelled = true; cancelAnimationFrame(raf); lenis?.destroy(); };
  }, []);
  return null;
}
