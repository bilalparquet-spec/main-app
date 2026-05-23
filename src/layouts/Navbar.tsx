import React from "react";
import { Ic } from "../components/Icons";

interface NavbarProps {
  lang: string;
  setLang: (l: string) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  page: string;
  t: any;
  currentUser: any;
  unreadMsgs: number;
  mMenu: boolean;
  setMMenu: (v: boolean) => void;
  NAV: any[];
  goHome: () => void;
  setAuthModal: (v: boolean) => void;
  setProfileOpen: (v: boolean) => void;
  openAddCar: () => void;
}

export default function Navbar({
  lang, setLang, darkMode, setDarkMode, page, t, currentUser,
  unreadMsgs, mMenu, setMMenu, NAV, goHome, setAuthModal, setProfileOpen, openAddCar,
}: NavbarProps) {
  const dm = darkMode;

  return (
    <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(6,6,15,.9)",backdropFilter:"blur(22px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
      {/* Logo */}
      <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={goHome}>
        <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ic.Car/>
        </div>
        <div>
          <div style={{fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1}}>درايف RENT</div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="dko" style={{display:"flex",gap:4}}>
        {NAV.map((n: any) => (
          <button key={n.k} className="navbtn" onClick={n.fn}
            style={{display:"flex",alignItems:"center",gap:6,background:page===n.k?"rgba(124,58,237,.14)":"transparent",border:`1px solid ${page===n.k?"rgba(124,58,237,.4)":"transparent"}`,color:page===n.k?"#C084FC":"rgba(255,255,255,.5)",padding:"7px 13px",borderRadius:9,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>
            <span style={{opacity:.8}}>{n.icon}</span>{n.l}
            {n.k==="messages"&&unreadMsgs>0&&<span style={{width:16,height:16,borderRadius:"50%",background:"#EF4444",color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{unreadMsgs}</span>}
          </button>
        ))}
      </div>

      {/* Right controls */}
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        {/* Language */}
        <div style={{position:"relative"}} className="dko">
          <button onClick={()=>document.getElementById("langDd")?.classList.toggle("open")}
            style={{display:"flex",alignItems:"center",gap:6,background:dm?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",border:`1px solid ${dm?"rgba(255,255,255,.1)":"rgba(0,0,0,.1)"}`,color:dm?"rgba(255,255,255,.7)":"#444",padding:"7px 12px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
            <Ic.Globe/>{lang==="ar"?"ع · عربي":lang==="fr"?"FR · Français":"EN · English"}<Ic.ChevD/>
          </button>
          <div id="langDd" style={{position:"absolute",top:"110%",right:0,background:dm?"#12122A":"#fff",border:`1px solid ${dm?"rgba(124,58,237,.3)":"rgba(0,0,0,.12)"}`,borderRadius:12,minWidth:150,zIndex:300,overflow:"hidden",display:"none"}}
            onClick={()=>document.getElementById("langDd")?.classList.remove("open")}>
            {[{k:"ar",flag:"🇩🇿",label:"عربي"},{k:"fr",flag:"🇫🇷",label:"Français"},{k:"en",flag:"🇬🇧",label:"English"}].map(({k,flag,label})=>(
              <button key={k} onClick={()=>setLang(k)}
                style={{display:"flex",alignItems:"center",gap:9,width:"100%",background:lang===k?(dm?"rgba(124,58,237,.18)":"rgba(124,58,237,.1)"):"transparent",border:"none",color:lang===k?"#A855F7":dm?"rgba(255,255,255,.7)":"#333",padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:lang===k?700:500}}>
                {flag} {label}{lang===k&&<span style={{marginRight:"auto",color:"#7C3AED"}}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Dark mode */}
        <button onClick={()=>setDarkMode(!dm)} className="dko"
          style={{width:36,height:36,borderRadius:9,background:dm?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",border:`1px solid ${dm?"rgba(255,255,255,.1)":"rgba(0,0,0,.1)"}`,color:dm?"#F59E0B":"#6366F1",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {dm?<Ic.Sun/>:<Ic.Moon/>}
        </button>

        {/* Add Car */}
        {currentUser && (
          <button onClick={openAddCar} className="dko"
            style={{display:"flex",alignItems:"center",gap:6,background:"rgba(124,58,237,.14)",border:"1px solid rgba(124,58,237,.35)",color:"#C084FC",padding:"7px 12px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
            <Ic.Plus/>{lang==="ar"?"أضف سيارة":lang==="fr"?"Ajouter":"Add Car"}
          </button>
        )}

        {/* User */}
        {currentUser ? (
          <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.28)",borderRadius:9,padding:"5px 12px 5px 6px",cursor:"pointer"}}
            onClick={()=>setProfileOpen(true)} className="dko">
            <img src={currentUser.avatar} alt="" style={{width:28,height:28,borderRadius:"50%",border:"2px solid #7C3AED",objectFit:"cover"}}/>
            <span style={{fontSize:12,fontWeight:700,color:"#C084FC"}}>{currentUser.name?.split(" ")[0]}</span>
          </div>
        ) : (
          <button onClick={()=>setAuthModal(true)} className="dko"
            style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px 16px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:700}}>
            {lang==="ar"?"دخول":lang==="fr"?"Connexion":"Sign In"}
          </button>
        )}

        {/* Mobile menu */}
        <button onClick={()=>setMMenu(!mMenu)} className="mob-show"
          style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",width:38,height:38,borderRadius:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {mMenu?<Ic.X/>:<Ic.Menu/>}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mMenu && (
        <div style={{position:"fixed",top:64,left:0,right:0,background:"rgba(6,6,15,.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.08)",padding:"14px 5%",display:"flex",flexDirection:"column",gap:8,zIndex:199}}>
          {NAV.map((n: any) => (
            <button key={n.k} onClick={()=>{n.fn();setMMenu(false);}}
              style={{display:"flex",alignItems:"center",gap:9,background:page===n.k?"rgba(124,58,237,.15)":"transparent",border:`1px solid ${page===n.k?"rgba(124,58,237,.3)":"rgba(255,255,255,.07)"}`,color:page===n.k?"#C084FC":"rgba(255,255,255,.6)",padding:"10px 14px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600,textAlign:"right"}}>
              {n.icon}{n.l}
            </button>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",marginTop:6,paddingTop:10,display:"flex",gap:8}}>
            <button onClick={()=>{setDarkMode(!dm);setMMenu(false);}}
              style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:dm?"#F59E0B":"#6366F1",padding:"9px",borderRadius:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontSize:13,fontWeight:700}}>
              {dm?<><Ic.Sun/>{lang==="ar"?"نهاري":lang==="fr"?"Jour":"Light"}</>:<><Ic.Moon/>{lang==="ar"?"ليلي":lang==="fr"?"Nuit":"Dark"}</>}
            </button>
            {[{k:"ar",label:"عربي"},{k:"fr",label:"FR"},{k:"en",label:"EN"}].map(({k,label})=>(
              <button key={k} onClick={()=>{setLang(k);setMMenu(false);}}
                style={{flex:1,background:lang===k?"rgba(124,58,237,.2)":"rgba(255,255,255,.05)",border:`1px solid ${lang===k?"rgba(124,58,237,.45)":"rgba(255,255,255,.1)"}`,color:lang===k?"#C084FC":"rgba(255,255,255,.5)",padding:"9px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
                {label}
              </button>
            ))}
          </div>
          {!currentUser ? (
            <button onClick={()=>{setAuthModal(true);setMMenu(false);}}
              style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"11px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:700}}>
              {lang==="ar"?"تسجيل / دخول":lang==="fr"?"Connexion / Inscription":"Sign In / Register"}
            </button>
          ) : (
            <button onClick={()=>{setProfileOpen(true);setMMenu(false);}}
              style={{display:"flex",alignItems:"center",gap:10,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.28)",borderRadius:10,padding:"10px 14px",cursor:"pointer"}}>
              <img src={currentUser.avatar} alt="" style={{width:32,height:32,borderRadius:"50%",border:"2px solid #7C3AED",objectFit:"cover"}}/>
              <span style={{fontSize:13,fontWeight:700,color:"#C084FC"}}>{currentUser.name}</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
