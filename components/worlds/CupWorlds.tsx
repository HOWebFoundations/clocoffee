"use client";
import { useEffect, useRef, useState } from "react";
import { cups, media, type CupId } from "@/lib/config";
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
export function CupWorlds({ dict }: { dict: Dict }) {
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
        <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.worlds.heading}</h2>
        <p className="mt-2 opacity-85">{dict.worlds.sub}</p>
      </div>
      <div
        ref={track}
        onScroll={onTrackScroll}
        className="no-scrollbar worlds-track flex h-svh snap-x snap-mandatory overflow-x-auto"
      >
        {cups.map((cup) => (
          <CupPanel key={cup.id} cup={cup} dict={dict} />
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

function CupPanel({ cup, dict }: { cup: (typeof cups)[number]; dict: Dict }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "playing">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const info = dict.worlds.cups[cup.id as CupId];

  // gentle pointer parallax on the cup figure (fine pointers, motion allowed)
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

  // a slow network must not leave the button looking dead: bail back to idle
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("idle"), 12000);
    return () => clearTimeout(t);
  }, [phase]);

  const pour = () => {
    const v = videoRef.current;
    if (!v) return;
    if (phase !== "idle") { v.pause(); v.currentTime = 0; setPhase("idle"); return; }
    setPhase("loading");
    v.currentTime = 0;
    v.play().catch(() => setPhase("idle"));
  };

  return (
    <article className="relative flex h-svh w-full shrink-0 snap-center flex-col items-center justify-center px-8 pt-24">
      <div ref={figRef} className="relative w-[min(64vw,300px)] transition-transform duration-200 ease-out">
        {/* accessible name comes from the img alt + visible caption, matching what sighted users see */}
        <button
          type="button"
          onClick={pour}
          aria-pressed={phase !== "idle"}
          className="group relative block w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] active:scale-[0.98] transition-transform"
        >
          {/* poster stays until the video is genuinely rendering frames */}
          <picture className={phase === "playing" ? "invisible" : ""}>
            <source srcSet={media(`${cup.poster}.avif`)} type="image/avif" />
            <img src={media(`${cup.poster}.webp`)} alt={info.name} loading="lazy" className="aspect-[9/16] w-full object-cover" />
          </picture>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            poster={media(`${cup.poster}.webp`)}
            onPlaying={() => setPhase("playing")}
            onError={() => setPhase("idle")}
            onEnded={() => setPhase("idle")}
            className={`absolute inset-0 h-full w-full object-cover ${phase === "playing" ? "" : "invisible"}`}
          >
            {/* mp4 first for Safari; webm covers browsers without H.264 */}
            <source src={media(cup.video)} type="video/mp4" />
            <source src={media(cup.video.replace(".mp4", ".webm"))} type="video/webm" />
          </video>
          <span className={`absolute inset-x-0 bottom-0 scrim-b px-4 pb-4 pt-12 text-center text-sm font-bold text-white/95 ${phase === "loading" ? "animate-pulse" : ""}`}>
            {phase === "idle" ? dict.worlds.tapToPour : dict.worlds.pouring}
          </span>
        </button>
      </div>
      <h3 className="mt-6 text-2xl font-extrabold">{info.name}</h3>
      <p className="mt-2 max-w-xs text-center leading-relaxed opacity-90">{info.story}</p>
    </article>
  );
}
