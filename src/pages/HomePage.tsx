import { Ic } from "../components/Icons";
import { AgencyLogo } from "../components/AgencyLogo";
import { Stars, Chip, BtnGlow } from "../components/UI";
import { AGENCIES } from "../data/agencies";
import { ALL_WILAYAS } from "../data/wilayas";
import { Car } from "../data/cars";
import { Agency } from "../data/agencies";

const tl: Record<string, any> = {
  instant:    { ar: "حجز فوري",    fr: "Réservation instantanée", en: "Instant" },
  freeCancel: { ar: "إلغاء مجاني", fr: "Annulation gratuite",     en: "Free cancel" },
  verified:   { ar: "وكالة موثقة", fr: "Agence vérifiée",         en: "Verified agency" },
};
const tc: Record<string, any> = {
  instant:    { c: "#FDE68A", bg: "rgba(253,230,138,.08)", br: "rgba(253,230,138,.22)" },
  freeCancel: { c: "#86EFAC", bg: "rgba(134,239,172,.08)", br: "rgba(134,239,172,.22)" },
  verified:   { c: "#93C5FD", bg: "rgba(147,197,253,.08)", br: "rgba(147,197,253,.22)" },
};

interface Props {
  t: any;
  lang: string;
  rtl: boolean;
  darkMode: boolean;
  fType: string;
  setFType: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  wilaya: string;
  setWilaya: (v: string) => void;
  ddOpen: boolean;
  setDdOpen: (v: boolean) => void;
  selBrand: string;
  setSelBrand: (v: string) => void;
  filteredCars: Car[];
  weddingCars: Car[];
  wilayaLabel: string;
  openCar: (car: Car) => void;
  openAgency: (ag: Agency) => void;
  openMsgs: (agId?: number) => void;
  openAddAgency: () => void;
}

export function HomePage({
  t, lang, rtl, darkMode, fType, setFType, sort, setSort,
  wilaya, setWilaya, ddOpen, setDdOpen, selBrand, setSelBrand,
  filteredCars, weddingCars, wilayaLabel,
  openCar, openAgency, openMsgs, openAddAgency,
}: Props) {
  const dm = darkMode;
  const ag = (id: number) => AGENCIES.find(a => a.id === id);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "60px 5% 48px", overflow: "hidden", background: "linear-gradient(180deg,#07071A,#06060F)" }}>
        <div className="glow" style={{ width: 420, height: 420, background: "#5B21B6", opacity: 0.11, top: -80, right: "20%" }} />
        <div className="glow" style={{ width: 280, height: 280, background: "#4F46E5", opacity: 0.09, bottom: -60, left: "10%" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.28)", color: "#C084FC", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>
            {t.flag} {t.tagline}
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.18, marginBottom: 16, letterSpacing: "-1.5px" }}>
            {lang === "ar" ? <>احجز سيارتك<br /><span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>في ثوانٍ</span></> : lang === "fr" ? <>Louez votre voiture<br /><span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>en quelques secondes</span></> : <>Book your car<br /><span style={{ background: "linear-gradient(135deg,#A855F7,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in seconds</span></>}
          </h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 15, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            {lang === "ar" ? "أفضل وكالات تأجير السيارات في 58 ولاية جزائرية" : lang === "fr" ? "Les meilleures agences de location dans 58 wilayas" : "Best car rental agencies across 58 Algerian wilayas"}
          </p>

          {/* Search bar */}
          <div style={{ background: dm ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)", border: `1px solid ${dm ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)"}`, borderRadius: 16, padding: "14px 16px", maxWidth: 540, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "end" }}>
              <div style={{ position: "relative", minWidth: 0 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.33)", fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "1.2px" }}>
                  <Ic.Pin />{t.wilaya}
                </label>
                <button onClick={() => setDdOpen(!ddOpen)} style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.11)", borderRadius: 10, color: "#fff", padding: "9px 13px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden" }}>
                  <span style={{ color: wilaya ? "#fff" : "rgba(255,255,255,.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "start" }}>{wilayaLabel}</span>
                  <span style={{ flexShrink: 0 }}><Ic.ChevD /></span>
                </button>
                {ddOpen && (
                  <div className="dd" style={{ position: "absolute", top: "105%", left: 0, right: 0, zIndex: 99, background: "#0E0E20", border: "1px solid rgba(255,255,255,.11)", borderRadius: 12, overflow: "hidden", maxHeight: 280, overflowY: "auto" }}>
                    <div onClick={() => { setWilaya(""); setDdOpen(false); }} style={{ padding: "9px 13px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,.08)", background: !wilaya ? "rgba(124,58,237,.15)" : "transparent", color: !wilaya ? "#C084FC" : "rgba(255,255,255,.55)", fontWeight: 600 }}>
                      🇩🇿 {t.allWilayas}
                    </div>
                    {ALL_WILAYAS.map(w => (
                      <div key={w.c} onClick={() => { setWilaya(w.c); setDdOpen(false); }} style={{ padding: "8px 14px", cursor: "pointer", fontSize: 13, color: wilaya === w.c ? "#C084FC" : "rgba(255,255,255,.72)", background: wilaya === w.c ? "rgba(124,58,237,.14)" : "transparent", borderRight: wilaya === w.c ? "3px solid #7C3AED" : "3px solid transparent", display: "flex", alignItems: "center", gap: 9 }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", minWidth: 20 }}>{w.c}</span>
                        <span>{lang === "fr" ? w.fr : w.ar}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <BtnGlow style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "11px 22px", borderRadius: 11, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 7 }}>
                <Ic.Search />{t.searchBtn}
              </BtnGlow>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARS SECTION ── */}
      <section style={{ padding: "52px 5%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>
            {lang === "ar" ? "السيارات المتاحة" : lang === "fr" ? "Voitures disponibles" : "Available Cars"}
          </h2>
          <div style={{ display: "flex", gap: 7 }}>
            {[{ k: "pop", l: t.sort.pop }, { k: "new", l: t.sort.new }, { k: "cheap", l: t.sort.cheap }].map(s => (
              <button key={s.k} onClick={() => setSort(s.k)} style={{ background: sort === s.k ? "rgba(124,58,237,.2)" : "transparent", border: `1px solid ${sort === s.k ? "rgba(124,58,237,.5)" : "rgba(255,255,255,.09)"}`, color: sort === s.k ? "#C084FC" : "rgba(255,255,255,.42)", padding: "5px 11px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{s.l}</button>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {[{ k: "all", i: "🚘", ar: "الكل", fr: "Tous", en: "All" }, { k: "sedan", i: "🚗", ar: "سيدان", fr: "Berline", en: "Sedan" }, { k: "suv", i: "🚙", ar: "SUV", fr: "SUV", en: "SUV" }, { k: "4x4", i: "🏔️", ar: "4×4", fr: "4×4", en: "4×4" }, { k: "luxury", i: "💎", ar: "فاخرة", fr: "Luxe", en: "Luxury" }, { k: "electric", i: "⚡", ar: "كهربائية", fr: "Électrique", en: "Electric" }, { k: "van", i: "🚐", ar: "فان", fr: "Van", en: "Van" }, { k: "wedding", i: "💍", ar: "زفاف", fr: "Mariage", en: "Wedding" }].map(f => (
            <button key={f.k} onClick={() => setFType(f.k)} style={{ display: "flex", alignItems: "center", gap: 7, background: fType === f.k ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.04)", border: `2px solid ${fType === f.k ? "transparent" : "rgba(255,255,255,.08)"}`, color: fType === f.k ? "#fff" : "rgba(255,255,255,.5)", padding: "8px 16px", borderRadius: 24, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer", transition: "all .22s", flexShrink: 0, boxShadow: fType === f.k ? "0 4px 18px rgba(124,58,237,.4)" : "none" }}>
              <span style={{ fontSize: 15 }}>{f.i}</span>
              {lang === "ar" ? f.ar : lang === "fr" ? f.fr : f.en}
            </button>
          ))}
        </div>

        {/* Cars grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {filteredCars.map((car, idx) => (
            <div key={car.id} className="hov" onClick={() => openCar(car)} style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${car.wedding ? "rgba(236,72,153,.15)" : "rgba(255,255,255,.07)"}`, borderRadius: 18, overflow: "hidden", cursor: "pointer", animation: `fadeUp .45s ease ${idx * .07}s both` }}>
              <div style={{ position: "relative", height: 188, overflow: "hidden" }}>
                <img className="iz" src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: car.wedding ? "rgba(236,72,153,.2)" : "rgba(124,58,237,.2)", border: `1px solid ${car.wedding ? "rgba(236,72,153,.4)" : "rgba(124,58,237,.4)"}`, color: car.wedding ? "#F9A8D4" : "#C084FC", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  {car.wedding ? <Ic.Rings /> : <Ic.Car />}{car.badge}
                </div>
                <div style={{ position: "absolute", bottom: 8, left: 10, right: 10, display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {car.tags.map(tag => <Chip key={tag} icon={tag === "instant" ? <Ic.Bolt /> : tag === "freeCancel" ? <Ic.Refresh /> : <Ic.Check />} label={tl[tag]?.[lang === "fr" ? "fr" : lang === "en" ? "en" : "ar"]} c={tc[tag]?.c} bg={tc[tag]?.bg} br={tc[tag]?.br} />)}
                </div>
              </div>
              <div style={{ padding: "13px 15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{car.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.33)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                      <Ic.Cal />{car.year} <Ic.Users />{car.seats}
                    </div>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <span style={{ fontSize: 19, fontWeight: 800, color: car.wedding ? "#F9A8D4" : "#C084FC" }}>{car.price.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.32)" }}> {t.cur}{t.perDay}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {ag(car.agencyId) && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <AgencyLogo agency={ag(car.agencyId)!} size={24} />
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,.42)" }}>{lang === "ar" ? ag(car.agencyId)!.ar : ag(car.agencyId)!.fr}</span>
                    </div>
                  )}
                  <Stars r={car.rating} />
                </div>
              </div>
            </div>
          ))}
          {filteredCars.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "52px 0", color: "rgba(255,255,255,.28)" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
              <div style={{ fontSize: 14 }}>{lang === "ar" ? "لا توجد سيارات" : "Aucun résultat"}</div>
            </div>
          )}
        </div>
      </section>

      {/* ── WEDDING SECTION ── */}
      <section id="wed" style={{ padding: "56px 5%", background: "linear-gradient(180deg,#09091A,#0E041A)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(236,72,153,.1)", border: "1px solid rgba(236,72,153,.25)", color: "#F9A8D4", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
            <Ic.Rings />{t.filters.wedding}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 9 }}>{t.wTitle}</h2>
          <p style={{ color: "rgba(255,255,255,.38)", fontSize: 14, maxWidth: 480, margin: "0 auto" }}>{t.wDesc}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20 }}>
          {weddingCars.map((car, idx) => (
            <div key={car.id} className="hov" onClick={() => openCar(car)} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(236,72,153,.14)", borderRadius: 18, overflow: "hidden", cursor: "pointer", animation: `fadeUp .5s ease ${idx * .1}s both` }}>
              <div style={{ position: "relative", height: 198, overflow: "hidden" }}>
                <img className="iz" src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%)" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(236,72,153,.18)", border: "1px solid rgba(236,72,153,.4)", color: "#F9A8D4", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Ic.Rings />{t.wBadge}
                </div>
                <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{car.name}</div>
                  <Stars r={car.rating} />
                </div>
              </div>
              <div style={{ padding: "12px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.32)", marginBottom: 2 }}>{t.wPerDay}</div>
                  <span style={{ fontSize: 19, fontWeight: 800, color: "#F9A8D4" }}>{car.price.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.32)" }}> {t.cur}</span>
                </div>
                <BtnGlow style={{ background: "linear-gradient(135deg,#9D174D,#EC4899)", border: "none", color: "#fff", padding: "8px 15px", borderRadius: 9, fontSize: 13, fontWeight: 700 }}>{t.book}</BtnGlow>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "64px 5%", background: "#06060F" }}>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, marginBottom: 44, color: "#fff" }}>{t.howTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 20, maxWidth: 800, margin: "0 auto" }}>
          {[{ n: "01", i: <Ic.Map />, t: t.s1t, d: t.s1d, col: "#7C3AED" }, { n: "02", i: <Ic.Cal />, t: t.s2t, d: t.s2d, col: "#2563EB" }, { n: "03", i: <Ic.Car />, t: t.s3t, d: t.s3d, col: "#059669" }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 12, right: 14, fontSize: 40, fontWeight: 900, color: "rgba(255,255,255,.04)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${s.col}22`, border: `1px solid ${s.col}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: s.col }}>{s.i}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 7 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", lineHeight: 1.7 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AGENCIES ── */}
      <section id="ags" style={{ padding: "52px 5%", background: "#09091A" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 24 }}>{t.agTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {AGENCIES.map((a, i) => (
            <div key={a.id} className="hov" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 18, animation: `fadeUp .5s ease ${i * .07}s both` }}>
              <div style={{ display: "flex", gap: 13, alignItems: "center", marginBottom: 14 }}>
                <AgencyLogo agency={a} size={52} style={{ border: "2px solid rgba(124,58,237,.35)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{lang === "ar" ? a.ar : a.fr}</span>
                    {a.verified && <span style={{ color: "#34D399", display: "flex" }}><Ic.Shield /></span>}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", display: "flex", alignItems: "center", gap: 3 }}><Ic.Pin />{lang === "ar" ? a.city.ar : a.city.fr}</div>
                  <Stars r={a.rating} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                <BtnGlow onClick={() => openAgency(a)} style={{ flex: 1, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{t.viewAgency}</BtnGlow>
                <button onClick={() => openMsgs(a.id)} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.65)", padding: "8px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                  <Ic.Msg />{lang === "ar" ? "راسل" : lang === "fr" ? "Message" : "Msg"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ margin: "0 5% 52px", borderRadius: 20, background: "linear-gradient(135deg,rgba(124,58,237,.16),rgba(99,102,241,.16))", border: "1px solid rgba(124,58,237,.28)", padding: "48px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="glow" style={{ width: 220, height: 220, background: "#5B21B6", opacity: 0.16, top: -60, left: "42%" }} />
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 9 }}>{t.ctaT}</h2>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, marginBottom: 24 }}>{t.ctaD}</p>
        <BtnGlow onClick={openAddAgency} style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", padding: "12px 30px", borderRadius: 11, fontSize: 15, fontWeight: 700 }}>{t.listCar} →</BtnGlow>
      </section>
    </>
  );
}
