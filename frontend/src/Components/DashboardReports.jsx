// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
// import API_BASE_URL from "./config";

// const BASE_URL = API_BASE_URL;
// const COLORS = ["#FFC107", "#000", "#27ae60", "#e53935", "#1565c0", "#f39c12"];

// export default function DashboardReports() {
//   const [data, setData] = useState({ trips: [], expenses: [], drivers: [], vehicles: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAll = async () => {
//       const [trips, expenses, drivers, vehicles] = await Promise.allSettled([
//         axios.get(`${BASE_URL}/trip/trip-sheet`),
//         axios.get(`${BASE_URL}/vehicle/expenses`),
//         axios.get(`${BASE_URL}/onboarding/drivers`),
//         axios.get(`${BASE_URL}/onboarding/vehicleList`),
//       ]);
//       setData({
//         trips: trips.status === "fulfilled" ? trips.value.data : [],
//         expenses: expenses.status === "fulfilled" ? expenses.value.data : [],
//         drivers: drivers.status === "fulfilled" ? drivers.value.data : [],
//         vehicles: vehicles.status === "fulfilled" ? vehicles.value.data : [],
//       });
//       setLoading(false);
//     };
//     fetchAll();
//   }, []);

//   const tripsByStatus = ["Pending","In Transit","Completed","Cancelled"].map(s => ({
//     name: s, value: data.trips.filter(t => t.status === s).length
//   })).filter(d => d.value > 0);

//   const expenseByType = Object.entries(
//     data.expenses.reduce((acc, e) => {
//       const t = e.expenseType || "Other";
//       acc[t] = (acc[t] || 0) + parseFloat(e.amount || 0);
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value: Math.round(value) }));

//   const totalRevenue = data.trips.reduce((a, t) => a + parseFloat(t.freight || 0), 0);
//   const totalExpenses = data.expenses.reduce((a, e) => a + parseFloat(e.amount || 0), 0);
//   const totalAdvancePaid = data.trips.reduce((a, t) => a + parseFloat(t.advancePaid || 0), 0);

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     statsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 },
//     statCard: (c) => ({ background: c, borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }),
//     statVal: { fontSize: 28, fontWeight: "bold", color: "#111" },
//     statLabel: { fontSize: 12, color: "#666", marginTop: 4 },
//     chartsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 },
//     card: { backgroundColor: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
//     cardTitle: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 16 },
//   };

//   if (loading) return (
//     <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <h2 className="sendo-heading">Dashboard Reports</h2>
//       <div style={{ textAlign: "center", color: "#888" }}>
//         <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
//         <div>Loading dashboard data...</div>
//       </div>
//     </div>
//   );

//   return (
//     <div style={S.page}>
//       <h2 style={S.heading}>Dashboard Reports</h2>

//       {/* Stats Row */}
//       <div style={S.statsRow}>
//         {[
//           ["🗺️", data.trips.length, "Total Trips", "#e3f2fd"],
//           [`₹${totalRevenue.toLocaleString("en-IN")}`, "", "Total Revenue", "#e8f5e9"],
//           [`₹${totalExpenses.toLocaleString("en-IN")}`, "", "Total Expenses", "#fde8e8"],
//           ["👤", data.drivers.length, "Drivers", "#fff8e1"],
//         ].map(([icon, val, label, color], i) => (
//           <div key={i} style={S.statCard(color)}>
//             <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
//             <div style={S.statVal}>{val || icon}</div>
//             <div style={S.statLabel}>{label}</div>
//           </div>
//         ))}
//       </div>

//       <div style={S.chartsRow}>
//         {/* Trip Status Pie */}
//         <div style={S.card}>
//           <div style={S.cardTitle}>Trip Status Breakdown</div>
//           {tripsByStatus.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie data={tripsByStatus} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
//                   {tripsByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>No trip data yet</div>}
//         </div>

//         {/* Expense by Type Bar */}
//         <div style={S.card}>
//           <div style={S.cardTitle}>Expenses by Type (₹)</div>
//           {expenseByType.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={expenseByType} margin={{ top: 5, right: 10, left: 0, bottom: 40 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 10 }} />
//                 <YAxis tick={{ fontSize: 10 }} />
//                 <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
//                 <Bar dataKey="value" fill="#FFC107" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>No expense data yet</div>}
//         </div>
//       </div>

