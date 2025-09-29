const authenticateToken = require("../middleware/auth");
import { route } from "./auth";
import AuditLog from "../models/AuditLog";

// route for get all logs from database
router.get("/", authenticateToken, async (req, res) => {
  try {
    const logs = await AuditLog.findAll();
    res.json(logs);
  } catch (error) {
    console.error("Error fetching auditlogs :", error);
    res.status(500).json({ message: "Server error while fetching auditlogs." });
  }
});
