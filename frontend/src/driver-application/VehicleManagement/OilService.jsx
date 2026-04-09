// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { saveAs } from "file-saver";
// import API_BASE_URL from "../config";
// const globalFontStyle = {
//   fontFamily: "Arial, sans-serif"
// };

// const containerStyle = {
//   ...globalFontStyle,
//   width: "calc(100% - 40px)",
//   marginLeft: "0",
//   padding: "20px",
//   border: "1px solid #eee",
//   borderRadius: "6px",
//   backgroundColor: "#fff",
// };

// const heading = {
//   ...globalFontStyle,
//   textAlign: "center",
//   backgroundColor: "#FFC107", color: "#000",
//   padding: "15px 20px",
//   borderRadius: "8px",
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//   width: "fit-content",
//   margin: "0 0 0 0",
//   fontSize: "1.8rem",
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   letterSpacing: "1px"
// };

// const formStyle = {
//   ...globalFontStyle,
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//   gridAutoRows: "auto",
//   gap: "40px",
//   padding: "20px 20px",
//   marginRight: "20px"
// };

// const inputStyle = {
//   width: "90%",
//   padding: "6px",
//   border: "1px solid #ccc",
//   borderRadius: "4px"
// };

// const buttonContainerStyle = {
//   display: "flex",
//   justifyContent: "flex-end",
//   marginTop: "0",
//   gap: "10px"
// };

// const buttonStyle = {
//   padding: "0.8em 1.5em",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   color: "white",
//   backgroundColor: "black",
//   transition: "all 0.3s ease-in-out",
//   marginRight:"10rem",
//   width:"10rem",
//   height:"3rem"
// };


// const fieldsetStyle = {
//   marginBottom: "15px",
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid #ddd",
// };

// const labelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontWeight: "bold",
// };

// const OilService = () => {
//       const navigate = useNavigate();
//       const initialFormData = {
//         vehicleNumber: "",
//         vehicleType: "Car",
//         serviceDate: "",
//         odometerReading: "",
//         lastServiceDate: "",
//         oilType: "Synthetic",
//         oilBrand: "",
//         oilQuantity: "",
//         oilGrade: "",
//         serviceCenterName: "",
//         technicianName: "",
//         contactNumber: "",
//       };
      
//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleClear = () => {
//     setFormData(initialFormData);
//   };

//   const handleContinue = () => {
//     navigate("/oil-service-confirmation", { state: { formData } });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_BASE_URL + "/vehicle/oil-service", formData);
//       alert("Oil Service Recorded Successfully!");
//       setFormData(initialFormData);
//     } catch (error) {
//       console.error("Error submitting form", error);
//     }
//   };
//   const downloadCSV = () => {
//     axios.get(API_BASE_URL + "/vehicle/oil-service-csv", { responseType: "blob" })
//       .then(response => {
//         saveAs(response.data, "OilServiceData.csv");
//       })
//       .catch(error => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   return (
//     <div className="sendo-page">
//       <h2 className="sendo-heading">Oil Service</h2>
//       <div style={{padding: "16px"}}>
//       <div style={containerStyle}>
      
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <fieldset style={fieldsetStyle}>
//           <legend>Vehicle Details</legend>
//           <label style={labelStyle}>Vehicle Number:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="vehicleNumber"
//             value={formData.vehicleNumber}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Vehicle Type:</label>
//           <select
//             style={inputStyle}
//             name="vehicleType"
//             value={formData.vehicleType}
//             onChange={handleChange}
//           >
//             <option value="Car">Car</option>
//             <option value="Truck">Truck</option>
//             <option value="Bus">Bus</option>
//           </select>
//         </fieldset>
//         <fieldset style={fieldsetStyle}>
//           <legend>Oil Service Details</legend>
//           <label style={labelStyle}>Service Date:</label>
//           <input
//             style={inputStyle}
//             type="date"
//             name="serviceDate"
//             value={formData.serviceDate}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Odometer Reading (KM):</label>
//           <input
//             style={inputStyle}
//             type="number"
//             name="odometerReading"
//             value={formData.odometerReading}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Last Service Date:</label>
//           <input
//             style={inputStyle}
//             type="date"
//             name="lastServiceDate"
//             value={formData.lastServiceDate}
//             onChange={handleChange}
//           />
//           <label style={labelStyle}>Oil Type:</label>
//           <select
//             style={inputStyle}
//             name="oilType"
//             value={formData.oilType}
//             onChange={handleChange}
//           >
//             <option value="Synthetic">Synthetic</option>
//             <option value="Semi-Synthetic">Semi-Synthetic</option>
//             <option value="Conventional">Conventional</option>
//           </select>
//           <label style={labelStyle}>Oil Brand:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="oilBrand"
//             value={formData.oilBrand}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Oil Quantity (Liters):</label>
//           <input
//             style={inputStyle}
//             type="number"
//             name="oilQuantity"
//             value={formData.oilQuantity}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Oil Grade:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="oilGrade"
//             value={formData.oilGrade}
//             onChange={handleChange}
//             required
//           />
//         </fieldset>
//         <fieldset style={fieldsetStyle}>
//           <legend>Service Provider Details</legend>
//           <label style={labelStyle}>Service Center Name:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="serviceCenterName"
//             value={formData.serviceCenterName}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Technician Name:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="technicianName"
//             value={formData.technicianName}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Contact Number:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             pattern="\d{10}"
//             required
//           />
//         </fieldset>
         
