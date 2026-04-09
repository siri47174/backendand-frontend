const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
    match: /^[a-zA-Z ]+$/, // Allows only alphabets and spaces
  },
  venderSiteCode: {
    type: String,
    enum: ["Rental", "Adhoc"], // Dropdown values
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // 10-digit phone number
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  townCity: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/, // 6-digit pin code
  },
  emailId: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Valid email format
  },
  serviceRegistrationNumber: {
    type: String,
    required: true,
  },
  serviceTax: {
    type: String,
  },
  panNumber: {
    type: String,
    required: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Valid PAN format
  },
  tdsRateSection: {
    type: String,
  },
  beneficiaryName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  IFSCcode: {
    type: String,
    required: true,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // Valid IFSC format
  },
  branchName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema,"vendorOnboarding");
module.exports = Vendor;
