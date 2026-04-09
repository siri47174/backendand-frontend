const mongoose = require("mongoose");
const deductionSchema = new mongoose.Schema({
    date: String,
    driverId: String,
    driverName: String,
    driverMobile: String,
    vehicleNumber: String,
    lossType: String,
    location: String,
    description: String,
    amount: String,
    recoveryStatus: String,
    remarks: String,
  });
   
  // Create Model
  const Deduction = mongoose.model("Deduction", deductionSchema);
  module.exports=Deduction;