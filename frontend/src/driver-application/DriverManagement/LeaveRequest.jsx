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

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

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
        status,
        leaveType: leaveType[id] || null,
      });
      fetchLeaveRequests();
    } catch (error) {
      console.error(`Error updating leave status:`, error);
    }
  };

  const handleEdit = (id, request) => {
    setEditMode(id);
    setEditedData(request);
  };

  const handleEditChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/advance/leaves/${id}`, editedData);
      setEditMode(null);
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        await axios.delete(`${API_BASE_URL}/advance/leaves/${id}`);
        fetchLeaveRequests();
      } catch (error) {
        console.error("Error deleting leave request:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "2% auto",
      maxWidth: "calc(100% - 20%)",
      marginLeft: "270px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "white",
      color: "black",
      overflowX: "auto",
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
      color: "black",
      textAlign: "center",
    },
    thT:{
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "center",
      backgroundColor: "#FFC107", color: "#000",

    },
    button: {
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
     
    },
    
    approve: {
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
    },
    reject: {
      backgroundColor: "#FFC107", color: "#000",
      fontWeight: "bold",
    },
    edit: {
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
    },
    delete: {
      backgroundColor: "#FFC107", color: "#000",
      fontWeight: "bold",
    },
    update: {
      backgroundColor: "#FFC107",
      color: "black",
      fontWeight: "bold",
    },
    select: {
      padding: "8px",
      borderRadius: "4px",
      marginRight: "8px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      backgroundColor: "#FFC107",
      color: "black",
      padding: "10px",
      textAlign: "center",
    },
    filterContainer: {
      marginBottom: "20px",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    filterInput: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    filterSelect: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
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

  const downloadCSV = (records, filename) => {
    const csvContent = "Driver ID, Start Date, End Date, Reason, Status, Leave Type\n" +
      records.map(record => `${record.driverId},${record.startDate},${record.endDate},${record.reason},${record.status},${record.leaveType}`).join("\n");
 
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  const handleDownload = () => {
    const filteredByDate = leaveRequests.filter(record => {
      const recordDate = new Date(parseCustomDate(record.startTime)).getTime();
      const start = filterStartDate ? new Date(filterStartDate).getTime() : -Infinity;
      const end = filterEndDate ? new Date(filterEndDate).getTime() : Infinity;
      return recordDate >= start && recordDate <= end;
    });
    console.log(leaveRequests, filteredByDate);
    downloadCSV(filteredByDate, `Attendance_${filterStartDate}_to_${filterEndDate}.csv`);
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const driverIdMatch = !filterDriverId || request.driverId.toLowerCase().includes(filterDriverId.toLowerCase());
    const statusMatch = !filterStatus || request.status === filterStatus;
    
    return driverIdMatch && statusMatch;
  });

  const pendingRequests = filteredRequests.filter((req) => req.status === "Pending");
  const processedRequests = filteredRequests.filter((req) => req.status !== "Pending");

  return (
    <div style={styles.container}>
      <h2 className="sendo-heading">Leave Requests</h2>

      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filter by Driver ID"
          value={filterDriverId}
          onChange={(e) => setFilterDriverId(e.target.value)}
          style={styles.filterInput}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.filterSelect}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          style={styles.filterInput}
        />
        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          style={styles.filterInput}
        />
        <button onClick={handleDownload} style={styles.downloadButton}>Download</button>
      </div>

      {loading ? (
        <p>Loading leave requests...</p>
      ) : (
        <>
          <h3>Pending Requests</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thT}>Driver ID</th>
                <th style={styles.thT}>Start Date</th>
                <th style={styles.thT}>End Date</th>
                <th style={styles.thT}>Reason</th>
                <th style={styles.thT}>Status</th>
                <th style={styles.thT}>Leave Type</th>
                <th style={styles.thT}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request._id}>
                  <td style={styles.td}>{request.driverId}</td>
                  <td style={styles.td}>{formatDate(request.startDate)}</td>
                  <td style={styles.td}>{formatDate(request.endDate)}</td>
                  <td style={styles.td}>{request.reason}</td>
                  <td style={styles.td}>{request.status}</td>
                  <td style={styles.td}>
                    <select
                      style={styles.select}
                      onChange={(e) =>
                        setLeaveType({ ...leaveType, [request._id]: e.target.value })
                      }
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Paid Leave">Paid Leave</option>
                      <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.approve }}
                      onClick={() => handleAction(request._id, "Approved")}
                      disabled={!leaveType[request._id]}
                    >
                      Approve
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.reject }}
                      onClick={() => handleAction(request._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Approved / Rejected Requests</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thT}>Driver ID</th>
                <th style={styles.thT}>Start Date</th>
                <th style={styles.thT}>End Date</th>
                <th style={styles.thT}>Reason</th>
                <th style={styles.thT}>Status</th>
                <th style={styles.thT}>Leave Type</th>
                <th style={styles.thT}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedRequests.map((request) => (
                <tr key={request._id}>
                  <td style={styles.td}>{request.driverId}</td>
                  <td style={styles.td}>{formatDate(request.startDate)}</td>
                  <td style={styles.td}>{formatDate(request.endDate)}</td>
                  <td style={styles.td}>
                    {editMode === request._id ? (
                      <input value={editedData.reason} onChange={(e) => handleEditChange(e, "reason")} />
                    ) : (
                      request.reason
                    )}
                  </td>
                  <td style={styles.td}>{request.status}</td>
                  <td style={styles.td}>{request.leaveType || "-"}</td>
                  <td style={styles.td}>
                    {editMode === request._id ? (
                      <button style={{ ...styles.button, ...styles.update }} onClick={() => handleUpdate(request._id)}>
                        Update
                      </button>
                    ) : (
                      <>
                        <button style={{ ...styles.button, ...styles.edit }} onClick={() => handleEdit(request._id, request)}>
                          Edit
                        </button>
                        <button style={{ ...styles.button, ...styles.delete }} onClick={() => handleDelete(request._id)}>
                          Delete
                        </button>
                      </>
                    )}
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

export default LeaveRequest;