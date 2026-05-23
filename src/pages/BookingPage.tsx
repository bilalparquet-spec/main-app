import { useState } from "react";
import { ALL_WILAYAS } from "../data/static";
import { BtnGlow } from "../components/UI";
import { Ic } from "../components/Icons";

export function BookingPage({t,rtl,lang,car,agency,days,fromDate,toDate,currentUser,goBack,bookings,setBookings,onSuccess,addBooking}: any) {
  const total = car.price * days, fee = Math.round(total * .08), grandTotal = total + fee;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: currentUser?.name || "", phone: currentUser?.phone || "", email: currentUser?.email || "",
    wilaya: "", address: "", idNumber: "", idType: "national", pickupTime: "10:00", notes: "", payMethod: "cash",
  });
  const [errors, setErrors] = useState<any>({});
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  const bookingRef = "DRV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const IS: any = { width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 11, color: "#fff", padding: "12px 14px", fontSize: 14, fontFamily: "inherit", transition: "border-color .2s" };
  const IS_ERR = { ...IS, borderColor: "rgba(239,68,68,.5)" };
  const LS: any = { display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 7 };

  const L: any = {
    ar: { title:"تأكيد الحجز", step1:"المعلومات الشخصية", step2:"مراجعة وتأكيد", personal:"بياناتك الشخصية", personalSub:"يرجى ملء جميع البيانات المطلوبة", fullName:"الاسم الكامل", fullNamePh:"الاسم الثلاثي", phone:"رقم الهاتف", phonePh:"0555 xx xx xx", email:"البريد الإلكتروني", emailPh:"exemple@email.com", wilaya:"الولاية", wilayaPh:"اختر ولايتك", address:"العنوان التفصيلي", addressPh:"الحي، الشارع...", idType:"نوع الوثيقة", idNational:"بطاقة وطنية", idPassport:"جواز سفر", idPermit:"رخصة السياقة", idNumber:"رقم الوثيقة", idNumberPh:"أدخل الرقم", pickupTime:"وقت التسليم", notes:"ملاحظات", notesPh:"معلومات إضافية... (اختياري)", payMethod:"طريقة الدفع", cash:"دفع نقدي عند التسليم", cib:"بطاقة CIB", dahabia:"بطاقة Dahabia", next:"متابعة →", back:"رجوع", confirm:"تأكيد الحجز", required:"هذا الحقل مطلوب", summaryTitle:"ملخص الحجز", datesLabel:"التواريخ", durationLabel:"المدة", priceLabel:"السعر / يوم", feeLabel:"رسوم الخدمة", totalLabel:"المجموع الكلي", pickupLabel:"وقت التسليم", payLabel:"طريقة الدفع", successTitle:"تم الحجز بنجاح! 🎉", successMsg:"شكراً لك! تم استلام طلب حجزك وسيتواصل معك فريق الوكالة قريباً.", successRef:"رقم الحجز", backHome:"العودة للرئيسية", callAgency:"اتصل بالوكالة", termsNote:"بتأكيد الحجز أنت توافق على شروط الاستخدام وسياسة الإلغاء." },
    fr: { title:"Confirmer la réservation", step1:"Informations", step2:"Récapitulatif", personal:"Vos informations", personalSub:"Veuillez remplir tous les champs requis", fullName:"Nom complet", fullNamePh:"Nom complet", phone:"Téléphone", phonePh:"0555 xx xx xx", email:"Email", emailPh:"exemple@email.com", wilaya:"Wilaya", wilayaPh:"Choisir wilaya", address:"Adresse", addressPh:"Quartier, rue...", idType:"Type document", idNational:"Carte nationale", idPassport:"Passeport", idPermit:"Permis de conduire", idNumber:"Numéro document", idNumberPh:"Entrer le numéro", pickupTime:"Heure prise en charge", notes:"Notes", notesPh:"Informations supplémentaires... (optionnel)", payMethod:"Mode de paiement", cash:"Espèces à la livraison", cib:"Carte CIB", dahabia:"Carte Dahabia", next:"Suivant →", back:"Retour", confirm:"Confirmer la réservation", required:"Ce champ est requis", summaryTitle:"Récapitulatif", datesLabel:"Dates", durationLabel:"Durée", priceLabel:"Prix / jour", feeLabel:"Frais de service", totalLabel:"Total", pickupLabel:"Heure prise en charge", payLabel:"Paiement", successTitle:"Réservation confirmée! 🎉", successMsg:"Merci! Votre réservation a été reçue. L'agence vous contactera bientôt.", successRef:"Référence", backHome:"Retour à l'accueil", callAgency:"Appeler l'agence", termsNote:"En confirmant, vous acceptez les conditions d'utilisation." },
    en: { title:"Confirm Booking", step1:"Personal Info", step2:"Review", personal:"Your Information", personalSub:"Please fill in all required fields", fullName:"Full Name", fullNamePh:"Full name", phone:"Phone Number", phonePh:"0555 xx xx xx", email:"Email", emailPh:"example@email.com", wilaya:"Wilaya", wilayaPh:"Select wilaya", address:"Detailed Address", addressPh:"District, street...", idType:"Document Type", idNational:"National ID", idPassport:"Passport", idPermit:"Driver's License", idNumber:"Document Number", idNumberPh:"Enter number", pickupTime:"Pickup Time", notes:"Notes", notesPh:"Extra info... (optional)", payMethod:"Payment Method", cash:"Cash on delivery", cib:"CIB Card", dahabia:"Dahabia Card", next:"Continue →", back:"Back", confirm:"Confirm Booking", required:"This field is required", summaryTitle:"Booking Summary", datesLabel:"Dates", durationLabel:"Duration", priceLabel:"Price / day", feeLabel:"Service fee", totalLabel:"Total", pickupLabel:"Pickup time", payLabel:"Payment", successTitle:"Booking Confirmed! 🎉", successMsg:"Thank you! Your booking has been received. The agency will contact you soon.", successRef:"Booking Ref", backHome:"Back to Home", callAgency:"Call Agency", termsNote:"By confirming, you agree to our terms of use." },
  };
  const l = L[lang] || L.ar;
  const payIcons: any = { cash: "💵", cib: "💳", dahabia: "🟡" };
  const idTypeLabel: any = { national: l.idNational, passport: l.idPassport, permit: l.idPermit };

  const validate = () => {
    const e: any = {};
    if (!form.fullName.trim()) e.fullName = l.required;
    if (!form.phone.trim()) e.phone = l.required;
    if (!form.wilaya) e.wilaya = l.required;
    if (!form.address.trim()) e.address = l.required;
    if (!form.idNumber.trim()) e.idNumber = l.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(2); };

  const handleConfirm = async () => {
    const newBooking = {
      ref: bookingRef, car_id: car.id, car_name: car.name, car_img: car.img,
      agency_id: agency?.id, user_id: currentUser?.phone,
      client_name: form.fullName, client_phone: form.phone, client_email: form.email,
      wilaya: form.wilaya, address: form.address, id_type: form.idType, id_number: form.idNumber,
      from_date: fromDate, to_date: toDate, days, pickup_time: form.pickupTime,
      notes: form.notes, pay_method: form.payMethod, price: car.price, fee, total: grandTotal,
      status: "pending", created_at: new Date().toISOString(),
    };
    if (addBooking) await addBooking(newBooking);
    else setBookings((prev: any) => [...prev, newBooking]);
    setStep(3);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 5% 60px" }}>
      {step < 3 && (
        <button onClick={step === 1 ? goBack : () => setStep(1)} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:26,fontSize:13}}>
          <Ic.Back/>{l.back}
        </button>
      )}
      {step < 3 && (
        <div style={{display:"flex",alignItems:"center",marginBottom:36,gap:0}}>
          {[{n:1,label:l.step1},{n:2,label:l.step2}].map((s: any,i: number)=>(
            <div key={s.n} style={{display:"flex",alignItems:"center",flex:i===0?1:"auto"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:step>=s.n?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:step===s.n?"2px solid #A855F7":step>s.n?"none":"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:800,transition:"all .3s",boxShadow:step>=s.n?"0 4px 18px rgba(124,58,237,.4)":"none"}}>
                  {step>s.n?<Ic.Check/>:s.n}
                </div>
                <span style={{fontSize:11,fontWeight:600,color:step>=s.n?"#C084FC":"rgba(255,255,255,.28)",whiteSpace:"nowrap"}}>{s.label}</span>
              </div>
              {i===0&&<div style={{flex:1,height:2,background:step>1?"linear-gradient(90deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.07)",margin:"0 12px",marginBottom:20,borderRadius:1,transition:"all .4s"}}/>}
            </div>
          ))}
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16,alignItems:"start"}}>
        {/* STEP 1 */}
        {step===1&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:26}}>
              <h1 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:5}}>{l.personal}</h1>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{l.personalSub}</p>
            </div>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:20}}>
              <div><label style={LS}>{l.fullName} <span style={{color:"#EF4444"}}>*</span></label>
                <input value={form.fullName} onChange={set("fullName")} placeholder={l.fullNamePh} style={errors.fullName?IS_ERR:IS}/>
                {errors.fullName&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.fullName}</div>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><label style={LS}>{l.phone} <span style={{color:"#EF4444"}}>*</span></label>
                  <input value={form.phone} onChange={set("phone")} placeholder={l.phonePh} style={errors.phone?IS_ERR:IS} type="tel"/>
                  {errors.phone&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.phone}</div>}
                </div>
                <div><label style={LS}>{l.email}</label>
                  <input value={form.email} onChange={set("email")} placeholder={l.emailPh} style={IS} type="email"/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div><label style={LS}>{l.wilaya} <span style={{color:"#EF4444"}}>*</span></label>
                  <select value={form.wilaya} onChange={set("wilaya")} style={{...IS,background:"#0D0D1E",cursor:"pointer",...(errors.wilaya?{borderColor:"rgba(239,68,68,.5)"}:{})}}>
                    <option value="">{l.wilayaPh}</option>
                    {ALL_WILAYAS.map((w: any)=><option key={w.c} value={w.c}>{w.c} — {lang==="fr"?w.fr:w.ar}</option>)}
                  </select>
                  {errors.wilaya&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.wilaya}</div>}
                </div>
                <div><label style={LS}>{l.address} <span style={{color:"#EF4444"}}>*</span></label>
                  <input value={form.address} onChange={set("address")} placeholder={l.addressPh} style={errors.address?IS_ERR:IS}/>
                  {errors.address&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.address}</div>}
                </div>
              </div>
              <div style={{background:"rgba(124,58,237,.06)",border:"1px solid rgba(124,58,237,.2)",borderRadius:14,padding:"18px 20px"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#C084FC",marginBottom:14,display:"flex",alignItems:"center",gap:7}}><Ic.Shield/>{l.idType}</div>
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                  {[{k:"national",icon:"🪪",label:l.idNational},{k:"passport",icon:"📗",label:l.idPassport},{k:"permit",icon:"🚗",label:l.idPermit}].map((opt: any)=>(
                    <button key={opt.k} onClick={()=>setForm((f: any)=>({...f,idType:opt.k}))}
                      style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:10,border:`2px solid ${form.idType===opt.k?"#7C3AED":"rgba(255,255,255,.1)"}`,background:form.idType===opt.k?"rgba(124,58,237,.2)":"rgba(255,255,255,.03)",color:form.idType===opt.k?"#C084FC":"rgba(255,255,255,.45)",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s"}}>
                      <span>{opt.icon}</span>{opt.label}
                    </button>
                  ))}
                </div>
                <div><label style={{...LS,color:"rgba(255,255,255,.5)"}}>{l.idNumber} <span style={{color:"#EF4444"}}>*</span></label>
                  <input value={form.idNumber} onChange={set("idNumber")} placeholder={l.idNumberPh} style={errors.idNumber?IS_ERR:IS}/>
                  {errors.idNumber&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>⚠️ {errors.idNumber}</div>}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[{k:"cash",icon:"💵",label:l.cash,sub:lang==="ar"?"ادفع عند استلام السيارة":lang==="fr"?"Payez à la livraison":"Pay on pickup"},{k:"cib",icon:"💳",label:"CIB",sub:"Carte CIB Algérie"},{k:"dahabia",icon:"🟡",label:"Dahabia",sub:"CCP / Poste Algérie"}].map((pm: any)=>(
                  <button key={pm.k} onClick={()=>setForm((f: any)=>({...f,payMethod:pm.k}))}
                    style={{padding:"14px 10px",borderRadius:12,border:`2px solid ${form.payMethod===pm.k?"#7C3AED":"rgba(255,255,255,.09)"}`,background:form.payMethod===pm.k?"rgba(124,58,237,.16)":"rgba(255,255,255,.02)",cursor:"pointer",textAlign:"center",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <span style={{fontSize:24}}>{pm.icon}</span>
                    <span style={{fontSize:11,fontWeight:800,color:form.payMethod===pm.k?"#C084FC":"rgba(255,255,255,.55)"}}>{pm.label}</span>
                    <span style={{fontSize:9,color:"rgba(255,255,255,.28)",lineHeight:1.3}}>{pm.sub}</span>
                  </button>
                ))}
              </div>
              <div><label style={LS}>{l.notes}</label>
                <textarea value={form.notes} onChange={set("notes")} placeholder={l.notesPh} rows={3} style={{...IS,resize:"vertical",lineHeight:1.7}}/>
              </div>
              <BtnGlow onClick={handleNext} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"14px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:"0 6px 24px rgba(124,58,237,.4)"}}>
                {l.next}
              </BtnGlow>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step===2&&(
          <div style={{animation:"fadeUp .4s ease both"}}>
            <div style={{marginBottom:26}}>
              <h1 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:5}}>{l.summaryTitle}</h1>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{lang==="ar"?"راجع بياناتك قبل تأكيد الحجز":lang==="fr"?"Vérifiez avant de confirmer":"Review before confirming"}</p>
            </div>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:24,marginBottom:18}}>
              <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:20,paddingBottom:16,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
                <img src={car.img} alt="" style={{width:88,height:62,objectFit:"cover",borderRadius:10,border:"2px solid rgba(124,58,237,.3)"}}/>
                <div>
                  <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:2}}>{car.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{agency&&(lang==="ar"?agency.ar:agency.fr)}</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  {icon:"🧑",label:l.fullName,val:form.fullName},
                  {icon:"📞",label:l.phone,val:form.phone},
                  {icon:"✉️",label:l.email,val:form.email||"—"},
                  {icon:"📍",label:l.wilaya,val:ALL_WILAYAS.find((w: any)=>w.c===form.wilaya)?.[lang==="fr"?"fr":"ar"]||"—"},
                  {icon:"🏠",label:l.address,val:form.address},
                  {icon:"🪪",label:l.idType,val:`${idTypeLabel[form.idType]} — ${form.idNumber}`},
                  {icon:"⏰",label:l.pickupTime,val:form.pickupTime},
                  {icon:payIcons[form.payMethod],label:l.payMethod,val:l[form.payMethod]},
                ].map((r: any,i: number)=>(
                  <div key={i} style={{background:"rgba(255,255,255,.04)",borderRadius:11,padding:"11px 13px"}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:3,display:"flex",alignItems:"center",gap:5}}><span>{r.icon}</span>{r.label}</div>
                    <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{r.val}</div>
                  </div>
                ))}
              </div>
              {[{l:l.datesLabel,v:`${fromDate} → ${toDate}`},{l:l.durationLabel,v:`${days} ${lang==="ar"?"يوم":lang==="fr"?"jours":"days"}`},{l:l.feeLabel,v:`${fee.toLocaleString()} دج`},{l:l.totalLabel,v:`${grandTotal.toLocaleString()} دج`,bold:true}].map((r: any,i: number)=>(
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none",marginTop:i===0?12:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"rgba(255,255,255,.45)"}}>{r.l}</div>
                  <span style={{fontSize:r.bold?16:13,fontWeight:r.bold?800:600,color:r.bold?"#34D399":"#fff"}}>{r.v}</span>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(245,158,11,.05)",border:"1px solid rgba(245,158,11,.2)",borderRadius:12,padding:"12px 16px",marginBottom:18,fontSize:12,color:"rgba(255,255,255,.45)",display:"flex",gap:9,alignItems:"flex-start"}}>
              <span style={{fontSize:16,flexShrink:0}}>ℹ️</span><span>{l.termsNote}</span>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setStep(1)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.55)",padding:"13px 24px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:600}}>
                ← {l.back}
              </button>
              <BtnGlow onClick={handleConfirm} style={{flex:1,background:"linear-gradient(135deg,#059669,#34D399)",border:"none",color:"#fff",padding:"13px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:"0 6px 24px rgba(52,211,153,.3)"}}>
                <Ic.Check/>{l.confirm}
              </BtnGlow>
            </div>
          </div>
        )}

        {/* STEP 3 SUCCESS */}
        {step===3&&(
          <div style={{gridColumn:"1/-1",display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 20px",animation:"fadeUp .5s ease both"}}>
            <div style={{width:110,height:110,borderRadius:"50%",background:"linear-gradient(135deg,rgba(52,211,153,.22),rgba(16,185,129,.14))",border:"2px solid rgba(52,211,153,.45)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,animation:"successPop .6s cubic-bezier(.34,1.56,.64,1) both",boxShadow:"0 0 60px rgba(52,211,153,.25)"}}>
              <span style={{fontSize:50}}>🎉</span>
            </div>
            <h1 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:10,textAlign:"center"}}>{l.successTitle}</h1>
            <p style={{fontSize:14,color:"rgba(255,255,255,.5)",marginBottom:28,textAlign:"center",maxWidth:500,lineHeight:1.8}}>{l.successMsg}</p>
            <div style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.35)",borderRadius:14,padding:"14px 32px",marginBottom:32,textAlign:"center"}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"1px"}}>{l.successRef}</div>
              <div style={{fontSize:22,fontWeight:900,color:"#C084FC",letterSpacing:"3px"}}>{bookingRef}</div>
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
              <BtnGlow onClick={onSuccess} style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"12px 28px",borderRadius:11,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>
                <Ic.Home/>{l.backHome}
              </BtnGlow>
              {agency?.phone&&(
                <a href={`tel:${agency.phone}`} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.3)",color:"#34D399",padding:"12px 24px",borderRadius:11,fontSize:14,fontWeight:700,textDecoration:"none"}}>
                  <Ic.Phone/>{l.callAgency}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
