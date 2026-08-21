import type { Dict } from "./types";

/**
 * PLACEHOLDER QUALITY — written by the site's developer tooling, not a native
 * copywriter. Needs a native Lebanese review before launch (site-plan §8).
 */
export const ar: Dict = {
  meta: {
    title: "كلوكوفي — ثلاثة أكواب، ثلاثة عوالم",
    description: "مقهى في بيروت بثلاثة أكواب مرسومة يدويًا. اطلب عبر واتساب، ركّب مشروبك، ومرّ علينا.",
  },
  nav: { menu: "القائمة", cups: "الأكواب", builder: "ركّب مشروبك", visit: "زورونا", order: "اطلب" },
  hero: {
    tagline: "قهوة مرسومة باليد.",
    sub: "ثلاثة أكواب مرسومة يدويًا. محل صغير في بيروت.",
    orderWhatsapp: "اطلب عبر واتساب",
    seeMenu: "شاهد القائمة",
    scroll: "مرّر لتنسكب القهوة",
  },
  worlds: {
    heading: "ثلاثة أكواب، ثلاثة عوالم",
    sub: "كل كوب مرسوم باليد. اختر كوبك.",
    tapToPour: "اضغط لتنسكب",
    pouring: "تنسكب…",
    cups: {
      iris: { name: "السوسن", story: "سوسن فان غوخ، وأغصان متشابكة وليمون على أزرق ليليّ عميق." },
      blossom: { name: "الكرز", story: "غصن أزهار كرز بكامل تفتّحه، خُلق للماتشا." },
      ditsy: { name: "الأزهار البرية", story: "أزهار برية صغيرة متناثرة، زهرة مختلفة من كل جهة تديره منها." },
    },
  },
  builder: {
    heading: "ركّب مشروبك",
    sub: "أربع لمسات ويصير لك. ونحن نجهّزه.",
    steps: { base: "الأساس", milk: "الحليب", sweetness: "السكّر", cup: "الكوب" },
    bases: { espresso: "إسبريسو", latte: "لاتيه", iced: "لاتيه مثلّج", matcha: "ماتشا" },
    milks: { whole: "كامل الدسم", oat: "شوفان", almond: "لوز", none: "بدون" },
    sweet: { zero: "بدون سكّر", half: "سكّر خفيف", full: "حلو" },
    cupPlain: "كوب زجاجي كلاسيكي",
    yourDrink: "مشروبك",
    sendWhatsapp: "أرسل الطلب عبر واتساب",
    saveImage: "احفظ كصورة",
    waIntro: "مرحبًا كلوكوفي! أودّ أن أطلب:",
    waBase: "المشروب", waMilk: "الحليب", waSweet: "السكّر", waCup: "الكوب", waTotal: "المجموع",
  },
  menu: {
    heading: "القائمة",
    sub: "الأسعار بالدولار والليرة. كاش، ويش أو OMT.",
    all: "الكل",
    categories: { coffee: "قهوة", iced: "مثلّجات", matcha: "ماتشا", sweets: "حلويات" },
  },
  verdict: {
    heading: "حُكم كلوكوفي",
    sub: "كل مشروب له مراجعة. بلا رحمة.",
    placeholder: "مراجعات الفيديو قيد التحضير — أول حكم قريبًا.",
    soundOn: "اضغط للصوت",
  },
  shop: {
    heading: "تعالوا لعندنا",
    sub: "هنا تعيش الأكواب.",
    openNow: "مفتوح الآن",
    closedNow: "مغلق حاليًا",
    hoursToday: "اليوم",
    directions: "الاتجاهات",
    whatsappUs: "راسلنا واتساب",
    photosSoon: "صور حقيقية للمحل قادمة — هذه الزاوية محجوزة لها.",
    hoursHeading: "أوقات الدوام",
    days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    closed: "مغلق",
  },
  footer: { follow: "تابعوا الأكواب", rights: "جميع الحقوق محفوظة.", madeBy: "الموقع من HOWF" },
  a11y: {
    skipIntro: "تخطَّ المقدمة",
    playPour: "شغّل فيديو السكب",
    pausePour: "أوقف فيديو السكب",
    langSwitch: "غيّر اللغة",
    heroAlt: "كوب كلوكوفي زجاجي يمتلئ بالقهوة بينما يلتفّ حوله شريط حريري",
  },
};
