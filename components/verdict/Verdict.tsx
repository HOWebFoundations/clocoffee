import { cups, media } from "@/lib/config";
import type { Dict } from "@/lib/i18n";
import { Reel } from "./Reel";

/**
 * The Clo Coffee Verdict — phone-framed 9:16 reels. Server component: only the
 * Reel play buttons need JS. The real reviewer takes don't exist yet; the cup
 * clips stand in, and the section says so honestly rather than faking reviews.
 */
export function Verdict({ dict }: { dict: Dict }) {
  return (
    <section id="verdict" className="bg-espresso px-6 pb-20 pt-28 text-cream-ink sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold sm:text-5xl">{dict.verdict.heading}</h1>
        {/* blush display type is AAA on espresso — brand.md §4 */}
        <p className="mt-2 text-lg font-semibold text-blush">{dict.verdict.sub}</p>
        <p className="mt-1 text-sm text-cream-ink/70">{dict.verdict.placeholder}</p>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {cups.map((cup) => (
            <Reel
              key={cup.id}
              video={media(cup.video)}
              poster={media(`${cup.poster}.webp`)}
              playLabel={`${dict.worlds.cups[cup.id].name} — ${dict.a11y.playPour}`}
              pauseLabel={`${dict.worlds.cups[cup.id].name} — ${dict.a11y.pausePour}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
