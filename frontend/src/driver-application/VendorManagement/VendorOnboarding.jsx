// import React, { useState } from "react";  
// import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const VendorOnboarding = () => {
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     venderSiteCode: "",
//     phoneNumber: "",
//     addressLine1: "",
//     addressLine2: "",
//     townCity: "",
//     state: "",
//     pinCode: "",
//     emailId: "",
//     serviceRegistrationNumber: "",
//     serviceTax: "",
//     panNumber: "",
//     tdsRateSection: "",
//     beneficiaryName: "",
//     accountNumber: "",
//     IFSCcode: "",
//     branchName: "",
//   });
//   const navigate = useNavigate();
//   const globalFontStyle={
//     fontFami:"Arial, sans-serif"
//   }

//   const containerStyle = {
//     ...globalFontStyle,
//     width: "85%",
//     maxWidth: "3000px", // Prevents excessive stretching
//     marginLeft: "0",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//   };
//   const heading = {
//     ...globalFontStyle,
//     textAlign: "center",
//     backgroundColor: "#FFC107", color: "#000", // White text
//     padding: "15px 20px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//     width: "fit-content",
//     margin: "0 0 16px 0",
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
//     marginLeft: "0",
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
//   // Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Form Validation
//   const validateForm = () => {
//     const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
//     const alphabetRegex = /^[a-zA-Z ]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const pinRegex = /^[0-9]{6}$/;
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

//     if (!alphabetRegex.test(formData.supplierName)) {
//       alert("Supplier Name should contain only alphabets.");
//       return false;
//     }
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       alert("Phone Number should be 10 digits.");
//       return false;
//     }
//     if (!pinRegex.test(formData.pinCode)) {
//       alert("Pin Code should be 6 digits.");
//       return false;
//     }
//     if (!panRegex.test(formData.panNumber)) {
//       alert("Invalid PAN Number format.");
//       return false;
//     }
//     if (!ifscRegex.test(formData.IFSCcode)) {
//       alert("Invalid IFSC Code format.");
//       return false;
//     }
//     return true;
//   };
//   const handleContinue = () => {
//     navigate("/vendor-confirm", { state: { formData } });
//   };
//   const handleClear = () => {
//     setFormData({
//       supplierName: "",
//       venderSiteCode: "",
//       phoneNumber: "",
//       addressLine1: "",
//       addressLine2: "",
//       townCity: "",
//       state: "",
//       pinCode: "",
//       emailId: "",
//       serviceRegistrationNumber: "",
//       serviceTax: "",
//       panNumber: "",
//       tdsRateSection: "",
//       beneficiaryName: "",
//       accountNumber: "",
//       IFSCcode: "",
//       branchName: "",
//     });
//   };
  

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Vendor Onboarded:", formData);
//       alert("Vendor Onboarded Successfully!");

//       // Example: Sending Data to Backend
//       axios.post("https://your-backend-api.com/onboard-vendor", formData)
//         .then((response) => {
//           alert("Vendor Data Submitted Successfully!");
//         })
//         .catch((error) => {
//           alert("Error Submitting Vendor Data.");
//         });
//     }
//   };

//   return (
//     <div>
//       <h2 className="sendo-heading">Vendor Onboarding</h2>
//     <div style={containerStyle}>
      
//       <form onSubmit={handleSubmit} className="formCSS space-y-4" style={formStyle}>
//         <div>
//           <label style={labelStyle}>Supplier Name:</label>
//           <input type="text" style={inputStyle} name="supplierName" value={formData.supplierName} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Vendor Site Code:</label>
//           <select name="venderSiteCode" style={inputStyle} value={formData.venderSiteCode} onChange={handleChange} required>
//             <option value="">Select</option>
//             <option value="Rental">Rental</option>
//             <option value="Adhoc">Adhoc</option>
//           </select>
//         </div>

//         <div>
//           <label style={labelStyle}>Phone Number:</label>
//           <input type="text" style={inputStyle} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Address Line 1:</label>
//           <textarea name="addressLine1" style={inputStyle} value={formData.addressLine1} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Address Line 2:</label>
//           <textarea name="addressLine2" style={inputStyle} value={formData.addressLine2} onChange={handleChange} />
//         </div>

