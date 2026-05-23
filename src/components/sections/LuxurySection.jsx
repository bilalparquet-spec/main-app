import { useState } from "react";
import { LUXURY_CARS } from "../../constants/data.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconCrown, IconPin, IconSeat } from "../ui/AppIcons.jsx";

export function LuxurySection({ delay, onOpen }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());

  return (
    <div style={{ marginBottom:36, animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title="السيارات الفاخرة" sub="تجربة قيادة استثنائية" accent="#F59E0B" delay={delay}/>
      <div ref={ref} {...handlers} style={{
        display:"flex", gap:13, overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"6px 16px 12px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {LUXURY_CARS.map((car, i) => (
          <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
            flexShrink:0, width:240,
            background:"rgba(255,255,255,.03)",
            border:"1px solid rgba(245,158,11,.12)",
            borderRadius:20, overflow:"hidden", cursor:"pointer",
            animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07}s both`,
            boxShadow: i===0 ? "0 8px 30px rgba(245,158,11,.12)" : "none",
          }}>
            <div style={{ position:"relative", height:148, overflow:"hidden", background:"#0D0E1A" }}>
              <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 50%)" }}/>
              {/* Luxury badge */}
              <div style={{
                position:"absolute", top:10, right:10,
                background:"linear-gradient(135deg,#F59E0B,#FBBF24)",
                color:"#000", padding:"2px 9px", borderRadius:20,
                fontSize:9, fontWeight:900, letterSpacing:".3px",
                display:"flex", alignItems:"center", gap:4,
              }}>
                <IconCrown size={9} color="#000"/>
                LUXURY
              </div>
              {/* Like btn */}
              <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(car.id)?n.delete(car.id):n.add(car.id);return n;});}}
                style={{ position:"absolute",top:9,left:9,width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:liked.has(car.id)?"heartPop .38s ease both":undefined }}>
                <IconLike size={12} active={liked.has(car.id)}/>
              </button>
              {/* Specs chips */}
              <div style={{ position:"absolute", bottom:8, left:10, right:10, display:"flex", gap:5 }}>
                <span style={{ background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)", color:"rgba(255,255,255,.8)", padding:"2px 7px", borderRadius:20, fontSize:9, fontWeight:700 }}>⚡ {car.hp} CV</span>
                <span style={{ display:"flex", alignItems:"center", gap:3, background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)", color:"rgba(255,255,255,.8)", padding:"2px 7px", borderRadius:20, fontSize:9, fontWeight:700 }}>
                  <IconSeat size={9} color="rgba(255,255,255,.8)"/>
                  {car.seats}
                </span>
              </div>
            </div>
            <div style={{ padding:"12px 14px" }}>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, color:"rgba(255,255,255,.35)", marginBottom:9 }}>
                <IconPin size={10} color="rgba(255,255,255,.35)"/>
                {car.wilaya}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:9, borderTop:"1px solid rgba(255,255,255,.07)" }}>
                <Stars r={car.rating} size={11}/>
                <div>
                  <span style={{ fontSize:16, fontWeight:900, color:"#FBBF24" }}>{car.price.toLocaleString()}</span>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,.3)" }}> دج/يوم</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
