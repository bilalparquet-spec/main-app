import { WEDDING_CARS } from "../../constants/data.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconPin, IconWedding } from "../ui/AppIcons.jsx";

export function WeddingSection({ delay, onOpen }) {
  const { ref, handlers } = useSpringScroll();

  return (
    <div style={{ marginBottom:36, animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title="سيارات الزفاف" sub="ليلة لا تُنسى تستحق السيارة المثالية" accent="#F472B6" delay={delay}/>

      <div style={{ padding:"0 16px", marginBottom:13 }}>
        <div className="btn-press" onClick={()=>onOpen(WEDDING_CARS[0])} style={{
          borderRadius:22, overflow:"hidden", position:"relative",
          height:200, cursor:"pointer",
          animation:`springIn .6s cubic-bezier(.34,1.56,.64,1) ${delay+.05}s both`,
          boxShadow:"0 12px 40px rgba(244,114,182,.2)",
        }}>
          <img src={WEDDING_CARS[0].img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(244,114,182,.35) 0%,rgba(0,0,0,.7) 60%)" }}/>
          <div style={{ position:"absolute", bottom:18, right:18, left:18 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(244,114,182,.2)", border:"1px solid rgba(244,114,182,.4)", color:"#F9A8D4", padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:800, marginBottom:8 }}>💍 الأكثر طلباً</div>
            <div style={{ fontSize:20, fontWeight:900, color:"#fff", textShadow:"0 2px 12px rgba(0,0,0,.7)" }}>{WEDDING_CARS[0].name}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:6 }}>
              <Stars r={WEDDING_CARS[0].rating} size={13}/>
              <div style={{ fontSize:16, fontWeight:900, color:"#F9A8D4" }}>{WEDDING_CARS[0].price.toLocaleString()} <span style={{ fontSize:10, color:"rgba(255,255,255,.5)" }}>دج/يوم</span></div>
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} {...handlers} style={{
        display:"flex", gap:13, overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"4px 16px 12px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {WEDDING_CARS.slice(1).map((car, i) => (
          <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
            flexShrink:0, width:220,
            borderRadius:17, overflow:"hidden", cursor:"pointer",
            position:"relative", height:155,
            animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.08+.1}s both`,
          }}>
            <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.82) 0%,transparent 45%)" }}/>
            <div style={{ position:"absolute", bottom:12, right:12, left:12 }}>
              <div style={{ fontSize:13, fontWeight:800, color:"#fff", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:10, color:"rgba(255,255,255,.5)" }}><IconPin size={10} color="rgba(255,255,255,.5)"/> {car.wilaya}</span>
                <span style={{ fontSize:12, fontWeight:900, color:"#F9A8D4" }}>{car.price.toLocaleString()} دج</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
