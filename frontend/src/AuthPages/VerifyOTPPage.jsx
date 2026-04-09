import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

export default function VerifyOTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";
  
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOTP = async () => {
    if (!otp.match(/^\d{6}$/)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(API_BASE_URL + "/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Invalid OTP or Password.");
      }
    } catch (error) {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-card">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to {phone}</p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="input-field"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button onClick={handleVerifyOTP} className="verify-otp-button">
          Reset Password
        </button>
      </div>
    </div>
  );
}
