const express = require("express");
const mongoose = require("mongoose");
const DriverOnboarding = require("../Modals/Driver/DriverOnboardingModal");
const Vehicle = require("../Modals/Vehcile/VehicleOnboardingModal");
const router = express.Router();
const Attendance = require("../Modals/Attendance");
const { Parser } = require("json2csv"); // Library to convert JSON to CSV
const multer = require("multer");
const fs = require("fs"); // ✅ Ensure File System is imported
const uploadDir = "uploads/"
const Tesseract = require('tesseract.js');
// Ensure directories exist for driver and vehicle files
const driverDir = `${uploadDir}driverOnboardings/`;
const vehicleDir = `${uploadDir}vehicleOnboardings/`;
const path = require("path");
const Driver=require("../Modals/Driver/AdditionalDriver");

[driverDir, vehicleDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created Directory: ${dir}`);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the API path to determine the directory
    if (req.path.includes("/driver-confirm")) {
      cb(null, driverDir);
    } else if (req.path.includes("/vehicle")) {
      cb(null, vehicleDir);
    } else {
      cb(new Error("Invalid path for file upload."));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post(
  "/driver-confirm",
  upload.fields([
    { name: "profilePicture" },
    { name: "aadharFile" },
    { name: "panFile" },
    { name: "dlFile" },
    { name: "bankPassbookFile" },
  ]),
  async (req, res) => {
    try {
      console.log("Received Data: ", req.body); // Debuggin
      const lastDriver = await DriverOnboarding.findOne().sort({
        driverId: -1,
      });
      // Ensure frontend sends driverId and email
      if (!req.body.driverId) {
        return res
          .status(400)
          .json({ message: "Driver ID and Email are required." });
      }

      // Check for duplicate email
      const existingDriver = await DriverOnboarding.findOne({
        driverId: req.body.driverId,
      });
      //console.log(existingDriver);
      if (existingDriver) {
        return res
          .status(400)
          .json({
            message: "Driver already exists. Please use a different email.",
          });
      }

      const { driverId, shiftType, referBy, state } = req.body;

        // Determine ShiftA or ShiftB if Double Shift
        let shiftA = false;
        let shiftB = false;
        const currentHour = new Date().getHours();
  
        if (shiftType === "24-Hours Double Shift") {
          shiftA = currentHour >= 6 && currentHour < 18;
          shiftB = !shiftA;
        }
  
      // Save File Paths
      const uploadedFiles = {};
      if (req.files) {
        for (const [key, value] of Object.entries(req.files)) {
          uploadedFiles[key] = value[0].path;
        }
      }
     
      // Create a new driver entry with received data
      const newDriver = new DriverOnboarding({ ...req.body, ...uploadedFiles,shiftA,shiftB});
      // console.log("Data received at server:", newDriver);
      // const { ReferBy, state, shiftType, shiftA, shiftB } = req.body;
      // console.log("Received Data:", { ReferBy, state, shiftType, shiftA, shiftB });
      console.log("Saving driver data to MongoDB:", newDriver);
      // Save the new driver
      await newDriver.save();
      console.log("✅ Driver data saved to MongoDB!");

      res.status(201).json({ message: "Driver Onboarding Successful",
         driverDetails: { ...req.body, ...uploadedFiles }
       });
    } catch (err) {
      console.error("❌ Error saving driver onboarding details:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.post("/driver-addon-data", async (req, res) => {
  try {
    const { driverId, shiftType, referBy, state } = req.body;

    // Validate required fields
    if (!driverId || !shiftType || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Determine ShiftA or ShiftB if Double Shift
    let shiftA = false;
    let shiftB = false;
    const currentHour = new Date().getHours();

    if (shiftType === "24-Hours Double Shift") {
      shiftA = currentHour >= 6 && currentHour < 18; // Day Shift (6 AM - 6 PM)
      shiftB = !shiftA; // Night Shift
    }

    // Store Data
    const newDriver = new Driver({ driverId, shiftType, referBy, state, shiftA, shiftB });
    await newDriver.save();

    res.status(201).json({ message: "Driver Onboarded Successfully", data: newDriver });
  } catch (error) {
    console.error("Error saving driver data:", error);
    res.status(500).json({ message: error.message });
  }
});


// API to get driver shift details
router.get('/driver-shift/:driverId', async (req, res) => {
  try {
    const { driverId } = req.params;

    // Find driver by driverId
    const driver = await Driver.findOne({ driverId });

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(driver); // Send all driver data
  } catch (error) {
    console.error('Error fetching driver data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.get("/latest-id", async (req, res) => {
  try {
    // Fetch the last driver entry from the database
    const lastDriver = await DriverOnboarding.findOne()
      .sort({ driverId: -1 })
      .select("driverId");
    console.log("Last driver id=>", lastDriver);

    const latestId = lastDriver ? lastDriver.driverId : "DE0000"; // Fallback to DE0001 if no data
    console.log("Sending latestId:", latestId);
    res.json({ latestId });
    //   res.json({ driverId: newDriverId }); // Send the latest driverId to the frontend
  } catch (err) {
    console.error("❌ Error fetching latest driver ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route to Check if Driver ID Exists in DB
router.post("/checkDriver", async (req, res) => {
  try {
    const { driverId } = req.body;
    const driver = await DriverOnboarding.findOne({ driverId });

    if (driver) {
      console.log(driver.driverId);
      res.json({ valid: true, driverId: driver.driverId });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    console.error("❌ Error checking driver ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/driver", async (req, res) => {
  try {
    const driver = await DriverOnboarding.find(); // Fetch data from database
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

//for fetching driver details and showing in the table of driver onboarding
router.get("/drivers", async (req, res) => {
  try {
    const drivers = await DriverOnboarding.find({});
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ message: "No drivers found." });
    }

    // Sending File Paths for Frontend to Access
    const driverData = drivers.map((driver) => {
      const filePaths = {
        profilePicture: driver.profilePicture
          ? `http://localhost:5001/uploads/${path.basename(driver.profilePicture)}`
          : null,
        aadharFile: driver.aadharFile
          ? `http://localhost:5001/uploads/${path.basename(driver.aadharFile)}`
          : null,
        panFile: driver.panFile
          ? `http://localhost:5001/uploads/${path.basename(driver.panFile)}`
          : null,
        dlFile: driver.dlFile
          ? `http://localhost:5001/uploads/${path.basename(driver.dlFile)}`
          : null,
        bankPassbookFile: driver.bankPassbookFile
          ? `http://localhost:5001/uploads/${path.basename(driver.bankPassbookFile)}`
          : null,
      };
      return { ...driver.toObject(), filePaths };
    });

    res.status(200).json(driverData);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put('/drivers/:driverId', async (req, res) => {
  const { driverId } = req.params;
  const updateData = req.body;

  try {
    // Find and update driver data
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverId },  // Find by driverId
      { $set: updateData }, // Update with request data
      { new: true } // Return updated document
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver updated successfully', updatedDriver });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post("/checkPhoneNumber", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const driver = await DriverOnboarding.findOne({
      contactNumber: phoneNumber,
    });

    if (!driver) {
      return res.status(404).json({ message: "Phone number not registered" });
    }
    console.log("Driver details fetched:", driver);
    console.log(driver);

    res.json({
      message: "Driver found",
      driverDetails: driver, // Send full driver details
    });

    //res.json({ driverId: driver.driverId, message: "Driver found" });
  } catch (error) {
    console.error("Error checking phone number:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/driver-csv", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const driverData = await DriverOnboarding.find();

    if (!driverData.length) {
      return res.status(404).json({ message: "No data available" });
    }

    // Define fields (columns) for CSV
    const fields = Object.keys(driverData[0].toObject());
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(driverData);

    // Set response headers for file download
    res.header("Content-Type", "text/csv");
    res.attachment("driver_data.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Save Draft API
router.post('/save-draft', async (req, res) => {
  try {
    const { driverId, ...data } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { driverId },
      { ...data, isDraft: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Draft saved successfully!', driver });
  } catch (error) {
    res.status(500).json({ message: 'Error saving draft', error });
  }
});

// Submit Form API
router.post('/submit', async (req, res) => {
  try {
    const { driverId, ...data } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { driverId },
      { ...data, isDraft: false },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Form submitted successfully!', driver });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
});

// Get All Drafts API
router.get('/get-all-drafts', async (req, res) => {
  try {
    const drafts = await Driver.find({ isDraft: true });
    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drafts', error });
  }
});

// Get Draft by Driver ID API
router.get('/get-draft/:driverId', async (req, res) => {
  try {
    const { driverId } = req.params;
    const draft = await Driver.findOne({ driverId });
    if (!draft) return res.status(404).json({ message: 'Draft not found' });
    res.status(200).json(draft);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching draft', error });
  }
});

// Delete Draft API
router.delete('/cancel-draft/:driverId', async (req, res) => {
  try {
    const { driverId } = req.params;
    await Driver.deleteOne({ driverId });
    res.status(200).json({ message: 'Draft deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting draft', error });
  }
});



















//vehicle routes
router.get("/vehicle-csv", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const vehicleData = await Vehicle.find();

    if (!vehicleData.length) {
      return res.status(404).json({ message: "No data available" });
    }

    // Define fields (columns) for CSV
    const fields = Object.keys(vehicleData[0].toObject());
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(vehicleData);

    // Set response headers for file download
    res.header("Content-Type", "text/csv");
    res.attachment("diesel_data.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🚛 POST API for Vehicle Onboarding with File Uploads
router.post(
  "/vehicle",
  upload.fields([
    { name: "RegistrationCertificate" },
    { name: "Insurance" },
    { name: "PollutionCertificate" },
    { name: "RoadTax" },
    { name: "FitnessCertificate" },
    { name: "Permit" },
  ]),
  async (req, res) => {
    try {
      console.log("Received Vehicle Data: ", req.body);

      const {
        vehicleNumber,
        registerName,
        vehicleType,
        grossVehicleWeight,
        registrationDate,
        fitnessValidUpto,
        taxValidUpto,
        insuranceValidUpto,
        pollutionValidUpto,
        statePermitValidUpto,
        nationalPermit,
        permitUpto,
        remarks,
      } = req.body;

      if (
        !vehicleNumber ||
        !registerName ||
        !vehicleType ||
        !grossVehicleWeight ||
        !registrationDate ||
        !fitnessValidUpto ||
        !taxValidUpto ||
        !insuranceValidUpto ||
        !pollutionValidUpto ||
        !statePermitValidUpto ||
        !nationalPermit
      ) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }

      const existingVehicle = await Vehicle.findOne({ vehicleNumber });
      if (existingVehicle) {
        return res.status(400).json({ message: "Vehicle already exists with this number." });
      }

      const uploadedFiles = {};
      if (req.files) {
        for (const [key, value] of Object.entries(req.files)) {
          uploadedFiles[key] = value[0].path;
        }
      }

      const newVehicle = new Vehicle({
        vehicleNumber,
        registerName,
        vehicleType,
        grossVehicleWeight,
        registrationDate,
        fitnessValidUpto,
        taxValidUpto,
        insuranceValidUpto,
        pollutionValidUpto,
        statePermitValidUpto,
        nationalPermit,
        permitUpto: nationalPermit === "Yes" ? permitUpto : null,
        remarks,
        ...uploadedFiles,
      });

      await newVehicle.save();
      res.status(201).json({ message: "Vehicle Onboarding Successful", data: newVehicle });
    } catch (err) {
      console.error("❌ Error onboarding vehicle:", err);
      res.status(500).json({ message: "Server error, please try again later." });
    }
  }
);


// 🚚 **GET API to fetch all vehicle numbers**
router.get("/vehicleList", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}, "vehicleNumber"); // Fetch only vehicleNumber
    res.json(vehicles);
  } catch (error) {
    console.error("❌ Error fetching vehicle list:", error);
    res.status(500).json({ message: "Error fetching vehicle list" });
  }
});

router.get("/vehicle/:vehicleNumber", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      vehicleNumber: req.params.vehicleNumber,
    });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    console.error("❌ Error fetching vehicle details:", error);
    res.status(500).json({ error: "Error fetching vehicle details" });
  }
});


