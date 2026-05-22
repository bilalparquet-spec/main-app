import { useState, useEffect, useCallback } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
import { TR, Lang } from "./data/translations";
import { CARS, Car } from "./data/cars";
import { Agency } from "./data/agencies";
import { INIT_REVIEWS, Review } from "./data/reviews";
import { INIT_BOOKINGS, Booking } from "./data/bookings";
import { INIT_CONVS, Conversation } from "./data/conversations";
import { ALL_WILAYAS } from "./data/wilayas";

// ── Services ──────────────────────────────────────────────────────────────────
import { loginUser, registerUser, User } from "./services/authService";
import { openOrCreateConversation } from "./services/chatService";

// ── Layouts ───────────────────────────────────────────────────────────────────
import { SplashScreen } from "./layouts/SplashScreen";
import { MainLayout } from "./layouts/MainLayout";

// ── Pages ─────────────────────────────────────────────────────────────────────
import { HomePage } from "./pages/HomePage";
import { CarDetailPage } from "./pages/CarDetailPage";
import { AgencyPage } from "./pages/AgencyPage";
import { AddAgencyPage } from "./pages/AddAgencyPage";
import { MessagesPage } from "./pages/MessagesPage";

// ── Admin / Agency ────────────────────────────────────────────────────────────
import { AdminPanel } from "./admin/AdminPanel";
import { AgencyDashboard } from "./agency/AgencyDashboard";

// ── Icons ─────────────────────────────────────────────────────────────────────
import { Ic } from "./components/Icons";

// ─────────────────────────────────────────────────────────────────────────────
type Page = "home" | "cars" | "wedding" | "agencies" | "car" | "agency" | "messages" | "addAgency";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "DriveRENT2025@";

