import { useState } from "react";
import { AgencyLogo } from "../components/UI";
import { Ic } from "../components/Icons";

export function ProfileModal({ lang, user, onClose, onUpdate, onLogout, convs, setConvs, ag, agencies }: any) {
  const [form, setForm] = useState<any>({ name: user.name, phone: user.phone, email: user.email || "", preview: null, avatar: user.avatar });
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("profile");
  const [activeC, setActiveC] = useState<any>(convs && convs.length ? convs[0].id : null);
  const [msgIn, setMsgIn] = useState("");
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));

  const L: any = {
    ar: { title:"ملفي الشخصي", nameL:"الاسم الكامل", phoneL:"رقم الهاتف", emailL:"البريد الإلكتروني", photo:"تغيير الصورة", save:"حفظ التعديلات", logout:"تسجيل الخروج", saved:"تم الحفظ ✓", member:"تاريخ التسجيل", lastLogin:"آخر دخول", newAccount:"حساب جديد", profileTab:"الملف الشخصي", messagesTab:"رسائلي", noConv:"لا توجد رسائل بعد", typeMsg:"اكتب رسالة...", send:"إرسال" },
    fr: { title:"Mon Profil", nameL:"Nom complet", phoneL:"Téléphone", emailL:"Email", photo:"Changer la photo", save:"Enregistrer", logout:"Se déconnecter", saved:"Enregistré ✓", member:"Inscrit le", lastLogin:"Dernière connexion", newAccount:"Nouveau compte", profileTab:"Profil", messagesTab:"Messages", noConv:"Aucun message", typeMsg:"Écrire un message...", send:"Envoyer" },
    en: { title:"My Profile", nameL:"Full Name", phoneL:"Phone", emailL:"Email", photo:"Change Photo", save:"Save Changes", logout:"Sign Out", saved:"Saved ✓", member:"Member since", lastLogin:"Last login", newAccount:"New Account", profileTab:"Profile", messagesTab:"Messages", noConv:"No messages yet", typeMsg:"Type a message...", send:"Send" },
  };
  const l = L[lang] || L.ar;
  const rtl = lang === "ar";
  const IS: any = { width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, color: "#fff", padding: "11px 14px", fontSize: 14, marginTop: 6, fontFamily: "inherit" };

  const handlePhoto = (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = (ev: any) => setForm((f: any) => ({ ...f, preview: ev.target.result, avatar: ev.target.result }));
    r.readAsDataURL(file);
  };

  const save = () => { onUpdate({ ...user, ...form }); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const joinDate = user.joinDate ? new Date(user.joinDate) : null;
  const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;
  const daysSince = joinDate ? Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24)) : 999;
  const isNew = daysSince < 30;
  const fmtDate = (d: any) => { if (!d) return "—"; return d.toLocaleDateString(lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-GB", { year: "numeric", month: "long", day: "numeric" }); };

  const activeConv = convs?.find((c: any) => c.id === activeC);
  const sendMsg = () => {
    if (!msgIn.trim() || !activeC || !setConvs) return;
    const txt = msgIn; setMsgIn("");
    setConvs((p: any) => p.map((c: any) => c.id === activeC ? { ...c, msgs: [...c.msgs, { from: "user", text: txt, time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }) }] } : c));
    setTimeout(() => {
      const rep = ["شكراً على تواصلك! سنرد في أقرب وقت ✓", "تم استلام رسالتك، سيتصل بك فريقنا", "بكل سرور، كيف يمكنني مساعدتك أكثر؟"];
      setConvs((p: any) => p.map((c: any) => c.id === activeC ? { ...c, msgs: [...c.msgs, { from: "agency", text: rep[Math.floor(Math.random() * rep.length)], time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }) }] } : c));
    }, 1100);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.82)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, direction: rtl ? "rtl" : "ltr" }}
      onClick={(e: any) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#0D0D1E", border: "1px solid rgba(124,58,237,.35)", borderRadius: 24, width: "100%", maxWidth: 520, animation: "fadeUp .35s ease both", maxHeight: "92vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>

        {/* Header Banner */}
        <div style={{ position: "relative", background: "linear-gradient(135deg,rgba(124,58,237,.35),rgba(99,102,241,.25))", borderRadius: "24px 24px 0 0", padding: "24px 24px 58px", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "#5B21B6", opacity: .18, filter: "blur(50px)", top: -60, right: -20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{l.title}</h2>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "rgba(255,255,255,.6)", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 8, position: "absolute", bottom: 14, left: 24, right: 24, zIndex: 1 }}>
            {[{k:"profile",icon:"👤",label:l.profileTab},{k:"messages",icon:"💬",label:l.messagesTab}].map((tb: any) => (
              <button key={tb.k} onClick={() => setTab(tb.k)} style={{ flex: 1, background: tab === tb.k ? "rgba(124,58,237,.5)" : "rgba(255,255,255,.07)", border: `1px solid ${tab === tb.k ? "rgba(124,58,237,.7)" : "rgba(255,255,255,.12)"}`, color: tab === tb.k ? "#fff" : "rgba(255,255,255,.5)", padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all .2s" }}>
                {tb.icon} {tb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: -44, marginBottom: 4, position: "relative", zIndex: 2, flexShrink: 0 }}>
          <div style={{ position: "relative" }}>
            <img src={form.avatar} alt="" style={{ width: 88, height: 88, borderRadius: "50%", border: "4px solid #0D0D1E", objectFit: "cover", display: "block", background: "#1a1a2e" }} />
            {isNew && <div style={{ position: "absolute", top: -6, right: -6, background: "linear-gradient(135deg,#F59E0B,#EF4444)", color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 7px", borderRadius: 20, border: "2px solid #0D0D1E", whiteSpace: "nowrap" }}>{l.newAccount} ✨</div>}
            <button onClick={() => document.getElementById("profAvInp")?.click()} style={{ position: "absolute", bottom: 2, right: 2, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "2px solid #0D0D1E", color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✏️</button>
            <input id="profAvInp" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 16, padding: "0 16px", flexShrink: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{user.name}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.38)" }}>
              <span>📅</span><span>{l.member}: </span><span style={{ color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{fmtDate(joinDate)}</span>
            </div>
            {lastLoginDate && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "rgba(255,255,255,.28)" }}>
                <span>🕐</span><span>{l.lastLogin}: </span><span>{fmtDate(lastLoginDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", flexShrink: 0 }}>
          {[{n:user.phone,l:"📞"},{n:user.provider||"manual",l:"🔐"},{n:daysSince,l:lang==="ar"?"يوم":lang==="fr"?"jours":"days"}].map((s: any, i: number) => (
            <div key={i} style={{ flex: 1, padding: "12px 6px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div style={{ fontSize: 16 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.n}</div>
            </div>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.nameL}</label>
              <input value={form.name} onChange={set("name")} style={IS} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.phoneL}</label>
              <input value={form.phone} onChange={set("phone")} style={{ ...IS, direction: "ltr" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.emailL}</label>
              <input value={form.email} onChange={set("email")} type="email" style={{ ...IS, direction: "ltr" }} />
            </div>
            <button onClick={save} style={{ background: saved ? "linear-gradient(135deg,#059669,#34D399)" : "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 700, transition: "background .4s" }}>
              {saved ? l.saved : l.save}
            </button>
            <button onClick={onLogout} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", color: "#FCA5A5", padding: "11px", borderRadius: 11, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              {l.logout}
            </button>
          </div>
        )}

        {/* Messages Tab */}
        {tab === "messages" && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
            {!convs || convs.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "rgba(255,255,255,.35)", fontSize: 14 }}>{l.noConv}</div>
            ) : (
              <div style={{ display: "flex", height: 360, overflow: "hidden" }}>
                <div style={{ width: 140, borderRight: "1px solid rgba(255,255,255,.07)", overflowY: "auto", flexShrink: 0 }}>
                  {convs.map((c: any) => {
                    const agency = ag && ag(c.agencyId);
                    const last = c.msgs[c.msgs.length - 1];
                    return (
                      <div key={c.id} onClick={() => setActiveC(c.id)}
                        style={{ padding: "10px 12px", cursor: "pointer", background: activeC === c.id ? "rgba(124,58,237,.18)" : "transparent", borderBottom: "1px solid rgba(255,255,255,.05)", transition: "background .15s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          {agency ? <AgencyLogo agency={agency} size={28} /> : <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🏢</div>}
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{agency ? (lang === "ar" ? agency.ar : agency.fr) : "#" + c.agencyId}</div>
                        </div>
                        {last && <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{last.text}</div>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  {activeConv ? (
                    <>
                      {ag && ag(activeConv.agencyId) && (
                        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, background: "rgba(124,58,237,.06)" }}>
                          <AgencyLogo agency={ag(activeConv.agencyId)} size={30} />
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{lang === "ar" ? ag(activeConv.agencyId)?.ar : ag(activeConv.agencyId)?.fr}</div>
                            <div style={{ fontSize: 10, color: "#34D399", fontWeight: 600 }}>● {lang === "ar" ? "متصل" : lang === "fr" ? "En ligne" : "Online"}</div>
                          </div>
                        </div>
                      )}
                      <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
                        {activeConv.msgs.map((m: any, i: number) => (
                          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "user" ? "flex-end" : "flex-start", gap: 2 }}>
                            <div style={{ maxWidth: "82%", padding: "8px 12px", fontSize: 12, color: "#fff", lineHeight: 1.5, borderRadius: m.from === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", background: m.from === "user" ? "linear-gradient(135deg,#7C3AED,#5B4DE8)" : "rgba(255,255,255,.07)" }}>{m.text}</div>
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,.28)" }}>{m.time}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", gap: 8, flexShrink: 0 }}>
                        <input value={msgIn} onChange={(e: any) => setMsgIn(e.target.value)} onKeyDown={(e: any) => e.key === "Enter" && sendMsg()} placeholder={l.typeMsg}
                          style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "9px 12px", fontSize: 12, fontFamily: "inherit" }} />
                        <button onClick={sendMsg} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Ic.Send />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.3)", fontSize: 13 }}>{l.noConv}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
