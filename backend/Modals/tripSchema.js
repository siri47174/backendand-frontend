const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  driverId: String,
  vehicleNumber: String,
  startTime: Date,
  isRunning: Boolean,
});

const Trip = mongoose.model("Trip", tripSchema,"tripDb")
module.exports=Trip;