import { useEffect, useMemo, useState } from "react";
import { IconCar, IconPin, IconCalendar, IconSuccess, IconStar, IconClock, IconPhone, IconMoneyDzd } from "../ui/AppIcons.jsx";
import { getBookings, fetchBookings, mergeBookings, formatTripDate } from "../../lib/bookings.js";
import { getAppLanguage } from "../../lib/supabase.js";

const STATUS_MAP = {
  pending:{ color: "#FBBF24", bg: "rgba(251,191,36,.1)", border: "rgba(251,191,36,.25)", icon: IconClock },
  active: { color: "#34D399", bg: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.25)", icon: IconSuccess },
  done:   { color: "rgba(255,255,255,.4)", bg: "rgba(255,255,255,.04)", border: "rgba(255,255,255,.08)", icon: IconSuccess },
};

const COPY = {
  ar: {
    title: "رحلاتي",
    subtitle: "طلبات ورحلات مسجّلة",
    tabs: { all: "الكل", pending: "طلبات", active: "جارية", done: "منتهية" },
    empty: "لا توجد رحلات في هذا القسم",
    orderNumber: "رقم الطلب",
    pickupDefault: "الوكالة",
    payOnDelivery: "عند الاستلام",
    days: "أيام",
    status: { pending: "بانتظار الوكالة", active: "جارية", done: "منتهية" },
  },
  fr: {
    title: "Mes trajets",
    subtitle: "réservations et trajets enregistrés",
    tabs: { all: "Tous", pending: "Demandes", active: "En cours", done: "Terminés" },
    empty: "Aucun trajet dans cette section",
    orderNumber: "Réservation",
    pickupDefault: "Agence",
    payOnDelivery: "Paiement à la livraison",
    days: "jours",
    status: { pending: "En attente", active: "En cours", done: "Terminé" },
  },
  en: {
    title: "My trips",
    subtitle: "saved trips and bookings",
    tabs: { all: "All", pending: "Requests", active: "Active", done: "Completed" },
    empty: "No trips in this section",
    orderNumber: "Booking",
    pickupDefault: "Agency",
    payOnDelivery: "Pay on pickup",
    days: "days",
    status: { pending: "Pending", active: "Active", done: "Completed" },
  },
  tz: {
    title: "ⵜⵉⵔⵣⴰ",
    subtitle: "ⵜⵉⵔⵣⴰ ⴷ ⵉⵙⵓⵜⵔⴰ",
    tabs: { all: "ⴰⴽⴽ", pending: "ⵉⵙⵓⵜⵔⴰ", active: "ⵜⴻⴷⴷⵓ", done: "ⵜⴼⵓⴽ" },
    empty: "ⵓⵔ ⵍⵍⵉⵏⵜ ⵜⵉⵔⵣⴰ",
    orderNumber: "ⵓⵜⵓⵏ",
    pickupDefault: "ⵜⴰⵡⴽⵉⵍⵜ",
    payOnDelivery: "ⴰⴷⵔⵉⵎ ⴳ ⵓⵙⵙⴰⵡⴹ",
    days: "ⵓⵙⵙⴰⵏ",
    status: { pending: "ⵉⵜⵜⵔⴰⵊⵓ", active: "ⵜⴻⴷⴷⵓ", done: "ⵜⴼⵓⴽ" },
  },
};

export function TripsPage() {
  const [tab, setTab] = useState("all");
  const [stored, setStored] = useState(() => getBookings());
  const lang = getAppLanguage();
  const t = COPY[lang] || COPY.ar;

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      const local = getBookings();
      setStored(local);
      const remote = await fetchBookings();
      if (alive && remote.length) setStored(mergeBookings(local, remote));
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("driverent:booking-created", refresh);
    window.addEventListener("driverent:booking-synced", refresh);
    return () => {
      alive = false;
      window.removeEventListener("storage", refresh);
      window.removeEventListener("driverent:booking-created", refresh);
      window.removeEventListener("driverent:booking-synced", refresh);
    };
  }, []);

  const allTrips = useMemo(() => [...stored], [stored]);
  const filtered = tab === "all" ? allTrips : allTrips.filter(t => t.status === tab);

  return (
    <div className="tiny-ui" style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>
      <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
          background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconCar size={26} color="#A78BFA"/>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{t.title}</h2>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>{allTrips.length} {t.subtitle}</p>
      </div>

      <div style={{
        display: "flex", gap: 3, background: "rgba(255,255,255,.04)",
        borderRadius: 13, padding: 4, marginBottom: 18,
        border: "1px solid rgba(255,255,255,.07)",
      }}>
        {[["all",t.tabs.all],["pending",t.tabs.pending],["active",t.tabs.active],["done",t.tabs.done]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 9, border: "none",
            fontFamily: "inherit", fontWeight: 700, fontSize: 12, cursor: "pointer",
            transition: "all .22s",
            background: tab === k ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "transparent",
            color: tab === k ? "#fff" : "rgba(255,255,255,.4)",
          }}>{l}</button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:"38px 16px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20}}>
          <IconCar size={28} color="rgba(255,255,255,.25)"/>
          <p style={{marginTop:10,color:"rgba(255,255,255,.4)",fontSize:13}}>{t.empty}</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((trip, i) => {
          const s = STATUS_MAP[trip.status] || STATUS_MAP.pending;
          const StatusIcon = s.icon;
          return (
            <div key={trip.id} style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20, overflow: "hidden",
              animation: `fadeUp .35s ease ${i * .07}s both`,
            }}>
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
                  <StatusIcon size={12} color={s.color}/>
                  {t.status[trip.status] || trip.status}
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{trip.car}</div>
                  {trip.id?.toString?.().startsWith?.("DR-") && <div style={{fontSize:10,color:"rgba(255,255,255,.45)",marginTop:2}}>{t.orderNumber}: {trip.id}</div>}
                </div>
              </div>

              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconPin size={12} color="rgba(255,255,255,.45)"/>
                    {trip.wilaya} · {trip.pickupPlace || t.pickupDefault}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconCalendar size={12} color="rgba(255,255,255,.45)"/>
                    {formatTripDate(trip.from)} ← {formatTripDate(trip.to)}
                  </div>
                  {trip.driverPhone && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                      <IconPhone size={12} color="rgba(255,255,255,.45)"/>
                      {trip.driverPhone}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconMoneyDzd size={12} color="rgba(255,255,255,.45)"/>
                    {trip.paymentStatus || t.payOnDelivery}
                  </div>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.07)",
                }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#C084FC" }}>{trip.price.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}> دج · {trip.days} {t.days}</span>
                  </div>
                  {trip.status === "done" && trip.rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {Array.from({length: trip.rating}).map((_,idx) => (
                        <IconStar key={idx} size={12} color="#FBBF24"/>
                      ))}
                    </div>
                  )}
                  {trip.status !== "done" && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: s.bg, border: `1px solid ${s.border}`,
                      color: s.color, padding: "5px 12px", borderRadius: 20,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      <StatusIcon size={13} color={s.color}/>
                      {t.status[trip.status] || trip.status}
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
