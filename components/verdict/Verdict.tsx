"use client";
import { useRef, useState } from "react";
import { cups } from "@/lib/config";
import type { Dict } from "@/lib/i18n";

/**
 * The Clo Coffee Verdict — phone-framed 9:16 reels. The real reviewer takes
 * don't exist yet (site-plan asset manifest); the cup clips stand in, and the
 * section says so honestly rather than faking reviews.
 */
export function Verdict({ dict }: { dict: Dict }) {
  return (
    <section id="verdict" className="bg-espresso px-6 py-20 text-cream-ink sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-extrabold sm:text-5xl">{dict.verdict.heading}</h2>
        {/* blush display type is AAA on espresso — brand.md §4 */}
        <p className="mt-2 text-lg font-semibold text-blush">{dict.verdict.sub}</p>
        <p className="mt-1 text-sm text-cream-ink/60">{dict.verdict.placeholder}</p>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {cups.map((cup) => (
            <Reel key={cup.id} video={cup.video} poster={`${cup.poster}.webp`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reel({ video, poster }: { video: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  return (
    <div className="phone-frame w-56 shrink-0 snap-center sm:w-64">
      <button type="button" onClick={toggle} className="relative block w-full" aria-pressed={playing}>
        <video ref={ref} src={video} poster={poster} muted loop playsInline preload="none" className="aspect-[9/16] w-full object-cover" />
        {!playing && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-paper/85 text-xl text-espresso">▶</span>
          </span>
        )}
      </button>
    </div>
  );
}
