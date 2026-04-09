// import React, { useState } from "react";  
// import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";

// const CustomerOnboarding = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     address: "",
//     pointOfContact: "",
//     state: "",
//     phoneNumber: "",
//     emailId: "",
//     gstNumber: "",
//     rateCard: "",
//   });

//   const containerStyle = {
//     width: "800px", // Fixed width
//     height: "auto", // Adjusts to content height
//     margin: "auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     backgroundColor: "#f9f9f9",
//     transform: "scale(1)", // Prevents zoom scaling
//     zoom: "1", // Keeps the original size
//   };
  

//   const buttonStyleFlex={
//     display: "flex",
//     justifyContent: "space-between",
//     gap:"2rem",
//     paddingTop:"4rem"

//   }
//   const labelStyle = {
//     display: "block",
//     marginBottom: "5px",
//     fontWeight: "normal",
//   };

//   const inputStyle = {
//     boxSizing: "border-box",
//     width: "100%",
//     padding: "8px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   };

//   const buttonStyle = {
//     backgroundColor: "black",
//     color: "white",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     width: "100%",
//     fontSize: "16px",
//   };

//   // Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const navigate = useNavigate();

//   const handleClear = () => {
//     setFormData({
//       companyName: "",
//       address: "",
//       pointOfContact: "",
//       state: "",
//       phoneNumber: "",
//       emailId: "",
//       gstNumber: "",
//       rateCard: "",
//     });
//   };
  
//   // Form Validation
//   const validateForm = () => {
//     const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
//     const alphabetRegex = /^[a-zA-Z ]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
//     const rateCardRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

//     if (!alphaNumericRegex.test(formData.companyName)) {
//       alert("Company Name should be alphanumeric.");
//       return false;
//     }
//     if (!alphabetRegex.test(formData.pointOfContact)) {
//       alert("Point of Contact should contain only alphabets.");
//       return false;
//     }
//     if (!alphabetRegex.test(formData.state)) {
//       alert("State should contain only alphabets.");
//       return false;
//     }
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       alert("Phone Number should be a 10-digit numeric value.");
//       return false;
//     }
//     if (!emailRegex.test(formData.emailId)) {
//       alert("Please enter a valid email address.");
//       return false;
//     }
//     if (!gstRegex.test(formData.gstNumber)) {
//       alert("Please enter a valid GST number.");
//       return false;
//     }
//     if (!rateCardRegex.test(formData.rateCard)) {
//       alert("Rate Card should be a valid number.");
//       return false;
//     }
//     return true;
//   };
//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Customer Onboarded:", formData);
//       alert("Customer Onboarded Successfully!");
//     }
//   };
//   const handleContinue = () => {
//     if (validateForm()) {
//     navigate("/customer-confirm", { state: { formData } });}
//   };

//   return (
//     <div style={{marginLeft:"270px",padding:"24px",fontFamily:"Arial,sans-serif",backgroundColor:"#f5f5f5",minHeight:"100vh"}}>
//       <h2 className="sendo-heading">Customer Onboarding</h2>
//     <div style={containerStyle}>
//       <h2>Customer Onboarding</h2>
//       <form onSubmit={handleSubmit}>

//         <div>
//           <label style={labelStyle}>Company Name:</label>
//           <input type="text" style={inputStyle} name="companyName" value={formData.companyName} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Address:</label>
//           <textarea name="address" style={inputStyle} value={formData.address} onChange={handleChange} required></textarea>
//         </div>

//         <div>
//           <label style={labelStyle}>Point of Contact:</label>
//           <input type="text" style={inputStyle} name="pointOfContact" value={formData.pointOfContact} onChange={handleChange} required />
//         </div>

       
//         <div>
//           <label style={labelStyle}>Phone Number:</label>
//           <input type="text" style={inputStyle} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Mail ID:</label>
//           <input type="email" style={inputStyle} name="emailId" value={formData.emailId} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>GST Number:</label>
//           <input type="text" style={inputStyle} name="gstNumber" value={formData.gstNumber} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Rate Card:</label>
//           <input type="text" style={inputStyle} name="rateCard" value={formData.rateCard} onChange={handleChange} required />
//         </div>

// <div style={buttonStyleFlex}>
// <button type="button" style={buttonStyle} onClick={handleClear}>
//           Clear
//         </button>
//         <button type="button" style={buttonStyle} onClick={handleContinue} >
//           Continue
//         </button>
       
//         </div>
//       </form>
//     </div>
//     </div>

//   );
// };

// export default CustomerOnboarding;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerOnboarding = () => {
  const navigate = useNavigate();

  const initialFormData = {
    companyName: "",
    address: "",
    pointOfContact: "",
    state: "",
    phoneNumber: "",
    emailId: "",
    gstNumber: "",
    rateCard: "",
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFormData(initialFormData);

  const validateForm = () => {
    const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
    const alphabetRegex = /^[a-zA-Z ]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    const rateCardRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!alphaNumericRegex.test(formData.companyName)) {
      alert("Company Name should be alphanumeric."); return false;
    }
    if (!alphabetRegex.test(formData.pointOfContact)) {
      alert("Point of Contact should contain only alphabets."); return false;
    }
    if (!alphabetRegex.test(formData.state)) {
      alert("State should contain only alphabets."); return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Phone Number should be a 10-digit numeric value."); return false;
    }
    if (!emailRegex.test(formData.emailId)) {
      alert("Please enter a valid email address."); return false;
    }
    if (!gstRegex.test(formData.gstNumber)) {
      alert("Please enter a valid GST number."); return false;
    }
    if (!rateCardRegex.test(formData.rateCard)) {
      alert("Rate Card should be a valid number."); return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate("/customer-confirm", { state: { formData } });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>CUSTOMER ONBOARDING</div>

      <div style={styles.formWrapper}>

        {/* Company Info */}
        <div style={styles.sectionTitle}>Company Information</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Company Name:</label>
            <input type="text" style={styles.input} name="companyName"
              value={formData.companyName} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Point of Contact:</label>
            <input type="text" style={styles.input} name="pointOfContact"
              value={formData.pointOfContact} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Phone Number:</label>
            <input type="text" style={styles.input} name="phoneNumber"
              value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Email ID:</label>
            <input type="email" style={styles.input} name="emailId"
              value={formData.emailId} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>State:</label>
            <input type="text" style={styles.input} name="state"
              value={formData.state} onChange={handleChange} required />
          </div>
          <div>
            <label style={styles.label}>Rate Card:</label>
            <input type="text" style={styles.input} name="rateCard"
              value={formData.rateCard} onChange={handleChange} required />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}>Address:</label>
            <textarea name="address"
              style={{ ...styles.input, minHeight: "80px", resize: "vertical" }}
              value={formData.address} onChange={handleChange} required />
          </div>
        </div>

        {/* Tax Info */}
        <div style={styles.sectionTitle}>Tax Information</div>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>GST Number:</label>
            <input type="text" style={styles.input} name="gstNumber"
              value={formData.gstNumber} onChange={handleChange} required />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
          <button type="button" style={styles.btnYellow} onClick={handleContinue}>Continue</button>
        </div>

      </div>
    </div>
  );
};

export default CustomerOnboarding;