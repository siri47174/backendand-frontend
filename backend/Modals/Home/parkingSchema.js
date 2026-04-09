const express = require("express");
const mongoose = require("mongoose");
 const parkingSchema = new mongoose.Schema({
    vehicleNumber: String,
    parking: [
      {
        time: String,
        location: String,
      },
    ],
  });

 const Parking = mongoose.model("Parking", parkingSchema);
 module.exports=Parking;

 