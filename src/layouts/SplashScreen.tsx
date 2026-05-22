interface Props {
  splashOut: boolean;
}

export function SplashScreen({ splashOut }: Props) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#06060F",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: splashOut ? "splashOut .6s ease forwards" : "none",
      overflow: "hidden",
    }}>
      {/* Background glows */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.18),transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "#5B21B6", opacity: 0.08, filter: "blur(80px)", top: "10%", right: "10%" }} />
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "#6366F1", opacity: 0.07, filter: "blur(60px)", bottom: "15%", left: "8%" }} />

      {/* Animated ring */}
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(124,58,237,.12)", animation: "splashRing 2s ease-out infinite" }} />
      <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(124,58,237,.07)", animation: "splashRing 2s ease-out infinite .4s" }} />

      {/* Logo */}
      <div style={{ animation: "splashIn .7s cubic-bezier(.34,1.56,.64,1) .2s both", display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "relative", zIndex: 1 }}>
        <div style={{ width: 88, height: 88, borderRadius: 24, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 48px rgba(124,58,237,.55)", marginBottom: 22, position: "relative" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="11" width="22" height="9" rx="2"/>
            <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/>
            <circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
          </svg>
          <div style={{ position: "absolute", inset: -1, borderRadius: 25, border: "1px solid rgba(255,255,255,.22)" }} />
        </div>

        <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1, textAlign: "center" }}>
          درايف{" "}
          <span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            RENT
          </span>
        </div>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", marginTop: 12, animation: "splashTagline .6s ease .8s both", fontWeight: 400 }}>
          منصة تأجير السيارات الجزائرية 🇩🇿
        </p>

        {/* Progress bar */}
        <div style={{ width: 160, height: 2, background: "rgba(255,255,255,.06)", borderRadius: 1, marginTop: 36, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#7C3AED,#A855F7,#6366F1)", borderRadius: 1, animation: "splashBar 3s ease forwards .3s", width: "0%" }} />
        </div>
      </div>
    </div>
  );
}
