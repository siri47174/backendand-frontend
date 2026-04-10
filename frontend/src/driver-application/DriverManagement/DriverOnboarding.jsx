// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Edit, Save, XCircle, Trash2 } from "lucide-react";
// import API_BASE_URL from "../config";

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { Edit, Save, XCircle, Trash2 } from "lucide-react";

// // // Updated global font & colors
// // const colors = {
// //   primary: "#FFC107", // Mango Yellow
// //   black: "#000000",
// //   white: "#FFFFFF",
// //   highlight: "#f0f0f0", // Highlight color for headings
// // };

// // const globalFontStyle = {
// //   fontFamily: "'Roboto', sans-serif",
// // };

// // const containerStyle = {
// //   ...globalFontStyle,
// //   maxWidth: "90%",
// //   margin: "2rem auto 2rem 11%",
// //   padding: "2rem",
// //   backgroundColor: colors.white,
// //   border: `2px solid ${colors.primary}`,
// //   borderRadius: "12px",
// //   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
// // };

// // const heading = {
// //   ...globalFontStyle,
// //   textAlign: "center",
// //   background: colors.black,
// //   color: colors.white,
// //   padding: "1rem",
// //   borderRadius: "8px",
// //   marginBottom: "1.5rem",
// //   fontSize: "2rem",
// //   letterSpacing: "1px",
// //   textTransform: "uppercase",
// //   boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
// //   marginLeft:"11%"
// // };

// // const sectionHeading = {
// //   ...globalFontStyle,
// //   fontSize: "1.5rem",
// //   marginBottom: "1rem",
// //   padding: "0.5rem",
// //   background: colors.primary,
// //   borderLeft: `6px solid black`,
// //   borderRadius: "4px",
// //   textTransform: "uppercase",
// // };

// // const formStyle = {
// //   ...globalFontStyle,
// //   display: "grid",
// //   gridTemplateColumns: "1fr",
// //   gap: "2rem",
// //   marginBottom: "2rem",
// // };

// // const fieldGroupStyle = {
// //   display: "grid",
// //   gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
// //   gap: "3rem", // Increased gap between groups of fields
// //   marginBottom: "2rem",
// // };

// // const fieldContainerStyle = {
// //   marginBottom: "1.5rem", // Increased gap between individual fields
// // };

// // const labelStyle = {
// //   color: colors.black,
// //   marginBottom: "0.5rem",
// //   fontWeight: "bold",
// //   fontSize: "1rem",
// // };

// // const inputStyle = {
// //   width: "100%",
// //   padding: "0.75rem",
// //   border: `2px solid black`,
// //   borderRadius: "6px",
// //   fontSize: "1rem",
// //   backgroundColor: colors.white,
// //   color: colors.black,
// // };

// // const selectStyle = {
// //   ...inputStyle,
// //   cursor: "pointer",
// // };

// // const buttonContainerStyle = {
// //   display: "flex",
// //   justifyContent: "center",
// //   gap: "1.5rem",
// //   marginTop: "1.5rem",
// // };

// // const buttonStyle = {
// //   padding: "0.75rem 2rem",
// //   border: "none",
// //   borderRadius: "6px",
// //   cursor: "pointer",
// //   color: colors.black,
// //   backgroundColor: colors.primary,
// //   fontWeight: "bold",
// //   fontSize: "1rem",
// //   transition: "0.3s ease-in-out",
// //   textTransform: "uppercase",
// //   letterSpacing: "0.5px",
// //   marginBottom:"1%"
// // };

// // const errorTextStyle = {
// //   color: "red",
// //   fontSize: "0.875rem",
// //   marginTop: "0.25rem",
// //   fontWeight: "bold",
// // };

// // const tableStyle = {
// //   width: "90%", // Matches container width
// //   margin: "2rem auto 2rem 11%",
// //   borderCollapse: "collapse"
// // };

// // const thTdStyle = {
// //   border: `2px solid ${colors.primary}`,
// //   padding: "0.75rem",
// //   textAlign: "left",
// //   fontWeight: "bold",
// //   color: colors.black,
// //   backgroundColor: colors.white,
// // };

// // const uploadButtonStyle = {
// //   backgroundColor: colors.primary,
// //   color: colors.black,
// //   padding: "0.5rem 1.5rem",
// //   border: "none",
// //   borderRadius: "8px",
// //   fontWeight: "bold",
// //   cursor: "pointer",
// //   transition: "0.3s",
// // };

// // const uploadButtonHoverStyle = {
// //   backgroundColor: "#FFA000",
// // };

// // const DriverOnboarding = () => {
// //   const navigate = useNavigate();
// //   const [latestId, setLatestId] = useState("DE0000");
// //   const [errors, setErrors] = useState({});
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [drivers, setDrivers] = useState([]);
// //   const [editMode, setEditMode] = useState(null);
// //   const [documents, setDocuments] = useState({
// //     profilePicture: null,
// //     aadharFile: null,
// //     panFile: null,
// //     dlFile: null,
// //     bankPassbookFile: null,
// //   });
// //   // Additional details (shift info)
// //   const [addData, setAddData] = useState({
// //     shiftType: "",
// //     referBy: "",
// //     state: "",
// //     shiftA: false,
// //     shiftB: false,
// //   });

