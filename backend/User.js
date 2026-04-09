// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   // password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);
// console.log(User);
// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName:{type:String,required:true},
  password: { type: String }, // Store hashed password
  otp: { type: String }, // Store OTP
});

const User = mongoose.model("User", userSchema);
module.exports = User;
