import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

const DriverVehicleTracking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${BASE_URL}/vehicle/fetch-locations`);
      const data = await res.json();
      if (Array.isArray(data)) { setVehicles(data); setLastUpdated(new Date().toLocaleTimeString()); setError(""); }
    } catch { setError("Unable to fetch vehicle locations. Check backend connection."); }
  };

  useEffect(() => {
    let interval;
    if (tracking) { fetchLocations(); interval = setInterval(fetchLocations, 5000); }
    return () => clearInterval(interval);
  }, [tracking]);

  const selectedVehicle = selected !== null ? vehicles[selected] : null;

  const S = {
    page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
    heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
    card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
    controlRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" },
    startBtn: { background: tracking ? "#ccc" : "#27ae60", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
    stopBtn: { background: !tracking ? "#ccc" : "#e53935", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: !tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
    statusDot: { width: 10, height: 10, borderRadius: "50%", background: tracking ? "#27ae60" : "#ccc", display: "inline-block", marginRight: 6 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 },
    vehicleCard: (sel, moving) => ({ padding: "16px", borderRadius: 8, border: sel ? "2px solid #FFC107" : "2px solid transparent", background: sel ? "#fffbf0" : "#f9f9f9", cursor: "pointer", transition: "all 0.15s", position: "relative" }),
    vehId: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
    vehStatus: (m) => ({ fontSize: 11, fontWeight: "bold", color: m ? "#27ae60" : "#e53935", background: m ? "#e6f9ee" : "#fde8e8", padding: "2px 8px", borderRadius: 10, display: "inline-block" }),
    detailBox: { background: "#f0f4f8", borderRadius: 8, padding: 20, marginTop: 16 },
    detailGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
    detailCard: { background: "#fff", borderRadius: 6, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
    detailVal: { fontSize: 18, fontWeight: "bold", color: "#111" },
    detailLabel: { fontSize: 11, color: "#888", marginTop: 4 },
  };

  return (
    <div style={S.page}>
      <h2 className="sendo-heading">Vehicle Tracking</h2>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      <h2 style={S.heading}>Driver Vehicle Tracking</h2>
      <div style={S.card}>
        <div style={S.controlRow}>
          <span style={S.statusDot}></span>
          <span style={{ fontSize: 13, color: "#555", marginRight: 12 }}>
            {tracking ? `Live · Updated ${lastUpdated || "..."}` : "Tracking inactive"}
          </span>
          <button style={S.startBtn} disabled={tracking} onClick={() => setTracking(true)}>📡 Start Tracking</button>
          <button style={S.stopBtn} disabled={!tracking} onClick={() => setTracking(false)}>■ Stop</button>
        </div>
        {error && <div style={{ color: "#e53935", fontSize: 12, marginBottom: 12 }}>{error}</div>}
        {vehicles.length > 0 ? (
          <>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{vehicles.length} vehicle(s) tracked · Click a card to view details</div>
            <div style={S.grid}>
              {vehicles.map((v, i) => {
                const moving = Number(v.speed) > 0;
                return (
                  <div key={i} style={S.vehicleCard(selected === i, moving)} onClick={() => setSelected(selected === i ? null : i)}>
                    <div style={S.vehId}>{v.id || v.vehicleNumber || `Vehicle ${i+1}`}</div>
                    <div style={{ fontSize: 12, color: "#666", margin: "4px 0" }}>{(v.lat || v.latitude)?.toFixed(4)}, {(v.lng || v.longitude)?.toFixed(4)}</div>
                    <span style={S.vehStatus(moving)}>{moving ? `Moving · ${v.speed} km/h` : "Stopped"}</span>
                  </div>
                );
              })}
            </div>
            {selectedVehicle && (
              <div style={S.detailBox}>
                <b>Vehicle {selectedVehicle.id || selectedVehicle.vehicleNumber || `#${selected+1}`} — Details</b>
                <div style={S.detailGrid}>
                  <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lat || selectedVehicle.latitude)?.toFixed(5)}</div><div style={S.detailLabel}>Latitude</div></div>
                  <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lng || selectedVehicle.longitude)?.toFixed(5)}</div><div style={S.detailLabel}>Longitude</div></div>
                  <div style={S.detailCard}><div style={S.detailVal}>{selectedVehicle.speed ?? "0"} km/h</div><div style={S.detailLabel}>Speed</div></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>
            {tracking ? "Fetching vehicle locations..." : "Start tracking to see vehicle locations"}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverVehicleTracking;
