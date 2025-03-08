//import express from "express";
const express = require("express");

//import dotenv from "dotenv";
const dotenv = require("dotenv");

//import connectDB from "./config/db.js";
//import authRoutes from "./routes/authRoutes.js";
//import productRoutes from "./routes/productRoutes.js";
//import invoiceRoutes from "./routes/invoiceRoutes.js";
//import cors from "cors";

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
//const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes.js");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
//app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/", (req, res, next) => {
    console.log("Middleware executed!");
    next(); // Pass to the next middleware/route
})

// Routes
app.use("/auth", authRoutes);
//app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/invoices", invoiceRoutes);
/*
app.use("/auth", authRoutes);
app.use("/users", require("./routes/userRoutes"));
app.use("/stores", require("./routes/storeRoutes"));
app.use("/products", productRoutes);
app.use("/orders", require("./routes/orderRoutes"));
app.use("/invoices", invoiceRoutes);*/

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
