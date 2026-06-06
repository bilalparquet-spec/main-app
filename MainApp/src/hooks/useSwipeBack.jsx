/**
 * useSwipeBack — Swipe Back Gesture محسّن لـ DriveRENT
 *
 * يتبع معايير ui-ux-pro-max:
 * - standard-gestures: swipe-back من حافة الشاشة (iOS-style)
 * - swipe-clarity: مؤشر بصري أثناء السحب
 * - haptic-feedback: اهتزاز خفيف عند تأكيد الرجوع
 * - system-gestures: لا يتعارض مع gestures النظام
 * - drag-threshold: threshold منع الـ drag العرضي
 * - gesture-conflicts: يتجنب التعارض مع scroll أفقي
 *
 * يُرجع:
 *   - swipeProgress: 0→1 (لرسم المؤشر البصري)
 *   - SwipeIndicator: component للمؤشر البصري
 *
 * الاستخدام في App.jsx:
 *   import { useSwipeBack, SwipeIndicator } from './hooks/useSwipeBack.js';
 *   const { swipeProgress } = useSwipeBack({ pathname, navigate });
 *   // في الـ JSX:
 *   <SwipeIndicator progress={swipeProgress} />
 */
import { useEffect, useState, useRef, useCallback } from "react";

const EDGE_WIDTH   = 32;   // عرض منطقة الحافة بالـ px
const MIN_DISTANCE = 72;   // أدنى مسافة سحب للتأكيد
const MAX_VERTICAL = 55;   // أقصى انحراف رأسي مسموح
const THRESHOLD    = 0.45; // نسبة التقدم للتأكيد (0-1)

export function useSwipeBack({ pathname, navigate, onVibrate }) {
  const [swipeProgress, setSwipeProgress] = useState(0); // 0-1
  const stateRef = useRef({ tracking: false, startX: 0, startY: 0, confirmed: false });

  const canGoBack = pathname !== "/";

  useEffect(() => {
    if (!canGoBack) {
      setSwipeProgress(0);
      return;
    }

    const state = stateRef.current;

    const onStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const target = e.target;
      // لا تبدأ على عناصر تفاعلية أو scroll أفقي
      if (target?.closest?.("input, textarea, select, button, a")) return;
      if (target?.closest?.(".momentum-scroll")) return;

      const t = e.touches[0];
      const w = window.innerWidth || 375;
      // حافة يسار (RTL = رجوع) أو حافة يمين (LTR = رجوع)
      const fromLeft  = t.clientX <= EDGE_WIDTH;
      const fromRight = t.clientX >= w - EDGE_WIDTH;

      if (!fromLeft && !fromRight) return;

      state.tracking  = true;
      state.startX    = t.clientX;
      state.startY    = t.clientY;
      state.confirmed = false;
      state.dir       = fromLeft ? 1 : -1; // 1=اليسار، -1=اليمين
    };

    const onMove = (e) => {
      if (!state.tracking || !e.touches?.length) return;
      const t = e.touches[0];
      const dx = (t.clientX - state.startX) * state.dir;
      const dy = Math.abs(t.clientY - state.startY);

      // إلغاء إذا الانحراف الرأسي كبير
      if (dy > MAX_VERTICAL && dx < 20) {
        state.tracking = false;
        setSwipeProgress(0);
        return;
      }

      if (dx < 0) { setSwipeProgress(0); return; }

      const progress = Math.min(dx / (window.innerWidth * 0.55), 1);
      setSwipeProgress(progress);

      // haptic خفيف عند الوصول للـ threshold
      if (progress >= THRESHOLD && !state.confirmed) {
        state.confirmed = true;
        onVibrate?.();
      } else if (progress < THRESHOLD && state.confirmed) {
        state.confirmed = false;
      }
    };

    const onEnd = (e) => {
      if (!state.tracking) return;
      state.tracking = false;
      const t = e.changedTouches?.[0];
      if (!t) { setSwipeProgress(0); return; }

      const dx = (t.clientX - state.startX) * state.dir;
      const dy = Math.abs(t.clientY - state.startY);

      // انيميشن إغلاق سلس
      if (dx > MIN_DISTANCE && dy < MAX_VERTICAL) {
        onVibrate?.();
        navigate(-1);
        // تأخير إعادة الضبط ليظهر الانيميشن
        setTimeout(() => setSwipeProgress(0), 300);
      } else {
        setSwipeProgress(0);
      }
    };

    const onCancel = () => {
      state.tracking = false;
      setSwipeProgress(0);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove",  onMove,  { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    window.addEventListener("touchcancel",onCancel,{ passive: true });

    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("touchend",   onEnd);
      window.removeEventListener("touchcancel",onCancel);
    };
  }, [canGoBack, pathname, navigate, onVibrate]);

  return { swipeProgress };
}

/**
 * SwipeIndicator — مؤشر بصري أثناء سحب الرجوع
 * يظهر كـ pill بنفسجي على حافة الشاشة
 */
export function SwipeIndicator({ progress = 0 }) {
  if (progress <= 0.02) return null;

  const confirmed = progress >= THRESHOLD;
  const opacity   = Math.min(progress * 2, 1);
  const scale     = 0.7 + progress * 0.3;
  const size      = 40 + progress * 28;

  return (
    <div style={{
      position: "fixed",
      left: 0,
      top: "50%",
      transform: `translateY(-50%) translateX(${-8 + progress * 18}px)`,
      zIndex: 9000,
      pointerEvents: "none",
    }}>
      <div style={{
        width: size * 0.55,
        height: size,
        borderRadius: size,
        background: confirmed
          ? "linear-gradient(180deg, #A78BFA, #7C3AED)"
          : "rgba(167,139,250,.35)",
        border: `1.5px solid ${confirmed ? "rgba(167,139,250,.9)" : "rgba(167,139,250,.4)"}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity,
        transform: `scale(${scale})`,
        transition: "background .15s ease, border-color .15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: confirmed ? "0 0 18px rgba(124,58,237,.5)" : "none",
      }}>
        {/* سهم */}
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
          style={{ opacity: confirmed ? 1 : 0.6, transition: "opacity .15s" }}>
          <path d="M8 2L2 8L8 14" stroke="white" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
