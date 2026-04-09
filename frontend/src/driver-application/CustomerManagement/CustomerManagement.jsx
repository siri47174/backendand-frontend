import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { label: "Customer Onboarding", path: "/customer-onboarding", icon: "👤", desc: "Register new customers" },
  { label: "Agreement", path: "/agreement", icon: "📄", desc: "Manage customer agreements" },
  { label: "Invoice", path: "/invoice", icon: "🧾", desc: "Create & track invoices" },
  { label: "GST Filing", path: "/gst-file", icon: "🏛️", desc: "GST documents & filing" },
  { label: "MIS Reports", path: "/mis", icon: "📊", desc: "Management info reports" },
  { label: "Payment Status", path: "/payment-status", icon: "💳", desc: "Track payment collections" },
];

export default function CustomerManagement() {
  const nav = useNavigate();
  return (
    <div className="sendo-page">
      <h2 className="sendo-heading">Customer Management</h2>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {tiles.map(t => (
          <div key={t.path} onClick={() => nav(t.path)}
            style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "28px 20px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "2px solid transparent", transition: "all 0.15s" }}
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
