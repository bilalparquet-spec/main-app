import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROAD_IMG from "../../assets/roadImg.js";
import LOGO_IMG from "../../assets/appLogo.js";
import { GoogleBtn, AppleBtn } from "../GuestAuthSheet.jsx";
import { signIn } from "../../lib/supabase.js";

// ─── Reusable input style (pure function, not component) ───────────────────
function getInputStyle(focusEl, name) {
  return {
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
  };
}

export function LoginPage({ onBack, onGoRegister, onGoGoogle, onGoApple, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back = onBack || (() => navigate(-1));
  const _goRegister = onGoRegister || (() => navigate("/register"));
  const _goGoogle   = onGoGoogle   || (() => navigate("/auth/google"));
  const _goApple    = onGoApple    || (() => navigate("/auth/apple"));
  const _success    = onSuccess    || (() => navigate("/"));
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusEl, setFocusEl]   = useState(null);
  const [error, setError]       = useState(null);
  const [forgotMode, setForgotMode] = useState(false);

  async function handleLogin() {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    try {
      await signIn({ email, password });
      _success();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={_back}>
      {/* Modal card */}
      <div style={{ position: "relative", width: "100%", maxWidth: 460, maxHeight: "90vh", background: "#0D0E1A", borderRadius: 24, overflow: "hidden", overflowY: "auto", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,.7)", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>

        {/* X close button */}
        <button onClick={_back} style={{ position: "absolute", top: 14, left: 14, zIndex: 10, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>

        {/* Hero image */}
        <div style={{ position: "relative", height: 180, flexShrink: 0, overflow: "hidden" }}>
          <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,8,15,.4) 0%, rgba(7,8,15,1) 100%)" }}/>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={LOGO_IMG} alt="logo" style={{ width: 88, height: 88, objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(0,0,0,.5))" }}/>
          </div>
        </div>

      {/* Form */}
      <div style={{ flex: 1, padding: "28px 24px 40px", width: "100%", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "clamp(20px,5vw,26px)", fontWeight: 900, color: "#F1F5F9", marginBottom: 6, letterSpacing: "-.5px", textAlign: "center" }}>تسجيل الدخول</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>أدخل بيانات حسابك للمتابعة</p>

        {/* Error banner */}
        {error && (
          <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: "#FCA5A5", fontSize: 13, textAlign: "center" }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.45)", display: "block", marginBottom: 7 }}>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusEl("email")}
              onBlur={() => setFocusEl(null)}
              style={getInputStyle(focusEl, "email")}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.45)", display: "block", marginBottom: 7 }}>كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusEl("pass")}
                onBlur={() => setFocusEl(null)}
                style={{ ...getInputStyle(focusEl, "pass"), paddingLeft: 44 }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.3)", display: "flex", alignItems: "center" }}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "left" }}>
            <button onClick={() => setForgotMode(true)} style={{ background: "none", border: "none", color: "#A78BFA", fontSize: 12, fontFamily: "inherit", cursor: "pointer", padding: 0 }}>نسيت كلمة المرور؟</button>
          </div>

          {/* Submit */}
          <button onClick={handleLogin} disabled={loading || !email || !password} style={{ width: "100%", padding: "15px 20px", borderRadius: 16, border: "none", background: (loading || !email || !password) ? "rgba(109,40,217,.35)" : "linear-gradient(135deg,#6D28D9,#4F46E5)", color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit", cursor: loading || !email || !password ? "not-allowed" : "pointer", boxShadow: (loading || !email || !password) ? "none" : "0 6px 24px rgba(109,40,217,.45)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {loading
              ? <><Spinner/> جاري الدخول...</>
              : <><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><polyline points="10 17 15 12 10 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><line x1="15" y1="12" x2="3" y2="12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>دخول</>
            }
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
          </div>
          <GoogleBtn onClick={_goGoogle}/>
          <AppleBtn onClick={_goApple}/>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)", flexShrink: 0 }}>ليس لديك حساب؟</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
        </div>

        <button onClick={_goRegister} style={{ width: "100%", padding: "14px 20px", borderRadius: 16, border: "1.5px solid rgba(167,139,250,.3)", background: "rgba(109,40,217,.08)", color: "#A78BFA", fontSize: 14, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.08)")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#A78BFA" strokeWidth="2.2"/><line x1="19" y1="8" x2="19" y2="14" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/><line x1="22" y1="11" x2="16" y2="11" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/></svg>
          إنشاء حساب جديد
        </button>
      </div>

      {/* Forgot Password Modal */}
      {forgotMode && <ForgotModal onClose={() => setForgotMode(false)}/>}
      </div>
    </div>
  );
}

function ForgotModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function handleReset() {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const { resetPassword } = await import("../../lib/supabase.js");
      await resetPassword(email);
      setSent(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#0C0C1E", border: "1px solid rgba(167,139,250,.2)", borderRadius: 20, padding: "28px 24px", width: "100%", maxWidth: 380, animation: "fadeUp .25s ease" }}>
        <h2 style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 900, marginBottom: 8, textAlign: "center" }}>استعادة كلمة المرور</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, textAlign: "center", marginBottom: 20 }}>سنرسل لك رابط إعادة التعيين على بريدك</p>
        {sent ? (
          <div style={{ textAlign: "center", color: "#34D399", fontSize: 14, padding: "16px 0" }}>✅ تم الإرسال! تحقق من بريدك الإلكتروني.</div>
        ) : (
          <>
            {error && <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, color: "#FCA5A5", fontSize: 12, textAlign: "center" }}>{error}</div>}
            <input type="email" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1.5px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "13px 14px", color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", direction: "ltr", marginBottom: 14 }}/>
            <button onClick={handleReset} disabled={loading || !email} style={{ width: "100%", padding: "13px", borderRadius: 14, border: "none", background: !email ? "rgba(109,40,217,.3)" : "linear-gradient(135deg,#6D28D9,#4F46E5)", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "inherit", cursor: !email ? "not-allowed" : "pointer", marginBottom: 10 }}>
              {loading ? "جاري الإرسال..." : "إرسال الرابط"}
            </button>
          </>
        )}
        <button onClick={onClose} style={{ width: "100%", padding: "12px", borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: "rgba(255,255,255,.4)", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>إلغاء</button>
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
