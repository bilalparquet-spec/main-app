/**
 * BookingConfirmSheet — شاشة تأكيد الحجز لـ DriveRENT
 *
 * يظهر بعد اكتمال الحجز مع رقم الحجز والتفاصيل
 *
 * الاستخدام في CarDetail.jsx:
 *   import { BookingConfirmSheet } from './BookingConfirmSheet.jsx';
 *   {bookingDone && <BookingConfirmSheet booking={bookingData} onClose={() => setBookingDone(false)} />}
 */
import { useEffect } from "react";
import { useToast } from "./ui/Toast.jsx";

export function BookingConfirmSheet({ booking, onClose, onViewTrips }) {
  const toast = useToast();

  useEffect(() => {
    // haptic احتفالي
    navigator.vibrate?.([20, 60, 20, 60, 40]);
  }, []);

  const bookingId = booking?.id || `DR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const carName   = booking?.carName || booking?.car?.name || "السيارة";
  const dateFrom  = booking?.dateFrom || booking?.from || "";
  const dateTo    = booking?.dateTo   || booking?.to   || "";
  const price     = booking?.price    || booking?.totalPrice || 0;
  const agency    = booking?.agencyName || "";

  const handleCopyId = async () => {
    try {
      await navigator.clipboard?.writeText(bookingId);
      toast.success("تم نسخ رقم الحجز");
    } catch {
      toast.info(bookingId);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,.65)",
          backdropFilter: "blur(8px)",
          zIndex: 9100,
          animation: "fadeIn .25s ease both",
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 9200,
        borderRadius: "24px 24px 0 0",
        background: "#0F1018",
        border: "1px solid rgba(255,255,255,.08)",
        padding: "0 20px calc(env(safe-area-inset-bottom, 0px) + 24px)",
        animation: "authSheetUp .4s cubic-bezier(.34,1.2,.64,1) both",
        maxWidth: 480,
        margin: "0 auto",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 4, background: "rgba(255,255,255,.12)" }}/>
        </div>

        {/* أيقونة النجاح */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "20px 0 24px", gap: 12,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(16,185,129,.1)",
            border: "2px solid rgba(16,185,129,.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "badgePop .5s cubic-bezier(.34,1.56,.64,1) both",
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16.5L13 22.5L25 10"
                stroke="#10B981" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900, color: "#F1F5F9" }}>
              تم تأكيد الحجز!
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.45)" }}>
              سيتواصل معك ممثل الوكالة قريباً
            </p>
          </div>
        </div>

        {/* بطاقة تفاصيل الحجز */}
        <div style={{
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 18,
          padding: "16px",
          marginBottom: 16,
        }}>
          {/* رقم الحجز */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingBottom: 12, marginBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>رقم الحجز</span>
            <button
              onClick={handleCopyId}
              style={{
                background: "rgba(167,139,250,.12)",
                border: "1px solid rgba(167,139,250,.25)",
                borderRadius: 8, padding: "4px 12px",
                color: "#A78BFA", fontSize: 13, fontWeight: 800,
                cursor: "pointer", fontFamily: "monospace",
                letterSpacing: 1,
              }}
            >
              {bookingId} ⧉
            </button>
          </div>

          {/* التفاصيل */}
          {[
            { label: "السيارة",   value: carName },
            agency && { label: "الوكالة", value: agency },
            dateFrom && { label: "من",   value: dateFrom },
            dateTo   && { label: "إلى",  value: dateTo },
            price    && { label: "الإجمالي", value: `${price.toLocaleString("ar-DZ")} دج` },
          ].filter(Boolean).map((row, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,.04)" : "none",
            }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* الأزرار */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => { onViewTrips?.(); onClose(); }}
            style={{
              flex: 1, border: "none", borderRadius: 14,
              padding: "14px", background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
              color: "#fff", fontSize: 14, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer",
              boxShadow: "0 8px 24px rgba(124,58,237,.3)",
            }}
          >
            عرض رحلاتي
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, border: "1px solid rgba(255,255,255,.1)", borderRadius: 14,
              padding: "14px", background: "rgba(255,255,255,.05)",
              color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 600,
              fontFamily: "inherit", cursor: "pointer",
            }}
          >
            إغلاق
          </button>
        </div>
      </div>
    </>
  );
}
