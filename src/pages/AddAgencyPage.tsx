import { useState } from "react";
import { Ic } from "../components/Icons";
import { ALL_WILAYAS } from "../data/wilayas";

interface Props {
  t: any;
  lang: string;
  onBack: () => void;
}

export function AddAgencyPage({ t, lang, onBack }: Props) {
  const ap = t.addPage;
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", owner: "", wilaya: "", phone: "", email: "", cars: "", address: "", desc: "" });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  if (done) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5%" }}>
        <div style={{ background: "rgba(52,211,153,.07)", border: "1px solid rgba(52,211,153,.22)", borderRadius: 20, padding: 40, textAlign: "center", maxWidth: 440, width: "100%", animation: "successPop .6s cubic-bezier(.34,1.56,.64,1) both" }}>
          <div style={{ fontSize: 58, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#34D399", marginBottom: 10 }}>{ap.successTitle}</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, lineHeight: 1.8 }}>{ap.successMsg}</p>
          <button onClick={onBack} style={{ marginTop: 24, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "11px 28px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
            {lang === "ar" ? "العودة للرئيسية" : lang === "fr" ? "Retour" : "Go Back"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 5%" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
        <Ic.Back />{t.back}
      </button>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{ap.title}</h1>
        <p style={{ color: "rgba(255,255,255,.42)", fontSize: 14 }}>{ap.sub}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }} className="dg">
        {/* Form */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: 28 }}>
          {/* Steps */}
          <div style={{ display: "flex", gap: 0, marginBottom: 28, background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 4 }}>
            {[ap.step1, ap.step2, ap.step3].map((s, i) => (
              <button key={i} onClick={() => setStep(i + 1)} style={{ flex: 1, background: step === i + 1 ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", border: "none", color: step === i + 1 ? "#fff" : "rgba(255,255,255,.38)", padding: "9px 6px", borderRadius: 9, cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all .2s" }}>{s}</button>
            ))}
          </div>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ l: ap.nameLabel, ph: ap.namePh, k: "name" }, { l: ap.ownerLabel, ph: ap.ownerPh, k: "owner" }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{f.l}</label>
                  <input value={(form as any)[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.ph} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "10px 13px", fontSize: 14 }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{ap.wilayaLabel}</label>
                <select value={form.wilaya} onChange={e => set("wilaya", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: form.wilaya ? "#fff" : "rgba(255,255,255,.35)", padding: "10px 13px", fontSize: 14 }}>
                  <option value="">{lang === "ar" ? "اختر الولاية" : "Choisir la wilaya"}</option>
                  {ALL_WILAYAS.map(w => <option key={w.c} value={w.c}>{lang === "fr" ? w.fr : w.ar}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{ap.carsLabel}</label>
                <input type="number" min="1" value={form.cars} onChange={e => set("cars", e.target.value)} placeholder="5" style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "10px 13px", fontSize: 14 }} />
              </div>
              <button onClick={() => setStep(2)} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, marginTop: 4 }}>
                {lang === "ar" ? "التالي ←" : lang === "fr" ? "Suivant →" : "Next →"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ l: ap.phoneLabel, ph: ap.phonePh, k: "phone", type: "tel" }, { l: ap.emailLabel, ph: ap.emailPh, k: "email", type: "email" }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{f.l}</label>
                  <input type={f.type} value={(form as any)[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.ph} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "10px 13px", fontSize: 14 }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{ap.addressLabel}</label>
                <input value={form.address} onChange={e => set("address", e.target.value)} placeholder={ap.addressPh} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "10px 13px", fontSize: 14 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7 }}>{ap.descLabel}</label>
                <textarea value={form.desc} onChange={e => set("desc", e.target.value)} placeholder={ap.descPh} rows={4} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", padding: "10px 13px", fontSize: 14, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.65)", padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>← {lang === "ar" ? "السابق" : "Retour"}</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  {lang === "ar" ? "التالي ←" : "Suivant →"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(124,58,237,.07)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 13, padding: 18 }}>
                {[{ l: ap.nameLabel, v: form.name }, { l: ap.ownerLabel, v: form.owner }, { l: ap.wilayaLabel, v: form.wilaya }, { l: ap.phoneLabel, v: form.phone }, { l: ap.emailLabel, v: form.email }].map((r, i) => (
                  r.v ? (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: 13 }}>
                      <span style={{ color: "rgba(255,255,255,.42)" }}>{r.l}</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{r.v}</span>
                    </div>
                  ) : null
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.65)", padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>← {lang === "ar" ? "السابق" : "Retour"}</button>
                <button onClick={() => setDone(true)} style={{ flex: 2, background: "linear-gradient(135deg,#059669,#10B981)", border: "none", color: "#fff", padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  {ap.submitBtn} ✓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits sidebar */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 16 }}>{ap.benefitsTitle}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ap.benefits.map((b: string, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic.Check />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
