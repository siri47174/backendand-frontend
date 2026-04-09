import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const containerStyle = {
    width: "800px", // Fixed width
    height: "auto", // Adjusts to content height
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    transform: "scale(1)", // Prevents zoom scaling
    zoom: "1", // Keeps the original size
  };
  

const buttonStyleFlex = {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    paddingTop:"4rem"
};

const labelStyle = {
    fontWeight: "bold",
};

const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
};

const CustomerConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData || {};

    return (
        <div style={{marginLeft:"270px",padding:"24px",fontFamily:"Arial,sans-serif",backgroundColor:"#f5f5f5",minHeight:"100vh"}}>
        <div style={containerStyle}>
            <h2>Confirm Customer Details</h2>
            <p><span style={labelStyle}>Company Name:</span> {formData.companyName}</p>
            <p><span style={labelStyle}>Address:</span> {formData.address}</p>
            <p><span style={labelStyle}>Point of Contact:</span> {formData.pointOfContact}</p>
            <p><span style={labelStyle}>Phone Number:</span> {formData.phoneNumber}</p>
            <p><span style={labelStyle}>Mail ID:</span> {formData.emailId}</p>
            <p><span style={labelStyle}>GST Number:</span> {formData.gstNumber}</p>
            <p><span style={labelStyle}>Rate Card:</span> {formData.rateCard}</p>

            <div style={buttonStyleFlex}>
                <button style={buttonStyle} onClick={() => navigate(-1)}>Back</button>
                <button style={buttonStyle} onClick={() => alert("Customer details confirmed!")}>Submit</button>
            </div>
        </div>
    </div>

    );
};

export default CustomerConfirmation;
