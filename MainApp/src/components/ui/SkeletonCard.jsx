/**
 * SkeletonCard — Skeleton Loading محسّن لـ DriveRENT
 *
 * يتبع معايير ui-ux-pro-max:
 * - progressive-loading: shimmer بدل spinner للتحميل > 1s
 * - content-jumping: حجم ثابت يمنع CLS
 * - animation: duration 150-300ms, transform/opacity فقط
 * - reduced-motion: يحترم prefers-reduced-motion
 *
 * variants:
 *   <SkeletonCard />                   — بطاقة سيارة عمودية (افتراضي)
 *   <SkeletonCard variant="horizontal"/> — بطاقة أفقية للـ scroll sections
 *   <SkeletonCard variant="agency" />   — بطاقة وكالة
 *   <SkeletonCard variant="trip" />     — بطاقة رحلة
 *   <SkeletonCard variant="message" />  — صف رسالة
 *   <SkeletonCard variant="profile" />  — header الملف الشخصي
 */
export function SkeletonCard({ variant = "card" }) {
  if (variant === "horizontal") return <SkeletonHorizontal />;
  if (variant === "agency")     return <SkeletonAgency />;
  if (variant === "trip")       return <SkeletonTrip />;
  if (variant === "message")    return <SkeletonMessage />;
  if (variant === "profile")    return <SkeletonProfile />;
  return <SkeletonDefault />;
}

// ── Shimmer layer مشترك ──────────────────────────────────────────────────────
const S = ({ w = "100%", h = 16, r = 8, mb = 0, style = {} }) => (
  <div className="skel" style={{
    width: w, height: h, borderRadius: r,
    marginBottom: mb, flexShrink: 0,
    ...style,
  }} />
);

// ── بطاقة سيارة عمودية (الرئيسية) ───────────────────────────────────────────
function SkeletonDefault() {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.07)",
      borderRadius: 18, overflow: "hidden",
      // حجم ثابت يمنع CLS
      minHeight: 310,
    }}>
      {/* صورة */}
      <S h={188} r={0} />
      <div style={{ padding: 14 }}>
        {/* اسم السيارة */}
        <S h={17} w="68%" r={6} mb={9} />
        {/* الولاية */}
        <S h={12} w="45%" r={6} mb={12} />
        {/* pills */}
        <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
          <S h={24} w={58} r={20} />
          <S h={24} w={58} r={20} />
          <S h={24} w={72} r={20} />
        </div>
        {/* زر */}
        <S h={40} r={11} />
      </div>
    </div>
  );
}

// ── بطاقة أفقية (luxury / wedding scroll) ────────────────────────────────────
function SkeletonHorizontal() {
  return (
    <div style={{
      flexShrink: 0,
      width: "clamp(200px, calc(var(--section-card-w, 200px) + 40px), 260px)",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: 20, overflow: "hidden",
      minHeight: 240,
    }}>
      <S h={148} r={0} />
      <div style={{ padding: "12px 14px 14px" }}>
        <S h={15} w="72%" r={6} mb={8} />
        <S h={11} w="50%" r={6} mb={10} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <S h={18} w="40%" r={6} />
          <S h={32} w={64} r={10} />
        </div>
      </div>
    </div>
  );
}

// ── بطاقة وكالة ──────────────────────────────────────────────────────────────
function SkeletonAgency() {
  return (
    <div style={{
      flexShrink: 0,
      width: "clamp(168px, 42vw, 204px)",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.07)",
      borderRadius: 18, overflow: "hidden",
      minHeight: 200,
    }}>
      <S h={110} r={0} />
      <div style={{ padding: 12 }}>
        {/* شعار + اسم */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <S h={32} w={32} r={10} style={{ flexShrink: 0 }} />
          <S h={14} w="60%" r={6} />
        </div>
        <S h={11} w="80%" r={5} mb={8} />
        {/* نجوم */}
        <div style={{ display: "flex", gap: 4 }}>
          {[0,1,2,3,4].map(i => <S key={i} h={12} w={12} r={2} />)}
        </div>
      </div>
    </div>
  );
}

// ── بطاقة رحلة ───────────────────────────────────────────────────────────────
function SkeletonTrip() {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.07)",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      minHeight: 110,
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <S h={72} w={100} r={12} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <S h={16} w="70%" r={6} mb={8} />
          <S h={11} w="50%" r={5} mb={10} />
          <div style={{ display: "flex", gap: 8 }}>
            <S h={22} w={80} r={20} />
            <S h={22} w={60} r={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── صف رسالة ─────────────────────────────────────────────────────────────────
function SkeletonMessage() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px",
      borderBottom: "1px solid rgba(255,255,255,.05)",
      minHeight: 72,
    }}>
      {/* أفاتار */}
      <S h={46} w={46} r={23} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <S h={14} w="45%" r={6} />
          <S h={11} w="18%" r={5} />
        </div>
        <S h={11} w="75%" r={5} />
      </div>
    </div>
  );
}

// ── header الملف الشخصي ───────────────────────────────────────────────────────
function SkeletonProfile() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "24px 20px", gap: 14,
    }}>
      {/* صورة شخصية */}
      <S h={88} w={88} r={44} />
      {/* الاسم */}
      <S h={20} w={160} r={8} />
      {/* البريد */}
      <S h={13} w={120} r={6} />
      {/* stats bar */}
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <S h={48} w={72} r={12} />
        <S h={48} w={72} r={12} />
        <S h={48} w={72} r={12} />
      </div>
    </div>
  );
}
