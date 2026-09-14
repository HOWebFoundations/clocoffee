"use client";
import { useEffect, useRef, useState } from "react";

type Base = "espresso" | "latte" | "iced" | "matcha";
type Milk = "whole" | "oat" | "almond" | "none";
type Sweet = "zero" | "half" | "full";

/** Liquid colour per base × milk — matcha greens, espresso darks, milk lightens. */
const LIQ: Record<Base, Record<Milk, string>> = {
  espresso: { whole: "#4A2C1B", oat: "#4A2C1B", almond: "#43271A", none: "#3A2115" },
  latte:    { whole: "#B9855A", oat: "#C2946A", almond: "#A87C52", none: "#5C3320" },
  iced:     { whole: "#C09067", oat: "#C89A70", almond: "#B08258", none: "#7A4A26" },
  matcha:   { whole: "#8CA95F", oat: "#93B063", almond: "#85A055", none: "#6B8F3F" },
};
/** The band floating on top: crema, milk foam, matcha foam. Iced gets cubes instead. */
const FOAM: Record<Base, string> = { espresso: "#C98F4E", latte: "#E8CBA0", iced: "", matcha: "#AFC684" };
/** How full the glass gets — an espresso is a short pour. */
const FILL: Record<Base, number> = { espresso: 0.42, latte: 0.84, iced: 0.84, matcha: 0.84 };

// glass interior in viewBox units (see the clip path below)
const TOP = 64, BOTTOM = 228, H = BOTTOM - TOP;

export function liquidColor(base: Base, milk: Milk) { return LIQ[base][milk]; }

/**
 * The drink, drawn: a clocoffee can glass that builds live as choices are
 * made. Base pours the liquid in (with a falling stream while it rises),
 * milk crossfades the colour, iced drops cubes, sweetness drizzles a ribbon.
 * All SVG + CSS transitions; prefers-reduced-motion collapses everything to
 * instant state changes via globals.css.
 */
