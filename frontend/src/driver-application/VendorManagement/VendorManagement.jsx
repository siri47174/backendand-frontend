import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { label: "Vendor Onboarding", path: "/vendor-onboarding", icon: "🏢", desc: "Register new vendors" },
  { label: "Trip Sheet", path: "/trip-sheet", icon: "🗺️", desc: "Manage trip assignments" },
  { label: "Advance", path: "/advance", icon: "💰", desc: "Vendor advance payments" },
  { label: "Deductions", path: "/deduction", icon: "📉", desc: "Track vendor deductions" },
  { label: "Payments", path: "/payment", icon: "💳", desc: "Process vendor payments" },
];

export default function VendorManagement() {
  const nav = useNavigate();
  return (
    <div className="sendo-page">
      <h2 className="sendo-heading">Vendor Management</h2>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", maxWidth: "800px" }}>
        {tiles.map(t => (
          <div key={t.path} onClick={() => nav(t.path)}
            style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "28px 16px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "2px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFC107"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{t.icon}</div>
            <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 6, color: "#111" }}>{t.label}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
