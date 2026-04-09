// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, textarea:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box",resize:"vertical",minHeight:70}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px"}, table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const badge = s=>({Active:"badge-green",Expired:"badge-red","Pending Renewal":"badge-yellow",Terminated:"badge-red"}[s]||"badge-yellow");
// const empty = { customerName:"", vehicleNumber:"", agreementType:"", startDate:"", endDate:"", ratePerKm:"", fixedRate:"", paymentTerms:"", terms:"", status:"Active" };
// export default function Agreement() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/customer/agreements`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
//   const save = async()=>{try{await axios.post(`${BASE}/customer/agreements`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.customerName||"").toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Customer Agreements</h2>
//       <div style={S.formGrid}>
//         {[["Customer Name","customerName","text"],["Vehicle Number","vehicleNumber","text"],["Start Date","startDate","date"],["End Date","endDate","date"],["Rate per KM (₹)","ratePerKm","number"],["Fixed Rate (₹)","fixedRate","number"],["Payment Terms","paymentTerms","text"]].map(([l,n,t])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} type={t} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Agreement Type</label><select style={S.select} name="agreementType" value={form.agreementType} onChange={ch}><option value="">Select</option>{["Per KM","Fixed Monthly","Per Trip","Annual Contract"].map(o=><option key={o}>{o}</option>)}</select></div>
//         <div style={S.formGroup}><label style={S.label}>Status</label><select style={S.select} name="status" value={form.status} onChange={ch}>{["Active","Expired","Pending Renewal","Terminated"].map(o=><option key={o}>{o}</option>)}</select></div>
//         <div style={{...S.formGroup,gridColumn:"1/-1"}}><label style={S.label}>Terms & Conditions</label><textarea style={S.textarea} name="terms" value={form.terms} onChange={ch} placeholder="Enter agreement terms..."/></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Agreement</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search customer..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Customer","Vehicle","Type","Start Date","End Date","Rate/KM","Fixed Rate","Payment Terms","Status"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.customerName}</td><td style={S.td}>{r.vehicleNumber}</td><td style={S.td}>{r.agreementType}</td><td style={S.td}>{r.startDate?new Date(r.startDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.endDate?new Date(r.endDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>₹{r.ratePerKm}</td><td style={S.td}>₹{r.fixedRate}</td><td style={S.td}>{r.paymentTerms}</td><td style={S.td}><span className={badge(r.status)}>{r.status}</span></td>
//         </tr>)):<tr><td colSpan={9} style={{...S.td,padding:28,color:"#aaa"}}>No agreements yet</td></tr>}</tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE = API_BASE_URL;

const empty = {
  customerName: "",
  vehicleNumber: "",
  agreementType: "",
  startDate: "",
  endDate: "",
  ratePerKm: "",
  fixedRate: "",
  paymentTerms: "",
  terms: "",
  status: "Active",
};

export default function Agreement() {
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
      whiteSpace: "nowrap",
    },
    badgeGreen: {
      backgroundColor: "#e8f5e9", color: "#2e7d32",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #2e7d32",
    },
    badgeRed: {
      backgroundColor: "#ffebee", color: "#c62828",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #c62828",
    },
    badgeYellow: {
      backgroundColor: "#fff8e1", color: "#f57f17",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #f57f17",
    },
  };

  const load = () =>
    axios.get(`${BASE}/customer/agreements`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await axios.post(`${BASE}/customer/agreements`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.customerName || "").toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === "Active") return <span style={styles.badgeGreen}>Active</span>;
    if (status === "Expired" || status === "Terminated")
      return <span style={styles.badgeRed}>{status}</span>;
    return <span style={styles.badgeYellow}>Pending Renewal</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>CUSTOMER AGREEMENTS</div>

      <div style={styles.innerPad}>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Agreement</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Customer Name:</label>
            <input style={styles.input} type="text" name="customerName"
              value={form.customerName} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Vehicle Number:</label>
            <input style={styles.input} type="text" name="vehicleNumber"
              value={form.vehicleNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Agreement Type:</label>
            <select style={styles.input} name="agreementType"
              value={form.agreementType} onChange={ch}>
              <option value="">Select</option>
              {["Per KM", "Fixed Monthly", "Per Trip", "Annual Contract"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Start Date:</label>
            <input style={styles.input} type="date" name="startDate"
              value={form.startDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>End Date:</label>
            <input style={styles.input} type="date" name="endDate"
              value={form.endDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Rate per KM (₹):</label>
            <input style={styles.input} type="number" name="ratePerKm"
              value={form.ratePerKm} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Fixed Rate (₹):</label>
            <input style={styles.input} type="number" name="fixedRate"
              value={form.fixedRate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Payment Terms:</label>
            <input style={styles.input} type="text" name="paymentTerms"
              value={form.paymentTerms} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Status:</label>
            <select style={styles.input} name="status"
              value={form.status} onChange={ch}>
              {["Active", "Expired", "Pending Renewal", "Terminated"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}>Terms & Conditions:</label>
            <textarea name="terms"
              style={{ ...styles.input, minHeight: "80px", resize: "vertical" }}
              value={form.terms} onChange={ch}
              placeholder="Enter agreement terms..." />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Agreement</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Agreement Records</div>
          <input
            style={styles.searchInput}
            placeholder="Search by customer name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Customer", "Vehicle", "Type", "Start Date", "End Date",
                  "Rate/KM", "Fixed Rate", "Payment Terms", "Status"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.customerName}</td>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.agreementType}</td>
                  <td style={styles.td}>
                    {r.startDate ? new Date(r.startDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>
                    {r.endDate ? new Date(r.endDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>₹{r.ratePerKm}</td>
                  <td style={styles.td}>₹{r.fixedRate}</td>
                  <td style={styles.td}>{r.paymentTerms}</td>
                  <td style={styles.td}>{getStatusBadge(r.status)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No agreements yet
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