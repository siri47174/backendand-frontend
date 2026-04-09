import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { label: "Vehicle Expenses", path: "/vehicle-expenses", icon: "🚛", desc: "Fuel, repair & maintenance costs" },
  { label: "Other Expenses", path: "/others", icon: "📋", desc: "Office & miscellaneous expenses" },
];

export default function ExpensesManagement() {
  const nav = useNavigate();
  return (
    <div className="sendo-page">
      <h2 className="sendo-heading">Expense Management</h2>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "600px" }}>
        {tiles.map(t => (
          <div key={t.path} onClick={() => nav(t.path)}
            style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "36px 20px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "2px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFC107"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>{t.icon}</div>
            <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 8, color: "#111" }}>{t.label}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
