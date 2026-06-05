import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "../../lib/router.jsx";
import {
  IconLanguage,
  IconSupport,
  IconLogin,
  IconChevronRight,
  IconDocument,
  IconCar,
  IconSpark,
  IconGlyph,
  IconBell,
  IconCard,
  IconWallet,
  IconCoupon,
  IconTransmission,
  IconSuccess,
  IconClose,
  IconGoogle,
  IconLock,
  IconPhone,
  IconAlert,
} from "../ui/AppIcons.jsx";
import { getCurrentUser, signOut, getAppLanguage, setAppLanguage, resetPassword, signInWithOAuth } from "../../lib/supabase.js";

const VERSION = "6.7.34";

const LANGS = [
  { id: "ar", label: "العربية", short: "AR" },
  { id: "fr", label: "Français", short: "FR" },
  { id: "en", label: "English", short: "EN" },
  { id: "tz", label: "ⵜⴰⵎⴰⵣⵉⵖⵜ", short: "AZ" },
];

const DEFAULT_NOTIFICATION_SETTINGS = {
  tripAccountSms: true,
  promotionsSms: false,
  pushTrips: true,
  pushMessages: true,
  pushPromotions: false,
  promotionsEmail: false,
};

const copy = {
  ar: {
    moreTitle: "أكثر",
    edit: "عرض وتعديل الملف الشخصي",
    partnerTitle: "كن شريكنا",
    partnerText: "قريبًا ستتمكن من عرض سيارتك للكراء للمستخدمين الآخرين وتحقيق دخل إضافي عبر درايف Rent.",
    learn: "اعرف المزيد",
    account: "الحساب",
    language: "اللغة",
    support: "الدعم والمساعدة",
    why: "لماذا تختار درايف Rent",
    legal: "الشروط والقانونية",
    logout: "تسجيل الخروج",
    soon: "سيتم إضافة هذه الخاصية قريبًا",
    profile: "الملف الشخصي",
    joined: "انضم في مايو 2026",
    verifiedInfo: "معلومات موثقة",
    emailAddress: "البريد الإلكتروني",
    editProfile: "تعديل الملف الشخصي",
    changePhoto: "تغيير الصورة",
    photoHelp: "أضف صورة شخصية واضحة تساعد الوكالات على التعرف عليك عند بداية الرحلة.",
    about: "نبذة عنك",
    aboutHelp: "اكتب نبذة قصيرة عنك ولماذا أنت شخص موثوق. يمكنك إضافة خبراتك في السفر أو القيادة.",
    lives: "مكان السكن",
    works: "العمل",
    school: "الدراسة",
    languages: "اللغات",
    save: "حفظ",
    accountTitle: "الحساب",
    accountInfo: "معلومات الحساب",
    notificationSettings: "إعدادات الإشعارات",
    travelCredit: "رصيد الرحلات",
    creditValue: "0 دج",
    redeemGift: "استعمال بطاقة هدية",
    addCredit: "إضافة رصيد رحلات",
    transmission: "علبة السرعات المفضلة",
    closeAccount: "إغلاق حسابي",
    languageTitle: "اللغة",
    chooseLanguage: "اختر لغة التطبيق",
    accountInfoPage: "معلومات الحساب",
    notificationsPage: "إعدادات الإشعارات",
    transmissionPage: "علبة السرعات المفضلة",
    transmissionQuestion: "هل يمكنك قيادة سيارة بناقل حركة يدوي؟",
    transmissionYes: "نعم، أستطيع قيادة ناقل حركة يدوي",
    transmissionNo: "لا، لا أستطيع قيادة ناقل حركة يدوي",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    password: "كلمة المرور",
    google: "Google",
    verified: "موثّق",
    notVerified: "غير موثّق",
    connected: "مرتبط",
    notConnected: "غير مرتبط",
    missing: "بيانات ناقصة",
    add: "إضافة",
    editAction: "تعديل",
    verify: "تحقق",
    infoNoticeTitle: "أكمل بيانات حسابك",
    infoNoticeText: "أضف البيانات الناقصة وفعّل البريد والهاتف حتى تتمكن الوكالات من تأكيد حجوزاتك بسرعة.",
    submitInfo: "إضافة البيانات",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    fieldRequired: "هذا الحقل مطلوب",
    saved: "تم حفظ التغييرات",
    enterName: "اكتب اسمك",
    enterEmail: "example@email.com",
    enterPhone: "0555 000 000",
    passwordHidden: "••••••••",
    sendPasswordLink: "إرسال رابط تغيير كلمة المرور",
    passwordHelp: "سنرسل رابطًا آمنًا إلى بريدك لتغيير كلمة المرور.",
    passwordSent: "تم إرسال رابط تغيير كلمة المرور إن كان البريد صحيحًا.",
    passwordUnavailable: "أضف بريدك الإلكتروني أولاً.",
    connectGoogle: "ربط Google",
    googleHelp: "اربط حساب Google لتسجيل دخول أسرع وأكثر أمانًا.",
    googleAlready: "حساب Google مرتبط.",
    emailVerifyHelp: "اضغط تحقق لإرسال رابط التفعيل إلى البريد.",
    phoneVerifyHelp: "أدخل رقم هاتفك ثم رمز التحقق لإكمال التفعيل.",
    sendCode: "إرسال رمز",
    codePlaceholder: "رمز التحقق",
    confirmCode: "تأكيد الرمز",
    codeSent: "تم إرسال رمز التحقق التجريبي: 123456",
    codeInvalid: "أدخل رمز التحقق أولاً",
    verifySent: "تم تحديث حالة التحقق",
    mobileNotifications: "إشعارات الهاتف",
    emailNotifications: "إشعارات البريد الإلكتروني",
    tripAccountSms: "تحديثات الرحلات والحساب (SMS)",
    promotionsDealsSms: "العروض والتخفيضات (SMS)",
    pushNotifications: "إشعارات التطبيق",
    promotionsAnnouncementsEmail: "العروض والإعلانات",
    pushSettingsTitle: "إعدادات إشعارات التطبيق",
    pushNotificationsHelp: "اختر التنبيهات التي تريد استقبالها داخل التطبيق وعلى جهازك.",
    bookingReminders: "تذكيرات الحجز والرحلات",
    messagesNotifications: "الرسائل والمحادثات",
    dealsPushNotifications: "العروض داخل التطبيق",
    enabled: "مفعّل",
    disabled: "متوقف",
    notificationsSaved: "تم حفظ إعدادات الإشعارات",
    askAiTitle: "Ask AI Drive Rent",
    askAiIntro: "مرحبًا! أنا مساعد Drive Rent الذكي. أستطيع مساعدتك في الحجز، الدفع، الإلغاء، التحقق من الحساب، والتواصل مع الوكالات. كيف أساعدك؟",
    askAiPlaceholder: "اكتب سؤالك...",
    askAiQuickTitle: "أسئلة سريعة",
    askAiClear: "بدء محادثة جديدة",
    askAiEmpty: "اكتب سؤالاً أولاً.",
    askAiQuickQuestions: ["كيف أحجز سيارة؟", "ما هي طرق الدفع؟", "كيف ألغي حجزًا؟", "كيف أتحقق من حسابي؟"],
    askAiBookingAnswer: "للحجز، افتح صفحة السيارة، راجع السعر والولاية والشروط، ثم اضغط زر الحجز وأرسل الطلب إلى الوكالة. ستظهر تفاصيل الرحلة داخل صفحة الرحلات بعد التأكيد.",
    askAiPaymentAnswer: "حاليًا يتم الاتفاق على الدفع مع الوكالة حسب شروطها. لاحقًا يمكن إضافة الدفع داخل التطبيق ورصيد الرحلات.",
    askAiCancelAnswer: "لإلغاء حجز، افتح صفحة الرحلات واختر الحجز ثم اضغط إلغاء إذا كان متاحًا. قد تختلف سياسة الإلغاء حسب كل وكالة وسيارة.",
    askAiVerifyAnswer: "من صفحة الحساب يمكنك إضافة البريد والهاتف ثم الضغط على تحقق. توثيق البيانات يساعد الوكالات على تأكيد الحجز بسرعة.",
    askAiAgencyAnswer: "للتواصل مع وكالة، افتح صفحة السيارة أو الوكالة ثم استخدم الرسائل أو معلومات التواصل المتاحة داخل الصفحة.",
    askAiSearchAnswer: "استخدم البحث أو الفلتر لاختيار الولاية، نوع السيارة، السعر، وخصائص السيارة. يمكنك أيضًا الضغط على قريب مني لعرض سيارات قريبة.",
    askAiFallbackAnswer: "أستطيع مساعدتك في الأسئلة الشائعة حول الحجز، الدفع، الإلغاء، التحقق، البحث عن سيارة، أو التواصل مع الوكالة. جرّب كتابة سؤالك بطريقة أخرى.",
  },
  fr: {
    moreTitle: "Plus",
    edit: "Voir et modifier le profil",
    partnerTitle: "Devenir partenaire",
    partnerText: "Bientôt, vous pourrez proposer votre voiture à la location à d’autres utilisateurs et générer un revenu avec Drive Rent.",
    learn: "En savoir plus",
    account: "Compte",
    language: "Langue",
    support: "Aide et support",
    why: "Pourquoi choisir Drive Rent",
    legal: "Mentions légales",
    logout: "Déconnexion",
    soon: "Cette fonctionnalité sera ajoutée prochainement",
    profile: "Profil",
    joined: "Inscrit en mai 2026",
    verifiedInfo: "Informations vérifiées",
    emailAddress: "Adresse e-mail",
    editProfile: "Modifier le profil",
    changePhoto: "Changer la photo",
    photoHelp: "Ajoutez une photo de profil claire afin que les agences puissent vous reconnaître au début d’un trajet.",
    about: "À propos",
    aboutHelp: "Parlez brièvement de vous et expliquez pourquoi vous êtes une personne fiable. Vous pouvez ajouter vos expériences de voyage ou de conduite.",
    lives: "Lieu de résidence",
    works: "Travail",
    school: "École",
    languages: "Langues",
    save: "Enregistrer",
    accountTitle: "Compte",
    accountInfo: "Informations du compte",
    notificationSettings: "Paramètres de notifications",
    travelCredit: "Crédit de trajet",
    creditValue: "0 DZD",
    redeemGift: "Utiliser une carte cadeau",
    addCredit: "Ajouter du crédit de trajet",
    transmission: "Transmission préférée",
    closeAccount: "Fermer mon compte",
    languageTitle: "Langue",
    chooseLanguage: "Choisissez la langue de l’application",
    accountInfoPage: "Informations du compte",
    notificationsPage: "Paramètres de notifications",
    transmissionPage: "Transmission préférée",
    transmissionQuestion: "Pouvez-vous conduire une voiture à boîte manuelle ?",
    transmissionYes: "Oui, je peux conduire une boîte manuelle",
    transmissionNo: "Non, je ne peux pas conduire une boîte manuelle",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    password: "Mot de passe",
    google: "Google",
    verified: "Vérifié",
    notVerified: "Non vérifié",
    connected: "Connecté",
    notConnected: "Non connecté",
    missing: "Manquant",
    add: "Ajouter",
    editAction: "Modifier",
    verify: "Vérifier",
    infoNoticeTitle: "Complétez votre compte",
    infoNoticeText: "Ajoutez les informations manquantes et vérifiez l’e-mail et le téléphone pour faciliter la confirmation des réservations.",
    submitInfo: "Ajouter les infos",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
    fieldRequired: "Ce champ est requis",
    saved: "Modifications enregistrées",
    enterName: "Votre nom",
    enterEmail: "example@email.com",
    enterPhone: "0555 000 000",
    passwordHidden: "••••••••",
    sendPasswordLink: "Envoyer le lien de modification",
    passwordHelp: "Nous enverrons un lien sécurisé à votre e-mail.",
    passwordSent: "Lien envoyé si l’adresse e-mail est valide.",
    passwordUnavailable: "Ajoutez d’abord votre e-mail.",
    connectGoogle: "Connecter Google",
    googleHelp: "Connectez Google pour une connexion plus rapide et plus sûre.",
    googleAlready: "Compte Google connecté.",
    emailVerifyHelp: "Appuyez sur Vérifier pour envoyer le lien d’activation.",
    phoneVerifyHelp: "Saisissez votre téléphone puis le code de vérification.",
    sendCode: "Envoyer le code",
    codePlaceholder: "Code de vérification",
    confirmCode: "Confirmer",
    codeSent: "Code de test envoyé : 123456",
    codeInvalid: "Saisissez le code de vérification",
    verifySent: "Statut de vérification mis à jour",
    mobileNotifications: "Notifications mobiles",
    emailNotifications: "Notifications e-mail",
    tripAccountSms: "Trajets et compte (SMS)",
    promotionsDealsSms: "Promotions et offres (SMS)",
    pushNotifications: "Notifications push",
    promotionsAnnouncementsEmail: "Promotions et annonces",
    pushSettingsTitle: "Paramètres push",
    pushNotificationsHelp: "Choisissez les alertes que vous souhaitez recevoir dans l’application et sur votre appareil.",
    bookingReminders: "Rappels de réservation et trajet",
    messagesNotifications: "Messages et discussions",
    dealsPushNotifications: "Offres dans l’application",
    enabled: "Activé",
    disabled: "Désactivé",
    notificationsSaved: "Paramètres de notifications enregistrés",
    askAiTitle: "Ask AI Drive Rent",
    askAiIntro: "Bonjour ! Je suis l’assistant IA de Drive Rent. Je peux vous aider avec les réservations, le paiement, l’annulation, la vérification du compte et le contact avec les agences. Comment puis-je vous aider ?",
    askAiPlaceholder: "Posez une question...",
    askAiQuickTitle: "Questions rapides",
    askAiClear: "Nouvelle conversation",
    askAiEmpty: "Saisissez d’abord une question.",
    askAiQuickQuestions: ["Comment réserver une voiture ?", "Quels moyens de paiement ?", "Comment annuler une réservation ?", "Comment vérifier mon compte ?"],
    askAiBookingAnswer: "Pour réserver, ouvrez la page de la voiture, vérifiez le prix, la wilaya et les conditions, puis envoyez la demande de réservation à l’agence. Les détails apparaîtront dans la page des trajets après confirmation.",
    askAiPaymentAnswer: "Actuellement, le paiement se fait selon les conditions de l’agence. Le paiement dans l’application et le crédit de trajet pourront être ajoutés plus tard.",
    askAiCancelAnswer: "Pour annuler, ouvrez la page des trajets, choisissez la réservation puis appuyez sur Annuler si l’option est disponible. La politique peut varier selon l’agence et la voiture.",
    askAiVerifyAnswer: "Depuis la page du compte, ajoutez votre e-mail et votre téléphone puis appuyez sur Vérifier. La vérification aide les agences à confirmer plus rapidement.",
    askAiAgencyAnswer: "Pour contacter une agence, ouvrez la page de la voiture ou de l’agence, puis utilisez les messages ou les informations de contact disponibles.",
    askAiSearchAnswer: "Utilisez la recherche ou les filtres pour choisir la wilaya, le type, le prix et les options du véhicule. Vous pouvez aussi utiliser Près de moi.",
    askAiFallbackAnswer: "Je peux aider avec les questions fréquentes sur la réservation, le paiement, l’annulation, la vérification, la recherche d’une voiture ou le contact avec l’agence. Essayez de reformuler votre question.",
  },
  en: {
    moreTitle: "More",
    edit: "View and edit profile",
    partnerTitle: "Become a partner",
    partnerText: "Soon, you will be able to list your car for rent to other users and earn extra income with Drive Rent.",
    learn: "Learn more",
    account: "Account",
    language: "Language",
    support: "Get help",
    why: "Why choose Drive Rent",
    legal: "Legal",
    logout: "Log out",
    soon: "This feature will be added soon",
    profile: "Profile",
    joined: "Joined May 2026",
    verifiedInfo: "Verified info",
    emailAddress: "Email address",
    editProfile: "Edit profile",
    changePhoto: "Change photo",
    photoHelp: "Please add a profile photo that clearly shows your face. It helps agencies recognize you at the beginning of a trip.",
    about: "About",
    aboutHelp: "Tell agencies about yourself and why you are a responsible, trustworthy person. Share travel or driving experience.",
    lives: "Lives",
    works: "Works",
    school: "School",
    languages: "Languages",
    save: "Save",
    accountTitle: "Account",
    accountInfo: "Account info",
    notificationSettings: "Notification settings",
    travelCredit: "Travel credit",
    creditValue: "DZD 0",
    redeemGift: "Redeem gift card",
    addCredit: "Add travel credit",
    transmission: "Manual transmission",
    closeAccount: "Close my account",
    languageTitle: "Language",
    chooseLanguage: "Choose app language",
    accountInfoPage: "Account information",
    notificationsPage: "Notification settings",
    transmissionPage: "Preferred transmission",
    transmissionQuestion: "Are you able to drive a stick shift?",
    transmissionYes: "Yes, I’m able to drive a stick shift",
    transmissionNo: "No, I’m not able to drive a stick shift",
    name: "Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    google: "Google",
    verified: "Verified",
    notVerified: "Not verified",
    connected: "Connected",
    notConnected: "Not connected",
    missing: "Missing",
    add: "Add",
    editAction: "Edit",
    verify: "Verify",
    infoNoticeTitle: "Complete your account",
    infoNoticeText: "Add missing info and verify email and phone so agencies can confirm bookings quickly.",
    submitInfo: "Add info",
    saveChanges: "Save changes",
    cancel: "Cancel",
    fieldRequired: "This field is required",
    saved: "Changes saved",
    enterName: "Your name",
    enterEmail: "example@email.com",
    enterPhone: "0555 000 000",
    passwordHidden: "••••••••",
    sendPasswordLink: "Send password reset link",
    passwordHelp: "We will send a secure password reset link to your email.",
    passwordSent: "Password link sent if the email is valid.",
    passwordUnavailable: "Add your email first.",
    connectGoogle: "Connect Google",
    googleHelp: "Connect Google for faster, safer sign-in.",
    googleAlready: "Google account is connected.",
    emailVerifyHelp: "Tap Verify to send an activation link to your email.",
    phoneVerifyHelp: "Enter your phone number, then confirm the verification code.",
    sendCode: "Send code",
    codePlaceholder: "Verification code",
    confirmCode: "Confirm code",
    codeSent: "Demo verification code sent: 123456",
    codeInvalid: "Enter the verification code first",
    verifySent: "Verification status updated",
    mobileNotifications: "Mobile notifications",
    emailNotifications: "Email notifications",
    tripAccountSms: "Trip and account updates (SMS)",
    promotionsDealsSms: "Promotions and deals (SMS)",
    pushNotifications: "Push notifications",
    promotionsAnnouncementsEmail: "Promotions and announcements",
    pushSettingsTitle: "Push notification settings",
    pushNotificationsHelp: "Choose which alerts you want to receive in the app and on your device.",
    bookingReminders: "Booking and trip reminders",
    messagesNotifications: "Messages and chat",
    dealsPushNotifications: "In-app deals",
    enabled: "Enabled",
    disabled: "Off",
    notificationsSaved: "Notification settings saved",
    askAiTitle: "Ask AI Drive Rent",
    askAiIntro: "Hi! I’m Drive Rent’s AI assistant. I can help with bookings, payments, cancellations, account verification, finding cars, and contacting agencies. How can I help?",
    askAiPlaceholder: "Ask a question...",
    askAiQuickTitle: "Quick questions",
    askAiClear: "Start new chat",
    askAiEmpty: "Type a question first.",
    askAiQuickQuestions: ["How do I book a car?", "What payment methods are available?", "How do I cancel a booking?", "How do I verify my account?"],
    askAiBookingAnswer: "To book, open the car page, review the price, location, and conditions, then send the booking request to the agency. Trip details will appear in Trips after confirmation.",
    askAiPaymentAnswer: "For now, payment is arranged with the agency according to its terms. In-app payments and trip credit can be added later.",
    askAiCancelAnswer: "To cancel, open Trips, choose the booking, then tap Cancel if available. Cancellation rules may vary by agency and car.",
    askAiVerifyAnswer: "From Account info, add your email and phone, then tap Verify. Verified info helps agencies confirm bookings faster.",
    askAiAgencyAnswer: "To contact an agency, open the car or agency page and use the available messages or contact details.",
    askAiSearchAnswer: "Use Search or filters to choose the wilaya, car type, price, and features. You can also use Near me to show nearby cars.",
    askAiFallbackAnswer: "I can help with common questions about booking, payment, cancellation, verification, finding cars, or contacting agencies. Try asking your question another way.",
  },
  tz: {
    moreTitle: "ⵓⴳⴳⴰⵔ",
    edit: "ⵙⴽⵏ ⴷ ⵙⵏⴼⵍ ⴰⵎⴰⵍⵏⵓ",
    partnerTitle: "ⵉⵍⵉ ⴷ ⴰⵎⵛⴰⵔⴽ",
    partnerText: "ⵇⵔⵉⴱ ⴰⴷ ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⵙⴽⵏⴷ ⵜⴰⴽⴰⵔⵓⵙⵜ ⵏⵏⴽ ⵉ ⵓⴽⴽⵔⴰⵢ.",
    learn: "ⵉⵙⵙⵏ ⵓⴳⴳⴰⵔ",
    account: "ⴰⵎⵉⴹⴰⵏ",
    language: "ⵜⵓⵜⵍⴰⵢⵜ",
    support: "ⵜⴰⵍⵍⴰⵍⵜ",
    why: "ⵎⴰⵖⴼ ⴷⵔⴰⵢⴼ Rent",
    legal: "ⵉⵣⵔⴼⴰⵏ",
    logout: "ⴼⴼⵖ",
    soon: "ⴰⴷ ⵜⵔⵏⵓ ⵜⵎⴰⵀⵉⵍⵜ ⴰⴷ ⵇⵔⵉⴱ",
    profile: "ⴰⵎⴰⵍⵏⵓ",
    joined: "ⵉⵍⵍⴰ ⴷⵉ ⵎⴰⵢⵓ 2026",
    verifiedInfo: "ⵉⵙⴰⵍⵍⵏ ⵉⵜⵜⵡⴰⵙⵏⵜⵎⵏ",
    emailAddress: "ⵉⵎⴰⵢⵍ",
    editProfile: "ⵙⵏⴼⵍ ⴰⵎⴰⵍⵏⵓ",
    changePhoto: "ⵙⵏⴼⵍ ⵜⵓⵏⵖⵉⵍⵜ",
    photoHelp: "ⵔⵏⵓ ⵜⵓⵏⵖⵉⵍⵜ ⵜⴰⴼⴰⵡⵜ ⴰⴽⴽⵏ ⴰⴷ ⴽ ⵙⵙⵏⵏ ⵡⵓⴽⴰⵍⴰⵜ.",
    about: "ⴼⵍⵍⴰⴽ",
    aboutHelp: "ⴰⵔⵓ ⴽⵔⴰ ⴼⵍⵍⴰⴽ ⴷ ⵎⴰⵖⴼ ⵜⴻⵜⵜⵡⴰⵎⵏⴷ.",
    lives: "ⴰⴷⵖⴰⵔ",
    works: "ⵜⴰⵡⵓⵔⵉ",
    school: "ⵜⴰⵖⵔⵉ",
    languages: "ⵜⵓⵜⵍⴰⵢⵉⵏ",
    save: "ⵙⵖⵓⴷ",
    accountTitle: "ⴰⵎⵉⴹⴰⵏ",
    accountInfo: "ⵉⵙⴰⵍⵍⵏ ⵏ ⵓⵎⵉⴹⴰⵏ",
    notificationSettings: "ⵉⵖⴱⵓⵍⴰ ⵏ ⵉⵍⵖⴰ",
    travelCredit: "ⴰⵔⵔⴰⵣ ⵏ ⵜⵉⵔⵣⴰ",
    creditValue: "0 DZD",
    redeemGift: "ⵙⵙⵎⵔⵙ ⵜⴰⴽⴰⵔⴹⴰ ⵏ ⵓⵔⵣⵣⵓ",
    addCredit: "ⵔⵏⵓ ⴰⵔⵔⴰⵣ",
    transmission: "ⴰⴳⵔⴰⵡ ⵏ ⵓⵏⴰⵇⵇⴰⵍ",
    closeAccount: "ⵔⴳⵍ ⴰⵎⵉⴹⴰⵏ",
    languageTitle: "ⵜⵓⵜⵍⴰⵢⵜ",
    chooseLanguage: "ⴼⵔⵏ ⵜⵓⵜⵍⴰⵢⵜ ⵏ ⵓⵙⵏⵙ",
    accountInfoPage: "ⵉⵙⴰⵍⵍⵏ ⵏ ⵓⵎⵉⴹⴰⵏ",
    notificationsPage: "ⵉⵖⴱⵓⵍⴰ ⵏ ⵉⵍⵖⴰ",
    transmissionPage: "ⴰⴳⵔⴰⵡ ⵏ ⵓⵏⴰⵇⵇⴰⵍ",
    transmissionQuestion: "ⵉⵣⵎⵎⵔ ⴰⴷ ⵜⵙⵙⵉⵡⴹⴷ ⵜⴰⵎⴰⵏⵓⴰⵍⵜ ?",
    transmissionYes: "ⵉⵀ, ⵣⵎⵎⵔⵖ ⴰⴷ ⵙⵙⵉⵡⴹⵖ ⵜⴰⵎⴰⵏⵓⴰⵍⵜ",
    transmissionNo: "ⵓⵀⵓ, ⵓⵔ ⵣⵎⵎⵔⵖ ⴰⴷ ⵙⵙⵉⵡⴹⵖ ⵜⴰⵎⴰⵏⵓⴰⵍⵜ",
    name: "ⵉⵙⵎ",
    email: "ⵉⵎⴰⵢⵍ",
    phone: "ⵜⵉⵍⵉⴼⵓⵏ",
    password: "ⴰⵡⴰⵍ ⵓⴼⴼⵉⵔ",
    google: "Google",
    verified: "ⵉⵜⵜⵡⴰⵙⵏⵜⵎ",
    notVerified: "ⵓⵔ ⵉⵜⵜⵡⴰⵙⵏⵜⵎ",
    connected: "ⵉⵇⵇⵏ",
    notConnected: "ⵓⵔ ⵉⵇⵇⵏ",
    missing: "ⵉⵅⵚⵚⴰ",
    add: "ⵔⵏⵓ",
    editAction: "ⵙⵏⴼⵍ",
    verify: "ⵙⵏⵜⵎ",
    infoNoticeTitle: "ⵙⵎⴷ ⴰⵎⵉⴹⴰⵏ ⵏⵏⴽ",
    infoNoticeText: "ⵔⵏⵓ ⵉⵙⴰⵍⵍⵏ ⵉⵅⵚⵚⴰⵏ ⴷ ⵙⵏⵜⵎ ⵉⵎⴰⵢⵍ ⴷ ⵜⵉⵍⵉⴼⵓⵏ.",
    submitInfo: "ⵔⵏⵓ ⵉⵙⴰⵍⵍⵏ",
    saveChanges: "ⵙⵖⵓⴷ ⵉⵙⵏⴼⴰⵍ",
    cancel: "ⵙⵔⵎ",
    fieldRequired: "ⵉⵅⵚⵚⴰ ⵓⵔⵜⵉ ⴰⴷ",
    saved: "ⵉⵜⵜⵓⵙⵖⵓⴷ",
    enterName: "ⴰⵔⵓ ⵉⵙⵎ",
    enterEmail: "example@email.com",
    enterPhone: "0555 000 000",
    passwordHidden: "••••••••",
    sendPasswordLink: "ⴰⵣⵏ ⴰⵙⵖⵓⵏ ⵏ ⵓⵙⵏⴼⵍ",
    passwordHelp: "ⴰⴷ ⵏⴰⵣⵏ ⴰⵙⵖⵓⵏ ⴰⵎⵏⴰⴹ ⵖⵔ ⵉⵎⴰⵢⵍ.",
    passwordSent: "ⵉⵜⵜⵓⵣⵏ ⵓⵙⵖⵓⵏ ⵎⴰ ⵉⵍⵍⴰ ⵉⵎⴰⵢⵍ ⵉⵎⵓⵙⵙ.",
    passwordUnavailable: "ⵔⵏⵓ ⵉⵎⴰⵢⵍ ⵇⴱⵍ.",
    connectGoogle: "ⵇⵇⵏ Google",
    googleHelp: "ⵇⵇⵏ Google ⵉ ⵓⵙⵙⵉⴷⴼ ⵉⵎⵣⵔⴱⵏ.",
    googleAlready: "ⴰⵎⵉⴹⴰⵏ Google ⵉⵇⵇⵏ.",
    emailVerifyHelp: "ⵙⵙⵉ ⵙⵏⵜⵎ ⴰⴽⴽⵏ ⴰⴷ ⵉⵜⵜⵓⵣⵏ ⵓⵙⵖⵓⵏ.",
    phoneVerifyHelp: "ⵙⴽⵛⵎ ⵜⵉⵍⵉⴼⵓⵏ ⴷ ⵓⴽⵓⴷ ⵏ ⵓⵙⵏⵜⵎ.",
    sendCode: "ⴰⵣⵏ ⴰⴽⵓⴷ",
    codePlaceholder: "ⴰⴽⵓⴷ ⵏ ⵓⵙⵏⵜⵎ",
    confirmCode: "ⵙⵏⵜⵎ ⴰⴽⵓⴷ",
    codeSent: "ⵉⵜⵜⵓⵣⵏ ⵓⴽⵓⴷ ⵏ ⵓⵙⴼⵔⵓ: 123456",
    codeInvalid: "ⵙⴽⵛⵎ ⴰⴽⵓⴷ ⵏ ⵓⵙⵏⵜⵎ",
    verifySent: "ⵉⵜⵜⵓⵙⵏⴼⵍ ⵓⴷⴷⴰⴷ ⵏ ⵓⵙⵏⵜⵎ",
    mobileNotifications: "ⵉⵍⵖⴰ ⵏ ⵜⵉⵍⵉⴼⵓⵏ",
    emailNotifications: "ⵉⵍⵖⴰ ⵏ ⵉⵎⴰⵢⵍ",
    tripAccountSms: "ⵉⵙⴰⵍⵍⵏ ⵏ ⵜⵉⵔⵣⴰ ⴷ ⵓⵎⵉⴹⴰⵏ (SMS)",
    promotionsDealsSms: "ⵉⵙⵎⵓⵔⴰ ⴷ ⵜⵏⴳⴰⵣⵉⵏ (SMS)",
    pushNotifications: "ⵉⵍⵖⴰ ⵏ ⵓⵙⵏⵙ",
    promotionsAnnouncementsEmail: "ⵉⵙⵎⵓⵔⴰ ⴷ ⵉⵙⴰⵍⵍⵏ",
    pushSettingsTitle: "ⵉⵖⴱⵓⵍⴰ ⵏ ⵉⵍⵖⴰ ⵏ ⵓⵙⵏⵙ",
    pushNotificationsHelp: "ⴼⵔⵏ ⵉⵍⵖⴰ ⴰⵢ ⵜⴱⵖⵉⴷ ⴰⴷ ⴷ ⵜⴻⵔⵎⵙⴷ ⴷⵉ ⵓⵙⵏⵙ ⴷ ⵓⵙⴽⴰⵏ ⵏⵏⴽ.",
    bookingReminders: "ⵉⵙⴽⵜⴰⵢⵏ ⵏ ⵓⵙⴳⵓⵏⴼⵓ ⴷ ⵜⵉⵔⵣⴰ",
    messagesNotifications: "ⵉⵣⵏⴰⵏ ⴷ ⵓⵎⵙⴰⵡⴰⴹ",
    dealsPushNotifications: "ⵉⵙⵎⵓⵔⴰ ⴷⵉ ⵓⵙⵏⵙ",
    enabled: "ⵉⵔⵎⴷ",
    disabled: "ⵉⵏⵙ",
    notificationsSaved: "ⵜⵜⵓⵙⵖⵓⴷⵏ ⵉⵖⴱⵓⵍⴰ ⵏ ⵉⵍⵖⴰ",
    askAiTitle: "Ask AI Drive Rent",
    askAiIntro: "ⴰⵣⵓⵍ! ⵏⴽ ⴷ ⴰⵎⴰⵙⵙⴰⵖ AI ⵏ Drive Rent. ⵣⵎⵔⵖ ⴰⴷ ⴽ ⵄⵉⵡⵏⵖ ⴷⵉ ⵓⵃⵊⵊⵓⵣ, ⵓⵅⵍⵍⵚ, ⵓⵙⵏⴼⵙ, ⵓⵙⵏⵜⵎ ⵏ ⵓⵎⵉⴹⴰⵏ, ⴷ ⵓⵔⵣⵓ ⵏ ⵜⴽⴰⵔⵓⵙⵜ. ⵎⴰ ⴰⴽ ⵄⵉⵡⵏⵖ?",
    askAiPlaceholder: "ⴰⵔⵓ ⴰⵙⵇⵙⵉ...",
    askAiQuickTitle: "ⵉⵙⵇⵙⵉⵜⵏ ⵉⵎⵣⵔⴰⴱⵏ",
    askAiClear: "ⴱⴷⵓ ⴰⵎⵙⴰⵡⴰⴹ ⴰⵎⴰⵢⵏⵓ",
    askAiEmpty: "ⴰⵔⵓ ⴰⵙⵇⵙⵉ ⵇⴱⵍ.",
    askAiQuickQuestions: ["ⵎⴰⵎⴽ ⴰⴷ ⵃⵊⵊⵣⵖ ⵜⴰⴽⴰⵔⵓⵙⵜ?", "ⵎⴰⵏ ⵜⵉⵎⴰⵣⵉⵏ ⵏ ⵓⵅⵍⵍⵚ?", "ⵎⴰⵎⴽ ⴰⴷ ⵙⵏⴼⵙⵖ ⴰⵃⵊⵊⵓⵣ?", "ⵎⴰⵎⴽ ⴰⴷ ⵙⵏⵜⵎⵖ ⴰⵎⵉⴹⴰⵏ?"],
    askAiBookingAnswer: "ⵉ ⵓⵃⵊⵊⵓⵣ, ⵍⴷⵉ ⵜⴰⵙⵏⴰ ⵏ ⵜⴽⴰⵔⵓⵙⵜ, ⵙⵙⵏⵇⴷ ⵙⵙⵓⵎⴰ, ⴰⴷⵖⴰⵔ ⴷ ⵜⵡⵜⵉⵍⵉⵏ, ⵙⵙⴰⵣⵏ ⵜⵓⵜⵜⵔⴰ ⵉ ⵜⵡⴰⴽⴰⵍⴰ. ⵉⵙⴰⵍⵍⵏ ⴰⴷ ⴱⴰⵏⵏ ⴷⵉ ⵜⵉⵔⵣⴰ ⵎⴱⴰⵄⴷ ⵓⵙⵏⵜⵎ.",
    askAiPaymentAnswer: "ⵜⵓⵔⴰ, ⴰⵅⵍⵍⵚ ⴰⴷ ⵉⵍⵉ ⴷ ⵜⵡⴰⴽⴰⵍⴰ ⵙ ⵜⵡⵜⵉⵍⵉⵏ ⵏⵏⵙ. ⵇⵔⵉⴱ ⵉⵣⵎⵔ ⴰⴷ ⵉⵔⵏⵓ ⵓⵅⵍⵍⵚ ⴷⵉ ⵓⵙⵏⵙ.",
    askAiCancelAnswer: "ⵉ ⵓⵙⵏⴼⵙ, ⵍⴷⵉ ⵜⵉⵔⵣⴰ, ⴼⵔⵏ ⴰⵃⵊⵊⵓⵣ, ⴷⵖⵢⴰ ⵙⵙⵉ ⵙⵏⴼⵙ ⵎⴰ ⵜⵍⵍⴰ. ⵜⵉⵏⴱⴰⴹⵉⵏ ⵣⵎⵔⵏⵜ ⴰⴷ ⵎⵖⴰⵔⵏⵜ ⵙ ⵜⵡⴰⴽⴰⵍⴰ.",
    askAiVerifyAnswer: "ⵙⴳ ⵜⴰⵙⵏⴰ ⵏ ⵓⵎⵉⴹⴰⵏ, ⵔⵏⵓ ⵉⵎⴰⵢⵍ ⴷ ⵜⵉⵍⵉⴼⵓⵏ ⴷⵖⵢⴰ ⵙⵙⵉ ⵙⵏⵜⵎ. ⴰⵙⵏⵜⵎ ⵉⵙⵙⵉⵙⵀⵍ ⴰⵙⵏⵜⵎ ⵏ ⵓⵃⵊⵊⵓⵣ.",
    askAiAgencyAnswer: "ⵉ ⵓⵎⵢⴰⵡⴰⴹ ⴷ ⵜⵡⴰⴽⴰⵍⴰ, ⵍⴷⵉ ⵜⴰⵙⵏⴰ ⵏ ⵜⴽⴰⵔⵓⵙⵜ ⵏⵉⵖ ⵜⵡⴰⴽⴰⵍⴰ ⴷ ⵙⵙⵎⵔⵙ ⵉⵣⵏⴰⵏ ⵏⵉⵖ ⵉⵙⴰⵍⵍⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ.",
    askAiSearchAnswer: "ⵙⵙⵎⵔⵙ ⴰⵔⵣⵣⵓ ⵏⵉⵖ ⴰⵙⵜⴰⵢ ⵉ ⵓⴼⵔⴰⵏ ⵏ ⵜⵡⵉⵍⴰⵢⵜ, ⴰⵏⴰⵡ ⵏ ⵜⴽⴰⵔⵓⵙⵜ, ⵙⵙⵓⵎⴰ ⴷ ⵜⵎⴰⵀⵉⵍⵉⵏ.",
    askAiFallbackAnswer: "ⵣⵎⵔⵖ ⴰⴷ ⵄⵉⵡⵏⵖ ⴷⵉ ⵉⵙⵇⵙⵉⵜⵏ ⴼⵍⵍⴰ ⵓⵃⵊⵊⵓⵣ, ⵓⵅⵍⵍⵚ, ⵓⵙⵏⴼⵙ, ⵓⵙⵏⵜⵎ, ⴰⵔⵣⵣⵓ ⵏ ⵜⴽⴰⵔⵓⵙⵜ, ⵏⵉⵖ ⴰⵎⵢⴰⵡⴰⴹ ⴷ ⵜⵡⴰⴽⴰⵍⴰ. ⴰⵔⵎ ⴰⴷ ⵜⵙⵏⴼⵍⴷ ⴰⵙⵇⵙⵉ.",
  },
};

function PencilIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function ArrowBack({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}


function RefreshIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function SendIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function UserAvatar({ avatar, name, size = 72 }) {
  if (avatar) {
    return <img src={avatar} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", background: "rgba(255,255,255,.08)" }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", color: "rgba(255,255,255,.58)", border: "1px solid rgba(255,255,255,.06)" }}>
      <IconGlyph name="profile" size={Math.round(size * .58)} color="currentColor" strokeWidth={1.65} />
    </div>
  );
}


function resizeProfilePhoto(file, maxSize = 720, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("تعذر تجهيز الصورة"));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width || maxSize, img.height || maxSize));
        const width = Math.max(1, Math.round((img.width || maxSize) * scale));
        const height = Math.max(1, Math.round((img.height || maxSize) * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("تعذر ضغط الصورة"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  });
}

function TopBar({ title, onBack, action, dir }) {
  return (
    <div dir={dir} style={{ height: 62, display: "grid", gridTemplateColumns: "56px 1fr 56px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.075)", margin: "0 -16px", padding: "0 14px", position: "sticky", top: 0, zIndex: 20, background: "rgba(5,5,10,.92)", backdropFilter: "blur(14px)" }}>
      <button type="button" onClick={onBack} style={{ width: 44, height: 44, border: "none", background: "transparent", color: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", cursor: "pointer", transform: dir === "rtl" ? "scaleX(-1)" : "none" }}>
        <ArrowBack />
      </button>
      <div style={{ textAlign: "center", fontSize: 19, fontWeight: 950, letterSpacing: ".2px" }}>{title}</div>
      <div style={{ display: "grid", placeItems: "center" }}>{action}</div>
    </div>
  );
}

function MoreRow({ icon, title, sub, onClick, badge, danger, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        gap: 16,
        border: "none",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        background: "transparent",
        padding: "10px 0",
        fontFamily: "inherit",
        textAlign: dir === "ltr" ? "left" : "right",
        cursor: "pointer",
        color: danger ? "#EF4444" : "#F7F7FA",
      }}
    >
      <span style={{ width: 30, height: 30, display: "grid", placeItems: "center", color: danger ? "#EF4444" : "rgba(255,255,255,.86)", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15.2, lineHeight: 1.25, fontWeight: 520, letterSpacing: ".2px" }}>
          {title}
          {badge && <span style={{ fontSize: 11, fontWeight: 850, color: "#C4B5FD", background: "rgba(124,58,237,.24)", borderRadius: 4, padding: "2px 7px" }}>{badge}</span>}
        </span>
        {sub && <span style={{ display: "block", marginTop: 3, color: "rgba(255,255,255,.42)", fontSize: 10.8, fontWeight: 500, lineHeight: 1.45 }}>{sub}</span>}
      </span>
      {!danger && <span style={{ opacity: .48, transform: dir === "rtl" ? "scaleX(-1)" : "none" }}><IconChevronRight size={17} color="currentColor" /></span>}
    </button>
  );
}

