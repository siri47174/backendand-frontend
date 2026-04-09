import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const VehicleGPSIntegration = () => {
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const fetchVehicleGPS = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/vehicle/fetch-locations");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setVehicleLocation(data[0]);
        setHistory(prev => [{ ...data[0], time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
      }
      setError("");
    } catch {
      setError("Unable to fetch GPS data. Check backend connection.");
    }
  };

  useEffect(() => {
    let interval;
    if (tracking) {
      fetchVehicleGPS();
      interval = setInterval(fetchVehicleGPS, 5000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const S = {
    page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
    heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
    card: { backgroundColor: "#fff", borderRadius: "8px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "20px" },
    gpsBox: { background: tracking ? "#e8f5e9" : "#f5f5f5", borderRadius: 8, padding: 24, textAlign: "center", marginBottom: 16 },
    dot: { width: 14, height: 14, borderRadius: "50%", background: tracking ? "#27ae60" : "#ccc", display: "inline-block", marginRight: 8, animation: tracking ? "pulse 1s infinite" : "none" },
    btnRow: { display: "flex", gap: 12, justifyContent: "center" },
    startBtn: { background: "#27ae60", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 6, cursor: "pointer", fontWeight: "bold", opacity: tracking ? 0.4 : 1 },
    stopBtn: { background: "#e53935", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 6, cursor: "pointer", fontWeight: "bold", opacity: !tracking ? 0.4 : 1 },
    coordBox: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 },
    coordCard: { background: "#f0f4f8", borderRadius: 6, padding: "12px 16px", textAlign: "center" },
    coordVal: { fontSize: 18, fontWeight: "bold", color: "#111" },
    coordLabel: { fontSize: 11, color: "#888", marginTop: 4 },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { background: "#f0f0f0", padding: "9px 12px", fontSize: 12, fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
    td: { padding: "9px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0" },
  };

  return (
    <div style={S.page}>
      <h2 className="sendo-heading">GPS Integration</h2>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      <h2 style={S.heading}>Vehicle GPS Tracking</h2>
      <div style={S.card}>
        <div style={S.gpsBox}>
          <div style={{ marginBottom: 12, fontSize: 13, color: "#555" }}>
            <span style={S.dot}></span>
            {tracking ? "Live tracking active — updating every 5 seconds" : "GPS tracking inactive"}
          </div>
          {error && <div style={{ color: "#e53935", fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <div style={S.btnRow}>
            <button style={S.startBtn} disabled={tracking} onClick={() => setTracking(true)}>📡 Start Tracking</button>
            <button style={S.stopBtn} disabled={!tracking} onClick={() => setTracking(false)}>■ Stop Tracking</button>
          </div>
        </div>
        {vehicleLocation && (
          <div style={S.coordBox}>
            <div style={S.coordCard}>
              <div style={S.coordVal}>{vehicleLocation.lat?.toFixed(4) || vehicleLocation.latitude?.toFixed(4) || "—"}</div>
              <div style={S.coordLabel}>Latitude</div>
            </div>
            <div style={S.coordCard}>
              <div style={S.coordVal}>{vehicleLocation.lng?.toFixed(4) || vehicleLocation.longitude?.toFixed(4) || "—"}</div>
              <div style={S.coordLabel}>Longitude</div>
            </div>
            <div style={S.coordCard}>
              <div style={S.coordVal}>{vehicleLocation.speed ?? "—"}</div>
              <div style={S.coordLabel}>Speed (km/h)</div>
            </div>
          </div>
        )}
      </div>
      {history.length > 0 && (
        <div style={S.card}>
          <b>Location History (last 10)</b>
          <table style={{ ...S.table, marginTop: 12 }}>
            <thead><tr>{["Time","Latitude","Longitude","Speed"].map(h => <th style={S.th} key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td style={S.td}>{h.time}</td>
                  <td style={S.td}>{(h.lat || h.latitude)?.toFixed(5)}</td>
                  <td style={S.td}>{(h.lng || h.longitude)?.toFixed(5)}</td>
                  <td style={S.td}>{h.speed} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleGPSIntegration;
