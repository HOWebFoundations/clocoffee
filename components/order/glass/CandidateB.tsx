"use client";
import { useEffect, useState } from "react";
import {
  WORLD, SYRUP_COLOR, TOPPING_COLOR, liquidColors, fillLevel,
  type GlassProps,
} from "./types";

/**
 * Candidate B — restrained editorial realism.
 * One can-shaped tumbler, bamboo lid, bent glass straw. Few effects, exact
 * proportions, soft gradients. Everything lives inside the <svg> (ids and
 * CSS scoped by `uid`) so the story-card exporter can serialise it standalone.
 *
 * Coordinate notes (viewBox 300×420):
 *   glass outer  x 78–222, body y 151–372, neck y 116–128 (x 94–206)
 *   interior     x 84–216, floor y 364 (thick base 364–372)
 *   lid          y 100–112, straw leaves lid at (157,100)
 * The liquid is drawn in "surface space" (y = 0 at the surface) inside a group
 * translated to the fill level, so the level can rise / change with a single
 * CSS transform transition.
 */

const GLASS = "M94 116V128C94 137 80 139 78 151V354Q78 372 96 372H204Q222 372 222 354V151C220 139 206 137 206 128V116Z";
const INNER = "M99 121V130C99 139 86 141 84 153V352Q84 364 98 364H202Q216 364 216 352V153C214 141 201 139 201 130V121Z";
const STRAW_UP = "M157 102V64C157 44 170 32 186 20";
const STEAM = [
  "M150 94C142 80 160 72 152 56C146 44 158 34 150 18",
  "M172 92C180 78 164 70 172 54C178 42 166 32 170 16",
  "M128 94C122 82 136 74 128 60C122 48 134 40 126 26",
];
const CUBES = [
  { x: 121, y: 15, s: 36, r: -12, o: 0.85 },
  { x: 176, y: 10, s: 40, r: 9, o: 0.8 },
  { x: 146, y: 47, s: 32, r: -30, o: 0.55 },
  { x: 196, y: 44, s: 26, r: 20, o: 0.45 },
];

/** Straw inside the glass runs (157,109) → (141,362). */
function strawX(y: number) { return 141 + 16 * ((362 - y) / 253); }

