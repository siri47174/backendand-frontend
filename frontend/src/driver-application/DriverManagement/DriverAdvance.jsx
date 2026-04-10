import React, { useState, useEffect } from "react";
import axios from "axios";
import ManualRequestForm from "./ManualRequestForm";
import API_BASE_URL from "../config";

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import ManualRequestForm from "./ManualRequestForm";
// // // const DriverAdvance = () => {
// // //   const [advances, setAdvances] = useState([]);
// // //   const [records, setRecords] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showManualForm, setShowManualForm] = useState(false);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const toggleManualForm = () => {
// // //     setShowManualForm(!showManualForm);
// // //   };

// // //   // ✅ Fetch advance requests
// // //   const fetchAdvanceRequests = async () => {
// // //     try {
// // //       const pendingResponse = await axios.get(
// // //         API_BASE_URL + "/advance/pending"
// // //       );
// // //       setAdvances(pendingResponse.data);

// // //       // 2) Get Approved/Rejected
// // //       const recordsResponse = await axios.get(
// // //         API_BASE_URL + "/advance/records"
// // //       );
// // //       setRecords(recordsResponse.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error("Error fetching advance requests:", error);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAdvanceRequests();
// // //   }, []);

// // //   const handleApproval = async (advanceId, status, requestedAmount) => {
// // //     let approvedAmount = 0;
// // //     if (status === "Approved") {
// // //       approvedAmount = parseFloat(prompt(`Enter approved amount:`));

// // //       if (
// // //         isNaN(approvedAmount) ||
// // //         approvedAmount <= 0 ||
// // //         approvedAmount > requestedAmount
// // //       ) {
// // //         alert(
// // //           `Invalid approved amount. It should be a number and <= ₹${requestedAmount}`
// // //         );
// // //         return;
// // //       }
// // //     }

// // //     try {
// // //       await axios.post(API_BASE_URL + "/advance/approve", {
// // //         advanceId,
// // //         status,
// // //         approvedAmount,
// // //         approvedAt: new Date(), // Save the approval date
// // //         adminId: "admin123", // Example adminId
// // //         adminName: "Admin User", // Example adminName
// // //       });

// // //       alert(`Advance ${status} successfully`);
// // //       fetchAdvanceRequests(); // <--- Re-fetch your data here!
// // //     } catch (error) {
// // //       console.error(`Error ${status.toLowerCase()}ing advance request:`, error);
// // //       alert("Failed to update advance request");
// // //     }
// // //   };
// // //   const handleSearch = (e) => {
// // //     setSearchTerm(e.target.value);
// // //   };

// // //   const filteredRecords = records.filter(
// // //     (record) =>
// // //       record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div
// // //       style={{
// // //         padding: "20px",
// // //         background: "white",
// // //         color: "black",
// // //         maxWidth: "100%",
// // //         margin: "auto",
// // //         borderRadius: "10px",

// // //         marginLeft:"10%"
// // //       }}
// // //     >
// // //       <h2
// // //         style={{
// // //           textAlign: "center",
// // //           fontSize: "34px",
// // //           background: "#FFC107",
// // //           color: "black",
// // //           padding: "10px",
// // //           borderRadius: "8px",
// // //           marginBottom: "60px",
// // //         }}
// // //       >
// // //         Advance Approval Management
// // //       </h2>
// // //       <div>
// // //         <button onClick={toggleManualForm} style={manualButtonStyle}>
// // //           Add Manual Advance Request
// // //         </button>

