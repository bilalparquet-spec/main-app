import { useState, useRef, useEffect, useCallback } from "react";

// ── Mobile First Hook ────────────────────────────────────────
function useIsMobile(bp=480) {
  const [is, setIs] = useState(()=>typeof window!=="undefined"&&window.innerWidth<=bp);
  useEffect(()=>{
    const fn=()=>setIs(window.innerWidth<=bp);
    window.addEventListener("resize",fn,{passive:true});
    return()=>window.removeEventListener("resize",fn);
  },[bp]);
  return is;
}
function useIsTablet(bp=768) {
  const [is, setIs] = useState(()=>typeof window!=="undefined"&&window.innerWidth<=bp);
  useEffect(()=>{
    const fn=()=>setIs(window.innerWidth<=bp);
    window.addEventListener("resize",fn,{passive:true});
    return()=>window.removeEventListener("resize",fn);
  },[bp]);
  return is;
}

// ═══════════════════════════════════════════════════════════════════════════
// Qatar2022Font — embedded via @font-face (Google Fonts CDN)
// This ensures the font loads correctly in all environments including VS Code
// ═══════════════════════════════════════════════════════════════════════════
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
  @font-face {
    font-family: 'Qatar2022Font';
    src: url('https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvangtZmpcWmhzfH5lWWgcQyypdqSNBA.woff2') format('woff2');
    font-weight: 400 900;
    font-style: normal;
    font-display: swap;
  }
  * { font-family: 'Qatar2022Font', 'Cairo', 'Tajawal', 'Segoe UI', Arial, sans-serif !important; }
