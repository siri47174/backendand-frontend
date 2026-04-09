// ============================================
// API Configuration
// Change this URL when deploying to cloud
// ============================================

// For LOCAL development:
// const API_BASE_URL = "http://localhost:5001";

// For RENDER deployment (replace with your actual Render URL):
// const API_BASE_URL = "https://sendo-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export default API_BASE_URL;
