// const mongoose = require("mongoose");

// const driverOnboardingSchema = new mongoose.Schema(
//   {
//     driverId: { type: String, required: true, unique: true, trim: true },
//     firstName: { type: String, required: true, trim: true },
//     secondName: { type: String, trim: true },
//     surname: { type: String, trim: true },
//     fatherName: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     dob: { type: Date, required: true },

//     dlNumber: { type: String, required: true, unique: true, trim: true },
//     dlValidTill: { type: Date, required: true },
//     dlType: { type: String, required: true, trim: true },

//     joiningDate: { type: Date, required: true },
//     // state: { type: String, trim: true, sparse: true },
//     // shiftType: { type: String, trim: true, sparse: true },
//     // shiftA: { type: Boolean, default: false },
//     // shiftB: { type: Boolean, default: false },
//     basicPayment: { type: String, required: true, trim: true },

//     nameAsPerBank: { type: String, required: true, trim: true },
//     bankAccountNumber: { type: String, required: true, trim: true },
//     ifsc: { type: String, required: true, trim: true },
//     bankName: { type: String, required: true, trim: true },

//     panNo: { type: String, required: true, trim: true },
//     aadharNumber: { type: String, required: true, trim: true },

//     contactNumber: { type: String, required: true, unique: true, trim: true },
//     emergencyContact: { type: String, required: true, trim: true },

    
//     ReferBy: { type: String, trim: true },

//     // File paths
//     profilePicture: { type: String },
//     aadharFile: { type: String },
//     panFile: { type: String },
//     dlFile: { type: String },
//     bankPassbookFile: { type: String },
//   },
//   { timestamps: true } // Using strict mode (default)
// );

// const DriverOnboarding = mongoose.model("DriverOnboarding", driverOnboardingSchema, "driveronboardings");
// module.exports = DriverOnboarding;


const mongoose = require("mongoose");

const driverOnboardingSchema = new mongoose.Schema(
  {
    driverId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    secondName: { type: String, trim: true },
    surname: { type: String, trim: true },
    fatherName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },

    dlNumber: { type: String, required: true, unique: true, trim: true },
    dLValidTill: { type: Date, required: true }, // Consistent with frontend
    DLType: { type: String, required: true, trim: true }, // Consistent with frontend

    joiningDate: { type: Date, required: true },
    state: { type: String, trim: true},
    shiftType: { type: String, trim: true },
    // shiftA: { type: Boolean, default: false },
    // shiftB: { type: Boolean, default: false },
    basicPayment: { type: Number, required: true, trim: true }, // Changed to Number

    nameAsPerBank: { type: String, required: true, trim: true },
    bankAccountNumber: { type: String, required: true, trim: true },
    ifsc: { type: String, required: true, trim: true },
    bankName: { type: String, required: true, trim: true },

    panNo: { type: String, required: true, trim: true },
    aadharNumber: { type: String, required: true, trim: true },

    contactNumber: { type: String, required: true, unique: true, trim: true },
    emergencyContact: { type: String, required: true, trim: true },

    // ReferBy: { type: String, trim: true },

    // isDriver: { type: Boolean, default: false },
    // referByDriverId: { type: String, trim: true },  // New field for ReferBy Driver ID
    // referByDriverName: { type: String, trim: true },  // New field for ReferBy Driver Name

    // File paths
    profilePicture: { type: String },
    aadharFile: { type: String },
    panFile: { type: String },
    dlFile: { type: String },
    bankPassbookFile: { type: String },
  },
  { timestamps: true }
);

const DriverOnboarding = mongoose.model("DriverOnboarding", driverOnboardingSchema, "driveronboardings");
module.exports = DriverOnboarding;