`;

// ── SVG Icons ─────────────────────────────────────────────────────────────
const Ic = {
  Home:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Car:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>,
  Rings:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>,
  Map:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  Msg:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Send:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Search:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  ChevD:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Back:()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Shield:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Bolt:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Refresh:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  Pin:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Cal:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Users:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Phone:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.82 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.08-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  Star:(f)=><svg width="13" height="13" viewBox="0 0 24 24" fill={f?"#F59E0B":"none"} stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Info:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Menu:()=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Van:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="9" width="22" height="11" rx="1"/><path d="M1 12h22M9 9V5a2 2 0 012-2h4a2 2 0 012 2v4"/><circle cx="6" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>,
  Sun:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  Globe:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Plus:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Truck:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Tag:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Bell:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  FourX4:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="10" width="22" height="10" rx="2"/><path d="M5 10V6a2 2 0 012-2h6l4 4v4"/><path d="M15 6h0"/><circle cx="6" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><line x1="9" y1="4" x2="9" y2="10"/></svg>,
};

// ── Algeria All 58 Wilayas (flat list sorted by code) ────────────────────
const ALL_WILAYAS = [
  {c:"01",ar:"أدرار",fr:"Adrar"},{c:"02",ar:"الشلف",fr:"Chlef"},
  {c:"03",ar:"الأغواط",fr:"Laghouat"},{c:"04",ar:"أم البواقي",fr:"Oum El Bouaghi"},
  {c:"05",ar:"باتنة",fr:"Batna"},{c:"06",ar:"بجاية",fr:"Béjaïa"},
  {c:"07",ar:"بسكرة",fr:"Biskra"},{c:"08",ar:"بشار",fr:"Béchar"},
  {c:"09",ar:"البليدة",fr:"Blida"},{c:"10",ar:"البويرة",fr:"Bouira"},
  {c:"11",ar:"تمنراست",fr:"Tamanrasset"},{c:"12",ar:"تبسة",fr:"Tébessa"},
  {c:"13",ar:"تلمسان",fr:"Tlemcen"},{c:"14",ar:"تيارت",fr:"Tiaret"},
  {c:"15",ar:"تيزي وزو",fr:"Tizi Ouzou"},{c:"16",ar:"الجزائر",fr:"Alger"},
  {c:"17",ar:"الجلفة",fr:"Djelfa"},{c:"18",ar:"جيجل",fr:"Jijel"},
  {c:"19",ar:"سطيف",fr:"Sétif"},{c:"20",ar:"سعيدة",fr:"Saïda"},
  {c:"21",ar:"سكيكدة",fr:"Skikda"},{c:"22",ar:"سيدي بلعباس",fr:"Sidi Bel Abbès"},
  {c:"23",ar:"عنابة",fr:"Annaba"},{c:"24",ar:"قالمة",fr:"Guelma"},
  {c:"25",ar:"قسنطينة",fr:"Constantine"},{c:"26",ar:"المدية",fr:"Médéa"},
  {c:"27",ar:"مستغانم",fr:"Mostaganem"},{c:"28",ar:"المسيلة",fr:"M'Sila"},
  {c:"29",ar:"معسكر",fr:"Mascara"},{c:"30",ar:"ورقلة",fr:"Ouargla"},
  {c:"31",ar:"وهران",fr:"Oran"},{c:"32",ar:"البيض",fr:"El Bayadh"},
  {c:"33",ar:"إليزي",fr:"Illizi"},{c:"34",ar:"برج بوعريريج",fr:"Bordj Bou Arréridj"},
  {c:"35",ar:"بومرداس",fr:"Boumerdès"},{c:"36",ar:"الطارف",fr:"El Tarf"},
  {c:"37",ar:"تندوف",fr:"Tindouf"},{c:"38",ar:"تيسمسيلت",fr:"Tissemsilt"},
  {c:"39",ar:"الوادي",fr:"El Oued"},{c:"40",ar:"خنشلة",fr:"Khenchela"},
  {c:"41",ar:"سوق أهراس",fr:"Souk Ahras"},{c:"42",ar:"تيبازة",fr:"Tipaza"},
  {c:"43",ar:"ميلة",fr:"Mila"},{c:"44",ar:"عين الدفلى",fr:"Aïn Defla"},
  {c:"45",ar:"النعامة",fr:"Naâma"},{c:"46",ar:"عين تموشنت",fr:"Aïn Témouchent"},
  {c:"47",ar:"غرداية",fr:"Ghardaïa"},{c:"48",ar:"غليزان",fr:"Relizane"},
  {c:"49",ar:"تيميمون",fr:"Timimoun"},{c:"50",ar:"برج باجي مختار",fr:"Bordj Badji Mokhtar"},
  {c:"51",ar:"أولاد جلال",fr:"Ouled Djellal"},{c:"52",ar:"بني عباس",fr:"Béni Abbès"},
  {c:"53",ar:"إن صالح",fr:"In Salah"},{c:"54",ar:"إن ڤزام",fr:"In Guezzam"},
  {c:"55",ar:"توقرت",fr:"Touggourt"},{c:"56",ar:"جانت",fr:"Djanet"},
  {c:"57",ar:"المغير",fr:"El M'Ghair"},{c:"58",ar:"المنيعة",fr:"El Menia"},
];
// Kept for backward compat
const REGIONS = {};

// ── Translations ──────────────────────────────────────────────────────────
const TR = {
  ar:{ dir:"rtl", app:"درايف RENT", flag:"🇩🇿", tagline:"منصة تأجير السيارات الجزائرية",
    nav:{ home:"الرئيسية", cars:"السيارات", wedding:"سيارات الأعراس", agencies:"الوكالات", messages:"الرسائل" },
    searchBtn:"ابحث عن سيارة", from:"من", to:"إلى", wilaya:"الولاية", allWilayas:"جميع الولايات",
    filters:{ all:"الكل", suv:"SUV", sedan:"سيدان", luxury:"فاخرة", electric:"كهربائية", van:"فان", wedding:"زفاف", fourx4:"4×4" },
    sort:{ pop:"الأكثر طلباً", new:"الأحدث", cheap:"الأرخص" },
    cur:"دج", perDay:"/يوم", book:"احجز الآن", msgAgency:"راسل الوكالة",
    instant:"حجز فوري", freeCancel:"إلغاء مجاني", verified:"موثقة",
    trips:"رحلة", reviews:"تقييم", year:"السنة", seats:"المقاعد", type:"النوع", agency:"الوكالة",
    wTitle:"سيارات الأعراس", wDesc:"اجعل يومك الاستثنائي لا يُنسى بأرقى السيارات الفاخرة",
    wBadge:"زفاف فاخر", wPerDay:"لليوم",
    howTitle:"كيف يعمل", s1t:"اختر الولاية", s1d:"حدد موقعك من 58 ولاية جزائرية",
    s2t:"احجز بسهولة", s2d:"أكمل الحجز في دقائق مع دفع آمن",
    s3t:"انطلق!", s3d:"تسلّم سيارتك واستمتع بالرحلة",
    agTitle:"الوكالات المتاحة", viewAgency:"عرض الوكالة",
    ap:{ cars:"السيارات", about:"عن الوكالة", contact:"التواصل", rating:"التقييم", totalCars:"عدد السيارات", exp:"سنوات الخبرة" },
    msgs:{ title:"الرسائل", type:"اكتب رسالة...", noConv:"لا توجد محادثات", selectConv:"اختر محادثة للبدء", online:"متصل" },
    back:"رجوع", total:"المجموع", fee:"رسوم الخدمة", days:"أيام",
    booked:"تم الحجز بنجاح! 🎉", bookedMsg:"ستتواصل معك الوكالة قريباً",
    listCar:"أضف وكالتك", ctaT:"لديك وكالة؟ انضم إلينا!", ctaD:"أضف وكالتك واحصل على آلاف العملاء",
    addPage:{ title:"أضف وكالتك", sub:"انضم إلى منصة درايف RENT وابدأ في كسب الدخل", step1:"معلومات الوكالة", step2:"بيانات التواصل", step3:"تأكيد التسجيل", nameLabel:"اسم الوكالة", namePh:"مثال: وكالة النور للسيارات", ownerLabel:"اسم المسؤول", ownerPh:"الاسم الكامل", wilayaLabel:"الولاية", phoneLabel:"رقم الهاتف", phonePh:"0555 xx xx xx", emailLabel:"البريد الإلكتروني", emailPh:"exemple@email.com", carsLabel:"عدد السيارات المتاحة", addressLabel:"العنوان التفصيلي", addressPh:"الحي، الشارع، المدينة...", descLabel:"وصف الوكالة", descPh:"اكتب نبذة مختصرة عن وكالتك...", submitBtn:"أرسل طلب التسجيل", successTitle:"تم إرسال طلبك!", successMsg:"سيتواصل معك فريقنا خلال 24-48 ساعة لتأكيد تسجيل وكالتك.", benefits:["ظهور أمام آلاف العملاء","لوحة تحكم متكاملة","دعم فني مجاني","بدون عمولات مخفية"], benefitsTitle:"لماذا درايف RENT؟" },
    footer:"© 2025 درايف RENT — منصة الجزائرية لتأجير السيارات 🇩🇿",
  },
  fr:{ dir:"ltr", app:"DriveRENT", flag:"🇩🇿", tagline:"Location de voitures en Algérie",
    nav:{ home:"Accueil", cars:"Voitures", wedding:"Mariage", agencies:"Agences", messages:"Messages" },
    searchBtn:"Trouver une voiture", from:"Du", to:"Au", wilaya:"Wilaya", allWilayas:"Toutes les wilayas",
    filters:{ all:"Tous", suv:"SUV", sedan:"Berline", luxury:"Luxe", electric:"Électrique", van:"Van", wedding:"Mariage", fourx4:"4×4" },
    sort:{ pop:"Populaires", new:"Récents", cheap:"Moins chers" },
    cur:"DA", perDay:"/jour", book:"Réserver", msgAgency:"Contacter",
    instant:"Réservation instantanée", freeCancel:"Annulation gratuite", verified:"Vérifiée",
    trips:"voyages", reviews:"avis", year:"Année", seats:"Sièges", type:"Type", agency:"Agence",
    wTitle:"Voitures de mariage", wDesc:"Rendez votre grand jour inoubliable",
    wBadge:"Mariage luxe", wPerDay:"par jour",
    howTitle:"Comment ça marche", s1t:"Choisir la wilaya", s1d:"Parmi 58 wilayas algériennes",
    s2t:"Réserver", s2d:"En quelques minutes, paiement sécurisé",
    s3t:"Prendre la route!", s3d:"Récupérez les clés et profitez",
    agTitle:"Agences disponibles", viewAgency:"Voir l'agence",
    ap:{ cars:"Voitures", about:"À propos", contact:"Contact", rating:"Note", totalCars:"Voitures", exp:"Années exp." },
    msgs:{ title:"Messages", type:"Écrire un message...", noConv:"Aucune conversation", selectConv:"Sélectionnez une conversation", online:"En ligne" },
    back:"Retour", total:"Total", fee:"Frais de service", days:"jours",
    booked:"Réservé! 🎉", bookedMsg:"L'agence vous contactera bientôt",
    listCar:"Ajouter mon agence", ctaT:"Vous avez une agence? Rejoignez-nous!", ctaD:"Ajoutez votre agence et accédez à des milliers de clients",
    addPage:{ title:"Ajoutez votre agence", sub:"Rejoignez DriveRENT et commencez à gagner des revenus", step1:"Infos de l'agence", step2:"Coordonnées", step3:"Confirmation", nameLabel:"Nom de l'agence", namePh:"Ex: Agence El Nour", ownerLabel:"Nom du responsable", ownerPh:"Nom complet", wilayaLabel:"Wilaya", phoneLabel:"Numéro de téléphone", phonePh:"0555 xx xx xx", emailLabel:"Email", emailPh:"exemple@email.com", carsLabel:"Nombre de voitures", addressLabel:"Adresse détaillée", addressPh:"Quartier, rue, ville...", descLabel:"Description de l'agence", descPh:"Décrivez brièvement votre agence...", submitBtn:"Envoyer la demande", successTitle:"Demande envoyée!", successMsg:"Notre équipe vous contactera sous 24-48h pour confirmer votre inscription.", benefits:["Visibilité auprès de milliers de clients","Tableau de bord complet","Support technique gratuit","Sans commissions cachées"], benefitsTitle:"Pourquoi DriveRENT?" },
    footer:"© 2025 DriveRENT — Plateforme algérienne de location 🇩🇿",
  },
  en:{ dir:"ltr", app:"DriveRENT", flag:"🇩🇿", tagline:"Algeria's Car Rental Platform",
    nav:{ home:"Home", cars:"Cars", wedding:"Wedding", agencies:"Agencies", messages:"Messages" },
    searchBtn:"Find a car", from:"From", to:"To", wilaya:"Wilaya", allWilayas:"All Wilayas",
    filters:{ all:"All", suv:"SUV", sedan:"Sedan", luxury:"Luxury", electric:"Electric", van:"Van", wedding:"Wedding", fourx4:"4×4" },
    sort:{ pop:"Most Popular", new:"Newest", cheap:"Cheapest" },
    cur:"DA", perDay:"/day", book:"Book Now", msgAgency:"Message Agency",
    instant:"Instant booking", freeCancel:"Free cancellation", verified:"Verified",
    trips:"trips", reviews:"reviews", year:"Year", seats:"Seats", type:"Type", agency:"Agency",
    wTitle:"Wedding Cars", wDesc:"Make your special day unforgettable with our luxury fleet",
    wBadge:"Wedding", wPerDay:"per day",
    howTitle:"How It Works", s1t:"Choose Wilaya", s1d:"Select from 58 Algerian wilayas",
    s2t:"Book Easily", s2d:"Complete booking in minutes, secure payment",
    s3t:"Hit the Road!", s3d:"Pick up your car and enjoy the journey",
    agTitle:"Available Agencies", viewAgency:"View Agency",
    ap:{ cars:"Cars", about:"About", contact:"Contact", rating:"Rating", totalCars:"Cars", exp:"Years exp." },
    msgs:{ title:"Messages", type:"Type a message...", noConv:"No conversations yet", selectConv:"Select a conversation", online:"Online" },
    back:"Back", total:"Total", fee:"Service fee", days:"days",
    booked:"Booked! 🎉", bookedMsg:"The agency will contact you soon",
    listCar:"List Your Agency", ctaT:"Have an agency? Join us!", ctaD:"Add your agency and reach thousands of customers",
    addPage:{ title:"Add Your Agency", sub:"Join DriveRENT and start earning revenue", step1:"Agency Info", step2:"Contact Details", step3:"Confirmation", nameLabel:"Agency Name", namePh:"Ex: El Nour Car Agency", ownerLabel:"Manager Name", ownerPh:"Full name", wilayaLabel:"Wilaya", phoneLabel:"Phone Number", phonePh:"0555 xx xx xx", emailLabel:"Email", emailPh:"example@email.com", carsLabel:"Available Cars Count", addressLabel:"Detailed Address", addressPh:"District, street, city...", descLabel:"Agency Description", descPh:"Write a brief description of your agency...", submitBtn:"Submit Registration", successTitle:"Request Sent!", successMsg:"Our team will contact you within 24-48 hours to confirm your agency registration.", benefits:["Visibility to thousands of clients","Full management dashboard","Free technical support","No hidden commissions"], benefitsTitle:"Why DriveRENT?" },
    footer:"© 2025 DriveRENT — Algeria's Car Rental Platform 🇩🇿",
  },
};

// ── Agencies ──────────────────────────────────────────────────────────────
// ── Agency Logo SVG generator ─────────────────────────────────────────────
const AgencyLogo = ({agency, size=40, style={}}) => {
  const colors = [
    {bg:"#7C3AED",accent:"#A855F7"}, // purple
    {bg:"#0F766E",accent:"#14B8A6"}, // teal
    {bg:"#1D4ED8",accent:"#3B82F6"}, // blue
    {bg:"#B45309",accent:"#F59E0B"}, // amber
    {bg:"#065F46",accent:"#10B981"}, // emerald
    {bg:"#9D174D",accent:"#EC4899"}, // pink
  ];
  const c = colors[(agency.id-1) % colors.length];
  const initials = agency.initials || (agency.ar ? agency.ar.slice(0,2) : agency.fr.slice(0,2));
  return (
    <div style={{
      width:size, height:size, borderRadius: size*0.25,
      background:`linear-gradient(135deg,${c.bg},${c.accent})`,
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, position:"relative", overflow:"hidden",
      boxShadow:`0 4px 14px ${c.bg}55`,
      ...style
    }}>
      {/* Car icon watermark */}
      <svg width={size*0.55} height={size*0.55} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:"absolute",bottom:-2,right:-2}}>
        <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
      </svg>
      <span style={{fontSize:size*0.32, fontWeight:900, color:"#fff", letterSpacing:"-0.5px", position:"relative", zIndex:1, fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>{initials}</span>
    </div>
  );
};

const AGENCIES = [
  { id:1, ar:"وكالة الجزائر العاصمة", fr:"Agence Alger Centre", city:{ar:"الجزائر",fr:"Alger"}, wilaya:"16", initials:"وج", rating:4.9,  trips:450, exp:8, verified:true,  phone:"+213 555 12 34 56", about:{ar:"وكالة رائدة في تأجير السيارات بالجزائر العاصمة منذ 2016. نوفر مجموعة واسعة من السيارات الفاخرة والعائلية.",fr:"Agence leader de location à Alger depuis 2016.",en:"Leading car rental agency in Algiers since 2016."} },
  { id:2, ar:"وهران درايف",           fr:"Oran Drive",          city:{ar:"وهران",fr:"Oran"},   wilaya:"31", initials:"ود", rating:4.8,  trips:312, exp:5, verified:true,  phone:"+213 555 98 76 54", about:{ar:"أفضل خدمة تأجير في وهران بأسعار تنافسية وسيارات حديثة.",fr:"Meilleure location à Oran à prix compétitifs.",en:"Best car rental in Oran with competitive prices."} },
  { id:3, ar:"قسنطينة بريميوم",       fr:"Constantine Premium",  city:{ar:"قسنطينة",fr:"Constantine"}, wilaya:"25", initials:"قب", rating:4.85, trips:280, exp:6, verified:true,  phone:"+213 555 44 55 66", about:{ar:"سيارات فاخرة وخدمة ممتازة في مدينة الجسور المعلقة.",fr:"Voitures de luxe à Constantine.",en:"Luxury cars in the City of Bridges."} },
  { id:4, ar:"عنابة للسيارات",        fr:"Annaba Cars",          city:{ar:"عنابة",fr:"Annaba"}, wilaya:"23", initials:"عس", rating:4.7,  trips:195, exp:4, verified:false, phone:"+213 555 77 88 99", about:{ar:"خدمة موثوقة في عنابة وضواحيها.",fr:"Service fiable à Annaba.",en:"Reliable service in Annaba."} },
  { id:5, ar:"سطيف أوتو",             fr:"Sétif Auto",           city:{ar:"سطيف",fr:"Sétif"},   wilaya:"19", initials:"سا", rating:4.75, trips:220, exp:3, verified:true,  phone:"+213 555 33 22 11", about:{ar:"الوكالة الأولى في سطيف والمنطقة الشرقية.",fr:"Première agence à Sétif.",en:"Top agency in Sétif."} },
  { id:6, ar:"تيزي وزو للأعراس",      fr:"Tizi Wedding Cars",    city:{ar:"تيزي وزو",fr:"Tizi Ouzou"}, wilaya:"15", initials:"تع", rating:4.95, trips:180, exp:7, verified:true,  phone:"+213 555 66 77 88", about:{ar:"متخصصون في سيارات الأعراس الفاخرة بتيزي وزو والمنطقة.",fr:"Spécialistes des voitures de mariage.",en:"Wedding car specialists in Tizi Ouzou."} },
];

// ── Cars ──────────────────────────────────────────────────────────────────
const CARS = [
  { id:1,  name:"Mercedes S-Class",        type:"luxury",   price:15000, rating:4.95, trips:128, reviews:94,  year:2023, seats:5, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"فاخرة" },
  { id:2,  name:"BMW 5 Series",            type:"luxury",   price:12000, rating:4.9,  trips:87,  reviews:72,  year:2022, seats:5, agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80", tags:["verified"],                        wedding:false, badge:"فاخرة" },
  { id:3,  name:"Toyota RAV4",             type:"suv",      price:7000,  rating:4.85, trips:203, reviews:181, year:2023, seats:7, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80", tags:["instant","freeCancel","verified"], wedding:false, badge:"SUV" },
  { id:4,  name:"Tesla Model 3",           type:"electric", price:9000,  rating:4.95, trips:65,  reviews:58,  year:2024, seats:5, agencyId:3, wilaya:"25", img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", tags:["instant","freeCancel"],           wedding:false, badge:"كهربائية" },
  { id:5,  name:"Rolls-Royce Phantom",     type:"wedding",  price:80000, rating:5.0,  trips:42,  reviews:42,  year:2023, seats:5, agencyId:6, wilaya:"15", img:"https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=80", tags:["instant","verified"],             wedding:true,  badge:"زفاف" },
  { id:6,  name:"Bentley Continental GT",  type:"wedding",  price:65000, rating:4.98, trips:38,  reviews:37,  year:2022, seats:4, agencyId:6, wilaya:"15", img:"https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80", tags:["verified"],                        wedding:true,  badge:"زفاف" },
  { id:7,  name:"Range Rover Vogue",       type:"wedding",  price:45000, rating:4.9,  trips:55,  reviews:51,  year:2023, seats:5, agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tags:["instant","freeCancel","verified"], wedding:true,  badge:"زفاف" },
  { id:8,  name:"Volkswagen Golf",         type:"sedan",    price:4500,  rating:4.8,  trips:175, reviews:160, year:2023, seats:5, agencyId:4, wilaya:"23", img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags:["instant"],                         wedding:false, badge:"سيدان" },
  { id:9,  name:"Dacia Duster",            type:"suv",      price:3500,  rating:4.75, trips:310, reviews:278, year:2022, seats:5, agencyId:5, wilaya:"19", img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags:["freeCancel"],                      wedding:false, badge:"SUV" },
  { id:10, name:"Mercedes Classe E Cabrio",type:"wedding",  price:55000, rating:4.92, trips:29,  reviews:28,  year:2023, seats:4, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", tags:["instant","verified"],             wedding:true,  badge:"زفاف" },
  { id:11, name:"Ford Transit Van",           type:"van",      price:8000,  rating:4.7,  trips:145, reviews:130, year:2022, seats:9, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"فان" },
  { id:12, name:"Mercedes Sprinter",          type:"van",      price:11000, rating:4.8,  trips:98,  reviews:90,  year:2023, seats:15,agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=600&q=80", tags:["verified","freeCancel"],          wedding:false, badge:"فان" },
  { id:13, name:"Renault Master Van",         type:"van",      price:7500,  rating:4.65, trips:112, reviews:100, year:2022, seats:9, agencyId:3, wilaya:"25", img:"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", tags:["instant"],                         wedding:false, badge:"فان" },
  { id:14, name:"Toyota HiAce",              type:"van",      price:9500,  rating:4.85, trips:88,  reviews:82,  year:2023, seats:12,agencyId:5, wilaya:"19", img:"https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"فان" },
  { id:15, name:"Audi A6",                   type:"luxury",   price:13500, rating:4.88, trips:72,  reviews:65,  year:2023, seats:5, agencyId:3, wilaya:"25", img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"فاخرة", brand:"Audi" },
  { id:16, name:"Porsche Cayenne",            type:"suv",      price:18000, rating:4.92, trips:45,  reviews:40,  year:2023, seats:5, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", tags:["instant","freeCancel","verified"], wedding:false, badge:"SUV", brand:"Porsche" },
  { id:17, name:"Hyundai Tucson",             type:"suv",      price:5500,  rating:4.7,  trips:188, reviews:170, year:2022, seats:5, agencyId:4, wilaya:"23", img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", tags:["freeCancel"],                      wedding:false, badge:"SUV", brand:"Hyundai" },
  { id:18, name:"Renault Clio",               type:"sedan",    price:2800,  rating:4.6,  trips:290, reviews:260, year:2022, seats:5, agencyId:5, wilaya:"19", img:"https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80", tags:["instant"],                         wedding:false, badge:"سيدان", brand:"Renault" },
  { id:19, name:"Kia Sportage",               type:"suv",      price:6000,  rating:4.78, trips:155, reviews:140, year:2023, seats:5, agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags:["instant","freeCancel"],           wedding:false, badge:"SUV", brand:"Kia" },
  { id:20, name:"Tesla Model Y",              type:"electric", price:11000, rating:4.97, trips:38,  reviews:35,  year:2024, seats:7, agencyId:3, wilaya:"25", img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"كهربائية", brand:"Tesla" },
  { id:21, name:"Peugeot 308",               type:"sedan",    price:3800,  rating:4.65, trips:210, reviews:195, year:2022, seats:5, agencyId:6, wilaya:"15", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tags:["freeCancel"],                      wedding:false, badge:"سيدان", brand:"Peugeot" },
  { id:22, name:"Lamborghini Urus",           type:"luxury",   price:50000, rating:5.0,  trips:15,  reviews:15,  year:2023, seats:4, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"فاخرة", brand:"Lamborghini" },
  { id:23, name:"Chevrolet Tahoe",            type:"suv",      price:14000, rating:4.8,  trips:62,  reviews:58,  year:2023, seats:8, agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tags:["instant","freeCancel","verified"], wedding:false, badge:"SUV", brand:"Chevrolet" },
  { id:24, name:"Toyota Land Cruiser",        type:"4x4",      price:16000, rating:4.9,  trips:95,  reviews:88,  year:2023, seats:7, agencyId:1, wilaya:"16", img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags:["instant","freeCancel","verified"], wedding:false, badge:"4×4", brand:"Toyota" },
  { id:25, name:"Nissan Patrol",              type:"4x4",      price:14500, rating:4.85, trips:78,  reviews:70,  year:2023, seats:8, agencyId:2, wilaya:"31", img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", tags:["instant","verified"],             wedding:false, badge:"4×4", brand:"Nissan" },
  { id:26, name:"Ford Bronco",                type:"4x4",      price:12000, rating:4.8,  trips:54,  reviews:50,  year:2023, seats:5, agencyId:3, wilaya:"25", img:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80", tags:["freeCancel","verified"],          wedding:false, badge:"4×4", brand:"Ford" },
  { id:27, name:"Jeep Wrangler",              type:"4x4",      price:11500, rating:4.78, trips:67,  reviews:61,  year:2022, seats:5, agencyId:4, wilaya:"23", img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags:["instant"],                         wedding:false, badge:"4×4", brand:"Jeep" },
  { id:28, name:"Mitsubishi Pajero",          type:"4x4",      price:9500,  rating:4.7,  trips:112, reviews:100, year:2022, seats:7, agencyId:5, wilaya:"19", img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags:["freeCancel"],                      wedding:false, badge:"4×4", brand:"Mitsubishi" },
];

// ── Car Brands ───────────────────────────────────────────────────────────────
const BRANDS = ["الكل","Mercedes","BMW","Toyota","Tesla","Rolls-Royce","Bentley","Range Rover","Volkswagen","Dacia","Ford","Renault","Audi","Porsche","Hyundai","Kia","Peugeot","Lamborghini","Chevrolet","Nissan","Jeep","Mitsubishi"];

const INIT_CONVS = [
  { id:1, agencyId:1, msgs:[{from:"agency",text:"مرحباً! كيف يمكنني مساعدتك؟",time:"10:30"},{from:"user",text:"أريد حجز المرسيدس ليوم الجمعة",time:"10:31"},{from:"agency",text:"بكل سرور! هل تريد S-Class أم E-Class؟",time:"10:32"}] },
  { id:2, agencyId:6, msgs:[{from:"agency",text:"Bonjour! Comment puis-je vous aider pour votre mariage?",time:"14:00"}] },
];

// ── Initial Reviews ───────────────────────────────────────────────────────
const INIT_REVIEWS = [
  { id:1, targetType:"car", targetId:1, userId:"u1", name:"أحمد بن علي", phone:"0555123456", avatar:"https://i.pravatar.cc/80?img=33", rating:5, comment:"سيارة رائعة، نظيفة ومريحة جداً. الوكالة محترفة وخدمتهم ممتازة!", date:"2025-03-10" },
  { id:2, targetType:"car", targetId:1, userId:"u2", name:"Karim Meziani", phone:"0661987654", avatar:"https://i.pravatar.cc/80?img=52", rating:4, comment:"Très bonne voiture, propre et confortable. Je recommande vivement!", date:"2025-02-28" },
  { id:3, targetType:"car", targetId:3, userId:"u3", name:"سارة حمداني", phone:"0770456789", avatar:"https://i.pravatar.cc/80?img=47", rating:5, comment:"SUV مميز، مناسب للعائلة. سعر معقول مقارنة بالخدمة المقدمة.", date:"2025-04-01" },
  { id:4, targetType:"agency", targetId:1, userId:"u1", name:"أحمد بن علي", phone:"0555123456", avatar:"https://i.pravatar.cc/80?img=33", rating:5, comment:"وكالة محترفة وموثوقة، سيارات حديثة وأسعار منافسة. أنصح الجميع بها!", date:"2025-03-15" },
  { id:5, targetType:"agency", targetId:2, userId:"u4", name:"Sofiane Lahlou", phone:"0550321654", avatar:"https://i.pravatar.cc/80?img=60", rating:4, comment:"Agence sérieuse avec de belles voitures. Le personnel est très sympa.", date:"2025-03-20" },
  { id:6, targetType:"car", targetId:4, userId:"u5", name:"يوسف قاسم", phone:"0661234567", avatar:"https://i.pravatar.cc/80?img=15", rating:5, comment:"تجربة استثنائية مع التيسلا! شحن مجاني وقيادة ممتعة جداً.", date:"2025-04-05" },
];



// ── Bookings initial data ──────────────────────────────────────────────────
const INIT_BOOKINGS = [
  { id:1, agencyId:1, carName:"Mercedes S-Class", clientName:"أحمد بن علي", clientPhone:"0555123456", from:"2025-06-10", to:"2025-06-13", days:3, total:45000, status:"pending",  time:"10:32" },
  { id:2, agencyId:1, carName:"Toyota RAV4",       clientName:"Karim Meziani", clientPhone:"0661987654", from:"2025-06-15", to:"2025-06-17", days:2, total:14000, status:"confirmed",time:"09:15" },
  { id:3, agencyId:2, carName:"BMW 5 Series",      clientName:"سارة حمداني", clientPhone:"0770456789", from:"2025-06-20", to:"2025-06-22", days:2, total:24000, status:"pending",  time:"14:00" },
  { id:4, agencyId:1, carName:"Lamborghini Urus",   clientName:"يوسف قاسم", clientPhone:"0550321654", from:"2025-07-01", to:"2025-07-02", days:1, total:50000, status:"pending",  time:"16:45" },
  { id:5, agencyId:2, carName:"Range Rover Vogue",  clientName:"Sofiane Lahlou", clientPhone:"0661234567", from:"2025-06-28", to:"2025-06-30", days:2, total:90000, status:"confirmed",time:"11:30" },
];

// ── Small helpers ─────────────────────────────────────────────────────────
const Stars = ({r})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:2}}>
    {[1,2,3,4,5].map(i=><span key={i}>{Ic.Star(i<=Math.round(r))}</span>)}
    <span style={{color:"#94a3b8",fontSize:12,marginRight:3}}>{r}</span>
  </span>
);
const Chip = ({icon,label,c="#86EFAC",bg="rgba(134,239,172,.09)",br="rgba(134,239,172,.25)"})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:4,background:bg,border:`1px solid ${br}`,color:c,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{icon}{label}</span>
);
const BtnGlow = ({onClick,style,children})=>(
  <button onClick={onClick} style={{transition:"all .25s",cursor:"pointer",...style}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.filter="brightness(1.15)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.filter="none";}}>
    {children}
  </button>
);
const allWilayas = ALL_WILAYAS;

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]           = useState("ar");

  // ── Qatar2022Font injection ────────────────────────────────────────────
  useEffect(() => {
    const id = "qatar2022-font-style";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = FONT_STYLE;
      document.head.appendChild(el);
    }
  }, []);
  const [page, setPage]           = useState("home");
  const [selCar, setSelCar]       = useState(null);
  const [selAgency, setSelAgency] = useState(null);
  const [fType, setFType]         = useState("all");
  const [sort, setSort]           = useState("pop");
  const [wilaya, setWilaya]       = useState("");
  const [ddOpen, setDdOpen]       = useState(false);
  const [convs, setConvs]         = useState(INIT_CONVS);
  const [activeC, setActiveC]     = useState(null);
  const [msgIn, setMsgIn]         = useState("");
  const [mMenu, setMMenu]         = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews]     = useState(INIT_REVIEWS);
  const [authModal, setAuthModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode]   = useState(true);
  const [selBrand, setSelBrand]   = useState("الكل");
  const [userCars, setUserCars]   = useState([]);
  const [addCarModal, setAddCarModal] = useState(false);
  const [unreadMsgs, setUnreadMsgs]   = useState(2);
  // ── Real-time chat state ──
  const [chatTyping,setChatTyping]     = useState(false);  // agency is typing
  const [userTypingTimer,setUserTypingTimer] = useState(null);
  const [chatAttach,setChatAttach]     = useState(null);   // {type,name,url,size}
  const [chatAttachMenu,setChatAttachMenu] = useState(false);
  const [chatSearch,setChatSearch]     = useState("");
  const [chatSearchOpen,setChatSearchOpen] = useState(false);
  const [chatToasts,setChatToasts]     = useState([]);
  const chatFileRef  = useRef(null);
  const chatImgRef   = useRef(null);
  const [splash, setSplash]       = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [bookings, setBookings]   = useState(INIT_BOOKINGS);
  const [bookingData, setBookingData] = useState(null); // {car, agency, days, fromDate, toDate}

  useEffect(()=>{
    const t1 = setTimeout(()=>setSplashOut(true), 3400);
    const t2 = setTimeout(()=>setSplash(false), 4000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const t = TR[lang];
  const rtl = t.dir==="rtl";

  const goHome    = ()=>{setPage("home");window.scrollTo(0,0);};
  const openBooking= (car,agency,days,fromDate,toDate)=>{setBookingData({car,agency,days,fromDate,toDate});setPage("booking");window.scrollTo(0,0);};
  const openCar   = car=>{setSelCar(car);setPage("car");window.scrollTo(0,0);};
  const openAddAgency = ()=>{setPage("addAgency");window.scrollTo(0,0);};
  const openAgency= ag=>{setSelAgency(ag);setPage("agency");window.scrollTo(0,0);};
  const openMsgs  = (agId=null)=>{
    setPage("messages");
    if(agId){
      const ex=convs.find(c=>c.agencyId===agId);
      if(ex) setActiveC(ex.id);
      else{ const nw={id:Date.now(),agencyId:agId,msgs:[]};setConvs(p=>[...p,nw]);setActiveC(nw.id); }
    }
    window.scrollTo(0,0);
  };
  const sendMsg = ()=>{
    if(!msgIn.trim()&&!chatAttach) return;
    if(!activeC) return;
    const txt=msgIn; setMsgIn("");
    const attach=chatAttach; setChatAttach(null);
    setChatTyping(false);
    const newMsg={id:Date.now(),from:"user",text:txt,time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"}),status:"sent",...(attach?{attach}:{})};
    setConvs(p=>p.map(c=>c.id===activeC?{...c,msgs:[...c.msgs,newMsg]}:c));
    // delivery tick
    const mid=newMsg.id;
    setTimeout(()=>setConvs(p=>p.map(c=>c.id===activeC?{...c,msgs:c.msgs.map(m=>m.id===mid?{...m,status:"delivered"}:m)}:c)),700);
    // agency typing indicator then reply
    setTimeout(()=>setChatTyping(true),800);
    setTimeout(()=>{
      setChatTyping(false);
      const REPS={ar:["شكراً على تواصلك! سنرد في أقرب وقت ✓","تم استلام رسالتك، كيف يمكنني مساعدتك أكثر؟","بكل سرور! هل تريد تأكيد الحجز؟","سيارتنا متاحة في التاريخ المطلوب 🚗"],fr:["Merci pour votre message! Nous vous répondrons bientôt ✓","Bien reçu, comment puis-je vous aider davantage?","Bien sûr! Voulez-vous confirmer la réservation?","Notre véhicule est disponible à la date souhaitée 🚗"],en:["Thanks for your message! We'll reply soon ✓","Received, how can I help you further?","Of course! Would you like to confirm the booking?","Our car is available on the requested date 🚗"]};
      const reps=REPS[lang]||REPS.ar;
      setConvs(p=>p.map(c=>c.id===activeC?{...c,msgs:[...c.msgs,{id:Date.now()+1,from:"agency",text:reps[Math.floor(Math.random()*reps.length)],time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"}),status:"delivered"}]}:c));
    },2200);
  };

  const handleChatFileAttach=e=>{
    const file=e.target.files?.[0]; if(!file) return;
    const isImg=file.type.startsWith("image/");
    const reader=new FileReader();
    reader.onload=ev=>setChatAttach({type:isImg?"image":"doc",name:file.name,url:ev.target.result,size:(file.size/1024).toFixed(1)+"KB"});
    reader.readAsDataURL(file);
    setChatAttachMenu(false);
  };

  const handleChatMsgChange=e=>{
    setMsgIn(e.target.value);
    // not implemented typing-to-agency in DriveRENT
  };

  const ag = id=>AGENCIES.find(a=>a.id===id);
  const isMobile = useIsMobile(480);
  const isTablet = useIsTablet(768);
  const allCarsPool = [...CARS, ...userCars];
  const filteredCars = allCarsPool
    .filter(c=>fType==="all"||(fType==="4x4"?c.type==="4x4":c.type===fType))
    .filter(c=>!wilaya||c.wilaya===wilaya)
    .filter(c=>selBrand==="الكل"||!c.brand||c.brand===selBrand||(c.name&&c.name.toLowerCase().includes(selBrand.toLowerCase())))
    .sort((a,b)=>sort==="pop"?b.trips-a.trips:sort==="new"?b.year-a.year:a.price-b.price);
  const weddingCars = CARS.filter(c=>c.wedding);
  const wilayaLabel = wilaya?(lang==="fr"?ALL_WILAYAS.find(w=>w.c===wilaya)?.fr:ALL_WILAYAS.find(w=>w.c===wilaya)?.ar)||"":t.allWilayas;

  const NAV=[
    {k:"home",    icon:<Ic.Home/>,   l:t.nav.home,     fn:goHome},
    {k:"cars",    icon:<Ic.Car/>,    l:t.nav.cars,     fn:()=>{goHome();setFType("all");}},
    {k:"wedding", icon:<Ic.Rings/>,  l:t.nav.wedding,  fn:()=>{goHome();setFType("wedding");setTimeout(()=>document.getElementById("wed")?.scrollIntoView({behavior:"smooth"}),120);}},
    {k:"agencies",icon:<Ic.Map/>,    l:t.nav.agencies, fn:()=>{goHome();setTimeout(()=>document.getElementById("ags")?.scrollIntoView({behavior:"smooth"}),120);}},

  ];

  const dm=darkMode;
  const S={
    root:{fontFamily:rtl?"'Qatar2022Font','Cairo','Tajawal',sans-serif":"'Qatar2022Font','Outfit','DM Sans',sans-serif",direction:t.dir,background:dm?"#06060F":"#F0F2F8",color:dm?"#F1F5F9":"#1A1A2E",minHeight:"100vh",overflowX:"hidden",transition:"background .3s,color .3s"},
  };

  return(
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Outfit:wght@300;400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#06060F;} ::-webkit-scrollbar-thumb{background:#7C3AED;border-radius:3px;}
        .hov{transition:transform .3s,box-shadow .3s;} .hov:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(124,58,237,.22);}
        .navbtn:hover{color:#C084FC!important;}
        .ftab:hover{border-color:#8B5CF6!important;color:#8B5CF6!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes notifIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typing1{0%,100%{transform:translateY(0);opacity:.4}33%{transform:translateY(-5px);opacity:1}}
        @keyframes typing2{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
        @keyframes typing3{0%,100%{transform:translateY(0);opacity:.4}66%{transform:translateY(-5px);opacity:1}}
        .anim{animation:fadeUp .5s ease both;}
        .glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        input[type=date]{color-scheme:dark;} input:focus,textarea:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        select{background:#0D0D1E!important;color:#F1F5F9!important;-webkit-appearance:none;appearance:none;} select option{background:#0D0D1E!important;color:#F1F5F9!important;} select:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        .dd{max-height:260px;overflow-y:auto;} .dd::-webkit-scrollbar{width:3px;} .dd::-webkit-scrollbar-thumb{background:#7C3AED;}
        .bu{background:linear-gradient(135deg,#7C3AED,#6366F1);border-radius:18px 4px 18px 18px;}
        .ba{background:rgba(255,255,255,.07);border-radius:4px 18px 18px 18px;}
        .iz{transition:transform .4s;} .iz:hover{transform:scale(1.06);}
        /* ── MOBILE FIRST RESPONSIVE SYSTEM ───────────────────── */
        /* Base = Mobile (<=480px) */
        .dko{display:none!important;}
        .mob-show{display:flex!important;}
        .mob-hide{display:none!important;}
        .dg{grid-template-columns:1fr!important;}
        .mob-grid{grid-template-columns:1fr!important;}
        .mob-col{flex-direction:column!important;}
        .mob-full{width:100%!important;max-width:100%!important;}
        .mob-p{padding:16px!important;}
        .mob-text-sm{font-size:12px!important;}
        .mob-text-xs{font-size:11px!important;}
        .mob-stack{flex-direction:column!important;align-items:stretch!important;}
        .mob-center{text-align:center!important;justify-content:center!important;}
        .mob-2col{grid-template-columns:1fr 1fr!important;}
        .mob-wrap{flex-wrap:wrap!important;}
        .mob-scroll-x{overflow-x:auto!important;-webkit-overflow-scrolling:touch;}
        .bottom-nav{display:flex!important;}
        .fab-msg{bottom:80px!important;}
        @media(max-width:640px){.hov:hover{transform:none!important;box-shadow:none!important;}}
        /* Tablet (481px – 768px) */
        @media(min-width:481px){
          .dko{display:flex!important;}
          .mob-show{display:none!important;}
          .mob-hide{display:flex!important;}
          .mob-col{flex-direction:row!important;}
          .mob-p{padding:20px!important;}
          .mob-text-sm{font-size:13px!important;}
          .mob-text-xs{font-size:12px!important;}
          .mob-stack{flex-direction:row!important;align-items:center!important;}
          .mob-center{text-align:right!important;}
          .mob-2col{grid-template-columns:1fr 1fr!important;}
          .bottom-nav{display:none!important;}
          .fab-msg{bottom:28px!important;}
        }
        /* Desktop (769px+) */
        @media(min-width:769px){
          .mob-full{width:auto!important;max-width:none!important;}
          .mob-grid{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))!important;}
          .dg{grid-template-columns:1fr 330px!important;}
          .mob-p{padding:28px!important;}
          .mob-text-sm{font-size:14px!important;}
          .mob-text-xs{font-size:13px!important;}
          .mob-hide{display:flex!important;}
        }
        /* Bottom Nav Bar (mobile only) */
        .bottom-nav{
          position:fixed;bottom:0;left:0;right:0;
          background:rgba(6,6,15,.97);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-top:1px solid rgba(124,58,237,.18);
          display:none;
          align-items:center;justify-content:space-around;
          padding:8px 0 max(8px,env(safe-area-inset-bottom));
          z-index:150;
        }
        .bnav-btn{
          display:flex;flex-direction:column;align-items:center;gap:3px;
          background:none;border:none;cursor:pointer;
          padding:4px 8px;border-radius:10px;
          color:rgba(255,255,255,.38);font-size:10px;font-weight:700;
          transition:color .2s;min-width:52px;
        }
        .bnav-btn.active{color:#C084FC;}
        .bnav-btn svg{width:22px;height:22px;}
        .has-bottom-nav{padding-bottom:72px!important;}
        @media(max-width:480px){button{min-height:40px;} input,select,textarea{font-size:16px!important;}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        #langDd.open{display:block!important;}
        .lang-btn:hover{background:rgba(124,58,237,.1)!important;}
        @keyframes splashIn{0%{opacity:0;transform:scale(.88) translateY(18px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes splashOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.06)}}
        @keyframes splashBar{0%{width:0%}100%{width:100%}}
        @keyframes splashRing{0%{transform:scale(.7);opacity:0}60%{opacity:1}100%{transform:scale(1.18);opacity:0}}
        @keyframes splashTagline{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── SPLASH SCREEN ── */}
      {splash&&(
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"#06060F",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:splashOut?"splashOut .6s ease forwards":"none",overflow:"hidden"}}>
          {/* Background glows */}
          <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%)",top:"30%",right:"15%",pointerEvents:"none"}}/>
          <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(236,72,153,.1) 0%,transparent 70%)",bottom:"20%",left:"10%",pointerEvents:"none"}}/>

          {/* Pulsing ring behind logo */}
          <div style={{position:"absolute",width:130,height:130,borderRadius:"50%",border:"2px solid rgba(124,58,237,.35)",animation:"splashRing 2s ease-in-out infinite"}}/>
          <div style={{position:"absolute",width:160,height:160,borderRadius:"50%",border:"1px solid rgba(124,58,237,.18)",animation:"splashRing 2s ease-in-out .4s infinite"}}/>

          {/* Main content */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20,animation:"splashIn .7s cubic-bezier(.34,1.56,.64,1) both"}}>

            {/* Logo icon */}
            <div style={{width:90,height:90,borderRadius:26,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 60px rgba(124,58,237,.55),0 20px 40px rgba(124,58,237,.3)",position:"relative"}}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
              </svg>
              <div style={{position:"absolute",inset:-1,borderRadius:27,border:"1.5px solid rgba(255,255,255,.2)"}}/>
            </div>

            {/* App name */}
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:38,fontWeight:900,color:"#fff",letterSpacing:"-1.5px",lineHeight:1,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
                درايف <span style={{background:"linear-gradient(135deg,#A855F7,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>RENT</span>
              </div>
            </div>

            {/* Tagline */}
            <div style={{textAlign:"center",animation:"splashTagline .6s ease .5s both"}}>
              <div style={{fontSize:14,color:"rgba(255,255,255,.55)",fontWeight:500,letterSpacing:".5px",marginBottom:16,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
                أجّر سيارتك المثالية في الجزائر
              </div>
            </div>

            {/* Progress bar */}
            <div style={{width:180,height:2,background:"rgba(255,255,255,.08)",borderRadius:99,overflow:"hidden",animation:"splashTagline .4s ease .6s both",opacity:0}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,#7C3AED,#A855F7,#6366F1)",borderRadius:99,animation:"splashBar 3.4s cubic-bezier(.4,0,.2,1) forwards"}}/>
            </div>
          </div>

          {/* Developer credit */}
          <div style={{position:"absolute",bottom:36,display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"splashTagline .6s ease .9s both",opacity:0}}>
            <div style={{width:28,height:1,background:"rgba(124,58,237,.4)"}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,.32)",fontWeight:400,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
              برمجة و تطوير غواط عبد الرحمان
            </span>
          </div>
        </div>
      )}
      <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(6,6,15,.9)",backdropFilter:"blur(22px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={goHome}>
          <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic.Car/>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1}}>درايف RENT</div>
          </div>
        </div>

        <div className="dko" style={{display:"flex",gap:4}}>
          {NAV.map(n=>(
            <button key={n.k} className="navbtn" onClick={n.fn} style={{display:"flex",alignItems:"center",gap:6,background:page===n.k?"rgba(124,58,237,.14)":"transparent",border:`1px solid ${page===n.k?"rgba(124,58,237,.4)":"transparent"}`,color:page===n.k?"#C084FC":"rgba(255,255,255,.5)",padding:"7px 13px",borderRadius:9,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>
              <span style={{opacity:.8}}>{n.icon}</span>{n.l}
            </button>
          ))}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:7}}>
          {/* Language selector */}
          <div style={{position:"relative"}} className="dko">
            <button onClick={()=>document.getElementById("langDd").classList.toggle("open")} style={{display:"flex",alignItems:"center",gap:6,background:dm?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",border:`1px solid ${dm?"rgba(255,255,255,.1)":"rgba(0,0,0,.1)"}`,color:dm?"rgba(255,255,255,.7)":"#444",padding:"7px 12px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
              <Ic.Globe/>{lang==="ar"?"ع · عربي":lang==="fr"?"FR · Français":"EN · English"}<Ic.ChevD/>
            </button>
            <div id="langDd" style={{position:"absolute",top:"110%",right:0,background:dm?"#12122A":"#fff",border:`1px solid ${dm?"rgba(124,58,237,.3)":"rgba(0,0,0,.12)"}`,borderRadius:12,minWidth:150,zIndex:300,overflow:"hidden",display:"none"}} onClick={()=>document.getElementById("langDd").classList.remove("open")}>
              {[{k:"ar",flag:"🇩🇿",label:"عربي"},{k:"fr",flag:"🇫🇷",label:"Français"},{k:"en",flag:"🇬🇧",label:"English"}].map(({k,flag,label})=>(
                <button key={k} onClick={()=>setLang(k)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",background:lang===k?(dm?"rgba(124,58,237,.18)":"rgba(124,58,237,.1)"):"transparent",border:"none",color:lang===k?"#A855F7":dm?"rgba(255,255,255,.7)":"#333",padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:lang===k?700:500}}>
                  {flag} {label}{lang===k&&<span style={{marginRight:"auto",color:"#7C3AED"}}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {currentUser?(
            <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.28)",borderRadius:9,padding:"5px 12px 5px 6px",cursor:"pointer"}} onClick={()=>setProfileOpen(true)} className="dko">
              <img src={currentUser.avatar} alt="" style={{width:28,height:28,borderRadius:"50%",border:"2px solid #7C3AED",objectFit:"cover"}}/>
              <span style={{fontSize:12,fontWeight:700,color:"#C084FC"}}>{currentUser.name.split(" ")[0]}</span>
            </div>
          ):(
            <BtnGlow onClick={()=>setAuthModal(true)} style={{background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.4)",color:"#C084FC",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}} className="dko">
              {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
            </BtnGlow>
          )}
          <BtnGlow onClick={openAddAgency} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}} className="dko">{t.listCar}</BtnGlow>
          <button onClick={()=>setMMenu(p=>!p)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:8,borderRadius:8,cursor:"pointer"}} className="mob-show"><Ic.Menu/></button>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-DOWN MENU ── */}
      {mMenu&&(
        <div style={{position:"fixed",inset:0,zIndex:190,background:"rgba(6,6,15,.97)",display:"flex",flexDirection:"column",padding:"76px 5% 40px",gap:10}}>
          <button onClick={()=>setMMenu(false)} style={{position:"absolute",top:18,right:"5%",background:"transparent",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:22}}>✕</button>
          {NAV.map(n=>(
            <button key={n.k} onClick={()=>{n.fn();setMMenu(false);}} style={{display:"flex",alignItems:"center",gap:14,background:page===n.k?"rgba(124,58,237,.18)":"rgba(255,255,255,.04)",border:`1px solid ${page===n.k?"rgba(124,58,237,.4)":"rgba(255,255,255,.08)"}`,color:page===n.k?"#C084FC":"#fff",padding:"16px 20px",borderRadius:14,fontSize:16,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
              <span style={{fontSize:20}}>{n.icon}</span>{n.l}
            </button>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",marginTop:8,paddingTop:16,display:"flex",flexDirection:"column",gap:10}}>
            {currentUser?(
              <button onClick={()=>{setProfileOpen(true);setMMenu(false);}} style={{display:"flex",alignItems:"center",gap:12,background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"#C084FC",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                <img src={currentUser.avatar} alt="" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover"}}/>
                {currentUser.name||currentUser.username}
              </button>
            ):(
              <button onClick={()=>{setAuthModal(true);setMMenu(false);}} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
              </button>
            )}
            <button onClick={()=>{openAddAgency();setMMenu(false);}} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer"}}>
              {t.listCar}
            </button>
          </div>
        </div>
      )}

      {page==="home"    && <HomePage    t={t} rtl={rtl} lang={lang} dm={dm} REGIONS={REGIONS} filteredCars={filteredCars} weddingCars={weddingCars} AGENCIES={AGENCIES} fType={fType} setFType={setFType} sort={sort} setSort={setSort} selBrand={selBrand} setSelBrand={setSelBrand} wilaya={wilaya} setWilaya={setWilaya} wilayaLabel={wilayaLabel} ddOpen={ddOpen} setDdOpen={setDdOpen} openCar={openCar} openAgency={openAgency} openMsgs={openMsgs} ag={ag} allWilayas={allWilayas} openAddAgency={openAddAgency} openAddCar={()=>setAddCarModal(true)} currentUser={currentUser} openAuth={()=>setAuthModal(true)}/>}
      {page==="car"     && selCar       && <CarPage     t={t} rtl={rtl} lang={lang} car={selCar}    agency={ag(selCar.agencyId)}      goBack={()=>setPage("home")} openAgency={openAgency} openMsgs={openMsgs} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={()=>setAuthModal(true)} openBooking={openBooking}/>}
      {page==="booking" && bookingData  && <BookingPage t={t} rtl={rtl} lang={lang} car={bookingData.car} agency={bookingData.agency} days={bookingData.days} fromDate={bookingData.fromDate} toDate={bookingData.toDate} currentUser={currentUser} goBack={()=>setPage("car")} bookings={bookings} setBookings={setBookings} onSuccess={()=>{setPage("home");window.scrollTo(0,0);}}/>}
      {page==="agency"  && selAgency    && <AgencyPage  t={t} rtl={rtl} lang={lang} agency={selAgency} cars={CARS.filter(c=>c.agencyId===selAgency.id)} goBack={()=>setPage("home")} openCar={openCar} openMsgs={openMsgs} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={()=>setAuthModal(true)}/>}
      {page==="addAgency"&& <AddAgencyPage t={t} rtl={rtl} lang={lang} goBack={()=>setPage("home")} REGIONS={REGIONS} allWilayas={allWilayas}/>}
      {page==="messages"&& <MsgsPage   t={t} rtl={rtl} lang={lang} convs={convs} activeC={activeC} setActiveC={setActiveC} msgIn={msgIn} setMsgIn={setMsgIn} sendMsg={sendMsg} ag={ag} goBack={()=>setPage("home")} chatTyping={chatTyping} chatAttach={chatAttach} setChatAttach={setChatAttach} chatAttachMenu={chatAttachMenu} setChatAttachMenu={setChatAttachMenu} chatSearch={chatSearch} setChatSearch={setChatSearch} chatSearchOpen={chatSearchOpen} setChatSearchOpen={setChatSearchOpen} handleChatFileAttach={handleChatFileAttach} handleChatMsgChange={handleChatMsgChange} chatFileRef={chatFileRef} chatImgRef={chatImgRef}/>}

      {authModal&&<AuthModal lang={lang} onClose={()=>setAuthModal(false)} onLogin={user=>{setCurrentUser(user);setAuthModal(false);}}/>}
      {addCarModal&&<AddCarModal lang={lang} darkMode={dm} agencies={AGENCIES} allWilayas={ALL_WILAYAS} onClose={()=>setAddCarModal(false)} onAdd={car=>{setUserCars(p=>[...p,{...car,id:Date.now(),rating:0,trips:0,reviews:0,tags:[],wedding:false}]);setAddCarModal(false);}}/>}
      {/* ── FLOATING MSG BUTTON (desktop/tablet only) ── */}
      {page!=="messages"&&currentUser&&(
        <button className="fab-msg" onClick={()=>openMsgs()} style={{position:"fixed",bottom:28,right:28,width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",cursor:"pointer",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(124,58,237,.55)",transition:"transform .2s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <Ic.Msg/>
          {unreadMsgs>0&&<span style={{position:"absolute",top:-3,right:-3,width:20,height:20,borderRadius:"50%",background:"#EF4444",border:"2px solid #06060F",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2s infinite"}}>{unreadMsgs}</span>}
        </button>
      )}

      {profileOpen&&currentUser&&<ProfileModal lang={lang} user={currentUser} onClose={()=>setProfileOpen(false)} onUpdate={u=>setCurrentUser(u)} onLogout={()=>{setCurrentUser(null);setProfileOpen(false);}} convs={convs} setConvs={setConvs} ag={ag} AGENCIES={AGENCIES}/>}

      {/* ── BOTTOM NAVIGATION BAR (mobile only) ── */}
      <nav className="bottom-nav">
        {[
          {k:"home",    icon:<Ic.Home/>,   l:t.nav.home,     fn:goHome},
          {k:"cars",    icon:<Ic.Car/>,    l:t.nav.cars,     fn:()=>{goHome();setFType("all");}},
          {k:"wedding", icon:<Ic.Rings/>,  l:t.nav.wedding,  fn:()=>{goHome();setFType("wedding");}},
          {k:"agencies",icon:<Ic.Map/>,    l:t.nav.agencies, fn:()=>{goHome();}},
          ...(currentUser?[{k:"profile", icon:<span style={{fontSize:20}}>👤</span>, l:lang==="ar"?"حسابي":lang==="fr"?"Profil":"Profile", fn:()=>setProfileOpen(true)}]
                        :[{k:"signin",  icon:<span style={{fontSize:20}}>🔑</span>, l:lang==="ar"?"دخول":lang==="fr"?"Connexion":"Login",     fn:()=>setAuthModal(true)}]),
        ].map(n=>(
          <button key={n.k} className={`bnav-btn${page===n.k?" active":""}`} onClick={n.fn}>
            {n.icon}
            <span>{n.l}</span>
            {n.k==="profile"&&unreadMsgs>0&&(
              <span style={{position:"absolute",top:4,background:"#EF4444",borderRadius:"50%",width:8,height:8,border:"1px solid #06060F"}}/>
            )}
          </button>
        ))}
      </nav>

      <footer style={{position:"relative",overflow:"hidden",padding:"22px 5%",background:"#03030A",borderTop:"1px solid rgba(124,58,237,.12)"}}>
        <div style={{position:"absolute",width:320,height:60,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(124,58,237,.12),transparent)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,position:"relative",zIndex:1}}>
          <div style={{height:1,width:48,background:"linear-gradient(to right,transparent,rgba(124,58,237,.4))"}}/>
          <span style={{fontSize:11,color:"rgba(255,255,255,.22)",fontWeight:400,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
            برمجة و تطوير غواط عبد الرحمان
          </span>
          <div style={{height:1,width:48,background:"linear-gradient(to left,transparent,rgba(124,58,237,.4))"}}/>
        </div>
      </footer>
    </div>
  );
}


// ────────────────────────────────────────────────────────────────────────────
// AUTH MODAL  — Login / Register with social options
// ────────────────────────────────────────────────────────────────────────────
function AuthModal({lang,onClose,onLogin}){
  const [mode,setMode]=useState("choose"); // choose | register | login
  const [regForm,setRegForm]=useState({username:"",password:"",phone:"",preview:null});
  const [loginForm,setLoginForm]=useState({username:"",password:""});
  const [showRegPass,setShowRegPass]=useState(false);
  const [showLoginPass,setShowLoginPass]=useState(false);
  const [err,setErr]=useState("");
  const [regSent,setRegSent]=useState(false); // shows "pending approval" screen
  const setR=k=>e=>setRegForm(f=>({...f,[k]:e.target.value}));
  const setL=k=>e=>setLoginForm(f=>({...f,[k]:e.target.value}));

  // Demo accounts always available
  const DEMO_USERS=[
    {id:"demo_1",username:"ahmed_dz",password:"123456",name:"أحمد بن علي",phone:"0555123456",avatar:"https://i.pravatar.cc/80?img=11",provider:"manual",joinDate:"2025-11-20T10:00:00.000Z",lastLogin:"2026-04-01T08:30:00.000Z"},
    {id:"demo_2",username:"karim_oran",password:"123456",name:"كريم بوعلام",phone:"0661987654",avatar:"https://i.pravatar.cc/80?img=33",provider:"manual",joinDate:"2026-04-25T14:00:00.000Z",lastLogin:"2026-05-10T09:15:00.000Z"},
  ];

  // ── Shared localStorage helpers ──────────────────────────────
  const getApprovedUsers=()=>{
    try{ return JSON.parse(localStorage.getItem("driverent_approved_users")||"[]"); }catch{ return []; }
  };
  const getPendingRequests=()=>{
    try{ return JSON.parse(localStorage.getItem("driverent_pending_requests")||"[]"); }catch{ return []; }
  };

  // Merged user list: demo + approved from admin
  const getAllUsers=()=>{
    const approved=getApprovedUsers();
    const merged=[...DEMO_USERS];
    approved.forEach(u=>{ if(!merged.find(d=>d.id===u.id)) merged.push(u); });
    return merged;
  };

  const [users]=useState(()=>getAllUsers());

  const L={
    ar:{
      title:"درايف RENT",sub:"منصة تأجير السيارات الجزائرية",
      regTab:"حساب جديد",loginTab:"تسجيل الدخول",
      usernameL:"اسم المستخدم",usernamePh:"مثال: ahmed_dz",
      passwordL:"كلمة السر",passwordPh:"••••••••",
      phoneL:"رقم الهاتف",phonePh:"0555 xx xx xx",
      photoL:"صورة شخصية",photoHint:"انقر لإضافة صورة",
      submit:"إنشاء الحساب",loginSubmit:"دخول",cancel:"إلغاء",
      switchToLogin:"لديك حساب؟ سجّل دخولك",switchToReg:"ليس لديك حساب؟ أنشئ واحداً",
      errUsername:"اسم المستخدم مطلوب (3 أحرف على الأقل)",
      errUsernameTaken:"اسم المستخدم مستخدم بالفعل",
      errPassword:"كلمة السر مطلوبة (6 أحرف على الأقل)",
      errPhone:"رقم الهاتف غير صحيح (يبدأ بـ 05, 06, 07)",
      errPhoneTaken:"رقم الهاتف مستخدم بالفعل",
      errNotFound:"اسم المستخدم أو كلمة السر غير صحيحة",
      errStillPending:"حسابك لا يزال قيد المراجعة من المشرف",
      pendingTitle:"طلبك قيد المراجعة ⏳",
      pendingMsg:"تم إرسال طلب إنشاء حسابك بنجاح. سيقوم المشرف بمراجعته وقبوله قريباً.",
      pendingHint:"بمجرد الموافقة يمكنك تسجيل الدخول بنفس بيانات التسجيل.",
      pendingClose:"حسناً، سأنتظر",
      show:"إظهار",hide:"إخفاء",
    },
    fr:{
      title:"DriveRENT",sub:"Plateforme de location en Algérie",
      regTab:"Nouveau compte",loginTab:"Se connecter",
      usernameL:"Nom d'utilisateur",usernamePh:"Ex: karim_oran",
      passwordL:"Mot de passe",passwordPh:"••••••••",
      phoneL:"Téléphone",phonePh:"0555 xx xx xx",
      photoL:"Photo de profil",photoHint:"Cliquez pour ajouter",
      submit:"Créer le compte",loginSubmit:"Se connecter",cancel:"Annuler",
      switchToLogin:"Déjà un compte? Connectez-vous",switchToReg:"Pas de compte? Créez-en un",
      errUsername:"Nom d'utilisateur requis (3 caractères min.)",
      errUsernameTaken:"Ce nom d'utilisateur est déjà pris",
      errPassword:"Mot de passe requis (6 caractères min.)",
      errPhone:"Numéro invalide (commence par 05, 06, 07)",
      errPhoneTaken:"Ce numéro de téléphone est déjà utilisé",
      errNotFound:"Nom d'utilisateur ou mot de passe incorrect",
      errStillPending:"Votre compte est en attente de validation par l'administrateur",
      pendingTitle:"Demande envoyée ⏳",
      pendingMsg:"Votre demande de création de compte a été soumise. L'administrateur l'examinera bientôt.",
      pendingHint:"Une fois approuvé, vous pourrez vous connecter avec vos identifiants.",
      pendingClose:"D'accord, j'attendrai",
      show:"Afficher",hide:"Masquer",
    },
    en:{
      title:"DriveRENT",sub:"Algeria's Car Rental Platform",
      regTab:"New Account",loginTab:"Sign In",
      usernameL:"Username",usernamePh:"e.g. ahmed_dz",
      passwordL:"Password",passwordPh:"••••••••",
      phoneL:"Phone Number",phonePh:"0555 xx xx xx",
      photoL:"Profile Photo",photoHint:"Click to add photo",
      submit:"Create Account",loginSubmit:"Sign In",cancel:"Cancel",
      switchToLogin:"Already have an account? Sign in",switchToReg:"No account? Create one",
      errUsername:"Username required (3 chars min.)",
      errUsernameTaken:"This username is already taken",
      errPassword:"Password required (6 chars min.)",
      errPhone:"Invalid phone (starts with 05, 06, 07)",
      errPhoneTaken:"This phone number is already registered",
      errNotFound:"Incorrect username or password",
      errStillPending:"Your account is still pending admin approval",
      pendingTitle:"Request Submitted ⏳",
      pendingMsg:"Your account request has been submitted successfully. The admin will review it shortly.",
      pendingHint:"Once approved, you can sign in with your registration details.",
      pendingClose:"Got it, I'll wait",
      show:"Show",hide:"Hide",
    }
  };
  const l=L[lang]||L.ar;
  const rtl=lang==="ar";
  const IS={width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14,marginTop:6,fontFamily:"inherit",direction:"ltr"};

  const handlePhoto=e=>{
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=ev=>setRegForm(f=>({...f,preview:ev.target.result}));
    r.readAsDataURL(file);
  };

  const submitRegister=()=>{
    setErr("");
    const allUsers=getAllUsers();
    const pending=getPendingRequests();
    const username=regForm.username.trim();
    const phone=regForm.phone.replace(/\s/g,"");

    if(!username||username.length<3){setErr(l.errUsername);return;}
    // Check duplicate username in approved users AND pending requests
    if(allUsers.find(u=>u.username===username)){setErr(l.errUsernameTaken);return;}
    if(pending.find(p=>p.username===username)){setErr(l.errUsernameTaken);return;}
    if(!regForm.password||regForm.password.length<6){setErr(l.errPassword);return;}
    if(!/^0[567][0-9]{8}$/.test(phone)){setErr(l.errPhone);return;}
    // Check duplicate phone in approved users AND pending requests
    if(allUsers.find(u=>u.phone===phone)){setErr(l.errPhoneTaken);return;}
    if(pending.find(p=>p.phone===phone)){setErr(l.errPhoneTaken);return;}

    const avatar=regForm.preview||`https://i.pravatar.cc/80?u=${username}`;
    const now=new Date().toISOString();
    const newReq={
      id:"req_"+Date.now(),
      username,
      password:regForm.password,
      name:username,
      phone,
      avatar,
      provider:"manual",
      status:"pending",
      requestDate:now,
    };
    const updatedPending=[...pending,newReq];
    try{ localStorage.setItem("driverent_pending_requests",JSON.stringify(updatedPending)); }catch{}
    setRegSent(true);
  };

  const submitLogin=()=>{
    setErr("");
    if(!loginForm.username.trim()){setErr(l.errUsername);return;}
    if(!loginForm.password){setErr(l.errPassword);return;}
    const allUsers=getAllUsers();
    const found=allUsers.find(u=>u.username===loginForm.username.trim()&&u.password===loginForm.password);
    if(!found){setErr(l.errNotFound);return;}
    // Check if user is in pending (shouldn't happen but safety)
    const pending=getPendingRequests();
    if(pending.find(p=>p.username===loginForm.username.trim()&&p.status==="pending")){
      setErr(l.errStillPending); return;
    }
    const updatedUser={...found,lastLogin:new Date().toISOString()};
    onLogin(updatedUser);
  };

  const Overlay=({children})=>(
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.82)",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      {children}
    </div>
  );

  const Card=({children,maxW=400})=>(
    <div style={{background:"#0D0D1E",border:"1px solid rgba(124,58,237,.35)",borderRadius:24,padding:"32px 28px",width:"100%",maxWidth:maxW,animation:"fadeUp .35s ease both",maxHeight:"92vh",overflowY:"auto",position:"relative",direction:rtl?"rtl":"ltr"}}>
      <button onClick={onClose} style={{position:"absolute",top:14,left:rtl?14:"auto",right:rtl?"auto":14,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.45)",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      {children}
    </div>
  );

  const Logo=()=>(
    <div style={{textAlign:"center",marginBottom:26}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:12}}>
        <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 28px rgba(124,58,237,.45)",position:"relative",flexShrink:0}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
          </svg>
          <div style={{position:"absolute",inset:-1,borderRadius:15,border:"1px solid rgba(255,255,255,.18)"}}/>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-1px",lineHeight:1,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
            درايف <span style={{background:"linear-gradient(135deg,#A855F7,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>RENT</span>
          </div>
        </div>
      </div>
      <p style={{fontSize:12,color:"rgba(255,255,255,.38)"}}>{l.sub}</p>
    </div>
  );

  /* ── Choose screen ── */
  if(mode==="choose") return(
    <Overlay>
      <Card>
        <Logo/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>{setMode("register");setErr("");}}
            style={{flex:1,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:700,transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            ✨ {l.regTab}
          </button>
          <button onClick={()=>{setMode("login");setErr("");}}
            style={{flex:1,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.16)",color:"rgba(255,255,255,.85)",padding:"13px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:700,transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".78"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            🔑 {l.loginTab}
          </button>
        </div>
      </Card>
    </Overlay>
  );

  /* ── REGISTER form ── */
  if(mode==="register") return(
    <Overlay>
      <Card maxW={420}>
        <Logo/>

        {/* ── PENDING APPROVAL SCREEN ── */}
        {regSent?(
          <div style={{textAlign:"center",padding:"10px 0"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,rgba(245,158,11,.2),rgba(251,191,36,.1))",border:"2px solid rgba(245,158,11,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px"}}>⏳</div>
            <h2 style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:12}}>{l.pendingTitle}</h2>
            <p style={{fontSize:13,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:10}}>{l.pendingMsg}</p>
            <div style={{background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,padding:"11px 14px",fontSize:12,color:"rgba(245,158,11,.85)",marginBottom:22,display:"flex",gap:8,alignItems:"flex-start",textAlign:"right"}}>
              <span style={{fontSize:16,flexShrink:0}}>💡</span><span>{l.pendingHint}</span>
            </div>
            <button onClick={onClose} style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:800}}>
              {l.pendingClose}
            </button>
          </div>
        ):(
        <div>
        {/* Photo upload */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:22}}>
          <div style={{position:"relative",cursor:"pointer"}} onClick={()=>document.getElementById("avInpReg").click()}>
            <div style={{width:80,height:80,borderRadius:"50%",border:`3px dashed ${regForm.preview?"#7C3AED":"rgba(124,58,237,.5)"}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(124,58,237,.08)",transition:"border-color .2s"}}>
              {regForm.preview
                ? <img src={regForm.preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                : <span style={{fontSize:28}}>📷</span>}
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,boxShadow:"0 2px 8px rgba(124,58,237,.5)"}}>+</div>
          </div>
          <input id="avInpReg" type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
        </div>
        <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.35)",marginTop:-14,marginBottom:20}}>{l.photoHint}</div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Username */}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.usernameL}</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:rtl?"auto":12,left:rtl?12:"auto",fontSize:16,pointerEvents:"none",marginTop:3}}>👤</span>
              <input value={regForm.username} onChange={setR("username")} placeholder={l.usernamePh}
                style={{...IS,paddingLeft:rtl?38:14,paddingRight:rtl?14:38}}/>
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.passwordL}</label>
            <div style={{position:"relative"}}>
              <input value={regForm.password} onChange={setR("password")} placeholder={l.passwordPh}
                type={showRegPass?"text":"password"}
                style={{...IS,paddingRight:rtl?14:70,paddingLeft:rtl?70:14}}/>
              <button onClick={()=>setShowRegPass(p=>!p)}
                style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:rtl?"auto":10,left:rtl?10:"auto",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",padding:"3px 8px",borderRadius:6,cursor:"pointer",fontSize:10,fontWeight:700,marginTop:3}}>
                {showRegPass?l.hide:l.show}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.phoneL}</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:rtl?"auto":12,left:rtl?12:"auto",fontSize:16,pointerEvents:"none",marginTop:3}}>📞</span>
              <input value={regForm.phone} onChange={setR("phone")} placeholder={l.phonePh}
                style={{...IS,paddingLeft:rtl?38:14,paddingRight:rtl?14:38}}/>
            </div>
          </div>

          {err&&<div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.28)",borderRadius:8,padding:"9px 13px",color:"#FCA5A5",fontSize:12,display:"flex",alignItems:"center",gap:7}}>⚠️ {err}</div>}

          <button onClick={submitRegister}
            style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:800,marginTop:4,transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            ✨ {l.submit}
          </button>

          <button onClick={()=>{setMode("login");setErr("");}}
            style={{background:"none",border:"none",color:"rgba(124,58,237,.8)",cursor:"pointer",fontSize:12,fontWeight:700,padding:"4px 0",textAlign:"center"}}>
            {l.switchToLogin} →
          </button>
        </div>
        </div>
        )}
      </Card>
    </Overlay>
  );

  /* ── LOGIN form ── */
  return(
    <Overlay>
      <Card maxW={380}>
        <Logo/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Username */}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.usernameL}</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:rtl?"auto":12,left:rtl?12:"auto",fontSize:16,pointerEvents:"none",marginTop:3}}>👤</span>
              <input value={loginForm.username} onChange={setL("username")} placeholder={l.usernamePh}
                style={{...IS,paddingLeft:rtl?38:14,paddingRight:rtl?14:38}}/>
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.passwordL}</label>
            <div style={{position:"relative"}}>
              <input value={loginForm.password} onChange={setL("password")} placeholder={l.passwordPh}
                type={showLoginPass?"text":"password"}
                onKeyDown={e=>e.key==="Enter"&&submitLogin()}
                style={{...IS,paddingRight:rtl?14:70,paddingLeft:rtl?70:14}}/>
              <button onClick={()=>setShowLoginPass(p=>!p)}
                style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:rtl?"auto":10,left:rtl?10:"auto",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",padding:"3px 8px",borderRadius:6,cursor:"pointer",fontSize:10,fontWeight:700,marginTop:3}}>
                {showLoginPass?l.hide:l.show}
              </button>
            </div>
          </div>

          {err&&<div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.28)",borderRadius:8,padding:"9px 13px",color:"#FCA5A5",fontSize:12,display:"flex",alignItems:"center",gap:7}}>⚠️ {err}</div>}

          <button onClick={submitLogin}
            style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:800,marginTop:4,transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            🔑 {l.loginSubmit}
          </button>

          <button onClick={()=>{setMode("register");setErr("");}}
            style={{background:"none",border:"none",color:"rgba(124,58,237,.8)",cursor:"pointer",fontSize:12,fontWeight:700,padding:"4px 0",textAlign:"center"}}>
            {l.switchToReg} →
          </button>

          {/* Demo accounts hint */}
          <div style={{background:"rgba(52,211,153,.06)",border:"1px solid rgba(52,211,153,.2)",borderRadius:10,padding:"12px 14px",marginTop:4}}>
            <div style={{fontSize:10,fontWeight:800,color:"#34D399",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>
              🧪 {lang==="ar"?"حسابات تجريبية":lang==="fr"?"Comptes de démo":"Demo Accounts"}
            </div>
            {[{u:"ahmed_dz",p:"123456",name:"أحمد بن علي"},{u:"karim_oran",p:"123456",name:"كريم بوعلام"}].map((d,i)=>(
              <div key={i} onClick={()=>{setLoginForm({username:d.u,password:d.p});setErr("");}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"8px 10px",cursor:"pointer",marginBottom:i===0?6:0,transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(124,58,237,.15)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{d.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",direction:"ltr",textAlign:"left"}}>@{d.u} · كلمة السر: {d.p}</div>
                </div>
                <span style={{fontSize:10,background:"rgba(124,58,237,.25)",color:"#C084FC",padding:"3px 8px",borderRadius:6,fontWeight:700,flexShrink:0}}>{lang==="ar"?"استخدام":lang==="fr"?"Utiliser":"Use"}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Overlay>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PROFILE MODAL
// ────────────────────────────────────────────────────────────────────────────
function ProfileModal({lang,user,onClose,onUpdate,onLogout,convs,setConvs,ag}){
  const [form,setForm]=useState({name:user.name,phone:user.phone,email:user.email||"",preview:null,avatar:user.avatar});
  const [saved,setSaved]=useState(false);
  const [tab,setTab]=useState("profile"); // profile | messages
  const [activeC,setActiveC]=useState(convs&&convs.length?convs[0].id:null);
  const [msgIn,setMsgIn]=useState("");
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const L={
    ar:{title:"ملفي الشخصي",nameL:"الاسم الكامل",phoneL:"رقم الهاتف",emailL:"البريد الإلكتروني",
        photo:"تغيير الصورة",save:"حفظ التعديلات",logout:"تسجيل الخروج",saved:"تم الحفظ ✓",
        member:"تاريخ التسجيل",lastLogin:"آخر دخول",newAccount:"حساب جديد",
        trips:"حجوزاتي",reviews:"تقييماتي",profileTab:"الملف الشخصي",messagesTab:"رسائلي",
        noConv:"لا توجد رسائل بعد",typeMsg:"اكتب رسالة...",send:"إرسال"},
    fr:{title:"Mon Profil",nameL:"Nom complet",phoneL:"Téléphone",emailL:"Email",
        photo:"Changer la photo",save:"Enregistrer",logout:"Se déconnecter",saved:"Enregistré ✓",
        member:"Inscrit le",lastLogin:"Dernière connexion",newAccount:"Nouveau compte",
        trips:"Mes réservations",reviews:"Mes avis",profileTab:"Profil",messagesTab:"Messages",
        noConv:"Aucun message",typeMsg:"Écrire un message...",send:"Envoyer"},
    en:{title:"My Profile",nameL:"Full Name",phoneL:"Phone",emailL:"Email",
        photo:"Change Photo",save:"Save Changes",logout:"Sign Out",saved:"Saved ✓",
        member:"Member since",lastLogin:"Last login",newAccount:"New Account",
        trips:"My Bookings",reviews:"My Reviews",profileTab:"Profile",messagesTab:"Messages",
        noConv:"No messages yet",typeMsg:"Type a message...",send:"Send"},
  };
  const l=L[lang]||L.ar;
  const rtl=lang==="ar";
  const IS={width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14,marginTop:6,fontFamily:"inherit"};

  const handlePhoto=e=>{
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=ev=>setForm(f=>({...f,preview:ev.target.result,avatar:ev.target.result}));
    r.readAsDataURL(file);
  };

  const save=()=>{
    onUpdate({...user,...form});
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  // Date helpers
  const joinDate=user.joinDate?new Date(user.joinDate):null;
  const lastLoginDate=user.lastLogin?new Date(user.lastLogin):null;
  const daysSince=joinDate?Math.floor((Date.now()-joinDate.getTime())/(1000*60*60*24)):999;
  const isNew=daysSince<30;

  const fmtDate=d=>{
    if(!d) return "—";
    return d.toLocaleDateString(lang==="ar"?"ar-DZ":lang==="fr"?"fr-FR":"en-GB",{year:"numeric",month:"long",day:"numeric"});
  };
  const fmtDateTime=d=>{
    if(!d) return "—";
    return d.toLocaleString(lang==="ar"?"ar-DZ":lang==="fr"?"fr-FR":"en-GB",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
  };

  // Message send
  const activeConv=convs?.find(c=>c.id===activeC);
  const sendMsg=()=>{
    if(!msgIn.trim()||!activeC||!setConvs) return;
    const txt=msgIn; setMsgIn("");
    setConvs(p=>p.map(c=>c.id===activeC?{...c,msgs:[...c.msgs,{from:"user",text:txt,time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"})}]}:c));
    setTimeout(()=>{
      const rep=["شكراً على تواصلك! سنرد في أقرب وقت ✓","تم استلام رسالتك، سيتصل بك فريقنا","بكل سرور، كيف يمكنني مساعدتك أكثر؟"];
      setConvs(p=>p.map(c=>c.id===activeC?{...c,msgs:[...c.msgs,{from:"agency",text:rep[Math.floor(Math.random()*rep.length)],time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"})}]}:c));
    },1100);
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.82)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,direction:rtl?"rtl":"ltr"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#0D0D1E",border:"1px solid rgba(124,58,237,.35)",borderRadius:24,width:"100%",maxWidth:520,animation:"fadeUp .35s ease both",maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column"}}>

        {/* Header Banner */}
        <div style={{position:"relative",background:"linear-gradient(135deg,rgba(124,58,237,.35),rgba(99,102,241,.25))",borderRadius:"24px 24px 0 0",padding:"24px 24px 58px",overflow:"hidden",flexShrink:0}}>
          <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"#5B21B6",opacity:.18,filter:"blur(50px)",top:-60,right:-20}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",zIndex:1}}>
            <h2 style={{fontSize:18,fontWeight:800,color:"#fff"}}>{l.title}</h2>
            <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",color:"rgba(255,255,255,.6)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          {/* Tabs inside banner */}
          <div style={{display:"flex",gap:8,position:"absolute",bottom:14,left:24,right:24,zIndex:1}}>
            {[{k:"profile",icon:"👤",label:l.profileTab},{k:"messages",icon:"💬",label:l.messagesTab}].map(tb=>(
              <button key={tb.k} onClick={()=>setTab(tb.k)} style={{flex:1,background:tab===tb.k?"rgba(124,58,237,.5)":"rgba(255,255,255,.07)",border:`1px solid ${tab===tb.k?"rgba(124,58,237,.7)":"rgba(255,255,255,.12)"}`,color:tab===tb.k?"#fff":"rgba(255,255,255,.5)",padding:"7px 12px",borderRadius:10,cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"all .2s"}}>
                {tb.icon} {tb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar overlapping banner */}
        <div style={{display:"flex",justifyContent:"center",marginTop:-44,marginBottom:4,position:"relative",zIndex:2,flexShrink:0}}>
          <div style={{position:"relative"}}>
            <img src={form.avatar} alt="" style={{width:88,height:88,borderRadius:"50%",border:"4px solid #0D0D1E",objectFit:"cover",display:"block",background:"#1a1a2e"}}/>
            {/* New account badge */}
            {isNew&&<div style={{position:"absolute",top:-6,right:-6,background:"linear-gradient(135deg,#F59E0B,#EF4444)",color:"#fff",fontSize:9,fontWeight:900,padding:"3px 7px",borderRadius:20,border:"2px solid #0D0D1E",whiteSpace:"nowrap",boxShadow:"0 2px 10px rgba(245,158,11,.5)"}}>{l.newAccount} ✨</div>}
            <button onClick={()=>document.getElementById("profAvInp").click()} style={{position:"absolute",bottom:2,right:2,width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"2px solid #0D0D1E",color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
            <input id="profAvInp" type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
          </div>
        </div>

        <div style={{textAlign:"center",marginBottom:16,padding:"0 16px",flexShrink:0}}>
          <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:4}}>{user.name}</div>
          {/* Dates */}
          <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(255,255,255,.38)"}}>
              <span>📅</span>
              <span>{l.member}: </span>
              <span style={{color:"rgba(255,255,255,.6)",fontWeight:600}}>{fmtDate(joinDate)}</span>
            </div>
            {lastLoginDate&&<div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(255,255,255,.38)"}}>
              <span>🕐</span>
              <span>{l.lastLogin}: </span>
              <span style={{color:"rgba(255,255,255,.55)",fontWeight:500}}>{fmtDateTime(lastLoginDate)}</span>
            </div>}
            {isNew&&<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.3)",color:"#F59E0B",padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,marginTop:3}}>
              ✨ {l.newAccount} — {lang==="ar"?`${daysSince} يوم على التسجيل`:lang==="fr"?`${daysSince} jours depuis l'inscription`:`${daysSince} days since joining`}
            </div>}
          </div>
        </div>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 20px",marginBottom:16,flexShrink:0}}>
          {[{emoji:"🚗",l:l.trips,v:"0"},{emoji:"⭐",l:l.reviews,v:"0"}].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.emoji}</div>
              <div style={{fontSize:19,fontWeight:800,color:"#C084FC"}}>{s.v}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.38)"}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {tab==="profile"&&(
          <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:14}}>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.nameL}</label>
              <input value={form.name} onChange={set("name")} style={IS}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.phoneL}</label>
              <input value={form.phone} onChange={set("phone")} style={{...IS,direction:"ltr"}}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px"}}>{l.emailL}</label>
              <input value={form.email} onChange={set("email")} type="email" style={{...IS,direction:"ltr"}}/>
            </div>

            <button onClick={save} style={{background:saved?"linear-gradient(135deg,#059669,#34D399)":"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:700,transition:"background .4s"}}>
              {saved?l.saved:l.save}
            </button>
            <button onClick={onLogout} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.25)",color:"#FCA5A5",padding:"11px",borderRadius:11,cursor:"pointer",fontSize:13,fontWeight:700}}>
              {l.logout}
            </button>
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab==="messages"&&(
          <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,overflow:"hidden"}}>
            {!convs||convs.length===0?(
              <div style={{padding:"40px 20px",textAlign:"center",color:"rgba(255,255,255,.35)",fontSize:14}}>{l.noConv}</div>
            ):(
              <div style={{display:"flex",height:360,overflow:"hidden"}}>
                {/* Conversations list */}
                <div style={{width:140,borderRight:"1px solid rgba(255,255,255,.07)",overflowY:"auto",flexShrink:0}}>
                  {convs.map(c=>{
                    const agency=ag&&ag(c.agencyId);
                    const last=c.msgs[c.msgs.length-1];
                    return(
                      <div key={c.id} onClick={()=>setActiveC(c.id)}
                        style={{padding:"10px 12px",cursor:"pointer",background:activeC===c.id?"rgba(124,58,237,.18)":"transparent",borderBottom:"1px solid rgba(255,255,255,.05)",transition:"background .15s"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                          {agency?<AgencyLogo agency={agency} size={28}/>:<div style={{width:28,height:28,borderRadius:8,background:"rgba(124,58,237,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🏢</div>}
                          <div style={{fontSize:11,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{agency?(lang==="ar"?agency.ar:agency.fr):"#"+c.agencyId}</div>
                        </div>
                        {last&&<div style={{fontSize:10,color:"rgba(255,255,255,.35)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{last.text}</div>}
                      </div>
                    );
                  })}
                </div>
                {/* Chat area */}
                <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                  {activeConv?(
                    <>
                      {/* Agency header */}
                      {(()=>{const agency=ag&&ag(activeConv.agencyId);return agency&&(
                        <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:8,flexShrink:0,background:"rgba(124,58,237,.06)"}}>
                          <AgencyLogo agency={agency} size={30}/>
                          <div>
                            <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{lang==="ar"?agency.ar:agency.fr}</div>
                            <div style={{fontSize:10,color:"#34D399",fontWeight:600}}>● {lang==="ar"?"متصل":lang==="fr"?"En ligne":"Online"}</div>
                          </div>
                        </div>
                      );})()}
                      {/* Messages */}
                      <div style={{flex:1,overflowY:"auto",padding:"12px",display:"flex",flexDirection:"column",gap:8}}>
                        {activeConv.msgs.map((m,i)=>(
                          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="user"?"flex-end":"flex-start",gap:2}}>
                            <div className={m.from==="user"?"bu":"ba"} style={{maxWidth:"82%",padding:"8px 12px",fontSize:12,color:"#fff",lineHeight:1.5}}>{m.text}</div>
                            <span style={{fontSize:9,color:"rgba(255,255,255,.28)"}}>{m.time}</span>
                          </div>
                        ))}
                      </div>
                      {/* Input */}
                      <div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",gap:8,flexShrink:0}}>
                        <input value={msgIn} onChange={e=>setMsgIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder={l.typeMsg}
                          style={{flex:1,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#fff",padding:"9px 12px",fontSize:12,fontFamily:"inherit"}}/>
                        <button onClick={sendMsg} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",width:36,height:36,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ic.Send/>
                        </button>
                      </div>
                    </>
                  ):(
                    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.3)",fontSize:13}}>{l.noConv}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// REVIEW SECTION  (used in CarPage + AgencyPage)
// ────────────────────────────────────────────────────────────────────────────
function ReviewSection({lang,targetType,targetId,reviews,setReviews,currentUser,openAuth}){
  const myReviews=reviews.filter(r=>r.targetType===targetType&&r.targetId===targetId);
  const [stars,setStars]=useState(5);
  const [hover,setHover]=useState(0);
  const [comment,setComment]=useState("");
  const [sent,setSent]=useState(false);
  const avg=myReviews.length?+(myReviews.reduce((s,r)=>s+r.rating,0)/myReviews.length).toFixed(1):0;

  const L={ar:{title:"التقييمات والآراء",write:"اكتب تقييمك",ph:"شاركنا رأيك في هذه السيارة...",send:"إرسال التقييم",loginMsg:"سجّل دخولك لترك تقييم",loginBtn:"تسجيل الدخول",noReviews:"لا توجد تقييمات بعد. كن أول من يقيّم!",thankYou:"شكراً! تم إضافة تقييمك بنجاح 🎉",avg:"متوسط التقييم",total:"تقييم",yourRating:"تقييمك"},fr:{title:"Avis et évaluations",write:"Laisser un avis",ph:"Partagez votre expérience...",send:"Envoyer l'avis",loginMsg:"Connectez-vous pour laisser un avis",loginBtn:"Se connecter",noReviews:"Aucun avis encore. Soyez le premier!",thankYou:"Merci! Votre avis a été ajouté 🎉",avg:"Note moyenne",total:"avis",yourRating:"Votre note"},en:{title:"Reviews & Ratings",write:"Write a Review",ph:"Share your experience with this car...",send:"Submit Review",loginMsg:"Sign in to leave a review",loginBtn:"Sign In",noReviews:"No reviews yet. Be the first!",thankYou:"Thank you! Your review has been added 🎉",avg:"Average rating",total:"reviews",yourRating:"Your rating"}};
  const l=L[lang]||L.ar;

  const submit=()=>{
    if(!comment.trim()) return;
    const nw={id:Date.now(),targetType,targetId,userId:currentUser.id,name:currentUser.name,phone:currentUser.phone,avatar:currentUser.avatar,rating:stars,comment:comment.trim(),date:new Date().toISOString().slice(0,10)};
    setReviews(p=>[nw,...p]);
    setComment("");setSent(true);
    setTimeout(()=>setSent(false),3500);
  };

  return(
    <div style={{marginTop:36}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <h2 style={{fontSize:18,fontWeight:800,color:"#fff",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>⭐</span>{l.title}
          {myReviews.length>0&&<span style={{fontSize:12,background:"rgba(124,58,237,.18)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"2px 9px",borderRadius:20,fontWeight:600}}>{myReviews.length} {l.total}</span>}
        </h2>
        {avg>0&&(
          <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.22)",borderRadius:11,padding:"6px 14px"}}>
            <span style={{fontSize:22,fontWeight:900,color:"#F59E0B"}}>{avg}</span>
            <div>
              <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(avg)?"#F59E0B":"rgba(255,255,255,.2)",fontSize:13}}>★</span>)}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>{l.avg}</div>
            </div>
          </div>
        )}
      </div>

      {/* Write Review Box */}
      <div style={{background:"rgba(124,58,237,.06)",border:"1px solid rgba(124,58,237,.18)",borderRadius:16,padding:20,marginBottom:24}}>
        <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.65)",marginBottom:14}}>{l.write}</div>
        {!currentUser?(
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,.42)"}}>{l.loginMsg}</span>
            <button onClick={openAuth} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px 18px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:700}}>{l.loginBtn}</button>
          </div>
        ):sent?(
          <div style={{background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.24)",borderRadius:10,padding:"14px 18px",textAlign:"center",color:"#34D399",fontWeight:700,fontSize:14}}>{l.thankYou}</div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <img src={currentUser.avatar} alt="" style={{width:40,height:40,borderRadius:"50%",border:"2px solid #7C3AED",objectFit:"cover"}}/>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{currentUser.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{currentUser.phone}</div>
              </div>
            </div>
            <div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:7}}>{l.yourRating}</div>
              <div style={{display:"flex",gap:5}}>
                {[1,2,3,4,5].map(i=>(
                  <span key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>setStars(i)}
                    style={{fontSize:28,cursor:"pointer",color:(hover||stars)>=i?"#F59E0B":"rgba(255,255,255,.18)",transition:"color .15s,transform .15s",display:"inline-block",transform:(hover||stars)>=i?"scale(1.15)":"scale(1)"}}>★</span>
                ))}
              </div>
            </div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder={l.ph} rows={3}
              style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:13,resize:"vertical"}}/>
            <button onClick={submit} style={{alignSelf:"flex-start",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"9px 22px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:700}}>
              {l.send}
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {myReviews.length===0&&(
          <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,.28)",fontSize:13}}>{l.noReviews}</div>
        )}
        {myReviews.map(r=>(
          <div key={r.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"16px 18px",animation:"fadeUp .4s ease both"}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:10}}>
              <img src={r.avatar} alt="" style={{width:42,height:42,borderRadius:"50%",border:"2px solid rgba(124,58,237,.4)",objectFit:"cover",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{r.name}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.3)",display:"flex",alignItems:"center",gap:8}}>
                  <span>{r.phone}</span><span>·</span><span>{r.date}</span>
                </div>
              </div>
              <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=r.rating?"#F59E0B":"rgba(255,255,255,.18)",fontSize:14}}>★</span>)}</div>
            </div>
            <p style={{fontSize:13,color:"rgba(255,255,255,.72)",lineHeight:1.75,margin:0}}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ────────────────────────────────────────────────────────────────────────────
function HomePage({t,rtl,lang,dm,REGIONS,filteredCars,weddingCars,AGENCIES,fType,setFType,sort,setSort,selBrand,setSelBrand,wilaya,setWilaya,wilayaLabel,ddOpen,setDdOpen,openCar,openAgency,openMsgs,ag,allWilayas,openAddAgency,openAddCar,currentUser,openAuth}){
  const tl = {instant:{ar:"فوري",fr:"Instant",en:"Instant"},freeCancel:{ar:"إلغاء مجاني",fr:"Annulable",en:"Free cancel"},verified:{ar:"موثقة",fr:"Vérifiée",en:"Verified"}};
  const tc = {instant:{c:"#86EFAC",bg:"rgba(134,239,172,.09)",br:"rgba(134,239,172,.25)"},freeCancel:{c:"#93C5FD",bg:"rgba(147,197,253,.09)",br:"rgba(147,197,253,.25)"},verified:{c:"#FDE68A",bg:"rgba(253,230,138,.09)",br:"rgba(253,230,138,.25)"}};

  return(<>
    {/* ── FEATURED AGENCIES MARQUEE — أول شيء يراه الزائر ── */}
    <div style={{background:"linear-gradient(180deg,#03030A,#06060F)",borderBottom:"1px solid rgba(124,58,237,.18)",position:"relative",overflow:"hidden",padding:"18px 0 22px"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 100% at 50% 50%,rgba(124,58,237,.1),transparent)",pointerEvents:"none"}}/>

      {/* Header badge */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:18,position:"relative",zIndex:1,padding:"0 5%"}}>
        <div style={{height:1,flex:1,background:"linear-gradient(to right,transparent,rgba(124,58,237,.5))"}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,rgba(124,58,237,.22),rgba(99,102,241,.18))",border:"1px solid rgba(124,58,237,.45)",borderRadius:40,padding:"8px 22px",boxShadow:"0 0 24px rgba(124,58,237,.2)"}}>
          <span style={{fontSize:18}}>🏆</span>
          <span style={{fontSize:12,fontWeight:900,color:"#C084FC",textTransform:"uppercase",letterSpacing:"2px"}}>{lang==="ar"?"الوكالات المميزة · مايو 2026":lang==="fr"?"Agences vedettes · Mai 2026":"Featured Agencies · May 2026"}</span>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#34D399",boxShadow:"0 0 8px #34D399",flexShrink:0,animation:"pulse 2s infinite"}}/>
        </div>
        <div style={{height:1,flex:1,background:"linear-gradient(to left,transparent,rgba(124,58,237,.5))"}}/>
      </div>

      {/* Marquee track */}
      <div style={{overflow:"hidden",position:"relative",zIndex:1,padding:"4px 0"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:90,background:"linear-gradient(to right,#03030A,transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:0,top:0,bottom:0,width:90,background:"linear-gradient(to left,#03030A,transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{display:"flex",gap:16,animation:"marquee 32s linear infinite",willChange:"transform"}}>
          {[...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES,...AGENCIES].map((a,i)=>(
            <div key={i} onClick={()=>openAgency(a)}
              style={{display:"inline-flex",alignItems:"center",gap:14,background:"linear-gradient(135deg,rgba(255,255,255,.05),rgba(124,58,237,.08))",border:"1px solid rgba(124,58,237,.3)",borderRadius:60,padding:"14px 26px 14px 14px",cursor:"pointer",flexShrink:0,transition:"transform .3s,background .3s,box-shadow .3s",boxShadow:"0 2px 16px rgba(0,0,0,.25)"}}
              onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(124,58,237,.28),rgba(79,70,229,.22))";e.currentTarget.style.transform="translateY(-5px) scale(1.03)";e.currentTarget.style.boxShadow="0 12px 36px rgba(124,58,237,.45)";e.currentTarget.style.borderColor="rgba(124,58,237,.7)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(255,255,255,.05),rgba(124,58,237,.08))";e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,.25)";e.currentTarget.style.borderColor="rgba(124,58,237,.3)";}}>
              <div style={{position:"relative",flexShrink:0}}>
                <AgencyLogo agency={a} size={52} style={{border:"2.5px solid rgba(124,58,237,.6)",boxShadow:"0 0 16px rgba(124,58,237,.4)"}}/>
                {a.verified&&<span style={{position:"absolute",bottom:-2,right:-2,width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34D399)",border:"2px solid #06060F",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"#fff"}}>✓</span>}
              </div>
              <div>
                <div style={{fontSize:15,fontWeight:900,color:"#fff",whiteSpace:"nowrap",marginBottom:4,letterSpacing:"-.2px"}}>{lang==="ar"?a.ar:a.fr}</div>
                <div style={{display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap"}}>
                  <span style={{fontSize:12,color:"#F59E0B",fontWeight:700}}>⭐ {a.rating}</span>
                  <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.25)"}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>{lang==="ar"?a.city.ar:a.city.fr}</span>
                  <span style={{fontSize:10,background:"linear-gradient(135deg,rgba(124,58,237,.35),rgba(79,70,229,.35))",color:"#C084FC",padding:"2px 9px",borderRadius:12,fontWeight:800,border:"1px solid rgba(124,58,237,.4)"}}>{lang==="ar"?"★ مميزة":lang==="fr"?"★ Vedette":"★ Featured"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* HERO */}
    <section style={{position:"relative",overflow:"hidden",padding:"68px 5% 84px",background:"linear-gradient(180deg,#06060F 0%,#0E0620 100%)"}}>
      <div className="glow" style={{width:520,height:520,background:"#5B21B6",opacity:.13,top:-130,left:"22%"}}/>
      <div className="glow" style={{width:260,height:260,background:"#1D4ED8",opacity:.1,top:200,right:"6%"}}/>
      <div className="glow" style={{width:160,height:160,background:"#9D174D",opacity:.08,bottom:0,left:"4%"}}/>

      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"5px 15px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:20}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#A855F7",animation:"pulse 2s infinite",display:"inline-block"}}/>
          {lang==="ar"?"أكثر من +1000 سيارة في 58 ولاية تنتظرك":lang==="fr"?"+1000 voitures dans 58 wilayas vous attendent":"1000+ cars in 58 wilayas await you"}
        </div>
        <h1 style={{fontSize:"clamp(38px,7vw,72px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-2px",marginBottom:16}}>
          <span style={{display:"block",color:"#fff"}}>{lang==="ar"?"أجّر سيارتك":lang==="fr"?"Louez votre":"Rent Your"}</span>
          <span style={{display:"block",background:"linear-gradient(135deg,#A855F7,#6366F1,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {lang==="ar"?"المثالية في الجزائر":lang==="fr"?"voiture idéale en Algérie":"Dream Car in Algeria"}
          </span>
        </h1>
        <p style={{color:"rgba(255,255,255,.42)",fontSize:12,marginBottom:34,lineHeight:1.75}}>{t.tagline}</p>

        {/* Search */}
        <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:22,padding:18,backdropFilter:"blur(20px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,alignItems:"end",marginBottom:12}}>
            {/* Wilaya */}
            <div style={{position:"relative",minWidth:0}}>
              <label style={{display:"flex",alignItems:"center",gap:5,color:"rgba(255,255,255,.33)",fontSize:10,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:"1.2px"}}>
                <Ic.Pin/>{t.wilaya}
              </label>
              <button onClick={()=>setDdOpen(p=>!p)} style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:10,color:"#fff",padding:"9px 13px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",minWidth:0,overflow:"hidden"}}>
                <span style={{color:wilaya?"#fff":"rgba(255,255,255,.38)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,textAlign:"start"}}>{wilayaLabel}</span>
                <span style={{flexShrink:0,marginRight:4,marginLeft:4}}><Ic.ChevD/></span>
              </button>
              {ddOpen&&(
                <div className="dd" style={{position:"absolute",top:"105%",left:0,right:0,zIndex:99,background:"#0E0E20",border:"1px solid rgba(255,255,255,.11)",borderRadius:12,overflow:"hidden",maxHeight:280,overflowY:"auto"}}>
                  <div onClick={()=>{setWilaya("");setDdOpen(false);}} style={{padding:"9px 13px",cursor:"pointer",fontSize:13,borderBottom:"1px solid rgba(255,255,255,.08)",background:!wilaya?"rgba(124,58,237,.15)":"transparent",color:!wilaya?"#C084FC":"rgba(255,255,255,.55)",fontWeight:600}}>
                    🇩🇿 {t.allWilayas}
                  </div>
                  {ALL_WILAYAS.map(w=>(
                    <div key={w.c} onClick={()=>{setWilaya(w.c);setDdOpen(false);}} style={{padding:"8px 14px",cursor:"pointer",fontSize:13,color:wilaya===w.c?"#C084FC":"rgba(255,255,255,.72)",background:wilaya===w.c?"rgba(124,58,237,.14)":"transparent",borderRight:wilaya===w.c?"3px solid #7C3AED":"3px solid transparent",display:"flex",alignItems:"center",gap:9,transition:"background .15s"}}>
                      <span style={{fontSize:10,color:"rgba(255,255,255,.3)",fontFamily:"monospace",minWidth:20,flexShrink:0}}>{w.c}</span>
                      <span>{lang==="fr"?w.fr:w.ar}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <BtnGlow style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"11px 22px",borderRadius:11,fontSize:13,fontWeight:700,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:7}}>
              <Ic.Search/>{t.searchBtn}
            </BtnGlow>
          </div>
        </div>

      </div>

    </section>



    {/* CARS */}
    <section style={{padding:"52px 5%",background:"#07071200"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <h2 style={{fontSize:24,fontWeight:800,color:"#fff"}}>{lang==="ar"?"السيارات المتاحة":lang==="fr"?"Voitures disponibles":"Available Cars"}</h2>
        <div style={{display:"flex",gap:7}}>
          {[{k:"pop",l:t.sort.pop},{k:"new",l:t.sort.new},{k:"cheap",l:t.sort.cheap}].map(s=>(
            <button key={s.k} onClick={()=>setSort(s.k)} style={{background:sort===s.k?"rgba(124,58,237,.2)":"transparent",border:`1px solid ${sort===s.k?"rgba(124,58,237,.5)":"rgba(255,255,255,.09)"}`,color:sort===s.k?"#C084FC":"rgba(255,255,255,.42)",padding:"5px 11px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600}}>{s.l}</button>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {[{k:"all",i:"🚘",ar:"الكل",fr:"Tous",en:"All"},{k:"sedan",i:"🚗",ar:"سيدان",fr:"Berline",en:"Sedan"},{k:"suv",i:"🚙",ar:"SUV",fr:"SUV",en:"SUV"},{k:"4x4",i:"🏔️",ar:"4×4",fr:"4×4",en:"4×4"},{k:"luxury",i:"💎",ar:"فاخرة",fr:"Luxe",en:"Luxury"},{k:"electric",i:"⚡",ar:"كهربائية",fr:"Électrique",en:"Electric"},{k:"van",i:"🚐",ar:"فان",fr:"Van",en:"Van"},{k:"wedding",i:"💍",ar:"زفاف",fr:"Mariage",en:"Wedding"}].map(f=>(
          <button key={f.k} onClick={()=>setFType(f.k)} style={{display:"flex",alignItems:"center",gap:7,background:fType===f.k?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.04)",border:`2px solid ${fType===f.k?"transparent":"rgba(255,255,255,.08)"}`,color:fType===f.k?"#fff":"rgba(255,255,255,.5)",padding:"8px 16px",borderRadius:24,fontSize:12,fontWeight:700,whiteSpace:"nowrap",cursor:"pointer",transition:"all .22s",flexShrink:0,boxShadow:fType===f.k?"0 4px 18px rgba(124,58,237,.4)":"none"}}>
            <span style={{fontSize:15}}>{f.i}</span>
            {lang==="ar"?f.ar:lang==="fr"?f.fr:f.en}
          </button>
        ))}
      </div>



      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
        {filteredCars.map((car,idx)=>(
          <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${car.wedding?"rgba(236,72,153,.15)":"rgba(255,255,255,.07)"}`,borderRadius:18,overflow:"hidden",cursor:"pointer",animation:`fadeUp .45s ease ${idx*.07}s both`}}>
            <div style={{position:"relative",height:188,overflow:"hidden"}}>
              <img className="iz" src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:10,left:10,background:car.wedding?"rgba(236,72,153,.2)":"rgba(124,58,237,.2)",border:`1px solid ${car.wedding?"rgba(236,72,153,.4)":"rgba(124,58,237,.4)"}`,color:car.wedding?"#F9A8D4":"#C084FC",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                {car.wedding?<Ic.Rings/>:<Ic.Car/>}{car.badge}
              </div>
              <div style={{position:"absolute",bottom:8,left:10,right:10,display:"flex",gap:4,flexWrap:"wrap"}}>
                {car.tags.map(tag=><Chip key={tag} icon={tag==="instant"?<Ic.Bolt/>:tag==="freeCancel"?<Ic.Refresh/>:<Ic.Check/>} label={tl[tag]?.[lang==="fr"?"fr":lang==="en"?"en":"ar"]} c={tc[tag]?.c} bg={tc[tag]?.bg} br={tc[tag]?.br}/>)}
              </div>
            </div>
            <div style={{padding:"13px 15px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{car.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginTop:2,display:"flex",alignItems:"center",gap:5}}>
                    <Ic.Cal/>{car.year} <Ic.Users/>{car.seats}
                  </div>
                </div>
                <div style={{textAlign:"end"}}>
                  <span style={{fontSize:19,fontWeight:800,color:car.wedding?"#F9A8D4":"#C084FC"}}>{car.price.toLocaleString()}</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,.32)"}}> {t.cur}{t.perDay}</span>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                {ag(car.agencyId)&&<div style={{display:"flex",alignItems:"center",gap:6}}><AgencyLogo agency={ag(car.agencyId)} size={24}/><span style={{fontSize:11,color:"rgba(255,255,255,.42)"}}>{lang==="ar"?ag(car.agencyId).ar:ag(car.agencyId).fr}</span></div>}
                <Stars r={car.rating}/>
              </div>
            </div>
          </div>
        ))}
        {filteredCars.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"52px 0",color:"rgba(255,255,255,.28)"}}>
          <div style={{fontSize:40,marginBottom:10}}>🔍</div>
          <div style={{fontSize:14}}>{lang==="ar"?"لا توجد سيارات":"Aucun résultat"}</div>
        </div>}
      </div>
    </section>

    {/* WEDDING SECTION */}
    <section id="wed" style={{padding:"56px 5%",background:"linear-gradient(180deg,#09091A,#0E041A)"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(236,72,153,.1)",border:"1px solid rgba(236,72,153,.25)",color:"#F9A8D4",padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:700,marginBottom:12}}>
          <Ic.Rings/>{t.filters.wedding}
        </div>
        <h2 style={{fontSize:26,fontWeight:800,color:"#fff",marginBottom:9}}>{t.wTitle}</h2>
        <p style={{color:"rgba(255,255,255,.38)",fontSize:14,maxWidth:480,margin:"0 auto"}}>{t.wDesc}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
        {weddingCars.map((car,idx)=>(
          <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(236,72,153,.14)",borderRadius:18,overflow:"hidden",cursor:"pointer",animation:`fadeUp .5s ease ${idx*.1}s both`}}>
            <div style={{position:"relative",height:198,overflow:"hidden"}}>
              <img className="iz" src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:10,left:10,background:"rgba(236,72,153,.18)",border:"1px solid rgba(236,72,153,.4)",color:"#F9A8D4",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                <Ic.Rings/>{t.wBadge}
              </div>
              <div style={{position:"absolute",bottom:10,left:12,right:12}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:3}}>{car.name}</div>
                <Stars r={car.rating}/>
              </div>
            </div>
            <div style={{padding:"12px 15px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.32)",marginBottom:2}}>{t.wPerDay}</div>
                <span style={{fontSize:19,fontWeight:800,color:"#F9A8D4"}}>{car.price.toLocaleString()}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,.32)"}}> {t.cur}</span>
              </div>
              <BtnGlow style={{background:"linear-gradient(135deg,#9D174D,#EC4899)",border:"none",color:"#fff",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}}>{t.book}</BtnGlow>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section style={{padding:"64px 5%",background:"#06060F"}}>
      <h2 style={{textAlign:"center",fontSize:26,fontWeight:800,marginBottom:44,color:"#fff"}}>{t.howTitle}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:20,maxWidth:800,margin:"0 auto"}}>
        {[{n:"01",i:<Ic.Map/>,t:t.s1t,d:t.s1d,col:"#7C3AED"},{n:"02",i:<Ic.Cal/>,t:t.s2t,d:t.s2d,col:"#2563EB"},{n:"03",i:<Ic.Car/>,t:t.s3t,d:t.s3d,col:"#059669"}].map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:12,right:14,fontSize:40,fontWeight:900,color:"rgba(255,255,255,.04)",lineHeight:1}}>{s.n}</div>
            <div style={{width:46,height:46,borderRadius:12,background:`${s.col}22`,border:`1px solid ${s.col}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:s.col}}>{s.i}</div>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:7}}>{s.t}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.38)",lineHeight:1.7}}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* AGENCIES */}
    <section id="ags" style={{padding:"52px 5%",background:"#09091A"}}>
      <h2 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:24}}>{t.agTitle}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16}}>
        {AGENCIES.map((a,i)=>(
          <div key={a.id} className="hov" style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:18,animation:`fadeUp .5s ease ${i*.07}s both`}}>
            <div style={{display:"flex",gap:13,alignItems:"center",marginBottom:14}}>
              <AgencyLogo agency={a} size={52} style={{border:"2px solid rgba(124,58,237,.35)"}}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>{lang==="ar"?a.ar:a.fr}</span>
                  {a.verified&&<span style={{color:"#34D399",display:"flex"}}><Ic.Shield/></span>}
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.38)",display:"flex",alignItems:"center",gap:3}}><Ic.Pin/>{lang==="ar"?a.city.ar:a.city.fr}</div>
                <Stars r={a.rating}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:13}}>
              {[{i:<Ic.Car/>,v:CARS.filter(c=>c.agencyId===a.id).length,l:lang==="ar"?"سيارة":"voitures"},{i:<Ic.Users/>,v:a.trips,l:lang==="ar"?"رحلة":"trips"},{i:<Ic.Shield/>,v:a.exp,l:lang==="ar"?"سنة":"ans"}].map((s,j)=>(
                <div key={j} style={{background:"rgba(255,255,255,.04)",borderRadius:9,padding:"9px 6px",textAlign:"center"}}>
                  <div style={{color:"#C084FC",display:"flex",justifyContent:"center",marginBottom:3}}>{s.i}</div>
                  <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{s.v}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.32)"}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:7}}>
              <BtnGlow onClick={()=>openAgency(a)} style={{flex:1,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px",borderRadius:8,fontSize:12,fontWeight:700}}>{t.viewAgency}</BtnGlow>
              <button onClick={()=>openMsgs(a.id)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                <Ic.Msg/>{lang==="ar"?"راسل":lang==="fr"?"Message":"Msg"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>


    {/* CTA */}
    <section style={{margin:"0 5% 52px",borderRadius:20,background:"linear-gradient(135deg,rgba(124,58,237,.16),rgba(99,102,241,.16))",border:"1px solid rgba(124,58,237,.28)",padding:"48px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div className="glow" style={{width:220,height:220,background:"#5B21B6",opacity:.16,top:-60,left:"42%"}}/>
      <h2 style={{fontSize:26,fontWeight:800,color:"#fff",marginBottom:9}}>{t.ctaT}</h2>
      <p style={{color:"rgba(255,255,255,.45)",fontSize:14,marginBottom:24}}>{t.ctaD}</p>
      <BtnGlow onClick={openAddAgency} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 30px",borderRadius:11,fontSize:15,fontWeight:700}}>{t.listCar} →</BtnGlow>
    </section>
  </>);
}

// ────────────────────────────────────────────────────────────────────────────
// CAR DETAIL PAGE
// ────────────────────────────────────────────────────────────────────────────
function CarPage({t,rtl,lang,car,agency,goBack,openAgency,openMsgs,reviews,setReviews,currentUser,openAuth,openBooking}){
  const [days,setDays]=useState(3);
  const today=new Date().toISOString().split("T")[0];
  const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r.toISOString().split("T")[0];};
  const [fromDate,setFromDate]=useState(today);
  const [toDate,setToDate]=useState(addDays(today,3));
  const calcDays=(f,t)=>{const d=Math.ceil((new Date(t)-new Date(f))/(864e5));return d>0?d:1;};
  const daysCount=calcDays(fromDate,toDate);
  const total=car.price*daysCount, fee=Math.round(total*.08);
  const tl={instant:{ar:"حجز فوري",fr:"Réservation instantanée",en:"Instant"},freeCancel:{ar:"إلغاء مجاني",fr:"Annulation gratuite",en:"Free cancel"},verified:{ar:"وكالة موثقة",fr:"Agence vérifiée",en:"Verified agency"}};

  const handleFromDate=v=>{
    setFromDate(v);
    if(new Date(v)>=new Date(toDate)) setToDate(addDays(v,1));
  };

  return(
    <div style={{maxWidth:980,margin:"0 auto",padding:"28px 5% 56px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:24,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>

      <div className="dg" style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
        <div>
          <div style={{borderRadius:18,overflow:"hidden",marginBottom:14}}>
            <img src={car.img} alt={car.name} style={{width:"100%",height:340,objectFit:"cover"}}/>
          </div>
          <div style={{display:"flex",gap:9,marginBottom:22}}>
            {[car.img,car.img,car.img].map((im,i)=>(
              <img key={i} src={im} alt="" style={{width:84,height:60,objectFit:"cover",borderRadius:9,border:i===0?"2px solid #7C3AED":"2px solid rgba(255,255,255,.07)",opacity:i===0?1:.5,cursor:"pointer"}}/>
            ))}
          </div>

          <h1 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:7}}>{car.name}</h1>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <Stars r={car.rating}/>
            <span style={{color:"rgba(255,255,255,.33)",fontSize:12}}>{car.reviews} {t.reviews}</span>
            <span style={{color:"rgba(255,255,255,.33)",fontSize:12}}>· {car.trips} {t.trips}</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:22}}>
            {[{i:<Ic.Cal/>,l:t.year,v:car.year},{i:<Ic.Users/>,l:t.seats,v:car.seats},{i:<Ic.Car/>,l:t.type,v:car.badge}].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:14,textAlign:"center"}}>
                <div style={{color:"#7C3AED",display:"flex",justifyContent:"center",marginBottom:6}}>{s.i}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.33)",marginBottom:2}}>{s.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap"}}>
            {car.tags.map(tag=><Chip key={tag} icon={<Ic.Check/>} label={tl[tag]?.[lang==="fr"?"fr":lang==="en"?"en":"ar"]}/>)}
          </div>

          {agency&&(
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:18,display:"flex",alignItems:"center",gap:14}}>
              <AgencyLogo agency={agency} size={52} style={{border:"2px solid rgba(124,58,237,.4)"}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginBottom:2}}>{t.agency}</div>
                <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{lang==="ar"?agency.ar:agency.fr}</div>
                <Stars r={agency.rating}/>
                {agency.phone&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5,fontSize:12,color:"rgba(255,255,255,.5)"}}><Ic.Phone/><a href={`tel:${agency.phone}`} style={{color:"#34D399",fontWeight:600,textDecoration:"none"}}>{agency.phone}</a></div>}
              </div>
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>openAgency(agency)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",padding:"8px 12px",borderRadius:8,cursor:"pointer",fontSize:12}}>{t.ap?.about||"عنا"}</button>
                {currentUser?(
                  <button onClick={()=>openMsgs(agency.id)} style={{background:"rgba(124,58,237,.18)",border:"1px solid rgba(124,58,237,.38)",color:"#C084FC",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                    <Ic.Msg/>{t.msgAgency}
                  </button>
                ):(
                  <button onClick={openAuth} style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"rgba(192,132,252,.6)",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}} title={lang==="ar"?"سجّل الدخول لإرسال رسالة":lang==="fr"?"Connectez-vous pour envoyer un message":"Sign in to message"}>
                    🔒 {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
                  </button>
                )}
              </div>
            </div>
          )}
          <ReviewSection lang={lang} targetType="car" targetId={car.id} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={openAuth}/>
        </div>

        {/* BOOKING */}
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.09)",borderRadius:18,padding:22,height:"fit-content",position:"sticky",top:82}}>
          <div style={{marginBottom:16}}>
            <span style={{fontSize:28,fontWeight:900,color:car.wedding?"#F9A8D4":"#C084FC"}}>{car.price.toLocaleString()}</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,.33)"}}> {t.cur}{t.perDay}</span>
          </div>
          <div style={{marginBottom:7}}>
            <label style={{display:"block",fontSize:10,color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{t.from||"من"}</label>
            <input type="date" value={fromDate} min={today} onChange={e=>handleFromDate(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",borderRadius:8,color:"#fff",padding:"9px 12px",fontSize:13}}/>
          </div>
          <div style={{marginBottom:13}}>
            <label style={{display:"block",fontSize:10,color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{t.to||"إلى"}</label>
            <input type="date" value={toDate} min={addDays(fromDate,1)} onChange={e=>setToDate(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",borderRadius:8,color:"#fff",padding:"9px 12px",fontSize:13}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:9,padding:"7px 11px"}}>
            <button onClick={()=>{const nd=Math.max(1,daysCount-1);setToDate(addDays(fromDate,nd));}} style={{width:30,height:30,borderRadius:6,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
            <div style={{flex:1,textAlign:"center",fontWeight:700,color:"#fff",fontSize:14}}>{daysCount} {t.days}</div>
            <button onClick={()=>setToDate(addDays(fromDate,daysCount+1))} style={{width:30,height:30,borderRadius:6,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:12,marginBottom:16}}>
            {[{l:`${car.price.toLocaleString()} × ${daysCount} ${t.days}`,v:total},{l:t.fee,v:fee}].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
                <span style={{color:"rgba(255,255,255,.4)"}}>{r.l}</span>
                <span style={{color:"#fff",fontWeight:600}}>{r.v.toLocaleString()} {t.cur}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,.09)",paddingTop:10,marginTop:6}}>
              <span style={{fontWeight:700,color:"#fff",fontSize:14}}>{t.total}</span>
              <span style={{fontWeight:800,color:car.wedding?"#F9A8D4":"#C084FC",fontSize:16}}>{(total+fee).toLocaleString()} {t.cur}</span>
            </div>
          </div>
          {currentUser?(
              <BtnGlow onClick={()=>openBooking(car,agency,daysCount,fromDate,toDate)} style={{width:"100%",background:car.wedding?"linear-gradient(135deg,#9D174D,#EC4899)":"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:12,borderRadius:10,fontSize:15,fontWeight:700}}>{t.book} →</BtnGlow>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.25)",borderRadius:10,padding:"10px 13px",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>🔒</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,.55)"}}>{lang==="ar"?"يجب تسجيل الدخول للحجز":lang==="fr"?"Connectez-vous pour réserver":"Sign in to book"}</span>
                </div>
                <BtnGlow onClick={openAuth} style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:12,borderRadius:10,fontSize:15,fontWeight:700}}>
                  {lang==="ar"?"تسجيل الدخول للحجز":lang==="fr"?"Se connecter":"Sign In to Book"}
                </BtnGlow>
              </div>
            )}
          <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12}}>
            {[{i:<Ic.Shield/>,l:"Secure"},{i:<Ic.Phone/>,l:"Support"},{i:<Ic.Check/>,l:"Verified"}].map((x,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:"rgba(255,255,255,.22)",fontSize:9}}>{x.i}<span>{x.l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BOOKING PAGE — صفحة الحجز الكاملة
// ────────────────────────────────────────────────────────────────────────────
function BookingPage({t,rtl,lang,car,agency,days,fromDate,toDate,currentUser,goBack,bookings,setBookings,onSuccess}){
  const total=car.price*days, fee=Math.round(total*.08), grandTotal=total+fee;
  const [step,setStep]=useState(1); // 1=بيانات | 2=تأكيد | 3=نجاح
  const [form,setForm]=useState({
    fullName:currentUser?.name||"",
    phone:currentUser?.phone||"",
    email:currentUser?.email||"",
    wilaya:"",
    address:"",
    idNumber:"",
    idType:"national", // national | passport | permit
    pickupTime:"10:00",
    notes:"",
    payMethod:"cash", // cash | cib | dahabia
  });
  const [errors,setErrors]=useState({});
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const IS={width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:11,color:"#fff",padding:"12px 14px",fontSize:14,fontFamily:"inherit",transition:"border-color .2s"};
  const IS_ERR={...IS,borderColor:"rgba(239,68,68,.5)"};
  const LS={display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7};

  const L={
    ar:{
      title:"تأكيد الحجز",
      step1:"المعلومات الشخصية",step2:"مراجعة وتأكيد",step3:"تم الحجز",
      personal:"بياناتك الشخصية",personalSub:"يرجى ملء جميع البيانات المطلوبة للمتابعة",
      fullName:"الاسم الكامل",fullNamePh:"الاسم الثلاثي كما في الوثيقة الرسمية",
      phone:"رقم الهاتف",phonePh:"0555 xx xx xx",
      email:"البريد الإلكتروني",emailPh:"exemple@email.com",
      wilaya:"الولاية",wilayaPh:"اختر ولايتك",
      address:"العنوان التفصيلي",addressPh:"الحي، الشارع، رقم البناية...",
      idType:"نوع الوثيقة",idTypePh:"اختر نوع الوثيقة",
      idNational:"بطاقة وطنية",idPassport:"جواز سفر",idPermit:"رخصة السياقة",
      idNumber:"رقم الوثيقة",idNumberPh:"أدخل الرقم",
      pickupTime:"وقت التسليم",
      notes:"ملاحظات إضافية",notesPh:"أي معلومات إضافية للوكالة... (اختياري)",
      payMethod:"طريقة الدفع",
      cash:"دفع نقدي عند التسليم",
      cib:"بطاقة CIB",
      dahabia:"بطاقة Dahabia",
      next:"متابعة →",back:"رجوع",confirm:"تأكيد الحجز",
      required:"هذا الحقل مطلوب",
      // summary
      summaryTitle:"ملخص الحجز",
      carLabel:"السيارة",agencyLabel:"الوكالة",datesLabel:"التواريخ",
      durationLabel:"المدة",priceLabel:"السعر / يوم",feeLabel:"رسوم الخدمة",totalLabel:"المجموع الكلي",
      pickupLabel:"وقت التسليم",payLabel:"طريقة الدفع",
      // success
      successTitle:"تم الحجز بنجاح! 🎉",
      successMsg:"شكراً لك! تم استلام طلب حجزك وسيتواصل معك فريق الوكالة قريباً لتأكيد التفاصيل.",
      successRef:"رقم الحجز",
      backHome:"العودة للرئيسية",
      callAgency:"اتصل بالوكالة",
      termsNote:"بتأكيد الحجز أنت توافق على شروط الاستخدام وسياسة الإلغاء الخاصة بالمنصة.",
    },
    fr:{
      title:"Confirmer la réservation",
      step1:"Informations",step2:"Récapitulatif",step3:"Confirmé",
      personal:"Vos informations",personalSub:"Veuillez remplir tous les champs requis",
      fullName:"Nom complet",fullNamePh:"Nom tel qu'il figure sur le document officiel",
      phone:"Téléphone",phonePh:"0555 xx xx xx",
      email:"Email",emailPh:"exemple@email.com",
      wilaya:"Wilaya",wilayaPh:"Choisir votre wilaya",
      address:"Adresse détaillée",addressPh:"Quartier, rue, numéro...",
      idType:"Type de document",idTypePh:"Choisir le type",
      idNational:"Carte nationale",idPassport:"Passeport",idPermit:"Permis de conduire",
      idNumber:"Numéro du document",idNumberPh:"Entrer le numéro",
      pickupTime:"Heure de prise en charge",
      notes:"Notes supplémentaires",notesPh:"Informations supplémentaires pour l'agence... (optionnel)",
      payMethod:"Mode de paiement",
      cash:"Espèces à la livraison",
      cib:"Carte CIB",
      dahabia:"Carte Dahabia",
      next:"Suivant →",back:"Retour",confirm:"Confirmer la réservation",
      required:"Ce champ est requis",
      summaryTitle:"Récapitulatif",
      carLabel:"Véhicule",agencyLabel:"Agence",datesLabel:"Dates",
      durationLabel:"Durée",priceLabel:"Prix / jour",feeLabel:"Frais de service",totalLabel:"Total",
      pickupLabel:"Heure prise en charge",payLabel:"Paiement",
      successTitle:"Réservation confirmée! 🎉",
      successMsg:"Merci! Votre réservation a été reçue. L'agence vous contactera bientôt pour confirmer les détails.",
      successRef:"Référence",
      backHome:"Retour à l'accueil",
      callAgency:"Appeler l'agence",
      termsNote:"En confirmant, vous acceptez les conditions d'utilisation et la politique d'annulation.",
    },
    en:{
      title:"Confirm Booking",
      step1:"Personal Info",step2:"Review",step3:"Confirmed",
      personal:"Your Information",personalSub:"Please fill in all required fields to continue",
      fullName:"Full Name",fullNamePh:"Name as it appears on official document",
      phone:"Phone Number",phonePh:"0555 xx xx xx",
      email:"Email Address",emailPh:"example@email.com",
      wilaya:"Wilaya",wilayaPh:"Select your wilaya",
      address:"Detailed Address",addressPh:"District, street, building number...",
      idType:"Document Type",idTypePh:"Select type",
      idNational:"National ID",idPassport:"Passport",idPermit:"Driver's License",
      idNumber:"Document Number",idNumberPh:"Enter number",
      pickupTime:"Pickup Time",
      notes:"Additional Notes",notesPh:"Any extra info for the agency... (optional)",
      payMethod:"Payment Method",
      cash:"Cash on delivery",
      cib:"CIB Card",
      dahabia:"Dahabia Card",
      next:"Continue →",back:"Back",confirm:"Confirm Booking",
      required:"This field is required",
      summaryTitle:"Booking Summary",
      carLabel:"Vehicle",agencyLabel:"Agency",datesLabel:"Dates",
      durationLabel:"Duration",priceLabel:"Price / day",feeLabel:"Service fee",totalLabel:"Total",
      pickupLabel:"Pickup time",payLabel:"Payment",
      successTitle:"Booking Confirmed! 🎉",
      successMsg:"Thank you! Your booking request has been received. The agency will contact you soon to confirm details.",
      successRef:"Booking Ref",
      backHome:"Back to Home",
      callAgency:"Call Agency",
      termsNote:"By confirming, you agree to the terms of use and cancellation policy.",
    },
  };
  const l=L[lang]||L.ar;

  const validate=()=>{
    const e={};
    if(!form.fullName.trim()) e.fullName=l.required;
    if(!form.phone.trim())    e.phone=l.required;
    if(!form.wilaya)          e.wilaya=l.required;
    if(!form.address.trim())  e.address=l.required;
    if(!form.idNumber.trim()) e.idNumber=l.required;
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleNext=()=>{ if(validate()) setStep(2); };

  const bookingRef="DRV-"+Math.random().toString(36).slice(2,8).toUpperCase();

  const handleConfirm=()=>{
    const newBooking={
      id:Date.now(),
      ref:bookingRef,
      carId:car.id,carName:car.name,carImg:car.img,
      agencyId:agency?.id,
      userId:currentUser?.phone,
      clientName:form.fullName,
      clientPhone:form.phone,
      clientEmail:form.email,
      wilaya:form.wilaya,
      address:form.address,
      idType:form.idType,
      idNumber:form.idNumber,
      fromDate,toDate,days,
      pickupTime:form.pickupTime,
      notes:form.notes,
      payMethod:form.payMethod,
      price:car.price,
      fee,total:grandTotal,
      status:"pending",
      createdAt:new Date().toISOString(),
    };
    setBookings(prev=>[...prev,newBooking]);
    setStep(3);
  };

  const payIcons={cash:"💵",cib:"💳",dahabia:"🟡"};
  const idTypeLabel={national:l.idNational,passport:l.idPassport,permit:l.idPermit};

  return(
    <div style={{fontFamily:rtl?"'Qatar2022Font','Cairo','Tajawal',sans-serif":"'Qatar2022Font','Outfit',sans-serif",direction:rtl?"rtl":"ltr",minHeight:"100vh",background:"#06060F",color:"#F1F5F9"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes successPop{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}} input:focus,textarea:focus,select:focus{outline:none!important;border-color:rgba(139,92,246,.7)!important;} select{background:#0D0D1E!important;color:#F1F5F9!important;} select option{background:#0D0D1E!important;color:#F1F5F9!important;}`}</style>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 5% 60px"}}>
        {/* Back button */}
        {step<3&&(
          <button onClick={step===1?goBack:()=>setStep(1)} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:26,fontSize:13}}>
            <Ic.Back/>{l.back}
          </button>
        )}

        {/* ── PROGRESS BAR ── */}
        {step<3&&(
          <div style={{display:"flex",alignItems:"center",marginBottom:36,gap:0}}>
            {[{n:1,label:l.step1},{n:2,label:l.step2}].map((s,i)=>(
              <div key={s.n} style={{display:"flex",alignItems:"center",flex:i===0?1:"auto"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:step>=s.n?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:step===s.n?"2px solid #A855F7":step>s.n?"none":"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:800,transition:"all .3s",boxShadow:step>=s.n?"0 4px 18px rgba(124,58,237,.4)":"none"}}>
                    {step>s.n?<Ic.Check/>:s.n}
                  </div>
                  <span style={{fontSize:11,fontWeight:600,color:step>=s.n?"#C084FC":"rgba(255,255,255,.28)",whiteSpace:"nowrap"}}>{s.label}</span>
                </div>
                {i===0&&<div style={{flex:1,height:2,background:step>1?"linear-gradient(90deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.07)",margin:"0 12px",marginBottom:20,borderRadius:1,transition:"all .4s"}}/>}
              </div>
            ))}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16,alignItems:"start"}}>

          {/* ── STEP 1 — بيانات المستخدم ── */}
          {step===1&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{marginBottom:26}}>
                <h1 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:5}}>{l.personal}</h1>
                <p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{l.personalSub}</p>
              </div>

              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:20}}>

                {/* الاسم الكامل */}
                <div>
                  <label style={LS}>{l.fullName} <span style={{color:"#EF4444"}}>*</span></label>
                  <input value={form.fullName} onChange={set("fullName")} placeholder={l.fullNamePh} style={errors.fullName?IS_ERR:IS}/>
                  {errors.fullName&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.fullName}</div>}
                </div>

                {/* الهاتف + البريد */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div>
                    <label style={LS}>{l.phone} <span style={{color:"#EF4444"}}>*</span></label>
                    <input value={form.phone} onChange={set("phone")} placeholder={l.phonePh} style={errors.phone?IS_ERR:IS} type="tel"/>
                    {errors.phone&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.phone}</div>}
                  </div>
                  <div>
                    <label style={LS}>{l.email}</label>
                    <input value={form.email} onChange={set("email")} placeholder={l.emailPh} style={IS} type="email"/>
                  </div>
                </div>

                {/* الولاية + العنوان */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div>
                    <label style={LS}>{l.wilaya} <span style={{color:"#EF4444"}}>*</span></label>
                    <select value={form.wilaya} onChange={set("wilaya")} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer",appearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff66' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:rtl?"12px center":"calc(100% - 12px) center",paddingRight:rtl?"14px":"36px",paddingLeft:rtl?"36px":"14px",...(errors.wilaya?{borderColor:"rgba(239,68,68,.5)"}:{})}}>
                      <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{l.wilayaPh}</option>
                      {ALL_WILAYAS.map(w=><option key={w.c} value={w.c} style={{background:"#0D0D1E",color:"#F1F5F9"}}>{w.c} — {lang==="fr"?w.fr:w.ar}</option>)}
                    </select>
                    {errors.wilaya&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.wilaya}</div>}
                  </div>
                  <div>
                    <label style={LS}>{l.address} <span style={{color:"#EF4444"}}>*</span></label>
                    <input value={form.address} onChange={set("address")} placeholder={l.addressPh} style={errors.address?IS_ERR:IS}/>
                    {errors.address&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.address}</div>}
                  </div>
                </div>

                {/* وثيقة الهوية */}
                <div style={{background:"rgba(124,58,237,.06)",border:"1px solid rgba(124,58,237,.2)",borderRadius:14,padding:"18px 20px"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#C084FC",marginBottom:14,display:"flex",alignItems:"center",gap:7}}>
                    <Ic.Shield/> {l.idType}
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                    {[{k:"national",icon:"🪪",label:l.idNational},{k:"passport",icon:"📗",label:l.idPassport},{k:"permit",icon:"🚗",label:l.idPermit}].map(opt=>(
                      <button key={opt.k} onClick={()=>setForm(f=>({...f,idType:opt.k}))}
                        style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:10,border:`2px solid ${form.idType===opt.k?"#7C3AED":"rgba(255,255,255,.1)"}`,background:form.idType===opt.k?"rgba(124,58,237,.2)":"rgba(255,255,255,.03)",color:form.idType===opt.k?"#C084FC":"rgba(255,255,255,.45)",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s"}}>
                        <span>{opt.icon}</span>{opt.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label style={{...LS,color:"rgba(255,255,255,.5)"}}>{l.idNumber} <span style={{color:"#EF4444"}}>*</span></label>
                    <input value={form.idNumber} onChange={set("idNumber")} placeholder={l.idNumberPh} style={errors.idNumber?IS_ERR:IS}/>
                    {errors.idNumber&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.idNumber}</div>}
                  </div>
                </div>

                {/* وقت التسليم + طريقة الدفع */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <div>
                    <label style={LS}>{l.pickupTime}</label>
                    <input type="time" value={form.pickupTime} onChange={set("pickupTime")} style={IS}/>
                  </div>
                  <div>
                    <label style={LS}>{l.payMethod}</label>
                    <select value={form.payMethod} onChange={set("payMethod")} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                      <option value="cash">{payIcons.cash} {l.cash}</option>
                      <option value="cib">{payIcons.cib} {l.cib}</option>
                      <option value="dahabia">{payIcons.dahabia} {l.dahabia}</option>
                    </select>
                  </div>
                </div>

                {/* طريقة الدفع - بطاقات */}
                <div>
                  <label style={LS}>{l.payMethod}</label>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {[{k:"cash",icon:"💵",label:l.cash,sub:lang==="ar"?"ادفع عند استلام السيارة":lang==="fr"?"Payez à la livraison":"Pay on pickup"},{k:"cib",icon:"💳",label:l.cib,sub:"Carte CIB Algérie"},{k:"dahabia",icon:"🟡",label:l.dahabia,sub:"CCP / Poste Algérie"}].map(pm=>(
                      <button key={pm.k} onClick={()=>setForm(f=>({...f,payMethod:pm.k}))}
                        style={{padding:"14px 10px",borderRadius:12,border:`2px solid ${form.payMethod===pm.k?"#7C3AED":"rgba(255,255,255,.09)"}`,background:form.payMethod===pm.k?"rgba(124,58,237,.16)":"rgba(255,255,255,.02)",cursor:"pointer",textAlign:"center",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                        <span style={{fontSize:24}}>{pm.icon}</span>
                        <span style={{fontSize:11,fontWeight:800,color:form.payMethod===pm.k?"#C084FC":"rgba(255,255,255,.55)"}}>{pm.k==="cash"?lang==="ar"?"نقدي":lang==="fr"?"Espèces":"Cash":pm.k==="cib"?"CIB":"Dahabia"}</span>
                        <span style={{fontSize:9,color:"rgba(255,255,255,.28)",lineHeight:1.3}}>{pm.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ملاحظات */}
                <div>
                  <label style={LS}>{l.notes}</label>
                  <textarea value={form.notes} onChange={set("notes")} placeholder={l.notesPh} rows={3} style={{...IS,resize:"vertical",lineHeight:1.7}}/>
                </div>

                <BtnGlow onClick={handleNext} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"14px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:"0 6px 24px rgba(124,58,237,.4)"}}>
                  {l.next}
                </BtnGlow>
              </div>
            </div>
          )}

          {/* ── STEP 2 — مراجعة وتأكيد ── */}
          {step===2&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{marginBottom:26}}>
                <h1 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:5}}>{l.summaryTitle}</h1>
                <p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{lang==="ar"?"راجع بياناتك قبل تأكيد الحجز":lang==="fr"?"Vérifiez vos informations avant de confirmer":"Review your details before confirming"}</p>
              </div>

              {/* بيانات المستخدم المدخلة */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:24,marginBottom:18,display:"flex",flexDirection:"column",gap:0}}>
                <div style={{fontSize:13,fontWeight:800,color:"#C084FC",marginBottom:16,display:"flex",alignItems:"center",gap:7}}>
                  👤 {lang==="ar"?"بيانات الزبون":lang==="fr"?"Informations client":"Customer Details"}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[
                    {icon:"🧑",label:l.fullName,val:form.fullName},
                    {icon:"📞",label:l.phone,val:form.phone},
                    {icon:"✉️",label:l.email,val:form.email||"—"},
                    {icon:"📍",label:l.wilaya,val:ALL_WILAYAS.find(w=>w.c===form.wilaya)?.[lang==="fr"?"fr":"ar"]||"—"},
                    {icon:"🏠",label:l.address,val:form.address},
                    {icon:"🪪",label:l.idType,val:`${idTypeLabel[form.idType]} — ${form.idNumber}`},
                    {icon:"⏰",label:l.pickupTime,val:form.pickupTime},
                    {icon:payIcons[form.payMethod],label:l.payMethod,val:l[form.payMethod]},
                  ].map((r,i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,.04)",borderRadius:11,padding:"11px 13px"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:3,display:"flex",alignItems:"center",gap:5}}><span>{r.icon}</span>{r.label}</div>
                      <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{r.val}</div>
                    </div>
                  ))}
                </div>
                {form.notes&&(
                  <div style={{marginTop:12,background:"rgba(255,255,255,.04)",borderRadius:11,padding:"11px 13px"}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:3}}>📝 {l.notes}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.65}}>{form.notes}</div>
                  </div>
                )}
              </div>

              {/* Terms notice */}
              <div style={{background:"rgba(245,158,11,.05)",border:"1px solid rgba(245,158,11,.2)",borderRadius:12,padding:"12px 16px",marginBottom:18,fontSize:12,color:"rgba(255,255,255,.45)",display:"flex",gap:9,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>ℹ️</span><span>{l.termsNote}</span>
              </div>

              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setStep(1)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.55)",padding:"13px 24px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:600}}>
                  ← {l.back}
                </button>
                <BtnGlow onClick={handleConfirm} style={{flex:1,background:"linear-gradient(135deg,#059669,#34D399)",border:"none",color:"#fff",padding:"13px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:"0 6px 24px rgba(52,211,153,.3)"}}>
                  <Ic.Check/> {l.confirm}
                </BtnGlow>
              </div>
            </div>
          )}

          {/* ── STEP 3 — نجاح الحجز ── */}
          {step===3&&(
            <div style={{gridColumn:"1/-1",display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 20px",animation:"fadeUp .5s ease both"}}>

              {/* Success icon */}
              <div style={{width:110,height:110,borderRadius:"50%",background:"linear-gradient(135deg,rgba(52,211,153,.22),rgba(16,185,129,.14))",border:"2px solid rgba(52,211,153,.45)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,animation:"successPop .6s cubic-bezier(.34,1.56,.64,1) both",boxShadow:"0 0 60px rgba(52,211,153,.25)"}}>
                <span style={{fontSize:50}}>🎉</span>
              </div>

              <h1 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:10,textAlign:"center"}}>{l.successTitle}</h1>
              <p style={{fontSize:14,color:"rgba(255,255,255,.5)",marginBottom:28,textAlign:"center",maxWidth:500,lineHeight:1.8}}>{l.successMsg}</p>

              {/* Booking ref */}
              <div style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.35)",borderRadius:14,padding:"14px 32px",marginBottom:32,textAlign:"center"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"1px"}}>{l.successRef}</div>
                <div style={{fontSize:22,fontWeight:900,color:"#C084FC",letterSpacing:"3px"}}>{bookingRef}</div>
              </div>

              {/* Booking summary card */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:24,width:"100%",maxWidth:560,marginBottom:28}}>
                <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:20,paddingBottom:16,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
                  <img src={car.img} alt="" style={{width:88,height:62,objectFit:"cover",borderRadius:10,border:"2px solid rgba(124,58,237,.3)"}}/>
                  <div>
                    <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:2}}>{car.name}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{agency&&(lang==="ar"?agency.ar:agency.fr)}</div>
                  </div>
                </div>
                {[
                  {icon:"📅",label:l.datesLabel,val:`${fromDate} → ${toDate}`},
                  {icon:"⏱️",label:l.durationLabel,val:`${days} ${lang==="ar"?"يوم":lang==="fr"?"jours":"days"}`},
                  {icon:"⏰",label:l.pickupLabel,val:form.pickupTime},
                  {icon:payIcons[form.payMethod],label:l.payLabel,val:l[form.payMethod]},
                  {icon:"💰",label:l.totalLabel,val:`${grandTotal.toLocaleString()} دج`,bold:true,accent:true},
                ].map((r,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<4?"1px solid rgba(255,255,255,.05)":"none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"rgba(255,255,255,.45)"}}>
                      <span>{r.icon}</span>{r.label}
                    </div>
                    <span style={{fontSize:r.bold?16:13,fontWeight:r.bold?800:600,color:r.accent?"#34D399":"#fff"}}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
                <BtnGlow onClick={onSuccess} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 28px",borderRadius:11,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>
                  <Ic.Home/> {l.backHome}
                </BtnGlow>
                {agency?.phone&&(
                  <a href={`tel:${agency.phone}`} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.3)",color:"#34D399",padding:"12px 24px",borderRadius:11,fontSize:14,fontWeight:700,textDecoration:"none"}}>
                    <Ic.Phone/> {l.callAgency}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ── SIDEBAR — ملخص الحجز (steps 1 & 2) ── */}
          {step<3&&(
            <div style={{position:"sticky",top:82}}>
              {/* Car preview */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,overflow:"hidden",marginBottom:14}}>
                <div style={{position:"relative",height:160,overflow:"hidden"}}>
                  <img src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 52%)"}}/>
                  <div style={{position:"absolute",bottom:10,left:13,right:13}}>
                    <div style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:2}}>{car.name}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>{agency&&(lang==="ar"?agency.ar:agency.fr)}</div>
                  </div>
                  <div style={{position:"absolute",top:10,left:10,background:"rgba(124,58,237,.7)",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{car.badge}</div>
                </div>
                <div style={{padding:"14px 16px"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.45)",marginBottom:10,textTransform:"uppercase",letterSpacing:"1px"}}>{l.summaryTitle}</div>
                  {[
                    {icon:"📅",label:l.datesLabel,val:`${fromDate} → ${toDate}`},
                    {icon:"⏱️",label:l.durationLabel,val:`${days} ${lang==="ar"?"يوم":lang==="fr"?"jours":"days"}`},
                    {icon:"💵",label:l.priceLabel,val:`${car.price.toLocaleString()} دج`},
                    {icon:"🧾",label:l.feeLabel,val:`${fee.toLocaleString()} دج`},
                  ].map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.05)",fontSize:12}}>
                      <span style={{color:"rgba(255,255,255,.38)",display:"flex",alignItems:"center",gap:6}}><span>{r.icon}</span>{r.label}</span>
                      <span style={{color:"rgba(255,255,255,.7)",fontWeight:600}}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:11,marginTop:4}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{l.totalLabel}</span>
                    <span style={{fontSize:18,fontWeight:900,color:car.wedding?"#F9A8D4":"#C084FC"}}>{grandTotal.toLocaleString()} دج</span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div style={{background:"rgba(52,211,153,.05)",border:"1px solid rgba(52,211,153,.15)",borderRadius:14,padding:"14px 16px"}}>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[{i:"🔒",t:lang==="ar"?"حجز آمن ومشفر":lang==="fr"?"Réservation sécurisée":"Secure booking"},{i:"✅",t:lang==="ar"?"إلغاء مجاني خلال 24 ساعة":lang==="fr"?"Annulation gratuite 24h":"Free 24h cancellation"},{i:"📞",t:lang==="ar"?"دعم عملاء على مدار الساعة":lang==="fr"?"Support 24/7":"24/7 support"}].map((b,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:9,fontSize:12,color:"rgba(255,255,255,.5)"}}>
                      <span>{b.i}</span>{b.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AGENCY PAGE
// ────────────────────────────────────────────────────────────────────────────
function AgencyPage({t,rtl,lang,agency,cars,goBack,openCar,openMsgs,reviews,setReviews,currentUser,openAuth}){
  const [tab,setTab]=useState("cars");
  return(
    <div style={{maxWidth:980,margin:"0 auto",padding:"28px 5% 56px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:24,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>

      {/* Agency Hero */}
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.14),rgba(99,102,241,.1))",border:"1px solid rgba(124,58,237,.2)",borderRadius:20,padding:"28px 24px",marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div className="glow" style={{width:280,height:280,background:"#5B21B6",opacity:.12,top:-70,right:"4%"}}/>
        <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap",marginBottom:22}}>
          <AgencyLogo agency={agency} size={72} style={{border:"3px solid rgba(124,58,237,.45)"}}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",marginBottom:4}}>
              <h1 style={{fontSize:22,fontWeight:800,color:"#fff"}}>{lang==="ar"?agency.ar:agency.fr}</h1>
              {agency.verified&&<span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(52,211,153,.09)",border:"1px solid rgba(52,211,153,.28)",color:"#34D399",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}><Ic.Shield/>{t.verified}</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,color:"rgba(255,255,255,.4)",fontSize:12,marginBottom:7}}><Ic.Pin/>{lang==="ar"?agency.city.ar:agency.city.fr}</div>
            <Stars r={agency.rating}/>
          </div>
          <div style={{display:"flex",gap:9}}>
            <a href={`tel:${agency.phone}`} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",color:"#fff",padding:"9px 16px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,textDecoration:"none"}}>
              <Ic.Phone/>{agency.phone}
            </a>
            {currentUser?(
              <BtnGlow onClick={()=>openMsgs(agency.id)} style={{display:"flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"9px 16px",borderRadius:9,fontSize:12,fontWeight:700}}>
                <Ic.Msg/>{t.msgAgency}
              </BtnGlow>
            ):(
              <BtnGlow onClick={openAuth} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.3)",color:"rgba(192,132,252,.7)",padding:"9px 16px",borderRadius:9,fontSize:12,fontWeight:700}} title={lang==="ar"?"سجّل الدخول لإرسال رسالة":lang==="fr"?"Connectez-vous pour envoyer un message":"Sign in to send a message"}>
                🔒 {lang==="ar"?"راسل (تسجيل دخول)":lang==="fr"?"Message (connexion)":"Message (Sign In)"}
              </BtnGlow>
            )}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {[{i:<Ic.Star/>,v:agency.rating,l:t.ap.rating,c:"#F59E0B"},{i:<Ic.Car/>,v:cars.length,l:t.ap.totalCars,c:"#C084FC"},{i:<Ic.Users/>,v:agency.trips,l:t.trips,c:"#60A5FA"},{i:<Ic.Shield/>,v:agency.exp,l:t.ap.exp,c:"#34D399"}].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"12px 8px",textAlign:"center"}}>
              <div style={{color:s.c,display:"flex",justifyContent:"center",marginBottom:5}}>{s.i}</div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{s.v}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.33)",marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,borderBottom:"1px solid rgba(255,255,255,.07)",paddingBottom:0,marginBottom:22}}>
        {[{k:"cars",i:<Ic.Car/>,l:t.ap.cars},{k:"about",i:<Ic.Info/>,l:t.ap.about},{k:"contact",i:<Ic.Phone/>,l:t.ap.contact},{k:"reviews",i:"⭐",l:lang==="ar"?"التقييمات":lang==="fr"?"Avis":"Reviews"}].map(tb=>(
          <button key={tb.k} onClick={()=>setTab(tb.k)} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"none",color:tab===tb.k?"#C084FC":"rgba(255,255,255,.42)",padding:"10px 16px",cursor:"pointer",fontSize:13,fontWeight:600,borderBottom:tab===tb.k?"2px solid #7C3AED":"2px solid transparent",marginBottom:"-1px",transition:"all .2s"}}>
            {tb.i}{tb.l}
          </button>
        ))}
      </div>

      {tab==="cars"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:16}}>
          {cars.map((car,idx)=>(
            <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",cursor:"pointer",animation:`fadeUp .4s ease ${idx*.07}s both`}}>
              <div style={{position:"relative",height:162,overflow:"hidden"}}>
                <img className="iz" src={car.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 52%)"}}/>
                <div style={{position:"absolute",bottom:9,left:11,fontSize:13,fontWeight:700,color:"#fff"}}>{car.name}</div>
              </div>
              <div style={{padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Stars r={car.rating}/>
                <span style={{fontSize:15,fontWeight:800,color:"#C084FC"}}>{car.price.toLocaleString()} <span style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>{t.cur}{t.perDay}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==="about"&&(
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24}}>
          <p style={{color:"rgba(255,255,255,.58)",fontSize:14,lineHeight:1.85}}>{agency.about[lang==="fr"?"fr":lang==="en"?"en":"ar"]}</p>
        </div>
      )}
      {tab==="contact"&&(
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24,maxWidth:440}}>
          {[{i:<Ic.Phone/>,l:lang==="ar"?"الهاتف":"Téléphone",v:agency.phone},{i:<Ic.Pin/>,l:lang==="ar"?"الموقع":"Localisation",v:lang==="ar"?agency.city.ar:agency.city.fr}].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:i===0?"1px solid rgba(255,255,255,.06)":"none"}}>
              <div style={{width:38,height:38,borderRadius:9,background:"rgba(124,58,237,.14)",border:"1px solid rgba(124,58,237,.24)",display:"flex",alignItems:"center",justifyContent:"center",color:"#C084FC",flexShrink:0}}>{r.i}</div>
              <div><div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginBottom:2}}>{r.l}</div><div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{r.v}</div></div>
            </div>
          ))}
          <BtnGlow onClick={currentUser?()=>openMsgs(agency.id):openAuth} style={{display:"flex",alignItems:"center",gap:7,background:currentUser?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(124,58,237,.15)",border:currentUser?"none":"1px solid rgba(124,58,237,.3)",color:currentUser?"#fff":"rgba(192,132,252,.7)",padding:"11px 22px",borderRadius:10,fontSize:13,fontWeight:700,marginTop:18}}>
            <Ic.Msg/>{currentUser?t.msgAgency:(lang==="ar"?"راسل (تسجيل دخول)":lang==="fr"?"Message (connexion)":"Message (Sign In)")}
          </BtnGlow>
        </div>
      )}
      {tab==="reviews"&&(
        <ReviewSection lang={lang} targetType="agency" targetId={agency.id} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={openAuth}/>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ADD AGENCY PAGE  — تسجيل وكالة جديدة (بدون تبويب الدخول)
// ────────────────────────────────────────────────────────────────────────────
function AddAgencyPage({t,rtl,lang,goBack,REGIONS,allWilayas}){
  const p=t.addPage;
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const [form,setForm]=useState({name:"",owner:"",wilaya:"",phone:"",email:"",cars:"",address:"",desc:"",username:"",password:"",confirmPassword:""});
  const [showPass,setShowPass]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const inputStyle={width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14,fontFamily:"inherit"};
  const labelStyle={display:"block",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"};

  if(done) return(
    <div style={{maxWidth:560,margin:"60px auto",padding:"0 5%",textAlign:"center"}}>
      <div style={{background:"rgba(52,211,153,.07)",border:"1px solid rgba(52,211,153,.22)",borderRadius:24,padding:"52px 36px"}}>
        <div style={{fontSize:64,marginBottom:18}}>🎉</div>
        <h2 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:12}}>{p.successTitle}</h2>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:15,lineHeight:1.8,marginBottom:28}}>{p.successMsg}</p>
        <div style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",borderRadius:12,padding:"14px 18px",marginBottom:24,fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.7}}>
          {lang==="ar"?"بعد موافقة مشرف المنصة، ستتلقى بريداً إلكترونياً يحتوي على بيانات دخول لوحة التحكم الخاصة بوكالتك.":lang==="fr"?"Après approbation de l'administrateur, vous recevrez vos identifiants de connexion par email.":"After admin approval, you'll receive login credentials for your agency dashboard via email."}
        </div>
        <BtnGlow onClick={goBack} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 32px",borderRadius:11,fontSize:15,fontWeight:700}}>{t.back}</BtnGlow>
      </div>
    </div>
  );

  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 5% 60px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:28,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16,alignItems:"start"}}>

        {/* ── REGISTER FORM ── */}
        <div>
          <div style={{marginBottom:32}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"5px 15px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:14}}>
              🏢 {lang==="ar"?"تسجيل وكالة جديدة":lang==="fr"?"Nouvelle agence":"New Agency"}
            </div>
            <h1 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:8}}>{p.title}</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:14}}>{p.sub}</p>
          </div>

          {/* Steps indicator */}
          <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:32}}>
            {[1,2,3].map((s,i)=>(
              <div key={s} style={{display:"flex",alignItems:"center",flex:i<2?1:"auto"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:step>=s?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.07)",border:step===s?"2px solid #A855F7":step>s?"none":"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,transition:"all .3s"}}>
                    {step>s?<Ic.Check/>:s}
                  </div>
                  <span style={{fontSize:10,color:step>=s?"#C084FC":"rgba(255,255,255,.3)",fontWeight:600,whiteSpace:"nowrap"}}>{s===1?p.step1:s===2?p.step2:p.step3}</span>
                </div>
                {i<2&&<div style={{flex:1,height:2,background:step>s?"linear-gradient(90deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",margin:"0 8px",marginBottom:20,borderRadius:1,transition:"all .4s"}}/>}
              </div>
            ))}
          </div>

          {step===1&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28,display:"flex",flexDirection:"column",gap:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div>
                    <label style={labelStyle}>{p.nameLabel}</label>
                    <input value={form.name} onChange={set("name")} placeholder={p.namePh} style={inputStyle}/>
                  </div>
                  <div>
                    <label style={labelStyle}>{p.ownerLabel}</label>
                    <input value={form.owner} onChange={set("owner")} placeholder={p.ownerPh} style={inputStyle}/>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{p.wilayaLabel}</label>
                  <select value={form.wilaya} onChange={set("wilaya")} style={{...inputStyle,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                    <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{t.allWilayas}</option>
                    {allWilayas.map(w=><option key={w.c} value={w.c} style={{background:"#0D0D1E",color:"#F1F5F9"}}>{w.c} — {lang==="fr"?w.fr:w.ar}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{p.carsLabel}</label>
                  <input type="number" min="1" value={form.cars} onChange={set("cars")} placeholder="5" style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>{p.addressLabel}</label>
                  <input value={form.address} onChange={set("address")} placeholder={p.addressPh} style={inputStyle}/>
                </div>
                <BtnGlow onClick={()=>setStep(2)} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:11,fontSize:15,fontWeight:700,alignSelf:"flex-start",paddingLeft:36,paddingRight:36}}>
                  {lang==="ar"?"التالي →":lang==="fr"?"Suivant →":"Next →"}
                </BtnGlow>
              </div>
            </div>
          )}

          {step===2&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28,display:"flex",flexDirection:"column",gap:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div>
                    <label style={labelStyle}>{p.phoneLabel}</label>
                    <input value={form.phone} onChange={set("phone")} placeholder={p.phonePh} style={inputStyle}/>
                  </div>
                  <div>
                    <label style={labelStyle}>{p.emailLabel}</label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder={p.emailPh} style={inputStyle}/>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{p.descLabel}</label>
                  <textarea value={form.desc} onChange={set("desc")} placeholder={p.descPh} rows={3} style={{...inputStyle,resize:"vertical",lineHeight:1.7}}/>
                </div>

                {/* ── بيانات الدخول ── */}
                <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:18}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",borderRadius:20,padding:"4px 12px",marginBottom:14,fontSize:11,color:"#C084FC",fontWeight:700}}>
                    🔐 {lang==="ar"?"بيانات الدخول":lang==="fr"?"Identifiants de connexion":"Login Credentials"}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div>
                      <label style={labelStyle}>{lang==="ar"?"اسم المستخدم":lang==="fr"?"Nom d'utilisateur":"Username"}</label>
                      <input value={form.username} onChange={set("username")} placeholder={lang==="ar"?"مثال: alger.drive":lang==="fr"?"Ex: alger.drive":"e.g. alger.drive"} style={inputStyle} autoComplete="username"/>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginTop:5}}>{lang==="ar"?"سيُستخدم لتسجيل الدخول إلى لوحة التحكم":lang==="fr"?"Utilisé pour accéder au tableau de bord":"Used to access your agency dashboard"}</div>
                    </div>
                    <div>
                      <label style={labelStyle}>{lang==="ar"?"كلمة المرور":lang==="fr"?"Mot de passe":"Password"}</label>
                      <div style={{position:"relative"}}>
                        <input type={showPass?"text":"password"} value={form.password} onChange={set("password")} placeholder="••••••••" style={{...inputStyle,paddingRight:42}} autoComplete="new-password"/>
                        <button onClick={()=>setShowPass(p=>!p)} style={{position:"absolute",top:"50%",right:12,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:14}}>{showPass?"🙈":"👁️"}</button>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop:14}}>
                    <label style={labelStyle}>{lang==="ar"?"تأكيد كلمة المرور":lang==="fr"?"Confirmer le mot de passe":"Confirm Password"}</label>
                    <div style={{position:"relative"}}>
                      <input type={showConfirm?"text":"password"} value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="••••••••"
                        style={{...inputStyle,paddingRight:42,borderColor:form.confirmPassword&&form.confirmPassword!==form.password?"rgba(239,68,68,.5)":form.confirmPassword&&form.confirmPassword===form.password?"rgba(52,211,153,.5)":"rgba(255,255,255,.1)"}}
                        autoComplete="new-password"/>
                      <button onClick={()=>setShowConfirm(p=>!p)} style={{position:"absolute",top:"50%",right:12,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:14}}>{showConfirm?"🙈":"👁️"}</button>
                    </div>
                    {form.confirmPassword&&form.confirmPassword!==form.password&&(
                      <div style={{fontSize:11,color:"#FCA5A5",marginTop:5}}>⚠️ {lang==="ar"?"كلمتا المرور غير متطابقتين":lang==="fr"?"Les mots de passe ne correspondent pas":"Passwords do not match"}</div>
                    )}
                    {form.confirmPassword&&form.confirmPassword===form.password&&(
                      <div style={{fontSize:11,color:"#34D399",marginTop:5}}>✓ {lang==="ar"?"كلمتا المرور متطابقتان":lang==="fr"?"Les mots de passe correspondent":"Passwords match"}</div>
                    )}
                  </div>
                </div>

                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(1)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                    {lang==="ar"?"← السابق":lang==="fr"?"← Retour":"← Back"}
                  </button>
                  <BtnGlow onClick={()=>{if(!form.password||form.password.length<6||form.password!==form.confirmPassword)return;setStep(3);}}
                    style={{background:form.password&&form.password.length>=6&&form.password===form.confirmPassword?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",border:"none",color:form.password&&form.password.length>=6&&form.password===form.confirmPassword?"#fff":"rgba(255,255,255,.3)",padding:"12px 32px",borderRadius:10,fontSize:15,fontWeight:700,cursor:form.password&&form.password.length>=6&&form.password===form.confirmPassword?"pointer":"not-allowed"}}>
                    {lang==="ar"?"التالي →":lang==="fr"?"Suivant →":"Next →"}
                  </BtnGlow>
                </div>
              </div>
            </div>
          )}

          {step===3&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28}}>
                <h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:18}}>
                  {lang==="ar"?"مراجعة البيانات":lang==="fr"?"Récapitulatif":"Summary"}
                </h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:22}}>
                  {[
                    {l:p.nameLabel,v:form.name||"—"},
                    {l:p.ownerLabel,v:form.owner||"—"},
                    {l:p.wilayaLabel,v:form.wilaya?(lang==="fr"?allWilayas.find(w=>w.c===form.wilaya)?.fr:allWilayas.find(w=>w.c===form.wilaya)?.ar)||form.wilaya:"—"},
                    {l:p.phoneLabel,v:form.phone||"—"},
                    {l:p.emailLabel,v:form.email||"—"},
                    {l:p.carsLabel,v:form.cars||"—"},
                    {l:lang==="ar"?"اسم المستخدم":lang==="fr"?"Nom d'utilisateur":"Username",v:form.username||"—"},
                    {l:lang==="ar"?"كلمة المرور":lang==="fr"?"Mot de passe":"Password",v:form.password?"••••••••":"—"},
                  ].map((r,i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:4}}>{r.l}</div>
                      <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{r.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.2)",borderRadius:10,padding:"13px 16px",marginBottom:22,fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.7}}>
                  <Ic.Info/> {lang==="ar"?"بالضغط على الإرسال توافق على شروط استخدام المنصة. بعد مراجعة الطلب من مشرف المنصة وقبوله، ستتلقى بيانات دخول لوحة التحكم على بريدك الإلكتروني.":lang==="fr"?"En soumettant, vous acceptez les conditions. Après validation par l'admin, vous recevrez vos identifiants.":"By submitting, you agree to terms. After admin approval, you'll receive login credentials."}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(2)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                    {lang==="ar"?"← السابق":lang==="fr"?"← Retour":"← Back"}
                  </button>
                  <BtnGlow onClick={()=>setDone(true)} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 32px",borderRadius:10,fontSize:15,fontWeight:700,display:"flex",alignItems:"center",gap:8}}>
                    <Ic.Check/>{p.submitBtn}
                  </BtnGlow>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR – Benefits */}
        <div style={{position:"sticky",top:90}}>
          <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.14),rgba(99,102,241,.1))",border:"1px solid rgba(124,58,237,.25)",borderRadius:18,padding:24,marginBottom:16}}>
            <h3 style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:18}}>{p.benefitsTitle}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {p.benefits.map((b,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:11}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"rgba(52,211,153,.14)",border:"1px solid rgba(52,211,153,.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"#34D399",flexShrink:0}}><Ic.Check/></div>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.5}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:14,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>{lang==="ar"?"إحصائيات المنصة":lang==="fr"?"Statistiques":"Platform Stats"}</div>
            {[{n:"500+",l:lang==="ar"?"سيارة مسجلة":lang==="fr"?"Voitures":"Cars"},{n:"6",l:lang==="ar"?"وكالات شريكة":lang==="fr"?"Agences":"Agencies"},{n:"50K+",l:lang==="ar"?"رحلة منجزة":lang==="fr"?"Voyages":"Trips"},{n:"4.9★",l:lang==="ar"?"متوسط التقييم":lang==="fr"?"Note moy.":"Avg rating"}].map((s,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.42)"}}>{s.l}</span>
                <span style={{fontSize:16,fontWeight:800,color:"#C084FC"}}>{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
function MsgsPage({t,rtl,lang,convs,activeC,setActiveC,msgIn,setMsgIn,sendMsg,ag,goBack,chatTyping,chatAttach,setChatAttach,chatAttachMenu,setChatAttachMenu,chatSearch,setChatSearch,chatSearchOpen,setChatSearchOpen,handleChatFileAttach,handleChatMsgChange,chatFileRef,chatImgRef}){
  const endRef=useRef(null);
  const conv=convs.find(c=>c.id===activeC);
  const agency=conv?ag(conv.agencyId):null;
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[conv?.msgs?.length,chatTyping]);

  const filteredMsgs=chatSearchOpen&&chatSearch.trim()
    ? conv?.msgs.filter(m=>m.text?.toLowerCase().includes(chatSearch.toLowerCase()))
    : conv?.msgs;

  return(
    <div style={{maxWidth:980,margin:"0 auto",padding:"24px 5% 52px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
        <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 12px",borderRadius:8,cursor:"pointer",fontSize:13}}>
          <Ic.Back/>
        </button>
        <div style={{width:34,height:34,borderRadius:9,background:"rgba(124,58,237,.18)",border:"1px solid rgba(124,58,237,.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#C084FC"}}><Ic.Msg/></div>
        <h1 style={{fontSize:19,fontWeight:800,color:"#fff"}}>{t.msgs.title}</h1>
        <span style={{fontSize:11,color:"rgba(255,255,255,.3)",display:"flex",alignItems:"center",gap:5,marginRight:"auto",marginLeft:"auto"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#34D399",display:"inline-block",animation:"pulse 2s infinite"}}/>
          {lang==="ar"?"دردشة مباشرة":"Live Chat"}
        </span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
        {/* Conversations list */}
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"12px 14px",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:12,fontWeight:700,color:"rgba(255,255,255,.4)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>{t.msgs.title}</span>
            <span style={{background:"rgba(124,58,237,.2)",color:"#C084FC",fontSize:10,padding:"2px 7px",borderRadius:9,fontWeight:800}}>{convs.length}</span>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {convs.length===0&&<div style={{textAlign:"center",padding:"36px 16px",color:"rgba(255,255,255,.28)",fontSize:12}}>{t.msgs.noConv}</div>}
            {convs.map(c=>{
              const a=ag(c.agencyId); const last=c.msgs[c.msgs.length-1];
              const isOnline=[1,3,5].includes(a?.id);
              return(
                <div key={c.id} onClick={()=>setActiveC(c.id)} style={{padding:"13px 14px",cursor:"pointer",background:activeC===c.id?"rgba(124,58,237,.16)":"transparent",borderBottom:"1px solid rgba(255,255,255,.04)",borderLeft:activeC===c.id?"3px solid #7C3AED":"3px solid transparent",transition:"background .15s"}}>
                  <div style={{display:"flex",gap:9,alignItems:"center"}}>
                    <div style={{position:"relative",flexShrink:0}}>
                      {a&&<AgencyLogo agency={a} size={40} style={{}}/>}
                      <div style={{position:"absolute",bottom:-1,right:-1,width:11,height:11,borderRadius:"50%",background:isOnline?"#34D399":"rgba(255,255,255,.2)",border:"2px solid #06060F"}}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4}}>
                        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lang==="ar"?a?.ar:a?.fr}</span>
                        <span style={{fontSize:9,color:"rgba(255,255,255,.22)",flexShrink:0}}>{last?.time||""}</span>
                      </div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.32)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {last?.attach?"📎 "+last.attach.name:last?.text||"..."}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat panel */}
        <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {!activeC?(
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.2)",flexDirection:"column",gap:12}}>
              <div style={{width:60,height:60,borderRadius:16,background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>💬</div>
              <span style={{fontSize:13,fontWeight:600}}>{t.msgs.selectConv}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,.12)"}}>{lang==="ar"?"الدردشة المباشرة جاهزة":"Real-time chat ready"}</span>
            </div>
          ):(
            <>
              {/* Chat header */}
              <div style={{padding:"12px 18px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.02)"}}>
                <div style={{position:"relative"}}>
                  {agency&&<AgencyLogo agency={agency} size={40}/>}
                  <div style={{position:"absolute",bottom:-1,right:-1,width:11,height:11,borderRadius:"50%",background:"#34D399",border:"2px solid #06060F",animation:"pulse 2s infinite"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lang==="ar"?agency?.ar:agency?.fr}</div>
                  <div style={{fontSize:10,color:"#34D399",display:"flex",alignItems:"center",gap:4}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:"#34D399",display:"inline-block",animation:"pulse 2s infinite"}}/>
                    {chatTyping?(lang==="ar"?"يكتب...":lang==="fr"?"En train d'écrire...":"typing..."):t.msgs.online}
                  </div>
                </div>
                {/* Search */}
                <button onClick={()=>{setChatSearchOpen(v=>!v);setChatSearch("");}} style={{background:chatSearchOpen?"rgba(124,58,237,.25)":"rgba(255,255,255,.05)",border:`1px solid ${chatSearchOpen?"rgba(124,58,237,.4)":"rgba(255,255,255,.1)"}`,color:chatSearchOpen?"#C084FC":"rgba(255,255,255,.4)",width:32,height:32,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                  <Ic.Search/>
                </button>
              </div>

              {/* Search bar */}
              {chatSearchOpen&&(
                <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,.05)",background:"rgba(124,58,237,.04)"}}>
                  <div style={{position:"relative"}}>
                    <input value={chatSearch} onChange={e=>setChatSearch(e.target.value)} placeholder={lang==="ar"?"ابحث في الرسائل...":"Search messages..."} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(124,58,237,.25)",borderRadius:9,color:"#fff",padding:"8px 14px 8px 34px",fontSize:12}}/>
                    <span style={{position:"absolute",top:"50%",left:10,transform:"translateY(-50%)",color:"rgba(255,255,255,.3)"}}><Ic.Search/></span>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div style={{flex:1,overflowY:"auto",padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
                {filteredMsgs?.map((m,i)=>(
                  <div key={m.id||i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start",animation:"fadeUp .2s ease both"}}>
                    {m.from==="agency"&&agency&&(
                      <div style={{flexShrink:0,marginLeft:rtl?0:8,marginRight:rtl?8:0,alignSelf:"flex-end"}}>
                        <AgencyLogo agency={agency} size={28} style={{borderRadius:8}}/>
                      </div>
                    )}
                    <div style={{maxWidth:"72%"}}>
                      <div style={{padding:m.attach&&m.attach.type==="image"?"6px":"10px 14px",borderRadius:m.from==="user"?rtl?"4px 16px 16px 16px":"16px 4px 16px 16px":rtl?"16px 4px 16px 16px":"4px 16px 16px 16px",background:m.from==="user"?"linear-gradient(135deg,#7C3AED,#5B4DE8)":"rgba(255,255,255,.08)",fontSize:13,color:"#fff",lineHeight:1.6,wordBreak:"break-word"}}>
                        {m.attach&&m.attach.type==="image"&&<img src={m.attach.url} alt={m.attach.name} style={{width:"100%",maxWidth:230,borderRadius:10,display:"block",marginBottom:m.text?6:0}}/>}
                        {m.attach&&m.attach.type==="doc"&&(
                          <div style={{display:"flex",gap:9,alignItems:"center",padding:"7px 10px",background:"rgba(255,255,255,.06)",borderRadius:9,marginBottom:m.text?6:0}}>
                            <span style={{fontSize:22}}>📄</span>
                            <div>
                              <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>{m.attach.name}</div>
                              <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{m.attach.size}</div>
                            </div>
                          </div>
                        )}
                        {m.text&&<span>{m.text}</span>}
                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:4,marginTop:3}}>
                          <span style={{fontSize:9,color:"rgba(255,255,255,.28)"}}>{m.time}</span>
                          {m.from==="user"&&(
                            <span style={{fontSize:10,color:m.status==="delivered"?"#34D399":"rgba(255,255,255,.3)"}}>
                              {m.status==="sent"?"✓":"✓✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                {chatTyping&&(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {agency&&<AgencyLogo agency={agency} size={28} style={{borderRadius:8,flexShrink:0}}/>}
                    <div style={{background:"rgba(255,255,255,.08)",borderRadius:"4px 16px 16px 16px",padding:"10px 14px",display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",display:"inline-block",animation:"typing1 1.2s infinite"}}/>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",display:"inline-block",animation:"typing2 1.2s infinite"}}/>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",display:"inline-block",animation:"typing3 1.2s infinite"}}/>
                    </div>
                  </div>
                )}
                <div ref={endRef}/>
              </div>

              {/* Attach preview */}
              {chatAttach&&(
                <div style={{padding:"8px 14px",borderTop:"1px solid rgba(255,255,255,.05)",background:"rgba(124,58,237,.06)",display:"flex",alignItems:"center",gap:10}}>
                  {chatAttach.type==="image"?<img src={chatAttach.url} alt="" style={{width:44,height:44,borderRadius:8,objectFit:"cover"}}/>:<span style={{fontSize:24}}>📄</span>}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{chatAttach.name}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{chatAttach.size}</div>
                  </div>
                  <button onClick={()=>setChatAttach(null)} style={{background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.3)",color:"#F87171",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              )}

              {/* Input bar */}
              <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",gap:9,alignItems:"flex-end",background:"rgba(255,255,255,.015)"}}>
                {/* Attach */}
                <div style={{position:"relative"}}>
                  <button onClick={e=>{e.stopPropagation();setChatAttachMenu(v=>!v);}} style={{background:chatAttachMenu?"rgba(124,58,237,.25)":"rgba(255,255,255,.05)",border:`1px solid ${chatAttachMenu?"rgba(124,58,237,.5)":"rgba(255,255,255,.1)"}`,color:chatAttachMenu?"#C084FC":"rgba(255,255,255,.4)",width:40,height:40,borderRadius:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,transition:"all .2s"}}>📎</button>
                  {chatAttachMenu&&(
                    <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:48,left:0,background:"rgba(14,14,28,.97)",border:"1px solid rgba(124,58,237,.3)",borderRadius:12,padding:6,display:"flex",flexDirection:"column",gap:4,minWidth:170,boxShadow:"0 8px 32px rgba(0,0,0,.6)",zIndex:50}}>
                      <button onClick={()=>chatImgRef.current?.click()} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",background:"transparent",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",borderRadius:8,fontSize:12,fontWeight:600}}>
                        <span style={{fontSize:18}}>🖼️</span>{lang==="ar"?"إرسال صورة":lang==="fr"?"Envoyer une image":"Send Image"}
                      </button>
                      <button onClick={()=>chatFileRef.current?.click()} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",background:"transparent",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",borderRadius:8,fontSize:12,fontWeight:600}}>
                        <span style={{fontSize:18}}>📄</span>{lang==="ar"?"إرسال وثيقة":lang==="fr"?"Envoyer un document":"Send Document"}
                      </button>
                    </div>
                  )}
                </div>
                <input ref={chatImgRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleChatFileAttach}/>
                <input ref={chatFileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" style={{display:"none"}} onChange={handleChatFileAttach}/>
                <input value={msgIn} onChange={handleChatMsgChange} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg();}}}
                  placeholder={t.msgs.type}
                  style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.09)",borderRadius:11,color:"#fff",padding:"10px 14px",fontSize:13,minHeight:40}}/>
                <BtnGlow onClick={sendMsg} style={{background:msgIn.trim()||chatAttach?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:"none",color:msgIn.trim()||chatAttach?"#fff":"rgba(255,255,255,.25)",width:44,height:40,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .25s",cursor:msgIn.trim()||chatAttach?"pointer":"default"}}>
                  <Ic.Send/>
                </BtnGlow>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ADD CAR MODAL
// ────────────────────────────────────────────────────────────────────────────
function AddCarModal({lang,darkMode,agencies,allWilayas,onClose,onAdd}){
  const dm=darkMode;
  const [form,setForm]=useState({name:"",brand:"",type:"sedan",price:"",year:new Date().getFullYear(),seats:5,agencyId:"",wilaya:"",badge:"سيدان",img:""});
  const [step,setStep]=useState(1);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const IS={width:"100%",background:dm?"rgba(255,255,255,.07)":"rgba(0,0,0,.05)",border:`1px solid ${dm?"rgba(255,255,255,.12)":"rgba(0,0,0,.12)"}`,borderRadius:10,color:dm?"#fff":"#1A1A2E",padding:"11px 14px",fontSize:14,fontFamily:"inherit"};
  const LS={display:"block",fontSize:11,fontWeight:700,color:dm?"rgba(255,255,255,.45)":"rgba(0,0,0,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:6};
  const TYPES=[{k:"sedan",ar:"سيدان",fr:"Berline",en:"Sedan"},{k:"suv",ar:"SUV",fr:"SUV",en:"SUV"},{k:"luxury",ar:"فاخرة",fr:"Luxe",en:"Luxury"},{k:"electric",ar:"كهربائية",fr:"Électrique",en:"Electric"},{k:"van",ar:"فان",fr:"Van",en:"Van"},{k:"wedding",ar:"زفاف",fr:"Mariage",en:"Wedding"}];
  const CAR_BRANDS=["Mercedes","BMW","Toyota","Tesla","Audi","Porsche","Hyundai","Kia","Renault","Peugeot","Volkswagen","Dacia","Ford","Chevrolet","Lamborghini","Ferrari","Bentley","Rolls-Royce","Range Rover","Mitsubishi","Honda","Nissan","Mazda","Volvo","Jeep","Land Rover","Lexus","Infinity","Cadillac","Lincoln","Bugatti","Maserati","Alfa Romeo","Fiat","Seat","Skoda","Opel","Citroen","Suzuki","Subaru","Altro"];
  const submit=()=>{
    if(!form.name||!form.price) return;
    const t=TYPES.find(x=>x.k===form.type);
    onAdd({...form,price:+form.price,year:+form.year,seats:+form.seats,badge:t?t.ar:form.type,img:form.img||"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80"});
  };
  return(
    <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,.8)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:dm?"#0D0D1E":"#fff",border:`1px solid ${dm?"rgba(124,58,237,.35)":"rgba(124,58,237,.2)"}`,borderRadius:24,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",animation:"fadeUp .35s ease both"}}>
        <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.3),rgba(99,102,241,.15))",borderRadius:"24px 24px 0 0",padding:"24px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{fontSize:19,fontWeight:900,color:"#fff",marginBottom:4}}>{lang==="ar"?"إضافة سيارة جديدة":lang==="fr"?"Ajouter un véhicule":"Add New Car"}</h2>
            <p style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{lang==="ar"?"أدخل بيانات سيارتك":lang==="fr"?"Entrez les infos du véhicule":"Enter vehicle details"}</p>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",color:"rgba(255,255,255,.7)",width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <div style={{padding:"28px"}}>
          {/* Steps */}
          <div style={{display:"flex",gap:0,marginBottom:28}}>
            {[1,2].map((s,i)=>(
              <div key={s} style={{display:"flex",alignItems:"center",flex:i===0?1:"auto"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:step>=s?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700}}>
                    {step>s?"✓":s}
                  </div>
                  <span style={{fontSize:10,color:step>=s?"#C084FC":"rgba(255,255,255,.3)",fontWeight:600,whiteSpace:"nowrap"}}>{s===1?(lang==="ar"?"معلومات السيارة":lang==="fr"?"Infos véhicule":"Car Info"):(lang==="ar"?"التفاصيل":lang==="fr"?"Détails":"Details")}</span>
                </div>
                {i===0&&<div style={{flex:1,height:2,background:step>1?"linear-gradient(90deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",margin:"0 10px",marginBottom:20,borderRadius:1}}/>}
              </div>
            ))}
          </div>

          {step===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp .3s ease both"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <label style={LS}>{lang==="ar"?"اسم السيارة":lang==="fr"?"Nom du véhicule":"Car Name"}</label>
                  <input value={form.name} onChange={set("name")} placeholder={lang==="ar"?"مثال: Toyota Corolla":lang==="fr"?"Ex: Toyota Corolla":"Ex: Toyota Corolla"} style={IS}/>
                </div>
                <div>
                  <label style={LS}>{lang==="ar"?"العلامة التجارية":lang==="fr"?"Marque":"Brand"}</label>
                  <select value={form.brand} onChange={set("brand")} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                    <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{lang==="ar"?"اختر العلامة":lang==="fr"?"Choisir":"Select brand"}</option>
                    {CAR_BRANDS.map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={LS}>{lang==="ar"?"نوع السيارة":lang==="fr"?"Type de véhicule":"Car Type"}</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                  {TYPES.map(tp=>(
                    <button key={tp.k} onClick={()=>setForm(f=>({...f,type:tp.k,badge:tp.ar}))} style={{padding:"9px",borderRadius:10,border:`2px solid ${form.type===tp.k?"#7C3AED":"rgba(255,255,255,.1)"}`,background:form.type===tp.k?"rgba(124,58,237,.2)":"rgba(255,255,255,.03)",color:form.type===tp.k?"#C084FC":dm?"rgba(255,255,255,.55)":"#666",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s"}}>
                      {lang==="ar"?tp.ar:lang==="fr"?tp.fr:tp.en}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <label style={LS}>{lang==="ar"?"السعر/يوم (دج)":lang==="fr"?"Prix/jour (DA)":"Price/day (DZD)"}</label>
                  <input type="number" value={form.price} onChange={set("price")} placeholder="5000" style={IS}/>
                </div>
                <div>
                  <label style={LS}>{lang==="ar"?"سنة الصنع":lang==="fr"?"Année":"Year"}</label>
                  <input type="number" value={form.year} onChange={set("year")} min="2010" max="2025" style={IS}/>
                </div>
              </div>
              <button onClick={()=>setStep(2)} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:700}}>
                {lang==="ar"?"التالي ←":lang==="fr"?"Suivant →":"Next →"}
              </button>
            </div>
          )}

          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp .3s ease both"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <label style={LS}>{lang==="ar"?"عدد المقاعد":lang==="fr"?"Places":"Seats"}</label>
                  <input type="number" value={form.seats} onChange={set("seats")} min="2" max="20" style={IS}/>
                </div>
                <div>
                  <label style={LS}>{lang==="ar"?"الولاية":lang==="fr"?"Wilaya":"Wilaya"}</label>
                  <select value={form.wilaya} onChange={set("wilaya")} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                    <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{lang==="ar"?"اختر الولاية":lang==="fr"?"Choisir":"Select"}</option>
                    {allWilayas.map(w=><option key={w.c} value={w.c} style={{background:"#0D0D1E",color:"#F1F5F9"}}>{w.c} — {lang==="fr"?w.fr:w.ar}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={LS}>{lang==="ar"?"الوكالة":lang==="fr"?"Agence":"Agency"}</label>
                <select value={form.agencyId} onChange={e=>setForm(f=>({...f,agencyId:+e.target.value}))} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                  <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{lang==="ar"?"اختر الوكالة":lang==="fr"?"Choisir":"Select agency"}</option>
                  {agencies.map(a=><option key={a.id} value={a.id}>{lang==="ar"?a.ar:a.fr}</option>)}
                </select>
              </div>
              <div>
                <label style={LS}>{lang==="ar"?"رابط صورة السيارة (اختياري)":lang==="fr"?"Lien photo (optionnel)":"Image URL (optional)"}</label>
                <input value={form.img} onChange={set("img")} placeholder="https://..." style={IS}/>
              </div>
              <div style={{display:"flex",gap:10,marginTop:4}}>
                <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:dm?"rgba(255,255,255,.6)":"#666",padding:"12px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:600}}>
                  {lang==="ar"?"← السابق":lang==="fr"?"← Précédent":"← Back"}
                </button>
                <button onClick={submit} style={{flex:2,background:"linear-gradient(135deg,#059669,#34D399)",border:"none",color:"#fff",padding:"12px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:700}}>
                  🚗 {lang==="ar"?"إضافة السيارة":lang==="fr"?"Ajouter le véhicule":"Add Car"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

