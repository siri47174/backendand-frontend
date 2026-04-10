// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";

// const LeaveRequest = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [leaveType, setLeaveType] = useState({});
//   const [editMode, setEditMode] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [filterDriverId, setFilterDriverId] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterStartDate, setFilterStartDate] = useState("");
//   const [filterEndDate, setFilterEndDate] = useState("");

//   useEffect(() => {
//     fetchLeaveRequests();
//   }, []);

//   const fetchLeaveRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(API_BASE_URL + "/advance/leaves");
//       setLeaveRequests(response.data);
//     } catch (error) {
//       console.error("Error fetching leave requests:", error);
//     }
//     setLoading(false);
//   };

//   const handleAction = async (id, status) => {
//     if (status === "Approved" && !leaveType[id]) {
//       alert("Please select leave type before approving.");
//       return;
//     }
//     try {
//       await axios.put(`${API_BASE_URL}/advance/leaves/${id}`, {
//         status,
//         leaveType: leaveType[id] || null,
//       });
//       fetchLeaveRequests();
//     } catch (error) {
//       console.error(`Error updating leave status:`, error);
//     }
//   };

//   const handleEdit = (id, request) => {
//     setEditMode(id);
//     setEditedData(request);
//   };

//   const handleEditChange = (e, field) => {
//     setEditedData({ ...editedData, [field]: e.target.value });
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`${API_BASE_URL}/advance/leaves/${id}`, editedData);
//       setEditMode(null);
//       fetchLeaveRequests();
//     } catch (error) {
//       console.error("Error updating leave request:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this leave request?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/advance/leaves/${id}`);
//         fetchLeaveRequests();
//       } catch (error) {
//         console.error("Error deleting leave request:", error);
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   const styles = {
//     container: {
//       fontFamily: "Arial, sans-serif",
//       margin: "2% auto",
//       maxWidth: "calc(100% - 20%)",
//       marginLeft: "270px",
//       padding: "20px",
//       borderRadius: "8px",
//       backgroundColor: "white",
//       color: "black",
//       overflowX: "auto",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginTop: "20px",
//     },
//     th: {
//       backgroundColor: "#FFC107", color: "#000",
//       padding: "12px",
//       textAlign: "left",
//     },
//     td: {
//       border: "1px solid #000",
//       padding: "12px",
//       color: "black",
//       textAlign: "center",
//     },
//     thT:{
//       border: "1px solid #ccc",
//       padding: "8px",
//       textAlign: "center",
//       backgroundColor: "#FFC107", color: "#000",

//     },
//     button: {
//       padding: "8px 12px",
//       borderRadius: "5px",
//       cursor: "pointer",
     
//     },
    
//     approve: {
//       backgroundColor: "#FFC107",
//       color: "black",
//       fontWeight: "bold",
//     },
//     reject: {
//       backgroundColor: "#FFC107", color: "#000",
//       fontWeight: "bold",
//     },
//     edit: {
//       backgroundColor: "#FFC107",
//       color: "black",
//       fontWeight: "bold",
//     },
//     delete: {
//       backgroundColor: "#FFC107", color: "#000",
//       fontWeight: "bold",
//     },
//     update: {
//       backgroundColor: "#FFC107",
//       color: "black",
//       fontWeight: "bold",
//     },
//     select: {
//       padding: "8px",
//       borderRadius: "4px",
//       marginRight: "8px",
//     },
//     heading: {
//       fontSize: "24px",
//       fontWeight: "bold",
//       marginBottom: "16px",
//       backgroundColor: "#FFC107",
//       color: "black",
//       padding: "10px",
//       textAlign: "center",
//     },
//     filterContainer: {
//       marginBottom: "20px",
//       display: "flex",
//       gap: "10px",
//       flexWrap: "wrap",
//     },
//     filterInput: {
//       padding: "8px",
//       borderRadius: "4px",
//       border: "1px solid #ccc",
//     },
//     filterSelect: {
//       padding: "8px",
//       borderRadius: "4px",
//       border: "1px solid #ccc",
//     },
//   };

//   const parseCustomDate = (dateStr) => {
//       if (!dateStr) return "Invalid Date";
    
//       const parts = dateStr.split(" ");
//       if (parts.length < 3) return "Invalid Date"; // Ensure the expected format
    
//       const [datePart, timePart, period] = parts;
//       const [day, month, year] = datePart.split("/").map(Number);
//       const [hours, minutes, seconds] = timePart.split(":").map(Number);
    
//       if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
//         return "Invalid Date";
//       }
    
//       let parsedHours = hours;
//       if (period && typeof period === "string") {
//         if (period.toLowerCase() === "pm" && hours !== 12) parsedHours += 12;
//         else if (period.toLowerCase() === "am" && hours === 12) parsedHours = 0;
//       }
    
//       const date = new Date(year, month - 1, day, parsedHours, minutes, seconds);
//       return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB");
//     };

//   const downloadCSV = (records, filename) => {
//     const csvContent = "Driver ID, Start Date, End Date, Reason, Status, Leave Type\n" +
//       records.map(record => `${record.driverId},${record.startDate},${record.endDate},${record.reason},${record.status},${record.leaveType}`).join("\n");
 
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };  

