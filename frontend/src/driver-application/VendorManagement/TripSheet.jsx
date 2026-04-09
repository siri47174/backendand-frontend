// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px"}, table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const badge = s=>({Completed:"badge-green","In Transit":"badge-blue",Pending:"badge-yellow",Cancelled:"badge-red"}[s]||"badge-yellow");
// const empty = { tripNumber:"", vendorName:"", vehicleNumber:"", driverName:"", origin:"", destination:"", loadingDate:new Date().toISOString().split("T")[0], unloadingDate:"", material:"", weight:"", freight:"", advancePaid:"", balanceFreight:"", status:"Pending" };
// export default function TripSheet() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/trip/trip-sheet`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>{const f={...form,[e.target.name]:e.target.value};if(f.freight&&f.advancePaid)f.balanceFreight=((+f.freight)-(+f.advancePaid)).toFixed(2);setForm(f);};
//   const save = async()=>{try{await axios.post(`${BASE}/trip/trip-sheet`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.tripNumber||"").toLowerCase().includes(search.toLowerCase())||(r.vendorName||"").toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Trip Sheet</h2>
//       <div style={S.formGrid}>
//         {[["Trip Number","tripNumber"],["Vendor Name","vendorName"],["Vehicle Number","vehicleNumber"],["Driver Name","driverName"],["Origin","origin"],["Destination","destination"],["Loading Date","loadingDate"],["Unloading Date","unloadingDate"],["Material","material"],["Weight (Tons)","weight"],["Freight (₹)","freight"],["Advance Paid (₹)","advancePaid"],["Balance Freight (₹)","balanceFreight"]].map(([l,n])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} readOnly={n==="balanceFreight"} type={n.includes("Date")?"date":["weight","freight","advancePaid","balanceFreight"].includes(n)?"number":"text"} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Status</label><select style={S.select} name="status" value={form.status} onChange={ch}>{["Pending","In Transit","Completed","Cancelled"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Trip Sheet</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:300}} placeholder="Search trip no or vendor..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Trip No","Vendor","Vehicle","Driver","From","To","Load Date","Material","Weight","Freight","Advance","Balance","Status"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.tripNumber}</td><td style={S.td}>{r.vendorName}</td><td style={S.td}>{r.vehicleNumber}</td><td style={S.td}>{r.driverName}</td><td style={S.td}>{r.origin}</td><td style={S.td}>{r.destination}</td><td style={S.td}>{r.loadingDate?new Date(r.loadingDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.material}</td><td style={S.td}>{r.weight}T</td><td style={S.td}>₹{r.freight}</td><td style={S.td}>₹{r.advancePaid}</td><td style={S.td}><b>₹{r.balanceFreight}</b></td><td style={S.td}><span className={badge(r.status)}>{r.status}</span></td>
//         </tr>)):<tr><td colSpan={13} style={{...S.td,padding:28,color:"#aaa"}}>No trip records yet</td></tr>}</tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE = API_BASE_URL;

const empty = {
  tripNumber: "",
  vendorName: "",
  vehicleNumber: "",
  driverName: "",
  origin: "",
  destination: "",
  loadingDate: new Date().toISOString().split("T")[0],
  unloadingDate: "",
  material: "",
  weight: "",
  freight: "",
  advancePaid: "",
  balanceFreight: "",
  status: "Pending",
};

