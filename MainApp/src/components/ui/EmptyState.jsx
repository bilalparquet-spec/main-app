/**
 * EmptyState — حالات الفراغ لـ DriveRENT
 * جميع الأيقونات SVG بلون #7C3AED الموحد للمنصة
 */

// SVG Icons موحدة بلون البنفسجي
const SVG_ICONS = {
  favorites: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
    </svg>
  ),
  trips: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/>
      <path d="M9 3v15"/>
      <path d="M15 6v15"/>
    </svg>
  ),
  messages: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H8l-4 4V5Z"/>
    </svg>
  ),
  search: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 21-4.3-4.3"/>
      <path d="M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/>
    </svg>
  ),
  results: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14l-1.5-5.5A3 3 0 0 0 14.6 9H9.4a3 3 0 0 0-2.9 2.5L5 17Z"/>
      <path d="M7 17v2"/><path d="M17 17v2"/><path d="M7.5 13h9"/>
    </svg>
  ),
};

export function EmptyState({ variant = "favorites", query, onAction, appLang = "ar" }) {
  const cfg = CONFIGS[variant] || CONFIGS.favorites;
  const icon = SVG_ICONS[variant] || SVG_ICONS.results;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      textAlign: "center",
      animation: "fadeUp .35s ease both",
      minHeight: 320,
    }}>
      {/* أيقونة مع توهج */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <div style={{
          position: "absolute",
          inset: -20,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          animation: "glow 3s ease infinite",
        }}/>
        <div style={{
          width: 80, height: 80,
          borderRadius: 26,
          background: `rgba(${cfg.colorRgb}, .08)`,
          border: `1px solid rgba(${cfg.colorRgb}, .18)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "float 3s ease infinite",
        }}>
          {icon}
        </div>
      </div>

      {/* العنوان */}
      <h3 style={{
        fontSize: 18,
        fontWeight: 900,
        color: "#F1F5F9",
        margin: "0 0 8px",
        lineHeight: 1.3,
      }}>
        {variant === "search" && query
          ? `لا نتائج لـ "${query}"`
          : cfg.title[appLang] || cfg.title.ar
        }
      </h3>

      {/* الوصف */}
      <p style={{
        fontSize: 13.5,
        color: "rgba(255,255,255,.45)",
        lineHeight: 1.75,
        margin: "0 0 28px",
        maxWidth: 260,
      }}>
        {cfg.desc[appLang] || cfg.desc.ar}
      </p>

      {/* زر الإجراء */}
      {onAction && (
        <button
          onClick={onAction}
          style={{
            border: "none",
            borderRadius: 14,
            padding: "13px 28px",
            background: `linear-gradient(135deg, #7C3AED, #6D28D9)`,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(124,58,237,.3)",
            transition: "transform .15s",
          }}
          onTouchStart={e => e.currentTarget.style.transform = "scale(.97)"}
          onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {cfg.action[appLang] || cfg.action.ar}
        </button>
      )}
    </div>
  );
}

// ── إعدادات كل variant ────────────────────────────────────────────────────────
const CONFIGS = {
  favorites: {
    colorRgb: "167,139,250",
    glow: "rgba(124,58,237,.12)",
    title: { ar: "لا توجد مفضلات بعد", fr: "Aucun favori", en: "No favorites yet" },
    desc:  { ar: "احفظ السيارات التي تعجبك بالضغط على قلب السيارة", fr: "Sauvegardez vos voitures préférées", en: "Save cars you like by tapping the heart" },
    action:{ ar: "استكشف السيارات", fr: "Explorer", en: "Explore cars" },
  },
  trips: {
    colorRgb: "52,211,153",
    glow: "rgba(16,185,129,.1)",
    title: { ar: "لا توجد رحلات بعد", fr: "Aucun trajet", en: "No trips yet" },
    desc:  { ar: "رحلاتك وحجوزاتك ستظهر هنا بعد أول حجز", fr: "Vos trajets apparaîtront ici après votre première réservation", en: "Your trips will appear here after your first booking" },
    action:{ ar: "احجز سيارة الآن", fr: "Réserver", en: "Book a car" },
  },
  messages: {
    colorRgb: "96,165,250",
    glow: "rgba(59,130,246,.1)",
    title: { ar: "لا توجد رسائل بعد", fr: "Aucun message", en: "No messages yet" },
    desc:  { ar: "تواصل مع الوكالات مباشرةً من صفحة السيارة", fr: "Contactez les agences depuis la page de la voiture", en: "Contact agencies directly from the car page" },
    action:{ ar: "استكشف السيارات", fr: "Explorer", en: "Explore cars" },
  },
  search: {
    colorRgb: "167,139,250",
    glow: "rgba(124,58,237,.1)",
    title: { ar: "لا توجد نتائج", fr: "Aucun résultat", en: "No results" },
    desc:  { ar: "جرب كلمات مختلفة أو تصفح حسب النوع", fr: "Essayez d'autres termes ou parcourez par type", en: "Try different keywords or browse by type" },
    action:{ ar: "مسح البحث", fr: "Effacer", en: "Clear search" },
  },
  results: {
    colorRgb: "167,139,250",
    glow: "rgba(124,58,237,.1)",
    title: { ar: "لا توجد سيارات متاحة", fr: "Aucune voiture disponible", en: "No cars available" },
    desc:  { ar: "جرب تغيير الفلاتر أو اختر ولاية مختلفة", fr: "Essayez de modifier les filtres", en: "Try changing filters or a different region" },
    action:{ ar: "إزالة الفلاتر", fr: "Réinitialiser", en: "Clear filters" },
  },
};
