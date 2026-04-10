// // import React, { useState, useEffect } from "react";
// // import API_BASE_URL from "../config";

// // const BASE_URL = API_BASE_URL;

// // const DriverVehicleTracking = () => {
// //   const [vehicles, setVehicles] = useState([]);
// //   const [tracking, setTracking] = useState(false);
// //   const [selected, setSelected] = useState(null);
// //   const [error, setError] = useState("");
// //   const [lastUpdated, setLastUpdated] = useState(null);

// //   const fetchLocations = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/vehicle/fetch-locations`);
// //       const data = await res.json();
// //       if (Array.isArray(data)) { setVehicles(data); setLastUpdated(new Date().toLocaleTimeString()); setError(""); }
// //     } catch { setError("Unable to fetch vehicle locations. Check backend connection."); }
// //   };

// //   useEffect(() => {
// //     let interval;
// //     if (tracking) { fetchLocations(); interval = setInterval(fetchLocations, 5000); }
// //     return () => clearInterval(interval);
// //   }, [tracking]);

// //   const selectedVehicle = selected !== null ? vehicles[selected] : null;

// //   const S = {
// //     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
// //     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
// //     card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
// //     controlRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" },
// //     startBtn: { background: tracking ? "#ccc" : "#27ae60", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
// //     stopBtn: { background: !tracking ? "#ccc" : "#e53935", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: !tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
// //     statusDot: { width: 10, height: 10, borderRadius: "50%", background: tracking ? "#27ae60" : "#ccc", display: "inline-block", marginRight: 6 },
// //     grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 },
// //     vehicleCard: (sel, moving) => ({ padding: "16px", borderRadius: 8, border: sel ? "2px solid #FFC107" : "2px solid transparent", background: sel ? "#fffbf0" : "#f9f9f9", cursor: "pointer", transition: "all 0.15s", position: "relative" }),
// //     vehId: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
// //     vehStatus: (m) => ({ fontSize: 11, fontWeight: "bold", color: m ? "#27ae60" : "#e53935", background: m ? "#e6f9ee" : "#fde8e8", padding: "2px 8px", borderRadius: 10, display: "inline-block" }),
// //     detailBox: { background: "#f0f4f8", borderRadius: 8, padding: 20, marginTop: 16 },
// //     detailGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
// //     detailCard: { background: "#fff", borderRadius: 6, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
// //     detailVal: { fontSize: 18, fontWeight: "bold", color: "#111" },
// //     detailLabel: { fontSize: 11, color: "#888", marginTop: 4 },
// //   };