//       {/* Summary Table */}
//       <div style={S.card}>
//         <div style={S.cardTitle}>Financial Summary</div>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>{["Metric","Value"].map(h => <th key={h} style={{ background: "#f0f0f0", padding: "9px 16px", textAlign: "left", fontSize: 12, fontWeight: "bold" }}>{h}</th>)}</tr>
//           </thead>
//           <tbody>
//             {[
//               ["Total Trips", data.trips.length],
//               ["Completed Trips", data.trips.filter(t => t.status === "Completed").length],
//               ["Total Freight Revenue", `₹${totalRevenue.toLocaleString("en-IN")}`],
//               ["Total Advance Paid", `₹${totalAdvancePaid.toLocaleString("en-IN")}`],
//               ["Total Expenses", `₹${totalExpenses.toLocaleString("en-IN")}`],
//               ["Net Profit / Loss", `₹${(totalRevenue - totalExpenses).toLocaleString("en-IN")}`],
//               ["Registered Drivers", data.drivers.length],
//               ["Registered Vehicles", data.vehicles.length],
//             ].map(([label, val], i) => (
//               <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
//                 <td style={{ padding: "10px 16px", fontSize: 13, color: "#555" }}>{label}</td>
//                 <td style={{ padding: "10px 16px", fontSize: 14, fontWeight: "bold", color: "#222" }}>{val}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import API_BASE_URL from "./config";

const BASE_URL = API_BASE_URL;
const COLORS = ["#FFC107", "#000", "#27ae60", "#e53935", "#1565c0", "#f39c12"];