// //   // Personal and bank details from formData
// //   const [formData, setFormData] = useState({
// //     driverId: "",
// //     firstName: "",
// //     secondName: "",
// //     surname: "null",
// //     fatherName: "",
// //     address: "",
// //     dob: "",
// //     dlNumber: "",
// //     dLValidTill: "",
// //     DLType: "LMV",
// //     joiningDate: "",
// //     // Bank details:
// //     basicPayment: "",
// //     nameAsPerBank: "",
// //     bankAccountNumber: "",
// //     IFSC: "",
// //     bankName: "",
// //     // Additional personal details:
// //     panNo: "",
// //     aadharNumber: "",
// //     contactNumber: "",
// //     emergencyContact: "",
// //   });

// //   // Fetch the latest driver ID from backend
// //   useEffect(() => {
// //     axios
// //       .get(API_BASE_URL + "/onboarding/latest-id")
// //       .then((response) => {
// //         const lastDriverId = response.data.latestId || "DE0000";
// //         const numericPart = parseInt(lastDriverId.slice(2), 10) + 1;
// //         const nextId = `DE${numericPart.toString().padStart(4, "0")}`;
// //         setLatestId(nextId);
// //         setFormData((prev) => ({ ...prev, driverId: nextId }));
// //       })
// //       .catch((error) =>
// //         console.error("Error fetching latest driver ID:", error)
// //       );
// //   }, []);

// //   useEffect(() => {
// //     if (addData.shiftType === "24-Hours Double Shift") {
// //       const currentHour = new Date().getHours();
// //       if (currentHour >= 6 && currentHour < 18) {
// //         setAddData((prev) => ({ ...prev, shiftA: true, shiftB: false }));
// //       } else {
// //         setAddData((prev) => ({ ...prev, shiftA: false, shiftB: true }));
// //       }
// //     } else {
// //       setAddData((prev) => ({ ...prev, shiftA: false, shiftB: false }));
// //     }
// //   }, [addData.shiftType]);

// //   // Fetch existing drivers
// //   useEffect(() => {
// //     const fetchDrivers = async () => {
// //       try {
// //         const response = await axios.get(
// //           API_BASE_URL + "/onboarding/drivers"
// //         );
// //         setDrivers(response.data);
// //       } catch (error) {
// //         console.error("Error fetching drivers:", error);
// //       }
// //     };
// //     fetchDrivers();
// //   }, []);

// //   // Filter drivers for search functionality
// //   const filteredDrivers = drivers.filter(
// //     (driver) =>
// //       driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       driver.driverId.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   useEffect(() => {
// //     setFormData((prev) => ({ ...prev, driverId: latestId }));
// //   }, [latestId]);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const allowedImageTypes = ["image/png", "image/jpeg"];
// //     const allowedDocTypes = [...allowedImageTypes, "application/pdf"];
// //     const fieldName = e.target.name;

// //     if (
// //       fieldName === "profilePicture" &&
// //       !allowedImageTypes.includes(file.type)
// //     ) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         profilePicture: "Only PNG or JPEG allowed for profile picture.",
// //       }));
// //     } else if (
// //       fieldName !== "profilePicture" &&
// //       !allowedDocTypes.includes(file.type)
// //     ) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         [fieldName]: "Only PNG, JPEG, or PDF allowed.",
// //       }));
// //     } else {
// //       setErrors((prev) => ({ ...prev, [fieldName]: "" }));
// //       setDocuments((prev) => ({ ...prev, [fieldName]: file }));
// //     }
// //   };

// //   const validateForm = () => {
// //     let newErrors = {};
// //     if (!formData.firstName) newErrors.firstName = "First name is required";
// //     if (!formData.fatherName.trim())
// //       newErrors.fatherName = "Father's name is required";
// //     if (!formData.address.trim()) newErrors.address = "Address is required";
// //     if (!formData.dlNumber) newErrors.dlNumber = "DL Number is required";
// //     if (!formData.dLValidTill)
// //       newErrors.dLValidTill = "DL Valid Till is required";
// //     if (!formData.DLType.trim()) newErrors.DLType = "DL Type is required";
// //     if (!formData.basicPayment.trim() || isNaN(formData.basicPayment))
// //       newErrors.basicPayment = "Enter a valid basic payment";
// //     if (!formData.nameAsPerBank.trim())
// //       newErrors.nameAsPerBank = "Name as per bank is required";
// //     if (!formData.contactNumber.match(/^\d{10}$/))
// //       newErrors.contactNumber = "Enter a valid 10-digit contact number";
// //     if (!formData.emergencyContact.match(/^\d{10}$/))
// //       newErrors.emergencyContact =
// //         "Enter a valid 10-digit emergency contact number";
// //     if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber))
// //       newErrors.aadharNumber = "Aadhar must be a 12-digit number";
// //     if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNo))
// //       newErrors.panNo = "Enter a valid PAN number";
// //     if (formData.IFSC && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC))
// //       newErrors.IFSC = "Enter a valid IFSC code";
// //     if (!formData.bankAccountNumber)
// //       newErrors.bankAccountNumber = "Bank account number is required";
// //     if (!formData.bankName) newErrors.bankName = "Bank name is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     // Check if the changed field belongs to addData
// //     if (addData.hasOwnProperty(name)) {
// //       setAddData((prev) => ({ ...prev, [name]: value }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleClear = () => {
// //     setFormData({
// //       driverId: latestId,
// //       firstName: "",
// //       secondName: "",
// //       surname: "",
// //       fatherName: "",
// //       address: "",
// //       dob: "",
// //       dlNumber: "",
// //       dLValidTill: "",
// //       DLType: "LMV",
// //       joiningDate: "",
// //       basicPayment: "",
// //       nameAsPerBank: "",
// //       bankAccountNumber: "",
// //       IFSC: "",
// //       bankName: "",
// //       panNo: "",
// //       aadharNumber: "",
// //       contactNumber: "",
// //       emergencyContact: "",
// //     });
// //     setErrors({});
// //     setAddData({
// //       shiftType: "",
// //       referBy: "",
// //       state: "",
// //       shiftA: false,
// //       shiftB: false,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const requiredFiles = [
// //       "profilePicture",
// //       "aadharFile",
// //       "panFile",
// //       "dlFile",
// //       "bankPassbookFile",
// //     ];
// //     let newErrors = {};

