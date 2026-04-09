// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px",flexWrap:"wrap"}, summaryRow:{display:"flex",gap:"12px",padding:"12px 16px"}, summaryCard:(c)=>({flex:1,padding:"10px 14px",borderRadius:5,background:c,textAlign:"center",border:"1px solid #ddd"}), table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const badge = s=>({Filed:"badge-green",Overdue:"badge-red",Pending:"badge-yellow"}[s]||"badge-yellow");
// const empty = { customerName:"", gstNumber:"", invoiceNumber:"", invoiceDate:"", taxableAmount:"", cgst:"", sgst:"", igst:"", totalGST:"", totalAmount:"", filingPeriod:"", filingStatus:"Pending" };
// export default function GSTFile() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/customer/gst`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>{const f={...form,[e.target.name]:e.target.value};f.totalGST=((+f.cgst||0)+(+f.sgst||0)+(+f.igst||0)).toFixed(2);f.totalAmount=((+f.taxableAmount||0)+(+f.totalGST||0)).toFixed(2);setForm(f);};
//   const save = async()=>{try{await axios.post(`${BASE}/customer/gst`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.customerName||"").toLowerCase().includes(search.toLowerCase()));
//   const totalTax = records.reduce((a,r)=>a+(+r.totalGST||0),0);
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">GST Filing</h2>
//       <div style={S.summaryRow}>
//         {[["₹"+totalTax.toLocaleString("en-IN"),"Total GST Collected","#fff8e1"],[records.length,"Total Entries","#e3f2fd"],[records.filter(r=>r.filingStatus==="Filed").length+"/"+records.length,"Filed/Total","#e8f5e9"]].map(([v,l,c])=>(
//           <div key={l} style={S.summaryCard(c)}><div style={{fontSize:18,fontWeight:"bold"}}>{v}</div><div style={{fontSize:11,color:"#666",marginTop:3}}>{l}</div></div>
//         ))}
//       </div>
//       <div style={S.formGrid}>
//         {[["Customer Name","customerName"],["GST Number","gstNumber"],["Invoice Number","invoiceNumber"],["Invoice Date","invoiceDate"],["Taxable Amount (₹)","taxableAmount"],["CGST (₹)","cgst"],["SGST (₹)","sgst"],["IGST (₹)","igst"],["Total GST (₹)","totalGST"],["Total Amount (₹)","totalAmount"],["Filing Period","filingPeriod"]].map(([l,n])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} readOnly={["totalGST","totalAmount"].includes(n)} type={n.includes("Date")?"date":["taxableAmount","cgst","sgst","igst","totalGST","totalAmount"].includes(n)?"number":"text"} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Filing Status</label><select style={S.select} name="filingStatus" value={form.filingStatus} onChange={ch}>{["Pending","Filed","Overdue"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save GST Entry</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search customer..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Customer","GST No","Invoice","Date","Taxable","CGST","SGST","IGST","Total GST","Total","Period","Status"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.customerName}</td><td style={S.td}>{r.gstNumber}</td><td style={S.td}>{r.invoiceNumber}</td><td style={S.td}>{r.invoiceDate?new Date(r.invoiceDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>₹{r.taxableAmount}</td><td style={S.td}>₹{r.cgst}</td><td style={S.td}>₹{r.sgst}</td><td style={S.td}>₹{r.igst}</td><td style={S.td}><b>₹{r.totalGST}</b></td><td style={S.td}><b>₹{r.totalAmount}</b></td><td style={S.td}>{r.filingPeriod}</td><td style={S.td}><span className={badge(r.filingStatus)}>{r.filingStatus}</span></td>
//         </tr>)):<tr><td colSpan={12} style={{...S.td,padding:28,color:"#aaa"}}>No GST records yet</td></tr>}</tbody>
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
  gstNumber: "",
  invoiceNumber: "",
  invoiceDate: "",
  taxableAmount: "",
  cgst: "",
  sgst: "",
  igst: "",
  totalGST: "",
  totalAmount: "",
  filingPeriod: "",
  filingStatus: "Pending",
};

