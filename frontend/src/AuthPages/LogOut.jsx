import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth state
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
        <p style={{ color: "#555" }}>Logging you out...</p>
      </div>
    </div>
  );
};

export default LogOut;
