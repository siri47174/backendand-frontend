// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const DriverShift = () => {
// //   const [formData, setFormData] = useState({
// //     driverId: "",
// //     shiftType: "",
// //     referBy: "",
// //     state: "",
// //     shiftA: false,
// //     shiftB: false,
// //   });

// //   useEffect(() => {
// //     if (formData.shiftType === "24-Hours Double Shift") {
// //       const currentHour = new Date().getHours();
// //       if (currentHour >= 6 && currentHour < 18) {
// //         setFormData((prev) => ({ ...prev, shiftA: true, shiftB: false }));
// //       } else {
// //         setFormData((prev) => ({ ...prev, shiftA: false, shiftB: true }));
// //       }
// //     } else {
// //       setFormData((prev) => ({ ...prev, shiftA: false, shiftB: false }));
// //     }
// //   }, [formData.shiftType]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(API_BASE_URL + "/onboarding/driver-addon-data", formData);
// //       alert(response.data.message);
// //       setFormData({ driverId: "", shiftType: "", referBy: "", state: "", shiftA: false, shiftB: false });
// //     } catch (error) {
// //       alert("Error: " + (error.response?.data?.message || error.message));
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px", marginLeft:"20%" }}>
// //       <h2>Driver Form</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>Driver ID: </label>
// //         <input type="text" name="driverId" value={formData.driverId} onChange={handleChange} required />
// //         <br />

// //         <label>Shift Type: </label>
// //         <select name="shiftType" value={formData.shiftType} onChange={handleChange} required>
// //           <option value="">Select Shift Type</option>
// //           <option value="12-Hours Shift">12-Hours Shift</option>
// //           <option value="24-Hours Single Shift">24-Hours Single Shift</option>
// //           <option value="24-Hours Double Shift">24-Hours Double Shift</option>
// //           <option value="Trip-Based">Trip-Based</option>
// //         </select>
// //         <br />

// //         <label>Refer By: </label>
// //         <input type="text" name="referBy" value={formData.referBy} onChange={handleChange} required />
// //         <br />

// //         <label>State: </label>
// //         <input type="text" name="state" value={formData.state} onChange={handleChange} required />
// //         <br />

// //         {/* Show assigned shift when Double Shift is selected */}
// //         {formData.shiftType === "24-Hours Double Shift" && (
// //           <p>Assigned Shift: {formData.shiftA ? "Shift A (6 AM - 6 PM)" : "Shift B (6 PM - 6 AM)"}</p>
// //         )}

// //         <button type="submit">Submit</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default DriverShift;



// const DriverShift = () => {
//   const [formData, setFormData] = useState({
//     driverId: "",
//     shiftType: "",
//     referBy: "",
//     state: "",
//     shiftA: false,
//     shiftB: false,
//   });

//   useEffect(() => {
//     if (formData.shiftType === "24-Hours Double Shift") {
//       const currentHour = new Date().getHours();
//       if (currentHour >= 6 && currentHour < 18) {
//         setFormData((prev) => ({ ...prev, shiftA: true, shiftB: false }));
//       } else {
//         setFormData((prev) => ({ ...prev, shiftA: false, shiftB: true }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, shiftA: false, shiftB: false }));
//     }
//   }, [formData.shiftType]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(API_BASE_URL + "/onboarding/driver-addon-data", formData);
//       alert(response.data.message);
//       setFormData({ driverId: "", shiftType: "", referBy: "", state: "", shiftA: false, shiftB: false });
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="sendo-page">
//       <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '400px' }}>
//         <h2 style={{ color: '#333', marginBottom: '20px' }}>Driver Form</h2>
//         <form onSubmit={handleSubmit}>
//           <label style={labelStyle}>Driver ID:</label>
//           <input style={inputStyle} type="text" name="driverId" value={formData.driverId} onChange={handleChange} required />

//           <label style={labelStyle}>Shift Type:</label>
//           <select style={inputStyle} name="shiftType" value={formData.shiftType} onChange={handleChange} required>
//             <option value="">Select Shift Type</option>
//             <option value="12-Hours Shift">12-Hours Shift</option>
//             <option value="24-Hours Single Shift">24-Hours Single Shift</option>
//             <option value="24-Hours Double Shift">24-Hours Double Shift</option>
//             <option value="Trip-Based">Trip-Based</option>
//           </select>

