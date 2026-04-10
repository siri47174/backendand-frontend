// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const BASE_URL = API_BASE_URL;

// const DriverTimeSheet = () => {
//   const [tracking, setTracking] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [records, setRecords] = useState([]);
//   const [driverName, setDriverName] = useState("");
//   const [vehicleNumber, setVehicleNumber] = useState("");

//   useEffect(() => {
//     let interval;
//     if (tracking) {
//       interval = setInterval(() => setElapsed(e => e + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [tracking]);

//   const fetchRecords = () =>
//     axios.get(`${BASE_URL}/onboarding/timesheet`).then(r => setRecords(r.data || [])).catch(() => {});

//   useEffect(() => { fetchRecords(); }, []);

//   const fmt = (secs) => {
//     const h = Math.floor(secs / 3600).toString().padStart(2, "0");
//     const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
//     const s = (secs % 60).toString().padStart(2, "0");
//     return `${h}:${m}:${s}`;
//   };

//   const handleStart = () => {
//     setStartTime(new Date());
//     setElapsed(0);
//     setTracking(true);
//   };

//   const handleStop = async () => {
//     setTracking(false);
//     const endTime = new Date();
//     const totalMins = Math.round(elapsed / 60);
//     try {
//       await axios.post(`${BASE_URL}/onboarding/timesheet`, {
//         driverName, vehicleNumber,
//         date: new Date().toISOString().split("T")[0],
//         startTime: startTime?.toLocaleTimeString(),
//         endTime: endTime.toLocaleTimeString(),
//         totalHours: (elapsed / 3600).toFixed(2),
//         totalMinutes: totalMins,
//       });
//       fetchRecords();
//     } catch { alert("Save failed — check backend"); }
//     setElapsed(0);
//   };

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     card: { backgroundColor: "#fff", borderRadius: "8px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" },
//     timerBox: { textAlign: "center", padding: "32px", background: tracking ? "#e8f5e9" : "#f5f5f5", borderRadius: "8px", marginBottom: "20px" },
//     timer: { fontSize: 48, fontWeight: "bold", fontVariantNumeric: "tabular-nums", color: tracking ? "#27ae60" : "#333", letterSpacing: 4 },
//     row: { display: "flex", gap: "12px", justifyContent: "center", marginTop: 16 },
//     startBtn: { backgroundColor: "#27ae60", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: 14, opacity: tracking ? 0.4 : 1 },
//     stopBtn: { backgroundColor: "#e53935", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: 14, opacity: !tracking ? 0.4 : 1 },
//     inputRow: { display: "flex", gap: "16px", marginBottom: 16 },
//     inputG: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
//     label: { fontSize: 12, fontWeight: "bold", color: "#555" },
//     input: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 },
//     table: { width: "100%", borderCollapse: "collapse", marginTop: 16 },
//     th: { background: "#f0f0f0", padding: "9px 12px", fontSize: 12, fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
//     td: { padding: "9px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0" },
//   };

