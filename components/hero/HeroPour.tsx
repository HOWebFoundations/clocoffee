"use client";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

const FRAME_COUNT = 120;
const frameSrc = (i: number) => `/media/frames/${String(i).padStart(3, "0")}.webp`;

/**
 * The Pour. A 300vh scroll runway; the sticky stage draws the swirl frame
 * sequence to canvas as you scroll, and the headline rises with the coffee.
 * AVIF/WebP poster paints first (LCP); frames load progressively behind it.
 * Reduced motion or load failure ⇒ the poster simply stays.
 */
export function HeroPour({ dict, locale }: { dict: Dict; locale: string }) {
  const runway = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let loaded = 0, disposed = false, current = -1, pending = 0;

    const draw = (i: number) => {
      // nearest loaded frame at or below i, so partial loads still scrub
      let j = i;
      while (j > 0 && !frames[j]?.complete) j--;
      const img = frames[j];
      if (!img?.complete || !img.naturalWidth) return;
      if (j === current) return;
      current = j;
      const { width: cw, height: ch } = canvas;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      current = -1;
      onScroll();
    };

    const progress = () => {
      const el = runway.current;
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / total));
    };

    const onScroll = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        const p = progress();
        draw(Math.round(p * (FRAME_COUNT - 1)));
        const hl = headlineRef.current;
        if (hl) {
          // the headline rises with the coffee: 12vh drift + fade-in
          hl.style.transform = `translateY(${(1 - p) * 12}vh)`;
          hl.style.opacity = String(0.55 + p * 0.45);
        }
      });
    };

    const load = (i: number, cb?: () => void) => {
      if (frames[i]) return;
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (disposed) return;
        loaded++;
        if (loaded === 4) { setReady(true); onScroll(); }
        current = -1; onScroll();
        cb?.();
      };
      frames[i] = img;
    };

    // coarse pass first (every 8th), then fill
    for (let i = 0; i < FRAME_COUNT; i += 8) load(i);
    const fill = setTimeout(() => { for (let i = 0; i < FRAME_COUNT; i++) load(i); }, 800);

    size();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    return () => {
      disposed = true;
      clearTimeout(fill);
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <section ref={runway} id="top" className="relative h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-cream">
        {/* poster paints first — AVIF then WebP (site-plan §6) */}
        <picture className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}>
          <source srcSet="/media/posters/hero.avif" type="image/avif" />
          <img
            src="/media/posters/hero.webp"
            alt={dict.a11y.heroAlt}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        {/* cream scrim: the filled cup is dark amber where the headline lands (brand.md §4 logic) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46svh] bg-gradient-to-t from-cream via-cream/80 to-transparent" aria-hidden="true" />

        <div ref={headlineRef} className="absolute inset-x-0 bottom-[14svh] px-6 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-espresso sm:text-6xl">
            {dict.hero.tagline}
          </h1>
          <p className="mt-3 text-lg text-espresso/80">{dict.hero.sub}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`#builder`}
              className="btn-liquid rounded-full bg-espresso px-7 py-3.5 font-bold text-cream-ink [--liquid:var(--color-violet-deep)]"
            >
              {dict.hero.orderWhatsapp}
            </a>
            <a
              href={`#menu`}
              className="btn-liquid rounded-full border-2 border-espresso px-7 py-3.5 font-bold text-espresso hover:text-cream-ink [--liquid:var(--color-espresso)]"
            >
              {dict.hero.seeMenu}
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[4.5rem] flex justify-center">
          <span className="rounded-full bg-paper/70 px-4 py-1.5 text-sm font-semibold text-espresso/70 backdrop-blur motion-reduce:hidden">
            {dict.hero.scroll} ↓
          </span>
        </div>
      </div>
    </section>
  );
}
