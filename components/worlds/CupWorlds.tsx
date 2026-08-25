"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cups, type CupId, type Locale } from "@/lib/config";
import { path } from "@/lib/routes";
import { CupStage } from "./CupStage";
import type { Dict } from "@/lib/i18n";

/**
 * Three cups, three worlds.
 *
 * The BASE layout at every width is a scroll-snap carousel — native scrolling,
 * keyboard- and RTL-safe, and fully usable with no JS, a failed gsap chunk, or
 * prefers-reduced-motion. On desktop pointers without reduced motion,
 * gsap.matchMedia() upgrades it to a pinned horizontal scrub by setting
 * data-pinned on the section (CSS keys off that), and cleanly reverts when the
 * breakpoint or motion preference changes — crossing 768px never strands the
 * section in a half-configured state.
 */
export function CupWorlds({ dict, locale }: { dict: Dict; locale: Locale }) {
  const stage = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !stage.current || !track.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const section = stage.current!, tr = track.current!;
          section.dataset.pinned = "true";
          const rtl = document.documentElement.dir === "rtl";
          const panels = tr.children.length;
          const tween = gsap.fromTo(tr, { xPercent: 0 }, {
            xPercent: (rtl ? 1 : -1) * (100 * (panels - 1)) / panels,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 0.35,
              snap: 1 / (panels - 1),
              end: () => `+=${window.innerHeight * (panels - 1)}`,
              onUpdate: (self) => setActive(Math.round(self.progress * (panels - 1))),
            },
          });
          return () => {
            delete section.dataset.pinned;
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(tr, { clearProps: "transform" });
          };
        });
        cleanup = () => mm.revert();
      })
      .catch(() => { /* carousel base layout remains fully usable */ });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  // carousel mode: track the active card from the snap position (RTL-safe via abs)
  const onTrackScroll = () => {
    const el = track.current;
    if (!el || stage.current?.dataset.pinned) return;
    const idx = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    setActive((prev) => (prev === idx ? prev : idx));
  };

  const world = cups[active] ?? cups[0];
  return (
    <section
      id="cups"
      ref={stage}
      className="world-stage group/stage relative overflow-hidden"
      style={{
        backgroundColor: world.world.tint,
        color: world.textOnWorld === "dark" ? "var(--color-espresso)" : "var(--color-cream-ink)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-14 text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">{dict.worlds.heading}</h1>
        <p className="mt-2 opacity-85">{dict.worlds.sub}</p>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-70">{dict.status.glassesHeading}</p>
      </div>
      <div
        ref={track}
        onScroll={onTrackScroll}
        className="no-scrollbar worlds-track flex h-svh snap-x snap-mandatory overflow-x-auto"
      >
        {cups.map((cup) => (
          <CupPanel key={cup.id} cup={cup} dict={dict} locale={locale} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2 group-data-[pinned]/stage:hidden">
        {cups.map((c, i) => (
          <span key={c.id} className={`h-2 w-2 rounded-full transition-all ${i === active ? "w-6 bg-current" : "bg-current/40"}`} />
        ))}
      </div>
    </section>
  );
}

function CupPanel({ cup, dict, locale }: { cup: (typeof cups)[number]; dict: Dict; locale: Locale }) {
  const info = dict.worlds.cups[cup.id as CupId];
  return (
    <article className="relative flex h-svh w-full shrink-0 snap-center flex-col items-center justify-center px-8 pt-24">
      <CupStage cup={cup} dict={dict} parallax />
      <h3 className="mt-6 text-2xl font-extrabold">{info.name}</h3>
      <p className="mt-2 max-w-xs text-center leading-relaxed opacity-90">{info.story}</p>
      <Link
        href={path(locale, "cups", cup.id)}
        className="mt-4 rounded-full border-2 border-current px-5 py-2 text-sm font-bold"
      >
        {info.name} <span aria-hidden="true" className="rtl:hidden">→</span><span aria-hidden="true" className="ltr:hidden">←</span>
      </Link>
    </article>
  );
}