function AccountLine({ title, right, onClick, accent, danger, dir }) {
  return (
    <button type="button" onClick={onClick} style={{ width: "100%", minHeight: 52, display: "flex", alignItems: "center", gap: 12, border: "none", borderBottom: "1px solid rgba(255,255,255,.075)", background: "transparent", color: danger ? "#EF4444" : accent ? "#8B5CF6" : "#F7F7FA", fontFamily: "inherit", padding: "0 0", cursor: onClick ? "pointer" : "default", textAlign: dir === "ltr" ? "left" : "right" }}>
      <span style={{ flex: 1, fontSize: 15.2, fontWeight: 520, lineHeight: 1.3 }}>{title}</span>
      {right && <span style={{ fontSize: 14.8, fontWeight: 600, color: "rgba(255,255,255,.9)", direction: "ltr" }}>{right}</span>}
      {onClick && !right && <span style={{ opacity: .8, transform: dir === "rtl" ? "scaleX(-1)" : "none" }}><IconChevronRight size={19} color="currentColor" /></span>}
    </button>
  );
}

function StatusPill({ children, tone = "muted" }) {
  const palette = {
    ok: { color: "#A7F3D0", bg: "rgba(16,185,129,.12)", border: "rgba(52,211,153,.24)" },
    warn: { color: "#FCA5A5", bg: "rgba(239,68,68,.10)", border: "rgba(239,68,68,.22)" },
    info: { color: "#C4B5FD", bg: "rgba(124,58,237,.15)", border: "rgba(167,139,250,.22)" },
    muted: { color: "rgba(255,255,255,.55)", bg: "rgba(255,255,255,.045)", border: "rgba(255,255,255,.08)" },
  }[tone] || {};
  return <span style={{ display: "inline-flex", alignItems: "center", minHeight: 22, borderRadius: 999, padding: "0 8px", border: `1px solid ${palette.border}`, background: palette.bg, color: palette.color, fontSize: 10.5, fontWeight: 900, whiteSpace: "nowrap" }}>{children}</span>;
}

