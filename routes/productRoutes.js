const express = require("express");
const { getProducts, getProductById, updateProduct, deleteProduct, addProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.post("/", protect,addProduct //createProduct

);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;



/*const express = require("express");
const { getProducts, addProduct, deleteProduct, getProductById, createProduct, updateProduct } = require("../controllers/productController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", protect, getProducts);
router.post("/", protect, addProduct);
router.delete("/:id", protect, deleteProduct);


router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports=router;
*/