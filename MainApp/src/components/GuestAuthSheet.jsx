import { useEffect, useRef, useState } from "react";
import ROAD_IMG from "../assets/roadImg.js";
import { IconLogin, IconUserPlus, IconApple, IconGoogle } from "./ui/AppIcons.jsx";

export function GuestAuthSheet({ onClose, onLogin, onRegister, onGoogle, onApple }) {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef();
  const startY = useRef(0);
  const [dragY, setDragY] = useState(0);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  function dismiss() { setVisible(false); setTimeout(onClose, 380); }
  function goLogin() { setVisible(false); setTimeout(onLogin, 340); }
  function goRegister() { setVisible(false); setTimeout(onRegister, 340); }
  function handleBackdrop(e) { if (e.target === backdropRef.current) dismiss(); }
  function onTouchStart(e) { startY.current = e.touches?.[0]?.clientY || 0; }
  function onTouchMove(e) {
    const dy = (e.touches?.[0]?.clientY || 0) - startY.current;
    if (dy > 0) setDragY(Math.min(dy, 220));
  }
  function onTouchEnd() { if (dragY > 95) dismiss(); else setDragY(0); }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 1200,
        background: visible ? "rgba(4,4,12,.72)" : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(14px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(14px)" : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease, -webkit-backdrop-filter .35s ease",
        display: "flex", alignItems: "flex-end",
      }}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          width: "100%", maxWidth: "clamp(320px,98vw,520px)", margin: "0 auto",
          borderRadius: "30px 30px 0 0", overflow: "hidden",
          background: "linear-gradient(180deg, #0E0F1E 0%, #09091A 100%)",
          border: "1px solid rgba(255,255,255,.1)", borderBottom: "none",
          transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
          transition: dragY ? "none" : (visible ? "transform .48s cubic-bezier(.22,1.6,.36,1)" : "transform .34s cubic-bezier(.4,0,.6,1)"),
          boxShadow: "0 -28px 80px rgba(0,0,0,.7)",
        }}
      >
        {/* Hero image */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block", transform: visible ? "scale(1)" : "scale(1.08)", transition: "transform .6s cubic-bezier(.22,1,.36,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,11,23,0) 15%, rgba(10,11,23,.98) 100%)" }} />
          {/* Drag handle */}
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 44, height: 5, borderRadius: 999, background: "rgba(255,255,255,.28)", boxShadow: "0 2px 8px rgba(0,0,0,.35)" }} />
          <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", padding: "0 24px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1.2, textShadow: "0 2px 20px rgba(0,0,0,.7)", margin: 0 }}>
              ابحث عن رحلتك
            </h2>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ padding: "22px 22px 32px", display: "flex", flexDirection: "column", gap: 11 }}>
          <button onClick={goLogin} className="btn" style={{ width: "100%", padding: "15px 20px", borderRadius: 17, border: "none", background: "linear-gradient(135deg,#6D28D9,#4F46E5)", color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 24px rgba(109,40,217,.45)" }}>
            <IconLogin size={18} color="#fff" />
            تسجيل الدخول
          </button>
          <button onClick={goRegister} className="btn" style={{ width: "100%", padding: "15px 20px", borderRadius: 17, border: "1.5px solid rgba(167,139,250,.35)", background: "rgba(109,40,217,.1)", color: "#A78BFA", fontSize: 15, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <IconUserPlus size={18} color="#A78BFA" />
            افتح حساباً جديداً
          </button>
          <GoogleBtn label="الدخول عبر Google" onClick={onGoogle || goLogin} />
          <AppleBtn label="الدخول عبر Apple" onClick={onApple || goLogin} />

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)", flexShrink: 0 }}>أو تصفح كضيف</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
          </div>
          <button onClick={dismiss} style={{ background: "none", border: "none", color: "rgba(255,255,255,.35)", fontSize: 13, fontFamily: "inherit", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, padding: "4px 0" }}>
            متابعة بدون حساب
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppleBtn({ label = "المتابعة عبر Apple", onClick }) {
  return (
    <button onClick={onClick} className="btn" style={{ width: "100%", padding: "13px 20px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.07)", color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <IconApple size={17} color="#F1F5F9" />
      {label}
    </button>
  );
}

export function GoogleBtn({ label = "المتابعة عبر Google", onClick }) {
  return (
    <button onClick={onClick} className="btn" style={{ width: "100%", padding: "13px 20px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)", color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <IconGoogle size={19} />
      {label}
    </button>
  );
}
