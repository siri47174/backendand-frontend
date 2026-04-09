const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
     
    },
    expenseType: {
      type: String,
      enum: ["Vehicle Expense", "Others"],
    
    },
    vehicleNumber: {
      type: String,
      required: function () {
        return this.expenseType === "Vehicle Expense";
      },
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
    },
    requestedBy: {
      type: String,
    },
    paidBy: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paymentReference: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
