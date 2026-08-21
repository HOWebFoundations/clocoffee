export interface Dict {
  meta: { title: string; description: string };
  nav: { menu: string; cups: string; builder: string; visit: string; order: string };
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
  menu: {
    heading: string; sub: string; all: string;
    categories: Record<"coffee" | "iced" | "matcha" | "sweets", string>;
  };
  verdict: { heading: string; sub: string; placeholder: string; soundOn: string };
  shop: {
    heading: string; sub: string; openNow: string; closedNow: string; hoursToday: string;
    directions: string; whatsappUs: string; photosSoon: string; hoursHeading: string;
    days: [string, string, string, string, string, string, string];
    closed: string;
  };
  footer: { follow: string; rights: string; madeBy: string };
  a11y: { skipIntro: string; playPour: string; pausePour: string; langSwitch: string; heroAlt: string };
}