//   const handleDownload = () => {
//     const filteredByDate = leaveRequests.filter(record => {
//       const recordDate = new Date(parseCustomDate(record.startTime)).getTime();
//       const start = filterStartDate ? new Date(filterStartDate).getTime() : -Infinity;
//       const end = filterEndDate ? new Date(filterEndDate).getTime() : Infinity;
//       return recordDate >= start && recordDate <= end;
//     });
//     console.log(leaveRequests, filteredByDate);
//     downloadCSV(filteredByDate, `Attendance_${filterStartDate}_to_${filterEndDate}.csv`);
//   };

//   const filteredRequests = leaveRequests.filter((request) => {
//     const driverIdMatch = !filterDriverId || request.driverId.toLowerCase().includes(filterDriverId.toLowerCase());
//     const statusMatch = !filterStatus || request.status === filterStatus;
    
//     return driverIdMatch && statusMatch;
//   });

//   const pendingRequests = filteredRequests.filter((req) => req.status === "Pending");
//   const processedRequests = filteredRequests.filter((req) => req.status !== "Pending");

//   return (
//     <div style={styles.container}>
//       <h2 className="sendo-heading">Leave Requests</h2>

//       <div style={styles.filterContainer}>
//         <input
//           type="text"
//           placeholder="Filter by Driver ID"
//           value={filterDriverId}
//           onChange={(e) => setFilterDriverId(e.target.value)}
//           style={styles.filterInput}
//         />
//         <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.filterSelect}>
//           <option value="">All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//         <input
//           type="date"
//           value={filterStartDate}
//           onChange={(e) => setFilterStartDate(e.target.value)}
//           style={styles.filterInput}
//         />
//         <input
//           type="date"
//           value={filterEndDate}
//           onChange={(e) => setFilterEndDate(e.target.value)}
//           style={styles.filterInput}
//         />
//         <button onClick={handleDownload} style={styles.downloadButton}>Download</button>
//       </div>

