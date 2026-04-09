// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// const BASE = API_BASE_URL;
// const S = { container:{fontFamily:"Arial,sans-serif",marginLeft:"278px",backgroundColor:"white",color:"black",minHeight:"calc(100vh - 70px)",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",marginRight:"10px"}, formGrid:{padding:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"}, formGroup:{display:"flex",flexDirection:"column",gap:"5px"}, label:{fontSize:"12px",fontWeight:"bold",color:"black"}, input:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",width:"100%",boxSizing:"border-box"}, select:{padding:"8px",border:"1px solid black",borderRadius:"5px",fontSize:"13px",background:"white",width:"100%"}, btnRow:{display:"flex",gap:"10px",justifyContent:"flex-end",padding:"0 16px 16px"}, btnYellow:{backgroundColor:"#FFC107",color:"black",border:"none",padding:"8px 16px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}, btnOutline:{backgroundColor:"white",color:"black",border:"1px solid black",padding:"8px 16px",borderRadius:"5px",cursor:"pointer"}, searchContainer:{display:"flex",gap:"10px",alignItems:"center",padding:"14px 16px",flexWrap:"wrap"}, summaryRow:{display:"flex",gap:"12px",padding:"12px 16px"}, summaryCard:(c)=>({flex:1,padding:"10px 14px",borderRadius:5,background:c,textAlign:"center",border:"1px solid #ddd"}), table:{width:"100%",borderCollapse:"collapse"}, th:{backgroundColor:"black",color:"white",padding:"20px",textAlign:"center",fontSize:"13px",fontWeight:"bold"}, td:{border:"1px solid black",padding:"12px",textAlign:"center",fontSize:"13px",color:"black"} };
// const badge = s=>({Received:"badge-green",Overdue:"badge-red",Pending:"badge-yellow",Partial:"badge-blue"}[s]||"badge-yellow");
// const empty = { customerName:"", invoiceNumber:"", invoiceAmount:"", amountReceived:"", balanceDue:"", paymentDate:new Date().toISOString().split("T")[0], paymentMode:"Bank Transfer", utrNumber:"", remarks:"", status:"Pending" };
// export default function PaymentStatus() {
//   const [form, setForm] = useState(empty);
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const load = ()=>axios.get(`${BASE}/customer/payment-status`).then(r=>setRecords(r.data||[])).catch(()=>{});
//   useEffect(()=>{load();},[]);
//   const ch = e=>{const f={...form,[e.target.name]:e.target.value};if(f.invoiceAmount&&f.amountReceived)f.balanceDue=((+f.invoiceAmount)-(+f.amountReceived)).toFixed(2);setForm(f);};
//   const save = async()=>{try{await axios.post(`${BASE}/customer/payment-status`,form);setForm(empty);load();}catch{alert("Save failed");}};
//   const filtered = records.filter(r=>(r.customerName||"").toLowerCase().includes(search.toLowerCase()));
//   const totInv = records.reduce((a,r)=>a+(+r.invoiceAmount||0),0);
//   const totRec = records.reduce((a,r)=>a+(+r.amountReceived||0),0);
//   const totPend = records.reduce((a,r)=>a+(+r.balanceDue||0),0);
//   return (
//     <div style={S.container}>
//       <h2 className="sendo-heading">Customer Payment Status</h2>
//       <div style={S.summaryRow}>
//         {[["₹"+totInv.toLocaleString("en-IN"),"Total Invoiced","#e3f2fd"],["₹"+totRec.toLocaleString("en-IN"),"Received","#e8f5e9"],["₹"+totPend.toLocaleString("en-IN"),"Pending","#fde8e8"]].map(([v,l,c])=>(
//           <div key={l} style={S.summaryCard(c)}><div style={{fontSize:18,fontWeight:"bold"}}>{v}</div><div style={{fontSize:11,color:"#666",marginTop:3}}>{l}</div></div>
//         ))}
//       </div>
//       <div style={S.formGrid}>
//         {[["Customer Name","customerName"],["Invoice Number","invoiceNumber"],["Invoice Amount (₹)","invoiceAmount"],["Amount Received (₹)","amountReceived"],["Balance Due (₹)","balanceDue"],["Payment Date","paymentDate"],["UTR / Reference","utrNumber"],["Remarks","remarks"]].map(([l,n])=>(
//           <div style={S.formGroup} key={n}><label style={S.label}>{l}</label><input style={S.input} readOnly={n==="balanceDue"} type={n.includes("Date")?"date":["invoiceAmount","amountReceived","balanceDue"].includes(n)?"number":"text"} name={n} value={form[n]} onChange={ch}/></div>
//         ))}
//         <div style={S.formGroup}><label style={S.label}>Payment Mode</label><select style={S.select} name="paymentMode" value={form.paymentMode} onChange={ch}>{["Bank Transfer","NEFT","RTGS","UPI","Cheque","Cash"].map(o=><option key={o}>{o}</option>)}</select></div>
//         <div style={S.formGroup}><label style={S.label}>Status</label><select style={S.select} name="status" value={form.status} onChange={ch}>{["Pending","Received","Overdue","Partial"].map(o=><option key={o}>{o}</option>)}</select></div>
//       </div>
//       <div style={S.btnRow}><button style={S.btnOutline} onClick={()=>setForm(empty)}>Clear</button><button style={S.btnYellow} onClick={save}>Save Record</button></div>
//       <div style={S.searchContainer}><input style={{...S.input,width:280}} placeholder="Search customer..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
//       <table style={S.table}>
//         <thead><tr>{["Customer","Invoice No","Invoiced","Received","Balance Due","Date","Mode","UTR","Status"].map(h=><th style={S.th} key={h}>{h}</th>)}</tr></thead>
//         <tbody>{filtered.length?filtered.map((r,i)=>(
//           <tr key={i}><td style={S.td}>{r.customerName}</td><td style={S.td}>{r.invoiceNumber}</td><td style={S.td}>₹{r.invoiceAmount}</td><td style={S.td}>₹{r.amountReceived}</td><td style={S.td}><b style={{color:(+r.balanceDue||0)>0?"#c0392b":"#27ae60"}}>₹{r.balanceDue}</b></td><td style={S.td}>{r.paymentDate?new Date(r.paymentDate).toLocaleDateString("en-IN"):""}</td><td style={S.td}>{r.paymentMode}</td><td style={S.td}>{r.utrNumber}</td><td style={S.td}><span className={badge(r.status)}>{r.status}</span></td>
//         </tr>)):<tr><td colSpan={9} style={{...S.td,padding:28,color:"#aaa"}}>No records yet</td></tr>}</tbody>
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
  invoiceNumber: "",
  invoiceAmount: "",
  amountReceived: "",
  balanceDue: "",
  paymentDate: new Date().toISOString().split("T")[0],
  paymentMode: "Bank Transfer",
  utrNumber: "",
  remarks: "",
  status: "Pending",
};