//         <div>
//           <label style={labelStyle}>Town/City:</label>
//           <input type="text" style={inputStyle} name="townCity" value={formData.townCity} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>State:</label>
//           <input type="text" style={inputStyle} name="state" value={formData.state} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Pin Code:</label>
//           <input type="text" style={inputStyle} name="pinCode" value={formData.pinCode} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Email ID:</label>
//           <input type="email" style={inputStyle} name="emailId" value={formData.emailId} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Service Registration Number(GST):</label>
//           <input type="text" style={inputStyle} name="serviceRegistrationNumber" value={formData.serviceRegistrationNumber} onChange={handleChange} required />
//         </div>
//         <div>
//           <label style={labelStyle}>Sevice tax rate if any:</label>
//           <input type="email" style={inputStyle} name="serviceTax" value={formData.serviceTax} onChange={handleChange} required />
//         </div>        
//         <div>
//           <label style={labelStyle}>PAN Number:</label>
//           <input type="text" style={inputStyle} name="panNumber" value={formData.panNumber} onChange={handleChange} required />
//         </div>
//         <div>
//           <label style={labelStyle}>TDS rate & Section if any:</label>
//           <input type="text" style={inputStyle} name="tdsRateSection" value={formData.tdsRateSection} onChange={handleChange} required />
//         </div>
//         <div>
//           <label style={labelStyle}>Beneficiary_Name (Mention on Cheque or Pass book):</label>
//           <input type="text" style={inputStyle} name="beneficiaryName" value={formData.beneficiaryName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label style={labelStyle}>A/c Number:</label>
//           <input type="text" style={inputStyle} name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
//         </div>
        

//         <div>
//           <label style={labelStyle}>IFSC Code:</label>
//           <input type="text" style={inputStyle} name="IFSCcode" value={formData.IFSCcode} onChange={handleChange} required />
//         </div>

//         <div>
//           <label style={labelStyle}>Branch Name:</label>
//           <input type="text" style={inputStyle} name="branchName" value={formData.branchName} onChange={handleChange} required />
//         </div>

//       </form>
//     </div>
    
//     <div style={buttonContainerStyle}>
//         <button type="button" style={buttonStyle} onClick={handleClear}>
//           Clear
//         </button>
//         <button type="button" style={buttonStyle} onClick={handleContinue} >
//           Continue
//         </button>
        
//         </div>
//     </div>
//   );
// };

// export default VendorOnboarding;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const VendorOnboarding = () => {
//   const navigate = useNavigate();

//   const initialFormData = {
//     supplierName: "",
//     venderSiteCode: "",
//     phoneNumber: "",
//     addressLine1: "",
//     addressLine2: "",
//     townCity: "",
//     state: "",
//     pinCode: "",
//     emailId: "",
//     serviceRegistrationNumber: "",
//     serviceTax: "",
//     panNumber: "",
//     tdsRateSection: "",
//     beneficiaryName: "",
//     accountNumber: "",
//     IFSCcode: "",
//     branchName: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       marginLeft: "278px",
//       backgroundColor: "white",
//       marginRight: "10px",
//       color: "black",
//       minHeight: "calc(100vh - 70px)",
//       boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
//     },
//     pageHeader: {
//       backgroundColor: "#FFC107",
//       color: "#000",
//       padding: "16px 20px",
//       fontWeight: "bold",
//       fontSize: "22px",
//       letterSpacing: "1px",
//       textTransform: "uppercase",
//     },
//     formWrapper: { padding: "24px 20px" },
//     sectionTitle: {
//       fontWeight: "bold",
//       fontSize: "15px",
//       color: "#000",
//       borderBottom: "2px solid #FFC107",
//       paddingBottom: "6px",
//       marginBottom: "16px",
//       marginTop: "10px",
//     },
//     formGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//       gap: "20px",
//       marginBottom: "24px",
//     },
//     label: {
//       fontWeight: "bold",
//       fontSize: "14px",
//       marginBottom: "6px",
//       display: "block",
//       color: "#000",
//     },
//     input: {
//       width: "100%",
//       padding: "9px 10px",
//       border: "1.5px solid #000",
//       borderRadius: "4px",
//       fontSize: "14px",
//       boxSizing: "border-box",
//       color: "#000",
//       backgroundColor: "#fff",
//       outline: "none",
//     },
//     buttonRow: {
//       display: "flex",
//       gap: "12px",
//       justifyContent: "flex-end",
//       paddingBottom: "10px",
//     },
//     btnBlack: {
//       padding: "9px 28px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       backgroundColor: "black",
//       color: "white",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//     btnYellow: {
//       padding: "9px 28px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       backgroundColor: "#FFC107",
//       color: "black",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const alphabetRegex = /^[a-zA-Z ]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const pinRegex = /^[0-9]{6}$/;
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

