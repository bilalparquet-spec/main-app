/**
 * usePullToRefresh — سحب للتحديث لـ DriveRENT
 *
 * الاستخدام:
 *   const { PullIndicator, isRefreshing } = usePullToRefresh(onRefresh);
 *   // في الـ JSX:
 *   <PullIndicator />
 *
 * onRefresh: async function يُنفَّذ عند التحديث
 */
import { useState, useEffect, useRef, useCallback } from "react";

const THRESHOLD    = 72;   // مسافة السحب للتأكيد (px)
const MAX_PULL     = 110;  // أقصى مسافة سحب
const SCROLL_LOCK  = 8;    // تجاهل السحب إذا الصفحة مُسحوبة للأسفل

export function usePullToRefresh(onRefresh) {
  const [pullY, setPullY]           = useState(0);      // 0 → MAX_PULL
  const [isRefreshing, setRefreshing] = useState(false);
  const stateRef = useRef({ tracking: false, startY: 0, startScrollY: 0 });

  const doRefresh = useCallback(async () => {
    if (isRefreshing) return;
    navigator.vibrate?.([15, 60, 25]);
    setRefreshing(true);
    setPullY(0);
    try { await onRefresh?.(); } catch {}
    setTimeout(() => setRefreshing(false), 400);
  }, [isRefreshing, onRefresh]);

  useEffect(() => {
    const state = stateRef.current;

    const onStart = (e) => {
      if (e.touches?.length !== 1) return;
      if (window.scrollY > SCROLL_LOCK) return;
      state.tracking    = true;
      state.startY      = e.touches[0].clientY;
      state.startScrollY = window.scrollY;
    };

    const onMove = (e) => {
      if (!state.tracking || isRefreshing) return;
      if (window.scrollY > SCROLL_LOCK) { state.tracking = false; setPullY(0); return; }
      const dy = e.touches[0].clientY - state.startY;
      if (dy <= 0) { setPullY(0); return; }
      // مقاومة السحب (rubber-band effect)
      const resistance = 1 - (dy / (MAX_PULL * 3));
      const pull = Math.min(dy * Math.max(resistance, 0.25), MAX_PULL);
      setPullY(pull);
      if (pull >= THRESHOLD && !state.confirmed) {
        state.confirmed = true;
        navigator.vibrate?.(12);
      } else if (pull < THRESHOLD) {
        state.confirmed = false;
      }
    };

    const onEnd = () => {
      if (!state.tracking) return;
      state.tracking  = false;
      state.confirmed = false;
      if (pullY >= THRESHOLD) {
        doRefresh();
      } else {
        setPullY(0);
      }
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove",  onMove,  { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [isRefreshing, pullY, doRefresh]);

  const progress   = Math.min(pullY / THRESHOLD, 1);
  const confirmed  = pullY >= THRESHOLD;

  function PullIndicator() {
    const show = pullY > 4 || isRefreshing;
    if (!show) return null;

    return (
      <div style={{
        position: "fixed",
        top: "env(safe-area-inset-top, 0px)",
        left: 0, right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 7000,
        pointerEvents: "none",
        paddingTop: 8,
        transform: `translateY(${isRefreshing ? 0 : pullY * 0.6}px)`,
        transition: isRefreshing ? "transform .3s ease" : "none",
      }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: "50%",
          background: confirmed || isRefreshing
            ? "linear-gradient(135deg, #7C3AED, #6D28D9)"
            : "rgba(30,30,50,.9)",
          border: `1.5px solid ${confirmed || isRefreshing ? "rgba(167,139,250,.6)" : "rgba(255,255,255,.1)"}`,
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,.4)",
          transition: "background .2s, border-color .2s",
          transform: `scale(${0.6 + progress * 0.4})`,
        }}>
          {isRefreshing ? (
            // spinner
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}>
              <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.25)" strokeWidth="2"/>
              <path d="M9 2A7 7 0 0 1 16 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // سهم لأسفل يدور عند التأكيد
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{
                transform: `rotate(${confirmed ? 180 : progress * 180}deg)`,
                transition: "transform .2s ease",
              }}>
              <path d="M8 3v9M4 8l4 4 4-4"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    );
  }

  return { PullIndicator, isRefreshing, pullY };
}
