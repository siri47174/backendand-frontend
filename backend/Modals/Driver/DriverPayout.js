const mongoose = require("mongoose");
const PayoutSchema = new mongoose.Schema({
    driverId: String,
    month: String,
    totalDays: Number,
    dailyWage: Number,
    basicPayment: Number,
    totalWorkingDays: Number,
    totalHolidays: Number,
    earnedPayment: Number,
    approvedAmount: Number,
    deductions: Number,
    otherExpenses: Number,
    payableAmount: Number,
    attendanceData: [
      {
        date: String,
        status: String,
      },
    ],
  });
   
  const Payout = mongoose.model("Payout", PayoutSchema,"DriverPayout");