import { useState } from "react";
import { MONTH_CARS } from "../../constants/data.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";

export function MonthCarsSection({ delay, onOpen }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());
  const CARD_W = 200;
  const bc = { فاخرة:"#F59E0B", SUV:"#34D399", كهربائية:"#60A5FA", سيدان:"#A78BFA" };

  return (
    <div style={{ marginBottom:36, animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title="سيارات الشهر" sub="أفضل اختيار من جميع الولايات" accent="#F59E0B" delay={delay}/>
      <div ref={ref} {...handlers} style={{
        display:"flex", gap:13, overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"6px 16px 12px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {MONTH_CARS.map((car, i) => {
          const color = bc[car.badge] || "#A78BFA";
          return (
            <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
              flexShrink:0, width:CARD_W,
              background:"rgba(255,255,255,.03)",
              border:"1px solid rgba(255,255,255,.08)",
              borderRadius:17, overflow:"hidden", cursor:"pointer",
              animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07}s both`,
            }}>
              <div style={{ position:"relative", height:130, overflow:"hidden", background:"#0D0E1A" }}>
                <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.68),transparent 50%)" }}/>
                <div style={{
                  position:"absolute", top:8, right:8,
                  width:26, height:26, borderRadius:"50%",
                  background:`linear-gradient(135deg,${color},${color}99)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:900, color:"#fff",
                  boxShadow:`0 3px 10px ${color}55`,
                }}>#{i+1}</div>
                <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(car.id)?n.delete(car.id):n.add(car.id);return n;});}}
                  style={{ position:"absolute",top:7,left:7,width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:liked.has(car.id)?"heartPop .38s ease both":undefined }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={liked.has(car.id)?"#EF4444":"none"} stroke={liked.has(car.id)?"#EF4444":"rgba(255,255,255,.7)"} strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
                <div style={{ position:"absolute", bottom:7, right:9 }}>
                  <div style={{ background:`${color}22`, border:`1px solid ${color}55`, color, padding:"2px 7px", borderRadius:20, fontSize:8, fontWeight:800 }}>{car.badge}</div>
                </div>
              </div>
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:12, fontWeight:800, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", marginTop:2, marginBottom:7 }}>📍 {car.wilaya}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Stars r={car.rating} size={10}/>
                  <div>
                    <span style={{ fontSize:13, fontWeight:900, color:"#C084FC" }}>{car.price.toLocaleString()}</span>
                    <span style={{ fontSize:9, color:"rgba(255,255,255,.3)" }}> دج</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
