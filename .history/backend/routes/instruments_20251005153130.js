const express = require("express");
const Instrument = require("../models/Instrument");
const authenticateToken = require("../middleware/auth");
const logAction = require("../utils/logAction");
const authorizeRole = require("../middleware/authorizeRole");
const { Op } = require("sequelize"); // for advanced queries like array contains

const router = express.Router();

///////////////////////////////////////////////////////////////////////////////////////////
router.get("/by-service", authenticateToken, async (req, res) => {
  console.log("User info from token:", req.user);
  try {
    const userService = req.user.service; // e.g. "SMICC"

    if (!userService) {
      return res.status(400).json({ message: "User has no service assigned." });
    }

    const instruments = await Instrument.findAll({
      where: {
        services: {
          [Op.contains]: [userService], // <-- very likely the issue
        },
      },
    });

    res.json(instruments);
  } catch (error) {
    console.error("Error fetching instruments by service:", error);
    res.status(500).json({ message: "Server error." });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
// // CREATE: Add new instrument
router.post("/", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const {
      name,
      description,
      room,
      building,
      createdByUserId,
      updatedByUserId,
      systemId,
      subSystemId,
      services,
    } = req.body;

    if (!name || !createdByUserId || !systemId || !subSystemId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const instrument = await Instrument.create({
      name,
      description,
      room,
      building,
      createdByUserId,
      updatedByUserId,
      systemId,
      subSystemId,
      services,
    });

    res.status(201).json({ message: "Instrument created", instrument });
  } catch (error) {
    console.error("Error in POST /api/instruments:", err);

    console.error("Error creating instrument:", error);
    res.status(500).json({ error: error.message });
  }
});

// READ: Get all instruments (optional system filter) // without  permission
router.get("/", async (req, res) => {
  try {
    const { systemId } = req.query;

    const where = systemId ? { systemId } : {};
    const instruments = await Instrument.findAll({ where });

    res.json(instruments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update instrument
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // Get instrument ID from request parameters
    const { name, description, location, systemId, services } = req.body;

    const instrument = await Instrument.findByPk(id);
    if (!instrument)
      return res.status(404).json({ message: "Instrument not found" });

    instrument.name = name;
    instrument.description = description;
    instrument.location = location;
    instrument.systemId = systemId;
    instrument.updatedByUserId = req.user.userId;

    await instrument.save();
    res.json(instrument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove instrument
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const instrument = await Instrument.findByPk(id);
      if (!instrument)
        return res.status(404).json({ message: "Instrument not found" });

      await instrument.destroy({
        where: { id: req.params.id },
      });
      res.json({ message: "Instrument deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
// routes/instruments.js

// GET instrument by ID
// router.get("/:id", authenticateToken, async (req, res) => {
//   try {
//     const instrument = await Instrument.findByPk(req.params.id);
//     paranoid: false; // this includes soft-deleted if you use Sequelize

//     if (!instrument) {
//       return res.status(404).json({ message: "Instrument not found" });
//     }
//     res.json(instrument);
//   } catch (err) {
//     console.error("Error fetching instrument:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// GET instrument by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id, {
      paranoid: false, // ✅ include soft-deleted records
    });

    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }
    res.json(instrument);
  } catch (err) {
    console.error("Error fetching instrument:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
