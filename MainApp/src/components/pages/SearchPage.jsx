import { useMemo, useState } from "react";
import { IconBack, IconSearchSm, IconClose, IconPin, IconCalendar, IconFilter } from "../ui/AppIcons.jsx";
import { Stars } from "../ui/Stars.jsx";

const fallbackImg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20900%20520%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%231c1b32%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237c3aed%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22900%22%20height%3D%22520%22%20fill%3D%22url%28%23g%29%22/%3E%3Cpath%20d%3D%22M205%20335h490l-48-118c-12-31-42-51-75-51H336c-34%200-64%2020-77%2051l-54%20118Z%22%20fill%3D%22%23ddd6fe%22%20fill-opacity%3D%22.22%22/%3E%3Ccircle%20cx%3D%22310%22%20cy%3D%22352%22%20r%3D%2244%22%20fill%3D%22%2307080f%22/%3E%3Ccircle%20cx%3D%22590%22%20cy%3D%22352%22%20r%3D%2244%22%20fill%3D%22%2307080f%22/%3E%3Cpath%20d%3D%22M325%20214h245l31%2077H282l43-77Z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%22.15%22/%3E%3C/svg%3E";

const i18n = {
  ar: {
    where: "أين",
    wherePlaceholder: "الولاية، المدينة أو اسم السيارة",
    when: "متى",
    whenPlaceholder: "أضف التاريخ أو الشهر",
    search: "بحث",
    clear: "مسح",
    results: "نتائج البحث",
    allCars: "كل السيارات المتاحة",
    noCars: "لا توجد سيارات",
    noCarsSub: "جرّب تغيير الولاية أو التاريخ أو البحث باسم سيارة أخرى.",
    today: "اليوم",
    weekend: "نهاية الأسبوع",
    month: "هذا الشهر",
    nearMe: "قريب مني",
    day: "دج/يوم",
    cars: "سيارة",
  },
  fr: {
    where: "Où",
    wherePlaceholder: "Wilaya, ville ou nom de voiture",
    when: "Quand",
    whenPlaceholder: "Ajouter une date ou un mois",
    search: "Rechercher",
    clear: "Effacer",
    results: "Résultats de recherche",
    allCars: "Toutes les voitures disponibles",
    noCars: "Aucune voiture trouvée",
    noCarsSub: "Essayez une autre wilaya, une autre date ou un autre modèle.",
    today: "Aujourd’hui",
    weekend: "Week-end",
    month: "Ce mois-ci",
    nearMe: "Près de moi",
    day: "DZD/jour",
    cars: "voitures",
  },
  en: {
    where: "Where",
    wherePlaceholder: "Wilaya, city, or car name",
    when: "When",
    whenPlaceholder: "Add dates or months",
    search: "Search",
    clear: "Clear",
    results: "Search results",
    allCars: "All available cars",
    noCars: "No cars found",
    noCarsSub: "Try changing your location, date, or searching for another car.",
    today: "Today",
    weekend: "Weekend",
    month: "This month",
    nearMe: "Near me",
    day: "DZD/day",
    cars: "cars",
  },
  tz: {
    where: "ⴰⵏⴷⴰ",
    wherePlaceholder: "ⵜⴰⵡⵉⵍⴰⵢⵜ، ⵜⴰⵎⴷⵉⵏⵜ ⵏⵖ ⵉⵙⵎ ⵏ ⵓⵙⵉⴷ",
    when: "ⵎⴰⵍⵎⵉ",
    whenPlaceholder: "ⵔⵏⵓ ⴰⵣⵎⵣ ⵏⵖ ⴰⵢⵢⵓⵔ",
    search: "ⵔⵣⵓ",
    clear: "ⵙⴼⴹ",
    results: "ⵉⴳⵎⴰⴹ ⵏ ⵓⵔⵣⵣⵓ",
    allCars: "ⴰⴽⴽ ⵉⵙⵉⴷⵏ ⵉⵍⵍⴰⵏ",
    noCars: "ⵓⵍⴰⵛ ⵉⵙⵉⴷⵏ",
    noCarsSub: "ⵄⵔⴹ ⵜⴰⵡⵉⵍⴰⵢⵜ ⵏⵖ ⴰⵣⵎⵣ ⵏⵏⵉⴹⵏ.",
    today: "ⴰⵙⵙⴰ",
    weekend: "ⵜⴰⴳⴳⴰⵔⴰ ⵏ ⴷⴷⵓⵔⵜ",
    month: "ⴰⵢⵢⵓⵔ ⴰⴷ",
    nearMe: "ⵇⵔⵉⴱ",
    day: "DZD/ⴰⵙⵙ",
    cars: "ⵉⵙⵉⴷⵏ",
  },
};

