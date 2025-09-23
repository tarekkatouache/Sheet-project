import authenticateToken from "../middleware/auth";
import { route } from "./auth";

// route for get all logs from database
router.get("/auditLogs", authenticateToken, async (req, res) => {
    

);
