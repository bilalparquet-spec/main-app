import { useState } from "react";
import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { Stars, BtnGlow } from "../components/UI";
import { ReviewSection } from "../components/ReviewSection";
import { CARS } from "../data/cars";
import { Agency } from "../data/agencies";
import { Review } from "../data/reviews";
import { Car } from "../data/cars";

interface Props {
  t: any;
  lang: string;
  agency: Agency;
  reviews: Review[];
  setReviews: (fn: (p: Review[]) => Review[]) => void;
  currentUser: any;
  onBack: () => void;
  onOpenCar: (car: Car) => void;
  onMsgAgency: (agId: number) => void;
  onOpenAuth: () => void;
}

export function AgencyPage({
  t, lang, agency, reviews, setReviews, currentUser,
  onBack, onOpenCar, onMsgAgency, onOpenAuth,
}: Props) {
  const cars = CARS.filter(c => c.agencyId === agency.id);
  const [tab, setTab] = useState<"cars" | "about" | "contact">("cars");

  const about = typeof agency.about === "object"
    ? (agency.about as any)[lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en"]
    : "";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 5%" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 22 }}>
        <Ic.Back />{t.back}
      </button>

      {/* Agency header */}
      <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.12),rgba(99,102,241,.08))", border: "1px solid rgba(124,58,237,.22)", borderRadius: 20, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
          <AgencyLogo agency={agency} size={72} style={{ border: "3px solid rgba(124,58,237,.4)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{lang === "ar" ? agency.ar : agency.fr}</h1>
              {agency.verified && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)", color: "#34D399", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>
                  <Ic.Shield />{t.verified}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.42)", fontSize: 12, marginBottom: 10 }}>
              <Ic.Pin />{lang === "ar" ? agency.city.ar : agency.city.fr}
            </div>
            <Stars r={agency.rating} />
            <div style={{ display: "flex", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
              {[
                { l: t.ap.rating,    v: agency.rating },
                { l: t.ap.totalCars, v: cars.length },
                { l: t.ap.exp,       v: agency.exp },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#C084FC" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <BtnGlow onClick={() => onMsgAgency(agency.id)} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "9px 18px", borderRadius: 9, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <Ic.Msg />{t.msgAgency}
          </BtnGlow>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 3, marginBottom: 24, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 11, padding: 4 }}>
        {(["cars", "about", "contact"] as const).map(k => (
          <button key={k} onClick={() => setTab(k)}
            style={{ flex: 1, background: tab === k ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", border: "none", color: tab === k ? "#fff" : "rgba(255,255,255,.45)", padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all .2s" }}>
            {(t.ap as any)[k]}
          </button>
        ))}
      </div>

      {tab === "cars" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
          {cars.map(car => (
            <div key={car.id} className="hov" onClick={() => onOpenCar(car)} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
              <img src={car.img} alt={car.name} style={{ width: "100%", height: 155, objectFit: "cover" }} />
              <div style={{ padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{car.name}</div>
                  <Stars r={car.rating} />
                </div>
                <div style={{ textAlign: "end" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#C084FC" }}>{car.price.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}> {t.cur}{t.perDay}</span>
                </div>
              </div>
            </div>
          ))}
          {cars.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "rgba(255,255,255,.3)" }}>—</div>}
        </div>
      )}

      {tab === "about" && (
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
          <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.9, fontSize: 14 }}>{about}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { l: lang === "ar" ? "سنوات الخبرة" : "Années d'exp.", v: `${agency.exp}+` },
              { l: lang === "ar" ? "رحلة منجزة" : "Voyages",        v: `${agency.trips}+` },
              { l: lang === "ar" ? "تقييم" : "Note",                 v: `${agency.rating}/5` },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.22)", borderRadius: 11, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#C084FC" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <ReviewSection lang={lang} targetType="agency" targetId={agency.id} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={onOpenAuth} />
        </div>
      )}

      {tab === "contact" && (
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(124,58,237,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C084FC" }}><Ic.Phone /></div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.33)" }}>{lang === "ar" ? "الهاتف" : "Téléphone"}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{agency.phone}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(52,211,153,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34D399" }}><Ic.Pin /></div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.33)" }}>{lang === "ar" ? "الموقع" : "Localisation"}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{lang === "ar" ? agency.city.ar : agency.city.fr}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
