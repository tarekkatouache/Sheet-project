const authenticateToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole"); // custom middleware to check admin role
const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLog");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const auditLogs = await AuditLog.findAll();
    res.json(auditLogs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching audit logs." });
  }
});

router.get("/length", authenticateToken, async (req, res) => {
  try {
    const auditLogsCount = await AuditLog.count();
    res.json({ length: auditLogsCount });
  } catch (error) {
    console.error("Error fetching audit logs length:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching audit logs length." });
  }
});

module.exports = router;
