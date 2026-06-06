import { useEffect, useState } from "react";
import APP_ICON_IMG from "../assets/appIcon.js";
import APP_LOGO_IMG from "../assets/appLogo.js";

/**
 * SplashScreen — يظهر عند أول تشغيل للتطبيق (أو كل مرة يُفتح)
 * يختفي تلقائياً بعد 2 ثانية مع انيميشن سلس
 *
 * الاستخدام في main.jsx:
 *   import { SplashScreen } from './components/SplashScreen.jsx';
 *   // ضعه قبل <RouterShell/> واحذفه بعد onDone
 */
export function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("in");   // "in" | "hold" | "out"

  useEffect(() => {
    // ── Haptic خفيف عند ظهور السبلاش
    navigator.vibrate?.(25);

    const holdTimer = setTimeout(() => setPhase("out"), 1800);
    const doneTimer = setTimeout(() => onDone?.(), 2300);
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#07080F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "scale(1.04)" : "scale(1)",
        transition: "opacity .45s ease, transform .45s ease",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* ── نجوم خلفية زخرفية ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { top: "12%", left: "8%",  size: 3, delay: 0 },
          { top: "20%", right: "14%", size: 2, delay: .3 },
          { top: "35%", left: "5%",  size: 2, delay: .6 },
          { top: "70%", right: "9%", size: 3, delay: .2 },
          { top: "80%", left: "18%", size: 2, delay: .5 },
          { top: "55%", right: "4%", size: 2, delay: .8 },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: s.top, left: s.left, right: s.right,
            width: s.size, height: s.size,
            borderRadius: "50%",
            background: "#A78BFA",
            animation: `glow 2s ease ${s.delay}s infinite`,
            opacity: .5,
          }}/>
        ))}
      </div>

      {/* ── دائرة توهج خلف الأيقونة ── */}
      <div style={{
        position: "relative",
        marginBottom: 28,
        animation: "splashIconIn .6s cubic-bezier(.34,1.56,.64,1) both",
      }}>
        {/* توهج بنفسجي */}
        <div style={{
          position: "absolute",
          inset: -24,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,.35) 0%, transparent 70%)",
          animation: "splashGlow 2s ease infinite",
        }}/>
        {/* حلقة دوارة */}
        <div style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          border: "1.5px solid transparent",
          borderTopColor: "rgba(167,139,250,.6)",
          borderRightColor: "rgba(167,139,250,.2)",
          animation: "spin 1.4s linear infinite",
        }}/>
        {/* الأيقونة */}
        <div style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.15)",
          boxShadow: "0 20px 60px rgba(124,58,237,.4), inset 0 0 20px rgba(255,255,255,.06)",
        }}>
          <img src={APP_ICON_IMG} alt="DriveRENT" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
      </div>

      {/* ── الشعار النصي ── */}
      <div
        data-no-i18n="true"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          animation: "splashTextIn .7s ease .2s both",
        }}
      >
        <span style={{
          fontSize: 28,
          fontWeight: 950,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#A78BFA",
          lineHeight: 1,
        }}>RENT</span>
        <span style={{
          fontSize: 22,
          fontWeight: 900,
          color: "#F1F5F9",
          letterSpacing: 1,
          lineHeight: 1,
        }}>درايف</span>
      </div>

      {/* ── نقاط تحميل ── */}
      <div style={{
        display: "flex",
        gap: 6,
        marginTop: 48,
        animation: "splashDotsIn .5s ease .5s both",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#A78BFA",
            animation: `splashDot 1.2s ease ${i * .18}s infinite`,
            opacity: .4,
          }}/>
        ))}
      </div>

      {/* ── CSS مدمج ── */}
      <style>{`
        @keyframes splashIconIn {
          from { opacity:0; transform:scale(.6) translateY(20px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes splashTextIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes splashDotsIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes splashDot {
          0%, 80%, 100% { transform:scale(.6); opacity:.3; }
          40%            { transform:scale(1.1); opacity:1; }
        }
        @keyframes splashGlow {
          0%, 100% { opacity:.5; transform:scale(1); }
          50%       { opacity:1; transform:scale(1.1); }
        }
      `}</style>
    </div>
  );
}