export default function PaymentStatus() {
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
    badgeBlue: {
      backgroundColor: "#e3f2fd", color: "#1565c0",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #1565c0",
    },
  };

  const load = () =>
    axios.get(`${BASE}/customer/payment-status`)
      .then(r => setRecords(r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const ch = (e) => {
    const f = { ...form, [e.target.name]: e.target.value };
    if (f.invoiceAmount && f.amountReceived) {
      f.balanceDue = ((+f.invoiceAmount) - (+f.amountReceived)).toFixed(2);
    }
    setForm(f);
  };

  const save = async () => {
    try {
      await axios.post(`${BASE}/customer/payment-status`, form);
      setForm(empty);
      load();
    } catch { alert("Save failed"); }
  };

  const filtered = records.filter(r =>
    (r.customerName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totInv = records.reduce((a, r) => a + (+r.invoiceAmount || 0), 0);
  const totRec = records.reduce((a, r) => a + (+r.amountReceived || 0), 0);
  const totPend = records.reduce((a, r) => a + (+r.balanceDue || 0), 0);

  const getStatusBadge = (status) => {
    if (status === "Received") return <span style={styles.badgeGreen}>Received</span>;
    if (status === "Overdue") return <span style={styles.badgeRed}>Overdue</span>;
    if (status === "Partial") return <span style={styles.badgeBlue}>Partial</span>;
    return <span style={styles.badgeYellow}>Pending</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>CUSTOMER PAYMENT STATUS</div>

      <div style={styles.innerPad}>

        {/* Summary Cards */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard("#e3f2fd")}>
            <div style={styles.summaryValue}>₹{totInv.toLocaleString("en-IN")}</div>
            <div style={styles.summaryLabel}>Total Invoiced</div>
          </div>
          <div style={styles.summaryCard("#e8f5e9")}>
            <div style={styles.summaryValue}>₹{totRec.toLocaleString("en-IN")}</div>
            <div style={styles.summaryLabel}>Amount Received</div>
          </div>
          <div style={styles.summaryCard("#ffebee")}>
            <div style={styles.summaryValue}>₹{totPend.toLocaleString("en-IN")}</div>
            <div style={styles.summaryLabel}>Balance Pending</div>
          </div>
        </div>

        {/* Form */}
        <div style={styles.sectionTitle}>Add Payment Record</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Customer Name:</label>
            <input style={styles.input} type="text" name="customerName"
              value={form.customerName} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Invoice Number:</label>
            <input style={styles.input} type="text" name="invoiceNumber"
              value={form.invoiceNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Invoice Amount (₹):</label>
            <input style={styles.input} type="number" name="invoiceAmount"
              value={form.invoiceAmount} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Amount Received (₹):</label>
            <input style={styles.input} type="number" name="amountReceived"
              value={form.amountReceived} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Balance Due (₹) — Auto:</label>
            <input style={styles.readOnly} type="number" name="balanceDue"
              value={form.balanceDue} readOnly />
          </div>
          <div>
            <label style={styles.label}>Payment Date:</label>
            <input style={styles.input} type="date" name="paymentDate"
              value={form.paymentDate} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Payment Mode:</label>
            <select style={styles.input} name="paymentMode"
              value={form.paymentMode} onChange={ch}>
              {["Bank Transfer", "NEFT", "RTGS", "UPI", "Cheque", "Cash"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={styles.label}>UTR / Reference:</label>
            <input style={styles.input} type="text" name="utrNumber"
              value={form.utrNumber} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Remarks:</label>
            <input style={styles.input} type="text" name="remarks"
              value={form.remarks} onChange={ch} />
          </div>
          <div>
            <label style={styles.label}>Status:</label>
            <select style={styles.input} name="status"
              value={form.status} onChange={ch}>
              {["Pending", "Received", "Overdue", "Partial"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => setForm(empty)}>Clear</button>
          <button style={styles.btnYellow} onClick={save}>Save Record</button>
        </div>

        <div style={styles.divider} />

        {/* Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Payment Records</div>
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
                {["Customer", "Invoice No", "Invoiced", "Received",
                  "Balance Due", "Date", "Mode", "UTR", "Status"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.customerName}</td>
                  <td style={styles.td}>{r.invoiceNumber}</td>
                  <td style={styles.td}>₹{r.invoiceAmount}</td>
                  <td style={styles.td}>₹{r.amountReceived}</td>
                  <td style={styles.td}>
                    <b style={{ color: (+r.balanceDue || 0) > 0 ? "#c0392b" : "#27ae60" }}>
                      ₹{r.balanceDue}
                    </b>
                  </td>
                  <td style={styles.td}>
                    {r.paymentDate ? new Date(r.paymentDate).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td style={styles.td}>{r.paymentMode}</td>
                  <td style={styles.td}>{r.utrNumber}</td>
                  <td style={styles.td}>{getStatusBadge(r.status)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9}
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