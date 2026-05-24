import { useState } from "react";

export function StarPicker({value, onChange}) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{display:"flex",gap:4}}>
      {[1,2,3,4,5].map(i => (
        <span key={i}
          onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(0)}
          onClick={()=>onChange(i)}
          style={{
            fontSize:30, cursor:"pointer",
            color:(hov||value)>=i?"#F59E0B":"rgba(255,255,255,.15)",
            display:"inline-block",
            transform:(hov||value)>=i?"scale(1.2)":"scale(1)",
            transition:"color .15s,transform .18s",
          }}>★</span>
      ))}
    </div>
  );
}
