const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: { type: String, required: false },  // Temporary OTP field
    otpExpires: { type: Date, required: false } // OTP Expiry Time
});

// Prevent overwriting the model
const User = mongoose.models.UserAndOtp || mongoose.model("UserAndOtp", userSchema, "UserAndOtp");

module.exports = User;