// //     requiredFiles.forEach((fileKey) => {
// //       if (!documents[fileKey]) {
// //         newErrors[fileKey] = `Please upload ${fileKey.replace(
// //           /([A-Z])/g,
// //           " $1"
// //         )} file.`;
// //       }
// //     });
// // const combinedData = { ...formData, ...addData };

// // setErrors(newErrors);
// // if (Object.keys(newErrors).length > 0) return;

// // const formDataToSend = new FormData();
// // Object.keys(combinedData).forEach((key) => {
// //   formDataToSend.append(key, combinedData[key]);
// // });
// // Object.keys(documents).forEach((key) => {
// //   formDataToSend.append(key, documents[key]);
// // });

// //     try {
// //       await axios.post(
// //         API_BASE_URL + "/onboarding/driver-confirm",
// //         formDataToSend,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         }
// //       );
// //       alert("Driver onboarded successfully!");
// //       // navigate("/driver-confirm", { state: { formData } });
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //     }
// //   };

// //   const handleEdit = (index) => {
// //     setEditMode(index);
// //     setFormData({ ...drivers[index] });
// //   };

// //   const handleSave = async (index) => {
// //     try {
// //       await axios.put(
// //         `${API_BASE_URL}/onboarding/drivers/${formData.driverId}`,
// //         formData
// //       );
// //       const updatedDrivers = [...drivers];
// //       updatedDrivers[index] = { ...formData };
// //       setDrivers(updatedDrivers);
// //       setEditMode(null);
// //       alert("Data updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating data:", error);
// //     }
// //   };

// //   const handleDelete = async (driverId) => {
// //     if (window.confirm("Are you sure you want to delete this record?")) {
// //       try {
// //         await axios.delete(
// //           `${API_BASE_URL}/onboarding/drivers/${driverId}`
// //         );
// //         setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
// //         alert("Record deleted successfully!");
// //       } catch (error) {
// //         console.error("Error deleting data:", error);
// //       }
// //     }
// //   };

// //   // Helper function for rendering individual fields
// //   const renderField = (name, value, disabled = false) => {
// //     let field;
// //     if (name === "DLType") {
// //       field = (
// //         <select
// //           style={selectStyle}
// //           name={name}
// //           value={value}
// //           onChange={handleChange}
// //         >
// //           <option value="">Select DL Type</option>
// //           <option value="LMV">LMV (Light Motor Vehicle)</option>
// //           <option value="HMV">HMV (Heavy Motor Vehicle)</option>
// //           <option value="MCWG">MCWG (Motorcycle with Gear)</option>
// //         </select>
// //       );
// //     } else {
// //       const lowerName = name.toLowerCase();
// //       const isDateField =
// //         lowerName.includes("dob") ||
// //         lowerName.includes("validtill") ||
// //         lowerName.includes("joiningdate");
// //       field = (
// //         <input
// //           style={inputStyle}
// //           type={isDateField ? "date" : "text"}
// //           name={name}
// //           value={value}
// //           onChange={handleChange}
// //           disabled={disabled}
// //         />
// //       );
// //     }
// //     return field;
// //   };

// //   return (
// //     <div>
// //       <h2 className="sendo-heading">Driver Onboarding</h2>
// //       <div style={containerStyle}>
// //         <form onSubmit={handleSubmit} style={formStyle}>
// //           {/* PERSONAL DETAILS */}
// //           <h3 style={sectionHeading}>Driver Details</h3>
// //           <div style={fieldGroupStyle}>
// //             {[
// //               "driverId",
// //               "firstName",
// //               "secondName",
// //               "fatherName",
// //               "address",
// //               "dob",
// //               "DLType",
// //               "dlNumber",
// //               "dLValidTill",
// //               "joiningDate",
// //               "contactNumber",
// //               "emergencyContact",
// //               "aadharNumber",
// //               "panNo",
// //             ].map((field) => (
// //               <div key={field} style={fieldContainerStyle}>
// //                 <label style={labelStyle}>
// //                   {field
// //                     .replace(/([A-Z])/g, " $1")
// //                     .replace(/^./, (str) => str.toUpperCase())}
// //                 </label>
// //                 {renderField(field, formData[field], field === "driverId")}
// //                 {errors[field] && (
// //                   <p style={errorTextStyle}>{errors[field]}</p>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Additional details from addData */}
// //           <div style={fieldGroupStyle}>
// //             <div style={fieldContainerStyle}>
// //               <label style={labelStyle}>Shift Type</label>
// //               <select
// //                 style={selectStyle}
// //                 name="shiftType"
// //                 value={addData.shiftType}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">Select Shift Type</option>
// //                 <option value="12-Hours Shift">12-Hours Shift</option>
// //                 <option value="24-Hours Single Shift">24-Hours Single Shift</option>
// //                 <option value="24-Hours Double Shift">24-Hours Double Shift</option>
// //                 <option value="Trip-Based">Trip-Based</option>
// //               </select>
// //             </div>
// //             <div style={fieldContainerStyle}>
// //               <label style={labelStyle}>Refered By</label>
// //               <input
// //                 style={inputStyle}
// //                 type="text"
// //                 name="referBy"
// //                 value={addData.referBy}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div style={fieldContainerStyle}>
// //               <label style={labelStyle}>State</label>
// //               <input
// //                 style={inputStyle}
// //                 type="text"
// //                 name="state"
// //                 value={addData.state}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>
// //           {addData.shiftType === "24-Hours Double Shift" && (
// //             <p style={{ color: "#007bff", marginTop: "10px" }}>
// //               Assigned Shift:{" "}
// //               {addData.shiftA ? "Shift A (6 AM - 6 PM)" : "Shift B (6 PM - 6 AM)"}
// //             </p>
// //           )}

