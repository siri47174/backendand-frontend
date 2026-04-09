require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Routers/AuthRouter"); // Import routes
const onboardingRouter=require("./Routers/OnboardingRouters");
const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());
// app.use(cors());

// ✅ Connect to MongoDB with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit the process on failure
  }
};
connectDB();

// ✅ Debugging: Ensure env variables are loaded correctly
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
}

// ✅ API Routes
app.use("/api", router);
app.use("/onboarding",onboardingRouter);

// Your existing routes
app.post("/api/sign-in", (req, res) => {
  res.json({ message: "Sign-in successful" });
});


// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
