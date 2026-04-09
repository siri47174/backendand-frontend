import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// import React, { useState } from "react";
// import axios from "axios";

// const ManualRequestForm = ({ onClose, refreshData }) => {
//   const [formData, setFormData] = useState({
//     driverId: "",
//     driverName: "",
//     month: "",
//     requestedAmount: "",
//     approvedAmount: "",
//     status: "Approved",
//     adminName: "Admin User",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // // Validation Check
//     // if (formData.approvedAmount > formData.requestedAmount) {
//     //   alert("Approved amount cannot be greater than requested amount!");
//     //   return;
//     // }

//     try {
//       await axios.post(API_BASE_URL + "/advance/manual", formData);
//       alert("Manual request added successfully!");
//       refreshData(); // ✅ Refresh table data
//       onClose();
//     } catch (error) {
//       console.error("Error submitting manual request:", error);
//       alert("Failed to add request. Please try again.");
//     }
//   };

//   return (
//     <div style={formStyle}>
//       <h3>Manual Advance Request Form</h3>
//       <form onSubmit={handleSubmit}>
//         <label>Driver ID: </label>
//         <input type="text" name="driverId" value={formData.driverId} onChange={handleChange} required />
//         <br />
//         <label>Driver Name: </label>
//         <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} required />
//         <br />
//         <label>Month (YYYY-MM): </label>
//         <input type="month" name="month" value={formData.month} onChange={handleChange} required />
//         <br />
//         <label>Requested Amount (₹): </label>
//         <input type="number" name="requestedAmount" value={formData.requestedAmount} onChange={handleChange} required />
//         <br />
//         <label>Approved Amount (₹): </label>
//         <input type="number" name="approvedAmount" value={formData.approvedAmount} onChange={handleChange} required />
//         <br />
//         <button type="submit" style={submitButtonStyle}>Submit</button>
//         <button type="button" onClick={onClose} style={cancelButtonStyle}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// const formStyle = {
//   backgroundColor: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
// };

// const submitButtonStyle = {
//   backgroundColor: "green",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   cursor: "pointer",
// };

// const cancelButtonStyle = {
//   backgroundColor: "red",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   marginLeft: "10px",
//   cursor: "pointer",
// };

// export default ManualRequestForm;


const ManualRequestForm = ({ onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    driverId: "",
    driverName: "",
    month: "",
    requestedAmount: "",
    approvedAmount: "",
    status: "Approved",
    adminName: "Admin User",
  });

  const currentDate=new Date();
  const formattedDate=`{String(currentDate.getDate()).padStart(2,'0')}/${String(currentDate.getMonth()+1).padStart(2,0)}/${currentDate.getFullYear()}`;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_BASE_URL + "/advance/manual", formData);
      alert("Manual request added successfully!");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error submitting manual request:", error);
      alert("Failed to add request. Please try again.");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={formStyle}>
        <h3 style={headerStyle}>Manual Advance Request Form</h3>
        <form onSubmit={handleSubmit} style={formInnerStyle}>
          {Object.keys(formData).slice(0, 5).map((key) => (
            <div key={key} style={inputGroupStyle}>
              <label style={labelStyle}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
              {/* <input
                type={key === "month" ? "month" : key.includes("Amount") ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={inputStyle}
              /> */}
            </div>
          ))}
          <div style={buttonContainerStyle}>
            <button type="submit" style={submitButtonStyle}>Submit</button>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "500px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
};

const formInnerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const headerStyle = {
  marginBottom: "20px",
  color: "#007bff",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "8px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const submitButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ManualRequestForm;