//       </form>
//     </div>
//     </div>
//     <div style={{...buttonContainerStyle, marginLeft: "16px", marginBottom: "16px"}}>
//           <button type="button" style={buttonStyle} onClick={handleClear}>
//             Clear
//           </button>
//           <button type="button" style={buttonStyle} onClick={handleContinue}>
//             Continue
//           </button>
//           <button type="button" onClick={downloadCSV} style={buttonStyle}>
//             Download CSV
//             </button>
//         </div>
//     </div>
//   );
// };

// export default OilService;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import API_BASE_URL from "../config";

const OilService = () => {
  const navigate = useNavigate();

  const initialFormData = {
    vehicleNumber: "",
    vehicleType: "Car",
    serviceDate: "",
    odometerReading: "",
    lastServiceDate: "",
    oilType: "Synthetic",
    oilBrand: "",
    oilQuantity: "",
    oilGrade: "",
    serviceCenterName: "",
    technicianName: "",
    contactNumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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
    formWrapper: {
      padding: "24px 20px",
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
      marginBottom: "24px",
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleContinue = () => {
    navigate("/oil-service-confirmation", { state: { formData } });
  };

  const downloadCSV = () => {
    axios
      .get(API_BASE_URL + "/vehicle/oil-service-csv", { responseType: "blob" })
      .then((response) => saveAs(response.data, "OilServiceData.csv"))
      .catch((error) => console.error("Error downloading CSV:", error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>OIL SERVICE</div>

      <div style={styles.formWrapper}>

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
              <option value="Car">Car</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
        </div>

        {/* Oil Service Details */}
        <div style={styles.sectionTitle}>Oil Service Details</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Service Date:</label>
            <input type="date" style={styles.input} name="serviceDate"
              value={formData.serviceDate} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Odometer Reading (KM):</label>
            <input type="number" style={styles.input} name="odometerReading"
              value={formData.odometerReading} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Last Service Date:</label>
            <input type="date" style={styles.input} name="lastServiceDate"
              value={formData.lastServiceDate} onChange={handleChange} />
          </div>
          <div>
            <label style={styles.label}>Oil Type:</label>
            <select style={styles.input} name="oilType"
              value={formData.oilType} onChange={handleChange}>
              <option value="Synthetic">Synthetic</option>
              <option value="Semi-Synthetic">Semi-Synthetic</option>
              <option value="Conventional">Conventional</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Oil Brand:</label>
            <input type="text" style={styles.input} name="oilBrand"
              value={formData.oilBrand} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Oil Quantity (Liters):</label>
            <input type="number" style={styles.input} name="oilQuantity"
              value={formData.oilQuantity} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Oil Grade:</label>
            <input type="text" style={styles.input} name="oilGrade"
              value={formData.oilGrade} onChange={handleChange} required />
          </div>
        </div>

        {/* Service Provider Details */}
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

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
          <button type="button" style={styles.btnBlack} onClick={downloadCSV}>Download CSV</button>
          <button type="button" style={styles.btnYellow} onClick={handleContinue}>Continue</button>
        </div>

      </div>
    </div>
  );
};

export default OilService;