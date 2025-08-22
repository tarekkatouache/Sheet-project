const express = require("express");
const upload = require("../middleware/upload"); // middleware for file upload
const authenticateToken = require("../middleware/auth"); // middleware for authentication
const TechnicalSheet = require("../models/TechnicalSheet"); // model for technical sheets
const router = express.Router(); // create a new router instance
const path = require("path"); // path module for handling file paths
const generatePdfFromOffice = require("../utils/generatePdfFromOffice"); // utility function to generate PDF from Excel
const {
  processTechnicalSheetData,
} = require("../controllers/technicalSheetController"); // controller to process technical sheet data
const logAction = require("../utils/logAction");
////////////////////////
const XLSX = require("xlsx");
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// Upload a technical sheet for an instrument
// router.post(
//   "/upload",
//   authenticateToken,
//   upload.single("file"), // expecting "file" field
//   async (req, res) => {
//     try {
//       const { instrumentId } = req.body; // instrument ID from request body
//       if (!req.file) {
//         return res.status(400).json({ message: "File upload failed" }); // check if file is uploaded
//       }
//       const originalFilePath = req.file.path; // path of the uploaded file
//       // 🔽 Get filename without extension
//       const filenameWithoutExt = path.basename(
//         originalFilePath,
//         path.extname(originalFilePath)
//       );
//       // 🔽 Build PDF file path
//       const pdfFilePath = path.join(
//         "uploads/technical_pdf_sheets",
//         `${filenameWithoutExt}.pdf`
//       );
//       // 🔽 Generate PDF before saving to DB
//       await generatePdfFromExcel(originalFilePath, pdfFilePath); // generate PDF from Excel file
//       const sheet = await TechnicalSheet.create({
//         instrumentId, // instrument ID from request body
//         uploadedByUserId: req.user.userId, //
//         originalFilePath,
//         createdAt: new Date(),
//         pdfFilePath,
//       });
//       //// Log the action
//       // await logAction({
//       //   userId: req.user.id, // ID of the user who uploaded the sheet
//       //   action: "uploaded technical sheet ", // action description
//       //   targetTable: "TechnicalSheets", //
//       //   targetId: sheet.id, // ID of the uploaded sheet
//       // });
//       ///
//       //
//       // Send response with the created technical sheet
//       res.status(201).json({ message: "Technical sheet uploaded", sheet });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
///////////////////////////////
// ✅ Get all technical sheets for a system or instrument
router.get("/", authenticateToken, async (req, res) => {
  const { instrumentId, systemId } = req.query;
  const where = {};
  if (instrumentId) where.instrumentId = instrumentId;
  // If systemId is provided, join with Instrument model
  const options = { where };
  if (systemId) {
    const { Instrument } = require("../models/Instrument");
    options.include = {
      model: Instrument,
      where: { systemId },
    };
  }
  const sheets = await TechnicalSheet.findAll(options);
  res.json(sheets);
});
///////////////////////////////
// ✅ Delete a sheet
router.delete("/:id", authenticateToken, async (req, res) => {
  await TechnicalSheet.destroy({
    where: { id: req.params.id },
  });
  // await TechnicalSheet.destroy({ where: { id: req.params.id } });
  res.json({ message: "Sheet deleted" });
});
/////////////////////////
// router.delete("/:id", authenticateToken, async (req, res) => {
//   try {
//     const sheet = await TechnicalSheet.findByPk(req.params.id);
//     if (!sheet) {
//       return res.status(404).json({ message: "Technical sheet not found" });
//     }
//     sheet.isDeleted = true;
//     await sheet.save();
//     res.json({ message: "Technical sheet marked as deleted (soft delete)" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
//  // ✅ Upload a technical sheet and save data to TechnicalSheetData table
router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    console.log("📡 Upload called");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);
    console.log("req.file.type:", req.file.type);
    try {
      const { instrumentId } = req.body;
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
      await generatePdfFromOffice(originalFilePath, pdfFilePath);
      const sheet = await TechnicalSheet.create({
        instrumentId,
        // systemId,
        uploadedByUserId: req.user.userId,
        originalFilePath,
        pdfFilePath,
        createdAt: new Date(),
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
// ✅ download a technical sheet file by ID
// GET /api/technical-sheets/:id/download
// http://localhost:3000/api/technicalSheets/:id/download

router.get("/:id/download", async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await TechnicalSheet.findByPk(id);

    if (!sheet || !sheet.originalFilePath) {
      return res
        .status(404)
        .json({ error: "Technical sheet or file path not found" });
    }

    const filePath = path.resolve(sheet.originalFilePath); // safely resolves full path
    const fileName = path.basename(sheet.originalFilePath); // gets just the file name

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ error: "Failed to download file" });
      }
    });
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).json({ error: "Server error" });
  }
});

////////////////////////////////////////////////
// ✅ GET all technical sheets by instrumentId

router.get("/instrument/:instrumentId", authenticateToken, async (req, res) => {
  const { instrumentId } = req.params;
  const sheets = await TechnicalSheet.findAll({
    where: { instrumentId },
  });
  res.json(sheets);
});

///////////////////////////////////////////////
app.get("/api/sheet", async (req, res) => {
  try {
    const sheets = await Sheet.findAll({
      include: [
        {
          model: Instrument,
          include: [System], // 👈 going up another level
        },
      ],
    });
    res.json(sheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
