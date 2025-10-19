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
    console.log("📡 Upload called");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);
    console.log("keys words:", req.body.key_words);

    try {
      const { instrumentId, reference } = req.body;
      let key_words = [];
      if (!req.file) {
        return res.status(400).json({ message: "File upload failed" });
      }
      const originalFilePath = req.file.path;
      const filenameWithoutExt = path.basename(
        originalFilePath,
        path.extname(originalFilePath)
      );
      const pdfFilePath = path.join(
        "uploads/technical_pdf_sheets",
        `${filenameWithoutExt}.pdf`
      );
      //////////////////////////////////////////////////////
      if (req.body.key_words) {
        try {
          key_words = JSON.parse(req.body.key_words); // parse the string into a real array
        } catch (error) {
          console.error("Upload error:", error.errors || error);
          res.status(500).json({
            error: error.message,
            details: error.errors?.map((e) => ({
              message: e.message,
              path: e.path,
            })),
          });
        }
      }
      console.log("Parsed key_words:", key_words);

      //////////////////////////////////////////////////////

      await generatePdfFromOffice(originalFilePath, pdfFilePath);
      const sheet = await TechnicalSheet.create({
        instrumentId,
        reference,
        // systemId,
        subSystemid: req.body.subSystemid || null,
        uploadedByUserId: req.user.userId,
        originalFilePath,
        pdfFilePath,
        createdAt: new Date(),
        key_words,
      });
      console.log("Audit log created for technical sheet upload");
      await AuditLog.create({
        userId: req.user.id, // user performing the action (from JWT)
        action: "UPLOAD",
        userLogged: req.user.username,
        entity: "TechnicalSheet",
        entityId: sheet.id,
        createdAt: new Date(),
        description: `Technical sheet ${sheet.id} uploaded by ${req.user.name} ${req.user.lastName}`,
      });

      res.status(201).json({
        message: "Technical sheet uploaded & vertical data saved",
        sheet,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);
