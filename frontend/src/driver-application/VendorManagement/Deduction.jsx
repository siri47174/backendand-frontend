// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px"}, table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const empty = { vendorName:"", vehicleNumber:"", deductionType:"", amount:"", date:new Date().toISOString().split("T")[0], description:"", tripNumber:"" };
// export default function Deduction() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = () => axios.get(`${BASE}/advance/vendor-deduction`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
//   const save = async()=>{try{await axios.post(`${BASE}/advance/vendor-deduction`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.vendorName||"").toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Vendor Deductions</h2>
//       <div style={S.formGrid}>
//         {[["Vendor Name","vendorName","text"],["Vehicle Number","vehicleNumber","text"],["Trip Number","tripNumber","text"],["Amount (₹)","amount","number"],["Date","date","date"],["Description","description","text"]].map(([l,n,t])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} type={t} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Deduction Type</label>
//           <select style={S.select} name="deductionType" value={form.deductionType} onChange={ch}>
//             <option value="">Select</option>{["Advance Recovery","Penalty","Damage","Short Delivery","Other"].map(o=><option key={o}>{o}</option>)}
//           </select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Deduction</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search vendor..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Vendor Name","Vehicle Number","Trip No","Deduction Type","Amount","Date","Description"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.vendorName}</td><td style={S.td}>{r.vehicleNumber}</td><td style={S.td}>{r.tripNumber}</td><td style={S.td}>{r.deductionType}</td><td style={S.td}>₹{r.amount}</td><td style={S.td}>{r.date?new Date(r.date).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.description}</td>
//         </tr>)):<tr><td colSpan={7} style={{...S.td,padding:28,color:"#aaa"}}>No records yet</td></tr>}</tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE = API_BASE_URL;

const empty = {
  vendorName: "",
  vehicleNumber: "",
  deductionType: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  description: "",
  tripNumber: "",
};

export default function Deduction() {
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
      width: "280px",
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
    },
  };

  const load = () =>
    axios.get(`${BASE}/advance/vendor-deduction`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await axios.post(`${BASE}/advance/vendor-deduction`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.vendorName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VENDOR DEDUCTIONS</div>

      <div style={styles.innerPad}>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Deduction</div>
        <div style={styles.formGrid}>
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
            <label style={styles.label}>Trip Number:</label>
            <input style={styles.input} type="text" name="tripNumber"
              value={form.tripNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Deduction Type:</label>
            <select style={styles.input} name="deductionType"
              value={form.deductionType} onChange={ch}>
              <option value="">Select</option>
              {["Advance Recovery", "Penalty", "Damage", "Short Delivery", "Other"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Amount (₹):</label>
            <input style={styles.input} type="number" name="amount"
              value={form.amount} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Date:</label>
            <input style={styles.input} type="date" name="date"
              value={form.date} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Description:</label>
            <input style={styles.input} type="text" name="description"
              value={form.description} onChange={ch} />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Deduction</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Deduction Records</div>
          <input
            style={styles.searchInput}
            placeholder="Search by vendor name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Vendor Name", "Vehicle Number", "Trip No", "Deduction Type",
                  "Amount", "Date", "Description"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.vendorName}</td>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.tripNumber}</td>
                  <td style={styles.td}>{r.deductionType}</td>
                  <td style={styles.td}><b>₹{r.amount}</b></td>
                  <td style={styles.td}>
                    {r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>{r.description}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No records yet
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