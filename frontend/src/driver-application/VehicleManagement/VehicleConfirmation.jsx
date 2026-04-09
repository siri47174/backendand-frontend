// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const globalFontStyle={
//     fontFami:"Arial, sans-serif"
//   }

//   const containerStyle = {
//     ...globalFontStyle,
//     width: "85%",
//     maxWidth: "3000px", // Prevents excessive stretching
//     marginLeft: "20rem",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     backgroundColor: "#f9f9f9",
//     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//   };
//   const heading = {
//     ...globalFontStyle,
//     textAlign: "center",
//     backgroundColor: "#000", // Black background
//     color: "#fff", // White text
//     padding: "15px 20px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//     width: "fit-content",
//     margin: "2rem 2rem 2rem 22rem",
//     fontSize: "1.8rem",
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     letterSpacing: "1px",
//   };
  
  
//   const formStyle = {
//     ...globalFontStyle,
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid,
//     gridAutoRows: "auto", // Allows flexible row height
//     gap: "40px",
//     paddingRight: "20px 20px",
//     marginRight: "20px",
//   };
  
//   const labelStyle = { fontWeight: "bold", marginBottom: "5px"  };
//   const inputStyle = {
//     width: "100%",
//     padding: "6px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   };
  
//   const buttonContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//     marginLeft:"20rem",
//     gap:"2rem"
//   };
  
//   const buttonStyle = {
//     padding: "0.8em 1.5em",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     color: "white",
//     width: "10%",
//     height: "2.5rem",
//     backgroundColor:"black",
//     marginRight:"5rem",
//     transition: "all 0.3s ease-in-out", // Smooth effect on resize
//   };

// const VehicleConfirmation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { formData } = location.state || {};

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(API_BASE_URL + "/onboarding/vehicle-csv", formData);
//             console.log("Submission successful:", response.data);
//             alert("Vehicle details submitted successfully!");

//             // Redirect or perform any action after successful submission
//             navigate("/success-page"); // Change route if needed
//         } catch (error) {
//             console.error("Error submitting vehicle details:", error);
//             alert("Failed to submit vehicle details. Please try again.");
//         }
//     };

//     return (
//         <div>
//              <h2 style={heading}>Vehicle Confirmation</h2>
//         <div style={containerStyle}>
           
//             <form className="formCSS space-y-4" style={formStyle} onSubmit={handleSubmit}>
//                 {Object.keys(formData || {}).map((key) => (
//                     <div key={key}>
//                         <label style={labelStyle}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
//                         <input type="text" style={inputStyle} value={formData[key]} readOnly />
//                     </div>
//                 ))}
               
//             </form>
//             <button type="submit" onClick={handleSubmit}>Submit</button>
//         </div>
      
//         </div>
//     );
// };

// export default VehicleConfirmation;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const VehicleConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

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
      backgroundColor: "#f9f9f9",
      outline: "none",
    },
    buttonRow: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "10px",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_BASE_URL + "/onboarding/vehicle-csv",
        formData
      );
      console.log("Submission successful:", response.data);
      alert("Vehicle details submitted successfully!");
      navigate("/vehicle-onboarding");
    } catch (error) {
      console.error("Error submitting vehicle details:", error);
      alert("Failed to submit vehicle details. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE CONFIRMATION</div>

      <div style={styles.formWrapper}>
        <form style={styles.formGrid} onSubmit={handleSubmit}>
          {Object.keys(formData || {}).map((key) => (
            <div key={key}>
              <label style={styles.label}>
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type="text"
                style={styles.input}
                value={formData[key]}
                readOnly
              />
            </div>
          ))}
        </form>

        <div style={styles.buttonRow}>
          <button
            type="button"
            style={styles.btnBlack}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="submit"
            style={styles.btnYellow}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleConfirmation;