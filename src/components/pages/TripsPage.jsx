import { useState } from "react";
import { Stars } from "../ui/Stars.jsx";
import { IconCar, IconPin, IconCalendar, IconSuccess } from "../ui/AppIcons.jsx";

const MOCK_TRIPS = [
  {
    id: 1, status: "active",
    car: "Mercedes S-Class", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
    wilaya: "الجزائر", from: "20 مايو 2026", to: "23 مايو 2026", days: 3,
    price: 45000, rating: 0,
  },
  {
    id: 2, status: "done",
    car: "Toyota RAV4", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&q=80",
    wilaya: "وهران", from: "10 أبريل 2026", to: "14 أبريل 2026", days: 4,
    price: 28000, rating: 5,
  },
  {
    id: 3, status: "done",
    car: "Tesla Model 3", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80",
    wilaya: "قسنطينة", from: "2 مارس 2026", to: "4 مارس 2026", days: 2,
    price: 18000, rating: 4,
  },
];

const STATUS_MAP = {
  active: { label: "جارية", color: "#34D399", bg: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.25)" },
  done:   { label: "منتهية", color: "rgba(255,255,255,.4)", bg: "rgba(255,255,255,.04)", border: "rgba(255,255,255,.08)" },
};

export function TripsPage() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? MOCK_TRIPS : MOCK_TRIPS.filter(t => t.status === tab);

  return (
    <div style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>

      {/* Header */}
      <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
          background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconCar size={26} color="#A78BFA"/>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>رحلاتي</h2>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>{MOCK_TRIPS.length} رحلات مسجّلة</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 3, background: "rgba(255,255,255,.04)",
        borderRadius: 13, padding: 4, marginBottom: 18,
        border: "1px solid rgba(255,255,255,.07)",
      }}>
        {[["all","الكل"],["active","جارية"],["done","منتهية"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 9, border: "none",
            fontFamily: "inherit", fontWeight: 700, fontSize: 12, cursor: "pointer",
            transition: "all .22s",
            background: tab === k ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "transparent",
            color: tab === k ? "#fff" : "rgba(255,255,255,.4)",
          }}>{l}</button>
        ))}
      </div>

      {/* Trip cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((trip, i) => {
          const s = STATUS_MAP[trip.status];
          return (
            <div key={trip.id} style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20, overflow: "hidden",
              animation: `fadeUp .35s ease ${i * .07}s both`,
            }}>
              {/* Image */}
              <div style={{ position: "relative", height: 130 }}>
                <img src={trip.img} alt={trip.car} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 50%)" }}/>
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: s.bg, border: `1px solid ${s.border}`,
                  color: s.color, padding: "3px 10px", borderRadius: 20,
                  fontSize: 10, fontWeight: 800,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  {trip.status === "active" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }}/>}
                  {s.label}
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{trip.car}</div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconPin size={12} color="rgba(255,255,255,.45)"/>
                    {trip.wilaya}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconCalendar size={12} color="rgba(255,255,255,.45)"/>
                    {trip.from} ← {trip.to}
                  </div>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.07)",
                }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#C084FC" }}>{trip.price.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}> دج · {trip.days} أيام</span>
                  </div>
                  {trip.status === "done" && trip.rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {Array.from({length: trip.rating}).map((_,idx) => (
                        <span key={idx} style={{ color: "#FBBF24", fontSize: 12 }}>★</span>
                      ))}
                    </div>
                  )}
                  {trip.status === "active" && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.2)",
                      color: "#34D399", padding: "5px 12px", borderRadius: 20,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      <IconSuccess size={13}/>
                      مؤكّدة
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
