// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";
// const globalFontStyle = {
//   fontFamily: "Arial, sans-serif"
// };

// const containerStyle = {
//   ...globalFontStyle,
//   width: "85%",
//   maxWidth: "3000px",
//   marginLeft: "20rem",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   backgroundColor: "#f9f9f9",
//   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
// };

// const heading = {
//   ...globalFontStyle,
//   textAlign: "center",
//   backgroundColor: "#000",
//   color: "#fff",
//   padding: "15px 20px",
//   borderRadius: "8px",
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//   width: "fit-content",
//   margin: "2rem 2rem 2rem 22rem",
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
//   justifyContent: "space-between",
//   marginTop: "20px",
//   marginLeft: "20rem",
//   gap: "2rem"
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


// const OilServiceConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Ensure formData contains all expected fields with default values if missing
//   const initialFormData = {
//     vehicleNumber: "",
//     vehicleType: "Car",
//     serviceDate: "",
//     odometerReading: "",
//     lastServiceDate: "",
//     oilType: "Synthetic",
//     oilBrand: "",
//     oilQuantity: "",
//     oilGrade: "",
//     serviceCenterName: "",
//     technicianName: "",
//     contactNumber: "",
//   };

//   // Merge received formData with default values
//   const formData = { ...initialFormData, ...location.state?.formData };

//   const handleEdit = () => {
//     navigate(-1);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(API_BASE_URL + "/vehicle/oil-service", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert("Form submitted successfully!");
//       console.log("Response:", result);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit the form. Please try again.");
//     }
//   };

//   const formatLabel = (key) => {
//     return key
//       .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
//       .replace(/\b(KM|ID|DOB|GST)\b/g, (match) => match.toUpperCase()) // Keep acronyms uppercase
//       .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Confirm Oil Service Details</h2>
//       <form style={formStyle}>
//         {Object.entries(formData).map(([key, value]) => (
//           <fieldset key={key} style={fieldsetStyle}>
//             <label style={labelStyle}>{formatLabel(key)}:</label>
//             <input style={inputStyle} type="text" value={value} readOnly />
//           </fieldset>
//         ))}
//         <div style={buttonContainerStyle}>
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

// export default OilServiceConfirmation;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const OilServiceConfirmation = () => {
  const location = useLocation();
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

  const formData = { ...initialFormData, ...location.state?.formData };

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
      const response = await fetch(API_BASE_URL + "/vehicle/oil-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      alert("Oil service submitted successfully!");
      navigate("/oil-service");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>OIL SERVICE CONFIRMATION</div>

      <div style={styles.formWrapper}>
        <div style={styles.sectionTitle}>Review Oil Service Details</div>

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

export default OilServiceConfirmation;