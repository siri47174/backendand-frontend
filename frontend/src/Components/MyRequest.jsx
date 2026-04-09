// import React, { useState } from "react";

// const SAMPLE = [
//   { id:"REQ001", type:"Advance Request", description:"Fuel advance for trip to Chennai", date:"2026-04-01", status:"Approved", amount:"₹5,000" },
//   { id:"REQ002", type:"Leave Request", description:"Annual leave - 3 days", date:"2026-04-03", status:"Pending", amount:"—" },
//   { id:"REQ003", type:"Maintenance Request", description:"Tyre replacement - MH12AB1234", date:"2026-04-05", status:"In Progress", amount:"₹12,000" },
//   { id:"REQ004", type:"Salary Advance", description:"Emergency salary advance", date:"2026-03-28", status:"Rejected", amount:"₹8,000" },
// ];

// const TABS = ["All","Advance Request","Leave Request","Maintenance Request","Salary Advance"];

// export default function MyRequest() {
//   const [tab, setTab] = useState("All");
//   const [search, setSearch] = useState("");

//   const filtered = SAMPLE.filter(r =>
//     (tab === "All" || r.type === tab) &&
//     (r.description.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
//   );

//   const badgeClass = { Approved:"badge-green", Pending:"badge-yellow", "In Progress":"badge-blue", Rejected:"badge-red" };

//   return (
//     <div className="sendo-page">
//       <h2 className="sendo-heading">My Requests</h2>

//       {/* Tabs */}
//       <div style={{ display:"flex", borderBottom:"2px solid #ddd", background:"#fafafa" }}>
//         {TABS.map(t => (
//           <button key={t} onClick={() => setTab(t)}
//             style={{ padding:"10px 16px", cursor:"pointer", fontSize:13, fontWeight:tab===t?"bold":"normal",
//               color:tab===t?"#000":"#555", borderBottom:tab===t?"3px solid #FFC107":"3px solid transparent",
//               background:"none", border:"none", outline:"none", borderBottom:tab===t?"3px solid #FFC107":"3px solid transparent" }}>
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Toolbar */}
//       <div className="sendo-toolbar">
//         <input className="sendo-input" placeholder="Search requests..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:300}}/>
//       </div>

//       {/* Cards */}
//       <div style={{ padding:"0 16px 16px" }}>
//         {filtered.length > 0 ? filtered.map(r => (
//           <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:"1px solid #eee", background:"#fff" }}>
//             <div>
//               <div style={{ fontSize:11, color:"#aaa", marginBottom:4 }}>{r.id} · {r.type}</div>
//               <div style={{ fontSize:14, fontWeight:"bold", color:"#111", marginBottom:4 }}>{r.description}</div>
//               <div style={{ fontSize:12, color:"#888" }}>Submitted: {new Date(r.date).toLocaleDateString("en-IN")}</div>
//             </div>
//             <div style={{ textAlign:"right" }}>
//               <div style={{ fontSize:15, fontWeight:"bold", color:"#333", marginBottom:6 }}>{r.amount}</div>
//               <span className={badgeClass[r.status]||"badge-yellow"}>{r.status}</span>
//             </div>
//           </div>
//         )) : (
//           <div style={{ textAlign:"center", padding:"40px", color:"#aaa" }}>
//             <div style={{ fontSize:36, marginBottom:12 }}>📭</div>
//             <div>No requests found</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

const SAMPLE = [
  { id: "REQ001", type: "Advance Request", description: "Fuel advance for trip to Chennai", date: "2026-04-01", status: "Approved", amount: "₹5,000" },
  { id: "REQ002", type: "Leave Request", description: "Annual leave - 3 days", date: "2026-04-03", status: "Pending", amount: "—" },
  { id: "REQ003", type: "Maintenance Request", description: "Tyre replacement - MH12AB1234", date: "2026-04-05", status: "In Progress", amount: "₹12,000" },
  { id: "REQ004", type: "Salary Advance", description: "Emergency salary advance", date: "2026-03-28", status: "Rejected", amount: "₹8,000" },
];

