const mongoose =require("mongoose");

const invoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  orderId: { type: String },
  amount:{ type: Number, default: 0},
  date: { type: Date, default: Date.now },
  items: [
    {
      name: { type: String , default: 0},
      quantity: { type: Number, default: 0},
      regularPrice: { type: Number, default: 0 },
      dealPrice: { type: Number, default: 0},
      itemTotal: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
    }
  ],
  grandTotalWithoutTax: { type: Number, default: 0 },
  grandTotalWithTax: { type: Number , default: 0},
  pdfUrl: { type: String}, // Link to the generated invoice PDF
}, { timestamps: true });

module.exports= mongoose.model("Invoice", invoiceSchema);
