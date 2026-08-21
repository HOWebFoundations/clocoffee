"use client";
import { useEffect, useRef, useState } from "react";
import { cups, type CupId } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

/**
 * Three cups, three worlds. Desktop: the section pins and the three panels
 * travel horizontally (GSAP ScrollTrigger, dynamically imported, RTL-aware).
 * Mobile: swipe cards via scroll-snap. The stage tints to the active world.
 * Tap a cup to pour: the panel's poster crossfades into its Seedance clip.
 */
export function CupWorlds({ dict, locale }: { dict: Dict; locale: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !stage.current || !track.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const rtl = document.documentElement.dir === "rtl";
      const panels = track.current.children.length;
      const tween = gsap.to(track.current, {
        xPercent: (rtl ? 1 : -1) * (100 * (panels - 1)) / panels,
        ease: "none",
        scrollTrigger: {
          trigger: stage.current,
          pin: true,
          scrub: 0.6,
          snap: 1 / (panels - 1),
          end: () => `+=${window.innerHeight * (panels - 1)}`,
          onUpdate: (self) => setActive(Math.round(self.progress * (panels - 1))),
        },
      });
      cleanup = () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  // mobile: track active card from scroll-snap position
  const onTrackScroll = () => {
    const el = track.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    setActive(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
  };

  const world = cups[active] ?? cups[0];
  return (
    <section
      id="cups"
      ref={stage}
      className="world-stage relative overflow-hidden"
      style={{ backgroundColor: world.world.tint, color: world.textOnWorld === "dark" ? "var(--color-espresso)" : "var(--color-cream-ink)" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-14 text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.worlds.heading}</h2>
        <p className="mt-2 opacity-80">{dict.worlds.sub}</p>
      </div>
      <div
        ref={track}
        onScroll={onTrackScroll}
        className="no-scrollbar flex h-svh snap-x snap-mandatory overflow-x-auto md:w-[300%] md:snap-none md:overflow-visible"
      >
        {cups.map((cup, i) => (
          <CupPanel key={cup.id} cup={cup} dict={dict} index={i} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2 md:hidden">
        {cups.map((c, i) => (
          <span key={c.id} className={`h-2 w-2 rounded-full transition-all ${i === active ? "w-6 bg-current" : "bg-current/40"}`} />
        ))}
      </div>
    </section>
  );
}

function CupPanel({ cup, dict, index }: { cup: (typeof cups)[number]; dict: Dict; index: number }) {
  const [pouring, setPouring] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const info = dict.worlds.cups[cup.id as CupId];

  // gentle mouse parallax on the cup figure (fine pointers only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = figRef.current?.closest("article") as HTMLElement | null;
    const fig = figRef.current;
    if (!el || !fig) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      fig.style.transform = `translate(${dx * 14}px, ${dy * 10}px)`;
    };
    const reset = () => { fig.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); };
  }, []);

  const pour = () => {
    const v = videoRef.current;
    if (!v) return;
    if (pouring) { v.pause(); v.currentTime = 0; setPouring(false); return; }
    setPouring(true);
    v.currentTime = 0;
    v.play().catch(() => setPouring(false));
  };

  return (
    <article className="relative flex h-svh w-full shrink-0 snap-center flex-col items-center justify-center px-8 pt-24 md:w-1/3">
      <div ref={figRef} className="relative w-[min(64vw,300px)] transition-transform duration-200 ease-out">
        <button
          type="button"
          onClick={pour}
          aria-label={pouring ? dict.a11y.pausePour : dict.a11y.playPour}
          className="group relative block w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
        >
          <picture className={pouring ? "invisible" : ""}>
            <source srcSet={`${cup.poster}.avif`} type="image/avif" />
            <img src={`${cup.poster}.webp`} alt={info.name} loading="lazy" className="aspect-[9/16] w-full object-cover" />
          </picture>
          <video
            ref={videoRef}
            src={cup.video}
            muted
            playsInline
            preload="none"
            onEnded={() => setPouring(false)}
            className={`absolute inset-0 h-full w-full object-cover ${pouring ? "" : "invisible"}`}
          />
          <span className="absolute inset-x-0 bottom-0 scrim-b px-4 pb-4 pt-12 text-center text-sm font-bold text-white/95">
            {pouring ? dict.worlds.pouring : dict.worlds.tapToPour}
          </span>
        </button>
      </div>
      <h3 className="mt-6 text-2xl font-extrabold">{info.name}</h3>
      <p className="mt-2 max-w-xs text-center leading-relaxed opacity-85">{info.story}</p>
    </article>
  );
}
