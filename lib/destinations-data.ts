export type DestinationDifficulty = "Facile" | "Modere" | "Avance"

export interface Destination {
  slug: string
  title: string
  era: string
  image: string
  description: string
  duration: string
  difficulty: DestinationDifficulty
  longDescription: string
  highlights: string[]
}

export const destinations: Destination[] = [
  {
    slug: "paris-1889",
    title: "Paris 1889",
    era: "6 mai 1889",
    image: "/images/paris-1889.jpg",
    description:
      "Assistez a l'inauguration de la Tour Eiffel lors de l'Exposition Universelle.",
    duration: "3 Jours",
    difficulty: "Facile",
    longDescription:
      "Promenez-vous sur les Champs-Elysees, rencontrez les ingenieurs de la Tour Eiffel et vivez l'effervescence culturelle de la Belle Epoque.",
    highlights: [
      "Acces privilegie a l'inauguration de la Tour Eiffel",
      "Diner Belle Epoque avec menu historique",
      "Guide chrononaute francophone dedie",
    ],
  },
  {
    slug: "cretaceous",
    title: "Ere Cretace",
    era: "66 Millions av. J.-C.",
    image: "/images/cretaceous.jpg",
    description:
      "Marchez parmi les titans de la prehistoire dans leur habitat naturel.",
    duration: "5 Jours",
    difficulty: "Avance",
    longDescription:
      "Observez le T-Rex, le Triceratops et d'autres especes iconiques en toute securite grace a nos boucliers temporels actifs en permanence.",
    highlights: [
      "Safari dinosaure accompagne par deux experts",
      "Protocoles de securite renforces et capsule d'evacuation",
      "Observation de la faune prehistorique au lever du soleil",
    ],
  },
  {
    slug: "florence-1504",
    title: "Florence 1504",
    era: "8 septembre 1504",
    image: "/images/florence-1504.jpg",
    description:
      "Soyez present lors du devoilement du David de Michel-Ange.",
    duration: "4 Jours",
    difficulty: "Modere",
    longDescription:
      "Explorez les ateliers de la Renaissance, echangez avec des artistes visionnaires et assistez a la naissance d'innovations majeures en art et en science.",
    highlights: [
      "Place reservee pour le devoilement du David",
      "Rencontre privee avec des maitres artisans",
      "Parcours culturel complet de la Florence medicenne",
    ],
  },
]

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug)
}
