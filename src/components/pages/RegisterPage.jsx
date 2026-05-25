import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROAD_IMG from "../../assets/roadImg.js";
import LOGO_IMG from "../../assets/appLogo.js";
import { GoogleBtn, AppleBtn } from "../GuestAuthSheet.jsx";
import { signUp } from "../../lib/supabase.js";

// ─── Style helpers defined OUTSIDE component to prevent re-creation on every render ───
const LABEL_STYLE = {
  fontSize: 12, fontWeight: 700,
  color: "rgba(255,255,255,.45)", display: "block", marginBottom: 7,
};

function getInputStyle(focusEl, name, form) {
  const isLtr = name === "email" || name === "password" || name === "confirm";
  const isConfirmError = name === "confirm" && form.confirm && form.password !== form.confirm;
  return {
    width: "100%",
    background: focusEl === name ? "rgba(124,58,237,.1)" : "rgba(255,255,255,.05)",
    border: `1.5px solid ${
      isConfirmError
        ? "rgba(239,68,68,.55)"
        : focusEl === name
        ? "rgba(124,58,237,.6)"
        : "rgba(255,255,255,.1)"
    }`,
    borderRadius: 14,
    padding: "13px 16px",
    color: "#F1F5F9",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focusEl === name ? "0 0 0 3px rgba(124,58,237,.15)" : "none",
    direction: isLtr ? "ltr" : "rtl",
    textAlign: isLtr ? "left" : "right",
  };
}

export function RegisterPage({ onBack, onGoLogin, onGoGoogle, onGoApple, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back     = onBack     || (() => navigate(-1));
  const _goLogin  = onGoLogin  || (() => navigate("/login"));
  const _goGoogle = onGoGoogle || (() => navigate("/auth/google"));
  const _goApple  = onGoApple  || (() => navigate("/auth/apple"));
  const _success  = onSuccess  || (() => navigate("/"));
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [focusEl, setFocusEl]     = useState(null);
  const [agreed, setAgreed]       = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const allFilled = form.name && form.phone && form.email && form.password && form.confirm && agreed;
  const passMatch = !form.confirm || form.password === form.confirm;

  async function handleRegister() {
    if (!allFilled || !passMatch) return;
    if (form.password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    setLoading(true);
    setError(null);
    try {
      await signUp({ email: form.email, password: form.password, name: form.name, phone: form.phone });
      setSuccess(true);
      setTimeout(() => _success(), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#07080F", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, animation: "fadeUp .35s ease" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,211,153,.15)", border: "2px solid #34D399", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ color: "#F1F5F9", fontSize: 22, fontWeight: 900, textAlign: "center" }}>تم التسجيل بنجاح! 🎉</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, textAlign: "center", maxWidth: 280 }}>تحقق من بريدك الإلكتروني لتفعيل حسابك</p>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }} onClick={_back}>
      {/* Modal card */}
      <div style={{ position: "relative", width: "100%", maxWidth: 460, maxHeight: "90vh", background: "#0D0E1A", borderRadius: 24, overflow: "hidden", overflowY: "auto", WebkitOverflowScrolling: "touch", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,.7)", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>

        {/* X close button */}
        <button onClick={_back} style={{ position: "absolute", top: 14, left: 14, zIndex: 10, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>

        {/* Hero */}
        <div style={{ position: "relative", height: 180, flexShrink: 0, overflow: "hidden" }}>
          <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,8,15,.4) 0%, rgba(7,8,15,1) 100%)" }}/>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={LOGO_IMG} alt="logo" style={{ width: 84, height: 84, objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(0,0,0,.5))" }}/>
          </div>
        </div>

      {/* Form */}
      <div style={{ flex: 1, padding: "24px 24px 40px", width: "100%", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "clamp(18px,5vw,24px)", fontWeight: 900, color: "#F1F5F9", marginBottom: 4, letterSpacing: "-.5px", textAlign: "center" }}>إنشاء حساب جديد</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>أنشئ حسابك وابدأ رحلتك</p>

        {error && (
          <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 18, color: "#FCA5A5", fontSize: 13, textAlign: "center" }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {/* Name */}
          <div>
            <label style={LABEL_STYLE}>الاسم الكامل</label>
            <input type="text" placeholder="محمد أمين" value={form.name} onChange={set("name")} onFocus={() => setFocusEl("name")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "name", form)}/>
          </div>

          {/* Phone */}
          <div>
            <label style={LABEL_STYLE}>رقم الهاتف</label>
            <input type="text" placeholder="0555 000 000" value={form.phone} onChange={set("phone")} onFocus={() => setFocusEl("phone")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "phone", form)}/>
          </div>

          {/* Email */}
          <div>
            <label style={LABEL_STYLE}>البريد الإلكتروني</label>
            <input type="email" placeholder="example@email.com" value={form.email} onChange={set("email")} onFocus={() => setFocusEl("email")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "email", form)}/>
          </div>

          {/* Password */}
          <div>
            <label style={LABEL_STYLE}>كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set("password")} onFocus={() => setFocusEl("password")} onBlur={() => setFocusEl(null)} style={{ ...getInputStyle(focusEl, "password", form), paddingLeft: 44 }}/>
              <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.3)", display: "flex", alignItems: "center" }}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label style={LABEL_STYLE}>تأكيد كلمة المرور</label>
            <input type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} onFocus={() => setFocusEl("confirm")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "confirm", form)}/>
            {form.confirm && !passMatch && (
              <p style={{ color: "#EF4444", fontSize: 11, marginTop: 5, fontWeight: 600 }}>كلمتا المرور غير متطابقتين</p>
            )}
          </div>

          {/* Terms */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }} onClick={() => setAgreed(p => !p)}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${agreed ? "#7C3AED" : "rgba(255,255,255,.2)"}`, background: agreed ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
              {agreed && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>
              أوافق على{" "}
              <span style={{ color: "#A78BFA" }}>شروط الاستخدام</span>
              {" "}و{" "}
              <span style={{ color: "#A78BFA" }}>سياسة الخصوصية</span>
            </span>
          </div>

          {/* Submit */}
          <button onClick={handleRegister} disabled={loading || !allFilled || !passMatch} style={{ width: "100%", padding: "15px 20px", borderRadius: 16, border: "none", background: (loading || !allFilled || !passMatch) ? "rgba(109,40,217,.3)" : "linear-gradient(135deg,#6D28D9,#4F46E5)", color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit", cursor: (loading || !allFilled || !passMatch) ? "not-allowed" : "pointer", boxShadow: (loading || !allFilled || !passMatch) ? "none" : "0 6px 24px rgba(109,40,217,.45)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {loading
              ? <><Spinner/> جاري الإنشاء...</>
              : <><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth="2.2"/><line x1="19" y1="8" x2="19" y2="14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><line x1="22" y1="11" x2="16" y2="11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>إنشاء الحساب</>
            }
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
          </div>
          <GoogleBtn label="التسجيل عبر Google" onClick={_goGoogle}/>
          <AppleBtn label="التسجيل عبر Apple" onClick={_goApple}/>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 16px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)", flexShrink: 0 }}>لديك حساب بالفعل؟</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
        </div>

        <button onClick={_goLogin} style={{ width: "100%", padding: "14px 20px", borderRadius: 16, border: "1.5px solid rgba(167,139,250,.3)", background: "rgba(109,40,217,.08)", color: "#A78BFA", fontSize: 14, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.08)")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/><polyline points="10 17 15 12 10 7" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><line x1="15" y1="12" x2="3" y2="12" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/></svg>
          تسجيل الدخول
        </button>
      </div>
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
