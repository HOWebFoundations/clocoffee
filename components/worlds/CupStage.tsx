"use client";
import { useEffect, useRef, useState } from "react";
import { media, type cups as cupList } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

type Cup = (typeof cupList)[number];

/**
 * One cup: poster, tap-to-pour video, caption. The single implementation of
 * the pour behaviour — used by the cups carousel and by each cup's own page.
 *
 * Playback is deliberately defensive: two source formats, a loading phase so
 * the button never looks dead on a slow connection, poster held until frames
 * actually render, and a timeout back to idle.
 */
export function CupStage({ cup, dict, parallax = false, className = "" }: {
  cup: Cup; dict: Dict; parallax?: boolean; className?: string;
}) {
  const [phase, setPhase] = useState<"idle" | "loading" | "playing">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const info = dict.worlds.cups[cup.id];

  useEffect(() => {
    if (!parallax) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fig = figRef.current;
    const el = fig?.parentElement;
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
  }, [parallax]);

  // a slow network must not leave the button looking dead
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
    <div ref={figRef} className={`relative mx-auto w-[min(64vw,300px)] transition-transform duration-200 ease-out ${className}`}>
      <button
        type="button"
        onClick={pour}
        aria-pressed={phase !== "idle"}
        className="group relative block w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] transition-transform active:scale-[0.98]"
      >
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
  );
}
