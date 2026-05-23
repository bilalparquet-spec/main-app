import { ALL_WILAYAS } from "../data/static";
import { AgencyLogo, Stars, Chip, BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";

const tl: any = {instant:{ar:"فوري",fr:"Instant",en:"Instant"},freeCancel:{ar:"إلغاء مجاني",fr:"Annulable",en:"Free cancel"},verified:{ar:"موثقة",fr:"Vérifiée",en:"Verified"}};
const tc: any = {instant:{c:"#86EFAC",bg:"rgba(134,239,172,.09)",br:"rgba(134,239,172,.25)"},freeCancel:{c:"#93C5FD",bg:"rgba(147,197,253,.09)",br:"rgba(147,197,253,.25)"},verified:{c:"#FDE68A",bg:"rgba(253,230,138,.09)",br:"rgba(253,230,138,.25)"}};

export function HomePage({t,rtl,lang,dm,filteredCars,weddingCars,agencies,fType,setFType,sort,setSort,selBrand,setSelBrand,wilaya,setWilaya,wilayaLabel,ddOpen,setDdOpen,openCar,openAgency,openMsgs,ag,allWilayas,openAddAgency,openAddCar,currentUser,openAuth}: any) {
  return (<>
    {/* MARQUEE */}
    <div style={{background:"linear-gradient(180deg,#03030A,#06060F)",borderBottom:"1px solid rgba(124,58,237,.18)",position:"relative",overflow:"hidden",padding:"18px 0 22px"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 100% at 50% 50%,rgba(124,58,237,.1),transparent)",pointerEvents:"none"}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:18,position:"relative",zIndex:1,padding:"0 5%"}}>
        <div style={{height:1,flex:1,background:"linear-gradient(to right,transparent,rgba(124,58,237,.5))"}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,rgba(124,58,237,.22),rgba(99,102,241,.18))",border:"1px solid rgba(124,58,237,.45)",borderRadius:40,padding:"8px 22px",boxShadow:"0 0 24px rgba(124,58,237,.2)"}}>
          <span style={{fontSize:18}}>🏆</span>
          <span style={{fontSize:12,fontWeight:900,color:"#C084FC",textTransform:"uppercase",letterSpacing:"2px"}}>{lang==="ar"?"الوكالات المميزة · مايو 2026":lang==="fr"?"Agences vedettes · Mai 2026":"Featured Agencies · May 2026"}</span>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#34D399",boxShadow:"0 0 8px #34D399",flexShrink:0,animation:"pulse 2s infinite"}}/>
        </div>
        <div style={{height:1,flex:1,background:"linear-gradient(to left,transparent,rgba(124,58,237,.5))"}}/>
      </div>
      <div style={{overflow:"hidden",position:"relative",zIndex:1,padding:"4px 0"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:90,background:"linear-gradient(to right,#03030A,transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:0,top:0,bottom:0,width:90,background:"linear-gradient(to left,#03030A,transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{display:"flex",gap:16,animation:"marquee 32s linear infinite",willChange:"transform"}}>
          {[...agencies,...agencies,...agencies,...agencies,...agencies,...agencies].map((a: any,i: number)=>(
            <div key={i} onClick={()=>openAgency(a)}
              style={{display:"inline-flex",alignItems:"center",gap:14,background:"linear-gradient(135deg,rgba(255,255,255,.05),rgba(124,58,237,.08))",border:"1px solid rgba(124,58,237,.3)",borderRadius:60,padding:"14px 26px 14px 14px",cursor:"pointer",flexShrink:0,transition:"transform .3s,background .3s,box-shadow .3s",boxShadow:"0 2px 16px rgba(0,0,0,.25)"}}
              onMouseEnter={e=>{(e.currentTarget as any).style.background="linear-gradient(135deg,rgba(124,58,237,.28),rgba(79,70,229,.22))";(e.currentTarget as any).style.transform="translateY(-5px) scale(1.03)";(e.currentTarget as any).style.boxShadow="0 12px 36px rgba(124,58,237,.45)";(e.currentTarget as any).style.borderColor="rgba(124,58,237,.7)";}}
              onMouseLeave={e=>{(e.currentTarget as any).style.background="linear-gradient(135deg,rgba(255,255,255,.05),rgba(124,58,237,.08))";(e.currentTarget as any).style.transform="translateY(0) scale(1)";(e.currentTarget as any).style.boxShadow="0 2px 16px rgba(0,0,0,.25)";(e.currentTarget as any).style.borderColor="rgba(124,58,237,.3)";}}>
              <div style={{position:"relative",flexShrink:0}}>
                <AgencyLogo agency={a} size={52} style={{border:"2.5px solid rgba(124,58,237,.6)",boxShadow:"0 0 16px rgba(124,58,237,.4)"}}/>
                {a.verified&&<span style={{position:"absolute",bottom:-2,right:-2,width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34D399)",border:"2px solid #06060F",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"#fff"}}>✓</span>}
              </div>
              <div>
                <div style={{fontSize:15,fontWeight:900,color:"#fff",whiteSpace:"nowrap",marginBottom:4,letterSpacing:"-.2px"}}>{lang==="ar"?a.ar:a.fr}</div>
                <div style={{display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap"}}>
                  <span style={{fontSize:12,color:"#F59E0B",fontWeight:700}}>⭐ {a.rating}</span>
                  <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.25)"}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>{lang==="ar"?a.city_ar||a.city?.ar:a.city_fr||a.city?.fr}</span>
                  <span style={{fontSize:10,background:"linear-gradient(135deg,rgba(124,58,237,.35),rgba(79,70,229,.35))",color:"#C084FC",padding:"2px 9px",borderRadius:12,fontWeight:800,border:"1px solid rgba(124,58,237,.4)"}}>{lang==="ar"?"★ مميزة":lang==="fr"?"★ Vedette":"★ Featured"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* HERO */}
    <section style={{position:"relative",overflow:"hidden",padding:"68px 5% 84px",background:"linear-gradient(180deg,#06060F 0%,#0E0620 100%)"}}>
      <div className="glow" style={{width:520,height:520,background:"#5B21B6",opacity:.13,top:-130,left:"22%"}}/>
      <div className="glow" style={{width:260,height:260,background:"#1D4ED8",opacity:.1,top:200,right:"6%"}}/>
      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"5px 15px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:20}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#A855F7",animation:"pulse 2s infinite",display:"inline-block"}}/>
          {lang==="ar"?"أكثر من +1000 سيارة في 58 ولاية تنتظرك":lang==="fr"?"+1000 voitures dans 58 wilayas vous attendent":"1000+ cars in 58 wilayas await you"}
        </div>
        <h1 style={{fontSize:"clamp(38px,7vw,72px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-2px",marginBottom:16}}>
          <span style={{display:"block",color:"#fff"}}>{lang==="ar"?"أجّر سيارتك":lang==="fr"?"Louez votre":"Rent Your"}</span>
          <span style={{display:"block",background:"linear-gradient(135deg,#A855F7,#6366F1,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {lang==="ar"?"المثالية في الجزائر":lang==="fr"?"voiture idéale en Algérie":"Dream Car in Algeria"}
          </span>
        </h1>
        <p style={{color:"rgba(255,255,255,.42)",fontSize:12,marginBottom:34,lineHeight:1.75}}>{t.tagline}</p>
        <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:22,padding:18,backdropFilter:"blur(20px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,alignItems:"end",marginBottom:12}}>
            <div style={{position:"relative",minWidth:0}}>
              <label style={{display:"flex",alignItems:"center",gap:5,color:"rgba(255,255,255,.33)",fontSize:10,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:"1.2px"}}><Ic.Pin/>{t.wilaya}</label>
              <button onClick={()=>setDdOpen(!ddOpen)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.11)",borderRadius:11,color:wilaya?"#fff":"rgba(255,255,255,.38)",padding:"11px 14px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <span>{wilayaLabel||t.allWilayas}</span><Ic.ChevD/>
              </button>
              {ddOpen&&(
                <div className="dd" style={{position:"absolute",top:"105%",left:0,right:0,zIndex:99,background:"#0E0E20",border:"1px solid rgba(255,255,255,.11)",borderRadius:12,overflow:"hidden",maxHeight:280,overflowY:"auto"}}>
                  <div onClick={()=>{setWilaya("");setDdOpen(false);}} style={{padding:"9px 13px",cursor:"pointer",fontSize:13,borderBottom:"1px solid rgba(255,255,255,.08)",background:!wilaya?"rgba(124,58,237,.15)":"transparent",color:!wilaya?"#C084FC":"rgba(255,255,255,.55)",fontWeight:600}}>🇩🇿 {t.allWilayas}</div>
                  {ALL_WILAYAS.map((w: any)=>(
                    <div key={w.c} onClick={()=>{setWilaya(w.c);setDdOpen(false);}} style={{padding:"8px 14px",cursor:"pointer",fontSize:13,color:wilaya===w.c?"#C084FC":"rgba(255,255,255,.72)",background:wilaya===w.c?"rgba(124,58,237,.14)":"transparent",borderRight:wilaya===w.c?"3px solid #7C3AED":"3px solid transparent",display:"flex",alignItems:"center",gap:9,transition:"background .15s"}}>
                      <span style={{fontSize:10,color:"rgba(255,255,255,.3)",fontFamily:"monospace",minWidth:20,flexShrink:0}}>{w.c}</span>
                      <span>{lang==="fr"?w.fr:w.ar}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <BtnGlow style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"11px 22px",borderRadius:11,fontSize:13,fontWeight:700,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:7}}>
              <Ic.Search/>{t.searchBtn}
            </BtnGlow>
          </div>
        </div>
      </div>
    </section>

    {/* CARS */}
    <section style={{padding:"52px 5%"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <h2 style={{fontSize:24,fontWeight:800,color:"#fff"}}>{lang==="ar"?"السيارات المتاحة":lang==="fr"?"Voitures disponibles":"Available Cars"}</h2>
        <div style={{display:"flex",gap:7}}>
          {[{k:"pop",l:t.sort.pop},{k:"new",l:t.sort.new},{k:"cheap",l:t.sort.cheap}].map((s: any)=>(
            <button key={s.k} onClick={()=>setSort(s.k)} style={{background:sort===s.k?"rgba(124,58,237,.2)":"transparent",border:`1px solid ${sort===s.k?"rgba(124,58,237,.5)":"rgba(255,255,255,.09)"}`,color:sort===s.k?"#C084FC":"rgba(255,255,255,.42)",padding:"5px 11px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600}}>{s.l}</button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {[{k:"all",i:"🚘",ar:"الكل",fr:"Tous",en:"All"},{k:"sedan",i:"🚗",ar:"سيدان",fr:"Berline",en:"Sedan"},{k:"suv",i:"🚙",ar:"SUV",fr:"SUV",en:"SUV"},{k:"4x4",i:"🏔️",ar:"4×4",fr:"4×4",en:"4×4"},{k:"luxury",i:"💎",ar:"فاخرة",fr:"Luxe",en:"Luxury"},{k:"electric",i:"⚡",ar:"كهربائية",fr:"Électrique",en:"Electric"},{k:"van",i:"🚐",ar:"فان",fr:"Van",en:"Van"},{k:"wedding",i:"💍",ar:"زفاف",fr:"Mariage",en:"Wedding"}].map((f: any)=>(
          <button key={f.k} onClick={()=>setFType(f.k)} style={{display:"flex",alignItems:"center",gap:7,background:fType===f.k?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.04)",border:`2px solid ${fType===f.k?"transparent":"rgba(255,255,255,.08)"}`,color:fType===f.k?"#fff":"rgba(255,255,255,.5)",padding:"8px 16px",borderRadius:24,fontSize:12,fontWeight:700,whiteSpace:"nowrap",cursor:"pointer",transition:"all .22s",flexShrink:0,boxShadow:fType===f.k?"0 4px 18px rgba(124,58,237,.4)":"none"}}>
            <span style={{fontSize:15}}>{f.i}</span>{lang==="ar"?f.ar:lang==="fr"?f.fr:f.en}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
        {filteredCars.map((car: any,idx: number)=>(
          <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${car.wedding?"rgba(236,72,153,.15)":"rgba(255,255,255,.07)"}`,borderRadius:18,overflow:"hidden",cursor:"pointer",animation:`fadeUp .45s ease ${idx*.07}s both`}}>
            <div style={{position:"relative",height:188,overflow:"hidden"}}>
              <img className="iz" src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:10,left:10,background:car.wedding?"rgba(236,72,153,.2)":"rgba(124,58,237,.2)",border:`1px solid ${car.wedding?"rgba(236,72,153,.4)":"rgba(124,58,237,.4)"}`,color:car.wedding?"#F9A8D4":"#C084FC",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                {car.wedding?<Ic.Rings/>:<Ic.Car/>}{car.badge}
              </div>
              <div style={{position:"absolute",bottom:8,left:10,right:10,display:"flex",gap:4,flexWrap:"wrap"}}>
                {(car.tags||[]).map((tag: string)=><Chip key={tag} icon={tag==="instant"?<Ic.Bolt/>:tag==="freeCancel"?<Ic.Refresh/>:<Ic.Check/>} label={tl[tag]?.[lang==="fr"?"fr":lang==="en"?"en":"ar"]} c={tc[tag]?.c} bg={tc[tag]?.bg} br={tc[tag]?.br}/>)}
              </div>
            </div>
            <div style={{padding:"13px 15px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{car.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.33)",marginTop:2,display:"flex",alignItems:"center",gap:5}}><Ic.Cal/>{car.year} <Ic.Users/>{car.seats}</div>
                </div>
                <div style={{textAlign:"end"}}>
                  <span style={{fontSize:19,fontWeight:800,color:car.wedding?"#F9A8D4":"#C084FC"}}>{(car.price||0).toLocaleString()}</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,.32)"}}> {t.cur}{t.perDay}</span>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                {ag(car.agencyId||car.agency_id)&&<div style={{display:"flex",alignItems:"center",gap:6}}><AgencyLogo agency={ag(car.agencyId||car.agency_id)} size={24}/><span style={{fontSize:11,color:"rgba(255,255,255,.42)"}}>{lang==="ar"?ag(car.agencyId||car.agency_id)?.ar:ag(car.agencyId||car.agency_id)?.fr}</span></div>}
                <Stars r={car.rating||0}/>
              </div>
            </div>
          </div>
        ))}
        {filteredCars.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"52px 0",color:"rgba(255,255,255,.28)"}}>
          <div style={{fontSize:40,marginBottom:10}}>🔍</div>
          <div style={{fontSize:14}}>{lang==="ar"?"لا توجد سيارات":"Aucun résultat"}</div>
        </div>}
      </div>
    </section>

    {/* WEDDING */}
    <section id="wed" style={{padding:"56px 5%",background:"linear-gradient(180deg,#09091A,#0E041A)"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(236,72,153,.1)",border:"1px solid rgba(236,72,153,.25)",color:"#F9A8D4",padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:700,marginBottom:12}}><Ic.Rings/>{t.filters.wedding}</div>
        <h2 style={{fontSize:26,fontWeight:800,color:"#fff",marginBottom:9}}>{t.wTitle}</h2>
        <p style={{color:"rgba(255,255,255,.38)",fontSize:14,maxWidth:480,margin:"0 auto"}}>{t.wDesc}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:20}}>
        {weddingCars.map((car: any,idx: number)=>(
          <div key={car.id} className="hov" onClick={()=>openCar(car)} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(236,72,153,.14)",borderRadius:18,overflow:"hidden",cursor:"pointer",animation:`fadeUp .5s ease ${idx*.1}s both`}}>
            <div style={{position:"relative",height:198,overflow:"hidden"}}>
              <img className="iz" src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:10,left:10,background:"rgba(236,72,153,.18)",border:"1px solid rgba(236,72,153,.4)",color:"#F9A8D4",padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:4}}><Ic.Rings/>{t.wBadge}</div>
              <div style={{position:"absolute",bottom:10,left:12,right:12}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:3}}>{car.name}</div>
                <Stars r={car.rating}/>
              </div>
            </div>
            <div style={{padding:"12px 15px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.32)",marginBottom:2}}>{t.wPerDay}</div>
                <span style={{fontSize:19,fontWeight:800,color:"#F9A8D4"}}>{(car.price||0).toLocaleString()}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,.32)"}}> {t.cur}</span>
              </div>
              <BtnGlow style={{background:"linear-gradient(135deg,#9D174D,#EC4899)",border:"none",color:"#fff",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}}>{t.book}</BtnGlow>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section style={{padding:"64px 5%",background:"#06060F"}}>
      <h2 style={{textAlign:"center",fontSize:26,fontWeight:800,marginBottom:44,color:"#fff"}}>{t.howTitle}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:20,maxWidth:800,margin:"0 auto"}}>
        {[{n:"01",i:<Ic.Map/>,t:t.s1t,d:t.s1d,col:"#7C3AED"},{n:"02",i:<Ic.Cal/>,t:t.s2t,d:t.s2d,col:"#2563EB"},{n:"03",i:<Ic.Car/>,t:t.s3t,d:t.s3d,col:"#059669"}].map((s: any,i: number)=>(
          <div key={i} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:24,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:12,right:14,fontSize:40,fontWeight:900,color:"rgba(255,255,255,.04)",lineHeight:1}}>{s.n}</div>
            <div style={{width:46,height:46,borderRadius:12,background:`${s.col}22`,border:`1px solid ${s.col}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:s.col}}>{s.i}</div>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:7}}>{s.t}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.38)",lineHeight:1.7}}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* AGENCIES */}
    <section id="ags" style={{padding:"52px 5%",background:"#09091A"}}>
      <h2 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:24}}>{t.agTitle}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16}}>
        {agencies.map((a: any,i: number)=>(
          <div key={a.id} className="hov" style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:18,animation:`fadeUp .5s ease ${i*.07}s both`}}>
            <div style={{display:"flex",gap:13,alignItems:"center",marginBottom:14}}>
              <AgencyLogo agency={a} size={52} style={{border:"2px solid rgba(124,58,237,.35)"}}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>{lang==="ar"?a.ar:a.fr}</span>
                  {a.verified&&<span style={{color:"#34D399",display:"flex"}}><Ic.Shield/></span>}
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.38)",display:"flex",alignItems:"center",gap:3}}><Ic.Pin/>{lang==="ar"?a.city_ar||a.city?.ar:a.city_fr||a.city?.fr}</div>
                <Stars r={a.rating}/>
              </div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <BtnGlow onClick={()=>openAgency(a)} style={{flex:1,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px",borderRadius:8,fontSize:12,fontWeight:700}}>{t.viewAgency}</BtnGlow>
              <button onClick={()=>openMsgs(a.id)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",padding:"8px 12px",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                <Ic.Msg/>{lang==="ar"?"راسل":lang==="fr"?"Message":"Msg"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section style={{margin:"0 5% 52px",borderRadius:20,background:"linear-gradient(135deg,rgba(124,58,237,.16),rgba(99,102,241,.16))",border:"1px solid rgba(124,58,237,.28)",padding:"48px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div className="glow" style={{width:220,height:220,background:"#5B21B6",opacity:.16,top:-60,left:"42%"}}/>
      <h2 style={{fontSize:26,fontWeight:800,color:"#fff",marginBottom:9}}>{t.ctaT}</h2>
      <p style={{color:"rgba(255,255,255,.45)",fontSize:14,marginBottom:24}}>{t.ctaD}</p>
      <BtnGlow onClick={openAddAgency} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 30px",borderRadius:11,fontSize:15,fontWeight:700}}>{t.listCar} →</BtnGlow>
    </section>
  </>);
}
