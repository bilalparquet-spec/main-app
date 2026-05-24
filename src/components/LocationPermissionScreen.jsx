import { useState } from "react";

const ALL_WILAYAS = [
  "الجزائر","وهران","قسنطينة","عنابة","سطيف","تيزي وزو","بجاية","باتنة",
  "بسكرة","تلمسان","المدية","البليدة","مستغانم","سيدي بلعباس","جيجل",
  "سكيكدة","بومرداس","تيبازة","عين الدفلى","غليزان","الأغواط","الجلفة",
  "تيسمسيلت","خنشلة","سوق أهراس","الطارف","وادي سوف","ورقلة","غرداية",
  "تندوف","بشار","أدرار","إليزي","تمنراست",
];

export function LocationPermissionScreen({ onGranted, onSkip, onManualSelect, status }) {
  const [showManual, setShowManual] = useState(false);
  const [search, setSearch] = useState("");
  const [requesting, setRequesting] = useState(false);

  const filtered = ALL_WILAYAS.filter(w => w.includes(search));

  function handleRequest() {
    setRequesting(true);
    onGranted();
  }

  if (showManual) {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "#07080F",
        display: "flex", flexDirection: "column",
        animation: "fadeUp .3s ease",
        fontFamily: "'Cairo', sans-serif",
        zIndex: 900,
      }}>
        {/* Header */}
        <div style={{
          padding: "clamp(16px,4vw,24px) clamp(16px,4vw,24px) clamp(12px,3vw,18px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <button onClick={() => setShowManual(false)} style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <polyline points="15 18 9 12 15 6" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 style={{ fontSize: "clamp(14px,4vw,18px)", fontWeight: 900, color: "#F1F5F9", flex: 1 }}>اختر ولايتك</h2>
        </div>

        {/* Search */}
        <div style={{ padding: "14px 20px 10px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,.06)",
            border: "1.5px solid rgba(255,255,255,.1)",
            borderRadius: 13, padding: "10px 14px",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,.3)" strokeWidth="2"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن ولايتك..."
              style={{
                background: "none", border: "none", outline: "none",
                color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", flex: 1,
              }}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 30px" }}>
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "rgba(255,255,255,.3)", fontSize: 13, marginTop: 30 }}>
              لا توجد نتائج
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
            {filtered.map(w => (
              <button
                key={w}
                onClick={() => onManualSelect(w)}
                style={{
                  padding: "13px 12px", borderRadius: 13,
                  background: "rgba(255,255,255,.04)",
                  border: "1.5px solid rgba(255,255,255,.08)",
                  color: "#F1F5F9", fontSize: 13, fontWeight: 700,
                  fontFamily: "inherit", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "background .18s, border-color .18s",
                  textAlign: "right",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(124,58,237,.15)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="rgba(167,139,250,.6)" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="rgba(167,139,250,.6)" strokeWidth="2"/>
                </svg>
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#07080F",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "32px 28px",
      fontFamily: "'Cairo', sans-serif",
      zIndex: 900,
      animation: "fadeUp .4s ease",
    }}>
      {/* Animated location icon */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute",
            inset: -(i * 18),
            borderRadius: "50%",
            border: `1.5px solid rgba(124,58,237,${0.25 - i * 0.07})`,
            animation: `pulse${i} ${1.2 + i * 0.4}s ease-out infinite`,
          }}/>
        ))}
        <style>{`
          @keyframes pulse1{0%{transform:scale(.8);opacity:.8}100%{transform:scale(1.5);opacity:0}}
          @keyframes pulse2{0%{transform:scale(.7);opacity:.6}100%{transform:scale(1.8);opacity:0}}
          @keyframes pulse3{0%{transform:scale(.6);opacity:.4}100%{transform:scale(2.1);opacity:0}}
        `}</style>

        <div style={{
          width: 86, height: 86, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(109,40,217,.3), rgba(79,70,229,.2))",
          border: "2px solid rgba(124,58,237,.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
        }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              fill="rgba(167,139,250,.2)" stroke="#A78BFA" strokeWidth="1.8"/>
            <circle cx="12" cy="10" r="3" fill="#A78BFA"/>
          </svg>
        </div>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", maxWidth: 340, marginBottom: 36 }}>
        <h1 style={{
          fontSize: 24, fontWeight: 900, color: "#F1F5F9",
          marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.3,
        }}>
          اكتشف سيارات<br/>
          <span style={{
            background: "linear-gradient(90deg,#A78BFA,#818CF8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>في ولايتك</span>
        </h1>
        <p style={{
          fontSize: 14, color: "rgba(255,255,255,.45)",
          lineHeight: 1.7,
        }}>
          شارك موقعك لنعرض لك السيارات والوكالات الأقرب إليك ونسهّل بحثك
        </p>
      </div>

      {/* Feature list */}
      <div style={{
        width: "100%", maxWidth: 360,
        display: "flex", flexDirection: "column", gap: 10,
        marginBottom: 32,
      }}>
        {[
          { icon: "📍", text: "عرض السيارات المتاحة في ولايتك" },
          { icon: "⚡", text: "نتائج بحث أسرع وأكثر دقة" },
          { icon: "🔒", text: "موقعك لا يُشارك مع أحد" },
        ].map(f => (
          <div key={f.icon} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px", borderRadius: 12,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.07)",
          }}>
            <span style={{ fontSize: 18 }}>{f.icon}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 11 }}>

        {/* Grant location */}
        <button
          onClick={handleRequest}
          disabled={requesting || status === "requesting"}
          style={{
            width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
            background: (requesting || status === "requesting")
              ? "rgba(109,40,217,.4)"
              : "linear-gradient(135deg,#6D28D9,#4F46E5)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            fontFamily: "inherit",
            cursor: (requesting || status === "requesting") ? "not-allowed" : "pointer",
            boxShadow: (requesting || status === "requesting") ? "none" : "0 6px 24px rgba(109,40,217,.45)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all .2s",
          }}
        >
          {(requesting || status === "requesting") ? (
            <><LoadingRing/> جاري تحديد موقعك...</>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#fff" strokeWidth="2" fill="rgba(255,255,255,.2)"/>
                <circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth="2"/>
              </svg>
              تفعيل خدمة الموقع
            </>
          )}
        </button>

        {/* Manual select */}
        <button
          onClick={() => setShowManual(true)}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 16,
            border: "1.5px solid rgba(167,139,250,.25)",
            background: "rgba(109,40,217,.07)",
            color: "#A78BFA", fontSize: 14, fontWeight: 700,
            fontFamily: "inherit", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            transition: "background .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.16)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.07)")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A78BFA" strokeWidth="2"/>
            <line x1="3" y1="9" x2="21" y2="9" stroke="#A78BFA" strokeWidth="1.5"/>
            <line x1="3" y1="15" x2="21" y2="15" stroke="#A78BFA" strokeWidth="1.5"/>
            <line x1="9" y1="3" x2="9" y2="21" stroke="#A78BFA" strokeWidth="1.5"/>
            <line x1="15" y1="3" x2="15" y2="21" stroke="#A78BFA" strokeWidth="1.5"/>
          </svg>
          اختر ولايتك يدوياً
        </button>

        {/* Skip */}
        <button
          onClick={onSkip}
          style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,.25)", fontSize: 13,
            fontFamily: "inherit", cursor: "pointer",
            padding: "8px 0", textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          تخطي — عرض كل الولايات
        </button>
      </div>
    </div>
  );
}

function LoadingRing() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "spin .75s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.25)" strokeWidth="2.5"/>
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}
