const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded ID and exclude the password field
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Proceed to the next middleware
      return next();
    }

    // If no token is provided in the header
    res.status(401).json({ message: "Not authorized, token missing" });
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, not authorized" });
    }

    // General error handling
    res.status(500).json({ message: "Server error, authentication failed" });
  }
};

module.exports = { protect };
