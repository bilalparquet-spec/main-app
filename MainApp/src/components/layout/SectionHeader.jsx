export function SectionHeader({ title, sub, accent = "#A78BFA", onSeeAll, delay = 0 }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      marginBottom: "clamp(12px,3vw,18px)", padding: "0 clamp(12px,3vw,20px)",
      animation: `sectionIn .5s ease ${delay}s both`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 4, height: "clamp(20px,5vw,26px)", borderRadius: 4,
            background: `linear-gradient(180deg, ${accent}, ${accent}66)`,
            flexShrink: 0,
            boxShadow: `0 0 12px ${accent}55`,
          }} />
          <div style={{
            fontSize: "clamp(15.5px,4vw,19px)", fontWeight: 950, color: "#fff",
            letterSpacing: "-.5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{title}</div>
        </div>
        {sub && (
          <div style={{
            fontSize: "clamp(10px,2.5vw,12.5px)", color: "rgba(255,255,255,.36)",
            marginTop: 3, marginRight: 13,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{sub}</div>
        )}
      </div>
      <button
        onClick={onSeeAll}
        className="btn-press"
        style={{
          background: `${accent}18`, border: `1px solid ${accent}3d`,
          color: accent, padding: "6px clamp(10px,2.5vw,14px)", borderRadius: 999,
          fontSize: "clamp(10px,2.5vw,12px)", fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit", flexShrink: 0, marginRight: 4,
          letterSpacing: ".2px",
        }}
      >الكل ›</button>
    </div>
  );
}
