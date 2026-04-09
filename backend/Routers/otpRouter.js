const express = require("express");
const router = express.Router();
const User = require("../Modals/otp/User");
const twilio = require("twilio");
require("dotenv").config();

// Twilio Credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

// **1️⃣ Send OTP Route**
// router.post("/sended", async (req, res) => {
//     console.log("Received request in sended backend api :", req.body); // Debugging
//     let { phone } = req.body;
//     console.log({phone});
//     if (!phone) {
//         return res.status(400).json({ error: "Phone number is required." });
//     }
//     if (!phone.startsWith("+")) {
//         phone = "+91" + phone;  // Assuming Indian numbers
//     }

//     console.log("phone number after adding country code-",{ phone }); 
//     const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//     const otpExpires = new Date(Date.now() + 5 * 60000); // OTP valid for 5 mins

//     try {
//         let user = await User.findOne({ phone });
//         if (!user) {
//             user = new User({ phone, otp, otpExpires });
//         } else {
//             user.otp = otp;
//             user.otpExpires = otpExpires;
//         }
//         await user.save();

//         // Send OTP via Twilio
//         await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: twilioPhone,
//             to: phone,
//         });
        

//         res.json({ success: true, message: "OTP Sent!" });
//     } catch (error) {
//         console.error("Twilio Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// **1️⃣ Send OTP Route**
router.post("/sended", async (req, res) => {
    console.log("Received request in sended backend API:", req.body);
    let { phone } = req.body;
    
    if (!phone) return res.status(400).json({ error: "Phone number is required." });

    const formattedPhone = phone.startsWith("+") ? phone : "+91" + phone;
    console.log("Formatted Phone:", formattedPhone);

    //const otp = Math.floor(100000 + Math.random() * 900000); 6-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

    const otpExpires = new Date(Date.now() + 5 * 60000); // Valid for 5 mins

    try {
        
        // Send OTP via Twilio
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhone,
            to: formattedPhone,
        });

        let user = await User.findOne({ phone: formattedPhone });
        if (!user) {
            user = new User({ phone: formattedPhone, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }
        await user.save();

        res.json({ success: true, message: "OTP Sent!" });
    } catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ error: "Failed to send OTP. Try again." });
    }
});

// **2️⃣ Verify OTP Route**
// router.post("/verify-otp", async (req, res) => {
//     const { phone, otp } = req.body;
//     try {
//         const user = await User.findOne({ phone });
//         if (!user) return res.status(400).json({ error: "User not found" });

//         if (user.otp !== otp || new Date() > user.otpExpires) {
//             return res.status(400).json({ error: "Invalid or expired OTP" });
//         }

//         // OTP Verified - Clear OTP from DB
//         user.otp = null;
//         user.otpExpires = null;
//         await user.save();

//         res.json({ success: true, message: "OTP Verified! Login Successful" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


router.post("/verify-otp", async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP required" });

    const formattedPhone = phone.startsWith("+") ? phone : "+91" + phone;

    try {
        const user = await User.findOne({ phone: formattedPhone });
        if (!user) return res.status(400).json({ error: "User not found" });

        console.log("Stored OTP:", user.otp);
        console.log("Received OTP:", otp);
        console.log("OTP Expiry Time:", user.otpExpires);
        console.log("Current Time:", new Date());

        if (user.otp.toString() !== otp.toString() || new Date() > user.otpExpires) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // OTP Verified - Clear OTP
        await User.updateOne({ phone: formattedPhone }, { $unset: { otp: "", otpExpires: "" } });
        res.json({ success: true, message: "OTP Verified! Login Successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





// **Export Router**
module.exports = router;
