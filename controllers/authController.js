const User=require("../models/User.js");
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");

 const register = async (req, res) => {
  const { storeName, email, password,role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ storeName, email, password , role });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET//, { expiresIn: "1d" }

    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getStoreDetails = async (req, res) => {
    try {
      const store = await User.findById(req.user.userId).select("-password");
      if (!store) return res.status(404).json({ message: "Store not found" });
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  
  // Update User Details
const updateUser = async (req, res) => {
  try {
    const { storeName, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { storeName, email, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

  module.exports = { register, login, getStoreDetails, updateUser, deleteUser };