// Import dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");

// Import custom modules
const dbConnection = require("./config/db");
const Config = require("./config");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Initialize app
const app = express();
const PORT = Config.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS

// Serve static files
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Database connection
dbConnection();

// API routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running at: http://localhost:${PORT}`);
  }
});