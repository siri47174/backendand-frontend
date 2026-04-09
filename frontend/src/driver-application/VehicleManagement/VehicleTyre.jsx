// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";

// const containerStyle = {
//   maxWidth: "900px",
//   maxHeight: "1400px",
//   marginLeft: "270px",
//   marginTop: "0",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   backgroundColor: "#fff",
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

// const inputStyle = {
//   width: "calc(100% - 16px)",
//   padding: "8px",
//   boxSizing: "border-box",
//   marginBottom: "10px",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
// };

// const buttonStyleFlex = {
//   display: "flex",
//   justifyContent: "space-between",
//   gap: "2rem",
//   paddingTop: "4rem",
//   paddingBottom:"4rem"
// };

// const buttonStyle = {
//   backgroundColor: "black",
//   color: "white",
//   padding: "10px 15px",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   width: "100%",
// };

// const initialFormData = {
//   vehicleNumber: "",
//   vehicleType: "Car",
//   modelName: "",
//   manufacturer: "",
//   tyreNumber: "",
//   presentKM: "",
//   expectedKM: "",
//   tyreBrand: "",
//   tyreSize: "",
//   replacementDate: "",
//   tyrePosition: "Front Left",
//   quantity: "",
//   costPerTyre: "",
//   totalCost: 0,
//   warranty: "No",
//   warrantyExpiry: "",
//   serviceCenterName: "",
//   serviceCenterAddress: "",
//   serviceCenterContact: "",
//   technicianName: "",
//   contactNumber: "",
//   paymentMethod: "Cash",
//   invoiceNumber: "",
//   totalAmount: "",
//   paymentStatus: "Pending",
//   additionalNotes: "",
// };

// const VehicleTyre = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevState) => {
//       const updatedFormData = { ...prevState, [name]: value };

//       if (name === "quantity" || name === "costPerTyre") {
//         const quantity = parseFloat(updatedFormData.quantity) || 0;
//         const costPerTyre = parseFloat(updatedFormData.costPerTyre) || 0;
//         updatedFormData.totalCost = quantity * costPerTyre;
//       }


//       return updatedFormData;
//     });
//   };

//   const handleClear = () => {
//     setFormData(initialFormData);
//   };

//   const handleContinue = () => {
//     navigate("/vehicle-tyre-confirm", { state: { formData } });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_BASE_URL + "/api/tyre-replacement", formData);
//       alert("Tyre Replacement Recorded Successfully!");
//       setFormData(initialFormData);
//     } catch (error) {
//       console.error("Error submitting form", error);
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 className="sendo-heading">Vehicle Tyre</h2>
//       <h2>Vehicle Tyre Replacement Module</h2>
//       <form onSubmit={handleSubmit}>
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
//             <option value="Bike">Bike</option>
//           </select>
//         </fieldset>
//         <fieldset style={fieldsetStyle}>
//           <legend>Tyre Details</legend>
//           <label style={labelStyle}>Tyre Number:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="tyreNumber"
//             value={formData.tyreNumber}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Present KM:</label>
//           <input
//             style={inputStyle}
//             type="number"
//             name="presentKM"
//             value={formData.presentKM}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Expected KM's:</label>
//           <input
//             style={inputStyle}
//             type="number"
//             name="expectedKM"
//             value={formData.expectedKM}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Tyre Brand:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="tyreBrand"
//             value={formData.tyreBrand}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Tyre Size:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="tyreSize"
//             value={formData.tyreSize}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Replacement Date:</label>
//           <input
//             style={inputStyle}
//             type="date"
//             name="replacementDate"
//             value={formData.replacementDate}
//             onChange={handleChange}
//             required
//           />
//         </fieldset>
//         <fieldset style={fieldsetStyle}>
//           <legend>Service Center Details</legend>
//           <label style={labelStyle}>Service Center Name:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="serviceCenterName"
//             value={formData.serviceCenterName}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Service Center Address:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="serviceCenterAddress"
//             value={formData.serviceCenterAddress}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Service Center Contact:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="serviceCenterContact"
//             value={formData.serviceCenterContact}
//             onChange={handleChange}
//             pattern="\d{10}"
//             required
//           />
//         </fieldset>
//         <fieldset style={fieldsetStyle}>
//           <legend>Payment Details</legend>
//           <label style={labelStyle}>Payment Method:</label>
//           <select
//             style={inputStyle}
//             name="paymentMethod"
//             value={formData.paymentMethod}
//             onChange={handleChange}
//           >
//             <option value="Cash">Cash</option>
//             <option value="Card">Card</option>
//             <option value="Online">Online</option>
//           </select>
//           <label style={labelStyle}>Invoice Number:</label>
//           <input
//             style={inputStyle}
//             type="text"
//             name="invoiceNumber"
//             value={formData.invoiceNumber}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Total Amount:</label>
//           <input
//             style={inputStyle}
//             type="number"
//             name="totalAmount"
//             value={formData.totalAmount}
//             onChange={handleChange}
//             required
//           />
//           <label style={labelStyle}>Payment Status:</label>
//           <select
//             style={inputStyle}
//             name="paymentStatus"
//             value={formData.paymentStatus}
//             onChange={handleChange}
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//             <option value="Failed">Failed</option>
//           </select>
//         </fieldset>
//         <div style={buttonStyleFlex}>
//           <button type="button" style={buttonStyle} onClick={handleClear}>
//             Clear
//           </button>
//           <button type="button" style={buttonStyle} onClick={handleContinue}>
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default VehicleTyre;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  vehicleNumber: "",
  vehicleType: "Car",
  modelName: "",
  manufacturer: "",
  tyreNumber: "",
  presentKM: "",
  expectedKM: "",
  tyreBrand: "",
  tyreSize: "",
  replacementDate: "",
  tyrePosition: "Front Left",
  quantity: "",
  costPerTyre: "",
  totalCost: 0,
  warranty: "No",
  warrantyExpiry: "",
  serviceCenterName: "",
  serviceCenterAddress: "",
  serviceCenterContact: "",
  technicianName: "",
  contactNumber: "",
  paymentMethod: "Cash",
  invoiceNumber: "",
  totalAmount: "",
  paymentStatus: "Pending",
  additionalNotes: "",
};

