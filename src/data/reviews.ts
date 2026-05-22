export interface Review {
  id: number;
  targetType: "car" | "agency";
  targetId: number;
  userId: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const INIT_REVIEWS: Review[] = [
  { id: 1, targetType: "car",    targetId: 1, userId: "u1", name: "أحمد بن علي",    phone: "0555123456", avatar: "https://i.pravatar.cc/80?img=33", rating: 5, comment: "سيارة رائعة، نظيفة ومريحة جداً. الوكالة محترفة وخدمتهم ممتازة!", date: "2025-03-10" },
  { id: 2, targetType: "car",    targetId: 1, userId: "u2", name: "Karim Meziani", phone: "0661987654", avatar: "https://i.pravatar.cc/80?img=52", rating: 4, comment: "Très bonne voiture, propre et confortable. Je recommande vivement!", date: "2025-02-28" },
  { id: 3, targetType: "car",    targetId: 3, userId: "u3", name: "سارة حمداني",   phone: "0770456789", avatar: "https://i.pravatar.cc/80?img=47", rating: 5, comment: "SUV مميز، مناسب للعائلة. سعر معقول مقارنة بالخدمة المقدمة.", date: "2025-04-01" },
  { id: 4, targetType: "agency", targetId: 1, userId: "u1", name: "أحمد بن علي",    phone: "0555123456", avatar: "https://i.pravatar.cc/80?img=33", rating: 5, comment: "وكالة محترفة وموثوقة، سيارات حديثة وأسعار منافسة. أنصح الجميع بها!", date: "2025-03-15" },
  { id: 5, targetType: "agency", targetId: 2, userId: "u4", name: "Sofiane Lahlou", phone: "0550321654", avatar: "https://i.pravatar.cc/80?img=60", rating: 4, comment: "Agence sérieuse avec de belles voitures. Le personnel est très sympa.", date: "2025-03-20" },
  { id: 6, targetType: "car",    targetId: 4, userId: "u5", name: "يوسف قاسم",     phone: "0661234567", avatar: "https://i.pravatar.cc/80?img=15", rating: 5, comment: "تجربة استثنائية مع التيسلا! شحن مجاني وقيادة ممتعة جداً.", date: "2025-04-05" },
];
