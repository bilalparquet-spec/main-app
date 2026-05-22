import React from "react";
import { Agency } from "../data";

const LOGO_COLORS = [
  { bg: "#7C3AED", accent: "#A855F7" }, // purple
  { bg: "#0F766E", accent: "#14B8A6" }, // teal
  { bg: "#1D4ED8", accent: "#3B82F6" }, // blue
  { bg: "#B45309", accent: "#F59E0B" }, // amber
  { bg: "#065F46", accent: "#10B981" }, // emerald
  { bg: "#9D174D", accent: "#EC4899" }, // pink
];

interface Props {
  agency: Agency;
  size?: number;
  style?: React.CSSProperties;
}

export function AgencyLogo({ agency, size = 40, style = {} }: Props) {
  const c = LOGO_COLORS[(agency.id - 1) % LOGO_COLORS.length];
  const initials = agency.initials || (agency.ar ? agency.ar.slice(0, 2) : agency.fr.slice(0, 2));

  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.25,
      background: `linear-gradient(135deg,${c.bg},${c.accent})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, position: "relative", overflow: "hidden",
      boxShadow: `0 4px 14px ${c.bg}55`,
      ...style,
    }}>
      {/* Watermark car icon */}
      <svg
        width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24"
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", bottom: -2, right: -2 }}
      >
        <rect x="1" y="11" width="22" height="9" rx="2"/>
        <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/>
        <circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
      </svg>
      <span style={{
        fontSize: size * 0.32, fontWeight: 900, color: "#fff",
        letterSpacing: "-0.5px", position: "relative", zIndex: 1,
        fontFamily: "'Qatar2022Font','Cairo',sans-serif",
      }}>
        {initials}
      </span>
    </div>
  );
}
