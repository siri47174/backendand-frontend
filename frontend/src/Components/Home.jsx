

// // import React, { useEffect, useState } from "react";
// // import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// // const COLORS = ["#4CAF50", "#FF5733"];

// // const Home = () => {
// //   const [vehicles, setVehicles] = useState([]);
// //   const [activeTab, setActiveTab] = useState("All");

// //   useEffect(() => {
// //     fetch(API_BASE_URL + "/vehicle/fetch-locations")
// //       .then((response) => response.json())
// //       .then((data) => setVehicles(data))
// //       .catch((error) => console.error("Error fetching data:", error));
// //   }, []);

// //   const filteredVehicles = vehicles.filter((vehicle) => {
// //     if (activeTab === "All") return true;
// //     if (activeTab === "Moving") return Number(vehicle.speed) > 0;
// //     if (activeTab === "Stopped") return Number(vehicle.speed) === 0;
// //   });

// //   const movingCount = vehicles.filter((v) => Number(v.speed) > 0).length;
// //   const stoppedCount = vehicles.filter((v) => Number(v.speed) === 0).length;

// //   const data = [
// //     { name: `Moving (${movingCount})`, value: movingCount },
// //     { name: `Stopped (${stoppedCount})`, value: stoppedCount },
// //   ];

// //   return (
// //     <div
// //       style={{
// //         marginLeft: "14%",
// //         color: "black",
// //         paddingBottom: "30px",
// //         width: "14%",
// //       }}
// //     >
// //       <h1
// //         style={{
// //           textAlign: "center",
// //           marginBottom: "20px",
// //           color: "darkgreen",
// //         }}
// //       >
// //         Vehicle Status Dashboard
// //       </h1>

// //       {/* Tabs Section */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "center",
// //           marginBottom: "20px",
// //         }}
// //       >
// //         {["All", "Moving", "Stopped"].map((tab) => (
// //           <button
// //             key={tab}
// //             onClick={() => setActiveTab(tab)}
// //             style={{
// //               margin: "0 10px",
// //               padding: "12px 24px",
// //               backgroundColor: activeTab === tab ? "#4CAF50" : "#ccc",
// //               color: activeTab === tab ? "#fff" : "#000",
// //               border: "none",
// //               borderRadius: "5px",
// //               cursor: "pointer",
// //               transition: "background-color 0.3s",
// //             }}
// //             onMouseEnter={(e) =>
// //               tab === "Stopped" && (e.target.style.backgroundColor = "#FF5733")
// //             }
// //             onMouseLeave={(e) =>
// //               tab === "Stopped" &&
// //               (e.target.style.backgroundColor =
// //                 activeTab === tab ? "#FF5733" : "#ccc")
// //             }
// //           >
// //             {tab}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Vehicle List Section */}
// //       <div style={{ height: "300px", overflowY: "auto", marginBottom: "20px" }}>
// //         {filteredVehicles.length > 0 ? (
// //           filteredVehicles.map((vehicle, index) => (
// //             <div
// //               key={index}
// //               style={{
// //                 backgroundColor: "#f9f9f9",
// //                 padding: "20px",
// //                 borderRadius: "8px",
// //                 marginBottom: "10px",
// //                 boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
// //               }}
// //             >
// //               <p>
// //                 <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
// //               </p>
// //               <p>
// //                 <strong>Speed:</strong> {vehicle.speed} km/h
// //               </p>
// //               <p>
// //                 <strong>Status:</strong>{" "}
// //                 {Number(vehicle.speed) === 0 ? "Stopped" : "Moving"}
// //               </p>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No vehicles available.</p>
// //         )}
// //       </div>

