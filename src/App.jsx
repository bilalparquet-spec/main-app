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

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [page, setPage]           = useState("home");
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

  return (
    <div style={{minHeight:"100vh",background:"#07080F",color:"#F1F5F9",overscrollBehavior:"contain"}}>
      {/* Skeleton overlay */}
      {skelLoading&&(
        <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(7,8,15,.92)",backdropFilter:"blur(12px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,44vw),1fr))",gap:13,width:"min(820px,92vw)",maxHeight:"65vh",overflow:"hidden"}}>
            {[0,1,2,3,4,5].map(i=><SkeletonCard key={i}/>)}
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.28)",animation:"fadeUp 1.4s infinite"}}>جاري التحميل...</div>
        </div>
      )}
      {filterOpen&&<FilterPanel advF={advF} setAdvF={setAdvF} onClose={()=>setFilterOpen(false)}/>}

      {/* Nav */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(7,8,15,.92)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"0 16px",height:58,display:"flex",alignItems:"center",gap:12}}>
        <div onClick={()=>{setPage("home");setSelCar(null);setSelAgency(null);}} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",flexShrink:0}}>
          <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#6D28D9,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(109,40,217,.4)"}}>
            <IconCar size={19} color="#fff"/>
          </div>
          <span style={{fontWeight:900,fontSize:16,background:"linear-gradient(90deg,#A78BFA,#818CF8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>درايف RENT</span>
        </div>
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:3,background:"rgba(255,255,255,.05)",borderRadius:9,padding:3}}>
          {[["pop","الأكثر"],["new","الأحدث"],["cheap","الأرخص"]].map(([k,l])=>(
            <button key={k} onClick={()=>setSort(k)} style={{padding:"5px 10px",borderRadius:6,border:"none",fontFamily:"inherit",fontWeight:700,fontSize:11,cursor:"pointer",transition:"all .2s",background:sort===k?"linear-gradient(135deg,#6D28D9,#4F46E5)":"transparent",color:sort===k?"#fff":"rgba(255,255,255,.38)"}}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"18px 14px"}}>
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
            <div style={{textAlign:"center",padding:"22px 10px 18px",animation:"fadeUp .5s ease"}}>
              <div style={{display:"inline-block",marginBottom:9,padding:"3px 13px",borderRadius:20,background:"rgba(109,40,217,.14)",border:"1px solid rgba(109,40,217,.26)",color:"#A78BFA",fontSize:11,fontWeight:700}}>أكثر من +1000 سيارة تنتظركم</div>
              <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:900,lineHeight:1.2,background:"linear-gradient(135deg,#F1F5F9 40%,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:20,letterSpacing:"-1px"}}>أجر سيارتك المثالية بكل سهولة</h1>

              {/* Search */}
              <div style={{maxWidth:520,margin:"0 auto",position:"relative"}}>
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
            <AgenciesSection delay={0} onOpen={openAgency}/>
            <MonthCarsSection delay={.05} onOpen={openCar}/>
            <WeddingSection delay={.1} onOpen={openCar}/>
            <LuxurySection delay={.15} onOpen={openCar}/>

          </>
        }
      </div>

      {/* Bottom nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,8,15,.96)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-around",padding:"10px 0 max(10px,env(safe-area-inset-bottom))",zIndex:99}}>
        {[
          { label:"استكشف", Icon:IconSearch, tab:"home"      },
          { label:"المفضلة", Icon:IconHeart,  tab:"favorites" },
          { label:"رحلاتي",  Icon:IconRoad,   tab:"trips"     },
          { label:"رسائل",   Icon:IconBubble, tab:"messages"  },
          { label:"حسابي",   Icon:IconMore,   tab:"profile"   },
        ].map(({label,Icon,tab})=>{
          const active = page===tab || (tab==="home" && (page==="home"||page==="car"||page==="agency"));
          return (
            <button key={label} onClick={()=>{
              if(tab==="home"){setPage("home");setSelCar(null);setSelAgency(null);}
              else setPage(tab);
              window.scrollTo(0,0);
            }} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:"4px 8px",transition:"opacity .2s"}}>
              <Icon active={active}/>
              <span style={{fontSize:10,fontWeight:active?700:500,color:active?"#A78BFA":"rgba(255,255,255,.32)",transition:"color .2s"}}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
