export interface Agency {
  id: number;
  ar: string;
  fr: string;
  city: { ar: string; fr: string };
  wilaya: string;
  initials: string;
  rating: number;
  trips: number;
  exp: number;
  verified: boolean;
  phone: string;
  about: { ar: string; fr: string; en: string };
}

export const AGENCIES: Agency[] = [
  {
    id: 1,
    ar: "وكالة الجزائر العاصمة",
    fr: "Agence Alger Centre",
    city: { ar: "الجزائر", fr: "Alger" },
    wilaya: "16",
    initials: "وج",
    rating: 4.9,
    trips: 450,
    exp: 8,
    verified: true,
    phone: "+213 555 12 34 56",
    about: {
      ar: "وكالة رائدة في تأجير السيارات بالجزائر العاصمة منذ 2016. نوفر مجموعة واسعة من السيارات الفاخرة والعائلية.",
      fr: "Agence leader de location à Alger depuis 2016.",
      en: "Leading car rental agency in Algiers since 2016.",
    },
  },
  {
    id: 2,
    ar: "وهران درايف",
    fr: "Oran Drive",
    city: { ar: "وهران", fr: "Oran" },
    wilaya: "31",
    initials: "ود",
    rating: 4.8,
    trips: 312,
    exp: 5,
    verified: true,
    phone: "+213 555 98 76 54",
    about: {
      ar: "أفضل خدمة تأجير في وهران بأسعار تنافسية وسيارات حديثة.",
      fr: "Meilleure location à Oran à prix compétitifs.",
      en: "Best car rental in Oran with competitive prices.",
    },
  },
  {
    id: 3,
    ar: "قسنطينة بريميوم",
    fr: "Constantine Premium",
    city: { ar: "قسنطينة", fr: "Constantine" },
    wilaya: "25",
    initials: "قب",
    rating: 4.85,
    trips: 280,
    exp: 6,
    verified: true,
    phone: "+213 555 44 55 66",
    about: {
      ar: "سيارات فاخرة وخدمة ممتازة في مدينة الجسور المعلقة.",
      fr: "Voitures de luxe à Constantine.",
      en: "Luxury cars in the City of Bridges.",
    },
  },
  {
    id: 4,
    ar: "عنابة للسيارات",
    fr: "Annaba Cars",
    city: { ar: "عنابة", fr: "Annaba" },
    wilaya: "23",
    initials: "عس",
    rating: 4.7,
    trips: 195,
    exp: 4,
    verified: false,
    phone: "+213 555 77 88 99",
    about: {
      ar: "خدمة موثوقة في عنابة وضواحيها.",
      fr: "Service fiable à Annaba.",
      en: "Reliable service in Annaba.",
    },
  },
  {
    id: 5,
    ar: "سطيف أوتو",
    fr: "Sétif Auto",
    city: { ar: "سطيف", fr: "Sétif" },
    wilaya: "19",
    initials: "سا",
    rating: 4.75,
    trips: 220,
    exp: 3,
    verified: true,
    phone: "+213 555 33 22 11",
    about: {
      ar: "الوكالة الأولى في سطيف والمنطقة الشرقية.",
      fr: "Première agence à Sétif.",
      en: "Top agency in Sétif.",
    },
  },
  {
    id: 6,
    ar: "تيزي وزو للأعراس",
    fr: "Tizi Wedding Cars",
    city: { ar: "تيزي وزو", fr: "Tizi Ouzou" },
    wilaya: "15",
    initials: "تع",
    rating: 4.95,
    trips: 180,
    exp: 7,
    verified: true,
    phone: "+213 555 66 77 88",
    about: {
      ar: "متخصصون في سيارات الأعراس الفاخرة بتيزي وزو والمنطقة.",
      fr: "Spécialistes des voitures de mariage.",
      en: "Wedding car specialists in Tizi Ouzou.",
    },
  },
];
