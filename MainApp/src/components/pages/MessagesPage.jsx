import { useEffect, useState } from "react";
import { IconBell, IconBubble } from "../ui/AppIcons.jsx";
import { dbSelect, getCurrentUser, getAppLanguage } from "../../lib/supabase.js";

const COPY = {
  ar: {
    inbox: "الرسائل",
    messages: "الرسائل",
    notifications: "الإشعارات",
    activity: "النشاط",
    welcome: "مرحباً بك في RENT Drive",
    intro: "شكراً لانضمامك إلى المنصة. رحلتك تبدأ من هنا.",
    now: "الآن",
    noMessages: "لا توجد رسائل حتى الآن",
    agency: "الوكالة",
  },
  fr: {
    inbox: "Boîte de réception",
    messages: "MESSAGES",
    notifications: "NOTIFICATIONS",
    activity: "ACTIVITÉ",
    welcome: "Bienvenue sur RENT Drive",
    intro: "Merci d’avoir rejoint la plateforme. Votre voyage commence ici.",
    now: "Maintenant",
    noMessages: "Aucun message pour le moment",
    agency: "Agence",
  },
  en: {
    inbox: "Inbox",
    messages: "MESSAGES",
    notifications: "NOTIFICATIONS",
    activity: "ACTIVITY",
    welcome: "Welcome to RENT Drive",
    intro: "Thanks for joining the platform. Your journey starts here.",
    now: "Now",
    noMessages: "No messages yet",
    agency: "Agency",
  },
  tz: {
    inbox: "ⵜⵉⵣⵏⵉⵏ",
    messages: "ⵜⵉⵣⵏⵉⵏ",
    notifications: "ⵉⵙⵖⵉⵡⵙⵏ",
    activity: "ⴰⵏⴰⵔⵓⵣ",
    welcome: "ⴰⵏⵙⵓⴼ ⴳ RENT Drive",
    intro: "ⵜⴰⵏⵎⵎⵉⵔⵜ ⵅⴼ ⵓⵙⵙⵉⵡⴹ.",
    now: "ⵜⵓⵔⴰ",
    noMessages: "ⵓⵔ ⵍⵍⵉⵏⵜ ⵜⵉⵣⵏⵉⵏ",
    agency: "ⵜⴰⵡⴽⵉⵍⵜ",
  },
};

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

function NotificationCard({ t }) {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)", padding: "15px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "46px 1fr", gap: 10, alignItems: "start" }}>
        <PlatformMark />
        <div>
          <h2 style={{ margin: "0 0 6px", color: "#fff", fontSize: 16.5, fontWeight: 950, letterSpacing: ".2px" }}>{t.welcome}</h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,.82)", fontSize: 13.5, lineHeight: 1.5, fontWeight: 520 }}>{t.intro}</p>
          <div style={{ marginTop: 8, color: "rgba(255,255,255,.42)", fontSize: 10.8, fontWeight: 850 }}>{t.now}</div>
        </div>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const lang = getAppLanguage();
  const t = COPY[lang] || COPY.ar;

  useEffect(() => {
    let alive = true;
    const loadMessages = async () => {
      const user = getCurrentUser();
      if (!user?.id) return;
      try {
        // جلب كل الرسائل المرتبطة بالمستخدم (المرسلة والمستلمة)
        const rows = await dbSelect("messages", 
          `?user_id=eq.${encodeURIComponent(user.id)}&order=created_at.asc`
        );
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
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 950, letterSpacing: ".2px" }}>{t.inbox}</h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,.12)", margin: "0 calc(var(--app-padding, 14px) * -1) 0" }}>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")} label={t.messages} icon={<IconBubble size={13} color="currentColor" />} />
        <TabButton active={tab === "notifications"} onClick={() => setTab("notifications")} label={t.notifications} icon={<IconBell size={13} color="currentColor" />} />
      </div>

      {tab === "notifications" ? (
        <section style={{ padding: "14px 0 0" }}>
          <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)", padding: "10px 0", marginBottom: 16, color: "rgba(255,255,255,.88)", fontSize: 11, fontWeight: 950, letterSpacing: ".8px" }}>{t.activity}</div>
          <NotificationCard t={t} />
        </section>
      ) : (
        messages.length ? (() => {
          // تجميع الرسائل حسب الوكالة
          const byAgency = {};
          messages.forEach(m => {
            const key = m.agency_id || "unknown";
            if (!byAgency[key]) byAgency[key] = { agencyName: m.agency_name || t.agency, msgs: [] };
            byAgency[key].msgs.push(m);
          });
          return (
          <section style={{ padding: "14px 0 0", display: "grid", gap: 12 }}>
            {Object.entries(byAgency).map(([agId, conv]) => (
              <article key={agId} style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, padding: 11, textAlign: "start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <strong style={{ color: "#fff", fontSize: 12.5 }}>🏢 {conv.agencyName}</strong>
                </div>
                {conv.msgs.map(msg => (
                  <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.direction === "agency_to_user" ? "flex-start" : "flex-end", marginBottom: 6 }}>
                    <div style={{ maxWidth: "85%", background: msg.direction === "agency_to_user" ? "rgba(124,58,237,.15)" : "rgba(255,255,255,.08)", border: `1px solid ${msg.direction === "agency_to_user" ? "rgba(124,58,237,.3)" : "rgba(255,255,255,.12)"}`, borderRadius: 10, padding: "7px 11px" }}>
                      <div style={{ fontSize: 10, color: msg.direction === "agency_to_user" ? "#A78BFA" : "rgba(255,255,255,.5)", marginBottom: 3 }}>{msg.direction === "agency_to_user" ? conv.agencyName : "أنت"}</div>
                      <p style={{ margin: 0, color: "rgba(255,255,255,.88)", fontSize: 12, lineHeight: 1.5 }}>{msg.body || msg.subject}</p>
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </section>
          );
        })()
        ) : (
          <section style={{ paddingTop: 32, textAlign: "center" }}>
            <EmptyEnvelope />
            <h2 style={{ margin: "20px 0 0", color: "#F5F5F7", fontSize: 20, fontWeight: 950, letterSpacing: ".2px" }}>{t.noMessages}</h2>
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
