import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const AttendanceRecords = () => {
// // //   const [attendanceRecords, setAttendanceRecords] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   // ✅ Fetch All Attendance Records
// // //   const fetchAllAttendance = async () => {
// // //     try {
// // //       const response = await axios.get(API_BASE_URL + "/attendance/all");
// // //       setAttendanceRecords(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching attendance records:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllAttendance();
// // //   }, []);

// // //   // ✅ Date Formatter
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
// // //     return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
// // //   };

// // //   // ✅ Determine Attendance (Present/Absent)
// // //   const getAttendanceStatus = (status) => {
// // //     if (status === "Approved") return "Present";
// // //     if (status === "Rejected") return "Absent";
// // //     return "Pending";
// // //   };

// // //   // ✅ Search Filter
// // //   const filteredRecords = attendanceRecords.filter((record) =>
// // //     record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   // ✅ Styles
// // //   const styles = {
// // //     container: {
// // //       fontFamily: "Arial, sans-serif",
// // //       marginTop: "2%",
// // //       marginLeft: "14%",
// // //       maxWidth: "80%",
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
// // //     searchInput: {
// // //       padding: "10px",
// // //       marginBottom: "20px",
// // //       width: "100%",
// // //       borderRadius: "5px",
// // //       border: "1px solid #ccc",
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
// // //       <h2>Driver Attendance Records</h2>
      
// // //       {/* ✅ Search Input */}
// // //       <input
// // //         type="text"
// // //         placeholder="Search by Driver Name..."
// // //         value={searchTerm}
// // //         onChange={(e) => setSearchTerm(e.target.value)}
// // //         style={styles.searchInput}
// // //       />

// // //       {/* ✅ Records Table */}
// // //       <table style={styles.table}>
// // //         <thead>
// // //           <tr>
// // //             <th style={styles.th}>Driver ID</th>
// // //             <th style={styles.th}>Driver Name</th>
// // //             <th style={styles.th}>Vehicle Number</th>
// // //             <th style={styles.th}>Start Time</th>
// // //             <th style={styles.th}>Stop Time</th>
// // //             <th style={styles.th}>Duration (sec)</th>
// // //             <th style={styles.th}>Status</th>
// // //             <th style={styles.th}>Attendance</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredRecords.map((record) => (
// // //             <tr key={record._id}>
// // //               <td style={styles.td}>{record.driverId}</td>
// // //               <td style={styles.td}>{record.driverName}</td>
// // //               <td style={styles.td}>{record.vehicleNumber}</td>
// // //               <td style={styles.td}>
// // //                 {record.startTime ? parseCustomDate(record.startTime) : "Invalid Date"}
// // //               </td>
// // //               <td style={styles.td}>
// // //                 {record.stopTime ? parseCustomDate(record.stopTime) : "Invalid Date"}
// // //               </td>
// // //               <td style={styles.td}>{record.duration}</td>
// // //               <td style={styles.td}>
// // //                 <span style={styles.statusBadge(record.status)}>
// // //                   {record.status}
// // //                 </span>
// // //               </td>
// // //               <td style={styles.td}>
// // //                 {getAttendanceStatus(record.status)}
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default AttendanceRecords;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
 
// // const AttendanceRecords = () => {
// //   const [attendanceRecords, setAttendanceRecords] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
 
// //   const fetchAllAttendance = async () => {
// //     try {
// //       const response = await axios.get(API_BASE_URL + "/attendance/all");
// //       setAttendanceRecords(response.data);
// //     } catch (error) {
// //       console.error("Error fetching attendance records:", error);
// //     }
// //   };
 
// //   useEffect(() => {
// //     fetchAllAttendance();
// //   }, []);
 
// //   const parseCustomDate = (dateStr) => {
// //     if (!dateStr) return "Invalid Date";
// //     const [datePart, timePart, period] = dateStr.split(" ");
// //     const [day, month, year] = datePart.split("/").map(Number);
// //     const [hours, minutes, seconds] = timePart.split(":").map(Number);
 
// //     let parsedHours = hours;
// //     if (period.toLowerCase() === "pm" && hours !== 12) parsedHours += 12;
// //     else if (period.toLowerCase() === "am" && hours === 12) parsedHours = 0;
 
// //     const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
// //     return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
// //   };
 
// //   const getAttendanceStatus = (status) => {
// //     if (status === "Approved") return "Present";
// //     if (status === "Rejected") return "Absent";
// //     return "Pending";
// //   };
 
// //   const filteredRecords = attendanceRecords.filter((record) =>
// //     record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
// //   );
 
// //   const downloadCSV = (driverId, date) => {
// //     const record = attendanceRecords.find(
// //       (rec) => rec.driverId === driverId && rec.startTime.includes(date)
// //     );
// //     if (!record) return;
 
// //     const csvContent = `Driver ID,Driver Name,Vehicle Number,Start Time,Stop Time,Duration (sec),Status,Attendance\n${record.driverId},${record.driverName},${record.vehicleNumber},${record.startTime},${record.stopTime},${record.duration},${record.status},${getAttendanceStatus(record.status)}`;
   
// //     const blob = new Blob([csvContent], { type: "text/csv" });
// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = `Attendance_${driverId}_${date}.csv`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };
 
// //   const styles = {
// //     container: {
// //       fontFamily: "Arial, sans-serif",
// //       margin: "2% auto",
// //       maxWidth: "80%",
// //       color: "#000",
// //     },
// //     table: {
// //       width: "100%",
// //       borderCollapse: "collapse",
// //       marginTop: "20px",
// //     },
// //     th: {
// //       backgroundColor: "#FFC107",
// //       color: "#000",
// //       padding: "12px",
// //       textAlign: "left",
// //     },
// //     td: {
// //       border: "1px solid #000",
// //       padding: "12px",
// //       color: "#000",
// //     },
// //     searchInput: {
// //       padding: "10px",
// //       marginBottom: "20px",
// //       width: "100%",
// //       borderRadius: "5px",
// //       border: "1px solid #000",
// //     },
// //     button: {
// //       padding: "8px 12px",
// //       margin: "5px",
// //       border: "none",
// //       backgroundColor: "#FFC107",
// //       color: "#000",
// //       cursor: "pointer",
// //       borderRadius: "5px",
// //       fontWeight: "bold",
// //     },
// //     statusBadge: (status) => ({
// //       display: "inline-block",
// //       padding: "5px 12px",
// //       borderRadius: "20px",
// //       backgroundColor:
// //         status === "Approved" ? "#FFC107" : status === "Rejected" ? "#000" : "#FFF",
// //       color: status === "Rejected" ? "#FFF" : "#000",
// //       fontWeight: "bold",
// //       border: "1px solid #000",
// //     }),
// //   };
 
// //   return (
// //     <div style={styles.container}>
// //       <h2>Driver Attendance Records</h2>
// //       <input
// //         type="text"
// //         placeholder="Search by Driver Name..."
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //         style={styles.searchInput}
// //       />
// //       <table style={styles.table}>
// //         <thead>
// //           <tr>
// //             <th style={styles.th}>Driver ID</th>
// //             <th style={styles.th}>Driver Name</th>
// //             <th style={styles.th}>Vehicle Number</th>
// //             <th style={styles.th}>Start Time</th>
// //             <th style={styles.th}>Stop Time</th>
// //             <th style={styles.th}>Duration (sec)</th>
// //             <th style={styles.th}>Status</th>
// //             <th style={styles.th}>Attendance</th>
// //             <th style={styles.th}>Download</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredRecords.map((record) => (
// //             <tr key={record._id}>
// //               <td style={styles.td}>{record.driverId}</td>
// //               <td style={styles.td}>{record.driverName}</td>
// //               <td style={styles.td}>{record.vehicleNumber}</td>
// //               <td style={styles.td}>{record.startTime ? parseCustomDate(record.startTime) : "Invalid Date"}</td>
// //               <td style={styles.td}>{record.stopTime ? parseCustomDate(record.stopTime) : "Invalid Date"}</td>
// //               <td style={styles.td}>{record.duration}</td>
// //               <td style={styles.td}>
// //                 <span style={styles.statusBadge(record.status)}>{record.status}</span>
// //               </td>
// //               <td style={styles.td}>{getAttendanceStatus(record.status)}</td>
// //               <td style={styles.td}>
// //                 <button
// //                   style={styles.button}
// //                   onClick={() => downloadCSV(record.driverId, record.startTime.split(" ")[0])}
// //                 >
// //                   Download
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };
 