// //           {/* BANK DETAILS */}
// //           <h3 style={sectionHeading}>Bank Details</h3>
// //           <div style={fieldGroupStyle}>
// //             {[
// //               "basicPayment",
// //               "nameAsPerBank",
// //               "bankAccountNumber",
// //               "IFSC",
// //               "bankName",
// //             ].map((field) => (
// //               <div key={field} style={fieldContainerStyle}>
// //                 <label style={labelStyle}>
// //                   {field
// //                     .replace(/([A-Z])/g, " $1")
// //                     .replace(/^./, (str) => str.toUpperCase())}
// //                 </label>
// //                 {renderField(field, formData[field])}
// //                 {errors[field] && (
// //                   <p style={errorTextStyle}>{errors[field]}</p>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

//       //     {/* DOCUMENTS */}
//       //     <h3 style={sectionHeading}>Documents</h3>
//       //     <div style={fieldGroupStyle}>
//       //       {[
//       //         {
//       //           label: "Profile Picture (PNG, JPEG)",
//       //           name: "profilePicture",
//       //         },
//       //         {
//       //           label: "Aadhar Upload (PNG, JPEG, PDF)",
//       //           name: "aadharFile",
//       //         },
//       //         {
//       //           label: "PAN Upload (PNG, JPEG, PDF)",
//       //           name: "panFile",
//       //         },
//       //         {
//       //           label: "Driving License Upload (PNG, JPEG, PDF)",
//       //           name: "dlFile",
//       //         },
//       //         {
//       //           label: "Bank Passbook Upload (PNG, JPEG, PDF)",
//       //           name: "bankPassbookFile",
//       //         },
//       //       ].map((doc) => (
//       //         <div key={doc.name} style={fieldContainerStyle}>
//       //         <label style={labelStyle}>{doc.label}</label>
//       //         <input
//       //           type="file"
//       //           name={doc.name}
//       //           onChange={handleFileChange}
//       //           style={{ display: "none" }}
//       //           id={doc.name}
//       //         />
//       //         <label
//       //           htmlFor={doc.name}
//       //           style={{ ...uploadButtonStyle, ...(errors[doc.name] ? uploadButtonHoverStyle : {}) }}
//       //         >
//       //           {documents[doc.name] ? documents[doc.name].name : 'Upload File'}
//       //         </label>
//       //         {errors[doc.name] && (
//       //           <p style={errorTextStyle}>{errors[doc.name]}</p>
//       //         )}
//       //       </div>
//       //     ))}
//       //     </div>
//       //   </form>
//       // </div>

// //       <div style={buttonContainerStyle}>
// //         <button type="button" onClick={handleClear} style={buttonStyle}>
// //           Clear
// //         </button>
// //         <button style={buttonStyle} onClick={handleSubmit}>
// //           Submit
// //         </button>
// //       </div>

// //       <div style={{ textAlign: "center", marginBottom: "2rem" }}>
// //         <input
// //           type="text"
// //           placeholder="Search by Driver Name or Driver ID"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           style={{ ...inputStyle, maxWidth: "650px", marginRight:"55%" }}
// //         />
// //       </div>

