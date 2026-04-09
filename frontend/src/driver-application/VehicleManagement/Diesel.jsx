// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { saveAs } from "file-saver";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";

// const Diesel = () => {
//   const navigate = useNavigate();
//   const initialForm = {
//     date: "",
//     vehicleNumber: "",
//     vehicleType: "Truck",
//     driverName: "",
//     vehicleRoute: "",
//     pumpName: "",
//     startKm: "",
//     endKm: "",
//     totalKm: "",
//     volume: "",
//     ratePerLiter: "",
//     totalAmount: "",
//     paymentMode: "Cash",
//     remarks: "",
//   };

//   const [formData, setFormData] = useState(initialForm);
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(API_BASE_URL + "/vehicle/diesel");
//       setRecords(res.data || []);
//     } catch (e) {
//       console.error("Error fetching diesel data:", e);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value };
//     // Auto-calculate totalKm and totalAmount
//     if (name === "startKm" || name === "endKm") {
//       updated.totalKm = Math.max(0, (parseFloat(updated.endKm) || 0) - (parseFloat(updated.startKm) || 0)).toString();
//     }
//     if (name === "volume" || name === "ratePerLiter") {
//       updated.totalAmount = ((parseFloat(updated.volume) || 0) * (parseFloat(updated.ratePerLiter) || 0)).toFixed(2);
//     }
//     setFormData(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_BASE_URL + "/vehicle/diesel", formData);
//       alert("Diesel entry saved successfully!");
//       setFormData(initialForm);
//       fetchRecords();
//     } catch (e) {
//       console.error("Error saving diesel entry:", e);
//       alert("Failed to save. Check backend connection.");
//     }
//   };

//   const handleClear = () => setFormData(initialForm);

//   const downloadCSV = () => {
//     axios.get(API_BASE_URL + "/vehicle/diesel-csv", { responseType: "blob" })
//       .then(res => saveAs(res.data, "DieselData.csv"))
//       .catch(e => console.error("CSV download error:", e));
//   };

//   const filtered = records.filter(r =>
//     (r.driverName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (r.vehicleNumber || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const mileage = formData.volume > 0 && formData.totalKm > 0
//     ? (parseFloat(formData.totalKm) / parseFloat(formData.volume)).toFixed(2)
//     : "—";

//   return (
//     <div className="sendo-page">
//       <h2 className="sendo-heading">Diesel Management</h2>

//       <div style={{ padding: "16px" }}>
//         {/* Form */}
//         <div className="sendo-form" style={{ marginBottom: 16 }}>
//           {[
//             ["Date", "date", "date"],
//             ["Vehicle Number", "vehicleNumber", "text"],
//             ["Driver Name", "driverName", "text"],
//             ["Vehicle Route", "vehicleRoute", "text"],
//             ["Pump Name", "pumpName", "text"],
//             ["Start KM", "startKm", "number"],
//             ["End KM", "endKm", "number"],
//             ["Total KM", "totalKm", "number"],
//             ["Volume (Liters)", "volume", "number"],
//             ["Rate Per Liter (₹)", "ratePerLiter", "number"],
//             ["Total Amount (₹)", "totalAmount", "number"],
//           ].map(([l, n, t]) => (
//             <div className="sendo-form-group" key={n}>
//               <label className="sendo-label">{l}</label>
//               <input
//                 className="sendo-input"
//                 readOnly={["totalKm", "totalAmount"].includes(n)}
//                 type={t}
//                 name={n}
//                 value={formData[n]}
//                 onChange={handleChange}
//                 placeholder={l}
//               />
//             </div>
//           ))}

//           <div className="sendo-form-group">
//             <label className="sendo-label">Vehicle Type</label>
//             <select className="sendo-select" name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
//               {["Truck", "Car", "Bus", "Tempo", "Other"].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </div>

//           <div className="sendo-form-group">
//             <label className="sendo-label">Payment Mode</label>
//             <select className="sendo-select" name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
//               {["Cash", "Card", "UPI", "Credit"].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </div>

