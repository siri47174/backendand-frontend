const mongoose = require("mongoose");

const SparePartSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    trim: true,
  },
  sparePartName: {
    type: String,
    trim: true,
  },
  partNumber: {
    type: String,
    trim: true,
  },
  replacementDate: {
    type: Date,
  },
  partCategory: {
    type: String,
    enum: ["Engine", "Brake", "Suspension", "Electrical"],
  },
  quantity: {
    type: Number,
  },
  costPerPart: {
    type: Number,
   
  },
  totalCost: {
    type: Number,
    
  },
  serviceCenterName: {
    type: String,
   
  },
  technicianName: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
}, { timestamps: true });

const SparePart = mongoose.model("SparePart", SparePartSchema,"SpareParts");

module.exports = SparePart;