// //       <table style={tableStyle}>
// //         <thead>
// //           <tr>
// //             <th style={thTdStyle}>Driver ID</th>
// //             <th style={thTdStyle}>Driver Name</th>
// //             <th style={thTdStyle}>Contact Number</th>
// //             <th style={thTdStyle}>Aadhar Number</th>
// //             <th style={thTdStyle}>PAN Number</th>
// //             <th style={thTdStyle}>DL Number</th>
// //             <th style={thTdStyle}>Profile Picture</th>
// //             <th style={thTdStyle}>Aadhar File</th>
// //             <th style={thTdStyle}>PAN File</th>
// //             <th style={thTdStyle}>DL File</th>
// //             <th style={thTdStyle}>Bank Passbook</th>
// //             <th style={thTdStyle}>Update Record</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredDrivers.length > 0 ? (
// //             filteredDrivers.map((driver, index) => (
// //               <tr key={index}>
// //                 <td style={thTdStyle}>{driver.driverId}</td>
// //                 <td style={thTdStyle}>{driver.firstName}</td>
// //                 <td style={thTdStyle}>{driver.contactNumber}</td>
// //                 <td style={thTdStyle}>{driver.aadharNumber}</td>
// //                 <td style={thTdStyle}>{driver.panNo}</td>
// //                 <td style={thTdStyle}>{driver.dlNumber}</td>
// //                 {[
// //                   "profilePicture",
// //                   "aadharFile",
// //                   "panFile",
// //                   "dlFile",
// //                   "bankPassbookFile",
// //                 ].map((fileKey) => (
// //                   <td style={thTdStyle} key={fileKey}>
// //                     {driver[fileKey] ? (
// //                       <button
// //                         onClick={() =>
// //                           window.open(
// //                             `${API_BASE_URL}/${driver[fileKey]}`,
// //                             "_blank"
// //                           )
// //                         }
// //                         style={{
// //                           cursor: "pointer",
// //                           background: "none",
// //                           border: "none",
// //                           color: colors.primary,
// //                         }}
// //                       >
// //                         👁️ View
// //                       </button>
// //                     ) : (
// //                       "N/A"
// //                     )}
// //                   </td>
// //                 ))}
// //                 <td style={thTdStyle}>
// //                   {editMode === index ? (
// //                     <>
// //                       <button
// //                         onClick={() => handleSave(index)}
// //                         style={{ marginRight: "0.5rem" }}
// //                       >
// //                         <Save color="green" size={20} />
// //                       </button>
// //                       <button onClick={() => setEditMode(null)}>
// //                         <XCircle color="red" size={20} />
// //                       </button>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <button
// //                         onClick={() => handleEdit(index)}
// //                         style={{ marginRight: "0.5rem" }}
// //                       >
// //                         <Edit color="blue" size={20} />
// //                       </button>
// //                       <button onClick={() => handleDelete(driver.driverId)}>
// //                         <Trash2 color="red" size={20} />
// //                       </button>
// //                     </>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="11" style={thTdStyle}>
// //                 No records found
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //       <div style={{ textAlign: "center" }}>
// //         <button style={buttonStyle}>Download CSV</button>
// //       </div>
// //     </div>
// //   );
// // };

// // const DriverConfirm = () => (
// //   <div style={containerStyle}>
// //     <h2 style={{ textAlign: "center" }}>Driver Confirmation Page</h2>
// //   </div>
// // );

// // export default DriverOnboarding;


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

// const componentStyle = {
//   marginLeft: "270px",
//   overflowX: "hidden",
// };

// const containerStyle = {
//   ...globalFontStyle,
//   maxWidth: "77%", // Adjust width to prevent it from going under the sidebar
//   margin: "2rem auto", // Centers horizontally while keeping top and bottom margins
//   marginLeft: "0px", // inner container, away from the sidebar
//   padding: "2rem",
//   backgroundColor: colors.white,
//   border: `2px solid ${colors.primary}`,
//   borderRadius: "12px",
//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
// };

// const heading = {
//   ...globalFontStyle,
//   textAlign: "center",
//   background: "#FFC107",
//   color: "black",
//   padding: "1rem",
//   borderRadius: "8px",
//   marginBottom: "1.5rem",
//   fontSize: "2rem",
//   letterSpacing: "1px",
//   textTransform: "uppercase",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   marginLeft: "11%",
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
//   width: "99%",
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
//   marginRight: "13px",
// };

// const fieldContainerStyle2 = (field) => ({
//   marginBottom: "1.5rem", // Increased gap between individual fields
//   marginRight: "13px",
// });

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
//   width:"108%",
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
//   marginBottom: "1%",
// };

// const errorTextStyle = {
//   color: "red",
//   fontSize: "0.875rem",
//   marginTo0: "0.25rem",
//   fontWeight: "bold",
// };

// const tableStyle = {
//   width: "90%", // Matches container width
//   margin: "auto",
//   borderCollapse: "collapse",
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
//   top: "2rem",
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
//   const [isReferred, setIsReferred] = useState(false);
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
//     // isDriver: "",
//     referByDriverId: "",
//     referByDriverName: "",
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

//   const states = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal",
//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli and Daman and Diu",
//     "Lakshadweep",
//     "Delhi",
//     "Puducherry",
//   ];

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
//     const combinedData = { ...formData, ...addData };

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     const formDataToSend = new FormData();
//     Object.keys(combinedData).forEach((key) => {
//       formDataToSend.append(key, combinedData[key]);
//     });
//     Object.keys(documents).forEach((key) => {
//       formDataToSend.append(key, documents[key]);
//     });
//     console.log("formData To send=", formDataToSend);

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
//     <div style={componentStyle}>
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
//               "dob",
//               "DLType",
//               "dlNumber",
//               "dLValidTill",
//               "joiningDate",
//               "contactNumber",
//               "emergencyContact",
//               "aadharNumber",
//               "panNo",
//               "address",
//             ].map((field, index) => (
//               <div key={index} style={fieldContainerStyle2(field)}>
//                 <label style={labelStyle}>
//                   {field
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 {renderField(field, formData[field], field === "driverId")}
//                 {errors[field] && <p style={errorTextStyle}>{errors[field]}</p>}
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
//                 <option value="24-Hours Single Shift">
//                   24-Hours Single Shift
//                 </option>
//                 <option value="24-Hours Double Shift">
//                   24-Hours Double Shift
//                 </option>
//                 <option value="Trip-Based">Trip-Based</option>
//               </select>
//             </div>

