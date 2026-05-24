import { useState } from "react";
import { MONTH_CARS } from "../../constants/data.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin } from "../ui/AppIcons.jsx";

export function MonthCarsSection({ delay, onOpen, userWilaya }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());
  const bc = { فاخرة:"#F59E0B", SUV:"#34D399", كهربائية:"#60A5FA", سيدان:"#A78BFA" };

  const list = userWilaya
    ? [...MONTH_CARS.filter(c => c.wilaya === userWilaya), ...MONTH_CARS.filter(c => c.wilaya !== userWilaya)]
    : MONTH_CARS;

  return (
    <div style={{ marginBottom:"clamp(24px,4vw,40px)", animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader
        title={userWilaya ? `أفضل سيارات في ${userWilaya}` : "سيارات الشهر"}
        sub={userWilaya ? `أبرز اختيارات ولاية ${userWilaya}` : "أفضل اختيار من جميع الولايات"}
        accent="#F59E0B" delay={delay}/>
      <div ref={ref} {...handlers} style={{
        display:"flex", gap:"clamp(10px,2.5vw,16px)", overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"6px clamp(12px,3vw,20px) 14px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {list.map((car, i) => {
          const color = bc[car.badge] || "#A78BFA";
          return (
            <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
              flexShrink:0, width:"var(--section-card-w, 200px)",
              background:"rgba(255,255,255,.03)",
              border:"1px solid rgba(255,255,255,.08)",
              borderRadius:17, overflow:"hidden", cursor:"pointer",
              animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07}s both`,
            }}>
              <div style={{ position:"relative", height:"var(--section-card-img-h, 130px)", overflow:"hidden", background:"#0D0E1A" }}>
                <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.68),transparent 50%)" }}/>
                <div style={{
                  position:"absolute", top:8, right:8,
                  width:"clamp(22px,6vw,28px)", height:"clamp(22px,6vw,28px)", borderRadius:"50%",
                  background:`linear-gradient(135deg,${color},${color}99)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"clamp(9px,2.5vw,12px)", fontWeight:900, color:"#fff",
                  boxShadow:`0 3px 10px ${color}55`,
                }}>#{i+1}</div>
                <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(car.id)?n.delete(car.id):n.add(car.id);return n;});}}
                  style={{ position:"absolute",top:7,left:7,width:"clamp(26px,7vw,32px)",height:"clamp(26px,7vw,32px)",borderRadius:"50%",border:"none",background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:liked.has(car.id)?"heartPop .38s ease both":undefined }}>
                  <IconLike size={12} active={liked.has(car.id)}/>
                </button>
                <div style={{ position:"absolute", bottom:7, right:9 }}>
                  <div style={{ background:`${color}22`, border:`1px solid ${color}55`, color, padding:"2px 7px", borderRadius:20, fontSize:"clamp(7px,2vw,9px)", fontWeight:800 }}>{car.badge}</div>
                </div>
              </div>
              <div style={{ padding:"clamp(9px,2.5vw,12px) clamp(10px,2.5vw,14px)" }}>
                <div style={{ fontSize:"clamp(11px,2.8vw,13px)", fontWeight:800, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
                <div style={{ fontSize:"clamp(9px,2.2vw,11px)", color:"rgba(255,255,255,.35)", marginTop:2, marginBottom:7 }}><IconPin size={10} color="rgba(255,255,255,.35)"/> {car.wilaya}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Stars r={car.rating} size={10}/>
                  <div>
                    <span style={{ fontSize:"clamp(12px,3vw,14px)", fontWeight:900, color:"#C084FC" }}>{car.price.toLocaleString()}</span>
                    <span style={{ fontSize:"clamp(8px,2vw,10px)", color:"rgba(255,255,255,.3)" }}> دج</span>
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