export default function DashboardReports() {
  const [data, setData] = useState({ trips: [], expenses: [], drivers: [], vehicles: [] });
  const [loading, setLoading] = useState(true);

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
    innerPad: { padding: "24px 20px" },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
      marginTop: "10px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "28px",
    },
    statCard: (bg) => ({
      padding: "18px 20px",
      borderRadius: "6px",
      backgroundColor: bg,
      border: "1.5px solid #000",
    }),
    statIcon: { fontSize: "24px", marginBottom: "6px" },
    statValue: { fontSize: "28px", fontWeight: "bold", color: "#000" },
    statLabel: { fontSize: "13px", color: "#555", marginTop: "4px" },
    chartsRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "24px",
    },
    chartCard: {
      backgroundColor: "#fff",
      borderRadius: "6px",
      padding: "20px",
      border: "1.5px solid #000",
    },
    chartTitle: {
      fontWeight: "bold",
      fontSize: "14px",
      color: "#000",
      marginBottom: "16px",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
    },
    noData: {
      textAlign: "center",
      color: "#aaa",
      padding: "40px 0",
      fontSize: "14px",
    },
    tableCard: {
      backgroundColor: "#fff",
      borderRadius: "6px",
      padding: "20px",
      border: "1.5px solid #000",
    },
    th: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "left",
      borderBottom: "2px solid #e0a800",
    },
    td: (i) => ({
      padding: "11px 16px",
      fontSize: "14px",
      color: "#000",
      borderBottom: "1px solid #f0f0f0",
      backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
    }),
    tdBold: (i) => ({
      padding: "11px 16px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#000",
      borderBottom: "1px solid #f0f0f0",
      backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
    }),
    loadingWrap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "300px",
      color: "#888",
      fontSize: "16px",
      gap: "12px",
    },
  };

  useEffect(() => {
    const fetchAll = async () => {
      const [trips, expenses, drivers, vehicles] = await Promise.allSettled([
        axios.get(`${BASE_URL}/trip/trip-sheet`),
        axios.get(`${BASE_URL}/vehicle/expenses`),
        axios.get(`${BASE_URL}/onboarding/drivers`),
        axios.get(`${BASE_URL}/onboarding/vehicleList`),
      ]);
      setData({
        trips: trips.status === "fulfilled" ? trips.value.data : [],
        expenses: expenses.status === "fulfilled" ? expenses.value.data : [],
        drivers: drivers.status === "fulfilled" ? drivers.value.data : [],
        vehicles: vehicles.status === "fulfilled" ? vehicles.value.data : [],
      });
      setLoading(false);
    };
    fetchAll();
  }, []);

  const tripsByStatus = ["Pending", "In Transit", "Completed", "Cancelled"]
    .map(s => ({ name: s, value: data.trips.filter(t => t.status === s).length }))
    .filter(d => d.value > 0);

  const expenseByType = Object.entries(
    data.expenses.reduce((acc, e) => {
      const t = e.expenseType || "Other";
      acc[t] = (acc[t] || 0) + parseFloat(e.amount || 0);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value) }));

  const totalRevenue = data.trips.reduce((a, t) => a + parseFloat(t.freight || 0), 0);
  const totalExpenses = data.expenses.reduce((a, e) => a + parseFloat(e.amount || 0), 0);
  const totalAdvancePaid = data.trips.reduce((a, t) => a + parseFloat(t.advancePaid || 0), 0);

  if (loading) return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DASHBOARD REPORTS</div>
      <div style={styles.loadingWrap}>
        <div style={{ fontSize: "40px" }}>⏳</div>
        <div>Loading dashboard data...</div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DASHBOARD REPORTS</div>

      <div style={styles.innerPad}>

        {/* Stats */}
        <div style={styles.sectionTitle}>Key Metrics</div>
        <div style={styles.statsGrid}>
          <div style={styles.statCard("#e3f2fd")}>
            <div style={styles.statIcon}>🗺️</div>
            <div style={styles.statValue}>{data.trips.length}</div>
            <div style={styles.statLabel}>Total Trips</div>
          </div>
          <div style={styles.statCard("#e8f5e9")}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statValue}>₹{totalRevenue.toLocaleString("en-IN")}</div>
            <div style={styles.statLabel}>Total Revenue</div>
          </div>
          <div style={styles.statCard("#ffebee")}>
            <div style={styles.statIcon}>💸</div>
            <div style={styles.statValue}>₹{totalExpenses.toLocaleString("en-IN")}</div>
            <div style={styles.statLabel}>Total Expenses</div>
          </div>
          <div style={styles.statCard("#fff8e1")}>
            <div style={styles.statIcon}>👤</div>
            <div style={styles.statValue}>{data.drivers.length}</div>
            <div style={styles.statLabel}>Drivers</div>
          </div>
          <div style={styles.statCard("#f3e5f5")}>
            <div style={styles.statIcon}>🚛</div>
            <div style={styles.statValue}>{data.vehicles.length}</div>
            <div style={styles.statLabel}>Vehicles</div>
          </div>
          <div style={styles.statCard(
            (totalRevenue - totalExpenses) >= 0 ? "#e8f5e9" : "#ffebee"
          )}>
            <div style={styles.statIcon}>
              {(totalRevenue - totalExpenses) >= 0 ? "📈" : "📉"}
            </div>
            <div style={styles.statValue}>
              ₹{Math.abs(totalRevenue - totalExpenses).toLocaleString("en-IN")}
            </div>
            <div style={styles.statLabel}>
              Net {(totalRevenue - totalExpenses) >= 0 ? "Profit" : "Loss"}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div style={styles.sectionTitle}>Analytics</div>
        <div style={styles.chartsRow}>
          <div style={styles.chartCard}>
            <div style={styles.chartTitle}>Trip Status Breakdown</div>
            {tripsByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tripsByStatus}
                    cx="50%" cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {tripsByStatus.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : <div style={styles.noData}>No trip data yet</div>}
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartTitle}>Expenses by Type (₹)</div>
            {expenseByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={expenseByType}
                  margin={{ top: 5, right: 10, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-30} textAnchor="end"
                    tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
                  <Bar dataKey="value" fill="#FFC107" />
                </BarChart>
              </ResponsiveContainer>
            ) : <div style={styles.noData}>No expense data yet</div>}
          </div>
        </div>

        {/* Summary Table */}
        <div style={styles.sectionTitle}>Financial Summary</div>
        <div style={styles.tableCard}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={styles.th}>Metric</th>
                <th style={styles.th}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Total Trips", data.trips.length],
                ["Completed Trips", data.trips.filter(t => t.status === "Completed").length],
                ["In Transit Trips", data.trips.filter(t => t.status === "In Transit").length],
                ["Total Freight Revenue", `₹${totalRevenue.toLocaleString("en-IN")}`],
                ["Total Advance Paid", `₹${totalAdvancePaid.toLocaleString("en-IN")}`],
                ["Total Expenses", `₹${totalExpenses.toLocaleString("en-IN")}`],
                ["Net Profit / Loss", `₹${(totalRevenue - totalExpenses).toLocaleString("en-IN")}`],
                ["Registered Drivers", data.drivers.length],
                ["Registered Vehicles", data.vehicles.length],
              ].map(([label, val], i) => (
                <tr key={i}>
                  <td style={styles.td(i)}>{label}</td>
                  <td style={styles.tdBold(i)}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}