//             <div style={fieldContainerStyle}>
//               <label style={labelStyle}>Refer By Driver</label>
//               <select
//                 style={inputStyle}
//                 name="referBy"
//                 value={addData.referBy}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             {addData.referBy === "Yes" && (
//               <>
//                 <div>
//                   <label>Refer By Driver ID:</label>
//                   <input
//                     type="text"
//                     name="referByDriverId"
//                     style={inputStyle}
//                     value={addData.referByDriverId}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label>Refer By Driver Name:</label>
//                   <input
//                     type="text"
//                     style={inputStyle}
//                     name="referByDriverName"
//                     value={addData.referByDriverName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </>
//             )}

// <div style={fieldContainerStyle}>
//   <label style={labelStyle}>State</label>
//   <select
//     name="state" // ✅ Add this line
//     value={addData.state}
//     style={inputStyle}
//     onChange={handleChange}
//     required
//   >
//     <option value="">Select State</option>
//     {states.map((state, index) => (
//       <option key={index} value={state}>
//         {state}
//       </option>
//     ))}
//   </select>
// </div>

//           </div>

//           {addData.shiftType === "24-Hours Double Shift" && (
//             <p style={{ color: "#007bff", marginTop: "10px" }}>
//               Assigned Shift:{" "}
//               {addData.shiftA
//                 ? "Shift A (6 AM - 6 PM)"
//                 : "Shift B (6 PM - 6 AM)"}
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
//                 {errors[field] && <p style={errorTextStyle}>{errors[field]}</p>}
//               </div>
//             ))}
//           </div>

//           {/* DOCUMENTS */}
//           <h3 style={sectionHeading}>Documents</h3>
//           <div style={fieldGroupStyle}>
//             {[
//               {
//                 label: "Profile Picture (PNG, JPEG)",
//                 name: "profilePicture",
//               },
//               {
//                 label: "Aadhar (PNG, JPEG, PDF)",
//                 name: "aadharFile",
//               },
//               {
//                 label: "PAN (PNG, JPEG, PDF)",
//                 name: "panFile",
//               },
//               {
//                 label: "Driving License (PNG, JPEG, PDF)",
//                 name: "dlFile",
//               },
//               {
//                 label: "Bank Passbook (PNG, JPEG, PDF)",
//                 name: "bankPassbookFile",
//               },
//             ].map((doc) => (
//               <div key={doc.name} style={fieldContainerStyle}>
//                 <label style={labelStyle}>{doc.label}</label>

//                 <input
//                   type="file"
//                   name={doc.name}
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   id={doc.name}
//                 />

//                 <div style={{ display: "flex", marginTop: "5px" }}>
//                   <label
//                     htmlFor={doc.name}
//                     style={{
//                       ...uploadButtonStyle,
//                       ...(errors[doc.name] ? uploadButtonHoverStyle : {}),
//                     }}
//                   >
//                     {documents[doc.name]
//                       ? documents[doc.name].name
//                       : "Upload File"}
//                   </label>
//                 </div>

//                 {errors[doc.name] && (
//                   <p style={errorTextStyle}>{errors[doc.name]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </form>
//       </div>

//       <div style={buttonContainerStyle}>
//         <button type="button" onClick={handleClear} style={buttonStyle}>
//           Clear
//         </button>
//         <button style={buttonStyle} onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>

//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "2rem",
//           marginLeft: "80px",
//           marginBottom: "2rem",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search by Driver Name or Driver ID"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ ...inputStyle, maxWidth: "650px", marginRight: "55%" }}
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
//       <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, Save, XCircle, Trash2 } from "lucide-react";
import API_BASE_URL from "../config";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry",
];

