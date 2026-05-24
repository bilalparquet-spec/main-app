import { useState } from "react";

const WILAYAS = [
  "الجزائر","وهران","قسنطينة","عنابة","سطيف","تيزي وزو","بجاية","باتنة",
  "بسكرة","تلمسان","المدية","البليدة","مستغانم","سيدي بلعباس","جيجل",
  "سكيكدة","بومرداس","تيبازة","عين الدفلى","غليزان","الأغواط","الجلفة",
  "تيسمسيلت","خنشلة","سوق أهراس","الطارف","وادي سوف","ورقلة","غرداية",
  "تندوف","بشار","أدرار","إليزي","تمنراست",
];

const STEPS = ["المعلومات الأساسية", "العنوان والموقع", "وسائل التواصل", "التحقق والإرسال"];

export function AgencyRegisterPage({ onBack }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus] = useState(null);

  const [form, setForm] = useState({
    name: "", owner: "", phone: "", email: "",
    wilaya: "", address: "", description: "",
    facebook: "", instagram: "", website: "",
    cars: "", license: "", agree: false,
  });

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inputStyle = (name) => ({
    width: "100%",
    background: focus === name ? "rgba(109,40,217,.08)" : "rgba(255,255,255,.04)",
    border: `1.5px solid ${focus === name ? "rgba(109,40,217,.6)" : "rgba(255,255,255,.09)"}`,
    borderRadius: 14,
    padding: "clamp(11px,3vw,14px) clamp(13px,3.5vw,16px)",
    color: "#F1F5F9",
    fontSize: "clamp(13px,3.2vw,15px)",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focus === name ? "0 0 0 3px rgba(109,40,217,.12)" : "none",
    direction: "rtl",
  });

  const labelStyle = {
    fontSize: "clamp(11px,2.8vw,13px)", fontWeight: 700,
    color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7,
  };

  function canNext() {
    if (step === 0) return form.name && form.owner && form.phone && form.email;
    if (step === 1) return form.wilaya && form.address;
    if (step === 2) return true;
    if (step === 3) return form.agree;
    return true;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{
        position:"fixed", inset:0, background:"#07080F",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        fontFamily:"'Cairo',sans-serif", padding:"clamp(20px,5vw,40px)",
        animation:"fadeIn .4s ease",
      }}>
        {/* Success glow */}
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(52,211,153,.2) 0%,transparent 70%)",top:"20%",left:"50%",transform:"translateX(-50%)",filter:"blur(50px)",pointerEvents:"none"}}/>

        <div style={{
          width:"clamp(80px,20vw,100px)", height:"clamp(80px,20vw,100px)",
          borderRadius:"50%", background:"linear-gradient(135deg,#34D399,#059669)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 60px rgba(52,211,153,.4), 0 20px 50px rgba(0,0,0,.4)",
          marginBottom:28, animation:"float 3s ease-in-out infinite",
        }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={{fontSize:"clamp(22px,6vw,30px)",fontWeight:900,color:"#F1F5F9",textAlign:"center",marginBottom:10,letterSpacing:"-.5px"}}>
          تم إرسال طلبك!
        </h1>
        <p style={{fontSize:"clamp(13px,3.2vw,15px)",color:"rgba(255,255,255,.45)",textAlign:"center",lineHeight:1.8,marginBottom:10,maxWidth:340}}>
          سيتم مراجعة بيانات وكالتك من قِبل فريقنا خلال 24-48 ساعة وستصلك رسالة تأكيد على بريدك الإلكتروني
        </p>
        <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",borderRadius:14,padding:"12px 20px",marginBottom:32,textAlign:"center"}}>
          <span style={{fontSize:"clamp(12px,3vw,14px)",color:"#34D399",fontWeight:700}}>{form.email}</span>
        </div>

        <button onClick={onBack} style={{
          background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
          border:"none", borderRadius:14, padding:"clamp(12px,3vw,14px) clamp(28px,7vw,40px)",
          color:"#fff", fontWeight:900, fontSize:"clamp(14px,3.5vw,16px)",
          cursor:"pointer", fontFamily:"inherit",
          boxShadow:"0 6px 24px rgba(109,40,217,.38)",
        }}>
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position:"fixed", inset:0, background:"#07080F",
      display:"flex", flexDirection:"column",
      fontFamily:"'Cairo',sans-serif",
      overflowY:"auto", overscrollBehavior:"contain",
      animation:"fadeUp .35s ease",
    }}>

      {/* ── Header ── */}
      <div style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(7,8,15,.95)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,.07)",
        padding:"max(16px,env(safe-area-inset-top,16px)) clamp(14px,4vw,24px) 14px",
        display:"flex", alignItems:"center", gap:12,
        flexShrink:0,
      }}>
        <button onClick={onBack} style={{
          width:38, height:38, borderRadius:"50%",
          background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(255,255,255,.1)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polyline points="15 18 9 12 15 6" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{flex:1}}>
          <h1 style={{fontSize:"clamp(14px,3.8vw,17px)",fontWeight:900,color:"#F1F5F9",marginBottom:2}}>تسجيل وكالتك</h1>
          <p style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.38)"}}>الخطوة {step+1} من {STEPS.length}</p>
        </div>

        {/* Step icon */}
        <div style={{
          width:36, height:36, borderRadius:10,
          background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 14px rgba(109,40,217,.4)",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="3" width="15" height="13" rx="2" stroke="#fff" strokeWidth="2"/>
            <path d="M16 8h4l3 3v5h-7V8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="5.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
            <circle cx="18.5" cy="18.5" r="2.5" stroke="#fff" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{background:"rgba(255,255,255,.05)",height:3,flexShrink:0}}>
        <div style={{
          height:"100%", borderRadius:3,
          background:"linear-gradient(90deg,#6D28D9,#818CF8)",
          width:`${((step+1)/STEPS.length)*100}%`,
          transition:"width .4s cubic-bezier(.4,0,.2,1)",
          boxShadow:"0 0 10px rgba(109,40,217,.5)",
        }}/>
      </div>

      {/* ── Step tabs ── */}
      <div style={{
        display:"flex", padding:"0 clamp(14px,4vw,24px)",
        borderBottom:"1px solid rgba(255,255,255,.06)",
        overflowX:"auto", scrollbarWidth:"none", flexShrink:0,
        gap:0,
      }}>
        {STEPS.map((s,i) => (
          <div key={i} onClick={()=> i < step && setStep(i)} style={{
            padding:"12px clamp(8px,2.5vw,14px)",
            fontSize:"clamp(10px,2.5vw,12px)", fontWeight:700,
            color: i===step ? "#A78BFA" : i<step ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.22)",
            borderBottom: i===step ? "2px solid #A78BFA" : "2px solid transparent",
            cursor: i < step ? "pointer" : "default",
            whiteSpace:"nowrap", transition:"color .2s",
            display:"flex", alignItems:"center", gap:5,
          }}>
            {i < step && <span style={{color:"#34D399", fontSize:11}}>✓</span>}
            {s}
          </div>
        ))}
      </div>

      {/* ── Form content ── */}
      <div style={{flex:1, padding:"clamp(18px,4vw,28px) clamp(14px,4vw,24px)", maxWidth:580, width:"100%", margin:"0 auto", boxSizing:"border-box"}}>

        {/* ══ Step 0: Basic Info ══ */}
        {step === 0 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div style={{
              background:"rgba(109,40,217,.08)", border:"1px solid rgba(109,40,217,.2)",
              borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:4,
            }}>
              <span style={{fontSize:24}}>🏢</span>
              <div>
                <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:800,color:"#A78BFA",marginBottom:3}}>أنت على بعد خطوات من النجاح!</div>
                <div style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.45)"}}>أدخل معلومات وكالتك لتبدأ في استقبال الطلبات</div>
              </div>
            </div>

            <div>
              <label style={labelStyle}>🏷️ اسم الوكالة *</label>
              <input value={form.name} onChange={e=>up("name",e.target.value)}
                placeholder="مثال: وكالة النجمة لتأجير السيارات"
                onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}
                style={inputStyle("name")}/>
            </div>

            <div>
              <label style={labelStyle}>👤 اسم صاحب الوكالة *</label>
              <input value={form.owner} onChange={e=>up("owner",e.target.value)}
                placeholder="الاسم الكامل"
                onFocus={()=>setFocus("owner")} onBlur={()=>setFocus(null)}
                style={inputStyle("owner")}/>
            </div>

            <div>
              <label style={labelStyle}>📞 رقم الهاتف *</label>
              <input value={form.phone} onChange={e=>up("phone",e.target.value)}
                placeholder="05xxxxxxxx" type="tel" dir="ltr" style={{...inputStyle("phone"), textAlign:"right"}}
                onFocus={()=>setFocus("phone")} onBlur={()=>setFocus(null)}/>
            </div>

            <div>
              <label style={labelStyle}>📧 البريد الإلكتروني *</label>
              <input value={form.email} onChange={e=>up("email",e.target.value)}
                placeholder="example@gmail.com" type="email" dir="ltr"
                style={{...inputStyle("email"), textAlign:"right"}}
                onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}/>
            </div>

            <div>
              <label style={labelStyle}>🚗 عدد السيارات المتاحة</label>
              <input value={form.cars} onChange={e=>up("cars",e.target.value)}
                placeholder="مثال: 10" type="number"
                onFocus={()=>setFocus("cars")} onBlur={()=>setFocus(null)}
                style={inputStyle("cars")}/>
            </div>
          </div>
        )}

        {/* ══ Step 1: Location ══ */}
        {step === 1 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div>
              <label style={labelStyle}>📍 الولاية *</label>
              <select value={form.wilaya} onChange={e=>up("wilaya",e.target.value)}
                style={{...inputStyle("wilaya"), appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpolyline points='6 9 12 15 18 9' stroke='rgba(255,255,255,.4)' strokeWidth='2'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"left 14px center"}}>
                <option value="" disabled style={{background:"#09091C"}}>اختر ولايتك</option>
                {WILAYAS.map(w => <option key={w} value={w} style={{background:"#09091C"}}>{w}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>🗺️ العنوان التفصيلي *</label>
              <input value={form.address} onChange={e=>up("address",e.target.value)}
                placeholder="الشارع، الحي، المدينة..."
                onFocus={()=>setFocus("address")} onBlur={()=>setFocus(null)}
                style={inputStyle("address")}/>
            </div>

            <div>
              <label style={labelStyle}>📝 وصف الوكالة</label>
              <textarea value={form.description} onChange={e=>up("description",e.target.value)}
                placeholder="اكتب نبذة عن وكالتك، خدماتك، وما يميزك..."
                onFocus={()=>setFocus("desc")} onBlur={()=>setFocus(null)}
                rows={4}
                style={{
                  ...inputStyle("desc"),
                  resize:"none", lineHeight:1.7,
                  minHeight:"clamp(90px,20vw,120px)",
                }}/>
            </div>

            {/* Map placeholder */}
            <div style={{
              background:"rgba(255,255,255,.03)", border:"1.5px dashed rgba(255,255,255,.1)",
              borderRadius:16, padding:"clamp(18px,4vw,24px)", textAlign:"center",
            }}>
              <div style={{fontSize:28,marginBottom:8}}>🗺️</div>
              <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:700,color:"rgba(255,255,255,.45)",marginBottom:5}}>حدد موقعك على الخريطة</div>
              <div style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.25)"}}>سيتم إضافة هذه الميزة قريباً</div>
            </div>
          </div>
        )}

        {/* ══ Step 2: Social Media ══ */}
        {step === 2 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div style={{
              background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
              borderRadius:16, padding:"14px 16px", marginBottom:4,
            }}>
              <div style={{fontSize:"clamp(11px,2.8vw,13px)",fontWeight:700,color:"rgba(255,255,255,.5)",lineHeight:1.7}}>
                ✨ هذه الخطوة اختيارية — لكن إضافة حساباتك يزيد من ثقة العملاء ويساعدهم على التواصل معك بسهولة
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                <span style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{width:22,height:22,borderRadius:6,background:"linear-gradient(135deg,#1877F2,#0C5ED0)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:13}}>f</span>
                  فيسبوك
                </span>
              </label>
              <input value={form.facebook} onChange={e=>up("facebook",e.target.value)}
                placeholder="https://facebook.com/yourpage"
                onFocus={()=>setFocus("fb")} onBlur={()=>setFocus(null)}
                dir="ltr" style={{...inputStyle("fb"), textAlign:"left"}}/>
            </div>

            <div>
              <label style={labelStyle}>
                <span style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{width:22,height:22,borderRadius:6,background:"linear-gradient(135deg,#E1306C,#833AB4)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12}}>📷</span>
                  إنستغرام
                </span>
              </label>
              <input value={form.instagram} onChange={e=>up("instagram",e.target.value)}
                placeholder="@youragency"
                onFocus={()=>setFocus("ig")} onBlur={()=>setFocus(null)}
                dir="ltr" style={{...inputStyle("ig"), textAlign:"left"}}/>
            </div>

            <div>
              <label style={labelStyle}>
                <span style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{width:22,height:22,borderRadius:6,background:"linear-gradient(135deg,#6D28D9,#4F46E5)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🌐</span>
                  الموقع الإلكتروني
                </span>
              </label>
              <input value={form.website} onChange={e=>up("website",e.target.value)}
                placeholder="https://yourwebsite.dz"
                onFocus={()=>setFocus("web")} onBlur={()=>setFocus(null)}
                dir="ltr" style={{...inputStyle("web"), textAlign:"left"}}/>
            </div>
          </div>
        )}

        {/* ══ Step 3: Review & Submit ══ */}
        {step === 3 && (
          <div style={{display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .3s ease"}}>
            <h2 style={{fontSize:"clamp(15px,4vw,18px)",fontWeight:900,color:"#F1F5F9",marginBottom:4}}>مراجعة البيانات</h2>

            {/* Summary cards */}
            {[
              { icon:"🏷️", label:"اسم الوكالة", value:form.name },
              { icon:"👤", label:"صاحب الوكالة", value:form.owner },
              { icon:"📞", label:"الهاتف", value:form.phone },
              { icon:"📧", label:"البريد", value:form.email },
              { icon:"📍", label:"الولاية", value:form.wilaya },
              { icon:"🗺️", label:"العنوان", value:form.address },
            ].filter(r => r.value).map((row,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:12, padding:"clamp(10px,2.5vw,13px) clamp(12px,3vw,16px)",
              }}>
                <span style={{fontSize:"clamp(16px,4vw,20px)"}}>{row.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:"clamp(9px,2.2vw,11px)",color:"rgba(255,255,255,.35)",marginBottom:2}}>{row.label}</div>
                  <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:700,color:"#F1F5F9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.value}</div>
                </div>
                <button onClick={()=>setStep(row.label.includes("ولاية")||row.label.includes("عنوان") ? 1 : 0)} style={{
                  background:"rgba(109,40,217,.15)", border:"1px solid rgba(109,40,217,.3)",
                  color:"#A78BFA", borderRadius:8, padding:"4px 10px",
                  fontSize:"clamp(9px,2.2vw,11px)", fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                }}>تعديل</button>
              </div>
            ))}

            {/* Terms */}
            <div style={{
              background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
              borderRadius:14, padding:"clamp(14px,3.5vw,18px)",
              display:"flex", gap:12, alignItems:"flex-start", marginTop:4,
              cursor:"pointer",
            }} onClick={()=>up("agree",!form.agree)}>
              <div style={{
                width:22, height:22, borderRadius:6, flexShrink:0, marginTop:2,
                background: form.agree ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "rgba(255,255,255,.06)",
                border: `2px solid ${form.agree ? "transparent" : "rgba(255,255,255,.15)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s",
              }}>
                {form.agree && <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
              </div>
              <div style={{fontSize:"clamp(11px,2.8vw,13px)",color:"rgba(255,255,255,.55)",lineHeight:1.7}}>
                أوافق على <span style={{color:"#A78BFA",fontWeight:700}}>شروط الاستخدام وسياسة الخصوصية</span> لمنصة درايف RENT، وأؤكد أن المعلومات المقدمة صحيحة وكاملة
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action buttons ── */}
      <div style={{
        position:"sticky", bottom:0,
        background:"rgba(7,8,15,.95)", backdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(255,255,255,.07)",
        padding:"clamp(12px,3vw,16px) clamp(14px,4vw,24px) max(16px,env(safe-area-inset-bottom,16px))",
        display:"flex", gap:12,
        flexShrink:0,
      }}>
        {step > 0 && (
          <button onClick={()=>setStep(s=>s-1)} style={{
            flex:"0 0 auto", padding:"clamp(12px,3vw,14px) clamp(16px,4vw,22px)",
            borderRadius:14, border:"1.5px solid rgba(255,255,255,.12)",
            background:"rgba(255,255,255,.05)", color:"rgba(255,255,255,.6)",
            fontSize:"clamp(13px,3.2vw,15px)", fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
          }}>
            رجوع
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={()=> canNext() && setStep(s=>s+1)}
            style={{
              flex:1, padding:"clamp(12px,3vw,14px)",
              borderRadius:14, border:"none",
              background: canNext()
                ? "linear-gradient(135deg,#6D28D9,#4F46E5)"
                : "rgba(255,255,255,.07)",
              color: canNext() ? "#fff" : "rgba(255,255,255,.3)",
              fontSize:"clamp(13px,3.5vw,16px)", fontWeight:900,
              cursor: canNext() ? "pointer" : "not-allowed",
              fontFamily:"inherit",
              boxShadow: canNext() ? "0 6px 22px rgba(109,40,217,.4)" : "none",
              transition:"all .25s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
            التالي
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <button
            onClick={()=> form.agree && handleSubmit()}
            style={{
              flex:1, padding:"clamp(12px,3vw,14px)",
              borderRadius:14, border:"none",
              background: form.agree
                ? "linear-gradient(135deg,#059669,#34D399)"
                : "rgba(255,255,255,.07)",
              color: form.agree ? "#fff" : "rgba(255,255,255,.3)",
              fontSize:"clamp(13px,3.5vw,16px)", fontWeight:900,
              cursor: form.agree ? "pointer" : "not-allowed",
              fontFamily:"inherit",
              boxShadow: form.agree ? "0 6px 22px rgba(5,150,105,.4)" : "none",
              transition:"all .25s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
            إرسال الطلب ✓
          </button>
        )}
      </div>
    </div>
  );
}
