const express = require("express");
const mongoose = require("mongoose");
const Diesel = require("../Modals/Vehcile/Diesel");
const router = express.Router();
const { Parser } = require("json2csv"); // Library to convert JSON to CSV
const OilService=require("../Modals/Vehcile/OilService");
const SpareParts=require("../Modals/Vehcile/SpareParts");
const Expenses=require("../Modals/Vehcile/Expense");
const { userAuth } = require("../Middlewares/userAuth");

// Create Diesel Entry
router.post("/diesel", async (req, res) => {
  try {
    const dieselEntry = new Diesel(req.body);
    await dieselEntry.save();
    res.status(201).json({ message: "Diesel entry saved successfully", dieselEntry });
  } catch (error) {
    res.status(500).json({ message: "Error saving diesel entry", error });
  }
});
router.get("/diesel", async (req, res) => {
    try {
      const dieselData = await Diesel.find(); // Fetch data from database
      res.json(dieselData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  });

  router.get("/expenses",userAuth, async (req, res) => {
    try {
      const dieselData = await Diesel.find(); // Fetch data from database
      res.json(dieselData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  });

  router.post("/expenses",userAuth, async (req, res) => {
    try {
      const expensesEntry = new Expenses(req.body);
      await expensesEntry.save();
      res.status(201).json({ message: "Diesel entry saved successfully", expensesEntry });
    } catch (error) {
      res.status(500).json({ message: "Error saving diesel entry", error });
    }
  });
  

router.post("/oil-service",userAuth, async (req, res) => {
    try {
      const oilServiceEntry = new OilService(req.body);
      await oilServiceEntry.save();
      res.status(201).json({ message: "Diesel entry saved successfully", oilServiceEntry});
    } catch (error) {
      res.status(500).json({ message: "Error saving diesel entry", error });
    }
  });

  router.post("/spare-parts", async (req, res) => {
    try {
      const sparePartsEntry = new SpareParts(req.body);
      await sparePartsEntry.save();
      res.status(201).json({ message: "Diesel entry saved successfully", sparePartsEntry });
    } catch (error) {
      res.status(500).json({ message: "Error saving diesel entry", error });
    }
  });

router.get("/diesel-csv", async (req, res) => {
    try {
        // Fetch data from MongoDB
        const dieselData = await Diesel.find();

        if (!dieselData.length) {
            return res.status(404).json({ message: "No data available" });
        }

        // Define fields (columns) for CSV
        const fields = Object.keys(dieselData[0].toObject());
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dieselData);

        // Set response headers for file download
        res.header("Content-Type", "text/csv");
        res.attachment("diesel_data.csv");
        return res.send(csv);
    } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/oil-service-csv", async (req, res) => {
    try {
        // Fetch data from MongoDB
        const oilServiceData = await OilService.find();

        if (!oilServiceData.length) {
            return res.status(404).json({ message: "No data available" });
        }

        // Define fields (columns) for CSV
        const fields = Object.keys(oilServiceData[0].toObject());
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(oilServiceData);

        // Set response headers for file download
        res.header("Content-Type", "text/csv");
        res.attachment("oilService_data.csv");
        return res.send(csv);
    } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/spare-parts-csv", async (req, res) => {
    try {
        // Fetch data from MongoDB
        const SpareParts = await SpareParts.find();

        if (!SpareParts.length) {
            return res.status(404).json({ message: "No data available" });
        }

        // Define fields (columns) for CSV
        const fields = Object.keys(SpareParts[0].toObject());
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(SpareParts);

        // Set response headers for file download
        res.header("Content-Type", "text/csv");
        res.attachment("spare_parts_data.csv");
        return res.send(csv);
    } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/fetch-locations', async (req, res) => {
  try {
    const response = await fetch('https://api.wheelseye.com/currentLoc?accessToken=69039e62-a011-4321-beda-48411103d489');
    const result = await response.json();
    //console.log("request received at the backend-", result);
    // Check for valid API data
    if (!result || !result.data || !Array.isArray(result.data.list)) {
      return res.status(500).json({ message: 'Invalid data format from API' });
    }

    const vehiclesData = result.data.list;
    //console.log("Fetched Vehicles Data:", vehiclesData);

    // Send data directly to the frontend
    res.json(vehiclesData);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});



// Truck Maintenance Routes
const TruckMaintenance = require("../Modals/Vehcile/TruckMaintenance");

router.get("/truck-maintenance", async (req, res) => {
  try {
    const data = await TruckMaintenance.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching truck maintenance records", error });
  }
});

router.post("/truck-maintenance", async (req, res) => {
  try {
    const entry = new TruckMaintenance(req.body);
    await entry.save();
    res.status(201).json({ message: "Truck maintenance record saved", entry });
  } catch (error) {
    res.status(500).json({ message: "Error saving truck maintenance record", error });
  }
});

// Other Expenses Routes
const OtherExpenseSchema = new mongoose.Schema({ category: String, description: String, date: Date, amount: Number, paidBy: String, paymentMode: String, approvedBy: String, remarks: String }, { timestamps: true });
const OtherExpense = mongoose.models.OtherExpense || mongoose.model("OtherExpense", OtherExpenseSchema);

router.get("/other-expenses", async (req, res) => {
  try { res.json(await OtherExpense.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error", error: e }); }
});
router.post("/other-expenses", async (req, res) => {
  try { const e = new OtherExpense(req.body); await e.save(); res.status(201).json(e); } catch (e) { res.status(500).json({ message: "Error", error: e }); }
});

module.exports = router;