const DriverOnboarding = () => {
  const navigate = useNavigate();
  const [latestId, setLatestId] = useState("DE0000");
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [documents, setDocuments] = useState({
    profilePicture: null,
    aadharFile: null,
    panFile: null,
    dlFile: null,
    bankPassbookFile: null,
  });
  const [addData, setAddData] = useState({
    shiftType: "",
    referBy: "",
    state: "",
    shiftA: false,
    shiftB: false,
    referByDriverId: "",
    referByDriverName: "",
  });
  const [formData, setFormData] = useState({
    driverId: "",
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
    formWrapper: { padding: "20px" },
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
    inputDisabled: {
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
    errorText: {
      color: "red",
      fontSize: "12px",
      marginTop: "4px",
      fontWeight: "bold",
    },
    shiftNote: {
      color: "#1565c0",
      fontSize: "13px",
      fontWeight: "bold",
      padding: "8px 12px",
      backgroundColor: "#e3f2fd",
      borderRadius: "4px",
      border: "1px solid #1565c0",
      marginBottom: "16px",
    },
    uploadBtn: {
      display: "inline-block",
      padding: "8px 16px",
      backgroundColor: "#FFC107",
      color: "#000",
      border: "1.5px solid #000",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    },
    fileSuccess: {
      fontSize: "12px",
      color: "green",
      marginTop: "4px",
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
    divider: {
      borderTop: "2px solid #f0f0f0",
      margin: "24px 0",
    },
    tableTopRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "10px",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      width: "300px",
      color: "#000",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "13px 14px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "left",
      borderBottom: "2px solid #e0a800",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "11px 14px",
      fontSize: "14px",
      color: "#000",
      borderBottom: "1px solid #f0f0f0",
      whiteSpace: "nowrap",
    },
  };

  useEffect(() => {
    axios.get(API_BASE_URL + "/onboarding/latest-id")
      .then((res) => {
        const lastId = res.data.latestId || "DE0000";
        const next = `DE${(parseInt(lastId.slice(2), 10) + 1).toString().padStart(4, "0")}`;
        setLatestId(next);
        setFormData(prev => ({ ...prev, driverId: next }));
      })
      .catch(err => console.error("Error fetching latest driver ID:", err));
  }, []);

  useEffect(() => {
    if (addData.shiftType === "24-Hours Double Shift") {
      const h = new Date().getHours();
      setAddData(prev => ({ ...prev, shiftA: h >= 6 && h < 18, shiftB: !(h >= 6 && h < 18) }));
    } else {
      setAddData(prev => ({ ...prev, shiftA: false, shiftB: false }));
    }
  }, [addData.shiftType]);

  useEffect(() => {
    axios.get(API_BASE_URL + "/onboarding/drivers")
      .then(res => setDrivers(res.data))
      .catch(err => console.error("Error fetching drivers:", err));
  }, []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, driverId: latestId }));
  }, [latestId]);

  const filteredDrivers = drivers.filter(d =>
    d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.driverId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in addData) setAddData(prev => ({ ...prev, [name]: value }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    const imgOnly = ["image/png", "image/jpeg"];
    const { name } = e.target;
    if (name === "profilePicture" && !imgOnly.includes(file.type)) {
      setErrors(prev => ({ ...prev, [name]: "Only PNG or JPEG allowed." })); return;
    }
    if (name !== "profilePicture" && !allowed.includes(file.type)) {
      setErrors(prev => ({ ...prev, [name]: "Only PNG, JPEG, or PDF allowed." })); return;
    }
    setErrors(prev => ({ ...prev, [name]: "" }));
    setDocuments(prev => ({ ...prev, [name]: file }));
  };

  const handleClear = () => {
    setFormData({
      driverId: latestId, firstName: "", secondName: "", surname: "",
      fatherName: "", address: "", dob: "", dlNumber: "", dLValidTill: "",
      DLType: "LMV", joiningDate: "", basicPayment: "", nameAsPerBank: "",
      bankAccountNumber: "", IFSC: "", bankName: "", panNo: "",
      aadharNumber: "", contactNumber: "", emergencyContact: "",
    });
    setAddData({ shiftType: "", referBy: "", state: "", shiftA: false, shiftB: false, referByDriverId: "", referByDriverName: "" });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFiles = ["profilePicture", "aadharFile", "panFile", "dlFile", "bankPassbookFile"];
    let newErrors = {};
    requiredFiles.forEach(k => { if (!documents[k]) newErrors[k] = `Please upload ${k.replace(/([A-Z])/g, " $1")}.`; });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const combined = { ...formData, ...addData };
    const fd = new FormData();
    Object.keys(combined).forEach(k => fd.append(k, combined[k]));
    Object.keys(documents).forEach(k => { if (documents[k]) fd.append(k, documents[k]); });
    try {
      await axios.post(API_BASE_URL + "/onboarding/driver-confirm", fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Driver onboarded successfully!");
    } catch (err) { console.error("Error submitting:", err); }
  };

  const handleEdit = (i) => { setEditMode(i); setFormData({ ...drivers[i] }); };
  const handleSave = async (i) => {
    try {
      await axios.put(`${API_BASE_URL}/onboarding/drivers/${formData.driverId}`, formData);
      const updated = [...drivers]; updated[i] = { ...formData };
      setDrivers(updated); setEditMode(null); alert("Updated successfully!");
    } catch (err) { console.error(err); }
  };
  const handleDelete = async (driverId) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/onboarding/drivers/${driverId}`);
      setDrivers(drivers.filter(d => d.driverId !== driverId));
    } catch (err) { console.error(err); }
  };

  const fmtLabel = (f) => f.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>DRIVER ONBOARDING</div>

      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit}>

          {/* Driver Details */}
          <div style={styles.sectionTitle}>Driver Details</div>
          <div style={styles.formGrid}>
            {["driverId","firstName","secondName","fatherName","dob","contactNumber",
              "emergencyContact","aadharNumber","panNo","joiningDate"].map(field => (
              <div key={field}>
                <label style={styles.label}>{fmtLabel(field)}:</label>
                <input
                  type={["dob","joiningDate"].includes(field) ? "date" : "text"}
                  name={field}
                  style={field === "driverId" ? styles.inputDisabled : styles.input}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={field === "driverId"}
                />
                {errors[field] && <p style={styles.errorText}>{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label style={styles.label}>DL Type:</label>
              <select name="DLType" style={styles.input} value={formData.DLType} onChange={handleChange}>
                <option value="LMV">LMV (Light Motor Vehicle)</option>
                <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                <option value="MCWG">MCWG (Motorcycle with Gear)</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>DL Number:</label>
              <input type="text" name="dlNumber" style={styles.input} value={formData.dlNumber} onChange={handleChange} />
              {errors.dlNumber && <p style={styles.errorText}>{errors.dlNumber}</p>}
            </div>
            <div>
              <label style={styles.label}>DL Valid Till:</label>
              <input type="date" name="dLValidTill" style={styles.input} value={formData.dLValidTill} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={styles.label}>Address:</label>
              <textarea name="address" style={{ ...styles.input, minHeight: "70px", resize: "vertical" }}
                value={formData.address} onChange={handleChange} />
            </div>
          </div>

          {/* Shift & Additional */}
          <div style={styles.sectionTitle}>Shift & Location Details</div>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Shift Type:</label>
              <select name="shiftType" style={styles.input} value={addData.shiftType} onChange={handleChange} required>
                <option value="">Select Shift Type</option>
                <option value="12-Hours Shift">12-Hours Shift</option>
                <option value="24-Hours Single Shift">24-Hours Single Shift</option>
                <option value="24-Hours Double Shift">24-Hours Double Shift</option>
                <option value="Trip-Based">Trip-Based</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Referred By Driver:</label>
              <select name="referBy" style={styles.input} value={addData.referBy} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {addData.referBy === "Yes" && (
              <>
                <div>
                  <label style={styles.label}>Refer By Driver ID:</label>
                  <input type="text" name="referByDriverId" style={styles.input} value={addData.referByDriverId} onChange={handleChange} />
                </div>
                <div>
                  <label style={styles.label}>Refer By Driver Name:</label>
                  <input type="text" name="referByDriverName" style={styles.input} value={addData.referByDriverName} onChange={handleChange} />
                </div>
              </>
            )}
            <div>
              <label style={styles.label}>State:</label>
              <select name="state" style={styles.input} value={addData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {addData.shiftType === "24-Hours Double Shift" && (
            <div style={styles.shiftNote}>
              ℹ️ Assigned Shift: {addData.shiftA ? "Shift A (6 AM – 6 PM)" : "Shift B (6 PM – 6 AM)"}
            </div>
          )}

          {/* Bank Details */}
          <div style={styles.sectionTitle}>Bank Details</div>
          <div style={styles.formGrid}>
            {["basicPayment","nameAsPerBank","bankAccountNumber","IFSC","bankName"].map(field => (
              <div key={field}>
                <label style={styles.label}>{fmtLabel(field)}:</label>
                <input type="text" name={field} style={styles.input} value={formData[field]} onChange={handleChange} />
                {errors[field] && <p style={styles.errorText}>{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Documents */}
          <div style={styles.sectionTitle}>Documents</div>
          <div style={styles.formGrid}>
            {[
              { label: "Profile Picture (PNG, JPEG)", name: "profilePicture" },
              { label: "Aadhar (PNG, JPEG, PDF)", name: "aadharFile" },
              { label: "PAN (PNG, JPEG, PDF)", name: "panFile" },
              { label: "Driving License (PNG, JPEG, PDF)", name: "dlFile" },
              { label: "Bank Passbook (PNG, JPEG, PDF)", name: "bankPassbookFile" },
            ].map(doc => (
              <div key={doc.name}>
                <label style={styles.label}>{doc.label}:</label>
                <input type="file" name={doc.name} id={doc.name}
                  onChange={handleFileChange} style={{ display: "none" }} />
                <label htmlFor={doc.name} style={styles.uploadBtn}>
                  {documents[doc.name] ? documents[doc.name].name : "Upload File"}
                </label>
                {documents[doc.name] && <p style={styles.fileSuccess}>✅ Uploaded</p>}
                {errors[doc.name] && <p style={styles.errorText}>{errors[doc.name]}</p>}
              </div>
            ))}
          </div>

          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
            <button type="submit" style={styles.btnYellow}>Submit</button>
          </div>
        </form>

        <div style={styles.divider} />

        {/* Records Table */}
        <div style={styles.tableTopRow}>
          <div style={styles.sectionTitle}>Driver Records</div>
          <input style={styles.searchInput} placeholder="Search by name or driver ID..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Driver ID","Driver Name","Contact","Aadhar No","PAN No","DL Number",
                  "Profile Pic","Aadhar","PAN","DL","Bank Passbook","Actions"].map(h => (
                  <th style={styles.th} key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.length > 0 ? filteredDrivers.map((driver, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={styles.td}>{driver.driverId}</td>
                  <td style={styles.td}>{driver.firstName}</td>
                  <td style={styles.td}>{driver.contactNumber}</td>
                  <td style={styles.td}>{driver.aadharNumber}</td>
                  <td style={styles.td}>{driver.panNo}</td>
                  <td style={styles.td}>{driver.dlNumber}</td>
                  {["profilePicture","aadharFile","panFile","dlFile","bankPassbookFile"].map(fk => (
                    <td style={styles.td} key={fk}>
                      {driver[fk] ? (
                        <button onClick={() => window.open(`${API_BASE_URL}/${driver[fk]}`, "_blank")}
                          style={{ cursor: "pointer", background: "none", border: "none", color: "#1565c0", fontSize: "13px" }}>
                          👁️ View
                        </button>
                      ) : "N/A"}
                    </td>
                  ))}
                  <td style={styles.td}>
                    {editMode === i ? (
                      <>
                        <button onClick={() => handleSave(i)} style={{ marginRight: "6px", background: "none", border: "none", cursor: "pointer" }}>
                          <Save color="green" size={18} />
                        </button>
                        <button onClick={() => setEditMode(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <XCircle color="red" size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(i)} style={{ marginRight: "6px", background: "none", border: "none", cursor: "pointer" }}>
                          <Edit color="#1565c0" size={18} />
                        </button>
                        <button onClick={() => handleDelete(driver.driverId)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <Trash2 color="#c62828" size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={12} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "28px" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DriverOnboarding;