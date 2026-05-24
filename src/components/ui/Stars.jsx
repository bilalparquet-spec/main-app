export function Stars({r, size=13}) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:2}}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color:i<=Math.round(r)?"#F59E0B":"rgba(255,255,255,.15)",fontSize:size}}>★</span>
      ))}
      <span style={{color:"rgba(255,255,255,.38)",fontSize:size-2,marginRight:3}}>{r.toFixed(1)}</span>
    </span>
  );
}
