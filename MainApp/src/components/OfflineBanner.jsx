/**
 * OfflineBanner — شريط إشعار الـ Offline لـ DriveRENT
 *
 * يظهر بهدوء في أعلى الشاشة عند انقطاع الاتصال
 * ويختفي تلقائياً 3 ثوانٍ بعد عودته
 */
import { useEffect, useState } from "react";

export function OfflineBanner({ isOnline }) {
  const [visible, setVisible]   = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [phase, setPhase]       = useState("hidden"); // hidden | offline | back

  useEffect(() => {
    if (!isOnline) {
      // انقطع الاتصال
      setWasOffline(true);
      setPhase("offline");
      setVisible(true);
    } else if (wasOffline) {
      // عاد الاتصال
      setPhase("back");
      const t = setTimeout(() => {
        setVisible(false);
        setWasOffline(false);
        setPhase("hidden");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [isOnline]); // eslint-disable-line

  if (!visible) return null;

  const isBack = phase === "back";

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 8000,
      // safe-area للشاشات ذات الـ notch
      paddingTop: "env(safe-area-inset-top, 0px)",
      pointerEvents: "none",
    }}>
      <div style={{
        margin: "8px 12px 0",
        borderRadius: 14,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: isBack
          ? "rgba(16,185,129,.92)"
          : "rgba(30,30,40,.95)",
        border: `1px solid ${isBack ? "rgba(16,185,129,.5)" : "rgba(255,255,255,.1)"}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,.4)",
        animation: "bannerSlideIn .3s cubic-bezier(.34,1.4,.64,1) both",
      }}>
        {/* أيقونة */}
        <div style={{ flexShrink: 0 }}>
          {isBack ? (
            // ✓ عادت الشبكة
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" fill="rgba(255,255,255,.15)"/>
              <path d="M5.5 9L7.5 11L12.5 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            // 📶 لا يوجد اتصال
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 13.5C4.5 11 7 9.5 9 9.5S13.5 11 16 13.5" stroke="rgba(255,255,255,.3)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M5 10.5C6.5 9 7.7 8.2 9 8.2S11.5 9 13 10.5" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M7.5 7.5C8 7.1 8.5 6.9 9 6.9S10 7.1 10.5 7.5" stroke="rgba(255,255,255,.7)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M3 3L15 15" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* النص */}
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
          }}>
            {isBack ? "عاد الاتصال بالإنترنت" : "أنت بدون اتصال"}
          </p>
          <p style={{
            margin: 0,
            fontSize: 11,
            color: "rgba(255,255,255,.6)",
            marginTop: 2,
          }}>
            {isBack
              ? "يتم تحديث البيانات..."
              : "تعرض بيانات آخر زيارة"
            }
          </p>
        </div>

        {/* نقطة حالة */}
        <div style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: isBack ? "#10B981" : "#EF4444",
          boxShadow: `0 0 8px ${isBack ? "#10B981" : "#EF4444"}`,
          animation: isBack ? "none" : "offlinePulse 1.5s ease infinite",
        }}/>
      </div>

      <style>{`
        @keyframes bannerSlideIn {
          from { opacity:0; transform:translateY(-100%); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes offlinePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }
      `}</style>
    </div>
  );
}