const TABS = ["All", "Advance Request", "Leave Request", "Maintenance Request", "Salary Advance"];

export default function MyRequest() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

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
    tabRow: {
      display: "flex",
      borderBottom: "2px solid #e0a800",
      backgroundColor: "#fff",
      flexWrap: "wrap",
    },
    tab: (active) => ({
      padding: "10px 18px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "bold" : "normal",
      color: "#000",
      backgroundColor: active ? "#FFC107" : "transparent",
      border: "none",
      outline: "none",
      borderRadius: "4px 4px 0 0",
    }),
    toolbar: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 20px",
      borderBottom: "1px solid #f0f0f0",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      width: "300px",
      color: "#000",
      outline: "none",
    },
    cardList: { padding: "0 20px 20px" },
    card: (i) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 18px",
      borderBottom: "1px solid #f0f0f0",
      backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
    }),
    cardId: { fontSize: "12px", color: "#888", marginBottom: "4px" },
    cardDesc: { fontSize: "14px", fontWeight: "bold", color: "#000", marginBottom: "4px" },
    cardDate: { fontSize: "13px", color: "#666" },
    cardAmount: { fontSize: "15px", fontWeight: "bold", color: "#000", marginBottom: "8px", textAlign: "right" },
    badgeGreen: { backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "3px 12px", borderRadius: "12px", fontWeight: "bold", fontSize: "13px", border: "1px solid #2e7d32" },
    badgeYellow: { backgroundColor: "#fff8e1", color: "#f57f17", padding: "3px 12px", borderRadius: "12px", fontWeight: "bold", fontSize: "13px", border: "1px solid #f57f17" },
    badgeBlue: { backgroundColor: "#e3f2fd", color: "#1565c0", padding: "3px 12px", borderRadius: "12px", fontWeight: "bold", fontSize: "13px", border: "1px solid #1565c0" },
    badgeRed: { backgroundColor: "#ffebee", color: "#c62828", padding: "3px 12px", borderRadius: "12px", fontWeight: "bold", fontSize: "13px", border: "1px solid #c62828" },
    emptyState: { textAlign: "center", padding: "60px 0", color: "#aaa" },
  };

  const filtered = SAMPLE.filter(r =>
    (tab === "All" || r.type === tab) &&
    (r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusBadge = (status) => {
    if (status === "Approved") return <span style={styles.badgeGreen}>Approved</span>;
    if (status === "Pending") return <span style={styles.badgeYellow}>Pending</span>;
    if (status === "In Progress") return <span style={styles.badgeBlue}>In Progress</span>;
    if (status === "Rejected") return <span style={styles.badgeRed}>Rejected</span>;
    return <span style={styles.badgeYellow}>{status}</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>MY REQUESTS</div>

      <div style={styles.tabRow}>
        {TABS.map(t => (
          <button key={t} style={styles.tab(tab === t)} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div style={styles.toolbar}>
        <input
          style={styles.searchInput}
          placeholder="Search by description or request ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span style={{ fontSize: "13px", color: "#000", fontWeight: "bold" }}>
          {filtered.length} request{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={styles.cardList}>
        {filtered.length > 0 ? filtered.map((r, i) => (
          <div key={r.id} style={styles.card(i)}>
            <div>
              <div style={styles.cardId}>{r.id} · {r.type}</div>
              <div style={styles.cardDesc}>{r.description}</div>
              <div style={styles.cardDate}>Submitted: {new Date(r.date).toLocaleDateString("en-IN")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={styles.cardAmount}>{r.amount}</div>
              {getStatusBadge(r.status)}
            </div>
          </div>
        )) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
            <div style={{ fontSize: "14px" }}>No requests found</div>
          </div>
        )}
      </div>
    </div>
  );
}