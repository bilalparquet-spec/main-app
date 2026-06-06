import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser, getAppLanguage } from "../lib/supabase.js";
import { GuestAuthSheet } from "./GuestAuthSheet.jsx";
import { BookingConfirmSheet } from "./BookingConfirmSheet.jsx";
import {
  IconBack,
  IconLike,
  IconShareUpload,
  IconCompactSeat,
  IconCompactFuel,
  IconCompactGearbox,
  IconOdometer,
  IconStar,
  IconCalendar,
  IconPin,
  IconPhone,
  IconVerified,
} from "./ui/AppIcons.jsx";

const galleryFallback = [
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=88",
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=88",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=88",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=88",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=88",
];

function formatDzd(value) {
  const n = Number(value || 0);
  return `${n.toLocaleString("fr-DZ")} دج`;
}
function formatDzdCompact(value) {
  // مثال: 9 450 دج (مع مسافة قبل دج)
  const n = Number(value || 0);
  return `${n.toLocaleString("fr-DZ")} دج`;
}

function todayPlus(days) {
  return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
}

function formatArabicDate(value) {
  try {
    const lang = getAppLanguage();
    const locale = lang === "fr" ? "fr-DZ" : lang === "en" ? "en-US" : "ar-DZ";
    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(new Date(value));
  } catch (_) {
    return value;
  }
}

function niceFuel(fuel) {
  const f = String(fuel || "بنزين").toLowerCase();
  if (f.includes("كهرب") || f.includes("electric")) return "كهربائي";
  if (f.includes("hybrid") || f.includes("هجين") || f.includes("هيبرد")) return "هيبرد";
  if (f.includes("gas") || f.includes("غاز")) return "غاز";
  if (f.includes("diesel") || f.includes("ديزل")) return "ديزل";
  return "بنزين";
}

function niceGear(trans) {
  const t = String(trans || "أوتوماتيك").toLowerCase();
  if (t.includes("manual") || t.includes("يدوي")) return "يدوي";
  return "أوتوماتيك";
}

function CompactChip({ icon, value }) {
  return (
    <div
      style={{
        display: "inline-flex",
        width: "fit-content",
        maxWidth: "100%",
        alignItems: "center",
        gap: 7,
        minHeight: 34,
        background: "rgba(255,255,255,.078)",
        border: "1px solid rgba(255,255,255,.075)",
        color: "rgba(255,255,255,.9)",
        borderRadius: 10,
        padding: "7px 10px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.035)",
        fontSize: 12,
        fontWeight: 850,
        lineHeight: 1,
      }}
    >
      <span style={{ display: "grid", placeItems: "center", width: 18, height: 18, color: "rgba(255,255,255,.88)" }}>{icon}</span>
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
    </div>
  );
}

function DateLine({ icon, title, value, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr 30px",
        alignItems: "center",
        gap: 9,
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,.68)", display: "grid", placeItems: "center" }}>{icon}</span>
      <div>
        <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>{title}</div>
        <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2 }}>{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label="تعديل"
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          border: "1px solid rgba(167,139,250,.2)",
          background: "rgba(124,58,237,.13)",
          color: "#C4B5FD",
          fontSize: 12,
          fontWeight: 950,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✎
      </button>
    </div>
  );
}

function DateRangeLine({ from, to, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr 30px",
        alignItems: "center",
        gap: 9,
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,.68)", display: "grid", placeItems: "center" }}>
        <IconCalendar size={16} color="currentColor" />
      </span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, minWidth: 0 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>تاريخ الاستلام</div>
          <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{from}</div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>تاريخ الإرجاع</div>
          <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{to}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label="تعديل التاريخين"
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          border: "1px solid rgba(167,139,250,.2)",
          background: "rgba(124,58,237,.13)",
          color: "#C4B5FD",
          fontSize: 12,
          fontWeight: 950,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✎
      </button>
    </div>
  );
}

function ChoiceBox({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 36,
        border: active ? "1px solid rgba(167,139,250,.68)" : "1px solid rgba(255,255,255,.08)",
        borderRadius: 12,
        background: active ? "rgba(124,58,237,.25)" : "rgba(255,255,255,.055)",
        color: active ? "#EDE9FE" : "rgba(255,255,255,.72)",
        fontFamily: "inherit",
        fontWeight: 900,
        fontSize: 12,
        padding: "0 10px",
      }}
    >
      {children}
    </button>
  );
}

