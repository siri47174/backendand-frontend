import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

const DriverTimeSheet = () => {
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [records, setRecords] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  useEffect(() => {
    let interval;
    if (tracking) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const fetchRecords = () =>
    axios.get(`${BASE_URL}/onboarding/timesheet`).then(r => setRecords(r.data || [])).catch(() => {});

  useEffect(() => { fetchRecords(); }, []);

  const fmt = (secs) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    setStartTime(new Date());
    setElapsed(0);
    setTracking(true);
  };

  const handleStop = async () => {
    setTracking(false);
    const endTime = new Date();
    const totalMins = Math.round(elapsed / 60);
    try {
      await axios.post(`${BASE_URL}/onboarding/timesheet`, {
        driverName, vehicleNumber,
        date: new Date().toISOString().split("T")[0],
        startTime: startTime?.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
        totalHours: (elapsed / 3600).toFixed(2),
        totalMinutes: totalMins,
      });
      fetchRecords();
    } catch { alert("Save failed — check backend"); }
    setElapsed(0);
  };

  const S = {
    page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
    heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
    card: { backgroundColor: "#fff", borderRadius: "8px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" },
    timerBox: { textAlign: "center", padding: "32px", background: tracking ? "#e8f5e9" : "#f5f5f5", borderRadius: "8px", marginBottom: "20px" },
    timer: { fontSize: 48, fontWeight: "bold", fontVariantNumeric: "tabular-nums", color: tracking ? "#27ae60" : "#333", letterSpacing: 4 },
    row: { display: "flex", gap: "12px", justifyContent: "center", marginTop: 16 },
    startBtn: { backgroundColor: "#27ae60", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: 14, opacity: tracking ? 0.4 : 1 },
    stopBtn: { backgroundColor: "#e53935", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: 14, opacity: !tracking ? 0.4 : 1 },
    inputRow: { display: "flex", gap: "16px", marginBottom: 16 },
    inputG: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
    label: { fontSize: 12, fontWeight: "bold", color: "#555" },
    input: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 16 },
    th: { background: "#f0f0f0", padding: "9px 12px", fontSize: 12, fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
    td: { padding: "9px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0" },
  };

  return (
    <div style={S.page}>
      <h2 className="sendo-heading">Driver Timesheet</h2>
      <h2 style={S.heading}>Driver Timesheet</h2>
      <div style={S.card}>
        <div style={S.inputRow}>
          <div style={S.inputG}>
            <label style={S.label}>Driver Name</label>
            <input style={S.input} value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter driver name" disabled={tracking} />
          </div>
          <div style={S.inputG}>
            <label style={S.label}>Vehicle Number</label>
            <input style={S.input} value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} placeholder="e.g. MH12AB1234" disabled={tracking} />
          </div>
        </div>
        <div style={S.timerBox}>
          <div style={S.timer}>{fmt(elapsed)}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
            {tracking ? `Started at ${startTime?.toLocaleTimeString()}` : "Press Start to begin tracking"}
          </div>
          <div style={S.row}>
            <button style={S.startBtn} disabled={tracking} onClick={handleStart}>▶ Start Duty</button>
            <button style={S.stopBtn} disabled={!tracking} onClick={handleStop}>■ End Duty</button>
          </div>
        </div>
      </div>
      <div style={S.card}>
        <b>Timesheet Records</b>
        <table style={S.table}>
          <thead><tr>{["Driver","Vehicle","Date","Start","End","Hours","Minutes"].map(h => <th style={S.th} key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {records.length ? records.map((r, i) => (
              <tr key={i}>
                <td style={S.td}>{r.driverName}</td>
                <td style={S.td}>{r.vehicleNumber}</td>
                <td style={S.td}>{r.date}</td>
                <td style={S.td}>{r.startTime}</td>
                <td style={S.td}>{r.endTime}</td>
                <td style={S.td}><b>{r.totalHours}h</b></td>
                <td style={S.td}>{r.totalMinutes} min</td>
              </tr>
            )) : <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>No timesheet records yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverTimeSheet;
