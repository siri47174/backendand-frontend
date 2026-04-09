import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const Attendance = () => {
// // // //   const [attendanceRecords, setAttendanceRecords] = useState([]);

// // // //   // ✅ Fetch Attendance Records
// // // //   const fetchAllAttendance = async () => {
// // // //     try {
// // // //       const response = await axios.get(API_BASE_URL + "/attendance/send");
// // // //       setAttendanceRecords(response.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching attendance data:", error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchAllAttendance();
// // // //   }, []);

// // // //   // ✅ Approve or Reject Attendance
// // // //   const handleAttendanceUpdate = async (id, status) => {
// // // //     try {
// // // //       const response = await axios.put(`${API_BASE_URL}/attendance/${id}`, { status });
// // // //       alert(response.data.message);
// // // //       fetchAllAttendance(); // Refresh the list
// // // //     } catch (error) {
// // // //       console.error("Error updating attendance status:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Attendance Records</h2>
// // // //       <table border="1">
// // // //         <thead>
// // // //           <tr>
// // // //             <th>Driver ID</th>
// // // //             <th>Vehicle Number</th>
// // // //             <th>Start Time</th>
// // // //             <th>Stop Time</th>
// // // //             <th>Duration (sec)</th>
// // // //             <th>Status</th>
// // // //             <th>Actions</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {attendanceRecords.map((record) => (
// // // //             <tr key={record._id}>
// // // //               <td>{record.driverId}</td>
// // // //               <td>{record.vehicleNumber}</td>
// // // //               <td>{new Date(record.startTime).toLocaleString()}</td>
// // // //               <td>{new Date(record.stopTime).toLocaleString()}</td>
// // // //               <td>{record.duration}</td>
// // // //               <td>{record.status}</td>
// // // //               <td>
// // // //                 {record.status === "Pending" ? (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={() => handleAttendanceUpdate(record._id, "Approved")}
// // // //                       style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}
// // // //                     >
// // // //                       Approve
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleAttendanceUpdate(record._id, "Rejected")}
// // // //                       style={{ backgroundColor: "red", color: "white" }}
// // // //                     >
// // // //                       Reject
// // // //                     </button>
// // // //                   </>
// // // //                 ) : (
// // // //                   <span>{record.status}</span>
// // // //                 )}
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Attendance;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const Attendance = () => {
// // //   const [attendanceRecords, setAttendanceRecords] = useState([]);

// // //   const fetchAllAttendance = async () => {
// // //     try {
// // //       const response = await axios.get(API_BASE_URL + "/attendance/send");
// // //       setAttendanceRecords(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching attendance data:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllAttendance();
// // //   }, []);

// // //   const handleAttendanceUpdate = async (id, status) => {
// // //     try {
// // //       const response = await axios.put(`${API_BASE_URL}/attendance/${id}`, { status });
// // //       alert(response.data.message);
// // //       fetchAllAttendance();
// // //     } catch (error) {
// // //       console.error("Error updating attendance status:", error);
// // //     }
// // //   };

// // //   const styles = {
// // //     container: {
// // //       fontFamily: "Arial, sans-serif",
// // //       margin: "2rem auto",
// // //       maxWidth: "90%",
// // //     },
// // //     table: {
// // //       width: "100%",
// // //       borderCollapse: "collapse",
// // //       marginTop: "20px",
// // //     },
// // //     th: {
// // //       backgroundColor: "#007bff",
// // //       color: "#fff",
// // //       padding: "12px",
// // //       textAlign: "left",
// // //     },
// // //     td: {
// // //       border: "1px solid #ddd",
// // //       padding: "12px",
// // //       color: "#333",
// // //     },
// // //     buttonApprove: {
// // //       backgroundColor: "#28a745",
// // //       color: "#fff",
// // //       border: "none",
// // //       padding: "8px 16px",
// // //       marginRight: "10px",
// // //       borderRadius: "5px",
// // //       cursor: "pointer",
// // //     },
// // //     buttonReject: {
// // //       backgroundColor: "#dc3545",
// // //       color: "#fff",
// // //       border: "none",
// // //       padding: "8px 16px",
// // //       borderRadius: "5px",
// // //       cursor: "pointer",
// // //     },
// // //     statusBadge: (status) => ({
// // //       display: "inline-block",
// // //       padding: "5px 12px",
// // //       borderRadius: "20px",
// // //       backgroundColor: status === "Approved" ? "#28a745" : status === "Rejected" ? "#dc3545" : "#ffc107",
// // //       color: "#fff",
// // //       fontWeight: "bold",
// // //     }),
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2>Attendance Records</h2>
// // //       <table style={styles.table}>
// // //         <thead>
// // //           <tr>
// // //             <th style={styles.th}>Driver ID</th>
// // //             <th style={styles.th}>Vehicle Number</th>
// // //             <th style={styles.th}>Start Time</th>
// // //             <th style={styles.th}>Stop Time</th>
// // //             <th style={styles.th}>Duration</th>
// // //             <th style={styles.th}>Status</th>
// // //             <th style={styles.th}>Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {attendanceRecords.map((record) => (
// // //             <tr key={record._id}>
// // //               <td style={styles.td}>{record.driverId}</td>
// // //               <td style={styles.td}>{record.vehicleNumber}</td>
// // //               <td style={styles.td}>{new Date(record.startTime).toLocaleString()}</td>
// // //               <td style={styles.td}>{new Date(record.stopTime).toLocaleString()}</td>
// // //               <td style={styles.td}>{record.duration}</td>
// // //               <td style={styles.td}>
// // //                 <span style={styles.statusBadge(record.status)}>{record.status}</span>
// // //               </td>
// // //               <td style={styles.td}>
// // //                 {record.status === "Pending" ? (
// // //                   <>
// // //                     <button
// // //                       onClick={() => handleAttendanceUpdate(record._id, "Approved")}
// // //                       style={styles.buttonApprove}
// // //                     >
// // //                       Approve
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleAttendanceUpdate(record._id, "Rejected")}
// // //                       style={styles.buttonReject}
// // //                     >
// // //                       Reject
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <span> - </span>
// // //                 )}
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default Attendance;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const Attendance = () => {
// // //   const [attendanceRecords, setAttendanceRecords] = useState([]);

// // //   const fetchAllAttendance = async () => {
// // //     try {
// // //       const response = await axios.get(API_BASE_URL + "/attendance/send");
// // //       setAttendanceRecords(response.data);
// // //       console.log(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching attendance data:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllAttendance();
// // //   }, []);

// // //   const handleAttendanceUpdate = async (id, status) => {
// // //     try {
// // //       const response = await axios.put(
// // //         `${API_BASE_URL}/attendance/${id}`,
// // //         { status }
// // //       );
// // //       alert(response.data.message);
// // //       fetchAllAttendance();
// // //     } catch (error) {
// // //       console.error("Error updating attendance status:", error);
// // //     }
// // //   };
// // //   const parseCustomDate = (dateStr) => {
// // //     if (!dateStr) return "Invalid Date";

// // //     const [datePart, timePart, period] = dateStr.split(" ");
// // //     const [day, month, year] = datePart.split("/").map(Number);
// // //     const [hours, minutes, seconds] = timePart.split(":").map(Number);

// // //     let parsedHours = hours;
// // //     if (period.toLowerCase() === "pm" && hours !== 12) {
// // //       parsedHours += 12;
// // //     } else if (period.toLowerCase() === "am" && hours === 12) {
// // //       parsedHours = 0;
// // //     }

// // //     const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);

// // //     if (isNaN(date.getTime())) {
// // //       return "Invalid Date";
// // //     }

// // //     return date.toLocaleString("en-GB", {
// // //       day: "2-digit",
// // //       month: "2-digit",
// // //       year: "numeric",
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //       second: "2-digit",
// // //       hour12: true,
// // //     });
// // //   };

// // //   const styles = {
// // //     container: {
// // //       fontFamily: "Arial, sans-serif",
// // //       marginTop: "2%",
// // //       marginLeft: "14%",
// // //       maxWidth: "auto",
// // //     },
// // //     table: {
// // //       width: "100%",
// // //       borderCollapse: "collapse",
// // //       marginTop: "20px",
// // //     },
// // //     th: {
// // //       backgroundColor: "#007bff",
// // //       color: "#fff",
// // //       padding: "12px",
// // //       textAlign: "left",
// // //     },
// // //     td: {
// // //       border: "1px solid #ddd",
// // //       padding: "12px",
// // //       color: "#333",
// // //     },
// // //     buttonApprove: {
// // //       backgroundColor: "#28a745",
// // //       color: "#fff",
// // //       border: "none",
// // //       padding: "8px 16px",
// // //       marginRight: "10px",
// // //       borderRadius: "5px",
// // //       cursor: "pointer",
// // //     },
// // //     buttonReject: {
// // //       backgroundColor: "#dc3545",
// // //       color: "#fff",
// // //       border: "none",
// // //       padding: "8px 16px",
// // //       borderRadius: "5px",
// // //       cursor: "pointer",
// // //     },
// // //     statusBadge: (status) => ({
// // //       display: "inline-block",
// // //       padding: "5px 12px",
// // //       borderRadius: "20px",
// // //       backgroundColor:
// // //         status === "Approved"
// // //           ? "#28a745"
// // //           : status === "Rejected"
// // //           ? "#dc3545"
// // //           : "#ffc107",
// // //       color: "#fff",
// // //       fontWeight: "bold",
// // //     }),
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2>Attendance Records</h2>
// // //       <table style={styles.table}>
// // //         <thead>
// // //           <tr>
// // //             <th style={styles.th}>Driver ID</th>
// // //             <th style={styles.th}>Driver Name</th>
// // //             <th style={styles.th}>Vehicle Number</th>
// // //             <th style={styles.th}>Start Time</th>
// // //             <th style={styles.th}>Stop Time</th>
// // //             <th style={styles.th}>Duration</th>
// // //             <th style={styles.th}>Status</th>
// // //             <th style={styles.th}>Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {attendanceRecords.map((record) => (
// // //             <tr key={record._id}>
// // //               <td style={styles.td}>{record.driverId}</td>
// // //               <td style={styles.td}>{record.driverName}</td>
// // //               <td style={styles.td}>{record.vehicleNumber}</td>
// // //               <td style={styles.td}>
// // //                 {record.startTime
// // //                   ? parseCustomDate(record.startTime)
// // //                   : "Invalid Date"}
// // //               </td>
// // //               <td style={styles.td}>
// // //                 {record.stopTime
// // //                   ? parseCustomDate(record.stopTime)
// // //                   : "Invalid Date"}
// // //               </td>

// // //               <td style={styles.td}>{record.duration}</td>
// // //               <td style={styles.td}>
// // //                 <span style={styles.statusBadge(record.status)}>
// // //                   {record.status}
// // //                 </span>
// // //               </td>
// // //               <td style={styles.td}>
// // //                 {record.status === "Pending" ? (
// // //                   <>
// // //                     <button
// // //                       onClick={() =>
// // //                         handleAttendanceUpdate(record._id, "Approved")
// // //                       }
// // //                       style={styles.buttonApprove}
// // //                     >
// // //                       Approve
// // //                     </button>
// // //                     <button
// // //                       onClick={() =>
// // //                         handleAttendanceUpdate(record._id, "Rejected")
// // //                       }
// // //                       style={styles.buttonReject}
// // //                     >
// // //                       Reject
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <span> - </span>
// // //                 )}
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default Attendance;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Attendance = () => {
// //   const [attendanceRecords, setAttendanceRecords] = useState([]);

// //   const fetchAllAttendance = async () => {
// //     try {
// //       const response = await axios.get(API_BASE_URL + "/attendance/send");
// //       setAttendanceRecords(response.data);
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error("Error fetching attendance data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllAttendance();
// //   }, []);

// //   const handleAttendanceUpdate = async (id, status) => {
// //     try {
// //       const response = await axios.put(
// //         `${API_BASE_URL}/attendance/${id}`,
// //         { status }
// //       );
// //       alert(response.data.message);
// //       fetchAllAttendance();
// //     } catch (error) {
// //       console.error("Error updating attendance status:", error);
// //     }
// //   };

// //   // const parseCustomDate = (dateStr) => {
// //   //   if (!dateStr) return "Invalid Date";

// //   //   const [datePart, timePart, period] = dateStr.split(" ");
// //   //   const [day, month, year] = datePart.split("/").map(Number);
// //   //   const [hours, minutes, seconds] = timePart.split(":").map(Number);

// //   //   let parsedHours = hours;
// //   //   if (period.toLowerCase() === "pm" && hours !== 12) {
// //   //     parsedHours += 12;
// //   //   } else if (period.toLowerCase() === "am" && hours === 12) {
// //   //     parsedHours = 0;
// //   //   }

// //   //   const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);

// //   //   if (isNaN(date.getTime())) {
// //   //     return "Invalid Date";
// //   //   }

// //   //   return date.toLocaleString("en-GB", {
// //   //     day: "2-digit",
// //   //     month: "2-digit",
// //   //     year: "numeric",
// //   //     hour: "2-digit",
// //   //     minute: "2-digit",
// //   //     second: "2-digit",
// //   //     hour12: true,
// //   //   });
// //   // };
// //   const parseCustomDate = (dateStr) => {
// //     if (!dateStr || typeof dateStr !== "string") {
// //       return "Invalid Date";
// //     }

// //     const [datePart, timePart, period] = dateStr.split(" ");
// //     if (!datePart || !timePart || !period) {
// //       return "Invalid Date";
// //     }

// //     const [day, month, year] = datePart.split("/").map(Number);
// //     const [hours, minutes, seconds] = timePart.split(":").map(Number);

// //     if (
// //       isNaN(day) ||
// //       isNaN(month) ||
// //       isNaN(year) ||
// //       isNaN(hours) ||
// //       isNaN(minutes) ||
// //       isNaN(seconds)
// //     ) {
// //       return "Invalid Date";
// //     }

// //     let adjustedHours = hours;
// //     if (period.toLowerCase() === "pm" && hours !== 12) {
// //       adjustedHours += 12;
// //     } else if (period.toLowerCase() === "am" && hours === 12) {
// //       adjustedHours = 0;
// //     }

// //     const date = new Date(
// //       year,
// //       month - 1,
// //       day,
// //       adjustedHours,
// //       minutes,
// //       seconds
// //     );

// //     if (isNaN(date.getTime())) {
// //       return "Invalid Date";
// //     }

// //     return date.toLocaleString("en-GB", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       second: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   const styles = {
// //     container: {
// //       fontFamily: "Arial, sans-serif",
// //       marginTop: "2%",
// //       marginLeft: "14%",
// //       maxWidth: "auto",
// //     },
// //     table: {
// //       width: "100%",
// //       borderCollapse: "collapse",
// //       marginTop: "20px",
// //     },
// //     th: {
// //       backgroundColor: "#007bff",
// //       color: "#fff",
// //       padding: "12px",
// //       textAlign: "left",
// //     },
// //     td: {
// //       border: "1px solid #ddd",
// //       padding: "12px",
// //       color: "#333",
// //     },
// //     buttonApprove: {
// //       backgroundColor: "#28a745",
// //       color: "#fff",
// //       border: "none",
// //       padding: "8px 16px",
// //       marginRight: "10px",
// //       borderRadius: "5px",
// //       cursor: "pointer",
// //     },
// //     buttonReject: {
// //       backgroundColor: "#dc3545",
// //       color: "#fff",
// //       border: "none",
// //       padding: "8px 16px",
// //       borderRadius: "5px",
// //       cursor: "pointer",
// //     },
// //     statusBadge: (status) => ({
// //       display: "inline-block",
// //       padding: "5px 12px",
// //       borderRadius: "20px",
// //       backgroundColor:
// //         status === "Approved"
// //           ? "#28a745"
// //           : status === "Rejected"
// //           ? "#dc3545"
// //           : "#ffc107",
// //       color: "#fff",
// //       fontWeight: "bold",
// //     }),
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2>Attendance Approvals</h2>
// //       <table style={styles.table}>
// //         <thead>
// //           <tr>
// //             <th style={styles.th}>Driver ID</th>
// //             <th style={styles.th}>Driver Name</th>
// //             <th style={styles.th}>Vehicle Number</th>
// //             <th style={styles.th}>Start Time</th>
// //             <th style={styles.th}>Stop Time</th>
// //             <th style={styles.th}>Duration</th>
// //             <th style={styles.th}>Shift Type</th>
// //             <th style={styles.th}>Shift Detail</th>
// //             <th style={styles.th}>Status</th>
// //             <th style={styles.th}>Present/Absent</th>
// //             <th style={styles.th}>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {attendanceRecords.map((record) => (
// //             <tr key={record._id}>
// //               <td style={styles.td}>{record.driverId}</td>
// //               <td style={styles.td}>{record.driverName}</td>
// //               <td style={styles.td}>{record.vehicleNumber}</td>
// //               <td style={styles.td}>
// //                 {record?.startTime
// //                   ? parseCustomDate(record.startTime)
// //                   : "No Start Time"}
// //               </td>
// //               <td style={styles.td}>
// //                 {record?.stopTime
// //                   ? parseCustomDate(record.stopTime)
// //                   : "No Stop Time"}
// //               </td>

// //               <td style={styles.td}>{record.duration}</td>
// //               <td style={styles.td}>{record.shiftDetail}</td>
// //               <td style={styles.td}>{record.driverShiftLabel}</td>
// //               <td style={styles.td}>
// //                 <span style={styles.statusBadge(record.status)}>
// //                   {record.status}
// //                 </span>
// //               </td>
// //               {/* ✅ Present/Absent Column */}
// //               <td style={styles.td}>
// //                 {record.status === "Approved"
// //                   ? "Present"
// //                   : record.status === "Rejected"
// //                   ? "Absent"
// //                   : "-"}
// //               </td>
// //               <td style={styles.td}>
// //                 {record.status === "Pending" ? (
// //                   <>
// //                     <button
// //                       onClick={() =>
// //                         handleAttendanceUpdate(record._id, "Approved")
// //                       }
// //                       style={styles.buttonApprove}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       onClick={() =>
// //                         handleAttendanceUpdate(record._id, "Rejected")
// //                       }
// //                       style={styles.buttonReject}
// //                     >
// //                       Reject
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <span> - </span>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Attendance;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
 
// const Attendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
 
//   const fetchAllAttendance = async () => {
//     try {
//       const response = await axios.get(API_BASE_URL + "/attendance/send");
//       setAttendanceRecords(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//     }
//   };
 
//   useEffect(() => {
//     fetchAllAttendance();
//   }, []);
 
//   const handleAttendanceUpdate = async (id, status) => {
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/attendance/${id}`,
//         { status }
//       );
//       alert(response.data.message);
//       fetchAllAttendance();
//     } catch (error) {
//       console.error("Error updating attendance status:", error);
//     }
//   };
 
//   // const parseCustomDate = (dateStr) => {
//   //   if (!dateStr) return "Invalid Date";
 
//   //   const [datePart, timePart, period] = dateStr.split(" ");
//   //   const [day, month, year] = datePart.split("/").map(Number);
//   //   const [hours, minutes, seconds] = timePart.split(":").map(Number);
 
//   //   let parsedHours = hours;
//   //   if (period.toLowerCase() === "pm" && hours !== 12) {
//   //     parsedHours += 12;
//   //   } else if (period.toLowerCase() === "am" && hours === 12) {
//   //     parsedHours = 0;
//   //   }
 
//   //   const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
 
//   //   if (isNaN(date.getTime())) {
//   //     return "Invalid Date";
//   //   }
 
//   //   return date.toLocaleString("en-GB", {
//   //     day: "2-digit",
//   //     month: "2-digit",
//   //     year: "numeric",
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //     second: "2-digit",
//   //     hour12: true,
//   //   });
//   // };
//   const parseCustomDate = (dateStr) => {
//     if (!dateStr || typeof dateStr !== "string") {
//       return "Invalid Date";
//     }
 
//     const [datePart, timePart, period] = dateStr.split(" ");
//     if (!datePart || !timePart || !period) {
//       return "Invalid Date";
//     }
 
//     const [day, month, year] = datePart.split("/").map(Number);
//     const [hours, minutes, seconds] = timePart.split(":").map(Number);
 
//     if (
//       isNaN(day) ||
//       isNaN(month) ||
//       isNaN(year) ||
//       isNaN(hours) ||
//       isNaN(minutes) ||
//       isNaN(seconds)
//     ) {
//       return "Invalid Date";
//     }
 
//     let adjustedHours = hours;
//     if (period.toLowerCase() === "pm" && hours !== 12) {
//       adjustedHours += 12;
//     } else if (period.toLowerCase() === "am" && hours === 12) {
//       adjustedHours = 0;
//     }
 
//     const date = new Date(
//       year,
//       month - 1,
//       day,
//       adjustedHours,
//       minutes,
//       seconds
//     );
 
//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }
 
//     return date.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };
 
//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       marginTop: "2%",
//       marginLeft: "10%",
//       maxWidth: "auto",
//       backgroundColor: "white",
//       color: "black",
//       padding: "20px",
//       borderRadius: "8px",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginTop: "20px",
//       backgroundColor: "white",
//     },
//     th: {
//       backgroundColor: "black",
//       color: "white",
//       padding: "12px",
//       textAlign: "left",
//     },
//     td: {
//       border: "1px solid black",
//       padding: "12px",
//       color: "black",
//     },
//     buttonApprove: {
//       backgroundColor: "#FFC107", // Mango Yellow
//       color: "black",
//       border: "none",
//       padding: "8px 16px",
//       marginRight: "10px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//     buttonReject: {
//       backgroundColor: "black",
//       color: "white",
//       border: "none",
//       padding: "8px 16px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontWeight: "bold",
//     },
//     statusBadge: (status) => ({
//       display: "inline-block",
//       padding: "5px 12px",
//       borderRadius: "20px",
//       backgroundColor:
//         status === "Approved"
//           ? "#FFC107" // Mango Yellow for approved
//           : status === "Rejected"
//           ? "black" // Black for rejected
//           : "white", // White for pending
//       color: status === "Pending" ? "black" : "white",
//       fontWeight: "bold",
//       border: status === "Pending" ? "2px solid black" : "none",
//     }),
//   };
 
//   return (
//     <div style={styles.container}>
//       <h2>Attendance Approvals</h2>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Driver ID</th>
//             <th style={styles.th}>Driver Name</th>
//             <th style={styles.th}>Vehicle Number</th>
//             <th style={styles.th}>Start Time</th>
//             <th style={styles.th}>Stop Time</th>
//             <th style={styles.th}>Duration</th>
//             <th style={styles.th}>Shift Type</th>
//             <th style={styles.th}>Shift Detail</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Present/Absent</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceRecords.map((record) => (
//             <tr key={record._id}>
//               <td style={styles.td}>{record.driverId}</td>
//               <td style={styles.td}>{record.driverName}</td>
//               <td style={styles.td}>{record.vehicleNumber}</td>
//               <td style={styles.td}>
//                 {record?.startTime
//                   ? parseCustomDate(record.startTime)
//                   : "No Start Time"}
//               </td>
//               <td style={styles.td}>
//                 {record?.stopTime
//                   ? parseCustomDate(record.stopTime)
//                   : "No Stop Time"}
//               </td>
 
//               <td style={styles.td}>{record.duration}</td>
//               <td style={styles.td}>{record.shiftDetail}</td>
//               <td style={styles.td}>{record.driverShiftLabel}</td>
//               <td style={styles.td}>
//                 <span style={styles.statusBadge(record.status)}>
//                   {record.status}
//                 </span>
//               </td>
//               {/* ✅ Present/Absent Column */}
//               <td style={styles.td}>
//                 {record.status === "Approved"
//                   ? "Present"
//                   : record.status === "Rejected"
//                   ? "Absent"
//                   : "-"}
//               </td>
//               <td style={styles.td}>
//                 {record.status === "Pending" ? (
//                   <>
//                     <button
//                       onClick={() =>
//                         handleAttendanceUpdate(record._id, "Approved")
//                       }
//                       style={styles.buttonApprove}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleAttendanceUpdate(record._id, "Rejected")
//                       }
//                       style={styles.buttonReject}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 ) : (
//                   <span> - </span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
 
// export default Attendance;
 
 

 
const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 
  const fetchAllAttendance = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/attendance/send");
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
 
  useEffect(() => {
    fetchAllAttendance();
  }, []);
 
  const handleAttendanceUpdate = async (id, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/attendance/${id}`, { status });
      alert(response.data.message);
      fetchAllAttendance();
    } catch (error) {
      console.error("Error updating attendance status:", error);
    }
  };
 
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? record.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
 
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      marginLeft: "278px",
      // padding: "40px",
      borderRadius: "8px",
      backgroundColor: "white",
      marginRight:"10px",
      color: "black",
      // width: "80px",
      height: "100%", // Ensures it takes most of the screen height
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      // overflow: "auto",
      
    },
   
    searchContainer: {
      marginBottom: "20px",
      display: "flex",
      alignItem: "center",
      gap: "10px",
      // flexDirection :"column",
      

    },
    searchInput: {
      padding: "8px",
      width: "250px",
      border: "1px solid black",
      borderRadius: "5px",
    },
    filterSelect: {
      padding: "8px",
      border: "1px solid black",
      borderRadius: "5px",
    },
    downloadButton: {
      padding: "8px 16px",
      backgroundColor: "#FFC107",
      color: "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "black",
      color: "white",
      padding: "20px",
      textAlign: "center",
    },
    td: {
      border: "1px solid black",
      padding: "12px",
      color: "black",
    },
    buttonApprove: {
      backgroundColor: "#FFC107",
      color: "black",
      border: "none",
      padding: "8px 16px",
      // marginRight: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    buttonReject: {
      backgroundColor: "black",
      color: "white",
      border: "none",
     
      padding: "8px 16px",
      
      borderRadius: "5px",
      width:"88px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop:"5px"
    },
  };


  const downloadCSV = (records, filename) => {
    const csvContent = "Driver ID,Driver Name,Vehicle Number,Start Time,Stop Time,Duration (sec),Status\n" +
      records.map(record => `${record.driverId},${record.driverName},${record.vehicleNumber},${record.startTime},${record.stopTime},${record.duration},${record.status}`).join("\n");
 
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCustomDate = (dateStr) => {
      if (!dateStr) return "Invalid Date";
    
      const parts = dateStr.split(" ");
      if (parts.length < 3) return "Invalid Date"; // Ensure the expected format
    
      const [datePart, timePart, period] = parts;
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
    
      if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return "Invalid Date";
      }
    
      let parsedHours = hours;
      if (period && typeof period === "string") {
        if (period.toLowerCase() === "pm" && hours !== 12) parsedHours += 12;
        else if (period.toLowerCase() === "am" && hours === 12) parsedHours = 0;
      }
    
      const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
    };
 
  const handleDownload = () => {
    const filteredByDate = attendanceRecords.filter(record => {
      const recordDate = new Date(parseCustomDate(record.startTime)).getTime();
      const start = startDate ? new Date(startDate).getTime() : -Infinity;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      return recordDate >= start && recordDate <= end;
    });
    downloadCSV(filteredByDate, `Attendance_${startDate}_to_${endDate}.csv`);
  };
 
  return (
    <div style={styles.container}>
      <h2 className="sendo-heading">Attendance Approvals</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Driver ID, Name, or Vehicle Number"
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select style={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />
        <button onClick={handleDownload} style={styles.downloadButton}>Download</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Driver ID</th>
            <th style={styles.th}>Driver Name</th>
            <th style={styles.th}>Vehicle Number</th>
            <th style={styles.th}>Start Time</th>
            <th style={styles.th}>Stop Time</th>
            <th style={styles.th}>Duration</th>
            <th style={styles.th}>Shift Type</th>
            <th style={styles.th}>Shift Detail</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id}>
              <td style={styles.td}>{record.driverId}</td>
              <td style={styles.td}>{record.driverName}</td>
              <td style={styles.td}>{record.vehicleNumber}</td>
              <td style={styles.td}>{record.startTime}</td>
              <td style={styles.td}>{record.stopTime}</td>
              <td style={styles.td}>{record.duration}</td>
              <td style={styles.td}>{record.shiftDetail}</td>
              <td style={styles.td}>{record.driverShiftLabel}</td>
              <td style={styles.td}>{record.status}</td>
              <td style={styles.td}>
                <button style={styles.buttonApprove} onClick={() => handleAttendanceUpdate(record._id, "Approved")}>
                  Approve
                </button>
                <button style={styles.buttonReject} onClick={() => handleAttendanceUpdate(record._id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Attendance;