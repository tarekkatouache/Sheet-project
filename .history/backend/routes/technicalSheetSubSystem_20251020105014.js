const express = require("express");
const upload = require("../middleware/upload"); // middleware for file upload
const authenticateToken = require("../middleware/auth"); // middleware for authentication
const TechnicalSheet = require("../models/TechnicalSheetSubSystem"); // model for technical sheets
const router = express.Router(); // create a new router instance
const path = require("path"); // path module for handling file paths
const generatePdfFromOffice = require("../utils/generatePdfFromOffice"); // utility function to generate PDF from Excel
const {
  processTechnicalSheetData,
} = require("../controllers/technicalSheetController"); // controller to process technical sheet data
const logAction = require("../utils/logAction");
////////////////////////
const XLSX = require("xlsx");
const AuditLog = require("../models/AuditLog");

//  // ✅ Upload a subsystemTechnical sheet
r; // ✅ Upload a technical sheet and
router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      const userId = req.user.id;
      const subSystemId = req.body.subSystemid;
      const systemId = req.body.systemId;
      const description = req.body.description;
      const 

);
module.exports = router;