function AccountInfoRow({ icon, label, value, status, statusTone, actionLabel, onClick, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 62,
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: "none",
        borderBottom: "1px solid rgba(255,255,255,.075)",
        background: "transparent",
        color: "#F7F7FA",
        fontFamily: "inherit",
        padding: "9px 0",
        cursor: "pointer",
        textAlign: dir === "ltr" ? "left" : "right",
      }}
    >
      <span style={{ width: 28, height: 28, borderRadius: 999, display: "grid", placeItems: "center", color: "rgba(255,255,255,.66)", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.055)", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13.2, fontWeight: 680, letterSpacing: ".1px", lineHeight: 1.2 }}>{label}</span>
        <span style={{ display: "block", marginTop: 5, color: value ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.36)", fontSize: 12.1, fontWeight: 560, lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", direction: label === "Google" ? "ltr" : undefined }}>{value || actionLabel}</span>
      </span>
      <span style={{ display: "grid", justifyItems: dir === "ltr" ? "end" : "start", gap: 6, flexShrink: 0 }}>
        {status && <StatusPill tone={statusTone}>{status}</StatusPill>}
        <span style={{ opacity: .6, transform: dir === "rtl" ? "scaleX(-1)" : "none", lineHeight: 1 }}><IconChevronRight size={17} color="currentColor" /></span>
      </span>
    </button>
  );
}

