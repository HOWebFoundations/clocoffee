"use client";
import { useRef, useState } from "react";

export function Reel({ video, poster, playLabel, pauseLabel }: {
  video: string; poster: string; playLabel: string; pauseLabel: string;
}) {
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
      <button type="button" onClick={toggle} aria-pressed={playing} aria-label={playing ? pauseLabel : playLabel} className="relative block w-full">
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
