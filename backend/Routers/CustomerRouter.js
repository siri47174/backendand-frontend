const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({ invoiceNumber: String, customerName: String, vehicleNumber: String, tripFrom: String, tripTo: String, invoiceDate: Date, dueDate: Date, amount: Number, gstAmount: Number, totalAmount: Number, status: { type: String, default: "Unpaid" } }, { timestamps: true });
const Invoice = mongoose.models.CustomerInvoice || mongoose.model("CustomerInvoice", InvoiceSchema);

const PaymentStatusSchema = new mongoose.Schema({ customerName: String, invoiceNumber: String, invoiceAmount: Number, amountReceived: Number, balanceDue: Number, paymentDate: Date, paymentMode: String, utrNumber: String, remarks: String, status: { type: String, default: "Pending" } }, { timestamps: true });
const PaymentStatusModel = mongoose.models.CustomerPayment || mongoose.model("CustomerPayment", PaymentStatusSchema);

router.get("/invoices", async (req, res) => { try { res.json(await Invoice.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/invoices", async (req, res) => { try { const r = new Invoice(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.get("/payment-status", async (req, res) => { try { res.json(await PaymentStatusModel.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/payment-status", async (req, res) => { try { const r = new PaymentStatusModel(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });


// Agreement Routes
const AgreementSchema = new mongoose.Schema({ customerName: String, vehicleNumber: String, agreementType: String, startDate: Date, endDate: Date, ratePerKm: Number, fixedRate: Number, paymentTerms: String, terms: String, status: { type: String, default: "Active" } }, { timestamps: true });
const Agreement = mongoose.models.Agreement || mongoose.model("Agreement", AgreementSchema);
router.get("/agreements", async (req, res) => { try { res.json(await Agreement.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/agreements", async (req, res) => { try { const r = new Agreement(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });

// GST Routes
const GSTSchema = new mongoose.Schema({ customerName: String, gstNumber: String, invoiceNumber: String, invoiceDate: Date, taxableAmount: Number, cgst: Number, sgst: Number, igst: Number, totalGST: Number, totalAmount: Number, filingPeriod: String, filingStatus: { type: String, default: "Pending" } }, { timestamps: true });
const GSTEntry = mongoose.models.GSTEntry || mongoose.model("GSTEntry", GSTSchema);
router.get("/gst", async (req, res) => { try { res.json(await GSTEntry.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: "Error" }); } });
router.post("/gst", async (req, res) => { try { const r = new GSTEntry(req.body); await r.save(); res.status(201).json(r); } catch (e) { res.status(500).json({ message: "Error" }); } });

module.exports = router;
