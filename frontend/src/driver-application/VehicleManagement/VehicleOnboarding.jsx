// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import axios from "axios";
// import { saveAs } from "file-saver";
// import API_BASE_URL from "../config";
// const VehicleOnboardingForm = () => {
//   const [formData, setFormData] = useState({
//     vehicleNumber: "",
//     registerName: "",
//     vehicleType: "",
//     grossVehicleWeight: "",
//     registrationDate: "",
//     fitnessValidUpto: "",
//     taxValidUpto: "",
//     insuranceValidUpto: "",
//     pollutionValidUpto: "",
//     statePermitValidUpto: "",
//     nationalPermit: "No",
//     permitUpto: "",
//     temporaryPermit:"No",
//     TemporarypermitUpto:"",
//     remarks: "",
//   });

//   const [documents, setDocuments] = useState({
//     RegistrationCertificate: null,
//     Insurance: null,
//     PollutionCertificate: null,
//     RoadTax: null,
//     FitnessCertificate: null,
//     Permit: null,
//   });

//   const globalFontStyle = {
//     fontFami: "Arial, sans-serif",
//   };

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
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 3fr))", // Responsive grid,
//     gridAutoRows: "auto", // Allows flexible row height
//     gap: "40px",
//     paddingRight: "20px 20px",
//     marginRight: "20px",
//   };

//   const labelStyle = { fontWeight: "bold", marginBottom: "5px" };
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
//     gap: "2rem",
//   };

//   const buttonStyle = {
//     padding: "0.8em 1.5em",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     color: "white",
//     width: "10%",
//     height: "2.5rem",
//     backgroundColor: "black",
//     marginRight: "5rem",
//     transition: "all 0.3s ease-in-out", // Smooth effect on resize
//     marginRight: "6rem",
//   };

//   const tableStyle = {
//     width: "100%",

//     borderCollapse: "collapse",

//     marginTop: "20px",
//     marginLeft: "10.5%",
//   };

//   const thTdStyle = {
//     border: "1px solid #ccc",

//     padding: "10px",

//     textAlign: "left",
//   };

//   const navigate = useNavigate();
//   const [vehicleData, setVehicleData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     axios
//       .get(API_BASE_URL + "/onboarding/all-vehicles")
//       .then((response) => setVehicleData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Reset permitUpto if National Permit is "No"
//     if (name === "nationalPermit" && value === "No") {
//       setFormData({ ...formData, permitUpto: "" });
//     }
//     // if (name === "nationalPermit" && value === "No") {
//     //   setFormData({ ...formData, permitUpto: "" });
//     // }
//   };
//   // const handleContinue = () => {
//   //   navigate("/vehicle-confirm", { state: { formData } });
//   // };

//   // 🟢 Handle File Upload
//   const handleFileUpload = (e, docType) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
//     if (!allowedTypes.includes(file.type)) {
//       alert("Only PDF, JPG, and PNG files are allowed.");
//       return;
//     }

//     setDocuments((prev) => ({ ...prev, [docType]: file }));
//     alert(`${docType} uploaded successfully.`);
//   };

//   // Form Validation
//   const validateForm = () => {
//     const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
//     const alphabetRegex = /^[a-zA-Z ]+$/;

//     if (!alphaNumericRegex.test(formData.vehicleNumber)) {
//       alert("Vehicle Number should be alphanumeric.");
//       return false;
//     }
//     if (!alphabetRegex.test(formData.registerName)) {
//       alert("Register Name should contain only alphabets.");
//       return false;
//     }
//     if (!alphaNumericRegex.test(formData.grossVehicleWeight)) {
//       alert("Gross Vehicle Weight should be alphanumeric.");
//       return false;
//     }
//     return true;
//   };

//   // 🟢 Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     Object.entries(documents).forEach(([key, file]) => {
//       if (file) formDataToSend.append(key, file);
//     });

