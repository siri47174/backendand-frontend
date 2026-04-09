// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { saveAs } from "file-saver";
// import API_BASE_URL from "../config";

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { saveAs } from "file-saver";
// // const globalFontStyle = {
// //   fontFamily: "Arial, sans-serif"
// // };

// // const containerStyle = {
// //   ...globalFontStyle,
// //   width: "85%",
// //   maxWidth: "3000px",
// //   marginLeft: "270px",
// //   padding: "20px",
// //   border: "1px solid #ccc",
// //   borderRadius: "8px",
// //   backgroundColor: "#f9f9f9",
// //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
// // };

// // const heading = {
// //   ...globalFontStyle,
// //   textAlign: "center",
// //   backgroundColor: "#000",
// //   color: "#fff",
// //   padding: "15px 20px",
// //   borderRadius: "8px",
// //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
// //   width: "fit-content",
// //   margin: "2rem 2rem 2rem 22rem",
// //   fontSize: "1.8rem",
// //   fontWeight: "bold",
// //   textTransform: "uppercase",
// //   letterSpacing: "1px"
// // };

// // const formStyle = {
// //   ...globalFontStyle,
// //   display: "grid",
// //   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// //   gridAutoRows: "auto",
// //   gap: "40px",
// //   padding: "20px 20px",
// //   marginRight: "20px"
// // };

// // const inputStyle = {
// //   width: "90%",
// //   padding: "6px",
// //   border: "1px solid #ccc",
// //   borderRadius: "4px"
// // };

// // const buttonContainerStyle = {
// //   display: "flex",
// //   justifyContent: "space-between",
// //   marginTop: "20px",
// //   marginLeft: "270px",
// //   gap: "2rem"
// // };

// // const buttonStyle = {
// //   padding: "0.8em 1.5em",
// //   border: "none",
// //   borderRadius: "5px",
// //   cursor: "pointer",
// //   color: "white",
// //   backgroundColor: "black",
// //   transition: "all 0.3s ease-in-out",
// //   marginRight:"10rem",
// //   width:"10rem",
// //   height:"3rem"
// // };

// // const fieldsetStyle = {
// //   marginBottom: "15px",
// //   padding: "10px",
// //   borderRadius: "5px",
// //   border: "1px solid #ddd",
// // };

// // const labelStyle = {
// //   display: "block",
// //   marginBottom: "5px",
// //   fontWeight: "bold",
// // };

// // const SpareParts = () => {
// //   const initialFormData = {
// //     vehicleNumber: "",
// //     sparePartName: "",
// //     partNumber: "",
// //     replacementDate: "",
// //     partCategory: "Engine",
// //     quantity: "",
// //     costPerPart: "",
// //     totalCost: 0,
// //     serviceCenterName: "",
// //     technicianName: "",
// //     contactNumber: "",
// //   };
// //   const [formData, setFormData] = useState(initialFormData);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => {
// //       const updatedData = { ...prevData, [name]: value };

// //       if (name === "quantity" || name === "costPerPart") {
// //         const quantity = parseFloat(updatedData.quantity) || 0;
// //         const costPerPart = parseFloat(updatedData.costPerPart) || 0;
// //         updatedData.totalCost = quantity * costPerPart;
// //       }
// //       return updatedData;
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(API_BASE_URL + "/vehicle/spare-parts", formData);
// //       alert("Spare Parts Replacement Recorded Successfully!");
// //       navigate("/spare-parts-confirmation", { state: { formData } });
// //     } catch (error) {
// //       console.error("Error submitting form", error);
// //     }
// //   };

// //   const handleClear = () => {
// //     setFormData(initialFormData);
// //   };

// //   const handleContinue = () => {
// //     navigate("/spare-parts-confirmation", { state: { formData } });
// //   };

// //    const downloadCSV = () => {
// //       axios.get(API_BASE_URL + "/vehicle/spare-parts-csv", { responseType: "blob" })
// //         .then(response => {
// //           saveAs(response.data, "SpareParts.csv");
// //         })
// //         .catch(error => {
// //           console.error("Error downloading CSV:", error);
// //         });
// //     };

// //   return (
// //     <div>
// //       <h2 className="sendo-heading">Spare Parts</h2>
// //     <div style={containerStyle}>