function AccountInput({ value, onChange, placeholder, type = "text", dir, inputMode }) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={{
        width: "100%",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 14,
        background: "rgba(255,255,255,.055)",
        color: "#F7F7FA",
        fontFamily: "inherit",
        fontSize: 13.2,
        fontWeight: 650,
        padding: "13px 13px",
        outline: "none",
        boxSizing: "border-box",
        textAlign: dir === "rtl" ? "right" : "left",
        direction: type === "email" || inputMode === "tel" ? "ltr" : dir,
      }}
    />
  );
}

function NotificationSectionTitle({ children, dir }) {
  return (
    <div
      style={{
        padding: "22px 22px 8px",
        color: "rgba(255,255,255,.52)",
        fontSize: 11.3,
        fontWeight: 950,
        letterSpacing: dir === "rtl" ? ".25px" : "1.2px",
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {children}
    </div>
  );
}

function ToggleVisual({ checked }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 52,
        height: 30,
        borderRadius: 999,
        padding: 3,
        display: "inline-flex",
        alignItems: "center",
        background: checked ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(255,255,255,.10)",
        border: checked ? "1px solid rgba(167,139,250,.22)" : "1px solid rgba(255,255,255,.05)",
        transition: "background .18s ease,border-color .18s ease",
        boxShadow: checked ? "0 0 0 1px rgba(124,58,237,.10), 0 8px 20px rgba(91,33,182,.22)" : "none",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#fff",
          transform: checked ? "translateX(22px)" : "translateX(0)",
          transition: "transform .18s cubic-bezier(.2,.8,.2,1)",
          boxShadow: "0 3px 10px rgba(0,0,0,.36)",
          display: "block",
        }}
      />
    </span>
  );
}

function NotificationToggleRow({ title, checked, onToggle, dir }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      style={{
        width: "100%",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: "none",
        borderTop: "1px solid rgba(255,255,255,.075)",
        background: "transparent",
        color: "#F7F7FA",
        fontFamily: "inherit",
        padding: "0 22px",
        cursor: "pointer",
        textAlign: dir === "ltr" ? "left" : "right",
      }}
    >
      <span style={{ flex: 1, minWidth: 0, fontSize: 13.6, fontWeight: 560, lineHeight: 1.35, letterSpacing: ".05px" }}>{title}</span>
      <ToggleVisual checked={checked} />
    </button>
  );
}

function NotificationLinkRow({ title, subtitle, onClick, dir, expanded }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: "none",
        borderTop: "1px solid rgba(255,255,255,.075)",
        background: "transparent",
        color: "#F7F7FA",
        fontFamily: "inherit",
        padding: "0 22px",
        cursor: "pointer",
        textAlign: dir === "ltr" ? "left" : "right",
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13.6, fontWeight: 560, lineHeight: 1.35, letterSpacing: ".05px" }}>{title}</span>
        {subtitle && <span style={{ display: "block", marginTop: 2, color: "rgba(255,255,255,.38)", fontSize: 10.6, fontWeight: 700, lineHeight: 1.35 }}>{subtitle}</span>}
      </span>
      <span style={{ opacity: .84, transform: `${dir === "rtl" ? "scaleX(-1) " : ""}${expanded ? "rotate(90deg)" : "rotate(0deg)"}`, transition: "transform .18s ease" }}><IconChevronRight size={19} color="currentColor" /></span>
    </button>
  );
}

function AskChatMessage({ from, text, dir }) {
  const isUser = from === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", margin: "10px 0" }}>
      <div
        style={{
          maxWidth: "86%",
          borderRadius: isUser ? "18px 18px 5px 18px" : "5px 18px 18px 18px",
          border: isUser ? "1px solid rgba(167,139,250,.24)" : "1px solid rgba(255,255,255,.16)",
          background: isUser ? "linear-gradient(135deg,rgba(124,58,237,.34),rgba(91,33,182,.22))" : "rgba(255,255,255,.035)",
          color: "#F7F7FA",
          padding: "12px 14px",
          fontSize: 13.2,
          fontWeight: 520,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          textAlign: dir === "rtl" ? "right" : "left",
          boxShadow: isUser ? "0 10px 24px rgba(91,33,182,.16)" : "none",
        }}
      >
        {text}
      </div>
    </div>
  );
}