export function CarDetail({ car, onBack, liked, onLike, allReviews = [], addReview }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const lang = getAppLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState(todayPlus(1));
  const [returnDate, setReturnDate] = useState(todayPlus(2));
  const [editingDates, setEditingDates] = useState(false);
  const userFullName = user?.user_metadata?.full_name || "";
  const [firstName, setFirstName] = useState(userFullName.split(" ")[0] || "");
  const [lastName, setLastName] = useState(userFullName.split(" ").slice(1).join(" ") || "");
  const [countryCode, setCountryCode] = useState("+213");
  const [clientPhone, setClientPhone] = useState(user?.user_metadata?.phone || "");
  const [driverAge, setDriverAge] = useState("30");
  const [promoOptIn, setPromoOptIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingSyncFailed, setBookingSyncFailed] = useState(false);
  const [bookingPage, setBookingPage] = useState(false);
  // خطوات الحجز: "dates" ← "driver" ← "review"
  const [guestAuthSheet, setGuestAuthSheet] = useState(false);
  const sliderRef = useRef(null);

  const gallery = useMemo(() => {
    const imgs = [car?.img, ...(car?.images || []), ...galleryFallback].filter(Boolean);
    return [...new Set(imgs)].slice(0, 9);
  }, [car]);

  const agency = useMemo(() => ({
    id: car?.agencyId || car?.agency_id || '',
    name: car?.agencyName || car?.agency_name || 'الوكالة',
    wilaya: car?.wilaya || '',
    rating: car?.agencyRating || car?.agency_rating || 0,
    cars: car?.agencyCars || car?.agency_cars || '',
    img: car?.agencyImg || car?.agency_img || '',
  }), [car]);

  const fullDriverName = [firstName, lastName].filter(Boolean).join(" ") || "مستخدم درايف";
  const fullDriverPhone = `${countryCode} ${clientPhone || ""}`.trim();

  // ── تحميل التقييمات من Supabase عند فتح السيارة ──────────────────────────
  const [dbReviews, setDbReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (!car?.id) return;
    let alive = true;
    setReviewsLoading(true);
    import("../lib/supabase.js").then(({ dbSelect }) =>
      dbSelect("reviews", `?car_id=eq.${encodeURIComponent(String(car.id))}&status=eq.approved&order=created_at.desc&limit=20`)
        .then(rows => {
          if (!alive) return;
          setDbReviews((rows || []).map(r => ({
            id:      r.id,
            carId:   r.car_id,
            name:    r.user_name  || "مستخدم",
            avatar:  r.avatar_url || `https://i.pravatar.cc/60?u=${r.id}`,
            rating:  Number(r.rating || 0),
            comment: r.comment   || "",
            date:    r.created_at
              ? new Date(r.created_at).toLocaleDateString("ar-DZ", { day:"numeric", month:"short", year:"numeric" })
              : "مؤخراً",
          })));
        })
        .catch(() => {})
        .finally(() => { if (alive) setReviewsLoading(false); })
    );
    return () => { alive = false; };
  }, [car?.id]);

  // دمج التقييمات: DB أولاً، ثم أي تقييم أضافه المستخدم لتوّه (optimistic)
  const localNew = (allReviews || []).filter(r => Number(r.carId) === Number(car?.id));
  const carReviews = [
    ...localNew,
    ...dbReviews.filter(db => !localNew.some(l => String(l.id) === String(db.id))),
  ];

  const rating = Number(car.rating || 0).toFixed(1).replace(".", ",");
  const trips = car.trips || car.reviews || 0;
  const dailyPrice = car.price || 0;
  const mileage = car.mileage || car.km || "غير محدد";
  // ══ الحل النهائي: state مستقل للأيام — لا اعتماد على date parsing ══
  const [days, setDays] = React.useState(1);
  const baseTotal = dailyPrice * days;
  const platformFee = Math.round(baseTotal * 0.05);
  const total = baseTotal + platformFee;
  const oldDisplayBase = Math.round(baseTotal * 1.1);

  const onSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / w);
    setPhotoIndex(Math.min(Math.max(index, 0), gallery.length - 1));
  };

  const shareCar = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: car.name, text: `RENT درايف - ${car.name}`, url });
      } else {
        await navigator.clipboard?.writeText(url);
        navigator.vibrate?.(20);
      }
    } catch (_) {}
  };

  const submitRating = async () => {
    if (!myRating) return;
    const review = {
      id: Date.now(),
      carId: car.id,
      name: fullDriverName,
      avatar: "https://i.pravatar.cc/60?img=12",
      rating: myRating,
      comment: reviewComment.trim() || "تجربة جيدة مع هذه السيارة.",
      date: "الآن",
    };
    // حفظ في Supabase بحالة pending للمراجعة
    try {
      const { dbInsert } = await import("../lib/supabase.js");
      await dbInsert("reviews", {
        id: "rev"+Date.now(),
        car_id: String(car.id),
        agency_id: String(agency?.id || car.agencyId || ""),
        agency_name: agency?.name || car.agencyName || "",
        user_name: fullDriverName,
        rating: myRating,
        comment: review.comment,
        status: "pending",
      });
    } catch(e){ console.warn("Review save failed:", e.message); }
    addReview?.(review);
    setReviewComment("");
    setMyRating(0);
    navigator.vibrate?.(25);
  };

  const buildBookingPayload = () => ({
    carId: car.id,
    agencyId: agency?.id,
    agencyName: agency?.name || 'الوكالة',
    car: car.name,
    img: car.img,
    wilaya: car.wilaya,
    from: pickupDate,
    to: returnDate,
    days,
    price: total,
    oldDisplayPrice: oldDisplayBase,
    basePrice: baseTotal,
    dailyPrice,
    serviceFee: platformFee,
    pickupPlace: agency?.name || "الوكالة",
    driverName: fullDriverName,
    driverPhone: fullDriverPhone || "غير محدد",
    driverAge,
    rating: myRating || 0,
    status: "pending",
  });

  const confirmBooking = async () => {
    if (bookingSending) return;
    setBookingSending(true);
    setBookingSyncFailed(false);
    const { booking, synced } = await saveBooking(buildBookingPayload());
    setBookingSending(false);
    if (!synced) setBookingSyncFailed(true);
    setBookingPage(false);
    setBookingData({
      carName: car.name,
      agencyName: agency?.name || "",
      dateFrom: pickupDate,
      dateTo: returnDate,
      price: total,
      id: booking.id,
    });
    setBookingDone(true);
    navigator.vibrate?.(35);
  };

  const saveTripOnly = async () => {
    if (bookingSending) return;
    setBookingSending(true);
    await saveBooking(buildBookingPayload());
    setBookingSending(false);
    setBookingPage(false);
    navigator.vibrate?.(25);
    navigate("/trips");
  };

  return (
    <main
      dir={dir}
      style={{
        minHeight: "100vh",
        background: "#050506",
        color: "#fff",
        margin: 0,
        paddingBottom: "calc(88px + env(safe-area-inset-bottom))",
        animation: "fadeIn .24s ease",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          position: "relative",
          height: "clamp(250px, 34vh, 315px)",
          background: "#0D0E1A",
          overflow: "hidden",
        }}
      >
        <div
          ref={sliderRef}
          onScroll={onSliderScroll}
          style={{
            display: "flex",
            height: "100%",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            direction: "ltr",
            touchAction: "pan-x pan-y",
            overscrollBehaviorY: "auto",
          }}
        >
          {gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              draggable={false}
              src={src}
              alt={car.name}
              loading={index === 0 ? "eager" : "lazy"}
              style={{
                flex: "0 0 100%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                scrollSnapAlign: "center",
                display: "block",
              }}
            />
          ))}
        </div>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,.32), rgba(0,0,0,.04) 50%, rgba(0,0,0,.14))" }} />

        <button onClick={onBack} aria-label="رجوع" style={topBackButtonStyle}>
          <IconBack size={22} color="#fff" />
        </button>

        <div style={{ position: "absolute", top: "calc(max(16px, env(safe-area-inset-top)) + 10px)", left: 16, display: "flex", gap: 9 }}>
          <button onClick={onLike} aria-label="مفضلة" style={topActionButtonStyle}>
            <IconLike size={20} active={liked} color="#fff" />
          </button>
          <button onClick={shareCar} aria-label="مشاركة" style={topActionButtonStyle}>
            <IconShareUpload size={19} color="#fff" strokeWidth={2.05} />
          </button>
        </div>

        <div style={photoCounterStyle}>{photoIndex + 1} من {gallery.length}</div>
      </section>

      <section style={{ padding: "14px 18px 12px", background: "linear-gradient(180deg,#060607 0%,#050506 100%)", borderBottom: "1px solid rgba(255,255,255,.055)" }}>
        <h1 data-no-i18n="true" style={{ margin: 0, fontSize: "clamp(23px,5.8vw,29px)", lineHeight: 1.15, fontWeight: 950, letterSpacing: ".1px" }}>{car.name}</h1>

        <div style={{ marginTop: 8, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, color: "rgba(255,255,255,.72)", fontSize: 13.2, lineHeight: 1.3, fontWeight: 750 }}>
          <span>{car.year || 2024} {car.badge || "سيارة"}</span>
          <span style={{ opacity: .35 }}>•</span>
          <span>{rating}</span>
          <IconStar size={15} color="#8B5CF6" filled />
          <span style={{ opacity: .35 }}>•</span>
          <span>({car.trips || 0} رحلة)</span>
        </div>

        <div style={{ marginTop: 9, display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,.82)", fontSize: 12.4, fontWeight: 800 }}>
          <IconVerified size={15} color="#A78BFA" />
          <span>وكالة موثقة</span>
          <span style={{ color: "rgba(255,255,255,.35)" }}>•</span>
          <span>{car.wilaya}</span>
        </div>

        <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <CompactChip icon={<IconCompactSeat size={18} color="currentColor" strokeWidth={2.05} />} value={`${car.seats || 5} مقاعد`} />
          <CompactChip icon={<IconCompactFuel size={18} color="currentColor" strokeWidth={2.05} />} value={niceFuel(car.fuel)} />
          <CompactChip icon={<IconCompactGearbox size={18} color="currentColor" strokeWidth={2.05} />} value={`${niceGear(car.trans)}`} />
        </div>
      </section>

      <section style={{ padding: "13px 18px 20px" }}>
        <div style={{ ...smallCardStyle, marginTop: 0, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src={agency.img} alt={agency.name} style={{ width: 44, height: 44, borderRadius: 15, objectFit: "cover", border: "1px solid rgba(255,255,255,.1)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <strong data-no-i18n="true" style={{ fontSize: 13.6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agency.name}</strong>
                <IconVerified size={14} color="#34D399" />
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.52)", fontSize: 11.3, fontWeight: 750 }}>
                <IconStar size={12} color="#F59E0B" filled />
                <span>{Number(agency.rating || 4.9).toFixed(1).replace(".", ",")}</span>
                <span>•</span>
                <span>{agency.cars} سيارة</span>
                <span>•</span>
                <IconPin size={12} color="rgba(255,255,255,.5)" />
                <span>{agency.wilaya}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...smallCardStyle, marginTop: 12, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 950 }}>تقييمات السيارة</h3>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,.42)", fontSize: 11.1, fontWeight: 700 }}>{carReviews.length || car.reviews || trips} تقييم</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, direction: "ltr" }}>
              {getCurrentUser() ? [1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setMyRating(n)} aria-label={`تقييم ${n}`} style={{ border: "none", background: "transparent", padding: 0, color: n <= myRating ? "#8B5CF6" : "rgba(255,255,255,.26)" }}>
                  <IconStar size={17} color="currentColor" filled />
                </button>
              )) : <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>سجّل للتقييم</span>}
            </div>
          </div>

          {getCurrentUser() && (
            <>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="اكتب تعليقك على السيارة..."
                style={{ ...fieldStyle, minHeight: 68, padding: "10px 12px", resize: "none", lineHeight: 1.5, marginTop: 10 }}
              />
              <button type="button" onClick={submitRating} disabled={!myRating} style={{ ...secondaryButtonStyle, opacity: myRating ? 1 : .48 }}>إضافة تقييم وتعليق</button>
            </>
          )}

          <div style={{ display: "grid", gap: 9, marginTop: 12 }}>
            {reviewsLoading ? (
              [0,1,2].map(i => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "34px 1fr", gap: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.055)", opacity: 1 - i * 0.25 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(255,255,255,.07)", animation: "pulse 1.4s ease infinite" }} />
                  <div style={{ display: "grid", gap: 6 }}>
                    <div style={{ height: 11, width: "55%", borderRadius: 6, background: "rgba(255,255,255,.07)", animation: "pulse 1.4s ease infinite" }} />
                    <div style={{ height: 10, width: "85%", borderRadius: 6, background: "rgba(255,255,255,.05)", animation: "pulse 1.4s ease infinite" }} />
                  </div>
                </div>
              ))
            ) : carReviews.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,.3)", fontSize: 12, textAlign: "center", margin: "8px 0 0", fontWeight: 700 }}>لا توجد تقييمات بعد — كن أول من يقيّم</p>
            ) : (
              carReviews.slice(0, 5).map((r) => (
                <div key={r.id} style={{ display: "grid", gridTemplateColumns: "34px 1fr", gap: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.055)" }}>
                  <img src={r.avatar} alt={r.name} style={{ width: 34, height: 34, borderRadius: 12, objectFit: "cover" }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <strong style={{ fontSize: 12.3 }}>{r.name}</strong>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "rgba(255,255,255,.62)", fontSize: 11, fontWeight: 800 }}>
                        {r.rating}<IconStar size={11} color="#8B5CF6" filled />
                      </span>
                    </div>
                    <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.62)", fontSize: 11.6, lineHeight: 1.65, fontWeight: 650 }}>{r.comment}</p>
                    <span style={{ color: "rgba(255,255,255,.32)", fontSize: 10.5, fontWeight: 700 }}>{r.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <div style={bottomBarStyle}>
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={oldPriceStrikeStyle}>{formatDzd(oldDisplayBase)}</span>
          <strong style={realPriceStyle}>{formatDzd(baseTotal)}</strong>
          <div style={{ color: "rgba(255,255,255,.42)", fontWeight: 700, fontSize: 10.4 }}>
            {dailyPrice.toLocaleString("fr-DZ")} دج / يوم · {days} يوم
          </div>
        </div>
        <button onClick={() => { if (!getCurrentUser()) setGuestAuthSheet(true); else { setBookingPage(true); } }} style={bookButtonStyle}>حجز الآن</button>
      </div>

      {guestAuthSheet && (
        <GuestAuthSheet
          onClose={() => setGuestAuthSheet(false)}
          onLogin={() => { setGuestAuthSheet(false); navigate("/login"); }}
          onRegister={() => { setGuestAuthSheet(false); navigate("/register"); }}
          onGoogle={() => { setGuestAuthSheet(false); navigate("/auth/google"); }}
          onApple={() => { setGuestAuthSheet(false); navigate("/auth/apple"); }}
        />
      )}

      {bookingPage && (
        <div style={bookingPageStyle}>

          {/* ── Header ── */}
          <header style={bookingPageHeaderStyle}>
            <button
              type="button"
              onClick={() => setBookingPage(false)}
              aria-label="رجوع"
              style={bookingBackButtonStyle}
            >
              <IconBack size={22} color="#fff" />
            </button>
            <strong style={{ fontSize: 16, fontWeight: 950 }}>تفاصيل الحجز</strong>
            <span style={{ width: 42 }} />
          </header>

          {/* ── Body — صفحة واحدة طويلة ── */}
          <div style={bookingPageBodyStyle}>

            {/* بطاقة السيارة */}
            <div style={bookingCarCardStyle}>
              <img src={gallery[0]} alt={car.name} style={bookingCarImageStyle} />
              <div style={{ minWidth: 0 }}>
                <h2 data-no-i18n="true" style={{ margin: 0, color: "#fff", fontSize: 16.5, fontWeight: 950, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</h2>
                <div style={{ marginTop: 5, color: "rgba(255,255,255,.62)", fontSize: 11.8, fontWeight: 850 }}>{car.year || 2024} · {rating} ★</div>
                <div style={{ marginTop: 6, color: "rgba(255,255,255,.48)", fontSize: 11.2, fontWeight: 800 }}>{agency.name} · {car.wilaya}</div>
              </div>
            </div>

            {/* ── قسم ١: التاريخ ── */}
            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3v4"/><path d="M17 3v4"/><path d="M4 8h16"/><path d="M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>
                تاريخ الرحلة
              </div>
              {/* تاريخ الاستلام */}
              <label style={labelStyle}>
                تاريخ الاستلام
                <input
                  value={pickupDate}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return;
                    setPickupDate(v);
                    const [py, pm, pd] = v.split("-").map(Number);
                    const r = new Date(py, pm - 1, pd);
                    r.setDate(r.getDate() + days);
                    setReturnDate(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`);
                  }}
                  type="date"
                  min={todayPlus(0)}
                  style={dateInputStyle}
                />
              </label>

              {/* عداد الأيام — زر + و − مضمون */}
              <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: "14px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 700, marginBottom: 12, textAlign: "center" }}>
                  عدد أيام الإيجار
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

                  {/* زر − */}
                  <button
                    type="button"
                    onClick={() => {
                      if (days <= 1) return;
                      const nd = days - 1;
                      setDays(nd);
                      const [py, pm, pd] = pickupDate.split("-").map(Number);
                      const r = new Date(py, pm - 1, pd);
                      r.setDate(r.getDate() + nd);
                      setReturnDate(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`);
                    }}
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      border: "1px solid rgba(255,255,255,.15)",
                      background: days <= 1 ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.1)",
                      color: days <= 1 ? "rgba(255,255,255,.2)" : "#fff",
                      fontSize: 26, fontWeight: 300, cursor: days <= 1 ? "default" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      WebkitTapHighlightColor: "transparent", userSelect: "none",
                    }}
                  >−</button>

                  {/* الرقم */}
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ color: "#A78BFA", fontSize: 42, fontWeight: 950, lineHeight: 1 }}>{days}</div>
                    <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12, fontWeight: 700, marginTop: 4 }}>يوم</div>
                  </div>

                  {/* زر + */}
                  <button
                    type="button"
                    onClick={() => {
                      const nd = days + 1;
                      setDays(nd);
                      const [py, pm, pd] = pickupDate.split("-").map(Number);
                      const r = new Date(py, pm - 1, pd);
                      r.setDate(r.getDate() + nd);
                      setReturnDate(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`);
                    }}
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      border: "1px solid rgba(124,58,237,.4)",
                      background: "rgba(124,58,237,.2)",
                      color: "#A78BFA",
                      fontSize: 26, fontWeight: 300, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      WebkitTapHighlightColor: "transparent", userSelect: "none",
                    }}
                  >+</button>
                </div>
              </div>

              {/* ملخص التواريخ */}
              <div style={durationBadgeStyle}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.4)", fontWeight: 700 }}>الاستلام</span>
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 800 }}>
                    {new Date(pickupDate + "T12:00:00").toLocaleDateString("ar-DZ", { weekday: "short", day: "numeric", month: "short" })}
                  </span>
                </div>
                <svg width="16" height="10" viewBox="0 0 24 10" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2"><path d="M0 5h22M17 1l5 4-5 4"/></svg>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "right" }}>
                  <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.4)", fontWeight: 700 }}>الإرجاع</span>
                  <span style={{ fontSize: 13, color: "#fff", fontWeight: 800 }}>
                    {new Date(returnDate + "T12:00:00").toLocaleDateString("ar-DZ", { weekday: "short", day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
            </div>

            {/* ── قسم ٢: الموقع ── */}
            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
                موقع الاستلام
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <IconPin size={15} color="rgba(255,255,255,.55)" />
                <span style={{ color: "rgba(255,255,255,.75)", fontSize: 13, fontWeight: 800 }}>{agency.name} · {car.wilaya}</span>
              </div>
            </div>

            {/* ── قسم ٣: بيانات السائق ── */}
            <div style={sectionStyle}>
              <div style={sectionTitleStyle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18v14H3V5Z"/><path d="M7 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M5 15c1-2 3-2 4-2s3 0 4 2"/><path d="M15 9h4"/><path d="M15 13h4"/></svg>
                معلومات السائق الرئيسي
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, marginBottom: 12 }}>
                <label style={labelStyle}>
                  رمز الدولة
                  <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={fieldStyle}>
                    <option value="+213">+213 الجزائر</option>
                    <option value="+216">+216 تونس</option>
                    <option value="+212">+212 المغرب</option>
                    <option value="+33">+33 فرنسا</option>
                    <option value="+1">+1 أمريكا</option>
                    <option value="+44">+44 بريطانيا</option>
                    <option value="+971">+971 الإمارات</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  رقم الهاتف
                  <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="0XXXXXXXXX" type="tel" dir="ltr" style={{ ...fieldStyle, textAlign: "left" }} />
                </label>
              </div>

              <label style={{ ...labelStyle, marginBottom: 12 }}>
                الاسم (كما في رخصة القيادة)
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="الاسم الأول" style={fieldStyle} />
              </label>
              <label style={{ ...labelStyle, marginBottom: 12 }}>
                اللقب (كما في رخصة القيادة)
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="اللقب" style={fieldStyle} />
              </label>
              <label style={labelStyle}>
                العمر
                <select value={driverAge} onChange={(e) => setDriverAge(e.target.value)} style={fieldStyle}>
                  {Array.from({ length: 53 }, (_, i) => String(i + 18)).map((age) => (
                    <option key={age} value={age}>{age} سنة</option>
                  ))}
                </select>
              </label>
              <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,.4)", fontSize: 11, lineHeight: 1.7 }}>
                بإدخال رقم الهاتف توافق على استلام رسائل مرتبطة بالحجز أو الحساب.
              </p>
            </div>

            {/* ── قسم ٤: ملخص الحجز الحي ── */}
            <div style={{ ...sectionStyle, background: "rgba(124,58,237,.07)", border: "1px solid rgba(124,58,237,.2)" }}>
              <div style={sectionTitleStyle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h14"/><path d="M5 19h14"/><path d="M7 5v14"/><path d="M17 5v14"/><path d="M9 9h6a3 3 0 0 1 0 6H9V9Z"/></svg>
                ملخص الحجز
              </div>

              {/* شريط الأيام المرئي */}
              <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,.55)", fontSize: 12, fontWeight: 700 }}>مدة الإيجار</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <strong style={{ color: "#A78BFA", fontSize: 20, fontWeight: 950 }}>{days}</strong>
                  <span style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 700 }}>يوم</span>
                </div>
              </div>

              {/* تفصيل التسعيرة */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {/* سطر: سعر/يوم × أيام */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 700 }}>سعر اليوم الواحد</span>
                    <span style={{ color: "rgba(255,255,255,.7)", fontSize: 12.5, fontWeight: 800 }}>
                      {dailyPrice.toLocaleString("fr-DZ")} دج × {days} يوم
                    </span>
                  </div>
                  <strong style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>{formatDzd(baseTotal)}</strong>
                </div>

                {/* سطر: رسوم المنصة */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 700 }}>رسوم المنصة</span>
                    <span style={{ color: "rgba(255,255,255,.7)", fontSize: 12.5, fontWeight: 800 }}>5% من التسعيرة</span>
                  </div>
                  <strong style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>{formatDzd(platformFee)}</strong>
                </div>

                {/* الإجمالي النهائي */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 700 }}>الإجمالي النهائي</span>
                    <span style={{ color: "rgba(255,255,255,.4)", fontSize: 10.5 }}>شامل جميع الرسوم</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                    <span style={{ color: "rgba(255,255,255,.38)", fontSize: 12, fontWeight: 800, textDecoration: "line-through" }}>{formatDzd(oldDisplayBase)}</span>
                    <strong style={{ color: "#A78BFA", fontSize: 22, fontWeight: 950, letterSpacing: ".3px", lineHeight: 1 }}>{formatDzd(total)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* ── الموافقة على الشروط ── */}
            <div style={checkRowStyle}>
              <input
                type="checkbox"
                id="terms-check"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                style={checkInputStyle}
              />
              <label htmlFor="terms-check" style={{ cursor: "pointer", fontSize: 12.5, lineHeight: 1.6 }}>
                أوافق على <span style={{ color: "#A78BFA", fontWeight: 900 }}>شروط الاستخدام</span> وسياسة الإلغاء
              </label>
            </div>

          </div>{/* /body */}

          {/* ── Footer ── */}
          <footer style={bookingPageFooterStyle}>
            <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "rgba(255,255,255,.38)", fontSize: 11.5, fontWeight: 800, textDecoration: "line-through" }}>{formatDzd(oldDisplayBase)}</span>
              </div>
              <strong style={{ color: "#A78BFA", fontSize: 18, fontWeight: 950, lineHeight: 1 }}>{formatDzd(total)}</strong>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10.2, fontWeight: 700 }}>
                {dailyPrice.toLocaleString("fr-DZ")} دج/يوم × {days} يوم + رسوم 5%
              </div>
            </div>
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!termsAccepted || bookingSending}
              style={{ ...bookButtonStyle, opacity: (termsAccepted && !bookingSending) ? 1 : 0.45 }}
            >
              {bookingSending ? "جاري الإرسال..." : "تأكيد الحجز ✓"}
            </button>
          </footer>

        </div>
      )}

      {bookingDone && (
        <BookingConfirmSheet
          booking={bookingData}
          syncFailed={bookingSyncFailed}
          onClose={() => setBookingDone(false)}
          onViewTrips={() => navigate("/trips")}
        />
      )}
    </main>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <span style={{ color: "rgba(255,255,255,.48)", fontSize: 11.5, fontWeight: 850 }}>{label}</span>
      <strong style={{ color: "#fff", fontSize: 12.4, fontWeight: 900, textAlign: "end" }}>{value}</strong>
    </div>
  );
}

const topBackButtonStyle = {
  position: "absolute",
  top: "calc(max(16px, env(safe-area-inset-top)) + 10px)",
  right: 16,
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(9,10,18,.55)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const topActionButtonStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(9,10,18,.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const photoCounterStyle = {
  position: "absolute",
  left: 16,
  bottom: 14,
  direction: "ltr",
  background: "rgba(18,18,20,.82)",
  color: "#fff",
  borderRadius: 10,
  padding: "6px 11px",
  fontSize: 12,
  fontWeight: 850,
  boxShadow: "0 8px 22px rgba(0,0,0,.28)",
};

const smallCardStyle = {
  borderRadius: 18,
  background: "rgba(255,255,255,.042)",
  border: "1px solid rgba(255,255,255,.07)",
  overflow: "hidden",
  boxShadow: "0 14px 32px rgba(0,0,0,.18)",
};

const dateInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 36,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 11,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 750,
  fontSize: 11.5,
  padding: "0 8px",
};

const labelStyle = {
  display: "grid",
  gap: 5,
  color: "rgba(255,255,255,.5)",
  fontSize: 11.2,
  fontWeight: 850,
};

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 39,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 12,
  background: "rgba(255,255,255,.055)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 12.4,
  fontWeight: 750,
  padding: "0 11px",
};

const secondaryButtonStyle = {
  width: "100%",
  minHeight: 39,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 12,
  background: "rgba(255,255,255,.055)",
  color: "#EDE9FE",
  fontFamily: "inherit",
  fontSize: 12.6,
  fontWeight: 950,
  marginTop: 9,
};

const bottomBarStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 120,
  display: "grid",
  gridTemplateColumns: "1fr minmax(132px, 38vw)",
  alignItems: "center",
  gap: 9,
  padding: "10px 16px max(12px, env(safe-area-inset-bottom))",
  background: "rgba(5,5,6,.96)",
  borderTop: "1px solid rgba(255,255,255,.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
};

const bookButtonStyle = {
  minHeight: 46,
  border: "none",
  borderRadius: 15,
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 14.4,
  fontWeight: 950,
  boxShadow: "0 14px 28px rgba(124,58,237,.32)",
};


const priceRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  color: "rgba(255,255,255,.58)",
  fontSize: 11.3,
  fontWeight: 850,
};

const footerPriceLineStyle = {
  display: "flex",
  alignItems: "baseline",
  flexWrap: "wrap",
  gap: 8,
  direction: "ltr",
};

const oldPriceStrikeStyle = {
  color: "rgba(255,255,255,.46)",
  textDecoration: "line-through",
  textDecorationThickness: 2,
  fontSize: 13.2,
  fontWeight: 900,
};

const realPriceStyle = {
  color: "#fff",
  fontSize: 16,
  fontWeight: 950,
  letterSpacing: ".1px",
};

const checkRowStyle = {
  display: "grid",
  gridTemplateColumns: "30px 1fr",
  alignItems: "start",
  gap: 11,
  padding: "12px 4px",
  color: "rgba(255,255,255,.9)",
  fontSize: 12.6,
  fontWeight: 850,
  lineHeight: 1.65,
};

const checkInputStyle = {
  width: 24,
  height: 24,
  accentColor: "#7C3AED",
};

const bookingPageStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 260,
  background: "#050506",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  animation: "fadeIn .2s ease",
};

const bookingPageHeaderStyle = {
  minHeight: 66,
  padding: "calc(max(12px, env(safe-area-inset-top)) + 4px) 16px 10px",
  display: "grid",
  gridTemplateColumns: "42px 1fr 42px",
  alignItems: "center",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,.075)",
  background: "rgba(8,8,10,.96)",
};

const bookingBackButtonStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.10)",
  background: "rgba(255,255,255,.055)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
};

const bookingPageBodyStyle = {
  flex: "1 1 0px",
  minHeight: 0,
  overflowY: "scroll",
  overflowX: "hidden",
  padding: "14px 16px 32px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const sectionStyle = {
  borderRadius: 20,
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.07)",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const sectionTitleStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  fontWeight: 900,
  color: "#fff",
  marginBottom: 4,
};

const durationBadgeStyle = {
  marginTop: 4,
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(124,58,237,.1)",
  border: "1px solid rgba(124,58,237,.2)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const bookingCarCardStyle = {
  borderRadius: 22,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.075)",
  padding: 12,
  display: "grid",
  gridTemplateColumns: "92px 1fr",
  gap: 12,
  alignItems: "center",
};

const bookingCarImageStyle = {
  width: 92,
  height: 78,
  borderRadius: 18,
  objectFit: "cover",
  border: "1px solid rgba(255,255,255,.09)",
};

const bookingPageFooterStyle = {
  flexShrink: 0,
  display: "grid",
  gridTemplateColumns: "1fr minmax(142px, 38vw)",
  alignItems: "center",
  gap: 10,
  padding: "10px 16px max(16px, env(safe-area-inset-bottom))",
  background: "rgba(5,5,6,.97)",
  borderTop: "1px solid rgba(255,255,255,.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
};

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 240,
  display: "grid",
  placeItems: "center",
  padding: 22,
  background: "rgba(0,0,0,.58)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const successModalStyle = {
  width: "min(100%, 360px)",
  borderRadius: 26,
  background: "rgba(14,14,18,.96)",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,.45)",
  padding: 18,
  textAlign: "center",
};

const sheetBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 230,
  display: "flex",
  alignItems: "flex-end",
  background: "rgba(0,0,0,.48)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  animation: "authBackdropIn .18s ease both",
};

const bookingSheetStyle = {
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  borderRadius: "28px 28px 0 0",
  background: "rgba(10,11,23,.99)",
  border: "1px solid rgba(255,255,255,.09)",
  borderBottom: "none",
  boxShadow: "0 -24px 70px rgba(0,0,0,.55)",
  padding: 0,
  overflow: "hidden",
  animation: "authSheetUp .34s cubic-bezier(.22,1,.36,1) both",
};

const sheetHeroStyle = {
  position: "relative",
  height: 138,
  overflow: "hidden",
  background: "#090A14",
};

const sheetHeroImgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center 42%",
  display: "block",
};

const sheetHeroOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(7,8,15,.28) 0%, rgba(9,10,20,1) 100%)",
};

const sheetHeroLogoStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: 78,
  height: 78,
  objectFit: "contain",
  filter: "drop-shadow(0 5px 18px rgba(0,0,0,.6))",
};

const sheetHandleOnHeroStyle = {
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  width: 52,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,.24)",
  boxShadow: "0 2px 10px rgba(0,0,0,.35)",
};

const sheetContentStyle = {
  padding: "18px 16px max(18px, env(safe-area-inset-bottom))",
  display: "grid",
  gap: 10,
};

const plainSheetOptionStyle = {
  width: "100%",
  minHeight: 48,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 15,
  background: "rgba(255,255,255,.052)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 900,
  textAlign: "center",
};

const sheetHandleStyle = {
  width: 44,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
  margin: "0 auto 13px",
};

const sheetOptionStyle = {
  width: "100%",
  minHeight: 62,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 17,
  background: "rgba(255,255,255,.052)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  marginTop: 9,
  fontFamily: "inherit",
  textAlign: "start",
};

const sheetIconStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
  boxShadow: "0 12px 28px rgba(124,58,237,.22)",
};
