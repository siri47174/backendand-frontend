import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Salary = () => {
//   const driverDetails = JSON.parse(sessionStorage.getItem("driverDetails"));
//   // const driverId = driverDetails?.driverId || "";
//   const driverName = driverDetails?.driverName || "";
//   const driverId = "DE0001";
//   const currentDate = new Date();
//   const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [salaryData, setSalaryData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const fetchSalaryData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/advance/payout/${driverId}/${selectedMonth}`);
//       console.log(selectedMonth);
//       setSalaryData(response.data || {});
//     } catch (error) {
//       console.error("Error fetching salary data:", error);
//     }
//     setLoading(false);
//   };

//   const handleApprove = async(driverId, selectedMonth)=>{
//     try{
//       const response = await axios.get(`${API_BASE_URL}/payment/approve/${driverId}/${selectedMonth}`);
//       console.log(response)
//     }
//     catch(error){
//       console.log("Something Went Wrong!!!");
//     }
//   }

//   useEffect(() => {
//     fetchSalaryData();
//   }, []);

//   if (loading) return <p>Loading salary data...</p>;
  
//   return (
//     <div style={styles.container}>
      <h2 className="sendo-heading">Driver Salary</h2>
//       <h2 style={styles.header}>Salary Details</h2>
//       <h3 style={styles.subHeader}>Salary Summary ({selectedMonth})</h3>
//     <table style={styles.table}>
//   <thead>
//     <tr>
//       <th>Salary Month</th>
//       <th>Driver ID</th>
//       <th>Driver Name</th>
//       <th>No. of Days</th>
//       <th>Basic Payment</th>
//       <th>Per Day Payment</th>
//       <th>No. of Working Days</th>
//       <th>Earned Payment</th>
//       <th>Absent</th>
//       <th>Referral Bonus</th>
//       <th>Advance Deduction</th>
//       <th>Other Deductions</th>
//       <th>Payable Amount</th>
//       <th>Approval Status</th>
//       <th>Paid Amount</th>
//       <th>Paid Date</th>
//       <th>Remarks</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>{selectedMonth}</td>
//       <td>{driverId}</td>
//       <td>{driverName}</td>
//       <td>{salaryData.totalDays || ""}</td>
//       <td>₹{salaryData.basicPayment || ""}</td>
//       <td>₹{salaryData.dailyWage || ""}</td>
//       <td>{salaryData.totalWorkingDays || ""}</td>
//       <td>₹{salaryData.earnedPayment || ""}</td>
//       <td>{salaryData.totalHolidays || ""}</td>
//       <td>₹{salaryData.referralBonus || ""}</td>
//       <td>₹{salaryData.totalAdvanceDeduction || ""}</td>
//       <td>₹{salaryData.deductions || ""}</td>
//       <td>₹{salaryData.payableAmount || ""}</td>
//       <td>{salaryData.approvalStatus || ""}</td>
//       <td>₹{salaryData.paidAmount || ""}</td>
//       <td>{salaryData.paidDate || ""}</td>
//       <td>{salaryData.remarks || ""}</td>
//     </tr>
//   </tbody>
// </table>
//       <button onClick={()=>handleApprove(driverId, selectedMonth)}>Approve</button>
//     </div>
//   );
// };


// const styles = {
//   container: { Width: "100%", margin: "40px auto", padding: "20px", border: "2px solid black", textAlign: "center" },
//   header: { background: "black", color: "#FFC107", padding: "15px" },
//   subHeader: { color: "black", marginBottom: "10px" },
//   table: { width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "2px solid black" },
//   payableRow: { background: "#FFC107", fontWeight: "bold" },
// };

// export default Salary;


const Salary = () => {
  const driverDetails = JSON.parse(sessionStorage.getItem("driverDetails"));
  const driverName = driverDetails?.driverName || "";
  const driverId = "DE0001"; // Or driverDetails?.driverId || ""
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [salaryData, setSalaryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSalaryData, setFilteredSalaryData] = useState([]);

  const fetchSalaryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/advance/payout/${driverId}/${selectedMonth}`
      );
      setSalaryData(response.data || {});
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
    setLoading(false);
  };

  const handleApprove = async (driverId, selectedMonth) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment/approve/${driverId}/${selectedMonth}`
      );
      console.log(response);
    } catch (error) {
      console.log("Something Went Wrong!!!");
    }
  };

  const handleDownload = () => {
    // Implement your download logic here
    console.log("Download clicked");
  };

  useEffect(() => {
    fetchSalaryData();
  }, [selectedMonth]); // Fetch data on month change

  useEffect(() => {
    // Filter salary data based on search, status, and date range
    const filteredData = [
      {
        driverId,
        driverName,
        selectedMonth,
        salaryData,
      },
    ].filter((salary) => {
      const searchMatch =
        salary.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salary.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salary.selectedMonth.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter === "All" || salary.salaryData.approvalStatus === statusFilter;

      const dateMatch =
        (!startDate || salary.salaryData.paidDate >= startDate) &&
        (!endDate || salary.salaryData.paidDate <= endDate);

      return searchMatch && statusMatch && dateMatch;
    });

    setFilteredSalaryData(filteredData);
  }, [searchTerm, statusFilter, startDate, endDate, salaryData]);

  if (loading) return <p>Loading salary data...</p>;

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
      
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      overflowX: "auto",
      overflowY: "auto", // ✅ Add this line
      display: "block",   // ✅ Required to make overflowY work properly on a table
      maxHeight: "400px", // ✅ Optional: set max height to enable vertical scroll when needed
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
      flexWrap: "wrap",
      marginLeft: '2%'
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
      flex: "1 1 150px",
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
      
      <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
        <h2 style={{background:"#FFC107",color:"black",width:"100%",height:"40px" ,display:"flex", alignItems:"center",justifyContent:"center"}} >Salary Details</h2>
        <h3 style={{background:"#FFC107",color:"black",width:"100%",height:"35px",display:"flex", alignItems:"center",justifyContent:"center"}}>Salary Summary ({selectedMonth})</h3>
        {/* Your table and other components go here */}
      </div>
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by Driver ID, Name, or Month"
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
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
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
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Salary Month</th>
            <th style={styles.th}>Driver ID</th>
            <th style={styles.th}>Driver Name</th>
            <th style={styles.th}>No. of Days</th>
            <th style={styles.th}>Basic Payment</th>
            <th style={styles.th}>Per Day Payment</th>
            <th style={styles.th}>No. of Working Days</th>
            <th style={styles.th}>Earned Payment</th>
            <th style={styles.th}>Absent</th>
            <th style={styles.th}>Referral Bonus</th>
            <th style={styles.th}>Advance Deduction</th>
            <th style={styles.th}>Other Deductions</th>
            <th style={styles.th}>Payable Amount</th>
            <th style={styles.th}>Approval Status</th>
            <th style={styles.th}>Paid Amount</th>
            <th style={styles.th}>Paid Date</th>
            <th style={styles.th}>Remarks</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalaryData.map((salary) => (
            <tr key={`${salary.driverId}-${salary.selectedMonth}`}>
              <td style={styles.td}>{salary.selectedMonth}</td>
              <td style={styles.td}>{salary.driverId}</td>
              <td style={styles.td}>{salary.driverName}</td>
              <td style={styles.td}>{salary.salaryData.totalDays || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.basicPayment || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.dailyWage || ""}</td>
              <td style={styles.td}>{salary.salaryData.totalWorkingDays || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.earnedPayment || ""}</td>
              <td style={styles.td}>{salary.salaryData.totalHolidays || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.referralBonus || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.totalAdvanceDeduction || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.deductions || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.payableAmount || ""}</td>
              <td style={styles.td}>{salary.salaryData.approvalStatus || ""}</td>
              <td style={styles.td}>₹{salary.salaryData.paidAmount || ""}</td>
              <td style={styles.td}>{salary.salaryData.paidDate || ""}</td>
              <td style={styles.td}>{salary.salaryData.remarks || ""}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleApprove(salary.driverId, salary.selectedMonth)}
                  style={styles.button}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;