const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/subSys_technical_sheets"); // Temp folder for original files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // File filter function
  const allowedTypes = [".xlsx", ".xls", ".docx", ".doc"]; // Allowed file types
  const ext = path.extname(file.originalname).toLowerCase(); // Get the file extension and convert it to lowercase
  if (allowedTypes.includes(ext)) {
    // Check if the file type is allowed
    cb(null, true); // Allow the file upload
  } else {
    cb(new Error("Only Excel or Word files are allowed")); // Reject the file upload with an error message
  }
};

// Create the multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
