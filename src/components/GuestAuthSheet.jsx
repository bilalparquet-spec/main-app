import { useEffect, useRef, useState } from "react";
import ROAD_IMG from "../assets/roadImg.js";

export function GuestAuthSheet({ onClose, onLogin, onRegister }) {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(onClose, 380);
  }

  function goLogin() {
    setVisible(false);
    setTimeout(onLogin, 340);
  }

  function goRegister() {
    setVisible(false);
    setTimeout(onRegister, 340);
  }

  function handleBackdrop(e) {
    if (e.target === backdropRef.current) dismiss();
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        background: visible ? "rgba(4,4,12,.72)" : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease, -webkit-backdrop-filter .35s ease",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(320px,98vw,520px)",
          margin: "0 auto",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
          background: "#0A0B17",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: visible
            ? "transform .48s cubic-bezier(.22,1.6,.36,1)"
            : "transform .34s cubic-bezier(.4,0,.6,1)",
          boxShadow: "0 -24px 80px rgba(0,0,0,.7)",
        }}
      >
        {/* ── Road hero image (user-uploaded) ── */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img
            src={ROAD_IMG}
            alt="road"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              display: "block",
              transform: visible ? "scale(1)" : "scale(1.08)",
              transition: "transform .6s cubic-bezier(.22,1,.36,1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,11,23,0) 15%, rgba(10,11,23,.98) 100%)",
            }}
          />

          {/* close pill */}
          <button
            onClick={dismiss}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,.4)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="2" x2="2" y2="12" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* tagline on image */}
          <div style={{
            position: "absolute", bottom: 22, left: 0, right: 0,
            textAlign: "center", padding: "0 24px",
          }}>
            <h2 style={{
              fontSize: 28, fontWeight: 900, color: "#fff",
              letterSpacing: "-1px", lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,.7)",
            }}>ابحث عن رحلتك</h2>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "22px 24px 32px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Login */}
            <button
              onClick={goLogin}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16,
                border: "none", background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
                color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                boxShadow: "0 6px 24px rgba(109,40,217,.45)",
                transition: "filter .2s, transform .15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                <polyline points="10 17 15 12 10 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="15" y1="12" x2="3" y2="12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              تسجيل الدخول
            </button>

            {/* Register */}
            <button
              onClick={goRegister}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16,
                border: "1.5px solid rgba(167,139,250,.35)",
                background: "rgba(109,40,217,.1)",
                color: "#A78BFA", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                transition: "background .2s, transform .15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.1)")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="#A78BFA" strokeWidth="2.2"/>
                <line x1="19" y1="8" x2="19" y2="14" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="22" y1="11" x2="16" y2="11" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              افتح حساباً جديداً
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 16px" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)", flexShrink: 0 }}>أو تصفح كضيف</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          </div>

          <button
            onClick={dismiss}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,.35)", fontSize: 13,
              fontFamily: "inherit", cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: 3, padding: 0,
            }}
          >
            متابعة بدون حساب
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppleBtn({ label = "المتابعة عبر Apple", onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "14px 20px", borderRadius: 16,
        border: "1.5px solid rgba(255,255,255,.2)",
        background: "rgba(255,255,255,.08)",
        color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
        transition: "background .2s, transform .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg width="17" height="17" viewBox="0 0 814 1000" fill="#F1F5F9">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.8 197.6 107.5zm-166.5-115.1c-30.2 35.6-81.1 63.5-129.1 63.5-5.2 0-10.4-.5-15.5-1.3-1.2-5.3-1.8-10.8-1.8-16.5 0-41.6 22.7-85.4 55.2-112.9 17.2-14.4 57-33.7 90.5-35.3 1 6 1.5 12 1.5 17.9 0 44.2-21.3 88.6-50.8 124.6z" />
      </svg>
      {label}
    </button>
  );
}

export function GoogleBtn({ label = "المتابعة عبر Google", onClick }) {
  return (
    <button
      style={{
        width: "100%", padding: "14px 20px", borderRadius: 16,
        border: "1.5px solid rgba(255,255,255,.13)",
        background: "rgba(255,255,255,.05)",
        color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
        transition: "background .2s, transform .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.05)")}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onClick={onClick}
    >
      <svg width="19" height="19" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
      {label}
    </button>
  );
}
