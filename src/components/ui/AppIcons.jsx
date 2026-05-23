/**
 * AppIcons.jsx
 * نظام الأيقونات الموحّد للتطبيق
 * جميع الأيقونات مرسومة بنفس أسلوب NavIcons (خطوط SVG نظيفة)
 */

const S  = 1.75; // سمك الخط الافتراضي
const C  = "currentColor";

/* ─── مساعد عام ─────────────────────────────── */
function Svg({ size = 20, viewBox = "0 0 24 24", children, style }) {
  return (
    <svg
      width={size} height={size}
      viewBox={viewBox}
      fill="none"
      style={style}
    >
      {children}
    </svg>
  );
}

/* ─── أيقونات التنقل السفلي (NavIcons) ─────────
   مُعاد تصديرها من NavIcons.jsx للراحة              */
export { IconSearch, IconHeart, IconRoad, IconBubble, IconMore } from "./NavIcons.jsx";

/* ─── الأيقونات العامة ───────────────────────── */

/** سهم رجوع ← */
export function IconBack({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <polyline points="15 18 9 12 15 6"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/** ✕ إغلاق / مسح */
export function IconClose({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <line x1="18" y1="6" x2="6" y2="18"  stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <line x1="6"  y1="6" x2="18" y2="18" stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** قلب ❤ (قابل للتفعيل) */
export function IconLike({ size = 18, active = false }) {
  const ac = "#EF4444";
  return (
    <Svg size={size}>
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        fill={active ? ac : "none"}
        stroke={active ? ac : "rgba(255,255,255,.85)"}
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 🔍 بحث */
export function IconSearchSm({ size = 16, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={S}/>
      <line x1="16.5" y1="16.5" x2="21" y2="21"
        stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** ⚙ فلتر / ضبط */
export function IconFilter({ size = 16, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <line x1="4"  y1="6"  x2="20" y2="6"  stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <line x1="8"  y1="12" x2="16" y2="12" stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <line x1="11" y1="18" x2="13" y2="18" stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** 📅 تاريخ / سنة */
export function IconCalendar({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <rect x="3" y="4" width="18" height="18" rx="3"
        stroke={color} strokeWidth={S}/>
      <line x1="3"  y1="9"  x2="21" y2="9"  stroke={color} strokeWidth={S}/>
      <line x1="8"  y1="2"  x2="8"  y2="6"  stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <line x1="16" y1="2"  x2="16" y2="6"  stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** 💺 مقاعد */
export function IconSeat({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <path d="M6 4v8a2 2 0 002 2h8"
        stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <rect x="10" y="14" width="8" height="6" rx="2"
        stroke={color} strokeWidth={S}/>
      <circle cx="7" cy="19" r="1.5" stroke={color} strokeWidth={S}/>
    </Svg>
  );
}

/** ⛽ وقود */
export function IconFuel({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <rect x="3" y="4" width="12" height="17" rx="2"
        stroke={color} strokeWidth={S}/>
      <path d="M15 8h2a2 2 0 012 2v5a1 1 0 002 0v-5l-2-3"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="7" y1="10" x2="11" y2="10"
        stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** ⚙ ناقل حركة */
export function IconGear({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={S}/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color} strokeWidth={S}/>
    </Svg>
  );
}

/** 📍 موقع / ولاية */
export function IconPin({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"
        stroke={color} strokeWidth={S}/>
      <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={S}/>
    </Svg>
  );
}

/** ✓ موثّق / تأكيد */
export function IconVerified({ size = 18, color = "#34D399" }) {
  return (
    <Svg size={size}>
      <path d="M12 2l2.5 4.5 5-.5-2.5 4.5 2.5 4.5-5-.5L12 19l-2.5-4.5-5 .5 2.5-4.5L4.5 6l5 .5z"
        stroke={color} strokeWidth={S} strokeLinejoin="round"/>
      <polyline points="9 12 11 14 15 10"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/** ⭐ نجمة تقييم */
export function IconStar({ size = 14, filled = true, color = "#FBBF24" }) {
  return (
    <Svg size={size}>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={S}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** 🏢 وكالة / مبنى */
export function IconBuilding({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={S}/>
      <line x1="3" y1="9"  x2="21" y2="9"  stroke={color} strokeWidth={S}/>
      <line x1="9" y1="21" x2="9"  y2="9"  stroke={color} strokeWidth={S}/>
      <rect x="12" y="13" width="4" height="8" rx="1" stroke={color} strokeWidth={S}/>
    </Svg>
  );
}

/** 🚗 سيارة */
export function IconCar({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <rect x="2" y="9" width="20" height="10" rx="3" stroke={color} strokeWidth={S}/>
      <path d="M5 9l2-5h10l2 5" stroke={color} strokeWidth={S} strokeLinejoin="round"/>
      <circle cx="7"  cy="19" r="2" stroke={color} strokeWidth={S}/>
      <circle cx="17" cy="19" r="2" stroke={color} strokeWidth={S}/>
    </Svg>
  );
}

/** 👑 فاخر / لوكس */
export function IconCrown({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <path d="M3 18h18M3 18L5 8l5 5 4-7 4 7 5-5 2 10H3z"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/** 💒 زفاف */
export function IconWedding({ size = 20, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <path d="M12 21C12 21 4 15 4 9a8 8 0 0116 0c0 6-8 12-8 12z"
        stroke={color} strokeWidth={S}/>
      <path d="M9 9.5c0-1.66 1.34-3 3-3s3 1.34 3 3"
        stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** 🎉 نجاح / احتفال */
export function IconSuccess({ size = 20, color = "#34D399" }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={S}/>
      <polyline points="9 12 11 14 15 10"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/** + زيادة */
export function IconPlus({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <line x1="12" y1="5"  x2="12" y2="19" stroke={color} strokeWidth={S} strokeLinecap="round"/>
      <line x1="5"  y1="12" x2="19" y2="12" stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** − نقصان */
export function IconMinus({ size = 18, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={S} strokeLinecap="round"/>
    </Svg>
  );
}

/** › السهم لليمين  */
export function IconChevronRight({ size = 16, color = "currentColor" }) {
  return (
    <Svg size={size}>
      <polyline points="9 18 15 12 9 6"
        stroke={color} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

