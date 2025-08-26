const express = require("express");
const router = express.Router();
const { getUploadsSize } = require("../utils/getFolderSize");

router.get("/storage-usage", (req, res) => {
  try {
    const usage = getUploadsSize();
    res.json(usage);
  } catch (err) {
    console.error("Error calculating storage size:", err);
    res.status(500).json({ error: "Failed to calculate storage size" });
  }
});

module.exports = router;
