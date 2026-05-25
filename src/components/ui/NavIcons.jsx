const C_ACTIVE = "#A78BFA";
const C_INACTIVE = "rgba(255,255,255,.42)";
const S = 1.75;

/* استكشف — Search / Magnifying glass loop */
export function IconSearch({ active }) {
  const c = active ? C_ACTIVE : C_INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="12" cy="12" r="7"
        fill="none" stroke={c} strokeWidth={S}/>
      <line x1="17.5" y1="17.5" x2="24" y2="24"
        stroke={c} strokeWidth={S} strokeLinecap="round"/>
      {active && (
        <circle cx="12" cy="12" r="7"
          fill={C_ACTIVE} opacity=".18"/>
      )}
    </svg>
  );
}

/* المفضلة — Favorites / Heart */
export function IconHeart({ active }) {
  const c = active ? C_ACTIVE : C_INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 23.5C14 23.5 4 17.2 4 10.5C4 7.467 6.467 5 9.5 5C11.3 5 12.9 5.9 14 7.3C15.1 5.9 16.7 5 18.5 5C21.533 5 24 7.467 24 10.5C24 17.2 14 23.5 14 23.5Z"
        fill={active ? C_ACTIVE : "none"}
        stroke={active ? "none" : c}
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* رحلاتي — Trips / Road with dashed center line */
export function IconRoad({ active }) {
  const c = active ? C_ACTIVE : C_INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      {/* Road surface */}
      <path
        d="M5 24L10 4H18L23 24H5Z"
        fill={active ? C_ACTIVE : "none"}
        stroke={active ? "none" : c}
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Center dashes */}
      <line x1="14" y1="20" x2="14" y2="17"
        stroke={active ? "#07080F" : c} strokeWidth="1.5" strokeLinecap="round" opacity={active ? ".4" : ".6"}/>
      <line x1="14" y1="14.5" x2="14" y2="11.5"
        stroke={active ? "#07080F" : c} strokeWidth="1.5" strokeLinecap="round" opacity={active ? ".4" : ".6"}/>
      <line x1="14" y1="9" x2="14" y2="6.5"
        stroke={active ? "#07080F" : c} strokeWidth="1.5" strokeLinecap="round" opacity={active ? ".4" : ".6"}/>
    </svg>
  );
}

/* رسائل — Inbox / Speech bubble */
export function IconBubble({ active }) {
  const c = active ? C_ACTIVE : C_INACTIVE;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path
        d="M4 5C4 4.448 4.448 4 5 4H23C23.552 4 24 4.448 24 5V18C24 18.552 23.552 19 23 19H16L11 24V19H5C4.448 19 4 18.552 4 18V5Z"
        fill={active ? C_ACTIVE : "none"}
        stroke={active ? "none" : c}
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lines inside bubble */}
      <line x1="9" y1="10" x2="19" y2="10"
        stroke={active ? "#07080F" : c}
        strokeWidth="1.5" strokeLinecap="round" opacity={active ? ".35" : ".5"}/>
      <line x1="9" y1="13.5" x2="16" y2="13.5"
        stroke={active ? "#07080F" : c}
        strokeWidth="1.5" strokeLinecap="round" opacity={active ? ".35" : ".5"}/>
    </svg>
  );
}

/* حسابي — More / Three horizontal dots */
export function IconMore({ active }) {
  const c = active ? C_ACTIVE : C_INACTIVE;
  const r = active ? 2.2 : 2;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="6"  cy="14" r={r} fill={c}/>
      <circle cx="14" cy="14" r={r} fill={c}/>
      <circle cx="22" cy="14" r={r} fill={c}/>
    </svg>
  );
}
