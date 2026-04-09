const mongoose = require("mongoose");

const oilServiceSchema = new mongoose.Schema({
  vehicleNumber: { type: String }, // Vehicle identification
  vehicleType:{type:String,enum: ["Car", "Truck", "Bus"]},
  serviceDate: { type: Date }, // Date of oil change
  odometerReading: { type: Number }, // Odometer reading at the time of service
  lastServiceDate: { type: Date }, // Last service date
  oilType: { type: String }, // Type of oil used
  oilBrand: { type: String }, 
  oilQuantity: { type: Number}, // Quantity of oil in liters
  oilGrade: { type: String}, // Grade of the oil used
  serviceCenter: { type: String }, // Name of the service center (optional)
  technicianName: { type: String }, // Technician who performed the service
  contactNumber: { 
    type: String, 
  }, 
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const OilService = mongoose.model("OilService", oilServiceSchema,"OilService");

module.exports = OilService;
