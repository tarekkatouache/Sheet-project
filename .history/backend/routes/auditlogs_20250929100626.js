const authenticateToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole"); // custom middleware to check admin role
const express = require("express");
const router = express.Router();

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
module.exports = router;
