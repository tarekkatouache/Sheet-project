const express = require("express");
const router = express.Router();
// const System = require("../models/System");
const authenticateToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole"); // custom middleware to check admin role
const logAction = require("../utils/logAction");
const AuditLog = require("../models/AuditLog");
const System = require("../models/System");
const upload = require("../middleware/uploadforSubsheet"); // middleware for file upload
const {
  generatePdfFromOfficeForSubSystemSheet,
} = require("../utils/generatePdfFromOffice2");
// or wherever your PDF utility functions are located

// Create new system (protected)
// router.post("/", authenticateToken, async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const system = await System.create({ name, description });

//     /////
//     console.log(req.user); // Add this just before the AuditLog.create line

//     await AuditLog.create({
//       userId: req.user.id, // user performing the action (from JWT)
//       action: "CREATE",
//       userLogged: req.user.username,
//       entity: "System",
//       entityId: system.id,
//       description: `System created with ${system.name}by ${req.user.name} ${req.user.lastName}`,
//     });
//     ////
//     res.status(201).json(system);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// Create new system with file upload (protected)
router.post("/", authenticateToken, upload.single("file"), async (req, res) => {
  console.log("Creating system with data:", req.body);
  console.log("Uploaded file:", req.file);
  try {
    // STEP 1: Handle file upload and PDF generation FIRST
    const originalPath = req.file.path;
    console.log("Original path:", originalPath);
    const pdfPath = await generatePdfFromOfficeForSubSystemSheet(originalPath);
    console.log("Generated PDF path:", pdfPath);
    // STEP 2: Create subsystem with the paths
    const newSystem = await System.create({
      name: req.body.name,
      description: req.body.description,
      original_file_path: originalPath,
      pdf_file_path: pdfPath,
    });
    // await AuditLog.create({
    //   userId: req.user.id, // user performing the action (from JWT)
    //   action: "CREATE",
    //   userLogged: req.user.username,
    //   entity: "System",
    //   entityId: system.id,
    //   description: `System created with ${system.name}by ${req.user.name} ${req.user.lastName}`,
    // });
    // STEP 3: Return success response
    res.status(201).json({ newSystem });
  } catch (error) {
    console.error("Error creating system:", error);
    res.status(500).json({ message: "Server error while creating system." });
  }
});

// Get all systems  (Admin and User)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const systems = await System.findAll();
    // await AuditLog.create({
    //   userId: req.user.id, // user performing the action (from JWT)
    //   action: "READ",
    //   userLogged: req.user.username,
    //   entity: "System",
    //   entityId: systems.id,
    //   description: `Systems are called by ${req.user.name} ${req.user.lastName}`,
    // });
    res.json(systems);
  } catch (error) {
    console.error("Error fetching systems:", error);
    res.status(500).json({ message: "Server error while fetching systems." });
  }
});

// PUT /api/systems/:id - Update a system (Admin or superuser only )
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin", "superuser"),
  async (req, res) => {
    try {
      const systemId = req.params.id;
      const { name, description } = req.body;

      const system = await System.findByPk(systemId);
      if (!system) {
        return res.status(404).json({ message: "System not found." });
      }

      // Update system
      const oldname = system.name;
      const olddescription = system.description;
      system.name = name || system.name;
      system.description = description || system.description;
      await system.save();
      console.log(`System updated: ${system.name}`);

      // Create audit log
      await AuditLog.create({
        userId: req.user.id,
        action: "UPDATE",
        userLogged: req.user.username,
        entity: "System",
        entityId: system.id,
        description: `System ${system.name} Updated to ${oldname} by ${req.user.name} ${req.user.lastName}`,
      });

      res.json({ message: "System updated successfully", system });
    } catch (error) {
      console.error("Error updating system:", error);
      res.status(500).json({ message: "Server error while updating system." });
    }
  }
);

// DELETE /api/systems/:id - Delete a system (Admin only)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const system = await System.findByPk(req.params.id);
      if (!system) {
        return res.status(404).json({ message: "System not found" });
      }

      await system.destroy({
        where: { id: req.params.id },
      });
      // await AuditLog.create({
      //   userId: req.user.id, // user performing the action (from JWT)
      //   action: "DELETE",
      //   userLogged: req.user.username,
      //   entity: "System",
      //   entityId: system.id,
      //   description: `System  ${system.name} Deleted by ${req.user.name} ${req.user.lastName}`,
      // });
      res.json({ message: "System deleted successfully" });
    } catch (error) {
      console.error("Error deleting system:", error);
      res.status(500).json({ message: "Server error while deleting system" });
    }
  }
);
// get system by id
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const system = await System.findByPk(req.params.id);
    if (!system) {
      return res.status(404).json({ message: "System not found" });
    }
    res.json(system);
  } catch (error) {
    console.error("Error fetching system:", error);
    res.status(500).json({ message: "Server error while fetching system." });
  }
});

module.exports = router;
