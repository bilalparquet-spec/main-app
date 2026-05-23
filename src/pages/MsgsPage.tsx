import { useRef, useEffect } from "react";
import { AgencyLogo, BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";

export function MsgsPage({t,rtl,lang,convs,activeC,setActiveC,msgIn,setMsgIn,sendMsg,ag,goBack,chatTyping,chatAttach,setChatAttach,chatAttachMenu,setChatAttachMenu,chatSearch,setChatSearch,chatSearchOpen,setChatSearchOpen,handleChatFileAttach,handleChatMsgChange,chatFileRef,chatImgRef}: any) {
  const endRef = useRef<any>(null);
  const conv = convs.find((c: any) => c.id === activeC);
  const agency = conv ? ag(conv.agencyId) : null;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [conv?.msgs?.length, chatTyping]);

  const filteredMsgs = chatSearchOpen && chatSearch.trim()
    ? conv?.msgs.filter((m: any) => m.text?.toLowerCase().includes(chatSearch.toLowerCase()))
    : conv?.msgs;

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 5% 52px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <button onClick={goBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
          <Ic.Back />
        </button>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(124,58,237,.18)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C084FC" }}><Ic.Msg /></div>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: "#fff" }}>{t.msgs.title}</h1>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", display: "flex", alignItems: "center", gap: 5, marginRight: "auto", marginLeft: "auto" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulse 2s infinite" }} />
          {lang === "ar" ? "دردشة مباشرة" : "Live Chat"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, height: "calc(100vh - 220px)", minHeight: 460 }}>
        {/* Conversations List */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,.06)", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{t.msgs.title}</span>
            <span style={{ background: "rgba(124,58,237,.2)", color: "#C084FC", fontSize: 10, padding: "2px 7px", borderRadius: 9, fontWeight: 800 }}>{convs.length}</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {convs.length === 0 && <div style={{ textAlign: "center", padding: "36px 16px", color: "rgba(255,255,255,.28)", fontSize: 12 }}>{t.msgs.noConv}</div>}
            {convs.map((c: any) => {
              const a = ag(c.agencyId); const last = c.msgs[c.msgs.length - 1];
              const isOnline = [1, 3, 5].includes(a?.id);
              return (
                <div key={c.id} onClick={() => setActiveC(c.id)}
                  style={{ padding: "13px 14px", cursor: "pointer", background: activeC === c.id ? "rgba(124,58,237,.16)" : "transparent", borderBottom: "1px solid rgba(255,255,255,.04)", borderLeft: activeC === c.id ? "3px solid #7C3AED" : "3px solid transparent", transition: "background .15s" }}>
                  <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      {a && <AgencyLogo agency={a} size={40} />}
                      <div style={{ position: "absolute", bottom: -1, right: -1, width: 11, height: 11, borderRadius: "50%", background: isOnline ? "#34D399" : "rgba(255,255,255,.2)", border: "2px solid #06060F" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lang === "ar" ? a?.ar : a?.fr}</span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>{last?.time || ""}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,.32)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {last ? (last.from === "user" ? "✓ " : "") + (last.attach ? (last.attach.type === "image" ? "🖼️ " : "📄 ") + last.attach.name : last.text) : t.msgs.noConv}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!activeC ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "rgba(255,255,255,.2)" }}>
              <div style={{ fontSize: 48 }}>💬</div>
              <div style={{ fontSize: 14 }}>{t.msgs.selectConv}</div>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 11, background: "rgba(255,255,255,.025)" }}>
                {agency && <AgencyLogo agency={agency} size={38} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{lang === "ar" ? agency?.ar : agency?.fr}</div>
                  <div style={{ fontSize: 11, color: "#34D399", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulse 2s infinite" }} />
                    {t.msgs.online}
                  </div>
                </div>
                {/* Search toggle */}
                <button onClick={() => setChatSearchOpen((v: boolean) => !v)} style={{ background: chatSearchOpen ? "rgba(124,58,237,.2)" : "rgba(255,255,255,.05)", border: `1px solid ${chatSearchOpen ? "rgba(124,58,237,.4)" : "rgba(255,255,255,.1)"}`, color: chatSearchOpen ? "#C084FC" : "rgba(255,255,255,.4)", width: 34, height: 34, borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ic.Search />
                </button>
                {agency?.phone && <a href={`tel:${agency.phone}`} style={{ background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)", color: "#34D399", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><Ic.Phone /></a>}
              </div>

              {/* Search bar */}
              {chatSearchOpen && (
                <div style={{ padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,.05)", background: "rgba(124,58,237,.04)" }}>
                  <input value={chatSearch} onChange={(e: any) => setChatSearch(e.target.value)} placeholder={lang === "ar" ? "ابحث في المحادثة..." : lang === "fr" ? "Rechercher..." : "Search messages..."}
                    style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, color: "#fff", padding: "8px 12px", fontSize: 13 }} />
                </div>
              )}

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                {(!filteredMsgs || filteredMsgs.length === 0) && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(255,255,255,.22)", fontSize: 12 }}>
                    {chatSearchOpen && chatSearch ? (lang === "ar" ? "لا توجد نتائج" : "No results") : (lang === "ar" ? "ابدأ المحادثة..." : "Start the conversation...")}
                  </div>
                )}
                {(filteredMsgs || []).map((m: any, i: number) => (
                  <div key={m.id || i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", animation: "fadeUp .2s ease both" }}>
                    {m.from === "agency" && agency && (
                      <div style={{ flexShrink: 0, marginLeft: rtl ? 0 : 8, marginRight: rtl ? 8 : 0, alignSelf: "flex-end" }}>
                        <AgencyLogo agency={agency} size={28} style={{ borderRadius: 8 }} />
                      </div>
                    )}
                    <div style={{ maxWidth: "72%" }}>
                      <div style={{ padding: m.attach && m.attach.type === "image" ? "6px" : "10px 14px", borderRadius: m.from === "user" ? (rtl ? "4px 16px 16px 16px" : "16px 4px 16px 16px") : (rtl ? "16px 4px 16px 16px" : "4px 16px 16px 16px"), background: m.from === "user" ? "linear-gradient(135deg,#7C3AED,#5B4DE8)" : "rgba(255,255,255,.08)", fontSize: 13, color: "#fff", lineHeight: 1.6, wordBreak: "break-word" }}>
                        {m.attach && m.attach.type === "image" && <img src={m.attach.url} alt={m.attach.name} style={{ width: "100%", maxWidth: 230, borderRadius: 10, display: "block", marginBottom: m.text ? 6 : 0 }} />}
                        {m.attach && m.attach.type === "doc" && (
                          <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "7px 10px", background: "rgba(255,255,255,.06)", borderRadius: 9, marginBottom: m.text ? 6 : 0 }}>
                            <span style={{ fontSize: 22 }}>📄</span>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{m.attach.name}</div>
                              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>{m.attach.size}</div>
                            </div>
                          </div>
                        )}
                        {m.text && <span>{m.text}</span>}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 3 }}>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,.28)" }}>{m.time}</span>
                          {m.from === "user" && (
                            <span style={{ fontSize: 10, color: m.status === "delivered" ? "#34D399" : "rgba(255,255,255,.3)" }}>
                              {m.status === "sent" ? "✓" : "✓✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {chatTyping && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {agency && <AgencyLogo agency={agency} size={28} style={{ borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ background: "rgba(255,255,255,.08)", borderRadius: "4px 16px 16px 16px", padding: "10px 14px", display: "flex", gap: 5, alignItems: "center" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.5)", display: "inline-block", animation: "typing1 1.2s infinite" }} />
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.5)", display: "inline-block", animation: "typing2 1.2s infinite" }} />
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.5)", display: "inline-block", animation: "typing3 1.2s infinite" }} />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Attach preview */}
              {chatAttach && (
                <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(255,255,255,.05)", background: "rgba(124,58,237,.06)", display: "flex", alignItems: "center", gap: 10 }}>
                  {chatAttach.type === "image" ? <img src={chatAttach.url} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} /> : <span style={{ fontSize: 24 }}>📄</span>}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chatAttach.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>{chatAttach.size}</div>
                  </div>
                  <button onClick={() => setChatAttach(null)} style={{ background: "rgba(239,68,68,.2)", border: "1px solid rgba(239,68,68,.3)", color: "#F87171", width: 26, height: 26, borderRadius: 6, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              )}

              {/* Input bar */}
              <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", gap: 9, alignItems: "flex-end", background: "rgba(255,255,255,.015)" }}>
                <div style={{ position: "relative" }}>
                  <button onClick={(e: any) => { e.stopPropagation(); setChatAttachMenu((v: boolean) => !v); }}
                    style={{ background: chatAttachMenu ? "rgba(124,58,237,.25)" : "rgba(255,255,255,.05)", border: `1px solid ${chatAttachMenu ? "rgba(124,58,237,.5)" : "rgba(255,255,255,.1)"}`, color: chatAttachMenu ? "#C084FC" : "rgba(255,255,255,.4)", width: 40, height: 40, borderRadius: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, transition: "all .2s" }}>📎</button>
                  {chatAttachMenu && (
                    <div onClick={(e: any) => e.stopPropagation()} style={{ position: "absolute", bottom: 48, left: 0, background: "rgba(14,14,28,.97)", border: "1px solid rgba(124,58,237,.3)", borderRadius: 12, padding: 6, display: "flex", flexDirection: "column", gap: 4, minWidth: 170, boxShadow: "0 8px 32px rgba(0,0,0,.6)", zIndex: 50 }}>
                      <button onClick={() => chatImgRef.current?.click()} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", background: "transparent", border: "none", color: "rgba(255,255,255,.75)", cursor: "pointer", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
                        <span style={{ fontSize: 18 }}>🖼️</span>{lang === "ar" ? "إرسال صورة" : lang === "fr" ? "Envoyer une image" : "Send Image"}
                      </button>
                      <button onClick={() => chatFileRef.current?.click()} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", background: "transparent", border: "none", color: "rgba(255,255,255,.75)", cursor: "pointer", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
                        <span style={{ fontSize: 18 }}>📄</span>{lang === "ar" ? "إرسال وثيقة" : lang === "fr" ? "Envoyer un document" : "Send Document"}
                      </button>
                    </div>
                  )}
                </div>
                <input ref={chatImgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleChatFileAttach} />
                <input ref={chatFileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" style={{ display: "none" }} onChange={handleChatFileAttach} />
                <input value={msgIn} onChange={handleChatMsgChange}
                  onKeyDown={(e: any) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
                  placeholder={t.msgs.type}
                  style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 11, color: "#fff", padding: "10px 14px", fontSize: 13, minHeight: 40 }} />
                <BtnGlow onClick={sendMsg}
                  style={{ background: msgIn.trim() || chatAttach ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.06)", border: "none", color: msgIn.trim() || chatAttach ? "#fff" : "rgba(255,255,255,.25)", width: 44, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s", cursor: msgIn.trim() || chatAttach ? "pointer" : "default" }}>
                  <Ic.Send />
                </BtnGlow>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
