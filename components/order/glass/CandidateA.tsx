"use client";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import { liquidColors, fillLevel, SYRUP_COLOR, TOPPING_COLOR, WORLD } from "./types";
import type { GlassProps, Sweet } from "./types";

/* -------------------------------------------------------------------------
 * Candidate A — "studio product still".
 * A can-shaped tumbler on a seamless backdrop: layered gradients for the
 * liquid, a crisp specular stripe, double-outlined glass with an inner
 * refraction band, a soft contact shadow and a world-coloured rim light.
 * viewBox 0 0 300 420. All liquid art is authored with its surface at Y and
 * the whole liquid group is translated to the real fill level, so the pour
 * animation and level changes are a single transform transition.
 * ---------------------------------------------------------------------- */

const CX = 150;
const OUTER =
  "M84 104L84 121C84 130 72 131 72 144L72 348Q72 364 88 364L212 364Q228 364 228 348L228 144C228 131 216 130 216 121L216 104Z";
const INNER =
  "M90 104L90 121C90 129 78 131 78 144L78 344Q78 356 92 356L208 356Q222 356 222 344L222 144C222 131 210 129 210 121L210 104Z";
const RIGHT_EDGE = "M216 106L216 121C216 130 228 131 228 144L228 348Q228 364 212 364";
const LEFT_EDGE = "M84 106L84 121C84 130 72 131 72 144L72 348Q72 364 88 364";
const INT_TOP = 112;
const INT_BOT = 356;
/** Authoring surface line for the liquid group (rise coordinates). */
const Y = 151;
const RX = 76;
const RY = 7;
const STRAW = "M124 352L170 102L177 60Q182 36 206 16";
const EASE = "cubic-bezier(.22,.8,.3,1)";

function rgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number): string {
  const A = rgb(a);
  const B = rgb(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
/** Deterministic pseudo-random in [0,1) so specks never jitter between renders. */
function rnd(i: number, k: number): number {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Cube = { x: number; y: number; s: number; a: number; d: string };
/** Slightly irregular rounded-octagon outlines, unit size 1 centred on 0. */
const CUBE_D = [
  "M-.5 -.32Q-.5 -.5 -.33 -.5L.3 -.47Q.5 -.46 .5 -.28L.47 .34Q.46 .5 .3 .5L-.3 .48Q-.5 .47 -.5 .3Z",
  "M-.46 -.4Q-.44 -.5 -.3 -.5L.34 -.5Q.5 -.5 .5 -.34L.5 .3Q.49 .5 .3 .5L-.3 .46Q-.5 .45 -.5 .28Z",
  "M-.5 -.3Q-.5 -.5 -.3 -.5L.28 -.5Q.5 -.48 .5 -.3L.48 .3Q.47 .5 .28 .5L-.34 .5Q-.5 .5 -.5 .32Z",
];
const CUBES: Cube[] = [
  { x: 101, y: Y + 9, s: 26, a: -18, d: CUBE_D[0] },
  { x: 134, y: Y + 1, s: 31, a: 7, d: CUBE_D[1] },
  { x: 166, y: Y + 12, s: 24, a: 28, d: CUBE_D[2] },
  { x: 199, y: Y + 3, s: 28, a: -9, d: CUBE_D[1] },
  { x: 214, y: Y + 30, s: 22, a: 40, d: CUBE_D[0] },
];

export function CandidateA({ spec, uid, className = "", animate }: GlassProps) {
  const anim = animate !== false;
  const [risen, setRisen] = useState(!anim);
  useEffect(() => {
    if (!anim) {
      setRisen(true);
      return;
    }
    const id = requestAnimationFrame(() => setRisen(true));
    return () => cancelAnimationFrame(id);
  }, [anim]);

  const u = uid;
  const k = "g" + uid.replace(/[^a-zA-Z0-9_-]/g, "_"); // CSS-safe token for classes / keyframes
  const { body, top, foam } = liquidColors(spec);
  const rim = WORLD[spec.world].bg2;
  const iced = spec.temp === "iced";
  const espresso = spec.temp === "hot" && spec.base === "coffee" && spec.milk === "none";
  const foamH = foam ? (espresso ? 9 : iced ? 10 : 18) : 0;

  const level = INT_BOT - fillLevel(spec) * (INT_BOT - INT_TOP);
  const dy = risen ? level - Y : INT_BOT + 6 - Y;

  const dark = mix(body, "#000000", 0.24);
  const edge = mix(top, "#ffffff", 0.14);
  const glow = mix(top, "#ffffff", 0.28);
  const surf = mix(top, "#ffffff", 0.08);
  const liquidOpacity = spec.milk === "none" ? 0.93 : 0.975;
  /** Clear liquids are backlit through the base; milky ones only get a mild lift. */
  const lit = spec.milk === "none" ? 1 : 0.5;
  const syrupColor = spec.syrup === "none" ? "#D9A441" : SYRUP_COLOR[spec.syrup];

  const tr = anim ? `transform .9s ${EASE}` : undefined;
  const riseStyle: CSSProperties = { transform: `translateY(${dy}px)`, transition: tr };
  const unriseStyle: CSSProperties = { transform: `translateY(${-dy}px)`, transition: tr };
  const fade: CSSProperties | undefined = anim
    ? { transition: "stop-color .45s ease, fill .45s ease, stroke .45s ease, opacity .45s ease" }
    : undefined;
  const glowStyle: CSSProperties = {
    opacity: risen ? 1 : 0,
    transition: anim ? "opacity .9s ease" : undefined,
  };

  /* ---------- straw (glass tube: body, mask-cut edges, highlight) ---------- */
  const strawLayer = (
    <g>
      <path d={STRAW} fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="110" y="6" width="110" height="356" fill="#fff" fillOpacity=".72" mask={`url(#${u}-strawMask)`} />
      <path d={STRAW} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" transform="translate(-2.2 0)" />
      <path d={STRAW} fill="none" stroke="#000" strokeOpacity=".10" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" transform="translate(2.6 0)" />
    </g>
  );

  /* ---------- foam / surface ---------- */
  const foamColor = foam ?? top;
  const foamLight = mix(foamColor, "#ffffff", 0.22);
  const foamDark = mix(foamColor, "#000000", 0.14);
  const bubbles: ReactElement[] = [];
  if (foam) {
    for (let i = 0; i < 9; i++) {
      const cx = CX + (rnd(i, 11) - 0.5) * 130;
      const cy = Y + (rnd(i, 12) - 0.5) * 9;
      const r = 0.7 + rnd(i, 13) * 1.3;
      bubbles.push(
        <circle key={i} cx={cx} cy={cy} r={r} fill={mix(foamColor, "#ffffff", 0.35)} fillOpacity=".7" stroke="#fff" strokeOpacity=".5" strokeWidth=".4" />,
      );
    }
  }

  /* ---------- syrup ---------- */
  const drizzle = (sweet: Exclude<Sweet, "zero">) => {
    const thin = sweet === "half";
    const w = thin ? 1.9 : 3.6;
    const ribbon = thin
      ? `M98 ${Y}C116 ${Y - 6} 132 ${Y + 6} 150 ${Y - 2}S184 ${Y + 5} 202 ${Y - 1}`
      : `M94 ${Y + 1}C108 ${Y - 9} 124 ${Y + 9} 140 ${Y - 3}S168 ${Y + 10} 182 ${Y - 3}S202 ${Y + 6} 208 ${Y}`;
    const drips = thin
      ? [{ d: `M118 ${Y + 2}C117 ${Y + 10} 119 ${Y + 18} 118 ${Y + 26}`, ex: 118, ey: Y + 26 }]
      : [
          { d: `M112 ${Y + 2}C111 ${Y + 12} 113 ${Y + 24} 112 ${Y + 36}`, ex: 112, ey: Y + 36 },
          { d: `M188 ${Y + 1}C189 ${Y + 8} 187 ${Y + 16} 188 ${Y + 23}`, ex: 188, ey: Y + 23 },
        ];
    const cls = anim ? `${k}-draw` : undefined;
    return (
      <g key={`${sweet}-${spec.syrup}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ribbon} stroke="#000" strokeOpacity=".18" strokeWidth={w + 1.2} transform="translate(0 1)" pathLength={1} className={cls} />
        <path d={ribbon} stroke={syrupColor} strokeWidth={w} pathLength={1} className={cls} />
        <path d={ribbon} stroke="#fff" strokeOpacity=".45" strokeWidth={w * 0.35} transform="translate(0 -0.6)" pathLength={1} className={cls} />
        {drips.map((p, i) => (
          <g key={i}>
            <path d={p.d} stroke={syrupColor} strokeWidth={w * 0.8} strokeOpacity=".9" pathLength={1} className={cls} style={anim ? { animationDelay: ".95s" } : undefined} />
            <circle cx={p.ex} cy={p.ey} r={w * 0.7} fill={syrupColor} fillOpacity=".95" className={anim ? `${k}-pop` : undefined} />
          </g>
        ))}
      </g>
    );
  };

  /* ---------- toppings ---------- */
  const toppingNodes = (() => {
    if (spec.topping === "none") return null;
    const c = TOPPING_COLOR[spec.topping];
    if (spec.topping === "flower") {
      const petals = [0, 72, 144, 216, 288].map((a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <ellipse cx="4.6" cy="0" rx="4.8" ry="2.4" fill={c} stroke={mix(c, "#7A3F5C", 0.45)} strokeWidth=".45" />
          <ellipse cx="5.4" cy="-0.4" rx="2.4" ry="1" fill="#fff" fillOpacity=".28" />
        </g>
      ));
      return (
        <g>
          <g transform={`translate(167 ${Y - 2.5})`}>
            <ellipse cx="0.6" cy="1.6" rx="9" ry="3.4" fill="#000" fillOpacity=".16" />
            <g transform="scale(1 .72)">{petals}</g>
            <circle r="1.9" fill="#E6C27A" stroke="#B88A3C" strokeWidth=".4" />
          </g>
          <ellipse cx="118" cy={Y + 2} rx="3.2" ry="1.3" fill={c} fillOpacity=".9" transform={`rotate(-20 118 ${Y + 2})`} />
          <ellipse cx="192" cy={Y + 3.5} rx="2.6" ry="1.1" fill={mix(c, "#7A3F5C", 0.25)} fillOpacity=".9" transform={`rotate(25 192 ${Y + 3.5})`} />
        </g>
      );
    }
    const cinnamon = spec.topping === "cinnamon";
    const n = cinnamon ? 38 : 52;
    const specks: ReactElement[] = [];
    for (let i = 0; i < n; i++) {
      const a = rnd(i, 1) * Math.PI * 2;
      const r = Math.sqrt(rnd(i, 2)) * 0.94;
      const x = CX + Math.cos(a) * r * (RX - 7);
      const y = Y - 1 + Math.sin(a) * r * (RY - 1.5);
      const s = cinnamon ? 0.6 + rnd(i, 3) * 1.1 : 0.45 + rnd(i, 3) * 0.8;
      specks.push(
        <ellipse key={i} cx={x} cy={y} rx={s} ry={s * 0.6} fill={cinnamon ? mix(c, i % 3 === 0 ? "#5A2A08" : "#E09A4A", 0.35) : c}
          fillOpacity={cinnamon ? 0.75 + rnd(i, 4) * 0.25 : 0.5 + rnd(i, 4) * 0.4} transform={`rotate(${rnd(i, 5) * 180} ${x} ${y})`} />,
      );
    }
    return (
      <g>
        <ellipse cx={CX} cy={Y - 0.5} rx={RX - 14} ry={RY - 2.5} fill={c} fillOpacity={cinnamon ? 0.14 : 0.3} />
        {specks}
      </g>
    );
  })();

  /* ---------- ice cubes ---------- */
  const cubeXf = (c: Cube) => `translate(${c.x} ${c.y}) rotate(${c.a}) scale(${c.s})`;
  const cubeShape = (c: Cube, i: number) => <path key={i} d={c.d} transform={cubeXf(c)} />;
  const cubes = iced
    ? CUBES.map((c, i) => (
        <g key={i} className={anim ? `${k}-cube` : undefined} style={anim ? { animationDelay: `${0.12 + i * 0.13}s` } : undefined}>
          {/* body: faint milky fill, soft dark rim (refraction), inner frost, crisp edge glints */}
          <path d={c.d} transform={cubeXf(c)} fill={`url(#${u}-cubeG)`} stroke="#000" strokeOpacity=".16" strokeWidth={1.6 / c.s} vectorEffect="non-scaling-stroke" />
          <path d={c.d} transform={cubeXf(c)} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth=".8" vectorEffect="non-scaling-stroke" />
          <g transform={`translate(${c.x} ${c.y}) rotate(${c.a})`}>
            <ellipse cx={c.s * 0.05} cy={c.s * 0.08} rx={c.s * 0.26} ry={c.s * 0.18} fill="#fff" fillOpacity=".16" transform="rotate(-25)" />
            <path d={`M${-c.s * 0.34} ${-c.s * 0.3}L${c.s * 0.22} ${c.s * 0.36}`} stroke="#fff" strokeOpacity=".32" strokeWidth="1.1" strokeLinecap="round" />
            <path d={`M${c.s * 0.3} ${-c.s * 0.36}L${c.s * 0.34} ${c.s * 0.18}`} stroke="#fff" strokeOpacity=".22" strokeWidth=".8" strokeLinecap="round" />
            <ellipse cx={-c.s * 0.26} cy={-c.s * 0.28} rx={c.s * 0.1} ry={c.s * 0.05} fill="#fff" fillOpacity=".9" transform={`rotate(-32 ${-c.s * 0.26} ${-c.s * 0.28})`} />
          </g>
        </g>
      ))
    : null;

  /* ---------- condensation (iced) ---------- */
  const droplets: ReactElement[] = [];
  if (iced) {
    for (let i = 0; i < 16; i++) {
      const x = 84 + rnd(i, 21) * 132;
      const y = 190 + rnd(i, 22) * 150;
      const r = 0.9 + rnd(i, 23) * 1.5;
      droplets.push(
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#fff" fillOpacity=".3" stroke="#000" strokeOpacity=".08" strokeWidth=".4" />
          <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" fillOpacity=".8" />
        </g>,
      );
    }
    droplets.push(<path key="d1" d="M131 262C130 274 132 286 131 300" stroke="#fff" strokeOpacity=".3" strokeWidth="1.6" fill="none" strokeLinecap="round" />);
    droplets.push(<path key="d2" d="M203 230C204 240 202 250 203 258" stroke="#fff" strokeOpacity=".25" strokeWidth="1.3" fill="none" strokeLinecap="round" />);
  }

  /* ---------- steam (hot) ---------- */
  const steam = !iced
    ? [
        { d: "M164 86C158 76 171 70 164 58C158 48 169 42 165 30", delay: 0 },
        { d: "M177 84C185 74 172 66 180 54C187 44 178 38 183 24", delay: 1.15 },
        { d: "M101 90C96 81 107 75 102 63", delay: 2.1 },
      ].map((w, i) => (
        <path key={i} d={w.d} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeOpacity={anim ? 1 : 0.42}
          className={anim ? `${k}-steam` : undefined} style={anim ? { animationDelay: `${w.delay}s` } : undefined} />
      ))
    : null;

  const css = anim
    ? `
@keyframes ${k}-drop{0%{transform:translateY(-90px);opacity:0}55%{transform:translateY(5px);opacity:1}76%{transform:translateY(-3px)}100%{transform:translateY(0);opacity:1}}
@keyframes ${k}-steam{0%{transform:translate(0,0);opacity:0}30%{opacity:.5}100%{transform:translate(3px,-24px);opacity:0}}
@keyframes ${k}-draw{to{stroke-dashoffset:0}}
@keyframes ${k}-pop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}
.${k}-cube{animation:${k}-drop .75s cubic-bezier(.3,.9,.4,1.1) both}
.${k}-steam{animation:${k}-steam 3.4s ease-in-out infinite}
.${k}-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:${k}-draw 1.1s ease-out .55s forwards}
.${k}-pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:${k}-pop .3s ease-out 1.9s forwards}
@media (prefers-reduced-motion:reduce){.${k}-root *{animation:none!important;transition:none!important}.${k}-draw{stroke-dashoffset:0!important}.${k}-pop{opacity:1!important}.${k}-steam{opacity:.42}}
`
    : null;

  return (
    <svg viewBox="0 0 300 420" className={`${k}-root ${className}`.trim()} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${spec.temp} ${spec.base} drink`}>
      {css ? <style>{css}</style> : null}
      <defs>
        <clipPath id={`${u}-outerClip`}><path d={OUTER} /></clipPath>
        <clipPath id={`${u}-innerClip`}><path d={INNER} /></clipPath>
        <clipPath id={`${u}-aboveLid`}><rect x="0" y="0" width="300" height="97" /></clipPath>
        <clipPath id={`${u}-below`}><rect x="0" y={Y + foamH - 1} width="300" height="300" /></clipPath>
        <clipPath id={`${u}-foamClip`}>
          <ellipse cx={CX} cy={Y} rx={RX} ry={RY} />
          <rect x={CX - RX} y={Y} width={RX * 2} height={foamH} />
          <ellipse cx={CX} cy={Y + foamH} rx={RX} ry={RY} />
        </clipPath>
        <clipPath id={`${u}-cubesClip`}>{CUBES.map(cubeShape)}</clipPath>

        <mask id={`${u}-strawMask`} maskUnits="userSpaceOnUse" x="100" y="0" width="130" height="370">
          <path d={STRAW} fill="none" stroke="#fff" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" />
          <path d={STRAW} fill="none" stroke="#000" strokeWidth="6.2" strokeLinejoin="round" strokeLinecap="round" />
        </mask>

        {/* liquid: horizontal (edges thin, core dense) + vertical (surface shade, base glow) */}
        <linearGradient id={`${u}-lgH`} gradientUnits="userSpaceOnUse" x1="72" x2="228" y1="0" y2="0">
          <stop offset="0" stopColor={mix(edge, "#ffffff", 0.15)} style={fade} />
          <stop offset=".05" stopColor={top} style={fade} />
          <stop offset=".2" stopColor={body} style={fade} />
          <stop offset=".5" stopColor={dark} style={fade} />
          <stop offset=".8" stopColor={body} style={fade} />
          <stop offset=".95" stopColor={top} style={fade} />
          <stop offset="1" stopColor={mix(edge, "#ffffff", 0.15)} style={fade} />
        </linearGradient>
        <linearGradient id={`${u}-lgV`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={Y} y2={Y + 210}>
          <stop offset="0" stopColor="#000" stopOpacity=".46" />
          <stop offset=".2" stopColor="#000" stopOpacity=".2" />
          <stop offset=".5" stopColor="#000" stopOpacity="0" />
          <stop offset=".8" stopColor={glow} stopOpacity={0.35 * lit} style={fade} />
          <stop offset="1" stopColor={mix(glow, "#ffffff", 0.25)} stopOpacity={0.8 * lit} style={fade} />
        </linearGradient>
        <radialGradient id={`${u}-glowR`}>
          <stop offset="0" stopColor={mix(glow, "#ffffff", 0.2)} stopOpacity={0.75 * lit} style={fade} />
          <stop offset=".6" stopColor={glow} stopOpacity={0.25 * lit} style={fade} />
          <stop offset="1" stopColor={glow} stopOpacity="0" style={fade} />
        </radialGradient>
        <linearGradient id={`${u}-sheen`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".38" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".09" />
          <stop offset=".62" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${u}-surfG`} cx=".42" cy=".3" r=".8">
          <stop offset="0" stopColor={mix(surf, "#ffffff", 0.12)} style={fade} />
          <stop offset=".6" stopColor={surf} style={fade} />
          <stop offset="1" stopColor={top} style={fade} />
        </radialGradient>
        <linearGradient id={`${u}-foamG`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={foamLight} style={fade} />
          <stop offset=".55" stopColor={foamColor} style={fade} />
          <stop offset="1" stopColor={foamDark} style={fade} />
        </linearGradient>
        <radialGradient id={`${u}-foamTop`} cx=".45" cy=".35" r=".75">
          <stop offset="0" stopColor={mix(foamColor, "#ffffff", 0.34)} style={fade} />
          <stop offset="1" stopColor={foamLight} style={fade} />
        </radialGradient>

        {/* glass material */}
        <linearGradient id={`${u}-glassBody`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".07" stopColor="#fff" stopOpacity=".07" />
          <stop offset=".4" stopColor="#fff" stopOpacity=".025" />
          <stop offset=".62" stopColor="#fff" stopOpacity=".02" />
          <stop offset=".86" stopColor={rim} stopOpacity=".12" />
          <stop offset="1" stopColor="#fff" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id={`${u}-edgeL`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".22" />
          <stop offset=".35" stopColor="#000" stopOpacity=".07" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}-edgeR`} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor={mix(rim, "#000000", 0.55)} stopOpacity=".3" />
          <stop offset=".35" stopColor="#000" stopOpacity=".08" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}-spec`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".18" stopColor="#fff" stopOpacity=".62" />
          <stop offset=".72" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}-lidShade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".38" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}-base`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".38" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`${u}-cubeG`} x1="0" x2=".4" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".14" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>

        {/* bamboo lid */}
        <radialGradient id={`${u}-lidTop`} cx=".4" cy=".3" r=".75">
          <stop offset="0" stopColor="#EED9AE" />
          <stop offset=".6" stopColor="#D4B382" />
          <stop offset="1" stopColor="#B4906A" />
        </radialGradient>
        <linearGradient id={`${u}-lidSide`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8F6C3E" />
          <stop offset=".18" stopColor="#BE9A66" />
          <stop offset=".45" stopColor="#DDBD8C" />
          <stop offset=".75" stopColor="#B99462" />
          <stop offset="1" stopColor={mix("#8A6638", rim, 0.35)} />
        </linearGradient>
        <linearGradient id={`${u}-gasket`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8E8E8E" />
          <stop offset=".45" stopColor="#D5D5D5" />
          <stop offset="1" stopColor="#9A9A9A" />
        </linearGradient>

        {/* filters: all small-region, stdDeviation <= 5 */}
        <filter id={`${u}-shadowBlur`} x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <filter id={`${u}-softBlur`} x="-60%" y="-5%" width="220%" height="110%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`${u}-steamBlur`} x="-100%" y="-20%" width="300%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={`${u}-foamEdge`} x="-4%" y="-40%" width="108%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency=".06 .14" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${u}-foamTex`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".5 .32" numOctaves="2" seed="5" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.6 0 0 0 -0.62" result="w" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1.3 0 0 -0.66" result="d" />
          <feMerge><feMergeNode in="d" /><feMergeNode in="w" /></feMerge>
        </filter>
      </defs>

      {/* ---- contact shadow on the seamless ---- */}
      <g filter={`url(#${u}-shadowBlur)`}>
        <ellipse cx={CX + 6} cy="372" rx="88" ry="8" fill="#000" fillOpacity=".3" />
        <ellipse cx={CX} cy="369" rx="66" ry="5" fill="#000" fillOpacity=".25" />
      </g>
      {/* light bleeding through the base — hero image glow */}
      <ellipse cx={CX} cy="361" rx="68" ry="4.5" fill={top} fillOpacity=".55" style={glowStyle} />

      {/* ---- glass, back half ---- */}
      <path d={OUTER} fill={`url(#${u}-glassBody)`} />
      <path d="M80 103L80 108A70 6.5 0 0 0 220 108L220 103Z" fill={`url(#${u}-gasket)`} opacity=".85" />
      <g clipPath={`url(#${u}-innerClip)`}>
        <rect x="72" y="104" width="156" height="60" fill={`url(#${u}-lidShade)`} />
        {strawLayer}
      </g>

      {/* ---- liquid (rises as one group) ---- */}
      <g clipPath={`url(#${u}-outerClip)`}>
        <g style={riseStyle}>
          <rect x="73" y={Y - 1} width="154" height="300" fill={`url(#${u}-lgH)`} opacity={liquidOpacity} style={fade} />
          <rect x="73" y={Y - 1} width="154" height="300" fill={`url(#${u}-lgV)`} />
          <ellipse cx={CX} cy={Y + 198} rx="70" ry="40" fill={`url(#${u}-glowR)`} />
          <rect x="73" y={Y - 1} width="154" height="300" fill={`url(#${u}-sheen)`} />

          {/* refracted straw below the surface: shifted, widened, lightened */}
          <g clipPath={`url(#${u}-below)`}>
            <g style={unriseStyle}>
              <path d={STRAW} fill="none" stroke={glow} strokeOpacity=".5" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" transform="translate(5 0)" style={fade} />
              <path d={STRAW} fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" transform="translate(2.4 0)" />
              <path d={STRAW} fill="none" stroke="#000" strokeOpacity=".16" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" transform="translate(10.4 0)" />
            </g>
          </g>

          {/* foam band or bare surface */}
          {foam ? (
            <g>
              <g filter={`url(#${u}-foamEdge)`}>
                <rect x="73" y={Y} width="154" height={foamH} fill={`url(#${u}-foamG)`} />
                <ellipse cx={CX} cy={Y + foamH} rx={RX} ry={RY} fill={foamDark} style={fade} />
              </g>
              <path d={`M${CX - RX} ${Y + foamH}A${RX} ${RY} 0 0 0 ${CX + RX} ${Y + foamH}`} fill="none" stroke="#000" strokeOpacity=".2" strokeWidth="1" />
              <ellipse cx={CX} cy={Y} rx={RX} ry={RY} fill={`url(#${u}-foamTop)`} />
              <g clipPath={`url(#${u}-foamClip)`}>
                <rect x={CX - RX} y={Y - RY} width={RX * 2} height={foamH + RY * 2} filter={`url(#${u}-foamTex)`} opacity=".5" />
              </g>
              {bubbles}
            </g>
          ) : (
            <g>
              <ellipse cx={CX} cy={Y} rx={RX} ry={RY} fill={`url(#${u}-surfG)`} />
              {/* lid shadow on the far half of the surface */}
              <path d={`M${CX - RX + 2} ${Y}A${RX - 2} ${RY - 0.5} 0 0 1 ${CX + RX - 2} ${Y}Z`} fill="#000" fillOpacity=".16" />
              <ellipse cx={CX} cy={Y + 0.8} rx={RX - 4} ry={RY - 1.5} fill="none" stroke="#000" strokeOpacity=".1" strokeWidth="1" />
              <ellipse cx={CX - 16} cy={Y + 1.5} rx="28" ry="2" fill="#fff" fillOpacity=".22" />
            </g>
          )}
          {/* meniscus */}
          <ellipse cx={CX} cy={Y} rx={RX} ry={RY} fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1" />
          <ellipse cx={CX} cy={Y - 0.6} rx={RX - 1} ry={RY - 0.6} fill="none" stroke="#000" strokeOpacity=".1" strokeWidth=".6" />

          {/* ice */}
          {cubes}
          {iced ? (
            <g clipPath={`url(#${u}-cubesClip)`}>
              <rect x="73" y={Y + 3} width="154" height="44" fill={body} fillOpacity=".4" style={fade} />
            </g>
          ) : null}

          {/* sweetness */}
          {spec.sweet !== "zero" ? drizzle(spec.sweet) : null}
          {spec.sweet === "zero" && spec.syrup !== "none" ? (
            <ellipse cx={CX} cy={Y} rx={RX - 18} ry={RY - 3} fill={syrupColor} fillOpacity=".26" />
          ) : null}

          {/* toppings */}
          {toppingNodes}
        </g>
      </g>

      {/* ---- glass, front half: refraction bands, speculars, base, outlines ---- */}
      <g clipPath={`url(#${u}-outerClip)`}>
        <rect x="72" y="100" width="18" height="270" fill={`url(#${u}-edgeL)`} />
        <rect x="210" y="100" width="18" height="270" fill={`url(#${u}-edgeR)`} />
        <rect x="72" y="352" width="156" height="12" fill={`url(#${u}-base)`} />
        <rect x="88" y="130" width="124" height="8" fill="#fff" fillOpacity=".08" />
      </g>
      <rect x="85" y="150" width="8" height="190" rx="4" fill={`url(#${u}-spec)`} />
      <rect x="96" y="170" width="14" height="150" rx="7" fill={`url(#${u}-spec)`} opacity=".2" />
      <rect x="207" y="160" width="5" height="180" rx="2.5" fill={`url(#${u}-spec)`} opacity=".42" />
      {droplets}
      <path d={INNER} fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth=".8" />
      <path d={OUTER} fill="none" stroke="#000" strokeOpacity=".14" strokeWidth="2.4" />
      <path d={OUTER} fill="none" stroke="#fff" strokeOpacity=".62" strokeWidth="1.2" />
      <path d="M80 361Q150 367.5 220 361" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
      {/* world rim light */}
      <path d={RIGHT_EDGE} fill="none" stroke={rim} strokeOpacity=".24" strokeWidth="7" strokeLinecap="round" filter={`url(#${u}-softBlur)`} />
      <path d={RIGHT_EDGE} fill="none" stroke={rim} strokeOpacity=".6" strokeWidth="2.6" strokeLinecap="round" />
      <path d={LEFT_EDGE} fill="none" stroke={rim} strokeOpacity=".3" strokeWidth="1.4" strokeLinecap="round" />

      {/* wordmark printed on the glass */}
      <text x={CX} y="238" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif" fontSize="15" fontWeight="600" letterSpacing=".4" fill="#1C120C" fillOpacity=".5">clocoffee</text>

      {/* ---- bamboo lid ---- */}
      <path d="M74 92L74 103A76 9 0 0 0 226 103L226 92Z" fill={`url(#${u}-lidSide)`} />
      <path d="M74 103A76 9 0 0 0 226 103" fill="none" stroke="#5E4423" strokeOpacity=".45" strokeWidth="1" />
      <ellipse cx={CX} cy="92" rx="76" ry="9" fill={`url(#${u}-lidTop)`} />
      <g fill="none" stroke="#9B7747" strokeOpacity=".32" strokeWidth=".6">
        <path d="M86 92Q150 85 214 92" /><path d="M92 94.5Q150 88.5 208 94.5" /><path d="M98 96.5Q150 91.5 202 96.5" /><path d="M90 90Q150 83.5 210 90" />
      </g>
      <ellipse cx={CX} cy="92" rx="76" ry="9" fill="none" stroke="#F4E3C0" strokeOpacity=".6" strokeWidth=".8" />
      <ellipse cx="126" cy="88.5" rx="30" ry="2.6" fill="#fff" fillOpacity=".22" />
      <path d="M214 86A76 9 0 0 1 222 96" fill="none" stroke={rim} strokeOpacity=".5" strokeWidth="1.6" />
      <ellipse cx="171" cy="91.5" rx="5.6" ry="2.3" fill="#4E3820" fillOpacity=".8" />

      {/* straw above the lid */}
      <g clipPath={`url(#${u}-aboveLid)`}>{strawLayer}</g>

      {/* steam */}
      {steam ? <g filter={`url(#${u}-steamBlur)`}>{steam}</g> : null}
    </svg>
  );
}
