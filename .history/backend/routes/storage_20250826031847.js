// routes/storage.js
const express = require("express");
const path = require("path");
const getFolderSize = require("../utils/getFolderSize");

const router = express.Router();

router.get("/storage-usage", (req, res) => {
  const uploadPath = path.join(__dirname, "../uploads"); // adjust to your path
  try {
    const sizeBytes = getFolderSize(uploadPath);
    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2); // convert to MB
    res.json({ sizeBytes, sizeMB });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not calculate storage size" });
  }
});

module.exports = router;
