import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

export default function MIS() {
  const [summary, setSummary] = useState({ trips: 0, revenue: 0, expenses: 0, drivers: 0, vehicles: 0, pending: 0 });
  const [period, setPeriod] = useState("This Month");
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const [tripRes, expRes] = await Promise.allSettled([
        axios.get(`${BASE_URL}/trip/trip-sheet`),
        axios.get(`${BASE_URL}/vehicle/expenses`),
      ]);
      const trips = tripRes.status === "fulfilled" ? tripRes.value.data : [];
      const expenses = expRes.status === "fulfilled" ? expRes.value.data : [];
      setSummary({
        trips: trips.length,
        revenue: trips.reduce((a,t) => a+(+t.freight||0), 0),
        expenses: expenses.reduce((a,e) => a+(+e.amount||0), 0),
        drivers: new Set(trips.map(t=>t.driverName).filter(Boolean)).size,
        vehicles: new Set(trips.map(t=>t.vehicleNumber).filter(Boolean)).size,
        pending: trips.filter(t=>t.status==="Pending").length,
      });
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchSummary(); }, [period]);

  const profit = summary.revenue - summary.expenses;

  const S = {
    page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
    heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
    filterRow: { display: "flex", gap: 8, marginBottom: 20 },
    filterBtn: (a) => ({ padding: "7px 18px", borderRadius: 20, border: a ? "none" : "1px solid #ddd", background: a ? "#FFC107" : "#fff", fontWeight: a ? "bold" : "normal", cursor: "pointer", fontSize: 13 }),
    grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 },
    metricCard: (c) => ({ background: c, borderRadius: 10, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }),
    metricVal: { fontSize: 28, fontWeight: "bold", color: "#111" },
    metricLabel: { fontSize: 12, color: "#666", marginTop: 6 },
    metricIcon: { fontSize: 28, marginBottom: 8 },
    card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
    profitBar: (pct) => ({ height: 8, borderRadius: 4, background: profit>=0 ? "#27ae60" : "#e53935", width: `${Math.min(Math.abs(pct),100)}%`, transition: "width 0.5s" }),
    sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 12, color: "#333" },
  };

  const metrics = [
    { icon: "🗺️", label: "Total Trips", value: summary.trips, color: "#e3f2fd" },
    { icon: "💰", label: "Total Revenue", value: `₹${summary.revenue.toLocaleString("en-IN")}`, color: "#e8f5e9" },
    { icon: "📉", label: "Total Expenses", value: `₹${summary.expenses.toLocaleString("en-IN")}`, color: "#fde8e8" },
    { icon: profit >= 0 ? "📈" : "📉", label: "Net Profit/Loss", value: `₹${Math.abs(profit).toLocaleString("en-IN")}`, color: profit >= 0 ? "#f0fdf4" : "#fff5f5" },
    { icon: "👤", label: "Active Drivers", value: summary.drivers, color: "#fff8e1" },
    { icon: "🚛", label: "Active Vehicles", value: summary.vehicles, color: "#f3e5f5" },
  ];

  const revenueBarWidth = summary.revenue > 0 ? (profit / summary.revenue) * 100 : 0;

  return (
    <div style={S.page}>
      <h2 className="sendo-heading">MIS Reports</h2>
      <h2 style={S.heading}>MIS Reports</h2>
      <div style={S.filterRow}>
        {["Today","This Week","This Month","This Quarter","This Year"].map(p => (
          <button key={p} style={S.filterBtn(period===p)} onClick={()=>setPeriod(p)}>{p}</button>
        ))}
        {loading && <span style={{fontSize:12,color:"#888",marginLeft:8,alignSelf:"center"}}>Refreshing...</span>}
      </div>
      <div style={S.grid}>
        {metrics.map((m,i) => (
          <div key={i} style={S.metricCard(m.color)}>
            <div style={S.metricIcon}>{m.icon}</div>
            <div style={S.metricVal}>{m.value}</div>
            <div style={S.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <div style={S.sectionTitle}>Profitability Snapshot</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#888",marginBottom:6}}>
          <span>Revenue: <b style={{color:"#27ae60"}}>₹{summary.revenue.toLocaleString("en-IN")}</b></span>
          <span>Expenses: <b style={{color:"#e53935"}}>₹{summary.expenses.toLocaleString("en-IN")}</b></span>
          <span>{profit>=0?"Profit":"Loss"}: <b style={{color:profit>=0?"#27ae60":"#e53935"}}>₹{Math.abs(profit).toLocaleString("en-IN")}</b></span>
        </div>
        <div style={{background:"#f0f0f0",borderRadius:4,height:8}}>
          <div style={S.profitBar(Math.abs(revenueBarWidth))}></div>
        </div>
        <div style={{fontSize:11,color:"#aaa",marginTop:4}}>
          {summary.revenue > 0 ? `Margin: ${((profit/summary.revenue)*100).toFixed(1)}%` : "No revenue data yet"}
        </div>
      </div>
      <div style={S.card}>
        <div style={S.sectionTitle}>Quick Summary</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["Pending Trips",summary.pending,"#fff8e1"],["Completed Trips",summary.trips-summary.pending,"#e8f5e9"]].map(([l,v,c])=>(
            <div key={l} style={{background:c,borderRadius:8,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:"#555"}}>{l}</span>
              <span style={{fontSize:22,fontWeight:"bold"}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
