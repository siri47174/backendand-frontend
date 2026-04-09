const mongoose = require("mongoose");

const DieselSchema = new mongoose.Schema({
  date: { type: Date},
  vehicleNumber: { type: String},
  vehicleType: { type: String },
  driverName: { type: String },
  vehicleRoute: { type: String},
  fuelType: { type: String},
  volume: { type: Number },
  ratePerLiter: { type: Number},
  amount: { type: Number },
  startKm: { type: Number},
  endKm: { type: Number},
  totalKm: { type: Number},
  mileage: { type: Number },
  time: { type: String },
  paymentType: { type: String },
  paidBy: { type: String },
  paymentReference: { type: String},
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Diesel", DieselSchema,"Diesel");