// // //         {showManualForm && (
// // //           <ManualRequestForm
// // //             onClose={toggleManualForm}
// // //             refreshData={fetchAdvanceRequests}
// // //           />
// // //         )}
// // //       </div>
// // //       {loading ? (
// // //         <p>Loading advance requests...</p>
// // //       ) : advances.length === 0 ? (
// // //         <p>No advance requests available.</p>
// // //       ) : (
// // //         <>
// // //           <h3>Pending Advance Requests</h3>
// // //           <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //             <thead>
// // //               <tr
// // //                 style={{
// // //                   background: "#007bff",
// // //                   color: "white",
// // //                   fontSize: "24px",
// // //                   paddingTop: "2rem",
// // //                 }}
// // //               >
// // //                 <th>Driver Id</th>
// // //                 <th>Driver Name</th>
// // //                 <th>Month</th>
// // //                 <th>Requested Amount</th>
// // //                 <th>Action</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {advances.map((advance) => (
// // //                 <tr
// // //                   key={advance._id}
// // //                   style={{ borderBottom: "1px solid #ddd" }}
// // //                 >
// // //                   <td style={tdStyle}>{advance.driverId}</td>
// // //                   <td style={tdStyle}>{advance.driverName}</td>
// // //                   <td style={tdStyle}>{advance.month}</td>
// // //                   <td style={tdStyle}>₹{advance.requestedAmount}</td>
// // //                   <td style={tdStyle}>
// // //                     <button
// // //                       onClick={() =>
// // //                         handleApproval(
// // //                           advance._id,
// // //                           "Approved",
// // //                           advance.requestedAmount
// // //                         )
// // //                       }
// // //                       style={approveButtonStyle}
// // //                     >
// // //                       Approve
// // //                     </button>
// // //                     <button
// // //                       onClick={() =>
// // //                         handleApproval(
// // //                           advance._id,
// // //                           "Rejected",
// // //                           advance.requestedAmount
// // //                         )
// // //                       }
// // //                       style={rejectButtonStyle}
// // //                     >
// // //                       Reject
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </>
// // //       )}

// // //       {records.length > 0 && (
// // //         <>
// // //           <h3>Records Table</h3>
// // //           <input
// // //             type="text"
// // //             placeholder="Search by Driver Id or Name"
// // //             value={searchTerm}
// // //             onChange={handleSearch}
// // //             style={{ marginBottom: "20px", padding: "10px", width: "99%" }}
// // //           />
// // //           <table style={{ width: "100%", borderCollapse: "collapse",textAlign:"center" }}>
// // //             <thead>
// // //               <tr
// // //                 style={{
// // //                   background: "black",
// // //                   color: "white",
// // //                   fontSize: "24px",
// // //                   paddingTop: "2rem",
// // //                   textAlign: "center",
// // //                   height:"3rem"
// // //                 }}
// // //               >
// // //                 <th>Driver Id</th>
// // //                 <th>Driver Name</th>
// // //                 <th>Date</th>
// // //                 <th>Requested Amount</th>
// // //                 <th>Approved Amount</th>
// // //                 <th>Status</th>
// // //                 <th>Deducted Month</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {filteredRecords.map((record) => (
// // //                 <tr key={record._id} style={{ borderBottom: "1px solid #ddd" }}>
// // //                   <td>{record.driverId}</td>
// // //                   <td>{record.driverName}</td>
// // //                   <td>{record.month}</td>
// // //                   <td>₹{record.requestedAmount}</td>
// // //                   <td>{record.approvalStatus === "Approved" ? `₹${record.approvedAmount}` : "-"}</td>
// // //                   <td style={{ color: record.approvalStatus === "Approved" ? "green" : "red" }}>{record.approvalStatus}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const approveButtonStyle = {
// // //   backgroundColor: "green",
// // //   color: "white",
// // //   border: "none",
// // //   padding: "8px 12px",
// // //   marginRight: "10px",
// // //   cursor: "pointer",
// // //   borderRadius: "5px",
// // // };

// // // const rejectButtonStyle = {
// // //   backgroundColor: "red",
// // //   color: "white",
// // //   border: "none",
// // //   padding: "8px 12px",
// // //   cursor: "pointer",
// // //   borderRadius: "5px",
// // // };

// // // const tdStyle = {
// // //   fontSize: "18px",
// // //   padding: "12px",
// // //   borderBottom: "1px solid #ddd",
// // //   textAlign: "center",
// // // };

// // // const manualButtonStyle = {
// // //   backgroundColor: "black",
// // //   color: "white",
// // //   border: "none",
// // //   padding: "16px 16px",
// // //   marginBottom: "10px",
// // //   cursor: "pointer",
// // //   borderRadius: "5px",
// // //   // padding: "1%",
// // //   fontSize: "20px",
// // //   fontWeight: "bold",
// // // };
// // // export default DriverAdvance;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ManualRequestForm from "./ManualRequestForm";
// // import { saveAs } from "file-saver";

// // const DriverAdvance = () => {
// //   const [advances, setAdvances] = useState([]);
// //   const [records, setRecords] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showManualForm, setShowManualForm] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedDate, setSelectedDate] = useState("");

// //   const [driveId, setDriveId] = useState('');
// //   const [driverName, setDriverName] = useState('');
// //   const [fromDate, setFromDate] = useState('');
// //   const [toDate, setToDate] = useState('');

// //   const toggleManualForm = () => {
// //     setShowManualForm(!showManualForm);
// //   };

// //   // ✅ Fetch advance requests
// //   const fetchAdvanceRequests = async () => {
// //     try {
// //       const pendingResponse = await axios.get(
// //         API_BASE_URL + "/advance/pending"
// //       );
// //       setAdvances(pendingResponse.data);

// //       // 2) Get Approved/Rejected
// //       const recordsResponse = await axios.get(
// //         API_BASE_URL + "/advance/records"
// //       );
// //       setRecords(recordsResponse.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching advance requests:", error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAdvanceRequests();
// //   }, []);

// //   const handleApproval = async (advanceId, status, requestedAmount) => {
// //     let approvedAmount = 0;
// //     if (status === "Approved") {
// //       approvedAmount = parseFloat(prompt(`Enter approved amount:`));

// //       if (
// //         isNaN(approvedAmount) ||
// //         approvedAmount <= 0 ||
// //         approvedAmount > requestedAmount
// //       ) {
// //         alert(
// //           `Invalid approved amount. It should be a number and <= ₹${requestedAmount}`
// //         );
// //         return;
// //       }
// //     }

// //     try {
// //       await axios.post(API_BASE_URL + "/advance/approve", {
// //         advanceId,
// //         status,
// //         approvedAmount,
// //         approvedAt: new Date(), // Save the approval date
// //         adminId: "admin123", // Example adminId
// //         adminName: "Admin User", // Example adminName
// //       });

// //       alert(`Advance ${status} successfully`);
// //       fetchAdvanceRequests(); // <--- Re-fetch your data here!
// //     } catch (error) {
// //       console.error(`Error ${status.toLowerCase()}ing advance request:`, error);
// //       alert("Failed to update advance request");
// //     }
// //   };
// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const filteredRecords = records.filter(
// //     (record) =>
// //       record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const handleDownload = (filterType) => {
// //     let filteredData = records;
// //     if (filterType === "driver" && searchTerm) {
// //       filteredData = records.filter(
// //         (record) =>
// //           record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     } else if (filterType === "date" && selectedDate) {
// //       filteredData = records.filter((record) => record.month === selectedDate);
// //     }

// //     const csvData = [
// //       [
// //         "Driver Id",
// //         "Driver Name",
// //         "Date",
// //         "Requested Amount",
// //         "Approved Amount",
// //         "Status",
// //       ].join(","),
// //     ];
// //     filteredData.forEach((record) => {
// //       csvData.push(
// //         [
// //           record.driverId,
// //           record.driverName,
// //           record.month,
// //           `₹${record.requestedAmount}`,
// //           record.approvalStatus === "Approved"
// //             ? `₹${record.approvedAmount}`
// //             : "-",
// //           record.approvalStatus,
// //         ].join(",")
// //       );
// //     });

// //     const blob = new Blob([csvData.join("\n")], {
// //       type: "text/csv;charset=utf-8;",
// //     });
// //     saveAs(blob, "Advance_Report.csv");
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: "20px",
// //         background: "white",
// //         color: "black",
// //         maxWidth: "90%", // Adjusted for better responsiveness
// //         margin: "auto",
// //         borderRadius: "12px", // Slightly more rounded for a smooth look
// //         marginLeft: "10%",
// //         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for a premium feel
// //         border: "2px solid #FFC107", // Subtle mango yellow border
// //       }}
// //     >
// //       <h2
// //         style={{
// //           textAlign: "center",
// //           fontSize: "34px",
// //           background: "#FFC107",
// //           color: "black",
// //           padding: "12px",
// //           borderRadius: "10px", // More refined border radius
// //           marginBottom: "50px", // Slightly reduced for balanced spacing
// //           fontWeight: "bold",
// //           letterSpacing: "1px",
// //           textTransform: "uppercase", // More impact
// //           boxShadow: "0 3px 6px rgba(255, 193, 7, 0.3)", // Soft glow effect
// //         }}
// //       >
// //         Advance Approval Management
// //       </h2>
// //       <div>
// //         <button onClick={toggleManualForm} style={manualButtonStyle}>
// //           Add Manual Advance Request
// //         </button>

