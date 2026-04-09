import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { label: "Vehicle Onboarding", path: "/vehicle-onboarding", icon: "🚛", desc: "Register new vehicles" },
  { label: "Documents", path: "/vehicle-documents", icon: "📄", desc: "RC, insurance, permits & expiry" },
  { label: "Truck Maintenance", path: "/truck-maintenance", icon: "🔧", desc: "Regular, tyre, RTO & material" },
  { label: "Live Fleet Tracking", path: "/live-fleet-tracking", icon: "📍", desc: "Real-time vehicle GPS map" },
  { label: "Diesel", path: "/diesel", icon: "⛽", desc: "Fuel fill-up tracking" },
  { label: "Oil Service", path: "/oil-service", icon: "🛢️", desc: "Oil change records" },
  { label: "Spare Parts", path: "/spare-parts", icon: "⚙️", desc: "Parts usage & costs" },
  { label: "Vehicle Tyre", path: "/vehicle-type", icon: "🔵", desc: "Tyre management" },
  { label: "Expenses", path: "/expenses", icon: "💸", desc: "Vehicle & other expenses" },
];

export default function VehicleManagement() {
  const nav = useNavigate();
  return (
    <div className="sendo-page">
      <h2 className="sendo-heading">Vehicle Management</h2>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
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
