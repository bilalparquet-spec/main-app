import { useState } from "react";
import { Ic } from "../components/Icons";
import { GLOBAL_STYLES } from "../assets/globalStyles";
import { FONT_STYLE } from "../assets/fonts";

interface NavItem {
  k: string;
  icon: React.ReactNode;
  l: string;
  fn: () => void;
}

interface Props {
  children: React.ReactNode;
  page: string;
  lang: string;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  setLang: (v: string) => void;
  t: any;
  rtl: boolean;
  navItems: NavItem[];
  currentUser: any;
  unreadMsgs: number;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenMsgs: () => void;
  onAddCar: () => void;
  onAddAgency: () => void;
}

export function MainLayout({
  children, page, lang, darkMode, setDarkMode, setLang,
  t, rtl, navItems, currentUser, unreadMsgs,
  onOpenAuth, onOpenProfile, onOpenMsgs, onAddCar, onAddAgency,
}: Props) {
  const [mMenu, setMMenu] = useState(false);
  const dm = darkMode;

  return (
    <div style={{
      fontFamily: rtl ? "'Qatar2022Font','Cairo','Tajawal',sans-serif" : "'Qatar2022Font','Outfit','DM Sans',sans-serif",
      direction: t.dir,
      background: dm ? "#06060F" : "#F0F2F8",
      color: dm ? "#F1F5F9" : "#1A1A2E",
      minHeight: "100vh",
      overflowX: "hidden",
      transition: "background .3s,color .3s",
    }}>
      <style>{FONT_STYLE + GLOBAL_STYLES}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: dm ? "rgba(6,6,15,.92)" : "rgba(240,242,248,.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${dm ? "rgba(124,58,237,.15)" : "rgba(0,0,0,.08)"}`,
        padding: "0 5%",
      }}>
        <div style={{ display: "flex", alignItems: "center", height: 60, gap: 18 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
            onClick={() => navItems.find(n => n.k === "home")?.fn()}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(124,58,237,.4)", flexShrink: 0 }}>
              <Ic.Car />
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.5px", color: dm ? "#fff" : "#1A1A2E" }}>
              {lang === "ar" ? "درايف" : "Drive"}
              <span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {lang === "ar" ? " RENT" : "RENT"}
              </span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="mob-hide" style={{ display: "flex", gap: 2, marginRight: "auto", marginLeft: "auto" }}>
            {navItems.map(n => (
              <button key={n.k} className="navbtn"
                onClick={n.fn}
                style={{ background: "none", border: "none", color: page === n.k ? "#C084FC" : dm ? "rgba(255,255,255,.55)" : "#555", padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "color .2s" }}>
                {n.icon}{n.l}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: rtl ? "auto" : 0, marginLeft: rtl ? 0 : "auto" }}>
            {/* Dark mode toggle */}
            <button onClick={() => setDarkMode(!dm)} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: dm ? "#F59E0B" : "#6366F1", width: 36, height: 36, borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}>
              {dm ? <Ic.Sun /> : <Ic.Moon />}
            </button>

            {/* Language selector */}
            <div style={{ position: "relative" }}>
              <button
                style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: dm ? "rgba(255,255,255,.65)" : "#555", padding: "6px 10px", borderRadius: 9, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}
                onClick={() => { const l = lang === "ar" ? "fr" : lang === "fr" ? "en" : "ar"; setLang(l); }}>
                <Ic.Globe />
                {lang === "ar" ? "AR" : lang === "fr" ? "FR" : "EN"}
              </button>
            </div>

            {/* Auth / Profile */}
            {currentUser ? (
              <button onClick={onOpenProfile} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.3)", borderRadius: 9, padding: "5px 10px 5px 5px", cursor: "pointer" }}>
                <img src={currentUser.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "2px solid #7C3AED" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#C084FC" }}>{currentUser.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button onClick={onOpenAuth} className="mob-hide" style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                {lang === "ar" ? "دخول" : lang === "fr" ? "Connexion" : "Sign In"}
              </button>
            )}

            {/* Mobile hamburger */}
            <button className="mob-show" onClick={() => setMMenu(v => !v)} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: dm ? "rgba(255,255,255,.65)" : "#555", width: 36, height: 36, borderRadius: 9, cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center" }}>
              {mMenu ? <Ic.X /> : <Ic.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mMenu && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "12px 0 16px" }}>
            {navItems.map(n => (
              <button key={n.k} onClick={() => { n.fn(); setMMenu(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: "none", border: "none", color: page === n.k ? "#C084FC" : dm ? "rgba(255,255,255,.7)" : "#444", padding: "11px 6px", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                {n.icon}{n.l}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main>{children}</main>

      {/* ── FLOATING MESSAGE BUTTON ── */}
      <button className="fab-msg" onClick={onOpenMsgs} style={{ position: "fixed", bottom: 28, left: rtl ? 24 : "auto", right: rtl ? "auto" : 24, zIndex: 99, width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ic.Msg />
        {unreadMsgs > 0 && (
          <span style={{ position: "absolute", top: -3, right: -3, width: 20, height: 20, borderRadius: "50%", background: "#EF4444", border: "2px solid #06060F", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s infinite" }}>
            {unreadMsgs}
          </span>
        )}
      </button>

      {/* ── BOTTOM NAV (mobile only) ── */}
      <nav className="bottom-nav">
        {[
          { k: "home",    icon: <Ic.Home />,  l: t.nav.home,    fn: navItems.find(n => n.k === "home")?.fn || (() => {}) },
          { k: "cars",    icon: <Ic.Car />,   l: t.nav.cars,    fn: navItems.find(n => n.k === "cars")?.fn || (() => {}) },
          { k: "wedding", icon: <Ic.Rings />, l: t.nav.wedding, fn: navItems.find(n => n.k === "wedding")?.fn || (() => {}) },
          { k: "agencies",icon: <Ic.Map />,   l: t.nav.agencies,fn: navItems.find(n => n.k === "agencies")?.fn || (() => {}) },
          ...(currentUser
            ? [{ k: "profile", icon: <span style={{ fontSize: 20 }}>👤</span>, l: lang === "ar" ? "حسابي" : lang === "fr" ? "Profil" : "Profile", fn: onOpenProfile }]
            : [{ k: "signin",  icon: <span style={{ fontSize: 20 }}>🔑</span>, l: lang === "ar" ? "دخول"  : lang === "fr" ? "Connexion" : "Login", fn: onOpenAuth }]),
        ].map(n => (
          <button key={n.k} className={`bnav-btn${page === n.k ? " active" : ""}`} onClick={n.fn}>
            {n.icon}
            <span>{n.l}</span>
            {n.k === "profile" && unreadMsgs > 0 && (
              <span style={{ position: "absolute", top: 4, background: "#EF4444", borderRadius: "50%", width: 8, height: 8, border: "1px solid #06060F" }} />
            )}
          </button>
        ))}
      </nav>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", overflow: "hidden", padding: "22px 5%", background: "#03030A", borderTop: "1px solid rgba(124,58,237,.12)" }}>
        <div style={{ position: "absolute", width: 320, height: 60, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(124,58,237,.12),transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", zIndex: 1 }}>
          <div style={{ height: 1, width: 48, background: "linear-gradient(to right,transparent,rgba(124,58,237,.4))" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", fontWeight: 400, fontFamily: "'Qatar2022Font','Cairo',sans-serif" }}>
            برمجة و تطوير غواط عبد الرحمان
          </span>
          <div style={{ height: 1, width: 48, background: "linear-gradient(to left,transparent,rgba(124,58,237,.4))" }} />
        </div>
      </footer>
    </div>
  );
}
