/**
 * The drink contract every glass renderer must honour. A drink is a spec;
 * the glass draws it. Keep this file dependency-free — it is imported by the
 * builder UI, the story-card exporter and every glass candidate.
 */
export type Temp = "hot" | "iced";
export type Base = "coffee" | "matcha";
export type Milk = "whole" | "oat" | "almond" | "none";
export type Sweet = "zero" | "half" | "full";
export type Syrup = "none" | "vanilla" | "caramel" | "rose" | "pistachio";
export type Topping = "none" | "cinnamon" | "cocoa" | "flower";
export type World = "iris" | "blossom" | "ditsy";

export interface DrinkSpec {
  temp: Temp; base: Base; milk: Milk; sweet: Sweet; syrup: Syrup; topping: Topping; world: World;
}

export interface GlassProps {
  spec: DrinkSpec;
  /** Unique id prefix for <defs> — several glasses may render on one page. */
  uid: string;
  className?: string;
  /** false = render the final state instantly (story-card export, reduced motion). */
  animate?: boolean;
}

export const DEFAULT_SPEC: DrinkSpec = {
  temp: "hot", base: "coffee", milk: "whole", sweet: "half", syrup: "none", topping: "none", world: "iris",
};

/** Sampled world colours (docs/brand.md). The backdrop behind the glass. */
export const WORLD: Record<World, { bg: string; bg2: string; text: "light" | "dark" }> = {
  iris:    { bg: "#0D2A5C", bg2: "#5B8FD1", text: "light" },
  blossom: { bg: "#E8B4BE", bg2: "#F3CFD5", text: "dark" },
  ditsy:   { bg: "#A48BC2", bg2: "#CDB9E6", text: "dark" },
};

/**
 * Liquid colour per base × milk × temp. Shared so every candidate renders the
 * same drink the same colour — the candidates compete on realism, not palette.
 */
export function liquidColors(spec: DrinkSpec): { body: string; top: string; foam: string | null } {
  const { base, milk, temp } = spec;
  const hasMilk = milk !== "none";
  if (base === "matcha") {
    return hasMilk
      ? { body: milk === "oat" ? "#93B063" : milk === "almond" ? "#86A157" : "#8DAA5F", top: "#A7C27A", foam: "#C2D59A" }
      : { body: "#6B8F3F", top: "#7FA350", foam: "#9DB874" };
  }
  if (!hasMilk) {
    return temp === "hot"
      ? { body: "#2E1A10", top: "#4A2C1B", foam: "#C98F4E" }        // espresso + crema
      : { body: "#6E4123", top: "#8A5531", foam: null };            // cold brew, no foam
  }
  const body = milk === "oat" ? "#C2946A" : milk === "almond" ? "#AA7E55" : "#B9855A";
  return temp === "hot"
    ? { body, top: lighten(body, 0.12), foam: "#EBD3B0" }           // latte + milk foam
    : { body: lighten(body, 0.06), top: lighten(body, 0.18), foam: null }; // iced latte
}

export const SYRUP_COLOR: Record<Exclude<Syrup, "none">, string> = {
  vanilla: "#E8D7A6", caramel: "#C47A2C", rose: "#D98CA8", pistachio: "#9CB36A",
};
export const TOPPING_COLOR: Record<Exclude<Topping, "none">, string> = {
  cinnamon: "#B5651D", cocoa: "#4A2A1A", flower: "#D9A0B5",
};

/** Fill fraction of the glass interior — a hot espresso is a short pour. */
export function fillLevel(spec: DrinkSpec): number {
  return spec.temp === "hot" && spec.base === "coffee" && spec.milk === "none" ? 0.42 : 0.84;
}

function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + Math.round(255 * amt));
  const g = Math.min(255, ((n >> 8) & 255) + Math.round(255 * amt));
  const b = Math.min(255, (n & 255) + Math.round(255 * amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
