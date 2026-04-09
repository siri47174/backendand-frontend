const express = require("express");
const mongoose = require("mongoose");
const DriverAttendance = require("../Modals/Attendance");
const DriverAdvance = require("../Modals/Advance");
const router = express.Router();
const Payout = require("../Modals/Driver/DriverPayout");
const Leave = require("../Modals/Driver/LeaveSchema");
const DriverOnboarding = require("../Modals/Driver/DriverOnboardingModal");
const SalaryPayment = require("../Modals/Driver/Salary");

// API to request an advance
router.post("/request", async (req, res) => {
  const { driverId, driverName, month, requestedAmount } = req.body;

  if (
    !driverId ||
    !driverName ||
    !month ||
    !requestedAmount ||
    isNaN(requestedAmount) ||
    requestedAmount <= 0
  ) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const newAdvance = new DriverAdvance({
      driverId,
      driverName,
      month,
      requestedAmount,
    });

    await newAdvance.save();
    res
      .status(200)
      .json({
        message: "Advance request submitted successfully",
        data: newAdvance,
      });
  } catch (error) {
    console.error("Error submitting advance request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete API for leave request
router.delete("/leaves/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLeave = await Leave.findByIdAndDelete(id);
    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting leave request" });
  }
});

// API to get all advance requests (Admin)
router.get("/result", async (req, res) => {
  try {
    const advances = await DriverAdvance.find();
    res.status(200).json(advances);
  } catch (error) {
    console.error("Error fetching advance requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /advance/pending
router.get("/pending", async (req, res) => {
  try {
    // Find only pending records
    const pendingAdvances = await DriverAdvance.find({
      approvalStatus: "Pending",
    });
    res.status(200).json(pendingAdvances);
  } catch (error) {
    console.error("Error fetching pending advances:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /advance/records
router.get("/records", async (req, res) => {
  try {
    // Find only approved or rejected records
    const records = await DriverAdvance.find({
      approvalStatus: { $in: ["Approved", "Rejected"] },
    });
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/manual", async (req, res) => {
  const {
    driverId,
    driverName,
    month,
    requestedAmount,
    approvedAmount,
    status,
    adminName,
  } = req.body;

  if (
    !driverId ||
    !driverName ||
    !month ||
    !requestedAmount ||
    !approvedAmount
  ) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const newAdvance = new DriverAdvance({
      driverId,
      driverName,
      month,
      requestedAmount,
      approvedAmount,
      approvalStatus: status,
      approvedBy: adminName,
    });

    await newAdvance.save();
    res
      .status(201)
      .json({
        message: "Manual advance request added successfully",
        data: newAdvance,
      });
  } catch (error) {
    console.error("Error adding manual request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/approve", async (req, res) => {
  const { advanceId, status, approvedAmount, adminName } = req.body;

  if (!advanceId || !status) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const advance = await DriverAdvance.findById(advanceId);
    if (!advance) {
      return res.status(404).json({ message: "Advance request not found" });
    }

    advance.approvalStatus = status;
    advance.approvedAmount = status === "Approved" ? approvedAmount : 0;
    advance.approvedBy = adminName || "Unknown Admin";
    // ✅ Set approvedAt if Approved
    if (status === "Approved") {
      advance.approvedAt = new Date();
    } else {
      advance.approvedAt = null; // Clear approvedAt if not approved
    }

    await advance.save();

    res
      .status(200)
      .json({
        message: `Advance ${status.toLowerCase()} successfully`,
        data: advance,
      });
  } catch (error) {
    console.error(`Error processing advance request:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/approved/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const approvedAdvances = await DriverAdvance.find({
      driverId,
      approvalStatus: "Approved",
    });
    res.status(200).json(approvedAdvances);
  } catch (error) {
    console.error("Error fetching approved advances:", error);
    res.status(500).json({ message: "Failed to fetch approved advances" });
  }
});
// POST: Submit a leave request
router.post("/leaves", async (req, res) => {
  const { driverId, startDate, endDate, reason } = req.body;

  try {
    const leave = new Leave({
      driverId,
      startDate,
      endDate,
      reason,
      status: "Pending", // Default status
    });

    await leave.save();
    res.json({
      success: true,
      message: "Leave request submitted successfully!",
    });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch leave history for a driver
router.get("/leaves/:driverId", async (req, res) => {
  const { driverId } = req.params;

  try {
    const leaves = await Leave.find({ driverId }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    console.error("Error fetching leave history:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all leave requests for Admin
router.get("/leaves", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: Approve or Reject leave with leaveType (Paid/Unpaid)
router.put("/leaves/:id", async (req, res) => {
  const { id } = req.params;
  const { status, leaveType } = req.body;

  try {
    const leaveRequest = await Leave.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leaveRequest.status = status;
    leaveRequest.leaveType =
      status === "Approved" ? leaveType || "Paid Leave" : "";

    await leaveRequest.save();
    res
      .status(200)
      .json({
        message: `Leave request ${status} successfully!`,
        data: leaveRequest,
      });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Driver Payout API
router.get("/payout/:driverId/:month", async (req, res) => {
  const { driverId, month } = req.params;

  try {
    const driver = await DriverOnboarding.findOne({ driverId });
    console.log(driver, driverId, month);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const basicPayment = driver.basicPayment || 0;
    console.log("basic Payment=", basicPayment);
   
    const [year, monthNumber] = month.split('-').map(Number);

    // Fix the total days calculation
    const totalDays = new Date(year, monthNumber, 0).getDate();
    console.log("Total days:", totalDays);
    
    // Regex to find records by month and year
    const monthRegex = new RegExp(`^\\d{2}/${monthNumber.toString().padStart(2, '0')}/${year}`, 'i');
    
    const attendance = await DriverAttendance.find({ 
      driverId,
      startTime: { $regex: monthRegex },
      status: "Approved" 
    });
    
    const totalWorkingDays = attendance.length;
    console.log("Total Working Days:", totalWorkingDays);
    
    console.log("Fetched Attendance Records:", attendance);
if (attendance.length === 0) {
  console.log("No matching attendance found for driverId:", driverId, "and month:", month);
}



    const dailyWage = basicPayment / totalDays;
    console.log("dailyWage=", dailyWage);
    const earnedPayment = dailyWage * totalWorkingDays;
    console.log("earnedPayment=", earnedPayment);

    const [years, monthNumbers] = month.split('-');
    const monthRegexes = new RegExp(`\\b${monthNumbers}/${year}\\b`); // Create regex like "03/2025"
    
    const advances = await DriverAdvance.find({
      driverId,
      month: { $regex: monthRegexes}
    });
    

    const totalAdvanceDeduction = advances.reduce(
      (acc, curr) => acc + (curr?.approvedAmount || 0),
      0
    );
    console.log("totalAdvanceDeduction=", totalAdvanceDeduction);

    // const deductions = 500; // Example
    const referralBonus = driver.referralBonus || 0;

    const payableAmount =
      earnedPayment + referralBonus - totalAdvanceDeduction ;
      const totalHolidays=totalDays-totalWorkingDays;
      res.json({
        totalDays,
        basicPayment: isNaN(basicPayment) ? "0.00" : Number(basicPayment).toFixed(2),
        dailyWage: isNaN(dailyWage) ? "0.00" : Number(dailyWage).toFixed(2),
        totalWorkingDays,
        totalHolidays:isNaN(totalHolidays) ? "0" : totalHolidays,
        earnedPayment: isNaN(earnedPayment) ? "0.00" : Number(earnedPayment).toFixed(2),
        totalAdvanceDeduction: isNaN(totalAdvanceDeduction) ? "0.00" : Number(totalAdvanceDeduction).toFixed(2),
        referralBonus: isNaN(referralBonus) ? "0.00" : Number(referralBonus).toFixed(2),
        payableAmount: isNaN(payableAmount) ? "0.00" : Number(payableAmount).toFixed(2),
      });
      
  } catch (error) {
    console.error("Error fetching driver payout:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Approve Driver Salary API
router.get('/approve/:driverId/:month', async(req, res)=>{
  const { driverId, month } = req.params;
  try{
    const salaryApprove = await SalaryPayment.findOne({driverId, salaryMonth : month, approve : false});

    if(!salaryApprove) return res.status(404).json({ message: "No record found or already approved" });

    salaryApprove.approve = true;
    await salaryApprove.save();
    res.json({ message: "Approval successful", salaryApprove });
  }
  
  catch (error) {
    console.error("Error in Approving", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


router.get("/approved-leaves/:driverId", async (req, res) => {
  const { driverId } = req.params;

  try {
    const approvedLeaves = await Leave.find({
      driverId,
      status: "Approved",
    });

    res.status(200).json({ approvedLeaves });
  } catch (error) {
    console.error("Error fetching approved leaves:", error);
    res.status(500).json({ message: "Failed to fetch approved leaves" });
  }
});


// Vendor Advance
const mongoose2 = require("mongoose");
const VendorAdvanceSchema = new mongoose2.Schema({ vendorName: String, vehicleNumber: String, advanceType: String, amount: Number, date: Date, paymentMode: String, reason: String, status: { type: String, default: "Pending" } }, { timestamps: true });
const VendorAdvance = mongoose2.models.VendorAdvance || mongoose2.model("VendorAdvance", VendorAdvanceSchema);

const VendorDeductionSchema = new mongoose2.Schema({ vendorName: String, vehicleNumber: String, deductionType: String, amount: Number, date: Date, description: String, tripNumber: String }, { timestamps: true });
const VendorDeduction = mongoose2.models.VendorDeduction || mongoose2.model("VendorDeduction", VendorDeductionSchema);

const VendorPaymentSchema = new mongoose2.Schema({ vendorName: String, vehicleNumber: String, invoiceNumber: String, tripNumber: String, grossAmount: Number, deductions: Number, netAmount: Number, paymentDate: Date, paymentMode: String, utrNumber: String, remarks: String, status: { type: String, default: "Pending" } }, { timestamps: true });
const VendorPayment = mongoose2.models.VendorPayment || mongoose2.model("VendorPayment", VendorPaymentSchema);

router.get("/vendor-advance", async (req, res) => { try { res.json(await VendorAdvance.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/vendor-advance", async (req, res) => { try { const r = new VendorAdvance(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.get("/vendor-deduction", async (req, res) => { try { res.json(await VendorDeduction.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/vendor-deduction", async (req, res) => { try { const r = new VendorDeduction(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.get("/vendor-payment", async (req, res) => { try { res.json(await VendorPayment.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/vendor-payment", async (req, res) => { try { const r = new VendorPayment(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });

module.exports = router;
