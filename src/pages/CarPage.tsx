import { useState } from "react";
import { AgencyLogo, Stars, Chip, BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";
import ReviewSection from "../components/ReviewSection";

export function CarPage({t,rtl,lang,car,agency,goBack,openAgency,openMsgs,reviews,setReviews,currentUser,openAuth,openBooking}: any) {
  const [days, setDays] = useState(3);
  const today = new Date().toISOString().split("T")[0];
  const addDays = (d: string, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().split("T")[0]; };
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(addDays(today, 3));
  const calcDays = (f: string, t: string) => { const d = Math.ceil((new Date(t).getTime() - new Date(f).getTime()) / 864e5); return d > 0 ? d : 1; };
  const daysCount = calcDays(fromDate, toDate);
  const total = car.price * daysCount, fee = Math.round(total * .08);
  const tl: any = {instant:{ar:"حجز فوري",fr:"Réservation instantanée",en:"Instant"},freeCancel:{ar:"إلغاء مجاني",fr:"Annulation gratuite",en:"Free cancel"},verified:{ar:"وكالة موثقة",fr:"Agence vérifiée",en:"Verified agency"}};

  const handleFromDate = (v: string) => { setFromDate(v); if (new Date(v) >= new Date(toDate)) setToDate(addDays(v, 1)); };

  return (
    <div style={{maxWidth:980,margin:"0 auto",padding:"28px 5% 56px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:24,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>
      <div className="dg" style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
        <div>
          <div style={{borderRadius:18,overflow:"hidden",marginBottom:14}}>
            <img src={car.img} alt={car.name} style={{width:"100%",height:340,objectFit:"cover"}}/>
          </div>
          <div style={{display:"flex",gap:9,marginBottom:22}}>
            {[car.img,car.img,car.img].map((im: string,i: number)=>(
              <img key={i} src={im} alt="" style={{width:84,height:60,objectFit:"cover",borderRadius:9,border:i===0?"2px solid #7C3AED":"2px solid rgba(255,255,255,.07)",opacity:i===0?1:.5,cursor:"pointer"}}/>
            ))}
          </div>
          <h1 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:7}}>{car.name}</h1>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <Stars r={car.rating}/>
            <span style={{color:"rgba(255,255,255,.33)",fontSize:12}}>{car.reviews} {t.reviews}</span>
            <span style={{color:"rgba(255,255,255,.33)",fontSize:12}}>· {car.trips} {t.trips}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:22}}>
            {[{i:<Ic.Cal/>,l:t.year,v:car.year},{i:<Ic.Users/>,l:t.seats,v:car.seats},{i:<Ic.Car/>,l:t.type,v:car.badge}].map((s: any,i: number)=>(
              <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:14,textAlign:"center"}}>
                <div style={{color:"#7C3AED",display:"flex",justifyContent:"center",marginBottom:6}}>{s.i}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.33)",marginBottom:2}}>{s.l}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap"}}>
            {(car.tags||[]).map((tag: string)=><Chip key={tag} icon={<Ic.Check/>} label={tl[tag]?.[lang==="fr"?"fr":lang==="en"?"en":"ar"]}/>)}
          </div>
          {agency&&(
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:18,display:"flex",alignItems:"center",gap:14}}>
              <AgencyLogo agency={agency} size={52} style={{border:"2px solid rgba(124,58,237,.4)"}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginBottom:2}}>{t.agency}</div>
                <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{lang==="ar"?agency.ar:agency.fr}</div>
                <Stars r={agency.rating}/>
                {agency.phone&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:5,fontSize:12,color:"rgba(255,255,255,.5)"}}><Ic.Phone/><a href={`tel:${agency.phone}`} style={{color:"#34D399",fontWeight:600,textDecoration:"none"}}>{agency.phone}</a></div>}
              </div>
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>openAgency(agency)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",padding:"8px 12px",borderRadius:8,cursor:"pointer",fontSize:12}}>{t.ap?.about||"عنا"}</button>
                {currentUser?(
                  <button onClick={()=>openMsgs(agency.id)} style={{background:"rgba(124,58,237,.18)",border:"1px solid rgba(124,58,237,.38)",color:"#C084FC",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                    <Ic.Msg/>{t.msgAgency}
                  </button>
                ):(
                  <button onClick={openAuth} style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"rgba(192,132,252,.6)",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                    🔒 {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
                  </button>
                )}
              </div>
            </div>
          )}
          <ReviewSection lang={lang} targetType="car" targetId={car.id} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={openAuth}/>
        </div>

        {/* BOOKING SIDEBAR */}
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.09)",borderRadius:18,padding:22,height:"fit-content",position:"sticky",top:82}}>
          <div style={{marginBottom:16}}>
            <span style={{fontSize:28,fontWeight:900,color:car.wedding?"#F9A8D4":"#C084FC"}}>{(car.price||0).toLocaleString()}</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,.33)"}}> {t.cur}{t.perDay}</span>
          </div>
          <div style={{marginBottom:7}}>
            <label style={{display:"block",fontSize:10,color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{t.from||"من"}</label>
            <input type="date" value={fromDate} min={today} onChange={e=>handleFromDate(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",borderRadius:8,color:"#fff",padding:"9px 12px",fontSize:13}}/>
          </div>
          <div style={{marginBottom:13}}>
            <label style={{display:"block",fontSize:10,color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{t.to||"إلى"}</label>
            <input type="date" value={toDate} min={addDays(fromDate,1)} onChange={e=>setToDate(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",borderRadius:8,color:"#fff",padding:"9px 12px",fontSize:13}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:9,padding:"7px 11px"}}>
            <button onClick={()=>{const nd=Math.max(1,daysCount-1);setToDate(addDays(fromDate,nd));}} style={{width:30,height:30,borderRadius:6,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
            <div style={{flex:1,textAlign:"center",fontWeight:700,color:"#fff",fontSize:14}}>{daysCount} {t.days}</div>
            <button onClick={()=>setToDate(addDays(fromDate,daysCount+1))} style={{width:30,height:30,borderRadius:6,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:12,marginBottom:16}}>
            {[{l:`${(car.price||0).toLocaleString()} × ${daysCount} ${t.days}`,v:total},{l:t.fee,v:fee}].map((r: any,i: number)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
                <span style={{color:"rgba(255,255,255,.4)"}}>{r.l}</span>
                <span style={{color:"#fff",fontWeight:600}}>{r.v.toLocaleString()} {t.cur}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,.09)",paddingTop:10,marginTop:6}}>
              <span style={{fontWeight:700,color:"#fff",fontSize:14}}>{t.total}</span>
              <span style={{fontWeight:900,color:car.wedding?"#F9A8D4":"#C084FC",fontSize:18}}>{(total+fee).toLocaleString()} {t.cur}</span>
            </div>
          </div>
          {currentUser?(
            <BtnGlow onClick={()=>openBooking(car,agency,daysCount,fromDate,toDate)} style={{width:"100%",background:`linear-gradient(135deg,${car.wedding?"#9D174D,#EC4899":"#7C3AED,#4F46E5"})`,border:"none",color:"#fff",padding:"13px",borderRadius:11,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:`0 6px 24px ${car.wedding?"rgba(236,72,153,.35)":"rgba(124,58,237,.4)"}`}}>
              <Ic.Check/>{t.book}
            </BtnGlow>
          ):(
            <BtnGlow onClick={openAuth} style={{width:"100%",background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.4)",color:"#C084FC",padding:"13px",borderRadius:11,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              🔒 {lang==="ar"?"سجّل الدخول للحجز":lang==="fr"?"Connectez-vous pour réserver":"Sign In to Book"}
            </BtnGlow>
          )}
        </div>
      </div>
    </div>
  );
}
