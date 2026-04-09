import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../config";

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
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  color: "white",
  width: "15rem",
  height: "2.5rem",
  backgroundColor:"black"
};


const DriverConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (Object.keys(formData).length === 0) {
      alert("No driver data available to submit.");
      return;
    }
    setLoading(true);
    console.log("data in confirm", JSON.stringify(formData));
    try {
      const response = await fetch(
        API_BASE_URL + "/onboarding/driver-confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
      
      const data = await response.json();
      console.log("Success:", data);

      if (response.ok) {
        alert("Driver details confirmed and saved successfully!");
      } else {
        alert("Failed to save driver details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving. Please try again.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div>
       <h2 style={heading}>Driver Onboarding</h2>
    <div style={containerStyle}>
      <form style={formStyle}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label style={labelStyle}>
            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>

            <input type="text" value={value} readOnly style={inputStyle} />
          </div>
        ))}
      </form>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate(-1)} disabled={loading}>
          Edit
        </button>
        <button style={buttonStyle} onClick={handleConfirm} disabled={loading}>
          {loading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </div>
    </div>
  );
};

export default DriverConfirmation;
