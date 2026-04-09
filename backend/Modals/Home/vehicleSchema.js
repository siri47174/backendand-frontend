const express = require("express");
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: String,
    speed: Number,
  });

  
  const Vehicle = mongoose.model("VehicleSchema", vehicleSchema);
  module.exports=Vehicle;
  