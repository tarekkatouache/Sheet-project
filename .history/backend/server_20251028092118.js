const express = require("express"); // import express
const cors = require("cors"); // import cors for CORS issues and it  is a middleware for express to allow cross-origin requests which is useful for APIs
require("dotenv").config(); // load environment variables from .env file
const app = express(); // create an express application
app.use(express.json()); // parse JSON requests
const path = require("path");
const router = express.Router();
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // use cors middleware to allow cross-origin requests
//////////////////////////////
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend URL
    credentials: true, // if you're using cookies or tokens
  })
);
// Load routers
//////////////////////////////
// 💡 Routes
const authRoutes = require("./routes/auth"); // import authentication routes
const systemsRoutes = require("./routes/systems"); // import systems routes
const instrumentsRoutes = require("./routes/instruments"); // import instruments routes
const technicalSheetsRoutes = require("./routes/technicalSheets"); // import technical sheets routes
const userRoutes = require("./routes/users"); // import user routes
const storageRoutes = require("./routes/storage"); // import storage routes
const auditLogsRoutes = require("./routes/auditlogs"); // import audit logs routes
const subSystemsRoutes = require("./routes/subSystems"); // import subsystems routes

///////////////////

// Mount routes:
app.use("/api/auth", authRoutes);
app.use("/api/systems", systemsRoutes);
app.use("/api/instruments", instrumentsRoutes);
app.use("/api/technicalSheets", technicalSheetsRoutes);
app.use("/api/users", userRoutes); // mount user routes
app.use("/api/technical-sheets", require("./routes/technicalSheets"));
app.use("/api/technicalSheets", require("./routes/technicalSheets"));
app.use("/api/storage", storageRoutes);
app.use("/api", storageRoutes);
app.use("/api/auditlogs", auditLogsRoutes);
///////////////////

app.use("/api/subSystems", subSystemsRoutes);
///////////////////////////

app.use("/uploads", express.static("uploads"));

// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve static files from the uploads directory

const PORT = process.env.PORT || 5000; // set the port from environment variable or default to 5000

// 💡 DB + Models
const sequelize = require("./db");
const User = require("./models/User");
const System = require("./models/System");
const Instrument = require("./models/Instrument");
const TechnicalSheet = require("./models/TechnicalSheet");
const AuditLog = require("./models/AuditLog");
const SubSystem = require("./models/SubSystem");

// Sync database
sequelize
  .sync({ alter: true }) // sync the database with the models (create tables if they don't exist, alter if they do)
  .then(() => console.log("Database synced with models.")) // log success message
  .catch((err) => console.error("Sync failed:", err)); // log error message if sync fails

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example in server.js or routes/test.js
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
