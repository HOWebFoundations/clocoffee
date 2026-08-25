"use client";
import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

const FRAME_COUNT = 120;
const frameSrc = (i: number) => media(`/media/frames/${String(i).padStart(3, "0")}.webp`);

/**
 * The Pour. A 300vh scroll runway (collapsing to one viewport under reduced
 * motion); the sticky stage draws the swirl frame sequence to canvas as you
 * scroll and the headline rises with the coffee. The AVIF/WebP poster paints
 * first and is the LCP. Frames load coarse-first, the full set only once the
 * hero is on screen and the connection isn't data-saving; a failed frame is
 * retired so the nearest-frame scan never sticks on it. Scroll work attaches
 * only while the runway is visible.
 */
export function HeroPour({ dict, locale }: { dict: Dict; locale: string }) {
  const runway = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // the 576-wide frames are native density on phones and soft on desktop, so
    // the scrub is a mobile experience; desktop gets the wide 4K still.
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let loaded = 0, disposed = false, current = -1, pending = 0;

    const usable = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;

    const draw = (i: number) => {
      let j = i;
      while (j > 0 && !usable(frames[j])) j--;
      const img = frames[j];
      if (!usable(img) || j === current) return;
      current = j;
      const { width: cw, height: ch } = canvas;
      const s = Math.max(cw / img!.naturalWidth, ch / img!.naturalHeight);
      const w = img!.naturalWidth * s, h = img!.naturalHeight * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img!, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      current = -1;
      onScroll();
    };

    // Denominator uses the sticky stage's own height, not window.innerHeight —
    // mobile toolbar collapse changes innerHeight mid-gesture and made p jump.
    const progress = () => {
      const el = runway.current, st = stageRef.current;
      if (!el || !st) return 0;
      const total = el.getBoundingClientRect().height - st.clientHeight;
      if (total <= 0) return 1;
      return Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
    };

    const onScroll = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        const p = progress();
        draw(Math.round(p * (FRAME_COUNT - 1)));
        const hl = headlineRef.current;
        if (hl) {
          hl.style.transform = `translateY(${(1 - p) * 12}vh)`;
          hl.style.opacity = String(0.55 + p * 0.45);
        }
      });
    };

    const load = (i: number, done?: () => void) => {
      if (frames[i]) { done?.(); return; }
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (disposed) return;
        loaded++;
        if (loaded === 4) setReady(true);
        // pre-decode off the tap path so drawImage never hitches on first paint
        img.decode?.().catch(() => {}).finally(() => { current = -1; onScroll(); done?.(); });
      };
      // a broken frame must not poison the nearest-frame scan: retire it
      img.onerror = () => { if (!disposed) frames[i] = undefined; done?.(); };
      frames[i] = img;
    };

    // coarse pass immediately (every 8th frame keeps the scrub functional)
    for (let i = 0; i < FRAME_COUNT; i += 8) load(i);

    // full fill: only when the hero is on screen, never under data-saver
    type NetInfo = { saveData?: boolean; effectiveType?: string };
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    const frugal = !!conn && (conn.saveData === true || /(^|\b)2g/.test(conn.effectiveType ?? ""));
    // fill with bounded concurrency: 120 parallel fetches starve the pour
    // videos and jank the scroll on 4G, so drip them 6 at a time
    let filled = false;
    const fill = () => {
      if (filled || frugal) return;
      filled = true;
      let next = 0;
      const pump = () => {
        while (next < FRAME_COUNT && inflight < 6) {
          if (frames[next]) { next++; continue; }
          inflight++;
          load(next++, () => { inflight--; pump(); });
        }
      };
      let inflight = 0;
      pump();
    };

    // scroll/resize listeners live only while the runway is visible
    let listening = false;
    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", size);
      size();
    };
    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { attach(); fill(); }
        else detach();
      },
      { rootMargin: "25% 0px" },
    );
    if (runway.current) io.observe(runway.current);

    return () => {
      disposed = true;
      io.disconnect();
      detach();
      cancelAnimationFrame(pending);
    };
  }, []);

  return (
    <section ref={runway} id="top" className="relative h-[300vh] motion-reduce:h-auto md:h-auto">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-cream motion-reduce:static md:static">
        {/* poster paints first — AVIF then WebP (site-plan §6) */}
        <picture className={`absolute inset-0 transition-opacity duration-500 md:opacity-100 ${ready ? "opacity-0" : "opacity-100"}`}>
          {/* desktop: the 21:9 outpainted, 4K-upscaled hero; mobile: the vertical original */}
          <source media="(min-width: 768px)" srcSet={media("/media/posters/hero-wide.avif")} type="image/avif" />
          <source media="(min-width: 768px)" srcSet={media("/media/posters/hero-wide.webp")} type="image/webp" />
          <source srcSet={media("/media/posters/hero.avif")} type="image/avif" />
          <img
            src={media("/media/posters/hero.webp")}
            alt={dict.a11y.heroAlt}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full motion-reduce:hidden md:hidden" aria-hidden="true" />
        {/* cream scrim: the filled cup is dark amber where the headline lands */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46svh] bg-gradient-to-t from-cream via-cream/80 to-transparent" aria-hidden="true" />

        <div ref={headlineRef} className="absolute inset-x-0 bottom-[14svh] px-6 text-center md:bottom-[7svh]">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-espresso sm:text-6xl">
            {dict.hero.tagline}
          </h1>
          <p className="mt-3 text-lg text-espresso/80">{dict.hero.sub}</p>
          <p className="mt-2 text-sm font-semibold text-espresso/70">{dict.status.conceptNote}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`/${locale}/cups`}
              className="btn btn-solid font-bold "
            >
              {dict.common.seeAllCups}
            </a>
            <a
              href={`/${locale}/menu`}
              className="btn btn-ghost font-bold text-espresso  "
            >
              {dict.hero.seeMenu}
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[4.5rem] flex justify-center">
          <span className="rounded-full bg-paper/90 px-4 py-1.5 text-sm font-semibold text-espresso/75 motion-reduce:hidden">
            {dict.hero.scroll} ↓
          </span>
        </div>
      </div>
    </section>
  );
}
