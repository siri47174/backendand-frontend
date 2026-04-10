import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, Save, XCircle, Trash2 } from "lucide-react";
import API_BASE_URL from "../config";

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Edit, Save, XCircle, Trash2 } from "lucide-react";

// // Updated global font & colors
// const colors = {
//   primary: "#FFC107", // Mango Yellow
//   black: "#000000",
//   white: "#FFFFFF",
//   highlight: "#f0f0f0", // Highlight color for headings
// };

// const globalFontStyle = {
//   fontFamily: "'Roboto', sans-serif",
// };

// const containerStyle = {
//   ...globalFontStyle,
//   maxWidth: "90%",
//   margin: "2rem auto 2rem 11%",
//   padding: "2rem",
//   backgroundColor: colors.white,
//   border: `2px solid ${colors.primary}`,
//   borderRadius: "12px",
//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
// };

// const heading = {
//   ...globalFontStyle,
//   textAlign: "center",
//   background: colors.black,
//   color: colors.white,
//   padding: "1rem",
//   borderRadius: "8px",
//   marginBottom: "1.5rem",
//   fontSize: "2rem",
//   letterSpacing: "1px",
//   textTransform: "uppercase",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   marginLeft:"11%"
// };

// const sectionHeading = {
//   ...globalFontStyle,
//   fontSize: "1.5rem",
//   marginBottom: "1rem",
//   padding: "0.5rem",
//   background: colors.primary,
//   borderLeft: `6px solid black`,
//   borderRadius: "4px",
//   textTransform: "uppercase",
// };

// const formStyle = {
//   ...globalFontStyle,
//   display: "grid",
//   gridTemplateColumns: "1fr",
//   gap: "2rem",
//   marginBottom: "2rem",
// };

// const fieldGroupStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//   gap: "3rem", // Increased gap between groups of fields
//   marginBottom: "2rem",
// };

// const fieldContainerStyle = {
//   marginBottom: "1.5rem", // Increased gap between individual fields
// };

// const labelStyle = {
//   color: colors.black,
//   marginBottom: "0.5rem",
//   fontWeight: "bold",
//   fontSize: "1rem",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "0.75rem",
//   border: `2px solid black`,
//   borderRadius: "6px",
//   fontSize: "1rem",
//   backgroundColor: colors.white,
//   color: colors.black,
// };

// const selectStyle = {
//   ...inputStyle,
//   cursor: "pointer",
// };

// const buttonContainerStyle = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "1.5rem",
//   marginTop: "1.5rem",
// };

// const buttonStyle = {
//   padding: "0.75rem 2rem",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
//   color: colors.black,
//   backgroundColor: colors.primary,
//   fontWeight: "bold",
//   fontSize: "1rem",
//   transition: "0.3s ease-in-out",
//   textTransform: "uppercase",
//   letterSpacing: "0.5px",
//   marginBottom:"1%"
// };

// const errorTextStyle = {
//   color: "red",
//   fontSize: "0.875rem",
//   marginTop: "0.25rem",
//   fontWeight: "bold",
// };

// const tableStyle = {
//   width: "90%", // Matches container width
//   margin: "2rem auto 2rem 11%",
//   borderCollapse: "collapse"
// };

// const thTdStyle = {
//   border: `2px solid ${colors.primary}`,
//   padding: "0.75rem",
//   textAlign: "left",
//   fontWeight: "bold",
//   color: colors.black,
//   backgroundColor: colors.white,
// };

// const uploadButtonStyle = {
//   backgroundColor: colors.primary,
//   color: colors.black,
//   padding: "0.5rem 1.5rem",
//   border: "none",
//   borderRadius: "8px",
//   fontWeight: "bold",
//   cursor: "pointer",
//   transition: "0.3s",
// };

// const uploadButtonHoverStyle = {
//   backgroundColor: "#FFA000",
// };

// const DriverOnboarding = () => {
//   const navigate = useNavigate();
//   const [latestId, setLatestId] = useState("DE0000");
//   const [errors, setErrors] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [drivers, setDrivers] = useState([]);
//   const [editMode, setEditMode] = useState(null);
//   const [documents, setDocuments] = useState({
//     profilePicture: null,
//     aadharFile: null,
//     panFile: null,
//     dlFile: null,
//     bankPassbookFile: null,
//   });
//   // Additional details (shift info)
//   const [addData, setAddData] = useState({
//     shiftType: "",
//     referBy: "",
//     state: "",
//     shiftA: false,
//     shiftB: false,
//   });

