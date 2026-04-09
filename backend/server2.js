require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http"); // ✅ Added
const { Server } = require("socket.io"); // ✅ Added
const router = require("./Routers/AuthRouter");
const onboardingRouter = require("./Routers/OnboardingRouters");
const vehicleRoute=require("./Routers/VehicleRoute");
const cookieParser=require("cookie-parser");
const otpRouter=require("./Routers/otpRouter");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app); // ✅ Create HTTP Server
const path = require('path');
const TripRouter=require("./Routers/TripRouter");
const attendanceRouter=require("./Routers/AttendanceRoute");
const advanceRoute=require("./Routers/AdvanceApproval");
const homeRouter=require('./Routers/Home');
const customerRouter=require("./Routers/CustomerRouter");
// const Deduction=require("../Backend/Routers/")
app.use(cookieParser());

// Middleware to fix CORS issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || ["http://localhost:3000", "http://localhost:3001"].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// ✅ Middleware
app.use(
  cors({
    origin: function(origin, callback) {
      const allowed = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        process.env.CORS_ORIGIN,
      ].filter(Boolean);
      // Allow Vercel preview URLs and any configured origin
      if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all for now - restrict in production if needed
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json()); // ✅ JSON Parsing

// ✅ Vehicle Data Simulation
let vehicles = [
  { id: "V1", lat: 28.7041, lng: 77.1025, speed: 45 },
  { id: "V2", lat: 19.076, lng: 72.8777, speed: 60 },
  { id: "V3", lat: 12.9716, lng: 77.5946, speed: 50 },
];

setInterval(() => {
  vehicles = vehicles.map((v) => ({
    ...v,
    lat: v.lat + (Math.random() - 0.5) * 0.005,
    lng: v.lng + (Math.random() - 0.5) * 0.005,
    speed: Math.floor(Math.random() * 30) + 30,
  }));

  io.emit("locationUpdate", vehicles);
}, 3000);

// ✅ WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log(`🚗 Client connected: ${socket.id}`);
  socket.emit("locationUpdate", vehicles);
  socket.on("disconnect", () => console.log(`❌ Client disconnected: ${socket.id}`));
});

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB();


// ✅ Debugging: Ensure env variables are loaded correctly
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
}

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads/driverOnboarding', express.static(path.join(__dirname, 'uploads/driverOnboarding')));
app.use('/uploads/vehicleOnboarding', express.static(path.join(__dirname, 'uploads/vehicleOnboarding')));


// ✅ API Routes
app.use("/api", router);
app.use("/onboarding", (req, res, next) => {
  // console.log("Request received at /onboarding:", req.method, req.url);
  next();
}, onboardingRouter);
app.use("/trip",TripRouter);
app.use("/vehicle",vehicleRoute);
app.use("/customer",customerRouter);
app.use("/send-otp", otpRouter);  // Ensure sendOtpRoute is a function
app.use("/attendance", attendanceRouter); // ✅ Correct path
app.post("/api/sign-in", (req, res) => {
  res.json({ message: "Sign-in successful" });
});
app.use("/advance",advanceRoute);
app.use("/payment", advanceRoute);
app.use("/home",homeRouter);


// app.use("/driver",DriverRoute);

// ✅ Default Route
app.get("/", (req, res) => res.send("Server is running..."));

// ✅ Start Server with WebSockets
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // ✅ FIXED
