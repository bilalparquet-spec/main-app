import { useEffect, useRef, useState, useCallback } from "react";
import { IconBell, IconBubble, IconBack, IconPhone, IconWhatsapp } from "../ui/AppIcons.jsx";
import { dbSelect, dbInsert, dbUpdate, getCurrentUser, getAppLanguage, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_READY } from "../../lib/supabase.js";
import { EmptyState } from "../ui/EmptyState.jsx";

// ─── Realtime WebSocket via Supabase — hook مشترك ────────────────────────────
// filter اختياري: إذا غاب يراقب جميع رسائل المستخدم (للـ badge في القائمة)
// إذا أُعطي agency_id يُضيّق على محادثة واحدة (داخل ChatView)
function useRealtimeMessages(userId, onNewMessage, agencyId = null) {
  useEffect(() => {
    if (!SUPABASE_READY || !userId) return;
    const wsUrl = SUPABASE_URL.replace("https://", "wss://").replace("http://", "ws://");
    let ws;
    let hbInterval;
    let closed = false;

    const filter = agencyId ? `agency_id=eq.${agencyId}` : undefined;

    const connect = () => {
      ws = new WebSocket(`${wsUrl}/realtime/v1/websocket?apikey=${SUPABASE_ANON_KEY}&vsn=1.0.0`);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          topic: "realtime:public:messages",
          event: "phx_join",
          payload: {
            config: {
              broadcast: { ack: false },
              postgres_changes: [{ event: "INSERT", schema: "public", table: "messages", ...(filter ? { filter } : {}) }],
            },
          },
          ref: "1",
        }));
        hbInterval = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ topic: "phoenix", event: "heartbeat", payload: {}, ref: "hb" })), 25000);
      };
      ws.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.event === "postgres_changes" && data.payload?.data?.record) {
            onNewMessage(data.payload.data.record);
          }
        } catch {}
      };
      ws.onclose = () => { clearInterval(hbInterval); if (!closed) setTimeout(connect, 3000); };
    };
    connect();
    return () => { closed = true; clearInterval(hbInterval); ws?.close(); };
  }, [userId, agencyId]); // eslint-disable-line
}

// ─── Storage upload via Supabase ─────────────────────────────────────────────
async function uploadFile(file) {
  const ext = file.name.split(".").pop() || "bin";
  const name = `chat/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/chat-media/${name}`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": file.type, "x-upsert": "true" },
    body: file,
  });
  if (!res.ok) throw new Error("فشل رفع الملف");
  return `${SUPABASE_URL}/storage/v1/object/public/chat-media/${name}`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtTime(iso) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }); } catch { return ""; }
}

function fmtDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "اليوم";
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "أمس";
    return d.toLocaleDateString("ar-DZ", { day: "numeric", month: "short" });
  } catch { return ""; }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoSend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoImage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L7 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IcoMic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 10C5 14.4183 8.13401 18 12 18C15.866 18 19 14.4183 19 10M12 18V22M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IcoCheck = ({ double = false, read = false }) => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M1 6L5 10L11 2" stroke={read ? "#7C3AED" : "rgba(255,255,255,.4)"} strokeWidth="1.8" strokeLinecap="round"/>
    {double && <path d="M5 6L9 10L15 2" stroke={read ? "#7C3AED" : "rgba(255,255,255,.4)"} strokeWidth="1.8" strokeLinecap="round"/>}
  </svg>
);
const IcoPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z"/>
  </svg>
);

// ─── Message bubble ────────────────────────────────────────────────────────────
function MsgBubble({ msg, isMe }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const isImage = msg.media_type === "image";
  const isAudio = msg.media_type === "audio";

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", marginBottom: 4 }}>
      <div style={{
        maxWidth: "78%",
        background: isMe ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(255,255,255,.09)",
        borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        border: isMe ? "none" : "1px solid rgba(255,255,255,.1)",
        padding: isImage ? 4 : "10px 13px",
        boxShadow: isMe ? "0 4px 20px rgba(124,58,237,.3)" : "0 2px 8px rgba(0,0,0,.2)",
        position: "relative",
      }}>
        {isImage && msg.media_url && (
          <img src={msg.media_url} alt="صورة" style={{ borderRadius: 14, maxWidth: 220, maxHeight: 280, display: "block", objectFit: "cover" }} />
        )}
        {isAudio && msg.media_url && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px" }}>
            <button onClick={toggleAudio} style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,.15)", border: "none", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer" }}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : <IcoPlay />}
            </button>
            <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,.2)", borderRadius: 3, minWidth: 80 }}>
              <div style={{ width: "30%", height: "100%", background: "#A78BFA", borderRadius: 3 }} />
            </div>
            <audio ref={audioRef} src={msg.media_url} onEnded={() => setPlaying(false)} />
          </div>
        )}
        {msg.body && <p style={{ margin: 0, color: "#fff", fontSize: 14.5, lineHeight: 1.55, wordBreak: "break-word" }}>{msg.body}</p>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: isImage ? 4 : 5, paddingInline: isImage ? 6 : 0, paddingBottom: isImage ? 4 : 0 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.45)", fontWeight: 700 }}>{fmtTime(msg.created_at)}</span>
          {isMe && <IcoCheck double read={msg.status === "read"} />}
        </div>
      </div>
    </div>
  );
}