//   // Personal and bank details from formData
//   const [formData, setFormData] = useState({
//     driverId: "",
//     firstName: "",
//     secondName: "",
//     surname: "null",
//     fatherName: "",
//     address: "",
//     dob: "",
//     dlNumber: "",
//     dLValidTill: "",
//     DLType: "LMV",
//     joiningDate: "",
//     // Bank details:
//     basicPayment: "",
//     nameAsPerBank: "",
//     bankAccountNumber: "",
//     IFSC: "",
//     bankName: "",
//     // Additional personal details:
//     panNo: "",
//     aadharNumber: "",
//     contactNumber: "",
//     emergencyContact: "",
//   });

//   // Fetch the latest driver ID from backend
//   useEffect(() => {
//     axios
//       .get(API_BASE_URL + "/onboarding/latest-id")
//       .then((response) => {
//         const lastDriverId = response.data.latestId || "DE0000";
//         const numericPart = parseInt(lastDriverId.slice(2), 10) + 1;
//         const nextId = `DE${numericPart.toString().padStart(4, "0")}`;
//         setLatestId(nextId);
//         setFormData((prev) => ({ ...prev, driverId: nextId }));
//       })
//       .catch((error) =>
//         console.error("Error fetching latest driver ID:", error)
//       );
//   }, []);

//   useEffect(() => {
//     if (addData.shiftType === "24-Hours Double Shift") {
//       const currentHour = new Date().getHours();
//       if (currentHour >= 6 && currentHour < 18) {
//         setAddData((prev) => ({ ...prev, shiftA: true, shiftB: false }));
//       } else {
//         setAddData((prev) => ({ ...prev, shiftA: false, shiftB: true }));
//       }
//     } else {
//       setAddData((prev) => ({ ...prev, shiftA: false, shiftB: false }));
//     }
//   }, [addData.shiftType]);

//   // Fetch existing drivers
//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         const response = await axios.get(
//           API_BASE_URL + "/onboarding/drivers"
//         );
//         setDrivers(response.data);
//       } catch (error) {
//         console.error("Error fetching drivers:", error);
//       }
//     };
//     fetchDrivers();
//   }, []);

//   // Filter drivers for search functionality
//   const filteredDrivers = drivers.filter(
//     (driver) =>
//       driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       driver.driverId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, driverId: latestId }));
//   }, [latestId]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedImageTypes = ["image/png", "image/jpeg"];
//     const allowedDocTypes = [...allowedImageTypes, "application/pdf"];
//     const fieldName = e.target.name;

//     if (
//       fieldName === "profilePicture" &&
//       !allowedImageTypes.includes(file.type)
//     ) {
//       setErrors((prev) => ({
//         ...prev,
//         profilePicture: "Only PNG or JPEG allowed for profile picture.",
//       }));
//     } else if (
//       fieldName !== "profilePicture" &&
//       !allowedDocTypes.includes(file.type)
//     ) {
//       setErrors((prev) => ({
//         ...prev,
//         [fieldName]: "Only PNG, JPEG, or PDF allowed.",
//       }));
//     } else {
//       setErrors((prev) => ({ ...prev, [fieldName]: "" }));
//       setDocuments((prev) => ({ ...prev, [fieldName]: file }));
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.fatherName.trim())
//       newErrors.fatherName = "Father's name is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.dlNumber) newErrors.dlNumber = "DL Number is required";
//     if (!formData.dLValidTill)
//       newErrors.dLValidTill = "DL Valid Till is required";
//     if (!formData.DLType.trim()) newErrors.DLType = "DL Type is required";
//     if (!formData.basicPayment.trim() || isNaN(formData.basicPayment))
//       newErrors.basicPayment = "Enter a valid basic payment";
//     if (!formData.nameAsPerBank.trim())
//       newErrors.nameAsPerBank = "Name as per bank is required";
//     if (!formData.contactNumber.match(/^\d{10}$/))
//       newErrors.contactNumber = "Enter a valid 10-digit contact number";
//     if (!formData.emergencyContact.match(/^\d{10}$/))
//       newErrors.emergencyContact =
//         "Enter a valid 10-digit emergency contact number";
//     if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber))
//       newErrors.aadharNumber = "Aadhar must be a 12-digit number";
//     if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNo))
//       newErrors.panNo = "Enter a valid PAN number";
//     if (formData.IFSC && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC))
//       newErrors.IFSC = "Enter a valid IFSC code";
//     if (!formData.bankAccountNumber)
//       newErrors.bankAccountNumber = "Bank account number is required";
//     if (!formData.bankName) newErrors.bankName = "Bank name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Check if the changed field belongs to addData
//     if (addData.hasOwnProperty(name)) {
//       setAddData((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       driverId: latestId,
//       firstName: "",
//       secondName: "",
//       surname: "",
//       fatherName: "",
//       address: "",
//       dob: "",
//       dlNumber: "",
//       dLValidTill: "",
//       DLType: "LMV",
//       joiningDate: "",
//       basicPayment: "",
//       nameAsPerBank: "",
//       bankAccountNumber: "",
//       IFSC: "",
//       bankName: "",
//       panNo: "",
//       aadharNumber: "",
//       contactNumber: "",
//       emergencyContact: "",
//     });
//     setErrors({});
//     setAddData({
//       shiftType: "",
//       referBy: "",
//       state: "",
//       shiftA: false,
//       shiftB: false,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requiredFiles = [
//       "profilePicture",
//       "aadharFile",
//       "panFile",
//       "dlFile",
//       "bankPassbookFile",
//     ];
//     let newErrors = {};

