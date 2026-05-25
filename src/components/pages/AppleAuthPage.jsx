import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROAD_IMG from "../../assets/roadImg.js";

export function AppleAuthPage({ onBack, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back    = onBack    || (() => navigate(-1));
  const _success = onSuccess || (() => navigate("/"));
  const [step, setStep] = useState("intro"); // "intro" | "loading" | "privacy" | "confirm"
  const [hideEmail, setHideEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockAppleUser = {
    name: "أحمد بن علي",
    realEmail: "ahmed.benali@icloud.com",
    proxyEmail: "xy4k2m@privaterelay.appleid.com",
  };

  function handleSignIn() {
    setStep("loading");
    setTimeout(() => setStep("privacy"), 1700);
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      _success({ ...mockAppleUser, usedProxy: hideEmail });
    }, 1000);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#07080F",
      display: "flex", flexDirection: "column",
      overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain",
      animation: "fadeUp .35s ease",
      fontFamily: "'Cairo', sans-serif",
    }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 200, flexShrink: 0, overflow: "hidden" }}>
        <img src={ROAD_IMG} alt="road" style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%", display: "block",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(7,8,15,.3) 0%, rgba(7,8,15,1) 100%)",
        }} />
        <button onClick={_back} style={{
          position: "absolute", top: 16, right: 16,
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(0,0,0,.45)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,.15)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polyline points="15 18 9 12 15 6" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, padding: "20px 24px 50px", maxWidth: "clamp(320px,92vw,520px)", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Apple Brand Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(255,255,255,.07)",
            border: "1.5px solid rgba(255,255,255,.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 14,
          }}>
            {/* Apple logo SVG */}
            <svg width="28" height="28" viewBox="0 0 814 1000" fill="#F1F5F9" xmlns="http://www.w3.org/2000/svg">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.8 197.6 107.5zm-166.5-115.1c-30.2 35.6-81.1 63.5-129.1 63.5-5.2 0-10.4-.5-15.5-1.3-1.2-5.3-1.8-10.8-1.8-16.5 0-41.6 22.7-85.4 55.2-112.9 17.2-14.4 57-33.7 90.5-35.3 1 6 1.5 12 1.5 17.9 0 44.2-21.3 88.6-50.8 124.6z" />
            </svg>
          </div>

          {step === "intro" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>
              تسجيل الدخول بمعرّف Apple
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", lineHeight: 1.6 }}>
              تسجيل دخول آمن ومحمي عبر Apple ID
            </p>
          </>}
          {step === "loading" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>جاري التحقق...</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>التحقق من معرّف Apple</p>
          </>}
          {(step === "privacy" || step === "confirm") && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>مشاركة البيانات</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>اختر كيفية مشاركة بريدك مع التطبيق</p>
          </>}
        </div>

        {/* ── STEP: Intro ── */}
        {step === "intro" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Feature badges */}
            {[
              { icon: "🔒", title: "خصوصية تامة", desc: "لا تُشارك Apple كلمة مرورك مع أي جهة" },
              { icon: "📧", title: "إخفاء البريد", desc: "يمكنك إخفاء بريدك الحقيقي عبر بريد وهمي" },
              { icon: "⚡", title: "دخول سريع", desc: "تسجيل دخول بلمسة واحدة في أي وقت" },
            ].map(f => (
              <div key={f.title} style={{
                padding: "13px 16px", borderRadius: 14,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#F1F5F9", marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ height: 6 }} />

            {/* Apple Sign In button - iconic black style */}
            <button
              onClick={handleSignIn}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
                background: "#F1F5F9",
                color: "#07080F", fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                boxShadow: "0 6px 24px rgba(241,245,249,.15)",
                transition: "all .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.background = "#F1F5F9")}
            >
              <svg width="18" height="18" viewBox="0 0 814 1000" fill="#07080F">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.8 197.6 107.5zm-166.5-115.1c-30.2 35.6-81.1 63.5-129.1 63.5-5.2 0-10.4-.5-15.5-1.3-1.2-5.3-1.8-10.8-1.8-16.5 0-41.6 22.7-85.4 55.2-112.9 17.2-14.4 57-33.7 90.5-35.3 1 6 1.5 12 1.5 17.9 0 44.2-21.3 88.6-50.8 124.6z" />
              </svg>
              متابعة بمعرّف Apple
            </button>

            <button
              onClick={_back}
              style={{
                background: "none", border: "1.5px solid rgba(255,255,255,.1)",
                color: "rgba(255,255,255,.35)", fontSize: 14,
                fontFamily: "inherit", cursor: "pointer",
                padding: "14px 20px", borderRadius: 16,
                transition: "border-color .2s, color .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.color = "rgba(255,255,255,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.35)"; }}
            >
              إلغاء
            </button>
          </div>
        )}

        {/* ── STEP: Loading ── */}
        {step === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "20px 0" }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <LoadingRing color="#F1F5F9" />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", textAlign: "center" }}>
              جاري التحقق من معرّف Apple...
            </p>
          </div>
        )}

        {/* ── STEP: Privacy choice ── */}
        {step === "privacy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              padding: "16px", borderRadius: 16,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.09)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginBottom: 4 }}>تم التحقق من</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#F1F5F9" }}>{mockAppleUser.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", direction: "ltr", marginTop: 3 }}>{mockAppleUser.realEmail}</div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
              كيف تريد مشاركة بريدك مع درايف RENT؟
            </div>

            {[
              {
                id: false,
                label: "مشاركة بريدي الحقيقي",
                sub: mockAppleUser.realEmail,
                icon: "📬",
                border: "rgba(167,139,250,.3)",
                bg: "rgba(109,40,217,.08)",
              },
              {
                id: true,
                label: "إخفاء بريدي",
                sub: mockAppleUser.proxyEmail,
                icon: "🛡️",
                border: "rgba(52,168,83,.3)",
                bg: "rgba(52,168,83,.06)",
              },
            ].map(opt => (
              <button
                key={String(opt.id)}
                onClick={() => { setHideEmail(opt.id); setStep("confirm"); }}
                style={{
                  width: "100%", padding: "15px 16px", borderRadius: 16, border: "none",
                  background: opt.bg, cursor: "pointer",
                  outline: `1.5px solid ${opt.border}`,
                  display: "flex", alignItems: "center", gap: 12,
                  textAlign: "right",
                  transition: "filter .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#F1F5F9", marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", direction: "ltr", textAlign: "left" }}>{opt.sub}</div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <polyline points="9 18 15 12 9 6" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* ── STEP: Confirm ── */}
        {step === "confirm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary card */}
            <div style={{
              padding: "18px 16px", borderRadius: 18,
              background: "rgba(255,255,255,.04)",
              border: "1.5px solid rgba(255,255,255,.1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(255,255,255,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>🍎</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#F1F5F9" }}>{mockAppleUser.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", direction: "ltr", textAlign: "left" }}>
                    {hideEmail ? mockAppleUser.proxyEmail : mockAppleUser.realEmail}
                  </div>
                </div>
              </div>
              <div style={{
                padding: "10px 12px", borderRadius: 10,
                background: hideEmail ? "rgba(52,168,83,.08)" : "rgba(109,40,217,.08)",
                border: `1px solid ${hideEmail ? "rgba(52,168,83,.25)" : "rgba(167,139,250,.2)"}`,
              }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", textAlign: "center" }}>
                  {hideEmail ? "🛡️ سيتم إخفاء بريدك الحقيقي وإرسال بريد وهمي للتطبيق" : "📬 ستُشارك بريدك الحقيقي مع درايف RENT"}
                </p>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
                background: loading ? "rgba(241,245,249,.2)" : "#F1F5F9",
                color: loading ? "rgba(7,8,15,.5)" : "#07080F",
                fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 6px 24px rgba(241,245,249,.12)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all .2s",
              }}
            >
              {loading ? <><LoadingRing color="#07080F" small /> جاري الربط...</> : "تأكيد وربط الحساب"}
            </button>

            <button
              onClick={() => setStep("privacy")}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,.28)", fontSize: 13,
                fontFamily: "inherit", cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: 3,
                textAlign: "center", padding: "4px 0",
              }}
            >
              تغيير خيار البريد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingRing({ color = "#F1F5F9", small = false }) {
  const s = small ? 18 : 38;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ animation: "spin .75s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="9" stroke={`${color}33`} strokeWidth="2.5" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