//           <label style={labelStyle}>Refer By:</label>
//           <input style={inputStyle} type="text" name="referBy" value={formData.referBy} onChange={handleChange} required />

//           <label style={labelStyle}>State:</label>
//           <input style={inputStyle} type="text" name="state" value={formData.state} onChange={handleChange} required />

//           {formData.shiftType === "24-Hours Double Shift" && (
//             <p style={{ color: '#007bff', marginTop: '10px' }}>
//               Assigned Shift: {formData.shiftA ? "Shift A (6 AM - 6 PM)" : "Shift B (6 PM - 6 AM)"}
//             </p>
//           )}

//           <button style={buttonStyle} type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const inputStyle = {
//   width: '100%',
//   padding: '10px',
//   marginBottom: '15px',
//   borderRadius: '8px',
//   border: '1px solid #ccc',
//   fontSize: '14px',
// };

// const labelStyle = {
//   fontWeight: 'bold',
//   marginBottom: '5px',
//   display: 'block',
// };

// const buttonStyle = {
//   backgroundColor: '#007bff',
//   color: '#fff',
//   padding: '12px 20px',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   fontSize: '16px',
//   width: '100%',
// };

// export default DriverShift;
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const DriverShift = () => {
  const [formData, setFormData] = useState({
    driverId: "",
    shiftType: "",
    referBy: "",
    state: "",
    shiftA: false,
    shiftB: false,
  });

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
    formWrapper: { padding: "24px 20px" },
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
    shiftNote: {
      color: "#1565c0",
      fontSize: "13px",
      fontWeight: "bold",
      padding: "10px 14px",
      backgroundColor: "#e3f2fd",
      borderRadius: "4px",
      border: "1px solid #1565c0",
      marginBottom: "20px",
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

  useEffect(() => {
    if (formData.shiftType === "24-Hours Double Shift") {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 18) {
        setFormData(prev => ({ ...prev, shiftA: true, shiftB: false }));
      } else {
        setFormData(prev => ({ ...prev, shiftA: false, shiftB: true }));
      }
    } else {
      setFormData(prev => ({ ...prev, shiftA: false, shiftB: false }));
    }
  }, [formData.shiftType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      driverId: "", shiftType: "", referBy: "",
      state: "", shiftA: false, shiftB: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_BASE_URL + "/onboarding/driver-addon-data", formData
      );
      alert(response.data.message);
      handleClear();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DRIVER SHIFT</div>

      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit}>

          <div style={styles.sectionTitle}>Shift Assignment Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Driver ID:</label>
              <input
                style={styles.input}
                type="text"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                placeholder="Enter Driver ID"
                required
              />
            </div>
            <div>
              <label style={styles.label}>Shift Type:</label>
              <select
                style={styles.input}
                name="shiftType"
                value={formData.shiftType}
                onChange={handleChange}
                required
              >
                <option value="">Select Shift Type</option>
                <option value="12-Hours Shift">12-Hours Shift</option>
                <option value="24-Hours Single Shift">24-Hours Single Shift</option>
                <option value="24-Hours Double Shift">24-Hours Double Shift</option>
                <option value="Trip-Based">Trip-Based</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Refer By:</label>
              <input
                style={styles.input}
                type="text"
                name="referBy"
                value={formData.referBy}
                onChange={handleChange}
                placeholder="Enter referral name"
                required
              />
            </div>
            <div>
              <label style={styles.label}>State:</label>
              <input
                style={styles.input}
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          {formData.shiftType === "24-Hours Double Shift" && (
            <div style={styles.shiftNote}>
              ℹ️ Assigned Shift: {formData.shiftA
                ? "Shift A (6 AM – 6 PM)"
                : "Shift B (6 PM – 6 AM)"}
            </div>
          )}

          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>
              Clear
            </button>
            <button type="submit" style={styles.btnYellow}>
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DriverShift;