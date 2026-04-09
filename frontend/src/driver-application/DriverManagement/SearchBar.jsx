import React, { useState } from "react";

const SearchBar = ({ onSearch, onDownload }) => {
  const [searchBy, setSearchBy] = useState("driverId");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearch = () => {
    onSearch({ searchBy, searchTerm, fromDate, toDate });
  };

  return (
    <div style={searchContainerStyle}>
      <h3 style={headerStyle}>Search Records</h3>
      <label style={labelStyle}>
        Search By:
        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} style={selectStyle}>
          <option value="driverId">Driver ID</option>
          <option value="driverName">Driver Name</option>
          <option value="dateRange">From & To Date</option>
        </select>
      </label>

      {searchBy !== "dateRange" && (
        <input
          type="text"
          placeholder={`Search by ${searchBy === "driverId" ? "Driver ID" : "Driver Name"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />
      )}

      {searchBy === "dateRange" && (
        <div style={dateContainerStyle}>
          <input
            type="date"
            value={fromDate}
            style={inputStyle}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            value={toDate}
            style={inputStyle}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      )}

      <div style={buttonContainerStyle}>
        <button onClick={handleSearch} style={searchButtonStyle}>Search</button>
        <button onClick={onDownload} style={downloadButtonStyle}>Download</button>
      </div>
    </div>
  );
};

const searchContainerStyle = {
  marginBottom: "20px",
  padding: "20px",
  background: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const headerStyle = {
  color: "#0056b3",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  color: "#333",
  fontWeight: "500",
};

const selectStyle = {
  padding: "10px",
  marginLeft: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const inputStyle = {
  padding: "12px",
  margin: "10px 0",
  width: "calc(50% - 20px)",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const dateContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const buttonContainerStyle = {
  marginTop: "20px",
};

const searchButtonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
  border: "none",
};

const downloadButtonStyle = {
  backgroundColor: "#FFC107",
  color: "black",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none",
};

export default SearchBar;