//     try {
//       const response = await axios.post(
//         API_BASE_URL + "/onboarding/vehicle",
//         formDataToSend
//       );
//       alert("Vehicle Onboarded Successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error onboarding vehicle:", error);
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       vehicleNumber: "",
//       registerName: "",
//       vehicleType: "",
//       grossVehicleWeight: "",
//       registrationDate: "",
//       fitnessValidUpto: "",
//       taxValidUpto: "",
//       insuranceValidUpto: "",
//       pollutionValidUpto: "",
//       statePermitValidUpto: "",
//       nationalPermit: "No",
//       permitUpto: "",
//       temporaryPermit:"No",
//       TemporarypermitUpto:"",
//       remarks: "",
//     });
//   };

//   // // Handle Form Submission
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     console.log("Vehicle Onboarded:", formData);
//   //     alert("Vehicle Onboarded Successfully!");
//   //   }
//   // };

//   const downloadCSV = () => {
//     axios
//       .get(API_BASE_URL + "/onboarding/vehicle-csv", {
//         responseType: "blob",
//       })
//       .then((response) => {
//         saveAs(response.data, "VehicleOnboardingData.csv");
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };
//   const filteredVehicles = vehicleData.filter(
//     (vehicle) =>
//       vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       vehicle.registerName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h2 className="sendo-heading">Vehicle Onboarding</h2>

//       <div style={containerStyle}>
//         <form
//           onSubmit={handleSubmit}
//           style={formStyle}
//           className="formCSS space-y-4"
//         >
//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               {" "}
//               Vehicle Number:
//             </label>
//             <input
//               type="text"
//               style={inputStyle}
//               name="vehicleNumber"
//               value={formData.vehicleNumber}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Register Owner Name:
//             </label>
//             <input
//               type="text"
//               style={inputStyle}
//               name="registerName"
//               value={formData.registerName}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Vehicle Type:
//             </label>
//             <select
//               name="vehicleType"
//               style={inputStyle}
//               value={formData.vehicleType}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Type</option>
//               <option value="Truck">Truck</option>
//               <option value="Bus">Bus</option>
//               <option value="Car">Car</option>
//               <option value="Bike">Bike</option>
//             </select>
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Gross Vehicle Weight:
//             </label>
//             <input
//               type="text"
//               style={inputStyle}
//               name="grossVehicleWeight"
//               value={formData.grossVehicleWeight}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Registration Date:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="registrationDate"
//               value={formData.registrationDate}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Fitness Valid Upto:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="fitnessValidUpto"
//               value={formData.fitnessValidUpto}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Tax Valid Upto:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="taxValidUpto"
//               value={formData.taxValidUpto}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Insurance Valid Upto:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="insuranceValidUpto"
//               value={formData.insuranceValidUpto}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Pollution Valid Upto:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="pollutionValidUpto"
//               value={formData.pollutionValidUpto}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               State Permit Valid Upto:
//             </label>
//             <input
//               type="date"
//               style={inputStyle}
//               name="statePermitValidUpto"
//               value={formData.statePermitValidUpto}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               National Permit:
//             </label>
//             <select
//               name="nationalPermit"
//               style={inputStyle}
//               value={formData.nationalPermit}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             >
//               <option value="No">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//           </div>
//           {/* Temporary Permit */}

//           {/* Show Permit Upto Date only if National Permit is Yes */}
//           {formData.nationalPermit === "Yes" && (
//             <div>
//               <label style={labelStyle} className="block font-semibold">
//                 If Yes, Permit Upto:
//               </label>
//               <input
//                 type="date"
//                 style={inputStyle}
//                 name="permitUpto"
//                 value={formData.permitUpto}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           )}

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Temporary Permit
//             </label>
//             <select
//               name="nationalPermit"
//               style={inputStyle}
//               value={formData.nationalPermit}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             >
//               <option value="No">No</option>
//               <option value="Yes">Yes</option>
//             </select>
//           </div>
//           {formData.nationalPermit === "Yes" && (
//             <div>
//               <label style={labelStyle} className="block font-semibold">
//                 If Yes, Permit Upto:
//               </label>
//               <input
//                 type="date"
//                 style={inputStyle}
//                 name="permitUpto"
//                 value={formData.permitUpto}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           )}

