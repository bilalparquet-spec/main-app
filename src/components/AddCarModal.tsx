import { useState } from "react";
import { CAR_BRANDS } from "../data/static";

const TYPES = [
  {k:"sedan",ar:"سيدان",fr:"Berline",en:"Sedan"},
  {k:"suv",ar:"SUV",fr:"SUV",en:"SUV"},
  {k:"luxury",ar:"فاخرة",fr:"Luxe",en:"Luxury"},
  {k:"electric",ar:"كهربائية",fr:"Électrique",en:"Electric"},
  {k:"van",ar:"فان",fr:"Van",en:"Van"},
  {k:"wedding",ar:"زفاف",fr:"Mariage",en:"Wedding"},
  {k:"4x4",ar:"4×4",fr:"4×4",en:"4×4"},
];

export function AddCarModal({ lang, darkMode, agencies, allWilayas, onClose, onAdd }: any) {
  const dm = darkMode;
  const [form, setForm] = useState<any>({ name: "", brand: "", type: "sedan", price: "", year: new Date().getFullYear(), seats: 5, agencyId: "", wilaya: "", badge: "سيدان", img: "" });
  const [step, setStep] = useState(1);
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));

  const IS: any = { width: "100%", background: dm ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)", border: `1px solid ${dm ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)"}`, borderRadius: 10, color: dm ? "#fff" : "#1A1A2E", padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };
  const LS: any = { display: "block", fontSize: 11, fontWeight: 700, color: dm ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.45)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 };

  const submit = () => {
    if (!form.name || !form.price) return;
    const tp = TYPES.find((x: any) => x.k === form.type);
    onAdd({ ...form, price: +form.price, year: +form.year, seats: +form.seats, badge: tp ? tp.ar : form.type, img: form.img || "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" });
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,.8)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={(e: any) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: dm ? "#0D0D1E" : "#fff", border: `1px solid ${dm ? "rgba(124,58,237,.35)" : "rgba(124,58,237,.2)"}`, borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", animation: "fadeUp .35s ease both" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.3),rgba(99,102,241,.15))", borderRadius: "24px 24px 0 0", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{lang === "ar" ? "إضافة سيارة جديدة" : lang === "fr" ? "Ajouter un véhicule" : "Add New Car"}</h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{lang === "ar" ? "أدخل بيانات سيارتك" : lang === "fr" ? "Entrez les infos du véhicule" : "Enter vehicle details"}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "rgba(255,255,255,.7)", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ padding: "28px" }}>
          {/* Steps */}
          <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
            {[1, 2].map((s: number, i: number) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: i === 0 ? 1 : "auto" as any }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                    {step > s ? "✓" : s}
                  </div>
                  <span style={{ fontSize: 10, color: step >= s ? "#C084FC" : "rgba(255,255,255,.3)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {s === 1 ? (lang === "ar" ? "معلومات السيارة" : lang === "fr" ? "Infos véhicule" : "Car Info") : (lang === "ar" ? "التفاصيل" : lang === "fr" ? "Détails" : "Details")}
                  </span>
                </div>
                {i === 0 && <div style={{ flex: 1, height: 2, background: step > 1 ? "linear-gradient(90deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.08)", margin: "0 10px", marginBottom: 20, borderRadius: 1 }} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .3s ease both" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={LS}>{lang === "ar" ? "اسم السيارة" : lang === "fr" ? "Nom du véhicule" : "Car Name"}</label>
                  <input value={form.name} onChange={set("name")} placeholder={lang === "ar" ? "مثال: Toyota Corolla" : "Ex: Toyota Corolla"} style={IS} />
                </div>
                <div>
                  <label style={LS}>{lang === "ar" ? "العلامة التجارية" : lang === "fr" ? "Marque" : "Brand"}</label>
                  <select value={form.brand} onChange={set("brand")} style={{ ...IS, background: "#0D0D1E", cursor: "pointer" }}>
                    <option value="">{lang === "ar" ? "اختر العلامة" : lang === "fr" ? "Choisir" : "Select brand"}</option>
                    {CAR_BRANDS.map((b: string) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={LS}>{lang === "ar" ? "نوع السيارة" : lang === "fr" ? "Type de véhicule" : "Car Type"}</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {TYPES.map((tp: any) => (
                    <button key={tp.k} onClick={() => setForm((f: any) => ({ ...f, type: tp.k, badge: tp.ar }))}
                      style={{ padding: "9px", borderRadius: 10, border: `2px solid ${form.type === tp.k ? "#7C3AED" : "rgba(255,255,255,.1)"}`, background: form.type === tp.k ? "rgba(124,58,237,.2)" : "rgba(255,255,255,.03)", color: form.type === tp.k ? "#C084FC" : dm ? "rgba(255,255,255,.55)" : "#666", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all .2s" }}>
                      {lang === "ar" ? tp.ar : lang === "fr" ? tp.fr : tp.en}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={LS}>{lang === "ar" ? "السعر/يوم (دج)" : lang === "fr" ? "Prix/jour (DA)" : "Price/day (DZD)"}</label>
                  <input type="number" value={form.price} onChange={set("price")} placeholder="5000" style={IS} />
                </div>
                <div>
                  <label style={LS}>{lang === "ar" ? "سنة الصنع" : lang === "fr" ? "Année" : "Year"}</label>
                  <input type="number" value={form.year} onChange={set("year")} min="2010" max="2025" style={IS} />
                </div>
              </div>
              <button onClick={() => setStep(2)} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "12px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {lang === "ar" ? "التالي ←" : "Next →"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .3s ease both" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={LS}>{lang === "ar" ? "عدد المقاعد" : lang === "fr" ? "Places" : "Seats"}</label>
                  <input type="number" value={form.seats} onChange={set("seats")} min="2" max="20" style={IS} />
                </div>
                <div>
                  <label style={LS}>{lang === "ar" ? "الولاية" : lang === "fr" ? "Wilaya" : "Wilaya"}</label>
                  <select value={form.wilaya} onChange={set("wilaya")} style={{ ...IS, background: "#0D0D1E", cursor: "pointer" }}>
                    <option value="">{lang === "ar" ? "اختر الولاية" : "Select"}</option>
                    {allWilayas.map((w: any) => <option key={w.c} value={w.c}>{w.c} — {lang === "fr" ? w.fr : w.ar}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={LS}>{lang === "ar" ? "الوكالة" : lang === "fr" ? "Agence" : "Agency"}</label>
                <select value={form.agencyId} onChange={(e: any) => setForm((f: any) => ({ ...f, agencyId: +e.target.value }))} style={{ ...IS, background: "#0D0D1E", cursor: "pointer" }}>
                  <option value="">{lang === "ar" ? "اختر الوكالة" : "Select agency"}</option>
                  {agencies.map((a: any) => <option key={a.id} value={a.id}>{lang === "ar" ? a.ar : a.fr}</option>)}
                </select>
              </div>
              <div>
                <label style={LS}>{lang === "ar" ? "رابط صورة السيارة (اختياري)" : lang === "fr" ? "Lien photo (optionnel)" : "Image URL (optional)"}</label>
                <input value={form.img} onChange={set("img")} placeholder="https://..." style={IS} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: dm ? "rgba(255,255,255,.6)" : "#666", padding: "12px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                  {lang === "ar" ? "← السابق" : "← Back"}
                </button>
                <button onClick={submit} style={{ flex: 2, background: "linear-gradient(135deg,#059669,#34D399)", border: "none", color: "#fff", padding: "12px", borderRadius: 11, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  🚗 {lang === "ar" ? "إضافة السيارة" : lang === "fr" ? "Ajouter le véhicule" : "Add Car"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
