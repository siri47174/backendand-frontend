// import React, { useState, useRef, useEffect } from "react";

// const DriverLiveTracking = () => {
//   const [location, setLocation] = useState(null);
//   const [tracking, setTracking] = useState(false);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);
//   const [driverName, setDriverName] = useState("");
//   const [vehicleNo, setVehicleNo] = useState("");
//   const watchIdRef = useRef(null);

//   const handleStart = () => {
//     if (!navigator.geolocation) { setError("Geolocation not supported by this browser."); return; }
//     setError("");
//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy?.toFixed(0), time: new Date().toLocaleTimeString() };
//         setLocation(coords);
//         setHistory(prev => [coords, ...prev].slice(0, 15));
//       },
//       (err) => setError(`Location error: ${err.message}`),
//       { enableHighAccuracy: true, maximumAge: 0 }
//     );
//     setTracking(true);
//   };

//   const handleStop = () => {
//     if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
//     setTracking(false);
//   };

//   useEffect(() => () => { if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current); }, []);

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
//     statusBox: { background: tracking ? "#e8f5e9" : "#f5f5f5", borderRadius: 8, padding: "20px 24px", textAlign: "center", marginBottom: 16 },
//     pulse: { width: 12, height: 12, borderRadius: "50%", background: tracking ? "#27ae60" : "#ccc", display: "inline-block", marginRight: 8 },
//     coordGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 },
//     coordCard: { background: "#f0f4f8", borderRadius: 6, padding: "12px", textAlign: "center" },
//     coordVal: { fontSize: 16, fontWeight: "bold", color: "#111", fontVariantNumeric: "tabular-nums" },
//     coordLabel: { fontSize: 11, color: "#888", marginTop: 4 },
//     btnRow: { display: "flex", gap: 12, justifyContent: "center", marginTop: 16 },
//     startBtn: { background: tracking ? "#ccc" : "#27ae60", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 6, cursor: tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
//     stopBtn: { background: !tracking ? "#ccc" : "#e53935", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 6, cursor: !tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
//     inputRow: { display: "flex", gap: 16, marginBottom: 16 },
//     inputG: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
//     label: { fontSize: 12, fontWeight: "bold", color: "#555" },
//     input: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 },
//     table: { width: "100%", borderCollapse: "collapse", marginTop: 12 },
//     th: { background: "#f0f0f0", padding: "9px 12px", fontSize: 12, fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
//     td: { padding: "9px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0", fontVariantNumeric: "tabular-nums" },
//   };

//   return (
//     <div style={S.page}>
//       <h2 className="sendo-heading">Driver Live Tracking</h2>
//       <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
//       <h2 style={S.heading}>Driver Live Tracking</h2>
//       <div style={S.card}>
//         <div style={S.inputRow}>
//           <div style={S.inputG}><label style={S.label}>Driver Name</label><input style={S.input} value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter driver name" disabled={tracking} /></div>
//           <div style={S.inputG}><label style={S.label}>Vehicle Number</label><input style={S.input} value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} placeholder="e.g. MH12AB1234" disabled={tracking} /></div>
//         </div>
//         <div style={S.statusBox}>
//           <div style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>
//             <span style={{ ...S.pulse, animation: tracking ? "blink 1s infinite" : "none" }}></span>
//             {tracking ? "Live location tracking active" : "Tracking inactive — press Start to begin"}
//           </div>
//           {error && <div style={{ color: "#e53935", fontSize: 12, marginBottom: 8 }}>{error}</div>}
//           {location && (
//             <div style={S.coordGrid}>
//               <div style={S.coordCard}><div style={S.coordVal}>{location.lat.toFixed(5)}</div><div style={S.coordLabel}>Latitude</div></div>
//               <div style={S.coordCard}><div style={S.coordVal}>{location.lng.toFixed(5)}</div><div style={S.coordLabel}>Longitude</div></div>
//               <div style={S.coordCard}><div style={S.coordVal}>±{location.accuracy}m</div><div style={S.coordLabel}>Accuracy</div></div>
//             </div>
//           )}
//           <div style={S.btnRow}>
//             <button style={S.startBtn} disabled={tracking} onClick={handleStart}>▶ Start Tracking</button>
//             <button style={S.stopBtn} disabled={!tracking} onClick={handleStop}>■ Stop Tracking</button>
//           </div>
//         </div>
//       </div>
//       {history.length > 0 && (
//         <div style={S.card}>
//           <b>Location History</b>
//           <table style={S.table}>
//             <thead><tr>{["Time","Latitude","Longitude","Accuracy"].map(h => <th style={S.th} key={h}>{h}</th>)}</tr></thead>
//             <tbody>
//               {history.map((h, i) => (
//                 <tr key={i} style={{ background: i === 0 ? "#f0fdf4" : "white" }}>
//                   <td style={S.td}>{h.time}</td>
//                   <td style={S.td}>{h.lat.toFixed(6)}</td>
//                   <td style={S.td}>{h.lng.toFixed(6)}</td>
//                   <td style={S.td}>±{h.accuracy}m</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DriverLiveTracking;
import React, { useState, useRef, useEffect } from "react";

