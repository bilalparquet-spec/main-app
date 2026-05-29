import { useEffect, useState } from "react";
import { IconBell, IconBubble, IconSpark } from "../ui/AppIcons.jsx";
import { dbSelect, getCurrentUser } from "../../lib/supabase.js";

function EmptyEnvelope() {
  return (
    <div style={{ position: "relative", width: "min(64vw, 290px)", height: 142, margin: "8px auto 12px" }}>
      <div style={{ position: "absolute", inset: "34px 24px 28px", borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#5B5CF6)", boxShadow: "0 24px 60px rgba(124,58,237,.24)" }}>
        <div style={{ position: "absolute", top: 18, left: 22, width: 46, height: 3, borderRadius: 3, background: "rgba(255,255,255,.86)" }} />
        <div style={{ position: "absolute", top: 31, left: 22, width: 88, height: 3, borderRadius: 3, background: "rgba(255,255,255,.7)" }} />
        <div style={{ position: "absolute", left: "50%", top: 54, width: 92, height: 3, borderRadius: 3, transform: "translateX(-50%)", background: "rgba(255,255,255,.84)", boxShadow: "0 12px 0 rgba(255,255,255,.62), 0 24px 0 rgba(255,255,255,.45)" }} />
        <div style={{ position: "absolute", top: 17, right: 16, width: 42, height: 32, borderRadius: 7, border: "2px solid rgba(255,255,255,.9)", display: "grid", placeItems: "center" }}>
          <IconBubble size={14} color="rgba(255,255,255,.92)" />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.05)", filter: "blur(.2px)" }} />
      <div style={{ position: "absolute", left: 6, bottom: 40, width: 84, height: 2, background: "#7C3AED", opacity: .75 }} />
      <div style={{ position: "absolute", right: 6, bottom: 39, width: 84, height: 2, background: "#7C3AED", opacity: .75 }} />
    </div>
  );
}

function PlatformMark() {
  return (
    <div style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)", display: "grid", placeItems: "center", flexShrink: 0 }}>
      <span data-no-i18n="true" style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(255,255,255,.38)", color: "#F4F4F5", fontSize: 7.2, fontWeight: 950, letterSpacing: ".4px" }}>RENT</span>
    </div>
  );
}

function NotificationCard() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)", padding: "15px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "46px 1fr", gap: 10, alignItems: "start" }}>
        <PlatformMark />
        <div>
          <h2 style={{ margin: "0 0 6px", color: "#fff", fontSize: 16.5, fontWeight: 950, letterSpacing: ".2px" }}>مرحباً بك في RENT درايف</h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,.82)", fontSize: 13.5, lineHeight: 1.5, fontWeight: 520 }}>شكراً لانضمامك إلى المنصة. رحلتك تبدأ من هنا.</p>
          <div style={{ marginTop: 8, color: "rgba(255,255,255,.42)", fontSize: 10.8, fontWeight: 850 }}>الآن</div>
        </div>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let alive = true;
    const loadMessages = async () => {
      const user = getCurrentUser();
      const filter = user?.id
        ? `?user_id=eq.${encodeURIComponent(user.id)}&order=created_at.desc`
        : "?order=created_at.desc&limit=20";
      try {
        const rows = await dbSelect("messages", filter);
        if (alive) setMessages(rows || []);
      } catch (err) {
        console.warn("Supabase messages fetch failed:", err.message);
      }
    };
    loadMessages();
    window.addEventListener("driverent:message-created", loadMessages);
    return () => { alive = false; window.removeEventListener("driverent:message-created", loadMessages); };
  }, []);

  return (
    <div className="tiny-ui" style={{ minHeight: "calc(100vh - 170px)", padding: "4px 0 104px", animation: "fadeUp .28s ease", background: "#050506", color: "#fff" }}>
      <header style={{ textAlign: "center", padding: "6px 0 12px" }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 950, letterSpacing: ".2px" }}>Inbox</h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,.12)", margin: "0 calc(var(--app-padding, 14px) * -1) 0" }}>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")} label="MESSAGES" icon={<IconBubble size={13} color="currentColor" />} />
        <TabButton active={tab === "notifications"} onClick={() => setTab("notifications")} label="NOTIFICATIONS" icon={<IconBell size={13} color="currentColor" />} />
      </div>

      {tab === "notifications" ? (
        <section style={{ padding: "14px 0 0" }}>
          <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)", padding: "10px 0", marginBottom: 16, color: "rgba(255,255,255,.88)", fontSize: 11, fontWeight: 950, letterSpacing: ".8px" }}>ACTIVITY</div>
          <NotificationCard />
          <div style={{ display: "grid", placeItems: "center", paddingTop: 22, color: "rgba(255,255,255,.72)" }}>
            <span style={{ width: 34, height: 34, borderRadius: 999, border: "2px solid rgba(255,255,255,.72)", display: "grid", placeItems: "center" }}><IconSpark size={14} color="currentColor" /></span>
          </div>
        </section>
      ) : (
        messages.length ? (
          <section style={{ padding: "14px 0 0", display: "grid", gap: 9 }}>
            {messages.map((msg) => (
              <article key={msg.id} style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, padding: 11, textAlign: "start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <strong style={{ color: "#fff", fontSize: 12.5 }}>{msg.agency_name || "الوكالة"}</strong>
                  <span style={{ color: msg.status === "pending" ? "#FBBF24" : "#34D399", fontSize: 9.5, fontWeight: 950 }}>{msg.status || "pending"}</span>
                </div>
                <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.78)", fontSize: 10.8, lineHeight: 1.55 }}>{msg.body || msg.subject}</p>
              </article>
            ))}
          </section>
        ) : (
          <section style={{ paddingTop: 32, textAlign: "center" }}>
            <EmptyEnvelope />
            <h2 style={{ margin: "20px 0 0", color: "#F5F5F7", fontSize: 20, fontWeight: 950, letterSpacing: ".2px" }}>لا توجد رسائل حتى الآن</h2>
          </section>
        )
      )}
    </div>
  );
}

function TabButton({ active, icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{ position: "relative", minHeight: 44, border: "none", background: "transparent", color: active ? "#8B7CFF" : "rgba(255,255,255,.52)", fontFamily: "inherit", fontSize: 10.8, fontWeight: 950, letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {icon}{label}
      {active && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "#7C3AED" }} />}
    </button>
  );
}