//           <div>
//             <label style={labelStyle} className="block font-semibold">
//               Remarks:
//             </label>
//             <textarea
//               name="remarks"
//               style={inputStyle}
//               value={formData.remarks}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             ></textarea>
//           </div>
//           {Object.keys(documents).map((docType) => (
//             <div key={docType}>
//               <label>{docType.replace(/([A-Z])/g, " $1").trim()}:</label>
//               <input
//                 type="file"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={(e) => handleFileUpload(e, docType)}
//               />
//               {documents[docType] && <p>Uploaded: {documents[docType].name}</p>}
//             </div>
//           ))}
//                <div style={buttonContainerStyle}>
//           <button type="button" style={buttonStyle} onClick={handleClear}>
//             Clear
//           </button>
//           <button type="submit" style={buttonStyle}>
//             Submit
//           </button>
//         </div>
//         </form>
   
//       </div>
//       <input
//         type="text"
//         placeholder="Search by Vehicle Number or Register Name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{
//           width: "300px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           marginBottom: "20px",
//           marginLeft: "10.5%",
//         }}
//       />

//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={thTdStyle}>Vehicle Number</th>
//             <th style={thTdStyle}>Register Owner Name</th>
//             <th style={thTdStyle}>Vehicle Type</th>
//             <th style={thTdStyle}>Gross Vehicle Weight</th>
//             <th style={thTdStyle}>Registration Date</th>
//             <th style={thTdStyle}>Fitness Valid Upto</th>
//             <th style={thTdStyle}>Tax Valid Upto</th>
//             <th style={thTdStyle}>Insurance Valid Upto</th>
//             <th style={thTdStyle}>Pollution Valid Upto</th>
//             <th style={thTdStyle}>State Permit Valid Upto</th>
//             <th style={thTdStyle}>National Permit</th>
//             <th style={thTdStyle}>Permit Upto</th>
//             <th style={thTdStyle}>Remarks</th>
//             <th style={thTdStyle}>Registration Certificate</th>
//             <th style={thTdStyle}>Insurance</th>
//             <th style={thTdStyle}>Pollution Certificate</th>
//             <th style={thTdStyle}>Road Tax</th>
//             <th style={thTdStyle}>Fitness Certificate</th>
//             <th style={thTdStyle}>Permit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredVehicles.length > 0 ? (
//             filteredVehicles.map((vehicle, index) => (
//               <tr key={index}>
//                 {Object.keys(vehicle)
//                   .slice(0, 13)
//                   .map((key, i) => (
//                     <td key={i} style={thTdStyle}>
//                       {vehicle[key]}
//                     </td>
//                   ))}
//                 {[
//                   "RegistrationCertificate",
//                   "Insurance",
//                   "PollutionCertificate",
//                   "RoadTax",
//                   "FitnessCertificate",
//                   "Permit",
//                 ].map((fileKey) => (
//                   <td key={fileKey} style={thTdStyle}>
//                     {vehicle[fileKey] ? (
//                       <button
//                         onClick={() =>
//                           window.open(
//                             `${API_BASE_URL}/${vehicle[fileKey]}`,
//                             "_blank"
//                           )
//                         }
//                         style={{
//                           cursor: "pointer",
//                           color: "blue",
//                           border: "none",
//                           background: "none",
//                         }}
//                       >
//                         👁️ View
//                       </button>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="19" style={thTdStyle}>
//                 No records found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div style={{ marginTop: "20px", marginLeft: "11%" }}>
//         <button style={buttonStyle} onClick={downloadCSV}>
//           Download CSV
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VehicleOnboardingForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import API_BASE_URL from "../config";

const VehicleOnboardingForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    registerName: "",
    vehicleType: "",
    grossVehicleWeight: "",
    registrationDate: "",
    fitnessValidUpto: "",
    taxValidUpto: "",
    insuranceValidUpto: "",
    pollutionValidUpto: "",
    statePermitValidUpto: "",
    nationalPermit: "No",
    permitUpto: "",
    temporaryPermit: "No",
    TemporarypermitUpto: "",
    remarks: "",
  });

  const [documents, setDocuments] = useState({
    RegistrationCertificate: null,
    Insurance: null,
    PollutionCertificate: null,
    RoadTax: null,
    FitnessCertificate: null,
    Permit: null,
  });

  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      backgroundColor: "#fff",
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
    searchContainer: {
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    searchInput: {
      width: "320px",
      padding: "9px 12px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#FFC107",
      color: "#000",
      padding: "13px 16px",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "14px",
      borderBottom: "2px solid #e0a800",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "11px 16px",
      fontSize: "14px",
      color: "#000",
      borderBottom: "1px solid #f0f0f0",
      whiteSpace: "nowrap",
    },
    downloadBtn: {
      padding: "9px 22px",
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      margin: "14px 20px",
    },
    fileLabel: {
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "6px",
      display: "block",
      color: "#000",
    },
    fileSuccess: {
      fontSize: "12px",
      color: "green",
      marginTop: "4px",
    },
  };

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/onboarding/all-vehicles")
      .then((response) => setVehicleData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "nationalPermit" && value === "No" ? { permitUpto: "" } : {}),
      ...(name === "temporaryPermit" && value === "No" ? { TemporarypermitUpto: "" } : {}),
    }));
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, and PNG files are allowed.");
      return;
    }
    setDocuments((prev) => ({ ...prev, [docType]: file }));
    alert(`${docType} uploaded successfully.`);
  };

  const validateForm = () => {
    const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
    const alphabetRegex = /^[a-zA-Z ]+$/;
    if (!alphaNumericRegex.test(formData.vehicleNumber)) {
      alert("Vehicle Number should be alphanumeric.");
      return false;
    }
    if (!alphabetRegex.test(formData.registerName)) {
      alert("Register Name should contain only alphabets.");
      return false;
    }
    if (!alphaNumericRegex.test(formData.grossVehicleWeight)) {
      alert("Gross Vehicle Weight should be alphanumeric.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
    Object.entries(documents).forEach(([key, file]) => {
      if (file) formDataToSend.append(key, file);
    });
    try {
      await axios.post(API_BASE_URL + "/onboarding/vehicle", formDataToSend);
      alert("Vehicle Onboarded Successfully!");
    } catch (error) {
      console.error("Error onboarding vehicle:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      vehicleNumber: "", registerName: "", vehicleType: "", grossVehicleWeight: "",
      registrationDate: "", fitnessValidUpto: "", taxValidUpto: "", insuranceValidUpto: "",
      pollutionValidUpto: "", statePermitValidUpto: "", nationalPermit: "No", permitUpto: "",
      temporaryPermit: "No", TemporarypermitUpto: "", remarks: "",
    });
  };

  const downloadCSV = () => {
    axios
      .get(API_BASE_URL + "/onboarding/vehicle-csv", { responseType: "blob" })
      .then((response) => saveAs(response.data, "VehicleOnboardingData.csv"))
      .catch((error) => console.error("Error downloading CSV:", error));
  };

  const filteredVehicles = vehicleData.filter(
    (vehicle) =>
      vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>VEHICLE ONBOARDING</div>

      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>

            <div>
              <label style={styles.label}>Vehicle Number:</label>
              <input type="text" style={styles.input} name="vehicleNumber"
                value={formData.vehicleNumber} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Register Owner Name:</label>
              <input type="text" style={styles.input} name="registerName"
                value={formData.registerName} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Vehicle Type:</label>
              <select name="vehicleType" style={styles.input}
                value={formData.vehicleType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Gross Vehicle Weight:</label>
              <input type="text" style={styles.input} name="grossVehicleWeight"
                value={formData.grossVehicleWeight} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Registration Date:</label>
              <input type="date" style={styles.input} name="registrationDate"
                value={formData.registrationDate} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Fitness Valid Upto:</label>
              <input type="date" style={styles.input} name="fitnessValidUpto"
                value={formData.fitnessValidUpto} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Tax Valid Upto:</label>
              <input type="date" style={styles.input} name="taxValidUpto"
                value={formData.taxValidUpto} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Insurance Valid Upto:</label>
              <input type="date" style={styles.input} name="insuranceValidUpto"
                value={formData.insuranceValidUpto} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>Pollution Valid Upto:</label>
              <input type="date" style={styles.input} name="pollutionValidUpto"
                value={formData.pollutionValidUpto} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>State Permit Valid Upto:</label>
              <input type="date" style={styles.input} name="statePermitValidUpto"
                value={formData.statePermitValidUpto} onChange={handleChange} required />
            </div>

            <div>
              <label style={styles.label}>National Permit:</label>
              <select name="nationalPermit" style={styles.input}
                value={formData.nationalPermit} onChange={handleChange} required>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.nationalPermit === "Yes" && (
              <div>
                <label style={styles.label}>National Permit Upto:</label>
                <input type="date" style={styles.input} name="permitUpto"
                  value={formData.permitUpto} onChange={handleChange} required />
              </div>
            )}

            <div>
              <label style={styles.label}>Temporary Permit:</label>
              <select name="temporaryPermit" style={styles.input}
                value={formData.temporaryPermit} onChange={handleChange} required>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.temporaryPermit === "Yes" && (
              <div>
                <label style={styles.label}>Temporary Permit Upto:</label>
                <input type="date" style={styles.input} name="TemporarypermitUpto"
                  value={formData.TemporarypermitUpto} onChange={handleChange} required />
              </div>
            )}

            <div>
              <label style={styles.label}>Remarks:</label>
              <textarea name="remarks"
                style={{ ...styles.input, minHeight: "80px", resize: "vertical" }}
                value={formData.remarks} onChange={handleChange} />
            </div>

            {Object.keys(documents).map((docType) => (
              <div key={docType}>
                <label style={styles.fileLabel}>
                  {docType.replace(/([A-Z])/g, " $1").trim()}:
                </label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, docType)}
                  style={{ fontSize: "13px" }} />
                {documents[docType] && (
                  <p style={styles.fileSuccess}>✅ {documents[docType].name}</p>
                )}
              </div>
            ))}

          </div>

          <div style={styles.buttonRow}>
            <button type="button" style={styles.btnBlack} onClick={handleClear}>Clear</button>
            <button type="submit" style={styles.btnYellow}>Submit</button>
          </div>
        </form>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Vehicle Number or Register Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Vehicle Number</th>
              <th style={styles.th}>Register Owner Name</th>
              <th style={styles.th}>Vehicle Type</th>
              <th style={styles.th}>Gross Vehicle Weight</th>
              <th style={styles.th}>Registration Date</th>
              <th style={styles.th}>Fitness Valid Upto</th>
              <th style={styles.th}>Tax Valid Upto</th>
              <th style={styles.th}>Insurance Valid Upto</th>
              <th style={styles.th}>Pollution Valid Upto</th>
              <th style={styles.th}>State Permit Valid Upto</th>
              <th style={styles.th}>National Permit</th>
              <th style={styles.th}>Permit Upto</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Registration Certificate</th>
              <th style={styles.th}>Insurance</th>
              <th style={styles.th}>Pollution Certificate</th>
              <th style={styles.th}>Road Tax</th>
              <th style={styles.th}>Fitness Certificate</th>
              <th style={styles.th}>Permit</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <tr key={index}
                  style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa" }}>
                  {Object.keys(vehicle).slice(0, 13).map((key, i) => (
                    <td key={i} style={styles.td}>{vehicle[key]}</td>
                  ))}
                  {["RegistrationCertificate", "Insurance", "PollutionCertificate",
                    "RoadTax", "FitnessCertificate", "Permit"].map((fileKey) => (
                    <td key={fileKey} style={styles.td}>
                      {vehicle[fileKey] ? (
                        <button
                          onClick={() => window.open(`${API_BASE_URL}/${vehicle[fileKey]}`, "_blank")}
                          style={{ cursor: "pointer", color: "blue", border: "none",
                            background: "none", fontSize: "13px" }}>
                          👁️ View
                        </button>
                      ) : "N/A"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19"
                  style={{ ...styles.td, textAlign: "center", padding: "24px", color: "#888" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button style={styles.downloadBtn} onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default VehicleOnboardingForm;