const DriverLiveTracking = () => {
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const watchIdRef = useRef(null);

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
    statusBox: {
      backgroundColor: tracking ? "#e8f5e9" : "#f9f9f9",
      border: `2px solid ${tracking ? "#28a745" : "#e0e0e0"}`,
      borderRadius: "8px",
      padding: "24px",
      textAlign: "center",
      marginBottom: "20px",
    },
    statusText: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    pulseDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: tracking ? "#28a745" : "#ccc",
      display: "inline-block",
      animation: tracking ? "blink 1s infinite" : "none",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "13px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    coordGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginTop: "16px",
      marginBottom: "16px",
    },
    coordCard: {
      backgroundColor: "#fff",
      border: "1.5px solid #000",
      borderRadius: "6px",
      padding: "14px",
      textAlign: "center",
    },
    coordValue: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#000",
      fontVariantNumeric: "tabular-nums",
    },
    coordLabel: {
      fontSize: "12px",
      color: "#666",
      marginTop: "4px",
    },
    btnRow: {
      display: "flex",
      gap: "14px",
      justifyContent: "center",
      marginTop: "16px",
    },
    btnStart: {
      backgroundColor: tracking ? "#ccc" : "#28a745",
      color: "white",
      border: "none",
      padding: "10px 32px",
      borderRadius: "4px",
      cursor: tracking ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnStop: {
      backgroundColor: !tracking ? "#ccc" : "#dc3545",
      color: "white",
      border: "none",
      padding: "10px 32px",
      borderRadius: "4px",
      cursor: !tracking ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "14px",
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
      fontVariantNumeric: "tabular-nums",
    },
  };

  const handleStart = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }
    setError("");
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy?.toFixed(0),
          time: new Date().toLocaleTimeString(),
        };
        setLocation(coords);
        setHistory(prev => [coords, ...prev].slice(0, 15));
      },
      (err) => setError(`Location error: ${err.message}`),
      { enableHighAccuracy: true, maximumAge: 0 }
    );
    setTracking(true);
  };

  const handleStop = () => {
    if (watchIdRef.current !== null)
      navigator.geolocation.clearWatch(watchIdRef.current);
    setTracking(false);
  };

  useEffect(() => () => {
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
      <div style={styles.pageHeader}>DRIVER LIVE TRACKING</div>

      <div style={styles.innerPad}>

        {/* Driver & Vehicle */}
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
              value={vehicleNo}
              onChange={e => setVehicleNo(e.target.value)}
              placeholder="e.g. MH12AB1234"
              disabled={tracking}
            />
          </div>
        </div>

        {/* Tracking Status */}
        <div style={styles.sectionTitle}>Live Location</div>
        <div style={styles.statusBox}>
          <div style={styles.statusText}>
            <span style={styles.pulseDot}></span>
            {tracking
              ? "Live location tracking active"
              : "Tracking inactive — press Start to begin"}
          </div>

          {error && <div style={styles.errorText}>⚠ {error}</div>}

          {location && (
            <div style={styles.coordGrid}>
              <div style={styles.coordCard}>
                <div style={styles.coordValue}>{location.lat.toFixed(5)}</div>
                <div style={styles.coordLabel}>Latitude</div>
              </div>
              <div style={styles.coordCard}>
                <div style={styles.coordValue}>{location.lng.toFixed(5)}</div>
                <div style={styles.coordLabel}>Longitude</div>
              </div>
              <div style={styles.coordCard}>
                <div style={styles.coordValue}>±{location.accuracy}m</div>
                <div style={styles.coordLabel}>Accuracy</div>
              </div>
            </div>
          )}

          <div style={styles.btnRow}>
            <button style={styles.btnStart} disabled={tracking} onClick={handleStart}>
              ▶ Start Tracking
            </button>
            <button style={styles.btnStop} disabled={!tracking} onClick={handleStop}>
              ■ Stop Tracking
            </button>
          </div>
        </div>

        {/* Location History */}
        {history.length > 0 && (
          <>
            <div style={styles.divider} />
            <div style={styles.sectionTitle}>Location History</div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Time", "Latitude", "Longitude", "Accuracy"].map(h => (
                      <th style={styles.th} key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} style={{
                      backgroundColor: i === 0 ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "#fafafa"
                    }}>
                      <td style={styles.td}>{h.time}</td>
                      <td style={styles.td}>{h.lat.toFixed(6)}</td>
                      <td style={styles.td}>{h.lng.toFixed(6)}</td>
                      <td style={styles.td}>±{h.accuracy}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default DriverLiveTracking;