// //         {showManualForm && (
// //           <ManualRequestForm
// //             onClose={toggleManualForm}
// //             refreshData={fetchAdvanceRequests}
// //           />
// //         )}
// //       </div>
// //       {loading ? (
// //         <p>Loading advance requests...</p>
// //       ) : advances.length === 0 ? (
// //         <p>No advance requests available.</p>
// //       ) : (
// //         <>
// //           <h3>Pending Advance Requests</h3>
// //           <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //             <thead>
// //               <tr
// //                 style={{
// //                   background: "#007bff",
// //                   color: "white",
// //                   fontSize: "24px",
// //                   paddingTop: "2rem",
// //                 }}
// //               >
// //                 <th>Driver Id</th>
// //                 <th>Driver Name</th>
// //                 <th>Month</th>
// //                 <th>Requested Amount</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {advances.map((advance) => (
// //                 <tr
// //                   key={advance._id}
// //                   style={{ borderBottom: "1px solid #ddd" }}
// //                 >
// //                   <td style={tdStyle}>{advance.driverId}</td>
// //                   <td style={tdStyle}>{advance.driverName}</td>
// //                   <td style={tdStyle}>{advance.month}</td>
// //                   <td style={tdStyle}>₹{advance.requestedAmount}</td>
// //                   <td style={tdStyle}>
// //                     <button
// //                       onClick={() =>
// //                         handleApproval(
// //                           advance._id,
// //                           "Approved",
// //                           advance.requestedAmount
// //                         )
// //                       }
// //                       style={approveButtonStyle}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       onClick={() =>
// //                         handleApproval(
// //                           advance._id,
// //                           "Rejected",
// //                           advance.requestedAmount
// //                         )
// //                       }
// //                       style={rejectButtonStyle}
// //                     >
// //                       Reject
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </>
// //       )}

// //       {records.length > 0 && (
// //         <>
// //             {/* <div style={{ margin: "20px 0" }}>
// //         <input
// //           type="text"
// //           placeholder="Search by Driver Id or Name"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           style={{ marginRight: "10px", padding: "10px", width: "10%" }}
// //         />
// //         <button
// //           onClick={() => handleDownload("driver")}
// //           style={downloadButtonStyle}
// //         >
// //           Download Filtered Report
// //         </button>
// //       </div>

// //       <div>
// //         <input
// //           type="date"
// //           value={selectedDate}
// //           onChange={(e) => setSelectedDate(e.target.value)}
// //           style={{ marginRight: "10px", padding: "10px" }}
// //         />
// //         <button
// //           onClick={() => handleDownload("date")}
// //           style={downloadButtonStyle}
// //         >
// //           Download Full Report by Date
// //         </button>
// //       </div> */}
// //           <h3>Records Table</h3>
// //           {/* <input
// //             type="text"
// //             placeholder="Search by Driver Id or Name"
// //             value={searchTerm}
// //             onChange={handleSearch}
// //             style={{ marginBottom: "20px", padding: "10px", width: "99%" }}
// //           /> */}
// //           <table
// //             style={{
// //               width: "100%",
// //               borderCollapse: "collapse",
// //               textAlign: "center",
// //             }}
// //           >
// //             <thead>
// //               <tr
// //                 style={{
// //                   background: "black",
// //                   color: "white",
// //                   fontSize: "24px",
// //                   fontWeight: "bold",
// //                   padding: "1rem",
// //                   textAlign: "center",
// //                   height: "4rem",
// //                   letterSpacing: "1px",
// //                   borderBottom: "4px solid #FFC107", // Mango Yellow Border for a premium feel
// //                   boxShadow: "0 4px 8px rgba(255, 193, 7, 0.3)", // Subtle mango yellow glow
// //                   textTransform: "uppercase", // For a sleek header effect
// //                 }}
// //               >
// //                 <th>Driver Id</th>
// //                 <th>Driver Name</th>
// //                 <th>Requested Date</th>
// //                 <th>Requested Amount</th>
// //                 <th>Approved Amount</th>
// //                 <th>Status</th>
// //                 {/* <th>Requested Date</th> */}
// //                 <th>Paid Date</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredRecords.map((record) => (
// //                 <tr key={record._id} style={{ borderBottom: "1px solid #ddd" }}>
// //                   <td>{record.driverId}</td>
// //                   <td>{record.driverName}</td>
// //                   <td>
// //                     {new Date(record.requestedAt).toLocaleString("en-GB", {
// //                       day: "2-digit",
// //                       month: "2-digit",
// //                       year: "numeric",
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                       second: "2-digit",
// //                       hour12: true,
// //                     })}
// //                   </td>
// //                   <td>₹{record.requestedAmount}</td>
// //                   <td>
// //                     {record.approvalStatus === "Approved"
// //                       ? `₹${record.approvedAmount}`
// //                       : "-"}
// //                   </td>
// //                   <td
// //                     style={{
// //                       color:
// //                         record.approvalStatus === "Approved" ? "green" : "red",
// //                     }}
// //                   >
// //                     {record.approvalStatus}
// //                   </td>

// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           <div></div>
// //         </>
// //       )}

// //     </div>
// //   );
// // };

// // const approveButtonStyle = {
// //   backgroundColor: "green",
// //   color: "white",
// //   border: "none",
// //   padding: "8px 12px",
// //   marginRight: "10px",
// //   cursor: "pointer",
// //   borderRadius: "5px",
// // };

// // const rejectButtonStyle = {
// //   backgroundColor: "red",
// //   color: "white",
// //   border: "none",
// //   padding: "8px 12px",
// //   cursor: "pointer",
// //   borderRadius: "5px",
// // };

// // const tdStyle = {
// //   fontSize: "18px",
// //   padding: "12px",
// //   borderBottom: "1px solid #ddd",
// //   textAlign: "center",
// // };

// // const manualButtonStyle = {
// //   backgroundColor: "black",
// //   color: "white",
// //   border: "none",
// //   padding: "16px 16px",
// //   marginBottom: "10px",
// //   cursor: "pointer",
// //   borderRadius: "5px",
// //   // padding: "1%",
// //   fontSize: "20px",
// //   fontWeight: "bold",
// // };
// // const downloadButtonStyle = {
// //   backgroundColor: "black",
// //   color: "white",
// //   border: "none",
// //   padding: "10px 15px",
// //   cursor: "pointer",
// //   borderRadius: "5px",
// //   fontSize: "16px",
// //   fontWeight: "bold",
// // };

// // export default DriverAdvance;

// import React, { useEffect, useState } from "react";

// import axios from "axios";

// import ManualRequestForm from "./ManualRequestForm";

// const DriverAdvance = () => {
//   const [advances, setAdvances] = useState([]);

//   const [records, setRecords] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [showManualForm, setShowManualForm] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [fromDate, setFromDate] = useState("");

//   const [toDate, setToDate] = useState("");

//   const toggleManualForm = () => {
//     setShowManualForm(!showManualForm);
//   };

//   // Fetch Advance Requests

//   const fetchAdvanceRequests = async () => {
//     try {
//       const pendingResponse = await axios.get(
//         API_BASE_URL + "/advance/pending"
//       );

//       setAdvances(pendingResponse.data);

//       const recordsResponse = await axios.get(
//         API_BASE_URL + "/advance/records"
//       );

//       setRecords(recordsResponse.data);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching advance requests:", error);

//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdvanceRequests();
//   }, []);

//   const handleApproval = async (advanceId, status, requestedAmount) => {
//     let approvedAmount = 0;

//     if (status === "Approved") {
//       approvedAmount = parseFloat(prompt(`Enter approved amount:`));

//       if (
//         isNaN(approvedAmount) ||
//         approvedAmount <= 0 ||
//         approvedAmount > requestedAmount
//       ) {
//         alert(
//           `Invalid approved amount. It should be a number and <= ₹${requestedAmount}`
//         );

//         return;
//       }
//     }

//     try {
//       await axios.post(API_BASE_URL + "/advance/approve", {
//         advanceId,

//         status,

//         approvedAmount,

//         approvedAt: new Date(),

//         adminId: "admin123",

//         adminName: "Admin User",
//       });

//       alert(`Advance ${status} successfully`);