// // export default AttendanceRecords;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
 
// const AttendanceRecords = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
 
//   const fetchAllAttendance = async () => {
//     try {
//       const response = await axios.get(API_BASE_URL + "/attendance/all");
//       setAttendanceRecords(response.data);
//     } catch (error) {
//       console.error("Error fetching attendance records:", error);
//     }
//   };
 
//   useEffect(() => {
//     fetchAllAttendance();
//   }, []);
 
//   const parseCustomDate = (dateStr) => {
//     if (!dateStr) return "Invalid Date";
//     const [datePart, timePart, period] = dateStr.split(" ");
//     const [day, month, year] = datePart.split("/").map(Number);
//     const [hours, minutes, seconds] = timePart.split(":").map(Number);
 
//     let parsedHours = hours;
//     if (period.toLowerCase() === "pm" && hours !== 12) parsedHours += 12;
//     else if (period.toLowerCase() === "am" && hours === 12) parsedHours = 0;
 
//     const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
//     return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
//   };
 
//   const getAttendanceStatus = (status) => {
//     if (status === "Approved") return "Present";
//     if (status === "Rejected") return "Absent";
//     return "Pending";
//   };
 
//   const filteredRecords = attendanceRecords.filter((record) =>
//     record.driverName.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   const downloadCSV = (driverId, date) => {
//     const record = attendanceRecords.find(
//       (rec) => rec.driverId === driverId && rec.startTime.includes(date)
//     );
//     if (!record) return;
 