// //       <form onSubmit={handleSubmit} style={formStyle}>
// //         <fieldset style={fieldsetStyle}>
// //           <legend>Vehicle Details</legend>
// //           <label style={labelStyle}>Vehicle Number:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="vehicleNumber"
// //             value={formData.vehicleNumber}
// //             onChange={handleChange}
// //             required
// //           />
// //         </fieldset>
// //         <fieldset style={fieldsetStyle}>
// //           <legend>Spare Parts Details</legend>
// //           <label style={labelStyle}>Spare Part Name:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="sparePartName"
// //             value={formData.sparePartName}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Part Number:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="partNumber"
// //             value={formData.partNumber}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Replacement Date:</label>
// //           <input
// //             style={inputStyle}
// //             type="date"
// //             name="replacementDate"
// //             value={formData.replacementDate}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Part Category:</label>
// //           <select
// //             style={inputStyle}
// //             name="partCategory"
// //             value={formData.partCategory}
// //             onChange={handleChange}
// //           >
// //             <option value="Engine">Engine</option>
// //             <option value="Brake">Brake</option>
// //             <option value="Suspension">Suspension</option>
// //             <option value="Electrical">Electrical</option>
// //           </select>
// //           <label style={labelStyle}>Quantity:</label>
// //           <input
// //             style={inputStyle}
// //             type="number"
// //             name="quantity"
// //             value={formData.quantity}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Cost per Part:</label>
// //           <input
// //             style={inputStyle}
// //             type="number"
// //             name="costPerPart"
// //             value={formData.costPerPart}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Total Cost (Auto-Calculated):</label>
// //           <input
// //             style={inputStyle}
// //             type="number"
// //             name="totalCost"
// //             value={formData.totalCost}
// //             readOnly
// //           />
// //         </fieldset>
// //         <fieldset style={fieldsetStyle}>
// //           <legend>Service Provider Details</legend>
// //           <label style={labelStyle}>Service Center Name:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="serviceCenterName"
// //             value={formData.serviceCenterName}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Technician Name:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="technicianName"
// //             value={formData.technicianName}
// //             onChange={handleChange}
// //             required
// //           />
// //           <label style={labelStyle}>Contact Number:</label>
// //           <input
// //             style={inputStyle}
// //             type="text"
// //             name="contactNumber"
// //             value={formData.contactNumber}
// //             onChange={handleChange}
// //             pattern="\d{10}"
// //             required
// //           />
// //         </fieldset>

// //       </form>
// //     </div>
// //     <div style={buttonContainerStyle}>
// //           <button type="button" style={buttonStyle} onClick={handleClear}>
// //             Clear
// //           </button>
// //           <button type="button" style={buttonStyle} onClick={handleContinue}>
// //             Continue
// //           </button>
// //           <button type="button" onClick={downloadCSV} style={buttonStyle}>
// //             Download CSV
// //             </button>
// //         </div>
// //     </div>
// //   );
// // };

// // export default SpareParts;


// const SpareParts = () => {
//   const initialFormData = {
//     vehicleNumber: "",
//     sparePartName: "",
//     partNumber: "",
//     replacementDate: "",
//     partCategory: "Engine",
//     quantity: "",
//     costPerPart: "",
//     totalCost: 0,
//     serviceCenterName: "",
//     technicianName: "",
//     contactNumber: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [records, setRecords] = useState([]);
//   const [filters, setFilters] = useState({
//     vehicleNumber: "",
//     sparePartName: "",
//     date: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       const response = await axios.get(
//         API_BASE_URL + "/vehicle/spare-parts"
//       );
//       setRecords(response.data);
//     } catch (error) {
//       console.error("Error fetching records", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };
//       if (name === "quantity" || name === "costPerPart") {
//         updatedData.totalCost =
//           (parseFloat(updatedData.quantity) || 0) *
//           (parseFloat(updatedData.costPerPart) || 0);
//       }
//       return updatedData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_BASE_URL + "/vehicle/spare-parts", formData);
//       alert("Spare Parts Replacement Recorded Successfully!");
//       fetchRecords();
//       navigate("/spare-parts-confirmation", { state: { formData } });
//     } catch (error) {
//       console.error("Error submitting form", error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const filteredRecords = records.filter(
//     (record) =>
//       record.vehicleNumber.includes(filters.vehicleNumber) &&
//       record.sparePartName.includes(filters.sparePartName) &&
//       record.replacementDate.includes(filters.date)
//   );

