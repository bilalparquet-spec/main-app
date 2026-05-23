import { useState } from "react";
import { AgencyLogo, Stars, BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";
import ReviewSection from "../components/ReviewSection";

export function AgencyPage({t,rtl,lang,agency,cars,goBack,openCar,openMsgs,reviews,setReviews,currentUser,openAuth}: any) {
  const [tab, setTab] = useState("cars");
  return (
    <div style={{maxWidth:980,margin:"0 auto",padding:"28px 5% 56px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:24,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>

      {/* Agency Hero */}
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.14),rgba(99,102,241,.1))",border:"1px solid rgba(124,58,237,.2)",borderRadius:20,padding:"28px 24px",marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div className="glow" style={{width:280,height:280,background:"#5B21B6",opacity:.12,top:-70,right:"4%"}}/>
        <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap",marginBottom:22}}>
          <AgencyLogo agency={agency} size={72} style={{border:"3px solid rgba(124,58,237,.45)"}}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",marginBottom:4}}>
              <h1 style={{fontSize:22,fontWeight:800,color:"#fff"}}>{lang==="ar"?agency.ar:agency.fr}</h1>
              {agency.verified&&<span style={{display:"flex",alignItems:"center",gap:4,background:"rgba(52,211,153,.09)",border:"1px solid rgba(52,211,153,.28)",color:"#34D399",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}><Ic.Shield/>{t.verified}</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,color:"rgba(255,255,255,.4)",fontSize:12,marginBottom:7}}><Ic.Pin/>{lang==="ar"?agency.city_ar||agency.city?.ar:agency.city_fr||agency.city?.fr}</div>
            <Stars r={agency.rating}/>
          </div>
          <div style={{display:"flex",gap:9}}>
            {agency.phone&&<a href={`tel:${agency.phone}`} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",color:"#fff",padding:"9px 16px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,textDecoration:"none"}}><Ic.Phone/>{agency.phone}</a>}
            {currentUser?(
              <BtnGlow onClick={()=>openMsgs(agency.id)} style={{display:"flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"9px 16px",borderRadius:9,fontSize:12,fontWeight:700}}>
                <Ic.Msg/>{t.msgAgency}
              </BtnGlow>
            ):(
              <BtnGlow onClick={openAuth} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.3)",color:"rgba(192,132,252,.7)",padding:"9px 16px",borderRadius:9,fontSize:12,fontWeight:700}}>
                🔒 {lang==="ar"?"راسل (تسجيل دخول)":lang==="fr"?"Message (connexion)":"Message (Sign In)"}
              </BtnGlow>
            )}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {[{i:<Ic.Star/>,v:agency.rating,l:t.ap.rating,c:"#F59E0B"},{i:<Ic.Car/>,v:cars.length,l:t.ap.totalCars,c:"#C084FC"},{i:<Ic.Users/>,v:agency.trips,l:t.trips,c:"#60A5FA"},{i:<Ic.Shield/>,v:agency.exp,l:t.ap.exp,c:"#34D399"}].map((s: any,i: number)=>(
            <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"12px 8px",textAlign:"center"}}>
              <div style={{color:s.c,display:"flex",justifyContent:"center",marginBottom:5}}>{s.i}</div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{s.v}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.33)",marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,borderBottom:"1px solid rgba(255,255,255,.07)",paddingBottom:0,marginBottom:22}}>
        {[{k:"cars",i:<Ic.Car/>,l:t.ap.cars},{k:"about",i:<Ic.Info/>,l:t.ap.about},{k:"contact",i:<Ic.Phone/>,l:t.ap.contact},{k:"reviews",i:"⭐",l:lang==="ar"?"التقييمات":lang==="fr"?"Avis":"Reviews"}].map((tb: any)=>(
          <button key={tb.k} onClick={()=>setTab(tb.k)} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"none",color:tab===tb.k?"#C084FC":"rgba(255,255,255,.42)",padding:"10px 16px",cursor:"pointer",fontSize:13,fontWeight:600,borderBottom:tab===tb.k?"2px solid #7C3AED":"2px solid transparent",marginBottom:"-1px",transition:"all .2s"}}>
            {tb.i}{tb.l}
          </button>
        ))}
      </div>

      {tab==="cars"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:16}}>
          {cars.map((car: any,idx: number)=>(
            <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",cursor:"pointer",animation:`fadeUp .4s ease ${idx*.07}s both`}}>
              <div style={{position:"relative",height:162,overflow:"hidden"}}>
                <img className="iz" src={car.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 52%)"}}/>
                <div style={{position:"absolute",bottom:9,left:11,fontSize:13,fontWeight:700,color:"#fff"}}>{car.name}</div>
              </div>
              <div style={{padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Stars r={car.rating||0}/>
                <span style={{fontSize:15,fontWeight:800,color:"#C084FC"}}>{(car.price||0).toLocaleString()} <span style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>{t.cur}{t.perDay}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==="about"&&(
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24}}>
          <p style={{color:"rgba(255,255,255,.58)",fontSize:14,lineHeight:1.85}}>
            {agency.about?agency.about[lang==="fr"?"fr":lang==="en"?"en":"ar"] || agency.about_ar || agency.about_fr || agency.about_en || "—"
            : agency.about_ar || agency.about_fr || "—"}
          </p>
        </div>
      )}
      {tab==="contact"&&(
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24,maxWidth:440}}>
          {[{i:<Ic.Phone/>,l:lang==="ar"?"الهاتف":"Téléphone",v:agency.phone},{i:<Ic.Pin/>,l:lang==="ar"?"الموقع":"Localisation",v:lang==="ar"?agency.city_ar||agency.city?.ar:agency.city_fr||agency.city?.fr}].map((r: any,i: number)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:i===0?"1px solid rgba(255,255,255,.06)":"none"}}>
              <div style={{width:38,height:38,borderRadius:9,background:"rgba(124,58,237,.14)",border:"1px solid rgba(124,58,237,.24)",display:"flex",alignItems:"center",justifyContent:"center",color:"#C084FC",flexShrink:0}}>{r.i}</div>
              <div><div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginBottom:2}}>{r.l}</div><div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{r.v}</div></div>
            </div>
          ))}
          <BtnGlow onClick={currentUser?()=>openMsgs(agency.id):openAuth} style={{display:"flex",alignItems:"center",gap:7,background:currentUser?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(124,58,237,.15)",border:currentUser?"none":"1px solid rgba(124,58,237,.3)",color:currentUser?"#fff":"rgba(192,132,252,.7)",padding:"11px 22px",borderRadius:10,fontSize:13,fontWeight:700,marginTop:18}}>
            <Ic.Msg/>{currentUser?t.msgAgency:(lang==="ar"?"راسل (تسجيل دخول)":"Message (Sign In)")}
          </BtnGlow>
        </div>
      )}
      {tab==="reviews"&&(
        <ReviewSection lang={lang} targetType="agency" targetId={agency.id} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={openAuth}/>
      )}
    </div>
  );
}
