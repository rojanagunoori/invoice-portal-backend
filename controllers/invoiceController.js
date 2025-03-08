const Invoice=require("../models/Invoice.js");
const { jsPDF } =require("jspdf");

// Generate Invoice
// Assuming you have an Invoice model

exports.generateInvoice = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invoice must have at least one item.' });
        }

        let grandTotalWithoutTax = 0;
        let grandTotalWithTax = 0;

        // Validate and calculate totals
        const validatedItems = items.map(item => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseFloat(item.quantity) || 0;
            const taxRate = parseFloat(item.taxRate) || 0;

            const itemTotal = price * quantity;
            const tax = (itemTotal * taxRate) / 100;
            const totalWithTax = itemTotal + tax;

            grandTotalWithoutTax += itemTotal;
            grandTotalWithTax += totalWithTax;

            return {
                name: item.name || 'Unnamed Item',
                price,
                quantity,
                taxRate,
                itemTotal,
                tax
            };
        });

        // Ensure valid numbers (prevent NaN issues)
        grandTotalWithoutTax = Number(grandTotalWithoutTax.toFixed(2));
        grandTotalWithTax = Number(grandTotalWithTax.toFixed(2));

        // Create new invoice
        const invoice = new Invoice({
            items: validatedItems,
            grandTotalWithoutTax,
            grandTotalWithTax
        });

        await invoice.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice });
    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



exports.generateInvoice1 = async (req, res) => {
  try {
    const { orderId, items } = req.body;
    const storeId = req.user.userId;
    

    let grandTotalWithoutTax = 0;
    let grandTotalWithTax = 0;

    const processedItems = items.map((item) => {
      const itemTotal = item.quantity * item.dealPrice;
      const tax = itemTotal * 0.1; // 10% tax
      grandTotalWithoutTax += itemTotal;
      grandTotalWithTax += itemTotal + tax;

      return { ...item, itemTotal, tax };
    });

    const invoice = await Invoice.create({
      store: storeId,
      orderId,
      items: processedItems,
      grandTotalWithoutTax,
      grandTotalWithTax,
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch Invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ store: req.user.userId });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Generate PDF Invoice
exports.generatePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const doc = new jsPDF();
    doc.text(`Invoice: ${invoice.orderId}`, 10, 10);
    doc.text(`Date: ${invoice.date.toISOString().split("T")[0]}`, 10, 20);

    let yPos = 40;
    invoice.items.forEach((item) => {
      doc.text(`${item.name} - ${item.quantity} x ${item.dealPrice} = ${item.itemTotal}`, 10, yPos);
      doc.text(`Tax: ${item.tax}`, 150, yPos);
      yPos += 10;
    });

    doc.text(`Grand Total (Without Tax): ${invoice.grandTotalWithoutTax}`, 10, yPos + 10);
    doc.text(`Grand Total (With Tax): ${invoice.grandTotalWithTax}`, 10, yPos + 20);

    const pdfBuffer = doc.output("arraybuffer");
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBuffer));


   // const doc = new PDFDocument();
   // res.setHeader("Content-Type", "application/pdf");
    //res.setHeader("Content-Disposition", `attachment; filename=invoice-${invoice.id}.pdf`);

    //doc.pipe(res);
    //doc.fontSize(18).text("Invoice", { align: "center" });
    //doc.text(`Invoice ID: ${invoice.id}`);
    //doc.text(`Customer: ${invoice.customer}`);
    //doc.text(`Amount: $${invoice.amount}`);
    //doc.text(`Date: ${invoice.date.toDateString()}`);
    //doc.end();
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("order customer store");
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single invoice
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("order customer store");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//module.exports = { generateInvoice,getInvoices,generatePDF };
