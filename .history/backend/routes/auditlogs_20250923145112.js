import authenticateToken from "../middleware/auth";
import { route } from "./auth";
import AuditLog from "../models/AuditLog";

// route for get all logs from database
router.get("/auditLogs", authenticateToken, async (req, res) => {
  console.log("", req.user);
  try{
    const Log = await  AuditLog.findAll()
    res.json(AuditLog)
  }
});