//       fetchAdvanceRequests();
//     } catch (error) {
//       console.error(`Error ${status.toLowerCase()}ing advance request:`, error);

//       alert("Failed to update advance request");
//     }
//   };

//   const handleSearch = () => {
//     console.log("Searching with:", { searchTerm, fromDate, toDate });
//   };

//   const handleDownload = () => {
//     console.log("Downloading data...");
//   };

//   const filteredRecords = records.filter(
//     (record) =>
//       record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Advance Approval Management</h2>

//       {/* Manual Advance Request Button */}
//       <div>
//         <button onClick={toggleManualForm} style={manualButtonStyle}>
//           Add Manual Advance Request
//         </button>

//         {showManualForm && (
//           <ManualRequestForm
//             onClose={toggleManualForm}
//             refreshData={fetchAdvanceRequests}
//           />
//         )}
//       </div>

//       {/* Search Component */}
//       <div style={searchContainerStyle}>
//         <h3>Search Records</h3>
//         <input
//           type="text"
//           placeholder="Search by Driver Id or Name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={inputStyle}
//         />
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           style={inputStyle}
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           style={inputStyle}
//         />
//         <div style={{ marginTop: "10px" }}>
//           <button onClick={handleSearch} style={searchButtonStyle}>
//             Search
//           </button>
//           <button onClick={handleDownload} style={downloadButtonStyle}>
//             Download
//           </button>
//         </div>
//       </div>

//       {/* Pending Advance Requests */}

//       {loading ? (
//         <p>Loading advance requests...</p>
//       ) : advances.length === 0 ? (
//         <p>No advance requests available.</p>
//       ) : (
//         <>
//           <h3>Pending Advance Requests</h3>
//           <table style={tableStyle}>
//             <thead>
//               <tr style={theadStyle}>
//                 <th>Driver Id</th>
//                 <th>Driver Name</th>
//                 <th>Month</th>
//                 <th>Requested Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {advances.map((advance) => (
//                 <tr key={advance._id} style={rowStyle}>
//                   <td style={tdStyle}>{advance.driverId}</td>
//                   <td style={tdStyle}>{advance.driverName}</td>
//                   <td style={tdStyle}>{advance.month}</td>
//                   <td style={tdStyle}>₹{advance.requestedAmount}</td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={() =>
//                         handleApproval(
//                           advance._id,
//                           "Approved",
//                           advance.requestedAmount
//                         )
//                       }
//                       style={approveButtonStyle}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleApproval(
//                           advance._id,
//                           "Rejected",
//                           advance.requestedAmount
//                         )
//                       }
//                       style={rejectButtonStyle}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {/* Records Table */}

//       {records.length > 0 && (
//         <>
//           <h3>Records Table</h3>
//           <table style={tableStyle}>
//             <thead>
//               <tr style={theadStyle}>
//                 <th>Driver Id</th>
//                 <th>Driver Name</th>
//                 <th>Date</th>
//                 <th>Requested Amount</th>
//                 <th>Approved Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRecords.map((record) => (
//                 <tr key={record._id} style={rowStyle}>
//                   <td>{record.driverId}</td>
//                   <td>{record.driverName}</td>
//                   <td>{record.month}</td>
//                   <td>₹{record.requestedAmount}</td>
//                   <td>
//                     {record.approvalStatus === "Approved"
//                       ? `₹${record.approvedAmount}`
//                       : "-"}
//                   </td>
//                   <td
//                     style={{
//                       color:
//                         record.approvalStatus === "Approved" ? "green" : "red",
//                     }}
//                   >
//                     {record.approvalStatus}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// // Styles

// const containerStyle = {
//   padding: "20px",

//   background: "white",

//   color: "black",

//   maxWidth: "90%",

//   margin: "2rem 2rem 2rem 14%",

//   borderRadius: "12px",

//   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",

//   border: "2px solid #FFC107",
// };

// const headerStyle = {
//   textAlign: "center",

//   fontSize: "34px",

//   background: "#FFC107",

//   padding: "12px",

//   borderRadius: "10px",

//   marginBottom: "20px",

//   fontWeight: "bold",
// };

// const searchContainerStyle = {
//   marginBottom: "20px",

//   padding: "10px",

//   background: "#f8f9fa",

//   borderRadius: "8px",
// };

