import React from "react";
import { Ic } from "./Icons";

// ── Stars ─────────────────────────────────────────────────────────────────────
export const Stars = ({ r }: { r: number }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i}>{Ic.Star(i <= Math.round(r))}</span>
    ))}
    <span style={{ color: "#94a3b8", fontSize: 12, marginRight: 3 }}>{r}</span>
  </span>
);

// ── Chip ──────────────────────────────────────────────────────────────────────
export const Chip = ({
  icon,
  label,
  c = "#86EFAC",
  bg = "rgba(134,239,172,.09)",
  br = "rgba(134,239,172,.25)",
}: {
  icon?: React.ReactNode;
  label?: string;
  c?: string;
  bg?: string;
  br?: string;
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: bg,
      border: `1px solid ${br}`,
      color: c,
      padding: "2px 9px",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 700,
    }}
  >
    {icon}
    {label}
  </span>
);

// ── BtnGlow ───────────────────────────────────────────────────────────────────
export const BtnGlow = ({
  onClick,
  style,
  children,
  className,
  title,
}: {
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <button
    onClick={onClick}
    className={className}
    title={title}
    style={{ transition: "all .25s", cursor: "pointer", ...style }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
      (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      (e.currentTarget as HTMLElement).style.filter = "none";
    }}
  >
    {children}
  </button>
);

// ── AgencyLogo ────────────────────────────────────────────────────────────────
export const AgencyLogo = ({
  agency,
  size = 40,
  style = {},
}: {
  agency: any;
  size?: number;
  style?: React.CSSProperties;
}) => {
  const colors = [
    { bg: "#7C3AED", accent: "#A855F7" },
    { bg: "#0F766E", accent: "#14B8A6" },
    { bg: "#1D4ED8", accent: "#3B82F6" },
    { bg: "#B45309", accent: "#F59E0B" },
    { bg: "#065F46", accent: "#10B981" },
    { bg: "#9D174D", accent: "#EC4899" },
  ];
  const c = colors[(agency.id - 1) % colors.length];
  const initials =
    agency.initials ||
    (agency.ar ? agency.ar.slice(0, 2) : agency.fr?.slice(0, 2));

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: `linear-gradient(135deg,${c.bg},${c.accent})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 4px 14px ${c.bg}55`,
        ...style,
      }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "absolute", bottom: -2, right: -2 }}
      >
        <rect x="1" y="11" width="22" height="9" rx="2" />
        <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
        <circle cx="7" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </svg>
      <span
        style={{
          fontSize: size * 0.32,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 1,
          fontFamily: "'Qatar2022Font','Cairo',sans-serif",
        }}
      >
        {initials}
      </span>
    </div>
  );
};
