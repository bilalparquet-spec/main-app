import { useState } from "react";
import { Stars } from "./ui/Stars.jsx";
import { IconLike, IconVerified } from "./ui/AppIcons.jsx";

export function CarCard({ car, onClick, liked, onLike, idx }) {
  const [imgOk, setImgOk] = useState(false);
  const badgeColors = {
    فاخرة: "#F59E0B", SUV: "#34D399", كهربائية: "#60A5FA",
    زفاف: "#F472B6", "4×4": "#FB923C", سيدان: "#A78BFA", فان: "#94A3B8"
  };
  const bc = badgeColors[car.badge] || "#A78BFA";

  return (
    <div
      className="hov"
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,.035)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        animation: `cardIn .4s ease ${Math.min(idx, 8) * .06}s both`,
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "var(--card-img-h, 192px)", overflow: "hidden", background: "#0D0E1A" }}>
        {!imgOk && <div className="skel" style={{ position: "absolute", inset: 0, borderRadius: 0 }} />}
        <img
          className="car-img"
          src={car.img}
          alt={car.name}
          onLoad={() => setImgOk(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgOk ? 1 : 0, transition: "opacity .3s" }}
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 55%)" }} />

        {/* Badge */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: `${bc}22`, border: `1px solid ${bc}55`, color: bc,
          padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          letterSpacing: ".3px",
        }}>{car.badge}</div>

        {/* Like button */}
        <button
          onClick={e => { e.stopPropagation(); onLike(); }}
          style={{
            position: "absolute", top: 9, left: 9,
            width: 34, height: 34, borderRadius: "50%", border: "none",
            background: "rgba(0,0,0,.52)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: liked ? "heartPop .38s ease both" : undefined,
            transition: "background .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,.72)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,.52)"}
        >
          <IconLike size={16} active={liked} />
        </button>

        {/* Bottom badges */}
        <div style={{ position: "absolute", bottom: 9, right: 10, left: 10, display: "flex", gap: 5, alignItems: "center" }}>
          {car.verified && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(52,211,153,.16)", border: "1px solid rgba(52,211,153,.32)", color: "#34D399", padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700 }}>
              <IconVerified size={10} color="#34D399" /> موثقة
            </span>
          )}
          {car.freeCancel && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(96,165,250,.12)", border: "1px solid rgba(96,165,250,.3)", color: "#60A5FA", padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700 }}>
              إلغاء مجاني
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "13px 15px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
          <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
            <div data-no-i18n="true" style={{ fontSize: "var(--font-card-title, 15.5px)", fontWeight: 900, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: ".1px" }}>
              {car.name}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.34)", marginTop: 3, fontWeight: 600 }}>
              {car.wilaya} · {car.year}
            </div>
          </div>
          <div style={{ textAlign: "left", flexShrink: 0 }}>
            <div style={{ fontSize: "var(--font-card-price, 18px)", fontWeight: 950, color: "#C084FC", lineHeight: 1.1 }}>
              {car.price.toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.32)", textAlign: "center", marginTop: 2 }}>دج/يوم</div>
          </div>
        </div>

        {/* Stars + reviews */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <Stars r={car.rating} size={12} />
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.32)" }}>{car.reviews} تقييم</span>
        </div>

        {/* Specs chips */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
          {[car.fuel, car.trans, `${car.seats} مقاعد`].map((c, i) => (
            <span key={i} style={{
              background: "rgba(255,255,255,.052)", border: "1px solid rgba(255,255,255,.09)",
              color: "rgba(255,255,255,.52)", padding: "3px 9px", borderRadius: 999,
              fontSize: 10.5, fontWeight: 700,
            }}>{c}</span>
          ))}
        </div>

        {/* CTA */}
        <button className="btn" style={{
          width: "100%", padding: "11px", borderRadius: 13, border: "none",
          background: "linear-gradient(135deg, #6D28D9, #4F46E5)",
          color: "#fff", fontWeight: 900, fontSize: 13.5,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 18px rgba(109,40,217,.3)",
          letterSpacing: ".3px",
        }}>
          احجز الآن
        </button>
      </div>
    </div>
  );
}