//     requiredFiles.forEach((fileKey) => {
//       if (!documents[fileKey]) {
//         newErrors[fileKey] = `Please upload ${fileKey.replace(
//           /([A-Z])/g,
//           " $1"
//         )} file.`;
//       }
//     });
// const combinedData = { ...formData, ...addData };

// setErrors(newErrors);
// if (Object.keys(newErrors).length > 0) return;

// const formDataToSend = new FormData();
// Object.keys(combinedData).forEach((key) => {
//   formDataToSend.append(key, combinedData[key]);
// });
// Object.keys(documents).forEach((key) => {
//   formDataToSend.append(key, documents[key]);
// });

//     try {
//       await axios.post(
//         API_BASE_URL + "/onboarding/driver-confirm",
//         formDataToSend,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       alert("Driver onboarded successfully!");
//       // navigate("/driver-confirm", { state: { formData } });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleEdit = (index) => {
//     setEditMode(index);
//     setFormData({ ...drivers[index] });
//   };

//   const handleSave = async (index) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/onboarding/drivers/${formData.driverId}`,
//         formData
//       );
//       const updatedDrivers = [...drivers];
//       updatedDrivers[index] = { ...formData };
//       setDrivers(updatedDrivers);
//       setEditMode(null);
//       alert("Data updated successfully!");
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const handleDelete = async (driverId) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       try {
//         await axios.delete(
//           `${API_BASE_URL}/onboarding/drivers/${driverId}`
//         );
//         setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
//         alert("Record deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting data:", error);
//       }
//     }
//   };

//   // Helper function for rendering individual fields
//   const renderField = (name, value, disabled = false) => {
//     let field;
//     if (name === "DLType") {
//       field = (
//         <select
//           style={selectStyle}
//           name={name}
//           value={value}
//           onChange={handleChange}
//         >
//           <option value="">Select DL Type</option>
//           <option value="LMV">LMV (Light Motor Vehicle)</option>
//           <option value="HMV">HMV (Heavy Motor Vehicle)</option>
//           <option value="MCWG">MCWG (Motorcycle with Gear)</option>
//         </select>
//       );
//     } else {
//       const lowerName = name.toLowerCase();
//       const isDateField =
//         lowerName.includes("dob") ||
//         lowerName.includes("validtill") ||
//         lowerName.includes("joiningdate");
//       field = (
//         <input
//           style={inputStyle}
//           type={isDateField ? "date" : "text"}
//           name={name}
//           value={value}
//           onChange={handleChange}
//           disabled={disabled}
//         />
//       );
//     }
//     return field;
//   };

//   return (
//     <div>
//       <h2 className="sendo-heading">Driver Onboarding</h2>
//       <div style={containerStyle}>
//         <form onSubmit={handleSubmit} style={formStyle}>
//           {/* PERSONAL DETAILS */}
//           <h3 style={sectionHeading}>Driver Details</h3>
//           <div style={fieldGroupStyle}>
//             {[
//               "driverId",
//               "firstName",
//               "secondName",
//               "fatherName",
//               "address",
//               "dob",
//               "DLType",
//               "dlNumber",
//               "dLValidTill",
//               "joiningDate",
//               "contactNumber",
//               "emergencyContact",
//               "aadharNumber",
//               "panNo",
//             ].map((field) => (
//               <div key={field} style={fieldContainerStyle}>
//                 <label style={labelStyle}>
//                   {field
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 {renderField(field, formData[field], field === "driverId")}
//                 {errors[field] && (
//                   <p style={errorTextStyle}>{errors[field]}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Additional details from addData */}
//           <div style={fieldGroupStyle}>
//             <div style={fieldContainerStyle}>
//               <label style={labelStyle}>Shift Type</label>
//               <select
//                 style={selectStyle}
//                 name="shiftType"
//                 value={addData.shiftType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Shift Type</option>
//                 <option value="12-Hours Shift">12-Hours Shift</option>
//                 <option value="24-Hours Single Shift">24-Hours Single Shift</option>
//                 <option value="24-Hours Double Shift">24-Hours Double Shift</option>
//                 <option value="Trip-Based">Trip-Based</option>
//               </select>
//             </div>
//             <div style={fieldContainerStyle}>
//               <label style={labelStyle}>Refered By</label>
//               <input
//                 style={inputStyle}
//                 type="text"
//                 name="referBy"
//                 value={addData.referBy}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div style={fieldContainerStyle}>
//               <label style={labelStyle}>State</label>
//               <input
//                 style={inputStyle}
//                 type="text"
//                 name="state"
//                 value={addData.state}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           {addData.shiftType === "24-Hours Double Shift" && (
//             <p style={{ color: "#007bff", marginTop: "10px" }}>
//               Assigned Shift:{" "}
//               {addData.shiftA ? "Shift A (6 AM - 6 PM)" : "Shift B (6 PM - 6 AM)"}
//             </p>
//           )}

//           {/* BANK DETAILS */}
//           <h3 style={sectionHeading}>Bank Details</h3>
//           <div style={fieldGroupStyle}>
//             {[
//               "basicPayment",
//               "nameAsPerBank",
//               "bankAccountNumber",
//               "IFSC",
//               "bankName",
//             ].map((field) => (
//               <div key={field} style={fieldContainerStyle}>
//                 <label style={labelStyle}>
//                   {field
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 {renderField(field, formData[field])}
//                 {errors[field] && (
//                   <p style={errorTextStyle}>{errors[field]}</p>
//                 )}
//               </div>
//             ))}
//           </div>

      //     {/* DOCUMENTS */}
      //     <h3 style={sectionHeading}>Documents</h3>
      //     <div style={fieldGroupStyle}>
      //       {[
      //         {
      //           label: "Profile Picture (PNG, JPEG)",
      //           name: "profilePicture",
      //         },
      //         {
      //           label: "Aadhar Upload (PNG, JPEG, PDF)",
      //           name: "aadharFile",
      //         },
      //         {
      //           label: "PAN Upload (PNG, JPEG, PDF)",
      //           name: "panFile",
      //         },
      //         {
      //           label: "Driving License Upload (PNG, JPEG, PDF)",
      //           name: "dlFile",
      //         },
      //         {
      //           label: "Bank Passbook Upload (PNG, JPEG, PDF)",
      //           name: "bankPassbookFile",
      //         },
      //       ].map((doc) => (
      //         <div key={doc.name} style={fieldContainerStyle}>
      //         <label style={labelStyle}>{doc.label}</label>
      //         <input
      //           type="file"
      //           name={doc.name}
      //           onChange={handleFileChange}
      //           style={{ display: "none" }}
      //           id={doc.name}
      //         />
      //         <label
      //           htmlFor={doc.name}
      //           style={{ ...uploadButtonStyle, ...(errors[doc.name] ? uploadButtonHoverStyle : {}) }}
      //         >
      //           {documents[doc.name] ? documents[doc.name].name : 'Upload File'}
      //         </label>
      //         {errors[doc.name] && (
      //           <p style={errorTextStyle}>{errors[doc.name]}</p>
      //         )}
      //       </div>
      //     ))}
      //     </div>
      //   </form>
      // </div>

//       <div style={buttonContainerStyle}>
//         <button type="button" onClick={handleClear} style={buttonStyle}>
//           Clear
//         </button>
//         <button style={buttonStyle} onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>

//       <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//         <input
//           type="text"
//           placeholder="Search by Driver Name or Driver ID"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ ...inputStyle, maxWidth: "650px", marginRight:"55%" }}
//         />
//       </div>

//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={thTdStyle}>Driver ID</th>
//             <th style={thTdStyle}>Driver Name</th>
//             <th style={thTdStyle}>Contact Number</th>
//             <th style={thTdStyle}>Aadhar Number</th>
//             <th style={thTdStyle}>PAN Number</th>
//             <th style={thTdStyle}>DL Number</th>
//             <th style={thTdStyle}>Profile Picture</th>
//             <th style={thTdStyle}>Aadhar File</th>
//             <th style={thTdStyle}>PAN File</th>
//             <th style={thTdStyle}>DL File</th>
//             <th style={thTdStyle}>Bank Passbook</th>
//             <th style={thTdStyle}>Update Record</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDrivers.length > 0 ? (
//             filteredDrivers.map((driver, index) => (
//               <tr key={index}>
//                 <td style={thTdStyle}>{driver.driverId}</td>
//                 <td style={thTdStyle}>{driver.firstName}</td>
//                 <td style={thTdStyle}>{driver.contactNumber}</td>
//                 <td style={thTdStyle}>{driver.aadharNumber}</td>
//                 <td style={thTdStyle}>{driver.panNo}</td>
//                 <td style={thTdStyle}>{driver.dlNumber}</td>
//                 {[
//                   "profilePicture",
//                   "aadharFile",
//                   "panFile",
//                   "dlFile",
//                   "bankPassbookFile",
//                 ].map((fileKey) => (
//                   <td style={thTdStyle} key={fileKey}>
//                     {driver[fileKey] ? (
//                       <button
//                         onClick={() =>
//                           window.open(
//                             `${API_BASE_URL}/${driver[fileKey]}`,
//                             "_blank"
//                           )
//                         }
//                         style={{
//                           cursor: "pointer",
//                           background: "none",
//                           border: "none",
//                           color: colors.primary,
//                         }}
//                       >
//                         👁️ View
//                       </button>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                 ))}
//                 <td style={thTdStyle}>
//                   {editMode === index ? (
//                     <>
//                       <button
//                         onClick={() => handleSave(index)}
//                         style={{ marginRight: "0.5rem" }}
//                       >
//                         <Save color="green" size={20} />
//                       </button>
//                       <button onClick={() => setEditMode(null)}>
//                         <XCircle color="red" size={20} />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => handleEdit(index)}
//                         style={{ marginRight: "0.5rem" }}
//                       >
//                         <Edit color="blue" size={20} />
//                       </button>
//                       <button onClick={() => handleDelete(driver.driverId)}>
//                         <Trash2 color="red" size={20} />
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11" style={thTdStyle}>
//                 No records found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div style={{ textAlign: "center" }}>
//         <button style={buttonStyle}>Download CSV</button>
//       </div>
//     </div>
//   );
// };

// const DriverConfirm = () => (
//   <div style={containerStyle}>
//     <h2 style={{ textAlign: "center" }}>Driver Confirmation Page</h2>
//   </div>
// );

// export default DriverOnboarding;


// Updated global font & colors
const colors = {
  primary: "#FFC107", // Mango Yellow
  black: "#000000",
  white: "#FFFFFF",
  highlight: "#f0f0f0", // Highlight color for headings
};

const globalFontStyle = {
  fontFamily: "'Roboto', sans-serif",
};

const componentStyle = {
  marginLeft: "270px",
  overflowX: "hidden",
};

const containerStyle = {
  ...globalFontStyle,
  maxWidth: "77%", // Adjust width to prevent it from going under the sidebar
  margin: "2rem auto", // Centers horizontally while keeping top and bottom margins
  marginLeft: "0px", // inner container, away from the sidebar
  padding: "2rem",
  backgroundColor: colors.white,
  border: `2px solid ${colors.primary}`,
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

// eslint-disable-next-line no-unused-vars
const heading = {
  ...globalFontStyle,
  textAlign: "center",
  background: "#FFC107",
  color: "black",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1.5rem",
  fontSize: "2rem",
  letterSpacing: "1px",
  textTransform: "uppercase",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  marginLeft: "11%",
};

const sectionHeading = {
  ...globalFontStyle,
  fontSize: "1.5rem",
  marginBottom: "1rem",
  padding: "0.5rem",
  background: colors.primary,
  borderLeft: `6px solid black`,
  borderRadius: "4px",
  textTransform: "uppercase",
  width: "99%",
};

const formStyle = {
  ...globalFontStyle,
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  marginBottom: "2rem",
};

const fieldGroupStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "3rem", // Increased gap between groups of fields
  marginBottom: "2rem",
};

const fieldContainerStyle = {
  marginBottom: "1.5rem", // Increased gap between individual fields
  marginRight: "13px",
};

const fieldContainerStyle2 = (field) => ({
  marginBottom: "1.5rem", // Increased gap between individual fields
  marginRight: "13px",
});

const labelStyle = {
  color: colors.black,
  marginBottom: "0.5rem",
  fontWeight: "bold",
  fontSize: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: `2px solid black`,
  borderRadius: "6px",
  fontSize: "1rem",
  backgroundColor: colors.white,
  color: colors.black,
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  width:"108%",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  marginTop: "1.5rem",
};

const buttonStyle = {
  padding: "0.75rem 2rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  color: colors.black,
  backgroundColor: colors.primary,
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "0.3s ease-in-out",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "1%",
};

const errorTextStyle = {
  color: "red",
  fontSize: "0.875rem",
  marginTo0: "0.25rem",
  fontWeight: "bold",
};

const tableStyle = {
  width: "90%", // Matches container width
  margin: "auto",
  borderCollapse: "collapse",
};

const thTdStyle = {
  border: `2px solid ${colors.primary}`,
  padding: "0.75rem",
  textAlign: "left",
  fontWeight: "bold",
  color: colors.black,
  backgroundColor: colors.white,
};

const uploadButtonStyle = {
  backgroundColor: colors.primary,
  color: colors.black,
  padding: "0.5rem 1.5rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  top: "2rem",
};

const uploadButtonHoverStyle = {
  backgroundColor: "#FFA000",
};

const DriverOnboarding = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [latestId, setLatestId] = useState("DE0000");
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isReferred, setIsReferred] = useState(false);
  const [documents, setDocuments] = useState({
    profilePicture: null,
    aadharFile: null,
    panFile: null,
    dlFile: null,
    bankPassbookFile: null,
  });
  // Additional details (shift info)
  const [addData, setAddData] = useState({
    shiftType: "",
    referBy: "",
    state: "",
    shiftA: false,
    shiftB: false,
    // isDriver: "",
    referByDriverId: "",
    referByDriverName: "",
  });

  // Personal and bank details from formData
  const [formData, setFormData] = useState({
    driverId: "",
    firstName: "",
    secondName: "",
    surname: "null",
    fatherName: "",
    address: "",
    dob: "",
    dlNumber: "",
    dLValidTill: "",
    DLType: "LMV",
    joiningDate: "",
    // Bank details:
    basicPayment: "",
    nameAsPerBank: "",
    bankAccountNumber: "",
    IFSC: "",
    bankName: "",
    // Additional personal details:
    panNo: "",
    aadharNumber: "",
    contactNumber: "",
    emergencyContact: "",
  });

  // Fetch the latest driver ID from backend
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/onboarding/latest-id")
      .then((response) => {
        const lastDriverId = response.data.latestId || "DE0000";
        const numericPart = parseInt(lastDriverId.slice(2), 10) + 1;
        const nextId = `DE${numericPart.toString().padStart(4, "0")}`;
        setLatestId(nextId);
        setFormData((prev) => ({ ...prev, driverId: nextId }));
      })
      .catch((error) =>
        console.error("Error fetching latest driver ID:", error)
      );
  }, []);

  useEffect(() => {
    if (addData.shiftType === "24-Hours Double Shift") {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 18) {
        setAddData((prev) => ({ ...prev, shiftA: true, shiftB: false }));
      } else {
        setAddData((prev) => ({ ...prev, shiftA: false, shiftB: true }));
      }
    } else {
      setAddData((prev) => ({ ...prev, shiftA: false, shiftB: false }));
    }
  }, [addData.shiftType]);

  // Fetch existing drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL + "/onboarding/drivers"
        );
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  // Filter drivers for search functionality
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setFormData((prev) => ({ ...prev, driverId: latestId }));
  }, [latestId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedImageTypes = ["image/png", "image/jpeg"];
    const allowedDocTypes = [...allowedImageTypes, "application/pdf"];
    const fieldName = e.target.name;

    if (
      fieldName === "profilePicture" &&
      !allowedImageTypes.includes(file.type)
    ) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: "Only PNG or JPEG allowed for profile picture.",
      }));
    } else if (
      fieldName !== "profilePicture" &&
      !allowedDocTypes.includes(file.type)
    ) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Only PNG, JPEG, or PDF allowed.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      setDocuments((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.dlNumber) newErrors.dlNumber = "DL Number is required";
    if (!formData.dLValidTill)
      newErrors.dLValidTill = "DL Valid Till is required";
    if (!formData.DLType.trim()) newErrors.DLType = "DL Type is required";
    if (!formData.basicPayment.trim() || isNaN(formData.basicPayment))
      newErrors.basicPayment = "Enter a valid basic payment";
    if (!formData.nameAsPerBank.trim())
      newErrors.nameAsPerBank = "Name as per bank is required";
    if (!formData.contactNumber.match(/^\d{10}$/))
      newErrors.contactNumber = "Enter a valid 10-digit contact number";
    if (!formData.emergencyContact.match(/^\d{10}$/))
      newErrors.emergencyContact =
        "Enter a valid 10-digit emergency contact number";
    if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber))
      newErrors.aadharNumber = "Aadhar must be a 12-digit number";
    if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNo))
      newErrors.panNo = "Enter a valid PAN number";
    if (formData.IFSC && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC))
      newErrors.IFSC = "Enter a valid IFSC code";
    if (!formData.bankAccountNumber)
      newErrors.bankAccountNumber = "Bank account number is required";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the changed field belongs to addData
    if (addData.hasOwnProperty(name)) {
      setAddData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const handleClear = () => {
    setFormData({
      driverId: latestId,
      firstName: "",
      secondName: "",
      surname: "",
      fatherName: "",
      address: "",
      dob: "",
      dlNumber: "",
      dLValidTill: "",
      DLType: "LMV",
      joiningDate: "",
      basicPayment: "",
      nameAsPerBank: "",
      bankAccountNumber: "",
      IFSC: "",
      bankName: "",
      panNo: "",
      aadharNumber: "",
      contactNumber: "",
      emergencyContact: "",
    });

    setErrors({});
    setAddData({
      shiftType: "",
      referBy: "",
      state: "",
      shiftA: false,
      shiftB: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFiles = [
      "profilePicture",
      "aadharFile",
      "panFile",
      "dlFile",
      "bankPassbookFile",
    ];
    let newErrors = {};

    requiredFiles.forEach((fileKey) => {
      if (!documents[fileKey]) {
        newErrors[fileKey] = `Please upload ${fileKey.replace(
          /([A-Z])/g,
          " $1"
        )} file.`;
      }
    });
    const combinedData = { ...formData, ...addData };

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formDataToSend = new FormData();
    Object.keys(combinedData).forEach((key) => {
      formDataToSend.append(key, combinedData[key]);
    });
    Object.keys(documents).forEach((key) => {
      formDataToSend.append(key, documents[key]);
    });
    console.log("formData To send=", formDataToSend);

    try {
      await axios.post(
        API_BASE_URL + "/onboarding/driver-confirm",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Driver onboarded successfully!");
      // navigate("/driver-confirm", { state: { formData } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (index) => {
    setEditMode(index);
    setFormData({ ...drivers[index] });
  };

  const handleSave = async (index) => {
    try {
      await axios.put(
        `${API_BASE_URL}/onboarding/drivers/${formData.driverId}`,
        formData
      );
      const updatedDrivers = [...drivers];
      updatedDrivers[index] = { ...formData };
      setDrivers(updatedDrivers);
      setEditMode(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(
          `${API_BASE_URL}/onboarding/drivers/${driverId}`
        );
        setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
        alert("Record deleted successfully!");
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  // Helper function for rendering individual fields
  const renderField = (name, value, disabled = false) => {
    let field;
    if (name === "DLType") {
      field = (
        <select
          style={selectStyle}
          name={name}
          value={value}
          onChange={handleChange}
        >
          <option value="">Select DL Type</option>
          <option value="LMV">LMV (Light Motor Vehicle)</option>
          <option value="HMV">HMV (Heavy Motor Vehicle)</option>
          <option value="MCWG">MCWG (Motorcycle with Gear)</option>
        </select>
      );
    } else {
      const lowerName = name.toLowerCase();
      const isDateField =
        lowerName.includes("dob") ||
        lowerName.includes("validtill") ||
        lowerName.includes("joiningdate");
      field = (
        <input
          style={inputStyle}
          type={isDateField ? "date" : "text"}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      );
    }
    return field;
  };

  return (
    <div style={componentStyle}>
      <h2 className="sendo-heading">Driver Onboarding</h2>
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* PERSONAL DETAILS */}
          <h3 style={sectionHeading}>Driver Details</h3>
          <div style={fieldGroupStyle}>
            {[
              "driverId",
              "firstName",
              "secondName",
              "fatherName",
              "dob",
              "DLType",
              "dlNumber",
              "dLValidTill",
              "joiningDate",
              "contactNumber",
              "emergencyContact",
              "aadharNumber",
              "panNo",
              "address",
            ].map((field, index) => (
              <div key={index} style={fieldContainerStyle2(field)}>
                <label style={labelStyle}>
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {renderField(field, formData[field], field === "driverId")}
                {errors[field] && <p style={errorTextStyle}>{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Additional details from addData */}
          <div style={fieldGroupStyle}>
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Shift Type</label>
              <select
                style={selectStyle}
                name="shiftType"
                value={addData.shiftType}
                onChange={handleChange}
                required
              >
                <option value="">Select Shift Type</option>
                <option value="12-Hours Shift">12-Hours Shift</option>
                <option value="24-Hours Single Shift">
                  24-Hours Single Shift
                </option>
                <option value="24-Hours Double Shift">
                  24-Hours Double Shift
                </option>
                <option value="Trip-Based">Trip-Based</option>
              </select>
            </div>

            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Refer By Driver</label>
              <select
                style={inputStyle}
                name="referBy"
                value={addData.referBy}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {addData.referBy === "Yes" && (
              <>
                <div>
                  <label>Refer By Driver ID:</label>
                  <input
                    type="text"
                    name="referByDriverId"
                    style={inputStyle}
                    value={addData.referByDriverId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Refer By Driver Name:</label>
                  <input
                    type="text"
                    style={inputStyle}
                    name="referByDriverName"
                    value={addData.referByDriverName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

<div style={fieldContainerStyle}>
  <label style={labelStyle}>State</label>
  <select
    name="state" // ✅ Add this line
    value={addData.state}
    style={inputStyle}
    onChange={handleChange}
    required
  >
    <option value="">Select State</option>
    {states.map((state, index) => (
      <option key={index} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>

          </div>

          {addData.shiftType === "24-Hours Double Shift" && (
            <p style={{ color: "#007bff", marginTop: "10px" }}>
              Assigned Shift:{" "}
              {addData.shiftA
                ? "Shift A (6 AM - 6 PM)"
                : "Shift B (6 PM - 6 AM)"}
            </p>
          )}

          {/* BANK DETAILS */}
          <h3 style={sectionHeading}>Bank Details</h3>
          <div style={fieldGroupStyle}>
            {[
              "basicPayment",
              "nameAsPerBank",
              "bankAccountNumber",
              "IFSC",
              "bankName",
            ].map((field) => (
              <div key={field} style={fieldContainerStyle}>
                <label style={labelStyle}>
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {renderField(field, formData[field])}
                {errors[field] && <p style={errorTextStyle}>{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* DOCUMENTS */}
          <h3 style={sectionHeading}>Documents</h3>
          <div style={fieldGroupStyle}>
            {[
              {
                label: "Profile Picture (PNG, JPEG)",
                name: "profilePicture",
              },
              {
                label: "Aadhar (PNG, JPEG, PDF)",
                name: "aadharFile",
              },
              {
                label: "PAN (PNG, JPEG, PDF)",
                name: "panFile",
              },
              {
                label: "Driving License (PNG, JPEG, PDF)",
                name: "dlFile",
              },
              {
                label: "Bank Passbook (PNG, JPEG, PDF)",
                name: "bankPassbookFile",
              },
            ].map((doc) => (
              <div key={doc.name} style={fieldContainerStyle}>
                <label style={labelStyle}>{doc.label}</label>

                <input
                  type="file"
                  name={doc.name}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id={doc.name}
                />

                <div style={{ display: "flex", marginTop: "5px" }}>
                  <label
                    htmlFor={doc.name}
                    style={{
                      ...uploadButtonStyle,
                      ...(errors[doc.name] ? uploadButtonHoverStyle : {}),
                    }}
                  >
                    {documents[doc.name]
                      ? documents[doc.name].name
                      : "Upload File"}
                  </label>
                </div>

                {errors[doc.name] && (
                  <p style={errorTextStyle}>{errors[doc.name]}</p>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>

      <div style={buttonContainerStyle}>
        <button type="button" onClick={handleClear} style={buttonStyle}>
          Clear
        </button>
        <button style={buttonStyle} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginLeft: "80px",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by Driver Name or Driver ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...inputStyle, maxWidth: "650px", marginRight: "55%" }}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Driver ID</th>
            <th style={thTdStyle}>Driver Name</th>
            <th style={thTdStyle}>Contact Number</th>
            <th style={thTdStyle}>Aadhar Number</th>
            <th style={thTdStyle}>PAN Number</th>
            <th style={thTdStyle}>DL Number</th>
            <th style={thTdStyle}>Profile Picture</th>
            <th style={thTdStyle}>Aadhar File</th>
            <th style={thTdStyle}>PAN File</th>
            <th style={thTdStyle}>DL File</th>
            <th style={thTdStyle}>Bank Passbook</th>
            <th style={thTdStyle}>Update Record</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{driver.driverId}</td>
                <td style={thTdStyle}>{driver.firstName}</td>
                <td style={thTdStyle}>{driver.contactNumber}</td>
                <td style={thTdStyle}>{driver.aadharNumber}</td>
                <td style={thTdStyle}>{driver.panNo}</td>
                <td style={thTdStyle}>{driver.dlNumber}</td>
                {[
                  "profilePicture",
                  "aadharFile",
                  "panFile",
                  "dlFile",
                  "bankPassbookFile",
                ].map((fileKey) => (
                  <td style={thTdStyle} key={fileKey}>
                    {driver[fileKey] ? (
                      <button
                        onClick={() =>
                          window.open(
                            `${API_BASE_URL}/${driver[fileKey]}`,
                            "_blank"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          color: colors.primary,
                        }}
                      >
                        👁️ View
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td>
                ))}
                <td style={thTdStyle}>
                  {editMode === index ? (
                    <>
                      <button
                        onClick={() => handleSave(index)}
                        style={{ marginRight: "0.5rem" }}
                      >
                        <Save color="green" size={20} />
                      </button>
                      <button onClick={() => setEditMode(null)}>
                        <XCircle color="red" size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{ marginRight: "0.5rem" }}
                      >
                        <Edit color="blue" size={20} />
                      </button>
                      <button onClick={() => handleDelete(driver.driverId)}>
                        <Trash2 color="red" size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={thTdStyle}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button style={buttonStyle}>Download CSV</button>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const DriverConfirm = () => (
  <div style={containerStyle}>
    <h2 style={{ textAlign: "center" }}>Driver Confirmation Page</h2>
  </div>
);

export default DriverOnboarding;