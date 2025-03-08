const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store"},
  price: { type: Number },
  stock: { type: Number },
  quantity: { type: Number },
}, { timestamps: true });

module.exports= mongoose.model("Product", productSchema);
