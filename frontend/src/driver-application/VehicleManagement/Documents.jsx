// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px"}, table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const empty = { vehicleNumber:"", documentType:"", documentNumber:"", issueDate:"", expiryDate:"", issuingAuthority:"", remarks:"" };
// export default function Documents() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/onboarding/documents`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
//   const save = async()=>{try{await axios.post(`${BASE}/onboarding/documents`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.vehicleNumber||"").toLowerCase().includes(search.toLowerCase()));
//   const daysLeft = d=>{if(!d)return 999;return Math.ceil((new Date(d)-new Date())/86400000);};
//   const expBadge = d=>{const dl=daysLeft(d);return dl<0?"badge-red":dl<30?"badge-yellow":"badge-green";};
//   const expLabel = d=>{const dl=daysLeft(d);return dl<0?"Expired":dl<30?`${dl}d left`:"Valid";};
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Vehicle Documents</h2>
//       <div style={S.formGrid}>
//         {[["Vehicle Number","vehicleNumber","text"],["Document Number","documentNumber","text"],["Issue Date","issueDate","date"],["Expiry Date","expiryDate","date"],["Issuing Authority","issuingAuthority","text"],["Remarks","remarks","text"]].map(([l,n,t])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} type={t} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Document Type</label><select style={S.select} name="documentType" value={form.documentType} onChange={ch}><option value="">Select</option>{["RC Book","Insurance","Fitness Certificate","PUC","Road Tax","Permit","National Permit","State Permit"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Document</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search vehicle..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Vehicle No","Document Type","Doc Number","Issue Date","Expiry Date","Issuing Authority","Status","Remarks"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.vehicleNumber}</td><td style={S.td}>{r.documentType}</td><td style={S.td}>{r.documentNumber}</td><td style={S.td}>{r.issueDate?new Date(r.issueDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.expiryDate?new Date(r.expiryDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.issuingAuthority}</td><td style={S.td}><span className={expBadge(r.expiryDate)}>{expLabel(r.expiryDate)}</span></td><td style={S.td}>{r.remarks}</td>
//         </tr>)):<tr><td colSpan={8} style={{...S.td,padding:28,color:"#aaa"}}>No documents yet</td></tr>}</tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE = API_BASE_URL;

const empty = {
  vehicleNumber: "",
  documentType: "",
  documentNumber: "",
  issueDate: "",
  expiryDate: "",
  issuingAuthority: "",
  remarks: "",
};

export default function Documents() {
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
    innerPad: {
      padding: "20px",
    },
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
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
    badgeGreen: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      padding: "3px 10px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "13px",
      border: "1px solid #2e7d32",
    },
    badgeYellow: {
      backgroundColor: "#fff8e1",
      color: "#f57f17",
      padding: "3px 10px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "13px",
      border: "1px solid #f57f17",
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
  };

  const load = () =>
    axios
      .get(`${BASE}/onboarding/documents`)
      .then((r) => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await axios.post(`${BASE}/onboarding/documents`, form);
      setForm(empty);
      load();
    } catch {
      alert("Save failed");
    }
  };

  const filtered = records.filter((r) =>
    (r.vehicleNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  const daysLeft = (d) => {
    if (!d) return 999;
    return Math.ceil((new Date(d) - new Date()) / 86400000);
  };

  const getStatusBadge = (d) => {
    const dl = daysLeft(d);
    if (dl < 0) return <span style={styles.badgeRed}>Expired</span>;
    if (dl < 30) return <span style={styles.badgeYellow}>{dl}d left</span>;
    return <span style={styles.badgeGreen}>Valid</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE DOCUMENTS</div>

      <div style={styles.innerPad}>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Document</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Vehicle Number:</label>
            <input style={styles.input} type="text" name="vehicleNumber"
              value={form.vehicleNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Document Type:</label>
            <select style={styles.input} name="documentType"
              value={form.documentType} onChange={ch}>
              <option value="">Select</option>
              {["RC Book", "Insurance", "Fitness Certificate", "PUC",
                "Road Tax", "Permit", "National Permit", "State Permit"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Document Number:</label>
            <input style={styles.input} type="text" name="documentNumber"
              value={form.documentNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Issue Date:</label>
            <input style={styles.input} type="date" name="issueDate"
              value={form.issueDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Expiry Date:</label>
            <input style={styles.input} type="date" name="expiryDate"
              value={form.expiryDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Issuing Authority:</label>
            <input style={styles.input} type="text" name="issuingAuthority"
              value={form.issuingAuthority} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Remarks:</label>
            <input style={styles.input} type="text" name="remarks"
              value={form.remarks} onChange={ch} />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Document</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Documents Records</div>
          <input
            style={styles.searchInput}
            placeholder="Search by vehicle number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Vehicle No", "Document Type", "Doc Number", "Issue Date",
                  "Expiry Date", "Issuing Authority", "Status", "Remarks"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.documentType}</td>
                  <td style={styles.td}>{r.documentNumber}</td>
                  <td style={styles.td}>
                    {r.issueDate ? new Date(r.issueDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>
                    {r.expiryDate ? new Date(r.expiryDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>{r.issuingAuthority}</td>
                  <td style={styles.td}>{getStatusBadge(r.expiryDate)}</td>
                  <td style={styles.td}>{r.remarks}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No documents yet
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