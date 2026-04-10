import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";
 
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
 
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch(API_BASE_URL + "/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Failed to reset password");
      }
      const data = await res.json();
      setMessage(data.message || "Password reset failed.");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password, please try again.");
    }
  };
 
  return (
    <div className="login-container">
      <style>
        {`
         .login-container {
           display: flex;
           justify-content: center;
           align-items: center;
           height: 100vh;
           background: url('https://img.freepik.com/free-photo/vehicle-move_23-2151846035.jpg?t=st=1740754352~exp=1740757952~hmac=c0ea2c637dcc8e3a4d3d536797c4ca69e04c733f296941ab5fb5929653fd65ba&w=1380')
             no-repeat center center/cover;
         }
 
          .login-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 350px;
            text-align: center;
          }
          .input-field {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: block;
            box-sizing: border-box;
          }
          .login-button {
            width: 100%;
            background: rgb(253, 212, 10);
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
      <div className="login-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="login-button">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
        <p className="signup-link" onClick={() => navigate("/login")}>Back to Login</p>
      </div>
    </div>
  );
};
 
export default ResetPassword;
 