export function DrinkGlass({ base, milk, sweet, className = "" }: {
  base: Base; milk: Milk; sweet: Sweet; className?: string;
}) {
  // liquid starts at zero and pours in on mount, then re-pours on base change
  const [level, setLevel] = useState(0);
  const [pouring, setPouring] = useState(false);
  const prevBase = useRef<Base | null>(null);

  useEffect(() => {
    const changedBase = prevBase.current !== base;
    prevBase.current = base;
    setLevel(FILL[base]);
    if (changedBase) {
      setPouring(true);
      const t = setTimeout(() => setPouring(false), 850);
      return () => clearTimeout(t);
    }
  }, [base]);

  const liquid = LIQ[base][milk];
  const foam = FOAM[base];
  const surfaceY = TOP + (1 - level) * H;

  return (
    <svg viewBox="0 0 180 250" role="img" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="glass-clip">
          {/* interior of the can: narrow neck flaring into the body */}
          <path d="M56 56 L56 62 Q46 68 46 78 L46 210 Q46 228 64 228 L116 228 Q134 228 134 210 L134 78 Q134 68 124 62 L124 56 Z" />
        </clipPath>
      </defs>

      {/* straw, behind the lid, in front of liquid later */}
      <path d="M97 10 Q118 14 112 34 L104 70" fill="none" stroke="#C9D2D8" strokeWidth="7" strokeLinecap="round" opacity="0.85" />

      {/* liquid, clipped to the glass */}
      <g clipPath="url(#glass-clip)">
        {/* pour stream while the level is rising */}
        <rect x="86" y="40" width="7" height="200" className="glass-tint" fill={liquid}
              style={{ opacity: pouring ? 0.9 : 0, transition: "opacity 0.25s ease" }} />
        {/* the liquid: a full-height block translated up by the fill level */}
        <g className="glass-liquid" style={{ transform: `translateY(${(1 - level) * H}px)` }}>
          <rect x="44" y={TOP} width="92" height={H + 10} className="glass-tint" fill={liquid} />
          {foam && <rect x="44" y={TOP} width="92" height="11" className="glass-tint" fill={foam} />}
          {/* surface sheen */}
          <ellipse cx="90" cy={TOP + 2} rx="44" ry="3.5" fill="#FFFFFF" opacity="0.18" />
        </g>
        {/* ice cubes drop when the drink is iced; key retriggers the fall */}
        {base === "iced" && (
          <g key={`${base}-${milk}`}>
            <rect x="62" y={surfaceY + 6} width="20" height="20" rx="5" fill="#F6EFE2" opacity="0.75" className="ice" />
            <rect x="94" y={surfaceY + 16} width="17" height="17" rx="5" fill="#F6EFE2" opacity="0.65" className="ice ice-2" />
            <rect x="80" y={surfaceY + 34} width="15" height="15" rx="4" fill="#F6EFE2" opacity="0.5" className="ice ice-3" />
          </g>
        )}
        {/* sweetness: a honey ribbon drizzled across the surface */}
        {sweet !== "zero" && (
          <path
            key={sweet}
            d={`M56 ${surfaceY + 10} q12 -8 22 0 t22 0 t22 0`}
            fill="none" stroke="#D9A441" strokeLinecap="round"
            strokeWidth={sweet === "full" ? 5.5 : 3}
            className="drizzle" opacity="0.9"
          />
        )}
      </g>

      {/* glass outline over the liquid */}
      <path d="M56 56 L56 62 Q46 68 46 78 L46 210 Q46 228 64 228 L116 228 Q134 228 134 210 L134 78 Q134 68 124 62 L124 56 Z"
            fill="#FFFFFF" fillOpacity="0.06" stroke="#39261880" strokeWidth="2.5" />
      {/* side shine */}
      <path d="M58 80 L58 200" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.22" />
      {/* straw inside the glass, faint through the liquid */}
      <path d="M104 70 L92 200" fill="none" stroke="#DDE4E8" strokeWidth="6" strokeLinecap="round" opacity="0.35" />

      {/* bamboo lid */}
      <ellipse cx="90" cy="52" rx="46" ry="9" fill="#A9855A" />
      <ellipse cx="90" cy="48" rx="46" ry="9.5" fill="#C09A66" />
      <ellipse cx="90" cy="48" rx="34" ry="6.5" fill="#B78F5D" />
      <circle cx="99" cy="46" r="5.5" fill="#7A5C38" />

      {/* the wordmark on the glass */}
      <text x="90" y="150" textAnchor="middle" fontFamily="var(--font-latin), sans-serif" fontWeight="700"
            fontSize="14" fill="#392618" opacity="0.55" letterSpacing="0.5">clocoffee</text>
    </svg>
  );
}

/** The same drink at shelf scale, for order lines. Static — no animations. */
export function MiniGlass({ base, milk, className = "" }: { base: Base; milk: Milk; className?: string }) {
  const liquid = LIQ[base][milk];
  const foam = FOAM[base];
  const level = FILL[base];
  const top = 16 + (1 - level) * 30;
  return (
    <svg viewBox="0 0 36 52" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`mini-${base}-${milk}`}>
          <path d="M9 14 Q7 16 7 19 L7 42 Q7 47 12 47 L24 47 Q29 47 29 42 L29 19 Q29 16 27 14 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#mini-${base}-${milk})`}>
        <rect x="6" y={top} width="24" height="36" fill={liquid} />
        {foam && <rect x="6" y={top} width="24" height="3.5" fill={foam} />}
        {base === "iced" && <rect x="12" y={top + 4} width="7" height="7" rx="2" fill="#F6EFE2" opacity="0.7" />}
      </g>
      <path d="M9 14 Q7 16 7 19 L7 42 Q7 47 12 47 L24 47 Q29 47 29 42 L29 19 Q29 16 27 14 Z"
            fill="#FFFFFF" fillOpacity="0.08" stroke="#39261866" strokeWidth="1.5" />
      <ellipse cx="18" cy="13" rx="12" ry="2.8" fill="#C09A66" />
      <path d="M21 3 Q26 4 24 9 L22 20" fill="none" stroke="#C9D2D8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