//     if (!alphabetRegex.test(formData.supplierName)) {
//       alert("Supplier Name should contain only alphabets."); return false;
//     }
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       alert("Phone Number should be 10 digits."); return false;
//     }
//     if (!pinRegex.test(formData.pinCode)) {
//       alert("Pin Code should be 6 digits."); return false;
//     }
//     if (!panRegex.test(formData.panNumber)) {
//       alert("Invalid PAN Number format."); return false;
//     }
//     if (!ifscRegex.test(formData.IFSCcode)) {
//       alert("Invalid IFSC Code format."); return false;
//     }
//     return true;
//   };

//   const handleContinue = () => {
//     if (validateForm()) {
//       navigate("/vendor-confirm", { state: { formData } });
//     }
//   };

//   const handleClear = () => setFormData(initialFormData);

//   return (
//     <div style={styles.container}>
//       <div style={styles.pageHeader}>VENDOR ONBOARDING</div>

//       <div style={styles.formWrapper}>

//         {/* Basic Info */}
//         <div style={styles.sectionTitle}>Basic Information</div>
//         <div style={styles.formGrid}>
//           <div>
//             <label style={styles.label}>Supplier Name:</label>
//             <input type="text" style={styles.input} name="supplierName"
//               value={formData.supplierName} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Vendor Site Code:</label>
//             <select name="venderSiteCode" style={styles.input}
//               value={formData.venderSiteCode} onChange={handleChange} required>
//               <option value="">Select</option>
//               <option value="Rental">Rental</option>
//               <option value="Adhoc">Adhoc</option>
//             </select>
//           </div>
//           <div>
//             <label style={styles.label}>Phone Number:</label>
//             <input type="text" style={styles.input} name="phoneNumber"
//               value={formData.phoneNumber} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Email ID:</label>
//             <input type="email" style={styles.input} name="emailId"
//               value={formData.emailId} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Address */}
//         <div style={styles.sectionTitle}>Address Details</div>
//         <div style={styles.formGrid}>
//           <div>
//             <label style={styles.label}>Address Line 1:</label>
//             <textarea name="addressLine1"
//               style={{ ...styles.input, minHeight: "70px", resize: "vertical" }}
//               value={formData.addressLine1} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Address Line 2:</label>
//             <textarea name="addressLine2"
//               style={{ ...styles.input, minHeight: "70px", resize: "vertical" }}
//               value={formData.addressLine2} onChange={handleChange} />
//           </div>
//           <div>
//             <label style={styles.label}>Town / City:</label>
//             <input type="text" style={styles.input} name="townCity"
//               value={formData.townCity} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>State:</label>
//             <input type="text" style={styles.input} name="state"
//               value={formData.state} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Pin Code:</label>
//             <input type="text" style={styles.input} name="pinCode"
//               value={formData.pinCode} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Tax & Legal */}
//         <div style={styles.sectionTitle}>Tax & Legal Information</div>
//         <div style={styles.formGrid}>
//           <div>
//             <label style={styles.label}>Service Registration Number (GST):</label>
//             <input type="text" style={styles.input} name="serviceRegistrationNumber"
//               value={formData.serviceRegistrationNumber} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Service Tax Rate (if any):</label>
//             <input type="text" style={styles.input} name="serviceTax"
//               value={formData.serviceTax} onChange={handleChange} />
//           </div>
//           <div>
//             <label style={styles.label}>PAN Number:</label>
//             <input type="text" style={styles.input} name="panNumber"
//               value={formData.panNumber} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>TDS Rate & Section (if any):</label>
//             <input type="text" style={styles.input} name="tdsRateSection"
//               value={formData.tdsRateSection} onChange={handleChange} />
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div style={styles.sectionTitle}>Bank Details</div>
//         <div style={styles.formGrid}>
//           <div>
//             <label style={styles.label}>Beneficiary Name (as on Cheque/Passbook):</label>
//             <input type="text" style={styles.input} name="beneficiaryName"
//               value={formData.beneficiaryName} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Account Number:</label>
//             <input type="text" style={styles.input} name="accountNumber"
//               value={formData.accountNumber} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>IFSC Code:</label>
//             <input type="text" style={styles.input} name="IFSCcode"
//               value={formData.IFSCcode} onChange={handleChange} required />
//           </div>
//           <div>
//             <label style={styles.label}>Branch Name:</label>
//             <input type="text" style={styles.input} name="branchName"
//               value={formData.branchName} onChange={handleChange} required />
//           </div>
//         </div>

//         <div style={styles.buttonRow}>
//           <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
//           <button type="button" style={styles.btnYellow} onClick={handleContinue}>Continue</button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default VendorOnboarding;