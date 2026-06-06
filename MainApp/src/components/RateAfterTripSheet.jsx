/**
 * RateAfterTripSheet — يظهر تلقائياً بعد انتهاء الرحلة
 *
 * يُعرض مرة واحدة فقط لكل رحلة (يحفظ في localStorage)
 *
 * الاستخدام في TripsPage.jsx:
 *   import { useRateAfterTrip, RateAfterTripSheet } from '../RateAfterTripSheet.jsx';
 *   const { pending, dismiss } = useRateAfterTrip(allTrips);
 *   {pending && <RateAfterTripSheet trip={pending} onDone={dismiss} onSkip={dismiss} />}
 */
import { useState, useEffect } from "react";

const STORAGE_KEY = "driverent_rated_trips";

function getRatedTrips() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
  catch { return new Set(); }
}
function markRated(tripId) {
  const rated = getRatedTrips();
  rated.add(String(tripId));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...rated])); } catch {}
}

// ── hook: يجد أول رحلة منتهية لم تُقيَّم بعد ────────────────────────────────
export function useRateAfterTrip(allTrips = []) {
  const [pending, setPending] = useState(null);

  useEffect(() => {
    if (pending) return;
    const rated = getRatedTrips();
    const unrated = allTrips.find(t =>
      t.status === "done" &&
      (!t.rating || t.rating === 0) &&
      !rated.has(String(t.id || t.carId))
    );
    if (unrated) {
      // تأخير بسيط حتى تتحمل الصفحة
      const timer = setTimeout(() => setPending(unrated), 1200);
      return () => clearTimeout(timer);
    }
  }, [allTrips]); // eslint-disable-line

  const dismiss = () => {
    if (pending) markRated(pending.id || pending.carId);
    setPending(null);
  };

  return { pending, dismiss };
}

// ── Sheet التقييم ─────────────────────────────────────────────────────────────
export function RateAfterTripSheet({ trip, onDone, onSkip }) {
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState("");
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { navigator.vibrate?.([15, 60, 20]); }, []);

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    try {
      const { dbInsert } = await import("../lib/supabase.js");
      await dbInsert("reviews", {
        id:          "rev" + Date.now(),
        car_id:      String(trip.carId || trip.id),
        agency_name: trip.agencyName || trip.pickupPlace || "",
        user_name:   trip.driverName || "مستخدم درايف",
        rating,
        comment:     comment.trim() || "تجربة ممتازة!",
        status:      "pending",
      });
    } catch (e) { console.warn("Review save failed:", e.message); }
    navigator.vibrate?.([12, 50, 20]);
    onDone?.();
  };

  const stars = [1, 2, 3, 4, 5];
  const labels = ["سيء", "مقبول", "جيد", "ممتاز", "رائع!"];

  return (
    <>
      {/* Backdrop */}
      <div onClick={onSkip} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9100,
        animation: "fadeIn .25s ease both",
      }} />

      {/* Sheet */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 9200,
        borderRadius: "24px 24px 0 0",
        background: "#0F1018",
        border: "1px solid rgba(255,255,255,.08)",
        padding: "0 20px calc(env(safe-area-inset-bottom, 0px) + 28px)",
        animation: "authSheetUp .4s cubic-bezier(.34,1.2,.64,1) both",
        maxWidth: 480,
        margin: "0 auto",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 4, background: "rgba(255,255,255,.12)" }} />
        </div>

        {/* رأس الـ sheet */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⭐</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 900, color: "#F1F5F9" }}>
            كيف كانت تجربتك؟
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>
            رحلتك بـ <strong style={{ color: "#A78BFA" }}>{trip.car || trip.carName || "السيارة"}</strong> انتهت
          </p>
        </div>

        {/* النجوم */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 8,
        }}>
          {stars.map(n => (
            <button
              key={n}
              onClick={() => { setRating(n); navigator.vibrate?.(8); }}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onTouchStart={() => setHovered(n)}
              onTouchEnd={() => setHovered(0)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: 4, transition: "transform .15s",
                transform: (hovered || rating) >= n ? "scale(1.2)" : "scale(1)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={(hovered || rating) >= n ? "#FBBF24" : "rgba(255,255,255,.12)"}
                  stroke={(hovered || rating) >= n ? "#FBBF24" : "rgba(255,255,255,.2)"}
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* تسمية التقييم */}
        <p style={{
          textAlign: "center", margin: "0 0 16px",
          fontSize: 13, fontWeight: 700,
          color: rating ? "#A78BFA" : "rgba(255,255,255,.3)",
          minHeight: 20,
          transition: "color .2s",
        }}>
          {rating ? labels[rating - 1] : "اختر تقييمك"}
        </p>

        {/* تعليق اختياري */}
        {rating > 0 && (
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="أضف تعليقاً (اختياري)..."
            rows={2}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 14, padding: "12px 14px",
              color: "#fff", fontFamily: "inherit",
              fontSize: 13, resize: "none",
              marginBottom: 16, outline: "none",
              lineHeight: 1.6,
            }}
          />
        )}

        {/* الأزرار */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleSubmit}
            disabled={!rating || submitting}
            style={{
              flex: 1, border: "none", borderRadius: 14,
              padding: "14px",
              background: rating ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "rgba(255,255,255,.06)",
              color: "#fff", fontSize: 14, fontWeight: 700,
              fontFamily: "inherit", cursor: rating ? "pointer" : "default",
              opacity: rating ? 1 : 0.5,
              transition: "all .2s",
              boxShadow: rating ? "0 8px 24px rgba(124,58,237,.3)" : "none",
            }}
          >
            {submitting ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
          <button
            onClick={onSkip}
            style={{
              border: "1px solid rgba(255,255,255,.1)", borderRadius: 14,
              padding: "14px 18px",
              background: "rgba(255,255,255,.05)",
              color: "rgba(255,255,255,.5)", fontSize: 13,
              fontFamily: "inherit", cursor: "pointer",
            }}
          >
            لاحقاً
          </button>
        </div>
      </div>
    </>
  );
}
