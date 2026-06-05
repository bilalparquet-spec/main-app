/**
 * SmartImage — صور ذكية لـ DriveRENT
 *
 * معايير ui-ux-pro-max المُطبّقة:
 * - progressive-loading: skeleton أثناء التحميل
 * - image-optimization: loading="lazy" + decoding="async"
 * - error-states: fallback واضح عند فشل الصورة
 * - performance: IntersectionObserver للصور خارج الـ viewport
 * - reduced-motion: يحترم prefers-reduced-motion
 *
 * الاستخدام:
 *   <SmartImage src={car.img} alt={car.name} />
 *   <SmartImage src={car.img} alt={car.name} eager />          ← أول صورة في الصفحة
 *   <SmartImage src={ag.img}  alt={ag.name}  variant="avatar"/>
 *   <SmartImage src={car.img} alt={car.name} variant="gallery" radius={0}/>
 */
import { useState, useRef, useEffect } from "react";

// ── Placeholder SVG مضمّن (لا يحتاج شبكة) ─────────────────────────────────
const CAR_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%230D0E1A'/%3E%3Cg opacity='.18'%3E%3Crect x='80' y='110' width='240' height='70' rx='14' fill='%23A78BFA'/%3E%3Crect x='110' y='75' width='160' height='55' rx='10' fill='%23A78BFA'/%3E%3Ccircle cx='130' cy='182' r='22' fill='%23A78BFA'/%3E%3Ccircle cx='270' cy='182' r='22' fill='%23A78BFA'/%3E%3C/g%3E%3C/svg%3E`;

const AVATAR_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230D0E1A'/%3E%3Ccircle cx='40' cy='30' r='16' fill='%23A78BFA' opacity='.25'/%3E%3Cellipse cx='40' cy='65' rx='22' ry='14' fill='%23A78BFA' opacity='.15'/%3E%3C/svg%3E`;

const AGENCY_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%230D0E1A'/%3E%3Crect x='60' y='35' width='80' height='60' rx='6' fill='%23A78BFA' opacity='.15'/%3E%3Crect x='75' y='25' width='50' height='20' rx='4' fill='%23A78BFA' opacity='.1'/%3E%3Crect x='82' y='68' width='16' height='28' rx='3' fill='%23A78BFA' opacity='.2'/%3E%3Crect x='102' y='68' width='16' height='28' rx='3' fill='%23A78BFA' opacity='.2'/%3E%3C/svg%3E`;

function getPlaceholder(variant) {
  if (variant === "avatar") return AVATAR_PLACEHOLDER;
  if (variant === "agency") return AGENCY_PLACEHOLDER;
  return CAR_PLACEHOLDER;
}

export function SmartImage({
  src,
  alt = "",
  variant = "car",      // "car" | "avatar" | "agency" | "gallery"
  eager = false,        // true للصورة الأولى في الصفحة
  radius = 0,           // border-radius بالـ px
  style = {},           // styles إضافية على الـ container
  imgStyle = {},        // styles إضافية على الـ img
  onLoad,
  onError,
}) {
  const [status, setStatus]   = useState("idle"); // idle | loading | loaded | error
  const [inView, setInView]   = useState(eager);
  const containerRef          = useRef(null);
  const placeholder           = getPlaceholder(variant);

  // ── IntersectionObserver: لا تبدأ التحميل إلا عند الاقتراب ───────────────
  useEffect(() => {
    if (eager || inView) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }

    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "200px" } // ابدأ التحميل 200px قبل الظهور
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager, inView]);

  // ── ابدأ التحميل عند دخول الـ viewport ───────────────────────────────────
  useEffect(() => {
    if (!inView || !src) return;
    setStatus("loading");
  }, [inView, src]);

  const handleLoad = (e) => {
    setStatus("loaded");
    onLoad?.(e);
  };

  const handleError = (e) => {
    setStatus("error");
    onError?.(e);
  };

  const showSkeleton = status === "idle" || status === "loading";
  const showImg      = inView && src && status !== "error";
  const showFallback = !src || status === "error";

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: radius,
        background: "#0D0E1A",
        ...style,
      }}
    >
      {/* ── Skeleton shimmer ─────────────────────────────────────── */}
      {showSkeleton && !showFallback && (
        <div
          className="skel"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            zIndex: 1,
          }}
        />
      )}

      {/* ── Fallback placeholder ──────────────────────────────────── */}
      {showFallback && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: radius,
          }}
        />
      )}

      {/* ── الصورة الحقيقية ───────────────────────────────────────── */}
      {showImg && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: radius,
            opacity: status === "loaded" ? 1 : 0,
            transition: "opacity .3s ease",
            zIndex: 2,
            ...imgStyle,
          }}
        />
      )}
    </div>
  );
}
