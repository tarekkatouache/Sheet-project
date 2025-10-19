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
router.post(
  "/upload",
  authenticateToken,
  upload.single("file"), // expecting "file" field
  async (req, res) => {
    try {
      const { subSystemId } = req.body; // subsystem ID from request body
      if (!req.file) {
        return res.status(400).json({ message: "File upload failed" }); // check if file is uploaded
      }
      const originalFilePath = req.file.path; // path of the uploaded file
      // 🔽 Get filename without extension
      const filenameWithoutExt = path.basename(
        originalFilePath,
        path.extname(originalFilePath)
      );
      // 🔽 Build PDF file path
      const pdfFilePath = path.join(
        "uploads/technical_pdf_sheets",
        `${filenameWithoutExt}.pdf`
      );
      // 🔽 Generate PDF before saving to DB
      await generatePdfFromExcel(originalFilePath, pdfFilePath); // generate PDF from Excel file
      const sheet = await TechnicalSheet.create({
        subSystemId, // subsystem ID from request body
        uploadedByUserId: req.user.userId, //
        originalFilePath,
        createdAt: new Date(),
        pdfFilePath,
      });

      //
      // Send response with the created technical sheet
      res.status(201).json({ message: "Technical sheet uploaded", sheet });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
