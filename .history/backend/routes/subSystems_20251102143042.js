const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
// const AuditLog = require("../models/AuditLog");
const SubSystem = require("../models/SubSystem");
const upload = require("../middleware/uploadforSubsheet"); // middleware for file upload
const path = require("path");

const {
  generatePdfFromOfficeForSubSystemSheet,
} = require("../utils/generatePdfFromOffice2");
// or wherever your PDF utility functions are located
// Create new subsystem with file upload middleware

// Create new subsystem with file upload
router.post(
  "/createSubSystem",
  authenticateToken,
  upload.single("technicalSheet"),
  async (req, res) => {
    console.log("Creating subsystem with data:", req.body);
    console.log("Uploaded file:", req.file);

    try {
      // Validate required fields
      if (!req.body.system_id || !req.body.name || !req.body.code) {
        return res.status(400).json({
          message: "Missing required fields: system_id, name, or code",
        });
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "File upload is required" });
      }

      // STEP 1: Handle file upload and PDF generation FIRST
      const originalPath = req.file.path;
      console.log("Original path:", originalPath);

      const pdfPath = await generatePdfFromOfficeForSubSystemSheet(
        originalPath
      );
      console.log("Generated PDF path:", pdfPath);

      // STEP 2: Create subsystem with the paths
      const newSubsystem = await SubSystem.create({
        systemId: req.body.systemId,
        name: req.body.name,
        code: req.body.code,
        room: req.body.room,
        building: req.body.building,
        description: req.body.description,
        createdbyUserId: req.body.createdbyUserId,
        originalPathFile: originalPath,
        pdfPathFile: pdfPath,
      });

      console.log("Created subsystem:", newSubsystem.toJSON());

      // STEP 3: Return success response
      res.status(201).json({
        message: "Subsystem created successfully",
        data: newSubsystem, // Changed from 'subSystem' to 'newSubsystem'
      });
    } catch (error) {
      console.error("Error creating subsystem:", error);
      // Handle unique constraint violation
      if (error.name === "SequelizeUniqueConstraintError") {
        const duplicateField = error.errors[0]?.path || "field";
        const duplicateValue = error.errors[0]?.value || "value";

        return res.status(409).json({
          message: `Subsystem with ${duplicateField} "${duplicateValue}" already exists.`,
          error: "Duplicate entry",
          field: duplicateField,
        });
      }

      // Clean up uploaded file if database save fails
      if (req.file && req.file.path) {
        const fs = require("fs");
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }

      res.status(500).json({
        message: "Server error while creating subsystem.",
        error: error.message,
      });
    }
  }
);
// Get all subsystems (protected)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const subSystems = await SubSystem.findAll();
    res.json(subSystems);
  } catch (error) {
    console.error("Error fetching subsystems:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching subsystems." });
  }
});
//GET SUBSYSTEMS BY SYSTEM ID with route /api/subSystems/by-system/:systemId
router.get("/by-system/:system_id", authenticateToken, async (req, res) => {
  try {
    const systemId = req.params.systemId;
    if (!systemId) {
      return res
        .status(400)
        .json({ message: "systemId query parameter is required." });
    }
    const subSystems = await SubSystem.findAll({ where: { systemId } });
    res.json(subSystems);
  } catch (error) {
    console.error("Error fetching subsystems by system ID:", error);
    res.status(500).json({
      message: "Server error while fetching subsystems by system ID.",
    });
  }
});
// get SUBSYSTEM BY ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const subSystem = await SubSystem.findByPk(id);
    if (!subSystem) {
      return res.status(404).json({ message: "SubSystem not found." });
    }
    res.json(subSystem);
  } catch (error) {
    console.error("Error fetching subsystem by ID:", error);
    res.status(500).json({
      message: "Server error while fetching subsystem by ID.",
    });
  }
});

module.exports = router;
