const fs = require("fs");
const path = require("path");
const libre = require("libreoffice-convert"); // make sure installed: npm i libreoffice-convert

// Middleware to convert .doc -> .docx if needed
const convertDocToDocx = (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded");
    return next();
  }

  const filePath = req.file.path;
  const ext = path.extname(filePath).toLowerCase();

  // Only convert if it's a .doc
  if (ext !== ".doc") {
    console.log("File is not .doc, skipping conversion:", filePath);
    return next();
  }

  const outputPath = filePath + "x"; // .docx
  const fileBuffer = fs.readFileSync(filePath);

  libre.convert(fileBuffer, ".docx", undefined, (err, done) => {
    if (err) {
      console.error("❌ Error converting file:", err);
      return next(err);
    }

    // Save converted file
    fs.writeFileSync(outputPath, done);

    console.log(`✅ Converted ${filePath} → ${outputPath}`);

    // Update req.file to point to .docx instead of .doc
    req.file.path = outputPath;
    req.file.filename = req.file.filename + "x"; // add x at the end
    req.file.originalname = req.file.originalname.replace(/\.doc$/i, ".docx");

    // Optionally delete the old .doc file
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr)
        console.warn("⚠️ Could not delete original .doc:", unlinkErr);
    });

    next();
  });
};

module.exports = convertDocToDocx;
