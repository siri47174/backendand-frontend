// // const express = require("express");
// // const crypto = require("crypto");
// // const nodemailer = require("nodemailer");
// // const bcrypt = require("bcryptjs");
// // const User = require("./User"); // Adjust based on your DB setup
// // const router = express.Router();

// // // Nodemailer setup
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // // Store OTP temporarily (use Redis or DB for better scalability)
// // const otpStore = new Map();

// // // Generate OTP and send via email
// // router.post("/forgot-password", async (req, res) => {
// //   const { email } = req.body;
// //   console.log(email);
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // Generate a 6-digit OTP
// //     const otp = crypto.randomInt(100000, 999999).toString();

// //     // Store OTP temporarily (set expiration to 5 minutes)
// //     otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

// //     // Send OTP via email
// //     await transporter.sendMail({
// //       from: process.env.EMAIL_USER,
// //       to: email,
// //       subject: "Password Reset OTP",
// //       text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
// //     });

// //     res.json({ message: "OTP sent to email" });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // Verify OTP and Reset Password
// // router.post("/reset-password", async (req, res) => {
// //   const { email, otp, newPassword } = req.body;
// //   try {
// //     // Check if OTP is valid
// //     const storedOtp = otpStore.get(email);
// //     if (!storedOtp || storedOtp.expiresAt < Date.now()) {
// //       return res.status(400).json({ message: "OTP expired or invalid" });
// //     }
// //     if (storedOtp.otp !== otp) {
// //       return res.status(400).json({ message: "Invalid OTP" });
// //     }

// //     // Hash the new password
// //     const hashedPassword = await bcrypt.hash(newPassword, 12); // Use 12+ salt rounds

// //     await User.findOneAndUpdate({ email }, { password: hashedPassword });

// //     // Remove OTP after successful reset
// //     otpStore.delete(email);

// //     res.json({ message: "Password reset successful" });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const User = require("./User"); // Adjust based on your DB setup
// const router = express.Router();
// // Nodemailer setup
// require("dotenv").config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Store this securely
//   },
// });

// // Store OTP temporarily (can use Redis for better scalability)
// const otpStore = {};
// // Generate OTP and send via email

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   console.log("Received email:", email); // Log the received email

//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });
//     console.log("User found:", user); // Log if user exists

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//     // Send OTP via email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
//     });

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     console.error("Error in /forgot-password:", error); // Log full error details
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// });

// // router.post("/forgot-password", async (req, res) => {
// //  const { email } = req.body;
// //  try {
// //   console.log(User); // Should not be undefined or null
// //   const user = await User.findOne({ email });
// //    console.log(user)
// //    if (!user) return res.status(404).json({ message: "User not found" });
// //    // Generate a 6-digit OTP
// //    const otp = crypto.randomInt(100000, 999999).toString();
// //    // Store OTP temporarily (set expiration to 5 minutes)
// //    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
// //    // Send OTP via email
// //    await transporter.sendMail({
// //      from: "shiwanshitripathi@gmail.com",
// //      to: email,
// //      subject: "Password Reset OTP",
// //      text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
// //    });
// //    res.json({ message: "OTP sent to email" });
// //  } catch (error) {
// //    res.status(500).json({ error: "Internal Server Error" });
// //  }
// // });
// // const bcrypt = require("bcryptjs");
// // router.post("/reset-password", async (req, res) => {
// //  const { email, otp, newPassword } = req.body;
// //  try {
// //    // Check if OTP is valid
// //    if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
// //      return res.status(400).json({ message: "OTP expired or invalid" });
// //    }
// //    if (otpStore[email].otp !== otp) {
// //      return res.status(400).json({ message: "Invalid OTP" });
// //    }
// //    // Hash the new password
// //    const hashedPassword = await bcrypt.hash(newPassword, 10);
// //    await User.updateOne({ email }, { $set: { password: hashedPassword } });
// //    // Remove OTP after successful reset
// //    delete otpStore[email];
// //    res.json({ message: "Password reset successful" });
// //  } catch (error) {
// //    res.status(500).json({ error: "Internal Server Error" });
// //  }
// // });
// module.exports = router;

// const express = require("express");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");
// const User = require("./User"); // Ensure the correct path
// require("dotenv").config();

// const router = express.Router();

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "smtp@gmail.com",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // 📌 Forgot Password - Send OTP
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();

//     // Store OTP in DB with expiration
//     user.otp = otp;
//     user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // Expires in 5 mins
//     await user.save();

//     // Send OTP via email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
//     });

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 📌 Reset Password - Verify OTP & Change Password
// router.post("/reset-password", async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user || !user.otp || user.otpExpiresAt < Date.now()) {
//       return res.status(400).json({ message: "OTP expired or invalid" });
//     }
//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     // Update password and clear OTP
//     user.password = hashedPassword;
//     user.otp = undefined;
//     user.otpExpiresAt = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Import JWT
const bcrypt = require("bcryptjs");
const User = require("../User"); // Ensure the correct path
const {userAuth}=require("../Middlewares/userAuth");


require("dotenv").config();
const otpStore = {};
 
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
// 📌 Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ Fixed the issue here
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: 5000,
});

router.post("/sign-in", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/verify-otp", async (req, res) => {
  const { email, userOtp } = req.body;

  // Check if OTP exists in otpStore
  if (!otpStore[email]) {
    return res.status(400).json({ message: "OTP expired! Request a new one." });
  }

  const { otp: storedOtp, expiresAt } = otpStore[email];

  // Check if OTP is expired
  if (Date.now() > expiresAt) {
    delete otpStore[email]; // Remove expired OTP
    return res.status(400).json({ message: "OTP expired! Request a new one." });
  }

  // Validate OTP
  if (userOtp !== storedOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }

  // OTP verified successfully
  delete otpStore[email]; // Remove OTP after successful verification
  res.json({ message: "OTP verified successfully" });
});


// 📌 Forgot Password - Check Use
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // console.log("Received email:", email); // Log the received email
 
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    // console.log("User found:", user); // Log if user exists
 
    if (!user) return res.status(404).json({ message: "User Not Exists" });
 
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
 
    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
    });
 
    res.json({
      message: "OTP sent to email",
      otp : otp
    });
 
  } catch (error) {
    console.error("Error in /forgot-password:", error); // Log full error details
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});
 

// 📌 Reset Password - Verify OTP & Change Password
router.post("/reset-password", async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User Not Exists" });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: "Password Updated Successfully" });
  } catch (err) {}
});

//login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("request receiving in backend=>", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    let user = await User.findOne({ email: email.toLowerCase() });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up." });
    }
    if (!user.password) {
      return res
        .status(500)
        .json({ message: "User record is corrupted: password is missing." });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY, {expiresIn : "7d"});
    console.log(token);
    res.cookie("token", token, {expires : new Date(Date.now() + 7*24*60*60*1000)});
    // Store user data in session
    // req.session.user = user;
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", userAuth, async(req, res)=>{
  try{
    const user = req.user;
    console.log(user);
    res.cookie('token', null, {expires : new Date(Date.now())});
    res.send(`${user.fullName} Logged Out Successfully...`);
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

module.exports = router;
