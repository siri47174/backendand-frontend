const express = require("express");
const mongoose = require("mongoose");
 const historySchema = new mongoose.Schema({
    vehicleNumber: String,
    history: [
      {
        time: String,
        location: String,
      },
    ],
  });
  

const History = mongoose.model("History", historySchema);
module.exports=History;