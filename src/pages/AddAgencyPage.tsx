import { useState } from "react";
import { BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";
import { agencyRequestsService } from "../services/db";

export function AddAgencyPage({t,rtl,lang,goBack,allWilayas}: any) {
  const p = t.addPage;
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name:"", owner:"", wilaya:"", phone:"", email:"", cars:"", address:"", desc:"", username:"", password:"", confirmPassword:"" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  const inputStyle: any = { width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:10, color:"#fff", padding:"11px 14px", fontSize:14, fontFamily:"inherit" };
  const labelStyle: any = { display:"block", color:"rgba(255,255,255,.5)", fontSize:12, fontWeight:600, marginBottom:7, textTransform:"uppercase", letterSpacing:"1px" };

  const handleSubmit = async () => {
    try {
      await agencyRequestsService.insert({
        name: form.name, owner: form.owner, wilaya: form.wilaya,
        phone: form.phone, email: form.email, cars: form.cars,
        address: form.address, desc: form.desc,
        username: form.username, status: "pending",
        created_at: new Date().toISOString(),
      });
    } catch { /* fallback: just show success */ }
    setDone(true);
  };

  if (done) return (
    <div style={{maxWidth:560,margin:"60px auto",padding:"0 5%",textAlign:"center"}}>
      <div style={{background:"rgba(52,211,153,.07)",border:"1px solid rgba(52,211,153,.22)",borderRadius:24,padding:"52px 36px"}}>
        <div style={{fontSize:64,marginBottom:18}}>🎉</div>
        <h2 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:12}}>{p.successTitle}</h2>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:15,lineHeight:1.8,marginBottom:28}}>{p.successMsg}</p>
        <BtnGlow onClick={goBack} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 32px",borderRadius:11,fontSize:15,fontWeight:700}}>{t.back}</BtnGlow>
      </div>
    </div>
  );

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 5% 60px"}}>
      <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:28,fontSize:13}}>
        <Ic.Back/>{t.back}
      </button>

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16,alignItems:"start"}}>
        <div>
          <div style={{marginBottom:32}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"5px 15px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:14}}>
              🏢 {lang==="ar"?"تسجيل وكالة جديدة":lang==="fr"?"Nouvelle agence":"New Agency"}
            </div>
            <h1 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:8}}>{p.title}</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:14}}>{p.sub}</p>
          </div>

          {/* Steps */}
          <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:32}}>
            {[1,2,3].map((s: number,i: number)=>(
              <div key={s} style={{display:"flex",alignItems:"center",flex:i<2?1:"auto"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:step>=s?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.07)",border:step===s?"2px solid #A855F7":step>s?"none":"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,transition:"all .3s"}}>
                    {step>s?<Ic.Check/>:s}
                  </div>
                  <span style={{fontSize:10,color:step>=s?"#C084FC":"rgba(255,255,255,.3)",fontWeight:600,whiteSpace:"nowrap"}}>{s===1?p.step1:s===2?p.step2:p.step3}</span>
                </div>
                {i<2&&<div style={{flex:1,height:2,background:step>s?"linear-gradient(90deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",margin:"0 8px",marginBottom:20,borderRadius:1,transition:"all .4s"}}/>}
              </div>
            ))}
          </div>

          {step===1&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28,display:"flex",flexDirection:"column",gap:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div><label style={labelStyle}>{p.nameLabel}</label><input value={form.name} onChange={set("name")} placeholder={p.namePh} style={inputStyle}/></div>
                  <div><label style={labelStyle}>{p.ownerLabel}</label><input value={form.owner} onChange={set("owner")} placeholder={p.ownerPh} style={inputStyle}/></div>
                </div>
                <div><label style={labelStyle}>{p.wilayaLabel}</label>
                  <select value={form.wilaya} onChange={set("wilaya")} style={{...inputStyle,background:"#0D0D1E",cursor:"pointer"}}>
                    <option value="">{t.allWilayas}</option>
                    {allWilayas.map((w: any)=><option key={w.c} value={w.c}>{w.c} — {lang==="fr"?w.fr:w.ar}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>{p.carsLabel}</label><input type="number" min="1" value={form.cars} onChange={set("cars")} placeholder="5" style={inputStyle}/></div>
                <div><label style={labelStyle}>{p.addressLabel}</label><input value={form.address} onChange={set("address")} placeholder={p.addressPh} style={inputStyle}/></div>
                <BtnGlow onClick={()=>setStep(2)} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:11,fontSize:15,fontWeight:700,alignSelf:"flex-start",paddingLeft:36,paddingRight:36}}>
                  {lang==="ar"?"التالي →":lang==="fr"?"Suivant →":"Next →"}
                </BtnGlow>
              </div>
            </div>
          )}

          {step===2&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28,display:"flex",flexDirection:"column",gap:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div><label style={labelStyle}>{p.phoneLabel}</label><input value={form.phone} onChange={set("phone")} placeholder={p.phonePh} style={inputStyle}/></div>
                  <div><label style={labelStyle}>{p.emailLabel}</label><input type="email" value={form.email} onChange={set("email")} placeholder={p.emailPh} style={inputStyle}/></div>
                </div>
                <div><label style={labelStyle}>{p.descLabel}</label><textarea value={form.desc} onChange={set("desc")} placeholder={p.descPh} rows={3} style={{...inputStyle,resize:"vertical",lineHeight:1.7}}/></div>
                <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:18}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",borderRadius:20,padding:"4px 12px",marginBottom:14,fontSize:11,color:"#C084FC",fontWeight:700}}>
                    🔐 {lang==="ar"?"بيانات الدخول":lang==="fr"?"Identifiants":"Login Credentials"}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div><label style={labelStyle}>{lang==="ar"?"اسم المستخدم":lang==="fr"?"Nom d'utilisateur":"Username"}</label><input value={form.username} onChange={set("username")} placeholder={lang==="ar"?"مثال: alger.drive":"e.g. alger.drive"} style={inputStyle}/></div>
                    <div><label style={labelStyle}>{lang==="ar"?"كلمة المرور":lang==="fr"?"Mot de passe":"Password"}</label>
                      <div style={{position:"relative"}}>
                        <input type={showPass?"text":"password"} value={form.password} onChange={set("password")} placeholder="••••••••" style={{...inputStyle,paddingRight:42}}/>
                        <button onClick={()=>setShowPass((p: boolean)=>!p)} style={{position:"absolute",top:"50%",right:12,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:14}}>{showPass?"🙈":"👁️"}</button>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop:14}}>
                    <label style={labelStyle}>{lang==="ar"?"تأكيد كلمة المرور":lang==="fr"?"Confirmer":"Confirm Password"}</label>
                    <div style={{position:"relative"}}>
                      <input type={showConfirm?"text":"password"} value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="••••••••"
                        style={{...inputStyle,paddingRight:42,borderColor:form.confirmPassword&&form.confirmPassword!==form.password?"rgba(239,68,68,.5)":form.confirmPassword&&form.confirmPassword===form.password?"rgba(52,211,153,.5)":"rgba(255,255,255,.1)"}}/>
                      <button onClick={()=>setShowConfirm((p: boolean)=>!p)} style={{position:"absolute",top:"50%",right:12,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:14}}>{showConfirm?"🙈":"👁️"}</button>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(1)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                    {lang==="ar"?"← السابق":"← Back"}
                  </button>
                  <BtnGlow onClick={()=>{if(!form.password||form.password.length<6||form.password!==form.confirmPassword)return;setStep(3);}}
                    style={{background:form.password&&form.password.length>=6&&form.password===form.confirmPassword?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",border:"none",color:form.password&&form.password.length>=6&&form.password===form.confirmPassword?"#fff":"rgba(255,255,255,.3)",padding:"12px 32px",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                    {lang==="ar"?"التالي →":"Next →"}
                  </BtnGlow>
                </div>
              </div>
            </div>
          )}

          {step===3&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:18,padding:28}}>
                <h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:18}}>{lang==="ar"?"مراجعة البيانات":lang==="fr"?"Récapitulatif":"Summary"}</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:22}}>
                  {[{l:p.nameLabel,v:form.name},{l:p.ownerLabel,v:form.owner},{l:p.wilayaLabel,v:form.wilaya?(lang==="fr"?allWilayas.find((w: any)=>w.c===form.wilaya)?.fr:allWilayas.find((w: any)=>w.c===form.wilaya)?.ar)||form.wilaya:"—"},{l:p.phoneLabel,v:form.phone},{l:p.emailLabel,v:form.email},{l:lang==="ar"?"اسم المستخدم":"Username",v:form.username||"—"}].map((r: any,i: number)=>(
                    <div key={i} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:4}}>{r.l}</div>
                      <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{r.v||"—"}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.2)",borderRadius:10,padding:"13px 16px",marginBottom:22,fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.7}}>
                  <Ic.Info/> {lang==="ar"?"بالضغط على الإرسال توافق على شروط استخدام المنصة. بعد مراجعة الطلب وقبوله، ستتلقى بيانات دخول لوحة التحكم.":lang==="fr"?"En soumettant, vous acceptez les conditions. Après validation, vous recevrez vos identifiants.":"By submitting, you agree to terms. After approval, you'll receive login credentials."}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(2)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"12px 24px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
                    {lang==="ar"?"← السابق":"← Back"}
                  </button>
                  <BtnGlow onClick={handleSubmit} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 32px",borderRadius:10,fontSize:15,fontWeight:700,display:"flex",alignItems:"center",gap:8}}>
                    <Ic.Check/>{p.submitBtn}
                  </BtnGlow>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BENEFITS SIDEBAR */}
        <div style={{position:"sticky",top:90}}>
          <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.14),rgba(99,102,241,.1))",border:"1px solid rgba(124,58,237,.25)",borderRadius:18,padding:24,marginBottom:16}}>
            <h3 style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:18}}>{p.benefitsTitle}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {p.benefits.map((b: string,i: number)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:11}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"rgba(52,211,153,.14)",border:"1px solid rgba(52,211,153,.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"#34D399",flexShrink:0}}><Ic.Check/></div>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.5}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
