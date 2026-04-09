import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API_BASE_URL from "./config";

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const[isAuthenticated, setIsAuthenticated]=useState(
    sessionStorage.getItem("isAuthenticated")==="true"
  );

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch(API_BASE_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensures cookies (sessions) are included
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }
      // Successful login, navigate to dashboard/home
      localStorage.setItem("isAuthenticated", "true");

      // Call onLogin to update state in App.js
      onLogin();
  
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
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
          .login-button {
            width: 100%;
            background: rgb(253, 212, 10);
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .forgot-password {
            display: block;
            margin-top: 10px;
            color: black;
            text-decoration: none;
          }
          .forgot-password:hover {
            text-decoration: underline;
          }
          .error-message {
            color: red;
            font-size: 14px;
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
        `}
      </style>
      <div className="login-card">
        <div className="logo-container">
          <img
            src="https://sendonow.com/Images/Logo.png"
            alt="Sendo Logistics"
            className="logo"
          />
          <h2>Log in</h2>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <p className="signup-link" onClick={() => navigate("/sign-in")}>
            New User? Sign Up
          </p>
          <a
            onClick={() => navigate("/forgot-password")}
            className="forgot-password"
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
}