// const inputStyle = {
//   padding: "10px",

//   margin: "5px",

//   width: "23%",
// };

// const searchButtonStyle = {
//   backgroundColor: "black",

//   color: "white",

//   padding: "10px",

//   borderRadius: "5px",

//   cursor: "pointer",
// };

// const downloadButtonStyle = {
//   backgroundColor: "#FFC107",

//   color: "black",

//   padding: "10px",

//   borderRadius: "5px",

//   cursor: "pointer",

//   marginLeft: "10px",
// };

// const tableStyle = { width: "100%", borderCollapse: "collapse" };

// const theadStyle = { background: "black", color: "white",textAlign:"center" };

// const rowStyle = { borderBottom: "1px solid #ddd",textAlign:"center" };

// const tdStyle = { padding: "10px", textAlign: "center" };


// const manualButtonStyle = {
//   backgroundColor: "black",
//   color: "white",
//   border: "none",
//   padding: "16px 16px",
//   marginBottom: "10px",
//   cursor: "pointer",
//   borderRadius: "5px",
//   // padding: "1%",
//   fontSize: "20px",
//   fontWeight: "bold",
// };

// const approveButtonStyle = {
//   backgroundColor: "green",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   marginRight: "10px",
//   cursor: "pointer",
//   borderRadius: "5px",
// };

// const rejectButtonStyle = {
//   backgroundColor: "red",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   cursor: "pointer",
//   borderRadius: "5px",
// };