// ─── Date separator ────────────────────────────────────────────────────────────
function DateSep({ date }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 8px" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
      <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 800, whiteSpace: "nowrap" }}>{date}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
    </div>
  );
}

// ─── Chat View ────────────────────────────────────────────────────────────────
function ChatView({ conv, userId, onBack }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const bottomRef = useRef(null);
  const imgRef = useRef(null);
  const mediaRec = useRef(null);
  const chunks = useRef([]);

  // Load messages
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const rows = await dbSelect("messages", `?user_id=eq.${encodeURIComponent(userId)}&agency_id=eq.${encodeURIComponent(conv.agencyId)}&order=created_at.asc`);
        if (alive) setMsgs(rows || []);
        // Mark as read
        if (rows?.some(r => r.direction === "agency_to_user" && r.status !== "read")) {
          // dbUpdate تتوقع object كـ match — نستخدم raw fetch هنا للشرط المركّب
          fetch(`${SUPABASE_URL}/rest/v1/messages?agency_id=eq.${encodeURIComponent(conv.agencyId)}&user_id=eq.${encodeURIComponent(userId)}&direction=eq.agency_to_user&status=neq.read`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, Prefer: "return=minimal" },
            body: JSON.stringify({ status: "read" }),
          }).catch(() => {});
        }
      } catch {}
    };
    load();
    return () => { alive = false; };
  }, [conv.agencyId, userId]);

  // Scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  // Realtime — WebSocket مُضيَّق على هذه الوكالة فقط (agencyId كـ filter)
  useRealtimeMessages(userId, (r) => {
    if (r.user_id !== userId && r.direction !== "agency_to_user") return;
    setMsgs(p => p.find(m => m.id === r.id) ? p : [...p, r]);
    if (r.direction === "agency_to_user") {
      dbUpdate("messages", { id: r.id }, { status: "read" }).catch(() => {});
    }
  }, conv.agencyId);

  const sendMsg = async (body = text, mediaUrl = null, mediaType = null) => {
    if (!body.trim() && !mediaUrl) return;
    setSending(true);
    const payload = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      agency_id: conv.agencyId,
      agency_name: conv.agencyName,
      user_id: userId,
      user_name: conv.userName,
      subject: conv.subject || "محادثة",
      body: body.trim(),
      direction: "user_to_agency",
      status: "pending",
      ...(mediaUrl && { media_url: mediaUrl, media_type: mediaType }),
    };
    try {
      await dbInsert("messages", payload);
      setMsgs(p => [...p, { ...payload, created_at: new Date().toISOString() }]);
      setText("");
    } catch (e) { console.error(e); }
    setSending(false);
  };

  const sendImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      await sendMsg("", url, "image");
    } catch { alert("تعذر رفع الصورة"); }
    setUploading(false);
    e.target.value = "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];
      mediaRec.current = new MediaRecorder(stream);
      mediaRec.current.ondataavailable = e => chunks.current.push(e.data);
      mediaRec.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const file = new File([blob], "voice.webm", { type: "audio/webm" });
        setUploading(true);
        try {
          const url = await uploadFile(file);
          await sendMsg("[ رسالة صوتية ]", url, "audio");
        } catch { alert("تعذر إرسال الرسالة الصوتية"); }
        setUploading(false);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRec.current.start();
      setRecording(true);
    } catch { alert("تعذر الوصول للميكروفون"); }
  };

  const stopRecording = () => {
    mediaRec.current?.stop();
    setRecording(false);
  };

  // Group msgs by date
  const grouped = [];
  let lastDate = "";
  msgs.forEach(m => {
    const d = fmtDate(m.created_at);
    if (d !== lastDate) { grouped.push({ type: "date", label: d }); lastDate = d; }
    grouped.push({ type: "msg", msg: m });
  });

  return (
    <div style={{ position: "fixed", inset: 0, background: "#050506", display: "flex", flexDirection: "column", zIndex: 200 }}>
      {/* Header */}
      <div style={{ padding: "max(14px,env(safe-area-inset-top)) 14px 12px", background: "rgba(7,8,15,.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.055)", color: "#fff", display: "grid", placeItems: "center" }}>
          <IconBack size={18} color="#fff" />
        </button>
        <div style={{ width: 40, height: 40, borderRadius: 13, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 16, fontWeight: 900 }}>
          {conv.agencyName?.slice(0, 1) || "و"}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{conv.agencyName}</div>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11, fontWeight: 700 }}>وكالة السيارات</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", WebkitOverflowScrolling: "touch" }}>
        {grouped.map((item, i) =>
          item.type === "date"
            ? <DateSep key={`d-${i}`} date={item.label} />
            : <MsgBubble key={item.msg.id} msg={item.msg} isMe={item.msg.direction === "user_to_agency"} />
        )}
        {(uploading || sending) && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
            <div style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)", borderRadius: "18px 18px 4px 18px", padding: "10px 14px", opacity: 0.6 }}>
              <span style={{ color: "#fff", fontSize: 13 }}>جاري الإرسال...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px max(14px,env(safe-area-inset-bottom))", background: "rgba(7,8,15,.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <input ref={imgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={sendImage} />
        <button onClick={() => imgRef.current?.click()} style={{ width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.055)", color: "rgba(255,255,255,.6)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <IcoImage />
        </button>
        <button onPointerDown={startRecording} onPointerUp={stopRecording} onPointerLeave={stopRecording} style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${recording ? "rgba(239,68,68,.5)" : "rgba(255,255,255,.1)"}`, background: recording ? "rgba(239,68,68,.15)" : "rgba(255,255,255,.055)", color: recording ? "#F87171" : "rgba(255,255,255,.6)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <IcoMic />
        </button>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMsg())}
          placeholder="اكتب رسالتك..."
          style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, color: "#fff", padding: "11px 14px", fontSize: 14.5, fontFamily: "inherit", outline: "none" }}
        />
        <button onClick={() => sendMsg()} disabled={!text.trim() || sending} style={{ width: 42, height: 42, borderRadius: 13, border: "none", background: text.trim() ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.06)", color: text.trim() ? "#fff" : "rgba(255,255,255,.3)", display: "grid", placeItems: "center", flexShrink: 0, cursor: text.trim() ? "pointer" : "not-allowed", transition: "all .2s", boxShadow: text.trim() ? "0 4px 16px rgba(124,58,237,.35)" : "none" }}>
          <IcoSend />
        </button>
      </div>
    </div>
  );
}

// ─── Conversation list ────────────────────────────────────────────────────────
function ConvList({ convs, onOpen }) {
  if (!convs.length) return (
    <EmptyState variant="messages" onAction={() => window.history.back()} />
  );

  return (
    <div style={{ padding: "12px 0 0", display: "grid", gap: 1 }}>
      {convs.map((c, i) => {
        const lastMsg = c.msgs[c.msgs.length - 1];
        const unread = c.msgs.filter(m => m.direction === "agency_to_user" && m.status !== "read").length;
        return (
          <button key={i} onClick={() => onOpen(c)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,.06)", cursor: "pointer", textAlign: "start" }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 18, fontWeight: 900, color: "#fff", position: "relative" }}>
              {c.agencyName?.slice(0, 1) || "و"}
              {unread > 0 && (
                <div style={{ position: "absolute", top: -3, right: -3, minWidth: 18, height: 18, borderRadius: 999, background: "#EF4444", color: "#fff", fontSize: 10, fontWeight: 900, display: "grid", placeItems: "center", padding: "0 4px" }}>{unread}</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 14.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.agencyName}</span>
                <span style={{ color: "rgba(255,255,255,.35)", fontSize: 10.5, fontWeight: 700, flexShrink: 0 }}>{fmtTime(lastMsg?.created_at)}</span>
              </div>
              <div style={{ color: unread ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.4)", fontSize: 12.5, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: unread ? 700 : 500 }}>
                {lastMsg?.direction === "user_to_agency" ? "أنت: " : ""}{lastMsg?.media_type === "image" ? "[ صورة ]" : lastMsg?.media_type === "audio" ? "[ رسالة صوتية ]" : lastMsg?.body || "رسالة"}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Notifications tab ────────────────────────────────────────────────────────
function NotifTab({ t }) {
  return (
    <div style={{ paddingTop: 16 }}>
      <div style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 16, padding: "14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 14, marginBottom: 5 }}>{t.welcome}</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12.5, lineHeight: 1.6 }}>{t.intro}</div>
          <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10.5, marginTop: 6 }}>{t.now}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function MessagesPage() {
  const [tab, setTab] = useState("messages");
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const lang = getAppLanguage();
  const t = {
    ar: { inbox: "الرسائل", messages: "الرسائل", notifications: "الإشعارات", activity: "النشاط", welcome: "مرحباً بك في RENT Drive", intro: "شكراً لانضمامك إلى المنصة. رحلتك تبدأ من هنا.", now: "الآن", noMessages: "لا توجد رسائل", agency: "الوكالة" },
    fr: { inbox: "Messages", messages: "MESSAGES", notifications: "NOTIFICATIONS", activity: "ACTIVITÉ", welcome: "Bienvenue sur RENT Drive", intro: "Merci d'avoir rejoint la plateforme.", now: "Maintenant", noMessages: "Aucun message", agency: "Agence" },
    en: { inbox: "Inbox", messages: "MESSAGES", notifications: "NOTIFICATIONS", activity: "ACTIVITY", welcome: "Welcome to RENT Drive", intro: "Thanks for joining.", now: "Now", noMessages: "No messages", agency: "Agency" },
  }[lang] || { inbox: "الرسائل", messages: "الرسائل", notifications: "الإشعارات", activity: "النشاط", welcome: "مرحبا", intro: "", now: "الآن", noMessages: "لا توجد رسائل", agency: "وكالة" };

  const user = getCurrentUser();

  const loadConvs = useCallback(async () => {
    if (!user?.id) return;
    try {
      const rows = await dbSelect("messages", `?user_id=eq.${encodeURIComponent(user.id)}&order=created_at.asc`);
      if (!rows?.length) return;
      const byAgency = {};
      rows.forEach(m => {
        const k = m.agency_id || "x";
        if (!byAgency[k]) byAgency[k] = { agencyId: m.agency_id, agencyName: m.agency_name || "وكالة", userName: m.user_name || user?.user_metadata?.full_name || "مستخدم", subject: m.subject, msgs: [] };
        byAgency[k].msgs.push(m);
      });
      const list = Object.values(byAgency);
      setConvs(list);
      setUnreadCount(rows.filter(m => m.direction === "agency_to_user" && m.status !== "read").length);
    } catch {}
  }, [user?.id]);

  useEffect(() => {
    loadConvs();
    window.addEventListener("driverent:message-created", loadConvs);
    return () => window.removeEventListener("driverent:message-created", loadConvs);
  }, [loadConvs]);

  // Global realtime — نفس الـ hook المشترك بدون agencyId (يراقب كل الرسائل)
  useRealtimeMessages(user?.id, (r) => {
    if (r.user_id === user?.id && r.direction === "agency_to_user") {
      setUnreadCount(p => p + 1);
      loadConvs();
    }
  });

  if (activeConv) {
    return <ChatView conv={activeConv} userId={user?.id} onBack={() => { setActiveConv(null); loadConvs(); }} />;
  }

  return (
    <div style={{ minHeight: "100dvh", padding: "4px 0 104px", animation: "fadeUp .28s ease", background: "#050506", color: "#fff" }}>
      <header style={{ textAlign: "center", padding: "6px 0 12px", position: "relative" }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 950, letterSpacing: ".2px" }}>{t.inbox}</h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,.12)", margin: "0 calc(var(--app-padding, 14px) * -1) 0" }}>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")} label={t.messages} icon={<IconBubble size={13} color="currentColor" />} badge={unreadCount} />
        <TabButton active={tab === "notifications"} onClick={() => setTab("notifications")} label={t.notifications} icon={<IconBell size={13} color="currentColor" />} />
      </div>

      <div style={{ padding: "0 var(--app-padding, 14px)" }}>
        {tab === "notifications" ? (
          <NotifTab t={t} />
        ) : (
          <ConvList convs={convs} onOpen={setActiveConv} />
        )}
      </div>
    </div>
  );
}

function TabButton({ active, icon, label, onClick, badge = 0 }) {
  return (
    <button onClick={onClick} style={{ position: "relative", minHeight: 44, border: "none", background: "transparent", color: active ? "#8B7CFF" : "rgba(255,255,255,.52)", fontFamily: "inherit", fontSize: 10.8, fontWeight: 950, letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
      <span style={{ position: "relative" }}>
        {icon}
        {badge > 0 && <span style={{ position: "absolute", top: -5, right: -7, minWidth: 16, height: 16, borderRadius: 999, background: "#EF4444", color: "#fff", fontSize: 9, fontWeight: 900, display: "grid", placeItems: "center", padding: "0 3px" }}>{badge}</span>}
      </span>
      {label}
      {active && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "#7C3AED" }} />}
    </button>
  );
}