//     const csvContent = `Driver ID,Driver Name,Vehicle Number,Start Time,Stop Time,Duration (sec),Status,Attendance\n${record.driverId},${record.driverName},${record.vehicleNumber},${record.startTime},${record.stopTime},${record.duration},${record.status},${getAttendanceStatus(record.status)}`;
   
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `Attendance_${driverId}_${date}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
 
//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       margin: "2% auto",
//       maxWidth: "80%",
//       color: "#000",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginTop: "20px",
//     },
//     th: {
//       backgroundColor: "#FFC107",
//       color: "#000",
//       padding: "12px",
//       textAlign: "left",
//     },
//     td: {
//       border: "1px solid #000",
//       padding: "12px",
//       color: "#000",
//     },
//     searchInput: {
//       padding: "10px",
//       marginBottom: "20px",
//       width: "100%",
//       borderRadius: "5px",
//       border: "1px solid #000",
//     },
//     button: {
//       padding: "8px 12px",
//       margin: "5px",
//       border: "none",
//       backgroundColor: "#FFC107",
//       color: "#000",
//       cursor: "pointer",
//       borderRadius: "5px",
//       fontWeight: "bold",
//     },
//     statusBadge: (status) => ({
//       display: "inline-block",
//       padding: "5px 12px",
//       borderRadius: "20px",
//       backgroundColor:
//         status === "Approved" ? "#FFC107" : status === "Rejected" ? "#000" : "#FFF",
//       color: status === "Rejected" ? "#FFF" : "#000",
//       fontWeight: "bold",
//       border: "1px solid #000",
//     }),
//   };
 
//   return (
//     <div style={styles.container}>
//       <h2>Driver Attendance Records</h2>
//       <input
//         type="text"
//         placeholder="Search by Driver Name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={styles.searchInput}
//       />
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Driver ID</th>
//             <th style={styles.th}>Driver Name</th>
//             <th style={styles.th}>Vehicle Number</th>
//             <th style={styles.th}>Start Time</th>
//             <th style={styles.th}>Stop Time</th>
//             <th style={styles.th}>Duration (sec)</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Attendance</th>
//             <th style={styles.th}>Download</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.map((record) => (
//             <tr key={record._id}>
//               <td style={styles.td}>{record.driverId}</td>
//               <td style={styles.td}>{record.driverName}</td>
//               <td style={styles.td}>{record.vehicleNumber}</td>
//               <td style={styles.td}>{record.startTime ? parseCustomDate(record.startTime) : "Invalid Date"}</td>
//               <td style={styles.td}>{record.stopTime ? parseCustomDate(record.stopTime) : "Invalid Date"}</td>
//               <td style={styles.td}>{record.duration}</td>
//               <td style={styles.td}>
//                 <span style={styles.statusBadge(record.status)}>{record.status}</span>
//               </td>
//               <td style={styles.td}>{getAttendanceStatus(record.status)}</td>
//               <td style={styles.td}>
//                 <button
//                   style={styles.button}
//                   onClick={() => downloadCSV(record.driverId, record.startTime.split(" ")[0])}
//                 >
//                   Download
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
 
// export default AttendanceRecords;
 
 
const AttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 
  const fetchAllAttendance = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/attendance/all");
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };
 
  useEffect(() => {
    fetchAllAttendance();
  }, []);
 
  // const parseCustomDate = (dateStr) => {
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
    
  //   if (!dateStr) return "Invalid Date";
  //   const [datePart, timePart, period] = dateStr.split(" ");
  //   const [day, month, year] = datePart.split("/").map(Number);
  //   const [hours, minutes, seconds] = timePart.split(":").map(Number);
 
  //   let parsedHours = hours;
  //   if (period.toLowerCase() === "pm" && hours !== 12) parsedHours += 12;
  //   else if (period.toLowerCase() === "am" && hours === 12) parsedHours = 0;
 
  //   const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
  //   return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
  // };
 
  const getAttendanceStatus = (status) => {
    if (status === "Approved") return "Present";
    if (status === "Rejected") return "Absent";
    return "Pending";
  };
 
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || getAttendanceStatus(record.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });
 
  const downloadCSV = (records, filename) => {
    const csvContent = "Driver ID,Driver Name,Vehicle Number,Start Time,Stop Time,Duration (sec),Status, Attendance\n" +
      records.map(record => `${record.driverId},${record.driverName},${record.vehicleNumber},${record.startTime},${record.stopTime},${record.duration},${record.status},${getAttendanceStatus(record.status)}`).join("\n");
 
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
   
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#FFC107", color: "#000",
      padding: "12px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #000",
      padding: "12px",
      color: "#000",
    },
    filterContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
      marginLeft:"5px"
    },
    button: {
      padding: "8px 12px",
      backgroundColor: "#FFC107",
      color: "#000",
      cursor: "pointer",
      borderRadius: "5px",
      fontWeight: "bold",
    },
  };
 
  return (
    <div style={styles.container}>
      <h2 className="sendo-heading">Attendance Records</h2>
      <div style={styles.filterContainer}>
        <input type="text" placeholder="Search by Driver ID, Name, or Vehicle Number" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.input} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.input}>
          <option value="All">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Pending">Pending</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />
        <button onClick={handleDownload} style={styles.button}>Download</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Driver ID</th>
            <th style={styles.th}>Driver Name</th>
            <th style={styles.th}>Vehicle Number</th>
            <th style={styles.th}>Start Time</th>
            <th style={styles.th}>Stop Time</th>
            <th style={styles.th}>Duration (sec)</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id}>
              <td style={styles.td}>{record.driverId}</td>
              <td style={styles.td}>{record.driverName}</td>
              <td style={styles.td}>{record.vehicleNumber}</td>
              <td style={styles.td}>{parseCustomDate(record.startTime)}</td>
              <td style={styles.td}>{parseCustomDate(record.stopTime)}</td>
              <td style={styles.td}>{record.duration}</td>
              <td style={styles.td}>{record.status}</td>
              <td style={styles.td}>{getAttendanceStatus(record.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default AttendanceRecords;
 