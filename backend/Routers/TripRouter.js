const express = require("express");
const mongoose = require("mongoose");
const app = express.Router();
app.use(express.json());
const Trip = require("../Modals/tripSchema");

// ✅ Start Trip API
app.post("/start-trip", async (req, res) => {
  try {
    const { driverId, vehicleNumber } = req.body;

    // Validate input
    if (!driverId || !vehicleNumber) {
      return res.status(400).json({ message: "DriverId and VehicleNumber are required" });
    }

    // Check if trip is already running
    const existingTrip = await Trip.findOne({ driverId, isRunning: true });
    if (existingTrip) {
      return res.status(400).json({ message: "Trip already in progress" });
    }

    // Create new trip
    const newTrip = new Trip({ driverId, vehicleNumber, startTime: new Date(), isRunning: true });
    await newTrip.save();

    res.status(201).json({ message: "Trip started successfully", tripId: newTrip._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to start trip", error: error.message });
  }
});

// ✅ Stop Trip API
app.post("/stop-trip", async (req, res) => {
  try {
    const { driverId } = req.body;

    if (!driverId) {
      return res.status(400).json({ message: "DriverId is required" });
    }

    const trip = await Trip.findOne({ driverId, isRunning: true });

    if (!trip) {
      return res.status(404).json({ message: "No active trip found" });
    }

    const stopTime = new Date();
    const duration = Math.floor((stopTime - trip.startTime) / 1000);

    trip.isRunning = false;
    await trip.save();

    res.status(200).json({ message: "Trip stopped", duration });
  } catch (error) {
    res.status(500).json({ message: "Failed to stop trip", error: error.message });
  }
});
app.get("/get-trip-status/:driverId", async (req, res) => {
    const { driverId } = req.params;
    try {
      const trip = await Trip.findOne({ driverId, isRunning: true });
      if (!trip) {
        return res.json({ isRunning: false });
      }
      const currentTime = new Date();
      const duration = Math.floor((currentTime - trip.startTime) / 1000);
      res.json({ isRunning: true, startTime: trip.startTime, duration });
    } catch (error) {
      console.error("Error fetching trip status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


// Trip Sheet Routes
const mongoose3 = require("mongoose");
const TripSheetSchema = new mongoose3.Schema({ 
  tripNumber: String, vendorName: String, vehicleNumber: String, driverName: String, 
  origin: String, destination: String, loadingDate: Date, unloadingDate: Date, 
  material: String, weight: Number, freight: Number, advancePaid: Number, 
  balanceFreight: Number, status: { type: String, default: "Pending" } 
}, { timestamps: true });
const TripSheet = mongoose3.models.TripSheet || mongoose3.model("TripSheet", TripSheetSchema);

app.get("/trip-sheet", async (req, res) => { 
  try { res.json(await TripSheet.find().sort({ createdAt: -1 })); } 
  catch (e) { res.status(500).json({ message: "Error", error: e }); } 
});
app.post("/trip-sheet", async (req, res) => { 
  try { const r = new TripSheet(req.body); await r.save(); res.status(201).json(r); } 
  catch (e) { res.status(500).json({ message: "Error", error: e }); } 
});

module.exports = app;
