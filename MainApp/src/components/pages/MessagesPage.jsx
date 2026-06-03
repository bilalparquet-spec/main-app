import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "../../lib/supabase.js";
import { IconBubble, IconBack, IconVerified, IconPin } from "../ui/AppIcons.jsx";

const DEMO_THREADS = [
  {
    id: 1, agencyName: "وكالة النجم الذهبي", wilaya: "الجزائر العاصمة",
    avatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=80",
    lastMsg: "السيارة متاحة بتاريخك، تفضل!", time: "الآن", unread: 2, verified: true,
    messages: [
      { id: 1, from: "agency", text: "أهلاً بك في وكالتنا! كيف يمكننا مساعدتك؟", time: "10:00" },
      { id: 2, from: "user", text: "مرحباً، أود استئجار BMW X5 ليومين", time: "10:02" },
      { id: 3, from: "agency", text: "السيارة متاحة بتاريخك، تفضل!", time: "10:05" },
    ]
  },
  {
    id: 2, agencyName: "دريم كارز وهران", wilaya: "وهران",
    avatar: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=80&q=80",
    lastMsg: "شكراً على اختيارك لنا", time: "أمس", unread: 0, verified: true,
    messages: [
      { id: 1, from: "user", text: "هل يمكن التسليم في المطار؟", time: "أمس 14:00" },
      { id: 2, from: "agency", text: "نعم، نوفر خدمة التسليم في المطار مجاناً", time: "أمس 14:10" },
      { id: 3, from: "agency", text: "شكراً على اختيارك لنا", time: "أمس 14:11" },
    ]
  },
  {
    id: 3, agencyName: "الأطلس للسيارات", wilaya: "قسنطينة",
    avatar: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=80&q=80",
    lastMsg: "سيتم تأكيد حجزك خلال ساعة", time: "الاثنين", unread: 0, verified: false,
    messages: [
      { id: 1, from: "user", text: "متى يمكنني تسلم السيارة؟", time: "الاثنين 09:00" },
      { id: 2, from: "agency", text: "سيتم تأكيد حجزك خلال ساعة", time: "الاثنين 09:30" },
    ]
  },
];

function ChatThread({ thread, onClose }) {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(thread.messages);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { id: Date.now(), from: "user", text: text.trim(), time: "الآن" }]);
    setText("");
    setTimeout(() => {
      setMsgs(p => [...p, { id: Date.now() + 1, from: "agency", text: "شكراً على رسالتك، سنرد في أقرب وقت.", time: "الآن" }]);
    }, 1200);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 320, background: "#060711", display: "flex", flexDirection: "column", animation: "pageSlideIn .28s ease" }}>
      <div style={{ padding: "calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px", background: "rgba(6,7,17,.96)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.055)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconBack size={20} color="#fff" />
        </button>
        <img src={thread.avatar} alt={thread.agencyName} style={{ width: 40, height: 40, borderRadius: 14, objectFit: "cover" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontWeight: 900, fontSize: 14.5, color: "#fff" }}>{thread.agencyName}</span>
            {thread.verified && <IconVerified size={13} color="#34D399" />}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", display: "flex", alignItems: "center", gap: 3 }}>
            <IconPin size={9} color="rgba(255,255,255,.38)" /> {thread.wilaya}
          </div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-start" : "flex-end" }}>
            <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: m.from === "user" ? "18px 18px 18px 4px" : "18px 18px 4px 18px", background: m.from === "user" ? "rgba(255,255,255,.07)" : "linear-gradient(135deg, #7C3AED, #4F46E5)", color: "#fff", fontSize: 13.5, fontWeight: 600, lineHeight: 1.55, boxShadow: m.from !== "user" ? "0 4px 16px rgba(124,58,237,.3)" : "none" }}>
              <div>{m.text}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.42)", marginTop: 4, textAlign: m.from === "user" ? "left" : "right" }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 16px max(16px, env(safe-area-inset-bottom, 16px))", background: "rgba(6,7,17,.96)", backdropFilter: "blur(18px)", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 10, alignItems: "center" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), send())} placeholder="اكتب رسالتك..." style={{ flex: 1, height: 44, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, color: "#fff", padding: "0 14px", fontSize: 13.5, fontFamily: "inherit", outline: "none" }} />
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: 14, border: "none", flexShrink: 0, background: text.trim() ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", boxShadow: text.trim() ? "0 4px 16px rgba(124,58,237,.35)" : "none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [activeThread, setActiveThread] = useState(null);
  if (activeThread) return <ChatThread thread={activeThread} onClose={() => setActiveThread(null)} />;

  return (
    <div style={{ minHeight: "62vh", paddingBottom: 20, animation: "fadeUp .28s ease", color: "#F1F5F9" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 950, color: "#fff", letterSpacing: "-.4px" }}>رسائلي</h1>
        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.38)", fontSize: 12.5 }}>{DEMO_THREADS.length} محادثة مع الوكالات</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DEMO_THREADS.map((t, i) => (
          <button key={t.id} className="btn-press hov" onClick={() => setActiveThread(t)} style={{ display: "flex", alignItems: "center", gap: 13, textAlign: "start", background: "rgba(255,255,255,.042)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, padding: "13px 14px", cursor: "pointer", fontFamily: "inherit", animation: `cardIn .35s ease ${i * .06}s both`, width: "100%", position: "relative" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img src={t.avatar} alt={t.agencyName} style={{ width: 52, height: 52, borderRadius: 16, objectFit: "cover", border: "1.5px solid rgba(255,255,255,.1)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: "#34D399", border: "2px solid #060711" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                  <span style={{ fontWeight: 900, fontSize: 14, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.agencyName}</span>
                  {t.verified && <IconVerified size={12} color="#34D399" />}
                </div>
                <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.34)", flexShrink: 0, fontWeight: 600 }}>{t.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 12.5, color: t.unread ? "rgba(255,255,255,.72)" : "rgba(255,255,255,.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: t.unread ? 700 : 500 }}>{t.lastMsg}</span>
                {t.unread > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 999, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 900, color: "#fff", flexShrink: 0, padding: "0 6px", boxShadow: "0 2px 8px rgba(124,58,237,.4)" }}>{t.unread}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 16, background: "rgba(124,58,237,.07)", border: "1px solid rgba(124,58,237,.18)", display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(124,58,237,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconBubble size={18} color="#A78BFA" />
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#C4B5FD" }}>تواصل مع الوكالات مباشرة</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 2 }}>ابدأ محادثة من صفحة السيارة أو الوكالة</div>
        </div>
      </div>
    </div>
  );
}
