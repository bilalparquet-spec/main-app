import { useState, useRef, useEffect, useCallback } from "react";
import { ALL_WILAYAS, TR, SEED_AGENCIES, SEED_CARS, FONT_STYLE, BRANDS } from "./data/static";
import { useCars, useAgencies, useReviews, useBookings } from "./hooks/useData";
import { useIsMobile, useIsTablet } from "./hooks/useResponsive";
import { usersService, agencyRequestsService, conversationsService, messagesService } from "./services/db";
import { Ic } from "./components/Icons";
import { Stars, Chip, BtnGlow, AgencyLogo } from "./components/UI";
import ReviewSection from "./components/ReviewSection";

// ── Initial data ──────────────────────────────────────────────────────────────
const INIT_CONVS = [
  { id:1, agencyId:1, msgs:[{from:"agency",text:"مرحباً! كيف يمكنني مساعدتك؟",time:"10:30"},{from:"user",text:"أريد حجز المرسيدس ليوم الجمعة",time:"10:31"},{from:"agency",text:"بكل سرور! هل تريد S-Class أم E-Class؟",time:"10:32"}] },
  { id:2, agencyId:6, msgs:[{from:"agency",text:"Bonjour! Comment puis-je vous aider pour votre mariage?",time:"14:00"}] },
];
const INIT_REVIEWS = [
  { id:1, targetType:"car", targetId:1, userId:"u1", name:"أحمد بن علي", phone:"0555123456", avatar:"https://i.pravatar.cc/80?img=33", rating:5, comment:"سيارة رائعة، نظيفة ومريحة جداً. الوكالة محترفة وخدمتهم ممتازة!", date:"2025-03-10" },
  { id:2, targetType:"car", targetId:1, userId:"u2", name:"Karim Meziani", phone:"0661987654", avatar:"https://i.pravatar.cc/80?img=52", rating:4, comment:"Très bonne voiture, propre et confortable. Je recommande vivement!", date:"2025-02-28" },
  { id:3, targetType:"car", targetId:3, userId:"u3", name:"سارة حمداني", phone:"0770456789", avatar:"https://i.pravatar.cc/80?img=47", rating:5, comment:"SUV مميز، مناسب للعائلة. سعر معقول مقارنة بالخدمة المقدمة.", date:"2025-04-01" },
  { id:4, targetType:"agency", targetId:1, userId:"u1", name:"أحمد بن علي", phone:"0555123456", avatar:"https://i.pravatar.cc/80?img=33", rating:5, comment:"وكالة محترفة وموثوقة، سيارات حديثة وأسعار منافسة. أنصح الجميع بها!", date:"2025-03-15" },
  { id:5, targetType:"agency", targetId:2, userId:"u4", name:"Sofiane Lahlou", phone:"0550321654", avatar:"https://i.pravatar.cc/80?img=60", rating:4, comment:"Agence sérieuse avec de belles voitures. Le personnel est très sympa.", date:"2025-03-20" },
  { id:6, targetType:"car", targetId:4, userId:"u5", name:"يوسف قاسم", phone:"0661234567", avatar:"https://i.pravatar.cc/80?img=15", rating:5, comment:"تجربة استثنائية مع التيسلا! شحن مجاني وقيادة ممتعة جداً.", date:"2025-04-05" },
];
const INIT_BOOKINGS = [
  { id:1, agencyId:1, carName:"Mercedes S-Class", clientName:"أحمد بن علي", clientPhone:"0555123456", from:"2025-06-10", to:"2025-06-13", days:3, total:45000, status:"pending",  time:"10:32" },
  { id:2, agencyId:1, carName:"Toyota RAV4",       clientName:"Karim Meziani", clientPhone:"0661987654", from:"2025-06-15", to:"2025-06-17", days:2, total:14000, status:"confirmed",time:"09:15" },
  { id:3, agencyId:2, carName:"BMW 5 Series",      clientName:"سارة حمداني", clientPhone:"0770456789", from:"2025-06-20", to:"2025-06-22", days:2, total:24000, status:"pending",  time:"14:00" },
];

