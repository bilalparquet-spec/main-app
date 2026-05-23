import { useState } from "react";
import { AGENCIES } from "../../constants/data.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin, IconVerified } from "../ui/AppIcons.jsx";

export function AgenciesSection({ delay, onOpen }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());

  return (
    <div style={{ marginBottom:36, animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title="الوكالات المميزة" sub="وكالات موثقة بأعلى التقييمات" accent="#7C3AED" delay={delay}/>
      <div ref={ref} {...handlers} style={{
        display:"flex", gap:13, overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", msOverflowStyle:"none",
        padding:"6px 16px 12px", cursor:"grab", userSelect:"none",
        WebkitOverflowScrolling:"touch",
      }}>
        {AGENCIES.map((ag, i) => (
          <div key={ag.id} className="btn-press" onClick={()=>onOpen&&onOpen(ag)} style={{
            flexShrink:0, width:200,
            background:"rgba(255,255,255,.04)",
            border:"1px solid rgba(255,255,255,.09)",
            borderRadius:18, overflow:"hidden", cursor:"pointer",
            animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay + i*.07}s both`,
          }}>
            <div style={{ position:"relative", height:100, overflow:"hidden", background:"#0D0E1A" }}>
              <img src={ag.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.75),transparent 50%)" }}/>
              {ag.badge && (
                <div style={{
                  position:"absolute", top:8, right:8,
                  background:`linear-gradient(135deg,${ag.color},${ag.color}cc)`,
                  color:"#fff", padding:"2px 9px", borderRadius:20,
                  fontSize:9, fontWeight:900,
                  boxShadow:`0 3px 10px ${ag.color}55`,
                  animation:`badgePop .4s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07+.15}s both`,
                }}>{ag.badge}</div>
              )}
              <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(ag.id)?n.delete(ag.id):n.add(ag.id);return n;});}}
                style={{ position:"absolute",top:7,left:7,width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:liked.has(ag.id)?"heartPop .38s ease both":undefined }}>
                <IconLike size={12} active={liked.has(ag.id)}/>
              </button>
            </div>
            <div style={{ padding:"11px 13px" }}>
              <div style={{ fontSize:13, fontWeight:800, color:"#fff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ag.name}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.38)", marginBottom:8, display:"flex", alignItems:"center", gap:4 }}>
                <IconPin size={11} color="rgba(255,255,255,.38)"/> {ag.wilaya} · {ag.cars} سيارة
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <Stars r={ag.rating} size={11}/>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <IconVerified size={14} color="#34D399"/>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:"#34D399",boxShadow:"0 0 6px #34D39988" }}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
