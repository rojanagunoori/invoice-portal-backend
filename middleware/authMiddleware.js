const jwt =require("jsonwebtoken");



const User = require("../models/User"); // Make sure you import the User model

const protect = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  // Ensure only one "Bearer" is removed
  token = token.replace(/^Bearer\s+/i, "").trim();

  try {
    console.log("Extracted Token:", token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Data:", decoded);

    //req.user = await User.findById(decoded.userId).select("-password");
    //if (!req.user) {
    //  return res.status(404).json({ message: "User not found" });
    //}
    const user = await User.findById(decoded.userId).select("-password");
if (!user) {
  console.log("User not found in database!");
  return res.status(404).json({ message: "User not found" });
}
req.user = user;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };



const protect1 = async(req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password"); // Get user details without password
      if (!req.user) return res.status(404).json({ message: "User not found" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
// ✅ Middleware for authentication
const authenticateUser = async(req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
   // const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
  //  req.user = decoded;
  const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ✅ Now req.user has full user details including role
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Middleware for role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role);  // ✅ Log the user role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have access" });
    }
    next();
  };
};

// ✅ Ensure correct export
module.exports = { protect,authenticateUser, authorizeRoles };

