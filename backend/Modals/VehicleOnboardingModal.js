const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    // match: /^[a-zA-Z0-9 ]+$/, // Alphanumeric validation
  },
  registerName: {
    type: String,
    required: true,
    // match: /^[a-zA-Z ]+$/, // Alphabet-only validation
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ["Truck", "Bus", "Car", "Bike"], // Allowed vehicle types
  },
  grossVehicleWeight: {
    type: String,
    required: true,
    // match: /^[a-zA-Z0-9 ]+$/, // Alphanumeric validation
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  fitnessValidUpto: {
    type: Date,
    required: true,
  },
  taxValidUpto: {
    type: Date,
    required: true,
  },
  insuranceValidUpto: {
    type: Date,
    required: true,
  },
  pollutionValidUpto: {
    type: Date,
    required: true,
  },
  statePermitValidUpto: {
    type: Date,
    required: true,
  },
  nationalPermit: {
    type: String,
    required: true,
    enum: ["Yes", "No"], // Only "Yes" or "No" allowed
  },
  permitUpto: {
    type: Date,
    required: function () {
      return this.nationalPermit === "Yes"; // Required only if National Permit is "Yes"
    },
  },
  remarks: {
    type: String,
  },
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema,"vehicleOnboarding");

module.exports = Vehicle;
