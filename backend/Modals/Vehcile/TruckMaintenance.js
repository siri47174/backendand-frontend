const mongoose = require("mongoose");

const TruckMaintenanceSchema = new mongoose.Schema(
  {
    maintenanceType: {
      type: String,
      enum: ["Regular Maintenance", "Tyre Maintenance", "RTO Expenses", "Material Consumption"],
      required: true,
    },
    truckNo: { type: String },
    kilometer: { type: Number },
    expenseAccount: { type: String },
    paymentMode: { type: String, enum: ["Cash", "Credit"], default: "Cash" },
    supplierPartyName: { type: String },
    amount: { type: Number },
    date: { type: Date },
    driver: { type: String },
    nextAlertKM: { type: Number },
    nextAlertKMDate: { type: Date },
    remarks: { type: String },
    // Tyre specific
    tyrePosition: { type: String },
    tyreNo: { type: String },
    tyreBrand: { type: String },
    // RTO specific
    rtoExpenseType: { type: String },
    rtoValidUpto: { type: Date },
    // Material specific
    materialDescription: { type: String },
    quantity: { type: Number },
    unit: { type: String },
  },
  { timestamps: true }
);

const TruckMaintenance = mongoose.model("TruckMaintenance", TruckMaintenanceSchema);
module.exports = TruckMaintenance;
