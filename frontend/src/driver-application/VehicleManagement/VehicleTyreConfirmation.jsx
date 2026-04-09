// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const containerStyle = {
//   marginLeft: "270px",
//   fontFamily: "Arial, sans-serif",
//   maxWidth: "800px",
//   maxHeight: "auto",
//   margin: "auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   backgroundColor: "#f9f9f9",
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
//   backgroundColor: "#e9ecef",
//   cursor: "not-allowed",
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

// const buttonStyleFlex = {
//   display: "flex",
//   justifyContent: "space-between",
//   gap: "2rem",
//   paddingTop: "2rem",
// };

// const VehicleTyreConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const formData = location.state?.formData || {};

//   const handleEdit = () => {
//     navigate(-1);
//   };

//   const handleSubmit = () => {
//     alert("Form submitted successfully!");
//   };

//   const formatLabel = (key) => {
//     return key
//       .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
//       .replace(/\b(KM|ID|DOB|GST)\b/g, (match) => match.toUpperCase()) // Keep acronyms uppercase
//       .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
//   };
//   return (
//     <div style={containerStyle}>
//       <h2>Confirm Vehicle Tyre Replacement Details</h2>
//       <form>
//         {Object.entries(formData).map(([key, value]) => (
//           <fieldset key={key} style={fieldsetStyle}>
//            <label style={labelStyle}>{formatLabel(key)}:</label>
//             <input
//               style={inputStyle}
//               type="text"
//               value={value}
//               readOnly
//             />
//           </fieldset>
//         ))}
//         <div style={buttonStyleFlex}>
//           <button type="button" style={buttonStyle} onClick={handleEdit}>
//             Back
//           </button>
//           <button type="button" style={buttonStyle} onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default VehicleTyreConfirmation;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const VehicleTyreConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

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

  const formatLabel = (key) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b(KM|ID|DOB|GST)\b/g, (m) => m.toUpperCase())
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const handleSubmit = async () => {
    try {
      await axios.post(API_BASE_URL + "/api/tyre-replacement", formData);
      alert("Vehicle tyre details submitted successfully!");
      navigate("/vehicle-tyre");
    } catch (error) {
      console.error("Error submitting tyre details:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE TYRE CONFIRMATION</div>

      <div style={styles.formWrapper}>
        <div style={styles.sectionTitle}>Review Tyre Replacement Details</div>

        {Object.entries(formData).length > 0 ? (
          <div style={styles.formGrid}>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label style={styles.label}>{formatLabel(key)}:</label>
                <input
                  type="text"
                  style={styles.input}
                  value={value}
                  readOnly
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#aaa", fontSize: "14px", padding: "20px 0" }}>
            No data found. Please navigate from the vehicle tyre form.
          </p>
        )}

        <div style={styles.buttonRow}>
          <button style={styles.btnBlack} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button style={styles.btnYellow} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTyreConfirmation;