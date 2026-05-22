import { useState, useRef, useEffect } from "react";
import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { AGENCIES } from "../data/agencies";
import { Conversation } from "../data/conversations";
import { sendChatMessage } from "../services/chatService";

interface Props {
  t: any;
  lang: string;
  rtl: boolean;
  convs: Conversation[];
  setConvs: (fn: (p: Conversation[]) => Conversation[]) => void;
  activeC: number | null;
  setActiveC: (id: number | null) => void;
  currentUser: any;
  onOpenAuth: () => void;
  onBack: () => void;
}

export function MessagesPage({
  t, lang, rtl, convs, setConvs, activeC, setActiveC, currentUser, onOpenAuth, onBack,
}: Props) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgs = t.msgs;

  const activeConv = convs.find(c => c.id === activeC);
  const agency = activeConv ? AGENCIES.find(a => a.id === activeConv.agencyId) : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.msgs, typing]);

  const send = () => {
    if (!input.trim() || !activeC) return;
    sendChatMessage(activeC, input.trim(), null, lang, setConvs, setTyping);
    setInput("");
  };

  if (!currentUser) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40 }}>
        <div style={{ fontSize: 52 }}>💬</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{msgs.title}</h2>
        <p style={{ color: "rgba(255,255,255,.42)", fontSize: 14, textAlign: "center" }}>{lang === "ar" ? "سجّل دخولك للوصول إلى رسائلك" : "Connectez-vous pour accéder à vos messages"}</p>
        <button onClick={onOpenAuth} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "11px 28px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
          {lang === "ar" ? "تسجيل الدخول" : "Se connecter"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - 120px)", maxWidth: 1000, margin: "0 auto", padding: "0 5%", gap: 16 }}>
      {/* Conversation list */}
      <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }} className="mob-hide">
        <div style={{ padding: "14px 0 10px", fontSize: 15, fontWeight: 800, color: "#fff", borderBottom: "1px solid rgba(255,255,255,.07)", marginBottom: 8 }}>{msgs.title}</div>
        {convs.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "rgba(255,255,255,.28)", fontSize: 13 }}>
            <div style={{ fontSize: 36 }}>💬</div>{msgs.noConv}
          </div>
        ) : convs.map(c => {
          const ag = AGENCIES.find(a => a.id === c.agencyId);
          const last = c.msgs[c.msgs.length - 1];
          return (
            <button key={c.id} onClick={() => setActiveC(c.id)}
              style={{ display: "flex", gap: 10, padding: "11px 10px", borderRadius: 11, border: "none", background: activeC === c.id ? "rgba(124,58,237,.18)" : "transparent", cursor: "pointer", textAlign: "start", transition: "background .2s" }}>
              {ag && <AgencyLogo agency={ag} size={42} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ag ? (lang === "ar" ? ag.ar : ag.fr) : "—"}</div>
                {last && <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{last.text}</div>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, overflow: "hidden" }}>
        {activeConv && agency ? (
          <>
            {/* Chat header */}
            <div style={{ padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 11, background: "rgba(255,255,255,.03)" }}>
              <AgencyLogo agency={agency} size={38} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{lang === "ar" ? agency.ar : agency.fr}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#34D399" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", animation: "pulse 2s infinite", display: "inline-block" }} />{msgs.online}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {activeConv.msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? (rtl ? "flex-start" : "flex-end") : (rtl ? "flex-end" : "flex-start"), animation: "fadeUp .3s ease both" }}>
                  <div className={m.from === "user" ? "bu" : "ba"} style={{ maxWidth: "72%", padding: "9px 13px" }}>
                    <p style={{ fontSize: 13, color: m.from === "user" ? "#fff" : "rgba(255,255,255,.85)", lineHeight: 1.6 }}>{m.text}</p>
                    <div style={{ fontSize: 9, color: m.from === "user" ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.3)", marginTop: 3, display: "flex", alignItems: "center", gap: 4, justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                      {m.time}{m.from === "user" && m.status === "delivered" && <span>✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: "flex", justifyContent: rtl ? "flex-end" : "flex-start" }}>
                  <div className="ba" style={{ padding: "11px 16px", display: "flex", gap: 4, alignItems: "center" }}>
                    {[{ a: "typing1" }, { a: "typing2" }, { a: "typing3" }].map((d, i) => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA", display: "inline-block", animation: `${d.a} 1.2s ease infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "11px 14px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", gap: 10 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder={msgs.type} style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 22, color: "#fff", padding: "10px 16px", fontSize: 13 }} />
              <button onClick={send} disabled={!input.trim()} style={{ width: 40, height: 40, borderRadius: "50%", background: input.trim() ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.07)", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all .2s", flexShrink: 0 }}>
                <Ic.Send />
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "rgba(255,255,255,.28)" }}>
            <div style={{ fontSize: 44 }}>💬</div>
            <div style={{ fontSize: 14 }}>{msgs.selectConv}</div>
          </div>
        )}
      </div>
    </div>
  );
}