// 🚚 **GET API to fetch vehicle details by vehicle number**
router.get("/:vehicleNumber", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      vehicleNumber: req.params.vehicleNumber,
    });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    console.error("❌ Error fetching vehicle details:", error);
    res.status(500).json({ error: "Error fetching vehicle details" });
  }
});



// Convert to 12-hour format with AM/PM
const formatTo12Hour = (time) => {
  const date = new Date(time);
  return date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

router.get("/documents", async (req, res) => {
  try {
    console.log("Fetching vehicle documents...");
    const documents = await Vehicle.find();
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
});


router.post("/attendance", async (req, res) => {
  try {
    const { driverId, vehicleNumber, startTime, stopTime, duration,driverShiftLabel,shiftDetail } = req.body;

    // Validate Data
    if (!driverId || !vehicleNumber || !startTime || !stopTime || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to database
    const newAttendance = new Attendance({
      driverId,
      vehicleNumber,
      startTime,
      stopTime,
      duration,
      driverShiftLabel,
      shiftDetail

    });
    await newAttendance.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance" });
    console.error(error);
  }
});


// ✅ Fetch Attendance for a Specific Driver
router.get("/attendance/:driverId", async (req, res) => {
  const { driverId } = req.params;

  try {
    const attendanceData = await Attendance.find({ driverId });
    if (attendanceData.length === 0) {
      return res.status(404).json({ error: "No attendance found for this driver" });
    }
    res.json(attendanceData);

  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance data" });
  }
});




router.post('/validate-file', upload.single('file'), async (req, res) => {
  const { docType } = req.body;
  const filePath = req.file.path;

  try {
    const { data: { text } } = await Tesseract.recognize(filePath);

    const keywords = {
      RegistrationCertificate: ['registration', 'certificate'],
      Insurance: ['insurance', 'policy'],
      PollutionCertificate: ['pollution', 'certificate'],
      RoadTax: ['road', 'tax'],
      FitnessCertificate: ['fitness', 'certificate'],
      Permit: ['permit', 'validity']
    };

    const validKeywords = keywords[docType];
    const isValid = validKeywords.some(keyword => text.toLowerCase().includes(keyword));

    if (!isValid) {
      return res.json({ isValid: false });
    }

    res.json({ isValid: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isValid: false, error: error.message });
  }
});

// GET All Vehicles
router.get("/all-vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found." });
    }

    // Sending File Paths for Frontend to Access
    const vehicleData = vehicles.map((vehicle) => {
      const filePaths = {
        RegistrationCertificate: vehicle.RegistrationCertificate
          ? `http://localhost:5001/uploads/${path.basename(vehicle.RegistrationCertificate)}`
          : null,
        Insurance: vehicle.Insurance
          ? `http://localhost:5001/uploads/${path.basename(vehicle.Insurance)}`
          : null,
        PollutionCertificate: vehicle.PollutionCertificate
          ? `http://localhost:5001/uploads/${path.basename(vehicle.PollutionCertificate)}`
          : null,
        RoadTax: vehicle.RoadTax
          ? `http://localhost:5001/uploads/${path.basename(vehicle.RoadTax)}`
          : null,
        FitnessCertificate: vehicle.FitnessCertificate
          ? `http://localhost:5001/uploads/${path.basename(vehicle.FitnessCertificate)}`
          : null,
        Permit: vehicle.Permit
          ? `http://localhost:5001/uploads/${path.basename(vehicle.Permit)}`
          : null,
      };
      return { ...vehicle.toObject(), filePaths };
    });

    res.status(200).json(vehicleData);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Timesheet Routes
const TimesheetSchema = new mongoose.Schema({ 
  driverName: String, vehicleNumber: String, date: String, 
  startTime: String, endTime: String, totalHours: Number, totalMinutes: Number 
}, { timestamps: true });
const Timesheet = mongoose.models.Timesheet || mongoose.model("Timesheet", TimesheetSchema);

router.get("/timesheet", async (req, res) => { 
  try { res.json(await Timesheet.find().sort({ createdAt: -1 })); } 
  catch (e) { res.status(500).json({ message: "Error", error: e }); } 
});
router.post("/timesheet", async (req, res) => { 
  try { const r = new Timesheet(req.body); await r.save(); res.status(201).json(r); } 
  catch (e) { res.status(500).json({ message: "Error", error: e }); } 
});

module.exports = router;
