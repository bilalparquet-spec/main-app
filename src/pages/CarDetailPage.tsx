import { useState } from "react";
import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { Stars, BtnGlow } from "../components/UI";
import { ReviewSection } from "../components/ReviewSection";
import { AGENCIES } from "../data/agencies";
import { Car } from "../data/cars";
import { Review } from "../data/reviews";
import { Agency } from "../data/agencies";

interface Props {
  t: any;
  lang: string;
  car: Car;
  reviews: Review[];
  setReviews: (fn: (p: Review[]) => Review[]) => void;
  currentUser: any;
  onBack: () => void;
  onBook: (car: Car) => void;
  onMsgAgency: (agId: number) => void;
  onOpenAgency: (ag: Agency) => void;
  onOpenAuth: () => void;
}

export function CarDetailPage({
  t, lang, car, reviews, setReviews, currentUser,
  onBack, onBook, onMsgAgency, onOpenAgency, onOpenAuth,
}: Props) {
  const agency = AGENCIES.find(a => a.id === car.agencyId);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 5%" }}>
      {/* Back */}
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 22 }}>
        <Ic.Back />{t.back}
      </button>

      {/* Image */}
      <div style={{ borderRadius: 20, overflow: "hidden", height: 280, marginBottom: 28, position: "relative", background: "#0D0D1E" }}>
        {!imgErr ? (
          <img src={car.img} alt={car.name} onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>🚗</div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{car.name}</h1>
          <Stars r={car.rating} />
        </div>
        {car.wedding && (
          <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(236,72,153,.2)", border: "1px solid rgba(236,72,153,.5)", color: "#F9A8D4", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
            <Ic.Rings />زفاف فاخر
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }} className="dg">
        {/* Left */}
        <div>
          {/* Specs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { i: <Ic.Cal />, l: t.year,  v: car.year,  c: "#A78BFA" },
              { i: <Ic.Users />, l: t.seats, v: `${car.seats} ${lang === "ar" ? "مقاعد" : lang === "fr" ? "places" : "seats"}`, c: "#34D399" },
              { i: <Ic.Tag />, l: t.type,  v: car.badge, c: "#F59E0B" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ color: s.c, display: "flex", justifyContent: "center", marginBottom: 6 }}>{s.i}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>{s.l}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Agency card */}
          {agency && (
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: 18, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginBottom: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{t.agency}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
                <AgencyLogo agency={agency} size={48} style={{ border: "2px solid rgba(124,58,237,.3)" }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                    {lang === "ar" ? agency.ar : agency.fr}
                    {agency.verified && <span style={{ color: "#34D399" }}><Ic.Shield /></span>}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", display: "flex", alignItems: "center", gap: 4 }}><Ic.Pin />{lang === "ar" ? agency.city.ar : agency.city.fr}</div>
                  <Stars r={agency.rating} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <button onClick={() => onOpenAgency(agency)} style={{ flex: 1, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.3)", color: "#C084FC", padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t.viewAgency ?? "عرض الوكالة"}</button>
                <button onClick={() => onMsgAgency(agency.id)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.65)", padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <Ic.Msg />{t.msgAgency}
                </button>
              </div>
            </div>
          )}

          {/* Reviews */}
          <ReviewSection
            lang={lang} targetType="car" targetId={car.id}
            reviews={reviews} setReviews={setReviews}
            currentUser={currentUser} openAuth={onOpenAuth}
          />
        </div>

        {/* Right - Booking card */}
        <div>
          <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 18, padding: 22, position: "sticky", top: 80 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.33)" }}>{t.perDay.replace("/", "")}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: car.wedding ? "#F9A8D4" : "#C084FC" }}>
                {car.price.toLocaleString()} <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,.32)" }}>{t.cur}</span>
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
              {[{ l: t.from, ph: "" }, { l: t.to, ph: "" }].map((f, i) => (
                <div key={i}>
                  <label style={{ fontSize: 10, color: "rgba(255,255,255,.33)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, marginBottom: 5, textTransform: "uppercase" }}><Ic.Cal />{f.l}</label>
                  <input type="date" style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, color: "#fff", padding: "9px 12px", fontSize: 13 }} />
                </div>
              ))}
            </div>

            <BtnGlow onClick={() => onBook(car)} style={{ width: "100%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 11, fontSize: 15, fontWeight: 800, boxShadow: "0 6px 22px rgba(124,58,237,.45)", cursor: "pointer", marginBottom: 12 }}>
              {t.book}
            </BtnGlow>

            <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Ic.Shield />{lang === "ar" ? "دفع آمن ومشفر" : lang === "fr" ? "Paiement sécurisé" : "Secure payment"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
