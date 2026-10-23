export interface Dict {
  meta: { title: string; description: string };
  /** Per-route <title>/description and the on-page lede. */
  pages: Record<"home" | "cups" | "order" | "menu" | "visit" | "about" | "lookbook", {
    title: string; description: string;
  }>;
  common: {
    orderNow: string; backToCups: string; exploreMore: string;
    seeAllCups: string; buildThisDrink: string; viewMenu: string;
    notFound: string; notFoundBody: string; backHome: string;
  };
  nav: { menu: string; cups: string; builder: string; visit: string; order: string; open: string; close: string };
  hero: { tagline: string; sub: string; orderWhatsapp: string; seeMenu: string; scroll: string };
  worlds: {
    heading: string; sub: string; tapToPour: string; pouring: string;
    cups: Record<"iris" | "blossom" | "ditsy", { name: string; story: string }>;
  };
  builder: {
    milks: Record<"whole" | "oat" | "almond" | "none", string>;
    sweet: Record<"zero" | "half" | "full", string>;
  };
  menu: {
    heading: string; sub: string; all: string; indicative: string;
    categories: Record<"coffee" | "iced" | "matcha" | "sweets", string>;
  };
  shop: { heading: string; sub: string };
  about: { heading: string; lede: string; body: string[]; cta: string };
  /** Honest framing: clocoffee is a brand and a concept, not a café you can walk into. */
  status: {
    badge: string;
    conceptNote: string;
    cafeHeading: string; cafeBody: string; cafeCta: string;
    glassesHeading: string; glassesNote: string;
  };
  /** Make a drink — the playable builder. No prices, no cart, no form. */
  make: {
    heading: string; sub: string;
    steps: Record<"temp" | "base" | "milk" | "sweet" | "syrup" | "topping" | "world", string>;
    temp: Record<"hot" | "iced", string>;
    bases: Record<"coffee" | "matcha", string>;
    syrups: Record<"none" | "vanilla" | "caramel" | "rose" | "pistachio", string>;
    toppings: Record<"none" | "cinnamon" | "cocoa" | "flower", string>;
    /** drink-name words: the name is composed per locale in lib/drinkName.ts */
    names: Record<"espresso" | "latte" | "icedLatte" | "coldBrew" | "matcha" | "matchaLatte" | "icedMatcha" | "icedMatchaLatte", string>;
    nameMilk: Record<"oat" | "almond", string>;
    nameSweet: Record<"half" | "full", string>;
    nameTopping: Record<"cinnamon" | "cocoa" | "flower", string>;
    yourDrink: string; save: string; saving: string; saved: string; share: string; download: string;
    cardTag: string; cardSoon: string;
  };
  lookbook: { heading: string; lede: string; groups: Record<"mark" | "glasses" | "world" | "place", { title: string; note: string }> };
  soon: {
    waitHeading: string; waitBody: string; waitCta: string; waitMsg: string;
    contactHeading: string; contactBody: string; contactCta: string;
    igHeading: string; igBody: string;
  };
  home: { makeHeading: string; makeBody: string; makeCta: string; lookHeading: string; lookBody: string; lookCta: string };
  footer: { follow: string; rights: string; madeBy: string };
  a11y: { skipIntro: string; playPour: string; pausePour: string; langSwitch: string; heroAlt: string };
}
