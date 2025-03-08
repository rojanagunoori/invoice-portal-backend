//import express from "express";
const express = require("express");
const { register, login, getStoreDetails, updateUser, deleteUser }=require("../controllers/authController.js");
const { protect }=require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/store", protect, getStoreDetails);
router.put("/store", protect, updateUser); // Update user details
router.delete("/store", protect, deleteUser);


module.exports= router;
