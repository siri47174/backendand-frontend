import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const globalFontStyle={
  fontFami:"Arial, sans-serif"
}

const containerStyle = {
  ...globalFontStyle,
  width: "85%",
  maxWidth: "3000px", // Prevents excessive stretching
  marginLeft: "20rem",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};
const heading = {
  ...globalFontStyle,
  textAlign: "center",
  backgroundColor: "#000", // Black background
  color: "#fff", // White text
  padding: "15px 20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  width: "fit-content",
  margin: "2rem 2rem 2rem 22rem",
  fontSize: "1.8rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
};


const formStyle = {
  ...globalFontStyle,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid,
  gridAutoRows: "auto", // Allows flexible row height
  gap: "40px",
  paddingRight: "20px 20px",
  marginRight: "20px",
};

const labelStyle = { fontWeight: "bold", marginBottom: "5px"  };
const inputStyle = {
  width: "100%",
  padding: "6px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  marginLeft:"20rem",
  gap:"2rem"
};

const buttonStyle = {
  padding: "0.8em 1.5em",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  color: "white",
  width: "10%",
  height: "2.5rem",
  backgroundColor:"black",
  marginRight:"5rem",
  transition: "all 0.3s ease-in-out", // Smooth effect on resize
};


const VendorConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData || {};

    return (
      <div>
         <h2 style={heading}>Confirm Vendor Details</h2>
        <div style={containerStyle}>
       <div style={formStyle}>
  <p><span style={labelStyle}>Supplier Name:</span> <input type="text" value={formData.supplierName} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Vendor Site Code:</span> <input type="text" value={formData.venderSiteCode} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Phone Number:</span> <input type="text" value={formData.phoneNumber} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Address Line 1:</span> <input type="text" value={formData.addressLine1} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Address Line 2:</span> <input type="text" value={formData.addressLine2} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Town/City:</span> <input type="text" value={formData.townCity} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>State:</span> <input type="text" value={formData.state} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Pin Code:</span> <input type="text" value={formData.pinCode} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Email ID:</span> <input type="text" value={formData.emailId} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Service Registration Number:</span> <input type="text" value={formData.serviceRegistrationNumber} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Service Tax:</span> <input type="text" value={formData.serviceTax} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>PAN Number:</span> <input type="text" value={formData.panNumber} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>TDS Rate Section:</span> <input type="text" value={formData.tdsRateSection} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Beneficiary Name:</span> <input type="text" value={formData.beneficiaryName} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Account Number:</span> <input type="text" value={formData.accountNumber} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>IFSC Code:</span> <input type="text" value={formData.IFSCcode} readOnly style={inputStyle} /></p>
  <p><span style={labelStyle}>Branch Name:</span> <input type="text" value={formData.branchName} readOnly style={inputStyle} /></p>
  </div>
    
        
    </div>
    <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => navigate(-1)}>Back</button>
            <button style={buttonStyle} onClick={() => alert("Supplier details confirmed!")}>Submit</button>
        </div>
    </div>
    );
};

export default VendorConfirmation;
