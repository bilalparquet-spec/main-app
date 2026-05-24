export function SectionHeader({ title, sub, accent, onSeeAll, delay = 0 }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"flex-end",
      marginBottom:16, padding:"0 16px",
      animation:`sectionIn .5s ease ${delay}s both`,
    }}>
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:4, height:22, borderRadius:4, background:`linear-gradient(180deg,${accent},${accent}88)` }}/>
          <div style={{ fontSize:18, fontWeight:900, color:"#fff", letterSpacing:"-.5px" }}>{title}</div>
        </div>
        {sub && <div style={{ fontSize:12, color:"rgba(255,255,255,.38)", marginTop:3, marginRight:12 }}>{sub}</div>}
      </div>
      <button onClick={onSeeAll} className="btn-press" style={{
        background:`${accent}18`, border:`1px solid ${accent}44`,
        color:accent, padding:"5px 13px", borderRadius:20,
        fontSize:11, fontWeight:800, cursor:"pointer", fontFamily:"inherit",
      }}>الكل ›</button>
    </div>
  );
}
