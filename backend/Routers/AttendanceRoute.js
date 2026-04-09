// const express = require("express");
// const mongoose = require("mongoose");
// const Attendance=require("../Modals/Attendance")
// const app = express();
// app.use(express.json());

// app.post("/attendance", async (req, res) => {
//     try {
//       const { driverId, vehicleNumber, startTime, stopTime, duration } = req.body;
  
//       // Validate Data
//       if (!driverId || !vehicleNumber || !startTime || !stopTime || !duration) {
//         return res.status(400).json({ error: "All fields are required" });
//       }
  
//       // Save to database
//       const newAttendance = new Attendance({ driverId, vehicleNumber, startTime, stopTime, duration });
//       await newAttendance.save();
  
//       res.status(201).json({ message: "Attendance marked successfully!" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to mark attendance" });
//       console.error(error);
//     }
//   });
const express = require("express");
const router = express.Router();
const Attendance = require("../Modals/Attendance"); // Ensure correct path

// Mark Attendance
router.post("/send", async (req, res) => {
  console.log("request received for approval");
  console.log(req.body);
  try {
    const { driverId,driverName, vehicleNumber, startTime, stopTime, duration,driverShiftLabel,shiftDetail } = req.body;

    if (!driverId ||!driverName|| !vehicleNumber || !startTime || !stopTime || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAttendance = new Attendance({
      driverId,
      driverName,
      vehicleNumber,
      startTime,
      stopTime,
      duration,
      status: "Pending",
      driverShiftLabel,
      shiftDetail
    });

    await newAttendance.save();
res.status(201).json({ message: "Attendance marked successfully!", _id: newAttendance._id });

  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
});

// Get all attendance
router.get("/send", async (req, res) => {
  try {
    const records = await Attendance.find({});
    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});
// ✅ Fetch All Attendance Records
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find({});
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance records" });
  }
});

// Update attendance
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    res.json({ message: `Attendance ${status} successfully!`, updatedAttendance });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ error: "Failed to update attendance" });
  }
});


// Get Driver Attendance API
router.get('/:driverId/:month', async (req, res) => {
  const { driverId, month } = req.params;

  try {
    const attendanceRecords = await DriverAttendance.find({ driverId, month });
    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this month' });
    }

    const totalWorkingDays = attendanceRecords.length;

    res.json({
      totalWorkingDays, 
      attendanceRecords,
    });
  } catch (error) {
    console.error('Error fetching driver attendance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
