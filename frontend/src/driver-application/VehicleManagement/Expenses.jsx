// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const BASE_URL = API_BASE_URL;

// const Expenses = () => {
//   const [activeTab, setActiveTab] = useState("Vehicle Expense");
//   const [records, setRecords] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [vehicles, setVehicles] = useState([]);

//   const tabs = ["Vehicle Expense", "Others"];

//   const emptyForm = {
//     expenseType: "Vehicle Expense",
//     date: new Date().toISOString().split("T")[0],
//     vehicleNumber: "",
//     description: "",
//     amount: "",
//     requestedBy: "",
//     paidBy: "",
//     paymentMethod: "Cash",
//     paymentReference: "",
//     vendor: "",
//     category: "",
//   };
//   const [form, setForm] = useState(emptyForm);

//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/vehicle/expenses`);
//       setRecords(res.data || []);
//     } catch { setRecords([]); }
//   };

//   const fetchVehicles = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/onboarding/vehicleList`);
//       setVehicles(res.data || []);
//     } catch { setVehicles([]); }
//   };

//   useEffect(() => { fetchRecords(); fetchVehicles(); }, []);

//   const handleSave = async () => {
//     try {
//       await axios.post(`${BASE_URL}/vehicle/expenses`, { ...form, expenseType: activeTab });
//       setSuccessMsg("Expense saved successfully!");
//       setForm({ ...emptyForm, expenseType: activeTab });
//       setShowForm(false);
//       fetchRecords();
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch { alert("Save failed — check backend connection."); }
//   };

//   const filtered = records.filter(r => (r.expenseType || "Vehicle Expense") === activeTab);
//   const total = filtered.reduce((a, r) => a + parseFloat(r.amount || 0), 0);

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
//     title: { fontSize: 18, fontWeight: "bold", color: "#333" },
//     addBtn: { backgroundColor: "#FFC107", color: "#000", border: "none", padding: "7px 18px", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: 13 },
//     tabRow: { display: "flex", borderBottom: "2px solid #ddd", marginBottom: 16 },
//     tab: (a) => ({ padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: a ? "bold" : "normal", color: a ? "#FFC107" : "#555", borderBottom: a ? "3px solid #FFC107" : "3px solid transparent", background: "none", border: "none", outline: "none" }),
//     summaryRow: { display: "flex", gap: 12, marginBottom: 16 },
//     summaryCard: (c) => ({ flex: 1, padding: "14px 18px", borderRadius: 8, background: c, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }),
//     table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: 6, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
//     th: { background: "#f0f0f0", padding: "9px 12px", fontSize: 12, fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
//     td: { padding: "9px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0" },
//     success: { background: "#e6f9ee", color: "#27ae60", padding: "10px 16px", borderRadius: 4, marginBottom: 12, fontSize: 13 },
//     overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 60 },
//     modal: { background: "#fff", borderRadius: 8, padding: 24, width: 680, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
//     modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 20, color: "#333" },
//     grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
//     group: { display: "flex", flexDirection: "column", gap: 4 },
//     label: { fontSize: 12, fontWeight: "bold", color: "#555" },
//     input: { padding: "7px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 },
//     select: { padding: "7px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, background: "#fff" },
//     btnRow: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 },
//     saveBtn: { backgroundColor: "#FFC107", color: "#000", border: "none", padding: "8px 22px", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: 13 },
//     clearBtn: { background: "#fff", color: "#333", border: "1px solid #ccc", padding: "8px 22px", borderRadius: 4, cursor: "pointer", fontSize: 13 },
//   };

//   const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

//   return (
//     <div style={S.page}>
//       <h2 className="sendo-heading">Expenses</h2>
//       <div style={S.header}>
//         <span style={S.title}>Expenses</span>
//         <button style={S.addBtn} onClick={() => { setForm({ ...emptyForm, expenseType: activeTab }); setShowForm(true); }}>+ Add Expense</button>
//       </div>

//       {successMsg && <div style={S.success}>{successMsg}</div>}

//       <div style={S.tabRow}>
//         {tabs.map(t => <button key={t} style={S.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</button>)}
//       </div>

//       <div style={S.summaryRow}>
//         <div style={S.summaryCard("#fff8e1")}>
//           <div style={{ fontSize: 22, fontWeight: "bold" }}>₹{total.toLocaleString("en-IN")}</div>
//           <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Total {activeTab}</div>
//         </div>
//         <div style={S.summaryCard("#e3f2fd")}>
//           <div style={{ fontSize: 22, fontWeight: "bold" }}>{filtered.length}</div>
//           <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Entries</div>
//         </div>
//         {activeTab === "Vehicle Expense" && (
//           <div style={S.summaryCard("#e8f5e9")}>
//             <div style={{ fontSize: 22, fontWeight: "bold" }}>{new Set(filtered.map(r => r.vehicleNumber).filter(Boolean)).size}</div>
//             <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Vehicles</div>
//           </div>
//         )}
//       </div>

//       <table style={S.table}>
//         <thead>
//           <tr>
//             {activeTab === "Vehicle Expense"
//               ? ["Date", "Vehicle", "Description", "Vendor", "Amount", "Requested By", "Paid By", "Method", "Reference"].map(h => <th style={S.th} key={h}>{h}</th>)
//               : ["Date", "Category", "Description", "Amount", "Requested By", "Paid By", "Method", "Reference"].map(h => <th style={S.th} key={h}>{h}</th>)}
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.length > 0 ? filtered.map((r, i) => (
//             <tr key={i}>
//               <td style={S.td}>{r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}</td>
//               {activeTab === "Vehicle Expense" && <td style={S.td}>{r.vehicleNumber}</td>}
//               {activeTab === "Others" && <td style={S.td}>{r.category}</td>}
//               <td style={S.td}>{r.description}</td>
//               {activeTab === "Vehicle Expense" && <td style={S.td}>{r.vendor}</td>}
//               <td style={S.td}><b>₹{parseFloat(r.amount || 0).toLocaleString("en-IN")}</b></td>
//               <td style={S.td}>{r.requestedBy}</td>
//               <td style={S.td}>{r.paidBy}</td>
//               <td style={S.td}>{r.paymentMethod}</td>
//               <td style={S.td}>{r.paymentReference}</td>
//             </tr>
//           )) : (
//             <tr><td colSpan={9} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 28 }}>No {activeTab} records. Click "+ Add Expense" to create one.</td></tr>
//           )}
//         </tbody>
//       </table>

//       {showForm && (
//         <div style={S.overlay} onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
//           <div style={S.modal}>
//             <div style={S.modalTitle}>Add {activeTab}</div>
//             <div style={S.grid}>
//               <div style={S.group}>
//                 <label style={S.label}>Date</label>
//                 <input style={S.input} type="date" name="date" value={form.date} onChange={ch} />
//               </div>
//               {activeTab === "Vehicle Expense" ? (
//                 <div style={S.group}>
//                   <label style={S.label}>Vehicle Number</label>
//                   <select style={S.select} name="vehicleNumber" value={form.vehicleNumber} onChange={ch}>
//                     <option value="">Select Vehicle</option>
//                     {vehicles.map((v, i) => <option key={i} value={v.vehicleNumber || v}>{v.vehicleNumber || v}</option>)}
//                   </select>
//                 </div>
//               ) : (
//                 <div style={S.group}>
//                   <label style={S.label}>Category</label>
//                   <select style={S.select} name="category" value={form.category} onChange={ch}>
//                     <option value="">Select</option>
//                     {["Office Expenses", "Staff Welfare", "Courier", "Utilities", "Printing", "Miscellaneous"].map(o => <option key={o}>{o}</option>)}
//                   </select>
//                 </div>
//               )}
//               <div style={{ ...S.group, gridColumn: "1/-1" }}>
//                 <label style={S.label}>Description</label>
//                 <input style={S.input} name="description" value={form.description} onChange={ch} placeholder="Enter description" />
//               </div>
//               {activeTab === "Vehicle Expense" && (
//                 <div style={S.group}>
//                   <label style={S.label}>Vendor / Supplier</label>
//                   <input style={S.input} name="vendor" value={form.vendor} onChange={ch} placeholder="Vendor name" />
//                 </div>
//               )}
//               <div style={S.group}>
//                 <label style={S.label}>Amount (₹)</label>
//                 <input style={S.input} type="number" name="amount" value={form.amount} onChange={ch} placeholder="0" />
//               </div>
//               <div style={S.group}>
//                 <label style={S.label}>Requested By</label>
//                 <input style={S.input} name="requestedBy" value={form.requestedBy} onChange={ch} />
//               </div>
//               <div style={S.group}>
//                 <label style={S.label}>Paid By</label>
//                 <input style={S.input} name="paidBy" value={form.paidBy} onChange={ch} />
//               </div>
//               <div style={S.group}>
//                 <label style={S.label}>Payment Method</label>
//                 <select style={S.select} name="paymentMethod" value={form.paymentMethod} onChange={ch}>
//                   {["Cash", "Bank Transfer", "UPI", "Cheque", "Card"].map(o => <option key={o}>{o}</option>)}
//                 </select>
//               </div>
//               <div style={S.group}>
//                 <label style={S.label}>Payment Reference</label>
//                 <input style={S.input} name="paymentReference" value={form.paymentReference} onChange={ch} placeholder="UTR / Cheque No" />
//               </div>
//             </div>
//             <div style={S.btnRow}>
//               <button style={S.clearBtn} onClick={() => setForm({ ...emptyForm, expenseType: activeTab })}>Clear</button>
//               <button style={S.saveBtn} onClick={handleSave}>Save Expense</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Expenses;
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

const Expenses = () => {
  const [activeTab, setActiveTab] = useState("Vehicle Expense");
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const tabs = ["Vehicle Expense", "Others"];

  const emptyForm = {
    expenseType: "Vehicle Expense",
    date: new Date().toISOString().split("T")[0],
    vehicleNumber: "",
    description: "",
    amount: "",
    requestedBy: "",
    paidBy: "",
    paymentMethod: "Cash",
    paymentReference: "",
    vendor: "",
    category: "",
  };
  const [form, setForm] = useState(emptyForm);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vehicle/expenses`);
      setRecords(res.data || []);
    } catch { setRecords([]); }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/onboarding/vehicleList`);
      setVehicles(res.data || []);
    } catch { setVehicles([]); }
  };

  useEffect(() => { fetchRecords(); fetchVehicles(); }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${BASE_URL}/vehicle/expenses`, { ...form, expenseType: activeTab });
      setSuccessMsg("Expense saved successfully!");
      setForm({ ...emptyForm, expenseType: activeTab });
      setShowForm(false);
      fetchRecords();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch { alert("Save failed — check backend connection."); }
  };

  const filtered = records.filter(r => (r.expenseType || "Vehicle Expense") === activeTab);
  const total = filtered.reduce((a, r) => a + parseFloat(r.amount || 0), 0);

  const S = {
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
    topRow: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "14px",
    },
    addBtn: {
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      padding: "9px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    tabRow: {
      display: "flex",
      borderBottom: "2px solid #e0a800",
      marginBottom: "16px",
    },
    tab: (active) => ({
      padding: "10px 24px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "bold" : "normal",
      color: active ? "#000" : "#555",
      backgroundColor: active ? "#FFC107" : "transparent",
      border: "none",
      outline: "none",
      borderRadius: "4px 4px 0 0",
    }),
    summaryRow: {
      display: "flex",
      gap: "14px",
      marginBottom: "16px",
    },
    summaryCard: (bg) => ({
      flex: 1,
      padding: "14px 18px",
      borderRadius: "6px",
      backgroundColor: bg,
      border: "1.5px solid #000",
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
    success: {
      backgroundColor: "#e6f9ee",
      color: "#27ae60",
      padding: "10px 16px",
      borderRadius: "4px",
      marginBottom: "12px",
      fontSize: "14px",
      border: "1px solid #27ae60",
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
    // Modal styles
    overlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "60px",
    },
    modal: {
      background: "#fff",
      borderRadius: "8px",
      padding: "24px",
      width: "700px",
      maxHeight: "80vh",
      overflowY: "auto",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    modalHeader: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "12px 16px",
      fontWeight: "bold",
      fontSize: "16px",
      borderRadius: "6px",
      marginBottom: "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px",
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#000",
    },
    input: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      backgroundColor: "#fff",
      outline: "none",
    },
    select: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      backgroundColor: "#fff",
      outline: "none",
    },
    btnRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "20px",
    },
    saveBtn: {
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      padding: "9px 24px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    clearBtn: {
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      padding: "9px 24px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={S.container}>
      <div style={S.pageHeader}>EXPENSES</div>

      <div style={S.innerPad}>

        {successMsg && <div style={S.success}>✅ {successMsg}</div>}

        <div style={S.topRow}>
          <button style={S.addBtn} onClick={() => { setForm({ ...emptyForm, expenseType: activeTab }); setShowForm(true); }}>
            + Add Expense
          </button>
        </div>

        <div style={S.tabRow}>
          {tabs.map(t => (
            <button key={t} style={S.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>

        <div style={S.summaryRow}>
          <div style={S.summaryCard("#fff8e1")}>
            <div style={S.summaryValue}>₹{total.toLocaleString("en-IN")}</div>
            <div style={S.summaryLabel}>Total {activeTab}</div>
          </div>
          <div style={S.summaryCard("#f0f0f0")}>
            <div style={S.summaryValue}>{filtered.length}</div>
            <div style={S.summaryLabel}>Entries</div>
          </div>
          {activeTab === "Vehicle Expense" && (
            <div style={S.summaryCard("#e8f5e9")}>
              <div style={S.summaryValue}>
                {new Set(filtered.map(r => r.vehicleNumber).filter(Boolean)).size}
              </div>
              <div style={S.summaryLabel}>Vehicles</div>
            </div>
          )}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {activeTab === "Vehicle Expense"
                  ? ["Date", "Vehicle", "Description", "Vendor", "Amount", "Requested By", "Paid By", "Method", "Reference"]
                    .map(h => <th style={S.th} key={h}>{h}</th>)
                  : ["Date", "Category", "Description", "Amount", "Requested By", "Paid By", "Method", "Reference"]
                    .map(h => <th style={S.th} key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={S.td}>{r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}</td>
                  {activeTab === "Vehicle Expense" && <td style={S.td}>{r.vehicleNumber}</td>}
                  {activeTab === "Others" && <td style={S.td}>{r.category}</td>}
                  <td style={S.td}>{r.description}</td>
                  {activeTab === "Vehicle Expense" && <td style={S.td}>{r.vendor}</td>}
                  <td style={S.td}><b>₹{parseFloat(r.amount || 0).toLocaleString("en-IN")}</b></td>
                  <td style={S.td}>{r.requestedBy}</td>
                  <td style={S.td}>{r.paidBy}</td>
                  <td style={S.td}>{r.paymentMethod}</td>
                  <td style={S.td}>{r.paymentReference}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No {activeTab} records. Click "+ Add Expense" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div style={S.overlay} onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={S.modal}>
            <div style={S.modalHeader}>ADD {activeTab.toUpperCase()}</div>
            <div style={S.grid}>
              <div style={S.group}>
                <label style={S.label}>Date</label>
                <input style={S.input} type="date" name="date" value={form.date} onChange={ch} />
              </div>
              {activeTab === "Vehicle Expense" ? (
                <div style={S.group}>
                  <label style={S.label}>Vehicle Number</label>
                  <select style={S.select} name="vehicleNumber" value={form.vehicleNumber} onChange={ch}>
                    <option value="">Select Vehicle</option>
                    {vehicles.map((v, i) => (
                      <option key={i} value={v.vehicleNumber || v}>{v.vehicleNumber || v}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div style={S.group}>
                  <label style={S.label}>Category</label>
                  <select style={S.select} name="category" value={form.category} onChange={ch}>
                    <option value="">Select</option>
                    {["Office Expenses", "Staff Welfare", "Courier", "Utilities", "Printing", "Miscellaneous"]
                      .map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}
              <div style={{ ...S.group, gridColumn: "1/-1" }}>
                <label style={S.label}>Description</label>
                <input style={S.input} name="description" value={form.description} onChange={ch} placeholder="Enter description" />
              </div>
              {activeTab === "Vehicle Expense" && (
                <div style={S.group}>
                  <label style={S.label}>Vendor / Supplier</label>
                  <input style={S.input} name="vendor" value={form.vendor} onChange={ch} placeholder="Vendor name" />
                </div>
              )}
              <div style={S.group}>
                <label style={S.label}>Amount (₹)</label>
                <input style={S.input} type="number" name="amount" value={form.amount} onChange={ch} placeholder="0" />
              </div>
              <div style={S.group}>
                <label style={S.label}>Requested By</label>
                <input style={S.input} name="requestedBy" value={form.requestedBy} onChange={ch} />
              </div>
              <div style={S.group}>
                <label style={S.label}>Paid By</label>
                <input style={S.input} name="paidBy" value={form.paidBy} onChange={ch} />
              </div>
              <div style={S.group}>
                <label style={S.label}>Payment Method</label>
                <select style={S.select} name="paymentMethod" value={form.paymentMethod} onChange={ch}>
                  {["Cash", "Bank Transfer", "UPI", "Cheque", "Card"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.group}>
                <label style={S.label}>Payment Reference</label>
                <input style={S.input} name="paymentReference" value={form.paymentReference} onChange={ch} placeholder="UTR / Cheque No" />
              </div>
            </div>
            <div style={S.btnRow}>
              <button style={S.clearBtn} onClick={() => setForm({ ...emptyForm, expenseType: activeTab })}>Clear</button>
              <button style={S.saveBtn} onClick={handleSave}>Save Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;