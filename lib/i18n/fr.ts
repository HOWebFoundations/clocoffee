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
  pages: {
    home: { title: "clocoffee — trois tasses, trois mondes", description: "Un café à Beyrouth aux trois tasses peintes à la main. Commandez sur WhatsApp, composez votre boisson, passez nous voir." },
    cups: { title: "Les trois tasses", description: "Iris, Cerisier et Fleurettes — trois tasses peintes à la main, chacune avec son monde." },
    build: { title: "Composez votre boisson", description: "Une base, un lait, un sucrage, une tasse. Quatre gestes et la commande part sur WhatsApp." },
    menu: { title: "Menu et prix", description: "Tous nos cafés, boissons glacées, matchas et douceurs, en USD et en LBP." },
    verdict: { title: "Le Verdict Clo Coffee", description: "Chaque boisson, passée en revue. Sans pitié." },
    visit: { title: "Nous trouver à Beyrouth", description: "Adresse, horaires, itinéraire et comment nous joindre." },
  },
  common: {
    orderNow: "Commander", backToCups: "Les trois tasses", exploreMore: "Continuez la visite",
    seeAllCups: "Découvrir les tasses", buildThisDrink: "Composer cette boisson", viewMenu: "Voir le menu",
    findUs: "Trouver le café",
    notFound: "Cette page a refroidi", notFoundBody: "Le lien que vous avez suivi n'existe pas — le café, si.",
    backHome: "Retour au café",
  },
  nav: { menu: "Menu", cups: "Les tasses", builder: "Composer", visit: "Visite", order: "Commander" , verdict: "Verdict" },
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
    frontAlt: "La devanture clocoffee : façade crème, grandes vitrines encadrées de bois et l’enseigne à la fleur au-dessus de la porte",
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
