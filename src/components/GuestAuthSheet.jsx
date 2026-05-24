import { useEffect, useRef, useState } from "react";

/* ─── Road image (long exposure highway at night) ─── */
const ROAD_IMG =
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80&auto=format&fit=crop";

export function GuestAuthSheet({ onClose }) {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef();

  /* mount → trigger spring animation in */
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  /* close: slide back down then unmount */
  function dismiss() {
    setVisible(false);
    setTimeout(onClose, 380);
  }

  /* tap backdrop */
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
        /* fade-in backdrop */
        background: visible
          ? "rgba(4,4,12,.72)"
          : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease, -webkit-backdrop-filter .35s ease",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Sheet ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
          background: "#0A0B17",
          /* spring slide-up */
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: visible
            ? "transform .48s cubic-bezier(.22,1.6,.36,1)"
            : "transform .34s cubic-bezier(.4,0,.6,1)",
          boxShadow: "0 -24px 80px rgba(0,0,0,.7)",
        }}
      >
        {/* ── Road hero image ── */}
        <div
          style={{
            position: "relative",
            height: 210,
            overflow: "hidden",
          }}
        >
          <img
            src={ROAD_IMG}
            alt="road"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 60%",
              display: "block",
              transform: visible ? "scale(1)" : "scale(1.08)",
              transition: "transform .6s cubic-bezier(.22,1,.36,1)",
            }}
          />
          {/* gradient overlay so text reads well */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,11,23,0) 20%, rgba(10,11,23,.98) 100%)",
            }}
          />
          {/* close pill */}
          <button
            onClick={dismiss}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,.14)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "background .2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="2" x2="2" y2="12" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* logo on image */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(10,11,23,.55)",
                backdropFilter: "blur(12px)",
                padding: "6px 16px 6px 10px",
                borderRadius: 40,
                border: "1px solid rgba(167,139,250,.22)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="11" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/>
                  <circle cx="12" cy="16" r="1" fill="#fff"/>
                  <circle cx="20" cy="16" r="1" fill="#fff"/>
                </svg>
              </div>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 15,
                  background: "linear-gradient(90deg,#A78BFA,#818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                درايف RENT
              </span>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "24px 24px 32px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#F1F5F9",
              marginBottom: 8,
              letterSpacing: "-.5px",
            }}
          >
            مرحباً بك في درايف RENT
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.42)",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            سجّل دخولك للوصول إلى مفضلتك، رحلاتك ورسائلك
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Login */}
            <button
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: 16,
                border: "none",
                background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
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
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: 16,
                border: "1.5px solid rgba(167,139,250,.35)",
                background: "rgba(109,40,217,.1)",
                color: "#A78BFA",
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
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

          {/* divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "20px 0 16px",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)", flexShrink: 0 }}>أو تصفح كضيف</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          </div>

          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,.35)",
              fontSize: 13,
              fontFamily: "inherit",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              padding: 0,
            }}
          >
            متابعة بدون حساب
          </button>
        </div>
      </div>
    </div>
  );
}