//   const downloadCSV = () => {
//     axios
//       .get(API_BASE_URL + "/vehicle/spare-parts-csv", {
//         responseType: "blob",
//       })
//       .then((response) => {
//         saveAs(response.data, "SpareParts.csv");
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   const S = {
//     page: { marginLeft: "270px", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//     heading: { textAlign: "center", backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", width: "fit-content", margin: "0 auto 24px", fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase" },
//     card: { backgroundColor: "#fff", borderRadius: "8px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "20px" },
//     grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
//     group: { display: "flex", flexDirection: "column", gap: "4px" },
//     label: { fontSize: "12px", fontWeight: "bold", color: "#555" },
//     input: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "13px" },
//     btnRow: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" },
//     saveBtn: { backgroundColor: "#FFC107", color: "#000", border: "none", padding: "9px 22px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
//     csvBtn: { backgroundColor: "#000", color: "#fff", border: "none", padding: "9px 22px", borderRadius: "4px", cursor: "pointer" },
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { background: "#f0f0f0", padding: "9px 12px", fontSize: "12px", fontWeight: "bold", textAlign: "left", borderBottom: "1px solid #ddd" },
//     td: { padding: "9px 12px", fontSize: "12px", borderBottom: "1px solid #f0f0f0" },
//     filterRow: { display: "flex", gap: "12px", marginBottom: "16px" },
//     filterInput: { padding: "7px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "12px", flex: 1 },
//   };

//   return (
//     <div style={S.page}>
//       <h2 style={S.heading}>Spare Parts Management</h2>
//       <div style={S.card}>
//         <b style={{ display: "block", marginBottom: 16 }}>Add Spare Parts Record</b>
//         <div style={S.grid}>
//           {[["Vehicle Number","vehicleNumber","text"],["Spare Part Name","sparePartName","text"],["Quantity","quantity","number"],["Cost Per Part (₹)","costPerPart","number"],["Total Cost (₹)","totalCost","number"],["Replacement Date","replacementDate","date"],["Service Center","serviceCenterName","text"],["Technician Name","technicianName","text"],["Contact Number","contactNumber","text"]].map(([lbl,name,type]) => (
//             <div style={S.group} key={name}>
//               <label style={S.label}>{lbl}</label>
//               <input style={S.input} readOnly={name==="totalCost"} type={type} name={name} value={formData[name]||""} onChange={handleChange} />
//             </div>
//           ))}
//         </div>
//         <div style={S.btnRow}>
//           <button style={S.saveBtn} onClick={(e) => { e.preventDefault(); handleSubmit(e); }}>Save Record</button>
//         </div>
//       </div>
//       <div style={S.card}>
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
//           <b>Spare Parts Records</b>
//           <button style={S.csvBtn} onClick={downloadCSV}>⬇ Download CSV</button>
//         </div>
//         <div style={S.filterRow}>
//           <input style={S.filterInput} name="vehicleNumber" value={filters.vehicleNumber} onChange={handleFilterChange} placeholder="Filter by Vehicle Number" />
//           <input style={S.filterInput} name="sparePartName" value={filters.sparePartName} onChange={handleFilterChange} placeholder="Filter by Part Name" />
//           <input style={S.filterInput} type="date" name="date" value={filters.date} onChange={handleFilterChange} />
//         </div>
//         <table style={S.table}>
//           <thead>
//             <tr>
//               {["Vehicle No","Spare Part","Date","Qty","Cost/Part","Total Cost","Service Center","Technician"].map(h => <th style={S.th} key={h}>{h}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRecords.length > 0 ? filteredRecords.map((r, i) => (
//               <tr key={i}>
//                 <td style={S.td}>{r.vehicleNumber}</td>
//                 <td style={S.td}>{r.sparePartName}</td>
//                 <td style={S.td}>{r.replacementDate}</td>
//                 <td style={S.td}>{r.quantity}</td>
//                 <td style={S.td}>₹{r.costPerPart}</td>
//                 <td style={S.td}><b>₹{r.totalCost}</b></td>
//                 <td style={S.td}>{r.serviceCenterName}</td>
//                 <td style={S.td}>{r.technicianName}</td>
//               </tr>
//             )) : (
//               <tr><td colSpan={8} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>No records yet</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SpareParts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import API_BASE_URL from "../config";

const SpareParts = () => {
  const initialFormData = {
    vehicleNumber: "",
    sparePartName: "",
    partNumber: "",
    replacementDate: "",
    partCategory: "Engine",
    quantity: "",
    costPerPart: "",
    totalCost: 0,
    serviceCenterName: "",
    technicianName: "",
    contactNumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({ vehicleNumber: "", sparePartName: "", date: "" });
  const navigate = useNavigate();

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
    filterRow: {
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    filterInput: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      flex: 1,
      minWidth: "180px",
      color: "#000",
    },
    tableTopRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
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
    divider: {
      borderTop: "2px solid #f0f0f0",
      margin: "24px 0",
    },
  };

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/vehicle/spare-parts");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "quantity" || name === "costPerPart") {
        updated.totalCost =
          (parseFloat(updated.quantity) || 0) *
          (parseFloat(updated.costPerPart) || 0);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL + "/vehicle/spare-parts", formData);
      alert("Spare Parts Replacement Recorded Successfully!");
      fetchRecords();
      navigate("/spare-parts-confirmation", { state: { formData } });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFormData(initialFormData);

  const downloadCSV = () => {
    axios
      .get(API_BASE_URL + "/vehicle/spare-parts-csv", { responseType: "blob" })
      .then((response) => saveAs(response.data, "SpareParts.csv"))
      .catch((error) => console.error("Error downloading CSV:", error));
  };

  const filteredRecords = records.filter(
    (record) =>
      record.vehicleNumber.includes(filters.vehicleNumber) &&
      record.sparePartName.includes(filters.sparePartName) &&
      record.replacementDate.includes(filters.date)
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>SPARE PARTS MANAGEMENT</div>

      <div style={styles.innerPad}>

        {/* Form Section */}
        <div style={styles.sectionTitle}>Vehicle Details</div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Vehicle Number:</label>
              <input type="text" style={styles.input} name="vehicleNumber"
                value={formData.vehicleNumber} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.sectionTitle}>Spare Parts Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Spare Part Name:</label>
              <input type="text" style={styles.input} name="sparePartName"
                value={formData.sparePartName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Part Number:</label>
              <input type="text" style={styles.input} name="partNumber"
                value={formData.partNumber} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Replacement Date:</label>
              <input type="date" style={styles.input} name="replacementDate"
                value={formData.replacementDate} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Part Category:</label>
              <select style={styles.input} name="partCategory"
                value={formData.partCategory} onChange={handleChange}>
                <option value="Engine">Engine</option>
                <option value="Brake">Brake</option>
                <option value="Suspension">Suspension</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Quantity:</label>
              <input type="number" style={styles.input} name="quantity"
                value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Cost Per Part (₹):</label>
              <input type="number" style={styles.input} name="costPerPart"
                value={formData.costPerPart} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Total Cost (₹) — Auto Calculated:</label>
              <input type="number" style={styles.readOnly} name="totalCost"
                value={formData.totalCost} readOnly />
            </div>
          </div>

          <div style={styles.sectionTitle}>Service Provider Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Service Center Name:</label>
              <input type="text" style={styles.input} name="serviceCenterName"
                value={formData.serviceCenterName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Technician Name:</label>
              <input type="text" style={styles.input} name="technicianName"
                value={formData.technicianName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Contact Number:</label>
              <input type="text" style={styles.input} name="contactNumber"
                value={formData.contactNumber} onChange={handleChange}
                pattern="\d{10}" required />
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
            <button type="submit" style={styles.btnYellow}>Save Record</button>
          </div>
        </form>

        <div style={styles.divider} />

        {/* Records Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Spare Parts Records</div>
          <button style={styles.btnBlack} onClick={downloadCSV}>⬇ Download CSV</button>
        </div>

        <div style={styles.filterRow}>
          <input style={styles.filterInput} name="vehicleNumber"
            value={filters.vehicleNumber} onChange={handleFilterChange}
            placeholder="Filter by Vehicle Number" />
          <input style={styles.filterInput} name="sparePartName"
            value={filters.sparePartName} onChange={handleFilterChange}
            placeholder="Filter by Part Name" />
          <input type="date" style={styles.filterInput} name="date"
            value={filters.date} onChange={handleFilterChange} />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Vehicle No", "Spare Part", "Part Number", "Date", "Category",
                  "Qty", "Cost/Part", "Total Cost", "Service Center", "Technician"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? filteredRecords.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{r.vehicleNumber}</td>
                  <td style={styles.td}>{r.sparePartName}</td>
                  <td style={styles.td}>{r.partNumber}</td>
                  <td style={styles.td}>{r.replacementDate}</td>
                  <td style={styles.td}>{r.partCategory}</td>
                  <td style={styles.td}>{r.quantity}</td>
                  <td style={styles.td}>₹{r.costPerPart}</td>
                  <td style={styles.td}><b>₹{r.totalCost}</b></td>
                  <td style={styles.td}>{r.serviceCenterName}</td>
                  <td style={styles.td}>{r.technicianName}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={10}
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
};

export default SpareParts;