//           <div className="sendo-form-group">
//             <label className="sendo-label">Mileage (KM/L)</label>
//             <input className="sendo-input" readOnly value={mileage} style={{ background: "#f0f0f0" }} />
//           </div>

//           <div className="sendo-form-group" style={{ gridColumn: "1/-1" }}>
//             <label className="sendo-label">Remarks</label>
//             <input className="sendo-input" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Optional remarks" />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 20 }}>
//           <button className="sendo-btn-outline" onClick={handleClear}>Clear</button>
//           <button className="sendo-btn-yellow" onClick={handleSubmit}>Save Entry</button>
//         </div>

//         {/* Table */}
//         <div className="sendo-toolbar">
//           <input className="sendo-input" placeholder="Search driver or vehicle..." value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)} style={{ width: 300 }} />
//           <button className="sendo-btn-black" onClick={downloadCSV}>⬇ Download CSV</button>
//         </div>

//         <table className="sendo-table" style={{ marginTop: 12 }}>
//           <thead>
//             <tr>
//               {["Date", "Vehicle", "Type", "Driver", "Route", "Start KM", "End KM", "Total KM", "Volume(L)", "Rate/L", "Amount", "Mode", "Mileage"].map(h => (
//                 <th key={h}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length > 0 ? filtered.map((r, i) => (
//               <tr key={i}>
//                 <td>{r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}</td>
//                 <td>{r.vehicleNumber}</td>
//                 <td>{r.vehicleType}</td>
//                 <td>{r.driverName}</td>
//                 <td>{r.vehicleRoute}</td>
//                 <td>{r.startKm}</td>
//                 <td>{r.endKm}</td>
//                 <td>{r.totalKm}</td>
//                 <td>{r.volume}</td>
//                 <td>₹{r.ratePerLiter}</td>
//                 <td><b>₹{r.totalAmount}</b></td>
//                 <td>{r.paymentMode}</td>
//                 <td>{r.volume > 0 && r.totalKm > 0 ? (r.totalKm / r.volume).toFixed(2) : "—"}</td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan={13} style={{ padding: 28, color: "#aaa" }}>No diesel records yet</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Diesel;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import API_BASE_URL from "../config";