function mix(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

/** Deterministic specks scattered over the surface ellipse (surface space). */
function specks(seed: number, n: number, rx: number, ry: number) {
  let s = seed;
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  const out: { x: number; y: number; k: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
    out.push({ x: 150 + Math.cos(a) * r * rx, y: Math.sin(a) * r * ry, k: 0.5 + rnd() * 0.9 });
  }
  return out;
}
const CINNAMON = specks(7, 26, 56, 4.4);
const COCOA = specks(11, 48, 58, 4.6);

export function CandidateB({ spec, uid, className = "", animate }: GlassProps) {
  const A = animate !== false;
  const [filled, setFilled] = useState(!A);
  useEffect(() => {
    if (!A) { setFilled(true); return; }
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setFilled(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [A]);

  const col = liquidColors(spec);
  const surfaceY = Math.round((364 - fillLevel(spec) * (364 - 153)) * 10) / 10;
  const bottomRel = 364 - surfaceY;
  const iced = spec.temp === "iced";
  const foam = !iced && col.foam ? col.foam : null;
  const foamH = foam ? (spec.milk === "none" ? 8 : 15) : 0;
  const world = WORLD[spec.world];
  const syrupCol = spec.syrup === "none" ? "#D9A441" : SYRUP_COLOR[spec.syrup];
  const ribbon = spec.sweet !== "zero";
  const full = spec.sweet === "full";
  const tintOnly = spec.sweet === "zero" && spec.syrup !== "none";
  const id = (n: string) => `${uid}-${n}`;
  const cls = (n: string) => (A ? `g${uid}-${n}` : undefined);
  const rise = filled ? surfaceY : 364;
  const sx = strawX(surfaceY);

  const css = A ? `
.g${uid}-rise{transition:transform .9s cubic-bezier(.22,.8,.26,1)}
.g${uid}-c{transition:fill .45s ease,stop-color .45s ease,stroke .45s ease,opacity .45s ease}
.g${uid}-cube{animation:g${uid}-drop .8s cubic-bezier(.3,1.3,.5,1) both}
.g${uid}-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:g${uid}-draw .9s .95s ease-out forwards}
.g${uid}-top{animation:g${uid}-fade .5s 1.05s ease both}
.g${uid}-steam{opacity:.3;animation:g${uid}-steam 3.8s ease-in-out infinite}
@keyframes g${uid}-drop{from{transform:translateY(-90px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes g${uid}-draw{to{stroke-dashoffset:0}}
@keyframes g${uid}-fade{from{opacity:0}to{opacity:1}}
@keyframes g${uid}-steam{0%{transform:translateY(8px);opacity:0}30%{opacity:.34}100%{transform:translateY(-18px);opacity:0}}
@media (prefers-reduced-motion:reduce){.g${uid} *{animation:none!important;transition:none!important}.g${uid}-draw{stroke-dashoffset:0}}
` : "";

  const label = `${spec.temp} ${spec.base}${spec.milk !== "none" ? ` ${spec.milk} latte` : ""}`;

  return (
    <svg viewBox="0 0 300 420" className={`g${uid} ${className}`} role="img" aria-label={label}>
      {A && <style>{css}</style>}
      <defs>
        <clipPath id={id("in")}><path d={INNER} /></clipPath>
        <clipPath id={id("gl")}><path d={GLASS} /></clipPath>

        {/* liquid: slightly darker just under the surface, light transmitted at the base */}
        <linearGradient id={id("liq")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={bottomRel}>
          <stop className={cls("c")} offset="0" stopColor={mix(col.body, "#000000", 0.08)} />
          <stop className={cls("c")} offset=".3" stopColor={col.body} />
          <stop className={cls("c")} offset=".72" stopColor={col.body} />
          <stop className={cls("c")} offset="1" stopColor={mix(col.body, col.top, 0.7)} />
        </linearGradient>
        {/* glass thins at the edges: lighter rims, darker core */}
        <linearGradient id={id("edge")} gradientUnits="userSpaceOnUse" x1="84" y1="0" x2="216" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".24" />
          <stop offset=".14" stopColor="#FFFFFF" stopOpacity=".05" />
          <stop offset=".4" stopColor="#000000" stopOpacity=".08" />
          <stop offset=".6" stopColor="#000000" stopOpacity=".08" />
          <stop offset=".86" stopColor="#FFFFFF" stopOpacity=".05" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id={id("glow")}>
          <stop className={cls("c")} offset="0" stopColor={col.top} stopOpacity=".55" />
          <stop className={cls("c")} offset=".6" stopColor={col.top} stopOpacity=".18" />
          <stop className={cls("c")} offset="1" stopColor={col.top} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("surf")} cx=".38" cy=".4" r=".7">
          <stop className={cls("c")} offset="0" stopColor={mix(col.top, "#FFFFFF", 0.18)} />
          <stop className={cls("c")} offset=".55" stopColor={col.top} />
          <stop className={cls("c")} offset="1" stopColor={mix(col.top, col.body, 0.4)} />
        </radialGradient>
        {foam && (
          <>
            <radialGradient id={id("foamtop")} cx=".4" cy=".4" r=".7">
              <stop className={cls("c")} offset="0" stopColor={mix(foam, "#FFFFFF", 0.22)} />
              <stop className={cls("c")} offset=".6" stopColor={foam} />
              <stop className={cls("c")} offset="1" stopColor={mix(foam, col.top, 0.3)} />
            </radialGradient>
            <linearGradient id={id("foamg")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={foamH + 2}>
              <stop className={cls("c")} offset="0" stopColor={mix(foam, "#FFFFFF", 0.08)} />
              <stop className={cls("c")} offset=".7" stopColor={foam} />
              <stop className={cls("c")} offset=".92" stopColor={mix(foam, col.top, 0.35)} />
              <stop className={cls("c")} offset="1" stopColor={mix(foam, col.top, 0.5)} stopOpacity=".4" />
            </linearGradient>
            <filter id={id("foamfx")} x="-5%" y="-40%" width="110%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency=".06 .18" numOctaves="2" seed="4" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d" />
              <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="9" result="s" />
              <feColorMatrix in="s" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 -.1" result="w" />
              <feComposite in="w" in2="d" operator="in" result="wi" />
              <feBlend in="wi" in2="d" mode="normal" />
            </filter>
          </>
        )}
        {full && (
          <linearGradient id={id("pool")} gradientUnits="userSpaceOnUse" x1="0" y1={bottomRel - 26} x2="0" y2={bottomRel + 14}>
            <stop className={cls("c")} offset="0" stopColor={syrupCol} stopOpacity="0" />
            <stop className={cls("c")} offset=".55" stopColor={syrupCol} stopOpacity=".5" />
            <stop className={cls("c")} offset="1" stopColor={syrupCol} stopOpacity=".7" />
          </linearGradient>
        )}
        {iced && (
          <linearGradient id={id("ice")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".72" />
            <stop offset=".5" stopColor="#EEF5FA" stopOpacity=".38" />
            <stop offset="1" stopColor="#DCE9F2" stopOpacity=".22" />
          </linearGradient>
        )}
        {!iced && (
          <filter id={id("soft")} filterUnits="userSpaceOnUse" x="90" y="0" width="120" height="110">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        )}

        {/* glass */}
        <radialGradient id={id("shadow")}>
          <stop offset="0" stopColor="#23140A" stopOpacity=".42" />
          <stop offset=".45" stopColor="#23140A" stopOpacity=".18" />
          <stop offset="1" stopColor="#23140A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".16" />
          <stop offset=".35" stopColor="#FFFFFF" stopOpacity=".04" />
          <stop className={cls("c")} offset=".7" stopColor={world.bg2} stopOpacity=".06" />
          <stop className={cls("c")} offset="1" stopColor={world.bg2} stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={id("hl")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".25" stopColor="#FFFFFF" stopOpacity=".42" />
          <stop offset=".7" stopColor="#FFFFFF" stopOpacity=".36" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("hl2")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".4" stopColor="#FFFFFF" stopOpacity=".22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="0">
          <stop className={cls("c")} offset="0" stopColor={world.bg2} stopOpacity="0" />
          <stop className={cls("c")} offset="1" stopColor={world.bg2} stopOpacity=".45" />
        </linearGradient>
        <linearGradient id={id("base")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".55" stopColor="#FFFFFF" stopOpacity=".14" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity=".42" />
        </linearGradient>
        <linearGradient id={id("lidsh")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity=".3" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("outline")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".8" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".32" />
          <stop className={cls("c")} offset="1" stopColor={mix(world.bg2, "#FFFFFF", 0.5)} stopOpacity=".75" />
        </linearGradient>

        {/* lid */}
        <linearGradient id={id("lidside")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A8824F" />
          <stop offset=".18" stopColor="#CBA572" />
          <stop offset=".45" stopColor="#DDBE8C" />
          <stop offset=".7" stopColor="#C7A170" />
          <stop offset="1" stopColor="#8E6A3E" />
        </linearGradient>
        <linearGradient id={id("lidv")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".18" />
          <stop offset=".3" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={id("lidworld")} x1="0" y1="0" x2="1" y2="0">
          <stop className={cls("c")} offset=".65" stopColor={world.bg2} stopOpacity="0" />
          <stop className={cls("c")} offset="1" stopColor={world.bg2} stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={id("lidtop")} cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#EAD3A6" />
          <stop offset=".6" stopColor="#D4B480" />
          <stop offset="1" stopColor="#B9935E" />
        </radialGradient>
      </defs>

      {/* ---- contact shadow + caustic ---- */}
      <ellipse cx="154" cy="376" rx="100" ry="11" fill={`url(#${id("shadow")})`} />
      <ellipse cx="150" cy="372.5" rx="70" ry="4" fill="#1E120A" opacity=".28" />
      <ellipse className={cls("c")} cx="150" cy="377" rx="44" ry="5" fill={col.top} opacity={filled ? 0.28 : 0} />

      {/* ---- glass back wall ---- */}
      <path d={GLASS} fill={`url(#${id("glass")})`} />

      {/* ---- straw inside the glass (behind the liquid) ---- */}
      <g>
        <line x1="157" y1="109" x2="141" y2="362" stroke="#000000" strokeOpacity=".07" strokeWidth="8.4" />
        <line x1="157" y1="109" x2="141" y2="362" stroke="#FFFFFF" strokeOpacity=".46" strokeWidth="7" />
        <line x1="154.8" y1="109" x2="138.8" y2="362" stroke="#FFFFFF" strokeOpacity=".8" strokeWidth="1.3" />
        <line x1="159.6" y1="109" x2="143.6" y2="362" stroke="#5A3C22" strokeOpacity=".2" strokeWidth="1" />
        <ellipse cx="141" cy="362" rx="3.6" ry="1.5" fill="#FFFFFF" fillOpacity=".4" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth=".6" />
      </g>

      {/* ---- liquid (surface space, translated to the fill level) ---- */}
      <g clipPath={`url(#${id("in")})`}>
        <g className={cls("rise")}
           transform={A ? undefined : `translate(0 ${rise})`}
           style={A ? { transform: `translateY(${rise}px)` } : undefined}>
          <rect x="84" y="0" width="132" height="440" fill={`url(#${id("liq")})`} />
          <rect x="84" y="0" width="132" height="440" fill={`url(#${id("edge")})`} />
          <ellipse cx="150" cy={bottomRel} rx="62" ry="30" fill={`url(#${id("glow")})`} />
          {full && <rect x="84" y={bottomRel - 26} width="132" height="40" fill={`url(#${id("pool")})`} />}

          {/* straw seen through the liquid: shifted and slightly magnified */}
          <g>
            <line x1={sx + 4} y1="2" x2="148" y2={bottomRel + 4} stroke="#FFFFFF" strokeOpacity=".3" strokeWidth="8.5" />
            <line x1={sx + 1.4} y1="2" x2="145.4" y2={bottomRel + 4} stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="1.5" />
            <line x1={sx + 7.2} y1="2" x2="151.2" y2={bottomRel + 4} stroke="#000000" strokeOpacity=".16" strokeWidth="1.2" />
          </g>

          {foam && <rect x="84" y="0" width="132" height={foamH + 2} fill={`url(#${id("foamg")})`} />}

          {/* surface + meniscus */}
          <ellipse cx="150" cy="0" rx="66" ry="6"
                   fill={foam ? `url(#${id("foamtop")})` : `url(#${id("surf")})`}
                   filter={foam ? `url(#${id("foamfx")})` : undefined} />
          <ellipse cx="150" cy="0" rx="66" ry="6" fill="none" stroke="#FFFFFF" strokeOpacity=".3" strokeWidth=".7" />
          <path d="M84 0A66 6 0 0 0 216 0" fill="none" stroke="#000000" strokeOpacity=".14" strokeWidth="1" />
          {!foam && <ellipse cx="120" cy="-1.5" rx="18" ry="2" fill="#FFFFFF" opacity=".22" />}
          <ellipse cx={sx} cy="0" rx="6.5" ry="2" fill="none" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth=".8" />
          {tintOnly && <ellipse className={cls("c")} cx="150" cy="0" rx="66" ry="6" fill={syrupCol} opacity=".22" />}

          {/* ice */}
          {iced && CUBES.map((c, i) => (
            <g key={i} className={cls("cube")} style={A ? { animationDelay: `${0.55 + i * 0.09}s` } : undefined}>
              <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`} opacity={c.o}>
                <rect x={-c.s / 2} y={-c.s / 2} width={c.s} height={c.s} rx="6"
                      fill={`url(#${id("ice")})`} stroke="#FFFFFF" strokeOpacity=".55" strokeWidth=".8" />
                <rect x={-c.s / 2 + 4} y={-c.s / 2 + 4} width={c.s * 0.42} height={c.s * 0.3} rx="4" fill="#FFFFFF" opacity=".35" />
                <path d={`M${-c.s / 2 + 7} ${c.s / 2 - 6}L${c.s / 2 - 6} ${-c.s / 2 + 7}`}
                      stroke="#FFFFFF" strokeOpacity=".2" strokeWidth="1" strokeLinecap="round" />
              </g>
            </g>
          ))}

          {/* syrup / honey drizzle */}
          {ribbon && (
            <g>
              <path d="M98 .5C110 -6 120 6 132 0S154 -6 166 .5 190 5 204 -1" pathLength={1} fill="none"
                    stroke="#000000" strokeOpacity=".22" strokeWidth={full ? 3.2 : 1.8} strokeLinecap="round"
                    transform="translate(0 .9)" className={cls("draw")} />
              <path d="M98 .5C110 -6 120 6 132 0S154 -6 166 .5 190 5 204 -1" pathLength={1} fill="none"
                    stroke={syrupCol} strokeWidth={full ? 3.2 : 1.8} strokeLinecap="round" className={cls("draw")} />
              {full && (
                <path d="M106 3C122 -2 134 8 150 2S178 -4 198 3" pathLength={1} fill="none"
                      stroke={syrupCol} strokeWidth="2.6" strokeLinecap="round" className={cls("draw")} />
              )}
            </g>
          )}

          {/* toppings */}
          {spec.topping === "cinnamon" && (
            <g className={cls("top")}>
              {CINNAMON.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.k * 0.9} fill={TOPPING_COLOR.cinnamon} opacity={0.5 + p.k * 0.3} />
              ))}
            </g>
          )}
          {spec.topping === "cocoa" && (
            <g className={cls("top")}>
              <ellipse cx="150" cy="-.5" rx="42" ry="3.4" fill={TOPPING_COLOR.cocoa} opacity=".16" />
              {COCOA.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={p.k * 0.65} fill={TOPPING_COLOR.cocoa} opacity={0.45 + p.k * 0.3} />
              ))}
            </g>
          )}
          {spec.topping === "flower" && (
            <g className={cls("top")} transform="translate(132 -1)">
              <g transform="scale(1 .62)">
                <ellipse cx="0" cy="1.5" rx="7.5" ry="5" fill="#000000" opacity=".12" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <ellipse key={i} cx="0" cy="-3.8" rx="2.4" ry="4.4" transform={`rotate(${i * 72 + 12})`}
                           fill={i % 2 ? TOPPING_COLOR.flower : "#CB8FA8"} stroke="#B5728F" strokeWidth=".5" strokeOpacity=".8" />
                ))}
                <circle r="1.6" fill="#E3BE5A" />
                <circle r=".7" fill="#A8603F" opacity=".7" />
              </g>
            </g>
          )}
        </g>
      </g>

      {/* ---- glass front: reflections, rim light, base ---- */}
      <g clipPath={`url(#${id("gl")})`}>
        <rect x="94" y="112" width="112" height="24" fill={`url(#${id("lidsh")})`} />
        <rect x="94" y="116" width="112" height="12" fill="#FFFFFF" opacity=".1" />
        <rect x="86" y="142" width="12" height="218" rx="6" fill={`url(#${id("hl")})`} />
        <rect x="91" y="160" width="1.6" height="170" fill="#FFFFFF" opacity=".65" />
        <rect x="204" y="144" width="7" height="214" rx="3.5" fill={`url(#${id("hl2")})`} />
        <rect x="210" y="122" width="12" height="250" fill={`url(#${id("rim")})`} />
        <rect x="78" y="348" width="144" height="24" fill={`url(#${id("base")})`} />
      </g>
      <ellipse cx="150" cy="123" rx="56" ry="3.5" fill="none" stroke="#FFFFFF" strokeOpacity=".3" strokeWidth=".8" />
      <path d={GLASS} fill="none" stroke={`url(#${id("outline")})`} strokeWidth="1.3" />
      <path d={INNER} fill="none" stroke="#FFFFFF" strokeOpacity=".16" strokeWidth=".8" />
      <text x="150" y="268" textAnchor="middle" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
            fontSize="14" letterSpacing=".4" fill="#1A120C" opacity=".48" style={{ pointerEvents: "none" }}>clocoffee</text>

      {/* ---- bamboo lid ---- */}
      <g>
        <path d="M80 100V112A70 8 0 0 0 220 112V100A70 8 0 0 1 80 100Z" fill={`url(#${id("lidside")})`} />
        <path d="M80 100V112A70 8 0 0 0 220 112V100A70 8 0 0 1 80 100Z" fill={`url(#${id("lidv")})`} />
        <path d="M80 100V112A70 8 0 0 0 220 112V100A70 8 0 0 1 80 100Z" fill={`url(#${id("lidworld")})`} />
        <path d="M86 107.5Q150 113 214 107.5" fill="none" stroke="#6E4A24" strokeOpacity=".16" strokeWidth=".7" />
        <ellipse cx="150" cy="100" rx="70" ry="8" fill={`url(#${id("lidtop")})`} stroke="#FFFFFF" strokeOpacity=".4" strokeWidth=".7" />
        <path d="M92 100.5Q150 95.5 208 100.5" fill="none" stroke="#6E4A24" strokeOpacity=".22" strokeWidth=".7" />
        <path d="M100 103Q150 99 200 103" fill="none" stroke="#6E4A24" strokeOpacity=".18" strokeWidth=".7" />
        <path d="M110 97.2Q150 94.6 190 97.2" fill="none" stroke="#6E4A24" strokeOpacity=".16" strokeWidth=".7" />
        <ellipse cx="157" cy="99.5" rx="5.5" ry="2.4" fill="#4E3620" />
        <ellipse cx="157" cy="99.5" rx="5.5" ry="2.4" fill="none" stroke="#FFFFFF" strokeOpacity=".25" strokeWidth=".6" />
      </g>

      {/* ---- straw above the lid ---- */}
      <g>
        <path d={STRAW_UP} fill="none" stroke="#000000" strokeOpacity=".07" strokeWidth="8.4" />
        <path d={STRAW_UP} fill="none" stroke="#FFFFFF" strokeOpacity=".52" strokeWidth="7" />
        <path d={STRAW_UP} fill="none" stroke="#FFFFFF" strokeOpacity=".85" strokeWidth="1.3" transform="translate(-2.2 0)" />
        <path d={STRAW_UP} fill="none" stroke="#5A3C22" strokeOpacity=".22" strokeWidth="1" transform="translate(2.6 0)" />
        <ellipse cx="186.5" cy="19.5" rx="4" ry="2.2" transform="rotate(53 186.5 19.5)"
                 fill="#FFFFFF" fillOpacity=".5" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth=".7" />
      </g>

      {/* ---- steam ---- */}
      {!iced && (
        <g filter={`url(#${id("soft")})`}>
          {STEAM.map((d, i) => (
            <g key={i} className={cls("steam")} opacity={A ? undefined : 0.3}
               style={A ? { animationDelay: `${-i * 1.25}s` } : undefined}>
              <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
