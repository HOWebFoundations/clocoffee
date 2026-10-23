import { CandidateA } from "@/components/order/glass/CandidateA";
import { CandidateB } from "@/components/order/glass/CandidateB";
import { CandidateC } from "@/components/order/glass/CandidateC";
import { CandidateD } from "@/components/order/glass/CandidateD";
import { WORLD, type DrinkSpec } from "@/components/order/glass/types";

/** TEMPORARY design lab: every candidate × a set of states, for judging. Delete after. */
const STATES: { label: string; spec: DrinkSpec }[] = [
  { label: "hot espresso", spec: { temp: "hot", base: "coffee", milk: "none", sweet: "zero", syrup: "none", topping: "none", world: "iris" } },
  { label: "hot oat latte · caramel · cinnamon", spec: { temp: "hot", base: "coffee", milk: "oat", sweet: "half", syrup: "caramel", topping: "cinnamon", world: "blossom" } },
  { label: "iced almond latte · vanilla", spec: { temp: "iced", base: "coffee", milk: "almond", sweet: "full", syrup: "vanilla", topping: "none", world: "ditsy" } },
  { label: "hot matcha latte · rose · flower", spec: { temp: "hot", base: "matcha", milk: "whole", sweet: "half", syrup: "rose", topping: "flower", world: "blossom" } },
  { label: "iced matcha · pistachio · cocoa", spec: { temp: "iced", base: "matcha", milk: "none", sweet: "zero", syrup: "pistachio", topping: "cocoa", world: "iris" } },
];
const CANDIDATES = { A: CandidateA, B: CandidateB, C: CandidateC, D: CandidateD };

export default function Lab() {
  return (
    <div className="bg-cream px-6 pb-20 pt-24">
      {(Object.keys(CANDIDATES) as (keyof typeof CANDIDATES)[]).map((k) => {
        const C = CANDIDATES[k];
        return (
          <section key={k} id={`cand-${k}`} className="mb-16">
            <h2 className="mb-4 text-3xl">Candidate {k}</h2>
            <div className="grid grid-cols-5 gap-4">
              {STATES.map((s, i) => (
                <figure key={i} className="rounded-2xl p-4"
                        style={{ background: `linear-gradient(180deg, ${WORLD[s.spec.world].bg2}, ${WORLD[s.spec.world].bg})` }}>
                  <C spec={s.spec} uid={`${k}${i}`} animate={false} className="mx-auto h-64 w-auto" />
                  <figcaption className="mt-2 text-center text-xs" style={{ color: WORLD[s.spec.world].text === "light" ? "#EEE0C6" : "#392618" }}>{s.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
