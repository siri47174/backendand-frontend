const mongoose = require("mongoose");

const salaryPaymentSchema = new mongoose.Schema(
  {
    salaryMonth: { type: String, required: true },
    driverId: { type: String, required: true },
    driverName: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    basicPayment: { type: Number, required: true },
    perDayPayment: { type: Number, required: true },
    workingDays: { type: Number, required: true },
    earnedPayment: { type: Number, required: true },
    absent: { type: Number, required: true },
    referralBonus: { type: Number, required: true },
    advanceDeduction: { type: Number, required: true },
    otherDeduction: { type: Number, required: true },
    payableAmount: { type: Number, required: true },
    approvalStatus: { type: String, required: true },
    paidAmount: { type: Number, default: 0 },
    paidDate: { type: Date },
    remarks: { type: String, default: "" },
    approve: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Model for SalaryPayment
const SalaryPayment = mongoose.model("SalaryPayment", salaryPaymentSchema);

module.exports = SalaryPayment;
