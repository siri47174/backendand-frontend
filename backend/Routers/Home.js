const express = require("express");
const mongoose = require("mongoose");
const app = express.Router();
app.use(express.json());
const Vehicle=require("../Modals/Home/vehicleSchema");
const History=require("../Modals/Home/historySchema") ;
const Parking=require("../Modals/Home/vehicleSchema");

// Fetch all vehicles
app.get("/fetch-locations", async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles" });
    }
  });
  
  // Fetch vehicle history by number
  app.get("/history/:vehicleNumber", async (req, res) => {
    try {
      const history = await History.findOne({ vehicleNumber: req.params.vehicleNumber });
      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }
      res.json(history.history);
    } catch (error) {
      res.status(500).json({ message: "Error fetching history" });
    }
  });
  
  // Fetch parking details by number
 // Fetch parking details by vehicle number
app.get("/parking/:vehicleNumber", async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    const parking = await Parking.findOne({ vehicleNumber });

    if (!parking) {
      return res.status(404).json({ message: "Parking details not found" });
    }

    res.json(parking.parking);
  } catch (error) {
    console.error("Error fetching parking details:", error);
    res.status(500).json({ message: "Error fetching parking details" });
  }
});
  module.exports=app;
  