import { useState } from "react";
import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { AGENCIES } from "../data/agencies";
import { CARS } from "../data/cars";
import { Booking } from "../data/bookings";

interface Props {
  lang: string;
  currentUser: any;
  bookings: Booking[];
  setBookings: (fn: (p: Booking[]) => Booking[]) => void;
  onClose: () => void;
}

export function AgencyDashboard({ lang, currentUser, bookings, setBookings, onClose }: Props) {
  const [tab, setTab] = useState<"overview" | "bookings" | "cars">("overview");

  // In a real app, the agencyId would come from currentUser
  const agencyId = 1;
  const agency = AGENCIES.find(a => a.id === agencyId);
  const agencyCars = CARS.filter(c => c.agencyId === agencyId);
  const myBookings = bookings.filter(b => b.agencyId === agencyId);

  const L: Record<string, any> = {
    ar: { title: "لوحة التحكم", bookings: "الحجوزات", cars: "سياراتي", overview: "نظرة عامة", revenue: "الدخل الكلي", totalB: "إجمالي الحجوزات", pending: "قيد الانتظار", confirm: "تأكيد", cancel: "إلغاء", close: "إغلاق" },
    fr: { title: "Tableau de bord", bookings: "Réservations", cars: "Mes voitures", overview: "Vue d'ensemble", revenue: "Revenu total", totalB: "Total réservations", pending: "En attente", confirm: "Confirmer", cancel: "Annuler", close: "Fermer" },
    en: { title: "Dashboard", bookings: "Bookings", cars: "My Cars", overview: "Overview", revenue: "Total Revenue", totalB: "Total Bookings", pending: "Pending", confirm: "Confirm", cancel: "Cancel", close: "Close" },
  };
  const l = L[lang] || L.ar;

  const revenue = myBookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)", overflowY: "auto" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {agency && <AgencyLogo agency={agency} size={46} />}
            <div>
              <h1 style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>{l.title}</h1>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{agency ? (lang === "ar" ? agency.ar : agency.fr) : ""}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic.X />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,.04)", borderRadius: 11, padding: 4, marginBottom: 22 }}>
          {(["overview", "bookings", "cars"] as const).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, background: tab === k ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", border: "none", color: tab === k ? "#fff" : "rgba(255,255,255,.45)", padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              {(l as any)[k]}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14 }}>
            {[
              { l: l.revenue, v: `${revenue.toLocaleString()} DA`, c: "#C084FC", icon: "💰" },
              { l: l.totalB, v: myBookings.length, c: "#60A5FA", icon: "📋" },
              { l: l.pending, v: myBookings.filter(b => b.status === "pending").length, c: "#FBBF24", icon: "⏳" },
              { l: lang === "ar" ? "السيارات" : "Voitures", v: agencyCars.length, c: "#34D399", icon: "🚗" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "bookings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myBookings.map(b => (
              <div key={b.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 13, padding: 15, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{b.carName}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{b.clientName} · {b.clientPhone}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{b.from} → {b.to}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#C084FC" }}>{b.total.toLocaleString()} DA</div>
                <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 20, fontWeight: 700, background: b.status === "confirmed" ? "rgba(52,211,153,.1)" : "rgba(251,191,36,.1)", color: b.status === "confirmed" ? "#34D399" : "#FBBF24", border: `1px solid ${b.status === "confirmed" ? "rgba(52,211,153,.3)" : "rgba(251,191,36,.3)"}` }}>
                  {b.status}
                </span>
                {b.status === "pending" && (
                  <div style={{ display: "flex", gap: 7 }}>
                    <button onClick={() => setBookings(p => p.map(x => x.id === b.id ? { ...x, status: "confirmed" } : x))} style={{ background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", color: "#34D399", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{l.confirm}</button>
                    <button onClick={() => setBookings(p => p.map(x => x.id === b.id ? { ...x, status: "cancelled" } : x))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#F87171", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{l.cancel}</button>
                  </div>
                )}
              </div>
            ))}
            {myBookings.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,.3)" }}>—</div>}
          </div>
        )}

        {tab === "cars" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {agencyCars.map(car => (
              <div key={car.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, overflow: "hidden" }}>
                <img src={car.img} alt={car.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                <div style={{ padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{car.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)" }}>★ {car.rating}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#C084FC" }}>{car.price.toLocaleString()} DA</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
