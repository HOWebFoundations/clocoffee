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
    order: { title: "Composez votre boisson", description: "Une base, un lait, un sucrage, une tasse. Quatre gestes et la commande part sur WhatsApp." },
    menu: { title: "Menu et prix", description: "Tous nos cafés, boissons glacées, matchas et douceurs, en USD et en LBP." },
    visit: { title: "Le café", description: "Il n’existe pas encore — clocoffee est une marque et une idée." },
    about: { title: "Notre histoire", description: "Qui peint les verres, et pourquoi aucun ne se ressemble." },
  },
  common: {
    orderNow: "Commander", backToCups: "Les trois tasses", exploreMore: "Continuez la visite",
    seeAllCups: "Découvrir les tasses", buildThisDrink: "Composer cette boisson", viewMenu: "Voir le menu",
    findUs: "Trouver le café",
    notFound: "Cette page a refroidi", notFoundBody: "Le lien que vous avez suivi n'existe pas — le café, si.",
    backHome: "Retour au café",
  },
  nav: { menu: "Menu", cups: "Les tasses", builder: "Composer", visit: "Le café", order: "Commander"  , open: "Index", close: "Fermer" },
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
  order: {
    heading: "Commander", sub: "Composez vos boissons et envoyez toute la commande sur WhatsApp.",
    yourOrder: "Votre commande", empty: "Rien pour l'instant.", addToOrder: "Ajouter", added: "Ajouté",
    remove: "Retirer", qty: "Qté", subtotal: "Sous-total", total: "Total",
    name: "Votre nom", namePh: "Pour vous appeler",
    notes: "Autre chose ?", notesPh: "Très chaud, sans glace, déca…", needName: "Ajoutez votre nom",
    addAnother: "Ajouter une autre boisson", waName: "Nom", waNotes: "Notes",
  },
  menu: {
    heading: "Le menu",
    sub: "Prix en USD et en LBP. Espèces, Whish ou OMT.",
    all: "Tout",
    indicative: "Ce que clocoffee servirait. Prix indicatifs — il n’y a pas encore de café où commander.",
    categories: { coffee: "Café", iced: "Glacés", matcha: "Matcha", sweets: "Douceurs" },
  },
  shop: {
    heading: "Venez nous voir",
    sub: "C'est ici que vivent les tasses.",
  },
  status: {
    badge: "Un concept en cours",
    conceptNote: "clocoffee est une marque en devenir \u2014 pas encore un caf\u00e9 o\u00f9 l\u2019on peut entrer.",
    cafeHeading: "Il n\u2019y a pas encore de caf\u00e9 \u00e0 visiter",
    cafeBody: "clocoffee est pour l\u2019instant une marque et une id\u00e9e. Un lieu o\u00f9 s\u2019asseoir et commander, c\u2019est le r\u00eave \u2014 suivez-nous et vous saurez d\u00e8s qu\u2019il y aura une adresse.",
    cafeCta: "Nous suivre sur Instagram",
    glassesHeading: "Les verres peints sont des \u0153uvres",
    glassesNote: "Chacun est peint \u00e0 la main, au c\u0153ur de l\u2019univers de la marque. Ils ne sont pas vendus et ne servent pas \u00e0 servir le caf\u00e9 \u2014 celui-ci arrive dans le verre clocoffee transparent.",
    orderNote: "Il n\u2019y a pas encore de caf\u00e9, rien ne peut donc \u00eatre pr\u00e9par\u00e9 aujourd\u2019hui. Composez quand m\u00eame \u2014 c\u2019est ainsi que la commande fonctionnera, et nous aimerions voir votre choix.",
    orderSend: "Envoyez-le nous sur WhatsApp",
  },
  about: {
    heading: "Chloé les peint, une par une",
    lede: "clocoffee, c’est Chloé et le café. La fleur au milieu du nom est l’une des siennes.",
    body: [
      "Trois verres existent à ce jour. Des iris de Van Gogh mêlés de vignes et de citrons. Une branche de cerisier saisie en pleine floraison. Une pluie de petites fleurs des champs qui vous en offre une différente à chaque rotation. Chacun est peint à la main : jamais deux tout à fait pareils.",
      "Ils ne sont pas à vendre et ce n’est pas dans ceux-là que votre café arrive — c’est le verre clocoffee transparent. Ces trois-là sont l’œuvre dont toute la marque est née, et la raison pour laquelle une fleur a remplacé le premier o.",
      "PLACEHOLDER — Chloé : quand tu as commencé à peindre, le temps que prend un verre, et ce qui t’a donné envie d’un café. Deux ou trois phrases avec tes mots suffisent.",
    ],
    cta: "Voir les trois",
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
