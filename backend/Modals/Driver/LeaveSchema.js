const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  startDate: { type: Date, required: true }, // Ensure it's a Date
  endDate: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  leaveType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
