import { useState } from "react";
import { IconClose, IconFilter, IconGear, IconFuel, IconVerified } from "./ui/AppIcons.jsx";
import { getAppLanguage } from "../lib/supabase.js";

const COPY = {
  ar: { title: "الفلاتر", price: "السعر اليومي (دج)", from: "من", to: "إلى", fuel: "الوقود", transmission: "ناقل الحركة", verified: "الوكالات الموثقة فقط", reset: "إعادة تعيين", apply: "تطبيق", fuels: { all: "الكل", gas: "بنزين", diesel: "ديزل", electric: "كهربائي" }, transmissions: { all: "الكل", auto: "أوتوماتيك", manual: "يدوي" } },
  fr: { title: "Filtres", price: "Prix journalier (DZD)", from: "Min", to: "Max", fuel: "Carburant", transmission: "Transmission", verified: "Agences vérifiées uniquement", reset: "Réinitialiser", apply: "Appliquer", fuels: { all: "Tous", gas: "Essence", diesel: "Diesel", electric: "Électrique" }, transmissions: { all: "Tous", auto: "Automatique", manual: "Manuelle" } },
  en: { title: "Filters", price: "Daily price (DZD)", from: "Min", to: "Max", fuel: "Fuel", transmission: "Transmission", verified: "Verified agencies only", reset: "Reset", apply: "Apply", fuels: { all: "All", gas: "Gasoline", diesel: "Diesel", electric: "Electric" }, transmissions: { all: "All", auto: "Automatic", manual: "Manual" } },
};

export function FilterPanel({ advF, setAdvF, onClose }) {
  const [L, setL] = useState(advF);
  const lang = getAppLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = COPY[lang] || COPY.ar;

  const fuelOptions = [
    { value: "الكل", label: t.fuels.all },
    { value: "بنزين", label: t.fuels.gas },
    { value: "ديزل", label: t.fuels.diesel },
    { value: "كهربائي", label: t.fuels.electric },
  ];
  const transOptions = [
    { value: "الكل", label: t.transmissions.all },
    { value: "أوتوماتيك", label: t.transmissions.auto },
    { value: "يدوي", label: t.transmissions.manual },
  ];

  const up = (k, v) => setL(p => ({ ...p, [k]: v }));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 700, background: "rgba(0,0,0,.68)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        position: "absolute", top: 0, right: 0,
        width: "min(clamp(300px,80vw,380px), 94vw)", height: "100%",
        background: "linear-gradient(180deg, #0E0F1E 0%, #090A14 100%)",
        borderLeft: "1px solid rgba(255,255,255,.09)",
        display: "flex", flexDirection: "column", direction: dir,
        animation: "slideR .3s cubic-bezier(.4,0,.2,1) both",
      }}>
        {/* Header */}
        <div style={{ padding: "calc(env(safe-area-inset-top, 0px) + 18px) 18px 16px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(124,58,237,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconFilter size={16} color="#A78BFA" />
            </div>
            <span style={{ fontWeight: 950, fontSize: 17, color: "#fff", letterSpacing: "-.3px" }}>{t.title}</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconClose size={13} color="rgba(255,255,255,.6)" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: 20, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Price */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12 }}>{t.price}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["minP", t.from], ["maxP", t.to]].map(([k, l]) => (
                <div key={k}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.32)", marginBottom: 6, fontWeight: 700 }}>{l}</div>
                  <input type="number" value={L[k]} onChange={e => up(k, e.target.value)} placeholder="0"
                    style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, color: "#fff", padding: "11px 13px", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Fuel */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12 }}>
              <IconFuel size={13} color="rgba(255,255,255,.4)" /> {t.fuel}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {fuelOptions.map(f => (
                <button key={f.value} onClick={() => up("fuel", f.value)} style={{ padding: "8px 15px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 12.5, border: `1.5px solid ${L.fuel === f.value ? "#7C3AED" : "rgba(255,255,255,.1)"}`, background: L.fuel === f.value ? "rgba(124,58,237,.22)" : "rgba(255,255,255,.04)", color: L.fuel === f.value ? "#C084FC" : "rgba(255,255,255,.5)", transition: "all .18s" }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12 }}>
              <IconGear size={13} color="rgba(255,255,255,.4)" /> {t.transmission}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {transOptions.map(tr => (
                <button key={tr.value} onClick={() => up("trans", tr.value)} style={{ padding: "8px 15px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 12.5, border: `1.5px solid ${L.trans === tr.value ? "#7C3AED" : "rgba(255,255,255,.1)"}`, background: L.trans === tr.value ? "rgba(124,58,237,.22)" : "rgba(255,255,255,.04)", color: L.trans === tr.value ? "#C084FC" : "rgba(255,255,255,.5)", transition: "all .18s" }}>
                  {tr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,.042)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 11, background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconVerified size={16} color="#34D399" />
              </div>
              <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.82)", fontWeight: 700 }}>{t.verified}</span>
            </div>
            <button onClick={() => up("verified", !L.verified)} style={{ width: 50, height: 28, borderRadius: 14, border: "none", cursor: "pointer", position: "relative", background: L.verified ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.14)", transition: "background .3s", flexShrink: 0, boxShadow: L.verified ? "0 2px 10px rgba(124,58,237,.4)" : "none" }}>
              <span style={{ position: "absolute", top: 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "right .28s, left .28s", right: L.verified ? 3 : "auto", left: L.verified ? "auto" : 3, boxShadow: "0 1px 4px rgba(0,0,0,.25)" }} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 18px max(18px, env(safe-area-inset-bottom, 18px))", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", gap: 10 }}>
          <button onClick={() => setAdvF({ fuel: "الكل", trans: "الكل", verified: false, minP: "", maxP: "" })}
            style={{ flex: 1, padding: "13px", borderRadius: 13, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.5)", fontFamily: "inherit", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
            {t.reset}
          </button>
          <button onClick={() => { setAdvF(L); onClose(); }}
            style={{ flex: 2, padding: "13px", borderRadius: 13, border: "none", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontFamily: "inherit", fontWeight: 900, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 18px rgba(124,58,237,.38)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <IconVerified size={15} color="#fff" />
            {t.apply}
          </button>
        </div>
      </div>
    </div>
  );
}
