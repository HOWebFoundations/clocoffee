import type { Dict } from "./types";

/**
 * PLACEHOLDER QUALITY — written by the site's developer tooling, not a native
 * copywriter. Needs a native review before launch (site-plan §8).
 */
export const fr: Dict = {
  meta: {
    title: "clocoffee — trois tasses, trois mondes",
    description: "Un café à Beyrouth aux trois tasses peintes à la main. Commandez sur WhatsApp, composez votre boisson, passez nous voir.",
  },
  nav: { menu: "Menu", cups: "Les tasses", builder: "Composer", visit: "Visite", order: "Commander" },
  hero: {
    tagline: "Le café, peint à la main.",
    sub: "Trois tasses peintes à la main. Une petite adresse à Beyrouth.",
    orderWhatsapp: "Commander sur WhatsApp",
    seeMenu: "Voir le menu",
    scroll: "Faites défiler pour verser",
  },
  worlds: {
    heading: "Trois tasses, trois mondes",
    sub: "Chaque tasse est peinte à la main. Choisissez la vôtre.",
    tapToPour: "Touchez pour verser",
    pouring: "Ça coule…",
    cups: {
      iris: { name: "Iris", story: "Des iris de Van Gogh, des vignes emmêlées et des citrons sur un bleu nuit profond." },
      blossom: { name: "Cerisier", story: "Une branche de cerisier en pleine floraison, faite pour le matcha." },
      ditsy: { name: "Fleurettes", story: "Une pluie de petites fleurs des champs, différente sous chaque angle." },
    },
  },
  builder: {
    heading: "Composez votre boisson",
    sub: "Quatre gestes et c'est la vôtre. On la prépare.",
    steps: { base: "Base", milk: "Lait", sweetness: "Sucre", cup: "Tasse" },
    bases: { espresso: "Espresso", latte: "Latte", iced: "Latte glacé", matcha: "Matcha" },
    milks: { whole: "Entier", oat: "Avoine", almond: "Amande", none: "Sans" },
    sweet: { zero: "Sans sucre", half: "Légèrement sucré", full: "Sucré" },
    cupPlain: "Verre classique",
    yourDrink: "Votre boisson",
    sendWhatsapp: "Envoyer la commande sur WhatsApp",
    saveImage: "Enregistrer en image",
    waIntro: "Bonjour clocoffee ! Je voudrais commander :",
    waBase: "Boisson", waMilk: "Lait", waSweet: "Sucre", waCup: "Tasse", waTotal: "Total",
  },
  menu: {
    heading: "Le menu",
    sub: "Prix en USD et en LBP. Espèces, Whish ou OMT.",
    all: "Tout",
    categories: { coffee: "Café", iced: "Glacés", matcha: "Matcha", sweets: "Douceurs" },
  },
  verdict: {
    heading: "Le Verdict Clo Coffee",
    sub: "Chaque boisson, passée en revue. Sans pitié.",
    placeholder: "Les verdicts arrivent — première critique bientôt.",
    soundOn: "Touchez pour le son",
  },
  shop: {
    heading: "Venez nous voir",
    sub: "C'est ici que vivent les tasses.",
    openNow: "Ouvert",
    closedNow: "Fermé pour le moment",
    hoursToday: "Aujourd'hui",
    directions: "Itinéraire",
    whatsappUs: "Écrivez-nous sur WhatsApp",
    photosSoon: "Les vraies photos du café arrivent — ce coin leur est réservé.",
    hoursHeading: "Horaires",
    days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    closed: "Fermé",
  },
  footer: { follow: "Suivez les tasses", rights: "Tous droits réservés.", madeBy: "Site par HOWF" },
  a11y: {
    skipIntro: "Passer l'intro",
    playPour: "Lire la vidéo",
    pausePour: "Mettre la vidéo en pause",
    langSwitch: "Changer de langue",
    heroAlt: "Un verre clocoffee se remplit de café tandis qu'un ruban de soie tourne autour",
  },
};
