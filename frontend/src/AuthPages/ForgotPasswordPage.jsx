import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";
 
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [userOtp, setUserOtp] = useState("");
 
  const navigate = useNavigate();
 
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE_URL + "/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
 
      if (!res.ok) {
        // console.log(data)
        throw new Error(data.message);
      }
     
      console.log(data);
      setMessage(data.message || "OTP request failed.");
      setShowOtpBox(true);
    } catch (error) {
      // console.error("Error requesting OTP:", error.message);
      setMessage(error.message);
    }
  };
 
  const handleSubmitOtp = async () => {
    try{
      const res = await fetch(API_BASE_URL + "/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, userOtp }),
      });
 
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }
 
      navigate("/reset-password", { state: { email } });  // Navigate only if OTP is correct
    }
    catch (error){
      alert(error.message);
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
            .signup-link{
            backgroundColor:light-grey;
           
            }
        `}
      </style>
      <div className="login-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleRequestOTP}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="login-button">Request OTP</button>
        </form>
 
        {
          showOtpBox && <>
            <input
            type="number"
            placeholder="Enter OTP"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" onClick={()=>handleSubmitOtp()} className="login-button">Submit OTP</button>
          </>
        }
        {message && <p>{message}</p>}
       
        <p className="signup-link" onClick={() => navigate("/login")}>Back to Login</p>
      </div>
    </div>
  );
};
 
export default ForgotPassword;
 