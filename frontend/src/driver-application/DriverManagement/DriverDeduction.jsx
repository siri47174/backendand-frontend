import React, { useState } from "react";
 
const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  marginLeft: "270px",
  padding: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};
 
const fieldsetStyle = {
  border: "none",
  padding: 0,
  marginBottom: "25px",
};
 
const labelStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "6px",
  display: "block",
  color: "#333",
};
 
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "18px",
};
 
const textAreaStyle = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};
 
const buttonStyleFlex = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px",
  marginTop: "30px",
};
 
const buttonStyle = {
  backgroundColor: "#000000",
  color: "#ffffff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
  minWidth: "120px",
};
 
const headingStyle = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "25px",
};
 
const DriverDeduction = () => {
  const [formData, setFormData] = useState({
    date: "",
    driverId: "",
    driverName: "",
    driverMobile: "",
    vehicleNumber: "",
    lossType: "",
    location: "",
    description: "",
    amount: "",
    recoveryStatus: "",
    remarks: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
 
  const driverData = {
    "D001": { name: "John Doe", mobile: "9876543210" },
    "D002": { name: "Jane Smith", mobile: "9123456789" },
    "D003": { name: "Michael Johnson", mobile: "9988776655" },
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "driverId") {
      setFormData({
        ...formData,
        driverId: value,
        driverName: driverData[value]?.name || "",
        driverMobile: driverData[value]?.mobile || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 
  const handleClear = () => {
    setFormData({
      date: "",
      driverId: "",
      driverName: "",
      driverMobile: "",
      vehicleNumber: "",
      lossType: "",
      location: "",
      description: "",
      amount: "",
      recoveryStatus: "",
      remarks: "",
    });
  };
 
  const handleContinue = () => {
    setShowConfirmation(true);
  };
 
  const handleBack = () => {
    setShowConfirmation(false);
  };
 
  const handleSubmit = () => {
    alert("Deduction details submitted successfully!");
  };
 
  return (
<div style={containerStyle}>
      <h2 className="sendo-heading">Driver Deductions</h2>
      {showConfirmation ? (
<>
<h2 style={headingStyle}>Confirm Deduction Details</h2>
<fieldset style={fieldsetStyle}>
<form>
<label style={labelStyle}>Date:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="date" value={formData.date} readOnly />
 
              <label style={labelStyle}>Driver ID:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="text" value={formData.driverId} readOnly />
 
              <label style={labelStyle}>Driver Name:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="text" value={formData.driverName} readOnly />
 
              <label style={labelStyle}>Driver Mobile Number:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="text" value={formData.driverMobile} readOnly />
 
              <label style={labelStyle}>Vehicle Number:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="text" value={formData.vehicleNumber} readOnly />
 
              <label style={labelStyle}>Loss Type:</label>
<select style={{ ...inputStyle, cursor: "not-allowed" }} value={formData.lossType} disabled>
<option value="Accident">Accident</option>
<option value="Damage">Damage</option>
<option value="Fines">Fines</option>
<option value="Diesel Empty">Diesel Empty</option>
</select>
 
              <label style={labelStyle}>Location:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="text" value={formData.location} readOnly />
 
              <label style={labelStyle}>Description:</label>
<textarea style={{ ...textAreaStyle, cursor: "not-allowed" }} value={formData.description} readOnly />
 
              <label style={labelStyle}>Amount:</label>
<input style={{ ...inputStyle, cursor: "not-allowed" }} type="number" value={formData.amount} readOnly />
 
              <label style={labelStyle}>Recovery Status:</label>
<select style={{ ...inputStyle, cursor: "not-allowed" }} value={formData.recoveryStatus} disabled>
<option value="Recovered">Recovered</option>
<option value="Not Recovered">Not Recovered</option>
</select>
 
              <label style={labelStyle}>Remarks:</label>
<textarea style={{ ...textAreaStyle, cursor: "not-allowed" }} value={formData.remarks} readOnly />
</form>
</fieldset>
<div style={buttonStyleFlex}>
<button onClick={handleBack} style={buttonStyle}>Back</button>
<button onClick={handleSubmit} style={buttonStyle}>Submit</button>
</div>
</>
      ) : (
<>
<h2 style={headingStyle}>Deduction Management</h2>
<fieldset style={fieldsetStyle}>
<form>
<label style={labelStyle}>Date:</label>
<input style={inputStyle} type="date" name="date" value={formData.date} onChange={handleChange} required />
 
              <label style={labelStyle}>Driver ID:</label>
<input style={inputStyle} type="text" name="driverId" value={formData.driverId} onChange={handleChange} required />
 
              <label style={labelStyle}>Driver Name:</label>
<input style={inputStyle} type="text" name="driverName" value={formData.driverName} readOnly />
 
              <label style={labelStyle}>Driver Mobile Number:</label>
<input style={inputStyle} type="text" name="driverMobile" value={formData.driverMobile} readOnly />
 
              <label style={labelStyle}>Vehicle Number:</label>
<input style={inputStyle} type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
 
              <label style={labelStyle}>Loss Type:</label>
<select style={inputStyle} name="lossType" value={formData.lossType} onChange={handleChange} required>
<option value="">Select</option>
<option value="Accident">Accident</option>
<option value="Damage">Damage</option>
<option value="Fines">Fines</option>
<option value="Diesel Empty">Diesel Empty</option>
</select>
 
              <label style={labelStyle}>Location:</label>
<input style={inputStyle} type="text" name="location" value={formData.location} onChange={handleChange} required />
 
              <label style={labelStyle}>Description:</label>
<textarea style={textAreaStyle} name="description" value={formData.description} onChange={handleChange} required />
 
              <label style={labelStyle}>Amount:</label>
<input style={inputStyle} type="number" name="amount" value={formData.amount} onChange={handleChange} required />
 
              <label style={labelStyle}>Recovery Status:</label>
<select style={inputStyle} name="recoveryStatus" value={formData.recoveryStatus} onChange={handleChange} required>
<option value="">Select</option>
<option value="Recovered">Recovered</option>
<option value="Not Recovered">Not Recovered</option>
</select>
 
              <label style={labelStyle}>Remarks:</label>
<textarea style={textAreaStyle} name="remarks" value={formData.remarks} onChange={handleChange} required />
</form>
</fieldset>
<div style={buttonStyleFlex}>
<button onClick={handleClear} style={buttonStyle}>Clear</button>
<button onClick={handleContinue} style={buttonStyle}>Continue</button>
</div>
</>
      )}
</div>
  );
};
 
export default DriverDeduction;