const express = require("express");
const { generateInvoice, getInvoices, generatePDF, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, generateInvoice);
router.get("/", protect, getInvoices);
router.get("/:id/pdf", protect, generatePDF);


//router.get("/", getInvoices);
router.get("/:id", protect, getInvoiceById);
//router.post("/", protect, createInvoice);
router.put("/:id", protect, updateInvoice);
router.delete("/:id", protect, deleteInvoice);

module.exports=router;
