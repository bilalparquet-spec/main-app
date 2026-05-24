import { useState } from "react";
import ROAD_IMG from "../../assets/roadImg.js";
import { GoogleBtn, AppleBtn } from "../GuestAuthSheet.jsx";

export function LoginPage({ onBack, onGoRegister, onGoGoogle, onGoApple }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusEl, setFocusEl]   = useState(null);

  function handleLogin() {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  const inputStyle = (name) => ({
    width: "100%",
    background: focusEl === name ? "rgba(124,58,237,.1)" : "rgba(255,255,255,.05)",
    border: `1.5px solid ${focusEl === name ? "rgba(124,58,237,.6)" : "rgba(255,255,255,.1)"}`,
    borderRadius: 14,
    padding: "14px 16px",
    color: "#F1F5F9",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focusEl === name ? "0 0 0 3px rgba(124,58,237,.15)" : "none",
    direction: "ltr",
    textAlign: "right",
  });

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#07080F",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overscrollBehavior: "contain",
      animation: "fadeUp .35s ease",
    }}>
      {/* ── Hero image ── */}
      <div style={{ position: "relative", height: "clamp(180px,35vw,260px)", flexShrink: 0, overflow: "hidden" }}>
        <img
          src={ROAD_IMG}
          alt="road"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 40%",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(7,8,15,.3) 0%, rgba(7,8,15,1) 100%)",
        }}/>

        {/* back button */}
        <button onClick={onBack} style={{
          position: "absolute", top: 16, right: 16,
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(0,0,0,.45)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,.15)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polyline points="15 18 9 12 15 6" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Logo badge */}
        <div style={{
          position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(10,11,23,.6)", backdropFilter: "blur(12px)",
            padding: "6px 16px 6px 10px", borderRadius: 40,
            border: "1px solid rgba(167,139,250,.25)",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="3" width="15" height="13" rx="2" stroke="#fff" strokeWidth="2"/>
                <path d="M16 8h4l3 3v5h-7V8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="5.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
                <circle cx="18.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
              </svg>
            </div>
            <span style={{
              fontWeight: 900, fontSize: 15,
              background: "linear-gradient(90deg,#A78BFA,#818CF8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>درايف RENT</span>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: "clamp(320px,92vw,520px)", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        <h1 style={{
          fontSize: "clamp(20px,5vw,26px)", fontWeight: 900, color: "#F1F5F9",
          marginBottom: 6, letterSpacing: "-.5px", textAlign: "center",
        }}>تسجيل الدخول</h1>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,.38)",
          textAlign: "center", marginBottom: 32, lineHeight: 1.6,
        }}>أدخل بيانات حسابك للمتابعة</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.45)", display: "block", marginBottom: 7 }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusEl("email")}
              onBlur={() => setFocusEl(null)}
              style={inputStyle("email")}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.45)", display: "block", marginBottom: 7 }}>
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusEl("pass")}
                onBlur={() => setFocusEl(null)}
                style={{ ...inputStyle("pass"), paddingLeft: 44 }}
              />
              <button
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,.3)", display: "flex", alignItems: "center",
                }}
              >
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "left" }}>
            <button style={{
              background: "none", border: "none", color: "#A78BFA",
              fontSize: 12, fontFamily: "inherit", cursor: "pointer", padding: 0,
            }}>نسيت كلمة المرور؟</button>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            style={{
              width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
              background: (loading || !email || !password)
                ? "rgba(109,40,217,.35)"
                : "linear-gradient(135deg,#6D28D9,#4F46E5)",
              color: "#fff", fontSize: 15, fontWeight: 800,
              fontFamily: "inherit", cursor: loading || !email || !password ? "not-allowed" : "pointer",
              boxShadow: (loading || !email || !password) ? "none" : "0 6px 24px rgba(109,40,217,.45)",
              transition: "all .2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              marginTop: 4,
            }}
          >
            {loading
              ? <><Spinner/> جاري الدخول...</>
              : <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                    <polyline points="10 17 15 12 10 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                  دخول
                </>
            }
          </button>

          {/* Google */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
          </div>
          <GoogleBtn onClick={onGoGoogle}/>
          <AppleBtn onClick={onGoApple}/>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)", flexShrink: 0 }}>ليس لديك حساب؟</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
        </div>

        <button
          onClick={onGoRegister}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 16,
            border: "1.5px solid rgba(167,139,250,.3)",
            background: "rgba(109,40,217,.08)",
            color: "#A78BFA", fontSize: 14, fontWeight: 800,
            fontFamily: "inherit", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.08)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4" stroke="#A78BFA" strokeWidth="2.2"/>
            <line x1="19" y1="8" x2="19" y2="14" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="22" y1="11" x2="16" y2="11" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          إنشاء حساب جديد
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "spin .7s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.25)" strokeWidth="2.5"/>
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}