const tFor = (lang) => i18n[lang] || i18n.ar;

function NoCarsIllustration() {
  return (
    <div style={{ position: "relative", width: "min(72vw, 360px)", height: 170, margin: "12px auto 22px", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "10%", right: "10%", bottom: 0, height: 118, borderRadius: "50% 50% 24px 24px", background: "linear-gradient(135deg,rgba(91,75,255,.42),rgba(49,46,129,.5))" }} />
      <div style={{ position: "absolute", left: "50%", bottom: 12, width: 3, height: 118, background: "linear-gradient(to bottom,rgba(255,255,255,.3) 0 48%,transparent 48% 58%,rgba(255,255,255,.3) 58% 100%)", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", right: "18%", bottom: 70, width: 70, height: 32, borderRadius: 999, background: "repeating-linear-gradient(45deg,rgba(255,255,255,.17) 0 5px,transparent 5px 10px)", opacity: .55 }} />
      <div style={{ position: "absolute", left: "16%", bottom: 58, width: 76, height: 3, borderRadius: 99, background: "rgba(255,255,255,.16)" }} />
    </div>
  );
}

function SearchCarRow({ car, onOpenCar, index, lang }) {
  const t = tFor(lang);
  const [img, setImg] = useState(car?.img || car?.image || car?.images?.[0] || fallbackImg);
  const [loaded, setLoaded] = useState(false);
  return (
    <button onClick={() => onOpenCar?.(car)} className="btn-press" style={{ width: "100%", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.035)", borderRadius: 20, padding: 10, display: "flex", gap: 12, alignItems: "center", color: "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "start", animation: `fadeUp .28s ease ${Math.min(index, 6) * .04}s both` }}>
      <div style={{ width: 96, height: 74, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative", background: "#0B0C15" }}>
        {!loaded && <div className="skel" style={{ position: "absolute", inset: 0, borderRadius: 0 }} />}
        <img src={img} alt={car?.name || "car"} onLoad={() => setLoaded(true)} onError={() => { setLoaded(true); setImg(fallbackImg); }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div data-no-i18n="true" style={{ fontSize: 14.5, fontWeight: 950, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{car?.name || "Car"}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.42)", fontSize: 11, margin: "3px 0 6px" }}>
          <IconPin size={10} color="rgba(255,255,255,.42)" />
          <span>{car?.city || car?.wilaya || "Alger"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <Stars r={Number(car?.rating || 0)} size={10} />
          <span style={{ color: "#C084FC", fontSize: 13.5, fontWeight: 950 }}>{Number(car?.price || 0).toLocaleString("fr-DZ")} <small style={{ color: "rgba(255,255,255,.35)", fontWeight: 700 }}>{t.day}</small></span>
        </div>
      </div>
    </button>
  );
}

export function SearchPage({ cars = [], onBack, onOpenCar, appLang = "ar", userWilaya }) {
  const t = tFor(appLang);
  const [where, setWhere] = useState(userWilaya || "");
  const [when, setWhen] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const allCars = Array.isArray(cars) ? cars.filter(Boolean) : [];
  const normalizedQuery = where.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return allCars;
    return allCars.filter((car) => {
      const hay = [car?.name, car?.wilaya, car?.city, car?.type, car?.badge, car?.agencyName].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [allCars, normalizedQuery]);

  const hasFilters = where.trim() || when.trim();
  const canShowResults = submitted || hasFilters;
  const title = t.results;

  const submitSearch = () => {
    setSubmitted(true);
    setShowSuggestions(false);
    setShowDates(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setWhere("");
    setWhen("");
    setSubmitted(false);
    setShowSuggestions(false);
    setShowDates(false);
  };

  const dateChips = [t.today, t.weekend, t.month];
  const suggestionChips = userWilaya ? [t.nearMe] : [];

  return (
    <div style={{ minHeight: "72vh", padding: "4px 0 108px", animation: "pageSlideIn .25s ease", color: "#F1F5F9" }}>
      <section style={{ borderRadius: 22, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 24px 90px rgba(0,0,0,.34)", padding: "14px 14px 15px", marginBottom: 14 }}>
        <button onClick={onBack} aria-label="back" style={{ width: 34, height: 34, borderRadius: 13, background: "transparent", border: "none", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", marginBottom: 5 }}>
          <IconBack size={20} color="rgba(255,255,255,.78)" />
        </button>

        <label style={{ display: "block", color: "rgba(255,255,255,.86)", fontSize: 13.5, fontWeight: 850, marginBottom: 5 }}>{t.where}</label>
        <div style={{ position: "relative", marginBottom: 9 }}>
          <IconSearchSm size={13} color="rgba(255,255,255,.34)" style={{ position: "absolute", top: "50%", insetInlineStart: 12, transform: "translateY(-50%)" }} />
          <input value={where} onChange={(e) => { setWhere(e.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} placeholder={t.wherePlaceholder} style={{ width: "100%", height: 46, borderRadius: 12, border: "1.5px solid rgba(255,255,255,.14)", background: "#03040A", color: "#fff", outline: "none", padding: "0 38px", fontSize: 13.5, fontWeight: 750, fontFamily: "inherit" }} />
          {where && <button onClick={() => setWhere("")} style={{ position: "absolute", top: "50%", insetInlineEnd: 10, transform: "translateY(-50%)", width: 28, height: 28, borderRadius: 10, border: "none", background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center", cursor: "pointer" }}><IconClose size={13} color="rgba(255,255,255,.5)" /></button>}
        </div>

        {showSuggestions && (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 9px", scrollbarWidth: "none" }}>
            {suggestionChips.map((w) => (
              <button key={w} onClick={() => { setWhere(userWilaya || ""); setShowSuggestions(false); }} style={{ flexShrink: 0, border: "1px solid rgba(167,139,250,.22)", borderRadius: 999, background: "rgba(124,58,237,.1)", color: "#DDD6FE", padding: "7px 11px", fontFamily: "inherit", fontSize: 11.5, fontWeight: 900, cursor: "pointer" }}>{w}</button>
            ))}
          </div>
        )}

        <label style={{ display: "block", color: "rgba(255,255,255,.86)", fontSize: 13.5, fontWeight: 850, marginBottom: 5 }}>{t.when}</label>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <IconCalendar size={13} color="rgba(255,255,255,.34)" style={{ position: "absolute", top: "50%", insetInlineStart: 12, transform: "translateY(-50%)" }} />
          <input value={when} onChange={(e) => setWhen(e.target.value)} onFocus={() => setShowDates(true)} placeholder={t.whenPlaceholder} style={{ width: "100%", height: 46, borderRadius: 12, border: "1.5px solid rgba(255,255,255,.14)", background: "#03040A", color: "#fff", outline: "none", padding: "0 38px", fontSize: 13.5, fontWeight: 750, fontFamily: "inherit" }} />
          {when && <button onClick={() => setWhen("")} style={{ position: "absolute", top: "50%", insetInlineEnd: 10, transform: "translateY(-50%)", width: 28, height: 28, borderRadius: 10, border: "none", background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center", cursor: "pointer" }}><IconClose size={13} color="rgba(255,255,255,.5)" /></button>}
        </div>

        {showDates && (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 10px", scrollbarWidth: "none" }}>
            {dateChips.map((item) => (
              <button key={item} onClick={() => { setWhen(item); setShowDates(false); }} style={{ flexShrink: 0, border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.82)", padding: "8px 12px", fontFamily: "inherit", fontSize: 11.5, fontWeight: 900, cursor: "pointer" }}>{item}</button>
            ))}
          </div>
        )}

        <button onClick={submitSearch} className="btn-press" style={{ width: "100%", minHeight: 46, border: "none", borderRadius: 13, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontFamily: "inherit", fontSize: 14.5, fontWeight: 950, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <IconSearchSm size={15} color="#fff" />
          {t.search}
        </button>
        {hasFilters && <button onClick={clearSearch} style={{ width: "100%", marginTop: 9, minHeight: 34, border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, background: "rgba(255,255,255,.035)", color: "rgba(255,255,255,.62)", fontFamily: "inherit", fontSize: 11.5, fontWeight: 900, cursor: "pointer" }}>{t.clear}</button>}
      </section>

      {canShowResults && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, margin: "0 2px 11px" }}>
        <div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 950 }}>{title}</h2>
          <div style={{ marginTop: 3, color: "rgba(255,255,255,.36)", fontSize: 11 }}>{results.length} {t.cars}</div>
        </div>
        <button onClick={() => setShowSuggestions(true)} style={{ width: 36, height: 36, borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", display: "grid", placeItems: "center", cursor: "pointer" }}>
          <IconFilter size={15} color="rgba(255,255,255,.66)" />
        </button>
      </div>}

      {canShowResults && (results.length === 0 ? (
        <div style={{ textAlign: "start", padding: "10px 0 0" }}>
          <NoCarsIllustration />
          <h2 style={{ color: "rgba(255,255,255,.52)", fontSize: 22, fontWeight: 950, margin: "0 0 6px" }}>{t.noCars}</h2>
          <p style={{ color: "rgba(255,255,255,.36)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{t.noCarsSub}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {results.map((car, i) => <SearchCarRow key={car.id || i} car={car} index={i} onOpenCar={onOpenCar} lang={appLang} />)}
        </div>
      ))}
    </div>
  );
}
