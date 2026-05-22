import React from "react";
import { Ic } from "./Icons";

// ── Stars rating display ──────────────────────────────────────────────────────
export function Stars({ r }: { r: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{Ic.Star(i <= Math.round(r))}</span>
      ))}
      <span style={{ color: "#94a3b8", fontSize: 12, marginRight: 3 }}>{r}</span>
    </span>
  );
}

// ── Badge chip ────────────────────────────────────────────────────────────────
interface ChipProps {
  icon?: React.ReactNode;
  label?: string;
  c?: string;
  bg?: string;
  br?: string;
}

export function Chip({
  icon,
  label,
  c = "#86EFAC",
  bg = "rgba(134,239,172,.09)",
  br = "rgba(134,239,172,.25)",
}: ChipProps) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: bg, border: `1px solid ${br}`, color: c,
      padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700,
    }}>
      {icon}{label}
    </span>
  );
}

// ── Glowing button ────────────────────────────────────────────────────────────
interface BtnGlowProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

export function BtnGlow({ onClick, style, children, className }: BtnGlowProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ transition: "all .25s", cursor: "pointer", ...style }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.filter = "none";
      }}
    >
      {children}
    </button>
  );
}
