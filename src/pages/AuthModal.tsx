import { useState } from "react";

const DEMO_USERS = [
  {id:"demo_1",username:"ahmed_dz",password:"123456",name:"أحمد بن علي",phone:"0555123456",avatar:"https://i.pravatar.cc/80?img=11",provider:"manual",joinDate:"2025-11-20T10:00:00.000Z",lastLogin:"2026-04-01T08:30:00.000Z"},
  {id:"demo_2",username:"karim_oran",password:"123456",name:"كريم بوعلام",phone:"0661987654",avatar:"https://i.pravatar.cc/80?img=33",provider:"manual",joinDate:"2026-04-25T14:00:00.000Z",lastLogin:"2026-05-10T09:15:00.000Z"},
  {id:"admin",username:"admin",password:"admin123",name:"Admin",phone:"0500000000",avatar:"https://i.pravatar.cc/80?img=1",provider:"manual",role:"admin"},
];

function getAllUsers() {
  try {
    const approved = JSON.parse(localStorage.getItem("driverent_approved_users") || "[]");
    const merged = [...DEMO_USERS];
    approved.forEach((u: any) => { if (!merged.find((d: any) => d.id === u.id)) merged.push(u); });
    return merged;
  } catch { return DEMO_USERS; }
}
function getPendingRequests() {
  try { return JSON.parse(localStorage.getItem("driverent_pending_requests") || "[]"); } catch { return []; }
}

