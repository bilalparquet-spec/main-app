/**
 * Toast — نظام إشعارات DriveRENT
 *
 * الاستخدام:
 *   import { useToast, ToastContainer } from '../components/ui/Toast.jsx';
 *
 *   // في App.jsx أضف <ToastContainer /> مرة واحدة
 *   // في أي component:
 *   const toast = useToast();
 *   toast.success('تم الحجز بنجاح!');
 *   toast.error('حدث خطأ، حاول مجدداً');
 *   toast.info('تم نسخ الرابط');
 *   toast.warning('يجب تسجيل الدخول أولاً');
 */
import { useState, useCallback, useEffect, useRef } from "react";

// ── Event Bus بسيط (بدون Context) ────────────────────────────────────────────
const listeners = new Set();
const emit = (toast) => listeners.forEach(fn => fn(toast));

let idCounter = 0;

// ── useToast hook ─────────────────────────────────────────────────────────────
export function useToast() {
  const show = useCallback((type, message, duration = 3000) => {
    emit({ id: ++idCounter, type, message, duration });
    // haptic مدمج
    try {
      const patterns = { success: [12,50,20], error: [30,40,30,40,60], info: [10], warning: [20,40,20] };
      navigator.vibrate?.(patterns[type] || [10]);
    } catch {}
  }, []);

  return {
    success: (msg, dur)  => show("success", msg, dur),
    error:   (msg, dur)  => show("error",   msg, dur),
    info:    (msg, dur)  => show("info",    msg, dur),
    warning: (msg, dur)  => show("warning", msg, dur),
  };
}

// ── ToastItem ─────────────────────────────────────────────────────────────────
function ToastItem({ toast, onRemove }) {
  const [phase, setPhase] = useState("in"); // in | hold | out
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPhase("out");
      setTimeout(() => onRemove(toast.id), 320);
    }, toast.duration);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.duration, onRemove]);

  const cfg = {
    success: { bg: "rgba(16,185,129,.92)",  border: "rgba(16,185,129,.4)",  icon: "✓" },
    error:   { bg: "rgba(239,68,68,.92)",   border: "rgba(239,68,68,.4)",   icon: "✕" },
    info:    { bg: "rgba(30,30,50,.95)",     border: "rgba(167,139,250,.3)", icon: "ℹ" },
    warning: { bg: "rgba(245,158,11,.92)",  border: "rgba(245,158,11,.4)",  icon: "⚠" },
  }[toast.type] || {};

  return (
    <div
      onClick={() => { setPhase("out"); setTimeout(() => onRemove(toast.id), 320); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 14px",
        borderRadius: 14,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,.35)",
        cursor: "pointer",
        maxWidth: 340,
        width: "calc(100vw - 32px)",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "in"  ? "translateY(0) scale(1)" :
                   phase === "out" ? "translateY(12px) scale(.96)" :
                                     "translateY(0) scale(1)",
        transition: "opacity .28s ease, transform .28s ease",
        animation: phase === "in" ? "toastIn .32s cubic-bezier(.34,1.4,.64,1) both" : "none",
      }}
    >
      {/* أيقونة */}
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        background: "rgba(255,255,255,.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 900, color: "#fff", flexShrink: 0,
      }}>
        {cfg.icon}
      </div>

      {/* النص */}
      <span style={{
        flex: 1, fontSize: 13.5, fontWeight: 600,
        color: "#fff", lineHeight: 1.4,
      }}>
        {toast.message}
      </span>

      {/* شريط التقدم */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 2, borderRadius: "0 0 14px 14px",
        background: "rgba(255,255,255,.25)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "rgba(255,255,255,.6)",
          animation: `toastProgress ${toast.duration}ms linear forwards`,
        }}/>
      </div>
    </div>
  );
}

// ── ToastContainer (يُضاف مرة واحدة في App.jsx) ──────────────────────────────
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (toast) => setToasts(p => [...p.slice(-4), toast]); // max 5
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  const remove = useCallback((id) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "calc(72px + env(safe-area-inset-bottom, 0px) + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9500,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "center",
      pointerEvents: "none",
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: "all" }}>
          <ToastItem toast={t} onRemove={remove} />
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateY(20px) scale(.92); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width:100%; }
          to   { width:0%; }
        }
      `}</style>
    </div>
  );
}
