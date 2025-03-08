const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
 products: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    price: { type: Number },
  }
],
totalAmount: { type: Number},
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  items: [
    {
      name: { type: String }, // Product Name
      quantity: { type: Number}, // Ordered Quantity
      regularPrice: { type: Number }, // Original Price
      dealPrice: { type: Number }, // Discounted Price
      itemTotal: { type: Number }, // Quantity * dealPrice
      tax: { type: Number }, // Tax amount per item
    }
  ],
  grandTotalWithoutTax: { type: Number },
  grandTotalWithTax: { type: Number },
  status: { type: String, enum: ["Pending", "Shipped", "Out for Delivery", "Delivered"], default: "Pending" },
  trackingNumber: String,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