export default function GSTFile() {
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
    axios.get(`${BASE}/customer/gst`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = (e) => {
    const f = { ...form, [e.target.name]: e.target.value };
    f.totalGST = ((+f.cgst || 0) + (+f.sgst || 0) + (+f.igst || 0)).toFixed(2);
    f.totalAmount = ((+f.taxableAmount || 0) + (+f.totalGST || 0)).toFixed(2);
    setForm(f);
  };

  const save = async () => {
    try {
      await axios.post(`${BASE}/customer/gst`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.customerName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalTax = records.reduce((a, r) => a + (+r.totalGST || 0), 0);
  const filedCount = records.filter(r => r.filingStatus === "Filed").length;

  const getStatusBadge = (status) => {
    if (status === "Filed") return <span style={styles.badgeGreen}>Filed</span>;
    if (status === "Overdue") return <span style={styles.badgeRed}>Overdue</span>;
    return <span style={styles.badgeYellow}>Pending</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>GST FILING</div>

      <div style={styles.innerPad}>

        {/* Summary Cards */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard("#fff8e1")}>
            <div style={styles.summaryValue}>₹{totalTax.toLocaleString("en-IN")}</div>
            <div style={styles.summaryLabel}>Total GST Collected</div>
          </div>
          <div style={styles.summaryCard("#f0f0f0")}>
            <div style={styles.summaryValue}>{records.length}</div>
            <div style={styles.summaryLabel}>Total Entries</div>
          </div>
          <div style={styles.summaryCard("#e8f5e9")}>
            <div style={styles.summaryValue}>{filedCount}/{records.length}</div>
            <div style={styles.summaryLabel}>Filed / Total</div>
          </div>
        </div>

        {/* Form */}
        <div style={styles.sectionTitle}>Add GST Entry</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Customer Name:</label>
            <input style={styles.input} type="text" name="customerName"
              value={form.customerName} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>GST Number:</label>
            <input style={styles.input} type="text" name="gstNumber"
              value={form.gstNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Invoice Number:</label>
            <input style={styles.input} type="text" name="invoiceNumber"
              value={form.invoiceNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Invoice Date:</label>
            <input style={styles.input} type="date" name="invoiceDate"
              value={form.invoiceDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Taxable Amount (₹):</label>
            <input style={styles.input} type="number" name="taxableAmount"
              value={form.taxableAmount} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>CGST (₹):</label>
            <input style={styles.input} type="number" name="cgst"
              value={form.cgst} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>SGST (₹):</label>
            <input style={styles.input} type="number" name="sgst"
              value={form.sgst} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>IGST (₹):</label>
            <input style={styles.input} type="number" name="igst"
              value={form.igst} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Total GST (₹) — Auto:</label>
            <input style={styles.readOnly} type="number" name="totalGST"
              value={form.totalGST} readOnly />
          </div>
          <div>
            <label style={styles.label}>Total Amount (₹) — Auto:</label>
            <input style={styles.readOnly} type="number" name="totalAmount"
              value={form.totalAmount} readOnly />
          </div>
          <div>
            <label style={styles.label}>Filing Period:</label>
            <input style={styles.input} type="text" name="filingPeriod"
              value={form.filingPeriod} onChange={ch}
              placeholder="e.g. Apr 2025" />
          </div>
          <div>
            <label style={styles.label}>Filing Status:</label>
            <select style={styles.input} name="filingStatus"
              value={form.filingStatus} onChange={ch}>
              {["Pending", "Filed", "Overdue"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save GST Entry</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>GST Records</div>
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
                {["Customer", "GST No", "Invoice", "Date", "Taxable",
                  "CGST", "SGST", "IGST", "Total GST", "Total", "Period", "Status"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.customerName}</td>
                  <td style={styles.td}>{r.gstNumber}</td>
                  <td style={styles.td}>{r.invoiceNumber}</td>
                  <td style={styles.td}>
                    {r.invoiceDate ? new Date(r.invoiceDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>₹{r.taxableAmount}</td>
                  <td style={styles.td}>₹{r.cgst}</td>
                  <td style={styles.td}>₹{r.sgst}</td>
                  <td style={styles.td}>₹{r.igst}</td>
                  <td style={styles.td}><b>₹{r.totalGST}</b></td>
                  <td style={styles.td}><b>₹{r.totalAmount}</b></td>
                  <td style={styles.td}>{r.filingPeriod}</td>
                  <td style={styles.td}>{getStatusBadge(r.filingStatus)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={12}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No GST records yet
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