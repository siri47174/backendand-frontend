const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverId: { type: String, required: true, trim: true },
  shiftType: { type: String, trim: true },
  referBy: { type: String, trim: true },
  state: { type: String, trim: true },
  shiftA: { type: Boolean, default: false },
  shiftB: { type: Boolean, default: false },
});

const Driver = mongoose.model("Driver", driverSchema,"driverShift");
module.exports = Driver;