// //   return (
// //     <div style={S.page}>
// //       <h2 className="sendo-heading">Vehicle Tracking</h2>
// //       <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
// //       <h2 style={S.heading}>Driver Vehicle Tracking</h2>
// //       <div style={S.card}>
// //         <div style={S.controlRow}>
// //           <span style={S.statusDot}></span>
// //           <span style={{ fontSize: 13, color: "#555", marginRight: 12 }}>
// //             {tracking ? `Live · Updated ${lastUpdated || "..."}` : "Tracking inactive"}
// //           </span>
// //           <button style={S.startBtn} disabled={tracking} onClick={() => setTracking(true)}>📡 Start Tracking</button>
// //           <button style={S.stopBtn} disabled={!tracking} onClick={() => setTracking(false)}>■ Stop</button>
// //         </div>
// //         {error && <div style={{ color: "#e53935", fontSize: 12, marginBottom: 12 }}>{error}</div>}
// //         {vehicles.length > 0 ? (
// //           <>
// //             <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{vehicles.length} vehicle(s) tracked · Click a card to view details</div>
// //             <div style={S.grid}>
// //               {vehicles.map((v, i) => {
// //                 const moving = Number(v.speed) > 0;
// //                 return (
// //                   <div key={i} style={S.vehicleCard(selected === i, moving)} onClick={() => setSelected(selected === i ? null : i)}>
// //                     <div style={S.vehId}>{v.id || v.vehicleNumber || `Vehicle ${i+1}`}</div>
// //                     <div style={{ fontSize: 12, color: "#666", margin: "4px 0" }}>{(v.lat || v.latitude)?.toFixed(4)}, {(v.lng || v.longitude)?.toFixed(4)}</div>
// //                     <span style={S.vehStatus(moving)}>{moving ? `Moving · ${v.speed} km/h` : "Stopped"}</span>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //             {selectedVehicle && (
// //               <div style={S.detailBox}>
// //                 <b>Vehicle {selectedVehicle.id || selectedVehicle.vehicleNumber || `#${selected+1}`} — Details</b>
// //                 <div style={S.detailGrid}>
// //                   <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lat || selectedVehicle.latitude)?.toFixed(5)}</div><div style={S.detailLabel}>Latitude</div></div>
// //                   <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lng || selectedVehicle.longitude)?.toFixed(5)}</div><div style={S.detailLabel}>Longitude</div></div>
// //                   <div style={S.detailCard}><div style={S.detailVal}>{selectedVehicle.speed ?? "0"} km/h</div><div style={S.detailLabel}>Speed</div></div>
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         ) : (
// //           <div style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>
// //             {tracking ? "Fetching vehicle locations..." : "Start tracking to see vehicle locations"}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DriverVehicleTracking;
// import React, { useState, useEffect } from "react";
// import API_BASE_URL from "../config";

// const BASE_URL = API_BASE_URL;

// const DriverVehicleTracking = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [tracking, setTracking] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [error, setError] = useState("");
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       marginLeft: "278px",
//       backgroundColor: "white",
//       marginRight: "10px",
//       color: "black",
//       minHeight: "calc(100vh - 70px)",
//       boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
//     },
//     pageHeader: {
//       backgroundColor: "#FFC107",
//       color: "#000",
//       padding: "16px 20px",
//       fontWeight: "bold",
//       fontSize: "22px",
//       letterSpacing: "1px",
//       textTransform: "uppercase",
//     },
//     innerPad: { padding: "20px" },
//     sectionTitle: {
//       fontWeight: "bold",
//       fontSize: "15px",
//       color: "#000",
//       borderBottom: "2px solid #FFC107",
//       paddingBottom: "6px",
//       marginBottom: "16px",
//       marginTop: "10px",
//     },
//     filterRow: {
//       display: "flex",
//       gap: "10px",
//       alignItems: "center",
//       marginBottom: "16px",
//       flexWrap: "wrap",
//     },
//     searchInput: {
//       padding: "8px 10px",
//       border: "1.5px solid #000",
//       borderRadius: "4px",
//       fontSize: "14px",
//       color: "#000",
//       outline: "none",
//       width: "220px",
//     },
//     input: {
//       padding: "8px 10px",
//       border: "1.5px solid #000",
//       borderRadius: "4px",
//       fontSize: "14px",
//       color: "#000",
//       outline: "none",
//     },
//     btnBlack: {
//       padding: "9px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       backgroundColor: "black",
//       color: "white",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//     btnBlackDisabled: {
//       padding: "9px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "not-allowed",
//       backgroundColor: "#ccc",
//       color: "#666",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//     btnYellow: {
//       padding: "9px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       backgroundColor: "#FFC107",
//       color: "black",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//     btnYellowDisabled: {
//       padding: "9px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "not-allowed",
//       backgroundColor: "#ccc",
//       color: "#666",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//     table: { width: "100%", borderCollapse: "collapse", marginBottom: "24px" },
//     th: {
//       backgroundColor: "#FFC107",
//       color: "#000",
//       padding: "13px 14px",
//       fontSize: "14px",
//       fontWeight: "bold",
//       textAlign: "left",
//       borderBottom: "2px solid #e0a800",
//       whiteSpace: "nowrap",
//     },
//     td: {
//       padding: "11px 14px",
//       fontSize: "14px",
//       color: "#000",
//       borderBottom: "1px solid #f0f0f0",
//       textAlign: "left",
//     },
//     badgeGreen: {
//       backgroundColor: "#e8f5e9",
//       color: "#2e7d32",
//       padding: "3px 10px",
//       borderRadius: "12px",
//       fontWeight: "bold",
//       fontSize: "13px",
//       border: "1px solid #2e7d32",
//     },
//     badgeRed: {
//       backgroundColor: "#ffebee",
//       color: "#c62828",
//       padding: "3px 10px",
//       borderRadius: "12px",
//       fontWeight: "bold",
//       fontSize: "13px",
//       border: "1px solid #c62828",
//     },
//     grid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
//       gap: "14px",
//       marginBottom: "24px",
//     },
//     vehicleCard: (isSelected) => ({
//       padding: "16px",
//       borderRadius: "6px",
//       border: isSelected ? "2px solid #FFC107" : "2px solid transparent",
//       background: isSelected ? "#fffbf0" : "#fafafa",
//       cursor: "pointer",
//       transition: "all 0.15s",
//     }),
//     detailBox: {
//       background: "#f0f4f8",
//       borderRadius: "8px",
//       padding: "20px",
//       marginBottom: "24px",
//     },
//     detailGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(3, 1fr)",
//       gap: "12px",
//       marginTop: "12px",
//     },
//     detailCard: {
//       background: "#fff",
//       borderRadius: "6px",
//       padding: "14px 16px",
//       textAlign: "center",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
//     },
//     detailVal: { fontSize: "18px", fontWeight: "bold", color: "#111" },
//     detailLabel: { fontSize: "11px", color: "#888", marginTop: "4px" },
//     statusDot: (active) => ({
//       width: "10px",
//       height: "10px",
//       borderRadius: "50%",
//       background: active ? "#27ae60" : "#ccc",
//       display: "inline-block",
//       marginRight: "6px",
//     }),
//     errorText: { color: "#dc3545", fontSize: "13px", marginBottom: "12px" },
//     emptyText: { color: "#aaa", fontSize: "14px", padding: "28px", textAlign: "center" },
//   };

//   const fetchLocations = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/vehicle/fetch-locations`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setVehicles(data);
//         setLastUpdated(new Date().toLocaleTimeString());
//         setError("");
//       }
//     } catch {
//       setError("Unable to fetch vehicle locations. Check backend connection.");
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (tracking) {
//       fetchLocations();
//       interval = setInterval(fetchLocations, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [tracking]);

//   const selectedVehicle = selected !== null ? vehicles[selected] : null;

//   const filteredVehicles = vehicles.filter((v) => {
//     const id = (v.id || v.vehicleNumber || "").toLowerCase();
//     const moving = Number(v.speed) > 0;
//     const statusMatch =
//       statusFilter === "All" ||
//       (statusFilter === "Moving" && moving) ||
//       (statusFilter === "Stopped" && !moving);
//     return id.includes(searchTerm.toLowerCase()) && statusMatch;
//   });

//   const handleDownload = () => {
//     const csv =
//       `Vehicle ID,Latitude,Longitude,Speed,Status\n` +
//       vehicles
//         .map((v) => {
//           const lat = v.lat || v.latitude || "";
//           const lng = v.lng || v.longitude || "";
//           const moving = Number(v.speed) > 0;
//           return `${v.id || v.vehicleNumber || ""},${lat},${lng},${v.speed || 0} km/h,${moving ? "Moving" : "Stopped"}`;
//         })
//         .join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.setAttribute("href", URL.createObjectURL(blob));
//     link.setAttribute("download", "vehicle_locations.csv");
//     link.click();
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.pageHeader}>DRIVER VEHICLE TRACKING</div>

//       <div style={styles.innerPad}>

//         {/* Control Row */}
//         <div style={styles.filterRow}>
//           <button
//             style={tracking ? styles.btnBlackDisabled : styles.btnBlack}
//             disabled={tracking}
//             onClick={() => setTracking(true)}
//           >
//             📡 Start Tracking
//           </button>
//           <button
//             style={!tracking ? styles.btnYellowDisabled : styles.btnYellow}
//             disabled={!tracking}
//             onClick={() => { setTracking(false); setSelected(null); }}
//           >
//             ■ Stop
//           </button>
//           <span style={styles.statusDot(tracking)}></span>
//           <span style={{ fontSize: "13px", color: "#555" }}>
//             {tracking ? `Live · Updated ${lastUpdated || "..."}` : "Tracking inactive"}
//           </span>
//           {vehicles.length > 0 && (
//             <button style={{ ...styles.btnYellow, marginLeft: "auto" }} onClick={handleDownload}>
//               ⬇ Download
//             </button>
//           )}
//         </div>

//         {error && <div style={styles.errorText}>{error}</div>}

//         {/* Filters */}
//         {vehicles.length > 0 && (
//           <div style={styles.filterRow}>
//             <input
//               type="text"
//               style={styles.searchInput}
//               placeholder="Search by Vehicle ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <select
//               style={styles.input}
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="Moving">Moving</option>
//               <option value="Stopped">Stopped</option>
//             </select>
//           </div>
//         )}

//         {/* Vehicle Cards */}
//         <div style={styles.sectionTitle}>Live Vehicle Status</div>

//         {!tracking ? (
//           <p style={styles.emptyText}>Start tracking to see vehicle locations.</p>
//         ) : filteredVehicles.length === 0 ? (
//           <p style={styles.emptyText}>Fetching vehicle locations...</p>
//         ) : (
//           <>
//             <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>
//               {filteredVehicles.length} vehicle(s) tracked · Click a card to view details
//             </div>
//             <div style={styles.grid}>
//               {filteredVehicles.map((v, i) => {
//                 const moving = Number(v.speed) > 0;
//                 const label = v.id || v.vehicleNumber || `Vehicle ${i + 1}`;
//                 const lat = (v.lat || v.latitude)?.toFixed(4);
//                 const lng = (v.lng || v.longitude)?.toFixed(4);
//                 return (
//                   <div
//                     key={i}
//                     style={styles.vehicleCard(selected === i)}
//                     onClick={() => setSelected(selected === i ? null : i)}
//                   >
//                     <div style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "4px", color: "#000" }}>
//                       {label}
//                     </div>
//                     <div style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>
//                       {lat}, {lng}
//                     </div>
//                     {moving ? (
//                       <span style={styles.badgeGreen}>Moving · {v.speed} km/h</span>
//                     ) : (
//                       <span style={styles.badgeRed}>Stopped</span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}

//         {/* Detail Box */}
//         {selectedVehicle && (
//           <div style={styles.detailBox}>
//             <div style={{ fontWeight: "bold", fontSize: "14px", color: "#000" }}>
//               Vehicle {selectedVehicle.id || selectedVehicle.vehicleNumber || `#${selected + 1}`} — Details
//             </div>
//             <div style={styles.detailGrid}>
//               <div style={styles.detailCard}>
//                 <div style={styles.detailVal}>
//                   {(selectedVehicle.lat || selectedVehicle.latitude)?.toFixed(5)}
//                 </div>
//                 <div style={styles.detailLabel}>Latitude</div>
//               </div>
//               <div style={styles.detailCard}>
//                 <div style={styles.detailVal}>
//                   {(selectedVehicle.lng || selectedVehicle.longitude)?.toFixed(5)}
//                 </div>
//                 <div style={styles.detailLabel}>Longitude</div>
//               </div>
//               <div style={styles.detailCard}>
//                 <div style={styles.detailVal}>{selectedVehicle.speed ?? "0"} km/h</div>
//                 <div style={styles.detailLabel}>Speed</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Records Table */}
//         <div style={styles.sectionTitle}>Vehicle Tracking Records</div>
//         <div style={{ overflowX: "auto" }}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 {["Vehicle ID", "Latitude", "Longitude", "Speed", "Status"].map((h) => (
//                   <th style={styles.th} key={h}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {vehicles.length > 0 ? (
//                 vehicles.map((v, i) => {
//                   const moving = Number(v.speed) > 0;
//                   return (
//                     <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
//                       <td style={styles.td}>{v.id || v.vehicleNumber || `Vehicle ${i + 1}`}</td>
//                       <td style={styles.td}>{(v.lat || v.latitude)?.toFixed(5)}</td>
//                       <td style={styles.td}>{(v.lng || v.longitude)?.toFixed(5)}</td>
//                       <td style={styles.td}><b>{v.speed ?? "0"} km/h</b></td>
//                       <td style={styles.td}>
//                         {moving ? (
//                           <span style={styles.badgeGreen}>Moving</span>
//                         ) : (
//                           <span style={styles.badgeRed}>Stopped</span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
//                     No records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DriverVehicleTracking;
// import React, { useState, useEffect } from "react";
// import API_BASE_URL from "../config";

// const BASE_URL = API_BASE_URL;

// const DriverVehicleTracking = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [tracking, setTracking] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [error, setError] = useState("");
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const fetchLocations = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/vehicle/fetch-locations`);
//       const data = await res.json();
//       if (Array.isArray(data)) { setVehicles(data); setLastUpdated(new Date().toLocaleTimeString()); setError(""); }
//     } catch { setError("Unable to fetch vehicle locations. Check backend connection."); }
//   };

//   useEffect(() => {
//     let interval;
//     if (tracking) { fetchLocations(); interval = setInterval(fetchLocations, 5000); }
//     return () => clearInterval(interval);
//   }, [tracking]);

//   const selectedVehicle = selected !== null ? vehicles[selected] : null;

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 20 },
//     controlRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" },
//     startBtn: { background: tracking ? "#ccc" : "#27ae60", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
//     stopBtn: { background: !tracking ? "#ccc" : "#e53935", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: !tracking ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: 13 },
//     statusDot: { width: 10, height: 10, borderRadius: "50%", background: tracking ? "#27ae60" : "#ccc", display: "inline-block", marginRight: 6 },
//     grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 },
//     vehicleCard: (sel, moving) => ({ padding: "16px", borderRadius: 8, border: sel ? "2px solid #FFC107" : "2px solid transparent", background: sel ? "#fffbf0" : "#f9f9f9", cursor: "pointer", transition: "all 0.15s", position: "relative" }),
//     vehId: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
//     vehStatus: (m) => ({ fontSize: 11, fontWeight: "bold", color: m ? "#27ae60" : "#e53935", background: m ? "#e6f9ee" : "#fde8e8", padding: "2px 8px", borderRadius: 10, display: "inline-block" }),
//     detailBox: { background: "#f0f4f8", borderRadius: 8, padding: 20, marginTop: 16 },
//     detailGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 },
//     detailCard: { background: "#fff", borderRadius: 6, padding: "12px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
//     detailVal: { fontSize: 18, fontWeight: "bold", color: "#111" },
//     detailLabel: { fontSize: 11, color: "#888", marginTop: 4 },
//   };

//   return (
//     <div style={S.page}>
//       <h2 className="sendo-heading">Vehicle Tracking</h2>
//       <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
//       <h2 style={S.heading}>Driver Vehicle Tracking</h2>
//       <div style={S.card}>
//         <div style={S.controlRow}>
//           <span style={S.statusDot}></span>
//           <span style={{ fontSize: 13, color: "#555", marginRight: 12 }}>
//             {tracking ? `Live · Updated ${lastUpdated || "..."}` : "Tracking inactive"}
//           </span>
//           <button style={S.startBtn} disabled={tracking} onClick={() => setTracking(true)}>📡 Start Tracking</button>
//           <button style={S.stopBtn} disabled={!tracking} onClick={() => setTracking(false)}>■ Stop</button>
//         </div>
//         {error && <div style={{ color: "#e53935", fontSize: 12, marginBottom: 12 }}>{error}</div>}
//         {vehicles.length > 0 ? (
//           <>
//             <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{vehicles.length} vehicle(s) tracked · Click a card to view details</div>
//             <div style={S.grid}>
//               {vehicles.map((v, i) => {
//                 const moving = Number(v.speed) > 0;
//                 return (
//                   <div key={i} style={S.vehicleCard(selected === i, moving)} onClick={() => setSelected(selected === i ? null : i)}>
//                     <div style={S.vehId}>{v.id || v.vehicleNumber || `Vehicle ${i+1}`}</div>
//                     <div style={{ fontSize: 12, color: "#666", margin: "4px 0" }}>{(v.lat || v.latitude)?.toFixed(4)}, {(v.lng || v.longitude)?.toFixed(4)}</div>
//                     <span style={S.vehStatus(moving)}>{moving ? `Moving · ${v.speed} km/h` : "Stopped"}</span>
//                   </div>
//                 );
//               })}
//             </div>
//             {selectedVehicle && (
//               <div style={S.detailBox}>
//                 <b>Vehicle {selectedVehicle.id || selectedVehicle.vehicleNumber || `#${selected+1}`} — Details</b>
//                 <div style={S.detailGrid}>
//                   <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lat || selectedVehicle.latitude)?.toFixed(5)}</div><div style={S.detailLabel}>Latitude</div></div>
//                   <div style={S.detailCard}><div style={S.detailVal}>{(selectedVehicle.lng || selectedVehicle.longitude)?.toFixed(5)}</div><div style={S.detailLabel}>Longitude</div></div>
//                   <div style={S.detailCard}><div style={S.detailVal}>{selectedVehicle.speed ?? "0"} km/h</div><div style={S.detailLabel}>Speed</div></div>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>
//             {tracking ? "Fetching vehicle locations..." : "Start tracking to see vehicle locations"}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DriverVehicleTracking;
import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

const DriverVehicleTracking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
    filterRow: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    searchInput: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      outline: "none",
      width: "220px",
    },
    input: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      outline: "none",
    },
    btnBlack: {
      padding: "9px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "black",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnBlackDisabled: {
      padding: "9px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "not-allowed",
      backgroundColor: "#ccc",
      color: "#666",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnYellow: {
      padding: "9px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnYellowDisabled: {
      padding: "9px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "not-allowed",
      backgroundColor: "#ccc",
      color: "#666",
      fontWeight: "bold",
      fontSize: "14px",
    },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: "24px" },
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
      textAlign: "left",
    },
    badgeGreen: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      padding: "3px 10px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "13px",
      border: "1px solid #2e7d32",
    },
    badgeRed: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "3px 10px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "13px",
      border: "1px solid #c62828",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
      gap: "14px",
      marginBottom: "24px",
    },
    vehicleCard: (isSelected) => ({
      padding: "16px",
      borderRadius: "6px",
      border: isSelected ? "2px solid #FFC107" : "2px solid transparent",
      background: isSelected ? "#fffbf0" : "#fafafa",
      cursor: "pointer",
      transition: "all 0.15s",
    }),
    detailBox: {
      background: "#f0f4f8",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "24px",
    },
    detailGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginTop: "12px",
    },
    detailCard: {
      background: "#fff",
      borderRadius: "6px",
      padding: "14px 16px",
      textAlign: "center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    },
    detailVal: { fontSize: "18px", fontWeight: "bold", color: "#111" },
    detailLabel: { fontSize: "11px", color: "#888", marginTop: "4px" },
    statusDot: (active) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: active ? "#27ae60" : "#ccc",
      display: "inline-block",
      marginRight: "6px",
    }),
    errorText: { color: "#dc3545", fontSize: "13px", marginBottom: "12px" },
    emptyText: { color: "#aaa", fontSize: "14px", padding: "28px", textAlign: "center" },
  };

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${BASE_URL}/vehicle/fetch-locations`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setVehicles(data);
        setLastUpdated(new Date().toLocaleTimeString());
        setError("");
      }
    } catch {
      setError("Unable to fetch vehicle locations. Check backend connection.");
    }
  };

  useEffect(() => {
    let interval;
    if (tracking) {
      fetchLocations();
      interval = setInterval(fetchLocations, 5000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const selectedVehicle = selected !== null ? vehicles[selected] : null;

  const filteredVehicles = vehicles.filter((v) => {
    const id = (v.id || v.vehicleNumber || "").toLowerCase();
    const moving = Number(v.speed) > 0;
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Moving" && moving) ||
      (statusFilter === "Stopped" && !moving);
    return id.includes(searchTerm.toLowerCase()) && statusMatch;
  });

  const handleDownload = () => {
    const csv =
      `Vehicle ID,Latitude,Longitude,Speed,Status\n` +
      vehicles
        .map((v) => {
          const lat = v.lat || v.latitude || "";
          const lng = v.lng || v.longitude || "";
          const moving = Number(v.speed) > 0;
          return `${v.id || v.vehicleNumber || ""},${lat},${lng},${v.speed || 0} km/h,${moving ? "Moving" : "Stopped"}`;
        })
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "vehicle_locations.csv");
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DRIVER VEHICLE TRACKING</div>

      <div style={styles.innerPad}>

        {/* Control Row */}
        <div style={styles.filterRow}>
          <button
            style={tracking ? styles.btnBlackDisabled : styles.btnBlack}
            disabled={tracking}
            onClick={() => setTracking(true)}
          >
            📡 Start Tracking
          </button>
          <button
            style={!tracking ? styles.btnYellowDisabled : styles.btnYellow}
            disabled={!tracking}
            onClick={() => { setTracking(false); setSelected(null); }}
          >
            ■ Stop
          </button>
          <span style={styles.statusDot(tracking)}></span>
          <span style={{ fontSize: "13px", color: "#555" }}>
            {tracking ? `Live · Updated ${lastUpdated || "..."}` : "Tracking inactive"}
          </span>
          {vehicles.length > 0 && (
            <button style={{ ...styles.btnYellow, marginLeft: "auto" }} onClick={handleDownload}>
              ⬇ Download
            </button>
          )}
        </div>

        {error && <div style={styles.errorText}>{error}</div>}

        {/* Filters */}
        {vehicles.length > 0 && (
          <div style={styles.filterRow}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search by Vehicle ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              style={styles.input}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Moving">Moving</option>
              <option value="Stopped">Stopped</option>
            </select>
          </div>
        )}

        {/* Vehicle Cards */}
        <div style={styles.sectionTitle}>Live Vehicle Status</div>

        {!tracking ? (
          <p style={styles.emptyText}>Start tracking to see vehicle locations.</p>
        ) : filteredVehicles.length === 0 ? (
          <p style={styles.emptyText}>Fetching vehicle locations...</p>
        ) : (
          <>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>
              {filteredVehicles.length} vehicle(s) tracked · Click a card to view details
            </div>
            <div style={styles.grid}>
              {filteredVehicles.map((v, i) => {
                const moving = Number(v.speed) > 0;
                const label = v.id || v.vehicleNumber || `Vehicle ${i + 1}`;
                const lat = (v.lat || v.latitude)?.toFixed(4);
                const lng = (v.lng || v.longitude)?.toFixed(4);
                return (
                  <div
                    key={i}
                    style={styles.vehicleCard(selected === i)}
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "4px", color: "#000" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>
                      {lat}, {lng}
                    </div>
                    {moving ? (
                      <span style={styles.badgeGreen}>Moving · {v.speed} km/h</span>
                    ) : (
                      <span style={styles.badgeRed}>Stopped</span>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Detail Box */}
        {selectedVehicle && (
          <div style={styles.detailBox}>
            <div style={{ fontWeight: "bold", fontSize: "14px", color: "#000" }}>
              Vehicle {selectedVehicle.id || selectedVehicle.vehicleNumber || `#${selected + 1}`} — Details
            </div>
            <div style={styles.detailGrid}>
              <div style={styles.detailCard}>
                <div style={styles.detailVal}>
                  {(selectedVehicle.lat || selectedVehicle.latitude)?.toFixed(5)}
                </div>
                <div style={styles.detailLabel}>Latitude</div>
              </div>
              <div style={styles.detailCard}>
                <div style={styles.detailVal}>
                  {(selectedVehicle.lng || selectedVehicle.longitude)?.toFixed(5)}
                </div>
                <div style={styles.detailLabel}>Longitude</div>
              </div>
              <div style={styles.detailCard}>
                <div style={styles.detailVal}>{selectedVehicle.speed ?? "0"} km/h</div>
                <div style={styles.detailLabel}>Speed</div>
              </div>
            </div>
          </div>
        )}

        {/* Records Table */}
        <div style={styles.sectionTitle}>Vehicle Tracking Records</div>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Vehicle ID", "Latitude", "Longitude", "Speed", "Status"].map((h) => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((v, i) => {
                  const moving = Number(v.speed) > 0;
                  return (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={styles.td}>{v.id || v.vehicleNumber || `Vehicle ${i + 1}`}</td>
                      <td style={styles.td}>{(v.lat || v.latitude)?.toFixed(5)}</td>
                      <td style={styles.td}>{(v.lng || v.longitude)?.toFixed(5)}</td>
                      <td style={styles.td}><b>{v.speed ?? "0"} km/h</b></td>
                      <td style={styles.td}>
                        {moving ? (
                          <span style={styles.badgeGreen}>Moving</span>
                        ) : (
                          <span style={styles.badgeRed}>Stopped</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No records found
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

export default DriverVehicleTracking;