// export default DriverAdvance;


 
const DriverAdvance = () => {
  const [advances, setAdvances] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showManualForm, setShowManualForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 
  const toggleManualForm = () => {
    setShowManualForm(!showManualForm);
  };
 
  // Fetch Advance Requests
  const fetchAdvanceRequests = async () => {
    try {
      const pendingResponse = await axios.get(
        API_BASE_URL + "/advance/pending"
      );
      setAdvances(pendingResponse.data);
 
      const recordsResponse = await axios.get(
        API_BASE_URL + "/advance/records"
      );
      setRecords(recordsResponse.data);
 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching advance requests:", error);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchAdvanceRequests();
  }, []);
 
  const handleApproval = async (advanceId, status, requestedAmount) => {
    let approvedAmount = 0;
 
    if (status === "Approved") {
      approvedAmount = parseFloat(prompt(`Enter approved amount:`));
 
      if (
        isNaN(approvedAmount) ||
        approvedAmount <= 0 ||
        approvedAmount > requestedAmount
      ) {
        alert(
          `Invalid approved amount. It should be a number and <= ₹${requestedAmount}`
        );
        return;
      }
    }
 
    try {
      await axios.post(API_BASE_URL + "/advance/approve", {
        advanceId,
        status,
        approvedAmount,
        approvedAt: new Date(),
        adminId: "admin123",
        adminName: "Admin User",
      });
      alert(`Advance ${status} successfully`);
      fetchAdvanceRequests();
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing advance request:`, error);
      alert("Failed to update advance request");
    }
  };
 
  // eslint-disable-next-line no-unused-vars
  const handleSearch = () => {
    console.log("Searching with:", { searchTerm, statusFilter, startDate, endDate });
  };
 
  const handleDownload = () => {
    console.log("Downloading data...");
 
    // Prepare data for download
    const filteredData = records.filter((record) => {
      const recordDate = new Date(record.month);
      const fromDateValid = startDate ? new Date(startDate) <= recordDate : true;
      const toDateValid = endDate ? new Date(endDate) >= recordDate : true;
 
      const statusValid =
        statusFilter === "All" || record.approvalStatus === statusFilter;
 
      return (
        (record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.driverName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        fromDateValid &&
        toDateValid &&
        statusValid
      );
    });
 
    // You can either convert the filteredData into a CSV format or any other downloadable format
    const csvContent = `Driver Id, Driver Name, Date, Requested Amount, Approved Amount, Status\n` +
    filteredData.map(record =>
      `${record.driverId}, ${record.driverName}, ${record.month}, ₹${record.requestedAmount}, ₹${record.approvedAmount || ''}, ${record.approvalStatus}`
    ).join("\n");
 
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", "advance_records.csv");
      link.click();
    }
  };
 
  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.month);
    const fromDateValid = startDate ? new Date(startDate) <= recordDate : true;
    const toDateValid = endDate ? new Date(endDate) >= recordDate : true;
 
    const statusValid =
      statusFilter === "All" || record.approvalStatus === statusFilter;
 
    return (
      (record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.driverName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      fromDateValid &&
      toDateValid &&
      statusValid
    );
  });
 
  return (
    <div style={styles.containerStyle}>
      <h2 className="sendo-heading">Driver Advance</h2>
      <h2 style={styles.headerStyle}>Advance Approval Management</h2>
 
      {/* Manual Advance Request Button */}
      <div>
        <button onClick={toggleManualForm} style={styles.manualButtonStyle}>
          Add Manual Advance Request
        </button>
 
        {showManualForm && (
          <ManualRequestForm
            onClose={toggleManualForm}
            refreshData={fetchAdvanceRequests}
          />
        )}
      </div>
 
      {/* Filter Container */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by Driver Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.input}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleDownload} style={styles.button}>
          Download
        </button>
      </div>
 
      {/* Pending Advance Requests */}
      {loading ? (
        <p>Loading advance requests...</p>
      ) : advances.length === 0 ? (
        <p>No advance requests available.</p>
      ) : (
        <>
          <h3>Pending Advance Requests</h3>
          <table style={styles.tableStyle}>
            <thead>
              <tr style={styles.theadStyle}>
                <th>Driver Id</th>
                <th>Driver Name</th>
                <th>Month</th>
                <th>Requested Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {advances.map((advance) => (
                <tr key={advance._id} style={styles.rowStyle}>
                  <td style={styles.tdStyle}>{advance.driverId}</td>
                  <td style={styles.tdStyle}>{advance.driverName}</td>
                  <td style={styles.tdStyle}>{advance.month}</td>
                  <td style={styles.tdStyle}>₹{advance.requestedAmount}</td>
                  <td style={styles.tdStyle}>
                    <button
                      onClick={() =>
                        handleApproval(
                          advance._id,
                          "Approved",
                          advance.requestedAmount
                        )
                      }
                      style={styles.approveButtonStyle}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleApproval(
                          advance._id,
                          "Rejected",
                          advance.requestedAmount
                        )
                      }
                      style={styles.rejectButtonStyle}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
 
      {/* Records Table */}
      {records.length > 0 && (
        <>
          <h3>Records Table</h3>
          <table style={styles.tableStyle}>
            <thead>
              <tr style={styles.theadStyle}>
                <th >Driver Id</th>
                <th>Driver Name</th>
                <th>Date</th>
                <th>Requested Amount</th>
                <th>Approved Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record._id} style={styles.rowStyle}>
                  <td style={styles.tdStyle}> {record.driverId}</td>
                  <td style={styles.tdStyle}>{record.driverName}</td>
                  <td style={styles.tdStyle}>{record.month}</td>
                  <td style={styles.tdStyle}>₹{record.requestedAmount}</td>
                  <td style={styles.tdStyle}>
                    {record.approvalStatus === "Approved"
                      ? `₹${record.approvedAmount}`
                      : "-"}
                  </td>
                  <td 
                    style={{
                      color:
                        record.approvalStatus === "Approved" ? "#FFC107" : "black",
                    }}
                  >
                    {record.approvalStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
 
// Styles for the filter section and the entire layout
const styles = {
  containerStyle: {
    padding: "20px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    marginLeft: "270px",
  },
 
  headerStyle: {
    backgroundColor:"#FFC107",
    color: "black", // black header text
    fontSize: "24px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:"45px",
  },
  manualButtonStyle: {
    padding: "10px 15px",
    backgroundColor: "black", // mango yellow button
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom:"5px"
  },
  filterContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "5px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "5px 15px",
    backgroundColor: "black", // mango yellow button
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  theadStyle: {
    backgroundColor: "black", // black header background
    color: "white", // white text color
    height:"40px",
  },
  rowStyle: {
    backgroundColor: "#f9f9f9",
  },
  tdStyle: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  approveButtonStyle: {
    padding: "5px 10px",
    backgroundColor: "#FFC107",
    color: "black",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButtonStyle: {
    padding: "5px 10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    fontWeight: "bold",
    marginLeft:"10px",
    width:"80px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
 
export default DriverAdvance;