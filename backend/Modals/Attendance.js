const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  driverName:{type:String, required:true},
  vehicleNumber: { type: String, required: true },
  startTime: { type: String, required: true },
  stopTime: { type: String, required: true },
  duration: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Optional
  driverShiftLabel: { type: String},
  shiftDetail: { type: String, required: true },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema,"attendances");
module.exports = Attendance;
