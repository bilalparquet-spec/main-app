import { useState } from "react";
import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { AGENCIES } from "../data/agencies";
import { CARS } from "../data/cars";
import { Booking } from "../data/bookings";
import { getAllUsers, getPendingRequests, getApprovedUsers, savePendingRequest } from "../services/authService";

interface Props {
  lang: string;
  bookings: Booking[];
  setBookings: (fn: (p: Booking[]) => Booking[]) => void;
  onClose: () => void;
}

type Tab = "overview" | "bookings" | "agencies" | "users" | "pending";

export function AdminPanel({ lang, bookings, setBookings, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const [pendingReqs, setPendingReqs] = useState(getPendingRequests());
  const approvedUsers = getAllUsers();

  const totalRev = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total, 0);
  const pending   = bookings.filter(b => b.status === "pending").length;
  const confirmed = bookings.filter(b => b.status === "confirmed").length;

  const L: Record<string, any> = {
    ar: { title: "لوحة تحكم الادمن", tabs: ["نظرة عامة", "الحجوزات", "الوكالات", "المستخدمون", "طلبات التسجيل"], totalRev: "إجمالي الدخل", totalBookings: "إجمالي الحجوزات", pendingB: "قيد الانتظار", confirmedB: "مؤكدة", agencies: "الوكالات", cars: "السيارات", confirm: "تأكيد", cancel: "إلغاء", close: "إغلاق", approve: "قبول", reject: "رفض", pending2: "معلق", approved: "مقبول", rejected: "مرفوض", noReqs: "لا توجد طلبات تسجيل", noBookings: "لا توجد حجوزات" },
    fr: { title: "Panel Admin", tabs: ["Vue d'ensemble", "Réservations", "Agences", "Utilisateurs", "Demandes"], totalRev: "Revenu total", totalBookings: "Total réservations", pendingB: "En attente", confirmedB: "Confirmées", agencies: "Agences", cars: "Voitures", confirm: "Confirmer", cancel: "Annuler", close: "Fermer", approve: "Approuver", reject: "Rejeter", pending2: "En attente", approved: "Approuvé", rejected: "Rejeté", noReqs: "Aucune demande", noBookings: "Aucune réservation" },
    en: { title: "Admin Panel", tabs: ["Overview", "Bookings", "Agencies", "Users", "Requests"], totalRev: "Total Revenue", totalBookings: "Total Bookings", pendingB: "Pending", confirmedB: "Confirmed", agencies: "Agencies", cars: "Cars", confirm: "Confirm", cancel: "Cancel", close: "Close", approve: "Approve", reject: "Reject", pending2: "Pending", approved: "Approved", rejected: "Rejected", noReqs: "No registration requests", noBookings: "No bookings" },
  };
  const l = L[lang] || L.ar;

  const approveReq = (id: string) => {
    const req = pendingReqs.find(r => r.id === id);
    if (!req) return;
    const approved = getApprovedUsers();
    const { status, requestDate, ...user } = req as any;
    try { localStorage.setItem("driverent_approved_users", JSON.stringify([...approved, { ...user, joinDate: new Date().toISOString() }])); } catch {}
    const newPending = pendingReqs.map(r => r.id === id ? { ...r, status: "approved" as any } : r);
    try { localStorage.setItem("driverent_pending_requests", JSON.stringify(newPending)); } catch {}
    setPendingReqs(newPending);
  };

  const rejectReq = (id: string) => {
    const newPending = pendingReqs.map(r => r.id === id ? { ...r, status: "rejected" as any } : r);
    try { localStorage.setItem("driverent_pending_requests", JSON.stringify(newPending)); } catch {}
    setPendingReqs(newPending);
  };

  const tabs: Tab[] = ["overview", "bookings", "agencies", "users", "pending"];
  const badge = pendingReqs.filter(r => (r as any).status === "pending").length;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)", overflowY: "auto" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24, minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            <span>🛡️</span>{l.title}
          </h1>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic.X />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 4, marginBottom: 24, overflowX: "auto" }}>
          {tabs.map((k, i) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, minWidth: 100, background: tab === k ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", border: "none", color: tab === k ? "#fff" : "rgba(255,255,255,.45)", padding: "9px 8px", borderRadius: 9, cursor: "pointer", fontSize: 12, fontWeight: 700, position: "relative" }}>
              {l.tabs[i]}
              {k === "pending" && badge > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", background: "#EF4444", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { l: l.totalRev, v: `${totalRev.toLocaleString()} DA`, c: "#C084FC", icon: "💰" },
                { l: l.totalBookings, v: bookings.length, c: "#60A5FA", icon: "📋" },
                { l: l.pendingB, v: pending, c: "#FBBF24", icon: "⏳" },
                { l: l.confirmedB, v: confirmed, c: "#34D399", icon: "✅" },
                { l: l.agencies, v: AGENCIES.length, c: "#F472B6", icon: "🏢" },
                { l: l.cars, v: CARS.length, c: "#A78BFA", icon: "🚗" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings */}
        {tab === "bookings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {bookings.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,.3)" }}>{l.noBookings}</div>}
            {bookings.map(b => (
              <div key={b.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{b.carName}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{b.clientName} · {b.clientPhone}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 3 }}>{b.from} → {b.to} ({b.days} {lang === "ar" ? "أيام" : "jours"})</div>
                </div>
                <div style={{ textAlign: "end" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#C084FC" }}>{b.total.toLocaleString()} DA</div>
                  <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 700, background: b.status === "confirmed" ? "rgba(52,211,153,.12)" : b.status === "pending" ? "rgba(251,191,36,.12)" : "rgba(239,68,68,.12)", color: b.status === "confirmed" ? "#34D399" : b.status === "pending" ? "#FBBF24" : "#F87171", border: `1px solid ${b.status === "confirmed" ? "rgba(52,211,153,.3)" : b.status === "pending" ? "rgba(251,191,36,.3)" : "rgba(239,68,68,.3)"}` }}>
                    {b.status}
                  </span>
                </div>
                {b.status === "pending" && (
                  <div style={{ display: "flex", gap: 7 }}>
                    <button onClick={() => setBookings(p => p.map(x => x.id === b.id ? { ...x, status: "confirmed" } : x))} style={{ background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", color: "#34D399", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{l.confirm}</button>
                    <button onClick={() => setBookings(p => p.map(x => x.id === b.id ? { ...x, status: "cancelled" } : x))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#F87171", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{l.cancel}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Agencies */}
        {tab === "agencies" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
            {AGENCIES.map(a => (
              <div key={a.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
                <AgencyLogo agency={a} size={44} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{lang === "ar" ? a.ar : a.fr}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)" }}>{lang === "ar" ? a.city.ar : a.city.fr}</div>
                  <div style={{ fontSize: 11, color: "#F59E0B", marginTop: 2 }}>★ {a.rating} · {a.trips} {lang === "ar" ? "رحلة" : "voyages"}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {approvedUsers.map(u => (
              <div key={u.id} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 11, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <img src={u.avatar} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)" }}>{u.username} · {u.phone}</div>
                </div>
                <span style={{ fontSize: 10, color: "#34D399", background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)", padding: "2px 9px", borderRadius: 20, fontWeight: 700 }}>{lang === "ar" ? "نشط" : "Actif"}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pending Requests */}
        {tab === "pending" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pendingReqs.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,.3)" }}>{l.noReqs}</div>}
            {pendingReqs.map(r => {
              const st = (r as any).status || "pending";
              return (
                <div key={r.id} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${st === "pending" ? "rgba(251,191,36,.2)" : st === "approved" ? "rgba(52,211,153,.2)" : "rgba(239,68,68,.2)"}`, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <img src={r.avatar} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.username}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{r.phone}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.28)", marginTop: 2 }}>{(r as any).requestDate?.slice(0,10)}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 700, background: st === "pending" ? "rgba(251,191,36,.1)" : st === "approved" ? "rgba(52,211,153,.1)" : "rgba(239,68,68,.1)", color: st === "pending" ? "#FBBF24" : st === "approved" ? "#34D399" : "#F87171", border: `1px solid ${st === "pending" ? "rgba(251,191,36,.3)" : st === "approved" ? "rgba(52,211,153,.3)" : "rgba(239,68,68,.3)"}` }}>
                    {(l as any)[`${st === "pending" ? "pending2" : st}`] || st}
                  </span>
                  {st === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => approveReq(r.id)} style={{ background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", color: "#34D399", padding: "5px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{l.approve}</button>
                      <button onClick={() => rejectReq(r.id)} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#F87171", padding: "5px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{l.reject}</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