//       {loading ? (
//         <p>Loading leave requests...</p>
//       ) : (
//         <>
//           <h3>Pending Requests</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.thT}>Driver ID</th>
//                 <th style={styles.thT}>Start Date</th>
//                 <th style={styles.thT}>End Date</th>
//                 <th style={styles.thT}>Reason</th>
//                 <th style={styles.thT}>Status</th>
//                 <th style={styles.thT}>Leave Type</th>
//                 <th style={styles.thT}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingRequests.map((request) => (
//                 <tr key={request._id}>
//                   <td style={styles.td}>{request.driverId}</td>
//                   <td style={styles.td}>{formatDate(request.startDate)}</td>
//                   <td style={styles.td}>{formatDate(request.endDate)}</td>
//                   <td style={styles.td}>{request.reason}</td>
//                   <td style={styles.td}>{request.status}</td>
//                   <td style={styles.td}>
//                     <select
//                       style={styles.select}
//                       onChange={(e) =>
//                         setLeaveType({ ...leaveType, [request._id]: e.target.value })
//                       }
//                     >
//                       <option value="">Select Leave Type</option>
//                       <option value="Paid Leave">Paid Leave</option>
//                       <option value="Unpaid Leave">Unpaid Leave</option>
//                     </select>
//                   </td>
//                   <td style={styles.td}>
//                     <button
//                       style={{ ...styles.button, ...styles.approve }}
//                       onClick={() => handleAction(request._id, "Approved")}
//                       disabled={!leaveType[request._id]}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       style={{ ...styles.button, ...styles.reject }}
//                       onClick={() => handleAction(request._id, "Rejected")}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <h3>Approved / Rejected Requests</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.thT}>Driver ID</th>
//                 <th style={styles.thT}>Start Date</th>
//                 <th style={styles.thT}>End Date</th>
//                 <th style={styles.thT}>Reason</th>
//                 <th style={styles.thT}>Status</th>
//                 <th style={styles.thT}>Leave Type</th>
//                 <th style={styles.thT}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {processedRequests.map((request) => (
//                 <tr key={request._id}>
//                   <td style={styles.td}>{request.driverId}</td>
//                   <td style={styles.td}>{formatDate(request.startDate)}</td>
//                   <td style={styles.td}>{formatDate(request.endDate)}</td>
//                   <td style={styles.td}>
//                     {editMode === request._id ? (
//                       <input value={editedData.reason} onChange={(e) => handleEditChange(e, "reason")} />
//                     ) : (
//                       request.reason
//                     )}
//                   </td>
//                   <td style={styles.td}>{request.status}</td>
//                   <td style={styles.td}>{request.leaveType || "-"}</td>
//                   <td style={styles.td}>
//                     {editMode === request._id ? (
//                       <button style={{ ...styles.button, ...styles.update }} onClick={() => handleUpdate(request._id)}>
//                         Update
//                       </button>
//                     ) : (
//                       <>
//                         <button style={{ ...styles.button, ...styles.edit }} onClick={() => handleEdit(request._id, request)}>
//                           Edit
//                         </button>
//                         <button style={{ ...styles.button, ...styles.delete }} onClick={() => handleDelete(request._id)}>
//                           Delete
//                         </button>
//                       </>
//                     )}
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

