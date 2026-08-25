export interface Dict {
  meta: { title: string; description: string };
  /** Per-route <title>/description and the on-page lede. */
  pages: Record<"home" | "cups" | "order" | "menu" | "visit" | "about", {
    title: string; description: string;
  }>;
  common: {
    orderNow: string; backToCups: string; exploreMore: string;
    seeAllCups: string; buildThisDrink: string; viewMenu: string; findUs: string;
    notFound: string; notFoundBody: string; backHome: string;
  };
  nav: { menu: string; cups: string; builder: string; visit: string; order: string; verdict: string };
  hero: { tagline: string; sub: string; orderWhatsapp: string; seeMenu: string; scroll: string };
  worlds: {
    heading: string; sub: string; tapToPour: string; pouring: string;
    cups: Record<"iris" | "blossom" | "ditsy", { name: string; story: string }>;
  };
  builder: {
    heading: string; sub: string;
    steps: { base: string; milk: string; sweetness: string; cup: string };
    bases: Record<"espresso" | "latte" | "iced" | "matcha", string>;
    milks: Record<"whole" | "oat" | "almond" | "none", string>;
    sweet: Record<"zero" | "half" | "full", string>;
    cupPlain: string; yourDrink: string; sendWhatsapp: string; saveImage: string;
    waIntro: string; waBase: string; waMilk: string; waSweet: string; waCup: string; waTotal: string;
  };
  order: {
    heading: string; sub: string;
    yourOrder: string; empty: string; addToOrder: string; added: string;
    remove: string; qty: string; subtotal: string; total: string;
    name: string; namePh: string; notes: string; notesPh: string;
    needName: string; addAnother: string;
    waName: string; waNotes: string;
  };
  menu: {
    heading: string; sub: string; all: string;
    categories: Record<"coffee" | "iced" | "matcha" | "sweets", string>;
  };
  verdict: { heading: string; sub: string; placeholder: string; soundOn: string };
  shop: { heading: string; sub: string };
  about: { heading: string; lede: string; body: string[]; cta: string };
  /** Honest framing: clocoffee is a brand and a concept, not a café you can walk into. */
  status: {
    badge: string;
    conceptNote: string;
    cafeHeading: string; cafeBody: string; cafeCta: string;
    glassesHeading: string; glassesNote: string;
    orderNote: string; orderSend: string;
  };
  footer: { follow: string; rights: string; madeBy: string };
  a11y: { skipIntro: string; playPour: string; pausePour: string; langSwitch: string; heroAlt: string };
}
