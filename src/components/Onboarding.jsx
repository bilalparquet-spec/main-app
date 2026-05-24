import { useState, useRef } from "react";
import { ONBOARDING } from "../constants/data.js";

export function Onboarding({onDone}) {
  const [cur, setCur]   = useState(0);
  const [anim, setAnim] = useState(true);
  const [dir, setDir]   = useState(1);
  const [leaving, setLeaving] = useState(false);
  const touchX = useRef(0);
  const touchY = useRef(0);

  const goTo = (next, d) => {
    if (next === ONBOARDING.length) { finish(); return; }
    setDir(d);
    setAnim(false);
    setTimeout(() => { setCur(next); setAnim(true); }, 260);
  };

  const finish = () => {
    setLeaving(true);
    setTimeout(onDone, 420);
  };

  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = e => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchY.current);
    if (dy > 40 || Math.abs(dx) < 50) return;
    if (dx < 0 && cur < ONBOARDING.length-1) goTo(cur+1, 1);
    else if (dx > 0 && cur > 0) goTo(cur-1, -1);
  };

  const sl = ONBOARDING[cur];

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position:"fixed", inset:0, zIndex:9999,
        background: sl.bg,
        transition: "background .5s ease, opacity .42s ease",
        opacity: leaving ? 0 : 1,
        display:"flex", flexDirection:"column",
        fontFamily:"'Cairo',sans-serif",
        overflow:"hidden",
      }}
    >
      {/* Glow orbs */}
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",
        background:`radial-gradient(circle,${sl.accent}44 0%,transparent 70%)`,
        top:"5%",left:"50%",transform:"translateX(-50%)",filter:"blur(50px)",
        transition:"background .5s ease",pointerEvents:"none"}} />
      <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",
        background:`radial-gradient(circle,${sl.accent}22 0%,transparent 70%)`,
        bottom:"30%",right:"5%",filter:"blur(35px)",animation:"float 4s ease-in-out infinite",
        pointerEvents:"none"}} />

      {/* Top bar: dots + skip */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"52px 22px 0",position:"relative",zIndex:5}}>
        <div style={{display:"flex",gap:7}}>
          {ONBOARDING.map((_,i) => (
            <div key={i} style={{
              height:4, borderRadius:4, cursor:"pointer",
              transition:"all .38s cubic-bezier(.4,0,.2,1)",
              width: i===cur ? 26 : 7,
              background: i===cur ? sl.light : "rgba(255,255,255,.22)",
              boxShadow: i===cur ? `0 0 8px ${sl.light}99` : "none",
            }} onClick={()=>goTo(i, i>cur?1:-1)} />
          ))}
        </div>
        <button onClick={finish} style={{
          background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.14)",
          color:"rgba(255,255,255,.65)", padding:"6px 16px", borderRadius:20,
          cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit",
          backdropFilter:"blur(8px)",
        }}>تخطي</button>
      </div>

      {/* Illustration */}
      <div style={{flex:"0 0 42%", display:"flex", alignItems:"center", justifyContent:"center", position:"relative"}}>
        {[180,270,370].map((r,i) => (
          <div key={i} style={{
            position:"absolute", width:r, height:r, borderRadius:"50%",
            border:`1px solid ${sl.accent}${i===0?"55":i===1?"33":"1A"}`,
            animation:`glow ${2.5+i*.4}s ease-in-out infinite`,
            animationDelay:`${i*.25}s`,
            transition:"border-color .5s ease",
          }} />
        ))}
        <div style={{
          width:110, height:110, borderRadius:28,
          background:`linear-gradient(135deg,${sl.accent},${sl.light}88)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:`0 0 50px ${sl.accent}66, 0 20px 60px rgba(0,0,0,.5)`,
          animation:"float 3.5s ease-in-out infinite",
          position:"relative",
          transition:"background .5s ease, box-shadow .5s ease",
        }}>
          <div style={{position:"absolute",inset:0,borderRadius:28,background:"linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 60%)"}} />
          {cur===0 && <svg width="62" height="62" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="42" width="80" height="40" rx="14" stroke="white" strokeWidth="7" fill="none"/>
            <rect x="26" y="20" width="48" height="26" rx="11" stroke="white" strokeWidth="7" fill="none"/>
            <circle cx="28" cy="82" r="10" stroke="white" strokeWidth="7" fill="none"/>
            <circle cx="72" cy="82" r="10" stroke="white" strokeWidth="7" fill="none"/>
          </svg>}
          {cur===1 && <svg width="62" height="62" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="36" stroke="white" strokeWidth="6" fill="none"/>
            <circle cx="50" cy="50" r="4" fill="white"/>
            <line x1="50" y1="14" x2="50" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <line x1="50" y1="50" x2="72" y2="62" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="30" cy="35" r="5" fill="white" opacity=".7"/>
            <circle cx="68" cy="38" r="5" fill="white" opacity=".7"/>
            <circle cx="40" cy="70" r="5" fill="white" opacity=".7"/>
          </svg>}
          {cur===2 && <svg width="62" height="62" viewBox="0 0 100 100" fill="none">
            <path d="M50 8 L85 22 L85 58 C85 76 50 92 50 92 C50 92 15 76 15 58 L15 22 Z" stroke="white" strokeWidth="6" fill="none"/>
            <path d="M34 50 L44 62 L66 38" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>}
          {cur===3 && <svg width="62" height="62" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="36" stroke="white" strokeWidth="6" fill="none"/>
            <path d="M38 50 L48 62 L72 36" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="50" cy="22" r="5" fill="white"/>
            <line x1="50" y1="27" x2="50" y2="38" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          </svg>}
        </div>

        {/* Floating tags */}
        {cur===0 && [
          {t:"💎 فاخرة", x:-110, y:-20},
          {t:"⚡ كهربائية", x:60, y:-35},
          {t:"💍 زفاف", x:65, y:35},
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute",
            top:`calc(50% + ${b.y}px)`, left:`calc(50% + ${b.x}px)`,
            transform:"translate(-50%,-50%)",
            background:"rgba(255,255,255,.1)", border:`1px solid ${sl.light}44`,
            backdropFilter:"blur(8px)", borderRadius:20, padding:"5px 12px",
            fontSize:11, fontWeight:700, color:"rgba(255,255,255,.88)", whiteSpace:"nowrap",
            animation:`float ${3+i*.5}s ease-in-out infinite`, animationDelay:`${i*.2}s`,
          }}>{b.t}</div>
        ))}
        {cur===1 && [
          {t:"📍 الجزائر", x:-105, y:-30},
          {t:"📍 وهران", x:70, y:-20},
          {t:"📍 قسنطينة", x:55, y:40},
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute",
            top:`calc(50% + ${b.y}px)`, left:`calc(50% + ${b.x}px)`,
            transform:"translate(-50%,-50%)",
            background:"rgba(255,255,255,.1)", border:`1px solid ${sl.light}44`,
            backdropFilter:"blur(8px)", borderRadius:20, padding:"5px 12px",
            fontSize:11, fontWeight:700, color:"rgba(255,255,255,.88)", whiteSpace:"nowrap",
            animation:`float ${3+i*.5}s ease-in-out infinite`, animationDelay:`${i*.2}s`,
          }}>{b.t}</div>
        ))}
      </div>

      {/* Content card */}
      <div style={{
        flex:1,
        background:"rgba(7,8,15,.9)",
        backdropFilter:"blur(24px)",
        borderRadius:"26px 26px 0 0",
        border:"1px solid rgba(255,255,255,.08)",
        borderBottom:"none",
        padding:"26px 24px 20px",
        display:"flex", flexDirection:"column",
        overflow:"hidden",
      }}>
        <div style={{
          flex:1, display:"flex", flexDirection:"column",
          opacity: anim ? 1 : 0,
          transform: anim ? "translateX(0)" : `translateX(${dir > 0 ? "-28px" : "28px"})`,
          transition:"opacity .26s ease, transform .26s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:5,
            background:`${sl.accent}22`, border:`1px solid ${sl.accent}55`,
            color:sl.light, padding:"4px 12px", borderRadius:20,
            fontSize:11, fontWeight:800, marginBottom:14, alignSelf:"flex-start",
            transition:"background .5s,border .5s,color .5s",
          }}>{sl.badge}</div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:22,fontWeight:800,color:"rgba(255,255,255,.75)",lineHeight:1.2}}>{sl.title1}</div>
            <div style={{
              fontSize:38, fontWeight:900, lineHeight:1.1, letterSpacing:"-1.5px",
              background:`linear-gradient(90deg,${sl.light},#fff)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>{sl.title2}</div>
          </div>

          <div style={{fontSize:13,color:"rgba(255,255,255,.48)",lineHeight:1.9,marginBottom:18}}>
            <div>{sl.sub1}</div>
            <div>{sl.sub2}</div>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:22}}>
            {sl.stats.map((s,i) => (
              <div key={i} style={{
                flex:1, background:"rgba(255,255,255,.05)",
                border:`1px solid ${sl.accent}33`,
                borderRadius:14, padding:"11px 8px", textAlign:"center",
                transition:"border-color .5s",
              }}>
                <div style={{fontSize:17,fontWeight:900,color:sl.light,letterSpacing:"-0.5px",transition:"color .5s"}}>{s.n}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.38)",marginTop:2,fontWeight:600}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:10,marginTop:"auto"}}>
            {cur > 0 && (
              <button onClick={()=>goTo(cur-1,-1)} className="btn" style={{
                width:48, height:50, borderRadius:14,
                border:"1px solid rgba(255,255,255,.12)",
                background:"rgba(255,255,255,.06)",
                color:"rgba(255,255,255,.7)", cursor:"pointer",
                fontSize:20, display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, fontFamily:"inherit",
              }}>‹</button>
            )}
            <button onClick={()=>goTo(cur+1,1)} className="btn" style={{
              flex:1, height:50, borderRadius:14, border:"none",
              background:`linear-gradient(135deg,${sl.accent},${sl.light}99)`,
              color:"#fff", fontWeight:900, fontSize:15,
              cursor:"pointer", fontFamily:"inherit",
              boxShadow:`0 6px 22px ${sl.accent}55`,
              transition:"background .5s, box-shadow .5s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <span>{sl.cta}</span>
              {cur < ONBOARDING.length-1 && <span style={{fontSize:19}}>›</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div style={{background:"rgba(7,8,15,.9)",paddingBottom:10,paddingTop:6,display:"flex",justifyContent:"center"}}>
        <div style={{width:36,height:4,borderRadius:4,background:"rgba(255,255,255,.18)"}} />
      </div>
    </div>
  );
}