//   return (
//     <div style={S.page}>
//       <h2 className="sendo-heading">Driver Timesheet</h2>
//       <h2 style={S.heading}>Driver Timesheet</h2>
//       <div style={S.card}>
//         <div style={S.inputRow}>
//           <div style={S.inputG}>
//             <label style={S.label}>Driver Name</label>
//             <input style={S.input} value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter driver name" disabled={tracking} />
//           </div>
//           <div style={S.inputG}>
//             <label style={S.label}>Vehicle Number</label>
//             <input style={S.input} value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} placeholder="e.g. MH12AB1234" disabled={tracking} />
//           </div>
//         </div>
//         <div style={S.timerBox}>
//           <div style={S.timer}>{fmt(elapsed)}</div>
//           <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
//             {tracking ? `Started at ${startTime?.toLocaleTimeString()}` : "Press Start to begin tracking"}
//           </div>
//           <div style={S.row}>
//             <button style={S.startBtn} disabled={tracking} onClick={handleStart}>▶ Start Duty</button>
//             <button style={S.stopBtn} disabled={!tracking} onClick={handleStop}>■ End Duty</button>
//           </div>
//         </div>
//       </div>
//       <div style={S.card}>
//         <b>Timesheet Records</b>
//         <table style={S.table}>
//           <thead><tr>{["Driver","Vehicle","Date","Start","End","Hours","Minutes"].map(h => <th style={S.th} key={h}>{h}</th>)}</tr></thead>
//           <tbody>
//             {records.length ? records.map((r, i) => (
//               <tr key={i}>
//                 <td style={S.td}>{r.driverName}</td>
//                 <td style={S.td}>{r.vehicleNumber}</td>
//                 <td style={S.td}>{r.date}</td>
//                 <td style={S.td}>{r.startTime}</td>
//                 <td style={S.td}>{r.endTime}</td>
//                 <td style={S.td}><b>{r.totalHours}h</b></td>
//                 <td style={S.td}>{r.totalMinutes} min</td>
//               </tr>
//             )) : <tr><td colSpan={7} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>No timesheet records yet</td></tr>}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DriverTimeSheet;
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

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      marginLeft: "278px",
      backgroundColor: "white",
      marginRight: "10px",
      color: "black",
      minHeight: "calc(100vh - 70px)",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    },
    pageHeader: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "16px 20px",
      fontWeight: "bold",
      fontSize: "22px",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    innerPad: { padding: "20px" },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
      marginTop: "10px",
    },
    inputGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },
    label: {
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "6px",
      display: "block",
      color: "#000",
    },
    input: {
      width: "100%",
      padding: "9px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
      color: "#000",
      backgroundColor: "#fff",
      outline: "none",
    },
    inputDisabled: {
      width: "100%",
      padding: "9px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
      color: "#000",
      backgroundColor: "#f9f9f9",
      outline: "none",
    },
    timerBox: {
      textAlign: "center",
      padding: "32px 20px",
      backgroundColor: tracking ? "#e8f5e9" : "#f9f9f9",
      borderRadius: "8px",
      border: `2px solid ${tracking ? "#28a745" : "#e0e0e0"}`,
      marginBottom: "20px",
    },
    timerText: {
      fontSize: "52px",
      fontWeight: "bold",
      fontVariantNumeric: "tabular-nums",
      color: tracking ? "#28a745" : "#000",
      letterSpacing: "4px",
    },
    timerStatus: {
      fontSize: "13px",
      color: "#666",
      marginTop: "8px",
    },
    btnRow: {
      display: "flex",
      gap: "14px",
      justifyContent: "center",
      marginTop: "18px",
    },
    btnStart: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 32px",
      borderRadius: "4px",
      cursor: tracking ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      opacity: tracking ? 0.4 : 1,
    },
    btnStop: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "10px 32px",
      borderRadius: "4px",
      cursor: !tracking ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      opacity: !tracking ? 0.4 : 1,
    },
    divider: {
      borderTop: "2px solid #f0f0f0",
      margin: "24px 0",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "13px 14px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "left",
      borderBottom: "2px solid #e0a800",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "11px 14px",
      fontSize: "14px",
      color: "#000",
      borderBottom: "1px solid #f0f0f0",
      whiteSpace: "nowrap",
    },
  };

  useEffect(() => {
    let interval;
    if (tracking) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const fetchRecords = () =>
    axios.get(`${BASE_URL}/onboarding/timesheet`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

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
        driverName,
        vehicleNumber,
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

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DRIVER TIMESHEET</div>

      <div style={styles.innerPad}>

        {/* Input Fields */}
        <div style={styles.sectionTitle}>Driver & Vehicle Details</div>
        <div style={styles.inputGrid}>
          <div>
            <label style={styles.label}>Driver Name:</label>
            <input
              style={tracking ? styles.inputDisabled : styles.input}
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
              placeholder="Enter driver name"
              disabled={tracking}
            />
          </div>
          <div>
            <label style={styles.label}>Vehicle Number:</label>
            <input
              style={tracking ? styles.inputDisabled : styles.input}
              value={vehicleNumber}
              onChange={e => setVehicleNumber(e.target.value)}
              placeholder="e.g. MH12AB1234"
              disabled={tracking}
            />
          </div>
        </div>

        {/* Timer */}
        <div style={styles.sectionTitle}>Duty Timer</div>
        <div style={styles.timerBox}>
          <div style={styles.timerText}>{fmt(elapsed)}</div>
          <div style={styles.timerStatus}>
            {tracking
              ? `⏱ Started at ${startTime?.toLocaleTimeString()}`
              : "Press Start to begin tracking"}
          </div>
          <div style={styles.btnRow}>
            <button
              style={styles.btnStart}
              disabled={tracking}
              onClick={handleStart}
            >
              ▶ Start Duty
            </button>
            <button
              style={styles.btnStop}
              disabled={!tracking}
              onClick={handleStop}
            >
              ■ End Duty
            </button>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Records Table */}
        <div style={styles.sectionTitle}>Timesheet Records</div>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Driver", "Vehicle", "Date", "Start Time",
                  "End Time", "Total Hours", "Total Minutes"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? records.map((r, i) => (
                <tr key={i}
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.driverName}</td>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.date}</td>
                  <td style={styles.td}>{r.startTime}</td>
                  <td style={styles.td}>{r.endTime}</td>
                  <td style={styles.td}><b>{r.totalHours}h</b></td>
                  <td style={styles.td}>{r.totalMinutes} min</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No timesheet records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DriverTimeSheet;