// //       {/* Pie Chart Section */}
// //       <div style={{marginLeft:"0"}}>
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "flex-start",
// //           marginTop: "30px",
// //            marginLeft: '0'
// //         }}
// //       >
// //         <PieChart width={400} height={400}>
// //           <Pie
// //             data={data}
// //             cx="50%"
// //             cy="50%"
// //             labelLine={false}
// //             outerRadius={150}
// //             fill="#8884d8"
// //             dataKey="value"
// //           >
// //             {data.map((entry, index) => (
// //               <Cell
// //                 key={`cell-${index}`}
// //                 fill={COLORS[index % COLORS.length]}
// //               />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //           <Legend layout="horizontal" align="left" verticalAlign="bottom" />
// //         </PieChart>
// //       </div>
// //       </div>

// //       {/* Vehicle Count Section */}
// //       {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
// //         <p style={{ color: '#4CAF50', fontSize: '18px' }}>Moving Vehicles: {movingCount}</p>
// //         <p style={{ color: '#FF5733', fontSize: '18px' }}>Stopped Vehicles: {stoppedCount}</p>
// //       </div> */}
// //     </div>
// //   );
// // };

// // export default Home;


// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
// import API_BASE_URL from "./config";

// const COLORS = ["#4CAF50", "#FF5733"];

// const Home = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [parking, setParking] = useState([]);

//   useEffect(() => {
//     fetch(API_BASE_URL + "/vehicle/fetch-locations")
//       .then((response) => response.json())
//       .then((data) => setVehicles(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const fetchVehicleHistory = (vehicleNumber) => {
//     fetch(`${API_BASE_URL}/home/history/${vehicleNumber}`)
//       .then((response) => response.json())
//       .then((data) => setHistory(data))
//       .catch((error) => console.error("Error fetching history:", error));
//   };

//   const fetchParkingDetails = (vehicleNumber) => {
//     fetch(`${API_BASE_URL}/home/parking/${vehicleNumber}`)
//       .then((response) => response.json())
//       .then((data) => setParking(data))
//       .catch((error) => console.error("Error fetching parking:", error));
//   };

//   const filteredVehicles = vehicles.filter((vehicle) => {
//     if (activeTab === "All") return true;
//     if (activeTab === "Moving") return Number(vehicle.speed) > 0;
//     if (activeTab === "Stopped") return Number(vehicle.speed) === 0;
//   });

//   const movingCount = vehicles.filter((v) => Number(v.speed) > 0).length;
//   const stoppedCount = vehicles.filter((v) => Number(v.speed) === 0).length;

//   const data = [
//     { name: `Moving (${movingCount})`, value: movingCount },
//     { name: `Stopped (${stoppedCount})`, value: stoppedCount },
//   ];

//   return (
//     <div style={{ paddingBottom: "30px", marginLeft: "270px", paddingTop: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
//       <h2 className="sendo-heading">Dashboard</h2>

//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//         {["All", "Moving", "Stopped"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             style={{
//               margin: "0 10px",
//               padding: "10px 20px",
//               backgroundColor: activeTab === tab ? "#4CAF50" : "#ccc",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div style={{ height: "400px", display: "flex", justifyContent: "center", alignItems:"center", flexDirection:"column", overflowY: "auto", marginBottom: "20px",width:"100%" }}>
//         {filteredVehicles.length > 0 ? (
//           filteredVehicles.map((vehicle, index) => (
//             <div key={index} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "9px",width:"60%",marginLeft:"90px",height:"190px"}}>
//               <p><strong>Vehicle:</strong> {vehicle.vehicleNumber}</p>
//               <p><strong>Speed:</strong> {vehicle.speed} km/h</p>
//               <p><strong>Status:</strong> {Number(vehicle.speed) === 0 ? "Stopped" : "Moving"}</p>
//               {/* <button onClick={() => { setSelectedVehicle(vehicle.vehicleNumber); fetchVehicleHistory(vehicle.vehicleNumber); }} style={{ padding: "8px", marginRight: "5px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}>View History</button>
//               <button onClick={() => { setSelectedVehicle(vehicle.vehicleNumber); fetchParkingDetails(vehicle.vehicleNumber); }} style={{ padding: "8px", backgroundColor: "#FF9800", color: "white", border: "none", borderRadius: "5px" }}>View Parking</button> */}
//             </div>
//           ))
//         ) : (
//           <p>No vehicles available.</p>
//         )}
//       </div>