const Diesel = () => {
  const initialForm = {
    date: "",
    vehicleNumber: "",
    vehicleType: "Truck",
    driverName: "",
    vehicleRoute: "",
    pumpName: "",
    startKm: "",
    endKm: "",
    totalKm: "",
    volume: "",
    ratePerLiter: "",
    totalAmount: "",
    paymentMode: "Cash",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      whiteSpace: "nowrap",
    },
  };

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/vehicle/diesel");
      setRecords(res.data || []);
    } catch (e) {
      console.error("Error fetching diesel data:", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    if (name === "startKm" || name === "endKm") {
      updated.totalKm = Math.max(
        0,
        (parseFloat(updated.endKm) || 0) - (parseFloat(updated.startKm) || 0)
      ).toString();
    }
    if (name === "volume" || name === "ratePerLiter") {
      updated.totalAmount = (
        (parseFloat(updated.volume) || 0) *
        (parseFloat(updated.ratePerLiter) || 0)
      ).toFixed(2);
    }
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL + "/vehicle/diesel", formData);
      alert("Diesel entry saved successfully!");
      setFormData(initialForm);
      fetchRecords();
    } catch (e) {
      console.error("Error saving diesel entry:", e);
      alert("Failed to save. Check backend connection.");
    }
  };

  const handleClear = () => setFormData(initialForm);

  const downloadCSV = () => {
    axios
      .get(API_BASE_URL + "/vehicle/diesel-csv", { responseType: "blob" })
      .then((res) => saveAs(res.data, "DieselData.csv"))
      .catch((e) => console.error("CSV download error:", e));
  };

  const mileage =
    formData.volume > 0 && formData.totalKm > 0
      ? (parseFloat(formData.totalKm) / parseFloat(formData.volume)).toFixed(2)
      : "—";

  const filtered = records.filter(
    (r) =>
      (r.driverName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.vehicleNumber || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DIESEL MANAGEMENT</div>

      <div style={styles.innerPad}>
        <form onSubmit={handleSubmit}>

          {/* Vehicle Details */}
          <div style={styles.sectionTitle}>Vehicle Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Vehicle Number:</label>
              <input type="text" style={styles.input} name="vehicleNumber"
                value={formData.vehicleNumber} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Vehicle Type:</label>
              <select style={styles.input} name="vehicleType"
                value={formData.vehicleType} onChange={handleChange}>
                {["Truck", "Car", "Bus", "Tempo", "Other"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Driver Name:</label>
              <input type="text" style={styles.input} name="driverName"
                value={formData.driverName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Vehicle Route:</label>
              <input type="text" style={styles.input} name="vehicleRoute"
                value={formData.vehicleRoute} onChange={handleChange} />
            </div>
          </div>

          {/* Diesel Details */}
          <div style={styles.sectionTitle}>Diesel Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Date:</label>
              <input type="date" style={styles.input} name="date"
                value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Pump Name:</label>
              <input type="text" style={styles.input} name="pumpName"
                value={formData.pumpName} onChange={handleChange} />
            </div>
            <div>
              <label style={styles.label}>Start KM:</label>
              <input type="number" style={styles.input} name="startKm"
                value={formData.startKm} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>End KM:</label>
              <input type="number" style={styles.input} name="endKm"
                value={formData.endKm} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Total KM (Auto):</label>
              <input type="number" style={styles.readOnly} name="totalKm"
                value={formData.totalKm} readOnly />
            </div>
            <div>
              <label style={styles.label}>Volume (Liters):</label>
              <input type="number" style={styles.input} name="volume"
                value={formData.volume} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Rate Per Liter (₹):</label>
              <input type="number" style={styles.input} name="ratePerLiter"
                value={formData.ratePerLiter} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Total Amount (₹) (Auto):</label>
              <input type="number" style={styles.readOnly} name="totalAmount"
                value={formData.totalAmount} readOnly />
            </div>
            <div>
              <label style={styles.label}>Mileage (KM/L) (Auto):</label>
              <input style={styles.readOnly} value={mileage} readOnly />
            </div>
          </div>

          {/* Payment Details */}
          <div style={styles.sectionTitle}>Payment Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Payment Mode:</label>
              <select style={styles.input} name="paymentMode"
                value={formData.paymentMode} onChange={handleChange}>
                {["Cash", "Card", "UPI", "Credit"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Remarks:</label>
              <input type="text" style={styles.input} name="remarks"
                value={formData.remarks} onChange={handleChange}
                placeholder="Optional remarks" />
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
            <button type="submit" style={styles.btnYellow}>Save Entry</button>
          </div>
        </form>

        <div style={styles.divider} />

        {/* Records Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Diesel Records</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              style={styles.searchInput}
              placeholder="Search by driver or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={styles.btnBlack} onClick={downloadCSV}>⬇ Download CSV</button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Date", "Vehicle", "Type", "Driver", "Route", "Pump",
                  "Start KM", "End KM", "Total KM", "Volume (L)",
                  "Rate/L", "Amount", "Mode", "Mileage", "Remarks"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.date ? new Date(r.date).toLocaleDateString("en-IN") : ""}</td>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.vehicleType}</td>
                  <td style={styles.td}>{r.driverName}</td>
                  <td style={styles.td}>{r.vehicleRoute}</td>
                  <td style={styles.td}>{r.pumpName}</td>
                  <td style={styles.td}>{r.startKm}</td>
                  <td style={styles.td}>{r.endKm}</td>
                  <td style={styles.td}>{r.totalKm}</td>
                  <td style={styles.td}>{r.volume}</td>
                  <td style={styles.td}>₹{r.ratePerLiter}</td>
                  <td style={styles.td}><b>₹{r.totalAmount}</b></td>
                  <td style={styles.td}>{r.paymentMode}</td>
                  <td style={styles.td}>
                    {r.volume > 0 && r.totalKm > 0
                      ? (r.totalKm / r.volume).toFixed(2)
                      : "—"}
                  </td>
                  <td style={styles.td}>{r.remarks}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={15}
                    style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No diesel records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Diesel;