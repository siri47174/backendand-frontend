import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { label: "Driver Onboarding", path: "/driver-onboarding", icon: "👤", desc: "Register & manage drivers" },
  { label: "Attendance", path: "/driver-attendance-approval", icon: "📅", desc: "Mark & approve attendance" },
  { label: "Attendance Records", path: "/attendance-records", icon: "📋", desc: "View historical records" },
  { label: "Leave Requests", path: "/driver-leave-admin", icon: "🏖️", desc: "Manage driver leaves" },
  { label: "Advance", path: "/driver-advance", icon: "💰", desc: "Driver advance requests" },
  { label: "Salary", path: "/driver-salary", icon: "💵", desc: "Payroll & salary processing" },
  { label: "Deduction", path: "/driver-deduction", icon: "📉", desc: "Track driver deductions" },
  { label: "Driver Timesheet", path: "/driver-timeSheet", icon: "⏱️", desc: "Duty hours tracking" },
  { label: "Live Tracking", path: "/driver-liveTracking", icon: "📍", desc: "Real-time driver location" },
];

export default function DriverManagement() {
  const nav = useNavigate();
  return (
    <div className="sendo-page">
      <h2 className="sendo-heading">Driver Management</h2>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
        {tiles.map(t => (
          <div key={t.path} onClick={() => nav(t.path)}
            style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "28px 16px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "2px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFC107"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 5, color: "#111" }}>{t.label}</div>
            <div style={{ fontSize: 11, color: "#888" }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