export function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = getCurrentUser();
  const [lang, setLang] = useState(getAppLanguage());
  const t = copy[lang] || copy.ar;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "مستخدم";
  const email = user?.email || "";
  const avatar = user?.user_metadata?.avatar_url || "";
  const profileStorageKey = `driverent_profile_draft_${user?.id || user?.email || "guest"}`;
  const [profileDraft, setProfileDraft] = useState(() => {
    try {
      const saved = localStorage.getItem(profileStorageKey) || localStorage.getItem("driverent_profile_draft") || "{}";
      return JSON.parse(saved) || {};
    } catch {
      return {};
    }
  });
  const accountStorageKey = `driverent_account_info_${user?.id || user?.email || "guest"}`;
  const [accountDraft, setAccountDraft] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(accountStorageKey) || "{}") || {};
    } catch {
      return {};
    }
  });
  const notificationStorageKey = `driverent_notification_settings_${user?.id || user?.email || "guest"}`;
  const [notificationSettings, setNotificationSettings] = useState(() => {
    try {
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...(JSON.parse(localStorage.getItem(notificationStorageKey) || "{}") || {}) };
    } catch {
      return { ...DEFAULT_NOTIFICATION_SETTINGS };
    }
  });
  const transmissionStorageKey = `driverent_transmission_pref_${user?.id || user?.email || "guest"}`;
  const [preferredTransmission, setPreferredTransmission] = useState(() => localStorage.getItem(transmissionStorageKey) || "");
  const [pushSettingsOpen, setPushSettingsOpen] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");
  const [askAiInput, setAskAiInput] = useState("");
  const [askAiMessages, setAskAiMessages] = useState([]);
  const [accountEdit, setAccountEdit] = useState(null);
  const [accountForm, setAccountForm] = useState({ name: "", email: "", phone: "", code: "" });
  const [accountStatus, setAccountStatus] = useState("");
  const [accountOtpSent, setAccountOtpSent] = useState(false);
  const [photoStatus, setPhotoStatus] = useState("");
  useEffect(() => {
    localStorage.setItem(transmissionStorageKey, preferredTransmission);
  }, [preferredTransmission, transmissionStorageKey]);

  const shownAvatar = profileDraft.avatar || avatar;
  const setDraft = (key, value) => setProfileDraft((prev) => ({ ...prev, [key]: value }));
  const accountName = accountDraft.name || profileDraft.name || user?.user_metadata?.full_name || user?.user_metadata?.name || name;
  const accountEmail = accountDraft.email || email;
  const accountPhone = accountDraft.phone || user?.phone || user?.user_metadata?.phone || profileDraft.phone || "";
  const emailVerified = Boolean(user?.email_confirmed_at || user?.confirmed_at || accountDraft.emailVerified);
  const phoneVerified = Boolean(user?.phone_confirmed_at || accountDraft.phoneVerified);
  const googleConnected = Boolean(accountDraft.googleConnected || user?.app_metadata?.providers?.includes?.("google") || user?.identities?.some?.((item) => item?.provider === "google"));
  const missingAccountInfo = !accountName || !accountEmail || !accountPhone || !emailVerified || !phoneVerified;

  function openAccountEditor(kind) {
    setAccountEdit(kind);
    setAccountStatus("");
    setAccountOtpSent(false);
    setAccountForm({
      name: accountName || "",
      email: accountEmail || "",
      phone: accountPhone || "",
      code: "",
    });
  }

  function persistAccountInfo(next) {
    const clean = { ...accountDraft, ...next, updatedAt: new Date().toISOString() };
    setAccountDraft(clean);
    localStorage.setItem(accountStorageKey, JSON.stringify(clean));

    const savedProfile = { ...profileDraft };
    if (Object.prototype.hasOwnProperty.call(next, "name")) savedProfile.name = next.name;
    if (Object.prototype.hasOwnProperty.call(next, "phone")) savedProfile.phone = next.phone;
    localStorage.setItem(profileStorageKey, JSON.stringify(savedProfile));
    localStorage.setItem("driverent_profile_draft", JSON.stringify(savedProfile));
    setProfileDraft(savedProfile);

    const session = JSON.parse(localStorage.getItem("sb_session") || "null");
    if (session?.user) {
      session.user.email = clean.email || session.user.email || "";
      session.user.phone = clean.phone || session.user.phone || "";
      session.user.user_metadata = {
        ...(session.user.user_metadata || {}),
        full_name: clean.name || session.user.user_metadata?.full_name || "",
        name: clean.name || session.user.user_metadata?.name || "",
        phone: clean.phone || session.user.user_metadata?.phone || "",
      };
      localStorage.setItem("sb_session", JSON.stringify(session));
    }
    window.dispatchEvent(new Event("driverent-auth-change"));
  }

  function saveAccountField(kind = accountEdit) {
    if (kind === "name") {
      const value = String(accountForm.name || "").trim();
      if (!value) return setAccountStatus(t.fieldRequired);
      persistAccountInfo({ name: value });
    }
    if (kind === "email") {
      const value = String(accountForm.email || "").trim().toLowerCase();
      if (!value) return setAccountStatus(t.fieldRequired);
      persistAccountInfo({ email: value, emailVerified: value === accountEmail ? emailVerified : false });
    }
    if (kind === "phone") {
      const value = String(accountForm.phone || "").trim();
      if (!value) return setAccountStatus(t.fieldRequired);
      persistAccountInfo({ phone: value, phoneVerified: value === accountPhone ? phoneVerified : false });
    }
    setAccountStatus(t.saved);
    setAccountEdit(null);
    navigator.vibrate?.(12);
  }

  function verifyAccountField(kind) {
    if (kind === "email") {
      if (!String(accountForm.email || accountEmail || "").trim()) return setAccountStatus(t.passwordUnavailable);
      persistAccountInfo({ email: String(accountForm.email || accountEmail).trim().toLowerCase(), emailVerified: true });
      setAccountStatus(t.verifySent);
      navigator.vibrate?.(14);
      return;
    }
    if (kind === "phone") {
      if (!String(accountForm.phone || accountPhone || "").trim()) return setAccountStatus(t.fieldRequired);
      if (!accountOtpSent) {
        setAccountOtpSent(true);
        setAccountStatus(t.codeSent);
        navigator.vibrate?.(10);
        return;
      }
      if (!String(accountForm.code || "").trim()) return setAccountStatus(t.codeInvalid);
      persistAccountInfo({ phone: String(accountForm.phone || accountPhone).trim(), phoneVerified: true });
      setAccountStatus(t.verifySent);
      setAccountEdit(null);
      navigator.vibrate?.(16);
    }
  }

  async function sendPasswordReset() {
    const targetEmail = String(accountEmail || accountForm.email || "").trim();
    if (!targetEmail) return setAccountStatus(t.passwordUnavailable);
    try {
      await resetPassword(targetEmail);
      setAccountStatus(t.passwordSent);
    } catch (err) {
      setAccountStatus(err?.message || t.passwordSent);
    }
  }

  function connectGoogleAccount() {
    if (googleConnected) return setAccountStatus(t.googleAlready);
    try {
      signInWithOAuth("google");
    } catch (err) {
      setAccountStatus(err?.message || t.soon);
    }
  }

  function openFirstMissingAccountInfo() {
    if (!accountName) return openAccountEditor("name");
    if (!accountEmail || !emailVerified) return openAccountEditor("email");
    if (!accountPhone || !phoneVerified) return openAccountEditor("phone");
    return openAccountEditor("google");
  }

  function persistNotificationSettings(next) {
    const clean = { ...DEFAULT_NOTIFICATION_SETTINGS, ...next, updatedAt: new Date().toISOString() };
    setNotificationSettings(clean);
    localStorage.setItem(notificationStorageKey, JSON.stringify(clean));
    setNotificationStatus(t.notificationsSaved);
    window.clearTimeout(window.__driverentNotificationStatusTimer);
    window.__driverentNotificationStatusTimer = window.setTimeout(() => setNotificationStatus(""), 1600);
  }

  function toggleNotificationSetting(key) {
    persistNotificationSettings({ ...notificationSettings, [key]: !notificationSettings[key] });
    navigator.vibrate?.(10);
  }

  function getAskAiReply(rawQuestion) {
    const q = String(rawQuestion || "").toLowerCase();
    const has = (...words) => words.some((word) => q.includes(String(word).toLowerCase()));
    if (has("book", "booking", "reserve", "reservation", "حجز", "احجز", "réserver", "réservation", "ⵃⵊⵊⵣ", "ⴰⵃⵊⵊⵓⵣ")) return t.askAiBookingAnswer;
    if (has("pay", "payment", "price", "credit", "دفع", "الدفع", "سعر", "رصيد", "paiement", "payer", "prix", "crédit", "ⴰⵅⵍⵍⵚ", "ⵙⵙⵓⵎⴰ")) return t.askAiPaymentAnswer;
    if (has("cancel", "cancellation", "إلغاء", "الغاء", "ألغي", "annuler", "annulation", "ⵙⵏⴼⵙ")) return t.askAiCancelAnswer;
    if (has("verify", "verification", "email", "phone", "account", "تحقق", "توثيق", "البريد", "الهاتف", "الحساب", "vérifier", "vérification", "compte", "téléphone", "ⵙⵏⵜⵎ", "ⴰⵎⵉⴹⴰⵏ")) return t.askAiVerifyAnswer;
    if (has("agency", "contact", "message", "support", "وكالة", "الوكالة", "تواصل", "رسائل", "agence", "contacter", "message", "ⵜⵡⴰⴽⴰⵍⴰ", "ⵉⵣⵏⴰⵏ")) return t.askAiAgencyAnswer;
    if (has("search", "filter", "near", "car", "cars", "ولاية", "بحث", "فلتر", "قريب", "سيارة", "recherche", "filtre", "voiture", "près", "ⴰⵔⵣⵣⵓ", "ⵜⴰⴽⴰⵔⵓⵙⵜ")) return t.askAiSearchAnswer;
    return t.askAiFallbackAnswer;
  }

  function sendAskAiMessage(text = askAiInput) {
    const question = String(text || "").trim();
    if (!question) {
      navigator.vibrate?.(8);
      return;
    }
    const answer = getAskAiReply(question);
    setAskAiMessages((prev) => [...prev, { from: "user", text: question }, { from: "bot", text: answer }]);
    setAskAiInput("");
    navigator.vibrate?.(10);
  }

  function resetAskAiChat() {
    setAskAiMessages([]);
    setAskAiInput("");
    navigator.vibrate?.(10);
  }

  async function onPhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type?.startsWith("image/")) {
      alert("اختر ملف صورة فقط");
      return;
    }
    try {
      setPhotoStatus("جاري تجهيز الصورة...");
      const optimizedAvatar = await resizeProfilePhoto(file);
      setDraft("avatar", optimizedAvatar);
      setPhotoStatus("تم اختيار الصورة. اضغط زر الحفظ بالأسفل.");
    } catch (err) {
      setPhotoStatus("");
      alert(err?.message || "تعذر تغيير الصورة");
    } finally {
      e.target.value = "";
    }
  }
  function saveProfileDraft() {
    try {
      const cleanDraft = { ...profileDraft, savedAt: new Date().toISOString() };
      localStorage.setItem(profileStorageKey, JSON.stringify(cleanDraft));
      localStorage.setItem("driverent_profile_draft", JSON.stringify(cleanDraft));
      const session = JSON.parse(localStorage.getItem("sb_session") || "null");
      if (session?.user) {
        session.user.user_metadata = {
          ...(session.user.user_metadata || {}),
          avatar_url: cleanDraft.avatar || session.user.user_metadata?.avatar_url || "",
          profile_about: cleanDraft.about || "",
          profile_lives: cleanDraft.lives || "",
          profile_works: cleanDraft.works || "",
          profile_school: cleanDraft.school || "",
          profile_languages: cleanDraft.languages || "",
        };
        localStorage.setItem("sb_session", JSON.stringify(session));
      }
      setProfileDraft(cleanDraft);
      setPhotoStatus("تم حفظ التغييرات");
      window.dispatchEvent(new Event("driverent-auth-change"));
      navigator.vibrate?.(18);
      navigate("/profile/view");
    } catch {
      alert("فشل الحفظ. جرّب صورة أصغر أو أعد المحاولة.");
    }
  }

  useEffect(() => {
    const sync = () => setLang(getAppLanguage());
    window.addEventListener("driverent-language-change", sync);
    return () => window.removeEventListener("driverent-language-change", sync);
  }, []);

  async function handleLogout() {
    await signOut();
    window.dispatchEvent(new Event("driverent-auth-change"));
    onLogout?.();
  }

  function changeLanguage(id) {
    setLang(id);
    setAppLanguage(id);
    navigator.vibrate?.(12);
  }

  const base = { padding: "0 16px 118px", animation: "fadeUp .28s ease", color: "#F7F7FA", minHeight: "calc(100vh - 86px)" };

  if (pathname === "/profile/ask-ai") {
    const quickQuestions = Array.isArray(t.askAiQuickQuestions) ? t.askAiQuickQuestions : [];
    return (
      <div dir={dir} style={{ ...base, padding: "0 0 118px", background: "#05050A", minHeight: "calc(100vh - 86px)" }}>
        <div style={{ padding: "0 16px" }}>
          <TopBar
            title={t.askAiTitle}
            dir={dir}
            onBack={() => navigate("/profile")}
            action={
              <button type="button" aria-label={t.askAiClear} onClick={resetAskAiChat} style={{ width: 44, height: 44, border: "none", background: "transparent", color: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", cursor: "pointer" }}>
                <RefreshIcon size={23} />
              </button>
            }
          />
        </div>
        <div style={{ minHeight: "calc(100vh - 236px)", display: "flex", flexDirection: "column" }}>
          <section style={{ flex: 1, padding: "22px 24px 18px" }}>
            <AskChatMessage from="bot" text={t.askAiIntro} dir={dir} />
            {quickQuestions.length > 0 && askAiMessages.length === 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ color: "rgba(255,255,255,.42)", fontSize: 11.2, fontWeight: 900, textTransform: "uppercase", letterSpacing: dir === "rtl" ? ".2px" : "1px", marginBottom: 9 }}>{t.askAiQuickTitle}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {quickQuestions.map((item) => (
                    <button key={item} type="button" onClick={() => sendAskAiMessage(item)} style={{ border: "1px solid rgba(167,139,250,.22)", borderRadius: 999, background: "rgba(124,58,237,.12)", color: "#C4B5FD", padding: "9px 12px", fontFamily: "inherit", fontSize: 11.5, fontWeight: 850, cursor: "pointer" }}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              {askAiMessages.map((msg, index) => <AskChatMessage key={`${msg.from}-${index}`} from={msg.from} text={msg.text} dir={dir} />)}
            </div>
          </section>
          <div style={{ position: "sticky", bottom: 94, zIndex: 15, padding: "12px 24px 0", background: "linear-gradient(to top,#05050A 76%,rgba(5,5,10,0))" }}>
            <form onSubmit={(e) => { e.preventDefault(); sendAskAiMessage(); }} style={{ minHeight: 58, borderRadius: 14, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.045)", display: "flex", alignItems: "center", gap: 10, padding: "0 10px 0 14px", boxShadow: "0 18px 34px rgba(0,0,0,.25)" }}>
              <input
                value={askAiInput}
                onChange={(e) => setAskAiInput(e.target.value)}
                placeholder={t.askAiPlaceholder}
                style={{ flex: 1, minWidth: 0, height: 54, border: "none", outline: "none", background: "transparent", color: "#F7F7FA", fontFamily: "inherit", fontSize: 13.2, fontWeight: 560, textAlign: dir === "rtl" ? "right" : "left", direction: dir }}
              />
              <button type="submit" aria-label={t.askAiTitle} style={{ width: 42, height: 42, borderRadius: 999, border: "none", background: askAiInput.trim() ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(255,255,255,.08)", color: askAiInput.trim() ? "#fff" : "rgba(255,255,255,.42)", display: "grid", placeItems: "center", cursor: "pointer", transform: dir === "rtl" ? "scaleX(-1)" : "none", transition: "background .18s ease,color .18s ease" }}>
                <SendIcon size={21} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }


  if (pathname === "/profile/language") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.languageTitle || t.language} dir={dir} onBack={() => navigate("/profile")} action={null} />
        <section style={{ paddingTop: 28 }}>
          <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,.48)", fontSize: 12.5, fontWeight: 650 }}>{t.chooseLanguage || t.language}</p>
          <div style={{ display: "grid", gap: 10 }}>
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => changeLanguage(l.id)} style={{ minHeight: 54, borderRadius: 15, border: lang === l.id ? "1px solid rgba(167,139,250,.8)" : "1px solid rgba(255,255,255,.08)", background: lang === l.id ? "linear-gradient(135deg,rgba(124,58,237,.32),rgba(79,70,229,.22))" : "rgba(255,255,255,.04)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px", cursor: "pointer" }}>
                <span>{l.label}</span><span style={{ color: lang === l.id ? "#C4B5FD" : "rgba(255,255,255,.35)", direction: "ltr" }}>{l.short}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/profile/account/info") {
    const editorTitle = accountEdit === "name" ? t.name : accountEdit === "email" ? t.email : accountEdit === "phone" ? t.phone : accountEdit === "password" ? t.password : accountEdit === "google" ? t.google : "";
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.accountInfoPage || t.accountInfo} dir={dir} onBack={() => navigate("/profile/account")} action={null} />
        <section style={{ paddingTop: 22 }}>
          {missingAccountInfo && (
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", borderRadius: 20, background: "linear-gradient(135deg,rgba(124,58,237,.28),rgba(59,130,246,.16))", border: "1px solid rgba(167,139,250,.18)", padding: 14, marginBottom: 18, boxShadow: "0 14px 42px rgba(0,0,0,.16)" }}>
              <span style={{ width: 34, height: 34, borderRadius: 999, display: "grid", placeItems: "center", flexShrink: 0, background: "rgba(255,255,255,.12)", color: "#C4B5FD" }}><IconAlert size={18} color="currentColor" /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: 13.8, fontWeight: 950, lineHeight: 1.25 }}>{t.infoNoticeTitle}</h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,.72)", fontSize: 11.8, fontWeight: 520, lineHeight: 1.62 }}>{t.infoNoticeText}</p>
                <button type="button" onClick={openFirstMissingAccountInfo} style={{ marginTop: 12, minHeight: 36, border: "1px solid rgba(255,255,255,.14)", borderRadius: 11, background: "rgba(0,0,0,.28)", color: "#F7F7FA", padding: "0 14px", fontFamily: "inherit", fontSize: 12.2, fontWeight: 900, cursor: "pointer" }}>{t.submitInfo}</button>
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.015)" }}>
            <AccountInfoRow dir={dir} icon={<IconGlyph name="profile" size={17} strokeWidth={1.9} />} label={t.name} value={accountName} actionLabel={t.add} status={!accountName ? t.missing : null} statusTone="warn" onClick={() => openAccountEditor("name")} />
            <AccountInfoRow dir={dir} icon={<IconGlyph name="document" size={17} strokeWidth={1.9} />} label={t.email} value={accountEmail} actionLabel={t.add} status={accountEmail ? (emailVerified ? t.verified : t.notVerified) : t.missing} statusTone={accountEmail ? (emailVerified ? "ok" : "warn") : "warn"} onClick={() => openAccountEditor("email")} />
            <AccountInfoRow dir={dir} icon={<IconPhone size={17} color="currentColor" strokeWidth={1.9} />} label={t.phone} value={accountPhone} actionLabel={t.add} status={accountPhone ? (phoneVerified ? t.verified : t.notVerified) : t.missing} statusTone={accountPhone ? (phoneVerified ? "ok" : "warn") : "warn"} onClick={() => openAccountEditor("phone")} />
            <AccountInfoRow dir={dir} icon={<IconLock size={17} color="currentColor" strokeWidth={1.9} />} label={t.password} value={accountEmail ? t.passwordHidden : ""} actionLabel={t.add} onClick={() => openAccountEditor("password")} />
            <AccountInfoRow dir={dir} icon={<IconGoogle size={17} />} label={t.google} value={googleConnected ? t.connected : ""} actionLabel={t.notConnected} status={googleConnected ? t.connected : t.notConnected} statusTone={googleConnected ? "ok" : "muted"} onClick={() => openAccountEditor("google")} />
          </div>

          {accountEdit && (
            <div style={{ marginTop: 18, borderRadius: 22, background: "linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.035))", border: "1px solid rgba(255,255,255,.09)", padding: 15, boxShadow: "0 20px 60px rgba(0,0,0,.28)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 13 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 14.2, fontWeight: 950, lineHeight: 1.3 }}>{editorTitle}</h2>
                  {accountEdit === "email" && <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.45)", fontSize: 11.3, lineHeight: 1.55 }}>{t.emailVerifyHelp}</p>}
                  {accountEdit === "phone" && <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.45)", fontSize: 11.3, lineHeight: 1.55 }}>{t.phoneVerifyHelp}</p>}
                  {accountEdit === "password" && <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.45)", fontSize: 11.3, lineHeight: 1.55 }}>{t.passwordHelp}</p>}
                  {accountEdit === "google" && <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.45)", fontSize: 11.3, lineHeight: 1.55 }}>{googleConnected ? t.googleAlready : t.googleHelp}</p>}
                </div>
                <button type="button" onClick={() => { setAccountEdit(null); setAccountStatus(""); }} style={{ width: 34, height: 34, borderRadius: 999, border: "1px solid rgba(255,255,255,.09)", background: "rgba(0,0,0,.18)", color: "rgba(255,255,255,.72)", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}><IconClose size={14} color="currentColor" /></button>
              </div>

              <div style={{ display: "grid", gap: 11 }}>
                {accountEdit === "name" && <AccountInput dir={dir} value={accountForm.name} placeholder={t.enterName} onChange={(e)=>setAccountForm(p=>({ ...p, name: e.target.value }))} />}
                {accountEdit === "email" && <AccountInput dir={dir} type="email" value={accountForm.email} placeholder={t.enterEmail} onChange={(e)=>setAccountForm(p=>({ ...p, email: e.target.value }))} />}
                {accountEdit === "phone" && <AccountInput dir={dir} inputMode="tel" value={accountForm.phone} placeholder={t.enterPhone} onChange={(e)=>setAccountForm(p=>({ ...p, phone: e.target.value }))} />}
                {accountEdit === "phone" && accountOtpSent && <AccountInput dir={dir} inputMode="numeric" value={accountForm.code} placeholder={t.codePlaceholder} onChange={(e)=>setAccountForm(p=>({ ...p, code: e.target.value }))} />}
                {accountEdit === "password" && <div style={{ minHeight: 46, borderRadius: 14, background: "rgba(0,0,0,.16)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 13px", color: "rgba(255,255,255,.82)", fontSize: 13.2, fontWeight: 750, direction: "ltr" }}>{accountEmail || "—"}<span>{t.passwordHidden}</span></div>}
                {accountEdit === "google" && <div style={{ minHeight: 52, borderRadius: 15, background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 12, padding: "0 13px", color: "rgba(255,255,255,.86)", fontSize: 13.2, fontWeight: 820 }}><IconGoogle size={20} /><span>{googleConnected ? t.connected : t.notConnected}</span></div>}
              </div>

              {accountStatus && <p style={{ margin: "12px 0 0", color: accountStatus === t.saved || accountStatus === t.verifySent || accountStatus === t.passwordSent || accountStatus === t.codeSent ? "#C4B5FD" : "#FCA5A5", fontSize: 11.7, fontWeight: 820, lineHeight: 1.5 }}>{accountStatus}</p>}

              <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
                {(accountEdit === "name" || accountEdit === "email" || accountEdit === "phone") && <button type="button" onClick={() => saveAccountField(accountEdit)} style={{ flex: 1, minHeight: 46, border: "none", borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 12.8, fontWeight: 950, cursor: "pointer" }}>{t.saveChanges}</button>}
                {accountEdit === "email" && <button type="button" onClick={() => verifyAccountField("email")} style={{ flex: 1, minHeight: 46, border: "1px solid rgba(167,139,250,.38)", borderRadius: 14, background: "rgba(124,58,237,.15)", color: "#C4B5FD", fontFamily: "inherit", fontSize: 12.8, fontWeight: 950, cursor: "pointer" }}>{t.verify}</button>}
                {accountEdit === "phone" && <button type="button" onClick={() => verifyAccountField("phone")} style={{ flex: 1, minHeight: 46, border: "1px solid rgba(167,139,250,.38)", borderRadius: 14, background: "rgba(124,58,237,.15)", color: "#C4B5FD", fontFamily: "inherit", fontSize: 12.8, fontWeight: 950, cursor: "pointer" }}>{accountOtpSent ? t.confirmCode : t.sendCode}</button>}
                {accountEdit === "password" && <button type="button" onClick={sendPasswordReset} style={{ flex: 1, minHeight: 46, border: "none", borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 12.8, fontWeight: 950, cursor: "pointer" }}>{t.sendPasswordLink}</button>}
                {accountEdit === "google" && <button type="button" onClick={connectGoogleAccount} style={{ flex: 1, minHeight: 46, border: "none", borderRadius: 14, background: googleConnected ? "rgba(255,255,255,.08)" : "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 12.8, fontWeight: 950, cursor: "pointer" }}>{googleConnected ? t.connected : t.connectGoogle}</button>}
                <button type="button" onClick={() => { setAccountEdit(null); setAccountStatus(""); }} style={{ minWidth: 88, minHeight: 46, border: "1px solid rgba(255,255,255,.10)", borderRadius: 14, background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.72)", fontFamily: "inherit", fontSize: 12.8, fontWeight: 900, cursor: "pointer" }}>{t.cancel}</button>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  if (pathname === "/profile/account/notifications") {
    const hasAnyPush = Boolean(notificationSettings.pushTrips || notificationSettings.pushMessages || notificationSettings.pushPromotions);
    return (
      <div dir={dir} style={{ ...base, padding: "0 0 118px", background: "#05050A" }}>
        <div style={{ padding: "0 16px" }}>
          <TopBar title={t.notificationsPage || t.notificationSettings} dir={dir} onBack={() => navigate("/profile/account")} action={null} />
        </div>
        <section style={{ paddingTop: 18 }}>
          <NotificationSectionTitle dir={dir}>{t.mobileNotifications}</NotificationSectionTitle>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,.075)" }}>
            <NotificationToggleRow dir={dir} title={t.tripAccountSms} checked={Boolean(notificationSettings.tripAccountSms)} onToggle={() => toggleNotificationSetting("tripAccountSms")} />
            <NotificationToggleRow dir={dir} title={t.promotionsDealsSms} checked={Boolean(notificationSettings.promotionsSms)} onToggle={() => toggleNotificationSetting("promotionsSms")} />
            <NotificationLinkRow dir={dir} title={t.pushNotifications} subtitle={pushSettingsOpen ? (hasAnyPush ? t.enabled : t.disabled) : ""} expanded={pushSettingsOpen} onClick={() => setPushSettingsOpen((v) => !v)} />
            {pushSettingsOpen && (
              <div style={{ margin: "0 22px 12px", borderRadius: 16, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.075)", overflow: "hidden", animation: "fadeScale .18s ease" }}>
                <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid rgba(255,255,255,.065)" }}>
                  <h2 style={{ margin: 0, fontSize: 12.5, fontWeight: 950, lineHeight: 1.35 }}>{t.pushSettingsTitle}</h2>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.44)", fontSize: 10.6, fontWeight: 600, lineHeight: 1.55 }}>{t.pushNotificationsHelp}</p>
                </div>
                <NotificationToggleRow dir={dir} title={t.bookingReminders} checked={Boolean(notificationSettings.pushTrips)} onToggle={() => toggleNotificationSetting("pushTrips")} />
                <NotificationToggleRow dir={dir} title={t.messagesNotifications} checked={Boolean(notificationSettings.pushMessages)} onToggle={() => toggleNotificationSetting("pushMessages")} />
                <NotificationToggleRow dir={dir} title={t.dealsPushNotifications} checked={Boolean(notificationSettings.pushPromotions)} onToggle={() => toggleNotificationSetting("pushPromotions")} />
              </div>
            )}
          </div>
        </section>
        <section>
          <NotificationSectionTitle dir={dir}>{t.emailNotifications}</NotificationSectionTitle>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,.075)" }}>
            <NotificationToggleRow dir={dir} title={t.promotionsAnnouncementsEmail} checked={Boolean(notificationSettings.promotionsEmail)} onToggle={() => toggleNotificationSetting("promotionsEmail")} />
          </div>
        </section>
        {notificationStatus && (
          <div style={{ position: "fixed", left: 18, right: 18, bottom: 104, zIndex: 40, minHeight: 42, borderRadius: 14, background: "rgba(20,20,28,.94)", border: "1px solid rgba(167,139,250,.18)", color: "#C4B5FD", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 900, boxShadow: "0 16px 40px rgba(0,0,0,.38)", pointerEvents: "none" }}>
            {notificationStatus}
          </div>
        )}
      </div>
    );
  }

  if (pathname === "/profile/account/transmission") {
    const title = t.transmissionPage || t.transmission;
    return (
      <div dir={dir} style={{ ...base, background: "#020203", padding: "0 0 120px" }}>
        <TopBar title={title} dir={dir} onBack={() => navigate("/profile/account")} action={null} />
        <section style={{ paddingTop: 14 }}>
          <div style={{ color: "rgba(255,255,255,.9)", fontSize: 16.5, lineHeight: 1.7, marginBottom: 18 }}>
            {t.transmissionQuestion}
          </div>

          {[["manual", t.transmissionYes], ["automatic", t.transmissionNo]].map(([value, label]) => {
            const active = preferredTransmission === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setPreferredTransmission(value)}
                style={{
                  width: "100%",
                  minHeight: 72,
                  padding: "0 2px",
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,.08)",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  color: "#fff",
                  fontFamily: "inherit",
                  textAlign: dir === "rtl" ? "right" : "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ flex: 1, fontSize: 16, lineHeight: 1.55 }}>{label}</span>
                <span style={{ width: 24, height: 24, borderRadius: 999, border: `2px solid ${active ? "#7C3AED" : "rgba(167,139,250,.7)"}`, display: "grid", placeItems: "center", transition: "all .18s ease" }}>
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: active ? "#7C3AED" : "transparent", transition: "all .18s ease" }} />
                </span>
              </button>
            );
          })}
        </section>
      </div>
    );
  }

  if (pathname === "/profile/view") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.profile} dir={dir} onBack={() => navigate("/profile")} action={<button type="button" onClick={() => navigate("/profile/edit")} style={{ width: 44, height: 44, border: "none", background: "transparent", color: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", cursor: "pointer" }}><PencilIcon /></button>} />
        <section style={{ textAlign: "center", padding: "28px 0 54px" }}>
          <UserAvatar avatar={shownAvatar} name={name} size={104} />
          <h1 style={{ margin: "22px 0 8px", fontSize: 30, fontWeight: 950, lineHeight: 1.05 }}>{name}</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,.86)", fontSize: 16.4, fontWeight: 440 }}>{t.joined}</p>
        </section>
        <section>
          <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12.5, fontWeight: 950, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 10 }}>{t.verifiedInfo}</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.09)", borderBottom: "1px solid rgba(255,255,255,.09)", minHeight: 64, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ flex: 1, fontSize: 15.3, fontWeight: 440 }}>{t.emailAddress}</span>
            <span style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid rgba(139,92,246,.85)", display: "grid", placeItems: "center", color: "#8B5CF6" }}><IconSuccess size={18} color="currentColor" /></span>
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/profile/edit") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={name} dir={dir} onBack={() => navigate("/profile/view")} action={null} />
        <section style={{ paddingTop: 26 }}>
          <label style={{ width: "100%", minHeight: 62, border: "none", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", background: "transparent", color: "#F7F7FA", display: "flex", alignItems: "center", gap: 12, fontFamily: "inherit", cursor: "pointer", textAlign: dir === "ltr" ? "left" : "right" }}>
            <span style={{ flex: 1, fontSize: 13.4, fontWeight: 520 }}>{t.changePhoto}</span>
            <input type="file" accept="image/*" onChange={onPhotoChange} style={{ display: "none" }} />
            <span style={{ transform: dir === "rtl" ? "scaleX(-1)" : "none", opacity: .85 }}><IconChevronRight size={18} color="currentColor" /></span>
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0 10px" }}>
            <UserAvatar avatar={shownAvatar} name={name} size={58} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, color: "rgba(255,255,255,.58)", fontSize: 11.8, fontWeight: 430, lineHeight: 1.65 }}>{t.photoHelp}</p>
              {photoStatus && <p style={{ margin: "6px 0 0", color: "#C4B5FD", fontSize: 11.4, fontWeight: 850 }}>{photoStatus}</p>}
            </div>
          </div>

          <label style={{ display: "block", color: "#F7F7FA", fontSize: 13.2, fontWeight: 600, marginBottom: 8 }}>{t.about}</label>
          <textarea value={profileDraft.about || ""} onChange={(e)=>setDraft("about", e.target.value)} style={{ width: "100%", height: 116, borderRadius: 11, border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.12)", color: "#fff", fontFamily: "inherit", fontSize: 12.5, padding: 12, outline: "none", resize: "none" }} />
          <p style={{ margin: "12px 0 26px", color: "rgba(255,255,255,.58)", fontSize: 11.5, fontWeight: 430, lineHeight: 1.55 }}>{t.aboutHelp}</p>

          {[["lives", t.lives], ["works", t.works], ["school", t.school], ["languages", t.languages]].map(([key, label]) => (
            <label key={key} style={{ display: "grid", gap: 6, borderTop: "1px solid rgba(255,255,255,.08)", padding: "13px 0" }}>
              <span style={{ color: "rgba(255,255,255,.86)", fontSize: 13.2, fontWeight: 520 }}>{label}</span>
              <input value={profileDraft[key] || ""} onChange={(e)=>setDraft(key, e.target.value)} style={{ width: "100%", border: "1px solid rgba(255,255,255,.10)", borderRadius: 12, background: "rgba(255,255,255,.045)", color: "#fff", fontFamily: "inherit", fontSize: 12.8, padding: "11px 12px", outline: "none" }} />
            </label>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
        </section>
        <div style={{ position: "sticky", bottom: 96, paddingTop: 24, background: "linear-gradient(to top,#05050A 70%,rgba(5,5,10,0))" }}>
          <button type="button" onClick={saveProfileDraft} style={{ width: "100%", minHeight: 54, border: "none", borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 950, cursor: "pointer" }}>{t.save}</button>
        </div>
      </div>
    );
  }

  if (pathname === "/profile/account") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.accountTitle} dir={dir} onBack={() => navigate("/profile")} action={null} />
        <section style={{ paddingTop: 38 }}>
          <AccountLine dir={dir} title={t.accountInfo} onClick={() => navigate("/profile/account/info")} />
          <AccountLine dir={dir} title={t.notificationSettings} onClick={() => navigate("/profile/account/notifications")} />
        </section>
        <section style={{ paddingTop: 30 }}>
          <AccountLine dir={dir} title={t.travelCredit} right={t.creditValue} />
          <AccountLine dir={dir} title={t.redeemGift} accent onClick={() => alert(t.soon)} />
          <AccountLine dir={dir} title={t.addCredit} accent onClick={() => alert(t.soon)} />
        </section>
        <section style={{ paddingTop: 30 }}>
          <AccountLine dir={dir} title={t.transmission} onClick={() => navigate("/profile/account/transmission")} />
        </section>
        <button type="button" onClick={handleLogout} style={{ width: "100%", minHeight: 58, border: "none", borderRadius: 12, marginTop: 54, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 15.5, fontWeight: 950, cursor: "pointer" }}>{t.logout}</button>
        <button type="button" onClick={() => alert(t.soon)} style={{ width: "100%", border: "none", background: "transparent", color: "#EF4444", fontFamily: "inherit", fontSize: 15.2, fontWeight: 900, marginTop: 34, cursor: "pointer" }}>{t.closeAccount}</button>
      </div>
    );
  }

  return (
    <div dir={dir} className="compact-text" style={{ padding: "8px 18px 126px", animation: "fadeUp .28s ease", color: "#F7F7FA" }}>
      <section style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0 22px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 20 }}>
        <UserAvatar avatar={shownAvatar} name={name} size={66} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 18.5, fontWeight: 900, lineHeight: 1.12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</h1>
          <button type="button" onClick={() => navigate("/profile/view")} style={{ border: "none", background: "transparent", padding: "5px 0 0", color: "#8B5CF6", fontFamily: "inherit", fontSize: 13.8, fontWeight: 500, letterSpacing: ".5px", cursor: "pointer" }}>{t.edit}</button>
        </div>
      </section>

      <section style={{ margin: "0 0 28px", borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,.11)", border: "1px solid rgba(255,255,255,.06)", display: "grid", gridTemplateColumns: "1.18fr .82fr", minHeight: 152 }}>
        <div style={{ padding: "16px 15px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16.8, fontWeight: 900, lineHeight: 1.22 }}>{t.partnerTitle}</h2>
            <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,.78)", fontSize: 12.6, fontWeight: 430, lineHeight: 1.55 }}>{t.partnerText}</p>
          </div>
          <button type="button" onClick={() => alert(t.soon)} style={{ border: "none", borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", padding: "10px 16px", fontFamily: "inherit", fontSize: 12.5, fontWeight: 850 }}>{t.learn}</button>
        </div>
        <div style={{ minHeight: 152, background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(255,255,255,.05))", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=84" alt="partner" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: .9 }} />
        </div>
      </section>

      <section>
        <MoreRow dir={dir} icon={<IconGlyph name="profile" size={22} color="currentColor" strokeWidth={1.8} />} title={t.account} onClick={() => navigate("/profile/account")} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "14px 0 22px" }} />

        <MoreRow dir={dir} icon={<IconLanguage size={22} color="currentColor" strokeWidth={1.8} />} title={t.language} onClick={() => navigate("/profile/language")} />

        <MoreRow dir={dir} icon={<IconSpark size={22} color="currentColor" strokeWidth={1.8} />} title={t.askAiTitle} badge="AI" onClick={() => navigate("/profile/ask-ai")} />
        <MoreRow dir={dir} icon={<IconCar size={22} color="currentColor" strokeWidth={1.8} />} title={t.why} onClick={() => alert(t.soon)} />
        <MoreRow dir={dir} icon={<IconSupport size={22} color="currentColor" strokeWidth={1.8} />} title={t.support} onClick={() => alert(t.soon)} />
        <MoreRow dir={dir} icon={<IconDocument size={22} color="currentColor" strokeWidth={1.8} />} title={t.legal} onClick={() => alert(t.soon)} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "18px 0 8px" }} />
        <MoreRow dir={dir} danger icon={<IconLogin size={22} color="currentColor" strokeWidth={1.8} />} title={t.logout} onClick={handleLogout} />
      </section>

      <div style={{ marginTop: 18, textAlign: "center", color: "rgba(255,255,255,.28)", fontSize: 11.2, fontWeight: 700 }}>
        Version {VERSION}
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
          <img
            src="/Asirem.png"
            alt="Asirem CORP."
            data-no-i18n="true"
            width={1536}
            height={1024}
            style={{ width: "110px", height: "auto", display: "block", objectFit: "contain", opacity: .75 }}
          />
        </div>
      </div>
    </div>
  );
}
