import { useState } from "react";
import { Stars } from "./ui/Stars.jsx";
import { IconLike } from "./ui/AppIcons.jsx";

export function CarCard({car, onClick, liked, onLike, idx}) {
  const [imgOk, setImgOk] = useState(false);
  const bc = {فاخرة:"#F59E0B",SUV:"#34D399",كهربائية:"#60A5FA",زفاف:"#F472B6","4×4":"#FB923C",سيدان:"#A78BFA",فان:"#94A3B8"}[car.badge]||"#A78BFA";
  return (
    <div className="hov" onClick={onClick} style={{
      background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",
      borderRadius:18,overflow:"hidden",cursor:"pointer",
      animation:`cardIn .4s ease ${Math.min(idx,.8)*.07}s both`,
      flexShrink:0,
    }}>
      <div style={{position:"relative",height:188,overflow:"hidden",background:"#0D0E1A"}}>
        {!imgOk && <div className="skel" style={{position:"absolute",inset:0,borderRadius:0}}/>}
        <img className="car-img" src={car.img} alt={car.name} onLoad={()=>setImgOk(true)}
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:imgOk?1:0,transition:"opacity .3s"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72),transparent 55%)"}}/>
        <div style={{position:"absolute",top:10,right:10,background:`${bc}22`,border:`1px solid ${bc}55`,color:bc,padding:"2px 10px",borderRadius:20,fontSize:10,fontWeight:800,backdropFilter:"blur(6px)"}}>
          {car.badge}
        </div>
        <button onClick={e=>{e.stopPropagation();onLike();}} style={{
          position:"absolute",top:9,left:9,width:32,height:32,borderRadius:"50%",border:"none",
          background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          animation:liked?"heartPop .38s ease both":undefined,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={liked?"#EF4444":"none"}
            stroke={liked?"#EF4444":"rgba(255,255,255,.75)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <div style={{position:"absolute",bottom:8,right:10,display:"flex",gap:5}}>
          {car.verified&&<span style={{background:"rgba(52,211,153,.15)",border:"1px solid rgba(52,211,153,.3)",color:"#34D399",padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700}}>✓ موثقة</span>}
          {car.freeCancel&&<span style={{background:"rgba(96,165,250,.12)",border:"1px solid rgba(96,165,250,.3)",color:"#60A5FA",padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700}}>إلغاء مجاني</span>}
        </div>
      </div>
      <div style={{padding:"12px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>{car.name}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginTop:2}}>{car.wilaya} · {car.year}</div>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#C084FC"}}>{car.price.toLocaleString()}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>دج/يوم</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,paddingTop:8,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          <Stars r={car.rating} size={12}/>
          <span style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{car.reviews} تقييم</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:11}}>
          {[car.fuel,car.trans,`${car.seats} مقاعد`].map((c,i)=>(
            <span key={i} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",color:"rgba(255,255,255,.48)",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{c}</span>
          ))}
        </div>
        <button className="btn" style={{width:"100%",padding:"10px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#6D28D9,#4F46E5)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(109,40,217,.28)"}}>
          احجز الآن
        </button>
      </div>
    </div>
  );
}
