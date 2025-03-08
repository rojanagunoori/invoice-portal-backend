
const express = require("express");
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("admin","customer"), createOrder);
router.put("/:id", authenticateUser, authorizeRoles("admin","store_owner"), updateOrder);
router.get("/:id", authenticateUser, authorizeRoles("admin","customer"), getOrderById);
router.get("/", authenticateUser, authorizeRoles("admin", "store_owner"), getOrders);
router.delete("/:id", authenticateUser, authorizeRoles("admin","store_owner"), deleteOrder);

module.exports = router;



/*const express = require("express");
const Order = require("../models/Order");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

// Create new order (Customer Only)
router.post("/", authenticateUser, authorizeRoles("customer"), async (req, res) => {
  const order = await Order.create({ customer: req.user.id, products: req.body.products });
  res.status(201).json(order);
});

// Store Owner Updates Order Status
router.put("/:id/status", authenticateUser, authorizeRoles("storeOwner"), async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, updatedAt: Date.now() }, { new: true });
  res.json(order);
});

// Customer Tracks Order
router.get("/:id", authenticateUser, authorizeRoles("customer"), async (req, res) => {
  const order = await Order.findById(req.params.id).populate("products");
  res.json(order);
});


router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
*/