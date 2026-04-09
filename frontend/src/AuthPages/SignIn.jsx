
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSignUp = async () => {
    if (!fullName) {
      setError("Full Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch(API_BASE_URL + "/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
  
      const data = await response.json();
  console.log(data);
      if (!response.ok) {
        if (data.message === "User already exists. Please log in.") {
          alert("User already exists! Redirecting to login.");
          navigate("/login"); // Redirect user to login
          return;
        }
        throw new Error(data.message || "Sign-up failed");
      }
  
      alert("Sign-up successful! Please log in.");
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: url('https://img.freepik.com/free-photo/vehicle-move_23-2151846035.jpg?t=st=1740754352~exp=1740757952~hmac=c0ea2c637dcc8e3a4d3d536797c4ca69e04c733f296941ab5fb5929653fd65ba&w=1380')
            no-repeat center center/cover;
        }
        .auth-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 350px;
          text-align: center;
        }
        .logo {
          width: 150px;
          margin-bottom: 10px;
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
        .password-container {
          position: relative;
        }
        .toggle-password {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
        }
        .auth-button {
          width: 95%;
          background: rgb(253, 212, 10);
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
        .signup-link {
          display: block;
          margin-top: 10px;
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        .signup-link:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="auth-card">
        <div className="logo-container">
          <img src="https://sendonow.com/Images/Logo.png" alt="Sendo Logistics" className="logo" />
          <h2>Sign Up</h2>
        </div>
        <div className="form-container">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {passwordError && <div className="error">{passwordError}</div>}
            {error && <div className="error">{error}</div>}
          </div>
          {error && <div className="error">{error}</div>}
          <p className="signup-link" onClick={() => navigate("/login")}>
            Already a User? Login
          </p>
          <button className="auth-button" onClick={handleSignUp} disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
}
