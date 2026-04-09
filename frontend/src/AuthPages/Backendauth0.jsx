//2. Backend: Verify OTP and Reset Password
const bcrypt = require("bcryptjs");
router.post("/reset-password", async (req, res) => {
 const { email, otp, newPassword } = req.body;
 try {
   // Check if OTP is valid
   if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
     return res.status(400).json({ message: "OTP expired or invalid" });
   }
   if (otpStore[email].otp !== otp) {
     return res.status(400).json({ message: "Invalid OTP" });
   }
   // Hash the new password
   const hashedPassword = await bcrypt.hash(newPassword, 10);
   await User.updateOne({ email }, { $set: { password: hashedPassword } });
   // Remove OTP after successful reset
   delete otpStore[email];
   res.json({ message: "Password reset successful" });
 } catch (error) {
   res.status(500).json({ error: "Internal Server Error" });
 }
});