export default function App() {
  // ── Splash ──
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 2800);
    const t2 = setTimeout(() => setSplash(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Core state ──
  const [lang, setLang] = useState<Lang>("ar");
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState<Page>("home");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  // ── Filter state ──
  const [fType, setFType] = useState("all");
  const [sort, setSort] = useState("pop");
  const [wilaya, setWilaya] = useState("");
  const [ddOpen, setDdOpen] = useState(false);
  const [selBrand, setSelBrand] = useState("الكل");

  // ── Auth ──
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authForm, setAuthForm] = useState({ username: "", password: "", phone: "", avatar: "https://i.pravatar.cc/80?img=1" });
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAgencyDash, setShowAgencyDash] = useState(false);

  // ── Data state ──
  const [reviews, setReviews] = useState<Review[]>(INIT_REVIEWS);
  const [bookings, setBookings] = useState<Booking[]>(INIT_BOOKINGS);
  const [convs, setConvs] = useState<Conversation[]>(INIT_CONVS);
  const [activeC, setActiveC] = useState<number | null>(null);

  // ── Booking modal ──
  const [bookModal, setBookModal] = useState<Car | null>(null);
  const [bookDone, setBookDone] = useState(false);

  // ── Profile modal ──
  const [showProfile, setShowProfile] = useState(false);

  const t = TR[lang];
  const rtl = lang === "ar";

  // ── Derived: filtered cars ──
  const filteredCars = CARS
    .filter(c => {
      if (fType !== "all" && c.type !== fType) return false;
      if (wilaya && c.wilaya !== wilaya) return false;
      return true;
    })
    .sort((a, b) =>
      sort === "cheap" ? a.price - b.price :
      sort === "new"   ? b.year  - a.year  :
                         b.trips - a.trips
    );

  const weddingCars = CARS.filter(c => c.wedding);
  const unreadMsgs = convs.reduce((n, c) => n + c.msgs.filter(m => m.from === "agency").length, 0);

  const wilayaLabel = wilaya
    ? (ALL_WILAYAS.find(w => w.c === wilaya)?.[lang === "fr" ? "fr" : "ar"] ?? t.allWilayas)
    : t.allWilayas;

  // ── Navigation helpers ──
  const goHome    = () => { setPage("home"); setSelectedCar(null); setSelectedAgency(null); };
  const goCars    = () => setPage("cars");
  const goWedding = () => { setFType("wedding"); setPage("home"); };
  const goMsgs    = () => setPage("messages");

  const openCar = (car: Car) => { setSelectedCar(car); setPage("car"); window.scrollTo(0, 0); };
  const openAgency = (ag: Agency) => { setSelectedAgency(ag); setPage("agency"); window.scrollTo(0, 0); };

  const openMsgsForAgency = (agId?: number) => {
    if (agId) {
      openOrCreateConversation(agId, convs, setConvs, setActiveC);
    }
    setPage("messages");
  };

  // ── Auth ──
  const doLogin = () => {
    setAuthError("");
    if (authForm.username === ADMIN_USERNAME && authForm.password === ADMIN_PASSWORD) {
      setCurrentUser({ id: "admin", username: "admin", password: "", name: "Admin", phone: "0000000000", avatar: "https://i.pravatar.cc/80?img=3", provider: "manual" });
      setShowAuth(false); setShowAdmin(true);
      return;
    }
    const { user, error } = loginUser(authForm.username, authForm.password);
    if (error) {
      const errMap: Record<string, Record<Lang, string>> = {
        errNotFound:     { ar: "اسم المستخدم أو كلمة المرور خاطئة", fr: "Identifiants incorrects", en: "Wrong credentials" },
        errStillPending: { ar: "حسابك قيد المراجعة من طرف الادمن", fr: "Compte en attente de validation", en: "Account pending admin approval" },
      };
      setAuthError(errMap[error]?.[lang] ?? error);
      return;
    }
    setCurrentUser(user!);
    setShowAuth(false);
  };

  const doRegister = () => {
    setAuthError(""); setAuthSuccess("");
    const { success, error } = registerUser(authForm.username, authForm.password, authForm.phone, authForm.avatar);
    if (error) {
      const errMap: Record<string, Record<Lang, string>> = {
        errUsername:     { ar: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل", fr: "Nom d'utilisateur trop court", en: "Username too short" },
        errUsernameTaken:{ ar: "اسم المستخدم مستخدم بالفعل",               fr: "Nom d'utilisateur déjà pris", en: "Username already taken" },
        errPassword:     { ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", fr: "Mot de passe trop court",     en: "Password too short" },
        errPhone:        { ar: "رقم الهاتف غير صحيح (مثال: 0555123456)",   fr: "Numéro de téléphone invalide", en: "Invalid phone number" },
        errPhoneTaken:   { ar: "رقم الهاتف مستخدم بالفعل",                 fr: "Numéro déjà utilisé",          en: "Phone already used" },
      };
      setAuthError(errMap[error]?.[lang] ?? error);
      return;
    }
    setAuthSuccess(lang === "ar" ? "تم الإرسال! سيتم مراجعة طلبك من الادمن." : lang === "fr" ? "Envoyé! Votre demande sera examinée." : "Sent! Admin will review your request.");
  };

  const doBook = (car: Car) => {
    if (!currentUser) { setShowAuth(true); return; }
    const nb: Booking = {
      id: Date.now(), agencyId: car.agencyId, carName: car.name,
      clientName: currentUser.name, clientPhone: currentUser.phone,
      from: "", to: "", days: 1, total: car.price, status: "pending",
      time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }),
    };
    setBookings(p => [...p, nb]);
    setBookModal(car); setBookDone(true);
    setTimeout(() => { setBookDone(false); setBookModal(null); }, 3500);
  };

  // ── Nav items ──
  const navItems = [
    { k: "home",     icon: <Ic.Home />,  l: t.nav.home,    fn: goHome },
    { k: "cars",     icon: <Ic.Car />,   l: t.nav.cars,    fn: goCars },
    { k: "wedding",  icon: <Ic.Rings />, l: t.nav.wedding, fn: goWedding },
    { k: "agencies", icon: <Ic.Map />,   l: t.nav.agencies, fn: () => setPage("home") },
    { k: "messages", icon: <Ic.Msg />,   l: t.nav.messages, fn: goMsgs },
  ];

  // ── Render ──
  if (splash) return <SplashScreen splashOut={splashOut} />;

  return (
    <MainLayout
      page={page} lang={lang} darkMode={darkMode} setDarkMode={setDarkMode}
      setLang={v => setLang(v as Lang)} t={t} rtl={rtl} navItems={navItems}
      currentUser={currentUser} unreadMsgs={unreadMsgs}
      onOpenAuth={() => setShowAuth(true)}
      onOpenProfile={() => {
        if (currentUser?.username === ADMIN_USERNAME) setShowAdmin(true);
        else setShowProfile(true);
      }}
      onOpenMsgs={() => goMsgs()}
      onAddCar={() => setPage("addAgency")}
      onAddAgency={() => setPage("addAgency")}
    >
      {/* ── PAGES ── */}
      {page === "home" && (
        <HomePage
          t={t} lang={lang} rtl={rtl} darkMode={darkMode}
          fType={fType} setFType={setFType} sort={sort} setSort={setSort}
          wilaya={wilaya} setWilaya={setWilaya} ddOpen={ddOpen} setDdOpen={setDdOpen}
          selBrand={selBrand} setSelBrand={setSelBrand}
          filteredCars={filteredCars} weddingCars={weddingCars} wilayaLabel={wilayaLabel}
          openCar={openCar} openAgency={openAgency} openMsgs={openMsgsForAgency}
          openAddAgency={() => setPage("addAgency")}
        />
      )}

      {page === "car" && selectedCar && (
        <CarDetailPage
          t={t} lang={lang} car={selectedCar}
          reviews={reviews} setReviews={setReviews}
          currentUser={currentUser}
          onBack={() => setPage("home")}
          onBook={doBook}
          onMsgAgency={agId => openMsgsForAgency(agId)}
          onOpenAgency={openAgency}
          onOpenAuth={() => setShowAuth(true)}
        />
      )}

      {page === "agency" && selectedAgency && (
        <AgencyPage
          t={t} lang={lang} agency={selectedAgency}
          reviews={reviews} setReviews={setReviews}
          currentUser={currentUser}
          onBack={() => setPage("home")}
          onOpenCar={openCar}
          onMsgAgency={agId => openMsgsForAgency(agId)}
          onOpenAuth={() => setShowAuth(true)}
        />
      )}

      {page === "messages" && (
        <MessagesPage
          t={t} lang={lang} rtl={rtl}
          convs={convs} setConvs={setConvs}
          activeC={activeC} setActiveC={setActiveC}
          currentUser={currentUser}
          onOpenAuth={() => setShowAuth(true)}
          onBack={() => setPage("home")}
        />
      )}

      {page === "addAgency" && (
        <AddAgencyPage t={t} lang={lang} onBack={() => setPage("home")} />
      )}

      {/* ── MODALS ── */}

      {/* Auth Modal */}
      {showAuth && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => e.target === e.currentTarget && setShowAuth(false)}>
          <div style={{ background: "#0D0D20", border: "1px solid rgba(124,58,237,.3)", borderRadius: 22, padding: 32, width: "100%", maxWidth: 420, animation: "fadeUp .3s ease both" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: "#fff" }}>
                {authTab === "login" ? (lang === "ar" ? "تسجيل الدخول" : lang === "fr" ? "Connexion" : "Sign In") : (lang === "ar" ? "إنشاء حساب" : lang === "fr" ? "Créer un compte" : "Register")}
              </h2>
            </div>

            <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,.05)", borderRadius: 10, padding: 4, marginBottom: 22 }}>
              {(["login", "register"] as const).map(k => (
                <button key={k} onClick={() => { setAuthTab(k); setAuthError(""); setAuthSuccess(""); }}
                  style={{ flex: 1, background: authTab === k ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", border: "none", color: authTab === k ? "#fff" : "rgba(255,255,255,.45)", padding: "8px", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  {k === "login" ? (lang === "ar" ? "دخول" : "Connexion") : (lang === "ar" ? "تسجيل" : "Inscription")}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { l: lang === "ar" ? "اسم المستخدم" : "Nom d'utilisateur", k: "username", t: "text" },
                { l: lang === "ar" ? "كلمة المرور" : "Mot de passe", k: "password", t: "password" },
                ...(authTab === "register" ? [{ l: lang === "ar" ? "رقم الهاتف" : "Téléphone", k: "phone", t: "tel" }] : []),
              ].map(f => (
                <input key={f.k} type={f.t} placeholder={f.l} value={(authForm as any)[f.k]} onChange={e => setAuthForm(p => ({ ...p, [f.k]: e.target.value }))}
                  style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "11px 14px", fontSize: 14 }} />
              ))}

              {authError && (
                <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 9, padding: "10px 13px", color: "#F87171", fontSize: 13 }}>{authError}</div>
              )}
              {authSuccess && (
                <div style={{ background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.25)", borderRadius: 9, padding: "10px 13px", color: "#34D399", fontSize: 13 }}>{authSuccess}</div>
              )}

              <button onClick={authTab === "login" ? doLogin : doRegister}
                style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "12px", borderRadius: 11, cursor: "pointer", fontSize: 15, fontWeight: 800, marginTop: 4 }}>
                {authTab === "login" ? (lang === "ar" ? "دخول" : "Se connecter") : (lang === "ar" ? "إنشاء حساب" : "Créer")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookDone && bookModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,.7)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0D0D20", border: "1px solid rgba(52,211,153,.3)", borderRadius: 22, padding: 40, textAlign: "center", maxWidth: 380, width: "100%", animation: "successPop .6s cubic-bezier(.34,1.56,.64,1) both" }}>
            <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#34D399", marginBottom: 9 }}>{t.booked}</h2>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14 }}>{t.bookedMsg}</p>
            <div style={{ marginTop: 18, fontSize: 15, fontWeight: 700, color: "#fff" }}>{bookModal.name}</div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel lang={lang} bookings={bookings} setBookings={setBookings} onClose={() => setShowAdmin(false)} />
      )}

      {/* Agency Dashboard */}
      {showAgencyDash && currentUser && (
        <AgencyDashboard lang={lang} currentUser={currentUser} bookings={bookings} setBookings={setBookings} onClose={() => setShowAgencyDash(false)} />
      )}

      {/* Profile Modal */}
      {showProfile && currentUser && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => e.target === e.currentTarget && setShowProfile(false)}>
          <div style={{ background: "#0D0D20", border: "1px solid rgba(124,58,237,.3)", borderRadius: 22, padding: 32, maxWidth: 360, width: "100%", textAlign: "center" }}>
            <img src={currentUser.avatar} alt="" style={{ width: 70, height: 70, borderRadius: "50%", border: "3px solid #7C3AED", objectFit: "cover", margin: "0 auto 14px" }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 5 }}>{currentUser.name}</h2>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>@{currentUser.username} · {currentUser.phone}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "center" }}>
              <button onClick={() => { setShowProfile(false); setShowAgencyDash(true); }} style={{ background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.3)", color: "#C084FC", padding: "9px 18px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                {lang === "ar" ? "لوحة الوكالة" : "Tableau de bord"}
              </button>
              <button onClick={() => { setCurrentUser(null); setShowProfile(false); }} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", color: "#F87171", padding: "9px 18px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                {lang === "ar" ? "تسجيل الخروج" : "Déconnexion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
