const mongoose = require("mongoose");

const driverOnboardingSchema = new mongoose.Schema(
  {
    driverId: { type: String,sparse: true , required: true, unique: true, trim: true }, 
    firstName: { type: String,sparse: true , trim: true },
    secondName: { type: String, trim: true, sparse: true  },
    surname: { type: String, trim: true, sparse: true  },
    fatherName: { type: String,trim: true ,sparse: true },
    address: { type: String, trim: true ,sparse: true },
    dob: { type: Date, sparse: true },

    dlNumber: { type: String, unique: true, trim: true,sparse: true  },
    dlValidTill: { type: Date, sparse: true  },
    DLType: { type: String, trim: true,sparse: true  },

    joiningDate: { type: Date,sparse: true  },
    basicPayment: { type: String, trim: true,sparse: true  },

    nameAsPerBank: { type: String, trim: true,sparse: true  },
    bankAccountNumber: { type: String, trim: true,sparse: true  },
    IFSC: { type: String, trim: true,sparse: true  },
    bankName: { type: String, trim: true ,sparse: true },

    panNo: { type: String,  trim: true,sparse: true  },
    aadharNumber: { type: String, trim: true ,sparse: true },

    contactNumber: { type: String, unique: true, trim: true ,sparse: true },
    emergencyContact: { type: String, trim: true ,sparse: true },
    shiftType: { type: String, trim: true },
    referBy: { type: String, trim: true },
    state: { type: String, trim: true },
    shiftA: { type: Boolean, default: false },
    shiftB: { type: Boolean, default: false },
    isDriver: { type: Boolean, default: false },
    referByDriverId: { type: String, trim: true },  // New field for ReferBy Driver ID
    referByDriverName: { type: String, trim: true },  // New field for ReferBy Driver Name
     // File Upload Paths
     profilePicture: { type: String, sparse: true },
     aadharFile: { type: String, sparse: true },
     panFile: { type: String, sparse: true },
     dlFile: { type: String, sparse: true },
     bankPassbookFile: { type: String, sparse: true },
  },
  { timestamps: true }
);

const DriverOnboarding = mongoose.model("DriverOnboarding", driverOnboardingSchema, "driveronboardings");
module.exports = DriverOnboarding;


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
//     state: { type: String, trim: true, sparse: true },
//     shiftType: { type: String, trim: true },
//     shiftA: { type: Boolean, default: false },
//     shiftB: { type: Boolean, default: false },
//     basicPayment: { type: Number, required: true },
//     nameAsPerBank: { type: String, required: true },
//     bankAccountNumber: { type: String, required: true },
//     IFSC: { type: String, required: true },
//     bankName: { type: String, required: true },
//     panNo: { type: String, required: true, unique: true },
//     aadharNumber: { type: String, required: true, unique: true },
//     contactNumber: { type: String, required: true },
//     emergencyContact: { type: String, required: true },
//     ReferBy: { type: String },

//     // File Uploads
//     profilePicture: { type: String },
//     aadharFile: { type: String },
//     panFile: { type: String },
//     dlFile: { type: String },
//     bankPassbookFile: { type: String },
//   },
//   { timestamps: true }
// );

// const DriverOnboarding = mongoose.model("DriverOnboarding", driverOnboardingSchema);
// module.exports = DriverOnboarding;