//       <div style={{ display: "flex", justifyContent: "center",alignItems:"center", flexDirection:"row", marginTop: "30px" }}>
//         <PieChart width={400} height={400}>
//           <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend layout="horizontal" align="center" verticalAlign="top" />
//         </PieChart>
//       </div>

//       {selectedVehicle && history.length > 0 && (
//         <div style={{ marginTop: "20px", backgroundColor: "#e3f2fd", padding: "10px", borderRadius: "8px" }}>
//           <h3>History for {selectedVehicle}</h3>
//           <ul>
//             {history.map((item, index) => (
//               <li key={index}><strong>{item.time}</strong>: {item.location}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {selectedVehicle && parking.length > 0 && (
//         <div style={{ marginTop: "20px", backgroundColor: "#fff3e0", padding: "10px", borderRadius: "8px" }}>
//           <h3>Parking Details for {selectedVehicle}</h3>
//           <ul>
//             {parking.map((item, index) => (
//               <li key={index}><strong>{item.time}</strong>: {item.location}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import API_BASE_URL from "./config";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [history, setHistory] = useState([]);
  const [parking, setParking] = useState([]);

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
    statsRow: {
      display: "flex",
      gap: "14px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    statCard: (bg) => ({
      flex: 1,
      padding: "14px 18px",
      borderRadius: "6px",
      backgroundColor: bg,
      border: "1.5px solid #000",
      minWidth: "120px",
    }),
    statValue: { fontSize: "28px", fontWeight: "bold", color: "#000" },
    statLabel: { fontSize: "13px", color: "#555", marginTop: "4px" },
    tabRow: {
      display: "flex",
      borderBottom: "2px solid #e0a800",
      marginBottom: "16px",
    },
    tab: (active) => ({
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "bold" : "normal",
      color: active ? "#000" : "#555",
      backgroundColor: active ? "#FFC107" : "transparent",
      border: "none",
      outline: "none",
      borderRadius: "4px 4px 0 0",
    }),
    vehicleList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "14px",
      marginBottom: "24px",
    },
    vehicleCard: (moving) => ({
      padding: "16px 18px",
      borderRadius: "6px",
      border: `1.5px solid ${moving ? "#2e7d32" : "#c62828"}`,
      backgroundColor: moving ? "#f1f8e9" : "#ffebee",
    }),
    vehicleNumber: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      marginBottom: "6px",
    },
    vehicleDetail: {
      fontSize: "13px",
      color: "#555",
      marginBottom: "4px",
    },
    statusBadge: (moving) => ({
      display: "inline-block",
      marginTop: "8px",
      padding: "3px 12px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "13px",
      backgroundColor: moving ? "#e8f5e9" : "#ffebee",
      color: moving ? "#2e7d32" : "#c62828",
      border: `1px solid ${moving ? "#2e7d32" : "#c62828"}`,
    }),
    chartRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    chartCard: {
      padding: "20px",
      border: "1.5px solid #000",
      borderRadius: "6px",
      backgroundColor: "#fff",
    },
    detailCard: (bg, border) => ({
      marginTop: "16px",
      backgroundColor: bg,
      padding: "16px 18px",
      borderRadius: "6px",
      border: `1.5px solid ${border}`,
    }),
    detailTitle: {
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
      marginBottom: "10px",
    },
    listItem: {
      fontSize: "13px",
      color: "#555",
      padding: "6px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    emptyText: {
      textAlign: "center",
      color: "#aaa",
      fontSize: "14px",
      padding: "40px 0",
    },
  };

  useEffect(() => {
    fetch(API_BASE_URL + "/vehicle/fetch-locations")
      .then(r => r.json())
      .then(data => setVehicles(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const fetchVehicleHistory = (vehicleNumber) => {
    fetch(`${API_BASE_URL}/home/history/${vehicleNumber}`)
      .then(r => r.json())
      .then(data => setHistory(data))
      .catch(err => console.error("Error fetching history:", err));
  };

  const fetchParkingDetails = (vehicleNumber) => {
    fetch(`${API_BASE_URL}/home/parking/${vehicleNumber}`)
      .then(r => r.json())
      .then(data => setParking(data))
      .catch(err => console.error("Error fetching parking:", err));
  };

  const filteredVehicles = vehicles.filter(v => {
    if (activeTab === "Moving") return Number(v.speed) > 0;
    if (activeTab === "Stopped") return Number(v.speed) === 0;
    return true;
  });

  const movingCount = vehicles.filter(v => Number(v.speed) > 0).length;
  const stoppedCount = vehicles.filter(v => Number(v.speed) === 0).length;

  const pieData = [
    { name: `Moving (${movingCount})`, value: movingCount },
    { name: `Stopped (${stoppedCount})`, value: stoppedCount },
  ];

  const PIE_COLORS = ["#28a745", "#dc3545"];

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE STATUS DASHBOARD</div>

      <div style={styles.innerPad}>

        {/* Stats */}
        <div style={styles.sectionTitle}>Fleet Overview</div>
        <div style={styles.statsRow}>
          <div style={styles.statCard("#f0f0f0")}>
            <div style={styles.statValue}>{vehicles.length}</div>
            <div style={styles.statLabel}>🚛 Total Vehicles</div>
          </div>
          <div style={styles.statCard("#e8f5e9")}>
            <div style={styles.statValue}>{movingCount}</div>
            <div style={styles.statLabel}>🟢 Moving</div>
          </div>
          <div style={styles.statCard("#ffebee")}>
            <div style={styles.statValue}>{stoppedCount}</div>
            <div style={styles.statLabel}>🔴 Stopped</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabRow}>
          {["All", "Moving", "Stopped"].map(t => (
            <button key={t} style={styles.tab(activeTab === t)}
              onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>

        {/* Vehicle Cards */}
        <div style={styles.sectionTitle}>
          {activeTab} Vehicles ({filteredVehicles.length})
        </div>
        {filteredVehicles.length > 0 ? (
          <div style={styles.vehicleList}>
            {filteredVehicles.map((vehicle, i) => {
              const isMoving = Number(vehicle.speed) > 0;
              return (
                <div key={i} style={styles.vehicleCard(isMoving)}>
                  <div style={styles.vehicleNumber}>🚛 {vehicle.vehicleNumber}</div>
                  <div style={styles.vehicleDetail}>
                    <b>Speed:</b> {vehicle.speed} km/h
                  </div>
                  {vehicle.location && (
                    <div style={styles.vehicleDetail}>
                      <b>Location:</b> {vehicle.location}
                    </div>
                  )}
                  <div style={styles.statusBadge(isMoving)}>
                    {isMoving ? "● Moving" : "● Stopped"}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyText}>No vehicles available.</div>
        )}

        {/* Pie Chart */}
        <div style={styles.sectionTitle}>Status Breakdown</div>
        <div style={styles.chartRow}>
          <div style={styles.chartCard}>
            <PieChart width={360} height={320}>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                outerRadius={110}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
          </div>
        </div>

        {/* History */}
        {selectedVehicle && history.length > 0 && (
          <div style={styles.detailCard("#e3f2fd", "#1565c0")}>
            <div style={styles.detailTitle}>📍 History for {selectedVehicle}</div>
            {history.map((item, i) => (
              <div key={i} style={styles.listItem}>
                <b>{item.time}</b>: {item.location}
              </div>
            ))}
          </div>
        )}

        {/* Parking */}
        {selectedVehicle && parking.length > 0 && (
          <div style={styles.detailCard("#fff8e1", "#f57f17")}>
            <div style={styles.detailTitle}>🅿️ Parking Details for {selectedVehicle}</div>
            {parking.map((item, i) => (
              <div key={i} style={styles.listItem}>
                <b>{item.time}</b>: {item.location}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;