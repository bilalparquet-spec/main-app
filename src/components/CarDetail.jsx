import { useState } from "react";
import { Stars } from "./ui/Stars.jsx";
import { StarPicker } from "./ui/StarPicker.jsx";
import {
  IconBack, IconLike, IconCalendar, IconSeat, IconFuel,
  IconGear, IconPin, IconVerified, IconSuccess, IconCar,
  IconPlus, IconMinus, IconStar
} from "./ui/AppIcons.jsx";

const SPEC_ICONS = {
  "سنة الصنع":   <IconCalendar size={19} color="#A78BFA"/>,
  "المقاعد":     <IconSeat     size={19} color="#A78BFA"/>,
  "الوقود":      <IconFuel     size={19} color="#A78BFA"/>,
  "ناقل الحركة": <IconGear     size={19} color="#A78BFA"/>,
  "الولاية":     <IconPin      size={19} color="#A78BFA"/>,
  "موثقة":       <IconVerified size={19}/>,
};

export function CarDetail({car, onBack, liked, onLike, allReviews, addReview}) {
  const [tab, setTab]       = useState("info");
  const [stars, setStars]   = useState(0);
  const [txt, setTxt]       = useState("");
  const [days, setDays]     = useState(3);
  const [booked, setBooked] = useState(false);
  const [imgOk, setImgOk]   = useState(false);
  const myRevs = allReviews.filter(r => r.carId === car.id);

  const submit = () => {
    if (!stars || !txt.trim()) return;
    addReview({id:Date.now(), carId:car.id, name:"أنت",
      avatar:"https://i.pravatar.cc/60?img=1", rating:stars, comment:txt, date:"الآن"});
    setStars(0); setTxt(""); setTab("reviews");
  };

  const specs = [
    ["سنة الصنع",   car.year],
    ["المقاعد",     car.seats],
    ["الوقود",      car.fuel],
    ["ناقل الحركة", car.trans],
    ["الولاية",     car.wilaya],
    ["موثقة",       car.verified ? "نعم" : "لا"],
  ];

  return (
    <div style={{animation:"fadeIn .35s ease", paddingBottom:90}}>
      {/* Back */}
      <button onClick={onBack} style={{
        display:"inline-flex", alignItems:"center", gap:7,
        background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)",
        color:"rgba(255,255,255,.7)", padding:"8px 15px", borderRadius:12,
        cursor:"pointer", marginBottom:16, fontSize:13, fontWeight:700, fontFamily:"inherit"
      }}>
        <IconBack size={16} color="rgba(255,255,255,.7)"/>
        رجوع
      </button>

      {/* Image */}
      <div style={{borderRadius:20, overflow:"hidden", position:"relative", marginBottom:20, background:"#0D0E1A"}}>
        {!imgOk && <div className="skel" style={{height:280, borderRadius:0}}/>}
        <img src={car.img} alt={car.name} onLoad={()=>setImgOk(true)}
          style={{width:"100%", height:280, objectFit:"cover",
            opacity:imgOk?1:0, transition:"opacity .4s", display:"block"}}/>
        <div style={{position:"absolute", inset:0, background:"linear-gradient(to top,#07080F 0%,transparent 55%)"}}/>
        <button onClick={onLike} style={{
          position:"absolute", top:12, right:12, width:38, height:38,
          borderRadius:"50%", border:"none", background:"rgba(0,0,0,.6)",
          backdropFilter:"blur(8px)", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:liked?"heartPop .38s ease both":undefined
        }}>
          <IconLike size={18} active={liked}/>
        </button>
        <div style={{position:"absolute", bottom:18, right:16}}>
          <div style={{fontSize:24, fontWeight:900, color:"#fff", textShadow:"0 2px 16px rgba(0,0,0,.8)"}}>{car.name}</div>
          <div style={{display:"flex", alignItems:"center", gap:8, marginTop:5}}>
            <Stars r={car.rating} size={14}/>
            <span style={{color:"rgba(255,255,255,.45)", fontSize:11}}>{car.reviews||0} تقييم</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex", gap:3, background:"rgba(255,255,255,.04)", borderRadius:13,
        padding:4, marginBottom:18, border:"1px solid rgba(255,255,255,.07)"}}>
        {[["info","المواصفات"],["reviews",`التقييمات (${myRevs.length})`],["write","أضف تقييم"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1, padding:"9px 6px", borderRadius:9, border:"none",
            fontFamily:"inherit", fontWeight:700, fontSize:12, cursor:"pointer",
            transition:"all .22s",
            background:tab===k?"linear-gradient(135deg,#6D28D9,#4F46E5)":"transparent",
            color:tab===k?"#fff":"rgba(255,255,255,.4)"
          }}>{l}</button>
        ))}
      </div>

      {/* Info Tab */}
      {tab==="info" && (
        <div style={{animation:"fadeUp .3s ease"}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16}}>
            {specs.map(([label, value], i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:13, padding:"13px 14px",
                display:"flex", alignItems:"center", gap:10
              }}>
                <div style={{width:34, height:34, borderRadius:9,
                  background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.18)",
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                  {SPEC_ICONS[label]}
                </div>
                <div>
                  <div style={{fontSize:10, color:"rgba(255,255,255,.35)"}}>{label}</div>
                  <div style={{fontSize:14, fontWeight:700, color:"#fff"}}>{String(value)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking */}
          <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:16, padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
              <span style={{fontSize:22, fontWeight:900, color:"#C084FC"}}>
                {car.price.toLocaleString()}
                <span style={{fontSize:11, color:"rgba(255,255,255,.3)"}}> دج/يوم</span>
              </span>
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <button onClick={()=>setDays(d=>Math.max(1,d-1))} style={{
                  width:32, height:32, borderRadius:"50%",
                  border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.06)",
                  color:"#fff", cursor:"pointer", fontFamily:"inherit",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <IconMinus size={16} color="#fff"/>
                </button>
                <span style={{fontWeight:800, fontSize:16, minWidth:22, textAlign:"center"}}>{days}</span>
                <button onClick={()=>setDays(d=>d+1)} style={{
                  width:32, height:32, borderRadius:"50%",
                  border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.06)",
                  color:"#fff", cursor:"pointer", fontFamily:"inherit",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <IconPlus size={16} color="#fff"/>
                </button>
                <span style={{fontSize:12, color:"rgba(255,255,255,.35)"}}>يوم</span>
              </div>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.07)", paddingTop:12, marginBottom:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12,
                color:"rgba(255,255,255,.38)", marginBottom:5}}>
                <span>{car.price.toLocaleString()} × {days} أيام</span>
                <span>{(car.price*days).toLocaleString()} دج</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12,
                color:"rgba(255,255,255,.38)", marginBottom:5}}>
                <span>رسوم الخدمة</span>
                <span>{Math.round(car.price*days*.05).toLocaleString()} دج</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:15,
                paddingTop:8, borderTop:"1px solid rgba(255,255,255,.07)"}}>
                <span style={{color:"#fff"}}>المجموع</span>
                <span style={{color:"#C084FC"}}>{Math.round(car.price*days*1.05).toLocaleString()} دج</span>
              </div>
            </div>
            {booked
              ? <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                  textAlign:"center", padding:13, borderRadius:12,
                  background:"rgba(52,211,153,.1)", border:"1px solid rgba(52,211,153,.28)",
                  color:"#34D399", fontWeight:800, animation:"fadeUp .3s ease"}}>
                  <IconSuccess size={20}/>
                  تم الحجز بنجاح!
                </div>
              : <button className="btn" onClick={()=>{setBooked(true);setTimeout(()=>setBooked(false),3000);}}
                  style={{width:"100%", padding:13, borderRadius:12, border:"none",
                    background:"linear-gradient(135deg,#6D28D9,#4F46E5)", color:"#fff",
                    fontWeight:800, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                    boxShadow:"0 6px 22px rgba(109,40,217,.38)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:9}}>
                  <IconCar size={19} color="#fff"/>
                  احجز الآن
                </button>
            }
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {tab==="reviews" && (
        <div style={{display:"flex", flexDirection:"column", gap:12, animation:"fadeUp .3s ease"}}>
          {myRevs.length===0 && (
            <div style={{textAlign:"center", padding:"40px 0", color:"rgba(255,255,255,.3)"}}>
              لا توجد تقييمات بعد
            </div>
          )}
          {myRevs.map((rv,i)=>(
            <div key={rv.id} style={{background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:14,
              animation:`fadeUp .35s ease ${i*.07}s both`}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:9}}>
                <img src={rv.avatar} style={{width:40, height:40, borderRadius:"50%",
                  objectFit:"cover", border:"2px solid rgba(124,58,237,.4)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700, fontSize:13, color:"#fff"}}>{rv.name}</div>
                  <div style={{fontSize:10, color:"rgba(255,255,255,.3)"}}>{rv.date}</div>
                </div>
                <Stars r={rv.rating} size={12}/>
              </div>
              <p style={{color:"rgba(255,255,255,.62)", fontSize:13, lineHeight:1.75}}>{rv.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Write Review Tab */}
      {tab==="write" && (
        <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
          borderRadius:16, padding:18, animation:"fadeUp .3s ease"}}>
          <div style={{display:"flex", alignItems:"center", gap:8,
            fontWeight:800, fontSize:15, color:"#fff", marginBottom:16}}>
            <IconStar size={17} color="#FBBF24"/>
            شاركنا تجربتك
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12, color:"rgba(255,255,255,.38)", marginBottom:8}}>التقييم</div>
            <StarPicker value={stars} onChange={setStars}/>
          </div>
          <textarea value={txt} onChange={e=>setTxt(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            style={{width:"100%", minHeight:90, padding:12, borderRadius:11,
              background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)",
              color:"#fff", fontSize:13, fontFamily:"inherit", outline:"none",
              resize:"vertical", lineHeight:1.7}}
            onFocus={e=>e.target.style.borderColor="rgba(124,58,237,.6)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
          <button className="btn" onClick={submit} style={{
            marginTop:12, width:"100%", padding:12, borderRadius:11, border:"none",
            background:"linear-gradient(135deg,#6D28D9,#4F46E5)", color:"#fff",
            fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"inherit",
            opacity:(!stars||!txt.trim())?.4:1,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
            <IconStar size={15} color="#fff"/>
            إرسال التقييم
          </button>
        </div>
      )}
    </div>
  );
}
