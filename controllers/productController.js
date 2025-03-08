const Product =require("../models/Product.js");

// PRODUCT CONTROLLERS
exports.getProducts = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      //return res.status(401).json({ message: "Unauthorized" });
    }
    const products = await Product.find({ store: req.user.userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("store");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
     // return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, price, stock } = req.body;
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = await Product.create({ name, price, stock, store: req.user.userId });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/*const Product =require("../models/Product.js");

 const getProducts = async (req, res) => {
  const products = await Product.find({ store: req.user.userId });
  res.json(products);
};

 const addProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const product = await Product.create({ name, price, stock, store: req.user.userId });
  res.status(201).json(product);
};

 const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
module.exports = { getProducts,addProduct,deleteProduct };


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("store");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
*/