const VehicleTyre = () => {
  const [formData, setFormData] = useState(initialFormData);
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
    inputReadOnly: {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      if (name === "quantity" || name === "costPerTyre") {
        const quantity = parseFloat(updatedFormData.quantity) || 0;
        const costPerTyre = parseFloat(updatedFormData.costPerTyre) || 0;
        updatedFormData.totalCost = quantity * costPerTyre;
      }
      return updatedFormData;
    });
  };

  const handleClear = () => setFormData(initialFormData);

  const handleContinue = () => {
    navigate("/vehicle-tyre-confirm", { state: { formData } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE TYRE REPLACEMENT</div>

      <div style={styles.formWrapper}>
        <form onSubmit={(e) => e.preventDefault()}>

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
                <option value="Bike">Bike</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Model Name:</label>
              <input type="text" style={styles.input} name="modelName"
                value={formData.modelName} onChange={handleChange} />
            </div>
            <div>
              <label style={styles.label}>Manufacturer:</label>
              <input type="text" style={styles.input} name="manufacturer"
                value={formData.manufacturer} onChange={handleChange} />
            </div>
          </div>

          {/* Tyre Details */}
          <div style={styles.sectionTitle}>Tyre Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Tyre Number:</label>
              <input type="text" style={styles.input} name="tyreNumber"
                value={formData.tyreNumber} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Present KM:</label>
              <input type="number" style={styles.input} name="presentKM"
                value={formData.presentKM} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Expected KM's:</label>
              <input type="number" style={styles.input} name="expectedKM"
                value={formData.expectedKM} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Tyre Brand:</label>
              <input type="text" style={styles.input} name="tyreBrand"
                value={formData.tyreBrand} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Tyre Size:</label>
              <input type="text" style={styles.input} name="tyreSize"
                value={formData.tyreSize} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Replacement Date:</label>
              <input type="date" style={styles.input} name="replacementDate"
                value={formData.replacementDate} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Tyre Position:</label>
              <select style={styles.input} name="tyrePosition"
                value={formData.tyrePosition} onChange={handleChange}>
                <option value="Front Left">Front Left</option>
                <option value="Front Right">Front Right</option>
                <option value="Rear Left">Rear Left</option>
                <option value="Rear Right">Rear Right</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Quantity:</label>
              <input type="number" style={styles.input} name="quantity"
                value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Cost Per Tyre (₹):</label>
              <input type="number" style={styles.input} name="costPerTyre"
                value={formData.costPerTyre} onChange={handleChange} required />
            </div>
            {/* ✅ FIXED: was duplicate style props, now uses inputReadOnly */}
            <div>
              <label style={styles.label}>Total Cost (₹):</label>
              <input type="number" style={styles.inputReadOnly} name="totalCost"
                value={formData.totalCost} readOnly />
            </div>
            <div>
              <label style={styles.label}>Warranty:</label>
              <select style={styles.input} name="warranty"
                value={formData.warranty} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {formData.warranty === "Yes" && (
              <div>
                <label style={styles.label}>Warranty Expiry:</label>
                <input type="date" style={styles.input} name="warrantyExpiry"
                  value={formData.warrantyExpiry} onChange={handleChange} />
              </div>
            )}
          </div>

          {/* Service Center Details */}
          <div style={styles.sectionTitle}>Service Center Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Service Center Name:</label>
              <input type="text" style={styles.input} name="serviceCenterName"
                value={formData.serviceCenterName} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Service Center Address:</label>
              <input type="text" style={styles.input} name="serviceCenterAddress"
                value={formData.serviceCenterAddress} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Service Center Contact:</label>
              <input type="text" style={styles.input} name="serviceCenterContact"
                value={formData.serviceCenterContact} onChange={handleChange}
                pattern="\d{10}" required />
            </div>
            <div>
              <label style={styles.label}>Technician Name:</label>
              <input type="text" style={styles.input} name="technicianName"
                value={formData.technicianName} onChange={handleChange} />
            </div>
            <div>
              <label style={styles.label}>Contact Number:</label>
              <input type="text" style={styles.input} name="contactNumber"
                value={formData.contactNumber} onChange={handleChange}
                pattern="\d{10}" />
            </div>
          </div>

          {/* Payment Details */}
          <div style={styles.sectionTitle}>Payment Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Payment Method:</label>
              <select style={styles.input} name="paymentMethod"
                value={formData.paymentMethod} onChange={handleChange}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Invoice Number:</label>
              <input type="text" style={styles.input} name="invoiceNumber"
                value={formData.invoiceNumber} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Total Amount (₹):</label>
              <input type="number" style={styles.input} name="totalAmount"
                value={formData.totalAmount} onChange={handleChange} required />
            </div>
            <div>
              <label style={styles.label}>Payment Status:</label>
              <select style={styles.input} name="paymentStatus"
                value={formData.paymentStatus} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Additional Notes:</label>
              <textarea name="additionalNotes"
                style={{ ...styles.input, minHeight: "80px", resize: "vertical" }}
                value={formData.additionalNotes} onChange={handleChange} />
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
            <button type="button" style={styles.btnYellow} onClick={handleContinue}>Continue</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VehicleTyre;