export function AuthModal({ lang, onClose, onLogin }: any) {
  const [mode, setMode] = useState("choose");
  const [regForm, setRegForm] = useState<any>({ username: "", password: "", phone: "", preview: null });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showRegPass, setShowRegPass] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [err, setErr] = useState("");
  const [regSent, setRegSent] = useState(false);
  const setR = (k: string) => (e: any) => setRegForm((f: any) => ({ ...f, [k]: e.target.value }));
  const setL = (k: string) => (e: any) => setLoginForm((f: any) => ({ ...f, [k]: e.target.value }));

  const L: any = {
    ar: { title:"درايف RENT", sub:"منصة تأجير السيارات الجزائرية", regTab:"حساب جديد", loginTab:"تسجيل الدخول", usernameL:"اسم المستخدم", usernamePh:"مثال: ahmed_dz", passwordL:"كلمة السر", passwordPh:"••••••••", phoneL:"رقم الهاتف", phonePh:"0555 xx xx xx", photoHint:"انقر لإضافة صورة", submit:"إنشاء الحساب", loginSubmit:"دخول", switchToLogin:"لديك حساب؟ سجّل دخولك", switchToReg:"ليس لديك حساب؟ أنشئ واحداً", errUsername:"اسم المستخدم مطلوب (3 أحرف على الأقل)", errUsernameTaken:"اسم المستخدم مستخدم بالفعل", errPassword:"كلمة السر مطلوبة (6 أحرف على الأقل)", errPhone:"رقم الهاتف غير صحيح (يبدأ بـ 05, 06, 07)", errPhoneTaken:"رقم الهاتف مستخدم بالفعل", errNotFound:"اسم المستخدم أو كلمة السر غير صحيحة", errStillPending:"حسابك لا يزال قيد المراجعة", pendingTitle:"طلبك قيد المراجعة ⏳", pendingMsg:"تم إرسال طلب إنشاء حسابك بنجاح. سيقوم المشرف بمراجعته وقبوله قريباً.", pendingHint:"بمجرد الموافقة يمكنك تسجيل الدخول بنفس بيانات التسجيل.", pendingClose:"حسناً، سأنتظر", show:"إظهار", hide:"إخفاء" },
    fr: { title:"DriveRENT", sub:"Plateforme de location en Algérie", regTab:"Nouveau compte", loginTab:"Se connecter", usernameL:"Nom d'utilisateur", usernamePh:"Ex: karim_oran", passwordL:"Mot de passe", passwordPh:"••••••••", phoneL:"Téléphone", phonePh:"0555 xx xx xx", photoHint:"Cliquez pour ajouter", submit:"Créer le compte", loginSubmit:"Se connecter", switchToLogin:"Déjà un compte? Connectez-vous", switchToReg:"Pas de compte? Créez-en un", errUsername:"Nom d'utilisateur requis (3 min.)", errUsernameTaken:"Ce nom est déjà pris", errPassword:"Mot de passe requis (6 min.)", errPhone:"Numéro invalide (05, 06, 07)", errPhoneTaken:"Ce numéro est déjà utilisé", errNotFound:"Identifiants incorrects", errStillPending:"Compte en attente de validation", pendingTitle:"Demande envoyée ⏳", pendingMsg:"Votre demande a été soumise. L'administrateur l'examinera bientôt.", pendingHint:"Une fois approuvé, vous pourrez vous connecter.", pendingClose:"D'accord", show:"Afficher", hide:"Masquer" },
    en: { title:"DriveRENT", sub:"Algeria's Car Rental Platform", regTab:"New Account", loginTab:"Sign In", usernameL:"Username", usernamePh:"e.g. ahmed_dz", passwordL:"Password", passwordPh:"••••••••", phoneL:"Phone Number", phonePh:"0555 xx xx xx", photoHint:"Click to add photo", submit:"Create Account", loginSubmit:"Sign In", switchToLogin:"Already have an account? Sign in", switchToReg:"No account? Create one", errUsername:"Username required (3 chars min.)", errUsernameTaken:"Username already taken", errPassword:"Password required (6 chars min.)", errPhone:"Invalid phone (05, 06, 07)", errPhoneTaken:"Phone already registered", errNotFound:"Incorrect username or password", errStillPending:"Account pending admin approval", pendingTitle:"Request Submitted ⏳", pendingMsg:"Your account request has been submitted. The admin will review it shortly.", pendingHint:"Once approved, you can sign in.", pendingClose:"Got it", show:"Show", hide:"Hide" },
  };
  const l = L[lang] || L.ar;
  const rtl = lang === "ar";
  const IS: any = { width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, color: "#fff", padding: "11px 14px", fontSize: 14, marginTop: 6, fontFamily: "inherit", direction: "ltr" };

  const handlePhoto = (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = (ev: any) => setRegForm((f: any) => ({ ...f, preview: ev.target.result }));
    r.readAsDataURL(file);
  };

  const submitRegister = () => {
    setErr("");
    const allUsers = getAllUsers(); const pending = getPendingRequests();
    const username = regForm.username.trim(); const phone = regForm.phone.replace(/\s/g, "");
    if (!username || username.length < 3) { setErr(l.errUsername); return; }
    if (allUsers.find((u: any) => u.username === username)) { setErr(l.errUsernameTaken); return; }
    if (pending.find((p: any) => p.username === username)) { setErr(l.errUsernameTaken); return; }
    if (!regForm.password || regForm.password.length < 6) { setErr(l.errPassword); return; }
    if (!/^0[567][0-9]{8}$/.test(phone)) { setErr(l.errPhone); return; }
    if (allUsers.find((u: any) => u.phone === phone)) { setErr(l.errPhoneTaken); return; }
    if (pending.find((p: any) => p.phone === phone)) { setErr(l.errPhoneTaken); return; }
    const avatar = regForm.preview || `https://i.pravatar.cc/80?u=${username}`;
    const newReq = { id: "req_" + Date.now(), username, password: regForm.password, name: username, phone, avatar, provider: "manual", status: "pending", requestDate: new Date().toISOString() };
    try { localStorage.setItem("driverent_pending_requests", JSON.stringify([...pending, newReq])); } catch {}
    setRegSent(true);
  };

  const submitLogin = () => {
    setErr("");
    if (!loginForm.username.trim()) { setErr(l.errUsername); return; }
    if (!loginForm.password) { setErr(l.errPassword); return; }
    const allUsers = getAllUsers();
    const found = allUsers.find((u: any) => u.username === loginForm.username.trim() && u.password === loginForm.password);
    if (!found) { setErr(l.errNotFound); return; }
    const pending = getPendingRequests();
    if (pending.find((p: any) => p.username === loginForm.username.trim() && p.status === "pending")) { setErr(l.errStillPending); return; }
    onLogin({ ...found, lastLogin: new Date().toISOString() });
  };

  const Overlay = ({ children }: any) => (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.82)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={(e: any) => { if (e.target === e.currentTarget) onClose(); }}>
      {children}
    </div>
  );

  const Card = ({ children, maxW = 400 }: any) => (
    <div style={{ background: "#0D0D1E", border: "1px solid rgba(124,58,237,.35)", borderRadius: 24, padding: "32px 28px", width: "100%", maxWidth: maxW, animation: "fadeUp .35s ease both", maxHeight: "92vh", overflowY: "auto", position: "relative", direction: rtl ? "rtl" : "ltr" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 14, left: rtl ? 14 : "auto", right: rtl ? "auto" : 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.45)", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      {children}
    </div>
  );

  const Logo = () => (
    <div style={{ textAlign: "center", marginBottom: 26 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(124,58,237,.45)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
          </svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
          درايف <span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RENT</span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)" }}>{l.sub}</p>
    </div>
  );

  if (mode === "choose") return (
    <Overlay><Card>
      <Logo />
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => { setMode("register"); setErr(""); }} style={{ flex: 1, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✨ {l.regTab}</button>
        <button onClick={() => { setMode("login"); setErr(""); }} style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.16)", color: "rgba(255,255,255,.85)", padding: "13px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>🔑 {l.loginTab}</button>
      </div>
    </Card></Overlay>
  );

  if (mode === "register") return (
    <Overlay><Card maxW={420}>
      <Logo />
      {regSent ? (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,rgba(245,158,11,.2),rgba(251,191,36,.1))", border: "2px solid rgba(245,158,11,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 20px" }}>⏳</div>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 12 }}>{l.pendingTitle}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 10 }}>{l.pendingMsg}</p>
          <div style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)", borderRadius: 10, padding: "11px 14px", fontSize: 12, color: "rgba(245,158,11,.85)", marginBottom: 22 }}>💡 {l.pendingHint}</div>
          <button onClick={onClose} style={{ width: "100%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 800 }}>{l.pendingClose}</button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => document.getElementById("avInpReg")?.click()}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", border: `3px dashed ${regForm.preview ? "#7C3AED" : "rgba(124,58,237,.5)"}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,.08)" }}>
                {regForm.preview ? <img src={regForm.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 28 }}>📷</span>}
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>+</div>
            </div>
            <input id="avInpReg" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: -14, marginBottom: 20 }}>{l.photoHint}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.usernameL}</label>
              <input value={regForm.username} onChange={setR("username")} placeholder={l.usernamePh} style={IS} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.passwordL}</label>
              <div style={{ position: "relative" }}>
                <input value={regForm.password} onChange={setR("password")} placeholder={l.passwordPh} type={showRegPass ? "text" : "password"} style={{ ...IS, paddingRight: 70 }} />
                <button onClick={() => setShowRegPass((p: boolean) => !p)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 10, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", padding: "3px 8px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 700, marginTop: 3 }}>{showRegPass ? l.hide : l.show}</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.phoneL}</label>
              <input value={regForm.phone} onChange={setR("phone")} placeholder={l.phonePh} style={IS} type="tel" />
            </div>
            {err && <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.28)", borderRadius: 8, padding: "9px 13px", color: "#FCA5A5", fontSize: 12 }}>⚠️ {err}</div>}
            <button onClick={submitRegister} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 800 }}>✨ {l.submit}</button>
            <button onClick={() => { setMode("login"); setErr(""); }} style={{ background: "none", border: "none", color: "rgba(124,58,237,.8)", cursor: "pointer", fontSize: 12, fontWeight: 700, padding: "4px 0", textAlign: "center" }}>{l.switchToLogin} →</button>
          </div>
        </div>
      )}
    </Card></Overlay>
  );

  return (
    <Overlay><Card maxW={380}>
      <Logo />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.usernameL}</label>
          <input value={loginForm.username} onChange={setL("username")} placeholder={l.usernamePh} style={IS} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px" }}>{l.passwordL}</label>
          <div style={{ position: "relative" }}>
            <input value={loginForm.password} onChange={setL("password")} placeholder={l.passwordPh} type={showLoginPass ? "text" : "password"} onKeyDown={(e: any) => e.key === "Enter" && submitLogin()} style={{ ...IS, paddingRight: 70 }} />
            <button onClick={() => setShowLoginPass((p: boolean) => !p)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 10, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", padding: "3px 8px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 700, marginTop: 3 }}>{showLoginPass ? l.hide : l.show}</button>
          </div>
        </div>
        {err && <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.28)", borderRadius: 8, padding: "9px 13px", color: "#FCA5A5", fontSize: 12 }}>⚠️ {err}</div>}
        <button onClick={submitLogin} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "13px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 800 }}>🔑 {l.loginSubmit}</button>
        <button onClick={() => { setMode("register"); setErr(""); }} style={{ background: "none", border: "none", color: "rgba(124,58,237,.8)", cursor: "pointer", fontSize: 12, fontWeight: 700, padding: "4px 0", textAlign: "center" }}>{l.switchToReg} →</button>
        <div style={{ background: "rgba(52,211,153,.06)", border: "1px solid rgba(52,211,153,.2)", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#34D399", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>🧪 {lang === "ar" ? "حسابات تجريبية" : lang === "fr" ? "Comptes de démo" : "Demo Accounts"}</div>
          {[{u:"ahmed_dz",p:"123456",name:"أحمد بن علي"},{u:"karim_oran",p:"123456",name:"كريم بوعلام"},{u:"admin",p:"admin123",name:"Admin 🛡️"}].map((d, i) => (
            <div key={i} onClick={() => { setLoginForm({ username: d.u, password: d.p }); setErr(""); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", marginBottom: i < 2 ? 6 : 0, transition: "background .15s" }}
              onMouseEnter={(e: any) => e.currentTarget.style.background = "rgba(124,58,237,.15)"}
              onMouseLeave={(e: any) => e.currentTarget.style.background = "rgba(255,255,255,.04)"}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{d.name}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", direction: "ltr", textAlign: "left" }}>@{d.u} · {d.p}</div>
              </div>
              <span style={{ fontSize: 10, background: "rgba(124,58,237,.25)", color: "#C084FC", padding: "3px 8px", borderRadius: 6, fontWeight: 700, flexShrink: 0 }}>{lang === "ar" ? "استخدام" : lang === "fr" ? "Utiliser" : "Use"}</span>
            </div>
          ))}
        </div>
      </div>
    </Card></Overlay>
  );
}
