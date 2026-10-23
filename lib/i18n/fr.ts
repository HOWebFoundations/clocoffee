import type { Dict } from "./types";

/**
 * PLACEHOLDER QUALITY — written by the site's developer tooling, not a native
 * copywriter. Needs a native review before launch (site-plan §8).
 */
export const fr: Dict = {
  meta: {
    title: "clocoffee — trois tasses, trois mondes",
    description: "Un café beyrouthin en devenir, né de trois verres peints à la main. Découvrez l’art, composez la boisson qu’il servira.",
  },
  pages: {
    home: { title: "clocoffee — trois tasses, trois mondes", description: "Un café beyrouthin en devenir, né de trois verres peints à la main. Découvrez l’art, composez la boisson qu’il servira." },
    cups: { title: "Les trois tasses", description: "Iris, Cerisier et Fleurettes — trois tasses peintes à la main, chacune avec son monde." },
    order: { title: "Composez une boisson", description: "Chaud ou glacé, café ou matcha, votre lait, votre parfum — regardez-la se verser, puis gardez-la en story." },
    menu: { title: "Menu et prix", description: "Tous nos cafés, boissons glacées, matchas et douceurs, en USD et en LBP." },
    visit: { title: "Le café", description: "Il n’existe pas encore — clocoffee est une marque et une idée." },
    about: { title: "Notre histoire", description: "Qui peint les verres, et pourquoi aucun ne se ressemble." },
    lookbook: { title: "Lookbook", description: "Tout ce à quoi la marque ressemble — la marque, les verres, les mondes, le lieu." },
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
    sub: "Trois verres peints à la main. Un café beyrouthin en devenir.",
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
    milks: { whole: "Entier", oat: "Avoine", almond: "Amande", none: "Sans" },
    sweet: { zero: "Sans sucre", half: "Légèrement sucré", full: "Sucré" },
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
  make: {
    heading: "Composez une boisson",
    sub: "Celle que vous commanderiez. Puis emportez-la.",
    steps: { temp: "Chaud ou glacé", base: "Base", milk: "Lait", sweet: "Sucre", syrup: "Parfum", topping: "Par-dessus", world: "Décor" },
    temp: { hot: "Chaud", iced: "Glacé" },
    bases: { coffee: "Café", matcha: "Matcha" },
    syrups: { none: "Rien", vanilla: "Vanille", caramel: "Caramel", rose: "Rose", pistachio: "Pistache" },
    toppings: { none: "Rien", cinnamon: "Cannelle", cocoa: "Cacao", flower: "Une fleur séchée" },
    names: { espresso: "Espresso", latte: "Latte", icedLatte: "Latte glacé", coldBrew: "Cold brew", matcha: "Matcha", matchaLatte: "Matcha latte", icedMatcha: "Matcha glacé", icedMatchaLatte: "Matcha latte glacé" },
    nameMilk: { oat: "à l’avoine", almond: "à l’amande" },
    nameSweet: { half: "légèrement sucré", full: "sucré" },
    yourDrink: "Votre boisson", save: "Enregistrer en story", saving: "Préparation de la carte…", saved: "Enregistrée",
    share: "Partager", download: "Télécharger",
    cardTag: "fait sur clocoffee.vercel.app", cardSoon: "Un café beyrouthin en devenir",
  },
  lookbook: {
    heading: "Lookbook",
    lede: "Tout ce à quoi clocoffee ressemble, au même endroit.",
    groups: {
      mark: { title: "La marque", note: "Minuscules, chaleur, et une fleur à la place du premier o — peinte par Chloé." },
      glasses: { title: "Les trois verres", note: "Iris, Cerisier, Fleurettes. Peints à la main, un par un. Des œuvres, pas des produits." },
      world: { title: "L’univers", note: "Crème et espresso pour scène ; chaque verre apporte sa couleur." },
      place: { title: "Le lieu, imaginé", note: "Rendus conceptuels d’un café qui n’existe pas encore. Le rêve, dessiné." },
    },
  },
  soon: {
    waitHeading: "Savoir quand on ouvre",
    waitBody: "Pas encore de café. Quand il y aura une porte, cette liste le saura en premier.",
    waitCta: "Inscrivez-moi",
    waitMsg: "Bonjour clocoffee — ajoutez-moi à la liste d’ouverture s’il vous plaît !",
    contactHeading: "Partenaires, presse, collaborations",
    contactBody: "Un lieu, une idée, une question : écrivez-nous.",
    contactCta: "Nous écrire",
    igHeading: "Dernièrement",
    igBody: "Les verres, les versés, le travail en cours.",
  },
  home: {
    makeHeading: "Composez la boisson que vous commanderiez",
    makeBody: "Chaud ou glacé, café ou matcha, votre lait, votre parfum — regardez-la se verser, puis gardez-la en story.",
    makeCta: "Composer une boisson",
    lookHeading: "Le lookbook",
    lookBody: "La marque, les verres, les mondes, le lieu — tout ce à quoi clocoffee ressemble.",
    lookCta: "Ouvrir le lookbook",
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
