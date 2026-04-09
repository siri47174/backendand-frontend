const express = require("express");
const mongoose = require("mongoose");
const Deduction=require("../Backend/Modals/Driver/Deduction");
const router = express.Router();

// API Endpoint to Submit Data
router.post("/deductions", async (req, res) => {
    try {
      const newDeduction = new Deduction(req.body);
      await newDeduction.save();
      res.status(201).json({ message: "Deduction saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error saving data" });
    }
  });

  module.exports=router;
  
