const mongoose = require("mongoose");

const DriverAdvanceSchema = new mongoose.Schema({
  driverId: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  approvedAmount: {
    type: Number,
    default: 0,
  },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  },
  approvedBy: {
    type: String,
  },
});

module.exports = mongoose.model("DriverAdvance", DriverAdvanceSchema,"driverAdvance");
