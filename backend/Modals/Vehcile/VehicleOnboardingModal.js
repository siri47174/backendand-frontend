const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      unique: true,
      required: true,
    },
    registerName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["Truck", "Bus", "Car", "Bike"],
      required: true,
    },
    grossVehicleWeight: {
      type: String,
      required: true,
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
      enum: ["Yes", "No"],
      required: true,
    },
    permitUpto: {
      type: Date,
      required: function () {
        return this.nationalPermit === "Yes";
      },
    },
    remarks: {
      type: String,
    },
    // ✅ File Path Fields for Documents
    RegistrationCertificate: { type: String },
    Insurance: { type: String },
    PollutionCertificate: { type: String },
    RoadTax: { type: String },
    FitnessCertificate: { type: String },
    Permit: { type: String },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "vehicleOnboarding");
module.exports = Vehicle;
