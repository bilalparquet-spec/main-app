/**
 * PageTransition — انتقالات سلسة بين الصفحات لـ DriveRENT
 *
 * الاستخدام في App.jsx:
 *   <PageTransition routeKey={pathname}>
 *     {renderPage()}
 *   </PageTransition>
 */
import { useEffect, useState, useRef } from "react";

export function PageTransition({ routeKey, children }) {
  const [phase, setPhase]       = useState("in");
  const [displayed, setDisplayed] = useState(children);
  const prevKey = useRef(routeKey);

  useEffect(() => {
    if (routeKey === prevKey.current) return;
    prevKey.current = routeKey;
    // الصفحة الجديدة تدخل
    setDisplayed(children);
    setPhase("in");
  }, [routeKey, children]);

  // تحديد اتجاه الانيميشن بناءً على نوع الصفحة
  const isDetail = routeKey?.startsWith("/car/") || routeKey?.startsWith("/agency/");
  const isHome   = routeKey === "/";

  const animName = isDetail ? "pageSlideUp" :
                   isHome   ? "pageSlideBack" :
                              "pageFade";

  return (
    <div
      key={routeKey}
      style={{
        animation: `${animName} .28s cubic-bezier(.25,.46,.45,.94) both`,
        willChange: "transform, opacity",
      }}
    >
      {displayed}
      <style>{`
        @keyframes pageSlideUp {
          from { opacity:.7; transform:translateY(18px) scale(.985); }
          to   { opacity:1;  transform:translateY(0) scale(1); }
        }
        @keyframes pageSlideBack {
          from { opacity:.7; transform:translateX(-12px); }
          to   { opacity:1;  transform:translateX(0); }
        }
        @keyframes pageFade {
          from { opacity:0; transform:scale(.985); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  );
}