// export default LeaveRequest;
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [filterDriverId, setFilterDriverId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

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
    innerPad: { padding: "20px" },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
      borderBottom: "2px solid #FFC107",
      paddingBottom: "6px",
      marginBottom: "16px",
      marginTop: "10px",
    },
    filterRow: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    input: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      outline: "none",
    },
    searchInput: {
      padding: "8px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#000",
      outline: "none",
      width: "200px",
    },
    btnYellow: {
      padding: "8px 18px",
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    btnBlack: {
      padding: "6px 14px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
      marginLeft: "4px",
    },
    btnGreen: {
      padding: "6px 14px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
      marginRight: "4px",
    },
    btnRed: {
      padding: "6px 14px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    },
    btnUpdate: {
      padding: "6px 14px",
      backgroundColor: "#FFC107",
      color: "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: "24px" },
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
    },
    select: {
      padding: "7px 10px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "13px",
      color: "#000",
      backgroundColor: "#fff",
    },
    editInput: {
      padding: "6px 8px",
      border: "1.5px solid #000",
      borderRadius: "4px",
      fontSize: "13px",
      width: "100%",
    },
    badgeGreen: {
      backgroundColor: "#e8f5e9", color: "#2e7d32",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #2e7d32",
    },
    badgeRed: {
      backgroundColor: "#ffebee", color: "#c62828",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #c62828",
    },
    badgeYellow: {
      backgroundColor: "#fff8e1", color: "#f57f17",
      padding: "3px 10px", borderRadius: "12px",
      fontWeight: "bold", fontSize: "13px",
      border: "1px solid #f57f17",
    },
  };

  useEffect(() => { fetchLeaveRequests(); }, []);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL + "/advance/leaves");
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
    setLoading(false);
  };

  const handleAction = async (id, status) => {
    if (status === "Approved" && !leaveType[id]) {
      alert("Please select leave type before approving.");
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/advance/leaves/${id}`, {
        status, leaveType: leaveType[id] || null,
      });
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const handleEdit = (id, request) => { setEditMode(id); setEditedData(request); };
  const handleEditChange = (e, field) => setEditedData({ ...editedData, [field]: e.target.value });

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/advance/leaves/${id}`, editedData);
      setEditMode(null);
      fetchLeaveRequests();
    } catch (error) { console.error("Error updating:", error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this leave request?")) {
      try {
        await axios.delete(`${API_BASE_URL}/advance/leaves/${id}`);
        fetchLeaveRequests();
      } catch (error) { console.error("Error deleting:", error); }
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

  const handleDownload = () => {
    const csv = "Driver ID,Start Date,End Date,Reason,Status,Leave Type\n" +
      leaveRequests.map(r => `${r.driverId},${r.startDate},${r.endDate},${r.reason},${r.status},${r.leaveType || ""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `LeaveRequests.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRequests = leaveRequests.filter(req => {
    const driverMatch = !filterDriverId || req.driverId.toLowerCase().includes(filterDriverId.toLowerCase());
    const statusMatch = !filterStatus || req.status === filterStatus;
    return driverMatch && statusMatch;
  });

  const pendingRequests = filteredRequests.filter(r => r.status === "Pending");
  const processedRequests = filteredRequests.filter(r => r.status !== "Pending");

  const getStatusBadge = (status) => {
    if (status === "Approved") return <span style={styles.badgeGreen}>Approved</span>;
    if (status === "Rejected") return <span style={styles.badgeRed}>Rejected</span>;
    return <span style={styles.badgeYellow}>Pending</span>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>LEAVE REQUESTS</div>

      <div style={styles.innerPad}>

        {/* Filters */}
        <div style={styles.filterRow}>
          <input type="text" style={styles.searchInput}
            placeholder="Filter by Driver ID"
            value={filterDriverId} onChange={e => setFilterDriverId(e.target.value)} />
          <select style={styles.input} value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="date" style={styles.input}
            value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} />
          <input type="date" style={styles.input}
            value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} />
          <button style={styles.btnYellow} onClick={handleDownload}>Download</button>
        </div>

        {loading ? (
          <p style={{ color: "#888", fontSize: "14px" }}>Loading leave requests...</p>
        ) : (
          <>
            {/* Pending Requests */}
            <div style={styles.sectionTitle}>Pending Requests</div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Driver ID", "Start Date", "End Date", "Reason",
                      "Status", "Leave Type", "Actions"].map(h => (
                      <th style={styles.th} key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.length > 0 ? pendingRequests.map((request, i) => (
                    <tr key={request._id}
                      style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={styles.td}>{request.driverId}</td>
                      <td style={styles.td}>{formatDate(request.startDate)}</td>
                      <td style={styles.td}>{formatDate(request.endDate)}</td>
                      <td style={styles.td}>{request.reason}</td>
                      <td style={styles.td}>{getStatusBadge(request.status)}</td>
                      <td style={styles.td}>
                        <select style={styles.select}
                          onChange={e => setLeaveType({ ...leaveType, [request._id]: e.target.value })}>
                          <option value="">Select Type</option>
                          <option value="Paid Leave">Paid Leave</option>
                          <option value="Unpaid Leave">Unpaid Leave</option>
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button style={styles.btnGreen}
                          onClick={() => handleAction(request._id, "Approved")}
                          disabled={!leaveType[request._id]}>
                          Approve
                        </button>
                        <button style={styles.btnRed}
                          onClick={() => handleAction(request._id, "Rejected")}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "20px" }}>
                        No pending requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Approved / Rejected */}
            <div style={styles.sectionTitle}>Approved / Rejected Requests</div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Driver ID", "Start Date", "End Date", "Reason",
                      "Status", "Leave Type", "Actions"].map(h => (
                      <th style={styles.th} key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processedRequests.length > 0 ? processedRequests.map((request, i) => (
                    <tr key={request._id}
                      style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={styles.td}>{request.driverId}</td>
                      <td style={styles.td}>{formatDate(request.startDate)}</td>
                      <td style={styles.td}>{formatDate(request.endDate)}</td>
                      <td style={styles.td}>
                        {editMode === request._id ? (
                          <input style={styles.editInput}
                            value={editedData.reason}
                            onChange={e => handleEditChange(e, "reason")} />
                        ) : request.reason}
                      </td>
                      <td style={styles.td}>{getStatusBadge(request.status)}</td>
                      <td style={styles.td}>{request.leaveType || "—"}</td>
                      <td style={styles.td}>
                        {editMode === request._id ? (
                          <button style={styles.btnUpdate}
                            onClick={() => handleUpdate(request._id)}>
                            Update
                          </button>
                        ) : (
                          <>
                            <button style={styles.btnYellow}
                              onClick={() => handleEdit(request._id, request)}>
                              Edit
                            </button>
                            <button style={styles.btnBlack}
                              onClick={() => handleDelete(request._id)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} style={{ ...styles.td, textAlign: "center", color: "#aaa", padding: "20px" }}>
                        No processed requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;