// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px"}, table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const empty = { category:"", description:"", date:new Date().toISOString().split("T")[0], amount:"", paidBy:"", paymentMode:"Cash", approvedBy:"", remarks:"" };
// export default function Others() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/vehicle/other-expenses`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
//   const save = async()=>{try{await axios.post(`${BASE}/vehicle/other-expenses`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.description||"").toLowerCase().includes(search.toLowerCase())||(r.category||"").toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Other Expenses</h2>
//       <div style={S.formGrid}>
//         {[["Description","description","text"],["Date","date","date"],["Amount (₹)","amount","number"],["Paid By","paidBy","text"],["Approved By","approvedBy","text"],["Remarks","remarks","text"]].map(([l,n,t])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} type={t} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Category</label><select style={S.select} name="category" value={form.category} onChange={ch}><option value="">Select</option>{["Office Expenses","Staff Welfare","Courier","Utilities","Printing","Miscellaneous"].map(o=><option key={o}>{o}</option>)}</select></div>
//         <div style={S.formGroup}><label style={S.label}>Payment Mode</label><select style={S.select} name="paymentMode" value={form.paymentMode} onChange={ch}>{["Cash","Bank Transfer","UPI","Cheque","Card"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Expense</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Category","Description","Date","Amount","Paid By","Mode","Approved By","Remarks"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.category}</td><td style={S.td}>{r.description}</td><td style={S.td}>{r.date?new Date(r.date).toLocaleDateString("en-IN"):""}</td><td style={S.td}><b>₹{(+r.amount||0).toLocaleString("en-IN")}</b></td><td style={S.td}>{r.paidBy}</td><td style={S.td}>{r.paymentMode}</td><td style={S.td}>{r.approvedBy}</td><td style={S.td}>{r.remarks}</td>
//         </tr>)):<tr><td colSpan={8} style={{...S.td,padding:28,color:"#aaa"}}>No records yet</td></tr>}</tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE = API_BASE_URL;

const empty = {
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  paidBy: "",
  paymentMode: "Cash",
  approvedBy: "",
  remarks: "",
};

export default function Others() {
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
  };

  const load = () =>
    axios.get(`${BASE}/vehicle/other-expenses`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await axios.post(`${BASE}/vehicle/other-expenses`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.description || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>OTHER EXPENSES</div>

      <div style={styles.innerPad}>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Expense</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Category:</label>
            <select style={styles.input} name="category"
              value={form.category} onChange={ch}>
              <option value="">Select</option>
              {["Office Expenses", "Staff Welfare", "Courier",
                "Utilities", "Printing", "Miscellaneous"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Description:</label>
            <input style={styles.input} type="text" name="description"
              value={form.description} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Date:</label>
            <input style={styles.input} type="date" name="date"
              value={form.date} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Amount (₹):</label>
            <input style={styles.input} type="number" name="amount"
              value={form.amount} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Paid By:</label>
            <input style={styles.input} type="text" name="paidBy"
              value={form.paidBy} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Payment Mode:</label>
            <select style={styles.input} name="paymentMode"
              value={form.paymentMode} onChange={ch}>
              {["Cash", "Bank Transfer", "UPI", "Cheque", "Card"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>Approved By:</label>
            <input style={styles.input} type="text" name="approvedBy"
              value={form.approvedBy} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Remarks:</label>
            <input style={styles.input} type="text" name="remarks"
              value={form.remarks} onChange={ch} />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Expense</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Expense Records</div>
          <input
            style={styles.searchInput}
            placeholder="Search by category or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Category", "Description", "Date", "Amount",
                  "Paid By", "Mode", "Approved By", "Remarks"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.category}</td>
                  <td style={styles.td}>{r.description}</td>
                  <td style={styles.td}>
                    {r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>
                    <b>₹{(+r.amount || 0).toLocaleString("en-IN")}</b>
                  </td>
                  <td style={styles.td}>{r.paidBy}</td>
                  <td style={styles.td}>{r.paymentMode}</td>
                  <td style={styles.td}>{r.approvedBy}</td>
                  <td style={styles.td}>{r.remarks}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8}
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