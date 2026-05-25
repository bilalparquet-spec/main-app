import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROAD_IMG from "../../assets/roadImg.js";

export function GoogleAuthPage({ onBack, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back    = onBack    || (() => navigate(-1));
  const _success = onSuccess || (() => navigate("/"));
  const [step, setStep] = useState("choose"); // "choose" | "loading" | "confirm"
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockAccounts = [
    { id: 1, name: "أحمد بن علي", email: "ahmed.benali@gmail.com", avatar: "A" },
    { id: 2, name: "استخدام حساب آخر", email: null, avatar: "+" },
  ];

  function selectAccount(acc) {
    if (!acc.email) return; // "use another account"
    setSelectedAccount(acc);
    setStep("loading");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("confirm");
    }, 1800);
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      _success(selectedAccount);
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
        {/* Back */}
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

        {/* Google Brand Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(255,255,255,.06)",
            border: "1.5px solid rgba(255,255,255,.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 14,
          }}>
            <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
          </div>

          {step === "choose" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, letterSpacing: "-.5px", textAlign: "center" }}>
              تسجيل الدخول عبر Google
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", lineHeight: 1.6 }}>
              اختر حسابك للمتابعة إلى درايف RENT
            </p>
          </>}

          {step === "loading" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>
              جاري التحقق...
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>
              يتم التحقق من حسابك
            </p>
          </>}

          {step === "confirm" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>
              تأكيد الربط
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>
              تأكيد ربط حسابك مع درايف RENT
            </p>
          </>}
        </div>

        {/* ── STEP: Choose account ── */}
        {step === "choose" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockAccounts.map(acc => (
              <button
                key={acc.id}
                onClick={() => selectAccount(acc)}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 16,
                  border: "1.5px solid rgba(255,255,255,.1)",
                  background: "rgba(255,255,255,.04)",
                  cursor: acc.email ? "pointer" : "default",
                  display: "flex", alignItems: "center", gap: 14,
                  transition: "background .2s, border-color .2s",
                  textAlign: "right",
                }}
                onMouseEnter={e => acc.email && (e.currentTarget.style.background = "rgba(255,255,255,.09)")}
                onMouseLeave={e => acc.email && (e.currentTarget.style.background = "rgba(255,255,255,.04)")}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: acc.email
                    ? "linear-gradient(135deg,#4285F4,#34A853)"
                    : "rgba(255,255,255,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: acc.email ? 17 : 22,
                  fontWeight: 900, color: "#fff",
                  border: acc.email ? "2px solid rgba(255,255,255,.15)" : "1.5px dashed rgba(255,255,255,.2)",
                }}>
                  {acc.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", marginBottom: 2 }}>{acc.name}</div>
                  {acc.email && <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", direction: "ltr", textAlign: "left" }}>{acc.email}</div>}
                </div>
                {acc.email && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="9 18 15 12 9 6" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
            </div>

            <button
              onClick={_back}
              style={{
                width: "100%", padding: "14px 20px", borderRadius: 16,
                border: "1.5px solid rgba(167,139,250,.25)",
                background: "rgba(109,40,217,.06)",
                color: "rgba(255,255,255,.45)", fontSize: 14, fontWeight: 700,
                fontFamily: "inherit", cursor: "pointer",
                transition: "background .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.14)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.06)")}
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
              background: "rgba(66,133,244,.1)",
              border: "1.5px solid rgba(66,133,244,.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <LoadingRing color="#4285F4" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 4 }}>
                جاري التحقق من
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", direction: "ltr" }}>
                {selectedAccount?.email}
              </p>
            </div>
          </div>
        )}

        {/* ── STEP: Confirm ── */}
        {step === "confirm" && selectedAccount && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Account card */}
            <div style={{
              padding: "18px 16px", borderRadius: 18,
              background: "rgba(66,133,244,.07)",
              border: "1.5px solid rgba(66,133,244,.22)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg,#4285F4,#34A853)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, color: "#fff",
              }}>
                {selectedAccount.avatar}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#F1F5F9" }}>{selectedAccount.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", direction: "ltr", textAlign: "left" }}>{selectedAccount.email}</div>
              </div>
              <div style={{ marginRight: "auto", marginLeft: 0 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(52,168,83,.2)",
                  border: "1.5px solid rgba(52,168,83,.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <polyline points="2 6 5 9 10 3" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Permissions notice */}
            <div style={{
              padding: "14px 16px", borderRadius: 14,
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.08)",
            }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", lineHeight: 1.7, textAlign: "center" }}>
                ستمنح درايف RENT صلاحية الوصول إلى اسمك وعنوان بريدك الإلكتروني فقط
              </p>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
                background: loading ? "rgba(66,133,244,.35)" : "linear-gradient(135deg,#4285F4,#34A853)",
                color: "#fff", fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 6px 24px rgba(66,133,244,.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all .2s",
              }}
            >
              {loading ? <><LoadingRing color="#fff" small /> جاري الربط...</> : "تأكيد وربط الحساب"}
            </button>

            <button
              onClick={() => setStep("choose")}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,.32)", fontSize: 13,
                fontFamily: "inherit", cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: 3,
                textAlign: "center", padding: "4px 0",
              }}
            >
              استخدام حساب مختلف
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingRing({ color = "#A78BFA", small = false }) {
  const s = small ? 18 : 38;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ animation: "spin .75s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="9" stroke={`${color}33`} strokeWidth="2.5" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
