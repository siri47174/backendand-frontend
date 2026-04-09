// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnBlack:{backgroundColor:"black",color:"white",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px",flexWrap:"wrap"}, summaryRow:{display:"flex",gap:"12px",padding:"12px 16px"}, summaryCard:(c)=>({flex:1,padding:"10px 14px",borderRadius:5,background:c,textAlign:"center",border:"1px solid #ddd"}), table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const empty = { vehicleNumber:"", expenseType:"", date:new Date().toISOString().split("T")[0], amount:"", paidBy:"", paymentMode:"Cash", description:"", vendor:"" };
// export default function VehicleExpenses() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/vehicle/expenses`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
//   const save = async()=>{try{await axios.post(`${BASE}/vehicle/expenses`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.vehicleNumber||"").toLowerCase().includes(search.toLowerCase()));
//   const total = filtered.reduce((a,r)=>a+(+r.amount||0),0);
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Vehicle Expenses</h2>
//       <div style={S.summaryRow}>
//         {[["₹"+total.toLocaleString("en-IN"),"Total Expenses","#fff8e1"],[filtered.length,"Entries","#e3f2fd"],[new Set(filtered.map(r=>r.vehicleNumber)).size,"Vehicles","#e8f5e9"]].map(([v,l,c])=>(
//           <div key={l} style={S.summaryCard(c)}><div style={{fontSize:18,fontWeight:"bold"}}>{v}</div><div style={{fontSize:11,color:"#666",marginTop:3}}>{l}</div></div>
//         ))}
//       </div>
//       <div style={S.formGrid}>
//         {[["Vehicle Number","vehicleNumber","text"],["Date","date","date"],["Amount (₹)","amount","number"],["Paid By","paidBy","text"],["Vendor / Supplier","vendor","text"],["Description","description","text"]].map(([l,n,t])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} type={t} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Expense Type</label><select style={S.select} name="expenseType" value={form.expenseType} onChange={ch}><option value="">Select</option>{["Fuel","Tyre","Repair","Maintenance","Insurance","Road Tax","Toll","Lubrication","Other"].map(o=><option key={o}>{o}</option>)}</select></div>
//         <div style={S.formGroup}><label style={S.label}>Payment Mode</label><select style={S.select} name="paymentMode" value={form.paymentMode} onChange={ch}>{["Cash","Bank Transfer","UPI","Cheque","Card"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Expense</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search vehicle..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Vehicle","Expense Type","Date","Amount","Paid By","Mode","Vendor","Description"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.vehicleNumber}</td><td style={S.td}>{r.expenseType}</td><td style={S.td}>{r.date?new Date(r.date).toLocaleDateString("en-IN"):""}</td><td style={S.td}><b>₹{(+r.amount||0).toLocaleString("en-IN")}</b></td><td style={S.td}>{r.paidBy}</td><td style={S.td}>{r.paymentMode}</td><td style={S.td}>{r.vendor}</td><td style={S.td}>{r.description}</td>
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
  vehicleNumber: "",
  expenseType: "",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  paidBy: "",
  paymentMode: "Cash",
  description: "",
  vendor: "",
};

export default function VehicleExpenses() {
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
    summaryRow: {
      display: "flex",
      gap: "14px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    summaryCard: (bg) => ({
      flex: 1,
      padding: "14px 18px",
      borderRadius: "6px",
      backgroundColor: bg,
      border: "1.5px solid #000",
      minWidth: "140px",
    }),
    summaryValue: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#000",
    },
    summaryLabel: {
      fontSize: "13px",
      color: "#555",
      marginTop: "4px",
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
    axios.get(`${BASE}/vehicle/expenses`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await axios.post(`${BASE}/vehicle/expenses`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.vehicleNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((a, r) => a + (+r.amount || 0), 0);
  const uniqueVehicles = new Set(filtered.map(r => r.vehicleNumber)).size;

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE EXPENSES</div>

      <div style={styles.innerPad}>

        {/* Summary Cards */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard("#fff8e1")}>
            <div style={styles.summaryValue}>₹{total.toLocaleString("en-IN")}</div>
            <div style={styles.summaryLabel}>Total Expenses</div>
          </div>
          <div style={styles.summaryCard("#f0f0f0")}>
            <div style={styles.summaryValue}>{filtered.length}</div>
            <div style={styles.summaryLabel}>Entries</div>
          </div>
          <div style={styles.summaryCard("#e8f5e9")}>
            <div style={styles.summaryValue}>{uniqueVehicles}</div>
            <div style={styles.summaryLabel}>Vehicles</div>
          </div>
        </div>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Vehicle Expense</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Vehicle Number:</label>
            <input style={styles.input} type="text" name="vehicleNumber"
              value={form.vehicleNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Expense Type:</label>
            <select style={styles.input} name="expenseType"
              value={form.expenseType} onChange={ch}>
              <option value="">Select</option>
              {["Fuel", "Tyre", "Repair", "Maintenance", "Insurance",
                "Road Tax", "Toll", "Lubrication", "Other"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
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
            <label style={styles.label}>Vendor / Supplier:</label>
            <input style={styles.input} type="text" name="vendor"
              value={form.vendor} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Description:</label>
            <input style={styles.input} type="text" name="description"
              value={form.description} onChange={ch} />
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
            placeholder="Search by vehicle number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Vehicle", "Expense Type", "Date", "Amount",
                  "Paid By", "Mode", "Vendor", "Description"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.expenseType}</td>
                  <td style={styles.td}>
                    {r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>
                    <b>₹{(+r.amount || 0).toLocaleString("en-IN")}</b>
                  </td>
                  <td style={styles.td}>{r.paidBy}</td>
                  <td style={styles.td}>{r.paymentMode}</td>
                  <td style={styles.td}>{r.vendor}</td>
                  <td style={styles.td}>{r.description}</td>
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