// ── DEMO_USERS ────────────────────────────────────────────────────────────────
const DEMO_USERS = [
  {id:"demo_1",username:"ahmed_dz",password:"123456",name:"أحمد بن علي",phone:"0555123456",avatar:"https://i.pravatar.cc/80?img=11",provider:"manual",joinDate:"2025-11-20T10:00:00.000Z",lastLogin:"2026-04-01T08:30:00.000Z"},
  {id:"demo_2",username:"karim_oran",password:"123456",name:"كريم بوعلام",phone:"0661987654",avatar:"https://i.pravatar.cc/80?img=33",provider:"manual",joinDate:"2026-04-25T14:00:00.000Z",lastLogin:"2026-05-10T09:15:00.000Z"},
  {id:"admin",username:"admin",password:"admin123",name:"Admin",phone:"0500000000",avatar:"https://i.pravatar.cc/80?img=1",provider:"manual",role:"admin",joinDate:"2025-01-01T00:00:00.000Z",lastLogin:"2026-05-01T00:00:00.000Z"},
];

// ── Helper: get all users ─────────────────────────────────────────────────────
function getAllUsers() {
  try {
    const approved = JSON.parse(localStorage.getItem("driverent_approved_users") || "[]");
    const merged = [...DEMO_USERS];
    approved.forEach((u: any) => { if (!merged.find((d: any) => d.id === u.id)) merged.push(u); });
    return merged;
  } catch { return DEMO_USERS; }
}
function getPendingRequests() {
  try { return JSON.parse(localStorage.getItem("driverent_pending_requests") || "[]"); } catch { return []; }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]           = useState("ar");
  const [page, setPage]           = useState("home");
  const [selCar, setSelCar]       = useState<any>(null);
  const [selAgency, setSelAgency] = useState<any>(null);
  const [fType, setFType]         = useState("all");
  const [sort, setSort]           = useState("pop");
  const [wilaya, setWilaya]       = useState("");
  const [ddOpen, setDdOpen]       = useState(false);
  const [convs, setConvs]         = useState<any[]>(INIT_CONVS);
  const [activeC, setActiveC]     = useState<any>(null);
  const [msgIn, setMsgIn]         = useState("");
  const [mMenu, setMMenu]         = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authModal, setAuthModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode]   = useState(true);
  const [selBrand, setSelBrand]   = useState("الكل");
  const [addCarModal, setAddCarModal] = useState(false);
  const [unreadMsgs, setUnreadMsgs]   = useState(2);
  const [chatTyping, setChatTyping]   = useState(false);
  const [chatAttach, setChatAttach]   = useState<any>(null);
  const [chatAttachMenu, setChatAttachMenu] = useState(false);
  const [chatSearch, setChatSearch]   = useState("");
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatToasts, setChatToasts]   = useState<any[]>([]);
  const [splash, setSplash]       = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const chatFileRef  = useRef<any>(null);
  const chatImgRef   = useRef<any>(null);

  // ── Data from hooks (with Supabase sync) ─────────────────────────────────
  const { cars: dbCars, addCar } = useCars();
  const { agencies }             = useAgencies();
  const [reviews, setReviewsRaw] = useState(INIT_REVIEWS);
  const { bookings, setBookings, addBooking } = useBookings(INIT_BOOKINGS);
  const [userCars, setUserCars]  = useState<any[]>([]);

  // Merge db cars with userCars
  const allCarsPool = [...dbCars, ...userCars];

  // ── Font injection ────────────────────────────────────────────────────────
  useEffect(() => {
    const id = "qatar2022-font-style";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = FONT_STYLE;
      document.head.appendChild(el);
    }
  }, []);

  // ── Splash ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 3400);
    const t2 = setTimeout(() => setSplash(false), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const t   = TR[lang];
  const rtl = t.dir === "rtl";
  const dm  = darkMode;

  // ── Filters ───────────────────────────────────────────────────────────────
  const filteredCars = allCarsPool
    .filter(c => fType === "all" || (fType === "4x4" ? c.type === "4x4" : c.type === fType))
    .filter(c => !wilaya || c.wilaya === wilaya)
    .filter(c => selBrand === "الكل" || !c.brand || c.brand === selBrand || (c.name && c.name.toLowerCase().includes(selBrand.toLowerCase())))
    .sort((a, b) => sort === "pop" ? b.trips - a.trips : sort === "new" ? b.year - a.year : a.price - b.price);

  const weddingCars = allCarsPool.filter(c => c.wedding);
  const wilayaLabel = wilaya ? (lang === "fr" ? ALL_WILAYAS.find(w => w.c === wilaya)?.fr : ALL_WILAYAS.find(w => w.c === wilaya)?.ar) || "" : t.allWilayas;

  // ── Nav helpers ───────────────────────────────────────────────────────────
  const goHome     = () => { setPage("home"); window.scrollTo(0, 0); };
  const openBooking = (car: any, agency: any, days: number, fromDate: string, toDate: string) => {
    setBookingData({ car, agency, days, fromDate, toDate }); setPage("booking"); window.scrollTo(0, 0);
  };
  const openCar    = (car: any) => { setSelCar(car); setPage("car"); window.scrollTo(0, 0); };
  const openAddAgency = () => { setPage("addAgency"); window.scrollTo(0, 0); };
  const openAgency = (ag: any) => { setSelAgency(ag); setPage("agency"); window.scrollTo(0, 0); };
  const openMsgs   = (agId: any = null) => {
    setPage("messages");
    if (agId) {
      const ex = convs.find(c => c.agencyId === agId);
      if (ex) setActiveC(ex.id);
      else { const nw = { id: Date.now(), agencyId: agId, msgs: [] }; setConvs(p => [...p, nw]); setActiveC(nw.id); }
    }
    window.scrollTo(0, 0);
  };

  const ag = (id: number) => agencies.find((a: any) => a.id === id);

  // ── Messaging ─────────────────────────────────────────────────────────────
  const sendMsg = () => {
    if (!msgIn.trim() && !chatAttach) return;
    if (!activeC) return;
    const txt = msgIn; setMsgIn("");
    const attach = chatAttach; setChatAttach(null);
    setChatTyping(false);
    const newMsg = { id: Date.now(), from: "user", text: txt, time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }), status: "sent", ...(attach ? { attach } : {}) };
    setConvs(p => p.map(c => c.id === activeC ? { ...c, msgs: [...c.msgs, newMsg] } : c));
    setTimeout(() => setConvs(p => p.map(c => c.id === activeC ? { ...c, msgs: c.msgs.map((m: any) => m.id === newMsg.id ? { ...m, status: "delivered" } : m) } : c)), 700);
    setTimeout(() => setChatTyping(true), 800);
    setTimeout(() => {
      setChatTyping(false);
      const REPS: Record<string, string[]> = {
        ar: ["شكراً على تواصلك! سنرد في أقرب وقت ✓", "تم استلام رسالتك، كيف يمكنني مساعدتك أكثر؟", "بكل سرور! هل تريد تأكيد الحجز؟", "سيارتنا متاحة في التاريخ المطلوب 🚗"],
        fr: ["Merci pour votre message! Nous vous répondrons bientôt ✓", "Bien reçu, comment puis-je vous aider davantage?", "Bien sûr! Voulez-vous confirmer la réservation?", "Notre véhicule est disponible à la date souhaitée 🚗"],
        en: ["Thanks for your message! We'll reply soon ✓", "Received, how can I help you further?", "Of course! Would you like to confirm the booking?", "Our car is available on the requested date 🚗"],
      };
      const reps = REPS[lang] || REPS.ar;
      setConvs(p => p.map(c => c.id === activeC ? { ...c, msgs: [...c.msgs, { id: Date.now() + 1, from: "agency", text: reps[Math.floor(Math.random() * reps.length)], time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }), status: "delivered" }] } : c));
    }, 2200);
  };

  const handleChatFileAttach = (e: any) => {
    const file = e.target.files?.[0]; if (!file) return;
    const isImg = file.type.startsWith("image/");
    const reader = new FileReader();
    reader.onload = ev => setChatAttach({ type: isImg ? "image" : "doc", name: file.name, url: (ev.target as any).result, size: (file.size / 1024).toFixed(1) + "KB" });
    reader.readAsDataURL(file);
    setChatAttachMenu(false);
  };

  const handleChatMsgChange = (e: any) => { setMsgIn(e.target.value); };

  const setReviews = (newReview: any) => setReviewsRaw(prev => [newReview, ...prev]);

  // ── NAV items ─────────────────────────────────────────────────────────────
  const isMobile = useIsMobile(480);
  const isTablet = useIsTablet(768);
  const allWilayas = ALL_WILAYAS;

  const NAV = [
    { k: "home",     icon: <Ic.Home/>,  l: t.nav.home,     fn: goHome },
    { k: "cars",     icon: <Ic.Car/>,   l: t.nav.cars,     fn: () => { goHome(); setFType("all"); } },
    { k: "wedding",  icon: <Ic.Rings/>, l: t.nav.wedding,  fn: () => { goHome(); setFType("wedding"); setTimeout(() => document.getElementById("wed")?.scrollIntoView({ behavior: "smooth" }), 120); } },
    { k: "agencies", icon: <Ic.Map/>,   l: t.nav.agencies, fn: () => { goHome(); setTimeout(() => document.getElementById("ags")?.scrollIntoView({ behavior: "smooth" }), 120); } },
  ];

  const S = {
    root: { fontFamily: rtl ? "'Qatar2022Font','Cairo','Tajawal',sans-serif" : "'Qatar2022Font','Outfit','DM Sans',sans-serif", direction: t.dir, background: dm ? "#06060F" : "#F0F2F8", color: dm ? "#F1F5F9" : "#1A1A2E", minHeight: "100vh", overflowX: "hidden" as const, transition: "background .3s,color .3s" },
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Outfit:wght@300;400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#06060F;} ::-webkit-scrollbar-thumb{background:#7C3AED;border-radius:3px;}
        .hov{transition:transform .3s,box-shadow .3s;} .hov:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(124,58,237,.22);}
        .navbtn:hover{color:#C084FC!important;}
        .ftab:hover{border-color:#8B5CF6!important;color:#8B5CF6!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes notifIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typing1{0%,100%{transform:translateY(0);opacity:.4}33%{transform:translateY(-5px);opacity:1}}
        @keyframes typing2{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
        @keyframes typing3{0%,100%{transform:translateY(0);opacity:.4}66%{transform:translateY(-5px);opacity:1}}
        .anim{animation:fadeUp .5s ease both;}
        .glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        input[type=date]{color-scheme:dark;} input:focus,textarea:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        select{background:#0D0D1E!important;color:#F1F5F9!important;-webkit-appearance:none;appearance:none;} select option{background:#0D0D1E!important;color:#F1F5F9!important;} select:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        .dd{max-height:260px;overflow-y:auto;} .dd::-webkit-scrollbar{width:3px;} .dd::-webkit-scrollbar-thumb{background:#7C3AED;}
        .bu{background:linear-gradient(135deg,#7C3AED,#6366F1);border-radius:18px 4px 18px 18px;}
        .ba{background:rgba(255,255,255,.07);border-radius:4px 18px 18px 18px;}
        .iz{transition:transform .4s;} .iz:hover{transform:scale(1.06);}
        .dko{display:none!important;}
        .mob-show{display:flex!important;}
        .mob-hide{display:none!important;}
        .dg{grid-template-columns:1fr!important;}
        .mob-grid{grid-template-columns:1fr!important;}
        .mob-col{flex-direction:column!important;}
        .mob-full{width:100%!important;max-width:100%!important;}
        .mob-p{padding:16px!important;}
        .mob-text-sm{font-size:12px!important;}
        .mob-text-xs{font-size:11px!important;}
        .mob-stack{flex-direction:column!important;align-items:stretch!important;}
        .mob-center{text-align:center!important;justify-content:center!important;}
        .mob-2col{grid-template-columns:1fr 1fr!important;}
        .mob-wrap{flex-wrap:wrap!important;}
        .mob-scroll-x{overflow-x:auto!important;-webkit-overflow-scrolling:touch;}
        .bottom-nav{display:flex!important;}
        .fab-msg{bottom:80px!important;}
        @media(max-width:640px){.hov:hover{transform:none!important;box-shadow:none!important;}}
        @media(min-width:481px){
          .dko{display:flex!important;}
          .mob-show{display:none!important;}
          .mob-hide{display:flex!important;}
          .mob-col{flex-direction:row!important;}
          .mob-p{padding:20px!important;}
          .mob-text-sm{font-size:13px!important;}
          .mob-text-xs{font-size:12px!important;}
          .mob-stack{flex-direction:row!important;align-items:center!important;}
          .mob-center{text-align:right!important;}
          .mob-2col{grid-template-columns:1fr 1fr!important;}
          .bottom-nav{display:none!important;}
          .fab-msg{bottom:28px!important;}
        }
        @media(min-width:769px){
          .mob-full{width:auto!important;max-width:none!important;}
          .mob-grid{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))!important;}
          .dg{grid-template-columns:1fr 330px!important;}
          .mob-p{padding:28px!important;}
          .mob-text-sm{font-size:14px!important;}
          .mob-text-xs{font-size:13px!important;}
          .mob-hide{display:flex!important;}
        }
        .bottom-nav{
          position:fixed;bottom:0;left:0;right:0;
          background:rgba(6,6,15,.97);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-top:1px solid rgba(124,58,237,.18);
          display:none;
          align-items:center;justify-content:space-around;
          padding:8px 0 max(8px,env(safe-area-inset-bottom));
          z-index:150;
        }
        .bnav-btn{
          display:flex;flex-direction:column;align-items:center;gap:3px;
          background:none;border:none;cursor:pointer;
          padding:4px 8px;border-radius:10px;
          color:rgba(255,255,255,.38);font-size:10px;font-weight:700;
          transition:color .2s;min-width:52px;
        }
        .bnav-btn.active{color:#C084FC;}
        .bnav-btn svg{width:22px;height:22px;}
        .has-bottom-nav{padding-bottom:72px!important;}
        @media(max-width:480px){button{min-height:40px;} input,select,textarea{font-size:16px!important;}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        #langDd.open{display:block!important;}
        .lang-btn:hover{background:rgba(124,58,237,.1)!important;}
        @keyframes splashIn{0%{opacity:0;transform:scale(.88) translateY(18px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes splashOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.06)}}
        @keyframes splashBar{0%{width:0%}100%{width:100%}}
        @keyframes splashRing{0%{transform:scale(.7);opacity:0}60%{opacity:1}100%{transform:scale(1.18);opacity:0}}
        @keyframes splashTagline{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes successPop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}
      `}</style>

      {/* ── SPLASH ── */}
      {splash && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"#06060F",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:splashOut?"splashOut .6s ease forwards":"none",overflow:"hidden"}}>
          <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",width:130,height:130,borderRadius:"50%",border:"2px solid rgba(124,58,237,.35)",animation:"splashRing 2s ease-in-out infinite"}}/>
          <div style={{position:"absolute",width:160,height:160,borderRadius:"50%",border:"1px solid rgba(124,58,237,.18)",animation:"splashRing 2s ease-in-out .4s infinite"}}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20,animation:"splashIn .7s cubic-bezier(.34,1.56,.64,1) both"}}>
            <div style={{width:90,height:90,borderRadius:26,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 60px rgba(124,58,237,.55),0 20px 40px rgba(124,58,237,.3)",position:"relative"}}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
              </svg>
              <div style={{position:"absolute",inset:-1,borderRadius:27,border:"1.5px solid rgba(255,255,255,.2)"}}/>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:38,fontWeight:900,color:"#fff",letterSpacing:"-1.5px",lineHeight:1,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
                درايف <span style={{background:"linear-gradient(135deg,#A855F7,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>RENT</span>
              </div>
            </div>
            <div style={{textAlign:"center",animation:"splashTagline .6s ease .5s both"}}>
              <div style={{fontSize:14,color:"rgba(255,255,255,.55)",fontWeight:500,letterSpacing:".5px",marginBottom:16,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
                أجّر سيارتك المثالية في الجزائر
              </div>
            </div>
            <div style={{width:180,height:2,background:"rgba(255,255,255,.08)",borderRadius:99,overflow:"hidden",animation:"splashTagline .4s ease .6s both",opacity:0}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,#7C3AED,#A855F7,#6366F1)",borderRadius:99,animation:"splashBar 3.4s cubic-bezier(.4,0,.2,1) forwards"}}/>
            </div>
          </div>
          <div style={{position:"absolute",bottom:36,display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"splashTagline .6s ease .9s both",opacity:0}}>
            <div style={{width:28,height:1,background:"rgba(124,58,237,.4)"}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,.32)",fontWeight:400,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
              برمجة و تطوير غواط عبد الرحمان
            </span>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(6,6,15,.9)",backdropFilter:"blur(22px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={goHome}>
          <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.Car/></div>
          <div style={{fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1}}>درايف RENT</div>
        </div>
        <div className="dko" style={{display:"flex",gap:4}}>
          {NAV.map(n => (
            <button key={n.k} className="navbtn" onClick={n.fn}
              style={{display:"flex",alignItems:"center",gap:6,background:page===n.k?"rgba(124,58,237,.14)":"transparent",border:`1px solid ${page===n.k?"rgba(124,58,237,.4)":"transparent"}`,color:page===n.k?"#C084FC":"rgba(255,255,255,.5)",padding:"7px 13px",borderRadius:9,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>
              <span style={{opacity:.8}}>{n.icon}</span>{n.l}
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{position:"relative"}} className="dko">
            <button onClick={()=>document.getElementById("langDd")?.classList.toggle("open")}
              style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:"7px 12px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
              <Ic.Globe/>{lang==="ar"?"ع · عربي":lang==="fr"?"FR · Français":"EN · English"}<Ic.ChevD/>
            </button>
            <div id="langDd" style={{position:"absolute",top:"110%",right:0,background:"#12122A",border:"1px solid rgba(124,58,237,.3)",borderRadius:12,minWidth:150,zIndex:300,overflow:"hidden",display:"none"}}
              onClick={()=>document.getElementById("langDd")?.classList.remove("open")}>
              {[{k:"ar",flag:"🇩🇿",label:"عربي"},{k:"fr",flag:"🇫🇷",label:"Français"},{k:"en",flag:"🇬🇧",label:"English"}].map(({k,flag,label})=>(
                <button key={k} onClick={()=>setLang(k)}
                  style={{display:"flex",alignItems:"center",gap:9,width:"100%",background:lang===k?"rgba(124,58,237,.18)":"transparent",border:"none",color:lang===k?"#A855F7":"rgba(255,255,255,.7)",padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:lang===k?700:500}}>
                  {flag} {label}{lang===k&&<span style={{marginRight:"auto",color:"#7C3AED"}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>setDarkMode(!dm)} className="dko"
            style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:dm?"#F59E0B":"#6366F1",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {dm?<Ic.Sun/>:<Ic.Moon/>}
          </button>
          {currentUser&&(
            <button onClick={()=>setAddCarModal(true)} className="dko"
              style={{display:"flex",alignItems:"center",gap:6,background:"rgba(124,58,237,.14)",border:"1px solid rgba(124,58,237,.35)",color:"#C084FC",padding:"7px 12px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
              <Ic.Plus/>{lang==="ar"?"أضف سيارة":lang==="fr"?"Ajouter":"Add Car"}
            </button>
          )}
          {currentUser?(
            <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.28)",borderRadius:9,padding:"5px 12px 5px 6px",cursor:"pointer"}}
              onClick={()=>setProfileOpen(true)} className="dko">
              <img src={currentUser.avatar} alt="" style={{width:28,height:28,borderRadius:"50%",border:"2px solid #7C3AED",objectFit:"cover"}}/>
              <span style={{fontSize:12,fontWeight:700,color:"#C084FC"}}>{currentUser.name?.split(" ")[0]}</span>
            </div>
          ):(
            <BtnGlow onClick={()=>setAuthModal(true)} style={{background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.4)",color:"#C084FC",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}} className="dko">
              {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
            </BtnGlow>
          )}
          <BtnGlow onClick={openAddAgency} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:700}} className="dko">{t.listCar}</BtnGlow>
          <button onClick={()=>setMMenu((p:any)=>!p)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:8,borderRadius:8,cursor:"pointer"}} className="mob-show"><Ic.Menu/></button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mMenu&&(
        <div style={{position:"fixed",inset:0,zIndex:190,background:"rgba(6,6,15,.97)",display:"flex",flexDirection:"column",padding:"76px 5% 40px",gap:10}}>
          <button onClick={()=>setMMenu(false)} style={{position:"absolute",top:18,right:"5%",background:"transparent",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:22}}>✕</button>
          {NAV.map(n=>(
            <button key={n.k} onClick={()=>{n.fn();setMMenu(false);}}
              style={{display:"flex",alignItems:"center",gap:14,background:page===n.k?"rgba(124,58,237,.18)":"rgba(255,255,255,.04)",border:`1px solid ${page===n.k?"rgba(124,58,237,.4)":"rgba(255,255,255,.08)"}`,color:page===n.k?"#C084FC":"#fff",padding:"16px 20px",borderRadius:14,fontSize:16,fontWeight:600,cursor:"pointer"}}>
              <span style={{fontSize:20}}>{n.icon}</span>{n.l}
            </button>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",marginTop:8,paddingTop:16,display:"flex",flexDirection:"column",gap:10}}>
            {currentUser?(
              <button onClick={()=>{setProfileOpen(true);setMMenu(false);}}
                style={{display:"flex",alignItems:"center",gap:12,background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"#C084FC",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                <img src={currentUser.avatar} alt="" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover"}}/>{currentUser.name||currentUser.username}
              </button>
            ):(
              <button onClick={()=>{setAuthModal(true);setMMenu(false);}}
                style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                {lang==="ar"?"تسجيل الدخول":lang==="fr"?"Se connecter":"Sign In"}
              </button>
            )}
            <button onClick={()=>{openAddAgency();setMMenu(false);}}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:"14px 20px",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer"}}>
              {t.listCar}
            </button>
          </div>
        </div>
      )}

      {/* ── PAGES ── */}
      {page==="home"    && <HomePage    t={t} rtl={rtl} lang={lang} dm={dm} filteredCars={filteredCars} weddingCars={weddingCars} agencies={agencies} fType={fType} setFType={setFType} sort={sort} setSort={setSort} selBrand={selBrand} setSelBrand={setSelBrand} wilaya={wilaya} setWilaya={setWilaya} wilayaLabel={wilayaLabel} ddOpen={ddOpen} setDdOpen={setDdOpen} openCar={openCar} openAgency={openAgency} openMsgs={openMsgs} ag={ag} allWilayas={allWilayas} openAddAgency={openAddAgency} openAddCar={()=>setAddCarModal(true)} currentUser={currentUser} openAuth={()=>setAuthModal(true)}/>}
      {page==="car"     && selCar       && <CarPage     t={t} rtl={rtl} lang={lang} car={selCar} agency={ag(selCar.agencyId||selCar.agency_id)} goBack={()=>setPage("home")} openAgency={openAgency} openMsgs={openMsgs} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={()=>setAuthModal(true)} openBooking={openBooking}/>}
      {page==="booking" && bookingData  && <BookingPage t={t} rtl={rtl} lang={lang} car={bookingData.car} agency={bookingData.agency} days={bookingData.days} fromDate={bookingData.fromDate} toDate={bookingData.toDate} currentUser={currentUser} goBack={()=>setPage("car")} bookings={bookings} setBookings={setBookings} onSuccess={()=>{setPage("home");window.scrollTo(0,0);}} addBooking={addBooking}/>}
      {page==="agency"  && selAgency    && <AgencyPage  t={t} rtl={rtl} lang={lang} agency={selAgency} cars={allCarsPool.filter((c:any)=>c.agencyId===selAgency.id||c.agency_id===selAgency.id)} goBack={()=>setPage("home")} openCar={openCar} openMsgs={openMsgs} reviews={reviews} setReviews={setReviews} currentUser={currentUser} openAuth={()=>setAuthModal(true)}/>}
      {page==="addAgency"&& <AddAgencyPage t={t} rtl={rtl} lang={lang} goBack={()=>setPage("home")} allWilayas={allWilayas}/>}
      {page==="messages"&& <MsgsPage    t={t} rtl={rtl} lang={lang} convs={convs} activeC={activeC} setActiveC={setActiveC} msgIn={msgIn} setMsgIn={setMsgIn} sendMsg={sendMsg} ag={ag} goBack={()=>setPage("home")} chatTyping={chatTyping} chatAttach={chatAttach} setChatAttach={setChatAttach} chatAttachMenu={chatAttachMenu} setChatAttachMenu={setChatAttachMenu} chatSearch={chatSearch} setChatSearch={setChatSearch} chatSearchOpen={chatSearchOpen} setChatSearchOpen={setChatSearchOpen} handleChatFileAttach={handleChatFileAttach} handleChatMsgChange={handleChatMsgChange} chatFileRef={chatFileRef} chatImgRef={chatImgRef}/>}

      {/* ── Modals ── */}
      {authModal&&<AuthModal lang={lang} onClose={()=>setAuthModal(false)} onLogin={(user:any)=>{setCurrentUser(user);setAuthModal(false);}} getAllUsers={getAllUsers} getPendingRequests={getPendingRequests}/>}
      {addCarModal&&<AddCarModal lang={lang} darkMode={dm} agencies={agencies} allWilayas={ALL_WILAYAS} onClose={()=>setAddCarModal(false)} onAdd={(car:any)=>{setUserCars((p:any)=>[...p,{...car,id:Date.now(),rating:0,trips:0,reviews:0,tags:[],wedding:false}]);setAddCarModal(false);}}/>}
      {page!=="messages"&&currentUser&&(
        <button className="fab-msg" onClick={()=>openMsgs()} style={{position:"fixed",bottom:28,right:28,width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",cursor:"pointer",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(124,58,237,.55)",transition:"transform .2s"}}
          onMouseEnter={e=>((e.currentTarget as any).style.transform="scale(1.12)")} onMouseLeave={e=>((e.currentTarget as any).style.transform="scale(1)")}>
          <Ic.Msg/>
          {unreadMsgs>0&&<span style={{position:"absolute",top:-3,right:-3,width:20,height:20,borderRadius:"50%",background:"#EF4444",border:"2px solid #06060F",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2s infinite"}}>{unreadMsgs}</span>}
        </button>
      )}
      {profileOpen&&currentUser&&<ProfileModal lang={lang} user={currentUser} onClose={()=>setProfileOpen(false)} onUpdate={(u:any)=>setCurrentUser(u)} onLogout={()=>{setCurrentUser(null);setProfileOpen(false);}} convs={convs} setConvs={setConvs} ag={ag} agencies={agencies}/>}

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="bottom-nav">
        {[
          {k:"home",     icon:<Ic.Home/>,  l:t.nav.home,    fn:goHome},
          {k:"cars",     icon:<Ic.Car/>,   l:t.nav.cars,    fn:()=>{goHome();setFType("all");}},
          {k:"wedding",  icon:<Ic.Rings/>, l:t.nav.wedding, fn:()=>{goHome();setFType("wedding");}},
          {k:"agencies", icon:<Ic.Map/>,   l:t.nav.agencies,fn:()=>{goHome();}},
          ...(currentUser
            ?[{k:"profile",icon:<span style={{fontSize:20}}>👤</span>,l:lang==="ar"?"حسابي":lang==="fr"?"Profil":"Profile",fn:()=>setProfileOpen(true)}]
            :[{k:"signin", icon:<span style={{fontSize:20}}>🔑</span>,l:lang==="ar"?"دخول":lang==="fr"?"Connexion":"Login", fn:()=>setAuthModal(true)}]),
        ].map((n:any)=>(
          <button key={n.k} className={`bnav-btn${page===n.k?" active":""}`} onClick={n.fn}>
            {n.icon}<span>{n.l}</span>
          </button>
        ))}
      </nav>

      <footer style={{position:"relative",overflow:"hidden",padding:"22px 5%",background:"#03030A",borderTop:"1px solid rgba(124,58,237,.12)"}}>
        <div style={{position:"absolute",width:320,height:60,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(124,58,237,.12),transparent)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,position:"relative",zIndex:1}}>
          <div style={{height:1,width:48,background:"linear-gradient(to right,transparent,rgba(124,58,237,.4))"}}/>
          <span style={{fontSize:11,color:"rgba(255,255,255,.22)",fontWeight:400}}>برمجة و تطوير غواط عبد الرحمان</span>
          <div style={{height:1,width:48,background:"linear-gradient(to left,transparent,rgba(124,58,237,.4))"}}/>
        </div>
      </footer>
    </div>
  );
}

// ── All page components are imported from the original TSX ───────────────────
// These are kept as named exports from their own files but for simplicity,
// we re-export them directly here as they rely heavily on shared state from App

// The following imports come from the page files created below:
import { HomePage } from "./pages/HomePage";
import { CarPage } from "./pages/CarPage";
import { BookingPage } from "./pages/BookingPage";
import { AgencyPage } from "./pages/AgencyPage";
import { AddAgencyPage } from "./pages/AddAgencyPage";
import { MsgsPage } from "./pages/MsgsPage";
import { AuthModal } from "./pages/AuthModal";
import { ProfileModal } from "./pages/ProfileModal";
import { AddCarModal } from "./components/AddCarModal";