export default function TripSheet() {
  const [form, setForm] = useState(empty);
  const [records, setRecords] = useState([]);
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
    formGrid: {
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
    readOnly: {
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
    buttonRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      paddingBottom: "10px",
    },
    btnBlack: {
      padding: "9px 28px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "black",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnYellow: {
      padding: "9px 28px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
      fontSize: "14px",
    },
    tableTopRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "10px",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      width: "300px",
      color: "#000",
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
    badgeGreen: {
      backgroundColor: "#e8f5e9", color: "#2e7d32",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #2e7d32",
    },
    badgeBlue: {
      backgroundColor: "#e3f2fd", color: "#1565c0",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #1565c0",
    },
    badgeYellow: {
      backgroundColor: "#fff8e1", color: "#f57f17",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #f57f17",
    },
    badgeRed: {
      backgroundColor: "#ffebee", color: "#c62828",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #c62828",
    },
  };

  const load = () =>
    axios.get(`${BASE}/trip/trip-sheet`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = (e) => {
    const f = { ...form, [e.target.name]: e.target.value };
    if (f.freight && f.advancePaid) {
      f.balanceFreight = ((+f.freight) - (+f.advancePaid)).toFixed(2);
    }
    setForm(f);
  };

  const save = async () => {
    try {
      await axios.post(`${BASE}/trip/trip-sheet`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.tripNumber || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.vendorName || "").toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === "Completed") return <span style={styles.badgeGreen}>Completed</span>;
    if (status === "In Transit") return <span style={styles.badgeBlue}>In Transit</span>;
    if (status === "Cancelled") return <span style={styles.badgeRed}>Cancelled</span>;
    return <span style={styles.badgeYellow}>Pending</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>TRIP SHEET</div>

      <div style={styles.innerPad}>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Trip</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Trip Number:</label>
            <input style={styles.input} type="text" name="tripNumber"
              value={form.tripNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Vendor Name:</label>
            <input style={styles.input} type="text" name="vendorName"
              value={form.vendorName} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Vehicle Number:</label>
            <input style={styles.input} type="text" name="vehicleNumber"
              value={form.vehicleNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Driver Name:</label>
            <input style={styles.input} type="text" name="driverName"
              value={form.driverName} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Origin:</label>
            <input style={styles.input} type="text" name="origin"
              value={form.origin} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Destination:</label>
            <input style={styles.input} type="text" name="destination"
              value={form.destination} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Loading Date:</label>
            <input style={styles.input} type="date" name="loadingDate"
              value={form.loadingDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Unloading Date:</label>
            <input style={styles.input} type="date" name="unloadingDate"
              value={form.unloadingDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Material:</label>
            <input style={styles.input} type="text" name="material"
              value={form.material} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Weight (Tons):</label>
            <input style={styles.input} type="number" name="weight"
              value={form.weight} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Freight (₹):</label>
            <input style={styles.input} type="number" name="freight"
              value={form.freight} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Advance Paid (₹):</label>
            <input style={styles.input} type="number" name="advancePaid"
              value={form.advancePaid} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Balance Freight (₹) — Auto:</label>
            <input style={styles.readOnly} type="number" name="balanceFreight"
              value={form.balanceFreight} readOnly />
          </div>
          <div>
            <label style={styles.label}>Status:</label>
            <select style={styles.input} name="status"
              value={form.status} onChange={ch}>
              {["Pending", "In Transit", "Completed", "Cancelled"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Trip Sheet</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Trip Records</div>
          <input
            style={styles.searchInput}
            placeholder="Search by trip no or vendor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Trip No", "Vendor", "Vehicle", "Driver", "From", "To",
                  "Load Date", "Material", "Weight", "Freight",
                  "Advance", "Balance", "Status"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.tripNumber}</td>
                  <td style={styles.td}>{r.vendorName}</td>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.driverName}</td>
                  <td style={styles.td}>{r.origin}</td>
                  <td style={styles.td}>{r.destination}</td>
                  <td style={styles.td}>
                    {r.loadingDate ? new Date(r.loadingDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>{r.material}</td>
                  <td style={styles.td}>{r.weight}T</td>
                  <td style={styles.td}>₹{r.freight}</td>
                  <td style={styles.td}>₹{r.advancePaid}</td>
                  <td style={styles.td}><b>₹{r.balanceFreight}</b></td>
                  <td style={styles.td}>{getStatusBadge(r.status)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={13}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No trip records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}