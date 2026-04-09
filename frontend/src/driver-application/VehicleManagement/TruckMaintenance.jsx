// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const BASE_URL = API_BASE_URL;

// const TruckMaintenance = () => {
//   const [activeTab, setActiveTab] = useState("Regular Maintenance");
//   const [records, setRecords] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [searchParty, setSearchParty] = useState("");

//   const tabs = ["Regular Maintenance", "Tyre Maintenance", "RTO Expenses", "Material Consumption"];

//   const emptyForm = {
//     truckNo: "",
//     kilometer: "",
//     expenseAccount: "",
//     paymentMode: "Cash",
//     supplierPartyName: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     driver: "",
//     nextAlertKM: "",
//     nextAlertKMDate: "",
//     remarks: "",
//     documents: null,
//     maintenanceType: "Regular Maintenance",
//     // Tyre specific
//     tyrePosition: "",
//     tyreNo: "",
//     tyreBrand: "",
//     // RTO specific
//     rtoExpenseType: "",
//     rtoValidUpto: "",
//     // Material specific
//     materialDescription: "",
//     quantity: "",
//     unit: "",
//   };

//   const [formData, setFormData] = useState(emptyForm);

//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/vehicle/truck-maintenance`, { withCredentials: true });
//       setRecords(res.data || []);
//     } catch (e) {
//       setRecords([]);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "documents") {
//       setFormData((prev) => ({ ...prev, documents: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setFormData((prev) => ({ ...prev, maintenanceType: tab }));
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${BASE_URL}/vehicle/truck-maintenance`, formData, { withCredentials: true });
//       setSuccessMsg("Maintenance record saved successfully!");
//       setFormData({ ...emptyForm, maintenanceType: activeTab });
//       setShowForm(false);
//       fetchRecords();
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (e) {
//       alert("Error saving record. Please check the backend connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setFormData({ ...emptyForm, maintenanceType: activeTab });
//   };

//   const filteredRecords = records.filter(
//     (r) =>
//       r.maintenanceType === activeTab &&
//       (!searchParty || (r.supplierPartyName || "").toLowerCase().includes(searchParty.toLowerCase()))
//   );

//   const styles = {
//     wrapper: {
//       marginLeft: "270px",
//       padding: "0",
//       fontFamily: "Arial, sans-serif",
//       backgroundColor: "#fff",
//       minHeight: "calc(100vh - 70px)",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     title: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     topRight: {
//       display: "flex",
//       gap: "8px",
//       alignItems: "center",
//     },
//     addBtn: {
//       backgroundColor: "#fdd008",
//       color: "#000",
//       border: "none",
//       padding: "7px 16px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontWeight: "bold",
//       fontSize: "13px",
//     },
//     settingsBtn: {
//       background: "none",
//       border: "1px solid #ccc",
//       padding: "6px 12px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//     },
//     tabRow: {
//       display: "flex",
//       gap: "0",
//       borderBottom: "2px solid #ddd",
//       marginBottom: "16px",
//     },
//     tab: (active) => ({
//       padding: "8px 18px",
//       cursor: "pointer",
//       fontSize: "13px",
//       fontWeight: active ? "bold" : "normal",
//       color: active ? "#fdd008" : "#555",
//       borderBottom: active ? "3px solid #fdd008" : "3px solid transparent",
//       background: "none",
//       border: "none",
//       outline: "none",
//     }),
//     searchRow: {
//       display: "flex",
//       gap: "8px",
//       marginBottom: "12px",
//       alignItems: "center",
//     },
//     searchInput: {
//       padding: "7px 12px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       fontSize: "13px",
//       width: "280px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       backgroundColor: "#fff",
//       borderRadius: "6px",
//       overflow: "hidden",
//       boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//     },
//     th: {
//       background: "#f0f0f0",
//       padding: "9px 12px",
//       fontSize: "12px",
//       fontWeight: "bold",
//       textAlign: "left",
//       borderBottom: "1px solid #ddd",
//       color: "#444",
//     },
//     td: {
//       padding: "9px 12px",
//       fontSize: "12px",
//       borderBottom: "1px solid #f0f0f0",
//       color: "#333",
//     },
//     // Form overlay
//     overlay: {
//       position: "fixed",
//       top: 0, left: 0, right: 0, bottom: 0,
//       background: "rgba(0,0,0,0.3)",
//       zIndex: 1000,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "flex-start",
//       paddingTop: "60px",
//     },
//     modal: {
//       background: "#fff",
//       borderRadius: "8px",
//       padding: "24px",
//       width: "800px",
//       maxHeight: "80vh",
//       overflowY: "auto",
//       boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//     },
//     modalTitle: {
//       fontSize: "16px",
//       fontWeight: "bold",
//       marginBottom: "16px",
//       color: "#333",
//     },
//     formGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: "14px",
//     },
//     formGroup: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "4px",
//     },
//     label: {
//       fontSize: "12px",
//       fontWeight: "bold",
//       color: "#555",
//     },
//     input: {
//       padding: "7px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       fontSize: "13px",
//       outline: "none",
//     },
//     select: {
//       padding: "7px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       fontSize: "13px",
//       outline: "none",
//       background: "#fff",
//     },
//     radioRow: {
//       display: "flex",
//       gap: "20px",
//       alignItems: "center",
//       paddingTop: "4px",
//     },
//     btnRow: {
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: "10px",
//       marginTop: "20px",
//     },
//     saveBtn: {
//       backgroundColor: "#fdd008",
//       color: "#000",
//       border: "none",
//       padding: "8px 20px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontWeight: "bold",
//       fontSize: "13px",
//     },
//     clearBtn: {
//       backgroundColor: "#fff",
//       color: "#333",
//       border: "1px solid #ccc",
//       padding: "8px 20px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "13px",
//     },
//     success: {
//       background: "#e6f9ee",
//       color: "#27ae60",
//       padding: "10px 16px",
//       borderRadius: "4px",
//       marginBottom: "12px",
//       fontSize: "13px",
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h2 className="sendo-heading">Truck Maintenance</h2>
//       {/* Header */}
//       <div style={styles.header}>
//         <span style={styles.title}>Truck Maintenance</span>
//         <div style={styles.topRight}>
//           <button style={styles.addBtn} onClick={() => { setShowForm(true); setFormData({ ...emptyForm, maintenanceType: activeTab }); }}>
//             + Add
//           </button>
//           <button style={styles.settingsBtn}>⚙ Settings</button>
//         </div>
//       </div>

//       {successMsg && <div style={styles.success}>{successMsg}</div>}

//       {/* Tabs */}
//       <div style={styles.tabRow}>
//         {tabs.map((tab) => (
//           <button key={tab} style={styles.tab(activeTab === tab)} onClick={() => handleTabChange(tab)}>
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div style={styles.searchRow}>
//         <input
//           style={styles.searchInput}
//           placeholder="Search Any Party / Vehicle / More Fields"
//           value={searchParty}
//           onChange={(e) => setSearchParty(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Maintenance Type</th>
//             <th style={styles.th}>Truck No</th>
//             <th style={styles.th}>Date</th>
//             <th style={styles.th}>KM</th>
//             <th style={styles.th}>Expense Account</th>
//             <th style={styles.th}>Supplier Party</th>
//             <th style={styles.th}>Amount</th>
//             <th style={styles.th}>Payment Mode</th>
//             <th style={styles.th}>Driver</th>
//             <th style={styles.th}>Next Alert KM</th>
//             <th style={styles.th}>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.length > 0 ? (
//             filteredRecords.map((rec, i) => (
//               <tr key={i}>
//                 <td style={styles.td}>{rec.maintenanceType}</td>
//                 <td style={styles.td}>{rec.truckNo}</td>
//                 <td style={styles.td}>{rec.date ? new Date(rec.date).toLocaleDateString("en-IN") : ""}</td>
//                 <td style={styles.td}>{rec.kilometer}</td>
//                 <td style={styles.td}>{rec.expenseAccount}</td>
//                 <td style={styles.td}>{rec.supplierPartyName}</td>
//                 <td style={styles.td}>{rec.amount}</td>
//                 <td style={styles.td}>{rec.paymentMode}</td>
//                 <td style={styles.td}>{rec.driver}</td>
//                 <td style={styles.td}>{rec.nextAlertKM}</td>
//                 <td style={styles.td}>{rec.remarks}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={11} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "30px" }}>
//                 No records found. Click "+ Add" to create one.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Modal Form */}
//       {showForm && (
//         <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
//           <div style={styles.modal}>
//             <div style={styles.modalTitle}>Truck Maintenance — {activeTab}</div>

//             {/* Tab strip inside form */}
//             <div style={{ ...styles.tabRow, marginBottom: "20px" }}>
//               {tabs.map((tab) => (
//                 <button key={tab} style={styles.tab(activeTab === tab)} onClick={() => handleTabChange(tab)}>
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <div style={styles.formGrid}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Truck No</label>
//                 <input style={styles.input} name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="e.g. MH12/39991" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Date</label>
//                 <input style={styles.input} type="date" name="date" value={formData.date} onChange={handleChange} />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Kilometer</label>
//                 <input style={styles.input} type="number" name="kilometer" value={formData.kilometer} onChange={handleChange} placeholder="e.g. 2080" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Driver</label>
//                 <input style={styles.input} name="driver" value={formData.driver} onChange={handleChange} placeholder="Driver name" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Expense Account</label>
//                 <select style={styles.select} name="expenseAccount" value={formData.expenseAccount} onChange={handleChange}>
//                   <option value="">Select Account</option>
//                   <option value="Off Expenses">Off Expenses</option>
//                   <option value="Tyre Expenses">Tyre Expenses</option>
//                   <option value="RTO Expenses">RTO Expenses</option>
//                   <option value="Repair & Maintenance">Repair &amp; Maintenance</option>
//                   <option value="Fuel Expenses">Fuel Expenses</option>
//                   <option value="Material Consumption">Material Consumption</option>
//                 </select>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Payment Mode</label>
//                 <div style={styles.radioRow}>
//                   <label style={{ fontSize: "13px" }}>
//                     <input type="radio" name="paymentMode" value="Cash" checked={formData.paymentMode === "Cash"} onChange={handleChange} />
//                     {" "}Cash
//                   </label>
//                   <label style={{ fontSize: "13px" }}>
//                     <input type="radio" name="paymentMode" value="Credit" checked={formData.paymentMode === "Credit"} onChange={handleChange} />
//                     {" "}Credit
//                   </label>
//                 </div>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Supplier Party Name</label>
//                 <input style={styles.input} name="supplierPartyName" value={formData.supplierPartyName} onChange={handleChange} placeholder="Select Supplier Party" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Amount (₹)</label>
//                 <input style={styles.input} type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Next Alert KM</label>
//                 <input style={styles.input} type="number" name="nextAlertKM" value={formData.nextAlertKM} onChange={handleChange} placeholder="e.g. 5000" />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Next Alert KM Date</label>
//                 <input style={styles.input} type="date" name="nextAlertKMDate" value={formData.nextAlertKMDate} onChange={handleChange} />
//               </div>

//               {/* Tyre-specific fields */}
//               {activeTab === "Tyre Maintenance" && (
//                 <>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Tyre Position</label>
//                     <input style={styles.input} name="tyrePosition" value={formData.tyrePosition} onChange={handleChange} placeholder="e.g. Front Left" />
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Tyre No</label>
//                     <input style={styles.input} name="tyreNo" value={formData.tyreNo} onChange={handleChange} />
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Tyre Brand</label>
//                     <input style={styles.input} name="tyreBrand" value={formData.tyreBrand} onChange={handleChange} />
//                   </div>
//                 </>
//               )}

//               {/* RTO-specific fields */}
//               {activeTab === "RTO Expenses" && (
//                 <>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>RTO Expense Type</label>
//                     <select style={styles.select} name="rtoExpenseType" value={formData.rtoExpenseType} onChange={handleChange}>
//                       <option value="">Select</option>
//                       <option value="Road Tax">Road Tax</option>
//                       <option value="Permit">Permit</option>
//                       <option value="Fitness Certificate">Fitness Certificate</option>
//                       <option value="Pollution Certificate">Pollution Certificate</option>
//                       <option value="Insurance">Insurance</option>
//                     </select>
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Valid Upto</label>
//                     <input style={styles.input} type="date" name="rtoValidUpto" value={formData.rtoValidUpto} onChange={handleChange} />
//                   </div>
//                 </>
//               )}

//               {/* Material-specific fields */}
//               {activeTab === "Material Consumption" && (
//                 <>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Material Description</label>
//                     <input style={styles.input} name="materialDescription" value={formData.materialDescription} onChange={handleChange} />
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Quantity</label>
//                     <input style={styles.input} type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>Unit</label>
//                     <select style={styles.select} name="unit" value={formData.unit} onChange={handleChange}>
//                       <option value="">Select</option>
//                       <option value="Nos">Nos</option>
//                       <option value="Ltr">Ltr</option>
//                       <option value="Kg">Kg</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
//                 <label style={styles.label}>Remarks</label>
//                 <input style={styles.input} name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Enter Remark" />
//               </div>
//               <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
//                 <label style={styles.label}>Upload Document</label>
//                 <input type="file" name="documents" onChange={handleChange} style={{ fontSize: "13px" }} />
//               </div>
//             </div>

//             <div style={styles.btnRow}>
//               <button style={styles.clearBtn} onClick={handleClear}>Clear Form</button>
//               <button style={styles.saveBtn} onClick={handleSave} disabled={loading}>
//                 {loading ? "Saving..." : "Save Maintenance"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TruckMaintenance;
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BASE_URL = API_BASE_URL;

const tabs = ["Regular Maintenance", "Tyre Maintenance", "RTO Expenses", "Material Consumption"];

const emptyForm = {
  truckNo: "", kilometer: "", expenseAccount: "", paymentMode: "Cash",
  supplierPartyName: "", amount: "", date: new Date().toISOString().split("T")[0],
  driver: "", nextAlertKM: "", nextAlertKMDate: "", remarks: "", documents: null,
  maintenanceType: "Regular Maintenance",
  tyrePosition: "", tyreNo: "", tyreBrand: "",
  rtoExpenseType: "", rtoValidUpto: "",
  materialDescription: "", quantity: "", unit: "",
};

const TruckMaintenance = () => {
  const [activeTab, setActiveTab] = useState("Regular Maintenance");
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchParty, setSearchParty] = useState("");
  const [formData, setFormData] = useState(emptyForm);

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
    topRow: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "14px",
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
    tabRow: {
      display: "flex",
      borderBottom: "2px solid #e0a800",
      marginBottom: "16px",
    },
    tab: (active) => ({
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "bold" : "normal",
      color: active ? "#000" : "#555",
      backgroundColor: active ? "#FFC107" : "transparent",
      border: "none",
      outline: "none",
      borderRadius: "4px 4px 0 0",
    }),
    searchRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "14px",
      alignItems: "center",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      width: "300px",
      color: "#000",
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
    // Modal
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
      padding: "0",
      width: "820px",
      maxHeight: "85vh",
      overflowY: "auto",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    modalHeader: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "14px 20px",
      fontWeight: "bold",
      fontSize: "16px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      borderRadius: "8px 8px 0 0",
    },
    modalBody: { padding: "20px" },
    modalTabRow: {
      display: "flex",
      borderBottom: "2px solid #e0a800",
      marginBottom: "18px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontWeight: "bold",
      fontSize: "13px",
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
    radioRow: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      paddingTop: "6px",
    },
    btnRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "20px",
    },
  };

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vehicle/truck-maintenance`, { withCredentials: true });
      setRecords(res.data || []);
    } catch { setRecords([]); }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setFormData((prev) => ({ ...prev, documents: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData((prev) => ({ ...prev, maintenanceType: tab }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/vehicle/truck-maintenance`, formData, { withCredentials: true });
      setSuccessMsg("Maintenance record saved successfully!");
      setFormData({ ...emptyForm, maintenanceType: activeTab });
      setShowForm(false);
      fetchRecords();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch { alert("Error saving record. Please check the backend connection."); }
    finally { setLoading(false); }
  };

  const handleClear = () => setFormData({ ...emptyForm, maintenanceType: activeTab });

  const filteredRecords = records.filter(
    (r) => r.maintenanceType === activeTab &&
      (!searchParty || (r.supplierPartyName || "").toLowerCase().includes(searchParty.toLowerCase()))
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>TRUCK MAINTENANCE</div>

      <div style={styles.innerPad}>
        {successMsg && <div style={styles.success}>✅ {successMsg}</div>}

        <div style={styles.topRow}>
          <button style={styles.btnYellow}
            onClick={() => { setFormData({ ...emptyForm, maintenanceType: activeTab }); setShowForm(true); }}>
            + Add Maintenance
          </button>
        </div>

        <div style={styles.tabRow}>
          {tabs.map((tab) => (
            <button key={tab} style={styles.tab(activeTab === tab)}
              onClick={() => handleTabChange(tab)}>{tab}</button>
          ))}
        </div>

        <div style={styles.searchRow}>
          <input style={styles.searchInput}
            placeholder="Search by party, vehicle or driver..."
            value={searchParty}
            onChange={(e) => setSearchParty(e.target.value)} />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Type", "Truck No", "Date", "KM", "Expense Account",
                  "Supplier Party", "Amount", "Payment", "Driver",
                  "Next Alert KM", "Remarks"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? filteredRecords.map((rec, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{rec.maintenanceType}</td>
                  <td style={styles.td}>{rec.truckNo}</td>
                  <td style={styles.td}>{rec.date ? new Date(rec.date).toLocaleDateString("en-IN") : ""}</td>
                  <td style={styles.td}>{rec.kilometer}</td>
                  <td style={styles.td}>{rec.expenseAccount}</td>
                  <td style={styles.td}>{rec.supplierPartyName}</td>
                  <td style={styles.td}><b>₹{rec.amount}</b></td>
                  <td style={styles.td}>{rec.paymentMode}</td>
                  <td style={styles.td}>{rec.driver}</td>
                  <td style={styles.td}>{rec.nextAlertKM}</td>
                  <td style={styles.td}>{rec.remarks}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={11}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No records found. Click "+ Add Maintenance" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={styles.overlay}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>TRUCK MAINTENANCE — {activeTab.toUpperCase()}</div>

            <div style={styles.modalBody}>
              <div style={styles.modalTabRow}>
                {tabs.map((tab) => (
                  <button key={tab} style={styles.tab(activeTab === tab)}
                    onClick={() => handleTabChange(tab)}>{tab}</button>
                ))}
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Truck No</label>
                  <input style={styles.input} name="truckNo"
                    value={formData.truckNo} onChange={handleChange}
                    placeholder="e.g. MH12/39991" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date</label>
                  <input style={styles.input} type="date" name="date"
                    value={formData.date} onChange={handleChange} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Kilometer</label>
                  <input style={styles.input} type="number" name="kilometer"
                    value={formData.kilometer} onChange={handleChange}
                    placeholder="e.g. 2080" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Driver</label>
                  <input style={styles.input} name="driver"
                    value={formData.driver} onChange={handleChange}
                    placeholder="Driver name" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Expense Account</label>
                  <select style={styles.select} name="expenseAccount"
                    value={formData.expenseAccount} onChange={handleChange}>
                    <option value="">Select Account</option>
                    {["Off Expenses", "Tyre Expenses", "RTO Expenses",
                      "Repair & Maintenance", "Fuel Expenses", "Material Consumption"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Payment Mode</label>
                  <div style={styles.radioRow}>
                    {["Cash", "Credit", "UPI", "Card"].map(mode => (
                      <label key={mode} style={{ fontSize: "14px", cursor: "pointer" }}>
                        <input type="radio" name="paymentMode" value={mode}
                          checked={formData.paymentMode === mode}
                          onChange={handleChange} />{" "}{mode}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Supplier Party Name</label>
                  <input style={styles.input} name="supplierPartyName"
                    value={formData.supplierPartyName} onChange={handleChange}
                    placeholder="Select Supplier Party" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Amount (₹)</label>
                  <input style={styles.input} type="number" name="amount"
                    value={formData.amount} onChange={handleChange} placeholder="0" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Next Alert KM</label>
                  <input style={styles.input} type="number" name="nextAlertKM"
                    value={formData.nextAlertKM} onChange={handleChange}
                    placeholder="e.g. 5000" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Next Alert KM Date</label>
                  <input style={styles.input} type="date" name="nextAlertKMDate"
                    value={formData.nextAlertKMDate} onChange={handleChange} />
                </div>

                {/* Tyre specific */}
                {activeTab === "Tyre Maintenance" && (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Tyre Position</label>
                      <input style={styles.input} name="tyrePosition"
                        value={formData.tyrePosition} onChange={handleChange}
                        placeholder="e.g. Front Left" />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Tyre No</label>
                      <input style={styles.input} name="tyreNo"
                        value={formData.tyreNo} onChange={handleChange} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Tyre Brand</label>
                      <input style={styles.input} name="tyreBrand"
                        value={formData.tyreBrand} onChange={handleChange} />
                    </div>
                  </>
                )}

                {/* RTO specific */}
                {activeTab === "RTO Expenses" && (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>RTO Expense Type</label>
                      <select style={styles.select} name="rtoExpenseType"
                        value={formData.rtoExpenseType} onChange={handleChange}>
                        <option value="">Select</option>
                        {["Road Tax", "Permit", "Fitness Certificate",
                          "Pollution Certificate", "Insurance"].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Valid Upto</label>
                      <input style={styles.input} type="date" name="rtoValidUpto"
                        value={formData.rtoValidUpto} onChange={handleChange} />
                    </div>
                  </>
                )}

                {/* Material specific */}
                {activeTab === "Material Consumption" && (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Material Description</label>
                      <input style={styles.input} name="materialDescription"
                        value={formData.materialDescription} onChange={handleChange} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Quantity</label>
                      <input style={styles.input} type="number" name="quantity"
                        value={formData.quantity} onChange={handleChange} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Unit</label>
                      <select style={styles.select} name="unit"
                        value={formData.unit} onChange={handleChange}>
                        <option value="">Select</option>
                        {["Nos", "Ltr", "Kg"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </>
                )}

                <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>Remarks</label>
                  <input style={styles.input} name="remarks"
                    value={formData.remarks} onChange={handleChange}
                    placeholder="Enter remark" />
                </div>
                <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>Upload Document</label>
                  <input type="file" name="documents" onChange={handleChange}
                    style={{ fontSize: "14px" }} />
                </div>
              </div>

              <div style={styles.btnRow}>
                <button style={styles.btnBlack} onClick={handleClear}>Clear Form</button>
                <button style={styles.btnYellow} onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save Maintenance"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckMaintenance;