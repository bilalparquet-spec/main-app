import { useState, useRef, useEffect } from "react";
import CSS from "./styles/globalCSS.js";
import { CARS, TYPES, INIT_REVIEWS } from "./constants/data.js";
import { Onboarding } from "./components/Onboarding.jsx";
import { IconSearch, IconHeart, IconRoad, IconBubble, IconMore } from "./components/ui/NavIcons.jsx";
import {
  IconSearchSm, IconFilter, IconClose, IconCar,
  IconBuilding, IconPin, IconStar
} from "./components/ui/AppIcons.jsx";
import { FilterPanel } from "./components/FilterPanel.jsx";
import { SkeletonCard } from "./components/ui/SkeletonCard.jsx";
import { Stars } from "./components/ui/Stars.jsx";
import { Carousel } from "./components/Carousel.jsx";
import { CarDetail } from "./components/CarDetail.jsx";
import { AgencyDetail } from "./components/AgencyDetail.jsx";
import { FavoritesPage } from "./components/pages/FavoritesPage.jsx";
import { TripsPage }     from "./components/pages/TripsPage.jsx";
import { MessagesPage }  from "./components/pages/MessagesPage.jsx";
import { ProfilePage }   from "./components/pages/ProfilePage.jsx";
import { AgenciesSection } from "./components/sections/AgenciesSection.jsx";
import { MonthCarsSection } from "./components/sections/MonthCarsSection.jsx";
import { WeddingSection } from "./components/sections/WeddingSection.jsx";
import { LuxurySection } from "./components/sections/LuxurySection.jsx";
import { GuestAuthSheet } from "./components/GuestAuthSheet.jsx";
import { LoginPage }      from "./components/pages/LoginPage.jsx";
import { RegisterPage }   from "./components/pages/RegisterPage.jsx";
import { GoogleAuthPage } from "./components/pages/GoogleAuthPage.jsx";
import { AppleAuthPage }  from "./components/pages/AppleAuthPage.jsx";
import { LocationPermissionScreen } from "./components/LocationPermissionScreen.jsx";
import { AgencyRegisterPage } from "./components/pages/AgencyRegisterPage.jsx";
import { useLocation } from "./hooks/useLocation.js";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [locationDone, setLocationDone] = useState(false);   // location step done
  const { status: locStatus, wilaya: detectedWilaya, requestLocation } = useLocation();
  const [userWilaya, setUserWilaya] = useState(null);        // null = show all
  const [page, setPage]           = useState("home");
  const [isLoggedIn]              = useState(false);   // guest mode
  const [authSheet, setAuthSheet] = useState(false);   // slide-up sheet
  const [authPage, setAuthPage]   = useState(null);    // "login" | "register" | null
  const [agencyRegister, setAgencyRegister] = useState(false);
  const [selCar, setSelCar]       = useState(null);
  const [selAgency, setSelAgency] = useState(null);
  const [fType, setFType]         = useState("all");
  const [searchText, setSearchText] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [skelLoading, setSkelLoading] = useState(false);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [advF, setAdvF] = useState({fuel:"الكل",trans:"الكل",verified:false,minP:"",maxP:""});
  const [liked, setLiked]     = useState(new Set());
  const [sort, setSort]       = useState("pop");
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const searchRef = useRef();

  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=CSS;
    document.head.appendChild(el);
    return()=>document.head.removeChild(el);
  },[]);

  // Auto-detect when location is granted
  useEffect(() => {
    if (locStatus === "granted" && detectedWilaya) {
      setUserWilaya(detectedWilaya);
      setLocationDone(true);
    } else if (locStatus === "denied") {
      setLocationDone(true); // show all on deny
    }
  }, [locStatus, detectedWilaya]);

  const openCar = car => {
    setSkelLoading(true);
    setTimeout(()=>{ setSkelLoading(false); setSelCar(car); setPage("car"); window.scrollTo(0,0); },480);
  };
  const openAgency = ag => { setSelAgency(ag); setPage("agency"); window.scrollTo(0,0); };
  const toggleLike = id => setLiked(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });

  const filtered = CARS
    .filter(c=>fType==="all"||c.type===fType)
    .filter(c=>{ if(!searchText) return true; const q=searchText.toLowerCase(); return c.name.toLowerCase().includes(q)||c.badge.includes(searchText)||c.wilaya.includes(searchText); })
    .filter(c=>advF.fuel==="الكل"||c.fuel===advF.fuel)
    .filter(c=>advF.trans==="الكل"||c.trans===advF.trans)
    .filter(c=>!advF.verified||c.verified)
    .filter(c=>!advF.minP||c.price>=+advF.minP)
    .filter(c=>!advF.maxP||c.price<=+advF.maxP)
    .sort((a,b)=>sort==="pop"?b.trips-a.trips:sort==="new"?b.year-a.year:a.price-b.price);

  const suggs = searchText ? CARS.filter(c=>{ const q=searchText.toLowerCase(); return c.name.toLowerCase().includes(q)||c.wilaya.includes(searchText); }).slice(0,5) : [];
  const nActive = [advF.fuel!=="الكل",advF.trans!=="الكل",advF.verified,advF.minP,advF.maxP].filter(Boolean).length;

  if (!onboarded) return <Onboarding onDone={()=>setOnboarded(true)}/>;

  // Location permission screen — shown after onboarding, before home
  if (!locationDone) {
    return (
      <LocationPermissionScreen
        status={locStatus}
        onGranted={() => requestLocation()}
        onManualSelect={(w) => { setUserWilaya(w); setLocationDone(true); }}
        onSkip={() => { setUserWilaya(null); setLocationDone(true); }}
      />
    );
  }

  if (authPage === "login")    return <LoginPage    onBack={()=>setAuthPage(null)} onGoRegister={()=>setAuthPage("register")} onGoGoogle={()=>setAuthPage("google")} onGoApple={()=>setAuthPage("apple")}/>;
  if (authPage === "register") return <RegisterPage onBack={()=>setAuthPage(null)} onGoLogin={()=>setAuthPage("login")} onGoGoogle={()=>setAuthPage("google")} onGoApple={()=>setAuthPage("apple")}/>;
  if (authPage === "google")   return <GoogleAuthPage onBack={()=>setAuthPage("login")} onSuccess={()=>setAuthPage(null)}/>;
  if (authPage === "apple")    return <AppleAuthPage  onBack={()=>setAuthPage("login")} onSuccess={()=>setAuthPage(null)}/>;
  if (agencyRegister)          return <AgencyRegisterPage onBack={()=>setAgencyRegister(false)}/>;

  return (
    <div style={{minHeight:"100vh",background:"#07080F",color:"#F1F5F9",overscrollBehavior:"contain"}}>
      {/* Skeleton overlay */}
      {skelLoading&&(
        <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(7,8,15,.92)",backdropFilter:"blur(12px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"var(--grid-cols, repeat(auto-fill,minmax(min(260px,44vw),1fr)))",gap:"clamp(10px,2.5vw,16px)",width:"min(var(--app-max-width, 900px),92vw)",maxHeight:"65vh",overflow:"hidden"}}>
            {[0,1,2,3,4,5].map(i=><SkeletonCard key={i}/>)}
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.28)",animation:"fadeUp 1.4s infinite"}}>جاري التحميل...</div>
        </div>
      )}
      {filterOpen&&<FilterPanel advF={advF} setAdvF={setAdvF} onClose={()=>setFilterOpen(false)}/>}
      {authSheet && <GuestAuthSheet onClose={()=>setAuthSheet(false)} onLogin={()=>{setAuthSheet(false);setAuthPage("login");}} onRegister={()=>{setAuthSheet(false);setAuthPage("register");}}/>}

      {/* Nav */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(7,8,15,.92)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"0 clamp(12px,3vw,24px)",height:"var(--nav-height, 58px)",display:"flex",alignItems:"center",gap:"clamp(8px,2vw,16px)"}}>
        <div onClick={()=>{setPage("home");setSelCar(null);setSelAgency(null);}} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",flexShrink:0}}>
          <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#6D28D9,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(109,40,217,.4)"}}>
            <IconCar size={19} color="#fff"/>
          </div>
          <span style={{fontWeight:900,fontSize:16,background:"linear-gradient(90deg,#A78BFA,#818CF8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>درايف RENT</span>
        </div>
        <div style={{flex:1}}/>
        <button onClick={()=>setAgencyRegister(true)} style={{
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:4,
          background:"rgba(255,255,255,.05)",
          border:"1.5px solid rgba(255,255,255,.1)",
          borderRadius:14, padding:"8px clamp(10px,2.5vw,14px)",
          cursor:"pointer", fontFamily:"inherit",
          flexShrink:0,
          transition:"all .22s",
          minWidth:"clamp(54px,14vw,70px)",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(109,40,217,.18)";e.currentTarget.style.borderColor="rgba(109,40,217,.5)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";}}>
          {/* Square icon */}
          <div style={{
            width:"clamp(26px,6.5vw,32px)", height:"clamp(26px,6.5vw,32px)",
            borderRadius:8,
            background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 12px rgba(109,40,217,.4)",
          }}>
            <svg width="clamp(13px,3.5vw,16px)" height="clamp(13px,3.5vw,16px)" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="3" width="15" height="13" rx="2" stroke="#fff" strokeWidth="2"/>
              <path d="M16 8h4l3 3v5h-7V8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="5.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
              <circle cx="18.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
            </svg>
          </div>
          <span style={{
            fontSize:"clamp(8px,2vw,10px)", fontWeight:800, color:"rgba(255,255,255,.55)",
            whiteSpace:"nowrap", lineHeight:1.2, textAlign:"center",
          }}>أضف<br/>وكالتك</span>
        </button>
      </nav>

      <div style={{maxWidth:"var(--app-max-width, 900px)",margin:"0 auto",padding:"clamp(14px,3vw,24px) var(--app-padding, 14px)"}}>
        {page==="car"&&selCar
          ? <CarDetail car={selCar} onBack={()=>{setSelCar(null);setPage("home");}} liked={liked.has(selCar.id)} onLike={()=>toggleLike(selCar.id)} allReviews={reviews} addReview={r=>setReviews(p=>[r,...p])}/>
          : page==="agency"&&selAgency
          ? <AgencyDetail agency={selAgency} onBack={()=>{setSelAgency(null);setPage("home");}} onOpenCar={openCar} liked={liked} onLike={toggleLike}/>
          : page==="favorites"
          ? <FavoritesPage liked={liked} onLike={toggleLike} onOpenCar={openCar}/>
          : page==="trips"
          ? <TripsPage/>
          : page==="messages"
          ? <MessagesPage/>
          : page==="profile"
          ? <ProfilePage/>
          : <>
            {/* Hero */}
            <div style={{textAlign:"center",padding:"var(--hero-padding, 22px 10px 18px)",animation:"fadeUp .5s ease"}}>
              {/* Location badge */}
              {userWilaya ? (
                <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:9,padding:"4px 12px 4px 10px",borderRadius:20,background:"rgba(52,168,83,.12)",border:"1px solid rgba(52,168,83,.3)",color:"#34D399",fontSize:11,fontWeight:700,cursor:"pointer"}}
                  onClick={()=>{ setUserWilaya(null); setLocationDone(false); }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="rgba(52,168,83,.3)" stroke="#34D399" strokeWidth="2"/><circle cx="12" cy="10" r="3" fill="#34D399"/></svg>
                  {userWilaya}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
              ) : (
                <div style={{display:"inline-block",marginBottom:9,padding:"3px 13px",borderRadius:20,background:"rgba(109,40,217,.14)",border:"1px solid rgba(109,40,217,.26)",color:"#A78BFA",fontSize:11,fontWeight:700}}>أكثر من +1000 سيارة تنتظركم</div>
              )}
              <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:900,lineHeight:1.2,background:"linear-gradient(135deg,#F1F5F9 40%,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:20,letterSpacing:"-1px"}}>
                {userWilaya ? `سيارات في ${userWilaya}` : "أجر سيارتك المثالية بكل سهولة"}
              </h1>

              {/* Search */}
              <div style={{maxWidth:"clamp(300px,90vw,520px)",margin:"0 auto",position:"relative"}}>
                <div style={{display:"flex",gap:9}}>
                  <div style={{flex:1,position:"relative"}}>
                    <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,.06)",border:`1.5px solid ${searchFocus?"rgba(124,58,237,.65)":"rgba(255,255,255,.1)"}`,borderRadius:13,transition:"border-color .22s,box-shadow .22s",boxShadow:searchFocus?"0 0 0 3px rgba(124,58,237,.15)":"none"}}>
                      <span style={{padding:"0 11px",color:searchFocus?"#A78BFA":"rgba(255,255,255,.28)",flexShrink:0,display:"flex",alignItems:"center"}}>
                        <IconSearchSm size={15} color={searchFocus?"#A78BFA":"rgba(255,255,255,.28)"}/>
                      </span>
                      <input ref={searchRef} value={searchText} onChange={e=>setSearchText(e.target.value)}
                        onFocus={()=>setSearchFocus(true)} onBlur={()=>setTimeout(()=>setSearchFocus(false),200)}
                        placeholder="ابحث: سيارة، ولاية، نوع..."
                        style={{flex:1,background:"transparent",border:"none",color:"#fff",padding:"13px 6px",fontSize:14,fontFamily:"inherit",outline:"none",minWidth:0}}/>
                      {searchText&&(
                        <button onClick={()=>setSearchText("")} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",padding:"0 11px",display:"flex",alignItems:"center",minHeight:44}}>
                          <IconClose size={16} color="rgba(255,255,255,.35)"/>
                        </button>
                      )}
                    </div>
                    {searchFocus&&suggs.length>0&&(
                      <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,zIndex:500,background:"#0C0C1E",border:"1px solid rgba(124,58,237,.28)",borderRadius:13,overflow:"hidden",boxShadow:"0 20px 50px rgba(0,0,0,.6)",animation:"fadeUp .18s ease"}}>
                        {suggs.map((c,i)=>(
                          <div key={c.id} className="sug" onMouseDown={()=>openCar(c)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 13px",cursor:"pointer",borderBottom:i<suggs.length-1?"1px solid rgba(255,255,255,.05)":"none"}}>
                            <img src={c.img} alt="" style={{width:44,height:33,objectFit:"cover",borderRadius:7,flexShrink:0}}/>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontWeight:700,fontSize:13,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{c.wilaya} · {c.price.toLocaleString()} دج/يوم</div>
                            </div>
                            <Stars r={c.rating} size={10}/>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={()=>setFilterOpen(true)} style={{display:"flex",alignItems:"center",gap:6,background:nActive>0?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:`1.5px solid ${nActive>0?"transparent":"rgba(255,255,255,.1)"}`,color:nActive>0?"#fff":"rgba(255,255,255,.5)",padding:"0 14px",borderRadius:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,flexShrink:0,transition:"all .22s",minHeight:46,boxShadow:nActive>0?"0 4px 16px rgba(124,58,237,.35)":"none"}}>
                    <IconFilter size={14} color={nActive>0?"#fff":"rgba(255,255,255,.5)"}/>
                    فلتر {nActive>0&&`(${nActive})`}
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Sections */}
            <AgenciesSection delay={0} onOpen={openAgency} userWilaya={userWilaya}/>
            <MonthCarsSection delay={.05} onOpen={openCar} userWilaya={userWilaya}/>
            <WeddingSection delay={.1} onOpen={openCar} userWilaya={userWilaya}/>
            <LuxurySection delay={.15} onOpen={openCar} userWilaya={userWilaya}/>

          </>
        }
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,8,15,.96)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-around",padding:"10px 0 max(10px,env(safe-area-inset-bottom))",zIndex:99}}>
        {[
          { label:"استكشف", Icon:IconSearch, tab:"home"      },
          { label:"المفضلة", Icon:IconHeart,  tab:"favorites" },
          { label:"رحلاتي",  Icon:IconRoad,   tab:"trips"     },
          { label:"رسائل",   Icon:IconBubble, tab:"messages"  },
          { label:"حسابي",   Icon:IconMore,   tab:"profile"   },
        ].map(({label,Icon,tab})=>{
          const active = page===tab || (tab==="home" && (page==="home"||page==="car"||page==="agency"));
          const isProtected = tab !== "home";
          return (
            <button key={label} onClick={()=>{
              if (isProtected && !isLoggedIn) {
                setAuthSheet(true);
                return;
              }
              if(tab==="home"){setPage("home");setSelCar(null);setSelAgency(null);}
              else setPage(tab);
              window.scrollTo(0,0);
            }} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:"4px clamp(6px,2vw,12px)",transition:"opacity .2s",flex:1,maxWidth:80}}>
              <Icon active={active}/>
              <span className="nav-label" style={{fontSize:"clamp(9px,2.5vw,11px)",fontWeight:active?700:500,color:active?"#A78BFA":"rgba(255,255,255,.32)",transition:"color .2s"}}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
